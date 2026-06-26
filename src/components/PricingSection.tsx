"use client";
import React from 'react';
import '../styles/PricingSection.css';

export default function PricingSection() {
  return (
    <section className="hp-pricing-section">
      
      {/* SVG GLOBE BACKGROUND */}
      <div className="hp-globe-container">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Subtle Dotted Hemisphere */}
          <g opacity="0.8">
            <circle cx="50" cy="50" r="48" stroke="url(#globe-gradient)" strokeWidth="0.5" strokeDasharray="1 3" fill="transparent" />
            <circle cx="50" cy="50" r="40" stroke="url(#globe-gradient)" strokeWidth="0.4" strokeDasharray="1 4" fill="transparent" />
            <circle cx="50" cy="50" r="32" stroke="url(#globe-gradient)" strokeWidth="0.4" strokeDasharray="1 4" fill="transparent" />
            <circle cx="50" cy="50" r="24" stroke="url(#globe-gradient)" strokeWidth="0.3" strokeDasharray="1 5" fill="transparent" />
            <circle cx="50" cy="50" r="16" stroke="url(#globe-gradient)" strokeWidth="0.3" strokeDasharray="1 5" fill="transparent" />
            
            {/* Longitudes */}
            <ellipse cx="50" cy="50" rx="24" ry="48" stroke="url(#globe-gradient)" strokeWidth="0.4" strokeDasharray="1 3" fill="transparent" />
            <ellipse cx="50" cy="50" rx="12" ry="48" stroke="url(#globe-gradient)" strokeWidth="0.3" strokeDasharray="1 4" fill="transparent" />
            
            {/* Some glowing data points */}
            <circle cx="74" cy="50" r="1" fill="#8B5CF6" />
            <circle cx="26" cy="50" r="1" fill="#5078F2" />
            <circle cx="50" cy="2" r="1" fill="#5078F2" />
            <circle cx="50" cy="98" r="1.5" fill="#8B5CF6" />
            <circle cx="62" cy="18" r="1" fill="#C15AE6" />
            <circle cx="38" cy="82" r="1" fill="#0EB5BB" />
          </g>
          
          <defs>
            <linearGradient id="globe-gradient" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#5078F2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hp-pricing-container">
        
        <div className="hp-pricing-header pp-animate-reveal">
          <span className="hp-pricing-eyebrow">360Airo Pricing</span>
          <h2 className="hp-pricing-title">Simple plans for scalable outreach</h2>
          <p className="hp-pricing-subtitle">
            Choose a plan that fits your outreach volume, campaign workflow, and team goals.
          </p>
        </div>

        <div className="hp-pricing-grid pp-animate-reveal" style={{ animationDelay: '100ms' }}>
          
          {/* Free */}
          <div className="hp-card">
            <div className="hp-card-header">
              <h3 className="hp-card-name">Free</h3>
              <p className="hp-card-desc">For individuals starting with outbound email</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                $0
              </div>
              <div className="hp-card-price-period">/month</div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Unlimited email sending</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>1,000 email contacts</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>1 mailbox</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>1 user</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>500 AI personalization credits</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Email campaigns</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Limited integrations</li>
            </ul>
            <button className="hp-btn hp-btn-free">Downgrade Plan</button>
          </div>

          {/* Starter */}
          <div className="hp-card">
            <div className="hp-card-header">
              <h3 className="hp-card-name">Starter</h3>
              <p className="hp-card-desc">For small outbound teams that need shared tools</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                $99
              </div>
              <div className="hp-card-price-period">/month</div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Unlimited email sending</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>5,000 email contacts</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>8 mailboxes</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Up to 3 users</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>3,000 AI personalization credits/month</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>3 LinkedIn seats</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>3,000 email verification credits/month</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Unified inbox</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Smart scheduler</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Email warmup</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Inbox rotation</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Basic AI automation</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Campaign automation</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Basic integrations</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Basic analytics</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>2 hours/month support</li>
            </ul>
            <button className="hp-btn hp-btn-starter">Current Plan</button>
          </div>

          {/* Pro */}
          <div className="hp-card hp-card-pro">
            <div className="hp-most-popular">Most Popular</div>
            <div className="hp-card-header">
              <h3 className="hp-card-name">Pro</h3>
              <p className="hp-card-desc">For growing teams running advanced outbound workflows</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                $299
              </div>
              <div className="hp-card-price-period">/month</div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Unlimited email sending</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>25,000 email contacts</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>20 mailboxes</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Up to 5 users</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>10,000 AI personalization credits/month</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>5 LinkedIn seats</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>10,000 email verification credits/month</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Unified inbox</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Smart scheduler</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Email warmup</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Advanced AI automation</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Priority support</li>
              <li className="hp-feature-item"><span className="hp-feature-icon">✓</span>Custom onboarding</li>
            </ul>
            <button className="hp-btn hp-btn-pro">Current Plan</button>
          </div>

        </div>

        <div className="hp-pricing-trust pp-animate-reveal" style={{ animationDelay: '150ms' }}>
          Start with a 14-day free Pro trial. A payment method is required, but you will not be charged until the trial ends. Cancel anytime.
        </div>

      </div>
    </section>
  );
}
