import React from 'react';
import '../styles/SMBHeroSection.css';

export default function SMBHeroSection() {
  return (
    <section className="smb-hero-section">
      <div className="smb-hero-container">
        
        {/* Left Side: Copy */}
        <div className="smb-hero-content">
          <h1 className="smb-hero-title">
            360Airo for SMBs:<br/>
            Run Multichannel Outreach Campaigns at Scale
          </h1>
          <p className="smb-hero-desc">
            Manage all your campaigns in one sales engagement platform for growing teams, personalize outreach at scale, keep deliverability high, and grow your revenue without extra staff.
          </p>
          <div className="smb-hero-actions">
            <button className="btn-primary-dark">Start Free Trial</button>
            <button className="btn-outline">Talk to us</button>
          </div>
        </div>

        {/* Right Side: Diagram */}
        <div className="smb-hero-visual">
          <div className="smb-diagram-box">
            
            {/* SVG Arrows connecting the nodes */}
            <svg className="smb-diagram-arrows" viewBox="0 0 500 400" preserveAspectRatio="none">
              <defs>
                {/* Arrowheads */}
                <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,1 L8,5 L0,9" fill="none" stroke="#C15AE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,1 L8,5 L0,9" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <marker id="arrow-yellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,1 L8,5 L0,9" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,1 L8,5 L0,9" fill="none" stroke="#5078F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              
              {/* Top Left (Purple) -> Center */}
              <path className="diag-path path-purple" d="M 140 100 C 160 160, 220 180, 240 180" stroke="#C15AE6" strokeWidth="2" fill="none" markerEnd="url(#arrow-purple)" />
              
              {/* Top Right (Green) -> Center */}
              <path className="diag-path path-green" d="M 360 110 C 330 160, 280 180, 260 180" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow-green)" />
              
              {/* Bottom Left (Yellow) -> Center */}
              <path className="diag-path path-yellow" d="M 150 240 C 160 210, 220 220, 240 220" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-yellow)" />
              
              {/* Bottom Right (Blue) -> Center */}
              <path className="diag-path path-blue" d="M 370 230 C 330 200, 280 220, 260 220" stroke="#5078F2" strokeWidth="2" fill="none" markerEnd="url(#arrow-blue)" />
            </svg>

            {/* Nodes */}
            <div className="diag-node diag-center">
              <span className="diag-icon">Airo</span>
              Sequences
            </div>

            <div className="diag-node diag-tl">
              Centralized Dashboards
              <div className="diag-badge-icon badge-purple">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>

            <div className="diag-node diag-tr">
              <div className="diag-badge-pill pill-green">AI-Powered</div>
              <svg className="diag-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Deliverability Engine
            </div>

            <div className="diag-node diag-bl">
              <div className="diag-badge-icon badge-yellow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div className="diag-badge-pill pill-yellow">Infinite Scale</div>
              <span>Automated AI Warm-Up</span>
            </div>

            <div className="diag-node diag-br">
              <div className="diag-text">Omnichannel AI Outreach</div>
              <div className="diag-channel-icons">
                <div className="channel-circle c-email">✉</div>
                <div className="channel-circle c-phone">📞</div>
                <div className="channel-circle c-li">in</div>
                <div className="channel-circle c-chat">💬</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
