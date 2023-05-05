import '@/styles/globals.css';

import { ChatProvider } from '@/providers/ChatProvider';
import { UserProvider } from '@/providers/UserProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppType } from 'next/dist/shared/lib/utils';

const queryClient = new QueryClient({defaultOptions: { queries: { refetchOnWindowFocus: false } } })

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen antialiased bg-background">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ChatProvider>
            <Component {...pageProps} />
          </ChatProvider>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
