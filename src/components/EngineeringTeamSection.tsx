// @ts-nocheck
"use client";
import React, { useEffect, useRef } from 'react';
import '../styles/EngineeringTeamSection.css';

export default function EngineeringTeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="section-engineering" ref={sectionRef}>
      <div className="eng-container">
        <h2 className="eng-heading">Replace your Engineering Team</h2>

        <div className="eng-bento">
          {/* ========================================================
              CARD 1 - LEFT BLACK
             ======================================================== */}
          <div className="eng-card eng-card-left theme-dark anim-stagger" style={{ animationDelay: '0s' }}>
            <div className="card-top-visual card-browser-visual">
              <div className="browser-mockup">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="browser-search-bar"></div>
                  <div className="browser-menu-lines">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="browser-body">
                  <div className="skeleton-line full"></div>
                  <div className="skeleton-line full"></div>
                  <div className="skeleton-line medium center"></div>
                  <div className="skeleton-dots">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <div className="skeleton-box">
                    <svg className="loading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bottom-content">
              <h3>Design and Development</h3>
              <p>Designed to perfection, Aceternity helps you take your dream idea to reality through our expert design and development services.</p>
              <button className="eng-cta-btn">
                <div className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z"/>
                  </svg>
                </div>
                View pricing
              </button>
            </div>
          </div>

          {/* ========================================================
              CARD 2 - MIDDLE TOP WHITE
             ======================================================== */}
          <div className="eng-card eng-card-mid-top theme-light anim-stagger" style={{ animationDelay: '0.1s' }}>
            <div className="card-top-content">
              <h3>Regular updates and<br />progress tracking</h3>
            </div>
            <div className="donut-visual-container">
              <div className="donut-chart"></div>
            </div>
            <div className="notifications-container">
              <div className="notif-card card-bg-3"></div>
              <div className="notif-card card-bg-2"></div>
              <div className="notif-card card-front">
                <span className="notif-label">notification</span>
                <div className="notif-text">HOTFIX: update design</div>
                <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 3 - RIGHT TOP BLACK
             ======================================================== */}
          <div className="eng-card eng-card-right-top theme-dark anim-stagger" style={{ animationDelay: '0.2s' }}>
            <div className="card-top-content z-10">
              <h3>Hosting, Deployment & Maintenance</h3>
            </div>
            <div className="map-visual">
              {/* Abstract Map Nodes Container */}
              <div className="map-nodes">
                <div className="node node-avatar n1"></div>
                <div className="node node-server n2">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                <div className="node node-avatar n3"></div>
                <div className="node node-server n4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                <div className="node node-avatar n5"></div>
                <div className="node node-avatar n6"></div>
                <div className="node node-server n7">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                
                {/* Connecting lines */}
                <svg className="map-lines" viewBox="0 0 500 300" preserveAspectRatio="none">
                  <path className="connecting-line" d="M80 80 Q 200 120 280 180" />
                  <path className="connecting-line" d="M350 70 Q 300 130 280 180" />
                  <path className="connecting-line" d="M420 100 Q 350 150 280 180" />
                </svg>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 4 - MIDDLE BOTTOM WHITE
             ======================================================== */}
          <div className="eng-card eng-card-mid-bot theme-light anim-stagger" style={{ animationDelay: '0.3s' }}>
            <div className="card-top-content z-10">
              <h3>Get found on Google</h3>
            </div>
            
            {/* Background Grid */}
            <div className="google-bg-grid">
              <div className="grid-cell line-pink"></div>
              <div className="grid-cell line-pink"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell"></div>
              <div className="grid-cell line-pink"></div>
              <div className="grid-cell"></div>
            </div>

            <div className="google-ui-container">
              <div className="google-search-bar">
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="search-text">Best GTM tools for business operations</span>
                <svg className="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>

              <div className="google-results-stack">
                <div className="result-card bg-card-2"></div>
                <div className="result-card main-result-card">
                  <div className="res-header">
                    <div className="res-icon">
                       <svg viewBox="0 0 24 24" fill="#fff"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <div className="res-brand">
                      <div className="res-title">Acme.io</div>
                      <div className="res-url">www.acme.io &gt; outbound &gt; sales</div>
                    </div>
                  </div>
                  <div className="res-desc">All in one outbound platform</div>
                  <div className="res-skeleton">
                    <div className="skel-line"></div>
                    <div className="skel-line short"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 5 - RIGHT BOTTOM WHITE
             ======================================================== */}
          <div className="eng-card eng-card-right-bot theme-light anim-stagger" style={{ animationDelay: '0.4s' }}>
            <div className="card-top-content z-10">
              <h3>Components, Dashboards and<br />Everything else</h3>
            </div>
            
            <div className="circuit-visual">
              <svg className="circuit-lines" viewBox="0 0 300 300">
                <path d="M0 150 H150 L180 180 H300" className="c-line" />
                <path d="M0 200 H120 L150 230 H300" className="c-line" />
                <path d="M50 300 V250 L100 200 H150" className="c-line" />
                <path d="M250 0 V100 L200 150 H150" className="c-line" />
                <path d="M300 80 H220 L180 120" className="c-line highlight" />
                <path d="M0 250 H80 L120 210 H180" className="c-line highlight" />
              </svg>
              <div className="orange-chip"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
