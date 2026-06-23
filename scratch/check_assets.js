const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

// Search for src="..." or href="..."
const srcReg = /(src|href)="([^"]*)"/gi;
const assets = [];
let match;
while ((match = srcReg.exec(content)) !== null) {
  const url = match[2];
  if (!url.startsWith('http') && !url.startsWith('data:')) {
    assets.push({
      attr: match[1],
      url,
      line: content.substring(0, match.index).split('\n').length
    });
  }
}

console.log('Local assets found:', assets);
