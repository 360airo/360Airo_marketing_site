// @ts-nocheck
"use client";
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initAnimations } from '../../animations';
import Navbar from '../../components/Navbar';
import FeaturesDashboardMockup from '../../components/FeaturesDashboardMockup';

export default function FeaturesPage() {
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const tabletMotionRef = useRef(null);
  const heroTabletRef = useRef(null);
  const tabletScreenRef = useRef(null);
  const dashboardUiRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx;

    const initTimeline = () => {
      ctx = gsap.context(() => {
        let mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const shell = tabletMotionRef.current;
          if (!shell) return;

          // Clear previous GSAP properties to get pristine layout values
          gsap.set(shell, { clearProps: "all" });
          if (heroTabletRef.current) gsap.set(heroTabletRef.current, { clearProps: "all" });
          if (tabletScreenRef.current) gsap.set(tabletScreenRef.current, { clearProps: "all" });
          gsap.set(".tablet-camera, .tablet-side-dot", { clearProps: "all" });

          const initialWidth = shell.offsetWidth;
          const initialHeight = shell.offsetHeight;
          const startScale = (tabletScreenRef.current?.offsetWidth || 632) / 1600;

          gsap.set(shell, {
            xPercent: 0,
            yPercent: -50,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "center center",
            width: initialWidth,
            height: initialHeight,
            aspectRatio: "auto"
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: heroStageRef.current,
              start: "top top",
              end: "+=1800",
              scrub: 1.15,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          timeline
            .addLabel("heroExit")
            .to(heroContentRef.current, {
              opacity: 0,
              duration: 1.2,
              ease: "none"
            }, "heroExit")
            .addLabel("tabletMorph", "heroExit+=0.2")
            .to(shell, {
              top: "86px",
              right: "0%",
              yPercent: 0,
              width: "100vw",
              height: "calc(100vh - 86px)",
              duration: 2.8,
              ease: "none"
            }, "tabletMorph")
            .to(heroTabletRef.current, {
              borderRadius: 0,
              borderWidth: 0,
              boxShadow: "none",
              duration: 2.8,
              ease: "none"
            }, "tabletMorph")
            .to(tabletScreenRef.current, {
              inset: 0,
              borderRadius: 0,
              duration: 2.8,
              ease: "none"
            }, "tabletMorph")
            .to(".tablet-camera, .tablet-side-dot", {
              opacity: 0,
              duration: 1.5,
              ease: "none"
            }, "tabletMorph");

          // Enable pointer events on the iframe ONLY when zoomed in (progress >= 0.98)
          // and update its local scale CSS variable
          timeline.eventCallback("onUpdate", () => {
            const progress = timeline.progress();
            const iframe = document.querySelector('.tablet-screen-mask iframe') as HTMLIFrameElement;
            if (iframe) {
              if (progress >= 0.98) {
                iframe.style.pointerEvents = 'auto';
              } else {
                iframe.style.pointerEvents = 'none';
              }

              const currentScale = startScale + progress * (1.0 - startScale);
              iframe.style.setProperty('--iframe-scale', currentScale.toString());
            }
          });
        });
      });
    };

    if (document.readyState === 'complete') {
      initTimeline();
    } else {
      const handleLoad = () => {
        initTimeline();
      };
      window.addEventListener('load', handleLoad);
      ctx = { revert: () => window.removeEventListener('load', handleLoad) };
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
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
        <Navbar activeTab="features" />
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
                        <FeaturesDashboardMockup />
                      </div>
                    </div>{/* closes tablet-screen-mask */}
                  </div>{/* closes hero-dashboard-tablet */}
                </div>{/* closes tablet-motion-shell */}
              </div>{/* closes future-transition-layer */}
            </div>{/* closes hero-scene */}
          </section>
        </div>{/* /#section-home */}
      </div>
    </div>
  );
}

