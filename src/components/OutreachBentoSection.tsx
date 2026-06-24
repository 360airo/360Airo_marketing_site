// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import '../styles/OutreachBentoSection.css';

export default function OutreachBentoSection() {
  const [activeTimezone, setActiveTimezone] = useState(0);
  const [warmupVolume, setWarmupVolume] = useState(40);
  const [followUpStep, setFollowUpStep] = useState(0);
  const [pipelinePercent, setPipelinePercent] = useState(15);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Timezones loop
  useEffect(() => {
    const timezones = ['IST', 'US EAST', 'LONDON', 'US WEST'];
    const interval = setInterval(() => {
      setActiveTimezone((prev) => (prev + 1) % timezones.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Warmup Volume loop (gradually increases to show warmup in action)
  useEffect(() => {
    const interval = setInterval(() => {
      setWarmupVolume((prev) => {
        if (prev >= 120) return 40;
        return prev + 20;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Follow-up sequence loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowUpStep((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Pipeline growth progress loop
  useEffect(() => {
    const steps = [15, 45, 75, 100];
    const interval = setInterval(() => {
      setActiveStepIndex((idx) => {
        const nextIdx = (idx + 1) % steps.length;
        setPipelinePercent(steps[nextIdx]);
        return nextIdx;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-section-wrapper">
      <div className="bento-section-container">
        
        {/* Section Header */}
        <div className="bento-section-header">
          <div className="bento-eyebrow">Outbound Automation</div>
          <h2>Automate your B2B channels <span>seamlessly</span></h2>
          <p>Run highly personalized multichannel touchpoints, monitor delivery rates, and sync pipeline metrics on autopilot.</p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid-layout">
          
          {/* Card 1: Engage across networks (Large top-left) */}
          <div className="bento-card card-large card-channels">
            <div className="bento-card-info">
              <h4>Engage across all networks</h4>
              <p>Execute campaigns concurrently across email, LinkedIn connection requests, inboxes, and SMS touchpoints with hyper-personalized messaging.</p>
            </div>
            
            {/* Visual: Pulse channel connector grid */}
            <div className="channels-connector-grid">
              <svg className="connector-lines-svg">
                <line x1="130" y1="80" x2="40" y2="26" className="pulsing-connector-line" />
                <line x1="130" y1="80" x2="220" y2="26" className="pulsing-connector-line" />
                <line x1="130" y1="80" x2="40" y2="121" className="pulsing-connector-line" />
                <line x1="130" y1="80" x2="220" y2="121" className="pulsing-connector-line" />
              </svg>
              <div className="channel-node-wrap central">
                <div className="channel-icon-node main-node" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', background: '#ffffff', border: '2.5px solid #3b82f6', boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' }}>
                  <img 
                    src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" 
                    alt="360Airo Logo" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
              
              <div className="channel-node-wrap satellite s1">
                <span className="sat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="sat-lbl">Email</span>
              </div>
              <div className="channel-node-wrap satellite s2">
                <span className="sat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <span className="sat-lbl">LinkedIn</span>
              </div>
              <div className="channel-node-wrap satellite s3">
                <span className="sat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </span>
                <span className="sat-lbl">SMS</span>
              </div>
              <div className="channel-node-wrap satellite s4">
                <span className="sat-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                </span>
                <span className="sat-lbl">CRM Sync</span>
              </div>
            </div>
          </div>

          {/* Card 2: Timezone queue (Top-right) */}
          <div className="bento-card card-timezone">
            <div className="bento-card-info">
              <h4>Smart Timezone Scheduler</h4>
              <p>We automatically queue outgoing campaigns to hit prospects' inboxes precisely at their local working hours (including IST working hours).</p>
            </div>
            
            {/* Visual: Timezones list mockup */}
            <div className="timezone-list-mockup">
              <div className={`tz-row ${activeTimezone === 0 ? 'active' : ''}`}>
                <span>🇮🇳 IST (New Delhi)</span>
                <span className="tz-badge">Active Queue (Working Hours)</span>
              </div>
              <div className={`tz-row ${activeTimezone === 1 ? 'active' : ''}`}>
                <span>🇺🇸 US EAST (New York)</span>
                <span className="tz-badge">Active Queue</span>
              </div>
              <div className={`tz-row ${activeTimezone === 2 ? 'active' : ''}`}>
                <span>🇬🇧 LONDON (GMT)</span>
                <span className="tz-badge">Queued (9 AM)</span>
              </div>
              <div className={`tz-row ${activeTimezone === 3 ? 'active' : ''}`}>
                <span>🇺🇸 US WEST (SF)</span>
                <span className="tz-badge">Queued (9 AM)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Email Warmup (Bottom-left) */}
          <div className="bento-card card-warmup">
            <div className="bento-card-info">
              <h4>Automated Email Warmup</h4>
              <p>Full configuration setup out-of-the-box. We gradually increase daily email volume to establish and maintain a pristine sender reputation.</p>
            </div>
            <div className="warmup-engine-preview">
              <div className="warmup-stats-grid">
                <div className="warmup-stat-box">
                  <span className="warmup-stat-label">Reputation Score</span>
                  <span className="warmup-stat-value green">99%</span>
                </div>
                <div className="warmup-stat-box">
                  <span className="warmup-stat-label">Daily Volume</span>
                  <span className="warmup-stat-value">{warmupVolume} / 200</span>
                </div>
              </div>
              <div className="warmup-progress-chart">
                <div className={`warmup-chart-bar ${warmupVolume >= 40 ? 'active' : ''}`} style={{ height: '30%' }}></div>
                <div className={`warmup-chart-bar ${warmupVolume >= 60 ? 'active' : ''}`} style={{ height: '48%' }}></div>
                <div className={`warmup-chart-bar ${warmupVolume >= 80 ? 'active' : ''}`} style={{ height: '62%' }}></div>
                <div className={`warmup-chart-bar ${warmupVolume >= 100 ? 'active' : ''}`} style={{ height: '78%' }}></div>
                <div className={`warmup-chart-bar ${warmupVolume >= 120 ? 'active' : ''}`} style={{ height: '95%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 4: Reputation & Threshold Controls (Bottom-middle) */}
          <div className="bento-card card-reputation">
            <div className="bento-card-info">
              <h4>Reputation & Threshold Controls</h4>
              <p>Caps daily sending volume below strict spam-trigger thresholds to safeguard domain health, with automated follow-ups.</p>
            </div>
            
            <div className="threshold-monitor-preview">
              <div className="monitor-row">
                <span className="monitor-dot green"></span>
                <span className="monitor-text">Sender Score: <strong>Safe (98%)</strong></span>
              </div>
              <div className="monitor-row">
                <span className="monitor-icon">⚡</span>
                <span className="monitor-text">Daily Sending Cap: <strong>50 emails/day</strong></span>
              </div>
              
              <div className="followup-ticker-box">
                <div className={`followup-ticker-row ${followUpStep === 0 ? 'active' : ''}`}>
                  <span className="ticker-status-dot"></span>
                  <span className="ticker-text">Day 1: Hyper-personalized Email</span>
                </div>
                <div className={`followup-ticker-row ${followUpStep === 1 ? 'active' : ''}`}>
                  <span className="ticker-status-dot"></span>
                  <span className="ticker-text">Day 3: Automatic Follow-up</span>
                </div>
                <div className={`followup-ticker-row ${followUpStep === 2 ? 'active' : ''}`}>
                  <span className="ticker-status-dot"></span>
                  <span className="ticker-text">Day 7: Automatic Follow-up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Pipeline growth (Bottom-right) */}
          <div className="bento-card card-pipeline">
            <div className="bento-card-info">
              <h4>Real-time CRM Pipeline Sync</h4>
              <p>Direct sync logs update deal values instantly as outreach transitions from lead to client.</p>
            </div>
            
            <div className="pipeline-progressbar-visual">
              <div className="pb-progress-fill" style={{ width: `${pipelinePercent}%` }}></div>
              <div className="pb-steps-row">
                <span className={`pb-step-node ${activeStepIndex >= 0 ? 'active' : ''}`}>Prospect</span>
                <span className={`pb-step-node ${activeStepIndex >= 1 ? 'active' : ''}`}>Engaged</span>
                <span className={`pb-step-node ${activeStepIndex >= 2 ? 'active' : ''}`}>Meeting</span>
                <span className={`pb-step-node ${activeStepIndex >= 3 ? 'active' : ''}`}>Won 🏆</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
