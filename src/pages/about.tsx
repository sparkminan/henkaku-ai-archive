import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Users, BookOpen, Target, Heart, ExternalLink, Zap, Brain, Code2, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <>
      <Head>
        <title>ABOUT - HENKAKU AI LAB</title>
        <meta name="description" content="HENKAKU生成AI会アーカイブサイトの目的、運営方針、制作者情報について。合同会社texxが制作・監修。" />
      </Head>

      <Layout>
        <div className="bg-dark-900 min-h-screen relative overflow-hidden">
          {/* 背景効果 */}
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neon-blue/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neon-purple/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-dark-700 border border-cyber-500/50 rounded-xl">
                  <Brain className="h-8 w-8 text-neon-blue" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-neon-blue mb-4">
                ABOUT THIS PROJECT
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-6"></div>
              <p className="text-lg text-cyan-300">
                HENKAKU AI LABの目的とビジョン
              </p>
            </div>

            {/* メインコンテンツ */}
            <div className="space-y-8">
              {/* サイトの目的 */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-neon-blue mr-3 glow-neon-blue" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-blue">MISSION</h2>
                </div>
                <div className="text-cyan-200 leading-relaxed">
                  <p>
                    HENKAKU AI LABは、HENKAKUコミュニティで開催している「生成AI会」の勉強会で発表された内容をアーカイブし、最新のAI技術を楽しく議論しながら学び、実験して日々の生活に役立てることを目的としています。
                  </p>
                </div>
              </section>

              {/* HENKAKUについて */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-neon-purple mr-3 glow-neon-purple" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-purple">HENKAKU COMMUNITY</h2>
                </div>
                <div className="text-cyan-200 leading-relaxed">
                  <p className="mb-4">
                    HENKAKUは、元MITメディアラボ所長の伊藤穰一氏がホストする
                    Web3に特化したDiscordコミュニティです。
                    テクノロジーとクリエイティビティの融合を探求し、
                    最先端技術の学習と実践を通じて未来を創造しています。
                  </p>
                  <p className="mb-6">
                    生成AI会は、コミュニティ内で定期的に開催される勉強会で、
                    最新のAI技術動向、実践的な活用方法、
                    ビジネス応用例などについて活発な議論と知識共有を行っています。
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://community.henkaku.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-neon-blue hover:text-neon-purple transition-colors font-cyber"
                    >
                      HENKAKU COMMUNITY
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </section>

              {/* 制作・監修 */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Code2 className="h-8 w-8 text-neon-pink mr-3 glow-neon-pink" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-pink">CREATED BY</h2>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-cyber text-neon-green mb-4">合同会社texx</h3>
                  <p className="text-cyan-200 leading-relaxed mb-6">
                    最先端のテクノロジーとクリエイティビティを融合し、デジタル体験の創造、使いこなしをけん引し、すべての人にわかりやすく伝えてテクノロジーとの共生の楽しさを届けるチームです。 AI、Web3、XRなどの先端技術を活用した 革新的なソリューションを提供しています。
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <Sparkles className="h-6 w-6 text-neon-blue mr-3" />
                        <h4 className="text-lg font-cyber text-neon-blue">Spark</h4>
                      </div>
                      <p className="text-cyan-300 text-sm leading-relaxed">
                        texx共同創業者CEO兼CSO。AI技術をはじめとした先端技術の探索と社会適用を目指しデジタル体験の設計と実装を担当。
                      </p>
                    </div>
                    
                    <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <Zap className="h-6 w-6 text-neon-purple mr-3" />
                        <h4 className="text-lg font-cyber text-neon-purple">Minta</h4>
                      </div>
                      <p className="text-cyan-300 text-sm leading-relaxed">
                        texx共同創業者CEO兼CTO。vibecoder、インフルエンサー。先端技術の使いこなしとプレゼンテーション、UI/UX設計を統括し、外部発信を通じて先端技術の社会適用を担当。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* サイトの特徴 */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-neon-green mr-3 glow-neon-green" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-green">FEATURES</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6 hover:border-neon-blue transition-all duration-300">
                    <h3 className="text-lg font-cyber text-neon-blue mb-3">
                      SYSTEMATIC ARCHIVE
                    </h3>
                    <p className="text-cyan-300">
                      AI知識を体系的に整理し、カテゴリとタグで効率的な情報探索を実現。
                    </p>
                  </div>
                  <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6 hover:border-neon-purple transition-all duration-300">
                    <h3 className="text-lg font-cyber text-neon-purple mb-3">
                      NEURAL SEARCH
                    </h3>
                    <p className="text-cyan-300">
                      高度な検索エンジンで、必要な知識へ瞬時にアクセス。
                    </p>
                  </div>
                  <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6 hover:border-neon-pink transition-all duration-300">
                    <h3 className="text-lg font-cyber text-neon-pink mb-3">
                      CYBER DESIGN
                    </h3>
                    <p className="text-cyan-300">
                      サイバーパンクUIで、未来的な学習体験を提供。
                    </p>
                  </div>
                  <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-6 hover:border-neon-green transition-all duration-300">
                    <h3 className="text-lg font-cyber text-neon-green mb-3">
                      OPEN ACCESS
                    </h3>
                    <p className="text-cyan-300">
                      すべての知識を無料で公開。AIの民主化を推進。
                    </p>
                  </div>
                </div>
              </section>

              {/* 利用方法 */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-neon-blue mr-3 glow-neon-blue" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-blue">HOW TO USE</h2>
                </div>
                <div className="text-cyan-200">
                  <h3 className="text-xl font-cyber text-neon-purple mb-4">BASIC NAVIGATION</h3>
                  <ol className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <span className="text-neon-green font-cyber mr-3">01.</span>
                      <div>
                        <strong className="text-neon-green">SESSION SEARCH:</strong>
                        <span className="ml-2">キーワードやタグで効率的に勉強会を検索</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-green font-cyber mr-3">02.</span>
                      <div>
                        <strong className="text-neon-green">CATEGORY BROWSE:</strong>
                        <span className="ml-2">興味のある分野から体系的に学習</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-green font-cyber mr-3">03.</span>
                      <div>
                        <strong className="text-neon-green">MATERIAL ACCESS:</strong>
                        <span className="ml-2">スライド、コード、動画などの資料にアクセス</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-green font-cyber mr-3">04.</span>
                      <div>
                        <strong className="text-neon-green">LEARN & PRACTICE:</strong>
                        <span className="ml-2">実践的な知識を獲得し、スキルアップ</span>
                      </div>
                    </li>
                  </ol>

                  <h3 className="text-xl font-cyber text-neon-purple mb-4">LEARNING TIPS</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-neon-pink mr-2">▸</span>
                      関連タグをフォローして体系的な知識を構築
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-pink mr-2">▸</span>
                      基礎から応用へ段階的にレベルアップ
                    </li>
                    <li className="flex items-start">
                      <span className="text-neon-pink mr-2">▸</span>
                      実装とセットで理解を深化させる
                    </li>
                  </ul>
                </div>
              </section>

              {/* コミュニティ参加 */}
              <section className="card-cyber p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Heart className="h-8 w-8 text-neon-pink mr-3 glow-neon-pink" />
                  <h2 className="text-2xl font-cyber font-bold text-neon-pink">JOIN COMMUNITY</h2>
                </div>
                <div className="text-cyan-200">
                  <p className="mb-6">
                    HENKAKUコミュニティは、AIの未来を共に創造する仲間を歓迎します。
                    最新技術の学習と実践を通じて、新しい価値を生み出しましょう。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://community.henkaku.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber-primary flex items-center justify-center group"
                    >
                      <span className="flex items-center">
                        JOIN DISCORD
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                      </span>
                    </a>
                    <a
                      href="https://community.henkaku.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber flex items-center justify-center group"
                    >
                      <span className="flex items-center">
                        HENKAKU SITE
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                      </span>
                    </a>
                  </div>
                </div>
              </section>

              {/* お問い合わせ */}
              <section className="card-cyber p-8">
                <h2 className="text-2xl font-cyber font-bold text-neon-green mb-6">CONTACT</h2>
                <div className="text-cyan-200">
                  <p className="mb-4">
                    サイトに関するご質問、ご要望、不具合報告は
                    HENKAKUコミュニティのDiscordサーバーまでお気軽にご連絡ください。
                  </p>
                  <p className="mb-6">
                    勉強会での発表希望、資料の追加・修正についても
                    Discordでお待ちしています。
                  </p>
                  <div className="bg-dark-700/50 border border-cyber-500/30 rounded-lg p-4">
                    <p className="text-sm text-cyan-400 font-cyber">
                      制作・監修: 合同会社texx (spark & minta)
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* CTAセクション */}
            <div className="mt-12 text-center">
              <div className="card-cyber p-8 bg-gradient-to-br from-dark-800 to-dark-700">
                <h2 className="text-2xl font-cyber font-bold text-neon-blue mb-4">
                  START YOUR AI JOURNEY
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mb-6"></div>
                <p className="text-cyan-300 mb-6">
                  最先端のAI知識を探索し、未来のテクノロジーをマスターしよう
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/sessions" className="btn-cyber-primary group">
                    <span className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                      EXPLORE SESSIONS
                    </span>
                  </Link>
                  <Link href="/categories" className="btn-cyber group">
                    <span className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      BROWSE CATEGORIES
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
