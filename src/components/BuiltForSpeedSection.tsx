// @ts-nocheck
"use client";
import React from 'react';
import '../styles/BuiltForSpeedSection.css';

export default function BuiltForSpeedSection() {
  const tableData = [
    {
      id: "#402-Q4",
      dotColor: "#fbbf24",
      title: "Lead enrichment pipeline dispatched to 2.4k contacts",
      tag: "Enrichment",
      tagColor: "amber",
      agent: "Airo Ops",
      avatar: "⚡"
    },
    {
      id: "#401-Q4",
      dotColor: "#c084fc",
      title: "Multi-channel sequence started (Auto-pilot ON)",
      tag: "Outreach",
      tagColor: "purple",
      agent: "Sequencer",
      avatar: "✉️"
    },
    {
      id: "#400-Q4",
      dotColor: "#34d399",
      title: "Scheduled agent: 2.4k touches queued this weekday",
      tag: "Active",
      tagColor: "emerald",
      agent: "Scheduler",
      avatar: "🕒"
    },
    {
      id: "#399-Q4",
      dotColor: "#60a5fa",
      title: "CRM sync & lead scoring sync completed (HubSpot)",
      tag: "Synced",
      tagColor: "blue",
      agent: "SyncBot",
      avatar: "🔄"
    },
    {
      id: "#398-Q4",
      dotColor: "#34d399",
      title: "AI SDR response drafted & verified with human in the loop",
      tag: "Verified",
      tagColor: "emerald",
      agent: "Ava SDR",
      avatar: "🤖"
    }
  ];

  return (
    <section className="speed-scale-wrapper" id="section-speed-scale">
      <div className="speed-scale-bg-glow" aria-hidden="true" />
      <div className="speed-scale-grid-pattern" aria-hidden="true" />

      <div className="speed-scale-container">
        {/* Header content */}
        <div className="speed-scale-header">
          <h2 className="speed-scale-title">
            <span className="title-line">Built for Speed</span>
            <span className="title-line title-gradient">Designed for Scale</span>
          </h2>
          <p className="speed-scale-desc">
            Deploy AI agents that plan, act through your tools, and report outcomes—without changing how your teams work.
          </p>
        </div>

        {/* 3D Tilted Perspective Stage */}
        <div className="speed-scale-stage">
          <div className="speed-scale-3d-group">
            {/* Layered Back Sheet for depth */}
            <div className="mockup-sheet-back" aria-hidden="true" />

            {/* Main Interactive Mockup Sheet */}
            <div className="mockup-sheet-main">
              <div className="mockup-light-beam" aria-hidden="true" />

              {/* Sidebar */}
              <div className="mockup-sidebar">
                <div className="mockup-brand">
                  <div className="mockup-brand-icon">360</div>
                  <span>Airo Control</span>
                </div>

                <div className="mockup-nav">
                  <div className="mockup-nav-item active">
                    <svg className="mockup-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="3" width="7" height="7" rx="1"/>
                      <rect x="14" y="14" width="7" height="7" rx="1"/>
                      <rect x="3" y="14" width="7" height="7" rx="1"/>
                    </svg>
                    <span>Overview</span>
                  </div>
                  <div className="mockup-nav-item">
                    <svg className="mockup-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 7v5l3 3"/>
                    </svg>
                    <span>Activity Log</span>
                  </div>
                  <div className="mockup-nav-item">
                    <svg className="mockup-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <span>AI SDR Agents</span>
                  </div>
                  <div className="mockup-nav-item">
                    <svg className="mockup-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span>Workflows</span>
                  </div>
                  <div className="mockup-nav-item">
                    <svg className="mockup-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    <span>Integrations</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="mockup-content">
                {/* Topbar */}
                <div className="mockup-topbar">
                  <div className="mockup-breadcrumbs">
                    <span>Automated Ops</span>
                    <span>/</span>
                    <span style={{ color: '#f8fafc', fontWeight: 500 }}>Live Agent Execution</span>
                  </div>
                  <div className="mockup-badge-live">
                    <span className="mockup-live-dot" />
                    <span>12 Agents Active</span>
                  </div>
                </div>

                {/* Table */}
                <div className="mockup-table">
                  <div className="mockup-table-header">
                    <div>Task ID</div>
                    <div>Operation / Action</div>
                    <div>Status</div>
                    <div>Executed By</div>
                  </div>

                  {tableData.map((item, idx) => (
                    <div key={idx} className="mockup-table-row">
                      <div className="mockup-cell-id">
                        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: item.dotColor }} />
                        {item.id}
                      </div>
                      <div className="mockup-cell-title">
                        {item.title}
                      </div>
                      <div>
                        <span className={`mockup-pill ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="mockup-cell-agent">
                        <span className="mockup-agent-avatar">{item.avatar}</span>
                        <span>{item.agent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
