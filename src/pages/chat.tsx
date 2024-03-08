"use client"
import React from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { ChatSearch } from '@/components/chatsearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Chat: React.FC = () => {
  return (
    <div className="bg-main-color w-full h-full">
      <Nav variant="chat" />
      <div className="flex h-full pt-2"> {/* Replace [height_of_nav] with the actual height of your Nav component */}
        <div className="p-1 border w-64 rounded-lg h-[100vh] bg-alternate-color fixed left-0 overflow-auto z-10000">
          <ChatSearch />
          <Input placeholder="Enter Chat Name..." className='w-full mt-[325px]' />
          <Button variant="default" className='w-full h-10 rounded-md mt-[8px] justify-between bg-black text-white flex justify-center items-center'>Save Chat</Button>
        </div>
        <div className="flex-1 pl-64 flex flex-col items-center h-[85.25vh] pt-0"> {/* Removed justify-center to align the card to the top */}
          <Card className="glowing-border border shadow-xl w-4/5 bg-main-color overflow-hidden h-[78vh] mb-10"> {/* Adjust the margin-bottom as needed */}
            <CardHeader>
              <CardTitle>Discover Stock Market Alpha!</CardTitle>
            </CardHeader>
            <CardContent className="mb-22"> {/* Adjust the margin-bottom to create space for input and button */}
              <p>Chat Content</p>
            </CardContent>
            {/* The CardFooter or a similar div can be used to hold the Input and Button */}
            <div className="flex absolute bottom-0 py-19"> {/* You might need to adjust the padding */}
              <Input className="w-[100vh] mb-2 pl-2" placeholder="Type your question here..."></Input>
              <Button className="w-[45vh] mb-2">Chat to me!</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
