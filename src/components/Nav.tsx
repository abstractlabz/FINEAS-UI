"use client"
import React, { useState, useEffect } from 'react';
import Linker from 'next/link';
import { Link, Navbar, NavbarBrand, Button, NavbarContent } from "@nextui-org/react";
import LogoMain from "./ui/logo-main";
import SignInComponent from "./sign-in";
import menubar from "../../public/menu-bar.png";
import Image from 'next/image';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {ChatSearch} from './chatsearch';
import { Input } from "@/components/ui/input"

// Import Icons (replace these imports with your actual icons)

{/* <Nav 
import ChatIcon from '../../public/icons/chat-icon.svg'; // Placeholder path
import AnalysisIcon from '../../public/icons/analysis-icon.svg'; // Placeholder path
import CloseIcon from '../../public/icons/close-icon.svg'; // Placeholder path
/> */}


interface NavProps {
  variant: string;
  onChatSelect: (chatName: string) => void;
  selectedChatName?: string;
  chatNames: string[];
  saveChat: () => void; // Assuming saveChat is a function that returns a promise
  loadChat: (name: string) => void; // Assuming loadChat is also a promise-returning function
  chatName: string;
  setChatName: React.Dispatch<React.SetStateAction<string>>;
}


const Nav: React.FC<NavProps> = ({
  variant,
  onChatSelect,
  selectedChatName,
  chatNames,
  saveChat,
  loadChat,
  chatName,
  setChatName
}) => {  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // set varianle to true if variant is equal to chat
  let isChat = variant === "chat";

  return (
    <GoogleOAuthProvider clientId="684619174291-3515q33o0vl2spdq5t0ur23f7sepgk26.apps.googleusercontent.com">
      <Navbar className='relative bg-main-color pr-4 overflow-auto' style={{ zIndex: 50 }}>
        <NavbarBrand>
          <LogoMain />
        </NavbarBrand>
        <div className="sm:hidden">
          <Button onClick={toggleMenu}>
            <Image src={menubar} alt="Menu" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !isChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto">
            <div className="relative flex flex-col items-start p-4 bg-main-color w-64 h-[100%]">
              <button onClick={toggleMenu} className="absolute top-4 right-4">
                <Image className='text-white' width={35} height={35} src="icons/close-circle-icon.svg" alt="X" />
              </button>
              <h2 className="text-white text-xl mb-4">Navigation</h2>
              <Linker href="/chat" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/chat-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2">Chat</span>
              </Linker>
              <Linker href="/" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/analysis-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2 text-white">Analysis</span>
              </Linker>
              {/*  
              <Linker href="/checkout" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/members-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2">Upgrade</span>
              </Linker>
              */}
              <SignInComponent />
            </div>
          </div>
        )}

        {isMenuOpen && isChat && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto">
            <div className="relative flex flex-col items-start p-4 bg-main-color w-64 h-full">
              <button onClick={toggleMenu} className="absolute top-4 right-4">
                <Image className='text-white' width={35} height={35} src="icons/close-circle-icon.svg" alt="X" />
              </button>
              <h2 className="text-white text-xl mb-4">Navigation</h2>
              <Linker href="/chat" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/chat-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2 text-white">Chat</span>
              </Linker>
              <Linker href="/" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/analysis-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2 text-white">Analysis</span>
              </Linker>
              {/*
              <Linker href="/checkout" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/members-icon.svg" alt="" width={40} height={40} />
                <span className="ml-2 text-white">Upgrade</span>
              </Linker>
                */}
              <SignInComponent />
              <div className="flex flex-col items-center w-full mt-auto">
                <div className='max-h-48 min-h-64 mb-4 mt-[10px]'> {/* Adjust margin-bottom as needed */}
                  <ChatSearch popoveropen={isMenuOpen} chatNames={chatNames} onChatSelect={onChatSelect} />
                </div>
                <Input 
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder="Enter Chat Name..."
                  className='w-full mb-0 mt-[50px]' // Adjusted for closer spacing
                />
                <Button 
                  onClick={saveChat} 
                  className='w-full my-4 mb-4 h-8 rounded-md bg-black text-white flex justify-center items-center bg-blue-700'
                >
                  Save Chat
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Navbar for Larger Screens */}
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <Link href="/" className='text-white'>Analysis</Link>
          <Link href="/chat" className='text-white' aria-current="page">Chat</Link>
          {/* 
          <Link href="/checkout" className='text-white' aria-current="page">Upgrade</Link>
          */}
          <SignInComponent />
        </NavbarContent>
      </Navbar>
    </GoogleOAuthProvider>
  );
}

export default Nav;
