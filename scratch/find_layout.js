const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const html = fs.readFileSync(filePath, 'utf-8');

// Find all script blocks and print them
const scriptReg = /<script>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptReg.exec(html)) !== null) {
  count++;
  console.log(`--- Script Block ${count} ---`);
  const content = match[1].trim();
  // if content is too long, print first 300 and last 300 chars
  if (content.length > 1000) {
    console.log(content.substring(0, 500) + '\n... [TRUNCATED] ...\n' + content.substring(content.length - 500));
  } else {
    console.log(content);
  }
}
