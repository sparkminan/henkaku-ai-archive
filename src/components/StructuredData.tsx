import React from 'react';
import Head from 'next/head';

interface StructuredDataProps {
  type: 'WebSite' | 'Article' | 'Course' | 'ItemList';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseContext = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'WebSite':
        return {
          ...baseContext,
          '@type': 'WebSite',
          name: 'HENKAKU AI LAB',
          description: 'HENKAKU生成AI会の勉強会アーカイブ。最新のAI技術を体系的に学べるプラットフォーム。',
          url: 'https://sparkminan.github.io/henkaku-ai-archive',
          publisher: {
            '@type': 'Organization',
            name: 'HENKAKU Community',
            logo: {
              '@type': 'ImageObject',
              url: 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-hero-illustration.svg',
            },
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://sparkminan.github.io/henkaku-ai-archive/sessions?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        };

      case 'Article':
        return {
          ...baseContext,
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          author: {
            '@type': 'Person',
            name: data.author,
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          publisher: {
            '@type': 'Organization',
            name: 'HENKAKU AI LAB',
            logo: {
              '@type': 'ImageObject',
              url: 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-hero-illustration.svg',
            },
          },
          image: data.image || 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url,
          },
          keywords: data.keywords?.join(', '),
        };

      case 'Course':
        return {
          ...baseContext,
          '@type': 'Course',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'HENKAKU Community',
          },
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            instructor: {
              '@type': 'Person',
              name: data.instructor,
            },
            startDate: data.startDate,
          },
          educationalLevel: 'intermediate',
          inLanguage: 'ja',
          isAccessibleForFree: true,
          courseCode: data.courseCode,
        };

      case 'ItemList':
        return {
          ...baseContext,
          '@type': 'ItemList',
          itemListElement: data.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: item.url,
            name: item.name,
          })),
        };

      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
};

export default StructuredData;