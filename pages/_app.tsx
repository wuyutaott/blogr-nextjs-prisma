import { SessionProvider } from 'next-auth/react';
import { AppProps } from "next/app";
import { Session } from 'next-auth';
import '../styles/globals.css';

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  };
}

const App = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
