"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/PricingPage.css';

type Tab = 'outreach' | 'ai' | 'agencies';

const CheckIcon = () => (
  <svg className="pp-feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AIStarIcon = () => (
  <svg className="pp-feature-icon" style={{ color: 'var(--pp-purple)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('outreach');

  return (
    <div className="pricing-page-wrapper">
      <Navbar />

      <main className="pricing-page-container">
        
        {/* HERO SECTION */}
        <section className="pricing-hero pp-animate-reveal">
          <div className="pricing-eyebrow">360Airo Pricing</div>
          <h1 className="pricing-hero-heading">
            Find the <span className="pp-hero-gradient">Perfect Plan</span> for Your Outreach Goals
          </h1>
          <p className="pricing-hero-desc">
            Each 360Airo plan comes with built-in access to our full suite of AI-powered tools — including email warmup, AI automation, LinkedIn outreach, prospect CRM, and reports & analytics.
          </p>

          <div className="pp-controls-container">
            {/* TABS */}
            <div className="pp-tabs" data-active={activeTab}>
              <div className="pp-tab-slider"></div>
              <div 
                className={`pp-tab ${activeTab === 'outreach' ? 'active' : ''}`}
                onClick={() => setActiveTab('outreach')}
              >
                Sales Outreach
              </div>
              <div 
                className={`pp-tab ${activeTab === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                AI SDR <span className="pp-tab-badge">New</span>
              </div>
              <div 
                className={`pp-tab ${activeTab === 'agencies' ? 'active' : ''}`}
                onClick={() => setActiveTab('agencies')}
              >
                Agencies
              </div>
            </div>

            {/* TOGGLE & MICRO RECOMMENDATION */}
            <div className="pp-billing-wrapper">
              <div className="pp-billing-toggle">
                <span 
                  className={`pp-toggle-label ${!isYearly ? 'active' : ''}`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </span>
                
                <div 
                  className="pp-toggle-switch" 
                  data-yearly={isYearly}
                  onClick={() => setIsYearly(!isYearly)}
                >
                  <div className="pp-toggle-thumb" />
                </div>
                
                <span 
                  className={`pp-toggle-label ${isYearly ? 'active' : ''}`}
                  onClick={() => setIsYearly(true)}
                >
                  Annually
                </span>
                
                <span className="pp-yearly-badge">Save up to 17%</span>
              </div>
              <div className="pp-trust-note">Flexible plans. Upgrade, downgrade, or cancel anytime.</div>
            </div>

            {/* Smart Recommendation */}
            <div className="pp-smart-recommendation pp-animate-reveal delay-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--pp-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <div>Not sure where to start? <span>Growth</span> is best for teams launching multichannel campaigns.</div>
            </div>

          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="pricing-grid">
          
          {/* CARD 1: Base/Starter */}
          <div className="pp-card pp-animate-reveal delay-100">
            <div className="pp-card-inner">
              <h3 className="pp-card-name">Email Volume</h3>
              <p className="pp-card-desc">Send high-volume outbound email sequences at scale with maximum deliverability.</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>
                  {isYearly ? '59' : '79'}
                </div>
                <div className="pp-card-price-subtext">per user / month, billed {isYearly ? 'annually' : 'monthly'}</div>
              </div>
              
              <a href="#" className="pp-btn pp-btn-outline">Start 14-day trial</a>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Channels</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Email Automation</li>
                  <li className="pp-feature-item dimmed"><CheckIcon /> LinkedIn Automation</li>
                  <li className="pp-feature-item dimmed"><CheckIcon /> Calls & SMS</li>
                </ul>
              </div>

              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Core Features</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Free Warmup</li>
                  <li className="pp-feature-item"><CheckIcon /> Unlimited inboxes</li>
                  <li className="pp-feature-item"><CheckIcon /> 50 B2B data credits / mo</li>
                  <li className="pp-feature-item"><CheckIcon /> Anti-spam safety limits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: Growth (Recommended) */}
          <div className="pp-card pp-card-recommended pp-animate-reveal delay-200">
            <div className="pp-card-top-bar">Best value for growing teams</div>
            <div className="pp-card-inner">
              <h3 className="pp-card-name">Multichannel</h3>
              <p className="pp-card-desc">Combine autonomous Email, LinkedIn, and Calls in unified sequences to book more meetings.</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>
                  {isYearly ? '109' : '149'}
                </div>
                <div className="pp-card-price-subtext">per user / month, billed {isYearly ? 'annually' : 'monthly'}</div>
              </div>
              
              <a href="#" className="pp-btn pp-btn-solid">Start 14-day trial</a>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Channels</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> Email Automation (Unlimited)</li>
                  <li className="pp-feature-item"><CheckIcon /> LinkedIn Automation</li>
                  <li className="pp-feature-item"><CheckIcon /> Calls & SMS Automation</li>
                </ul>
              </div>

              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Growth Tools</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> AI-assisted sequence writer</li>
                  <li className="pp-feature-item"><CheckIcon /> Smart inbox rotation</li>
                  <li className="pp-feature-item"><CheckIcon /> Advanced deliverability suite</li>
                  <li className="pp-feature-item"><CheckIcon /> Team performance reporting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: Distinct / AI SDR */}
          <div className="pp-card pp-card-ai pp-animate-reveal delay-300">
            <div className="pp-card-inner">
              <div className="pp-ai-label"><AIStarIcon /> 360Airo AI</div>
              <h3 className="pp-card-name">Hire AI SDR</h3>
              <p className="pp-card-desc">An autonomous agent that identifies prospects, writes personalized copy, and manages replies 24/7.</p>
              
              <div className="pp-card-price-wrap">
                <div className="pp-card-price-period">Starting at</div>
                <div className="pp-card-price">
                  <span style={{fontSize: 24}}>$</span>
                  {isYearly ? '600' : '800'}
                </div>
                <div className="pp-card-price-subtext">/ month, billed {isYearly ? 'annually' : 'monthly'}</div>
              </div>
              
              <a href="#" className="pp-btn pp-btn-white" style={{color: 'var(--pp-bg-navy)'}}>Hire AI SDR</a>
              
              <div className="pp-card-divider"></div>
              
              <div className="pp-feature-group">
                <div className="pp-feature-group-title">Autonomous Capabilities</div>
                <ul className="pp-feature-list">
                  <li className="pp-feature-item"><CheckIcon /> 24/7 Autonomous Operations</li>
                  <li className="pp-feature-item"><CheckIcon /> Real-time prospect intent search</li>
                  <li className="pp-feature-item"><CheckIcon /> Inbox signals routing</li>
                  <li className="pp-feature-item"><CheckIcon /> AI hyper-personalization</li>
                  <li className="pp-feature-item"><CheckIcon /> AI-generated responses</li>
                </ul>
              </div>
            </div>
          </div>

        </section>

        {/* SOCIAL PROOF */}
        <section className="pp-social-proof pp-animate-reveal">
          <div className="pp-sp-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Trusted by modern outbound teams
          </div>
          <div className="pp-sp-item">
            <div className="pp-sp-avatars">
              <div className="pp-sp-avatar" style={{backgroundImage: 'url("https://i.pravatar.cc/100?img=1")', backgroundSize: 'cover'}}></div>
              <div className="pp-sp-avatar" style={{backgroundImage: 'url("https://i.pravatar.cc/100?img=2")', backgroundSize: 'cover'}}></div>
              <div className="pp-sp-avatar" style={{backgroundImage: 'url("https://i.pravatar.cc/100?img=3")', backgroundSize: 'cover'}}></div>
              <div className="pp-sp-avatar" style={{backgroundImage: 'url("https://i.pravatar.cc/100?img=4")', backgroundSize: 'cover'}}></div>
            </div>
            <span><strong style={{color: 'var(--pp-text-main)'}}>4.9/5</strong> customer satisfaction</span>
          </div>
          <div className="pp-sp-item">
            <svg className="pp-sp-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            No long-term contracts
          </div>
        </section>

        {/* COMPARE PLANS */}
        <section className="pp-compare-section">
          <div className="pp-section-header">
            <h2 className="pp-section-heading">Compare Plans Side by Side</h2>
            <p className="pp-section-subtext">See the full feature breakdown to decide the best fit for your outreach scale, team size, and automation needs.</p>
          </div>
          
          <div className="pp-table-wrapper">
            <table className="pp-compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th className="pp-col-highlight">
                    Growth
                    <div className="pp-table-badge">Best for growing teams</div>
                  </th>
                  <th>Pro</th>
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
                  <td>400</td>
                  <td className="pp-col-highlight">1,000</td>
                  <td>10,000+</td>
                </tr>
                <tr>
                  <td>Sequence Campaigns</td>
                  <td>5</td>
                  <td className="pp-col-highlight">25</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>AI Automation Steps</td>
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
          </div>
          
          <div className="pp-compare-note">
            Not sure which plan fits your workflow? Compare capabilities by team size, automation needs, and sending scale.
          </div>
        </section>

        {/* WHAT'S INCLUDED (Deep Navy Option A) */}
        <section className="pp-included-section">
          <div className="pp-section-header">
            <h2 className="pp-section-heading">What's Included in Every Plan</h2>
            <p className="pp-section-subtext">No matter which plan you choose, every user gets access to the complete suite of 360Airo outreach tools to scale your revenue.</p>
          </div>
          
          <div className="pp-features-grid">
            <div className="pp-feature-card">
              <div className="pp-fc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>
              <h4 className="pp-fc-title">Full Dashboard Access</h4>
              <p className="pp-fc-desc">Manage campaigns, audiences, lead analytics, and account security from one unified dashboard.</p>
            </div>
            
            <div className="pp-feature-card">
              <div className="pp-fc-icon" style={{color: 'var(--pp-cyan)', backgroundColor: 'rgba(14, 181, 187, 0.1)', borderColor: 'rgba(14, 181, 187, 0.2)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h4 className="pp-fc-title">Deliverability Monitoring</h4>
              <p className="pp-fc-desc">Monitor sender health, warmup activity, inbox placement, and deliverability performance.</p>
            </div>
            
            <div className="pp-feature-card">
              <div className="pp-fc-icon" style={{color: 'var(--pp-purple)', backgroundColor: 'rgba(193, 90, 230, 0.1)', borderColor: 'rgba(193, 90, 230, 0.2)'}}>
                <AIStarIcon />
              </div>
              <h4 className="pp-fc-title">AI Content Generation</h4>
              <p className="pp-fc-desc">Create dynamic email sequences, multiple A/B/C/D steps, and semantic AI variables instantly.</p>
            </div>
            
            <div className="pp-feature-card">
              <div className="pp-fc-icon" style={{color: 'var(--pp-primary)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h4 className="pp-fc-title">Performance Analytics</h4>
              <p className="pp-fc-desc">Track open rates, replies, bounces, appointments booked, and revenue generated in real time.</p>
            </div>
            
            <div className="pp-feature-card">
              <div className="pp-fc-icon" style={{color: 'var(--pp-soft-blue)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h4 className="pp-fc-title">Domain Management</h4>
              <p className="pp-fc-desc">Connect multiple inboxes, buy new domains, and easily configure DNS records directly from the platform.</p>
            </div>
            
            <div className="pp-feature-card">
              <div className="pp-fc-icon" style={{color: 'var(--pp-light-blue)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h4 className="pp-fc-title">Team Collaboration</h4>
              <p className="pp-fc-desc">Add team members, share audiences, segment activity, and manage multiple company workspaces.</p>
            </div>
          </div>
          
          <div className="pp-included-footer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            Built to scale with you. Connect a CRM to keep your data perfectly in sync.
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="pp-final-cta">
          <div className="pp-cta-panel">
            <div className="pp-cta-eyebrow">START YOUR OUTREACH ENGINE</div>
            <h2 className="pp-cta-heading">Start building better outbound campaigns today.</h2>
            <p className="pp-cta-desc">Create your first campaign, connect an inbox, and explore AI-powered outreach in minutes. No credit card required.</p>
            <a href="#" className="pp-btn pp-btn-solid">Start Free Trial <span className="pp-cta-arrow">&rarr;</span></a>
            
            <div className="pp-cta-trust">
              <span><CheckIcon /> No credit card required</span>
              <span><CheckIcon /> Cancel anytime</span>
              <span><CheckIcon /> Setup in minutes</span>
            </div>
          </div>
        </section>

        {/* FAQ SHORTCUT */}
        <div className="pp-faq-shortcut">
          <a href="#">Questions about pricing, credits, or deliverability? View FAQ &rarr;</a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
