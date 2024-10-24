"use client"
import Analysis from "./analysis";
import Nav from "../components/Nav";
import { SetStateAction, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatHeader from "@/components/navheader";
import Image from "next/image";
import { Combobox } from "@/components/combobox";
import CandleChart from "@/components/ui/chart";

const googleToken: string = process.env.NEXT_PUBLIC_GOOGLE_AUTH?.toString() || '';

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState<string>(''); // Placeholder for selected ticker value


  // Sidebar toggle handler
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>  
      <GoogleOAuthProvider clientId={googleToken}>
        {/* Sidebar toggle button */}
        <div className="bg-main-color fixed top-0 left-0 w-full h-full">
          <div className="fixed top-4 left-4 z-50 cursor-pointer" onClick={toggleSidebar}>
            <Image src="/sidebar.png" alt="Toggle Sidebar" width={40} height={40} />
          </div>      
          <div className="bg-main-color h-screen w-full">
            <div>
            <ChatHeader chatName={""} sidebarVisible={false} />
            <div className="mt-[-55px] h-[60px] w-[80%] mx-right ml-[4.5%]">
              {/* Your content here */}
            </div>
            </div>
            {/* New div added below the ChatHeader */}
            <div className=" ml-[4.5%] mt-12 h-[80px] w-full">
              <Combobox setSelectedTicker={setSelectedTicker} />
            </div>
            <div className="w-[40%] ml-[4.5%] md:flex-grow relative max-h-[200p] border-[#3C3A8D] border-2 rounded-lg">
            <CandleChart ticker={selectedTicker} />
          </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
