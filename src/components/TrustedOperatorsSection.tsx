// @ts-nocheck
"use client";
import React, { useEffect, useRef } from 'react';
import '../styles/TrustedOperatorsSection.css';

export default function TrustedOperatorsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('to-visible');
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
          <article className="trusted-stat-item" style={{ animationDelay: '0s' }}>
            <strong>6.5M+</strong>
            <span>Emails sent / month</span>
          </article>
          <div className="trusted-divider"></div>
          
          <article className="trusted-stat-item" style={{ animationDelay: '0.08s' }}>
            <strong>13.6M+</strong>
            <span>Prospects contacted / month</span>
          </article>
          <div className="trusted-divider"></div>

          <article className="trusted-stat-item" style={{ animationDelay: '0.16s' }}>
            <strong>$5M+</strong>
            <span>Pipeline generated / month</span>
          </article>
          <div className="trusted-divider"></div>

          <article className="trusted-stat-item" style={{ animationDelay: '0.24s' }}>
            <strong>$1.25M+</strong>
            <span>Revenue generated / month</span>
          </article>
        </div>

        {/* TRUST COPY */}
        <div className="trusted-copy">
          <p>Trusted by modern operators across industries.</p>
          <span>From pilot to scale without chaos.</span>
        </div>

        {/* LOGO GRID */}
        <div className="trusted-logo-grid">
          
          {/* Row 1 */}
          <div className="trusted-logo-row">
            {/* Raycast */}
            <div className="custom-logo logo-raycast">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="#FF6363" />
              </svg>
              <span>Raycast</span>
            </div>
            
            {/* Twitch */}
            <div className="custom-logo logo-twitch">
              <span>twitch</span>
            </div>

            {/* Spotify */}
            <div className="custom-logo logo-spotify">
              <svg viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16.5 16.5C16.3 16.8 15.8 16.9 15.5 16.7C13.2 15.3 10.3 15 6 16C5.6 16.1 5.3 15.8 5.2 15.5C5.1 15.1 5.4 14.8 5.7 14.7C10.4 13.6 13.7 14 16.2 15.5C16.5 15.7 16.6 16.2 16.5 16.5ZM17.9 13.4C17.6 13.9 17 14.1 16.5 13.8C13.8 12.1 9.8 11.6 5.8 12.8C5.3 13 4.8 12.7 4.6 12.1C4.4 11.6 4.8 11.1 5.3 10.9C9.9 9.5 14.4 10.1 17.5 12C18 12.3 18.2 12.9 17.9 13.4ZM18.1 10.1C14.8 8.1 8.6 7.9 5 9C4.3 9.2 3.6 8.8 3.4 8.1C3.2 7.4 3.6 6.7 4.3 6.5C8.5 5.2 15.3 5.5 19.2 7.8C19.8 8.2 20 9 19.6 9.6C19.3 10.2 18.6 10.4 18.1 10.1Z" fill="white"/>
              </svg>
              <span>Spotify</span>
            </div>

            {/* Hulu */}
            <div className="custom-logo logo-hulu">
              <span>hulu</span>
            </div>

            {/* YouTube */}
            <div className="custom-logo logo-youtube">
              <span className="yt-you">You</span>
              <span className="yt-tube">Tube</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="trusted-logo-row">
            {/* character.ai */}
            <div className="custom-logo logo-character">
              <span>character.ai</span>
            </div>

            {/* OpenAI */}
            <div className="custom-logo logo-openai">
              <span>OpenAI</span>
            </div>

            {/* ORACLE */}
            <div className="custom-logo logo-oracle">
              <span>ORACLE</span>
            </div>

            {/* Portola */}
            <div className="custom-logo logo-portola">
              <span>Portola</span>
              <sup>™</sup>
            </div>

            {/* granola */}
            <div className="custom-logo logo-granola">
              <span>granola</span>
              <div className="granola-bar"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
