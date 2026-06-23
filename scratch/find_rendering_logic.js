const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script_2.js');
const js = fs.readFileSync(scriptPath, 'utf-8');

const regex = /\.innerHTML\s*=|\.insertAdjacentHTML\(|\.appendChild\(/gi;
const matches = [];
let match;
while ((match = regex.exec(js)) !== null) {
  const line = js.substring(0, match.index).split('\n').length;
  matches.push({
    match: match[0],
    context: js.substring(match.index - 50, match.index + 100).trim(),
    line
  });
}

console.log('DOM modifications in JS:', matches.length);
matches.forEach(m => {
  console.log(`Line ${m.line}: ${m.context}`);
});
