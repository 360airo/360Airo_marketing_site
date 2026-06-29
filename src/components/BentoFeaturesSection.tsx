"use client";
import React from 'react';
import '../styles/BentoFeaturesSection.css';

export default function BentoFeaturesSection() {
  return (
    <section className="bento-section">
      <div className="bento-container">
        <h2 className="bento-headline">
          All-in-one platform to run and scale<br />client outreach campaigns
        </h2>

        <div className="bento-layout">
          {/* LEFT COLUMN */}
          <div className="bento-col-left">
            
            {/* Card 1: Smart Sequences */}
            <div className="bento-card bento-light-blue bento-card-1">
              <div className="bento-card-content">
                <h3 className="bento-title">Smart sequences that adapt to your prospects</h3>
                <p className="bento-text">
                  Mix email, LinkedIn, calls, SMS, and WhatsApp into one seamless flow. Sequences adapt automatically based on prospect data and engagement, so your team can deliver personalized outreach at scale for every client.
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
                <h3 className="bento-title">Complete prospect data in seconds</h3>
                <p className="bento-text">
                  Upload client lists — even incomplete ones — and 360Airo will enrich them with LinkedIn URLs, phone numbers, and verified emails. Build ready-to-launch multichannel campaigns for clients in minutes instead of days.
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
                  <h3 className="bento-title">Bulk mailbox import for high-volume campaigns</h3>
                  <p className="bento-text">
                    Quickly import and connect multiple client mailboxes via CSV, API, or native integrations. Perfect for agencies running high-volume campaigns — saving hours on setup and ensuring smooth management of dozens of accounts at once.
                  </p>
                </div>
              </div>

              {/* Card 3: Conversations */}
              <div className="bento-card bento-light-purple bento-card-3">
                <div className="bento-card-content">
                  <h3 className="bento-title">All client conversations in one place</h3>
                  <p className="bento-text">
                    Every email reply, LinkedIn message, and SMS response is pulled into one unified inbox. AI auto-tags intent ("interested," "follow up later," "meeting booked"), helping you prioritize hot leads and prove ROI faster to clients.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Advanced roles */}
            <div className="bento-card bento-light-blue-solid bento-card-5">
              <div className="bento-card-content">
                <h3 className="bento-title">Advanced roles and permissions</h3>
                <p className="bento-text">
                  Manage all your clients and their campaigns from one 360Airo account — no more switching tabs or tools. Each client gets their own dedicated workspace, ensuring no mix-ups of data, campaigns, or contacts.
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
