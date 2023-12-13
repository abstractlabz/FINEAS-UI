import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/providers/UserProvider';
import SummaryCard from '../../components/ui/card';
import { Grid } from '@mui/material';
import { Button, Input } from '@nextui-org/react';
import { restClient } from '@polygon.io/client-js';
import Deck from '../../components/deck';
import Nav from '@/components/Nav';
import Slider from "react-slick";
import tickers from '@/data/techtickers.json'; // Adjust the path to match your project structure
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

  const handleChange = (e) => {
    // Update the state with the current value of the textarea
    setTextareaValue(e.target.value);
  };


  const toggleDeck = (ticker: string) => {
    setSelectedTicker(ticker);
    setDeckVisible(!isDeckVisible);
  };

  const handleButtonClick = () => {
    // Access the current value of the textarea using the state variable
    console.log('Textarea value:', textareaValue);
    // Perform other actions with the value...
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rest = restClient("9AMw0r6sFAXDm3V42p7s0txblRgFw4w0");
    
        const stockDataPromises = tickers.map(async (ticker) => {
          const data = await rest.stocks.snapshotTicker(ticker);
          const currentPrice = data?.ticker?.day?.c ?? 0;
          const dailyChange = data?.ticker?.todaysChangePerc?.toFixed(2) ?? 0;
    
          return { ticker, currentPrice, dailyChange };
        });
    
        const stockData = await Promise.all(stockDataPromises);

        const transformedStockData = stockData.map((data) => ({
          ticker: data.ticker,
          currentprice: data.currentPrice,
          dailychange: data.dailyChange,
        }));
    
        // Cast stockData to the correct type before setting it in the state
        setCardInfoTechData(transformedStockData);
        setLoading(false);
      } catch (error) {
        console.error('An error happened:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };
    

    if (user !== null) {
      router.push('/markets').catch((err) => console.log(err));
    } else {
      fetchData();
    }
  }, [user, router]);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
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
      <div style={{width: 1450, paddingTop: '250px' }}>
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
      {isDeckVisible && <Deck onClose={() => setDeckVisible(false)} selectedTicker={selectedTicker} isVisible={false} />}
    </>
  );
};

export default Markets;