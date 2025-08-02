import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, User, FileText, Play, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { StudySession } from '@/types';
import mockData from '@/data/mockData.json';

interface SessionDetailProps {
  session: StudySession | null;
}

export default function SessionDetail({ session }: SessionDetailProps) {
  const router = useRouter();

  if (!session) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              勉強会が見つかりません
            </h1>
            <p className="text-gray-600 mb-6">
              指定された勉強会は存在しないか、削除された可能性があります。
            </p>
            <Link href="/sessions" className="btn-primary">
              勉強会一覧に戻る
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
    ];
    return colors[tag.length % colors.length];
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'slide':
        return '📊';
      case 'document':
        return '📄';
      case 'code':
        return '💻';
      default:
        return '📎';
    }
  };

  return (
    <>
      <Head>
        <title>{session.title} - HENKAKU 生成AI会 アーカイブ</title>
        <meta name="description" content={session.description} />
      </Head>

      <Layout>
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 戻るボタン */}
            <div className="mb-6">
              <Link
                href="/sessions"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                勉強会一覧に戻る
              </Link>
            </div>

            {/* メインコンテンツ */}
            <div className="card p-8">
              {/* サムネイル */}
              {session.thumbnailUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={session.thumbnailUrl}
                    alt={session.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-thumbnail.jpg';
                    }}
                  />
                </div>
              )}

              {/* タイトルとメタ情報 */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {session.title}
                </h1>

                <div className="flex flex-wrap items-center text-gray-600 mb-4 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {formatDate(session.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {session.presenter}
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    {session.materials.length}件の資料
                  </div>
                  {session.videoUrl && (
                    <div className="flex items-center">
                      <Play className="h-5 w-5 mr-2" />
                      動画あり
                    </div>
                  )}
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-2">
                  {session.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 説明 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  概要
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {session.description}
                </p>
              </div>

              {/* 動画 */}
              {session.videoUrl && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    録画動画
                  </h2>
                  <div className="card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Play className="h-6 w-6 text-primary-600 mr-3" />
                        <span className="text-gray-700">勉強会の録画動画</span>
                      </div>
                      <a
                        href={session.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center"
                      >
                        動画を見る
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 資料 */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  資料・リンク
                </h2>
                <div className="space-y-4">
                  {session.materials.map((material) => (
                    <div key={material.id} className="card p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {getMaterialIcon(material.type)}
                          </span>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {material.title}
                            </h3>
                            {material.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {material.description}
                              </p>
                            )}
                            <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {material.type === 'slide' && 'スライド'}
                              {material.type === 'document' && 'ドキュメント'}
                              {material.type === 'code' && 'コード'}
                              {material.type === 'other' && 'その他'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            開く
                          </a>
                          <a
                            href={material.url}
                            download
                            className="btn-primary flex items-center"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            ダウンロード
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 関連する勉強会 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  関連する勉強会
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.studySessions
                    .filter(s => 
                      s.id !== session.id && 
                      s.tags.some(tag => session.tags.includes(tag))
                    )
                    .slice(0, 2)
                    .map((relatedSession) => (
                      <Link
                        key={relatedSession.id}
                        href={`/sessions/${relatedSession.id}`}
                        className="card p-4 hover:scale-105 transition-transform duration-200"
                      >
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {relatedSession.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(relatedSession.date)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {relatedSession.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = mockData.studySessions.map((session) => ({
    params: { id: session.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const session = mockData.studySessions.find(s => s.id === params.id) || null;

  return {
    props: {
      session,
    },
  };
}
