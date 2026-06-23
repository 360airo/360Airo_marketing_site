const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script_2.js');
const js = fs.readFileSync(scriptPath, 'utf-8');

const lines = js.split('\n');
const declarations = [];
lines.forEach((line, idx) => {
  if (idx >= 245) {
    if (line.match(/^\s*(function|const|let|var)\s+[a-zA-Z0-9_]+\s*=/i) || line.match(/^\s*function\s+[a-zA-Z0-9_]+/i) || line.match(/^\s*const\s+[a-zA-Z0-9_]+\s*=\s*\(/i)) {
      declarations.push(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});

console.log('--- Declarations after line 245 (first 50) ---');
console.log(declarations.slice(0, 50).join('\n'));
