import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { ChatSearch } from '@/components/chatsearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
    <div className="bg-main-color w-full h-screen overflow-hidden">
      <Nav
        variant='chat'
        onChatSelect={handleChatSelect}
        chatNames={chatNames}
        selectedChatName={selectedChatName}
        saveChat={saveChat}
        loadChat={loadChat}
        chatName={chatName}
        setChatName={setChatName}
      />
      <div className="flex h-full pt-2">
        <div className="hidden md:flex md:flex-col md:fixed md:left-0 p-1 border w-64 rounded-lg h-[80vh] bg-main-color overflow-auto md:z-10 lg:z-20">
          <div className='flex justify-center'>
            <ChatSearch popoveropen={popoverOpen} chatNames={chatNames} onChatSelect={handleChatSelect} />
          </div>
          <Input 
            value={chatName} 
            onChange={(e) => setChatName(e.target.value)} 
            placeholder="Enter Chat Name..." 
            className='w-full mt-[60vh]' />
          <Button 
            onClick={saveChat} 
            variant="default" 
            className='w-full h-10 rounded-md mt-[8px] justify-between bg-blue-700 text-white flex justify-center items-center'>
              Save Chat
          </Button>
        </div>
        <div className="flex-1 md:pl-64 pl-0 flex flex-col items-center h-[85.25vh] pt-0">
        <Card className="mt-[35px] glowing-border border shadow-xl w-[85%] max-w-[86%] bg-main-color overflow-hidden h-[100%] text-white flex flex-col bg-opacity-75 z-10">
        <CardHeader className='flex-row '>
          <CardTitle className='flex flex-row'>
            Generate Alpha! 🚀
            <Button 
            onClick={() => deleteChat(chatName)}
            variant="default" 
            className='max-w-[65px] h-8 rounded-md ml-[20px] justify-between bg-blue-700 text-white flex justify-center items-center'>
              -
          </Button> 
          <Button 
            onClick={() => newChat()}
            variant="default" 
            className='max-w-[65px] h-8 rounded-md ml-[12px] justify-between bg-blue-700 text-white flex justify-center items-center'>
              +
          </Button>
            </CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto overflow-x-auto flex-1 px-4 py-2">
          {chatHistory?.map((msg, index, arr) => {
            const isPairStart = index === 0 || arr[index - 1]?.sender !== msg.sender;
            return (
              <div key={msg.id} className={`messagePair ${isPairStart ? 'start' : ''}`}>
                {msg.sender === 'user' && (
                  <img
                    src={profile?.picture}
                    alt=""
                    className="userImage"
                  />
                )}
                <div className={`${msg.sender}Message`}>
                  {msg.sender === 'bot' && msg.animate ? (
                    <TypewriterEffect text={msg.text} speed={10} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="w-full flex justify-between items-center p-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)} 
            className="max-w-[80%] sm:max-w-[85%] md:max-w-[87%] lg:max-w-[89%] mb-2 pl-2 text-black" 
            placeholder="Type your question here..." />
            <div className="relative inline-flex items-center">
              <button 
                onClick={!isLoading ? checkCreditsAndSendMessage : undefined} 
                className={`ml-2 bg-blue-700 text-white rounded-lg px-4 py-3 ${isLoading ? 'bg-blue-300' : ''}`}
                disabled={isLoading || !isLoggedIn}
              >
                {!isLoading ? 'Chat' : 'Sending...'}
              </button>
              {isLoading && (
                <div className="absolute right-0 top-0 mr-3 mt-3">
                  <div className="loader"></div> 
                </div>
              )}
            </div>
        </CardFooter>
      </Card>
          <p className='text-white absolute-0 mt-8'>Credits Available: {profile?.credits}</p>
          {isLoading && <div>Loading...</div>}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              {modalContent}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Chat;