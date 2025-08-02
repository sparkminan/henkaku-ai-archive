import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HENKAKU 生成AI会 アーカイブ</title>
        <meta name="description" content="HENKAKU生成AI会の勉強会資料・情報アーカイブサイト" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <FavoritesProvider>
          <Component {...pageProps} />
        </FavoritesProvider>
      </ThemeProvider>
    </>
  );
}
