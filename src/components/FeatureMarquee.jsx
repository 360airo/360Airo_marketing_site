import React from 'react';
import '../styles/feature-marquee.css';

const features = [
  {
    title: "Find and prioritize ICP fit leads",
    background: "linear-gradient(145deg, #4C1D95 0%, #312E81 100%)", // deep purple gradient
    textColor: "#ffffff",
    uiElements: ["Company Size", "Industry", "Funding Round"]
  },
  {
    title: "Enrich data from dozens of sources",
    background: "linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 100%)", // light lavender to white
    textColor: "#1A1A1A",
    uiElements: ["Crunchbase", "LinkedIn", "Clearbit"]
  },
  {
    title: "Send personalized multi-channel outreach",
    background: "linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)", // very light purple to white
    textColor: "#1A1A1A",
    uiElements: ["Email Sequence", "LinkedIn Connection", "Follow-up"]
  },
  {
    title: "Monitor social platforms for keywords",
    background: "linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 100%)", // light indigo
    textColor: "#1A1A1A",
    uiElements: ["'looking for SDR'", "'outbound automation'", "Brand mentions"]
  },
  {
    title: "Reply autonomously and book meetings",
    background: "linear-gradient(180deg, #FDFBF7 0%, #F5F0EB 100%)", // warm ivory
    textColor: "#1A1A1A",
    uiElements: ["Meeting booked", "Objection handled", "OOTO detected"]
  }
];

export default function FeatureMarquee() {
  return (
    <div className="cs-marquee-wrapper">
      <div className="cs-marquee-fade-left"></div>
      <div className="cs-marquee-fade-right"></div>
      
      <div className="cs-marquee-track">
        {/* Double the list for seamless looping */}
        {[...features, ...features].map((feature, i) => (
          <div 
            key={i} 
            className="cs-marquee-card" 
            style={{ background: feature.background, color: feature.textColor }}
          >
            <h3 className="cs-marquee-title">{feature.title}</h3>
            
            {/* Simulated UI block */}
            <div className="cs-marquee-ui-mock">
              {feature.uiElements.map((el, j) => (
                <div key={j} className="cs-marquee-ui-row">
                  <div className="cs-marquee-ui-dot" style={{ backgroundColor: feature.textColor }}></div>
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
