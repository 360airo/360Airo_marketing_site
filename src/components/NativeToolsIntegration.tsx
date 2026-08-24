// @ts-nocheck
"use client";
import React from 'react';
import '../styles/NativeToolsIntegration.css';

export default function NativeToolsIntegration() {
  return (
    <section className="native-tools-wrapper" id="section-native-tools">
      <div className="native-tools-container">
        <div className="native-tools-card">
          {/* Section Header */}
          <div className="native-tools-header">
            <div className="native-tools-title-row">
              <span className="native-tools-sparkle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
              </span>
              <h3 className="native-tools-title">Native Tools Integration</h3>
            </div>
            <p className="native-tools-desc">
              Track real-time activity of agents with detailed records of triggers, tools used, outcomes, and timestamps.
            </p>
          </div>

          {/* Workflow Canvas */}
          <div className="native-tools-canvas">
            <div className="canvas-dot-grid" aria-hidden="true" />

            <div className="flow-diagram-stage">
              {/* SVG Connecting Lines */}
              <svg className="flow-svg-layer" viewBox="0 0 900 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2"/>
                  </linearGradient>
                  <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4"/>
                  </linearGradient>
                  <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#fde047" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>

                {/* Trigger 1 -> Center Hub */}
                <path d="M 230 75 L 360 75 Q 390 75 390 110 L 390 150 L 415 150" fill="none" stroke="url(#gradOrange)" strokeWidth="2" className="animated-path"/>
                
                {/* Trigger 2 -> Center Hub */}
                <path d="M 230 150 L 415 150" fill="none" stroke="url(#gradBlue)" strokeWidth="2" className="animated-path"/>

                {/* Trigger 3 -> Center Hub */}
                <path d="M 230 225 L 360 225 Q 390 225 390 190 L 390 150 L 415 150" fill="none" stroke="url(#gradYellow)" strokeWidth="2" className="animated-path"/>

                {/* Hub -> Summarizer Pill -> Integrations */}
                <line x1="475" y1="150" x2="540" y2="150" stroke="#3b82f6" strokeWidth="2"/>
                <line x1="620" y1="150" x2="680" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Summarizer -> Top Left (Notion) */}
                <line x1="570" y1="130" x2="570" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Summarizer -> Bottom (Pie) */}
                <line x1="570" y1="170" x2="570" y2="210" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Slack -> Bolt (Top) */}
                <line x1="680" y1="130" x2="680" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Slack -> Globe (Right) */}
                <line x1="710" y1="150" x2="760" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              </svg>

              {/* Left Triggers List */}
              <div className="flow-left-triggers">
                <div className="flow-trigger-item">
                  <svg className="flow-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <span>Meeting Summarizer</span>
                </div>

                <div className="flow-trigger-item">
                  <svg className="flow-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  <span>Code Reviewer</span>
                </div>

                <div className="flow-trigger-item">
                  <svg className="flow-trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Customer Support</span>
                </div>
              </div>

              {/* Center Hub */}
              <div className="flow-center-hub">
                <div className="hub-box">
                  <div className="hub-cubes">
                    <div className="hub-cube-1"/>
                    <div className="hub-cube-2"/>
                  </div>
                </div>
              </div>

              {/* Blue Tag */}
              <div className="flow-summarizer-pill">
                summarizer
              </div>

              {/* Right Integrations Network */}
              <div className="flow-right-network">
                {/* Notion / Doc */}
                <div className="network-node node-notion" title="Notion">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>

                {/* Lightning Bolt */}
                <div className="network-node node-bolt" title="Fast Execution">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#34d399">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>

                {/* Slack */}
                <div className="network-node node-slack" title="Slack Integration">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#E01E5A" d="M6 15a2 2 0 1 0-2-2v2h2zm1 0a2 2 0 1 0 4 0v-5a2 2 0 1 0-4 0v5z"/>
                    <path fill="#36C5F0" d="M9 6a2 2 0 1 0-2 2h2V6zm0 1a2 2 0 1 0 0 4h5a2 2 0 1 0 0-4H9z"/>
                    <path fill="#2EB67D" d="M18 9a2 2 0 1 0 2 2v-2h-2zm-1 0a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0V9z"/>
                    <path fill="#ECB22E" d="M15 18a2 2 0 1 0 2-2h-2v2zm0-1a2 2 0 1 0 0-4H10a2 2 0 1 0 0 4h5z"/>
                  </svg>
                </div>

                {/* Globe / Cloud API */}
                <div className="network-node node-globe" title="Cloud APIs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>

                {/* Pie / Metrics */}
                <div className="network-node node-pie" title="Telemetry & Logs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a10 10 0 0 1 10 10H12V2z" fill="#94a3b8"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Feature Columns */}
          <div className="native-tools-features">
            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <circle cx="12" cy="11" r="2"/>
                </svg>
                <span>One Click Auth</span>
              </h4>
              <p className="native-feature-desc">
                A drag-and-drop interface to create, connect, and configure agents into logical workflows.
              </p>
            </div>

            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Realtime Sync</span>
              </h4>
              <p className="native-feature-desc">
                Agents operate independently and coordinate tasks to complete complex all goals.
              </p>
            </div>

            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                  <line x1="14" y1="4" x2="10" y2="20"/>
                </svg>
                <span>Custom Connector SDK</span>
              </h4>
              <p className="native-feature-desc">
                Run agent workflows in a sandbox to preview behavior, debug logic, and test interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
