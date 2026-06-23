const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

console.log('Total lines:', lines.length);

// Let's print lines 800 to 1200 to see where the sidebar and topbar end, and main content begins.
console.log('Lines 800 to 1100:\n', lines.slice(800, 1100).join('\n'));
