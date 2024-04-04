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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from 'axios';
import TypewriterEffect from '@/components/ui/typewriter';

interface IMessage {
  id: string; // or number based on your ID system
  text: string;
  sender: 'user' | 'bot';
  animate?: boolean;
  animatedText?: string;
}

interface UserProfile {
  picture: string;
  id_hash: string;
  stripe_customer_id: string;
  email: string;
  credits: number;
  is_member: boolean;
  
  // Add other user profile fields as needed
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<IMessage[]>([]);
  const [chatName, setChatName] = useState('');
  const [chatNames, setChatNames] = useState<string[]>([]); // For sidebar combobox
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to check and set state based on screen width
    const checkScreenSize = () => {
      // This matches screen sizes larger than 767px
      const match = window.matchMedia('(min-width: 768px)').matches;

      setPopoverOpen(match);
    };

    // Call once to set initial state
    checkScreenSize();

    // Listen for screen resize events
    window.addEventListener('resize', checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const fetchChatNames = async (profile: UserProfile | null) => {
    try {
      const response = await axios.get('http://localhost:7002/get-chat-names', { params: { id_hash: profile?.id_hash } });
      // Adjust according to the actual structure of the response
      setChatNames(response.data); // Assuming response.data directly contains the array of chat names
    } catch (error) {
      console.error('Failed to fetch chat names', error);
      setError('Failed to load chat names. Please try again.');
    }
  };
  
  useEffect(() => {
    const savedProfile = Cookies.get('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile) as UserProfile;
      setProfile(profileData);
      fetchChatNames(profileData); // Pass the directly obtained profileData
    }
  }, []);


const checkCreditsAndSendMessage = async () => {
  if (message.trim() === '') {
    alert('Please enter a message.');
    return;
  }

  setIsLoading(true);

  // Add the user's message immediately to the chat history
  const userMessage: IMessage = { id: Date.now().toString(), text: message, sender: 'user' };
  setChatHistory([...chatHistory, userMessage]);

  try {
    const creditCheckResponse = await axios.post('http://localhost:7002/enforce-credits', { id_hash: profile?.id_hash });
    if (creditCheckResponse.data.creditsLeft === 0) {
      alert('You have run out of credits.');
      setIsLoading(false);
      return;
    }

    const response = await axios.post('https://query.fineasapp.io:443/chat', null, {
      params: {
        prompt: message
      },
      headers: {
        Authorization: 'Bearer 671b31a4e4d59e1f4e344e91fb343c6988462a0afcf828bcd3f55404058819f2'
      }
    });

    // Once the bot's response is received, add it to the chat history with animate property
    const botMessage: IMessage = { id: (Date.now() + 1).toString(), text: response.data, sender: 'bot', animate: true };
    setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);

    setMessage(''); // Clear the input after sending
  } catch (error) {
    console.error('Failed to send message or check credits', error);
    setError('Failed to send message. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const saveChat = async () => {
    if (chatName.trim() === '') {
      alert('Please provide a name for the chat before saving.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Corrected Axios call to send data as a JSON body
      await axios.post('http://localhost:7002/savechat', {
        chatname: chatName,
        id_hash: profile?.id_hash,
        chat_history: chatHistory
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setChatNames([...chatNames, chatName]);
      setChatName(''); // Clear chat name input
      alert('Chat saved successfully.');
    } catch (error) {
      console.error('Failed to save chat', error);
      setError('Failed to save chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const loadChat = async (name: string) => {
    setIsLoading(true);

    try {
      // Example API call to load chat by name
      const response = await axios.get('http://localhost:7002/loadchat', { params: { chatName: name, id_hash: profile?.id_hash } });
      setChatHistory(response.data.chatHistory);
    } catch (error) {
      console.error('Failed to load chat', error);
      setError('Failed to load chat. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  // UI rendering and logic to handle chat name selection, input changes, etc., goes here...
  // Note: This is a foundational implementation. You'll need to adjust it based on your backend API structure and frontend components.


  return (
    <div className="bg-main-color w-full h-full">
      <Nav variant="chat" />
      <div className="flex h-full pt-2">
        <div className="hidden md:flex md:flex-col md:fixed md:left-0 p-1 border w-64 rounded-lg h-[100vh] bg-alternate-color overflow-auto md:z-10 lg:z-20">
          <div className='flex justify-center'>
            <ChatSearch popoveropen={popoverOpen} chatNames={chatNames} />
          </div>
          <Input 
            value={chatName} 
            onChange={(e) => setChatName(e.target.value)} 
            placeholder="Enter Chat Name..." 
            className='w-full mt-[325px]' />
          <Button 
            onClick={saveChat} 
            variant="default" 
            className='w-full h-10 rounded-md mt-[8px] justify-between bg-black text-white flex justify-center items-center'>
              Save Chat
          </Button>
        </div>
        <div className="flex-1 md:pl-64 pl-0 flex flex-col items-center h-[85.25vh] pt-0">
        <Card className="glowing-border border shadow-xl w-4/5 bg-main-color overflow-hidden h-[78vh] mb-10 text-white flex flex-col">
        <CardHeader>
          <CardTitle>Discover Stock Market Alpha with Fineas.AI's Chatbot!</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto flex-1 px-4 py-2">
          {chatHistory.map((msg, index) => (
            <div key={msg.id} className={`message ${msg.sender} mb-2`}>
              {msg.sender === 'bot' && msg.animate ? (
                <TypewriterEffect text={msg.text} speed={10} />
              ) : (
                msg.text
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="w-full flex justify-between items-center p-4">
          <Input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            className="max-w-[80%] sm:max-w-[85%] md:max-w-[87%] lg:max-w-[89%] mb-2 pl-2 text-black" 
            placeholder="Type your question here..." />
          <Button 
            onClick={checkCreditsAndSendMessage} 
            className='ml-2 bg-blue-700 text-white rounded-lg px-4 py-2'>
              Chat
          </Button>
        </CardFooter>
      </Card>


          {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
  
  
};

export default Chat;
