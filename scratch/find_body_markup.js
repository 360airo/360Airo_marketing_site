const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const appStartIndex = content.indexOf('<div class="app">');
if (appStartIndex !== -1) {
  const beforeAppStart = content.substring(0, appStartIndex);
  const lineCount = beforeAppStart.split('\n').length;
  console.log('<div class="app"> is at line:', lineCount);
  
  const lines = content.split('\n');
  console.log('Lines starting from <div class="app"> (next 100 lines):\n', lines.slice(lineCount - 1, lineCount + 100).join('\n'));
} else {
  console.log('<div class="app"> not found');
}
