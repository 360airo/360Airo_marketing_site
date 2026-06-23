const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script_2.js');
const lines = fs.readFileSync(scriptPath, 'utf-8').split('\n');

console.log('Lines 85 to 150 of script_2.js:\n', lines.slice(84, 150).join('\n'));
