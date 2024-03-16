import React from 'react';
import Nav from '../components/Nav';
import "@/app/globals.css"
import { SelectForm } from '@/components/profileform';

const Members: React.FC = () => {
  return (
    <>
      <Nav variant="" />
      <div className="bg-main-color w-full h-[100vh] flex justify-center items-center">
          <div className='flex flex-col rounded-lg p-8 bg-alternate-color items-center'>
              <SelectForm />
          </div>
      </div>
    </>
  );
};

export default Members;
