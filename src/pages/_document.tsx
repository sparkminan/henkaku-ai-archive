import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/henkaku-ai-archive/favicon.svg" />
        <link rel="apple-touch-icon" href="/henkaku-ai-archive/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}