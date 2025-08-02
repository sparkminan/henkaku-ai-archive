const fs = require('fs');
const path = require('path');

function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  str = String(str);
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function exportToCSV() {
  const sessionsDir = path.join(__dirname, '../src/data/sessions');
  const categoriesPath = path.join(__dirname, '../src/data/categories/categories.json');
  const outputPath = path.join(__dirname, '../src/data/sessions.csv');
  
  // Load categories
  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  
  // CSV headers
  const headers = [
    'ID',
    'タイトル',
    '日付',
    '発表者',
    '説明',
    'タグ',
    '資料数',
    'サムネイルURL',
    '動画URL',
    'カテゴリ'
  ];
  
  // Category mapping
  const categoryTagMap = {
    'fundamentals': ['基礎', '基礎知識', 'AI哲学', '目的論'],
    'tools': ['ツール', 'Claude Code', 'Cursor', 'Airtable', 'Bolt.new', 'Figma', 'Manus', 'Dify', 'Operator', 'SunoAI'],
    'development': ['開発', '実装', 'コード', '即席開発', 'プロトタイピング'],
    'creative': ['クリエイティブ', '画像生成', '音楽生成', 'NFT', 'アート制作'],
    'business': ['ビジネス', '実用', '効率化', '日常業務'],
    'ethics': ['倫理', 'AI倫理', 'ハルシネーション', '知的財産権', 'リスク'],
    'community': ['コミュニティ', '目標設定', '振り返り', '交流', '雑談']
  };
  
  // Function to determine category
  function getCategory(tags) {
    for (const [categoryId, categoryTags] of Object.entries(categoryTagMap)) {
      if (tags.some(tag => categoryTags.some(catTag => tag.includes(catTag)))) {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : '';
      }
    }
    return '';
  }
  
  // Load all sessions
  const files = fs.readdirSync(sessionsDir);
  const sessions = [];
  
  for (const file of files) {
    if (file.endsWith('.json') && file !== 'index.json') {
      const filePath = path.join(sessionsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      sessions.push(data);
    }
  }
  
  // Sort by date (newest first)
  sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Create CSV content
  let csvContent = headers.map(escapeCSV).join(',') + '\n';
  
  for (const session of sessions) {
    const row = [
      session.id,
      session.title,
      session.date,
      session.presenter,
      session.description,
      session.tags.join('; '),
      session.materials.length,
      session.thumbnailUrl || '',
      session.videoUrl || '',
      getCategory(session.tags)
    ];
    
    csvContent += row.map(escapeCSV).join(',') + '\n';
  }
  
  // Write CSV file
  fs.writeFileSync(outputPath, '\ufeff' + csvContent, 'utf8'); // BOM付きUTF-8
  
  console.log(`✅ CSV exported to: ${outputPath}`);
  console.log(`📊 Total sessions: ${sessions.length}`);
}

exportToCSV();