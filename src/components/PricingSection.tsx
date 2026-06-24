import React from 'react';
import Image from 'next/image';
import '../styles/PricingSection.css';

export default function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        
        <div className="pricing-header">
          <span className="pricing-kicker">START REACHING YOUR CLIENTS IN MINUTES</span>
          <h2 className="pricing-title">Grow faster with 360Airo</h2>
        </div>

        <div className="pricing-controls">
          <div className="pricing-segment-control">
            <button className="segment-btn active">Sales Outreach</button>
            <button className="segment-btn">
              AI SDR <span className="segment-badge">New</span>
            </button>
            <button className="segment-btn">Agencies</button>
          </div>

          <div className="pricing-billing-toggle">
            <label className="billing-radio">
              <input type="radio" name="billing" defaultChecked />
              <span className="radio-dot"></span>
              Annually <span className="billing-badge">save up to 20%</span>
            </label>
            <label className="billing-radio">
              <input type="radio" name="billing" />
              <span className="radio-dot"></span>
              Monthly
            </label>
          </div>
        </div>

        <div className="pricing-grid">
          {/* Starter */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="tier-name">Starter</h3>
              <div className="tier-price">$49<span>/mo</span></div>
              <p className="tier-desc">Best for individuals starting out</p>
            </div>
            <ul className="tier-features">
              <li>Manage up to 2 channels</li>
              <li>Basic campaign support</li>
              <li>Email support within 48 hours</li>
              <li>Access to community forum</li>
              <li>Monthly performance reports</li>
            </ul>
            <button className="tier-btn outline">Browse Starter</button>
          </div>

          {/* Professional */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="tier-name">Professional</h3>
              <div className="tier-price">$149<span>/mo</span></div>
              <p className="tier-desc">Perfect for growing teams between 10k - 100k</p>
            </div>
            <ul className="tier-features">
              <li>Everything in Starter, plus</li>
              <li>Manage up to 5 channels</li>
              <li>Priority outreach support</li>
              <li>Email support within 24 hours</li>
              <li>Access to exclusive webinars</li>
              <li>Monthly strategy sessions</li>
              <li>Advanced analytics reports</li>
            </ul>
            <button className="tier-btn solid">Buy Now</button>
          </div>

          {/* Growth (Highlighted) */}
          <div className="pricing-card highlighted">
            <div className="pricing-card-header">
              <h3 className="tier-name">Growth</h3>
              <div className="tier-price">$299<span>/mo</span></div>
              <p className="tier-desc">Perfect for scaling outbound operations 100k+</p>
            </div>
            <ul className="tier-features">
              <li>Everything in Professional, plus</li>
              <li>Manage up to 10 channels</li>
              <li>Priority outreach support</li>
              <li>Email support within 12 hours</li>
              <li>Access to private growth community</li>
              <li>Bi-weekly strategy sessions</li>
              <li>Advanced analytics and insights</li>
            </ul>
            <button className="tier-btn white">Buy Now</button>
          </div>

          {/* Enterprise */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="tier-name">Enterprise</h3>
              <div className="tier-title">Contact Us</div>
              <p className="tier-desc">Perfect for large organizations 1m+</p>
            </div>
            <ul className="tier-features">
              <li>Everything in Growth, plus</li>
              <li>Manage unlimited channels</li>
              <li>24/7 priority support</li>
              <li>Access to VIP creator community</li>
              <li>Weekly strategy sessions</li>
              <li>Comprehensive analytics and insights</li>
              <li>Custom branding and design services</li>
            </ul>
            <button className="tier-btn solid">Contact Us</button>
          </div>
        </div>

      </div>
    </section>
  );
}
