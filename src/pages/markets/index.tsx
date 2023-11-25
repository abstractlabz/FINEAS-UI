import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/providers/UserProvider';
import SummaryCard from '../../components/ui/card';
import { Grid } from '@mui/material';
import { Textarea } from '@nextui-org/react';
import { restClient } from '@polygon.io/client-js';

interface StockData {
  ticker: string;
  currentprice: number;
  dailychange: number;
}

const Markets = () => {
  const { user } = useContext(UserContext) || {};
  const router = useRouter();
  const [cardInfoTechData, setCardInfoTechData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rest = restClient("9AMw0r6sFAXDm3V42p7s0txblRgFw4w0");

        const dataAAPL = await rest.stocks.previousClose('AAPL');
        const datacard1 = dataAAPL?.results?.[0]?.c ?? 0;

        const dataTSLA = await rest.stocks.previousClose('TSLA');
        const datacard2 = dataTSLA?.results?.[0]?.c ?? 0;

        const dataGOOG = await rest.stocks.previousClose('GOOG');
        const datacard3 = dataGOOG?.results?.[0]?.c ?? 0;

        // Update the state after all API calls are complete
        setCardInfoTechData([
          { ticker: 'AAPL', currentprice: datacard1, dailychange: 100 },
          { ticker: 'TSLA', currentprice: datacard2, dailychange: 100 },
          { ticker: 'GOOG', currentprice: datacard3, dailychange: 100 },
        ]);

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

  const divStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  const backgroundColor: React.CSSProperties = {
    backgroundColor: '#1E1E1E',
  };

  if (loading) {
    return <p>Loading...</p>; // Add a loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Display an error message
  }

  return (
    <>
      <h1 style={divStyle} className="text-4xl font-bold text-white">
        Market Summaries
      </h1>
      <br />
      <br />
      <div>
        <Textarea
          variant="underlined"
          label=""
          labelPlacement="inside"
          rows={1}
          placeholder="Enter a ticker symbol here."
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          style={backgroundColor}
        />
      </div>
      <div style={divStyle} className="flex flex-col items-center justify-center w-full h-screen">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {cardInfoTechData.map((stock, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <SummaryCard
                key={index}
                ticker={stock.ticker}
                currentPrice={stock.currentprice}
                dailyChange={stock.dailychange}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Markets;
