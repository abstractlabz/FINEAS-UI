"use client"
import React, { useState, useEffect } from 'react';
import Linker from 'next/link';
import { Link, Navbar, NavbarBrand, Button, NavbarContent } from "@nextui-org/react";
import LogoMain from "./ui/logo-main";
import SignInComponent from "./sign-in";
import menubar from "../../public/menu-bar.png";
import Image from 'next/image';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import Icons (replace these imports with your actual icons)

{/* <Nav 
import ChatIcon from '../../public/icons/chat-icon.svg'; // Placeholder path
import AnalysisIcon from '../../public/icons/analysis-icon.svg'; // Placeholder path
import CloseIcon from '../../public/icons/close-icon.svg'; // Placeholder path
/> */}

const Nav = () => {
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

  return (
    <GoogleOAuthProvider clientId="684619174291-3515q33o0vl2spdq5t0ur23f7sepgk26.apps.googleusercontent.com">
      <Navbar style={{ zIndex: 1000 }}>
        <NavbarBrand>
          <LogoMain />
        </NavbarBrand>
        <div className="sm:hidden">
          <Button onClick={toggleMenu}>
            <Image src={menubar} alt="Menu" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="relative flex flex-col items-start p-4 bg-alternate-color w-64 h-full">
              <button onClick={toggleMenu} className="absolute top-4 right-4">
                <Image src="" alt="X" />
              </button>
              <h2 className="text-black text-xl mb-4">Navigation</h2>
              <Linker href="/chat" onClick={toggleMenu} className="flex items-center text-black mb-2">
                <Image src="" alt="" width={24} height={24} />
                <span className="ml-2">Chat</span>
              </Linker>
              <Linker href="/" onClick={toggleMenu} className="flex items-center text-black mb-2">
                <Image src="" alt="" width={24} height={24} />
                <span className="ml-2">Analysis</span>
              </Linker>
              <SignInComponent />
            </div>
          </div>
        )}

        {/* Regular Navbar for Larger Screens */}
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <Link href="/">Analysis</Link>
          <Link href="/chat" aria-current="page">Chat</Link>
          {/* Add other NavbarItems here */}
          <SignInComponent />
        </NavbarContent>
      </Navbar>
    </GoogleOAuthProvider>
  );
}

export default Nav;
