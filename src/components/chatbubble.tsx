import React from 'react';

interface ChatBubbleProps {
  text: string;
  isUser?: boolean;
  onClick: () => void; // Add onClick prop
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser = false, onClick }) => {
  return (
    <div
      onClick={onClick} // Attach onClick handler
      className={`p-4 rounded-lg cursor-pointer flex items-center justify-center border-2 transition-colors duration-300 ${
        isUser
          ? 'ml-auto text-right text-white border-blue-500 bg-main-color hover:bg-blue-500'
          : 'mr-auto text-left text-white border-blue-500 bg-main-color hover:bg-blue-500'
      }`}
      style={{
        width: '100%', // Use full width of the grid cell
        maxWidth: '350px', // Set a max width for larger screens
        height: 'auto', // Allow height to adjust based on content
      }}
    >
      <span className="text-sm md:text-base lg:text-lg">{text}</span> {/* Responsive font sizes */}
    </div>
  );
};

export default ChatBubble;
