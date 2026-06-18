const fs = require('fs');

const filePaths = ['src/App.jsx', 'src/animations.js'];

const replacements = {
  'ΓåÆ': '→',
  'Γàù': '↑',
  '┬⌐': '©',
  'ΓÇö': '—',
  '≡¥òÅ': '𝕏',
  'Γû╢': '▶',
  'ΓÇÿ': '‘',
  'ΓÇÖ': '’',
  'ΓÇ£': '“',
  'ΓÇ¥': '”'
};

filePaths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const [bad, good] of Object.entries(replacements)) {
      if (content.includes(bad)) {
        content = content.split(bad).join(good);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed mojibake in ${filePath}`);
    }
  }
});
