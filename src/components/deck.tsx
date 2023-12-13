import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

interface DeckProps {
  isVisible: boolean;
  onClose: () => void;
  selectedTicker: string | null;
}

const Deck: React.FC<DeckProps> = ({ isVisible, onClose, selectedTicker }) => {
  // State to hold data for different tabs
  const [companySummaryData, setCompanySummaryData] = useState<any>(null);
  const [financialSummaryData, setFinancialSummaryData] = useState<any>(null);
  const [stockAnalysisData, setStockAnalysisData] = useState<any>(null);

  // State for loading and error handling
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Styles for the deck
  const deckStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#41447c',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    zIndex: '999',
    border: '2px solid #fff', // Added border
    width: isVisible ? '70%' : 0,
    height: isVisible ? '70%' : 0,
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
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch data from the server using the selectedTicker
        const response = await fetch(`http://localhost:8080/?ticker=${selectedTicker}`);

        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the JSON response
        const result = await response.json();

        // Extract specific properties or format data as needed for each tab
        setCompanySummaryData(Object.values(result)[0]);
        setFinancialSummaryData(Object.values(result)[1]);
        setStockAnalysisData(Object.values(result)[2]);

        // Reset error state on successful fetch
        setError(null);
      } catch (error: any) {
        // Handle errors and update the error state
        setError(error.message);
      } finally {
        // Set loading to false when the request completes (whether successful or not)
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTicker]);

  // Display loading state
  if (loading) {
    console.log('Loading...');
  }

  // Display error state
  if (error) {
    console.log('Error:', error);
  }

  const AnimatedText = ({ text= " ", delay = 30 }) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
      if (text) {
        let index = 0;
        const intervalId = setInterval(() => {
          if (index < text.length) {
            setDisplayedText(displayedText => displayedText + text.charAt(index));
            index++;
          } else {
            clearInterval(intervalId);
          }
        }, delay);
  
        return () => clearInterval(intervalId);
      }
    }, [text, delay]);
  
    return <p>{displayedText || "Loading..."}</p>;
  };
  // Render the Deck component
  return (
    <div>
      {isVisible && (
        <div style={deckStyle}>
          {/* Close button */}
          <span
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
            onClick={onClose}
          >
            &times;
          </span>

          {/* Tabs for different sections */}
          <Tabs aria-label="Options" style={tabStyle}>
            {/* Loop through tabs to create each Tab */}
            {['Company Summary', 'Financials Summary', 'Stock Analysis'].map((tabTitle, index) => (
              <Tab key={index} title={tabTitle} style={activeTabStyle}>
                <Card>
                  <CardBody>
                    {/* Render specific properties or format data for each tab */}
                    <h1>{tabTitle.toUpperCase()} DATA:</h1>
                    {/* Conditionally render data based on tabTitle */}
                    {tabTitle === 'Company Summary' && <AnimatedText text={companySummaryData || ''} />}
                    {tabTitle === 'Financials Summary' && <AnimatedText text={financialSummaryData || ''} />}
                    {tabTitle === 'Stock Analysis' && <AnimatedText text={stockAnalysisData || ''} />}
                  </CardBody>
                </Card>
              </Tab>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Deck;
