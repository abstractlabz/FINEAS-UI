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
    width: isVisible ? '65%' : 0,
    height: isVisible ? '65%' : 0,
    transition: 'width 0.5s, height 0.5s',
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
    return <p>Loading...</p>;
  }

  // Display error state
  if (error) {
    return <p>Error: {error}</p>;
  }

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
          <Tabs aria-label="Options">
            {/* Company Summary Tab */}
            <Tab key="companySummary" title="Company Summary">
              <Card>
                <CardBody>
                  {/* Render specific properties or format data for Company Summary */}
                  <h1>COMPANY SUMMARY DATA:</h1>
                  {<p>{companySummaryData}</p>}
                </CardBody>
              </Card>
            </Tab>

            {/* Financials Summary Tab */}
            <Tab key="financialSummary" title="Financials Summary">
              <Card>
                <CardBody>
                  {/* Render specific properties or format data for Financials Summary */}
                  <h1>FINANCIAL SUMMARY DATA:</h1>
                  {<p>{financialSummaryData}</p>}
                </CardBody>
              </Card>
            </Tab>

            {/* Stock Analysis Tab */}
            <Tab key="stockAnalysis" title="Stock Analysis">
              <Card>
                <CardBody>
                  {/* Render specific properties or format data for Stock Analysis */}
                  <h1>STOCK ANALYSIS DATA:</h1>
                  {<p>{stockAnalysisData}</p>}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Deck;
