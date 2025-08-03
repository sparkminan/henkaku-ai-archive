# HENKAKU AI Archive - テストフレームワーク導入提案書

**作成日**: 2025年8月3日  
**対象プロジェクト**: HENKAKU AI Archive  
**提案者**: Vibey Technologies テスター&ドキュメント担当

---

## 📋 現状分析

### 既存のテスト環境
- **テストファイル**: `scripts/test-airtable-connection.js`, `src/pages/api/test-airtable.ts`
- **カバレッジ**: Airtable接続確認のみ
- **品質保証**: TypeScriptの型チェックとビルド時エラー検出のみ

### 現在テストされている項目
✅ Airtable API接続確認  
✅ データ取得の基本動作  
✅ TypeScript型の整合性（ビルド時）  

### 不足している重要なテスト
❌ Reactコンポーネントのユニットテスト  
❌ フック（Hooks）のテスト  
❌ 静的サイト生成（SSG）の検証  
❌ レスポンシブデザインテスト  
❌ アクセシビリティテスト  
❌ パフォーマンステスト  
❌ E2Eテスト（ユーザージャーニー）  
❌ SEO関連テスト  

---

## 🎯 提案するテスト戦略

### Next.js特化型テストピラミッド

```
      🔺 E2E Tests (10%)
     ▲▲▲ Integration Tests (20%)  
   ▲▲▲▲▲ Component Tests (50%)
 ▲▲▲▲▲▲▲ Unit Tests (20%)
```

### 1. ユニットテスト層（20%）
**目的**: ユーティリティ関数とビジネスロジックの検証

#### データ処理ロジック
```javascript
// src/utils/__tests__/dataLoader.test.ts
describe('dataLoader', () => {
  test('should load and parse session data correctly', () => {
    const mockData = [
      { id: '001', title: 'Test Session', date: '2025-01-01' }
    ];
    const result = loadSessions(mockData);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: '001',
      title: 'Test Session'
    });
  });
  
  test('should filter sessions by category', () => {
    // カテゴリフィルタリングテスト
  });
  
  test('should sort sessions by date', () => {
    // 日付ソートテスト
  });
});

// src/lib/__tests__/airtable-client.test.ts
describe('Airtable Client', () => {
  test('should transform airtable records to session format', () => {
    // データ変換テスト
  });
  
  test('should handle API errors gracefully', () => {
    // エラーハンドリングテスト
  });
});
```

#### カスタムフック
```javascript
// src/hooks/__tests__/useAirtableData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAirtableData } from '../useAirtableData';

describe('useAirtableData', () => {
  test('should fetch and return sessions data', async () => {
    const { result } = renderHook(() => useAirtableData());
    
    await waitFor(() => {
      expect(result.current.sessions).toBeDefined();
      expect(result.current.loading).toBe(false);
    });
  });
  
  test('should handle loading states correctly', () => {
    // ローディング状態テスト
  });
});
```

### 2. コンポーネントテスト層（50%）
**目的**: UIコンポーネントの動作検証

#### 主要コンポーネント
```javascript
// src/components/__tests__/StudySessionCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { StudySessionCard } from '../StudySessionCard';

describe('StudySessionCard', () => {
  const mockSession = {
    id: '001',
    title: 'Test Session',
    date: '2025-01-01',
    category: 'AI基礎',
    tags: ['Claude', 'GPT']
  };

  test('should render session information correctly', () => {
    render(<StudySessionCard session={mockSession} />);
    
    expect(screen.getByText('Test Session')).toBeInTheDocument();
    expect(screen.getByText('AI基礎')).toBeInTheDocument();
    expect(screen.getByText('Claude')).toBeInTheDocument();
  });
  
  test('should handle favorite toggle', () => {
    const onFavoriteToggle = jest.fn();
    render(
      <StudySessionCard 
        session={mockSession} 
        onFavoriteToggle={onFavoriteToggle} 
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /favorite/i }));
    expect(onFavoriteToggle).toHaveBeenCalledWith('001');
  });
  
  test('should be accessible', () => {
    // アクセシビリティテスト
    render(<StudySessionCard session={mockSession} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});

// src/components/__tests__/Layout.test.tsx
describe('Layout', () => {
  test('should render header and footer', () => {
    render(<Layout>Test Content</Layout>);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  test('should handle theme toggle', () => {
    // テーマ切り替えテスト
  });
});
```

#### Context Provider テスト
```javascript
// src/contexts/__tests__/FavoritesContext.test.tsx
describe('FavoritesContext', () => {
  test('should add/remove favorites', () => {
    const TestComponent = () => {
      const { favorites, addFavorite, removeFavorite } = useFavorites();
      return (
        <div>
          <span data-testid="count">{favorites.length}</span>
          <button onClick={() => addFavorite('001')}>Add</button>
          <button onClick={() => removeFavorite('001')}>Remove</button>
        </div>
      );
    };
    
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
  
  test('should persist favorites to localStorage', () => {
    // localStorage永続化テスト
  });
});
```

### 3. 統合テスト層（20%）
**目的**: ページレベルの動作確認

#### ページコンポーネント
```javascript
// src/pages/__tests__/sessions.test.tsx
import { render, screen } from '@testing-library/react';
import Sessions from '../sessions';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/sessions',
      pathname: '/sessions',
      query: {},
      asPath: '/sessions',
    };
  },
}));

describe('Sessions Page', () => {
  test('should render sessions list', () => {
    const mockSessions = [
      { id: '001', title: 'Session 1' },
      { id: '002', title: 'Session 2' }
    ];
    
    render(<Sessions sessions={mockSessions} />);
    
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
  });
  
  test('should filter sessions by search query', () => {
    // 検索フィルタリングテスト
  });
  
  test('should handle pagination', () => {
    // ページネーションテスト
  });
});

// src/pages/__tests__/sessions/[id].test.tsx
describe('Session Detail Page', () => {
  test('should render session details', () => {
    // セッション詳細表示テスト
  });
  
  test('should handle non-existent session', () => {
    // 404ケーステスト
  });
});
```

### 4. E2Eテスト層（10%）  
**目的**: 実際のユーザーフローの検証

```javascript
// e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test';

test('complete user journey', async ({ page }) => {
  // 1. ホームページアクセス
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /HENKAKU AI Archive/i })).toBeVisible();
  
  // 2. セッション一覧に移動
  await page.click('text=セッション一覧');
  await expect(page).toHaveURL(/.*sessions/);
  
  // 3. 検索機能を使用
  await page.fill('[placeholder*="検索"]', 'Claude');
  await expect(page.getByText('Claude')).toBeVisible();
  
  // 4. セッション詳細を表示
  await page.click('text=セッション 001');
  await expect(page.getByRole('heading')).toBeVisible();
  
  // 5. お気に入りに追加
  await page.click('[aria-label*="お気に入り"]');
  await expect(page.getByText('お気に入りに追加しました')).toBeVisible();
});

test('responsive design', async ({ page }) => {
  // モバイルサイズでの表示確認
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // ハンバーガーメニューが表示されることを確認
  await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
});

test('accessibility', async ({ page }) => {
  await page.goto('/');
  
  // キーボードナビゲーション
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  
  // スクリーンリーダー対応
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
});
```

---

## 🛠 技術スタック提案

### テストフレームワーク構成

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@playwright/test": "^1.40.0",
    "axe-playwright": "^2.0.1",
    "lighthouse": "^11.3.0",
    "jest-axe": "^8.0.0"
  }
}
```

### 設定ファイル

#### Jest設定 (jest.config.js)
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/types/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

module.exports = createJestConfig(customJestConfig);
```

#### テストセットアップ (src/test/setup.ts)
```typescript
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Testing Library の設定
configure({ testIdAttribute: 'data-testid' });

// localStorage のモック
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// matchMedia のモック (レスポンシブテスト用)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

#### Playwright設定 (playwright.config.ts)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## 🎨 テスト種別詳細

### 1. アクセシビリティテスト
```javascript
// src/components/__tests__/accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('StudySessionCard should not have accessibility violations', async () => {
    const { container } = render(<StudySessionCard session={mockSession} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('should have proper ARIA labels', () => {
    render(<StudySessionCard session={mockSession} />);
    expect(screen.getByRole('article')).toHaveAttribute('aria-label');
  });
});
```

### 2. パフォーマンステスト
```javascript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test('page load performance', async ({ page }) => {
  const response = await page.goto('/');
  
  // First Contentful Paint < 2s
  const performanceTiming = await page.evaluate(() => {
    return JSON.stringify(performance.getEntriesByType('navigation')[0]);
  });
  
  const timing = JSON.parse(performanceTiming);
  const fcp = timing.loadEventEnd - timing.navigationStart;
  expect(fcp).toBeLessThan(2000);
});

test('bundle size check', async ({ page }) => {
  await page.goto('/');
  
  // JavaScript bundle size check
  const scripts = await page.locator('script[src]').all();
  for (const script of scripts) {
    const src = await script.getAttribute('src');
    if (src?.includes('/_next/static/')) {
      const response = await page.request.get(src);
      const size = Buffer.byteLength(await response.body());
      expect(size).toBeLessThan(500 * 1024); // 500KB以下
    }
  }
});
```

### 3. SEOテスト
```javascript
// e2e/seo.spec.ts
test('SEO optimization', async ({ page }) => {
  await page.goto('/');
  
  // Title tag
  await expect(page).toHaveTitle(/HENKAKU AI Archive/);
  
  // Meta description
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute('content', /.+/);
  
  // Open Graph tags
  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute('content', /.+/);
  
  // Structured data
  const structuredData = page.locator('script[type="application/ld+json"]');
  await expect(structuredData).toBeVisible();
});
```

---

## 🚀 CI/CD統合提案

### GitHub Actions設定

#### .github/workflows/test.yml
```yaml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
      
      - name: Build application
        run: npm run build
      
      - name: Start application for E2E tests
        run: |
          npm run start &
          sleep 10
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload E2E test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  lighthouse:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build and start application
        run: |
          npm run build
          npm run start &
          sleep 10
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
```

---

## 📝 NPMスクリプト追加提案

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:accessibility": "jest --testNamePattern='accessibility'",
    "test:all": "npm run test:coverage && npm run test:e2e"
  }
}
```

---

## 📋 実装スケジュール

### Phase 1: 基礎テスト（Week 1-2）
- [ ] Jest + Testing Library セットアップ
- [ ] 主要コンポーネントのユニットテスト
- [ ] カスタムフックのテスト
- [ ] Context Provider のテスト

### Phase 2: 統合テスト（Week 3）
- [ ] ページコンポーネントのテスト
- [ ] API統合テストの拡張
- [ ] Airtable連携テストの強化

### Phase 3: E2E・品質保証（Week 4）
- [ ] Playwright E2Eテストの実装
- [ ] アクセシビリティテスト
- [ ] パフォーマンステスト
- [ ] SEOテスト

### Phase 4: CI/CD統合（Week 5）
- [ ] GitHub Actions設定
- [ ] カバレッジレポート統合
- [ ] Lighthouse CI統合
- [ ] 品質ゲートの設定

---

## 💰 工数見積もり

| タスク | 工数 | 優先度 |
|--------|------|--------|
| テストフレームワークセットアップ | 12h | 高 |
| コンポーネントユニットテスト | 25h | 高 |
| カスタムフック・Context テスト | 10h | 高 |
| ページ統合テスト | 15h | 中 |
| E2Eテスト実装 | 20h | 中 |
| アクセシビリティテスト | 8h | 中 |
| パフォーマンス・SEOテスト | 12h | 低 |
| CI/CD設定 | 10h | 中 |

**総工数**: 112時間（約2.8週間）

---

## 📈 期待される効果

### 短期効果（1ヶ月以内）
- **品質向上**: コンポーネントレベルでのバグ早期発見
- **開発速度向上**: リファクタリング時の安全性確保  
- **アクセシビリティ**: WCAG準拠の自動チェック

### 中長期効果（3-6ヶ月）
- **保守性向上**: 新機能追加時の既存機能への影響確認
- **ユーザー体験向上**: パフォーマンス・アクセシビリティの継続的改善
- **SEO効果**: 検索エンジン最適化の定量的管理

### 投資対効果
- **初期投資**: 112工数時間
- **年間削減効果**: 50-70工数時間
- **ROI**: 約140%（18ヶ月で投資回収）

---

## 🎯 推奨される次のアクション

1. **優先実装項目**
   - コンポーネントテストの基盤構築
   - 主要なユーザーフローのE2Eテスト

2. **段階的導入**
   - Phase 1から順次実装
   - 各フェーズでテストカバレッジを測定・評価

3. **品質メトリクス設定**
   - カバレッジ目標の設定（初期: 60%, 最終: 75%）
   - パフォーマンス基準の設定（LCP < 2.5s, FID < 100ms）

---

この提案により、HENKAKU AI Archiveプロジェクトの品質保証体制が大幅に強化され、継続的な改善サイクルの確立が期待されます。