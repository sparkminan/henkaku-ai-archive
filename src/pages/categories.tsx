import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Grid, Cpu, Code, Palette, Briefcase, Brain, Users, ArrowRight, Activity } from 'lucide-react';
import Layout from '@/components/Layout';
import { Category } from '@/types';
import mockData from '@/data/mockData.json';

export default function Categories() {
  const categories = mockData.categories;

  const getSessionCountByCategory = (categoryId: string) => {
    // カテゴリに対応するタグを持つセッションをカウント
    const categoryTagMap: { [key: string]: string[] } = {
      'fundamentals': ['基礎', '基礎知識', 'AI哲学', '目的論'],
      'tools': ['ツール', 'Claude Code', 'Cursor', 'Airtable', 'Bolt.new', 'Figma', 'Manus', 'Dify', 'Operator', 'SunoAI'],
      'development': ['開発', '実装', 'コード', '即席開発', 'プロトタイピング'],
      'creative': ['クリエイティブ', '画像生成', '音楽生成', 'NFT', 'アート制作'],
      'business': ['ビジネス', '実用', '効率化', '日常業務'],
      'ethics': ['倫理', 'AI倫理', 'ハルシネーション', '知的財産権', 'リスク'],
      'community': ['コミュニティ', '目標設定', '振り返り', '交流', '雑談']
    };

    const relevantTags = categoryTagMap[categoryId] || [];
    return (mockData.studySessions as any[]).filter(session =>
      session.tags.some((tag: string) => relevantTags.some(relevantTag => tag.includes(relevantTag)))
    ).length;
  };

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'fundamentals': <Cpu className="h-8 w-8" />,
      'tools': <Grid className="h-8 w-8" />,
      'development': <Code className="h-8 w-8" />,
      'creative': <Palette className="h-8 w-8" />,
      'business': <Briefcase className="h-8 w-8" />,
      'ethics': <Brain className="h-8 w-8" />,
      'community': <Users className="h-8 w-8" />
    };
    return iconMap[categoryId] || <Grid className="h-8 w-8" />;
  };

  const getCategoryGradient = (color: string) => {
    const gradientMap: { [key: string]: string } = {
      'blue': 'from-blue-400 to-cyan-600',
      'purple': 'from-purple-400 to-violet-600',
      'green': 'from-green-400 to-emerald-600',
      'orange': 'from-orange-400 to-amber-600',
      'red': 'from-red-400 to-pink-600',
      'indigo': 'from-indigo-400 to-blue-600',
      'pink': 'from-pink-400 to-rose-600'
    };
    return gradientMap[color] || 'from-cyan-400 to-blue-600';
  };

  return (
    <>
      <Head>
        <title>KNOWLEDGE DOMAINS - HENKAKU AI LAB</title>
        <meta name="description" content="生成AI技術の知識体系を分野別に探索。HENKAKU AI LABの学習リソースをカテゴリごとに整理したサイバー・ナレッジ・マップ。" />
      </Head>

      <Layout>
        <div className="bg-dark-900 min-h-screen relative overflow-hidden">
          {/* 背景エフェクト */}
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-full blur-3xl floating"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 rounded-full blur-3xl floating" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* ヘッダー */}
            <div className="text-center mb-16">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-cyber-500/20 border border-cyber-400/50 rounded-full text-cyber-300 text-sm font-cyber tracking-wider mb-6">
                  CATEGORY MATRIX
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-cyber font-black mb-6">
                <span className="text-neon bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink bg-clip-text text-transparent">
                  KNOWLEDGE DOMAINS
                </span>
              </h1>
              
              <p className="text-xl text-cyan-300 max-w-3xl mx-auto leading-relaxed">
                生成AI技術の広大な知識空間を、体系的に整理された
                <br />
                <span className="text-neon-blue font-cyber">7つのドメイン</span>から探索してください
              </p>
            </div>

            {/* カテゴリグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {categories.map((category, index) => {
                const sessionCount = getSessionCountByCategory(category.id);
                return (
                  <Link
                    key={category.id}
                    href={`/sessions?category=${category.id}`}
                    className="group relative"
                  >
                    <div className="card-cyber p-8 h-full flex flex-col relative overflow-hidden hover:scale-[1.03] transition-all duration-300">
                      {/* 背景グラデーション */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${getCategoryGradient(category.color)}`}></div>
                      
                      {/* アイコンコンテナ */}
                      <div className="relative mb-6">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category.color)} p-[2px] group-hover:shadow-neon-${category.color} transition-all duration-300`}>
                          <div className="w-full h-full bg-dark-800 rounded-2xl flex items-center justify-center text-white">
                            {getCategoryIcon(category.id)}
                          </div>
                        </div>
                        
                        {/* パルスエフェクト */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getCategoryGradient(category.color)} blur-lg opacity-0 group-hover:opacity-50 animate-pulse`}></div>
                      </div>
                      
                      {/* カテゴリ名 */}
                      <h3 className="text-2xl font-cyber font-bold text-cyan-100 mb-3 group-hover:text-neon-blue transition-colors duration-300">
                        {category.name}
                      </h3>
                      
                      {/* 説明 */}
                      <p className="text-cyan-300 mb-6 leading-relaxed flex-grow">
                        {category.description}
                      </p>
                      
                      {/* 統計とアクション */}
                      <div className="pt-4 border-t border-cyber-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-cyber-400" />
                            <span className="text-sm font-cyber text-cyber-400">
                              {sessionCount} SESSIONS
                            </span>
                          </div>
                          <div className="flex items-center text-neon-blue group-hover:text-neon-purple transition-colors duration-300">
                            <span className="text-sm font-cyber mr-1">EXPLORE</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                      
                      {/* ホバー時の光る縁取り */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                           style={{
                             background: `linear-gradient(45deg, transparent 30%, rgba(${
                               category.color === 'blue' ? '0,245,255' :
                               category.color === 'purple' ? '191,0,255' :
                               category.color === 'green' ? '0,255,65' :
                               category.color === 'orange' ? '255,165,0' :
                               category.color === 'red' ? '255,0,128' :
                               category.color === 'indigo' ? '75,0,130' : '255,192,203'
                             }, 0.2) 50%, transparent 70%)`,
                             backgroundSize: '200% 200%',
                           }}>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 統計セクション */}
            <section className="relative py-16">
              <div className="card-cyber p-12 relative overflow-hidden">
                {/* 背景エフェクト */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-transparent"></div>
                
                <div className="relative">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-cyber font-bold text-neon-purple mb-4">
                      DOMAIN STATISTICS
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-pink mx-auto"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
                    {categories.map((category) => {
                      const count = getSessionCountByCategory(category.id);
                      return (
                        <div key={category.id} className="text-center group">
                          <div className="relative mb-4">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryGradient(category.color)} p-[2px] mx-auto group-hover:scale-110 transition-transform duration-300`}>
                              <div className="w-full h-full bg-dark-800 rounded-xl flex items-center justify-center text-white text-sm">
                                {getCategoryIcon(category.id)}
                              </div>
                            </div>
                          </div>
                          <div className="text-3xl font-cyber font-bold text-neon-blue mb-2 group-hover:text-neon-purple transition-colors duration-300">
                            {count}
                          </div>
                          <div className="text-xs font-cyber text-cyber-300 uppercase tracking-wider">
                            {category.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* 総計 */}
                  <div className="mt-12 pt-8 border-t border-cyber-500/30 text-center">
                    <div className="inline-flex items-center space-x-4">
                      <div className="text-5xl font-cyber font-black text-transparent bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text">
                        {mockData.studySessions.length}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-cyber text-cyber-400 uppercase">TOTAL</div>
                        <div className="text-xl font-cyber text-cyan-200">SESSIONS ARCHIVED</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTAセクション */}
            <section className="mt-16 text-center">
              <div className="relative">
                <div className="card-cyber p-12 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border-2 border-neon-blue/50 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                  {/* アニメーションライン */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent" 
                       style={{animation: 'slide 3s linear infinite'}}></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-neon-purple to-transparent" 
                       style={{animation: 'slide 3s linear infinite reverse'}}></div>
                  
                  <h2 className="text-3xl font-cyber font-bold text-cyan-100 mb-4">
                    ACCESS FULL ARCHIVE
                  </h2>
                  <p className="text-cyan-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                    カテゴリの枠を超えて、すべての知識リソースに
                    <br />
                    ダイレクトアクセスが可能です
                  </p>
                  <Link href="/sessions" className="btn-cyber-primary text-lg px-8 py-4 inline-flex items-center group">
                    <span className="mr-2">全セッション探索</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
