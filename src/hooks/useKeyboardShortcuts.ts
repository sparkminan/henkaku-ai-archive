import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export const shortcuts: ShortcutConfig[] = [
  {
    key: '/',
    action: () => {
      const searchInput = document.querySelector('input[type="text"], input[type="search"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    },
    description: 'フォーカス検索',
  },
  {
    key: 'h',
    action: () => window.location.href = '/',
    description: 'ホームへ移動',
  },
  {
    key: 's',
    action: () => window.location.href = '/sessions',
    description: 'セッション一覧へ移動',
  },
  {
    key: 'c',
    action: () => window.location.href = '/categories',
    description: 'カテゴリへ移動',
  },
  {
    key: 'a',
    action: () => window.location.href = '/about',
    description: 'アバウトへ移動',
  },
  {
    key: 't',
    action: () => {
      const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement;
      if (themeToggle) themeToggle.click();
    },
    description: 'テーマ切り替え',
  },
  {
    key: 'ArrowLeft',
    action: () => {
      const prevButton = document.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
      if (prevButton && !prevButton.disabled) prevButton.click();
    },
    description: '前のページ',
  },
  {
    key: 'ArrowRight',
    action: () => {
      const nextButton = document.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
      if (nextButton && !nextButton.disabled) nextButton.click();
    },
    description: '次のページ',
  },
  {
    key: '?',
    shift: true,
    action: () => {
      const event = new CustomEvent('showKeyboardHelp');
      window.dispatchEvent(event);
    },
    description: 'ヘルプを表示',
  },
  {
    key: 'Escape',
    action: () => {
      const event = new CustomEvent('hideKeyboardHelp');
      window.dispatchEvent(event);
    },
    description: 'ヘルプを閉じる',
  }
];

export const useKeyboardShortcuts = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 入力フィールドにフォーカスがある場合はショートカットを無効化
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        // ただし、Escapeキーは常に有効
        if (e.key !== 'Escape') return;
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        
        if (
          e.key === shortcut.key &&
          ctrlMatch &&
          altMatch &&
          shiftMatch
        ) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);
};