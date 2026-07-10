"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/SMBSolutionSection.css';

export default function AgenciesFeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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
          Built for Agencies That Want to Scale
        </h2>

        {/* 6 cards instead of 4 */}
        <div className="agency-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }} ref={cardsRef}>
          {/* Card 1 */}
          <div className="agency-card bg-light-blue" tabIndex={0}>
            <div className="agency-card-icon icon-solid-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="agency-card-heading">Manage Every Client from One Place</h3>
            <p className="agency-card-text">
              Give every client their own dedicated workspace with separate campaigns, sender accounts, and reports—so you stay organized as your agency grows.
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
            <h3 className="agency-card-heading">Scale Your Campaigns with Confidence</h3>
            <p className="agency-card-text">
              Launch and manage hundreds of outreach campaigns while protecting deliverability with intelligent sender rotation and automated sending limits.
            </p>
          </div>

          {/* Card 3 */}
          <div className="agency-card bg-light-purple" tabIndex={0}>
            <div className="agency-card-icon icon-solid-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="2 4 5 13 12 10 19 13 22 4 22 20 2 20 2 4"></polygon>
              </svg>
            </div>
            <h3 className="agency-card-heading">Personalize Every Client Campaign</h3>
            <p className="agency-card-text">
              Create tailored outreach for every client using AI, merge fields, dynamic variables, and custom messaging that resonates with each audience.
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
            <h3 className="agency-card-heading">Show the Results Your Clients Care About</h3>
            <p className="agency-card-text">
              Share real-time campaign performance, reply rates, meetings booked, and ROI through client-ready reports that build trust and strengthen retention.
            </p>
          </div>

          {/* Card 5 */}
          <div className="agency-card bg-light-blue" tabIndex={0}>
            <div className="agency-card-icon icon-solid-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="agency-card-heading">Grow Your Brand with White-Label Outreach</h3>
            <p className="agency-card-text">
              Deliver outreach, reports, and client experiences under your own brand, giving your agency a professional and seamless customer experience.
            </p>
          </div>

          {/* Card 6 */}
          <div className="agency-card bg-light-purple" tabIndex={0}>
            <div className="agency-card-icon icon-solid-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="2 4 5 13 12 10 19 13 22 4 22 20 2 20 2 4"></polygon>
              </svg>
            </div>
            <h3 className="agency-card-heading">Find Qualified Leads for Every Client</h3>
            <p className="agency-card-text">
              Build targeted prospect lists with verified B2B contacts, company insights, and buyer data—so you can launch campaigns faster for any industry or niche.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
