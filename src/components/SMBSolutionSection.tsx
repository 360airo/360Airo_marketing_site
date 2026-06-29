"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/SMBSolutionSection.css';

export default function SMBSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Heading fade and move up
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.65,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "cubic-bezier(0.22, 1, 0.36, 1)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="smb-solution-section" ref={sectionRef}>
      <div className="smb-container">
        
        <h2 className="agency-cards-title" ref={headerRef}>
          Built for agencies, powered for scale
        </h2>

        <div className="agency-cards-grid" ref={cardsRef}>
          {/* Card 1 */}
          <div className="agency-card bg-light-blue" tabIndex={0}>
            <div className="agency-card-icon icon-solid-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="agency-card-heading">Scale without additional staff</h3>
            <p className="agency-card-text">
              Automate repetitive campaign tasks like follow-ups, sequence management, and lead qualification so your existing team can handle 3-5x more clients without hiring additional staff members
            </p>
          </div>

          {/* Card 2 */}
          <div className="agency-card bg-light-yellow" tabIndex={0}>
            <div className="agency-card-icon icon-solid-yellow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h3 className="agency-card-heading">Protect client reputation</h3>
            <p className="agency-card-text">
              30 + deliverability-focused features including email warm-up, Email Health checker, the same as LinkedIn safety limits ensure your clients' accounts stay healthy and maintain sender reputation
            </p>
          </div>

          {/* Card 3 */}
          <div className="agency-card bg-light-purple" tabIndex={0}>
            <div className="agency-card-icon icon-solid-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="2 4 5 13 12 10 19 13 22 4 22 20 2 20 2 4"></polygon>
              </svg>
            </div>
            <h3 className="agency-card-heading">Prove your value to clients</h3>
            <p className="agency-card-text">
              Get comprehensive reports showing open rates, response rates, meeting bookings, and ROI metrics. Export data in CSV to create professional client presentations and prove campaign value
            </p>
          </div>

          {/* Card 4 */}
          <div className="agency-card bg-light-green" tabIndex={0}>
            <div className="agency-card-icon icon-solid-green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="agency-card-heading">Manage your team efficiently</h3>
            <p className="agency-card-text">
              Create separate workspaces for each client, assign team members with desired level of permissions, and manage dozens of client accounts from one master login without switching platforms
            </p>
          </div>
        </div>

        <div className="agency-cta-area">
          <button className="agency-btn-primary" tabIndex={0}>
            Try for free
          </button>
        </div>

      </div>
    </section>
  );
}
