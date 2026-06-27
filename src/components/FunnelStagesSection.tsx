// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import '../styles/FunnelStagesSection.css';

const STAGES_DATA = [
  {
    id: 0,
    title: "Get Verified Data",
    subtitle: "Stage 01 — Target List Creation",
    desc: "Import high-intent prospects from CSV, CRM, or LinkedIn Sales Navigator. 360Airo auto-enriches, double-verifies, and segments emails and phone numbers in real time.",
    bulletPoints: [
      "Auto-verify email deliverability",
      "Direct cell phone number enrichment",
      "Smart intent segmentation"
    ]
  },
  {
    id: 1,
    title: "Email Them",
    subtitle: "Stage 02 — Multichannel Personalization",
    desc: "Deploy custom email copies that dynamically adapt based on target industry, scale, and company size. Ensure maximum inbox delivery via automated warmups.",
    bulletPoints: [
      "Spam deliverability protection",
      "Dynamic merge tags & AI variations",
      "Automated sender domain rotations"
    ]
  },
  {
    id: 2,
    title: "LinkedIn Outreach",
    subtitle: "Stage 03 — Social Engagements",
    desc: "Build strong relational bridges by automatically visiting prospect profiles, sending personalized connection requests, and carrying out direct inbox follow-ups.",
    bulletPoints: [
      "Automated connection requests",
      "Soft profile view triggers",
      "Smart follow-up sequencing"
    ]
  },
  {
    id: 3,
    title: "SMS & Follow-ups",
    subtitle: "Stage 04 — Instant Conversion",
    desc: "Leverage SMS messaging to get instant responses from hot leads. Ensure no active lead slips through by routing replies straight to your unified sales dashboard.",
    bulletPoints: [
      "Direct carrier SMS sequencing",
      "Unified conversational inbox",
      "Push replies directly to CRM"
    ]
  }
];

export default function FunnelStagesSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoplayTimerRef = useRef(null);

  // Autoplay loop through stages
  useEffect(() => {
    if (isAutoPlay) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveStage((prev) => (prev + 1) % STAGES_DATA.length);
      }, 3500);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoPlay]);

  const handleStageSelect = (index) => {
    setIsAutoPlay(false); // Pause autoplay on manual click
    setActiveStage(index);
  };

  return (
    <div className="funnel-section-wrapper">
      <div className="funnel-section-container">
        
        {/* Left Side: Text and Stage Content Card */}
        <div className="funnel-content-panel">
          <div className="funnel-eyebrow">Outreach Pipeline</div>
          <h2 className="funnel-main-title">
            The funnel that converts <br />
            <span>prospects into customers</span>
          </h2>
          <p className="funnel-main-desc">
            A coordinated outreach funnel that automates data loading, personalization, 
            social touchpoints, and instant closing actions.
          </p>

          <div className="funnel-stages-list">
            {STAGES_DATA.map((stage, index) => {
              const isActive = activeStage === index;
              return (
                <div 
                  key={stage.id} 
                  className={`funnel-stage-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleStageSelect(index)}
                >
                  <div className="funnel-stage-item-header">
                    <span className="funnel-stage-num">{`0${index + 1}`}</span>
                    <h3>{stage.title}</h3>
                  </div>
                  {isActive && (
                    <div className="funnel-stage-expanded animate-slide-down">
                      <p className="funnel-stage-desc">{stage.desc}</p>
                      <ul className="funnel-stage-bullets">
                        {stage.bulletPoints.map((bp, i) => (
                          <li key={i}>✓ {bp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Isometric 3D Stacked Blocks Panel */}
        <div className="funnel-visual-panel">
          <div className="funnel-svg-wrapper">
            <svg viewBox="0 0 600 480" className="funnel-stacked-blocks-svg">
              <defs>
                {/* Glow Filter for Active Block Silhouette and Deal Closed Panel */}
                <filter id="funnel-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                </filter>
              </defs>

              {/* Render Blocks: Inactive first, then active on top */}
              {(() => {
                const renderBlock = (stage, index) => {
                  const isActive = activeStage === index;
                  const Y = 35 + index * 85;
                  const labels = [
                    "VERIFY DATA",
                    "EMAIL OUTBOUND",
                    "LINKEDIN INVITE",
                    "SMS ENGAGE"
                  ];

                  return (
                    <g 
                      key={stage.id} 
                      className={`funnel-block-group b-stage-${index} ${isActive ? 'active' : ''}`}
                    >
                      {/* Active Glow Silhouette Path - drawn first so it's behind the faces */}
                      {isActive && (
                        <path 
                          d={`M 125 ${Y+27} L 250 ${Y} L 375 ${Y+27} L 375 ${Y+125} Q 375 ${Y+135} 361 ${Y+139} L 262 ${Y+165} Q 250 ${Y+168} 238 ${Y+165} L 139 ${Y+139} Q 125 ${Y+135} 125 ${Y+125} Z`}
                          fill="#3b82f6"
                          opacity="0.4"
                          filter="url(#funnel-glow)"
                          pointerEvents="none"
                        />
                      )}

                      {/* Right Face */}
                      <path 
                        d={`M 250 ${Y+54} L 375 ${Y+27} L 375 ${Y+125} Q 375 ${Y+135} 361 ${Y+139} L 262 ${Y+165} Q 250 ${Y+168} 250 ${Y+158} Z`} 
                        className="face face-right" 
                      />
                      
                      {/* Left Face */}
                      <path 
                        d={`M 125 ${Y+27} L 250 ${Y+54} L 250 ${Y+158} Q 250 ${Y+168} 238 ${Y+165} L 139 ${Y+139} Q 125 ${Y+135} 125 ${Y+125} Z`} 
                        className="face face-left" 
                      />
                      
                      {/* Top Face */}
                      <path 
                        d={`M 238 ${Y+4} Q 250 ${Y} 262 ${Y+4} L 361 ${Y+22} Q 375 ${Y+27} 361 ${Y+32} L 262 ${Y+50} Q 250 ${Y+54} 238 ${Y+50} L 139 ${Y+32} Q 125 ${Y+27} 139 ${Y+22} Z`} 
                        className="face face-top" 
                      />

                      {/* Top Face Inset Rounded Rhombus */}
                      <path 
                        d={`M 244 ${Y+16} Q 250 ${Y+14} 256 ${Y+16} L 335 ${Y+25} Q 345 ${Y+27} 335 ${Y+29} L 256 ${Y+38} Q 250 ${Y+40} 244 ${Y+38} L 165 ${Y+29} Q 155 ${Y+27} 165 ${Y+25} Z`}
                        className="face-top-inset"
                        style={{ 
                          fill: 'none', 
                          stroke: isActive ? '#3b82f6' : '#e2e8f0', 
                          strokeWidth: 1.5, 
                          opacity: isActive ? 0.95 : 0.45 
                        }}
                      />

                      {/* Vertical dashed lines on Left Face */}
                      <line x1="156" y1={Y + 33.7} x2="156" y2={Y + 137.7} className="cube-dashed-line" />
                      <line x1="187" y1={Y + 40.4} x2="187" y2={Y + 144.4} className="cube-dashed-line" />
                      <line x1="218" y1={Y + 47.1} x2="218" y2={Y + 151.1} className="cube-dashed-line" />

                      {/* Vertical dashed lines on Right Face */}
                      <line x1="281" y1={Y + 47.3} x2="281" y2={Y + 151.3} className="cube-dashed-line" />
                      <line x1="312" y1={Y + 40.6} x2="312" y2={Y + 144.6} className="cube-dashed-line" />
                      <line x1="343" y1={Y + 33.9} x2="343" y2={Y + 137.9} className="cube-dashed-line" />

                      {/* Outside Floating Label */}
                      {isActive && (
                        <g className="floating-label">
                          {/* Connecting Line and Dot */}
                          <line x1="375" y1={Y + 76} x2="410" y2={Y + 76} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" className="animated-dashed-line" />
                          <circle cx="375" cy={Y + 76} r="2.5" fill="#3b82f6" />
                          
                          {/* Floating Pill Box */}
                          <rect x="410" y={Y + 59} width="160" height="34" rx="17" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" filter="drop-shadow(0px 4px 8px rgba(59, 130, 246, 0.25))" />
                          
                          {/* Text Inside Pill */}
                          <text 
                            x="490" 
                            y={Y + 81} 
                            textAnchor="middle"
                            style={{ fill: '#132c54', fontSize: '13px', fontWeight: 800, letterSpacing: '0.04em' }}
                          >
                            {labels[index]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                };

                return (
                  <>
                    {/* Inactive blocks first */}
                    {STAGES_DATA.map((stage, index) => {
                      if (activeStage === index) return null;
                      return renderBlock(stage, index);
                    })}
                    
                    {/* Active block last to overlay on top */}
                    {activeStage !== null && renderBlock(STAGES_DATA[activeStage], activeStage)}
                  </>
                );
              })()}


            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
