import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import CandleChart from "./ui/chart";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Deck: React.FC = () => {
  return (
    <div className="flex justify-center items-center md:p-4 sm:p-1 pt-6">
      <Card className="glowing-border p-1 border shadow-xl w-full max-w-[230vh] bg-main-color overflow-hidden relative" style={{ minHeight: '5vh' }}>
      <CardContent className="flex flex-col items-start space-y-8 2xl:space-y-0 lg:flex-row 2xl:items-start relative" style={{ gap: '25px' }}>
          {/* Combobox and Generate Analysis button grouping, adjusted for vertical spacing */}
          <div className="w-full lg:w-1/4 flex justify-center items-center flex-col mb-6 relative">
            <Combobox />
            <Button className="w-full mt-[435px] self-start bg-blue-700">Generate Analysis</Button>
          </div>

          {/* Tabs */}
          <div className="w-full md:flex-grow mb-6 flex justify-center">
            <Tabs defaultValue="price" className="w-full">
              <TabsList className='w-full flex justify-center'>
                <TabsTrigger className='text-xs md:text-lg' value="price">Price Info</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="news">News Info</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="technical">Technicals</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="financials">Financials</TabsTrigger>
              </TabsList>
              <TabsContent className='text-white' value="price">Price Information</TabsContent>
              <TabsContent className='text-white' value="news">News Information</TabsContent>
              <TabsContent className='text-white' value="technical">Technical Analysis Details</TabsContent>
              <TabsContent className='text-white' value="financials">Financial Details</TabsContent>
            </Tabs>
          </div>

          {/* CandleChart, adjusted for vertical spacing */}
          <div className="w-full md:flex-grow mb-6 relative">
            <CandleChart />
            {/* Credits positioned at the same level as the Chart */}
          </div>
          <div className='absolute bottom-0 right-4 m-12 text-s text-white-400'>
            <p className='text-white'>Credits Available: 5</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deck;
