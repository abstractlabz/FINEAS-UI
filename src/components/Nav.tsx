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
}


const Nav: React.FC<NavProps> = ({variant}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="relative flex flex-col items-start p-4 bg-alternate-color w-64 h-full">
              <button onClick={toggleMenu} className="absolute top-4 right-4">
                <Image className='text-white' src="" alt="X" />
              </button>
              <h2 className="text-white text-xl mb-4">Navigation</h2>
              <Linker href="/chat" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/chat-icon.svg" alt="" width={50} height={50} />
                <span className="ml-2">Chat</span>
              </Linker>
              <Linker href="/" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/analysis-icon.svg" alt="" width={50} height={50} />
                <span className="ml-2 text-white">Analysis</span>
              </Linker>
              <Linker href="https://buy.stripe.com/14k9D692d0IM8O47ss" onClick={toggleMenu} className="flex items-center text-white mb-2">
                <Image src="icons/members-icon.svg" alt="" width={50} height={50} />
                <span className="ml-2">Members</span>
              </Linker>
              <SignInComponent />
            </div>
          </div>
        )}

      {isMenuOpen && isChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="relative flex flex-col items-start p-4 bg-alternate-color w-64 h-full">
            <button onClick={toggleMenu} className="absolute top-4 right-4">
              <Image className='text-white' src="" alt="X" />
            </button>
            <h2 className="text-white text-xl mb-4">Navigation</h2>
            <Linker href="/chat" onClick={toggleMenu} className="flex items-center text-white mb-2">
              <Image src="icons/chat-icon.svg" alt="" width={47} height={47} />
              <span className="ml-2 text-white">Chat</span>
            </Linker>
            <Linker href="/" onClick={toggleMenu} className="flex items-center text-white mb-2">
              <Image src="icons/analysis-icon.svg" alt="" width={52} height={52} />
              <span className="ml-2 text-white">Analysis</span>
            </Linker>
            <Linker href="https://buy.stripe.com/14k9D692d0IM8O47ss" onClick={toggleMenu} className="flex items-center text-white mb-2">
              <Image src="icons/members-icon.svg" alt="" width={52} height={52} />
              <span className="ml-2 text-white">Members</span>
            </Linker>
            <SignInComponent />
            {/* Assuming ChatSearch respects the popoverOpen prop for its internal state */}
            <ChatSearch popoveropen={isMenuOpen} />
            <Input placeholder="Enter Chat Name..." className='w-full mt-[275px]' />
            <Button className='w-full h-10 rounded-md mt-[8px] justify-between bg-black text-white flex justify-center items-center bg-blue-700'>Save Chat</Button>
          </div>
        </div>
      )}

        {/* Regular Navbar for Larger Screens */}
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <Link href="/" className='text-white'>Analysis</Link>
          <Link href="/chat" className='text-white' aria-current="page">Chat</Link>
          <Link href="https://buy.stripe.com/14k9D692d0IM8O47ss" className='text-white' aria-current="page">Members</Link>
          {/* Add other NavbarItems here */}
          <SignInComponent />
        </NavbarContent>
      </Navbar>
    </GoogleOAuthProvider>
  );
}

export default Nav;
