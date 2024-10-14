import React from 'react';

interface ChatBubbleProps {
  text: string;
  isUser?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser = false }) => {
  return (
    <div
      className={`max-w-md p-4 rounded-lg cursor-pointer w-[350px] h-[80px] flex items-center justify-center border-2 transition-colors duration-300 ${
        isUser
          ? 'ml-auto text-right text-white border-blue-500 bg-main-color hover:bg-blue-500'
          : 'mr-auto text-left text-white border-blue-500 bg-main-color hover:bg-blue-500'
      }`}
    >
      {text}
    </div>
  );
};

export default ChatBubble;
