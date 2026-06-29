const fs = require('fs');
let content = fs.readFileSync('src/components/AiroAgentBuilder.tsx', 'utf8');

const targetStr = `                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={getNodeClass('linkedin-msg', 'flow-node node-action', 3)}
                      style={{ top: '75.8%', left: '50%', transform: 'translateX(-50%)', width: 210 }}>
                      <div className="node-meta">Reach out re: email</div>
            </>
          )}`;

const replacementStr = `                    {/* Node 7: LinkedIn Message (Yes) */}
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
          )}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/AiroAgentBuilder.tsx', content);
console.log('Restored');
