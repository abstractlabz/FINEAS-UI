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
import SignInComponent from '../components/sign-in';

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
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const savedProfile = Cookies.get('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile) as UserProfile;
      setProfile(profileData);
      setIsLoggedIn(true);
      fetchChatNames(profileData);
  
      if (redirect) {
        const allowedRedirects = ['/'];
        if (allowedRedirects.includes(redirect as string)) {
          router.push(redirect as string);
        } else {
          router.push('/');
        }
      }
    } else {
      setIsLoggedIn(false);
      setIsModalOpen(true);
      setModalContent(
        <>
          <div className='mb-4 items-center flex justify-center items-center'>
            Please sign in to use our features
          </div>
          <SignInComponent
            onSignIn={() => {
              setIsLoggedIn(true);
              setIsModalOpen(false);
              fetchChatNames(JSON.parse(Cookies.get('userProfile') || '{}'));
  
              if (redirect) {
                const allowedRedirects = ['/'];
                if (allowedRedirects.includes(redirect as string)) {
                  router.push(redirect as string);
                } else {
                  router.push('/');
                }
              }
            }}
          />
        </>
      );
    }
  }, [redirect]);

  useEffect(() => {
    const checkScreenSize = () => {
      const match = window.matchMedia('(min-width: 768px)').matches;
      if (!match) setSidebarVisible(false); // Hide sidebar on small screens
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchChatNames = async (profile: UserProfile | null) => {
    try {
      const response = await axios.get('https://upgrade.fineasapp.io:2096/get-chat-names', { params: { id_hash: profile?.id_hash } });
      setChatNames(response.data);
    } catch (error) {
      console.error('Failed to fetch chat names', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>No chats found</div>);
      setIsModalOpen(true);
    }
  };

  const fetchProfileImage = async (url: string, retries = 5, delay = 1000) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      if (retries === 0 || (error as any).response?.status !== 429) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchProfileImage(url, retries - 1, delay * 2); // Exponential backoff
    }
  };
  

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
