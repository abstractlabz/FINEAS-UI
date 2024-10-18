// fineas-ui-2.0/src/components/ChatHeader.tsx
import React from 'react';
import SignInComponent from './sign-in';

interface ChatHeaderProps {
  profileImageUrl?: string;
  chatName: string;
  sidebarVisible: boolean; // Add sidebarVisible prop
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ profileImageUrl, chatName, sidebarVisible }) => {
  return (
    <div className="relative w-full h-16 flex items-center justify-between p-4 bg-header-color transition-all duration-300">
      <div
        className={`text-xl ml-[10%] font-semibold text-[#B294FF] transition-transform transform ${
          sidebarVisible ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        {chatName}
      </div>
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
