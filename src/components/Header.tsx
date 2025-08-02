import React from 'react';
import Link from 'next/link';
import { Search, Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-cyber border-b border-cyber-500/30 shadow-cyber-glow">
      {/* ホログラム効果 */}
      <div className="absolute inset-0 hologram opacity-20 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ・タイトル */}
          <div className="flex items-center group">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg flex items-center justify-center shadow-neon-blue group-hover:shadow-neon-purple transition-all duration-300 floating">
                <Zap className="text-dark-900 w-6 h-6" />
                <div className="absolute inset-0 bg-neon-blue opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-xl font-cyber font-bold text-neon-blue group-hover:text-neon transition-all duration-300">
                  HENKAKU
                </h1>
                <p className="text-xs text-cyber-300 font-cyber tracking-wider">
                  GENERATIVE AI LAB
                </p>
              </div>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium relative group">
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/sessions" className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium relative group">
              SESSIONS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/categories" className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium relative group">
              CATEGORIES
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/about" className="text-cyan-300 hover:text-neon-blue transition-all duration-300 font-medium relative group">
              ABOUT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* 検索バーとテーマトグル */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-12 pr-4 py-2 bg-dark-700/80 dark:bg-dark-700/80 light:bg-white 
                         border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 rounded-lg 
                         text-cyan-100 dark:text-cyan-100 light:text-gray-900 
                         placeholder-cyan-400 dark:placeholder-cyan-400 light:placeholder-gray-500 
                         focus:border-neon-blue dark:focus:border-neon-blue light:focus:border-blue-500 
                         focus:ring-2 focus:ring-neon-blue/50 dark:focus:ring-neon-blue/50 light:focus:ring-blue-500/50 
                         focus:outline-none transition-all duration-300
                         group-hover:border-cyber-400 dark:group-hover:border-cyber-400 light:group-hover:border-blue-400"
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-cyber-400 dark:text-cyber-400 light:text-gray-500 
                               group-hover:text-neon-blue dark:group-hover:text-neon-blue light:group-hover:text-blue-500 
                               transition-colors duration-300" />
              <div className="absolute inset-0 bg-neon-blue dark:bg-neon-blue light:bg-blue-500 
                            opacity-0 rounded-lg blur-sm group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </form>
            <ThemeToggle />
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 text-cyan-300 hover:text-neon-blue transition-colors duration-300 relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-cyber border-t border-cyber-500/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-500/5 to-transparent pointer-events-none"></div>
          <div className="relative px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-dark-700/80 border border-cyber-500/50 rounded-lg 
                         text-cyan-100 placeholder-cyan-400 focus:border-neon-blue focus:ring-2 
                         focus:ring-neon-blue/50 focus:outline-none transition-all duration-300"
              />
              <Search className="absolute left-4 top-2.5 h-5 w-5 text-cyber-400" />
            </form>
            <div className="space-y-2">
              <Link href="/" className="block py-2 text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium">
                HOME
              </Link>
              <Link href="/sessions" className="block py-2 text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium">
                SESSIONS
              </Link>
              <Link href="/categories" className="block py-2 text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium">
                CATEGORIES
              </Link>
              <Link href="/about" className="block py-2 text-cyan-300 hover:text-neon-blue transition-colors duration-300 font-medium">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
