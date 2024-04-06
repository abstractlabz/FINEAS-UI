import React from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { SelectForm } from '@/components/profileform';

const Members: React.FC = () => {
  return (
    <>
      <Nav variant="" onChatSelect={function (chatName: string): void {
        throw new Error('Function not implemented.');
      } } chatNames={[]} saveChat={function (): void {
        throw new Error('Function not implemented.');
      } } loadChat={function (name: string): void {
        throw new Error('Function not implemented.');
      } } chatName={''} setChatName={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="bg-main-color w-full h-[100vh] flex justify-center items-center">
          <div className='flex flex-col rounded-lg p-8 bg-alternate-color items-center'>
              <SelectForm />
          </div>
      </div>
    </>
  );
};

export default Members;
