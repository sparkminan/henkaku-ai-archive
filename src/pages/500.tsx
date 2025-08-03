import React from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle, HelpCircle } from 'lucide-react';
import Layout from '@/components/Layout';

const Custom500 = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center">
            {/* エラーコード */}
            <div className="relative mb-8">
              <h1 className="text-8xl md:text-9xl font-cyber font-bold text-red-500 animate-pulse"
                  data-text="500">
                500
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl md:text-9xl font-cyber font-bold text-orange-500 opacity-30 blur-lg">
                  500
                </div>
              </div>
            </div>

            {/* エラーメッセージ */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-cyber text-neon-pink mb-4">
                INTERNAL SERVER ERROR
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mx-auto mb-6"></div>
              <p className="text-lg text-cyan-300 mb-2">
                サーバーエラーが発生しました
              </p>
              <p className="text-sm text-cyan-400">
                申し訳ございません。システムに問題が発生しています。
              </p>
            </div>

            {/* エラー詳細カード */}
            <div className="card-cyber p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-cyber text-sm text-cyan-300 mb-2">
                    考えられる原因:
                  </h3>
                  <ul className="space-y-1 text-sm text-cyan-400">
                    <li>• 一時的なサーバーの問題</li>
                    <li>• データベースへの接続エラー</li>
                    <li>• システムメンテナンス中</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleReload}
                className="btn-cyber-primary group"
              >
                <span className="flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  ページを再読み込み
                </span>
              </button>
              
              <Link href="/" className="btn-cyber-secondary group">
                <span className="flex items-center justify-center">
                  <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  ホームへ戻る
                </span>
              </Link>
            </div>

            {/* ヘルプセクション */}
            <div className="bg-dark-800/50 border border-cyber-500/30 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <HelpCircle className="h-5 w-5 text-neon-blue mr-2" />
                <h3 className="font-cyber text-cyan-300">問題が解決しない場合</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center space-x-2 text-cyan-400">
                  <span>しばらく時間をおいてから再度お試しください</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="https://github.com/sparkminan/henkaku-ai-archive/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-purple transition-colors flex items-center"
                  >
                    <span className="mr-1">🐛</span>
                    バグを報告
                  </a>
                  
                  <span className="hidden sm:inline text-cyan-500">•</span>
                  
                  <a
                    href="https://discord.gg/henkaku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-purple transition-colors flex items-center"
                  >
                    <span className="mr-1">💬</span>
                    Discordで質問
                  </a>
                </div>
              </div>
            </div>

            {/* システムステータス */}
            <div className="mt-6 text-xs text-cyan-500 font-mono">
              Error ID: {new Date().getTime()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes server-error {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.05) rotate(1deg);
          }
          50% {
            transform: scale(1) rotate(-1deg);
          }
          75% {
            transform: scale(0.95) rotate(1deg);
          }
        }

        .server-error-animation {
          animation: server-error 4s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
};

export default Custom500;