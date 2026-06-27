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

        {/* LOGO MARQUEE CONTAINER */}
        <div className="logo-marquee-container">
          <div className="logo-marquee-track">
            {/* Set 1 */}
            {/* LinkedIn */}
            <div className="custom-logo logo-linkedin">
              <svg viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#0A66C2', letterSpacing: '-0.5px'}}>LinkedIn</span>
            </div>
            
            {/* Twilio */}
            <div className="custom-logo logo-twilio">
              <svg viewBox="0 0 24 24" fill="#F22F46" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.6-9.6 9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm-3.6-13.2c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm7.2 0c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm-7.2 7.2c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm7.2 0c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8z"/></svg>
              <span style={{fontWeight: 800, fontSize: '22px', color: '#F22F46', letterSpacing: '-0.5px'}}>twilio</span>
            </div>

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

            {/* Slack */}
            <div className="custom-logo logo-slack">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.522 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522 2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.78a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.781 10.135a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1 2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.522 2.522v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z" fill="#4A154B"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#4A154B', letterSpacing: '-0.5px'}}>slack</span>
            </div>

            {/* Pipedrive */}
            <div className="custom-logo logo-pipedrive">
              <svg viewBox="0 0 24 24" fill="#262930" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20, color: '#00B474'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L10.5 16c.45.45 1.08.7 1.5.7.83 0 1.5-.67 1.5-1.5 0-.42-.25-1.05-.7-1.5L9.2 10.1c.83-.45 1.79-.7 2.8-.7 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6z" fill="currentColor"/></svg>
              <span style={{fontWeight: 800, fontSize: '18px', color: '#262930', letterSpacing: '-0.5px'}}>pipedrive</span>
            </div>

            {/* Zapier */}
            <div className="custom-logo logo-zapier">
              <svg viewBox="0 0 24 24" fill="#FF4F00" xmlns="http://www.w3.org/2000/svg" style={{width: 18, height: 18}}><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="12" r="4" fill="white"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#FF4F00', letterSpacing: '-0.5px'}}>zapier</span>
            </div>

            {/* Set 2 (Duplicates for seamless loop) */}
            {/* LinkedIn */}
            <div className="custom-logo logo-linkedin">
              <svg viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#0A66C2', letterSpacing: '-0.5px'}}>LinkedIn</span>
            </div>
            
            {/* Twilio */}
            <div className="custom-logo logo-twilio">
              <svg viewBox="0 0 24 24" fill="#F22F46" xmlns="http://www.w3.org/2000/svg" style={{width: 22, height: 22}}><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.6-9.6 9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6zm-3.6-13.2c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm7.2 0c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm-7.2 7.2c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm7.2 0c1.0 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8z"/></svg>
              <span style={{fontWeight: 800, fontSize: '22px', color: '#F22F46', letterSpacing: '-0.5px'}}>twilio</span>
            </div>

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

            {/* Slack */}
            <div className="custom-logo logo-slack">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20}}><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.522 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522 2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.78a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.781 10.135a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1 2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.522 2.522v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z" fill="#4A154B"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#4A154B', letterSpacing: '-0.5px'}}>slack</span>
            </div>

            {/* Pipedrive */}
            <div className="custom-logo logo-pipedrive">
              <svg viewBox="0 0 24 24" fill="#262930" xmlns="http://www.w3.org/2000/svg" style={{width: 20, height: 20, color: '#00B474'}}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L10.5 16c.45.45 1.08.7 1.5.7.83 0 1.5-.67 1.5-1.5 0-.42-.25-1.05-.7-1.5L9.2 10.1c.83-.45 1.79-.7 2.8-.7 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6z" fill="currentColor"/></svg>
              <span style={{fontWeight: 800, fontSize: '18px', color: '#262930', letterSpacing: '-0.5px'}}>pipedrive</span>
            </div>

            {/* Zapier */}
            <div className="custom-logo logo-zapier">
              <svg viewBox="0 0 24 24" fill="#FF4F00" xmlns="http://www.w3.org/2000/svg" style={{width: 18, height: 18}}><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="12" r="4" fill="white"/></svg>
              <span style={{fontWeight: 700, fontSize: '20px', color: '#FF4F00', letterSpacing: '-0.5px'}}>zapier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
