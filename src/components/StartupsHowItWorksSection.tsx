"use client";
import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/HowItWorksSection.css';

const steps = [
  { id: 1, title: 'Unlimited Mailboxes & Warm-Up', image: '/step_1_leads.png' },
  { id: 2, title: 'Enrich prospects with realtime b2b lead intelligence', image: '/step_2_channels.png' },
  { id: 3, title: 'AI-Powered Hyper- Personalization', image: '/step_3_templates.png' },
  { id: 4, title: 'Multichannel Sales Engagement', image: '/step_4_inbox.png' },
  { id: 5, title: 'Sales Analytics & Reporting', image: '/step_5_analytics.png' },
];

export default function StartupsHowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 100px",
        end: "+=1500", // Adjusted for a more compact scroll
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          let currentStep = Math.min(Math.floor(progress * 5) + 1, 5);
          
          if (progress === 1) currentStep = 5;
          if (progress === 0) currentStep = 1;

          setActiveStep(currentStep);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hiw-section" ref={sectionRef}>
      <div className="hiw-scroll-trigger" ref={triggerRef}>
        
        <div className="hiw-container">
          
          {/* Headline */}
          <h2 className="hiw-headline">
            Your First Sales Hire Doesn't Have to Be a Sales Hire
          </h2>

          {/* Visuals Area */}
          <div className="hiw-visual-container">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`hiw-visual-pane ${activeStep === step.id ? 'active' : ''}`}
              >
                <img 
                  src={step.image} 
                  alt={step.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>

          {/* Stepper Timeline */}
          <div className="hiw-timeline-container">
            <div className="hiw-timeline-track">
              {/* Colored progress bar that fills up */}
              <div 
                className="hiw-timeline-progress" 
                style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            <div className="hiw-timeline-steps">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                const isPassed = activeStep > step.id;

                return (
                  <div key={step.id} className={`hiw-step ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}>
                    <div className="hiw-step-circle">
                      {step.id}
                    </div>
                    <div className="hiw-step-title">
                      {step.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
