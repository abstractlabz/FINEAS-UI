import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const LineChart = dynamic(
  () => import('@/components/chart'), // Adjust the path to where your LineChart component is located
  { ssr: false } // This will load the component only on the client-side
);


interface DeckProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTicker: string | null;
}

const Deck: React.FC<DeckProps> = ({ isVisible, onClose, selectedTicker }) => {
  // State to hold data for different tabs
  const [priceInfoData, setPriceInfoData] = useState<string>(" ");
  const [financialSummaryData, setFinancialSummaryData] = useState<string>("");
  const [newsStockData, setNewsStockData] = useState<string>("");
  const [technicalAnalysisData, setTechnicalAnalysisData] = useState<string>("");

  // State for loading and error handling
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  // Styles for the deck
  const deckStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#572d9e',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    zIndex: '10',
    border: '2px solid #fff', // Added border
    width: isVisible ? '85%' : 0,
    height: isVisible ? '80%' : 0,
    overflow: 'hidden', // Handle overflow
    transition: 'width 0.5s, height 0.5s',
  };

  // Custom styles for the tabs
  const tabStyle = {
    backgroundColor: '#1e1e1e', // Tab background color
    borderBottom: '2px solid #fff', // Underline for tabs
    borderRadius: '10px',
    border: '2px solid #fff' // Added border
  };

  const activeTabStyle = {
    borderBottomColor: '#4caf50', // Underline color for active tab
  };


  // Fetch data when the selectedTicker changes

  useEffect(() => {
    if (isVisible && selectedTicker && !dataFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8080/?ticker=${selectedTicker}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result: JSON = await response.json();
          setPriceInfoData(Object.values(result)[0]);
          console.log("Fetched text for Price Info Data:", Object.values(result)[0]);
          setFinancialSummaryData(Object.values(result)[1]);
          setNewsStockData(Object.values(result)[2]);
          setTechnicalAnalysisData(Object.values(result)[4]);
          setError(null);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
          setDataFetched(true); // Set flag to true after fetching data
        }
      };
      fetchData();
    }
  }, [selectedTicker, isVisible]);

  useEffect(() => {
    // Reset dataFetched when the ticker changes or deck is closed
    if (!isVisible || selectedTicker === null) {
      setDataFetched(false);
    }
  }, [selectedTicker, isVisible]);

  // Display loading state
  if (loading) {
    console.log('Loading...');
  }

  // Display error state
  if (error) {
    console.log('Error:', error);
  }

  
  const LoadingText = () => {
    const [loadingText, setLoadingText] = useState('Loading');

    useEffect(() => {
      const intervalId = setInterval(() => {
        setLoadingText(prev => prev.length < 10 ? prev + '.' : 'Loading');
      }, 500);

      return () => clearInterval(intervalId);
    }, []);

    return <p>{loadingText}</p>;
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed in props
    setDataFetched(false); // Reset data fetched state
    // Reset other states if needed
  };

  const AnimatedText = ({ text }) => {
  const textArray = text.split('');

  return (
    <div>
      {textArray.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.005 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};



  const contentStyle = {
    overflowY: 'scroll', // Temporarily force scrollbar
    maxHeight: '380px', // You may need to adjust this
    padding: '20px',
  };
  
  
  const data = [45, 52, 38, 45, 19, 23, 2, 50];
  // Render the Deck component
  return (
    <div>
    {isVisible && (
      <div style={deckStyle}>
        {/* Close button and Tabs (Unchanged) */}
        <button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            X
          </button>
        {loading && <LoadingText />}
        {!loading && (
          <Tabs aria-label="Options" style={tabStyle}>
            {/* Loop through tabs to create each Tab */}
            {['Price Info', 'Financials', 'News Info', 'Technical Analysis'].map((tabTitle, index) => (
              <Tab key={index} title={tabTitle} style={activeTabStyle}>
                <Card>
                  <CardBody style={contentStyle}>
                    <h1>{tabTitle.toUpperCase()} DATA:</h1>
                    <LineChart data={data} tickerName={selectedTicker} />
                    {tabTitle === 'Price Info' && <AnimatedText text={priceInfoData} />}
                    {tabTitle === 'Financials' && <AnimatedText text={financialSummaryData} />}
                    {tabTitle === 'News Info' && <AnimatedText text={newsStockData} />}
                    {tabTitle === 'Technical Analysis' && <AnimatedText text={technicalAnalysisData} />}
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        )}
      </div>
    )}
  </div>
  );
};

export default Deck;
