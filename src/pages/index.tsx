import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, BookOpen, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import StudySessionCard from '@/components/StudySessionCard';
import { StudySession } from '@/types';
import mockData from '@/data/mockData.json';

export default function Home() {
  const [recentSessions, setRecentSessions] = useState<StudySession[]>([]);
  const [searchResults, setSearchResults] = useState<StudySession[] | null>(null);

  useEffect(() => {
    // 最新の4件を取得
    const sessions = mockData.studySessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
    setRecentSessions(sessions);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const results = mockData.studySessions.filter(session =>
      session.title.toLowerCase().includes(query.toLowerCase()) ||
      session.description.toLowerCase().includes(query.toLowerCase()) ||
      session.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      session.presenter.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const displaySessions = searchResults || recentSessions;

  return (
    <>
      <Head>
        <title>HENKAKU 生成AI会 アーカイブ - ホーム</title>
        <meta name="description" content="HENKAKU生成AI会の勉強会資料・情報をアーカイブするサイトです。最新の生成AI技術について学べる資料を提供しています。" />
      </Head>

      <Layout onSearch={handleSearch}>
        {!searchResults ? (
          <>
            {/* ヒーローセクション */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    HENKAKU 生成AI会
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-primary-100">
                    生成AI技術の知識共有アーカイブ
                  </p>
                  <p className="text-lg mb-8 max-w-3xl mx-auto text-primary-50">
                    最新の生成AI技術について学び、実践的な知識を共有するコミュニティの
                    勉強会で発表された資料や情報をアーカイブしています。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/sessions" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                      勉強会一覧を見る
                    </Link>
                    <Link href="/categories" className="btn-secondary bg-primary-700 text-white hover:bg-primary-600 border-primary-400">
                      カテゴリから探す
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 統計セクション */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="flex justify-center mb-2">
                      <Calendar className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {mockData.studySessions.length}
                    </div>
                    <div className="text-gray-600">勉強会</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <BookOpen className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {mockData.studySessions.reduce((total, session) => total + session.materials.length, 0)}
                    </div>
                    <div className="text-gray-600">資料</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <Users className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {new Set(mockData.studySessions.map(s => s.presenter)).size}
                    </div>
                    <div className="text-gray-600">発表者</div>
                  </div>
                  <div>
                    <div className="flex justify-center mb-2">
                      <TrendingUp className="h-8 w-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {mockData.categories.length}
                    </div>
                    <div className="text-gray-600">カテゴリ</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 最新の勉強会セクション */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    最新の勉強会
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    最近開催された勉強会の資料をチェックして、
                    最新の生成AI技術についてキャッチアップしましょう。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {recentSessions.map((session) => (
                    <StudySessionCard key={session.id} session={session} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/sessions" className="btn-primary">
                    すべての勉強会を見る
                  </Link>
                </div>
              </div>
            </section>

            {/* カテゴリセクション */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    カテゴリから探す
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    興味のある分野から勉強会資料を探してみてください。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockData.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="card p-6 hover:scale-105 transition-transform duration-200"
                    >
                      <div className={`w-12 h-12 rounded-lg mb-4 bg-${category.color}-100 flex items-center justify-center`}>
                        <div className={`w-6 h-6 bg-${category.color}-500 rounded`}></div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          // 検索結果表示
          <section className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  検索結果
                </h2>
                <p className="text-lg text-gray-600">
                  {searchResults.length}件の勉強会が見つかりました
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((session) => (
                    <StudySessionCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    検索に一致する勉強会が見つかりませんでした。
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
