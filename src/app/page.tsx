"use client"
import Analysis from "./analysis";
import Nav from "../components/Nav";

export default function Home() {
  return (

    <>      
      <div className="bg-main-color h-screen w-full">
      <Nav variant="" />
      <Analysis />
    </div>
    </>
  );
}
