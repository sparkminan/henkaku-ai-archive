import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  // ページ番号の範囲を計算
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* 最初のページへ */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === 1
            ? 'border-cyber-500/30 text-cyber-500/30 cursor-not-allowed'
            : 'border-cyber-500/50 text-cyber-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10'
        }`}
      >
        <ChevronsLeft className="h-5 w-5" />
      </button>
      
      {/* 前のページへ */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === 1
            ? 'border-cyber-500/30 text-cyber-500/30 cursor-not-allowed'
            : 'border-cyber-500/50 text-cyber-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {/* ページ番号 */}
      <div className="flex space-x-2">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 rounded-lg border border-cyber-500/50 text-cyber-400 
                       hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10 
                       transition-all duration-300 font-cyber text-sm"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 py-2 text-cyber-500">...</span>
            )}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded-lg border font-cyber text-sm transition-all duration-300 ${
              currentPage === number
                ? 'bg-neon-blue border-neon-blue text-dark-900 shadow-neon-blue'
                : 'border-cyber-500/50 text-cyber-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10'
            }`}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 py-2 text-cyber-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg border border-cyber-500/50 text-cyber-400 
                       hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10 
                       transition-all duration-300 font-cyber text-sm"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      
      {/* 次のページへ */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === totalPages
            ? 'border-cyber-500/30 text-cyber-500/30 cursor-not-allowed'
            : 'border-cyber-500/50 text-cyber-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      
      {/* 最後のページへ */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-all duration-300 ${
          currentPage === totalPages
            ? 'border-cyber-500/30 text-cyber-500/30 cursor-not-allowed'
            : 'border-cyber-500/50 text-cyber-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10'
        }`}
      >
        <ChevronsRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;