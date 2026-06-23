// @ts-nocheck
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initAnimations } from '../../animations';
import Navbar from '../../components/Navbar';
import FeaturesDashboardMockup from '../../components/FeaturesDashboardMockup';

export default function FeaturesPage() {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const tabletMotionRef = useRef(null);
  const heroTabletRef = useRef(null);
  const tabletScreenRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx;

    const initTimeline = () => {
      if (!interactiveMode) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const shell = tabletMotionRef.current;
          if (!shell) return;

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
            aspectRatio: "auto",
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
              invalidateOnRefresh: true,
            },
          });

          timeline
            .addLabel("heroExit")
            .to(heroContentRef.current, {
              opacity: 0,
              duration: 1.2,
              ease: "none",
            }, "heroExit")
            .addLabel("tabletMorph", "heroExit+=0.2")
            .to(shell, {
              top: "86px",
              right: "0%",
              yPercent: 0,
              width: "100vw",
              height: "calc(100vh - 86px)",
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(heroTabletRef.current, {
              borderRadius: 0,
              borderWidth: 0,
              boxShadow: "none",
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(tabletScreenRef.current, {
              inset: 0,
              borderRadius: 0,
              duration: 2.8,
              ease: "none",
            }, "tabletMorph")
            .to(".tablet-camera, .tablet-side-dot", {
              opacity: 0,
              duration: 1.5,
              ease: "none",
            }, "tabletMorph");

          timeline.eventCallback("onUpdate", () => {
            const progress = timeline.progress();
            const iframe = document.querySelector('.tablet-screen-mask iframe') as HTMLIFrameElement;
            if (!iframe) return;

            iframe.style.pointerEvents = progress >= 0.98 ? 'auto' : 'none';
            iframe.style.setProperty('--iframe-scale', String(startScale + progress * (1 - startScale)));
          });
        });
      });
    };

    if (document.readyState === 'complete') {
      initTimeline();
    } else {
      const handleLoad = () => initTimeline();
      window.addEventListener('load', handleLoad);
      ctx = { revert: () => window.removeEventListener('load', handleLoad) };
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === heroStageRef.current) trigger.kill();
      });
      if (tabletMotionRef.current) gsap.set(tabletMotionRef.current, { clearProps: "all" });
      if (heroTabletRef.current) gsap.set(heroTabletRef.current, { clearProps: "all" });
      if (tabletScreenRef.current) gsap.set(tabletScreenRef.current, { clearProps: "all" });
    };
  }, [interactiveMode]);

  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="app-container">
      <canvas id="aurora-canvas" />
      <canvas id="aurora-light-canvas" />
      <Navbar activeTab="features" />

      <div id="section-home">
        <section className={`hero-stitch-stage ${interactiveMode ? 'is-interactive' : 'is-static'}`} ref={heroStageRef}>
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
                  <span className="title-line">Everything You</span>
                  <span className="title-line">Need to <em className="title-accent">Power</em></span>
                  <span className="title-line">Outreach</span>
                </h1>
                <p className="hero-desc">Our platform brings together every tool modern sales and marketing teams need to plan, personalize, and automate outreach that actually converts.</p>
                <div className="hero-actions">
                  <button
                    className={`hero-btn-primary ${interactiveMode ? 'is-active' : ''}`}
                    type="button"
                    aria-pressed={interactiveMode}
                    onClick={() => setInteractiveMode((current) => !current)}
                  >
                    Interactive Mode
                  </button>
                </div>

                <div className="hero-metrics">
                  <MetricCard tone="metric-blue" value="3.2x" label="Average Reply Rate Lift" growth="+32% vs industry average" />
                  <MetricCard tone="metric-cyan" value="4,200+" label="Campaigns Launched" growth="+24% vs last 90 days" />
                  <MetricCard tone="metric-purple" value="89%" label="Customer Retention" growth="+7% vs last 90 days" />
                </div>
              </div>
              <div className="hero-visual"></div>
            </section>

            <div className="future-transition-layer" aria-hidden={!interactiveMode}>
              <div ref={tabletMotionRef} className="tablet-motion-shell">
                <div ref={heroTabletRef} className="hero-dashboard-tablet">
                  <div className="tablet-camera" />
                  <div className="tablet-side-dot tablet-left" />
                  <div className="tablet-side-dot tablet-right" />
                  <div ref={tabletScreenRef} className="tablet-screen-mask">
                    <div className="hero-dashboard-ui">
                      <FeaturesDashboardMockup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

function MetricCard({ tone, value, label, growth }) {
  return (
    <div className={`hero-stat-card ${tone}`}>
      <div className="metric-top">
        <div className="metric-icon"></div>
        <div className="metric-stats">
          <span className="metric-value">{value}</span>
          <div className="metric-label">{label}</div>
        </div>
      </div>
      <div className="metric-growth"><span>{growth}</span></div>
    </div>
  );
}
