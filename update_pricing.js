const fs = require('fs');
let content = fs.readFileSync('src/app/pricing/page.tsx', 'utf8');

const cardsHtml = `        <section className="pricing-grid">
          {/* CARD 1: Free */}
          <div className="pp-card pp-animate-reveal delay-100">
            <div className="pp-card-inner">
              <h3 className="pp-card-name">Free</h3>
              <p className="pp-card-desc">For individuals starting with outbound email</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>0
                </div>
                <div className="pp-card-price-subtext">per month</div>
              </div>
              
              <Link href="/contact-us" className="pp-btn pp-btn-outline">Start Free Trial</Link>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Free Features</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Unlimited email sending</li>
                  <li className="pp-feature-item"><CheckIcon /> 1,000 email contacts</li>
                  <li className="pp-feature-item"><CheckIcon /> 1 mailbox</li>
                  <li className="pp-feature-item"><CheckIcon /> 1 user</li>
                  <li className="pp-feature-item"><CheckIcon /> 500 AI personalization credits</li>
                  <li className="pp-feature-item"><CheckIcon /> Email campaigns</li>
                  <li className="pp-feature-item"><CheckIcon /> Limited integrations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: Starter */}
          <div className="pp-card pp-animate-reveal delay-100">
            <div className="pp-card-inner">
              <h3 className="pp-card-name">Starter</h3>
              <p className="pp-card-desc">For small outbound teams that need shared tools</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>99
                </div>
                <div className="pp-card-price-subtext">per month</div>
              </div>
              
              <Link href="/contact-us" className="pp-btn pp-btn-outline">Start 14-day trial</Link>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Starter Features</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Unlimited email sending</li>
                  <li className="pp-feature-item"><CheckIcon /> 5,000 email contacts</li>
                  <li className="pp-feature-item"><CheckIcon /> 8 mailboxes & 3 users</li>
                  <li className="pp-feature-item"><CheckIcon /> 3,000 AI credits/mo</li>
                  <li className="pp-feature-item"><CheckIcon /> 3 LinkedIn seats</li>
                  <li className="pp-feature-item"><CheckIcon /> 3,000 email verification credits/mo</li>
                  <li className="pp-feature-item"><CheckIcon /> Unified inbox & Smart scheduler</li>
                  <li className="pp-feature-item"><CheckIcon /> Email warmup & Inbox rotation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: Pro */}
          <div className="pp-card pp-card-recommended pp-animate-reveal delay-200">
            <div className="pp-card-top-bar">Best for growing teams</div>
            <div className="pp-card-inner">
              <h3 className="pp-card-name">Pro</h3>
              <p className="pp-card-desc">For growing teams running advanced outbound workflows</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>299
                </div>
                <div className="pp-card-price-subtext">per month</div>
              </div>
              
              <Link href="/contact-us" className="pp-btn pp-btn-solid">Start 14-day trial</Link>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Pro Features</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Unlimited email sending</li>
                  <li className="pp-feature-item"><CheckIcon /> 25,000 email contacts</li>
                  <li className="pp-feature-item"><CheckIcon /> 20 mailboxes & 5 users</li>
                  <li className="pp-feature-item"><CheckIcon /> 10,000 AI credits/mo</li>
                  <li className="pp-feature-item"><CheckIcon /> 5 LinkedIn seats</li>
                  <li className="pp-feature-item"><CheckIcon /> 10,000 email verification credits/mo</li>
                  <li className="pp-feature-item"><CheckIcon /> Advanced AI & Inbox rotation</li>
                  <li className="pp-feature-item"><CheckIcon /> Full integrations & A/B testing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 4: Enterprise */}
          <div className="pp-card pp-card-ai pp-animate-reveal delay-300">
            <div className="pp-card-inner">
              <div className="pp-ai-label"><AIStarIcon /> Unlimited Scale</div>
              <h3 className="pp-card-name">Enterprise</h3>
              <p className="pp-card-desc">Custom infrastructure and unlimited scale for large organizations</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Custom Pricing</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24, paddingBottom: 10, paddingTop: 10}}>Contact for quote</span>
                </div>
              </div>
              
              <Link href="/contact-us" className="pp-btn pp-btn-white" style={{color: 'var(--pp-bg-navy)'}}>Contact Sales</Link>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Enterprise Features</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Unlimited users & mailboxes</li>
                  <li className="pp-feature-item"><CheckIcon /> Unlimited AI personalization</li>
                  <li className="pp-feature-item"><CheckIcon /> Unlimited LinkedIn seats</li>
                  <li className="pp-feature-item"><CheckIcon /> Custom voice calling seats</li>
                  <li className="pp-feature-item"><CheckIcon /> Custom AI models & API access</li>
                  <li className="pp-feature-item"><CheckIcon /> Dedicated infrastructure</li>
                  <li className="pp-feature-item"><CheckIcon /> Dedicated account executive</li>
                </ul>
              </div>
            </div>
          </div>
        </section>`;

content = content.replace(/<section className="pricing-grid">[\s\S]*?<\/section>/, cardsHtml);

const tableHtml = `          <div className="pp-table-wrapper">
            <table className="pp-compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th className="pp-col-highlight">
                    Pro
                    <div className="pp-table-badge">Best for growing teams</div>
                  </th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Connected Domains</td>
                  <td>1</td>
                  <td className="pp-col-highlight">5</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Daily Send Limit</td>
                  <td>100</td>
                  <td className="pp-col-highlight">1,000</td>
                  <td>10,000+</td>
                </tr>
                <tr>
                  <td>Sequence Capacity</td>
                  <td>3</td>
                  <td className="pp-col-highlight">25</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>AI Automation Tools</td>
                  <td>Basic</td>
                  <td className="pp-col-highlight">Advanced</td>
                  <td>Enterprise</td>
                </tr>
                <tr>
                  <td>CRM Integrations</td>
                  <td>Limited</td>
                  <td className="pp-col-highlight">Full</td>
                  <td>Custom</td>
                </tr>
                <tr>
                  <td>Support Level</td>
                  <td>Standard</td>
                  <td className="pp-col-highlight">Priority</td>
                  <td>Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>`;

content = content.replace(/<div className="pp-table-wrapper">[\s\S]*?<\/div>\s*<div className="pp-compare-note">/, tableHtml + '\n\n          <div className="pp-compare-note">');

// CTA text update
content = content.replace(/START YOUR OUTREACH ENGINE/, 'START FREE TRIAL');
content = content.replace(/Start building better outbound campaigns today./, 'Try 360Airo Free — No Credit Card Required.');
content = content.replace(/Start Free Trial <span className="pp-cta-arrow">\&rarr;<\/span>/, 'Start Free Trial <span className="pp-cta-arrow">&rarr;</span>');

fs.writeFileSync('src/app/pricing/page.tsx', content);
console.log('Update complete');
