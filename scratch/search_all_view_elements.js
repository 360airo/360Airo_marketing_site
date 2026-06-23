const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /class="[^"]*view[^"]*"/gi;
const matches = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const line = content.substring(0, match.index).split('\n').length;
  if (line > 4172) { // only look in HTML body
    matches.push({
      text: match[0],
      context: content.substring(match.index - 50, match.index + 120).trim(),
      line
    });
  }
}

console.log('Matches found in body:', matches.length);
matches.forEach(m => {
  console.log(`Line ${m.line}: ${m.context}`);
});
