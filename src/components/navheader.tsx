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
        className={`text-xl ${typeof window !== 'undefined' && window.innerWidth >= 768 ? 'ml-[5%]' : 'ml-[10%]'} ${sidebarVisible ? 'ml-[5%]' : 'ml-[10%]'} font-semibold text-[#B294FF] transition-transform transform z-50 ${
          sidebarVisible 
            ? 'translate-x-7 translate-y-0' // Reset on all screens
            : 'translate-x-7 translate-y-0' // Reset on all screens
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
