// @ts-nocheck
"use client";
import React from 'react';
import '../styles/DeploymentsSection.css';

export default function DeploymentsSection() {
  return (
    <section className="deployments-section-wrapper" id="section-deployments">
      <div className="deployments-container">
        <div className="deployments-outer-card">
          
          {/* Header with simulated Figma frame selection handles */}
          <div className="deployments-header">
            <div className="deployments-focus-box">
              <span className="figma-handle fh-tl"></span>
              <span className="figma-handle fh-tr"></span>
              <span className="figma-handle fh-bl"></span>
              <span className="figma-handle fh-br"></span>
              <h2 className="deployments-title">Deployments made easy</h2>
            </div>
            <p className="deployments-subtitle">
              Deploy with ease, leave complexities to us.
            </p>
          </div>

          {/* Asymmetric Bento Grid (matches screenshot dimensions) */}
          <div className="deployments-bento-grid">
            
            {/* Card 1: One click deploy (7 spans) */}
            <div className="deploy-bento-card deploy-card-1">
              <div className="deploy-card-1-graphic">
                
                {/* Visual SVG Connecting lines behind the cards */}
                <svg className="connecting-lines-svg" viewBox="0 0 600 240" fill="none">
                  <path 
                    d="M 180 120 C 240 70, 260 170, 320 120" 
                    stroke="#e2e8f0" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                  <path 
                    d="M 320 120 C 360 80, 420 160, 450 120" 
                    stroke="#e2e8f0" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />
                </svg>

                {/* Left side: Git Command Terminal Box */}
                <div className="deploy-git-card">
                  <div className="git-line">
                    <span className="git-cmd">git</span>
                    <span className="git-val">add .</span>
                  </div>
                  <div className="git-line">
                    <span className="git-cmd">git</span>
                    <span className="git-val">commit -m "update"</span>
                  </div>
                  <div className="git-line">
                    <span className="git-cmd">git</span>
                    <span className="git-val">push</span>
                  </div>
                </div>

                {/* Middle: GitHub Branding Box */}
                <div className="deploy-logo-circle" style={{ margin: '0 24px' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#0f172a">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>

                {/* Right side: AWS Branding Box */}
                <div className="deploy-logo-circle">
                  <svg width="38" height="23" viewBox="0 0 24 14" fill="none">
                    <path d="M11.56 3.17c-.3-.43-.72-.73-1.23-.9a4.87 4.87 0 0 0-2.9-.03c-.49.16-.9.45-1.2.86-.3.42-.46.91-.46 1.48 0 .58.15 1.08.45 1.49.3.4.7.7 1.21.87a4.91 4.91 0 0 0 2.92-.01c.5-.16.92-.46 1.23-.88.3-.42.46-.92.46-1.5 0-.55-.16-1.04-.48-1.48z" fill="#000"/>
                    <path d="M22.04 8.78c-.5-.33-1.12-.5-1.84-.5-.85 0-1.54.25-2.07.74-.53.5-.8 1.16-.8 2 0 .8.25 1.44.75 1.9.5.47 1.16.7 1.97.7.47 0 .93-.1 1.37-.28a3.2 3.2 0 0 0 1.14-.84v.95h1.75V8.4h-1.74l-.53.38zm-1.63 4.01c-.42 0-.76-.12-1.01-.36-.25-.24-.37-.58-.37-1.02 0-.44.13-.78.39-1.01.26-.23.6-.35 1.03-.35.42 0 .76.11 1 .34.25.23.37.56.37 1 0 .44-.12.78-.37 1.02-.25.25-.59.38-1.04.38z" fill="#000"/>
                    <path d="M14.07 13.91c2.42 1.34 5.56 2.06 8.52 2.06 4.3 0 8.13-1.52 10.7-4.04.37-.36.05-.93-.41-.75-2.93 1.13-6.4 1.76-9.88 1.76-3.11 0-6.45-.51-9.42-1.6-.53-.2-1 .39-.51.57zm18.96-3.76c-.23-.29-.62-.23-.74.1a15.7 15.7 0 0 1-1.3 2.65c-.2.32.1.72.44.52 1.07-.63 1.9-1.5 2.1-1.92.14-.3-.12-.8-.5-.8a4 4 0 0 0-1 .45z" fill="#FF9900"/>
                  </svg>
                  <span className="aws-status-text">
                    your site is live <span className="aws-spark">✨</span>
                  </span>
                </div>

              </div>
              <div className="deploy-bento-text">
                <h3 className="deploy-bento-title">One click deploy</h3>
                <p className="deploy-bento-desc">
                  Deploy your app in seconds, with our one click deploy feature.
                </p>
              </div>
            </div>

            {/* Card 2: Intuitive workflow (5 spans) */}
            <div className="deploy-bento-card deploy-card-2">
              <div className="deploy-bento-text">
                <h3 className="deploy-bento-title">Intuitive workflow</h3>
                <p className="deploy-bento-desc">
                  With our intuitive workflow, you can easily manage your app without complex steps.
                </p>
              </div>
              <div className="deploy-card-2-graphic">
                <div className="dashboard-mockup-wrapper">
                  {/* Sidebar Mock */}
                  <div className="mockup-sidebar">
                    <div className="sidebar-logo">R</div>
                    <div className="sidebar-menu-item" style={{ background: '#cbd5e1' }} />
                    <div className="sidebar-menu-item" />
                    <div className="sidebar-menu-item" />
                    <div className="sidebar-menu-item" />
                  </div>
                  {/* Main Panel Mock */}
                  <div className="mockup-main">
                    <div className="mockup-header">
                      <span className="mockup-title">Dashboard</span>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#f1f5f9' }} />
                    </div>
                    <div className="mockup-body-split">
                      <div className="card-widget">
                        <div className="widget-label">Your Posts</div>
                        <div className="widget-value">242,000</div>
                        {/* Smooth SVG Line Chart */}
                        <svg viewBox="0 0 100 40" width="100%" height="40" style={{ marginTop: 8 }}>
                          <path 
                            d="M0 35 C 20 15, 40 45, 60 10 C 80 5, 100 30, 100 30" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2.5" 
                            strokeLinecap="round"
                          />
                          <path 
                            d="M0 35 C 20 15, 40 45, 60 10 C 80 5, 100 30, 100 30 L 100 40 L 0 40 Z" 
                            fill="rgba(59, 130, 246, 0.08)" 
                          />
                        </svg>
                      </div>
                      <div className="card-widget">
                        <div className="widget-label">Posts Breakdown</div>
                        <div className="donut-chart-wrap">
                          <svg width="46" height="46" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15.91" fill="none" stroke="#3b82f6" strokeWidth="3" 
                                    strokeDasharray="70 30" strokeDashoffset="25" />
                            <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f97316" strokeWidth="3" 
                                    strokeDasharray="20 80" strokeDashoffset="95" />
                          </svg>
                          <div className="donut-center">$85k</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Hosting over the edge (5 spans) */}
            <div className="deploy-bento-card deploy-card-3">
              <div className="deploy-bento-text">
                <h3 className="deploy-bento-title">Hosting over the edge</h3>
                <p className="deploy-bento-desc">
                  With our edge network, we host your website by going into each city by ourselves.
                </p>
              </div>
              <div className="deploy-card-3-graphic">
                <div className="globe-sphere">
                  <div className="globe-grid-lines"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Running out of copy (7 spans) */}
            <div className="deploy-bento-card deploy-card-4">
              <div className="deploy-bento-text">
                <h3 className="deploy-bento-title">Running out of copy</h3>
                <p className="deploy-bento-desc">
                  You are running out of copy for your website, we can generate copy for you.
                </p>
              </div>
              <div className="deploy-card-4-graphic">
                <div className="wide-dashboard-mockup">
                  {/* Sidebar Mock */}
                  <div className="mockup-sidebar" style={{ width: 65 }}>
                    <div className="sidebar-logo">R</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', marginTop: 10 }}>
                      <div className="sidebar-menu-item" style={{ width: '80%', margin: '0 auto' }} />
                      <div className="sidebar-menu-item" style={{ width: '60%', margin: '0 auto' }} />
                      <div className="sidebar-menu-item" style={{ width: '70%', margin: '0 auto' }} />
                    </div>
                  </div>
                  {/* Main Mockup Area */}
                  <div className="mockup-main">
                    <div className="mockup-header">
                      <span className="mockup-title">Dashboard</span>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <div style={{ width: 45, height: 14, borderRadius: 4, background: '#f1f5f9' }} />
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#cbd5e1' }} />
                      </div>
                    </div>
                    <div className="mockup-body-split" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      {/* Your Posts Stat */}
                      <div className="card-widget">
                        <div className="widget-label">Your Posts</div>
                        <div className="widget-value">242,000</div>
                        <svg viewBox="0 0 100 40" width="100%" height="40" style={{ marginTop: 8 }}>
                          <path 
                            d="M0 35 C 20 15, 40 45, 60 10 C 80 5, 100 30, 100 30" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2.5" 
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      {/* Transactions Mock List */}
                      <div className="card-widget">
                        <div className="widget-label" style={{ marginBottom: 8 }}>Latest Transactions</div>
                        <div className="transaction-list">
                          <div className="transaction-item">
                            <div className="tx-left">
                              <span className="tx-dot"></span>
                              <span className="tx-name">Invoice #AAA-123</span>
                            </div>
                            <span className="tx-amount">$1,214.00</span>
                          </div>
                          <div className="transaction-item">
                            <div className="tx-left">
                              <span className="tx-dot" style={{ background: '#3b82f6' }}></span>
                              <span className="tx-name">Client Bernard</span>
                            </div>
                            <span className="tx-amount">$3,200.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}