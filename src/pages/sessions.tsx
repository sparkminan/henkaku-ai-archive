import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Filter, SortAsc, SortDesc, Search, Zap, Calendar, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '@/components/Layout';
import StudySessionCard from '@/components/StudySessionCard';
import SessionSkeleton from '@/components/SessionSkeleton';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import SEOHead from '@/components/SEOHead';
import { StudySession } from '@/types';
import { loadAllSessions, getCategories } from '@/utils/dataLoader';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAirtableSessions } from '@/hooks/useAirtableData';

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export default function Sessions() {
  const router = useRouter();
  const { category } = router.query;
  const { favorites } = useFavorites();
  
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<StudySession[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);
  const itemsPerPage = 9;
  
  // Airtableからデータを取得
  const { sessions: airtableSessions, loading: airtableLoading, error: airtableError } = useAirtableSessions();

  useEffect(() => {
    // データ読み込み
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        let loadedSessions: StudySession[];
        
        if (airtableSessions && airtableSessions.length > 0) {
          // Airtableデータを使用
          loadedSessions = airtableSessions as StudySession[];
        } else {
          // フォールバック: 静的データを使用
          loadedSessions = await loadAllSessions();
        }
        
        setSessions(loadedSessions);
        setFilteredSessions(loadedSessions);
        
        // URLパラメータからカテゴリを設定
        if (category && typeof category === 'string') {
          setSelectedCategory(category);
        }
      } catch (error) {
        console.error('Failed to load sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!airtableLoading) {
      fetchSessions();
    }
  }, [category, airtableSessions, airtableLoading]);

  useEffect(() => {
    let filtered = sessions;

    // カテゴリフィルター
    if (selectedCategory) {
      const categoryTagMap: { [key: string]: string[] } = {
        'fundamentals': ['基礎', '基礎知識', 'AI哲学', '目的論'],
        'tools': ['ツール', 'Claude Code', 'Cursor', 'Airtable', 'Bolt.new', 'Figma', 'Manus', 'Dify', 'Operator', 'SunoAI'],
        'development': ['開発', '実装', 'コード', '即席開発', 'プロトタイピング'],
        'creative': ['クリエイティブ', '画像生成', '音楽生成', 'NFT', 'アート制作'],
        'business': ['ビジネス', '実用', '効率化', '日常業務'],
        'ethics': ['倫理', 'AI倫理', 'ハルシネーション', '知的財産権', 'リスク'],
        'community': ['コミュニティ', '目標設定', '振り返り', '交流', '雑談']
      };
      
      const relevantTags = categoryTagMap[selectedCategory] || [];
      if (relevantTags.length > 0) {
        filtered = filtered.filter(session =>
          session.tags.some(tag => relevantTags.some(relevantTag => tag.includes(relevantTag)))
        );
      }
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // タグフィルター
    if (selectedTags.length > 0) {
      filtered = filtered.filter(session =>
        selectedTags.every(tag => session.tags.includes(tag))
      );
    }

    // 日付フィルター
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(session => {
        const sessionDate = new Date(session.date);
        if (dateRange.start && !dateRange.end) {
          return sessionDate >= new Date(dateRange.start);
        }
        if (!dateRange.start && dateRange.end) {
          return sessionDate <= new Date(dateRange.end);
        }
        if (dateRange.start && dateRange.end) {
          return sessionDate >= new Date(dateRange.start) && sessionDate <= new Date(dateRange.end);
        }
        return true;
      });
    }

    // お気に入りフィルター
    if (showFavoritesOnly) {
      filtered = filtered.filter(session => favorites.includes(session.id));
    }

    // ソート
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredSessions(filtered);
    // フィルターが変更されたら最初のページに戻る
    setCurrentPage(1);
  }, [sessions, selectedTags, sortOption, searchQuery, selectedCategory, dateRange, showFavoritesOnly, favorites]);

  const allTags = Array.from(
    new Set(sessions.flatMap(session => session.tags))
  ).sort();

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // ページネーション計算
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTagColor = (tag: string, index: number) => {
    const colors = [
      'border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20',
      'border-neon-purple/50 text-neon-purple hover:bg-neon-purple/20',
      'border-neon-pink/50 text-neon-pink hover:bg-neon-pink/20',
      'border-neon-green/50 text-neon-green hover:bg-neon-green/20',
      'border-cyber-400/50 text-cyber-400 hover:bg-cyber-400/20',
      'border-neon-yellow/50 text-neon-yellow hover:bg-neon-yellow/20',
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <SEOHead
        title="セッション一覧"
        description="HENKAKU生成AI会で開催された全28回以上のセッションアーカイブ。Claude、ChatGPT、Stable Diffusion、Web3×AI融合など最新のAI技術を体系的に学習できます。"
        keywords={['AI勉強会一覧', 'セッションアーカイブ', 'AI学習教材', 'オンライン勉強会']}
      />

      <Layout onSearch={handleSearch}>
        <div className="bg-dark-900 min-h-screen relative overflow-hidden">
          {/* 背景効果 */}
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neon-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neon-purple/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-dark-700 border border-cyber-500/50 rounded-xl">
                  <Search className="h-8 w-8 text-neon-blue" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-neon-blue mb-4">
                SESSION ARCHIVE
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-6"></div>
              
              <p className="text-lg text-cyan-300 max-w-3xl mx-auto leading-relaxed">
                生成AI技術の最新動向と実践的知見を収録した全セッションアーカイブ。
                知識の電脳空間を自由に探索してください。
              </p>
              
              {/* カテゴリフィルター表示 */}
              {selectedCategory && (
                <div className="mt-6">
                  <div className="inline-flex items-center px-4 py-2 bg-dark-700 border border-cyber-500/50 rounded-full">
                    <span className="text-sm font-cyber text-cyber-300 mr-2">FILTERED BY:</span>
                    <span className="text-sm font-cyber text-neon-blue">
                      {getCategories().find(c => c.id === selectedCategory)?.name || selectedCategory}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        router.push('/sessions', undefined, { shallow: true });
                      }}
                      className="ml-3 text-neon-pink hover:text-neon-blue transition-colors duration-300"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* サイドバー（フィルター） */}
              <div className="lg:w-80">
                <div className="card-cyber p-6 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                  <h3 className="text-xl font-cyber font-bold text-neon-purple mb-6 flex items-center">
                    <Filter className="h-6 w-6 mr-3" />
                    NEURAL FILTERS
                  </h3>

                  {/* お気に入りフィルター */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 flex items-center justify-center space-x-2 group
                                ${showFavoritesOnly 
                                  ? 'bg-neon-pink/20 border-neon-pink text-neon-pink hover:bg-neon-pink/30' 
                                  : 'bg-dark-700 dark:bg-dark-700 light:bg-white border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 text-cyan-300 dark:text-cyan-300 light:text-gray-700 hover:border-neon-pink dark:hover:border-neon-pink light:hover:border-pink-500'
                                }`}
                    >
                      <Heart className={`h-5 w-5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                      <span className="font-cyber tracking-wider">
                        {showFavoritesOnly ? 'SHOWING FAVORITES' : 'SHOW FAVORITES'}
                      </span>
                      {favorites.length > 0 && (
                        <span className="ml-2 px-2 py-1 bg-dark-800 dark:bg-dark-800 light:bg-gray-100 rounded-full text-xs">
                          {favorites.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* ソート */}
                  <div className="mb-6">
                    <label className="block text-sm font-cyber font-medium text-cyber-300 mb-3 tracking-wider">
                      SORT ORDER
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                      className="w-full p-3 bg-dark-700 border border-cyber-500/50 rounded-lg text-cyan-100 
                               focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 focus:outline-none
                               transition-all duration-300 font-cyber"
                    >
                      <option value="date-desc">最新順</option>
                      <option value="date-asc">古い順</option>
                      <option value="title-asc">タイトル昇順</option>
                      <option value="title-desc">タイトル降順</option>
                    </select>
                  </div>

                  {/* 日付フィルター */}
                  <div className="mb-6">
                    <label className="block text-sm font-cyber font-medium text-cyber-300 mb-3 tracking-wider">
                      DATE RANGE
                    </label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-cyan-400 mb-1">From</label>
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="w-full p-2 bg-dark-700 dark:bg-dark-700 light:bg-white 
                                   border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                   rounded-lg text-cyan-100 dark:text-cyan-100 light:text-gray-900
                                   focus:border-neon-blue dark:focus:border-neon-blue light:focus:border-blue-500
                                   focus:ring-2 focus:ring-neon-blue/50 dark:focus:ring-neon-blue/50 light:focus:ring-blue-500/50
                                   focus:outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-cyan-400 mb-1">To</label>
                        <input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="w-full p-2 bg-dark-700 dark:bg-dark-700 light:bg-white 
                                   border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                   rounded-lg text-cyan-100 dark:text-cyan-100 light:text-gray-900
                                   focus:border-neon-blue dark:focus:border-neon-blue light:focus:border-blue-500
                                   focus:ring-2 focus:ring-neon-blue/50 dark:focus:ring-neon-blue/50 light:focus:ring-blue-500/50
                                   focus:outline-none transition-all duration-300"
                        />
                      </div>
                      {(dateRange.start || dateRange.end) && (
                        <button
                          onClick={() => setDateRange({ start: '', end: '' })}
                          className="text-xs text-neon-pink hover:text-neon-blue transition-colors duration-300 font-cyber"
                        >
                          CLEAR DATE FILTER
                        </button>
                      )}
                    </div>
                  </div>

                  {/* タグフィルター */}
                  <div>
                    <label className="block text-sm font-cyber font-medium text-cyber-300 mb-3 tracking-wider">
                      TAG MATRIX
                    </label>
                    <div className="space-y-3">
                      {(showAllTags ? allTags : allTags.slice(0, 5)).map((tag, index) => (
                        <label key={tag} className="flex items-center group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleTagToggle(tag)}
                            className="h-4 w-4 text-neon-blue bg-dark-700 border-cyber-500 rounded 
                                     focus:ring-neon-blue focus:ring-2 transition-all duration-300"
                          />
                          <span className={`ml-3 text-sm font-cyber transition-all duration-300 
                                         group-hover:text-neon-blue ${
                                           selectedTags.includes(tag) ? 'text-neon-blue' : 'text-cyan-300'
                                         }`}>
                            {tag}
                          </span>
                        </label>
                      ))}
                    </div>
                    {allTags.length > 5 && (
                      <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="mt-3 flex items-center text-xs text-cyan-400 hover:text-neon-blue font-cyber transition-colors duration-300"
                      >
                        {showAllTags ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            折りたたむ
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            他{allTags.length - 5}個のタグを表示
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* 選択中のタグ */}
                  {selectedTags.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-cyber-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-cyber font-medium text-cyber-300 tracking-wider">
                          ACTIVE TAGS
                        </span>
                        <button
                          onClick={() => setSelectedTags([])}
                          className="text-xs text-neon-pink hover:text-neon-blue transition-colors duration-300 font-cyber"
                        >
                          CLEAR ALL
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag, index) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-cyber 
                                      border transition-all duration-300 cursor-pointer
                                      ${getTagColor(tag, index)}`}
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                            <span className="ml-2 hover:scale-110 transition-transform duration-300">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* メインコンテンツ */}
              <div className="flex-1">
                {/* 結果の件数 */}
                <div className="mb-6 p-4 bg-dark-800/50 border border-cyber-500/30 rounded-lg">
                  <p className="text-cyan-300 font-cyber">
                    <span className="text-neon-blue text-xl font-bold">{filteredSessions.length}</span>
                    <span className="ml-2">SESSIONS FOUND</span>
                  </p>
                </div>

                {/* セッション一覧 */}
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <SessionSkeleton key={index} />
                    ))}
                  </div>
                ) : paginatedSessions.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paginatedSessions.map((session) => (
                        <StudySessionCard key={session.id} session={session} />
                      ))}
                    </div>
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="card-cyber p-12">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-dark-700 border border-cyber-500/50 rounded-xl flex items-center justify-center mx-auto">
                          <Search className="h-8 w-8 text-cyber-400" />
                        </div>
                      </div>
                      
                      <p className="text-cyber-300 text-lg mb-4 font-cyber">
                        NO SESSIONS FOUND
                      </p>
                      <p className="text-cyan-400 text-sm mb-6">
                        指定された条件に一致するセッションが見つかりませんでした。
                      </p>
                      
                      <button
                        onClick={() => {
                          setSelectedTags([]);
                          setSearchQuery('');
                          setSelectedCategory('');
                          setDateRange({ start: '', end: '' });
                          router.push('/sessions', undefined, { shallow: true });
                        }}
                        className="btn-cyber-primary group"
                      >
                        <span className="flex items-center">
                          <Zap className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          RESET FILTERS
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
