import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import Image from 'next/image';
import ChatHeader from '@/components/navheader';
import SidebarPop from '@/components/sidebar-pop';
import Search from '@/components/search';
import ChatBubble from '@/components/chatbubble';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  animate?: boolean;
}

interface UserProfile {
  picture: string;
  id_hash: string;
  stripe_customer_id: string;
  email: string;
  credits: number;
  is_member: boolean;
}

const Chat: React.FC = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const [message, setMessage] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false); // Sidebar visibility state
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [chatName, setChatName] = useState('New Chat'); // Default chat name
  const [chatNames, setChatNames] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setChatNames(['Chat 1', 'Chat 2', 'Chat 3', 'Chat 4', 'Chat 5', 'Chat 6', 'Chat 7', 'Chat 8', 'Chat 9', 'Chat 10']);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const match = window.matchMedia('(min-width: 768px)').matches;
      if (!match) setSidebarVisible(false); // Hide sidebar on small screens
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="bg-main-color w-full h-screen flex flex-col justify-between overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-sidebar-color transition-transform transform ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-[300px]'
        }`}
      >
        <SidebarPop credits={profile?.credits} chats={chatNames} />
      </div>

      {/* Sidebar toggle button (image icon) */}
      <div className="fixed top-4 left-4 z-50 cursor-pointer" onClick={toggleSidebar}>
        <Image src="/sidebar.png" alt="Toggle Sidebar" width={40} height={40} />
      </div>

      {/* Chat Header */}
      <ChatHeader profileImageUrl={'/default-profile.png'} chatName={chatName} sidebarVisible={sidebarVisible} /> {/* Pass sidebarVisible state */}

      {/* Chat Bubbles Container */}
      <div className="flex-grow flex items-end justify-center p-4 mb-[100px] relative">
        {/* Logo Image positioned above the chat bubbles */}
        <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logo-secondary.png"
            alt="Logo"
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            className="relative z-10" // Ensure the image is above other elements
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-0">
          {/* Render static chat bubbles */}
          <ChatBubble text="What are Nvidia's main revenue drivers?" onClick={() => setMessage("What are Nvidia's main revenue drivers?")} />
          <ChatBubble text="When will there be a recession?" onClick={() => setMessage("When will there be a recession?")} />
          <ChatBubble text="What is the news sentiment around Apple?" onClick={() => setMessage("What is the news sentiment around Apple?")} />
          <ChatBubble text="What are some booming tech stocks?" onClick={() => setMessage("What are some booming tech stocks?")} />
        </div>
      </div>

      {/* Search Component at the bottom */}
      <div className="p-4">
        <Search />
      </div>
    </div>
  );
};

export default Chat;
