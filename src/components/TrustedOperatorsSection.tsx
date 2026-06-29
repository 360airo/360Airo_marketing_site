// @ts-nocheck
"use client";
import React, { useEffect, useRef } from 'react';
import '../styles/TrustedOperatorsSection.css';

export default function TrustedOperatorsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    function animateCounters(container) {
      const counters = container.querySelectorAll('.to-counter');
      counters.forEach((counter) => {
        const target = parseFloat(counter.dataset.target || "0");
        const decimals = parseInt(counter.dataset.decimals || "0", 10);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";
        const duration = 2000;
        
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = target * easedProgress;

          const formatted = currentValue.toFixed(decimals);
          counter.textContent = prefix + formatted + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = prefix + target.toFixed(decimals) + suffix;
          }
        }
        requestAnimationFrame(updateCounter);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('to-visible');
            if (!entry.target.dataset.animated) {
              entry.target.dataset.animated = "true";
              animateCounters(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="trusted-operators-section" ref={sectionRef}>
      <div className="trusted-operators-container">
        
        {/* STATS CARD */}
        <div className="trusted-stats-card">
          <article className="trusted-stat-item" style={{ transitionDelay: '0s' }}>
            <strong className="to-counter" data-target="6.5" data-decimals="1" data-suffix="M+">0.0M+</strong>
            <span>Emails sent / month</span>
          </article>
          <div className="trusted-divider"></div>
          
          <article className="trusted-stat-item" style={{ transitionDelay: '0.08s' }}>
            <strong className="to-counter" data-target="13.6" data-decimals="1" data-suffix="M+">0.0M+</strong>
            <span>Prospects contacted / month</span>
          </article>
          <div className="trusted-divider"></div>

          <article className="trusted-stat-item" style={{ transitionDelay: '0.16s' }}>
            <strong className="to-counter" data-target="5" data-decimals="0" data-prefix="$" data-suffix="M+">$0M+</strong>
            <span>Pipeline generated / month</span>
          </article>
          <div className="trusted-divider"></div>

          <article className="trusted-stat-item" style={{ transitionDelay: '0.24s' }}>
            <strong className="to-counter" data-target="1.25" data-decimals="2" data-prefix="$" data-suffix="M+">$0.00M+</strong>
            <span>Revenue generated / month</span>
          </article>
        </div>

        {/* TRUST COPY */}
        <div className="trusted-copy">
          <p>Trusted by modern operators across industries.</p>
          <span>From pilot to scale without chaos.</span>
        </div>

        {/* LOGO GRID CONTAINER */}
        <div className="trusted-logo-grid-container">
          <div className="trusted-logo-grid">
            {/* HubSpot */}
            <div className="custom-logo logo-hubspot">
              <svg viewBox="0 0 24 24" fill="#FF7A59" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><path d="M21.2 11.2c-1-.2-1.9.4-2.1 1.4L17 12.3c0-.1 0-.3.1-.4.5-.9.4-2.1-.3-2.9-.8-.9-2.1-.9-3 0l-1.3-1.3c.7-1 .5-2.4-.6-3.1-1-.7-2.4-.5-3.1.6-.7 1.1-.4 2.4.6 3.1.5.3 1.1.4 1.6.3l1.3 1.3c-.9.8-1 2.2-.1 3.1.8.9 2.1.9 3 0l2.1.3c.1.7.6 1.3 1.3 1.5.9.3 2-.2 2.3-1.2.3-.9-.2-2-1.2-2.3zm-14.8-6c.5 0 .9.4 .9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm6.6 9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm0-4.8c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#FF7A59', letterSpacing: '-0.5px'}}>HubSpot</span>
            </div>

            {/* Salesforce */}
            <div className="custom-logo logo-salesforce">
              <svg viewBox="0 0 24 24" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg" style={{width: 24, height: 24}}><path d="M20.2 11.5c.2-.5.3-1.1.3-1.7 0-2.8-2.3-5-5.1-5-.6 0-1.2.1-1.7.3C12.8 3.5 11 2.5 9 2.5c-3.1 0-5.7 2.3-6 5.3C1.3 8.3.5 9.8.5 11.5c0 2.5 1.8 4.6 4.3 5h15.4c2.5-.4 4.3-2.5 4.3-5 0-1.7-.8-3.2-2.3-3.7z"/></svg>
              <span style={{fontWeight: 800, fontSize: '18px', color: '#00A1E0', letterSpacing: '-0.5px', textTransform: 'lowercase'}}>salesforce</span>
            </div>

            {/* Zoho */}
            <div className="custom-logo logo-zoho">
              <div className="zoho-blocks" style={{display: 'flex', gap: 2, marginRight: 2}}><span style={{width: 8, height: 8, background: '#E02626'}}></span><span style={{width: 8, height: 8, background: '#2B8FE0'}}></span><span style={{width: 8, height: 8, background: '#F5A623'}}></span><span style={{width: 8, height: 8, background: '#3CA528'}}></span></div>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#333', letterSpacing: '1px'}}>ZOHO</span>
            </div>

            {/* Pipedrive */}
            <div className="custom-logo logo-pipedrive">
              <svg viewBox="0 0 24 24" fill="#262930" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20, color: '#00B474'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L10.5 16c.45.45 1.08.7 1.5.7.83 0 1.5-.67 1.5-1.5 0-.42-.25-1.05-.7-1.5L9.2 10.1c.83-.45 1.79-.7 2.8-.7 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6z" fill="currentColor"/></svg>
              <span style={{fontWeight: 800, fontSize: '18px', color: '#262930', letterSpacing: '-0.5px'}}>pipedrive</span>
            </div>

            {/* Microsoft Dynamics 365 */}
            <div className="custom-logo logo-dynamics">
              <svg viewBox="0 0 24 24" fill="#0078D4" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/></svg>
              <span style={{fontWeight: 700, fontSize: '18px', color: '#002050', letterSpacing: '-0.5px'}}>Dynamics 365</span>
            </div>

            {/* Freshsales */}
            <div className="custom-logo logo-freshsales">
              <svg viewBox="0 0 24 24" fill="#FF725C" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M12 2C8 2 4 6 4 11c0 3.5 2.5 6.5 6 7.5v3.5l4-2.5V12C14 6 12 2 12 2z"/></svg>
              <span style={{fontWeight: 700, fontSize: '19px', color: '#FF725C', letterSpacing: '-0.5px'}}>Freshsales</span>
            </div>

            {/* Monday Sales CRM */}
            <div className="custom-logo logo-monday">
              <div style={{display: 'flex', gap: '3px'}}>
                <span style={{width: 8, height: 16, background: '#FF3D57', borderRadius: 4}}></span>
                <span style={{width: 8, height: 24, background: '#FFCB00', borderRadius: 4, marginTop: -4}}></span>
                <span style={{width: 8, height: 16, background: '#00CFF4', borderRadius: 4}}></span>
              </div>
              <span style={{fontWeight: 800, fontSize: '20px', color: '#333', letterSpacing: '-0.5px', textTransform: 'lowercase'}}>monday</span>
            </div>

            {/* Insightly */}
            <div className="custom-logo logo-insightly">
              <svg viewBox="0 0 24 24" fill="#F26622" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><circle cx="12" cy="12" r="9" fill="none" stroke="#F26622" strokeWidth="3"/><circle cx="12" cy="12" r="4"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#F26622', letterSpacing: '-0.5px'}}>Insightly</span>
            </div>

            {/* Copper */}
            <div className="custom-logo logo-copper">
              <svg viewBox="0 0 24 24" fill="#FF3366" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M12 2a10 10 0 10 10 10h-3.5a6.5 6.5 0 11-6.5-6.5V2z"/></svg>
              <span style={{fontWeight: 800, fontSize: '20px', color: '#FF3366', letterSpacing: '-0.5px'}}>Copper</span>
            </div>

            {/* Close */}
            <div className="custom-logo logo-close">
              <svg viewBox="0 0 24 24" fill="#3666F6" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M3 4h8l2 2h8v14H3V4z"/></svg>
              <span style={{fontWeight: 800, fontSize: '20px', color: '#3666F6', letterSpacing: '-0.5px'}}>Close</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
