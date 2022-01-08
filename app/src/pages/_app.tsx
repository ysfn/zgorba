import '../styles/index.css';
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContext from '../lib/authContext';
import useAuth from '../utils/useAuth';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    })
  );

  const AuthWrapper = ({ children }: any) =>
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Hydrate>
      <React.Fragment>
        {process.env.NODE_ENV === "development" && false && <ReactQueryDevtools />}
      </React.Fragment>
    </QueryClientProvider>
  );
};
