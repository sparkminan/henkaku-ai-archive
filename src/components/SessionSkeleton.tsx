import React from 'react';

const SessionSkeleton: React.FC = () => {
  return (
    <div className="card-cyber p-6 h-full animate-pulse">
      {/* サムネイル部分 */}
      <div className="w-full h-48 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded-lg mb-4"></div>
      
      {/* タイトル */}
      <div className="h-6 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded mb-3"></div>
      <div className="h-6 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-3/4 mb-4"></div>
      
      {/* メタ情報 */}
      <div className="flex space-x-4 mb-4">
        <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-32"></div>
      </div>
      
      {/* 説明文 */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded"></div>
        <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded"></div>
        <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* タグ */}
      <div className="flex space-x-2 mb-4">
        <div className="h-8 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded-full w-20"></div>
        <div className="h-8 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded-full w-24"></div>
        <div className="h-8 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded-full w-16"></div>
      </div>
      
      {/* アクション */}
      <div className="pt-4 border-t border-cyber-500/30 dark:border-cyber-500/30 light:border-gray-200">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-16"></div>
          <div className="h-10 bg-dark-700 dark:bg-dark-700 light:bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SessionSkeleton;