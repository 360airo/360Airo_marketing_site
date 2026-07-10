"use client";
import React from 'react';
import '../styles/BentoFeaturesSection.css';

export default function BentoFeaturesSection() {
  return (
    <section className="bento-section">
      <div className="bento-container">
        <h2 className="bento-headline">
          All-in-One Sales Engagement Platform for client Outreach Campaigns
        </h2>

        <div className="bento-layout">
          {/* LEFT COLUMN */}
          <div className="bento-col-left">
            
            {/* Card 1: Smart Sequences */}
            <div className="bento-card bento-light-blue bento-card-1">
              <div className="bento-card-content">
                <h3 className="bento-title">AI-Powered Multichannel Sequences</h3>
                <p className="bento-text">
                  Reach prospects across Email, LinkedIn, SMS, and WhatsApp from a single sequence. AI adapts follow-ups based on prospect engagement, helping your team personalize outreach at scale and book more meetings.
                </p>
              </div>
              <div className="bento-mockup-wrapper mockup-bottom">
                <div className="mock-flowchart">
                  <div className="mock-flow-node">
                    <span className="mock-dot blue"></span>
                    <span className="mock-line" style={{ width: '60px' }}></span>
                  </div>
                  <div className="mock-flow-arrow">↓</div>
                  <div className="mock-flow-split">
                    <div className="mock-flow-branch">
                      <div className="mock-flow-node">
                        <span className="mock-dot green"></span>
                        <span className="mock-line" style={{ width: '80px' }}></span>
                      </div>
                      <div className="mock-flow-node" style={{ marginTop: '10px' }}>
                        <span className="mock-dot purple"></span>
                        <span className="mock-line" style={{ width: '40px' }}></span>
                      </div>
                    </div>
                    <div className="mock-flow-branch">
                      <div className="mock-flow-node">
                        <span className="mock-dot yellow"></span>
                        <span className="mock-line" style={{ width: '90px' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Complete Prospect Data */}
            <div className="bento-card bento-light-yellow bento-card-4">
              <div className="bento-card-content">
                <h3 className="bento-title">Instant Prospect Enrichment</h3>
                <p className="bento-text">
                  Upload and Scale your prospect list and automatically enrich it with verified emails, phone numbers, LinkedIn profiles, company insights, and buying signals. Launch highly targeted outbound campaigns in minutes not days.
                </p>
              </div>
              <div className="bento-mockup-wrapper mockup-right">
                <div className="mock-profile">
                  <div className="mock-avatar">JB</div>
                  <div className="mock-profile-lines">
                    <div className="mock-line bold" style={{ width: '100px' }}></div>
                    <div className="mock-line" style={{ width: '140px' }}></div>
                    <div className="mock-line" style={{ width: '120px' }}></div>
                  </div>
                  <div className="mock-status">
                    <span className="mock-status-dot"></span> Active
                  </div>
                  {/* Decorative 3D-like bubbles */}
                  <div className="mock-bubble bubble-1"></div>
                  <div className="mock-bubble bubble-2"></div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="bento-col-right">
            
            <div className="bento-row-top">
              {/* Card 2: Bulk mailbox */}
              <div className="bento-card bento-light-blue-solid bento-card-2">
                <div className="bento-card-content">
                  <h3 className="bento-title">Manage Multiple Mailboxes</h3>
                  <p className="bento-text">
                    Connect multiple business mailboxes with Google Workspace, Microsoft 365, SMTP, or IMAP. Scale outbound campaigns while maintaining healthy sending limits and strong email deliverability.
                  </p>
                </div>
              </div>

              {/* Card 3: Conversations */}
              <div className="bento-card bento-light-purple bento-card-3">
                <div className="bento-card-content">
                  <h3 className="bento-title">Unified Sales Inbox</h3>
                  <p className="bento-text">
                    Manage every email reply, LinkedIn conversation, and SMS response from one inbox. Automatically organize conversations, prioritize hot prospects, and ensure no sales opportunity is missed.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Advanced roles */}
            <div className="bento-card bento-light-blue-solid bento-card-5">
              <div className="bento-card-content">
                <h3 className="bento-title">Role-Based Team Management</h3>
                <p className="bento-text">
                  Create workspaces, assign user roles and permissions, and manage your SDRs, BDRs, and sales managers from one centralized dashboard. Keep every campaign, contact, and workflow organized as your team grows.
                </p>
              </div>
              <div className="bento-mockup-wrapper mockup-bottom mockup-wide">
                <div className="mock-dashboard">
                  <div className="mock-dash-header">
                    <div className="mock-dash-tabs">
                      <span className="active">Organization</span>
                      <span>Workspaces (14)</span>
                      <span>Users (18)</span>
                    </div>
                    <div className="mock-dash-btn">New workspace</div>
                  </div>
                  <div className="mock-dash-list">
                    <div className="mock-dash-row">
                      <div className="mock-dash-logo logo-blue"></div>
                      <span className="mock-line" style={{ width: '120px' }}></span>
                    </div>
                    <div className="mock-dash-row">
                      <div className="mock-dash-logo logo-green"></div>
                      <span className="mock-line" style={{ width: '90px' }}></span>
                    </div>
                    <div className="mock-dash-row">
                      <div className="mock-dash-logo logo-orange"></div>
                      <span className="mock-line" style={{ width: '110px' }}></span>
                    </div>
                    <div className="mock-dash-row">
                      <div className="mock-dash-logo logo-purple"></div>
                      <span className="mock-line" style={{ width: '100px' }}></span>
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
