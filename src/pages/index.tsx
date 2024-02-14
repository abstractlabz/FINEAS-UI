import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/providers/UserProvider';
import Chat from 'src/pages/chat/index';

const Home: NextPage = () => {  
  const { user } = useContext(UserContext) || {};
  const router = useRouter();

  useEffect(() => {
      if (user !== null) {
          router.push('/markets').catch((err) => console.log(err));
      }
  }, [user, router]);
  

  return (
    <>
      <Head>
        <title>FINEAS.AI</title>
        <meta name="description" content="Fineas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen gap-10">
        <Chat />
      </main>
    </>
  );
};

export default Home;