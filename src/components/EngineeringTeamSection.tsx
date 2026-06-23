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
        <h2 className="eng-heading">Replace your Engineering Team</h2>

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
              <h3>All-in-One Outreach Solution</h3>
              <p>Built for modern revenue teams, 360Airo helps you scale outbound effortlessly through AI-powered email, LinkedIn, SMS, and automation workflows—all from a single unified platform.</p>
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
              <h3>Reach Prospects Everywhere</h3>
              <p>From inboxes to LinkedIn and SMS, 360Airo automatically reaches out, follows up, and nurtures prospects on your behalf—so no opportunity slips through the cracks.</p>
            </div>
            <div className="donut-visual-container">
              <div className="donut-chart"></div>
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
              <h3>Import Prospects → Launch Campaigns → Generate Revenue</h3>
            </div>
            <div className="map-visual">
              {/* Abstract Map Nodes Container */}
              <div className="map-nodes">
                <div className="node node-avatar n1"></div>
                <div className="node node-server n2">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                <div className="node node-avatar n3"></div>
                <div className="node node-server n4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                <div className="node node-avatar n5"></div>
                <div className="node node-avatar n6"></div>
                <div className="node node-server n7">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M6 16h.01M10 8h8M10 16h8"/></svg>
                </div>
                
                {/* Connecting lines */}
                <svg className="map-lines" viewBox="0 0 500 300" preserveAspectRatio="none">
                  <path className="connecting-line" d="M80 80 Q 200 120 280 180" />
                  <path className="connecting-line" d="M350 70 Q 300 130 280 180" />
                  <path className="connecting-line" d="M420 100 Q 350 150 280 180" />
                </svg>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 4 - MIDDLE BOTTOM WHITE
             ======================================================== */}
          <div className="eng-card eng-card-mid-bot theme-light anim-stagger" style={{ animationDelay: '0.3s' }}>
            <div className="card-top-content z-10">
              <h3>Automated Email Warmup</h3>
              <p>Protect your sender reputation. 360Airo automatically warms up your email accounts by sending and replying to realistic AI-powered conversations, keeping your deliverability at peak performance.</p>
            </div>

            <div className="warmup-ui-container" style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
              <div className="warmup-status-bar" style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="warmup-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Warmup Status: Active</span>
                </div>
                <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>outbound@360airo.com</span>
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
          <div className="eng-card eng-card-right-bot theme-light anim-stagger" style={{ animationDelay: '0.4s' }}>
            <div className="card-top-content z-10">
              <h3>Components, Dashboards and<br />Everything else</h3>
            </div>
            
            <div className="circuit-visual">
              <svg className="circuit-lines" viewBox="0 0 300 300">
                <path d="M0 150 H150 L180 180 H300" className="c-line" />
                <path d="M0 200 H120 L150 230 H300" className="c-line" />
                <path d="M50 300 V250 L100 200 H150" className="c-line" />
                <path d="M250 0 V100 L200 150 H150" className="c-line" />
                <path d="M300 80 H220 L180 120" className="c-line highlight" />
                <path d="M0 250 H80 L120 210 H180" className="c-line highlight" />
              </svg>
              <div className="orange-chip"></div>
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
