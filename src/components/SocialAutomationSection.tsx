// @ts-nocheck
"use client";
import React from 'react';
import '../styles/SocialAutomationSection.css';

export default function SocialAutomationSection() {
  return (
    <section className="social-auto-wrapper" id="section-social-auto">
      <div className="social-auto-container">
        
        {/* Header */}
        <div className="social-auto-header">
          <h2 className="social-auto-title">Automate your social media</h2>
          <p className="social-auto-subtitle">
            Proactiv houses a rich set of features to automate your marketing efforts across all social medias
          </p>
        </div>

        {/* Bento Grid */}
        <div className="social-auto-bento-layout">
          
          {/* Row 1: Split 60/40 */}
          <div className="social-auto-row1">
            
            {/* Card 1: Post to multiple platforms at once */}
            <div className="social-bento-card wide-card">
              <div className="social-card-text-top">
                <h3 className="social-card-title">Post to multiple platforms at once</h3>
                <p className="social-card-desc">
                  With our AI-powered platform, you can post to multiple platforms at once, saving you time and effort.
                </p>
              </div>

              {/* Staggered Social Media Icons Grid with connecting vector line */}
              <div className="social-platforms-grid">
                
                {/* Embedded dynamic curved background line */}
                <svg className="social-grid-connector" viewBox="0 0 600 160" fill="none">
                  <path 
                    d="M 50 115 C 200 115, 180 45, 300 45 C 420 45, 400 115, 550 115" 
                    stroke="rgba(255, 255, 255, 0.08)" 
                    strokeWidth="1.5" 
                    fill="none" 
                  />
                  <path 
                    d="M 50 115 C 200 115, 180 45, 300 45 C 420 45, 400 115, 550 115" 
                    stroke="rgba(56, 189, 248, 0.2)" 
                    strokeWidth="1.5" 
                    strokeDasharray="6 6" 
                    fill="none" 
                  />
                </svg>

                {/* Staggered Row 1 */}
                <div className="social-icons-row row-1">
                  <div className="social-app-icon icon-ig">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <div className="social-app-icon icon-tt">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                  </div>
                  <div className="social-app-icon icon-tw">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                  <div className="social-app-icon icon-fb">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </div>
                  <div className="social-app-icon icon-meta">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7.2c-2.4 0-4.4 1.7-5.5 3.8-1.1-2.1-3.1-3.8-5.5-3.8C.4 7.2 0 7.9 0 8.8c0 3.3 2.7 6 6 6 2.4 0 4.4-1.7 5.5-3.8 1.1 2.1 3.1 3.8 5.5 3.8 3.3 0 6-2.7 6-6 0-.9-.4-1.6-1-1.6z"/></svg>
                  </div>
                  <div className="social-app-icon icon-li">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                  <div className="social-app-icon icon-slack">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="3" width="4" height="18" rx="2"></rect><rect x="3" y="10" width="18" height="4" rx="2"></rect></svg>
                  </div>
                </div>

                {/* Staggered Row 2 */}
                <div className="social-icons-row row-2">
                  <div className="social-app-icon icon-meta">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7.2c-2.4 0-4.4 1.7-5.5 3.8-1.1-2.1-3.1-3.8-5.5-3.8C.4 7.2 0 7.9 0 8.8c0 3.3 2.7 6 6 6 2.4 0 4.4-1.7 5.5-3.8 1.1 2.1 3.1 3.8 5.5 3.8 3.3 0 6-2.7 6-6 0-.9-.4-1.6-1-1.6z"/></svg>
                  </div>
                  <div className="social-app-icon icon-li">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                  <div className="social-app-icon icon-slack">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="3" width="4" height="18" rx="2"></rect><rect x="3" y="10" width="18" height="4" rx="2"></rect></svg>
                  </div>
                  <div className="social-app-icon icon-ig">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <div className="social-app-icon icon-tt">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                  </div>
                  <div className="social-app-icon icon-tw">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </div>
                  <div className="social-app-icon icon-fb">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Analytics for everything */}
            <div className="social-bento-card narrow-card">
              <div className="analytics-curve-wrap">
                <svg viewBox="0 0 280 140" className="analytics-vector-curve">
                  {/* Subtle Grid Helper Lines */}
                  <line x1="0" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="5 5" />
                  
                  {/* Background Track */}
                  <path d="M 10 95 C 60 45, 110 115, 170 55 C 210 15, 250 55, 270 45" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />
                  
                  {/* Glowing Active Track */}
                  <path d="M 10 95 C 60 45, 110 115, 170 55" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                </svg>

                {/* Live Node with Tooltip */}
                <div className="analytics-live-node" style={{ left: '170px', top: '55px' }}>
                  <div className="analytics-cursor-dot" />
                  <div className="analytics-tooltip">
                    <span>+200 connections</span>
                  </div>
                  {/* Cursor Arrow Graphic */}
                  <div className="analytics-vector-cursor">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8">
                      <polygon points="3 2 22 12 12 14 3 22 3 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="social-card-title">Analytics for everything</h3>
                <p className="social-card-desc">
                  Check analytics, track your posts, and get insights into your audience.
                </p>
              </div>
            </div>

          </div>

          {/* Row 2: Equal Split Triplet */}
          <div className="social-auto-row2">
            
            {/* Card 3: Integrated AI */}
            <div className="social-bento-card">
              <div className="ai-chips-cluster">
                {/* Background ambient circular glow behind the primary chip */}
                <div className="ai-cluster-glow"></div>
                
                <div className="ai-chip-icon fade-left-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="13" y2="17"></line></svg>
                </div>
                <div className="ai-chip-icon fade-left-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div className="ai-chip-icon primary-chip">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.74 11.64c.2-.56.12-1.18-.21-1.67-.3-.45-.76-.75-1.29-.83V8.89c0-.85-.38-1.65-1.02-2.18-.46-.38-1.04-.59-1.64-.59h-.25c-.21-.49-.57-.91-1.03-1.19-.57-.34-1.23-.42-1.85-.21V4.47c0-.85-.38-1.65-1.02-2.18-.63-.53-1.46-.72-2.25-.52-.56.14-1.06.46-1.42.92L8.27 4.1c-.26-.14-.56-.21-.86-.21h-.1c-.6 0-1.18.21-1.64.59-.64.53-1.02 1.33-1.02 2.18v.25c-.49.21-.91.57-1.19 1.03-.34.57-.42 1.23-.21 1.85H2.01c-.85 0-1.65.38-2.18 1.02-.53.63-.72 1.46-.52 2.25.14.56.46 1.06.92 1.42l1.41 1.09c.14.26.21.56.21.86v.1c0 .6.21 1.18.59 1.64.53.64 1.33 1.02 2.18 1.02h.25c.21.49.57.91 1.03 1.19.57.34 1.23.42 1.85.21v.25c0 .85.38 1.65 1.02 2.18.63.53 1.46.72 2.25.52.56-.14 1.06-.46 1.42-.92l1.09-1.41c.26.14.56.21.86.21h.1c.6 0 1.18-.21 1.64-.59.64-.53 1.02-1.33 1.02-2.18v-.25c.49-.21.91-.57 1.19-1.03.34-.57.42-1.23.21-1.85h.24c.85 0 1.65-.38 2.18-1.02.53-.63.72-1.46.52-2.25-.14-.56-.46-1.06-.92-1.42l-1.41-1.09c-.14-.26-.21-.56-.21-.86zm-4.32-.96l-1.35.78v1.56l1.35.78 1.35-.78V11.46l-1.35-.78z"/>
                  </svg>
                </div>
                <div className="ai-chip-icon fade-right-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <div className="ai-chip-icon fade-right-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </div>
              </div>

              <div>
                <h3 className="social-card-title">Integrated AI</h3>
                <p className="social-card-desc">
                  Proactiv uses AI to help you create engaging content.
                </p>
              </div>
            </div>

            {/* Card 4: Easy Collaboration */}
            <div className="social-bento-card">
              <div className="collab-flow-wrap">
                {/* Simulated Workflow Grid Dots */}
                <div className="collab-grid-dots" />
                
                {/* Node Row Header indicators */}
                <div className="collab-dot-indicators">
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                  <span className="dot-ind"></span>
                </div>

                <div className="collab-flow-nodes-container">
                  
                  {/* Flow Connection Lines */}
                  <svg className="collab-flow-connector-line" viewBox="0 0 220 120" fill="none">
                    <path d="M 110 25 L 110 50 M 110 75 L 110 95" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                  </svg>

                  {/* Node 1 */}
                  <div className="collab-node node-1">
                    <span className="collab-node-text">Twitter post</span>
                    <div className="collab-user-badge tag-manu">
                      <span>Manu Arora</span>
                      <svg className="node-cursor-arrow" width="8" height="8" viewBox="0 0 24 24" fill="#00d8f6">
                        <polygon points="3 2 22 12 12 14 3 22 3 2" />
                      </svg>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="collab-node node-2">
                    <span className="collab-node-text">Email Campaign</span>
                  </div>

                  {/* Node 3 */}
                  <div className="collab-node node-3">
                    <span className="collab-node-text">Newsletter Campaign</span>
                    <div className="collab-user-badge tag-tyler">
                      <span>Tyler Durden</span>
                      <svg className="node-cursor-arrow" width="8" height="8" viewBox="0 0 24 24" fill="#f43f5e">
                        <polygon points="3 2 22 12 12 14 3 22 3 2" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="social-card-title">Easy Collaboration</h3>
                <p className="social-card-desc">
                  Proactiv can integrate with Zapier, Slack and every other popular integration tools.
                </p>
              </div>
            </div>

            {/* Card 5: Know your audience */}
            <div className="social-bento-card">
              <div className="audience-profile-wrap">
                
                {/* Circular Profile Avatar Box with custom neon glow border */}
                <div className="audience-avatar-frame">
                  <div className="audience-avatar-inner">
                    {/* Replicated silhouette user graphic matching styled illustration placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>

                <div className="audience-info-block">
                  <div className="audience-name">Manu Arora</div>
                  <div className="audience-stats">Most engagements • 69,420</div>
                </div>

                {/* Micro waveform overlay inside the profile widget */}
                <div className="audience-waveform-wrap">
                  <svg viewBox="0 0 160 40" className="audience-waveform">
                    <path 
                      d="M 5 25 Q 15 10, 25 30 T 45 20 T 65 35 T 85 15 T 105 30 T 125 10 T 145 25 T 155 20" 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.15)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>

              <div>
                <h3 className="social-card-title">Know your audience</h3>
                <p className="social-card-desc">
                  Based on your audience, create funnels and drive more traffic.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}