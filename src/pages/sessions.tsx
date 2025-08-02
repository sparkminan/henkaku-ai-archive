import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import Layout from '@/components/Layout';
import StudySessionCard from '@/components/StudySessionCard';
import { StudySession } from '@/types';
import mockData from '@/data/mockData.json';

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export default function Sessions() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<StudySession[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSessions(mockData.studySessions as StudySession[]);
    setFilteredSessions(mockData.studySessions as StudySession[]);
  }, []);

  useEffect(() => {
    let filtered = sessions;

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
  }, [sessions, selectedTags, sortOption, searchQuery]);

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

  return (
    <>
      <Head>
        <title>勉強会一覧 - HENKAKU 生成AI会 アーカイブ</title>
        <meta name="description" content="HENKAKU生成AI会で開催された勉強会の一覧です。資料やプレゼンテーションを検索・閲覧できます。" />
      </Head>

      <Layout onSearch={handleSearch}>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                勉強会一覧
              </h1>
              <p className="text-lg text-gray-600">
                これまでに開催された生成AI会の勉強会資料をご覧いただけます。
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* サイドバー（フィルター） */}
              <div className="lg:w-80">
                <div className="card p-6 sticky top-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    フィルター
                  </h3>

                  {/* ソート */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      並び順
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="date-desc">新しい順</option>
                      <option value="date-asc">古い順</option>
                      <option value="title-asc">タイトル昇順</option>
                      <option value="title-desc">タイトル降順</option>
                    </select>
                  </div>

                  {/* タグフィルター */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      タグで絞り込み
                    </label>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {allTags.map((tag) => (
                        <label key={tag} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleTagToggle(tag)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 選択中のタグ */}
                  {selectedTags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          選択中のタグ
                        </span>
                        <button
                          onClick={() => setSelectedTags([])}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          すべて解除
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            {tag}
                            <button
                              onClick={() => handleTagToggle(tag)}
                              className="ml-1 text-primary-600 hover:text-primary-700"
                            >
                              ×
                            </button>
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
                <div className="mb-6">
                  <p className="text-gray-600">
                    {filteredSessions.length}件の勉強会が見つかりました
                  </p>
                </div>

                {/* 勉強会一覧 */}
                {filteredSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSessions.map((session) => (
                      <StudySessionCard key={session.id} session={session} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                      条件に一致する勉強会が見つかりませんでした。
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTags([]);
                        setSearchQuery('');
                      }}
                      className="btn-primary"
                    >
                      フィルターをリセット
                    </button>
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
