const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const inboxIndex = content.indexOf('unified-inbox');
if (inboxIndex !== -1) {
  console.log('Found unified-inbox at index:', inboxIndex);
  const lines = content.substring(0, inboxIndex).split('\n');
  const lineCount = lines.length;
  console.log('Line number:', lineCount);
  
  const allLines = content.split('\n');
  console.log('Lines around unified-inbox:\n', allLines.slice(lineCount - 10, lineCount + 40).join('\n'));
} else {
  console.log('unified-inbox not found');
}
