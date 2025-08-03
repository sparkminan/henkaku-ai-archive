import React from 'react';
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card-cyber p-6 text-center">
          {/* エラーアイコン */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* エラーメッセージ */}
          <h3 className="text-xl font-cyber font-bold text-neon-pink mb-3">
            エラーが発生しました
          </h3>
          
          <p className="text-sm text-cyan-300 mb-6">
            申し訳ございません。コンテンツの読み込み中にエラーが発生しました。
          </p>

          {/* エラー詳細トグル */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mb-4 text-xs text-cyan-400 hover:text-neon-blue transition-colors 
                       flex items-center justify-center mx-auto"
            >
              エラー詳細を{showDetails ? '非表示' : '表示'}
              {showDetails ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </button>
          )}

          {/* エラー詳細 */}
          {showDetails && process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-3 bg-dark-800 border border-cyber-500/30 rounded text-left">
              <p className="text-xs font-mono text-red-400 break-all">
                {error.message}
              </p>
              {error.stack && (
                <pre className="mt-2 text-xs text-gray-400 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              )}
            </div>
          )}

          {/* 再試行ボタン */}
          <button
            onClick={resetErrorBoundary}
            className="btn-cyber-primary text-sm group"
          >
            <span className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              再試行
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}