// @ts-nocheck
"use client";
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';   //nihal

import { initAnimations } from '../animations';
import EngineeringTeamSection from '../components/EngineeringTeamSection';
import TrustedOperatorsSection from '../components/TrustedOperatorsSection';
import LaunchFasterSection from '../components/LaunchFasterSection';
import ImportEnrichmentSection from '../components/ImportEnrichmentSection';
import AiroAgentBuilder from '../components/AiroAgentBuilder';
import FunnelStagesSection from '../components/FunnelStagesSection';
import OutreachDeploySection from '../components/OutreachDeploySection';
import TestimonialsSection from '../components/TestimonialsSection';
import OutreachBentoSection from '../components/OutreachBentoSection';

import PhoneDashboard from '../components/PhoneDashboard';
import ModernOutreachSection from '../components/ModernOutreachSection';
import Navbar from '../components/Navbar';
import DashboardMockup from '../components/DashboardMockup';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
export default function App() {
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const tabletMotionRef = useRef(null);
  const phoneDashboardRef = useRef(null);
  const heroTabletRef = useRef(null);
  const tabletScreenRef = useRef(null);
  const dashboardUiRef = useRef(null);
  const futureTabletContentRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx;

    const getViewportScreenCoverScale = () => {
      const screen = tabletScreenRef.current;
      if (!screen) return 1.5;
      const baseScreenWidth = screen.offsetWidth || 680;
      const baseScreenHeight = screen.offsetHeight || 460;
      const scaleX = window.innerWidth / baseScreenWidth;
      const scaleY = window.innerHeight / baseScreenHeight;
      return Math.max(scaleX, scaleY) * 1.14;
    };

    const updateScaledWidth = () => {
      const scale = getViewportScreenCoverScale();
      if (futureTabletContentRef.current) {
        const scaledViewportWidth = window.innerWidth / scale;
        futureTabletContentRef.current.style.setProperty('--scaled-viewport-width', `${scaledViewportWidth}px`);
      }
    };

    const initTimeline = () => {
      ctx = gsap.context(() => {
        let mm = gsap.matchMedia();
        
        // --- DESKTOP ANIMATION ---
        mm.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
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
              end: "+=1130",
              scrub: 1.15,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            },
            onUpdate: function() {
              const currentScale = parseFloat(gsap.getProperty(tabletMotionRef.current, "scaleX") as string) || 1;
              if (futureTabletContentRef.current) {
                const inverseScale = 1 / currentScale;
                futureTabletContentRef.current.style.setProperty('--tablet-scale-inverse', inverseScale.toString());
              }
            }
          });

          timeline
            .addLabel("heroExit")
            .to(heroContentRef.current, { opacity: 0, y: -50, duration: 1, ease: "none" }, "heroExit")
            .to(dashboardUiRef.current, { opacity: 0, scale: 0.96, filter: "blur(4px)", duration: 1, ease: "none" }, "heroExit")
            .addLabel("futureTitleEnter", "heroExit+=0.35")
            .to(futureTabletContentRef.current, { autoAlpha: 1, opacity: 0.65, duration: 0.55, ease: "none" }, "futureTitleEnter")
            .addLabel("futureTitleCrisp", "futureTitleEnter+=0.4")
            .to(futureTabletContentRef.current, { opacity: 1, duration: 0.65, ease: "none" }, "futureTitleCrisp")
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
            }, "tabletZoomToViewport")
            .to(phoneDashboardRef.current, { opacity: 1, duration: 1.98, ease: "none" }, 2.97);
        });

        // --- MOBILE ANIMATION ---
        mm.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.set(tabletMotionRef.current, {
            xPercent: 0,
            yPercent: 0,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "center center"
          });
          // Disabled scroll animation for mobile/tablet per user request
        });
      });
    };

    if (document.readyState === 'complete') {
      initTimeline();
      updateScaledWidth();
    } else {
      const handleLoad = () => {
        initTimeline();
        updateScaledWidth();
      };
      window.addEventListener('load', handleLoad);
      ctx = { revert: () => window.removeEventListener('load', handleLoad) };
    }

    window.addEventListener('resize', updateScaledWidth, { passive: true });

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
      window.removeEventListener('resize', updateScaledWidth);
    };
  }, []);
  useEffect(() => {
    initAnimations();
  }, []);
  return (
    <div className="app-container">
      <div>   
  <canvas id="aurora-canvas" />
  <canvas id="aurora-light-canvas" />
        <Navbar activeTab="home" />
  <div id="section-home">
    <section className="hero-stitch-stage" ref={heroStageRef}>
      <div className="hero-scene">
    <div className="hero-diagonal-bg" aria-hidden="true">
      <span className="hero-panel panel-1"></span>
      <span className="hero-panel panel-2"></span>
      <span className="hero-panel panel-3"></span>
      <span className="hero-panel panel-4"></span>
      <span className="hero-panel panel-5"></span>
      <span className="hero-glow glow-1"></span>
      <span className="hero-glow glow-2"></span>
    </div>
    <section className="hero">
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
            <div className="metric-growth"><span>↗ <strong>32%</strong></span> vs industry average</div>
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
            <div className="metric-growth"><span>↗ <strong>24%</strong></span> vs last 90 days</div>
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
            <div className="metric-growth"><span>↗ <strong>7%</strong></span> vs last 90 days</div>
          </div>
        </div>{/* /.hero-metrics */}
      </div>{/* /.hero-copy */}
        {/* RIGHT VISUAL: TABLET MOCKUP */}
        <div className="hero-visual"></div>
      </section>

                  <div className="future-transition-layer" aria-hidden="true">
        <div ref={tabletMotionRef} className="tablet-motion-shell">
          <div ref={heroTabletRef} className="hero-dashboard-tablet">
            <div className="tablet-camera" />
            <div className="tablet-side-dot tablet-left" />
            <div className="tablet-side-dot tablet-right" />
            <div ref={tabletScreenRef} className="tablet-screen-mask">
              <div ref={dashboardUiRef} className="hero-dashboard-ui">
                <DashboardMockup />
              </div>

              <div ref={futureTabletContentRef} className="future-tablet-content">
                <h2 style={{ width: '100%', margin: 0 }}>
                  <span>THE FUTURE</span>
                  <span>OF</span>
                  <span>OUTREACH</span>
                </h2>
              </div>
            </div>{/* closes tablet-screen-mask */}
          </div>{/* closes hero-dashboard-tablet */}
        </div>{/* closes tablet-motion-shell */}
        <div ref={phoneDashboardRef} className="viewport-phone-dashboard-wrapper">
          <PhoneDashboard />
        </div>
      </div>{/* closes future-transition-layer */}
      </div>{/* closes hero-scene */}
    </section>
  </div>{/* closes section-home */}

  <div id="section-phone">
    <section className="p2-hero">
      <div className="hero-main">
        <div className="hero-center">
          <h1 className="hero-headline">
            <span className="headline-line">
              <span className="headline-inner revealed">THE FUTURE</span>
            </span>
            <span className="headline-line line2">
              <span className="headline-inner revealed">OF</span>
            </span>
            <span className="headline-line">
              <span className="headline-inner revealed">OUTREACH</span>
            </span>
          </h1>
        </div>
        <div className="hero-right">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <PhoneDashboard style={{ width: '100%', maxWidth: '360px' }} />
          </div>
        </div>
      </div>
    </section>
  </div>

  <TrustedOperatorsSection />
  <ModernOutreachSection />
  <AiroAgentBuilder />
  <div id="section-trusted-startups">
    <section className="trusted-startups-inner">
      <div className="trusted-startups-eyebrow" data-anim="up">TRUSTED BY FAST-GROWING STARTUPS</div>
      <div className="logo-marquee-container" style={{ marginTop: '20px', paddingBottom: '60px' }}>
        <div className="logo-marquee-track" style={{ animationDuration: '50s' }}>
          {/* Set 1 */}
          <div className="startup-logo logo-heavy" style={{color: '#FF5A5F'}}><svg viewBox="0 0 24 24"><path d="M4 12 L12 4 L20 12 L12 20 Z" fill="currentColor" /></svg>softr</div>
          <div className="startup-logo logo-wide" style={{color: '#00A699'}}><svg viewBox="0 0 24 24"><rect x={4} y={4} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={2} fill="none" /><path d="M9 12 L15 12 M12 9 L12 15" stroke="currentColor" strokeWidth={2} /></svg>Get hired</div>
          <div className="startup-logo" style={{color: '#FC642D'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={8} fill="currentColor" /><circle cx={12} cy={12} r={3} fill="#F7F7F5" /></svg>Alice. Tech</div>
          <div className="startup-logo logo-light" style={{color: '#29B6F6'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 L10 18 M14 18 L18 18 L18 6" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>rtackradar</div>
          <div className="startup-logo logo-heavy" style={{color: '#AB47BC'}}><svg viewBox="0 0 24 24"><path d="M4 12 h16 M4 6 h12 M4 18 h12" stroke="currentColor" strokeWidth={3} fill="none" /></svg>firma.dev</div>
          <div className="startup-logo logo-light" style={{color: '#EF5350'}}>Pond</div>
          <div className="startup-logo logo-light logo-wide" style={{color: '#FFA726'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2 3" /></svg>Lofty</div>
          <div className="startup-logo" style={{color: '#66BB6A'}}><svg viewBox="0 0 24 24"><path d="M4 12 Q12 4 20 12" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" /></svg>Tap Hero</div>
          <div className="startup-logo logo-heavy" style={{color: '#5C6BC0'}}><svg viewBox="0 0 24 24"><path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth={3} /></svg>Exposr</div>
          <div className="startup-logo logo-wide" style={{color: '#EC407A'}}><svg viewBox="0 0 24 24"><rect x={3} y={8} width={12} height={8} fill="currentColor" /><polygon points="15,12 21,8 21,16" fill="currentColor" /></svg>sendr</div>
          <div className="startup-logo logo-light logo-serif" style={{color: '#26A69A'}}>Agent Arena</div>
          <div className="startup-logo logo-large" style={{color: '#7E57C2'}}>Nanonets</div>
          <div className="startup-logo logo-serif logo-large" style={{color: '#42A5F5'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} fill="currentColor" /><circle cx={16} cy={8} r={4} fill="#F7F7F5" /></svg>sleek analytics</div>
          <div className="startup-logo" style={{color: '#FFCA28'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 M18 6 L18 18 M6 12 L18 12" stroke="currentColor" strokeWidth={4} /></svg>squidhub</div>
          <div className="startup-logo logo-heavy" style={{color: '#D4E157'}}><svg viewBox="0 0 24 24"><path d="M4 10 Q12 2 20 10 L20 14 Q12 22 4 14 Z" fill="currentColor" /></svg>cubeone</div>
          <div className="startup-logo logo-light" style={{color: '#008489'}}><svg viewBox="0 0 24 24"><path d="M4 12 h16 M4 6 h12 M4 18 h12" stroke="currentColor" strokeWidth={3} fill="none" /></svg>Browseract</div>
          <div className="startup-logo logo-wide" style={{color: '#F06292'}}><svg viewBox="0 0 24 24"><rect x={3} y={8} width={12} height={8} fill="currentColor" /><polygon points="15,12 21,8 21,16" fill="currentColor" /></svg>oxlo.ai</div>
          <div className="startup-logo logo-serif" style={{color: '#5D4037'}}>brew</div>
          {/* Set 2 Duplicate */}
          <div className="startup-logo logo-heavy" style={{color: '#FF5A5F'}}><svg viewBox="0 0 24 24"><path d="M4 12 L12 4 L20 12 L12 20 Z" fill="currentColor" /></svg>softr</div>
          <div className="startup-logo logo-wide" style={{color: '#00A699'}}><svg viewBox="0 0 24 24"><rect x={4} y={4} width={16} height={16} rx={2} stroke="currentColor" strokeWidth={2} fill="none" /><path d="M9 12 L15 12 M12 9 L12 15" stroke="currentColor" strokeWidth={2} /></svg>Get hired</div>
          <div className="startup-logo" style={{color: '#FC642D'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={8} fill="currentColor" /><circle cx={12} cy={12} r={3} fill="#F7F7F5" /></svg>Alice. Tech</div>
          <div className="startup-logo logo-light" style={{color: '#29B6F6'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 L10 18 M14 18 L18 18 L18 6" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>rtackradar</div>
          <div className="startup-logo logo-heavy" style={{color: '#AB47BC'}}><svg viewBox="0 0 24 24"><path d="M4 12 h16 M4 6 h12 M4 18 h12" stroke="currentColor" strokeWidth={3} fill="none" /></svg>firma.dev</div>
          <div className="startup-logo logo-light" style={{color: '#EF5350'}}>Pond</div>
          <div className="startup-logo logo-light logo-wide" style={{color: '#FFA726'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2 3" /></svg>Lofty</div>
          <div className="startup-logo" style={{color: '#66BB6A'}}><svg viewBox="0 0 24 24"><path d="M4 12 Q12 4 20 12" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" /></svg>Tap Hero</div>
          <div className="startup-logo logo-heavy" style={{color: '#5C6BC0'}}><svg viewBox="0 0 24 24"><path d="M12 2 L22 12 L12 22 L2 12 Z" fill="none" stroke="currentColor" strokeWidth={3} /></svg>Exposr</div>
          <div className="startup-logo logo-wide" style={{color: '#EC407A'}}><svg viewBox="0 0 24 24"><rect x={3} y={8} width={12} height={8} fill="currentColor" /><polygon points="15,12 21,8 21,16" fill="currentColor" /></svg>sendr</div>
          <div className="startup-logo logo-light logo-serif" style={{color: '#26A69A'}}>Agent Arena</div>
          <div className="startup-logo logo-large" style={{color: '#7E57C2'}}>Nanonets</div>
          <div className="startup-logo logo-serif logo-large" style={{color: '#42A5F5'}}><svg viewBox="0 0 24 24"><circle cx={12} cy={12} r={9} fill="currentColor" /><circle cx={16} cy={8} r={4} fill="#F7F7F5" /></svg>sleek analytics</div>
          <div className="startup-logo" style={{color: '#FFCA28'}}><svg viewBox="0 0 24 24"><path d="M6 6 L6 18 M18 6 L18 18 M6 12 L18 12" stroke="currentColor" strokeWidth={4} /></svg>squidhub</div>
          <div className="startup-logo logo-heavy" style={{color: '#D4E157'}}><svg viewBox="0 0 24 24"><path d="M4 10 Q12 2 20 10 L20 14 Q12 22 4 14 Z" fill="currentColor" /></svg>cubeone</div>
          <div className="startup-logo logo-light" style={{color: '#008489'}}><svg viewBox="0 0 24 24"><path d="M4 12 h16 M4 6 h12 M4 18 h12" stroke="currentColor" strokeWidth={3} fill="none" /></svg>Browseract</div>
          <div className="startup-logo logo-wide" style={{color: '#F06292'}}><svg viewBox="0 0 24 24"><rect x={3} y={8} width={12} height={8} fill="currentColor" /><polygon points="15,12 21,8 21,16" fill="currentColor" /></svg>oxlo.ai</div>
          <div className="startup-logo logo-serif" style={{color: '#5D4037'}}>brew</div>
        </div>
      </div>
    </section>
  </div>
  <LaunchFasterSection />
  <ImportEnrichmentSection />
  <EngineeringTeamSection />
  <FunnelStagesSection />
  <OutreachDeploySection />
  <TestimonialsSection />
  {/* <OutreachBentoSection /> */}

  <CTASection />
  <FAQSection />
  <div id="section-pricing" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
    <Footer />
  </div>
</div>


    </div>
  );
}
