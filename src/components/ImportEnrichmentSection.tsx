// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ImportEnrichmentSection.css';

const stepsData = [
  {
    id: 1,
    subtitle: "01 — MULTI-SOURCE IMPORT",
    title: "Find leads that match your ICP and their verified contacts",
    desc: "Upload leads from your CRM or CSV and enrich them with verified emails and phone numbers from the market's top data providers. Need leads to get started? Use the 600M+ lemlist database and smart filters to find accounts that match your ICP.",
    image: "https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/test/Gemini_Generated_Image_iff3aniff3aniff3.png"
  },
  {
    id: 2,
    subtitle: "02 — SIGNAL AGENTS",
    title: "Know when leads are ready to talk and act immediately",
    desc: "Intent signal agents suggest, track, and act on high-intent events that show prospects are likely to engage. Using your AI Context Center, agents suggest multichannel sequences, personalized copies, and AI prompts tailored to the trigger.",
    image: "/signals_preview.png"
  },
  {
    id: 3,
    subtitle: "03 — DATA ENRICHMENT",
    title: "Score, segment, and personalize with leads' unique context",
    desc: "Data enrichment agents pull structured insights from LinkedIn, websites, CRM data, Skype/call recordings, and other internal sources. Turn scattered lead data into actionable context you can use to qualify accounts, prioritize outreach, and tailor every message.",
    image: "/enrichment_preview.png"
  },
  {
    id: 4,
    subtitle: "04 — MULTICHANNEL SEQUENCE",
    title: "Run outbound across multiple channels, from the same campaign",
    desc: "Launch automated campaigns across email, LinkedIn, calls, WhatsApp, and SMS from one workflow. Manage every conversation in a unified inbox, no matter the sender or channel.",
    image: "https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/test/Gemini_Generated_Image_iff3aniff3aniff3.png"
  },
  {
    id: 5,
    subtitle: "05 — DELIVERABILITY HUB",
    title: "Protect deliverability across your entire outbound operation",
    desc: "Deliverability Hub helps you keep emails landing in inboxes, even when sending at scale across multiple mailboxes and domains. Monitor mailbox and domain health, spot issues before performance drops, and get actionable recommendations from one centralized hub.",
    image: "/enrichment_preview.png"
  }
];

export default function ImportEnrichmentSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); 
  const [activeStep, setActiveStep] = useState(1); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || window.innerWidth < 768) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const totalScrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -rect.top;

      let scrollPercent = (scrolled / totalScrollableDistance) * 100;
      scrollPercent = Math.max(0, Math.min(100, scrollPercent));

      setProgress(scrollPercent);

      // Distribute progress across steps
      if (scrollPercent < 20) {
        setActiveStep(1);
      } else if (scrollPercent >= 20 && scrollPercent < 40) {
        setActiveStep(2);
      } else if (scrollPercent >= 40 && scrollPercent < 60) {
        setActiveStep(3);
      } else if (scrollPercent >= 60 && scrollPercent < 80) {
        setActiveStep(4);
      } else {
        setActiveStep(5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalProgress = (stepId: number) => {
    const stepIndex = stepId - 1;
    const start = stepIndex * 20;
    const end = (stepIndex + 1) * 20;

    if (progress < start) return 0;
    if (progress > end) return 100;

    return ((progress - start) / 20) * 100;
  };

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const totalScrollableDistance = rect.height - window.innerHeight;

    const stepRatio = (stepIndex - 1) / 4; 
    const targetScroll = sectionTop + totalScrollableDistance * stepRatio;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="import-enrichment-wrapper">
      <div ref={containerRef} className="import-enrichment-scroll-container">
        <div className="import-enrichment-sticky-frame">
          <div className="ie-sticky-content-grid">
            
            {/* LEFT SIDE COLUMN: Header + Scrolling Accordions */}
            <div className="ie-left-sticky-column">
              
              {/* Static Header */}
              <div className="import-enrichment-header-section">
                <h3>
                  From full TAM coverage to your top<br />
                  <span>accounts, run outreach that still feels 1:1</span>
                </h3>
              </div>

              {/* Scrolling Stepper */}
              <div className="ie-left-stepper-column">
                <div className="ie-accordion-list">
                  {stepsData.map((step) => {
                    const isActive = step.id === activeStep;
                    
                    const isVisible = 
                      step.id === activeStep || 
                      step.id === activeStep - 1 || 
                      step.id === activeStep + 1;

                    const localFill = getLocalProgress(step.id);

                    return (
                      <div 
                        key={step.id} 
                        className={`ie-accordion-item 
                          ${isVisible ? 'is-visible' : ''} 
                          ${isActive ? 'is-active' : ''}
                        `}
                      >
                        <div className="ie-item-timeline-wrapper">
                          <div className={`ie-item-dot ${localFill > 0 ? 'is-active' : ''}`} />
                          <div className="ie-item-line-bg" />
                          <div 
                            className="ie-item-line-fill" 
                            style={{ height: isMobile ? '0%' : `${localFill}%` }}
                          />
                        </div>

                        <div className="ie-accordion-content-side">
                          <div 
                            className="ie-accordion-header"
                            onClick={() => scrollToStep(step.id)}
                          >
                            <span className="ie-accordion-num">
                              {String(step.id).padStart(2, '0')}
                            </span>
                          </div>

                          <div className={`ie-accordion-content ${isActive ? 'expanded' : ''}`}>
                            <div className="ie-accordion-inner">
                              <h4 className="ie-accordion-title">{step.title}</h4>
                              <p className="ie-accordion-desc">{step.desc}</p>
                              <button className="ie-learn-more-btn">Learn more</button>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE COLUMN: Blue Backdrop Card with Continuous Vertical Filmstrip */}
            <div className="ie-right-visual-column">
              
              {/* Slider Viewport Window */}
              <div className="ie-images-viewport">
                
                {/* Continuous Sliding Filmstrip */}
                <div 
                  className="ie-images-strip" 
                  style={{ transform: `translateY(-${(activeStep - 1) * 400}px)` }}
                >
                  {stepsData.map((step) => {
                    const isActive = step.id === activeStep;
                    return (
                      <div 
                        key={step.id} 
                        className={`ie-image-slide ${isActive ? 'active' : ''}`}
                      >
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="ie-mockup-image"
                        />
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Blue Card Dots Indicators */}
              <div className="ie-blue-card-dots">
                {stepsData.map((step) => (
                  <span 
                    key={step.id} 
                    className={`ie-blue-dot ${step.id === activeStep ? 'active' : ''}`}
                    onClick={() => scrollToStep(step.id)}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}