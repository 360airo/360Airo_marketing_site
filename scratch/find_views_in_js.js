const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script_2.js');
const js = fs.readFileSync(scriptPath, 'utf-8');

// Search for HTML template strings
const regex = /<section\s+[^>]*class="[^"]*view[^"]*"/gi;
let match;
while ((match = regex.exec(js)) !== null) {
  console.log('Found dynamic view container in JS:', match[0], 'around line', js.substring(0, match.index).split('\n').length);
}

// Find any template strings matching data-view
const regex2 = /data-view="([^"]*)"/gi;
while ((match = regex2.exec(js)) !== null) {
  console.log('Found dynamic data-view in JS:', match[0], 'around line', js.substring(0, match.index).split('\n').length);
}
