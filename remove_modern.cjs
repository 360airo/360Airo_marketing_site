const fs = require('fs');

let file = fs.readFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', 'utf8');

file = file.replace(
  'import ModernOutreachSection from "./components/ModernOutreachSection";',
  ''
);

fs.writeFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', file);
console.log("Updated App.jsx successfully to fix build error!");
