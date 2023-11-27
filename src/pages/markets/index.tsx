import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/providers/UserProvider';
import SummaryCard from '../../components/ui/card';
import { Grid } from '@mui/material';
import { Textarea } from '@nextui-org/react';
import { restClient } from '@polygon.io/client-js';
import Deck from '../../components/deck';

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


  const toggleDeck = () => {
    setDeckVisible(!isDeckVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rest = restClient("9AMw0r6sFAXDm3V42p7s0txblRgFw4w0");

        const dataAAPL = await rest.stocks.snapshotTicker('AAPL');
        const datacard1 = dataAAPL?.ticker?.day?.c ?? 0;

        const dataTSLA = await rest.stocks.snapshotTicker('TSLA');
        const datacard2 = dataTSLA?.ticker?.day?.c ?? 0;

        const dataGOOG = await rest.stocks.snapshotTicker('GOOG');
        const datacard3 = dataGOOG?.ticker?.day?.c ?? 0;

        const dataAAPLdelta = await rest.stocks.snapshotTicker('AAPL');
        const deltacard1 = dataAAPLdelta?.ticker?.todaysChangePerc.toFixed(2) ?? 0;

        const dataTSLAdelta = await rest.stocks.snapshotTicker('TSLA');
        const deltacard2 = dataTSLAdelta?.ticker?.todaysChangePerc.toFixed(2) ?? 0;

        const dataGOOGdelta = await rest.stocks.snapshotTicker('GOOG');
        const deltacard3 = dataGOOGdelta?.ticker?.todaysChangePerc?.toFixed(2) ?? 0;

        // Update the state after all API calls are complete
        setCardInfoTechData([
          { ticker: 'AAPL', currentprice: datacard1, dailychange: deltacard1 },
          { ticker: 'TSLA', currentprice: datacard2, dailychange: deltacard2 },
          { ticker: 'GOOG', currentprice: datacard3, dailychange: deltacard3 },
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
                onGenerateReports={toggleDeck}
              />
              <Deck isVisible={isDeckVisible} onClose={toggleDeck} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Markets;
