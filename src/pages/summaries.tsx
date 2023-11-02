import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/providers/UserProvider';
import SummaryCard from '../components/ui/card';
import { Grid } from '@mui/material';
import { Textarea } from '@nextui-org/react';


const Summaries = () => {  
  const { user } = useContext(UserContext) || {};
  const router = useRouter();

  useEffect(() => {
      if (user !== null) {
          router.push('/summaries').catch((err) => console.log(err));
      }
  }, [user, router]);

  const divStyle = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
  };

  const backgroundColor = {
    backgroundColor: '#1E1E1E',
  };
  
  
  return (
    <>
        <h1 style={divStyle} className="text-4xl font-bold text-white">Summaries</h1>
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
              {Array.from(Array(3)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <SummaryCard />
                </Grid>
              ))}
            </Grid>
        </div>
    </>
  );
};

export default Summaries;