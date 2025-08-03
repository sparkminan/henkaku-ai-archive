const fs = require('fs');
const path = require('path');

// BOM付きUTF-8で書き込む関数
function writeCSVWithBOM(filename, content) {
  const BOM = '\uFEFF';
  const filePath = path.join('C:\\Users\\spark\\Downloads', filename);
  fs.writeFileSync(filePath, BOM + content, 'utf8');
  console.log(`Created: ${filePath}`);
}

// Sessions CSV
const sessionsCSV = `ID,Title,Date,Presenter,Description,Tags,ThumbnailURL,PodcastURL,VideoURL,Status,Materials
28,第28回 生成AI会 - AI利用実態とWeb3との融合の可能性,2025-08-02,コミュニティメンバー,世代別AI利用動向の分析から始まり、生成AI利用における倫理的課題、MINTAのリアルタイム翻訳アプリOSS化プロジェクト、AWS Kiroを活用した仕様書駆動開発、そしてWeb3とAIの融合による新たなビジネスモデルの可能性について深く議論。特にトークンエコノミーとAIエージェントの組み合わせが生み出す革新的な価値創造モデルに注目が集まりました。,Web3;AI融合;トークンエコノミー;OSS;MINTA;AWS Kiro;倫理;世代別分析;仕様書駆動開発,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,https://notebooklm.google.com/notebook/3e08ea35-9716-4a5d-8f1c-ef4e82bc8ab7/audio,,Published,
27,第27回 生成AI会 - AI時代のプログラミング教育とキャリア戦略,2024-12-14,コミュニティメンバー,小中学生へのプログラミング教育の実践報告、生成AIを活用した学習方法の提案、そしてAI時代におけるエンジニアのキャリア戦略について議論。特に『AIネイティブ世代』の育成方法と、既存エンジニアのスキルアップデートについて実践的な知見を共有。,教育;プログラミング教育;キャリア;AIネイティブ,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
26,第26回 生成AI会 - 新しいアプリケーション開発とAIツールの実践活用,2024-11-23,コミュニティメンバー,Windsurf、Claude Projects、Perplexity Spacesなどの新ツールの実践的な使い方と、それらを組み合わせた効率的な開発フローについて議論。実際のプロジェクトでの活用事例を交えながら、各ツールの特性と最適な使い分けを探求。,Windsurf;Claude Projects;Perplexity Spaces;開発ツール,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
25,第25回 生成AI会 - AIエージェントの最新動向と実装手法,2024-11-09,コミュニティメンバー,Claude Desktopの新機能、Bolt.newとRepl Agentの比較、そしてAIエージェントの実装パターンについて深掘り。特にMCP（Model Context Protocol）を活用した新しいエージェント開発手法に注目。,Claude Desktop;Bolt.new;Repl Agent;MCP;AIエージェント,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
24,第24回 生成AI会 - NotebookLMによる学習コンテンツ革命,2024-10-19,コミュニティメンバー,GoogleのNotebookLMを活用した学習コンテンツの自動生成、ポッドキャスト形式での知識共有、そして教育分野でのAI活用について議論。実際にNotebookLMで生成したコンテンツの品質評価も実施。,NotebookLM;教育;ポッドキャスト;学習コンテンツ,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
23,第23回 生成AI会 - AI動画生成技術の進化と実用化,2024-10-05,コミュニティメンバー,最新のAI動画生成ツールの比較検証、実用的な活用シーン、そして動画コンテンツ制作ワークフローへの組み込み方について議論。品質、生成速度、コストの観点から各ツールを評価。,動画生成;AI動画;コンテンツ制作,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
22,第22回 生成AI会 - Difyを使ったAIワークフロー構築,2024-09-21,コミュニティメンバー,ノーコードAIプラットフォームDifyの実践的な使い方、複雑なAIワークフローの構築方法、そして業務プロセスへの組み込み事例について共有。実際のワークフロー構築デモも実施。,Dify;ノーコード;AIワークフロー;業務自動化,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
21,第21回 生成AI会 - AI開発の民主化とツールの進化,2024-09-07,コミュニティメンバー,Cursor、Windsurf、v0などの最新AI開発ツールの比較と、それらがもたらす開発プロセスの変革について議論。非エンジニアでも高品質なアプリケーションを開発できる時代の到来。,Cursor;Windsurf;v0;開発民主化,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
20,第20回 生成AI会,2024-08-24,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
19,第19回 生成AI会,2024-08-10,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
18,第18回 生成AI会,2024-07-27,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
17,第17回 生成AI会,2024-07-13,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
16,第16回 生成AI会,2024-06-29,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
15,第15回 生成AI会,2024-06-15,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
14,第14回 生成AI会,2024-06-01,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
13,第13回 生成AI会,2024-05-18,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
12,第12回 生成AI会,2024-05-04,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
11,第11回 生成AI会,2024-04-20,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
10,第10回 生成AI会,2024-04-06,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
9,第9回 生成AI会,2024-03-23,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
8,第8回 生成AI会,2024-03-09,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
7,第7回 生成AI会,2024-02-24,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
6,生成AI会 Vol.6 - AI時代のコミュニケーション論,2024-02-12,コミュニティメンバー,AIとの対話技術の進化、人間同士のコミュニケーションへの影響、そして新しいインターフェースのあり方について議論。チャットボットを超えた次世代のAIコミュニケーションを探求。,コミュニケーション;チャットボット;インターフェース,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
5,生成AI会 Vol.5,2024-01-28,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
4,生成AI会 Vol.4,2024-01-14,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
3,生成AI会 Vol.3,2023-12-17,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
2,生成AI会 Vol.2,2023-12-03,コミュニティメンバー,生成AI技術の最新動向と実践的な活用方法について議論。参加者それぞれの経験と知見を共有し、新たな発見と学びを得る貴重な機会となりました。,生成AI;活用事例,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,
1,生成AI会 Vol.1,2024-07-06,コミュニティメンバー,記念すべき第1回目の生成AI会。HENKAKUコミュニティで生成AI技術について語り合う場として始まりました。この回から現在まで続く貴重な学びの場がスタートしました。,第1回;記念すべき;スタート;創設,https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg,,,Published,`;

// Materials CSV
const materialsCSV = `MaterialID,SessionID,Title,Type,URL,Description,Order
MAT-028-001,28,世代別AI利用実態調査レポート,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-usage-by-generation-report.pdf,Z世代とシニア世代のAI利用傾向の比較分析,1
MAT-028-002,28,MINTAリアルタイム翻訳アプリ - OSSプロジェクト概要,code,https://github.com/minta-project/realtime-translator,音声認識と機械翻訳を組み合わせたリアルタイム翻訳アプリのOSS化,2
MAT-028-003,28,AWS Kiro活用ガイド - 仕様書駆動開発,document,https://sparkminan.github.io/henkaku-ai-archive/documents/aws-kiro-specification-driven-guide.md,仕様書からコード生成、テスト、デプロイまでの自動化フロー,3
MAT-028-004,28,Web3×AI融合ビジネスモデル提案書,slide,https://sparkminan.github.io/henkaku-ai-archive/slides/web3-ai-business-models.pdf,トークンエコノミーとAIエージェントを組み合わせた新しいビジネスモデル,4
MAT-028-005,28,AI利用における倫理ガイドライン,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-ethics-guidelines.md,個人情報保護、セキュリティ、透明性に関する実践的ガイドライン,5
MAT-027-001,27,AIネイティブ世代育成カリキュラム,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-native-curriculum.pdf,小中学生向けAI教育プログラムの設計と実践,1
MAT-026-001,26,Windsurf実践ガイド,document,https://sparkminan.github.io/henkaku-ai-archive/documents/windsurf-guide.pdf,新しいAI開発ツールWindsurfの使い方と活用事例,1
MAT-025-001,25,MCP実装パターン集,code,https://sparkminan.github.io/henkaku-ai-archive/code/mcp-patterns.md,Model Context Protocolを使ったエージェント開発パターン,1
MAT-024-001,24,NotebookLM活用事例集,document,https://sparkminan.github.io/henkaku-ai-archive/documents/notebooklm-cases.pdf,教育分野でのNotebookLM活用事例と効果測定,1
MAT-023-001,23,AI動画生成ツール比較表,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-video-tools-comparison.pdf,主要なAI動画生成ツールの機能・品質・コスト比較,1
MAT-022-001,22,Difyワークフロー構築ガイド,document,https://sparkminan.github.io/henkaku-ai-archive/documents/dify-workflow-guide.pdf,実践的なDifyワークフローの設計と実装,1
MAT-021-001,21,AI開発ツール比較表,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-dev-tools-comparison.pdf,Cursor、Windsurf、v0の機能比較と使い分け,1
MAT-006-001,6,AIコミュニケーション設計ガイド,document,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-communication-design.pdf,効果的なAIインターフェース設計の原則,1
MAT-001-001,1,Vol.1 セッション資料,slide,https://sparkminan.github.io/henkaku-ai-archive/documents/ai-session-vol1.pdf,記念すべき第1回生成AI会の発表資料,1`;

// Tags CSV
const tagsCSV = `TagName,Category,Color,Description
Web3,テクノロジー,紫,ブロックチェーン・分散型技術関連
AI融合,テクノロジー,青,AIと他技術の融合・統合
トークンエコノミー,ビジネス,緑,トークンを使った経済システム
OSS,テクノロジー,オレンジ,オープンソースソフトウェア
MINTA,ツール,ピンク,リアルタイム翻訳プロジェクト
AWS Kiro,ツール,青,AWS提供の開発支援ツール
倫理,倫理,赤,AI倫理・ガイドライン関連
世代別分析,研究,紫,世代別の調査・分析
仕様書駆動開発,開発,緑,仕様書ベースの開発手法
教育,教育,青,教育・学習関連
プログラミング教育,教育,緑,プログラミング教育関連
キャリア,ビジネス,オレンジ,キャリア開発・戦略
AIネイティブ,教育,ピンク,AI世代の教育
Windsurf,ツール,青,AI開発ツール
Claude Projects,ツール,紫,Anthropic社のプロジェクト管理ツール
Perplexity Spaces,ツール,オレンジ,Perplexity社の共有スペース機能
開発ツール,開発,緑,開発支援ツール全般
Claude Desktop,ツール,青,Anthropic社のデスクトップアプリ
Bolt.new,ツール,紫,Web開発プラットフォーム
Repl Agent,ツール,オレンジ,Replit社のAIエージェント
MCP,テクノロジー,赤,Model Context Protocol
AIエージェント,テクノロジー,青,自律的に動作するAIシステム
NotebookLM,ツール,緑,Google社の学習支援ツール
ポッドキャスト,コンテンツ,紫,音声コンテンツ形式
学習コンテンツ,教育,青,教育・学習用コンテンツ
動画生成,クリエイティブ,ピンク,AI動画生成技術
AI動画,クリエイティブ,紫,AIで生成された動画
コンテンツ制作,クリエイティブ,オレンジ,コンテンツ制作全般
Dify,ツール,青,ノーコードAIプラットフォーム
ノーコード,開発,緑,プログラミング不要の開発
AIワークフロー,テクノロジー,紫,AI処理の自動化フロー
業務自動化,ビジネス,オレンジ,業務プロセスの自動化
Cursor,ツール,青,AI支援コードエディタ
v0,ツール,紫,Vercel社のAI開発ツール
開発民主化,テクノロジー,緑,誰でも開発できる環境
生成AI,テクノロジー,青,生成系AI技術全般
活用事例,ビジネス,緑,実践的な活用例
コミュニケーション,コミュニケーション,紫,対話・コミュニケーション技術
チャットボット,テクノロジー,青,対話型AIシステム
インターフェース,テクノロジー,オレンジ,ユーザーインターフェース
第1回,イベント,赤,初回セッション
記念すべき,イベント,金,特別な節目
スタート,イベント,緑,開始・始まり
創設,イベント,青,新規立ち上げ`;

// ファイルを作成
writeCSVWithBOM('airtable_sessions_bom.csv', sessionsCSV);
writeCSVWithBOM('airtable_materials_bom.csv', materialsCSV);
writeCSVWithBOM('airtable_tags_bom.csv', tagsCSV);

console.log('✅ BOM付きUTF-8 CSVファイルを作成しました！');