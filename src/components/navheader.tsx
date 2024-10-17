// fineas-ui-2.0/src/components/ChatHeader.tsx
import React from 'react';
import SignInComponent from './sign-in';

interface ChatHeaderProps {
  profileImageUrl?: string;
  chatName: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ profileImageUrl, chatName }) => {
  return (
    <div className="flex items-center p-2">
      <img src="sidebar.png" alt="Sidebar" className="pr-2" />
      <span className="ml-2 text-lg font-semibold text-[#B294FF] font-quicksand text-[20px]">
        {chatName || 'New Chat'}
      </span>
      <div className="flex-grow top-[10px]"></div>
      {profileImageUrl ? (
        <SignInComponent />
      ) : (
        <div className="w-10 h-10 rounded-full bg-black pl-2"></div>
      )}
    </div>
  );
};

export default ChatHeader;
