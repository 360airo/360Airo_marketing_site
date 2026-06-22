import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedStory() {
  const navigate = useNavigate();

  return (
    <section 
      className="cs-featured-banner-wrapper"
      onClick={() => navigate('/customer-stories/shiro')}
      style={{
        cursor: 'pointer',
        backgroundImage: "linear-gradient(100deg, rgba(7, 11, 23, 0.95) 0%, rgba(12, 22, 44, 0.95) 45%, rgba(26, 36, 77, 0) 100%), url('/images/logistics_hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="cs-featured-banner-card" onClick={(e) => e.stopPropagation()}>
        <div 
          className="cs-featured-logo" 
          onClick={() => navigate('/customer-stories/shiro')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Shiro's Logistics</span>
        </div>
        <h2 
          className="cs-featured-banner-title" 
          onClick={() => navigate('/customer-stories/shiro')}
          style={{ cursor: 'pointer' }}
        >
          From Manual Prospecting to Predictable Pipeline
        </h2>
        <div className="cs-featured-banner-tags">
          <span className="cs-tag-badge">Logistics</span>
          <span className="cs-tag-location">
            <img 
              alt="USA Flag" 
              loading="lazy" 
              width="20" 
              height="20" 
              className="cs-flag-icon"
              src="https://hatscripts.github.io/circle-flags/flags/us.svg" 
            />
            USA
          </span>
        </div>
      </div>
    </section>
  );
}
