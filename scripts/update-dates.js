const fs = require('fs');
const path = require('path');

function updateDates() {
  const sessionsDir = path.join(__dirname, '../src/data/sessions');
  const files = fs.readdirSync(sessionsDir);

  for (const file of files) {
    if (file.endsWith('.json') && file !== 'index.json') {
      const filePath = path.join(sessionsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // 日付を1年進める
      const date = new Date(data.date);
      date.setFullYear(date.getFullYear() + 1);
      data.date = date.toISOString().split('T')[0];
      
      // ファイルを保存
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated ${file}: ${data.date}`);
    }
  }
  
  console.log('✅ All dates have been updated!');
}

updateDates();