import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import '../styles/globals.css';
import '../styles/all.css';
import '../styles/hero-bg.css';

import { initAnimations } from '../animations';

import EngineeringTeamSection from '../components/EngineeringTeamSection';
import TrustedOperatorsSection from '../components/TrustedOperatorsSection';
import LaunchFasterSection from '../components/LaunchFasterSection';
import ModernOutreachSection from '../components/ModernOutreachSection';

export default function Home() {
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const tabletMotionRef = useRef(null);
  const heroTabletRef = useRef(null);
  const tabletScreenRef = useRef(null);
  const dashboardUiRef = useRef(null);
  const futureTabletContentRef = useRef(null);
  const featureSectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(tabletMotionRef.current, {
          xPercent: 0,
          yPercent: -50,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "center center"
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroStageRef.current,
            start: "top top",
            end: "+=4800",
            scrub: 1.15,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        const getViewportScreenCoverScale = () => {
          const screen = tabletScreenRef.current;
          if (!screen) return 1;
          const baseScreenWidth = screen.offsetWidth;
          const baseScreenHeight = screen.offsetHeight;
          const scaleX = window.innerWidth / baseScreenWidth;
          const scaleY = window.innerHeight / baseScreenHeight;
          return Math.max(scaleX, scaleY) * 1.14;
        };

        timeline
          .addLabel("heroExit")
          .to(heroContentRef.current, {
            opacity: 0,
            x: -70,
            y: -18,
            filter: "blur(4px)",
            duration: 1,
            ease: "none"
          }, "heroExit")
          .to(dashboardUiRef.current, {
            opacity: 0,
            scale: 0.96,
            filter: "blur(4px)",
            duration: 1,
            ease: "none"
          }, "heroExit")
          .addLabel("futureTitleEnter", "heroExit+=0.35")
          .to(futureTabletContentRef.current, {
            autoAlpha: 1,
            opacity: 0.65,
            duration: 0.55,
            ease: "none"
          }, "futureTitleEnter")
          .addLabel("futureTitleCrisp", "futureTitleEnter+=0.4")
          .to(futureTabletContentRef.current, {
            opacity: 1,
            duration: 0.65,
            ease: "none"
          }, "futureTitleCrisp")
          .addLabel("tabletPullForward", "futureTitleCrisp+=0.45")
          .to(tabletMotionRef.current, {
            x: () => {
              const shell = tabletMotionRef.current;
              if (!shell) return 0;
              const rect = shell.getBoundingClientRect();
              const currentCenterX = rect.left + rect.width / 2;
              return window.innerWidth / 2 - currentCenterX;
            },
            y: () => {
              const shell = tabletMotionRef.current;
              if (!shell) return 0;
              const rect = shell.getBoundingClientRect();
              const currentCenterY = rect.top + rect.height / 2;
              return window.innerHeight / 2 - currentCenterY;
            },
            scale: 1.55,
            duration: 1.2,
            ease: "none"
          }, "tabletPullForward")
          .addLabel("tabletZoomToViewport", "tabletPullForward+=0.95")
          .to(tabletMotionRef.current, {
            scale: getViewportScreenCoverScale,
            duration: 2.8,
            ease: "none"
          }, "tabletZoomToViewport");
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="home-container">
      <div>   
        <canvas id="aurora-canvas" />
        <canvas id="aurora-light-canvas" />
        
        <section className="hero-stitch-stage" ref={heroStageRef}>
          <div className="hero-scene">
            <section className="hero">
              {/* LEFT COPY */}
              <div className="hero-copy" ref={heroContentRef}>
                <h1 className="hero-title">
                  <span className="title-line">A Hyper-<em className="title-accent">Personalized</em></span>
                  <span className="title-line">Multichannel</span>
                  <span className="title-line">Outreach Platform</span>
                </h1>
                <p className="hero-desc">AI SDR Built for High-Growth B2B Teams Start real conversations,
                  Automate prospecting, run outreach campaigns across email,
                  LinkedIn and sms that converts more leads into pipeline without
                  growing your SDR team.</p>
                <div className="hero-actions">
                  <button className="hero-btn-primary">Start Free Trial &nbsp;→</button>
                  <button className="hero-btn-secondary">Book Demo</button>
                </div>
                {/* METRIC CARDS — dark glass, Figma style */}
                <div className="hero-metrics">
                  {/* Card 1: Reply Rate */}
                  <div className="hero-stat-card metric-blue">
                    <div className="metric-top">
                      <div className="metric-icon">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#5B8EFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x={2} y={4} width={20} height={16} rx={2} />
                          <path d="M2 7l10 7 10-7" />
                        </svg>
                      </div>
                      <div className="metric-stats">
                        <span className="metric-value counter" data-target="3.2" data-decimals={1} data-suffix="x">0x</span>
                        <div className="metric-label">Average Reply Rate Lift</div>
                      </div>
                    </div>
                    <div className="metric-growth"><span>↑ <strong>32%</strong></span> vs industry average</div>
                  </div>
                  {/* Card 2: Campaigns */}
                  <div className="hero-stat-card metric-cyan">
                    <div className="metric-top">
                      <div className="metric-icon">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#18D8E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 2L11 13" />
                          <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                        </svg>
                      </div>
                      <div className="metric-stats">
                        <span className="metric-value counter" data-target={4200} data-decimals={0} data-suffix="+">0+</span>
                        <div className="metric-label">Campaigns Launched</div>
                      </div>
                    </div>
                    <div className="metric-growth"><span>↑ <strong>24%</strong></span> vs last 90 days</div>
                  </div>
                  {/* Card 3: Customer Retention */}
                  <div className="hero-stat-card metric-purple">
                    <div className="metric-top">
                      <div className="metric-icon">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#9B6BFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                      </div>
                      <div className="metric-stats">
                        <span className="metric-value counter" data-target={89} data-decimals={0} data-suffix="%">0%</span>
                        <div className="metric-label">Customer Retention</div>
                      </div>
                    </div>
                    <div className="metric-growth"><span>↑ <strong>7%</strong></span> vs last 90 days</div>
                  </div>
                </div>{/* /.hero-metrics */}
              </div>{/* /.hero-copy */}

              {/* RIGHT VISUAL: TABLET MOCKUP */}
              <div className="hero-visual">
                <div ref={tabletMotionRef} className="tablet-motion-shell">
                  <div ref={heroTabletRef} className="hero-dashboard-tablet">
                    <div className="tablet-camera" />
                    <div className="tablet-side-dot tablet-left" />
                    <div className="tablet-side-dot tablet-right" />
                    <div ref={tabletScreenRef} className="tablet-screen-mask">
                      <div ref={dashboardUiRef} className="hero-dashboard-ui">
                        {/* Sidebar */}
                        <div className="db-sidebar">
                          {/* Logo removed per request */}
                          <div className="db-nav">
                            <div className="db-nav-item active">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /></svg>
                              Dashboard
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                              Campaigns
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx={9} cy={7} r={4} /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                              Leads
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                              Inbox
                              <span className="db-badge">12</span>
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                              Tasks
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={20} x2={18} y2={10} /><line x1={12} y1={20} x2={12} y2={4} /><line x1={6} y1={20} x2={6} y2={14} /></svg>
                              Reports
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                              Settings
                            </div>
                            <div className="db-nav-item">
                              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={4} y={4} width={6} height={6} rx={1} /><rect x={14} y={4} width={6} height={6} rx={1} /><rect x={4} y={14} width={6} height={6} rx={1} /><path d="M14 17h6M17 14v6" /></svg>
                              Integrations
                            </div>
                          </div>
                        </div>
                        {/* Main Content */}
                        <div className="db-main">
                          <div className="db-header">
                            <div className="db-title">Dashboard</div>
                            <div className="db-header-right">
                              <div className="db-search">
                                <svg viewBox="0 0 24 24"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                                <input type="text" placeholder="Search anything..." />
                              </div>
                              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#94A3B8" strokeWidth={2}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                              <div className="db-user-icon"><img src="https://i.pravatar.cc/150?img=32" alt="User" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} /></div>
                            </div>
                          </div>
                          <div className="db-stats">
                            <div className="db-stat-card">
                              <div className="db-stat-title">Total Leads</div>
                              <div className="db-stat-val">12,843</div>
                              <div className="db-stat-change up"><span>↑ 18.2%</span> <span className="txt">vs last 30 days</span></div>
                            </div>
                            <div className="db-stat-card">
                              <div className="db-stat-title">Emails Sent</div>
                              <div className="db-stat-val">45,123</div>
                              <div className="db-stat-change up"><span>↑ 24.6%</span> <span className="txt">vs last 30 days</span></div>
                            </div>
                            <div className="db-stat-card">
                              <div className="db-stat-title">Reply Rate</div>
                              <div className="db-stat-val">7.34%</div>
                              <div className="db-stat-change up"><span>↑ 32.1%</span> <span className="txt">vs last 30 days</span></div>
                            </div>
                            <div className="db-stat-card">
                              <div className="db-stat-title">Opportunities</div>
                              <div className="db-stat-val">256</div>
                              <div className="db-stat-change up"><span>↑ 15.3%</span> <span className="txt">vs last 30 days</span></div>
                            </div>
                          </div>
                          <div className="db-charts">
                            {/* Line Chart */}
                            <div className="db-chart-card">
                              <div className="db-chart-header">
                                <div className="db-chart-title">Performance Overview</div>
                                <div className="db-chart-filters">
                                  <span className="db-filter">7D</span>
                                  <span className="db-filter active">30D</span>
                                  <span className="db-filter">90D</span>
                                  <span className="db-filter">1Y</span>
                                </div>
                              </div>
                              <div className="db-legend" style={{marginBottom: 12}}>
                                <div className="db-legend-item"><div className="db-dot" style={{background: '#3B82F6'}} /> Emails Sent</div>
                                <div className="db-legend-item"><div className="db-dot" style={{background: '#8B5CF6'}} /> Replies</div>
                                <div className="db-legend-item"><div className="db-dot" style={{background: '#06B6D4'}} /> Meetings Booked</div>
                              </div>
                              <div className="db-chart-area">
                                <svg viewBox="0 0 400 120" style={{width: '100%', height: '100%', overflow: 'visible'}}>
                                  {/* Grid Lines */}
                                  <line x1={0} y1={0} x2={400} y2={0} stroke="#F1F5F9" strokeWidth={1} />
                                  <line x1={0} y1={30} x2={400} y2={30} stroke="#F1F5F9" strokeWidth={1} />
                                  <line x1={0} y1={60} x2={400} y2={60} stroke="#F1F5F9" strokeWidth={1} />
                                  <line x1={0} y1={90} x2={400} y2={90} stroke="#F1F5F9" strokeWidth={1} />
                                  <line x1={0} y1={120} x2={400} y2={120} stroke="#F1F5F9" strokeWidth={1} />
                                  {/* Y Axis Labels */}
                                  <text x={-20} y={5} fontSize={8} fill="#94A3B8">8K</text>
                                  <text x={-20} y={35} fontSize={8} fill="#94A3B8">6K</text>
                                  <text x={-20} y={65} fontSize={8} fill="#94A3B8">4K</text>
                                  <text x={-20} y={95} fontSize={8} fill="#94A3B8">2K</text>
                                  <text x={-15} y={125} fontSize={8} fill="#94A3B8">0</text>
                                  {/* X Axis Labels */}
                                  <text x={20} y={140} fontSize={8} fill="#94A3B8">May 1</text>
                                  <text x={80} y={140} fontSize={8} fill="#94A3B8">May 6</text>
                                  <text x={140} y={140} fontSize={8} fill="#94A3B8">May 11</text>
                                  <text x={200} y={140} fontSize={8} fill="#94A3B8">May 16</text>
                                  <text x={260} y={140} fontSize={8} fill="#94A3B8">May 21</text>
                                  <text x={320} y={140} fontSize={8} fill="#94A3B8">May 26</text>
                                  <text x={380} y={140} fontSize={8} fill="#94A3B8">May 31</text>
                                  {/* Lines */}
                                  <path d="M0 90 L40 70 L80 85 L120 40 L160 55 L200 30 L240 60 L280 20 L320 45 L360 10 L400 35" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M0 110 L40 105 L80 90 L120 95 L160 70 L200 80 L240 65 L280 50 L320 75 L360 40 L400 55" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M0 115 L40 110 L80 115 L120 105 L160 110 L200 95 L240 100 L280 85 L320 95 L360 75 L400 85" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </div>
                            </div>
                            {/* Doughnut Chart */}
                            <div className="db-chart-card">
                              <div className="db-chart-title" style={{marginBottom: 16}}>Channel Performance</div>
                              <div className="db-donut">
                                <svg viewBox="0 0 36 36">
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth={3} />
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth={3} strokeDasharray="65, 100" strokeLinecap="round" />
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="25, 100" strokeDashoffset={-65} strokeLinecap="round" />
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06B6D4" strokeWidth={3} strokeDasharray="10, 100" strokeDashoffset={-90} strokeLinecap="round" />
                                </svg>
                                <div className="db-donut-text">
                                  <div className="db-donut-lbl">Emails Sent</div>
                                  <div className="db-donut-val">45,123</div>
                                </div>
                              </div>
                              <div className="db-chan-list">
                                <div className="db-chan-item">
                                  <div className="db-chan-name"><div className="db-dot" style={{background: '#3B82F6'}} /> Email</div>
                                  <div className="db-chan-pct">65%</div>
                                </div>
                                <div className="db-chan-item">
                                  <div className="db-chan-name"><div className="db-dot" style={{background: '#8B5CF6'}} /> LinkedIn</div>
                                  <div className="db-chan-pct">25%</div>
                                </div>
                                <div className="db-chan-item">
                                  <div className="db-chan-name"><div className="db-dot" style={{background: '#06B6D4'}} /> SMS</div>
                                  <div className="db-chan-pct">10%</div>
                                </div>
                              </div>
                              <div className="db-chart-link">View full report →</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{/* /.tablet-screen */}
                  </div>{/* /.tablet-frame */}
                </div>
              </div>{/* /.hero-visual */}
            </section>
          </div>{/* /.hero-scene */}

          <div className="future-transition-layer" aria-hidden="true">
            <div ref={futureTabletContentRef} className="future-tablet-content">
              <div className="future-transition-title">
                <span>THE FUTURE</span>
                <span>OF</span>
                <span>OUTREACH</span>
              </div>
            </div>
          </div>
        </section>

        <div id="section-phone" ref={featureSectionRef}>
          <section className="p2-hero">
            <div className="hero-main">
              <div className="hero-left">
                <p data-reveal="left" data-delay={900}>Trust automated strategies or invest yourself — the choice is yours.</p>
                <p data-reveal="left" data-delay={1100}>Take the first step towards financial freedom.</p>
              </div>
              <div className="hero-center">
                <h1 className="hero-headline">
                  <span className="headline-line"><span className="headline-inner" data-headline-delay={500}>THE FUTURE</span></span>
                  <span className="headline-line line2"><span className="headline-inner" data-headline-delay={650}>OF</span></span>
                  <span className="headline-line"><span className="headline-inner" data-headline-delay={800}>OUTREACH</span></span>
                </h1>
              </div>
              <div className="hero-right">
                <div className="phone-mockup" data-reveal="right" data-delay={700} id="p2phone">
                  <div className="phone-screen">
                    <div className="phone-notch" />
                    <div className="dash-content">
                      <div className="dash-header">
                        <span className="dash-title">Campaign Results</span>
                        <span className="dash-period">Last 30 days</span>
                      </div>
                      <div className="channel-stats">
                        <div className="channel-card">
                          <div className="channel-icon-row">
                            <div className="channel-dot email" />
                            <span className="channel-label">Email</span>
                          </div>
                          <div className="channel-number" data-target={2847} data-suffix>0</div>
                          <div className="channel-sub">Sent</div>
                          <div className="channel-change">↑ 24.3%</div>
                        </div>
                        <div className="channel-card">
                          <div className="channel-icon-row">
                            <div className="channel-dot linkedin" />
                            <span className="channel-label">LinkedIn</span>
                          </div>
                          <div className="channel-number" data-target={1263} data-suffix>0</div>
                          <div className="channel-sub">Requests</div>
                          <div className="channel-change">↑ 18.7%</div>
                        </div>
                        <div className="channel-card">
                          <div className="channel-icon-row">
                            <div className="channel-dot sms" />
                            <span className="channel-label">SMS</span>
                          </div>
                          <div className="channel-number" data-target={934} data-suffix>0</div>
                          <div className="channel-sub">Delivered</div>
                          <div className="channel-change">↑ 31.2%</div>
                        </div>
                      </div>
                      <div className="total-section">
                        <div>
                          <div className="total-label">Total Replies</div>
                          <div className="total-number" data-target={1592} data-suffix>0</div>
                        </div>
                        <div className="total-badge">+42.8% vs last month</div>
                      </div>
                      <div className="dash-chart">
                        <svg viewBox="0 0 240 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="p2ag" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#c5d441" stopOpacity=".25" />
                              <stop offset="100%" stopColor="#c5d441" stopOpacity=".02" />
                            </linearGradient>
                            <linearGradient id="p2bg" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#5b9bf5" stopOpacity=".12" />
                              <stop offset="100%" stopColor="#5b9bf5" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="p2og" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#f59b5b" stopOpacity=".12" />
                              <stop offset="100%" stopColor="#f59b5b" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <line x1={0} y1={25} x2={240} y2={25} stroke="#151c30" strokeWidth=".5" />
                          <line x1={0} y1={50} x2={240} y2={50} stroke="#151c30" strokeWidth=".5" />
                          <line x1={0} y1={75} x2={240} y2={75} stroke="#151c30" strokeWidth=".5" />
                          <path className="chart-area" data-area-delay={2400} d="M0,95 C15,93 30,90 48,85 C65,80 80,78 96,72 C112,66 128,62 144,56 C160,50 176,48 192,44 C208,40 224,38 240,35 L240,100 L0,100Z" fill="url(#p2og)" />
                          <path className="chart-line" data-line-delay={1400} d="M0,95 C15,93 30,90 48,85 C65,80 80,78 96,72 C112,66 128,62 144,56 C160,50 176,48 192,44 C208,40 224,38 240,35" fill="none" stroke="#f59b5b" strokeWidth="1.5" strokeLinecap="round" />
                          <path className="chart-area" data-area-delay={2200} d="M0,92 C15,88 30,84 48,76 C65,68 80,62 96,55 C112,48 128,42 144,36 C160,30 176,26 192,22 C208,18 224,16 240,14 L240,100 L0,100Z" fill="url(#p2bg)" />
                          <path className="chart-line" data-line-delay={1600} d="M0,92 C15,88 30,84 48,76 C65,68 80,62 96,55 C112,48 128,42 144,36 C160,30 176,26 192,22 C208,18 224,16 240,14" fill="none" stroke="#5b9bf5" strokeWidth="1.5" strokeLinecap="round" />
                          <path className="chart-area" data-area-delay={2000} d="M0,88 C15,82 30,76 48,66 C65,56 80,48 96,40 C112,33 128,27 144,22 C160,17 176,13 192,10 C208,7 224,5 240,4 L240,100 L0,100Z" fill="url(#p2ag)" />
                          <path className="chart-line" data-line-delay={1200} d="M0,88 C15,82 30,76 48,66 C65,56 80,48 96,40 C112,33 128,27 144,22 C160,17 176,13 192,10 C208,7 224,5 240,4" fill="none" stroke="#c5d441" strokeWidth={2} strokeLinecap="round" />
                          <circle className="chart-dot" data-dot-delay={3200} cx={240} cy={4} fill="#c5d441" />
                          <circle className="chart-dot-pulse" data-dot-delay={3400} cx={240} cy={4} fill="#c5d441" />
                          <circle className="chart-dot" data-dot-delay={3400} cx={240} cy={14} fill="#5b9bf5" />
                          <circle className="chart-dot" data-dot-delay={3600} cx={240} cy={35} fill="#f59b5b" />
                        </svg>
                      </div>
                      <div className="dash-bottom-stats">
                        <div className="mini-stat">
                          <div className="mini-stat-value" data-target={32} data-suffix="%">0%</div>
                          <div className="mini-stat-label">Open Rate</div>
                        </div>
                        <div className="mini-stat">
                          <div className="mini-stat-value" data-target={12} data-suffix="%">0%</div>
                          <div className="mini-stat-label">Reply Rate</div>
                        </div>
                        <div className="mini-stat">
                          <div className="mini-stat-value" data-target={847} data-suffix>0</div>
                          <div className="mini-stat-label">Meetings</div>
                        </div>
                      </div>
                      <div className="campaign-bar">
                        <div className="campaign-bar-header">
                          <span className="campaign-bar-title">Channel Contribution</span>
                          <span className="campaign-bar-pct">100%</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill email" id="p2pe" />
                          <div className="progress-fill linkedin" id="p2pl" />
                          <div className="progress-fill sms" id="p2ps" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="section-trusted-startups">
          <section className="trusted-startups-inner">
            <div className="trusted-startups-eyebrow" data-anim="up">TRUSTED BY FAST-GROWING STARTUPS</div>
            <div className="startup-logo-grid">
              <div className="startup-logo logo-heavy" style={{animationDelay: '100ms'}}><svg viewBox="0 0 24 24"><path d="M4 12 L12 4 L20 12 L12 20 Z" fill="currentColor" /></svg>manyreach</div>
              <div className="startup-logo logo-wide" style={{animationDelay: '150ms'}}><svg viewBox="0 0 24 24"><rect x={4} y={4} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={2} fill="none" /><path d="M9 12 L15 12 M12 9 L12 15" stroke="currentColor" strokeWidth={2} /></svg>PERFORMANCE<br />MARKETING</div>
              <div className="startup-logo" style={{animationDelay: '200ms'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={8} fill="currentColor" /><circle cx={12} cy={12} r={3} fill="#F7F7F5" /></svg>Content Brew</div>
              <div className="startup-logo logo-light" style={{animationDelay: '250ms'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 L10 18 M14 18 L18 18 L18 6" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>Avant Page</div>
              <div className="startup-logo logo-heavy" style={{animationDelay: '300ms'}}><svg viewBox="0 0 24 24"><path d="M4 12 h16 M4 6 h12 M4 18 h12" stroke="currentColor" strokeWidth={3} fill="none" /></svg>BTR.fi</div>
              <div className="startup-logo logo-light" style={{animationDelay: '350ms'}}>Loopback</div>
              <div className="startup-logo logo-light logo-wide" style={{animationDelay: '400ms'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2 3" /></svg>Joyhealth<br />CURSOR</div>
              <div className="startup-logo" style={{animationDelay: '450ms'}}><svg viewBox="0 0 24 24"><path d="M4 12 Q12 4 20 12" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" /></svg>SapientWealth</div>
              <div className="startup-logo logo-heavy" style={{animationDelay: '500ms'}}><svg viewBox="0 0 24 24"><path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth={3} /></svg>scale.jobs</div>
              <div className="startup-logo logo-wide" style={{animationDelay: '550ms'}}><svg viewBox="0 0 24 24"><rect x={3} y={8} width={12} height={8} fill="currentColor" /><polygon points="15,12 21,8 21,16" fill="currentColor" /></svg>Moonbeam</div>
              <div className="startup-logo logo-light logo-serif" style={{animationDelay: '600ms'}}>KEARNEY</div>
              <div className="startup-logo logo-large" style={{animationDelay: '650ms'}}>webstone</div>
            </div>
            <div className="startup-logo-grid-bottom">
              <div className="startup-logo logo-serif logo-large" style={{animationDelay: '700ms'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} fill="currentColor" /><circle cx={16} cy={8} r={4} fill="#F7F7F5" /></svg>Procol</div>
              <div className="startup-logo" style={{animationDelay: '750ms'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 M18 6 L18 18 M6 12 L18 12" stroke="currentColor" strokeWidth={4} /></svg>Helium</div>
              <div className="startup-logo logo-heavy" style={{animationDelay: '800ms'}}><svg viewBox="0 0 24 24"><path d="M4 10 Q12 2 20 10 L20 14 Q12 22 4 14 Z" fill="currentColor" /></svg>Spot</div>
            </div>
          </section>
        </div>

        <ModernOutreachSection />
        <EngineeringTeamSection />
        <TrustedOperatorsSection />
        <LaunchFasterSection />

        <div id="section-mountain">
          <section className="img-section mountain-section" style={{backgroundImage: 'url("mountain-bg.jpg")'}}>
            <div data-anim="left" style={{maxWidth: 460}}>
              <h2>Reaching Heights<br />Is Never Accidental.</h2>
            </div>
          </section>
          <section className="apple-statement" id="aurora-dark-start">
            <h2 data-anim="up">And we make it easier for you.<br /><span>The only reach out infrastructure you need.</span></h2>
          </section>
        </div>

        <div id="section-cone">
          <section className="growth-section">
            <div className="growth-headline">
              <h2>Growth happens in stages</h2>
            </div>
            <div className="growth-layout">
              <div className="growth-cone">
                <img src="cone-funnel.png" alt="Sales Funnel" />
              </div>
              <div className="g-reach">
                <div className="g-label-row">
                  <div className="g-dot g-dot-blue" /><span className="g-label-text">Reach</span>
                </div>
                <p className="g-sublabel">Drive awareness with<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;our powerful systems</p>
              </div>
              <div className="g-progress-card">
                <div>
                  <p className="gpc-label">Progress</p>
                  <p className="gpc-val">87%</p>
                </div>
                <div className="gpc-right">
                  <div className="gpc-change">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17l5-5 4 4 5-7" />
                      <path d="M17 7h4v4" />
                    </svg>1.7%
                  </div>
                  <div className="gpc-chart">
                    <svg viewBox="0 0 70 30" fill="none">
                      <path d="M0 28 Q8 26 14 24 T28 18 T42 20 T52 12 T62 8 T70 2" stroke="#06B6D4" strokeWidth={2} fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="g-convert">
                <div className="g-label-row">
                  <div className="g-dot g-dot-purple" /><span className="g-label-text" style={{color: '#C4B5FD', borderColor: '#C4B5FD'}}>Convert</span>
                </div>
                <p className="g-sublabel">Your Prospects are<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;now your Clients</p>
              </div>
              <div className="g-success-card">
                <p className="gsc-label">Success ratio</p>
                <div className="gsc-right">
                  <p className="gsc-val">96%</p>
                  <span className="gsc-change">+12%▲</span>
                </div>
              </div>
              <div className="g-engage">
                <div className="g-label-row">
                  <div className="g-dot g-dot-blue" /><span className="g-label-text">Engage</span>
                </div>
                <p className="g-engage-sub">Run targeted campaigns</p>
              </div>
              <div className="g-matrix-card">
                <div className="gmc-dots">
                  <span /><span /><span />
                </div>
                <p className="gmc-title">Conversion matrix</p>
                <div className="gmc-bars">
                  <div className="gmc-bar gmc-bar-1" />
                  <div className="gmc-bar gmc-bar-2" />
                  <div className="gmc-bar gmc-bar-3" />
                  <div className="gmc-bar gmc-bar-4" />
                  <div className="gmc-bar gmc-bar-5" />
                  <div className="gmc-bar gmc-bar-6" />
                </div>
              </div>
              <div className="g-dashed-line" />
            </div>
            <div className="growth-mobile-timeline">
              <div className="gmt-funnel">
                <img src="cone-funnel.png" alt="Funnel" />
              </div>
              <div className="gmt-stages">
                <div className="gmt-stage stage-reach">
                  <div className="gmt-label">Reach</div>
                  <div className="gmt-desc">Drive awareness with our powerful systems</div>
                  <div className="gmt-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                      <p style={{fontSize: 11, color: 'rgba(255,255,255,.5)'}}>Progress</p>
                      <p style={{fontFamily: '"Outfit"', fontWeight: 700, fontSize: 26, color: '#fff'}}>87%</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4}}>
                      <div style={{fontSize: 12, color: '#34D399', fontWeight: 600}}>↑ 1.7%</div>
                    </div>
                  </div>
                </div>
                <div className="gmt-stage stage-engage">
                  <div className="gmt-label">Engage</div>
                  <div className="gmt-desc">Run targeted campaigns</div>
                  <div className="gmt-card-row">
                    <div className="gmt-card" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <div>
                        <p style={{fontSize: 13, color: 'rgba(255,255,255,.5)'}}>Success ratio</p>
                        <p style={{fontFamily: '"Outfit"', fontWeight: 800, fontSize: 30, color: '#fff'}}>96%</p>
                      </div>
                      <span style={{fontSize: 11, color: '#34D399', fontWeight: 600}}>+12%▲</span>
                    </div>
                    <div className="gmt-card">
                      <p style={{fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 12px'}}>Conversion matrix</p>
                      <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, height: 60}}>
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 30, background: 'rgba(255,255,255,.1)'}} />
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 20, background: 'rgba(255,255,255,.1)'}} />
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 40, background: '#3B82F6'}} />
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 55, background: '#06B6D4'}} />
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 50, background: '#8B5CF6'}} />
                        <div style={{borderRadius: '4px 4px 0 0', flex: 1, height: 35, background: 'rgba(255,255,255,.1)'}} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gmt-stage stage-convert">
                  <div className="gmt-label" style={{color: '#C4B5FD'}}>Convert</div>
                  <div className="gmt-desc">Your Prospects are now your Clients</div>
                </div>
              </div>
            </div>
            <div className="growth-subtext">
              <p>360 Airo structures the entire journey — Analyse the Pipeline, identifying prospects, nurturing engagement, and converting interest into lasting business relationships.</p>
            </div>
          </section>
        </div>

        <div id="section-3stack">
          <div className="s3p">
            <div className="s3f blue">
              <div className="s3g">
                <div className="s3sw" />
                <div className="s3l lr">
                  <div className="s3t pr">
                    <div className="s3pill blue">Step 1 — Load your Prospect list</div>
                    <h2>Build Your<br /><span className="bl">Target List</span></h2>
                    <p className="s3sub">Import prospects from <b>CSV, CRM, or LinkedIn</b>. Define who to reach by industry, role, location, or company size.</p>
                    <div className="s3bars">
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Import from any source</span><span className="s3bs">CSV, HubSpot, Salesforce, LinkedIn Sales Nav.</span></div>
                      </div>
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Smart filtering &amp; segmentation</span><span className="s3bs">Target by title, industry, company size.</span></div>
                      </div>
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Verified contact data</span><span className="s3bs">Auto-enriched emails and LinkedIn profiles.</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="s3av" id="s3sc">
                    <canvas id="s3cv" />
                    <div className="s3pts" id="s3pts" />
                    <div className="s3fc s3fc1"><img src="tp-meeting.jpg" alt="Meeting" /><div className="s3tag"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx={9} cy={7} r={4} /></svg>In-person</div></div>
                    <div className="s3fc s3fc2"><img src="tp-desktop.jpg" alt="Desktop" /><div className="s3tag"><svg viewBox="0 0 24 24"><rect x={2} y={3} width={20} height={14} rx={2} /><path d="M8 21h8M12 17v4" /></svg>Desktop</div></div>
                    <div className="s3fc s3fc3"><img src="tp-mobile.jpg" alt="Mobile" /><div className="s3tag"><svg viewBox="0 0 24 24"><rect x={5} y={2} width={14} height={20} rx={2} /><path d="M12 18h.01" /></svg>Mobile</div></div>
                    <div className="s3sf">
                      <div style={{fontWeight: 600, fontSize: 9, color: 'rgba(200,204,223,.5)', textTransform: 'uppercase'}}>Prospects loaded</div>
                      <div style={{display: 'flex', alignItems: 'baseline', gap: 5}}><span style={{fontWeight: 800, fontSize: 22, color: '#e8eaf0'}}>4,820</span><span style={{fontWeight: 700, fontSize: 11, color: '#34d399'}}>↑ 2.4x</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="conn">
              <svg viewBox="0 0 1400 100" preserveAspectRatio="none" fill="none"><path d="M1050 0 C1050 35,350 65,350 100" stroke="rgba(100,130,255,.08)" strokeWidth={2} strokeDasharray="8 10" strokeLinecap="round" /></svg>
            </div>
            <div className="s3f blue">
              <div className="s3g">
                <div className="s3sw" style={{animationDelay: '2.5s'}} />
                <div className="s3l rl">
                  <div className="s3vis"><img src="360-airo-graphic.png" alt="360 Airo" /><div className="s3kpi br"><div className="s3kl">Replies generated</div><div className="s3kr"><span className="s3kn">1,284</span><span className="s3ku">↑ 3.6x</span></div></div></div>
                  <div className="s3t">
                    <div className="s3pill blue">Step 2 — Automation</div>
                    <h2>AI That<br /><span className="bl">Never Sleeps</span></h2>
                    <p className="s3sub">Your pipeline shouldn't pause when your team logs off. 360 Airo runs <b>24/7 outreach</b> across LinkedIn, calls, and messaging.</p>
                    <div className="s3bars">
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">24/7 prospect outreach</span><span className="s3bs">Always on, never stops.</span></div>
                      </div>
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">AI follow-ups that never stop</span><span className="s3bs">Automated and intelligent.</span></div>
                      </div>
                      <div className="s3bar">
                        <div className="s3chk blue"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Conversations generated automatically</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="conn">
              <svg viewBox="0 0 1400 100" preserveAspectRatio="none" fill="none"><path d="M350 0 C350 35,1050 65,1050 100" stroke="rgba(16,185,129,.08)" strokeWidth={2} strokeDasharray="8 10" strokeLinecap="round" /></svg>
            </div>
            <div className="s3f green" id="aurora-light-start">
              <div className="s3g">
                <div className="s3sw" style={{animationDelay: '5s', background: 'linear-gradient(108deg,transparent 20%,rgba(150,255,220,.05) 50%,transparent 80%)'}} />
                <div className="s3l rlg">
                  <div className="s3t">
                    <div className="s3pill green">Step 3 — Conversion</div>
                    <h2>Turn Prospects<br />Into <span className="gr">Clients</span></h2>
                    <p className="s3sub">360 Airo reaches through <b>LinkedIn, email, and calls</b> — starting real conversations that turn prospects into customers.</p>
                    <div className="s3bars">
                      <div className="s3bar">
                        <div className="s3chk green"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Automated LinkedIn outreach</span><span className="s3bs">AI email follow-ups that never stop</span></div>
                      </div>
                      <div className="s3bar">
                        <div className="s3chk green"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></div>
                        <div className="s3bc"><span className="s3bt">Conversations that convert</span><span className="s3bs">Prospects into clients, automatically</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="s3vis"><img src="360-airo-prospects.png" alt="Prospects" /><div className="s3kpi bl"><div className="s3kl">Deals closed</div><div className="s3kr"><span className="s3kn">312</span><span className="s3ku">↑ 4.1x</span></div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section-wyg">
          <section className="ws">
            <div className="wh">
              <div className="wl">
                <p className="we">Automate your outreach with intelligence — or run it yourself.</p>
                <h1 className="whl"><span>WHAT </span><span>YOU </span><span>GET</span></h1>
                <div className="wc">
                  <button className="wbd">We're Ready, are You? <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                  <button className="wbg">Learn More</button>
                </div>
              </div>
              <div className="wr">
                <div className="wf">
                  <div className="wft">
                    <div className="wfn">01 — Intelligence</div>
                    <h3 className="wfh">An Intelligence with a human brain</h3>
                    <p className="wfd">Humanized automated outreach that reads, adapts, responds like a real person.</p>
                  </div>
                  <div className="wfg">
                    <svg className="wm" viewBox="0 0 340 220" fill="none">
                      <rect width={340} height={220} rx={20} fill="#1A1E26" />
                      <circle cx={24} cy={20} r={5} fill="#4ADE80" opacity=".8" />
                      <rect x={36} y={16} width={64} height={8} rx={4} fill="#2D3340" />
                      <line x1={16} y1={36} x2={324} y2={36} stroke="#2D3340" />
                      <rect x={120} y={48} width={204} height={40} rx={12} fill="#2D5F8A" />
                      <text x={134} y={63} fontFamily="sans-serif" fontSize="9.5" fill="#fff">Hey Sarah — noticed your team just</text>
                      <text x={134} y={77} fontFamily="sans-serif" fontSize="9.5" fill="#fff">closed a Series B. Congrats!</text>
                      <rect x={16} y={106} width={180} height={32} rx={12} fill="#2D3340" />
                      <text x={30} y={126} fontFamily="sans-serif" fontSize="9.5" fill="#C8C8C0">Thanks! How did you hear?</text>
                      <rect x={140} y={150} width={184} height={40} rx={12} fill="#2D5F8A" />
                      <text x={154} y={165} fontFamily="sans-serif" fontSize="9.5" fill="#fff">Saw the TechCrunch piece — would</text>
                      <text x={154} y={179} fontFamily="sans-serif" fontSize="9.5" fill="#fff">love to chat about scaling ops.</text>
                      <rect x={16} y={196} width={56} height={16} rx={8} fill="rgba(74,222,128,.12)" />
                      <text x={24} y={207} fontFamily="sans-serif" fontSize="7.5" fill="#4ADE80" fontWeight={600}>AI Drafted</text>
                    </svg>
                  </div>
                </div>
                <div className="wf">
                  <div className="wft">
                    <div className="wfn">02 — Freedom</div>
                    <h3 className="wfh">Unlimited Freedom</h3>
                    <p className="wfd">User-friendly web app — easy to monitor, track, full pipeline control.</p>
                  </div>
                  <div className="wfg">
                    <svg className="wm" viewBox="0 0 340 220" fill="none">
                      <rect width={340} height={220} rx={20} fill="#1A1E26" />
                      <text x={20} y={26} fontFamily="sans-serif" fontSize={11} fill="#fff" fontWeight={700}>Campaign Results</text>
                      <rect x={16} y={40} width={100} height={56} rx={10} fill="#232830" />
                      <text x={24} y={78} fontFamily="sans-serif" fontSize={22} fill="#fff" fontWeight={800}>2,847</text>
                      <rect x={120} y={40} width={100} height={56} rx={10} fill="#232830" />
                      <text x={128} y={78} fontFamily="sans-serif" fontSize={22} fill="#fff" fontWeight={800}>1,263</text>
                      <rect x={224} y={40} width={100} height={56} rx={10} fill="#232830" />
                      <text x={232} y={78} fontFamily="sans-serif" fontSize={22} fill="#fff" fontWeight={800}>934</text>
                      <text x={20} y={140} fontFamily="sans-serif" fontSize={28} fill="#fff" fontWeight={800}>1,592</text>
                      <path d="M20 200 Q100 180,180 155 Q260 128,320 110" stroke="#4ADE80" strokeWidth={2} fill="none" />
                      <path d="M20 200 Q120 186,220 165 Q300 142,320 136" stroke="#60A5FA" strokeWidth={2} fill="none" />
                    </svg>
                  </div>
                </div>
                <div className="wf">
                  <div className="wft">
                    <div className="wfn">03 — Efficiency</div>
                    <h3 className="wfh">Cost and Time efficiency</h3>
                    <p className="wfd">Save cost and precious time to push your business ahead.</p>
                  </div>
                  <div className="wfg">
                    <svg className="wm" viewBox="0 0 340 220" fill="none">
                      <rect width={340} height={220} rx={20} fill="#1A1E26" />
                      <text x={20} y={28} fontFamily="sans-serif" fontSize={11} fill="#fff" fontWeight={700}>Efficiency Overview</text>
                      <rect x={16} y={42} width={152} height={72} rx={14} fill="#232830" />
                      <text x={28} y={92} fontFamily="sans-serif" fontSize={34} fill="#4ADE80" fontWeight={800}>127h</text>
                      <rect x={176} y={42} width={148} height={72} rx={14} fill="#232830" />
                      <text x={188} y={92} fontFamily="sans-serif" fontSize={34} fill="#60A5FA" fontWeight={800}>73%</text>
                      <rect x={20} y={142} width={280} height={10} rx={5} fill="#5A5A56" opacity=".5" />
                      <rect x={20} y={178} width={82} height={10} rx={5} fill="#4ADE80" />
                      <text x={108} y={186} fontFamily="sans-serif" fontSize={7} fill="#4ADE80" fontWeight={600}>11h — 4x faster</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="section-dashboard">
          <section className="ds">
            <div className="dh">
              <div className="dtag" data-anim="up">
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={2}><path d="M3 3v18h18" /><path d="M18 9l-5 5-2-2-4 4" /></svg> LIVE DASHBOARD
              </div>
              <h2 data-anim="up">Track and optimize your sales outreach</h2>
              <p data-anim="up">Monitor outreach performance, engagement trends, and deal progression — all in real time.</p>
            </div>
            <div className="dm" data-anim="scale">
              <div className="dc">
                <div className="dtop">
                  <div className="dtl">
                    <div className="ddot" /><h3>360Airo Dashboard</h3>
                  </div>
                  <div className="dtr">
                    <div className="dper">Last 30 days</div>
                    <div className="dst"><svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7" /></svg> All systems active</div>
                  </div>
                </div>
                <div className="dkpis" id="dkpis">
                  <div className="dkpi">
                    <div className="dkt"><span className="dkl">Emails Sent</span><span className="dkb up">↑ 24.3%</span></div>
                    <div className="dkv" style={{color: '#3B82F6'}} data-to={4286} data-suffix>0</div>
                    <svg className="dsp" width={120} height={28} viewBox="0 0 120 28" fill="none">
                      <path className="dsl" d="M2 22L15 18L28 20L42 14L56 16L70 10L84 12L98 6L112 4L118 3" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path className="dsa" d="M2 22L15 18L28 20L42 14L56 16L70 10L84 12L98 6L112 4L118 3V28H2Z" fill="url(#x1)" />
                      <defs><linearGradient id="x1" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#3B82F6" /><stop offset={1} stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
                    </svg>
                  </div>
                  <div className="dkpi">
                    <div className="dkt"><span className="dkl">Leads Generated</span><span className="dkb up">↑ 18.7%</span></div>
                    <div className="dkv" style={{color: '#8B5CF6'}} data-to={1208} data-suffix>0</div>
                    <svg className="dsp" width={120} height={28} viewBox="0 0 120 28" fill="none">
                      <path className="dsl" d="M2 24L18 20L34 22L50 15L66 17L82 11L98 8L114 5L118 4" stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path className="dsa" d="M2 24L18 20L34 22L50 15L66 17L82 11L98 8L114 5L118 4V28H2Z" fill="url(#x2)" />
                      <defs><linearGradient id="x2" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#8B5CF6" /><stop offset={1} stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                    </svg>
                  </div>
                  <div className="dkpi">
                    <div className="dkt"><span className="dkl">Meetings Booked</span><span className="dkb hot">+31</span></div>
                    <div className="dkv" style={{color: '#06B6D4'}} data-to={176} data-suffix>0</div>
                    <svg className="dsp" width={120} height={28} viewBox="0 0 120 28" fill="none">
                      <path className="dsl" d="M2 20L20 22L38 17L54 19L70 12L86 14L102 7L118 5" stroke="#06B6D4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path className="dsa" d="M2 20L20 22L38 17L54 19L70 12L86 14L102 7L118 5V28H2Z" fill="url(#x3)" />
                      <defs><linearGradient id="x3" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#06B6D4" /><stop offset={1} stopColor="#06B6D4" stopOpacity={0} /></linearGradient></defs>
                    </svg>
                  </div>
                  <div className="dkpi">
                    <div className="dkt"><span className="dkl">Reply Rate</span><span className="dkb up">↑ 6.2%</span></div>
                    <div className="dkv" style={{color: '#16a34a'}} data-to="34.2" data-suffix="%">0</div>
                    <svg className="dsp" width={120} height={28} viewBox="0 0 120 28" fill="none">
                      <path className="dsl" d="M2 22L16 19L30 21L44 16L58 18L72 13L86 14L100 9L114 6L118 5" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      <path className="dsa" d="M2 22L16 19L30 21L44 16L58 18L72 13L86 14L100 9L114 6L118 5V28H2Z" fill="url(#x4)" />
                      <defs><linearGradient id="x4" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#16a34a" /><stop offset={1} stopColor="#16a34a" stopOpacity={0} /></linearGradient></defs>
                    </svg>
                  </div>
                </div>
                <div className="dcharts">
                  <div className="dcp">
                    <div className="dcph">
                      <h4>Outreach Performance</h4>
                      <div className="dcl">
                        <div className="dcli"><div className="dcld" style={{background: '#3B82F6'}} />Emails</div>
                        <div className="dcli"><div className="dcld" style={{background: '#8B5CF6'}} />LinkedIn</div>
                        <div className="dcli"><div className="dcld" style={{background: '#06B6D4'}} />Calls</div>
                      </div>
                    </div>
                    <svg className="dcsv" id="dlc" viewBox="0 0 520 190" fill="none">
                      <defs>
                        <linearGradient id="gb" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#3B82F6" stopOpacity=".12" /><stop offset={1} stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                        <linearGradient id="gv" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#8B5CF6" stopOpacity=".08" /><stop offset={1} stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
                        <linearGradient id="gc" x1={0} y1={0} x2={0} y2={1}><stop stopColor="#06B6D4" stopOpacity=".06" /><stop offset={1} stopColor="#06B6D4" stopOpacity={0} /></linearGradient>
                      </defs>
                      <line x1={44} y1={160} x2={508} y2={160} stroke="rgba(255,255,255,.06)" />
                      <path className="dma" d="M76 142C100 138 148 122 220 94C292 70 364 44 496 16L496 160H76Z" fill="url(#gb)" />
                      <path className="dml" d="M76 142C100 138 148 122 220 94C292 70 364 44 496 16" stroke="#3B82F6" strokeWidth={2} strokeLinecap="round" fill="none" />
                      <path className="dma" d="M76 150C148 136 220 116 292 95C364 73 436 50 496 38L496 160H76Z" fill="url(#gv)" />
                      <path className="dml" d="M76 150C148 136 220 116 292 95C364 73 436 50 496 38" stroke="#8B5CF6" strokeWidth={2} strokeLinecap="round" fill="none" />
                      <path className="dma" d="M76 156C148 148 220 134 292 118C364 100 436 82 496 70L496 160H76Z" fill="url(#gc)" />
                      <path className="dml" d="M76 156C148 148 220 134 292 118C364 100 436 82 496 70" stroke="#06B6D4" strokeWidth={2} strokeLinecap="round" fill="none" />
                      <circle className="dmd" cx={496} cy={16} r="3.5" fill="#3B82F6" />
                      <circle className="dmd" cx={496} cy={38} r={3} fill="#8B5CF6" />
                      <circle className="dmd" cx={496} cy={70} r="2.5" fill="#06B6D4" />
                    </svg>
                  </div>
                  <div className="dcp">
                    <div className="dcph"><h4>Channel Split</h4></div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20}}>
                      <svg className="ddw" id="ddc" width={120} height={120} viewBox="0 0 120 120">
                        <circle cx={60} cy={60} r={48} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={12} />
                        <circle className="dds s1" cx={60} cy={60} r={48} fill="none" stroke="#3B82F6" strokeWidth={12} strokeDasharray="166 136" strokeLinecap="round" />
                        <circle className="dds s2" cx={60} cy={60} r={48} fill="none" stroke="#8B5CF6" strokeWidth={12} strokeDasharray="90.5 211.5" strokeLinecap="round" />
                        <circle className="dds s3" cx={60} cy={60} r={48} fill="none" stroke="#06B6D4" strokeWidth={12} strokeDasharray="45.3 256.7" strokeLinecap="round" />
                        <text x={60} y={55} fontFamily="sans-serif" fontSize={20} fontWeight={800} fill="#fff" textAnchor="middle" id="ddv">0</text>
                        <text x={60} y={70} fontFamily="sans-serif" fontSize={9} fill="rgba(255,255,255,.45)" textAnchor="middle">Total Sent</text>
                      </svg>
                      <div style={{display: 'flex', flexDirection: 'column', gap: 10, flex: 1}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{fontSize: 12, color: 'rgba(255,255,255,.45)'}}>Email</span><span style={{fontWeight: 700, fontSize: 13, color: '#3B82F6'}}>55%</span></div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{fontSize: 12, color: 'rgba(255,255,255,.45)'}}>LinkedIn</span><span style={{fontWeight: 700, fontSize: 13, color: '#8B5CF6'}}>30%</span></div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{fontSize: 12, color: 'rgba(255,255,255,.45)'}}>Calls</span><span style={{fontWeight: 700, fontSize: 13, color: '#06B6D4'}}>15%</span></div>
                      </div>
                    </div>
                    <div style={{background: 'rgba(255,255,255,.03)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,.06)'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span style={{fontSize: 11, color: 'rgba(255,255,255,.45)'}}>Avg. Reply Rate</span><span style={{fontWeight: 700, fontSize: 13, color: '#16a34a'}}>34.2%</span></div>
                      <div style={{height: 6, background: 'rgba(255,255,255,.06)', borderRadius: 3, overflow: 'hidden'}}><div className="drf" id="drb" style={{background: 'linear-gradient(90deg,#16a34a,#06B6D4)'}} /></div>
                    </div>
                  </div>
                </div>
                <div className="dbot">
                  <div className="dbp" id="dap">
                    <div className="dbpt">Recent Activity<span className="dlv">Live</span></div>
                    <div className="dar">
                      <div className="dai dag">✉</div>
                      <div className="dat"><p>Sarah Chen replied to your outreach</p><span>2 min ago</span></div>
                      <div className="daval" style={{color: '#16a34a'}}>Hot</div>
                    </div>
                    <div className="dar">
                      <div className="dai dab">📅</div>
                      <div className="dat"><p>Meeting booked with Acme Corp</p><span>12 min ago</span></div>
                      <div className="daval" style={{color: '#3B82F6'}}>New</div>
                    </div>
                    <div className="dar">
                      <div className="dai dav">🤖</div>
                      <div className="dat"><p>AI sequence completed — 89 prospects</p><span>28 min ago</span></div>
                      <div className="daval" style={{color: '#8B5CF6'}}>Done</div>
                    </div>
                    <div className="dar">
                      <div className="dai daa">📈</div>
                      <div className="dat"><p>New pipeline loaded — Enterprise Tech</p><span>1h ago</span></div>
                      <div className="daval" style={{color: '#d97706'}}>204</div>
                    </div>
                  </div>
                  <div className="dbp" id="dbap">
                    <div className="dbpt">Channel Performance<span>This month</span></div>
                    <div className="dcr"><span className="dcrl">Email</span><div className="dcrt"><div className="dcrf" data-w="85%" style={{background: 'linear-gradient(90deg,#3B82F6,#60A5FA)'}} /></div><span className="dcrv" style={{color: '#3B82F6'}}>85%</span></div>
                    <div className="dcr"><span className="dcrl">LinkedIn</span><div className="dcrt"><div className="dcrf" data-w="72%" style={{background: 'linear-gradient(90deg,#8B5CF6,#A78BFA)'}} /></div><span className="dcrv" style={{color: '#8B5CF6'}}>72%</span></div>
                    <div className="dcr"><span className="dcrl">Calls</span><div className="dcrt"><div className="dcrf" data-w="58%" style={{background: 'linear-gradient(90deg,#06B6D4,#22D3EE)'}} /></div><span className="dcrv" style={{color: '#06B6D4'}}>58%</span></div>
                    <div className="dcr"><span className="dcrl">SMS</span><div className="dcrt"><div className="dcrf" data-w="41%" style={{background: 'linear-gradient(90deg,#FB923C,#FBBF24)'}} /></div><span className="dcrv" style={{color: '#ea580c'}}>41%</span></div>
                    <div className="dpm">
                      <div><div style={{fontSize: 11, color: 'rgba(255,255,255,.45)'}}>Pipeline Value</div><div className="dpv" id="dpv">$0</div></div>
                      <div style={{textAlign: 'right'}}><div style={{fontSize: 10, color: '#16a34a', fontWeight: 600}}>↑ 42.8%</div><div style={{fontSize: 10, color: 'rgba(255,255,255,.45)'}}>vs last month</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="section-compare">
          <section className="cb">
            <div className="ci">
              <h2>Why Choose Us?</h2>
              <table className="ct">
                <thead><tr><th>What Matters</th><th>In-House</th><th>Traditional</th><th>360 Airo</th></tr></thead>
                <tbody>
                  <tr><td>Setup Speed</td><td>Time-consuming</td><td>Moderate</td><td>Ready in minutes</td></tr>
                  <tr><td>Outreach</td><td>Manual workflows</td><td>Multiple tools</td><td>Unified system</td></tr>
                  <tr><td>Automation</td><td>Limited</td><td>Partial</td><td>Fully automated</td></tr>
                  <tr><td>Pipeline</td><td>Fragmented</td><td>Limited insights</td><td>Real-time tracking</td></tr>
                  <tr><td>Scalability</td><td>Hard to scale</td><td>Tool-dependent</td><td>Built to scale</td></tr>
                </tbody>
              </table>
              <div className="cmob">
                <div className="cmc"><div className="cmh"><h4>Setup Speed</h4></div><div className="cmb"><div className="cml"><div className="cmll">In-House</div><div className="cmlv">Time-consuming</div></div><div className="cml"><div className="cmll">Traditional</div><div className="cmlv">Moderate</div></div><div className="cml hl"><div className="cmll">360 Airo</div><div className="cmlv">Ready in minutes</div></div></div></div>
                <div className="cmc"><div className="cmh"><h4>Automation</h4></div><div className="cmb"><div className="cml"><div className="cmll">In-House</div><div className="cmlv">Limited</div></div><div className="cml"><div className="cmll">Traditional</div><div className="cmlv">Partial</div></div><div className="cml hl"><div className="cmll">360 Airo</div><div className="cmlv">Fully automated</div></div></div></div>
                <div className="cmc"><div className="cmh"><h4>Scalability</h4></div><div className="cmb"><div className="cml"><div className="cmll">In-House</div><div className="cmlv">Hard to scale</div></div><div className="cml"><div className="cmll">Traditional</div><div className="cmlv">Tool-dependent</div></div><div className="cml hl"><div className="cmll">360 Airo</div><div className="cmlv">Built to scale</div></div></div></div>
              </div>
              <div className="ccta"><button className="btn-primary">Book a Call</button></div>
            </div>
          </section>
        </div>

        <div id="section-trusted">
          <section className="svs" id="svid">
            <div className="svss">
              <div className="ehl">
                <h2>Trusted by Sales Teams Worldwide</h2>
                <p>Teams use 360Airo to run multichannel outreach with real-time visibility.</p>
              </div>
              <img id="sfr" src="earth-bg.jpg" alt="Earth" />
            </div>
          </section>
        </div>

        <div id="section-mobile">
          <section className="ms">
            <div className="mi">
              <div className="section-tag" data-anim="up">MOBILE READY</div>
              <h2 data-anim="up" style={{fontFamily: '"Outfit",sans-serif', fontWeight: 700, fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-1.5px', marginBottom: 16}}>Streamline your outreach<br />from anywhere</h2>
              <p className="msub" data-anim="up">Monitor campaigns, respond to leads, approve sequences — from the 360Airo mobile app.</p>
              <div className="pd" data-anim="up">
                <div className="mp">
                  <div className="nt" />
                  <div className="mu">
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0', fontSize: 12, fontWeight: 700}}><span className="mld" /> 360Airo Live</div>
                    <div className="mr"><span className="ml">Open Rate</span><span className="mv" style={{color: '#34D399'}}>47%</span></div>
                    <div className="mr"><span className="ml">Replies</span><span className="mv">+24</span></div>
                    <div className="mr"><span className="ml">Meetings</span><span className="mv">8</span></div>
                  </div>
                </div>
                <div className="mp">
                  <div className="nt" />
                  <div className="mu">
                    <div style={{padding: '8px 0', fontSize: 12, fontWeight: 700, color: '#60A5FA'}}>Sequences</div>
                    <div className="mr"><span className="ml">Active</span><span className="mv" style={{color: '#34D399'}}>12</span></div>
                    <div className="mr"><span className="ml">Leads</span><span className="mv">1,208</span></div>
                    <div className="mr"><span className="ml">Pipeline</span><span className="mv" style={{color: '#34D399'}}>$2.4M</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="section-analytics">
          <section className="as">
            <img className="abg" src="analytics-bg.jpg" alt="" />
            <div className="aov" />
            <div className="act" data-anim="left">
              <h2>Build, Analyse and Track your data in real time</h2>
              <p>Track outreach performance, engagement trends, and deal progression through a unified analytics view.</p>
            </div>
          </section>
        </div>

        <div id="section-pricing">
          <section className="cban">
            <div className="cin" data-anim="scale">
              <h2>Ready to supercharge your outreach?</h2>
              <p>Join 4,200+ teams already using 360Airo.</p>
              <button className="btn-primary">Start Free Trial <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14m-6-6l6 6-6 6" /></svg></button>
            </div>
          </section>
          <footer>
            <div className="fg">
              <div className="fb">
                <div className="nav-logo-fallback" style={{fontSize: 24}}><span style={{color: '#3B82F6'}}>360</span>Airo</div>
                <p>AI-powered multichannel sales outreach. Discover prospects, start conversations, close more deals.</p>
              </div>
              <div className="fc">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">Integrations</a>
              </div>
              <div className="fc">
                <h4>Solutions</h4>
                <a href="#">For SDRs</a>
                <a href="#">For Agencies</a>
                <a href="#">For Founders</a>
              </div>
              <div className="fc">
                <h4>Resources</h4>
                <a href="#">Blog</a>
                <a href="#">Docs</a>
                <a href="#">Case Studies</a>
              </div>
              <div className="fc">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>
            <div className="fbot">
              <p>© 2024 360Airo. All rights reserved.</p>
              <div className="fsc">
                <a href="#">𝕏</a>
                <a href="#">in</a>
                <a href="#">▶</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}