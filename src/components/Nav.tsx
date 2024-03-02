"use client"

import React, { useState, useEffect } from 'react';
import Linker from 'next/link';
import { Link, Navbar, NavbarBrand, NavbarItem, Button, NavbarContent } from "@nextui-org/react";
import LogoMain from "./ui/logo-main";
import SignInComponent from "./sign-in";
import menubar from "../../public/menu-bar.png";
import Image from 'next/image';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when the window is resized to a wider screen
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
          <div className="relative flex flex-col items-start p-4 bg-white w-64 h-full">
            <button onClick={toggleMenu} className="absolute top-4 right-4">
              <img className="text-black" src="/path-to-close-icon.svg" alt="x" /> {/* Replace with your close icon */}
            </button>
            <NavbarItem>
              <Linker className='text-black' color="foreground" href="/chat" onClick={toggleMenu}>Chat</Linker>
            </NavbarItem>
            <NavbarItem>
              <Link className='text-black' href="/markets" aria-current="page" onClick={toggleMenu}>Markets</Link>
            </NavbarItem>
            <NavbarItem>
              <SignInComponent />
            </NavbarItem>
          </div>
        </div>
      )}

      {/* Regular Navbar for Larger Screens */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link href="/analysis">Analysis</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/chat" aria-current="page">Chat</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/members" aria-current="page">Members</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/faq" aria-current="page">FAQ</Link>
        </NavbarItem>
        <NavbarItem>
          <SignInComponent />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </GoogleOAuthProvider>
  );
}

export default Nav;