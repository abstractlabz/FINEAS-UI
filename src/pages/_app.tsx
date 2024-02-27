import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppType } from 'next/dist/shared/lib/utils';


const queryClient = new QueryClient({defaultOptions: { queries: { refetchOnWindowFocus: false } } })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen antialiased bg-background">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
