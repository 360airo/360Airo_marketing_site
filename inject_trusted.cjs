const fs = require('fs');

let file = fs.readFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', 'utf8');

if (!file.includes("import TrustedOperatorsSection from './components/TrustedOperatorsSection';")) {
  file = file.replace(
    "import EngineeringTeamSection from './components/EngineeringTeamSection';",
    "import EngineeringTeamSection from './components/EngineeringTeamSection';\nimport TrustedOperatorsSection from './components/TrustedOperatorsSection';"
  );
}

if (!file.includes("<TrustedOperatorsSection />")) {
  file = file.replace(
    "<EngineeringTeamSection />",
    "<EngineeringTeamSection />\n  <TrustedOperatorsSection />"
  );
}

fs.writeFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', file);
console.log("Updated App.jsx successfully!");
