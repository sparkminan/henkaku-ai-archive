import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}) => {
  const router = useRouter();
  const baseUrl = 'https://sparkminan.github.io/henkaku-ai-archive';
  
  // デフォルト値
  const defaultTitle = 'HENKAKU AI LAB - 生成AI技術の最前線を探求する';
  const defaultDescription = 'HENKAKU生成AI会の勉強会アーカイブ。最新のAI技術、ツール、実践的な知識を体系的に学べるサイバー・ナレッジ・アーカイブ。';
  const defaultImage = `${baseUrl}/images/ai-hero-illustration.svg`;
  const defaultKeywords = ['生成AI', 'HENKAKU', 'AI勉強会', 'ChatGPT', 'Claude', 'Stable Diffusion', '機械学習', 'ディープラーニング'];
  
  // 実際に使用する値
  const pageTitle = title ? `${title} - HENKAKU AI LAB` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = image ? `${baseUrl}${image}` : defaultImage;
  const pageKeywords = keywords ? [...defaultKeywords, ...keywords] : defaultKeywords;
  const canonicalUrl = `${baseUrl}${router.asPath}`;

  return (
    <Head>
      {/* 基本的なメタタグ */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* robots設定 */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content="HENKAKU AI LAB" />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* その他のメタタグ */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Japanese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* PWA関連 */}
      <meta name="theme-color" content="#00D9FF" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="HENKAKU AI" />
      
      {/* ファビコン */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </Head>
  );
};

export default SEOHead;