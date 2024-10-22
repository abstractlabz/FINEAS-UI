import React from 'react';
import SignInComponent from './sign-in';

interface ChatHeaderProps {
  profileImageUrl?: string;
  chatName: string;
  sidebarVisible: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ profileImageUrl, chatName, sidebarVisible }) => {
  return (
    <div className="relative w-full h-16 flex items-center justify-between p-4 bg-header-color transition-all duration-300">
      <div
        className={`text-xl ml-[15%] font-semibold text-[#B294FF] transition-transform transform z-50 ${
          sidebarVisible 
            ? 'translate-x-0 translate-y-0' // Reset on all screens
            : 'translate-x-0 translate-y-0' // Reset on all screens
        }`}
      >
        {chatName.length > 10 ? `${chatName.substring(0, 7)}...` : chatName}
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
