import { createContext, useMemo, useEffect, useState } from 'react';

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

interface Chat {
    chat: {
        id: number;
        input: string;
        output: SpotifyResponse[];
    }[];
}

interface ChatContextProps {
    chat: Chat;
    setChat: (chat: Chat) => void;
}

interface ChatProviderProps {
  children: React.ReactNode; 
}

const ChatContext = createContext<ChatContextProps>({ chat: { chat: [] }, setChat: () => { console.log('not initialized'); }});

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [chat, setChat] = useState<Chat>({ chat: [] });

    const contextValue = useMemo(() => ({ chat, setChat }), [chat, setChat]);

    useEffect(() => {
        console.log(chat);
    }, [chat, setChat]);
    
    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
