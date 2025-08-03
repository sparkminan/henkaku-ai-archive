const fs = require('fs');
const path = require('path');

// サイトの基本URL
const BASE_URL = 'https://sparkminan.github.io/henkaku-ai-archive';

// 静的ページのリスト
const staticPages = [
  '',
  '/sessions',
  '/categories',
  '/about',
];

// セッションデータを読み込む
function loadSessions() {
  const sessionsDir = path.join(__dirname, '../src/data/sessions');
  const indexFile = path.join(sessionsDir, 'index.json');
  
  if (!fs.existsSync(indexFile)) {
    console.error('Session index file not found');
    return [];
  }
  
  const sessionFiles = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  const sessions = [];
  
  for (const filename of sessionFiles) {
    const filePath = path.join(sessionsDir, filename);
    if (fs.existsSync(filePath)) {
      const session = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      sessions.push({
        id: session.id,
        date: session.date,
      });
    }
  }
  
  return sessions;
}

// URLエントリを生成
function generateUrlEntry(loc, lastmod, changefreq = 'weekly', priority = '0.5') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// サイトマップを生成
function generateSitemap() {
  const sessions = loadSessions();
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  // 静的ページを追加
  staticPages.forEach((page, index) => {
    const priority = index === 0 ? '1.0' : '0.8'; // ホームページは最高優先度
    const changefreq = index === 0 ? 'daily' : 'weekly';
    sitemap += '\n' + generateUrlEntry(
      `${BASE_URL}${page}`,
      today,
      changefreq,
      priority
    );
  });
  
  // セッションページを追加
  sessions.forEach(session => {
    const lastmod = session.date || today;
    sitemap += '\n' + generateUrlEntry(
      `${BASE_URL}/sessions/${session.id}`,
      lastmod,
      'monthly',
      '0.6'
    );
  });
  
  sitemap += '\n</urlset>';
  
  return sitemap;
}

// robots.txtを生成
function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;
  
  return robots;
}

// ファイルを保存
function saveFiles() {
  const publicDir = path.join(__dirname, '../public');
  
  // サイトマップを保存
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated: public/sitemap.xml');
  
  // robots.txtを保存
  const robots = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('✅ Robots.txt generated: public/robots.txt');
  
  // セッション数を表示
  const sessions = loadSessions();
  console.log(`📊 Total URLs in sitemap: ${staticPages.length + sessions.length}`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Session pages: ${sessions.length}`);
}

// 実行
try {
  saveFiles();
  console.log('\n🎉 Sitemap generation completed successfully!');
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}