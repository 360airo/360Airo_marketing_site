// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from 'react';
import GifPlayer from './GifPlayer';
import '../styles/EngineeringTeamSection.css';

const TIMEZONES = [
  { value: 'America/New_York', label: '(GMT-05:00) Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: '(GMT-06:00) Central Time (US & Canada)' },
  { value: 'America/Denver', label: '(GMT-07:00) Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: '(GMT-08:00) Pacific Time (US & Canada)' },
  { value: 'America/Anchorage', label: '(GMT-09:00) Alaska' },
  { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii' },
  { value: 'Europe/London', label: '(GMT+00:00) London, Dublin, Lisbon' },
  { value: 'Europe/Paris', label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris' },
  { value: 'Europe/Athens', label: '(GMT+02:00) Athens, Bucharest, Istanbul' },
  { value: 'Asia/Kolkata', label: '(GMT+05:30) India Standard Time (IST)' },
  { value: 'Asia/Singapore', label: '(GMT+08:00) Beijing, Hong Kong, Singapore' },
  { value: 'Asia/Tokyo', label: '(GMT+09:00) Osaka, Sapporo, Tokyo' },
  { value: 'Australia/Sydney', label: '(GMT+10:00) Canberra, Melbourne, Sydney' },
  { value: 'Pacific/Auckland', label: '(GMT+12:00) Auckland, Wellington' },
  { value: 'America/Sao_Paulo', label: '(GMT-03:00) Brasilia' },
  { value: 'Africa/Johannesburg', label: '(GMT+02:00) Harare, Pretoria' },
  { value: 'Asia/Dubai', label: '(GMT+04:00) Abu Dhabi, Muscat' },
  { value: 'UTC', label: '(GMT+00:00) Coordinated Universal Time (UTC)' },
];

export default function EngineeringTeamSection() {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    timezone: 'Asia/Kolkata',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFormData({
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      timezone: 'Asia/Kolkata',
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Company email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.timezone) newErrors.timezone = 'Time zone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <section id="section-engineering" ref={sectionRef}>
      <div className="eng-container">
        <h2 className="eng-heading" style={{ marginBottom: '16px' }}>
          Scale Your <span className="eng-heading-shine">SDR Team Without Hiring</span>
        </h2>
        <p className="eng-subheading" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#475569',
          maxWidth: '800px',
          lineHeight: '1.6',
          marginBottom: '48px',
          marginTop: '0'
        }}>
          Upload and Enrich qualified prospects, automate outreach, streamline follow-ups, and track pipeline performance from a single outreach platform
        </p>

        <div className="eng-bento">
          {/* ========================================================
              CARD 1 - LEFT BLACK
             ======================================================== */}
          <div className="eng-card eng-card-left theme-dark anim-stagger" style={{ animationDelay: '0s' }}>
            <div className="card-top-visual card-browser-visual">
              <div className="browser-mockup">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="browser-search-bar"></div>
                  <div className="browser-menu-lines">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="browser-body" style={{ padding: 0, overflow: 'hidden', background: '#000' }}>
                  <GifPlayer
                    src="/enhanced_video.gif"
                    alt="Design and Development demo"
                  />
                </div>
              </div>
            </div>
            <div className="card-bottom-content">
              <h3>Multichannel Outreach</h3>
              <h4 style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500, margin: '4px 0 12px 0' }}>Be Everywhere Your Buyers Are</h4>
              <p>Your prospects don't live in one inbox. Reach decision-makers across Email, LinkedIn, and SMS, creating more touchpoints, more conversations, and more opportunities to close.</p>
              <button className="eng-cta-btn" onClick={() => setIsModalOpen(true)}>
                <div className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                Book demo
              </button>
            </div>
          </div>

          {/* ========================================================
              CARD 2 - MIDDLE TOP WHITE
             ======================================================== */}
          <div className="eng-card eng-card-mid-top theme-light anim-stagger" style={{ animationDelay: '0.1s' }}>
            <div className="card-top-content">
              <h3>Pipeline-Accelerating Follow-Ups</h3>
              <p>Close deals moving forward with automated follow-up workflows designed to generate more responses, meetings, and revenue opportunities.</p>
            </div>
            <div className="donut-visual-container" style={{ position: 'relative' }}>
              <svg className="speedometer-svg" viewBox="0 0 240 140" style={{ width: '240px', height: '140px', transform: 'translateY(10px)' }}>
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0EB5BB" />
                    <stop offset="100%" stopColor="#0052FF" />
                  </linearGradient>
                  {/* Shadow for the needle for a premium touch */}
                  <filter id="needleShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15"/>
                  </filter>
                </defs>
                {/* Background track */}
                <path d="M 20 130 A 100 100 0 0 1 220 130" fill="none" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
                {/* Colored fill */}
                <path className="speedometer-fill" d="M 20 130 A 100 100 0 0 1 220 130" fill="none" stroke="url(#speedGradient)" strokeWidth="20" strokeLinecap="round" strokeDasharray="314.2" strokeDashoffset="314.2" />
                
                {/* Needle */}
                <g className="speedometer-svg-needle" filter="url(#needleShadow)">
                  <line x1="120" y1="130" x2="30" y2="130" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="120" cy="130" r="8" fill="#0F172A" />
                  <circle cx="120" cy="130" r="3" fill="#FFFFFF" />
                </g>

                {/* 5X Text perfectly aligned inside SVG */}
                <text x="120" y="118" textAnchor="middle" fontSize="48" fontWeight="800" fill="#0F172A" fontFamily="inherit" className="speedometer-text-svg">5X</text>
              </svg>
            </div>
            <div className="notifications-container">
              <div className="notif-card card-bg-3"></div>
              <div className="notif-card card-bg-2"></div>
              <div className="notif-card card-front">
                <span className="notif-label">outreach</span>
                <div className="notif-text">LinkedIn Message Sent</div>
                <svg className="github-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0a66c2', width: '16px', height: '16px' }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 3 - RIGHT TOP BLACK
             ======================================================== */}
          <div className="eng-card eng-card-right-top theme-dark anim-stagger" style={{ animationDelay: '0.2s' }}>
            <div className="card-top-content z-10">
              <h3>AI SDR Prospect Intelligence</h3>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5', marginTop: '6px' }}>Build highly targeted prospect lists from over 900 million+ verified professionals. Reach decision-makers faster, improve conversion rates, and keep your sales pipeline filled with qualified opportunities.</p>
            </div>
            <div className="globe-visual-container">
              <svg className="saas-globe-svg" viewBox="0 0 400 400">
                <defs>
                  <filter id="globeNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0EB5BB" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0EB5BB" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="globeClip">
                    <circle cx="200" cy="200" r="160" />
                  </clipPath>
                </defs>
                
                {/* Globe Grid Base */}
                <g className="globe-grid" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none">
                  {/* Outer circle */}
                  <circle cx="200" cy="200" r="160" />
                  
                  {/* Latitudes */}
                  <ellipse cx="200" cy="200" rx="160" ry="40" />
                  <ellipse cx="200" cy="200" rx="160" ry="100" />
                  
                  {/* Longitudes */}
                  <ellipse cx="200" cy="200" rx="40" ry="160" />
                  <ellipse cx="200" cy="200" rx="100" ry="160" />
                </g>

                {/* 900 Million Professionals - Background Sea of Dots */}
                <g className="background-dots" fill="rgba(255,255,255,0.15)" clipPath="url(#globeClip)">
                  {/* Just a scatter of small dots representing the massive database */}
                  <circle cx="120" cy="100" r="1.5" /> <circle cx="280" cy="90" r="1.5" /> <circle cx="300" cy="150" r="1.5" />
                  <circle cx="150" cy="250" r="1.5" /> <circle cx="220" cy="300" r="1.5" /> <circle cx="90" cy="180" r="1.5" />
                  <circle cx="180" cy="120" r="1.5" /> <circle cx="250" cy="220" r="1.5" /> <circle cx="320" cy="260" r="1.5" />
                  <circle cx="100" cy="280" r="1.5" /> <circle cx="200" cy="180" r="1.5" /> <circle cx="270" cy="320" r="1.5" />
                  <circle cx="200" cy="80" r="1.5" /> <circle cx="330" cy="120" r="1.5" /> <circle cx="70" cy="220" r="1.5" />
                </g>

                {/* Animated Connection Arcs following Globe Surface */}
                <g className="globe-arcs" fill="none" strokeWidth="2.5" strokeLinecap="round" filter="url(#globeNodeGlow)" clipPath="url(#globeClip)">
                  {/* Arc 1: Top Latitude curve */}
                  <path className="g-arc arc-1" d="M 60 120 A 160 80 0 0 1 340 120" stroke="#0EB5BB" />
                  {/* Arc 2: Longitude curve right */}
                  <path className="g-arc arc-2" d="M 200 40 A 100 160 0 0 1 260 330" stroke="#0052FF" />
                  {/* Arc 3: Outer edge rim */}
                  <path className="g-arc arc-3" d="M 200 360 A 160 160 0 0 1 40 200" stroke="#0EB5BB" />
                  {/* Arc 4: Diagonal surface curve */}
                  <path className="g-arc arc-4" d="M 70 280 A 180 120 45 0 1 320 160" stroke="#0052FF" />
                </g>

                {/* Points that appear when lines land */}
                <g className="landing-points" fill="#ffffff" filter="url(#globeNodeGlow)" clipPath="url(#globeClip)">
                  {/* Lands from Arc 1 */}
                  <circle cx="340" cy="120" r="5" className="landing-point p-delay-1" />
                  {/* Lands from Arc 2 */}
                  <circle cx="260" cy="330" r="5" className="landing-point p-delay-2" />
                  {/* Lands from Arc 3 */}
                  <circle cx="40" cy="200" r="5" className="landing-point p-delay-3" />
                  {/* Lands from Arc 4 */}
                  <circle cx="320" cy="160" r="5" className="landing-point p-delay-4" />
                </g>
              </svg>
            </div>
          </div>

          {/* ========================================================
              CARD 4 - MIDDLE BOTTOM WHITE
             ======================================================== */}
          <div className="eng-card eng-card-mid-bot theme-light anim-stagger" style={{ animationDelay: '0.3s' }}>
            <div className="card-top-content z-10">
              <h3>AI-Powered Buyer Discover</h3>
              <p>Identify high-intent prospects, uncover new opportunities, and engage decision-makers with smart hyper-personalized sequencing that delivers the right message at the right time.</p>
            </div>

            <div className="warmup-ui-container" style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
              <div className="warmup-status-bar" style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="warmup-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Email Warmup Status: <span style={{ color: '#16a34a' }}>Active</span></span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>Deliverability</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginTop: '4px', fontFamily: 'Outfit, sans-serif' }}>99.8%</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>Saved from Spam</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6', marginTop: '4px', fontFamily: 'Outfit, sans-serif' }}>2,480+</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 5 - RIGHT BOTTOM WHITE
             ======================================================== */}
          <div className="eng-card eng-card-right-bot theme-light anim-stagger" style={{ animationDelay: '0.4s', display: 'flex', flexDirection: 'column' }}>
            <div className="card-top-content z-10">
              <h3>Sales Insights That Drive Revenue</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginTop: '8px', marginBottom: '24px' }}>Monitor campaign performance, track pipeline impact, and uncover the opportunities that help your team book more meetings and close more deals.</p>
              {/* Metric stats */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>231,856</span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 650, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sessions</span>
              </div>
            </div>
            <div className="analytics-graph-visual" style={{ width: '100%', flex: 1, minHeight: '200px', marginTop: '16px', padding: '0 24px 24px 24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              
              <svg viewBox="0 0 320 160" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="upwardGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="upwardGradientLight" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="25" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="50" x2="310" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="80" x2="310" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="110" x2="310" y2="110" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="25" y1="140" x2="310" y2="140" stroke="#cbd5e1" strokeWidth="1.2" />

                {/* Y-Axis Labels */}
                <text x="18" y="24" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="Outfit, sans-serif">20k</text>
                <text x="18" y="54" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="Outfit, sans-serif">10k</text>
                <text x="18" y="84" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="Outfit, sans-serif">5k</text>
                <text x="18" y="114" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="Outfit, sans-serif">2k</text>
                <text x="18" y="144" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="Outfit, sans-serif">0</text>

                {/* Area Fills */}
                <path d="M 25 140 L 50.9 135 L 76.8 140 L 102.7 125 L 128.6 130 L 154.5 110 L 180.4 120 L 206.3 100 L 232.2 105 L 258.1 80 L 284 55 L 310 40 L 310 140 Z" fill="url(#upwardGradientLight)" />
                <path d="M 25 140 L 50.9 125 L 76.8 135 L 102.7 105 L 128.6 110 L 154.5 85 L 180.4 90 L 206.3 65 L 232.2 70 L 258.1 40 L 284 20 L 310 10 L 310 140 Z" fill="url(#upwardGradient)" />

                {/* Line 2 (Light Blue - Secondary upward trend) */}
                <path d="M 25 140 L 50.9 135 L 76.8 140 L 102.7 125 L 128.6 130 L 154.5 110 L 180.4 120 L 206.3 100 L 232.2 105 L 258.1 80 L 284 55 L 310 40" 
                      fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="animated-graph-line-secondary" />

                {/* Line 1 (Dark Blue - Primary upward trend) */}
                <path d="M 25 140 L 50.9 125 L 76.8 135 L 102.7 105 L 128.6 110 L 154.5 85 L 180.4 90 L 206.3 65 L 232.2 70 L 258.1 40 L 284 20 L 310 10" 
                      fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      className="animated-graph-line" />

                {/* X-Axis Labels */}
                <text x="25" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Jan</text>
                <text x="50.9" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Feb</text>
                <text x="76.8" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Mar</text>
                <text x="102.7" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Apr</text>
                <text x="128.6" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">May</text>
                <text x="154.5" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Jun</text>
                <text x="180.4" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Jul</text>
                <text x="206.3" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Aug</text>
                <text x="232.2" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Sep</text>
                <text x="258.1" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Oct</text>
                <text x="284" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Nov</text>
                <text x="310" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="Outfit, sans-serif">Dec</text>
              </svg>
            </div>
          </div>

        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {!isSubmitted ? (
              <>
                <div className="modal-header">
                  <h3>Book a Live Demo</h3>
                  <p>Scale outbound effortlessly with 360Airo. Fill in the details below, and our team will prepare a custom outreach demo for you.</p>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="e.g. Acme Corp"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    {errors.companyName && <span className="form-error">{errors.companyName}</span>}
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Company Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@acme.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="timezone">Time Zone</label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                    {errors.timezone && <span className="form-error">{errors.timezone}</span>}
                  </div>

                  <button type="submit" className="modal-submit-btn">
                    Schedule Free Demo
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <div className="success-icon-wrapper">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3>Demo Requested!</h3>
                <p>
                  Thank you, <span style={{ color: '#fff', fontWeight: 600 }}>{formData.firstName}</span>. 
                  We've received your request for <span style={{ color: '#fff', fontWeight: 600 }}>{formData.companyName}</span>. 
                  A calendar invite and details have been sent to <span className="success-email">{formData.email}</span>.
                </p>
                <button 
                  type="button"
                  onClick={closeModal} 
                  className="modal-submit-btn" 
                  style={{ width: '100%', marginTop: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
