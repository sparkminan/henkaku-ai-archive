import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, FileText, Play, ExternalLink, Zap, Heart, Headphones } from 'lucide-react';
import { StudySession } from '@/types';
import { getImagePath } from '@/utils/config';
import { useFavorites } from '@/contexts/FavoritesContext';

interface StudySessionCardProps {
  session: StudySession;
}

const StudySessionCard: React.FC<StudySessionCardProps> = ({ session }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(session.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(session.id);
  };

  const getTagColor = (tag: string, index: number) => {
    const colors = [
      'bg-neon-blue/20 text-neon-blue border-neon-blue/50',
      'bg-neon-purple/20 text-neon-purple border-neon-purple/50',
      'bg-neon-pink/20 text-neon-pink border-neon-pink/50',
      'bg-neon-green/20 text-neon-green border-neon-green/50',
      'bg-cyber-400/20 text-cyber-400 border-cyber-400/50',
      'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="card-cyber p-6 h-full flex flex-col group hover:scale-[1.02] transition-all duration-300">
      {/* ホログラム効果 */}
      <div className="absolute inset-0 hologram opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      
      {/* サムネイル */}
      {session.thumbnailUrl && (
        <div className="relative mb-4 rounded-lg overflow-hidden border border-cyber-500/30 group">
          <Image
            src={(() => {
              // For session 28 in local development, use local SVG
              if (session.id === '28' && 
                  session.thumbnailUrl.includes('sparkminan.github.io') && 
                  process.env.NODE_ENV !== 'production') {
                return '/images/web3-ai-fusion-thumbnail.svg';
              }
              return getImagePath(session.thumbnailUrl);
            })()}
            alt={session.title}
            width={400}
            height={192}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getImagePath('/images/placeholder-thumbnail.jpg');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* グロー効果 */}
          <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* お気に入りボタン */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-dark-800/80 dark:bg-dark-800/80 light:bg-white/80 
                     backdrop-blur-sm border border-cyber-500/30 dark:border-cyber-500/30 light:border-gray-300
                     hover:scale-110 transition-all duration-300 group/favorite"
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                favorite 
                  ? 'fill-neon-pink text-neon-pink' 
                  : 'text-cyber-400 dark:text-cyber-400 light:text-gray-500 group-hover/favorite:text-neon-pink dark:group-hover/favorite:text-neon-pink light:group-hover/favorite:text-pink-500'
              }`} 
            />
          </button>
        </div>
      )}

      {/* タイトル */}
      <h3 className="text-xl font-bold text-cyan-100 mb-3 line-clamp-2 group-hover:text-neon-blue transition-colors duration-300">
        {session.title}
      </h3>

      {/* メタ情報 */}
      <div className="flex items-center text-sm text-cyan-400 mb-4 space-x-4">
        <div className="flex items-center group/meta">
          <Calendar className="h-4 w-4 mr-1 group-hover/meta:text-neon-blue transition-colors duration-300" />
          <span className="font-cyber text-xs">{formatDate(session.date)}</span>
        </div>
        <div className="flex items-center group/meta">
          <User className="h-4 w-4 mr-1 group-hover/meta:text-neon-purple transition-colors duration-300" />
          <span className="font-cyber text-xs">{session.presenter}</span>
        </div>
      </div>

      {/* 説明 */}
      <div className="relative group/desc mb-4 flex-grow">
        <p className="text-cyan-200 line-clamp-3 leading-relaxed text-sm cursor-pointer">
          {session.description}
        </p>
        {/* ホバー時の全文表示 */}
        <div className="absolute z-50 bottom-full left-0 right-0 mb-2 p-4 bg-dark-900/95 backdrop-blur-sm 
                        border border-cyber-500/50 rounded-lg shadow-neon-blue/20 shadow-2xl 
                        opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible 
                        transition-all duration-300 pointer-events-none">
          <p className="text-cyan-200 text-sm leading-relaxed">
            {session.description}
          </p>
        </div>
      </div>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-4">
        {session.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-cyber font-medium border transition-all duration-300 hover:scale-105 ${getTagColor(tag, index)}`}
          >
            {tag}
          </span>
        ))}
        {session.tags.length > 3 && (
          <span className="px-3 py-1 rounded-full text-xs font-cyber font-medium bg-cyber-500/20 text-cyber-300 border border-cyber-500/50">
            +{session.tags.length - 3}
          </span>
        )}
      </div>

      {/* アクション */}
      <div className="flex items-center justify-between pt-4 border-t border-cyber-500/30">
        <div className="flex items-center space-x-4 text-sm text-cyan-400">
          {session.videoUrl && (
            <div className="flex items-center group/action">
              <Play className="h-4 w-4 mr-1 group-hover/action:text-neon-pink transition-colors duration-300" />
              <span className="font-cyber text-xs">VIDEO</span>
            </div>
          )}
          {session.podcastUrl && (
            <div className="flex items-center group/action">
              <Headphones className="h-4 w-4 mr-1 group-hover/action:text-neon-purple transition-colors duration-300" />
              <span className="font-cyber text-xs">PODCAST</span>
            </div>
          )}
        </div>
        
        {/* VIEWボタンを条件付きで表示（第28回、またはpodcastUrlがある場合のみ） */}
        {(session.id === '28' || session.podcastUrl) && (
          session.podcastUrl ? (
            // podcastUrlがある場合は外部リンクとして開く
            <a
              href={session.podcastUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/button relative btn-cyber-primary text-sm flex items-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                VIEW
                <ExternalLink className="h-4 w-4 ml-2 group-hover/button:scale-110 transition-transform duration-300" />
              </span>
              
              {/* ボタンの光る効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue opacity-0 
                              group-hover/button:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </a>
          ) : (
            // podcastUrlがない場合は通常のセッション詳細ページへ
            <Link
              href={`/sessions/${session.id}`}
              className="group/button relative btn-cyber-primary text-sm flex items-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                VIEW
                <ExternalLink className="h-4 w-4 ml-2 group-hover/button:scale-110 transition-transform duration-300" />
              </span>
              
              {/* ボタンの光る効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue opacity-0 
                              group-hover/button:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </Link>
          )
        )}
      </div>
      
      {/* カードの光る縁取り効果 */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{
             background: 'linear-gradient(45deg, transparent 30%, rgba(0, 245, 255, 0.1) 50%, transparent 70%)',
             backgroundSize: '200% 200%',
           }}>
      </div>
    </div>
  );
};

export default StudySessionCard;
