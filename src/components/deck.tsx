import {
    Card,
    CardContent,
  } from "@/components/ui/card";
  import CandleChart from "./ui/chart";
  import { Combobox } from "@/components/combobox";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import React from 'react';
  import { Button } from "@/components/ui/button";
  
  const Deck: React.FC = () => {
    return (
      <div className="flex justify-center items-center p-4 pt-10">
        <Card className="glowing-border p-1 border shadow-xl h-[70vh] w-full max-w-[200vh] bg-main-color overflow-hidden">
          <CardContent className="flex items-start h-full">
            {/* Adjust the layout for Combobox and Button */}
            <div className="flex flex-col w-1/4"> {/* Use flex-col for vertical stacking */}
              <Combobox />
            </div>
  
            {/* Tabs */}
            <div className="flex-grow w-1/2"> {/* Tabs, fixed width with a little right padding */}
              <Tabs defaultValue="price" className="w-full">
                <TabsList>
                  <TabsTrigger value="price">Price Info</TabsTrigger>
                  <TabsTrigger value="news">News Info</TabsTrigger>
                  <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                </TabsList>
                <TabsContent value="price">Price Information</TabsContent>
                <TabsContent value="news">News Information</TabsContent>
                <TabsContent value="technical">Technical Analysis Details</TabsContent>
                <TabsContent value="financials">Financial Details</TabsContent>
              </Tabs>
            </div>
  
            {/* CandleChart */}
            <div className="flex-grow h-full">
              <CandleChart />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Deck;
  