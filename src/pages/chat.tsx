import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { ChatSearch } from '@/components/chatsearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Chat: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(true);

  useEffect(() => {
    const updatePopover = () => {
      const width = window.innerWidth;
      if (width < 768) { // Assuming 768px is the breakpoint for small mobile screens
        setPopoverOpen(false);
      } else {
        setPopoverOpen(true);
      }
    };

    // Call once to set initial state correctly
    updatePopover();

    // Add event listener
    window.addEventListener('resize', updatePopover);

    // Cleanup
    return () => window.removeEventListener('resize', updatePopover);
  }, []);

  return (
    <div className="bg-main-color w-full h-full">
      <Nav variant="chat" />
      <div className="flex h-full pt-2">
        <div className="hidden md:flex md:flex-col md:fixed md:left-0 p-1 border w-64 rounded-lg h-[100vh] bg-alternate-color overflow-auto md:z-10 lg:z-20">
          <ChatSearch popoveropen={popoverOpen} />
          <Input placeholder="Enter Chat Name..." className='w-full mt-[325px]' />
          <Button variant="default" className='w-full h-10 rounded-md mt-[8px] justify-between bg-black text-white flex justify-center items-center'>Save Chat</Button>
        </div>
        <div className="flex-1 md:pl-64 pl-0 flex flex-col items-center h-[85.25vh] pt-0">
          <Card className="glowing-border border shadow-xl w-4/5 bg-main-color overflow-hidden relative h-[78vh] mb-10">
            <CardHeader>
              <CardTitle>Discover Stock Market Alpha!</CardTitle>
            </CardHeader>
            <CardContent className="mb-50">
              <p>Chat Content</p>
            </CardContent>
            <CardFooter className="w-[15%] mb-2">
              <Button className='w-[8%] absolute bottom-2 right-2 z-10'>Chat</Button>
            </CardFooter>
            <div className='pl-4'>
              <Input className="max-w-[80%] sm:max-w-[85%] md:max-w-[87%] lg:max-w-[89%] mb-2 pl-2 absolute bottom-0" placeholder="Type your question here..."></Input>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
