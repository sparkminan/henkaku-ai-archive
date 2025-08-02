import React from 'react';
import Header from './Header';
import Footer from './Footer';
import KeyboardHelp from './KeyboardHelp';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearch }) => {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <KeyboardHelp />
    </div>
  );
};

export default Layout;
