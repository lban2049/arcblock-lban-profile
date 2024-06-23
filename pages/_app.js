import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{process.env.APP_TITLE}</title>
        <link rel="icon" href="/favicon.ico?imageFilter=convert&f=png&w=32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="theme-color" content="#4F6AF5" />
      </Head>
      <Script src="__blocklet__.js" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
