import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Filter, SortAsc, SortDesc, Search, Zap } from 'lucide-react';
import Layout from '@/components/Layout';
import StudySessionCard from '@/components/StudySessionCard';
import { StudySession } from '@/types';
import mockData from '@/data/mockData.json';

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export default function Sessions() {
  const router = useRouter();
  const { category } = router.query;
  
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<StudySession[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setSessions(mockData.studySessions as StudySession[]);
    setFilteredSessions(mockData.studySessions as StudySession[]);
    
    // URLパラメータからカテゴリを設定
    if (category && typeof category === 'string') {
      setSelectedCategory(category);
    }
  }, [category]);

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
  }, [sessions, selectedTags, sortOption, searchQuery, selectedCategory]);

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
      <Head>
        <title>セッション一覧 - HENKAKU AI LAB</title>
        <meta name="description" content="HENKAKU生成AI会で開催された全セッションを探索。最新のAI技術セッションを検索・フィルターして学習できます。" />
      </Head>

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
                      {mockData.categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
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
                <div className="card-cyber p-6 sticky top-4">
                  <h3 className="text-xl font-cyber font-bold text-neon-purple mb-6 flex items-center">
                    <Filter className="h-6 w-6 mr-3" />
                    NEURAL FILTERS
                  </h3>

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

                  {/* タグフィルター */}
                  <div>
                    <label className="block text-sm font-cyber font-medium text-cyber-300 mb-3 tracking-wider">
                      TAG MATRIX
                    </label>
                    <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                      {allTags.map((tag, index) => (
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
                {filteredSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSessions.map((session) => (
                      <StudySessionCard key={session.id} session={session} />
                    ))}
                  </div>
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
