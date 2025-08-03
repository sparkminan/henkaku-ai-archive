# 📖 用語集（Glossary）

HENKAKU AI Archiveプロジェクトで使用される技術用語と概念の定義集です。

## 🔤 アルファベット順

### A

**Airtable**
- クラウドベースのデータベース・スプレッドシートサービス
- 本プロジェクトではセッションデータの管理に使用（オプション）

**API (Application Programming Interface)**
- アプリケーション間の通信インターフェース
- 将来的にREST/GraphQL APIの公開を計画

**Archive（アーカイブ）**
- 過去の勉強会資料を体系的に保存・整理すること
- 本プロジェクトの中核機能

### C

**Category（カテゴリ）**
- セッションを分類するための大分類
- 例：基礎知識、ツール、開発、クリエイティブなど

**CDN (Content Delivery Network)**
- コンテンツ配信ネットワーク
- GitHub PagesはFastly CDNを使用

**Context API**
- Reactの状態管理機能
- お気に入りやテーマ設定の管理に使用

### G

**GitHub Actions**
- GitHubの自動化・CI/CDサービス
- 自動ビルド・デプロイに使用

**GitHub Pages**
- GitHubが提供する静的サイトホスティング
- 本プロジェクトのホスティング基盤

### H

**HENKAKU**
- 本プロジェクトの母体となるコミュニティ
- 生成AI技術の学習・実践を目的とする

### I

**ISR (Incremental Static Regeneration)**
- Next.jsの段階的静的再生成機能
- 現在は未使用（将来的に検討）

### J

**JSON (JavaScript Object Notation)**
- データ交換フォーマット
- セッションデータの保存形式

### L

**Lighthouse**
- Googleのウェブパフォーマンス測定ツール
- 目標スコア: 95以上

**Lucide React**
- アイコンライブラリ
- UIアイコンの表示に使用

### M

**Material（資料）**
- 勉強会で使用されたスライドやドキュメント
- PDF、Google Slides等の形式

**Markdown**
- 軽量マークアップ言語
- ドキュメント記述に使用

### N

**Next.js**
- Reactベースのフルスタックフレームワーク
- バージョン14を使用

**Node.js**
- JavaScriptランタイム
- 開発環境の基盤

### P

**Pagination（ページネーション）**
- コンテンツを複数ページに分割する機能
- セッション一覧で使用

**PWA (Progressive Web App)**
- ネイティブアプリのような機能を持つWebアプリ
- Phase 3で実装予定

### R

**React**
- UIライブラリ
- コンポーネントベースの設計

**Responsive Design（レスポンシブデザイン）**
- 画面サイズに応じて最適化される設計
- モバイル・タブレット・PC対応

### S

**Session（セッション）**
- 勉強会の各回を指す
- 本プロジェクトの基本単位

**SEO (Search Engine Optimization)**
- 検索エンジン最適化
- メタタグ、構造化データで対応

**SSG (Static Site Generation)**
- 静的サイト生成
- Next.jsのexport機能を使用

**SPA (Single Page Application)**
- 単一ページアプリケーション
- クライアントサイドルーティングを使用

### T

**Tag（タグ）**
- セッションの内容を表すキーワード
- 検索・フィルタリングに使用

**TailwindCSS**
- ユーティリティファーストCSSフレームワーク
- スタイリングの基盤

**TypeScript**
- JavaScriptの静的型付け版
- 型安全性を提供

### V

**Vimeo**
- 動画ホスティングサービス
- 勉強会動画の配信に使用

### W

**WCAG (Web Content Accessibility Guidelines)**
- ウェブコンテンツ・アクセシビリティ・ガイドライン
- AA準拠を目標

## 🏗️ プロジェクト固有の用語

### データモデル

**StudySession**
- 勉強会セッションのデータ型
- id, title, date, presenter等のプロパティを持つ

**Material**
- セッション資料のデータ型
- slide, document, code等のタイプ

**Category**
- カテゴリのデータ型
- id, name, description, colorを持つ

### コンポーネント名

**StudySessionCard**
- セッション情報を表示するカードコンポーネント
- サムネイル、タイトル、日付等を表示

**Layout**
- 共通レイアウトコンポーネント
- ヘッダー、フッター、メインコンテンツを含む

**Pagination**
- ページ送りコンポーネント
- セッション一覧のナビゲーション

**ThemeToggle**
- ダーク/ライトモード切り替え
- ユーザーの好みを保存

### ディレクトリ構造

**src/pages/**
- Next.jsのページコンポーネント
- ルーティングに対応

**src/data/**
- セッションデータとカテゴリ情報
- JSONファイルとして管理

**public/**
- 静的アセット（画像、ドキュメント）
- 直接アクセス可能

## 📝 略語一覧

| 略語 | 正式名称 | 説明 |
|------|----------|------|
| AI | Artificial Intelligence | 人工知能 |
| API | Application Programming Interface | アプリケーション間通信 |
| CDN | Content Delivery Network | コンテンツ配信網 |
| CMS | Content Management System | コンテンツ管理システム |
| CSS | Cascading Style Sheets | スタイルシート |
| CSV | Comma-Separated Values | カンマ区切り値 |
| DOM | Document Object Model | 文書オブジェクトモデル |
| HTML | HyperText Markup Language | ハイパーテキスト記述言語 |
| HTTP | Hypertext Transfer Protocol | Web通信プロトコル |
| JSON | JavaScript Object Notation | データ交換形式 |
| PWA | Progressive Web App | 進歩的Webアプリ |
| SEO | Search Engine Optimization | 検索エンジン最適化 |
| SPA | Single Page Application | 単一ページアプリ |
| SSG | Static Site Generation | 静的サイト生成 |
| UI | User Interface | ユーザーインターフェース |
| URL | Uniform Resource Locator | リソースの場所 |
| UX | User Experience | ユーザー体験 |

## 🔗 関連用語の相関

```
HENKAKU AI Archive
    ├── Frontend (Next.js)
    │   ├── React (UIライブラリ)
    │   ├── TypeScript (型安全性)
    │   ├── TailwindCSS (スタイリング)
    │   └── Lucide React (アイコン)
    ├── Data
    │   ├── JSON Files (静的データ)
    │   └── Airtable API (動的データ)
    └── Hosting
        ├── GitHub Pages (静的ホスティング)
        └── GitHub Actions (CI/CD)
```

## 🎓 生成AI関連用語

### 基本用語

**LLM (Large Language Model)**
- 大規模言語モデル
- ChatGPT、Claude等が該当

**Prompt Engineering**
- プロンプトエンジニアリング
- AIへの効果的な指示の技術

**Fine-tuning**
- ファインチューニング
- モデルの追加学習

**Hallucination**
- ハルシネーション
- AIが事実と異なる情報を生成する現象

### ツール・サービス

**Claude**
- Anthropic社のAIアシスタント
- 勉強会で頻繁に扱われるツール

**ChatGPT**
- OpenAI社のAIチャットボット
- GPT-3.5/4を使用

**Stable Diffusion**
- 画像生成AI
- オープンソースモデル

**Midjourney**
- 画像生成サービス
- Discord上で動作

---
最終更新: 2025年8月3日