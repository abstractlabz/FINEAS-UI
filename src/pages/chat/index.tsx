import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/providers/UserProvider';
import { ChatContext } from '@/providers/ChatProvider';
import { parseSong } from '@/lib/parse';
import SpotifyCardComponent from '@/components/spotify-card';
import ChatGPTOutputComponent from '@/components/chatgpt-output';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, FileWarning, Terminal } from "lucide-react"

// import data from '@/data/data.json';

// handle when cookies expire 
type SpotifyResponse = {
    tracks: {
        items: {
            name: string;
            preview_url: string;
            uri: string;
            external_urls: {
                spotify: string;
            } 
            artists: {
                name: string;
            }[]
            album: {
                images: {
                    url: string;
                    height: number;
                    width: number;
                }[]
            }
        }[]
    }
}

const Chat = () => {
    const { user } = useContext(UserContext) || {};
    const { chat, setChat } = useContext(ChatContext) || {};
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const [idx, setIdx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (user === null) {
            router.push('/').catch((err) => console.log(err));
        }
    }, [user, router]);

    useEffect(() => {
        console.log(input);
    }, [input]);

    // useEffect(() => {
    //     if (chat === null) {
    //         return;
    //     }
    // ), [chat];

    const handleInput = async (): Promise<void> => {
        if (input === '') {
            return;
        }

        try {
            setLoading(true); 
            setError(null);
            const response = await fetch('http://localhost:3000/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ input: input }),
            });
      
            const gptOutput = await response.json() as { output: string };

            console.log(gptOutput.output);

            // if (gptOutput.output === "Songs not found.") {
            //     setInput('');
            //     break;
            // }


            // const gptOutput = { output: `"1. Hello World - Lady Antebellum\n2. Hello World - Tristan Prettyman\n3. Hello World - Belle Perez\n4. The World Is Yours - Nas\n5. A Whole New World - Peabo Bryson & Regina Belle\n6. We Are the World - USA for Africa\n7. What A Wonderful World - Louis Armstrong\n8. Man Of The World - Fleetwood Mac"` }
        
      
            const parsedOutput = await parseSong(gptOutput.output) as SpotifyResponse[];

            if (parsedOutput.length === 0) {
                setInput('');
                setError('No songs found. Please try again.');
                return;
            }
      
            console.log(parsedOutput);
      
            const updatedChat = {
              chat: [
                ...chat.chat,
                { id: idx, input: input, output: parsedOutput },
              ]
            };
            
            setChat(updatedChat);
            setIdx(idx + 1);
            setInput('');
        } catch (error) {
            console.log(error);
            setError('Your session has expired. Please log in again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen md:grid-cols-4 sm:grid-cols-1">
            <div className="col-span-1"></div>
            <div className="flex flex-col min-h-screen col-span-2 px-2 border-l border-r border-gray-200 dark:border-gray-800 sm:px-10 md:p-0">
                {idx === 0 && (
                    <div className="flex flex-col items-center justify-center pt-10 transition duration-500 ease-in-out transform translate-y-0">
                        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
                            Song GPT
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Generate song lyrics using GPT-4.
                        </p>
                    </div>
                )}
                <div className="flex-grow gap-2 mt-5">
                    <div className="flex flex-col col-span-1 gap-2 mb-16 overflow-y-scroll">
                       {chat.chat.map((message) => (
                            <ChatGPTOutputComponent key={message.id} {...message} />
                        ))}
                    </div>
                </div> 
                <div className="fixed bottom-0 left-0 right-0 pb-5 rounded-t-sm w-full mx-auto md:max-w-[720px] bg-background">
                    <div className="flex justify-between flex-grow gap-5 px-5 py-2">
                        <Input placeholder='Enter your phrase' value={input} onChange={(e) => setInput(e.target.value)} required/>
                        <Button className='w-1/3' onClick={() => void handleInput()} disabled={loading}>
                          {loading ? 'Loading...' : 'Generate'} 
                        </Button>
                    </div>

                    {error && (
                        <Alert variant="destructive" onClick={() => setError(null)} className="fixed bottom-0 right-0 w-64 px-4 py-2 mb-4 mr-4 text-white transition duration-500 ease-in-out transform translate-y-0 bg-red-500 rounded-md opacity-100 cursor-pointer hover:scale-100">
                         <AlertCircle className="w-4 h-4" />
                         <AlertTitle>Error</AlertTitle>
                         <AlertDescription>
                            {error}
                         </AlertDescription>
                        </Alert>
                    )}
                </div> 
            </div>
            <div className="col-span-1"></div>
        </div>
    )
}

export default Chat;
