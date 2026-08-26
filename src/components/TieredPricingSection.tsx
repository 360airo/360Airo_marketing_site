// @ts-nocheck
"use client";
import React, { useState } from 'react';
import '../styles/TieredPricingSection.css';

export default function TieredPricingSection() {
  const [billingCycle, setBillingCycle] = useState('annually');
  const [activeCategory, setActiveCategory] = useState('sales');

  return (
    <section className="tiered-pricing-wrapper" id="section-pricing">
      <div className="tiered-pricing-container">
        
        {/* Header Section */}
        <div className="tiered-pricing-header">
          <span className="tiered-header-sub">START REACHING YOUR CLIENTS IN MINUTES</span>
          <h2 className="tiered-header-title">Grow faster with Reply</h2>
        </div>

        {/* Category Switcher Tabs */}
        <div className="tiered-category-tabs">
          <button 
            className={`tiered-tab-btn ${activeCategory === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sales')}
          >
            Sales Outreach
          </button>
          <button 
            className={`tiered-tab-btn ${activeCategory === 'sdr' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sdr')}
          >
            <span>AI SDR</span>
            <span className="tiered-pill-badge">New</span>
          </button>
          <button 
            className={`tiered-tab-btn ${activeCategory === 'agencies' ? 'active' : ''}`}
            onClick={() => setActiveCategory('agencies')}
          >
            Agencies
          </button>
        </div>

        {/* Billing Switcher */}
        <div className="tiered-billing-toggle">
          <div 
            className={`tiered-toggle-option ${billingCycle === 'annually' ? 'active' : ''}`}
            onClick={() => setBillingCycle('annually')}
          >
            <span className="tiered-custom-radio">
              {billingCycle === 'annually' && <span className="radio-inner-dot" />}
            </span>
            <span>Annually</span>
            <span className="tiered-save-badge">save up to 17%</span>
          </div>

          <div 
            className={`tiered-toggle-option ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            <span className="tiered-custom-radio">
              {billingCycle === 'monthly' && <span className="radio-inner-dot" />}
            </span>
            <span>Monthly</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="tiered-pricing-grid">
          
          {/* 1. Starter */}
          <div className="pricing-tier-card">
            <div className="tier-card-content">
              <div className="tier-name">Starter</div>
              <div className="tier-price-row">
                <span className="tier-price">{billingCycle === 'annually' ? '$4' : '$6'}</span>
                {billingCycle !== 'contact' && <span className="tier-period">/mo</span>}
              </div>
              <div className="tier-audience-desc">
                Best for creators starting out
              </div>

              <ul className="tier-feature-list">
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Manage up to 2 channels
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Basic video upload support
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Email support within 48 hours
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Access to community forum
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Monthly performance reports
                </li>
              </ul>
            </div>

            <button className="tier-btn tier-btn-dark">Browse Starter</button>
          </div>

          {/* 2. Medium */}
          <div className="pricing-tier-card">
            <div className="tier-card-content">
              <div className="tier-name">Medium</div>
              <div className="tier-price-row">
                <span className="tier-price">{billingCycle === 'annually' ? '$8' : '$11'}</span>
                <span className="tier-period">/mo</span>
              </div>
              <div className="tier-audience-desc">
                Perfect for creators between 10k - 100k
              </div>

              <ul className="tier-feature-list">
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Everything in Starter, plus
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Manage up to 5 channels
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Priority video upload support
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Email support within 24 hours
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Access to exclusive webinars
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Monthly strategy sessions
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Advanced analytics reports
                </li>
              </ul>
            </div>

            <button className="tier-btn tier-btn-dark">Buy Now</button>
          </div>

          {/* 3. Influencer (Highlighted Dark Card) */}
          <div className="pricing-tier-card featured-dark">
            <div className="tier-card-content">
              <div className="tier-name">Influencer</div>
              <div className="tier-price-row">
                <span className="tier-price">{billingCycle === 'annually' ? '$12' : '$16'}</span>
                <span className="tier-period">/mo</span>
              </div>
              <div className="tier-audience-desc">
                Perfect for creators between 100k - 1m
              </div>

              <ul className="tier-feature-list">
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Everything in Starter, plus
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Manage up to 10 channels
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Priority video upload support
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Email support within 12 hours
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Access to private creator community
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Monthly strategy sessions
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Advanced analytics and insights
                </li>
              </ul>
            </div>

            <button className="tier-btn tier-btn-white">Buy Now</button>
          </div>

          {/* 4. Celebrity */}
          <div className="pricing-tier-card">
            <div className="tier-card-content">
              <div className="tier-name">Celebrity</div>
              <div className="tier-price-row">
                <span className="tier-price">Contact Us</span>
              </div>
              <div className="tier-audience-desc">
                Perfect for creators between 1m - 100m
              </div>

              <ul className="tier-feature-list">
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Everything in Influencer, plus
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Manage unlimited channels
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  24/7 priority support
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Access to VIP creator community
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Weekly strategy sessions
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Comprehensive analytics and insights
                </li>
                <li className="tier-feature-item">
                  <span className="tier-check-icon">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  Custom branding and design services
                </li>
              </ul>
            </div>

            <button className="tier-btn tier-btn-dark">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}