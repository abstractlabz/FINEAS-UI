import React from 'react';
import { Combobox } from "@/components/combobox";
import Deck from '@/components/deck';

const Analysis: React.FC = () => {
    return (
        <> 
        <div className='bg-main-color'>
        <Deck />
        <p>*Not financial advice</p>
        </div>
        </>  
    );
};

export default Analysis;