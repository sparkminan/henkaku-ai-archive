const fs = require('fs');
const path = require('path');

// Read the original mockData.json
const mockData = require('../src/data/mockData.json');

// Ensure the sessions directory exists
const sessionsDir = path.join(__dirname, '../src/data/sessions');
if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir, { recursive: true });
}

// Process each session
mockData.studySessions.forEach(session => {
  // Create filename with zero-padded ID
  const paddedId = session.id.padStart(3, '0');
  const filename = `session-${paddedId}.json`;
  const filepath = path.join(sessionsDir, filename);
  
  // Write session data to individual file
  fs.writeFileSync(filepath, JSON.stringify(session, null, 2));
  console.log(`Created: ${filename}`);
});

console.log(`\nSuccessfully created ${mockData.studySessions.length} session files.`);