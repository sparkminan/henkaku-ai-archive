import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, FileQuestion, Cpu } from 'lucide-react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState('');
  
  useEffect(() => {
    // URLから可能性のあるページを推測
    const path = window.location.pathname;
    if (path.includes('session')) {
      setSuggestion('セッション一覧をお探しですか？');
    } else if (path.includes('category') || path.includes('categories')) {
      setSuggestion('カテゴリ一覧をお探しですか？');
    } else if (path.includes('about')) {
      setSuggestion('このサイトについてをお探しですか？');
    }
  }, []);

  const popularPages = [
    { title: 'セッション一覧', href: '/sessions', icon: Search },
    { title: 'カテゴリ', href: '/categories', icon: FileQuestion },
    { title: 'このサイトについて', href: '/about', icon: Cpu },
  ];

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center">
            {/* エラーコード */}
            <div className="relative mb-8">
              <h1 className="text-8xl md:text-9xl font-cyber font-bold text-neon-blue glitch-text"
                  data-text="404">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl md:text-9xl font-cyber font-bold text-neon-purple opacity-50 blur-sm animate-pulse">
                  404
                </div>
              </div>
            </div>

            {/* エラーメッセージ */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-cyber text-neon-pink mb-4">
                PAGE NOT FOUND
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mx-auto mb-6"></div>
              <p className="text-lg text-cyan-300 mb-4">
                お探しのページは見つかりませんでした。
              </p>
              {suggestion && (
                <p className="text-sm text-cyan-400 italic">
                  {suggestion}
                </p>
              )}
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => router.back()}
                className="btn-cyber-secondary group"
              >
                <span className="flex items-center justify-center">
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  前のページに戻る
                </span>
              </button>
              
              <Link href="/" className="btn-cyber-primary group">
                <span className="flex items-center justify-center">
                  <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  ホームへ
                </span>
              </Link>
            </div>

            {/* 人気のページ */}
            <div className="card-cyber p-6 md:p-8">
              <h3 className="text-lg font-cyber text-cyan-300 mb-6">
                POPULAR PAGES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {popularPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group p-4 bg-dark-700 border border-cyber-500/30 rounded-lg
                               hover:border-neon-blue hover:bg-dark-600 transition-all duration-300"
                    >
                      <Icon className="h-8 w-8 text-neon-blue mx-auto mb-3 
                                     group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-cyber text-cyan-300 group-hover:text-neon-blue
                                  transition-colors">
                        {page.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2.5s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-1 0.5s infinite;
          color: #00ffff;
          z-index: -1;
        }

        .glitch-text::after {
          animation: glitch-2 0.5s infinite;
          color: #ff00ff;
          z-index: -2;
        }

        @keyframes glitch {
          0%, 100% {
            text-shadow: 
              0.05em 0 0 rgba(255, 0, 110, .75),
              -0.05em -0.025em 0 rgba(0, 255, 255, .75),
              0.025em 0.05em 0 rgba(255, 255, 0, .75);
          }
          15% {
            text-shadow: 
              0.05em 0 0 rgba(255, 0, 110, .75),
              -0.05em -0.025em 0 rgba(0, 255, 255, .75),
              0.025em 0.05em 0 rgba(255, 255, 0, .75);
          }
          16% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 0, 110, .75),
              0.025em 0.025em 0 rgba(0, 255, 255, .75),
              -0.05em -0.05em 0 rgba(255, 255, 0, .75);
          }
          49% {
            text-shadow: 
              -0.05em -0.025em 0 rgba(255, 0, 110, .75),
              0.025em 0.025em 0 rgba(0, 255, 255, .75),
              -0.05em -0.05em 0 rgba(255, 255, 0, .75);
          }
          50% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 0, 110, .75),
              0.05em 0 0 rgba(0, 255, 255, .75),
              0 -0.05em 0 rgba(255, 255, 0, .75);
          }
          99% {
            text-shadow: 
              0.025em 0.05em 0 rgba(255, 0, 110, .75),
              0.05em 0 0 rgba(0, 255, 255, .75),
              0 -0.05em 0 rgba(255, 255, 0, .75);
          }
        }

        @keyframes glitch-1 {
          0%, 100% {
            clip: rect(42px, 9999px, 44px, 0);
            transform: skew(0.5deg);
          }
          5% {
            clip: rect(12px, 9999px, 59px, 0);
            transform: skew(0.5deg);
          }
          10% {
            clip: rect(48px, 9999px, 29px, 0);
            transform: skew(0.5deg);
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            clip: rect(65px, 9999px, 119px, 0);
            transform: skew(0.5deg);
          }
          5% {
            clip: rect(92px, 9999px, 10px, 0);
            transform: skew(0.5deg);
          }
          10% {
            clip: rect(31px, 9999px, 82px, 0);
            transform: skew(0.5deg);
          }
        }
      `}</style>
    </Layout>
  );
};

export default Custom404;