// @ts-nocheck
"use client";
import React from 'react';
import '../styles/AuditAndAccessSection.css';

export default function AuditAndAccessSection() {
  const auditLogs = [
    { title: "Personalized Email", status: "15s", desc: "Personalized Email sent to ...... @domain.com", type: "info", icon: "email" },
    { title: "Peer Review", status: "FAILED", desc: "Reviewed and approved 2 outputs", type: "failed", icon: "review" },
    { title: "Content Drafting", status: "PROCESSING", desc: "Generated draft campaign brief", type: "proc", icon: "draft" },
    { title: "Admin Approval", status: "PROCESSING", desc: "Final approval of marketing copy", type: "proc", icon: "admin" },
    { title: "Weekly Campaign Report", status: "2m", desc: "Generated campaign performance report", type: "info", icon: "report" },
    { title: "SEO Audit", status: "FAILED", desc: "Reviewed and approved 2 outputs", type: "failed", icon: "review" },
    { title: "Price Monitoring Agent", status: "PROCESSING", desc: "Generated draft campaign brief", type: "proc", icon: "draft" }
  ];

  return (
    <section className="audit-access-wrapper" id="section-audit-access">
      <div className="audit-access-container">
        
        {/* Top 2 Columns Features */}
        <div className="audit-access-grid">
          
          {/* Left Feature Column: Audit Trail & Approval Queue */}
          <div className="audit-feature-column">
            <h3 className="audit-col-title">Audit Trail</h3>
            <p className="audit-col-desc">
              Tracks every agent action with full input-output visibility and timestamps.
            </p>

            {/* Audit Trail Real-Time Activity Terminal */}
            <div className="audit-activity-card">
              <div className="audit-act-header">
                {/* Simulated Terminal Title Icon */}
                <svg className="audit-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>
                <span>Recent Activity</span>
              </div>

              <div className="audit-act-list">
                {auditLogs.map((log, i) => (
                  <div key={i} className="audit-act-row">
                    <div className="act-left-block">
                      {/* Interactive log type status bullet */}
                      <span className={`act-status-bullet bullet-${log.type}`} />
                      <span className="act-log-title">{log.title}</span>
                      
                      {/* Accurate conditional badge layout */}
                      {log.type === 'failed' && <span className="act-badge-status status-failed">FAILED</span>}
                      {log.type === 'proc' && <span className="act-badge-status status-proc">PROCESSING</span>}
                      {log.type === 'info' && <span className="act-badge-status status-info">{log.status}</span>}
                    </div>
                    <span className="act-log-description">
                      {log.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sub-feature-item">
              <h4 className="sub-feature-title">Approval Queue</h4>
              <p className="sub-feature-desc">
                Sends agent-generated content to human reviewers before it's published.
              </p>
            </div>
          </div>

          {/* Right Feature Column: Role-Based Access & Guardrail Engine */}
          <div className="audit-feature-column">
            <h3 className="audit-col-title">Role-Based Access</h3>
            <p className="audit-col-desc">
              Controls who can launch, review, or manage agents based on roles.
            </p>

            {/* Geometrically Configured Avatar Network Map */}
            <div className="roles-cluster-card">
              <div className="roles-avatar-grid">
                
                {/* Fine line network backing layer */}
                <div className="roles-grid-lines-overlay" />

                {/* Center Pixelated App Module */}
                <div className="roles-center-logo">
                  <svg className="roles-center-logo-svg" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="6" height="6" rx="1" />
                    <rect x="14" y="4" width="6" height="6" rx="1" />
                    <rect x="14" y="14" width="6" height="6" rx="1" />
                  </svg>
                </div>

                {/* Avatar positions mimicking hexagon configuration exactly */}
                <div className="role-user-avatar role-u1">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80" alt="Auditor wash" />
                </div>
                <div className="role-user-avatar role-u2">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80" alt="Lead architect" />
                </div>
                <div className="role-user-avatar role-u3">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" alt="Data operator" />
                </div>
                <div className="role-user-avatar role-u4">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80" alt="Global reviewer" />
                </div>
                <div className="role-user-avatar role-u5">
                  <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80" alt="Privacy officer" />
                </div>
                <div className="role-user-avatar role-u6">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" alt="Super administrator" />
                </div>
              </div>
            </div>

            <div className="sub-feature-item">
              <h4 className="sub-feature-title">Guardrail Engine</h4>
              <p className="sub-feature-desc">
                Applies brand, tone, and policy checks before output goes live.
              </p>
            </div>
          </div>

        </div>

        {/* Figma Highlight Window Wrapper */}
        <div className="figma-device-window-outline">
          
          {/* Big Showcase Dashboard Frame Container */}
          <div className="audit-showcase-panel">
            
            {/* Dashboard Row 1: Metrics & Calendar Cards */}
            <div className="dash-showcase-row-1">
              
              {/* Total Revenue */}
              <div className="showcase-card total-revenue-card">
                <span className="sc-card-label">Total Revenue</span>
                <h4 className="sc-card-value">$15,231.89</h4>
                <p className="sc-card-subtext">+20.1% from last month</p>
                <div className="revenue-chart-area">
                  <svg viewBox="0 0 160 40" className="showcase-sparkline">
                    <path 
                      d="M 5 25 Q 25 35, 45 25 T 85 20 T 125 10 T 155 5" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="2" 
                    />
                    <circle cx="155" cy="5" r="3" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              {/* Subscriptions */}
              <div className="showcase-card subscriptions-card">
                <span className="sc-card-label">Subscriptions</span>
                <h4 className="sc-card-value">+2350</h4>
                <p className="sc-card-subtext">+180.1% from last month</p>
                <div className="bar-chart-area">
                  <div className="bca-bar" style={{ height: '40%' }}></div>
                  <div className="bca-bar" style={{ height: '70%' }}></div>
                  <div className="bca-bar" style={{ height: '55%' }}></div>
                  <div className="bca-bar" style={{ height: '90%' }}></div>
                  <div className="bca-bar" style={{ height: '45%' }}></div>
                  <div className="bca-bar" style={{ height: '80%' }}></div>
                  <div className="bca-bar" style={{ height: '35%' }}></div>
                  <div className="bca-bar" style={{ height: '60%' }}></div>
                </div>
              </div>

              {/* Calendar Card Widget */}
              <div className="showcase-card calendar-card">
                <div className="calendar-header">
                  <span className="cal-arrow">&lt;</span>
                  <span className="cal-title">June 2023</span>
                  <span className="cal-arrow">&gt;</span>
                </div>
                <div className="calendar-days-grid">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  <span className="dim">28</span><span className="dim">29</span><span className="dim">30</span><span className="dim">31</span><span>1</span><span>2</span><span>3</span>
                  <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                  <span>11</span><span className="cal-selected-neutral">12</span><span className="cal-selected-active">13</span><span>14</span><span>15</span><span>16</span><span>17</span>
                  <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span>
                  <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span className="dim">1</span>
                </div>
              </div>

              {/* Move Goal Card Widget */}
              <div className="showcase-card move-goal-card">
                <span className="sc-card-label">Move Goal</span>
                <p className="move-goal-desc">Set your daily activity goal.</p>
                
                <div className="move-goal-value-selector">
                  <span className="mg-ctrl-btn">-</span>
                  <div className="mg-center-val">
                    <span className="mg-val">350</span>
                    <span className="mg-unit">CALORIES/DAY</span>
                  </div>
                  <span className="mg-ctrl-btn">+</span>
                </div>

                <div className="move-chart-area">
                  <div className="mca-bar" style={{ height: '30%' }}></div>
                  <div className="mca-bar" style={{ height: '50%' }}></div>
                  <div className="mca-bar" style={{ height: '40%' }}></div>
                  <div className="mca-bar" style={{ height: '70%' }}></div>
                  <div className="mca-bar" style={{ height: '60%' }}></div>
                  <div className="mca-bar" style={{ height: '80%' }}></div>
                  <div className="mca-bar" style={{ height: '45%' }}></div>
                  <div className="mca-bar" style={{ height: '65%' }}></div>
                  <div className="mca-bar" style={{ height: '55%' }}></div>
                  <div className="mca-bar" style={{ height: '90%' }}></div>
                  <div className="mca-bar" style={{ height: '40%' }}></div>
                  <div className="mca-bar" style={{ height: '30%' }}></div>
                </div>

                <button className="set-goal-btn">Set Goal</button>
              </div>

            </div>

            {/* Dashboard Row 2: Nested Content Widgets */}
            <div className="dash-showcase-row-2">
              
              {/* Team Members Card */}
              <div className="showcase-card team-members-card">
                <div className="sc-section-title">Team Members</div>
                <p className="sc-section-desc">Invite your team members to collaborate.</p>
                
                <div className="team-list">
                  <div className="team-item">
                    <div className="team-item-left">
                      <div className="team-avatar-initial">SD</div>
                      <div className="team-user-meta">
                        <span className="tum-name">Sofia Davis</span>
                        <span className="tum-email">m@example.com</span>
                      </div>
                    </div>
                    <div className="team-dropdown-role">
                      <span>Owner</span>
                      <span className="dd-arrow">▼</span>
                    </div>
                  </div>

                  <div className="team-item">
                    <div className="team-item-left">
                      <div className="team-avatar-initial">JL</div>
                      <div className="team-user-meta">
                        <span className="tum-name">Jackson Lee</span>
                        <span className="tum-email">p@example.com</span>
                      </div>
                    </div>
                    <div className="team-dropdown-role">
                      <span>Member</span>
                      <span className="dd-arrow">▼</span>
                    </div>
                  </div>

                  <div className="team-item">
                    <div className="team-item-left">
                      <div className="team-avatar-initial">IN</div>
                      <div className="team-user-meta">
                        <span className="tum-name">Isabella Nguyen</span>
                        <span className="tum-email">i@example.com</span>
                      </div>
                    </div>
                    <div className="team-dropdown-role">
                      <span>Member</span>
                      <span className="dd-arrow">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Support Card */}
              <div className="showcase-card chat-widget-card">
                <div className="chat-widget-header">
                  <div className="chat-hdr-left">
                    <div className="chat-user-avatar-dot">SD</div>
                    <div className="chat-user-header-meta">
                      <span className="chm-name">Sofia Davis</span>
                      <span className="chm-email">m@example.com</span>
                    </div>
                  </div>
                  <div className="chat-add-btn">+</div>
                </div>

                <div className="chat-bubbles-space">
                  <div className="chat-bubble received">
                    Hi, how can I help you today?
                  </div>
                  <div className="chat-bubble sent">
                    Hey, I'm having trouble with my account.
                  </div>
                  <div className="chat-bubble received">
                    What seems to be the problem?
                  </div>
                  <div className="chat-bubble sent">
                    I can't log in.
                  </div>
                </div>

                <div className="chat-input-row">
                  <input type="text" placeholder="Type your message..." className="chat-input-field" disabled />
                  <div className="chat-send-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <polygon points="3 2 22 12 12 14 3 22 3 2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Exercise Minutes Card (Double Width Span) */}
              <div className="showcase-card exercise-minutes-card">
                <div className="sc-section-title">Exercise Minutes</div>
                <p className="sc-section-desc">Your exercise minutes are ahead of where you normally are.</p>
                
                <div className="exercise-dual-charts">
                  <svg viewBox="0 0 340 120" className="exercise-vector-waves">
                    {/* Background faint tracking curve */}
                    <path 
                      d="M 10 90 C 70 85, 110 95, 150 50 C 180 10, 220 80, 260 70 C 290 60, 310 75, 330 70" 
                      fill="none" 
                      stroke="rgba(255, 255, 255, 0.08)" 
                      strokeWidth="2" 
                    />
                    <circle cx="150" cy="50" r="3" fill="rgba(255, 255, 255, 0.4)" />
                    <circle cx="260" cy="70" r="3" fill="rgba(255, 255, 255, 0.4)" />

                    {/* Bright white primary curve */}
                    <path 
                      d="M 10 105 C 70 100, 110 110, 150 45 C 190 -10, 230 105, 270 95 C 300 85, 310 100, 330 95" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="2.5" 
                    />
                    <circle cx="150" cy="45" r="4" fill="#ffffff" />
                    <circle cx="270" cy="95" r="4" fill="#ffffff" />
                  </svg>
                </div>
              </div>

            </div>

            {/* Dashboard Row 3: Cropped / Infinite Fold Peeking Cards */}
            <div className="dash-showcase-row-3">
              
              {/* Cookie Settings Card */}
              <div className="showcase-card cookie-settings-card">
                <div className="sc-section-title">Cookie Settings</div>
                <p className="sc-section-desc">Manage your cookie settings here.</p>
                
                <div className="cookie-settings-list">
                  <div className="cookie-row">
                    <div className="cookie-meta">
                      <span className="cookie-name">Strictly Necessary</span>
                      <span className="cookie-desc">These cookies are essential in order to use the website.</span>
                    </div>
                    <div className="cookie-toggle-switch active">
                      <div className="toggle-bullet"></div>
                    </div>
                  </div>

                  <div className="cookie-row">
                    <div className="cookie-meta">
                      <span className="cookie-name">Functional Cookies</span>
                      <span className="cookie-desc">These cookies allow us to personalize your experience.</span>
                    </div>
                    <div className="cookie-toggle-switch">
                      <div className="toggle-bullet"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create an account Widget */}
              <div className="showcase-card create-account-card">
                <div className="sc-section-title">Create an account</div>
                <p className="sc-section-desc">Enter your email below to create your account</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <div style={{ flex: 1, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent' }}></div>
                  <div style={{ width: 100, height: 32, borderRadius: 6, background: '#ffffff' }}></div>
                </div>
              </div>

              {/* Payments Card */}
              <div className="showcase-card payments-card-peek">
                <div className="sc-section-title">Payments</div>
                <p className="sc-section-desc">Recent transitions on your account.</p>
              </div>

            </div>

            {/* Linear Fade Out Shield Overlay to anchor crop transition */}
            <div className="dashboard-bottom-fade-shield" />

          </div>
        </div>

      </div>
    </section>
  );
}