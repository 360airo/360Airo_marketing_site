const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const scriptReg = /<script>([\s\S]*?)<\/script>/gi;
let match;
let index = 0;
while ((match = scriptReg.exec(content)) !== null) {
  index++;
  const scriptContent = match[1].trim();
  fs.writeFileSync(path.join(__dirname, `script_${index}.js`), scriptContent);
  console.log(`Saved script_${index}.js (${scriptContent.length} bytes)`);
}
