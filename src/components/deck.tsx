import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const LineChart = dynamic(
  () => import('@/components/chart'),
  { ssr: false }
);

interface DeckProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTicker: string | null;
}

interface ApiResponse {
  ticker: string;
  priceInfoData: string;
  financialSummaryData: string;
  newsStockData: string;
  technicalAnalysisData: string;
}

const Deck: React.FC<DeckProps> = ({ isVisible, onClose, selectedTicker }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [priceInfoData, setPriceInfoData] = useState<string>(" ");
  const [financialSummaryData, setFinancialSummaryData] = useState<string>(" ");
  const [newsStockData, setNewsStockData] = useState<string>(" ");
  const [technicalAnalysisData, setTechnicalAnalysisData] = useState<string>(" ");

  // Styles remain the same
    // Styles for the deck
    const deckStyle: React.CSSProperties = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#572d9e',
      padding: '20px',
      borderRadius: '10px',
      color: 'white',
      zIndex: 10, // Changed from string to number
      border: '2px solid #fff',
      width: isVisible ? '85%' : '0', // Ensure types match (string in both cases)
      height: isVisible ? '80%' : '0', // Ensure types match (string in both cases)
      overflow: 'hidden',
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

    useEffect(() => {
      if (isVisible && selectedTicker && !dataFetched) {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_AGGREGATORURL}/ret?ticker=${selectedTicker}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            const result = await response.json() as ApiResponse;
            console.log(result); // Log the result to inspect the structure

            // Use the result here to set state
            setPriceInfoData(result['StockPerformance'] as string);
            setFinancialSummaryData(result['FinancialHealth'] as string);
            setNewsStockData(result['NewsSummary'] as string);
            setTechnicalAnalysisData(result['TechnicalAnalysis'] as string);
            
          } catch (err) {
            const error = err as Error;
            setError(error.message);
          } finally {
            setLoading(false);
            setDataFetched(true);
          }
        };
        fetchData().catch(console.error);
      }
    }, [selectedTicker, isVisible, dataFetched]);
  
    useEffect(() => {
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
    const messages = ['Searching the internet', 'Analyzing data', 'Generating visuals', 'Finishing touches'];
    const [currentMessage, setCurrentMessage] = useState(0);
    const [dots, setDots] = useState('');
  
    useEffect(() => {
      // Interval for changing messages
      const messageInterval = setInterval(() => {
        setCurrentMessage(prev => (prev < messages.length - 1 ? prev + 1 : prev));
      }, 6000);
  
      // Interval for animating dots
      const dotsInterval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
  
      return () => {
        clearInterval(messageInterval);
        clearInterval(dotsInterval);
      };
    }, []);
  
    return <p>{messages[currentMessage]}{dots}</p>;
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed in props
    setDataFetched(false); // Reset data fetched state
    // Reset other states if needed
  };

  const AnimatedText = ({ text }: { text: string }) => {
    const safeText = text || "No data available"; // Fallback for empty or undefined text
    const textArray = safeText.split('');
  
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
  



const contentStyle: React.CSSProperties = {
  overflowY: 'scroll',
  maxHeight: '450px',
  padding: '20px',
};
  
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
                      {/* Updated LineChart usage to only include tickerName prop */}
                      <LineChart tickerName={selectedTicker} />
                      <h1> {selectedTicker} {tabTitle.toUpperCase()} DATA:</h1>
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
