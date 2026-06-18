const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');
content = content.replace(/\}\}\s*"/g, '}}');
fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Fixed stray quotes in App.jsx');
