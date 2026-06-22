const fs = require('fs');

let file = fs.readFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', 'utf8');

if (!file.includes("import LaunchFasterSection from './components/LaunchFasterSection';")) {
  file = file.replace(
    "import TrustedOperatorsSection from './components/TrustedOperatorsSection';",
    "import TrustedOperatorsSection from './components/TrustedOperatorsSection';\nimport LaunchFasterSection from './components/LaunchFasterSection';"
  );
}

if (!file.includes("<LaunchFasterSection />")) {
  file = file.replace(
    "<TrustedOperatorsSection />",
    "<TrustedOperatorsSection />\n  <LaunchFasterSection />"
  );
}

fs.writeFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', file);
console.log("Updated App.jsx successfully!");
