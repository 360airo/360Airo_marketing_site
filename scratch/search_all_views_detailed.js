const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

// Find all matches for data-view attribute, case-insensitive
const matches = [];
const regex = /data-view="([^"]*)"/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  matches.push({
    view: match[1],
    index: match.index,
    line: content.substring(0, match.index).split('\n').length
  });
}

console.log('Matches found:', matches.length);
matches.forEach(m => {
  console.log(`Line ${m.line}: ${content.substring(m.index - 50, m.index + 100)}`);
});
