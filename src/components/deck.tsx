import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Card, CardContent } from "@/components/ui/card";
import CandleChart from "./ui/chart";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface UserProfile {
  picture: string;
  id_hash: string;
  stripe_customer_id: string;
  email: string;
  credits: number;
  is_member: boolean;
  // Add other user profile fields as needed
}

interface StockAnalysis {
  Ticker: string;
  StockPerformance: string;
  FinancialHealth: string;
  NewsSummary: string;
  CompanyDesc: string;
  TechnicalAnalysis: string;
}

const Deck: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [selectedTicker, setSelectedTicker] = useState<string>(''); // Placeholder for selected ticker value

  useEffect(() => {
    const savedProfile = Cookies.get('userProfile');
    if (savedProfile) {
        setProfile(JSON.parse(savedProfile) as UserProfile);
    }
  }, []);

  const handleAnalysis = async () => {
    // Placeholder URL - adjust to your backend API endpoint
    const apiUrl = `https://data.fineasapp.io:8443/ret?ticker=${selectedTicker}`;
    try {
      const response =  fetch(apiUrl);
      const data = (await response).json();
      console.log('Stock analysis:', data);
      setAnalysis(await data);
    } catch (error) {
      console.error('Error fetching stock analysis:', error);
    }
  };

  return (
    <div className="flex justify-center items-center md:p-4 sm:p-1 pt-6">
      <Card className="glowing-border p-1 border shadow-xl w-full max-w-[230vh] bg-main-color overflow-hidden relative" style={{ minHeight: '5vh' }}>
        <CardContent className="flex flex-col items-start space-y-8 2xl:space-y-0 lg:flex-row 2xl:items-start relative" style={{ gap: '25px' }}>
          <div className="w-full lg:w-1/4 flex justify-center items-center flex-col mb-6 relative">
            <Combobox setSelectedTicker={setSelectedTicker} /> {/* Adjust this to correctly set the selectedTicker */}
            <Button className="w-full mt-[435px] self-start bg-blue-700" onClick={handleAnalysis}>Generate Analysis</Button>
          </div>

          <div className="w-full md:flex-grow mb-6 flex justify-center">
            <Tabs defaultValue="price" className="w-full">
              <TabsList className='w-full flex justify-center'>
                <TabsTrigger className='text-xs md:text-lg' value="price">Price Info</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="news">News Info</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="technical">Technicals</TabsTrigger>
                <TabsTrigger className='text-xs md:text-lg' value="financials">Financials</TabsTrigger>
              </TabsList>
              <TabsContent className='text-white' value="price">{analysis?.StockPerformance}</TabsContent>
              <TabsContent className='text-white' value="news">{analysis?.NewsSummary}</TabsContent>
              <TabsContent className='text-white' value="technical">{analysis?.TechnicalAnalysis}</TabsContent>
              <TabsContent className='text-white' value="financials">{analysis?.FinancialHealth}</TabsContent>
            </Tabs>
          </div>

          <div className="w-full md:flex-grow mb-6 relative">
            <CandleChart />
          </div>
          <div className='absolute bottom-0 right-4 m-12 text-s text-white-400'>
            <p className='text-white'>Credits Available: {profile?.credits}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deck;
