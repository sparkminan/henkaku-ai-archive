import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, Users, BookOpen, TrendingUp, Brain, Zap, CircuitBoard, Cpu } from 'lucide-react';
import Layout from '@/components/Layout';
import StudySessionCard from '@/components/StudySessionCard';
import { StudySession } from '@/types';
import mockData from '@/data/mockData.json';
import { getImagePath } from '@/utils/config';

export default function Home() {
  const [recentSessions, setRecentSessions] = useState<StudySession[]>([]);
  const [searchResults, setSearchResults] = useState<StudySession[] | null>(null);

  useEffect(() => {
    // 最新の4件を取得
    const sessions = (mockData.studySessions as StudySession[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);
    setRecentSessions(sessions);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    const results = (mockData.studySessions as StudySession[]).filter(session =>
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
        <title>HENKAKU AI LAB - 生成AI勉強会アーカイブ</title>
        <meta name="description" content="HENKAKU生成AI会の勉強会資料・情報をアーカイブするサイバー空間。最新のAI技術について学べる未来的なプラットフォーム。" />
      </Head>

      <Layout onSearch={handleSearch}>
        {!searchResults ? (
          <>
            {/* ヒーローセクション */}
            <section className="relative hero-bg py-20 overflow-hidden">
              {/* 背景装飾 */}
              <div className="absolute inset-0 cyber-grid opacity-20"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-3xl floating"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-neon-pink/20 to-neon-blue/20 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* 左側テキスト */}
                  <div className="text-center lg:text-left">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-cyber-500/20 border border-cyber-400/50 rounded-full text-cyber-300 text-sm font-cyber tracking-wider mb-4">
                        GENERATIVE AI KNOWLEDGE BASE
                      </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-cyber font-black mb-6">
                      <span className="text-neon-blue">HENKAKU</span>
                      <br />
                      <span className="text-neon">AI LAB</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-8 text-cyan-200 leading-relaxed">
                      生成AI技術の最前線を探求する
                      <br />
                      <span className="text-cyber-glow">サイバー・ナレッジ・アーカイブ</span>
                    </p>
                    
                    <p className="text-lg mb-8 text-cyan-300 leading-relaxed max-w-2xl">
                      未来への扉を開く生成AI技術。HENKAKUコミュニティが蓄積した
                      知識と洞察を、この電脳空間でご体験ください。
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link href="/sessions" className="btn-cyber-primary text-lg px-8 py-4 group">
                        <span className="flex items-center">
                          <Brain className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          セッション一覧
                        </span>
                      </Link>
                      <Link href="/categories" className="btn-cyber text-lg px-8 py-4 group">
                        <span className="flex items-center">
                          <CircuitBoard className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          カテゴリ探索
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* 右側イラスト */}
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative">
                      <img
                        src={getImagePath("/images/ai-hero-illustration.svg")}
                        alt="AI Knowledge Network"
                        className="w-full max-w-lg h-auto floating"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 統計セクション */}
            <section className="py-16 bg-dark-800/50 border-y border-cyber-500/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-dark-700 border border-cyber-500/50 rounded-xl group-hover:border-neon-blue group-hover:shadow-neon-blue transition-all duration-300">
                        <Calendar className="h-8 w-8 text-neon-blue group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="text-4xl font-cyber font-bold text-neon-blue mb-2">
                      {mockData.studySessions.length}
                    </div>
                    <div className="text-cyber-300 font-cyber tracking-wider">SESSIONS</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-dark-700 border border-cyber-500/50 rounded-xl group-hover:border-neon-purple group-hover:shadow-neon-purple transition-all duration-300">
                        <BookOpen className="h-8 w-8 text-neon-purple group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="text-4xl font-cyber font-bold text-neon-purple mb-2">
                      {mockData.studySessions.reduce((total, session) => total + session.materials.length, 0)}
                    </div>
                    <div className="text-cyber-300 font-cyber tracking-wider">MATERIALS</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-dark-700 border border-cyber-500/50 rounded-xl group-hover:border-neon-pink group-hover:shadow-neon-pink transition-all duration-300">
                        <Users className="h-8 w-8 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="text-4xl font-cyber font-bold text-neon-pink mb-2">
                      {new Set(mockData.studySessions.map(s => s.presenter)).size}
                    </div>
                    <div className="text-cyber-300 font-cyber tracking-wider">SPEAKERS</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-dark-700 border border-cyber-500/50 rounded-xl group-hover:border-neon-green group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all duration-300">
                        <TrendingUp className="h-8 w-8 text-neon-green group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="text-4xl font-cyber font-bold text-neon-green mb-2">
                      {mockData.categories.length}
                    </div>
                    <div className="text-cyber-300 font-cyber tracking-wider">CATEGORIES</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 最新セッション */}
            <section className="py-16 bg-dark-900 relative overflow-hidden">
              <div className="absolute inset-0 matrix-bg opacity-10"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-dark-700 border border-cyber-500/50 rounded-xl">
                      <Cpu className="h-8 w-8 text-neon-blue" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-cyber font-bold text-neon-blue mb-4">
                    LATEST SESSIONS
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-6"></div>
                  
                  <p className="text-lg text-cyan-300 max-w-3xl mx-auto leading-relaxed">
                    最新の生成AI技術と実践的な知見を収録したセッションを探索し、
                    未来のテクノロジーへの理解を深めてください。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {recentSessions.map((session) => (
                    <StudySessionCard key={session.id} session={session} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/sessions" className="btn-cyber-primary text-lg px-8 py-4 group">
                    <span className="flex items-center">
                      全セッション探索
                      <Zap className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* カテゴリセクション */}
            <section className="py-16 bg-dark-800/80 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-transparent"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-cyber font-bold text-neon-purple mb-4">
                    KNOWLEDGE DOMAINS
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto mb-6"></div>
                  
                  <p className="text-lg text-cyan-300 max-w-3xl mx-auto leading-relaxed">
                    専門分野別に整理された知識体系から、
                    あなたの興味に最適化された学習パスを発見してください。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockData.categories.map((category, index) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="card-cyber p-8 group hover:scale-105 transition-all duration-300"
                    >
                      <div className={`w-16 h-16 rounded-xl mb-6 bg-gradient-to-br from-${category.color}-400/20 to-${category.color}-600/20 
                                     border border-${category.color}-400/50 flex items-center justify-center 
                                     group-hover:border-${category.color}-300 group-hover:shadow-[0_0_20px_rgba(${
                                       category.color === 'blue' ? '0,245,255' :
                                       category.color === 'purple' ? '191,0,255' :
                                       category.color === 'green' ? '0,255,65' :
                                       category.color === 'orange' ? '255,165,0' :
                                       category.color === 'red' ? '255,0,128' :
                                       category.color === 'indigo' ? '75,0,130' : '255,192,203'
                                     },0.3)] transition-all duration-300`}>
                        <div className={`w-8 h-8 bg-gradient-to-br from-${category.color}-400 to-${category.color}-600 rounded`}></div>
                      </div>
                      
                      <h3 className="text-2xl font-cyber font-bold text-cyan-100 mb-3 group-hover:text-neon-blue transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      <p className="text-cyan-300 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm text-cyber-400 font-cyber">
                          EXPLORE →
                        </span>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-neon-blue to-transparent group-hover:to-neon-blue transition-all duration-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          // 検索結果表示
          <section className="py-16 bg-dark-900 min-h-screen relative">
            <div className="absolute inset-0 cyber-grid opacity-10"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-4xl font-cyber font-bold text-neon-blue mb-4">
                  SEARCH RESULTS
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-6"></div>
                <p className="text-lg text-cyan-300">
                  {searchResults.length} セッションが見つかりました
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
                  <div className="p-8 bg-dark-800/50 border border-cyber-500/30 rounded-xl">
                    <p className="text-cyber-300 text-lg mb-4">
                      検索条件に一致するセッションが見つかりませんでした。
                    </p>
                    <p className="text-cyan-400 text-sm">
                      別のキーワードで検索してみてください。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
