const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const regex = /<section\s+class="view"\s+data-view="([^"]*)"/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found section view: ${match[0]} at index ${match.index}`);
}

const sectionRegex = /<section\s+[^>]*data-view="([^"]*)"[^>]*>/gi;
while ((match = sectionRegex.exec(content)) !== null) {
  console.log(`Found any element with data-view: ${match[0]}`);
}
