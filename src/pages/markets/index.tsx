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

interface StockData {
  ticker: string;
  currentprice: number;
  dailychange: string | undefined | number;
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
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName); // Update the activeTab state with the clicked tab name
    fetchData(tabName); // Fetch data for the clicked tab
  };


  const handleChange = (e) => {
    // Update the state with the current value of the textarea
    setTextareaValue(e.target.value);
  };


  const toggleDeck = (ticker: string) => {
    setSelectedTicker(ticker);
    setDeckVisible(true);
  };

  function isWeekend(): boolean {
    const today = new Date(); // Get the current date
    const dayOfWeek = today.getDay(); // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)

    return dayOfWeek === 0 || dayOfWeek === 6; // Return true if it's Saturday (6) or Sunday (0)
  }

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

    console.log(formattedDate); // Outputs the most recent Friday in "YYYY-MM-DD" format
    return formattedDate || "2023-01-02";
}

  function getDateBefore(inputDateStr: string) {
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
        // if the crypto tab is activated
        if (tab === 'crypto') {
          //const data = await rest.crypto.snapshotTicker(ticker);
          //const currentPrice = data?.ticker?.day?.c ?? 0;
          //const dailyChange = data?.ticker?.todaysChangePerc?.toFixed(2) ?? 0;

        } else {
        if (isWeekend()) {
          const data = await rest.stocks.previousClose(ticker)
          const weekdaydata = await rest.stocks.dailyOpenClose(ticker, getRecentFriday())
          if (data.results != undefined) {
          const currentPrice = data.results[0]?.c ?? 0;
          const oldPrice = weekdaydata?.open ?? 0;
          let dailyChange: number = ((currentPrice - oldPrice) / oldPrice) * 100;
          dailyChange = Math.round((dailyChange + Number.EPSILON) * 100) / 100;

          return { ticker, currentPrice, dailyChange };
          }
        }
        else {
          //if the time is before 9:30am
          // then set the current price to previous day's close
          //else set the current price to the current price
          const currentTime = new Date(); // Gets the current date and time
          const currentHour = currentTime.getHours(); // Gets the hour part of the time (0-23)
          const currentMinutes = currentTime.getMinutes(); // Gets the minutes part of the time (0-59)

          if (currentHour < 9 || (currentHour === 9 && currentMinutes < 30)) {
            const data = await rest.stocks.snapshotTicker(ticker);
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            console.log(getDateBefore(formattedDate))
            const currentPrice = data?.ticker?.day?.c ?? 0;
            const olddata = await rest.stocks.dailyOpenClose(ticker, getDateBefore(formattedDate))
            const oldPrice = olddata?.open ?? 0;
            let dailyChange: number = ((currentPrice - oldPrice) / oldPrice) * 100;
            dailyChange = Math.round((dailyChange + Number.EPSILON) * 100) / 100;
            return { ticker, currentPrice, dailyChange };
          } else {
            const data = await rest.stocks.snapshotTicker(ticker);
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(today.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            console.log(getDateBefore(formattedDate))
            const currentPrice = data?.ticker?.prevDay?.c ?? 0;
            const olddata = await rest.stocks.dailyOpenClose(ticker, getDateBefore(formattedDate))
            const oldPrice = olddata?.open ?? 0;
            let dailyChange: number = ((currentPrice - oldPrice) / oldPrice) * 100;
            dailyChange = Math.round((dailyChange + Number.EPSILON) * 100) / 100;

            return { ticker, currentPrice, dailyChange };
          }
          
        }
        }
      });

      const stockData = await Promise.all(stockDataPromises);
      const transformedStockData = stockData.map((data) => ({
        ticker: data.ticker,
        currentprice: data.currentPrice,
        dailychange: data.dailyChange,
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
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
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

      <div style={{ width: 1450, paddingTop: '90px' }}>
        <Slider {...sliderSettings}>
          {cardInfoTechData.map((stock, index) => (
            <div key={index} className="px-2">
              <SummaryCard
                ticker={stock.ticker}
                currentPrice={stock.currentprice}
                dailyChange={stock.dailychange}
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
    </>
  );
};

export default Markets;