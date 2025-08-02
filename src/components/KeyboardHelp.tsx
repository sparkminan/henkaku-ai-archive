import React, { useState, useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';
import { shortcuts } from '@/hooks/useKeyboardShortcuts';

const KeyboardHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleShowHelp = () => setIsOpen(true);
    const handleHideHelp = () => setIsOpen(false);

    window.addEventListener('showKeyboardHelp', handleShowHelp);
    window.addEventListener('hideKeyboardHelp', handleHideHelp);

    return () => {
      window.removeEventListener('showKeyboardHelp', handleShowHelp);
      window.removeEventListener('hideKeyboardHelp', handleHideHelp);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 背景オーバーレイ */}
      <div 
        className="absolute inset-0 bg-dark-900/80 dark:bg-dark-900/80 light:bg-gray-900/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* ヘルプモーダル */}
      <div className="relative max-w-2xl w-full max-h-[80vh] overflow-auto card-cyber p-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Keyboard className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-cyber font-bold text-neon-blue">
              KEYBOARD SHORTCUTS
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-dark-700 dark:hover:bg-dark-700 light:hover:bg-gray-100 
                     transition-colors duration-300 group"
          >
            <X className="h-5 w-5 text-cyber-400 group-hover:text-neon-pink transition-colors duration-300" />
          </button>
        </div>
        
        {/* ショートカットリスト */}
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50 dark:bg-dark-700/50 light:bg-gray-100 
                       border border-cyber-500/20 dark:border-cyber-500/20 light:border-gray-200"
            >
              <span className="text-cyan-300 dark:text-cyan-300 light:text-gray-700">
                {shortcut.description}
              </span>
              <div className="flex items-center space-x-1">
                {shortcut.ctrl && (
                  <kbd className="px-2 py-1 text-xs font-cyber bg-dark-800 dark:bg-dark-800 light:bg-gray-200 
                                border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                rounded text-cyber-400 dark:text-cyber-400 light:text-gray-600">
                    Ctrl
                  </kbd>
                )}
                {shortcut.alt && (
                  <kbd className="px-2 py-1 text-xs font-cyber bg-dark-800 dark:bg-dark-800 light:bg-gray-200 
                                border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                rounded text-cyber-400 dark:text-cyber-400 light:text-gray-600">
                    Alt
                  </kbd>
                )}
                {shortcut.shift && (
                  <kbd className="px-2 py-1 text-xs font-cyber bg-dark-800 dark:bg-dark-800 light:bg-gray-200 
                                border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                rounded text-cyber-400 dark:text-cyber-400 light:text-gray-600">
                    Shift
                  </kbd>
                )}
                {shortcut.key !== 'ArrowLeft' && shortcut.key !== 'ArrowRight' && (
                  <span className="text-cyber-500 dark:text-cyber-500 light:text-gray-400 mx-1">+</span>
                )}
                <kbd className="px-3 py-1 text-sm font-cyber bg-dark-800 dark:bg-dark-800 light:bg-gray-200 
                              border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                              rounded text-neon-blue dark:text-neon-blue light:text-blue-600">
                  {shortcut.key === 'ArrowLeft' ? '←' : 
                   shortcut.key === 'ArrowRight' ? '→' : 
                   shortcut.key === 'Escape' ? 'Esc' : 
                   shortcut.key}
                </kbd>
              </div>
            </div>
          ))}
        </div>
        
        {/* フッター */}
        <div className="mt-8 pt-6 border-t border-cyber-500/30 dark:border-cyber-500/30 light:border-gray-200">
          <p className="text-sm text-cyber-400 dark:text-cyber-400 light:text-gray-600 text-center">
            Press <kbd className="px-2 py-1 mx-1 text-xs font-cyber bg-dark-800 dark:bg-dark-800 light:bg-gray-200 
                                border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300 
                                rounded text-neon-blue dark:text-neon-blue light:text-blue-600">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardHelp;