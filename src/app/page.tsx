"use client"
import Analysis from "./analysis";
import Nav from "../components/Nav";
import { SetStateAction } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleToken: string = process.env.NEXT_PUBLIC_GOOGLE_AUTH?.toString() || '';

export default function Home() {
  return (

    <>  
    <GoogleOAuthProvider clientId={googleToken}>      
      <div className="bg-main-color h-screen w-full">
      <Nav variant="" onChatSelect={function (chatName: string): void {
          throw new Error("Function not implemented.");
        } } chatNames={[]} saveChat={function (): void {
          throw new Error("Function not implemented.");
        } } loadChat={function (name: string): void {
          throw new Error("Function not implemented.");
        } } chatName={""} setChatName={function (value: SetStateAction<string>): void {
          throw new Error("Function not implemented.");
        } } />
      <Analysis />
    </div>
    </GoogleOAuthProvider>
    </>

  );
}
