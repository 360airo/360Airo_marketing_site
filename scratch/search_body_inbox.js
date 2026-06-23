const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /unified-inbox/gi;
const matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const line = content.substring(0, match.index).split('\n').length;
  matches.push({
    context: content.substring(match.index - 50, match.index + 100),
    line
  });
}

console.log('Matches found:', matches.length);
matches.forEach(m => {
  console.log(`Line ${m.line}: ${m.context}`);
});
