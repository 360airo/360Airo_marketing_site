import React from 'react';
import '../styles/PhoneDashboard.css';

const PhoneDashboard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
    return (
        <div ref={ref} {...props} className={`phone-container ${props.className || ''}`}>
            <div className="pd-header">
                <h1>Campaign Results</h1>
                <button className="time-filter">Last 30 Days</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="channel-tag">
                        <span className="dot email"></span>Email
                    </div>
                    <div className="stat-value">2,847</div>
                    <div className="stat-label">Sent</div>
                    <div className="trend">↑ 24.3%</div>
                </div>

                <div className="stat-card">
                    <div className="channel-tag">
                        <span className="dot linkedin"></span>LinkedIn
                    </div>
                    <div className="stat-value">1,263</div>
                    <div className="stat-label">Requests</div>
                    <div className="trend">↑ 18.7%</div>
                </div>

                <div className="stat-card">
                    <div className="channel-tag">
                        <span className="dot sms"></span>SMS
                    </div>
                    <div className="stat-value">934</div>
                    <div className="stat-label">Delivered</div>
                    <div className="trend">↑ 31.2%</div>
                </div>
            </div>

            <div className="replies-section">
                <div className="replies-title">Total Replies</div>
                <div className="replies-row">
                    <div className="replies-count">1,592</div>
                    <div className="badge">+42.8% vs last month</div>
                </div>
            </div>

            <div className="chart-container">
                <svg className="chart-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#D9F99D" stopOpacity="0.15"/>
                            <stop offset="100%" stopColor="#D9F99D" stopOpacity="0"/>
                        </linearGradient>
                    </defs>

                    <line x1="0" y1="18" x2="100" y2="18" stroke="#1E293B" strokeWidth="0.2"/>
                    <line x1="0" y1="34" x2="100" y2="34" stroke="#1E293B" strokeWidth="0.2"/>

                    <path d="M 0,45 Q 35,32 65,12 T 100,6 L 100,50 L 0,50 Z" fill="url(#grad-yellow)"/>

                    <path d="M 0,45 Q 35,32 65,12 T 100,6" fill="none" stroke="#D9F99D" strokeWidth="1.2"/>
                    <path d="M 0,47 Q 35,36 65,18 T 100,12" fill="none" stroke="#38BDF8" strokeWidth="1.2"/>
                    <path d="M 0,49 Q 35,42 65,26 T 100,20" fill="none" stroke="#FB923C" strokeWidth="1.2"/>

                    <circle cx="100" cy="6" r="1" fill="#D9F99D"/>
                    <circle cx="100" cy="12" r="1" fill="#38BDF8"/>
                    <circle cx="100" cy="20" r="1" fill="#FB923C"/>
                </svg>
            </div>

            <div className="bottom-grid">
                <div className="metric-box">
                    <div className="metric-num">32%</div>
                    <div className="metric-name">Open Rate</div>
                </div>

                <div className="metric-box">
                    <div className="metric-num">12%</div>
                    <div className="metric-name">Reply Rate</div>
                </div>

                <div className="metric-box">
                    <div className="metric-num">847</div>
                    <div className="metric-name">Meetings</div>
                </div>
            </div>

            <div className="contribution-card">
                <div className="contribution-header">
                    <span className="contribution-label">Channel Contribution</span>
                    <span className="contribution-value">100%</span>
                </div>
                <div className="progress-bar-bg">
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    );
});

PhoneDashboard.displayName = 'PhoneDashboard';
export default PhoneDashboard;
