const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

// Replace SVG lines to restore center drop
const newSvgLines = `                  <svg className="flow-svg-lines" viewBox="0 0 700 620" preserveAspectRatio="none">
                    {/* Start → Email */}
                    <line x1="350" y1="38" x2="350" y2="62" className={getLineClass(1, 'start', 'email1')} />
                    {/* Email → Decision1 */}
                    <line x1="350" y1="135" x2="350" y2="160" className={getLineClass(2, 'email1', 'decision1')} />
                    
                    {/* Decision1 → CRM (Yes left) */}
                    <path d="M 350 195 L 350 230 L 150 230 L 150 240" className={getLineClass(2, 'decision1', 'crm')} />
                    
                    {/* Decision1 → LinkedIn (No right) */}
                    <path d="M 350 195 L 350 230 L 550 230 L 550 240" className={getLineClass(2, 'decision1', 'linkedin-invite')} />
                    
                    {/* LinkedIn → Decision2 */}
                    <line x1="550" y1="330" x2="550" y2="390" className={getLineClass(3, 'linkedin-invite', 'decision2')} />
                    
                    {/* Decision2 → LinkedIn Msg (Yes left) */}
                    <path d="M 550 425 L 550 460 L 350 460 L 350 470" className={getLineClass(3, 'decision2', 'linkedin-msg')} />
                    
                    {/* Decision2 → SMS (No right) */}
                    <path d="M 550 425 L 550 460 L 650 460 L 650 470" className={getLineClass(3, 'decision2', 'sms')} />
                  </svg>`;

content = content.replace(
  /<svg className="flow-svg-lines" viewBox="0 0 700 620" preserveAspectRatio="none">[\s\S]*?<\/svg>/,
  newSvgLines
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Update complete');
