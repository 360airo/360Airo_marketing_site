const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const html = fs.readFileSync(filePath, 'utf-8');

// Find the body tag and print the first 1000 characters inside body to see container structure
const bodyIndex = html.indexOf('<body');
const bodyStart = html.indexOf('>', bodyIndex) + 1;
console.log('Body Start HTML:\n', html.substring(bodyStart, bodyStart + 1500));

// Find any tags that look like container divs or sections
const divMatches = html.match(/<div\s+id="[^"]*"/g);
console.log('Div IDs:', divMatches);
