const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

const replacementStr = `                    {/* Node 6: Decision 2 (Accepted & Replied?) */}
                    <div className={getNodeClass('decision2', 'flow-node node-decision', 3)}
                      style={{ top: '62.9%', left: '78.5%', transform: 'translateX(-50%)', width: 190 }}>
                      <span style={{ fontSize: '0.8rem' }}>🔗</span> Accepted &amp; Replied?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={getNodeClass('linkedin-msg', 'flow-node node-action', 3)}
                      style={{ top: '75.8%', left: '50%', transform: 'translateX(-50%)', width: 210 }}>
                      <div className="node-meta">Reach out re: email</div>
                      <div className="node-title">
                        Msg: "I tried to reach out..."
                      </div>
                    </div>

                    {/* Node 8: SMS (No) */}
                    <div className={getNodeClass('sms', 'flow-node node-action', 3)}
                      style={{ top: '75.8%', left: '88.5%', transform: 'translateX(-50%)', width: 130 }}>
                      <div className="node-meta">SMS Follow-up</div>
                      <div className="node-title">
                        Send SMS
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'leads' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header-premium">`;

// Using a very robust regex to match from Node 6 to mock-leads-header-premium
content = content.replace(
  /\{\/\*\s*Node 6: Decision 2[\s\S]*?className="mock-leads-header-premium">/,
  replacementStr
);

fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Restored heavily corrupted file');
