const fs = require('fs');

let file = fs.readFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', 'utf8');

file = file.replace(
  "import { initAnimations } from './animations';",
  "import { initAnimations } from './animations';\nimport EngineeringTeamSection from './components/EngineeringTeamSection';"
);

file = file.replace(
  '    </section>\n  </div>\n  <div id="section-mountain">',
  '    </section>\n  </div>\n  <EngineeringTeamSection />\n  <div id="section-mountain">'
);

// Fallback for Windows carriage returns just in case
file = file.replace(
  '    </section>\r\n  </div>\r\n  <div id="section-mountain">',
  '    </section>\r\n  </div>\r\n  <EngineeringTeamSection />\r\n  <div id="section-mountain">'
);

fs.writeFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', file);
console.log("Updated App.jsx successfully!");
