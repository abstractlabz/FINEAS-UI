import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import LogoMain from "./ui/logo-main";

const Nav = () => {

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
                <Button>
                    Log In
                </Button>
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