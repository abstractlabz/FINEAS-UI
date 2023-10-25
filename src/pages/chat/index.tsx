
import { useRouter } from 'next/router';
import { useContext, useEffect, useState, useCallback } from 'react';
import ChatGPTOutputComponent from '@/components/chatgpt-output';
import ErrorAlertComponent from '@/components/error-alert';
import TitleComponent from '@/components/title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatContext } from '@/providers/ChatProvider';
import { UserContext } from '@/providers/UserProvider';

const Chat = () => {
    const router = useRouter();
    const { user } = useContext(UserContext) ?? {};
    const { chat, setChat } = useContext(ChatContext) ?? {};
    const [input, setInput] = useState<string>('');
    const [idx, setIdx] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (user === null) {
            router.push('/').catch((err) => console.log(err));
        }
    }, [user, router]);

    const handleInput = useCallback(async (): Promise<void> => {
        if (input === '') {
            setError('Please enter a phrase.');
            return;
        }

        try {
            setLoading(true); 
            setError(null);
            const parsedInput: string = input;
            const token: string = '671b31a4e4d59e1f4e344e91fb343c6988462a0afcf828bcd3f55404058819f2'
            const response = fetch('http://localhost:6002/chat?prompt='+encodeURIComponent(parsedInput), {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain',
                'Authorization': `Bearer ` + token,
              }
            });
      
            const output = (await response).text();
      
            let parsedOutput: string[] = [];
            parsedOutput.push(await output);

            if (parsedOutput.length === 0) {
                setInput('');
                setError('No songs found. Please try again.');
                return;
            }
      
            const updatedChat = {
              chat: [
                { id: idx, input: input, output: parsedOutput },
              ]
            };
            
            setChat(updatedChat);
            setIdx(idx + 1);
            setInput('');
        } catch (error) {
            console.log(error);
            setError('Here');
        } finally {
            setLoading(false);
        }
    }, [input, chat, idx, setChat]);

    return (
        <div className="grid min-h-screen md:grid-cols-4 sm:grid-cols-1">
            <div className="col-span-1"></div>
            <div className="flex flex-col min-h-screen col-span-2 px-2 border-l border-r border-gray-200 dark:border-gray-800 sm:px-10 md:p-0">
                <div className="flex flex-col items-center justify-center pt-10 transition duration-500 ease-in-out transform translate-y-0">
                    <TitleComponent />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Discover Stock Market Alpha!
                    </p>
                </div>
        

                <div className="flex-grow gap-2 mt-5">
                    <div className="flex flex-col col-span-1 gap-2 mb-16 overflow-y-scroll">
                       {chat.chat.map((message) => (
                            <ChatGPTOutputComponent key={message.id} {...message} />
                        ))}
                    </div>
                </div> 

                <div className="fixed bottom-0 left-0 right-0 pb-5 rounded-t-sm xl:border-l xl:border-r border-gray-200 dark:border-gray-800 w-full mx-auto md:max-w-[720px] bg-background">
                    <div className="flex justify-between flex-grow gap-5 px-5 py-2">
                        <Input placeholder='Enter your phrase' value={input} onChange={(e) => setInput(e.target.value)} required/>
                        <Button className='w-1/3' onClick={() => void handleInput()} disabled={loading}>
                          {loading ? 'Loading...' : 'Generate'} 
                        </Button>
                    </div>

                    {error && <ErrorAlertComponent error={error} onClose={() => setError(null)} />}
                </div> 
            </div>
            <div className="col-span-1"></div>
        </div>
    )
}

export default Chat;

