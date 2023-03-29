import Footer from '@/shared/footer'
import Navbar from '@/shared/navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Script from 'next/script';
import { Provider } from 'react-redux';
import store from "../store";

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="application-name" content="Classicum" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Classicum" />
        <meta name="description" content="The classic way" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/assets/logo.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://classicum.com" />
        <meta name="twitter:title" content="Classicum" />
        <meta name="twitter:description" content="The classic way" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Classicum" />
        <meta property="og:description" content="The classic way" />
        <meta property="og:site_name" content="Classicum" />
        <meta property="og:url" content="https://classicum.com" />
        <meta property="og:image" content="https://classicum.com/icons/apple-touch-icon.png" />
      </Head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7BBWE2XXDC"></Script>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7BBWE2XXDC', {
            page_path: window.location.pathname,
          });
          `,
          }}
        />
      <Provider store={store}>
        <Navbar />
          <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}