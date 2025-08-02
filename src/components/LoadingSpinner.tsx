import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* 外側の円 */}
        <div className={`${sizeClasses[size]} border-4 border-cyber-500/20 dark:border-cyber-500/20 light:border-blue-200 rounded-full`}></div>
        
        {/* 回転する円 */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent 
                        border-t-neon-blue dark:border-t-neon-blue light:border-t-blue-600 
                        rounded-full animate-spin`}></div>
        
        {/* 内側の光る円 */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full 
                        bg-neon-blue/20 dark:bg-neon-blue/20 light:bg-blue-500/20 
                        animate-pulse blur-sm`}></div>
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-cyber text-cyber-400 dark:text-cyber-400 light:text-gray-600 
                     animate-pulse tracking-wider">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;