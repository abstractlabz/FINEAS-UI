import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import SignIn from '@/components/sign-in';
import { UserContext } from '@/providers/UserProvider';

import { Badge } from '@/components/ui/badge';

const Home: NextPage = () => {  
  const { user } = useContext(UserContext) || {};
  const router = useRouter();

  useEffect(() => {
      if (user !== null) {
          router.push('/chat').catch((err) => console.log(err));
      }
  }, [user, router]);
  

  return (
    <>
      <Head>
        <title>Song GPT</title>
        <meta name="description" content="Song Gpt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen gap-10">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
            Song GPT
          </h1>
          <Badge variant="destructive" className="h-5">BETA</Badge>
        </div>
        <SignIn />
      </main>
    </>
  );
};

export default Home;