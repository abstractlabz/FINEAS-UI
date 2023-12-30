import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import LogoMain from "./ui/logo-main";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import SignInComponent from "./sign-in";

const Nav = () => {


  // log out function to log the user out of google and set the profile array to null

    return (   
        <Navbar>
            <NavbarBrand>
              <LogoMain />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link color="foreground" href="/chat">
                  Chat
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link href="/markets" aria-current="page">
                  Markets
                </Link>
              </NavbarItem>
              <NavbarItem>
              <SignInComponent/>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
              </NavbarItem>
            </NavbarContent>
          </Navbar>
    );
    
}

export default Nav;