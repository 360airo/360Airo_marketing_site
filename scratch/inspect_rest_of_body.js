const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

const mainEndIndex = lines.findIndex(l => l.includes('</main>'));
console.log('</main> is at line:', mainEndIndex + 1);
console.log('Lines after </main> (next 300 lines):\n', lines.slice(mainEndIndex + 1, mainEndIndex + 301).join('\n'));
