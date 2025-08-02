#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function addNewSession() {
  console.log('=== 新しいセッションを追加 ===\n');

  // セッションIDを自動生成
  const sessionsDir = path.join(__dirname, '../src/data/sessions');
  const indexPath = path.join(sessionsDir, 'index.json');
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  // 最新のIDを取得
  let latestId = 0;
  for (const filename of indexData) {
    const match = filename.match(/session-(\d+)\.json/);
    if (match) {
      const id = parseInt(match[1]);
      if (id > latestId) latestId = id;
    }
  }
  
  const newId = latestId + 1;
  const paddedId = String(newId).padStart(3, '0');
  const filename = `session-${paddedId}.json`;

  console.log(`新しいセッションID: ${newId}\n`);

  // セッション情報を入力
  const title = await question('タイトル: ');
  const date = await question('開催日 (YYYY-MM-DD): ');
  const presenter = await question('発表者: ');
  const description = await question('説明: ');
  
  // タグを入力（カンマ区切り）
  const tagsInput = await question('タグ (カンマ区切り): ');
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
  
  // 資料の数を入力
  const materialCount = parseInt(await question('資料の数 (0以上): ')) || 0;
  const materials = [];
  
  for (let i = 0; i < materialCount; i++) {
    console.log(`\n--- 資料 ${i + 1} ---`);
    const materialTitle = await question('資料タイトル: ');
    const materialType = await question('タイプ (slide/document/code/other): ') || 'document';
    const materialUrl = await question('URL (/documents/...): ');
    const materialDesc = await question('資料説明: ');
    
    materials.push({
      id: `${newId}-${i + 1}`,
      title: materialTitle,
      type: materialType,
      url: materialUrl,
      description: materialDesc
    });
  }
  
  // サムネイルURL
  const thumbnailUrl = await question('\nサムネイルURL (/images/...): ') || '/images/ai-session-generic.svg';
  
  // ビデオURL（オプション）
  const videoUrl = await question('ビデオURL (オプション、Enterでスキップ): ');

  // セッションオブジェクトを作成
  const session = {
    id: String(newId),
    title,
    date,
    presenter,
    description,
    tags,
    materials,
    thumbnailUrl
  };
  
  if (videoUrl) {
    session.videoUrl = videoUrl;
  }

  // ファイルに保存
  const filepath = path.join(sessionsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(session, null, 2));
  console.log(`\n✅ セッションファイルを作成しました: ${filename}`);

  // index.jsonを更新
  indexData.unshift(filename); // 先頭に追加
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
  console.log('✅ index.jsonを更新しました');

  console.log('\n=== 完了 ===');
  console.log('次のステップ:');
  console.log('1. 必要に応じて画像や資料ファイルをpublicディレクトリに配置してください');
  console.log('2. npm run dev でローカル環境を確認してください');
  
  rl.close();
}

// メイン処理
addNewSession().catch(console.error);