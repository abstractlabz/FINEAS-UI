import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Card, CardContent } from "@/components/ui/card";
import CandleChart from "./ui/chart";
import { Combobox } from "@/components/combobox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TypewriterEffect from "@/components/ui/typewriter";
import Modal from "@/components/ui/modal";
import SignInComponent from "@/components/sign-in";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const router = useRouter(); // Get the router object from the useRouter hook


  useEffect(() => {
    const savedProfile = Cookies.get('userProfile');
    if (savedProfile) {
        setProfile(JSON.parse(savedProfile) as UserProfile);
    }
}, []);

  const updateProfileCredits = async () => {
    console.log("Current profile credits: ", profile?.credits);
    const profileData = JSON.parse(Cookies.get('userProfile') || '{}');
    const response = await fetch('https://upgrade.fineasapp.io:2096/enforce-credits', {
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
    Cookies.set('userProfile', JSON.stringify(updatedProfile), { sameSite: 'None', secure: true, expires: 365 }); // Update userProfile cookie with new credits count
  };
  
  const handleAnalysis = async () => {
    if (!profile || !profile.id_hash) {
        handleLoginNeeded();
        return;
    }

    if (!selectedTicker) {
      setModalContent(
        <>
        <div className='mb-4 items-center flex justify-center items-center'>Please select a ticker for analysis</div>
        </>
      );
      setIsModalOpen(true);
      return;
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
            handleCreditsNeeded();
        } else {
            console.error('Error:', error);
        }
    } finally {
        setIsLoading(false);
    }
};

const handleLoginNeeded = () => {
  setModalContent(
  <>
  <div className='mb-4'>Please Log in.</div>
  <SignInComponent />
  </>)
  ;
  setIsModalOpen(true);
};


const handleEmptyCredits = () => {
  router.push('/checkout');
}

const handleCreditsNeeded = () => {
  setModalContent(
    <>
      <div className="text-center p-4">
        <p className="mb-4">You have run out of credits. Please upgrade your account here!</p>
        <Button onClick={handleEmptyCredits} className="bg-accent-color text-black px-4 py-2 rounded hover:bg-accent-dark">Upgrade</Button>
      </div>
    </>
  );
  setIsModalOpen(true);
};


  return (
    <GoogleOAuthProvider clientId="684619174291-3515q33o0vl2spdq5t0ur23f7sepgk26.apps.googleusercontent.com">
    <div className="flex justify-center items-center md:p-4 sm:p-1 pt-6">
      <Card className="mt-[32px] glowing-border p-1 border shadow-md w-full max-w-[195vh] max-h-[550px] bg-main-color overflow-auto relative" style={{ minHeight: '5vh' }}>
        <CardContent className="flex flex-col items-start space-y-8 2xl:space-y-0 lg:flex-row 2xl:items-start relative" style={{ gap: '25px' }}>
          <div className="w-full h-full lg:w-1/4 flex justify-center items-center flex-col mb-6 relative">
            <Combobox setSelectedTicker={setSelectedTicker} /> {/* Adjust this to correctly set the selectedTicker */}
            <Button className="mb-6 w-full mt-[400px] self-start bg-blue-700" onClick={handleAnalysis} disabled={isLoading}>
              {isLoading ? <div className="loader" style={{ display: 'inline-block', marginRight: '5px' }}></div> : null}
              Generate Analysis
            </Button>
            <div className='absolute bottom-0 text-s text-white-400'>
            <p className='text-white md:mt-7 lg:mt-[5px]'>Credits Available: {profile?.credits}</p>
          </div>
          </div>

          <div className="w-[100%] md:flex-grow mb-6 mt-0 flex justify-center">
          <Tabs defaultValue="price" className="w-full">
          <TabsList className='w-[100%] flex justify-center'>
            <TabsTrigger className='text-[0.65rem] md:text-lg mx-0' value="price">Price</TabsTrigger>
            <TabsTrigger className='text-[0.65rem] md:text-lg mx-0' value="news">News</TabsTrigger>
            <TabsTrigger className='text-[0.65rem] md:text-lg mx-0' value="technical">Technicals</TabsTrigger>
            <TabsTrigger className='text-[0.65rem] md:text-lg mx-0' value="financials">Financials</TabsTrigger>
            <TabsTrigger className='text-[0.65rem] md:text-lg mx-0' value="description">Description</TabsTrigger>
          </TabsList>
          <TabsContent className='text-white' value="price">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.StockPerformance.replace(/\n/g, '<br/>') || 'Here you will find information about recent price information. **Only for research purposes, not financial advice**'} speed={4} />}
          </TabsContent>
          <TabsContent className='text-white' value="news">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.NewsSummary.replace(/\n/g, '<br/>') || 'Here you will find information about recent price information. **Only for research purposes, not financial advice**'} speed={4} />}
          </TabsContent>
          <TabsContent className='text-white' value="technical">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.TechnicalAnalysis.replace(/\n/g, '<br/>') || 'Here you will find information about recent price information. **Only for research purposes, not financial advice**'} speed={4} />}
          </TabsContent>
          <TabsContent className='text-white' value="financials">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.FinancialHealth.replace(/\n/g, '<br/>') || 'Here you will find information about recent financial information. **Only for research purposes, not financial advice**'} speed={4} />}
          </TabsContent>
          <TabsContent className='text-white' value="description">
          {isLoading ? <div className="loader"></div> : <TypewriterEffect text={analysis?.CompanyDesc.replace(/\n/g, '<br/>') || 'Here you will find a description about this financial asset. **Only for research purposes, not financial advice**'} speed={4} />}
          </TabsContent>
        </Tabs>
          </div>
          <div className="w-full md:flex-grow relative max-h-[200p]">
            <CandleChart ticker={selectedTicker} />
          </div>
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {modalContent}
      </Modal>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Deck;
