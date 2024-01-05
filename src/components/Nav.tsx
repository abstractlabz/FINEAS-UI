import React, { useState, useEffect } from 'react';
import { Link, Navbar, NavbarBrand, NavbarItem, Button, NavbarContent } from "@nextui-org/react";
import LogoMain from "./ui/logo-main";
import SignInComponent from "./sign-in";
import menubar from "../../public/menu-bar.png";
import Image from 'next/image';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when the window is resized to a wider screen
  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
          if (window.innerWidth >= 640) { // Adjust this value based on your breakpoint
              setIsMenuOpen(false);
          }
      };

      // Check if window is defined (client-side)
      if (typeof window !== 'undefined') {
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }
  }, []);

    return (
        <Navbar style={{ zIndex: 1000 }}>
            <NavbarBrand>
                <LogoMain />
            </NavbarBrand>
            <div className="sm:hidden">
                <Button auto flat onClick={toggleMenu}>
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
                            <Link className='text-black' color="foreground" href="/chat" onClick={toggleMenu}>Chat</Link>
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
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/chat">Chat</Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="/markets" aria-current="page">Markets</Link>
                </NavbarItem>
                <NavbarItem>
                    <SignInComponent />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default Nav;
