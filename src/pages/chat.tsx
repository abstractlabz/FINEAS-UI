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
import TypewriterEffect from '@/components/ui/typewriter';

interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean; // Added isLoading property
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [chatName, setChatName] = useState('New Chat');
  const [chatNames, setChatNames] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [showRedBorderDiv, setShowRedBorderDiv] = useState(false);
  const [isChatBubbleClicked, setIsChatBubbleClicked] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const logos = ["/logo-chat.png", "/logo-chat2.png", "/logo-chat3.png"];

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

  // Update logo animation based on messages that are loading
  useEffect(() => {
    const hasLoadingMessage = chatHistory.some((msg) => msg.sender === 'user' && msg.isLoading);
    if (hasLoadingMessage) {
      const interval = setInterval(() => {
        setLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
      }, 250); // Change image every 250ms

      return () => clearInterval(interval);
    } else {
      setLogoIndex(0);
    }
  }, [chatHistory]);

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

  const fetchBotResponse = async (prompt: string): Promise<string> => {
    try {
      const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN?.toString() || '';
      console.log(bearerToken)
      const response = await axios.post('https://query.fineasapp.io:443/chat', {
        prompt: prompt  // Send the prompt in the request body
      }, {
        headers: {
          Authorization: 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'  // Set content type to JSON
        }
      });

      // Assuming the response data contains the bot's message in response.data.message
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bot response', error);
      return "Error fetching response";
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

  // Handler for chat bubble click
  const handleChatBubbleClick = async (selectedText: string) => {
    if (chatHistory.find((msg) => msg.text === selectedText && msg.sender === 'user')) {
      return;
    }

    setIsChatBubbleClicked(true);
    setShowRedBorderDiv(true);

    const newMessageId = Date.now().toString();
    const newMessage: IMessage = {
      id: newMessageId,
      text: selectedText,
      sender: 'user',
      isLoading: true, // Set isLoading to true
    };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    // Fetch bot response
    const botMessage = await fetchBotResponse(selectedText);

    // Update the loading state of the message
    setChatHistory((prevHistory) =>
      prevHistory.map((msg) =>
        msg.id === newMessageId ? { ...msg, isLoading: false } : msg
      )
    );

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        id: Date.now().toString(),
        text: botMessage,
        sender: 'bot',
      },
    ]);
  };

  const handleSearchActivation = async (message: string) => {
    const newMessageId = Date.now().toString();
    const newMessage: IMessage = {
      id: newMessageId,
      text: message,
      sender: 'user',
      isLoading: true, // Set isLoading to true
    };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    setIsSearchActivated(true);
    setShowRedBorderDiv(true);

    // Fetch bot response and update the white div box
    const botMessage = await fetchBotResponse(message);

    // Update the loading state of the message
    setChatHistory((prevHistory) =>
      prevHistory.map((msg) =>
        msg.id === newMessageId ? { ...msg, isLoading: false } : msg
      )
    );

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        id: Date.now().toString(),
        text: botMessage,
        sender: 'bot',
      },
    ]);
  };

  return (
    <div className="bg-main-color w-full h-screen flex flex-col justify-between fixed">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-sidebar-color transition-transform transform ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-[300px]'
        }`}
      >
        <SidebarPop credits={profile?.credits} chats={chatNames} />
      </div>

      {/* Sidebar toggle button */}
      <div className="fixed top-4 left-4 z-50 cursor-pointer" onClick={toggleSidebar}>
        <Image src="/sidebar.png" alt="Toggle Sidebar" width={40} height={40} />
      </div>

      {/* Chat Header */}
      <ChatHeader
        profileImageUrl={'/default-profile.png'}
        chatName={chatName}
        sidebarVisible={sidebarVisible}
      />

      {/* Red Border Div */}
      {showRedBorderDiv && (
        <div
          className=" mt-6 mb-6 left-1/2 transform -translate-x-1/2 w-full h-full max-w-[50%] custom-scrollbar relative"
          style={{
            top: '4rem',
            bottom: '5rem',
            maxHeight: 'calc(100% - 9rem)',
            overflowY: 'auto',
          }}
        >
          <div className="flex flex-col space-y-6 p-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className="w-full flex justify-between items-start mb-4"
              >
                <div className={`flex-shrink-0 transform translate-y-[4.5rem]`}>
                  {message.sender === 'user' && (
                    <Image
                      src={message.isLoading ? logos[logoIndex] : '/logo-chat.png'}
                      alt="Fineas Logo"
                      width={32}
                      height={75}
                    />
                  )}
                </div>
                <div className="flex justify-end w-full">
                  {message.sender === 'user' && (
                    <div className="bg-gradient-to-r from-[#3C3A8D] to-[#672BFF] text-white p-3 rounded-full max-w-full shadow-lg break-words flex justify-center items-center">
                      {message.text}
                    </div>
                  )}
                </div>

                {message.sender === 'bot' && (
                  <div className='w-[500%] border-2 border-white text-white p-4 rounded-lg shadow-lg max-w-none mb-[7rem]'>
                    <TypewriterEffect text={message.text} speed={1} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Bubbles Container */}
      <div className="flex-grow flex items-end justify-center p-4 mb-[100px] relative">
        {!isSearchActivated && !isChatBubbleClicked && (
          <>
            {/* Logo Image */}
            <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/logo-secondary.png"
                alt="Logo"
                width={100}
                height={100}
                className="relative z-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-0">
              <ChatBubble
                text="What are Nvidia's main revenue drivers?"
                onClick={() => handleChatBubbleClick("What are Nvidia's main revenue drivers?")}
              />
              <ChatBubble
                text="When will there be a recession?"
                onClick={() => handleChatBubbleClick("When will there be a recession?")}
              />
              <ChatBubble
                text="What is the news sentiment around Apple?"
                onClick={() => handleChatBubbleClick("What is the news sentiment around Apple?")}
              />
              <ChatBubble
                text="What are some booming tech stocks?"
                onClick={() => handleChatBubbleClick("What are some booming tech stocks?")}
              />
            </div>
          </>
        )}
      </div>

      {/* Search Component at the bottom */}
      <div className="p-4">
        <Search onRocketClick={handleSearchActivation} />
      </div>
    </div>
  );
};

export default Chat;
