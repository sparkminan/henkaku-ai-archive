import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Users, BookOpen, Target, Heart, ExternalLink } from 'lucide-react';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <>
      <Head>
        <title>このサイトについて - HENKAKU 生成AI会 アーカイブ</title>
        <meta name="description" content="HENKAKU生成AI会アーカイブサイトの目的、運営方針、利用方法について説明しています。" />
      </Head>

      <Layout>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                このサイトについて
              </h1>
              <p className="text-lg text-gray-600">
                HENKAKU生成AI会アーカイブサイトの目的と運営について
              </p>
            </div>

            {/* メインコンテンツ */}
            <div className="space-y-8">
              {/* サイトの目的 */}
              <section className="card p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">サイトの目的</h2>
                </div>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    このサイトは、HENKAKUコミュニティで開催される「生成AI会」の勉強会で発表された
                    資料や知識を体系的にアーカイブし、コミュニティメンバーや生成AI技術に興味を持つ
                    すべての人が容易にアクセスできるようにすることを目的としています。
                  </p>
                  <p>
                    生成AI技術は急速に発展しており、最新の情報をキャッチアップすることが重要です。
                    しかし、散在する情報を個人で収集・整理することは困難です。このアーカイブサイトでは、
                    実践的な知識や経験に基づいた高品質な情報を一箇所に集めることで、
                    学習効率の向上とコミュニティ全体のナレッジレベル向上を目指しています。
                  </p>
                </div>
              </section>

              {/* HENKAKUについて */}
              <section className="card p-8">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">HENKAKUについて</h2>
                </div>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    HENKAKUは、テクノロジーとクリエイティビティの融合を探求するオンラインコミュニティです。
                    Web3、AI、VR/AR、ゲーム開発など、最先端技術に興味を持つクリエイターや
                    エンジニアが集まり、知識の共有と協働プロジェクトを行っています。
                  </p>
                  <p>
                    生成AI会は、その中でも特に生成AI技術に焦点を当てた勉強会グループで、
                    定期的に最新の技術動向、実践的な活用方法、ビジネス応用例などについて
                    発表・議論を行っています。
                  </p>
                  <div className="mt-6">
                    <a
                      href="https://henkaku.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      HENKAKU公式サイト
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </section>

              {/* サイトの特徴 */}
              <section className="card p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">サイトの特徴</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      📊 体系的な整理
                    </h3>
                    <p className="text-gray-700">
                      勉強会資料をカテゴリやタグで分類し、目的に応じて効率的に情報を探すことができます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      🔍 高度な検索機能
                    </h3>
                    <p className="text-gray-700">
                      タイトル、内容、発表者、タグなど複数の条件で横断的に検索できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      📱 レスポンシブデザイン
                    </h3>
                    <p className="text-gray-700">
                      スマートフォン、タブレット、PCなど、どのデバイスからでも快適に利用できます。
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      🆓 オープンアクセス
                    </h3>
                    <p className="text-gray-700">
                      すべての資料は無料で公開されており、学習目的であれば自由に利用できます。
                    </p>
                  </div>
                </div>
              </section>

              {/* 利用方法 */}
              <section className="card p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">利用方法</h2>
                </div>
                <div className="prose prose-lg text-gray-700">
                  <h3>基本的な使い方</h3>
                  <ol>
                    <li>
                      <strong>勉強会を探す：</strong>
                      「勉強会一覧」ページから興味のある勉強会を見つけるか、
                      検索機能を使ってキーワードで絞り込みます。
                    </li>
                    <li>
                      <strong>カテゴリから探す：</strong>
                      「カテゴリ」ページから分野別に勉強会を探すことができます。
                    </li>
                    <li>
                      <strong>資料をダウンロード：</strong>
                      各勉強会の詳細ページから、スライドやドキュメントをダウンロードできます。
                    </li>
                    <li>
                      <strong>動画を視聴：</strong>
                      録画がある勉強会では、動画も視聴できます。
                    </li>
                  </ol>

                  <h3>効果的な学習のために</h3>
                  <ul>
                    <li>関連するタグの勉強会を連続して学習することで、体系的な理解が深まります</li>
                    <li>基礎的な内容から始めて、徐々に応用的な内容に進むことをお勧めします</li>
                    <li>実際に手を動かして試してみることで、理解が深まります</li>
                  </ul>
                </div>
              </section>

              {/* コミュニティ参加 */}
              <section className="card p-8">
                <div className="flex items-center mb-6">
                  <Heart className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">コミュニティに参加する</h2>
                </div>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    HENKAKUコミュニティでは、新しいメンバーを歓迎しています。
                    生成AI会の勉強会に参加したい場合は、以下のリンクからコミュニティに参加してください：
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <a
                      href="https://discord.gg/henkaku"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center"
                    >
                      Discordに参加
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                    <a
                      href="https://henkaku.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center justify-center"
                    >
                      HENKAKU公式サイト
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </section>

              {/* お問い合わせ */}
              <section className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせ</h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    サイトに関するご質問、ご要望、不具合報告などがございましたら、
                    HENKAKUコミュニティのDiscordサーバーまでお気軽にお声がけください。
                  </p>
                  <p>
                    また、勉強会で発表を希望される方、資料の追加・修正をご希望の方も
                    同様にDiscordまでご連絡ください。
                  </p>
                </div>
              </section>
            </div>

            {/* CTAセクション */}
            <div className="mt-12 text-center">
              <div className="bg-primary-600 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  今すぐ学習を始めましょう
                </h2>
                <p className="text-primary-100 mb-6">
                  豊富な勉強会資料から、興味のある分野を選んで学習を開始してください。
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
          </div>
        </div>
      </Layout>
    </>
  );
}
