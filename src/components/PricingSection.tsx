"use client";
import React, { useState } from 'react';
import '../styles/PricingSection.css';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  // Toggle function
  const handleToggle = () => setIsYearly(!isYearly);

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

        <div className="hp-billing-toggle pp-animate-reveal" style={{ animationDelay: '50ms' }}>
          <span 
            className={`hp-toggle-label ${!isYearly ? 'active' : ''}`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </span>
          <div 
            className="hp-toggle-switch" 
            data-yearly={isYearly}
            onClick={handleToggle}
          >
            <div className="hp-toggle-thumb"></div>
            <div className="hp-yearly-badge">Save up to 20%</div>
          </div>
          <span 
            className={`hp-toggle-label ${isYearly ? 'active' : ''}`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </span>
        </div>

        <div className="hp-pricing-grid pp-animate-reveal" style={{ animationDelay: '100ms' }}>
          
          {/* Free */}
          <div className="hp-card">
            <div className="hp-card-header">
              <h3 className="hp-card-name">Free</h3>
              <p className="hp-card-desc">Perfect to explore the platform.</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                $0
              </div>
              <div className="hp-card-price-period">Free forever</div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                1 User Seat
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Connect up to 2 email accounts
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                500 emails/month
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Basic personalization tags
              </li>
            </ul>
            <button className="hp-btn hp-btn-free">Get Started</button>
          </div>

          {/* Starter */}
          <div className="hp-card">
            <div className="hp-card-header">
              <h3 className="hp-card-name">Starter</h3>
              <p className="hp-card-desc">Best for individuals and small teams.</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                ${isYearly ? '39' : '49'}
                <span className="hp-card-price-period">/mo</span>
              </div>
              <div className="hp-card-price-period">
                {isYearly ? 'Billed annually ($468/yr)' : 'Billed monthly'}
              </div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Up to 3 User Seats
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Connect up to 10 email accounts
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                5,000 emails/month
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                AI email writer
              </li>
            </ul>
            <button className="hp-btn hp-btn-starter">Start Trial</button>
          </div>

          {/* Pro */}
          <div className="hp-card hp-card-pro">
            <div className="hp-most-popular">Most Popular</div>
            <div className="hp-card-header">
              <h3 className="hp-card-name">Pro</h3>
              <p className="hp-card-desc">Perfect for growing teams scaling outbound.</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price">
                ${isYearly ? '119' : '149'}
                <span className="hp-card-price-period">/mo</span>
              </div>
              <div className="hp-card-price-period">
                {isYearly ? 'Billed annually ($1,428/yr)' : 'Billed monthly'}
              </div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Unlimited User Seats
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Connect up to 50 email accounts
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Unlimited emails/month
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Advanced AI intent scoring
              </li>
            </ul>
            <button className="hp-btn hp-btn-pro">Get Pro Plan</button>
          </div>

          {/* Enterprise */}
          <div className="hp-card">
            <div className="hp-card-header">
              <h3 className="hp-card-name">Enterprise</h3>
              <p className="hp-card-desc">Perfect for large organizations and agencies.</p>
            </div>
            <div className="hp-card-price-wrap">
              <div className="hp-card-price" style={{ fontSize: '32px' }}>
                Contact Us
              </div>
              <div className="hp-card-price-period">Custom volume & limits</div>
            </div>
            <ul className="hp-feature-list">
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Custom infrastructure
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                Dedicated deliverability IP
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                White-labeling for agencies
              </li>
              <li className="hp-feature-item">
                <span className="hp-feature-icon">✓</span>
                SAML & SSO integrations
              </li>
            </ul>
            <button className="hp-btn hp-btn-enterprise">Talk to Sales</button>
          </div>

        </div>

        <div className="hp-pricing-trust pp-animate-reveal" style={{ animationDelay: '150ms' }}>
          Start with a 14-day free Pro trial. A payment method is required, but you will not be charged until the trial ends. Cancel anytime.
        </div>

      </div>
    </section>
  );
}
