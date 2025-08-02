import React from 'react';
import Link from 'next/link';
import { Calendar, User, FileText, Play, ExternalLink } from 'lucide-react';
import { StudySession } from '@/types';

interface StudySessionCardProps {
  session: StudySession;
}

const StudySessionCard: React.FC<StudySessionCardProps> = ({ session }) => {
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

  return (
    <div className="card p-6 h-full flex flex-col">
      {/* サムネイル */}
      {session.thumbnailUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={session.thumbnailUrl}
            alt={session.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-thumbnail.jpg';
            }}
          />
        </div>
      )}

      {/* タイトル */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
        {session.title}
      </h3>

      {/* メタ情報 */}
      <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(session.date)}
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {session.presenter}
        </div>
      </div>

      {/* 説明 */}
      <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
        {session.description}
      </p>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-4">
        {session.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
        {session.tags.length > 3 && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            +{session.tags.length - 3}
          </span>
        )}
      </div>

      {/* アクション */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {session.materials.length}件の資料
          </div>
          {session.videoUrl && (
            <div className="flex items-center">
              <Play className="h-4 w-4 mr-1" />
              動画あり
            </div>
          )}
        </div>
        <Link
          href={`/sessions/${session.id}`}
          className="btn-primary text-sm flex items-center"
        >
          詳細を見る
          <ExternalLink className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default StudySessionCard;
