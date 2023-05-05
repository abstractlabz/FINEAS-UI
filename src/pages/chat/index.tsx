import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/providers/UserProvider';
import { ChatContext } from '@/providers/ChatProvider';
import { parseSong } from '@/lib/parse';
import SpotifyCardComponent from '@/components/spotify-card';
import ChatGPTOutputComponent from '@/components/chatgpt-output';
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
// add index to state
    const router = useRouter();
    const [input, setInput] = useState<string>('');

    // const [error, setError] = useState<string | null>(null);

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
      
            console.log(parsedOutput);
      
            const updatedChat = {
              chat: [
                ...chat.chat,
                { input: input, output: parsedOutput }
              ]
            };
            setChat(updatedChat);
      
            setInput('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid min-h-screen md:grid-cols-4 sm:grid-cols-1">
            <div className="col-span-1"></div>
            <div className="flex flex-col min-h-screen col-span-2 px-2 border-l border-r border-gray-200 dark:border-gray-800 sm:px-10 md:p-0">
                <div className="flex-grow gap-2 mt-5">
                    <div className="flex flex-col col-span-1 gap-2 mb-16 overflow-y-scroll">
                       {chat.chat.map((message) => (
                            <ChatGPTOutputComponent key={message.output.length} {...message} />
                        ))}
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 pb-5 rounded-t-sm w-full mx-auto md:max-w-[720px] bg-background">
                    <div className="flex justify-between flex-grow gap-5 px-5 py-2">
                        <Input placeholder='Enter your phrase' value={input} onChange={(e) => setInput(e.target.value)} required/>
                        <Button className='w-1/3' onClick={() => void handleInput()}>Generate</Button>
                    </div>
                </div>
            </div>
            <div className="col-span-1"></div>
        </div>
    )
}

export default Chat;
