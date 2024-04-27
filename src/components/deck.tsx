import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Card, CardContent } from "@/components/ui/card";
import CandleChart from "./ui/chart";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TypewriterEffect from "@/components/ui/typewriter";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedProfile = Cookies.get('userProfile');
    if (savedProfile) {
        setProfile(JSON.parse(savedProfile) as UserProfile);
    }
}, []);

  const updateProfileCredits = async () => {
    console.log("Current profile credits: ", profile?.credits);
    const profileData = JSON.parse(Cookies.get('userProfile') || '{}');
    const response = await fetch('https://upgrade.fineasapp.io:5600/enforce-credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_hash: profileData.id_hash }),
    });
  
    if (!response.ok) {
      // Convert response to JSON to check for specific error message
      const errorResponse = await response.json();
      if (errorResponse.error === 'Ran out of credits') {
        throw new Error('No more credits');
      }
      throw new Error('Failed to enforce credits.');
    }
  
    const updatedProfile = await response.json();
    setProfile(updatedProfile); // Update profile state with new credits count
    Cookies.set('userProfile', JSON.stringify(updatedProfile)); // Update userProfile cookie with new credits count
  };
  
  const handleAnalysis = async () => {
    // Check if user is not logged in
    if (!profile || !profile.id_hash) {
        alert("Log in.");
        setIsLoading(false); // Ensure loading state is reset
        return; // Exit the function early
    }

    // Check if no ticker is selected
    if (!selectedTicker) {
        alert("Select a ticker before generating an analysis.");
        setIsLoading(false); // Ensure loading state is reset
        return; // Exit the function early
    }

    setIsLoading(true);

    try {
        await updateProfileCredits();
        const apiUrl = `https://data.fineasapp.io:8443/ret?ticker=${selectedTicker.toUpperCase()}`;
        const response = await fetch(apiUrl);
        const data: StockAnalysis = await response.json();
        setAnalysis(data);
    } catch (error) {
        if (error instanceof Error && error.message === 'No more credits') {
            alert('You have run out of credits.');
        } else {
            console.error('Error:', error);
        }
    } finally {
        setIsLoading(false);
    }
};

  

  

  return (
    <div className="flex justify-center items-center md:p-4 sm:p-1 pt-6">
      <Card className="glowing-border p-1 border shadow-xl w-full max-w-[230vh] bg-main-color overflow-hidden relative" style={{ minHeight: '5vh' }}>
        <CardContent className="flex flex-col items-start space-y-8 2xl:space-y-0 lg:flex-row 2xl:items-start relative" style={{ gap: '25px' }}>
          <div className="w-full lg:w-1/4 flex justify-center items-center flex-col mb-6 relative">
            <Combobox setSelectedTicker={setSelectedTicker} /> {/* Adjust this to correctly set the selectedTicker */}
            <Button className="w-full mt-[435px] self-start bg-blue-700" onClick={handleAnalysis} disabled={isLoading}>
              {isLoading ? <div className="loader" style={{ display: 'inline-block', marginRight: '5px' }}></div> : null}
              Generate Analysis
            </Button>
          </div>

          <div className="w-full md:flex-grow mb-6 flex justify-center">
          <Tabs defaultValue="price" className="w-full">
          <TabsList className='w-full flex justify-center'>
            <TabsTrigger className='text-xs md:text-lg' value="price">Price Info</TabsTrigger>
            <TabsTrigger className='text-xs md:text-lg' value="news">News Info</TabsTrigger>
            <TabsTrigger className='text-xs md:text-lg' value="technical">Technicals</TabsTrigger>
            <TabsTrigger className='text-xs md:text-lg' value="financials">Financials</TabsTrigger>
          </TabsList>
          <TabsContent className='text-white' value="price">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.StockPerformance || 'Here you will find information about recent price information.'} speed={15} />}
          </TabsContent>
          <TabsContent className='text-white' value="news">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.NewsSummary || 'Here you will find current news, sentiment, and investor outlooks.'} speed={15} />}
          </TabsContent>
          <TabsContent className='text-white' value="technical">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.TechnicalAnalysis || 'Here you will receive accurate technical analysis using the most relevant chart indicators. '} speed={15} />}
          </TabsContent>
          <TabsContent className='text-white' value="financials">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.FinancialHealth || 'Here you will find evaluations of financial health.'} speed={15} />}
          </TabsContent>
        </Tabs>

          </div>

          <div className="w-full md:flex-grow mb-6 relative">
            <CandleChart ticker={selectedTicker} />
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
