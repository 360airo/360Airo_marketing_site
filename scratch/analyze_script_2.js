const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script_2.js');
const js = fs.readFileSync(scriptPath, 'utf-8');

console.log('Script length:', js.length);

// Print the first 1200 characters of the script to see what global variables or modules are declared
console.log('--- Start of Script ---');
console.log(js.substring(0, 1200));

// Find all function declarations or top-level variable declarations
const lines = js.split('\n');
const declarations = [];
lines.forEach((line, idx) => {
  if (line.match(/^\s*(function|const|let|var)\s+[a-zA-Z0-9_]+\s*=/i) || line.match(/^\s*function\s+[a-zA-Z0-9_]+/i)) {
    declarations.push(`Line ${idx + 1}: ${line.trim()}`);
  }
});

console.log('--- Key declarations (first 40) ---');
console.log(declarations.slice(0, 40).join('\n'));
