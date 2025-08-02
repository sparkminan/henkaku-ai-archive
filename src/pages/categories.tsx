import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Category } from '@/types';
import mockData from '@/data/mockData.json';

export default function Categories() {
  const categories = mockData.categories;

  const getSessionCountByCategory = (categoryId: string) => {
    // カテゴリに対応するタグを持つセッションをカウント
    const categoryTagMap: { [key: string]: string[] } = {
      'fundamentals': ['基礎', 'ChatGPT', 'プロンプト'],
      'image-generation': ['Stable Diffusion', '画像生成', 'ControlNet'],
      'text-generation': ['ChatGPT', 'テキスト生成', 'プロンプト'],
      'development': ['LangChain', 'RAG', 'システム構築', 'コード'],
      'business': ['ビジネス活用', '事例紹介', '導入']
    };

    const relevantTags = categoryTagMap[categoryId] || [];
    return (mockData.studySessions as any[]).filter(session =>
      session.tags.some((tag: string) => relevantTags.includes(tag))
    ).length;
  };

  return (
    <>
      <Head>
        <title>カテゴリ一覧 - HENKAKU 生成AI会 アーカイブ</title>
        <meta name="description" content="HENKAKU生成AI会の勉強会をカテゴリ別に分類しています。興味のある分野から資料を探してみてください。" />
      </Head>

      <Layout>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ヘッダー */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                カテゴリ一覧
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                生成AI会の勉強会を分野別に整理しています。
                興味のあるカテゴリから勉強会資料を探してみてください。
              </p>
            </div>

            {/* カテゴリ一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="card p-8 hover:scale-105 transition-all duration-200 group"
                >
                  <div className={`w-16 h-16 rounded-lg mb-6 bg-${category.color}-100 flex items-center justify-center group-hover:bg-${category.color}-200 transition-colors`}>
                    <div className={`w-8 h-8 bg-${category.color}-500 rounded group-hover:bg-${category.color}-600 transition-colors`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">
                      {getSessionCountByCategory(category.id)}件の勉強会
                    </span>
                    <span className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      詳細を見る →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 統計セクション */}
            <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                カテゴリ別統計
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="text-center">
                    <div className={`w-12 h-12 rounded-lg mb-3 bg-${category.color}-100 flex items-center justify-center mx-auto`}>
                      <div className={`w-6 h-6 bg-${category.color}-500 rounded`}></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {getSessionCountByCategory(category.id)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {category.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAセクション */}
            <div className="mt-16 text-center">
              <div className="bg-primary-600 rounded-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  すべての勉強会を見る
                </h2>
                <p className="text-primary-100 mb-6">
                  カテゴリにとらわれず、すべての勉強会資料を一覧で確認できます。
                </p>
                <Link href="/sessions" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  勉強会一覧を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
