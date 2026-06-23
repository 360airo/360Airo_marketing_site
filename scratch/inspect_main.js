const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const content = fs.readFileSync(filePath, 'utf-8');

const mainStart = content.indexOf('<main class="page">');
const mainEnd = content.indexOf('</main>', mainStart);

if (mainStart !== -1 && mainEnd !== -1) {
  const mainContent = content.substring(mainStart, mainEnd + 7);
  console.log('Main Content Length:', mainContent.length);
  
  // Find all children tags of <main> (like <section> or <div>)
  const regex = /<section\s+[^>]*class="view"[^>]*>|<div\s+[^>]*class="view"[^>]*>/gi;
  let match;
  while ((match = regex.exec(mainContent)) !== null) {
    console.log('Found view container in <main>:', match[0], 'at index', match.index);
  }
  
  // Write the main content to a scratch file so we can view it
  fs.writeFileSync(path.join(__dirname, 'main_content.html'), mainContent);
  console.log('Saved main_content.html');
} else {
  console.log('Main tag not found');
}
