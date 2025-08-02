import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-dark-700 dark:bg-dark-700 light:bg-gray-200 
                 border border-cyber-500/50 dark:border-cyber-500/50 light:border-gray-300
                 hover:border-neon-blue dark:hover:border-neon-blue light:hover:border-blue-500
                 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className={`absolute inset-0 h-6 w-6 transition-all duration-300 
                        ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
                        text-amber-500 group-hover:text-amber-400`} />
        <Moon className={`absolute inset-0 h-6 w-6 transition-all duration-300 
                         ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
                         text-neon-blue group-hover:text-neon-purple`} />
      </div>
      
      {/* グロー効果 */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none
                      ${theme === 'dark' ? 'bg-neon-blue/20 opacity-0 group-hover:opacity-100' : 'bg-amber-500/20 opacity-0 group-hover:opacity-100'}`}></div>
    </button>
  );
};

export default ThemeToggle;