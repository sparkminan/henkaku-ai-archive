import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="card-cyber p-8 md:p-12 text-center">
              {/* エラーアイコン */}
              <div className="mb-8 flex justify-center">
                <div className="p-6 bg-red-500/20 border border-red-500/50 rounded-full animate-pulse">
                  <AlertTriangle className="h-12 w-12 text-red-500" />
                </div>
              </div>

              {/* エラーメッセージ */}
              <h1 className="text-3xl md:text-4xl font-cyber font-bold text-neon-pink mb-4">
                SYSTEM ERROR
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-purple mx-auto mb-6"></div>
              
              <p className="text-lg text-cyan-300 mb-8">
                申し訳ございません。予期しないエラーが発生しました。
              </p>

              {/* エラー詳細（開発環境のみ） */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-dark-800 border border-cyber-500/30 rounded-lg text-left">
                  <p className="text-sm font-mono text-red-400 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-xs text-gray-400">
                      <summary className="cursor-pointer hover:text-cyan-300 transition-colors">
                        スタックトレース
                      </summary>
                      <pre className="mt-2 overflow-auto max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-cyber-primary group"
                >
                  <span className="flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    再試行
                  </span>
                </button>
                
                <Link href="/" className="btn-cyber-secondary group">
                  <span className="flex items-center justify-center">
                    <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    ホームに戻る
                  </span>
                </Link>
              </div>

              {/* サポート情報 */}
              <div className="mt-12 pt-8 border-t border-cyber-500/30">
                <p className="text-sm text-cyan-400 mb-2">
                  問題が続く場合は、以下の方法でお知らせください：
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                  <a
                    href="https://github.com/sparkminan/henkaku-ai-archive/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-purple transition-colors"
                  >
                    GitHub Issues
                  </a>
                  <span className="hidden sm:inline text-cyan-500">•</span>
                  <a
                    href="https://discord.gg/henkaku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-purple transition-colors"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// カスタムフック版（関数コンポーネント用）
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
}