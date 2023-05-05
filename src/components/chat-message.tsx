import ChatGPTOutputComponent from "@/components/chatgpt-output";

type ChatMessagesProps = {
    chat: {
        chat: {
            id: string;
            text: string;
            user: string;
        }[];
    };
};

const ChatMessages = ({ chat }) => {
    return (
        <div className="flex flex-col col-span-1 gap-2 mb-16 overflow-y-scroll">
            {chat.chat.map((message) => (
                <ChatGPTOutputComponent key={message.id} {...message} />
            ))}
        </div>
    );
};