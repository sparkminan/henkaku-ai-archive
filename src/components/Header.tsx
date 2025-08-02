import React from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ・タイトル */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HENKAKU</h1>
                <p className="text-xs text-gray-600">生成AI会アーカイブ</p>
              </div>
            </Link>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              ホーム
            </Link>
            <Link href="/sessions" className="text-gray-700 hover:text-primary-600 transition-colors">
              勉強会一覧
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
              カテゴリ
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              このサイトについて
            </Link>
          </nav>

          {/* 検索バー */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="勉強会を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="勉強会を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600">
              ホーム
            </Link>
            <Link href="/sessions" className="block py-2 text-gray-700 hover:text-primary-600">
              勉強会一覧
            </Link>
            <Link href="/categories" className="block py-2 text-gray-700 hover:text-primary-600">
              カテゴリ
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary-600">
              このサイトについて
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
