import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { ChatSearch } from '@/components/chatsearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Search from '@/components/search';
import Image from 'next/image';
import Cookies from 'js-cookie';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from 'axios';
import TypewriterEffect from '@/components/ui/typewriter';
import Modal from "@/components/ui/modal";
import SignInComponent from '../components/sign-in';
import { useRouter } from 'next/router';
import ChatBubble from '@/components/chatbubble';
import ChatHeader from '@/components/navheader';

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
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [chatName, setChatName] = useState('');
  const [chatNames, setChatNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [selectedChatName, setSelectedChatName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkScreenSize = () => {
      const match = window.matchMedia('(min-width: 768px)').matches;
      setPopoverOpen(match);
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
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Please select a ticker for analysis</div>);
      setIsModalOpen(true);
    }
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
  
  const checkCreditsAndSendMessage = async () => {
    if (message.trim() === '') {
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Please enter a message</div>);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    const userMessage: IMessage = { id: Date.now().toString(), text: message, sender: 'user' };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const creditCheckResponse = await axios.post('https://upgrade.fineasapp.io:2096/enforce-credits', { id_hash: profile?.id_hash });
      if (creditCheckResponse.data.creditsLeft === 0) {
        setModalContent(<div className='mb-4 items-center flex justify-center items-center'>You have run out of credits</div>);
        setIsModalOpen(true);
        setIsLoading(false);
        return;
      }

      const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN?.toString() || '';
      const response = await axios.post('https://query.fineasapp.io:443/chat', {
        prompt: message  // Send the prompt in the request body
      }, {
        headers: {
          Authorization: 'Bearer ' + bearerToken,
          'Content-Type': 'application/json'  // Set content type to JSON
        }
      });

      const botMessage: IMessage = { id: (Date.now() + 1).toString(), text: response.data, sender: 'bot', animate: true };
      setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message or check credits', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Failed to send message or check credits</div>);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteChat = async (chatName: string) => {
    setIsLoading(true);
    try {
      await axios.get('https://upgrade.fineasapp.io:2096/delete-chats', {
        params: {
          chatname: selectedChatName.toLowerCase().trim(),
          id_hash: profile?.id_hash
        }
      });
      setChatNames(chatNames.filter((name) => name.toLowerCase().trim() !== chatName.toLowerCase().trim()));
      setChatHistory([]);
      setSelectedChatName('');
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Chat Deleted Successfully</div>);
      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to delete chat', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Failed to delete chat</div>);
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const newChat = async () => {
    setIsLoading(true);
    try {
      refreshPage();
    } catch (error) {
      console.error('Failed to create chat', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Failed to create chat</div>);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChat = async () => {
    if (chatName.trim() === '') {
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Provide a name for chat before saving</div>);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('https://upgrade.fineasapp.io:2096/savechat', {
        chatname: chatName.toLowerCase().trim(),
        id_hash: profile?.id_hash,
        chat_history: chatHistory
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setChatNames([...chatNames, chatName.toLowerCase().trim()]);
      setChatName('');
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Chat saved Successfully</div>);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to save chat', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Failed to save chat</div>);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = async (chatName: string) => {
    setSelectedChatName(chatName.toLowerCase().trim());
    await loadChat(chatName.toLowerCase().trim());
  };

  // Sample click handler for the chat bubbles
  const handleChatBubbleClick = (text: string) => {
    console.log(`You clicked: ${text}`);
    setMessage(text); // Set the message in the input box (or handle as needed)
  };


  const loadChat = async (name: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://upgrade.fineasapp.io:2096/loadchat', {
        chatname: name.toLowerCase().trim(),
        id_hash: profile?.id_hash
      });
      setChatHistory(response.data.chat_history);
    } catch (error) {
      console.error('Failed to load chat', error);
      setModalContent(<div className='mb-4 items-center flex justify-center items-center'>Failed to load chat</div>);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-main-color w-full h-screen flex flex-col justify-between overflow-hidden">
      {/* Chat Header */}
      <ChatHeader profileImageUrl={'/default-profile.png'} chatName={chatName} />
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
          {/* Render 4 static chat bubbles */}
          <ChatBubble text="What are Nvidia's main revenue drivers?" onClick={() => handleChatBubbleClick("What are NVIDIA's main revenue drivers?")} />
          <ChatBubble text="When will there be a recession?" onClick={() => handleChatBubbleClick("What are NVIDIA's main revenue drivers?")} />
          <ChatBubble text="What is the news sentiment around Apple?" onClick={() => handleChatBubbleClick("What are NVIDIA's main revenue drivers?")} />
          <ChatBubble text="What are some booming tech stocks?" onClick={() => handleChatBubbleClick("What are NVIDIA's main revenue drivers?")} />
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
