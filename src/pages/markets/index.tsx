import { useState, useEffect, useContext, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/providers/UserProvider';
import SummaryCard from '../../components/ui/card';
import { Grid } from '@mui/material';
import { Button, Input, Tab, Tabs, dataFocusVisibleClasses } from '@nextui-org/react';
import { restClient } from '@polygon.io/client-js';
import Deck from '../../components/deck';
import Nav from '@/components/Nav';
import Slider from "react-slick";
import techTickers from '@/data/techtickers.json';
import industryTickers from '@/data/industrytickers.json';
import financialTickers from '@/data/financetickers.json';
import cryptoTickers from '@/data/cryptotickers.json';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Weekend } from '@mui/icons-material';

interface StockData {
  ticker: string;
  currentprice: number | null;
  dailychange: number | null;
}


const Markets = () => {
  const { user } = useContext(UserContext) || {};
  const router = useRouter();
  const [cardInfoTechData, setCardInfoTechData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeckVisible, setDeckVisible] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState('');
  const [activeTab, setActiveTab] = useState('technology'); // Initialize with the first tab as active
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Function to update the window width
    const handleResize = () => {
        // Check if window is defined (so it runs only in the browser)
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
        }
    };

    // Check if window is defined
    if (typeof window !== 'undefined') {
        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => window.removeEventListener('resize', handleResize);
    }
}, []);


  // Determine the Tailwind class for the slider container based on the window width
  let sliderContainerClass;

  if (windowWidth >= 1600) {
      sliderContainerClass = '1600px'; // Very large screens
  } else if (windowWidth >= 1400 && windowWidth < 1600) {
      sliderContainerClass = '1400px'; // Large screens
  } else if (windowWidth >= 1200 && windowWidth < 1400) {
      sliderContainerClass = '1200px'; // Medium to large screens
  } else if (windowWidth >= 1024 && windowWidth < 1200) {
      sliderContainerClass = '1024px'; // Medium screens
  } else if (windowWidth >= 900 && windowWidth < 1024) {
      sliderContainerClass = '900px'; // Small to medium screens
  } else if (windowWidth >= 768 && windowWidth < 900) {
      sliderContainerClass = '768px'; // Tablets and larger mobile devices
  } else if (windowWidth >= 600 && windowWidth < 768) {
      sliderContainerClass = '600px'; // Larger mobile screens
  } else {
      sliderContainerClass = '400px'; // Smaller mobile screens
  }
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName); // Update the activeTab state with the clicked tab name
    fetchData(tabName); // Fetch data for the clicked tab
  };


  const handleChange = (e: any) => {
    // Update the state with the current value of the textarea
    setTextareaValue(e.target.value);
  };


  const toggleDeck = (ticker: string) => {
    setSelectedTicker(ticker);
    setDeckVisible(true);
  };


  function getRecentFriday(): string {
    // Get today's date
    const today = new Date();

    // Calculate the difference to the most recent Friday
    // (5 represents Friday; getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let daysToLastFriday = today.getDay() - 5;
    if (daysToLastFriday <= 0) {
        // Adjust if today is before Friday or is Friday
        daysToLastFriday += 7;
    }

    // Get the most recent Friday
    const lastFriday = new Date(today);
    lastFriday.setDate(today.getDate() - daysToLastFriday);

    // Format the date as YYYY-MM-DD
    const formattedDate = lastFriday.toISOString().split('T')[0];

    return formattedDate || "2023-01-02";
}

  function getDateBefore(inputDateStr: string | undefined) {
    // Parse the input string to a Date object
    const inputDate = new Date(inputDateStr);

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date format. Please use "YYYY-MM-DD" format.');
    }

    // Subtract one day
    inputDate.setDate(inputDate.getDate() - 1);

    // Format the date to YYYY-MM-DD
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(inputDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  const fetchData = async (tab: string) => {
    try {
      setLoading(true);
      const rest = restClient("9AMw0r6sFAXDm3V42p7s0txblRgFw4w0");

      // Determine which data file to use based on the active tab
      const tickers = tab === 'technology' ? techTickers :
                tab === 'finance' ? financialTickers :
                tab === 'industry' ? industryTickers :
                tab === 'crypto' ? cryptoTickers : techTickers;

                const stockDataPromises = tickers.map(async (ticker) => {
                  try {
                    let currentPrice = 0;
                    let oldPrice = 0;
                    let dailyChange = 0;
                    const today = new Date();
                    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
                    const currentHour = today.getHours();
                    const currentMinutes = today.getMinutes();
                
                    let isBeforeMarketOpen = currentHour < 9 || (currentHour === 9 && currentMinutes < 30);
                    let isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
                
                    if (isWeekend) {
                      // Fetch data for the previous Friday
                      let fridayData = await rest.stocks.dailyOpenClose(ticker, getRecentFriday());
                      currentPrice = fridayData?.close ?? 0;
                      oldPrice = fridayData?.open ?? 0;
                    } else {
                      // Fetch data for a weekday
                      if (isBeforeMarketOpen) {
                        let prevCloseData = await rest.stocks.previousClose(ticker);
                        let prevOpenData = await rest.stocks.dailyOpenClose(ticker, getDateBefore(today.toISOString().split('T')[0]));
                        currentPrice = prevCloseData?.results[0]?.c ?? 0;
                        oldPrice = prevOpenData?.open ?? 0;
                      } else {
                        let snapshotData = await rest.stocks.snapshotTicker(ticker);
                        let prevCloseData = await rest.stocks.previousClose(ticker);
                        currentPrice = snapshotData?.ticker?.day?.c ?? 0;
                        oldPrice = prevCloseData?.results[0]?.c ?? 0;
                      }
                    }
                
                    // Calculate daily change
                    if (currentPrice !== 0 && oldPrice !== 0) {
                      dailyChange = ((currentPrice - oldPrice) / oldPrice) * 100;
                      dailyChange = Math.round((dailyChange + Number.EPSILON) * 100) / 100;
                    }
                
                    return {
                      ticker,
                      currentprice: currentPrice,
                      dailychange: dailyChange,
                    };
                
                  } catch (error) {
                    console.error('Error fetching data for ticker:', ticker, error);
                    return {
                      ticker,
                      currentprice: 'N/A',
                      dailychange: 'N/A'
                    };
                  }
                });

      const stockData = await Promise.all(stockDataPromises);
      const transformedStockData = stockData.map((data) => ({
        ticker: data.ticker,
        currentprice: data.currentprice,
        dailychange: data.dailychange,
      }));

      setCardInfoTechData(transformedStockData);
      setLoading(false);
    } catch (error) {
      console.error('An error happened:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== null) {
      router.push('/markets').catch((err) => console.log(err));
    } else {
      fetchData('technology'); // Load 'technology' data initially
    }
  }, [user, router]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <>
    <GoogleOAuthProvider clientId="684619174291-3515q33o0vl2spdq5t0ur23f7sepgk26.apps.googleusercontent.com">
    <React.StrictMode>
      <Nav />
      <div className="mt-4 mb-4 mx-auto max-w-4xl px-4">
        <Input
          value={textareaValue}
          onChange={handleChange}
          clearable
          bordered
          color="primary"
          placeholder="Enter a ticker symbol here."
          className="w-full mb-4"
          style={{ backgroundColor: '#1E1E1E', borderRadius: '12px', fontSize: '1.25rem' }}
        />
        <div className="text-center">
          <Button
            style={{ backgroundColor: '#2d3ded', padding: '10px 20px', borderRadius: '10px', borderColor: 'black', borderWidth: '2px', borderStyle: 'solid' }}
            onClick={() => toggleDeck(textareaValue)}
          >
            Click to Generate Report
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-4" style={{ paddingLeft: '55px', paddingTop: '100px' }}>
        <div className="border-b border-gray-200">
          <ul className="flex" role="tablist" style={{ marginBottom: '10px' }}>
            <li className="mr-4">
              <a
                href="#technology"
                className={`py-2 px-4 text-lg ${activeTab === 'technology' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabClick('technology')}
                role="tab"
                aria-controls="technology"
                aria-selected={activeTab === 'technology' ? 'true' : 'false'}
              >
                Technology
              </a>
            </li>
            <li className="mr-4">
              <a
                href="#finance"
                className={`py-2 px-4 text-lg ${activeTab === 'finance' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabClick('finance')}
                role="tab"
                aria-controls="finance"
                aria-selected={activeTab === 'finance' ? 'true' : 'false'}
              >
                Finance
              </a>
            </li>
            <li>
              <a
                href="#industry"
                className={`py-2 px-4 text-lg ${activeTab === 'industry' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => handleTabClick('industry')}
                role="tab"
                aria-controls="industry"
                aria-selected={activeTab === 'industry' ? 'true' : 'false'}
              >
                Industry
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ width: sliderContainerClass, paddingTop: '90px' }}>
        <Slider {...sliderSettings}>
        {cardInfoTechData.map((stock, index) => (
        <div key={index} className="px-2">
          <SummaryCard
            ticker={stock.ticker}
            currentPrice={stock.currentprice !== null ? stock.currentprice : 'N/A'}
            dailyChange={stock.dailychange !== null ? stock.dailychange : 'N/A'}
            onGenerateReports={() => toggleDeck(stock.ticker)}
          />
        </div>
      ))}
        </Slider>
      </div>
      {isDeckVisible && (
        <Deck 
          onClose={() => setDeckVisible(false)} 
          selectedTicker={selectedTicker}
          isVisible={isDeckVisible}  // Ensure this prop is correctly used in the Deck component
        />
      )}
      </React.StrictMode>
      </GoogleOAuthProvider>
    </>
  );
};

export default Markets;