const fs = require('fs');
const path = require('path');

// BOM付きUTF-8で書き込む関数
function writeCSVWithBOM(filename, content) {
  const BOM = '\uFEFF';
  const filePath = path.join('C:\\Users\\spark\\Downloads', filename);
  fs.writeFileSync(filePath, BOM + content, 'utf8');
  console.log(`Created: ${filePath}`);
}

// タイトルと説明文からタグを生成する関数
function generateTags(title, description) {
  const tags = [];
  
  // タイトルと説明文を結合して解析
  const text = (title + ' ' + description).toLowerCase();
  
  // キーワードマッピング
  const keywordMap = {
    'web3': ['Web3'],
    'ブロックチェーン': ['Web3', 'ブロックチェーン'],
    'トークン': ['トークンエコノミー'],
    'minta': ['MINTA'],
    'aws kiro': ['AWS Kiro'],
    '倫理': ['倫理', 'AI倫理'],
    '世代別': ['世代別分析'],
    '仕様書駆動': ['仕様書駆動開発'],
    'claude code': ['Claude Code', '開発ツール'],
    'claude': ['Claude', 'ツール'],
    'cursor': ['Cursor', '開発ツール'],
    'obsidian': ['Obsidian', 'ナレッジ管理'],
    'windsurf': ['Windsurf', '開発ツール'],
    'perplexity': ['Perplexity Spaces', 'ツール'],
    'bolt.new': ['Bolt.new', '開発ツール'],
    'figma': ['Figma', 'デザインツール'],
    'operator': ['Operator', 'AIエージェント'],
    'manus': ['Manus', 'ツール'],
    'dify': ['Dify', 'ノーコード', 'AIワークフロー'],
    'airtable': ['Airtable', 'ノーコード', 'データベース'],
    'notebooklm': ['NotebookLM', '学習コンテンツ'],
    '音声': ['音声AI', 'AI音声'],
    '音楽': ['音楽生成', 'クリエイティブ'],
    'sunoai': ['SunoAI', '音楽生成'],
    'suno': ['SunoAI', '音楽生成'],
    '動画': ['動画生成', 'AI動画'],
    'nft': ['NFT', 'クリエイティブ', 'Web3'],
    '教育': ['教育'],
    'プログラミング教育': ['プログラミング教育', '教育'],
    'aiネイティブ': ['AIネイティブ', '教育'],
    'キャリア': ['キャリア'],
    'ハルシネーション': ['ハルシネーション', 'AI課題'],
    '開発': ['開発', '実装'],
    'プロトタイプ': ['プロトタイピング', '開発'],
    'ワークフロー': ['AIワークフロー', '業務自動化'],
    'ノーコード': ['ノーコード'],
    '権利': ['知的財産権', '倫理'],
    'パーソナライズ': ['パーソナライズ', 'カスタマイズ'],
    'ベンチマーク': ['ベンチマーク', '比較検証'],
    'ベンチ': ['ベンチマーク', '比較検証'],
    '目標': ['目標設定', 'コミュニティ'],
    '雑談': ['雑談', 'コミュニティ'],
    '座談会': ['座談会', 'コミュニティ'],
    'トレンド': ['トレンド', '最新動向'],
    '即席開発': ['即席開発', 'プロトタイピング'],
    '爆速': ['高速開発', 'プロトタイピング'],
    'もしくろ': ['初心者向け', 'チュートリアル'],
    'ai': ['生成AI'],
    '生成ai': ['生成AI'],
    '活用': ['活用事例'],
    '実践': ['活用事例', '実践'],
  };
  
  // キーワードマッチング
  for (const [keyword, tagList] of Object.entries(keywordMap)) {
    if (text.includes(keyword)) {
      tags.push(...tagList);
    }
  }
  
  // 重複を削除
  const uniqueTags = [...new Set(tags)];
  
  // タグが少ない場合はデフォルトを追加
  if (uniqueTags.length < 2) {
    uniqueTags.push('生成AI', '活用事例');
  }
  
  // 最大8個に制限
  return uniqueTags.slice(0, 8).join(';');
}

// サムネイルURLを生成する関数
function generateThumbnailUrl(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  
  // 特定のキーワードに基づいてサムネイルを選択
  if (text.includes('claude') && text.includes('code')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/claude-code-thumbnail.svg';
  } else if (text.includes('cursor') || text.includes('obsidian')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/cursor-obsidian-thumbnail.svg';
  } else if (text.includes('bolt') || text.includes('figma')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/bolt-figma-thumbnail.svg';
  } else if (text.includes('airtable')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/airtable-thumbnail.svg';
  } else if (text.includes('音声') || text.includes('音楽') || text.includes('suno')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/voice-ai-thumbnail.svg';
  } else if (text.includes('動画')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-video-thumbnail.svg';
  } else if (text.includes('nft') || text.includes('画像生成')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/image-generation-thumbnail.jpg';
  } else if (text.includes('倫理') || text.includes('リスク') || text.includes('権利')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-ethics-thumbnail.svg';
  } else if (text.includes('目的') || text.includes('哲学')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-purpose-thumbnail.svg';
  } else if (text.includes('トレンド') || text.includes('最新')) {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-trends-thumbnail.svg';
  } else {
    return 'https://sparkminan.github.io/henkaku-ai-archive/images/ai-session-generic.svg';
  }
}

// ユーザーの元データを読み込んで最適化する
const originalFilePath = 'C:\\Users\\spark\\Downloads\\airtable_sessions_bom.csv';
const originalContent = fs.readFileSync(originalFilePath, 'utf8');

// BOMを削除してCSVを解析
const csvContent = originalContent.replace(/^\uFEFF/, '');
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0];
const dataLines = lines.slice(1);

// 各行を処理して最適化
const optimizedLines = dataLines.map(line => {
  const cells = line.split(',');
  if (cells.length < 11) return line; // 不完全な行はスキップ
  
  const id = cells[0];
  const title = cells[1];
  const date = cells[2];
  const presenter = cells[3];
  const description = cells[4];
  // cells[5] は元のTags（変更しない）
  // cells[6] は元のThumbnailURL（変更しない）
  const podcastUrl = cells[7];
  const videoUrl = cells[8];
  const status = cells[9];
  const materials = cells[10];
  
  // タグとサムネイルを生成
  const newTags = generateTags(title, description);
  const newThumbnailUrl = generateThumbnailUrl(title, description);
  
  // 新しい行を構築
  return `${id},${title},${date},${presenter},${description},${newTags},${newThumbnailUrl},${podcastUrl},${videoUrl},${status},${materials}`;
});

// 最終的なCSVを組み立て
const optimizedCSV = headers + '\n' + optimizedLines.join('\n');

// ファイルを作成
writeCSVWithBOM('airtable_sessions_optimized.csv', optimizedCSV);

console.log('✅ 最適化されたセッションCSVファイルを作成しました！');