import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import CandleChart from "./ui/chart";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Deck: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4 pt-3.5">
      <Card className="glowing-border p-1 border shadow-xl w-full max-w-[230vh] bg-main-color overflow-hidden relative" style={{ minHeight: '70vh' }}>
        <CardContent className="flex flex-col items-start space-y-36 md:space-y-0 md:flex-row md:items-start" style={{ gap: '25px' }}>
          {/* Combobox and Generate Analysis button grouping, adjusted for vertical spacing */}
          <div className="w-full md:w-1/4 flex flex-col mb-6">
            <Combobox />
            <Button className="mt-[300px] self-start">Generate Analysis</Button>
          </div>

          {/* Tabs */}
          <div className="w-full md:flex-grow mb-6">
            <Tabs defaultValue="price" className="w-full">
              <TabsList>
                <TabsTrigger value="price">Price Info</TabsTrigger>
                <TabsTrigger value="news">News Info</TabsTrigger>
                <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
              </TabsList>
              <TabsContent value="price">Price InformationPrice InformationPrice InformationrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforrmationPrice InformationPrice InformationPrice InforPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informate InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informate InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informate InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informatee InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informate InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informate InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Informat InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice InformationPrice Information</TabsContent>
              <TabsContent value="news">News Information</TabsContent>
              <TabsContent value="technical">Technical Analysis Details</TabsContent>
              <TabsContent value="financials">Financial Details</TabsContent>
            </Tabs>
          </div>

          {/* CandleChart, adjusted for vertical spacing */}
          <div className="w-1/2 md:flex-grow mb-6 relative">
            <CandleChart />
            {/* Credits positioned at the same level as the Chart */}
          </div>
          <div className='absolute bottom-0 right-4 m-12 text-s text-black-400'>
            <p>Credits Available: 5</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deck;
