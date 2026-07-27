"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';

// Comprehensive list of major countries with dialing codes and validation regex patterns
const countries = [
  { name: 'United States', code: '+1', flag: '🇺🇸', regex: /^[2-9]\d{9}$/, error: 'Must be 10 digits and cannot start with 0 or 1' },
  { name: 'India', code: '+91', flag: '🇮🇳', regex: /^[6-9]\d{9}$/, error: 'Must start with 6, 7, 8, or 9 and be exactly 10 digits' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', regex: /^7\d{9}$/, error: 'Must start with 7 and be exactly 10 digits' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', regex: /^(4|5)\d{8}$/, error: 'Must start with 4 or 5 and be exactly 9 digits' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', regex: /^1(5|6|7)\d{8,9}$/, error: 'Must start with 15, 16, or 17 and be 10-11 digits' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', regex: /^[2-9]\d{9}$/, error: 'Must be 10 digits and cannot start with 0 or 1' },
  { name: 'France', code: '+33', flag: '🇫🇷', regex: /^[67]\d{8}$/, error: 'Must start with 6 or 7 and be exactly 9 digits' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', regex: /^[89]\d{7}$/, error: 'Must start with 8 or 9 and be exactly 8 digits' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', regex: /^5\d{8}$/, error: 'Must start with 5 and be exactly 9 digits' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', regex: /^5\d{8}$/, error: 'Must start with 5 and be exactly 9 digits' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', regex: /^(70|80|90)\d{8}$/, error: 'Must start with 70, 80, or 90 and be 10 digits' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷', regex: /^\d{2}9\d{8}$/, error: 'Must include 2-digit area code followed by 9 and 8 digits' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦', regex: /^[6-8]\d{8}$/, error: 'Must start with 6, 7, or 8 and be exactly 9 digits' }
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyUrl: '',
    interestedIn: 'AI SDR Agent',
    message: ''
  });
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Specific Validation Error States
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const activeCountry = countries[selectedCountryIndex];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailError('');
    setPhoneError('');
    setSubmitError('');

    let hasValidationError = false;

    // Strict Email Validation & Blocklist Filter
    const blocklistDomains = ['test.com', 'example.com', 'mailinator.com', 'tempmail.com', 'yopmail.com', '10minutemail.com', 'dispostable.com', 'trashmail.com', 'guerrillamail.com'];
    const blocklistPrefixes = ['test', 'testing', 'user', 'admin', 'abc', 'asd', '123', 'demo', 'guest', 'none', 'dummy', 'mail'];

    const emailLower = formData.email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(emailLower)) {
      setEmailError('Type correct email');
      hasValidationError = true;
    } else {
      const [prefix, domain] = emailLower.split('@');
      if (blocklistDomains.includes(domain)) {
        setEmailError('Type correct email');
        hasValidationError = true;
      } else if (blocklistPrefixes.some(p => prefix === p || prefix.startsWith(p + '.') || prefix.startsWith(p + '_') || prefix.match(new RegExp('^' + p + '\\d+')))) {
        setEmailError('Type correct email');
        hasValidationError = true;
      }
    }

    // Phone Validation
    const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');
    if (!activeCountry.regex.test(cleanPhone)) {
      setPhoneError('Type correct number');
      hasValidationError = true;
    }

    if (hasValidationError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${activeCountry.code} ${cleanPhone}`,
          companyUrl: formData.companyUrl,
          interestedIn: formData.interestedIn,
          message: formData.message
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit form data');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong while sending. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const logos = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #F3F6FC 0%, #FFFFFF 50%, #F5F8FF 100%)',
      fontFamily: "'Outfit', sans-serif",
      color: '#1E293B'
    }}>
      {/* Global CSS for Animations and Custom Classes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0px); }
        }
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-792px); } /* 6 items * (120px width + 12px gap) = 792px */
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .floating-card-hover {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .floating-card-hover:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 15px 30px rgba(0, 82, 255, 0.12) !important;
          z-index: 20 !important;
        }
        .logo-ticker-container {
          overflow: hidden;
          width: 100%;
          max-width: 580px;
          position: relative;
          padding: 4px 0;
          mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        }
        .logo-ticker-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: logo-scroll 25s linear infinite;
        }
        .logo-ticker-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 1024px) {
          .split-container {
            flex-direction: column !important;
            height: auto !important;
            min-height: auto !important;
            padding-top: 100px !important;
            padding-bottom: 40px !important;
          }
          .left-visual-section {
            max-width: 100% !important;
            margin-bottom: 40px;
          }
        }
      `}</style>

      {/* Global Navbar Header */}
      <Navbar activeTab="contact-us" theme="light" />

      {/* Main Content Area: Compact padding and scaling to fit in single screen viewport */}
      <main style={{
        flex: 1,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '90px 24px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px',
        position: 'relative',
        zIndex: 2,
        height: 'calc(100vh - 10px)',
        minHeight: '620px',
        boxSizing: 'border-box'
      }} className="split-container">
        
        {/* Left Side: Info & Scaled Dashboard Visualization */}
        <section style={{
          flex: 1.1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '630px',
          height: '100%',
          boxSizing: 'border-box'
        }} className="left-visual-section">
          
          <h1 style={{
            fontSize: '38px',
            fontWeight: 800,
            lineHeight: '1.15',
            color: '#0F172A',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            textAlign: 'left'
          }}>
            Scale Personalized Outreach<br />
            <span style={{ color: '#0052FF' }}>Connect, Follow Up & Close More Business.</span>
          </h1>

          <p style={{
            fontSize: '14px',
            lineHeight: '1.45',
            color: '#475569',
            marginBottom: '16px',
            fontWeight: 450,
            textAlign: 'left'
          }}>
            Launch personalized outreach campaigns across multiple channels, manage follow-ups effortlessly, and keep every interaction in one place.
          </p>

          {/* Interactive/Visual Dashboard Mockup */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            height: '280px',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Center Main Dashboard Image */}
            <div style={{
              width: '88%',
              maxWidth: '450px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E2E8F0',
              zIndex: 5,
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/contact/graph.png" 
                alt="Dashboard Performance Chart"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: 'scale(1.15)',
                  transformOrigin: 'center'
                }}
              />
            </div>

            {/* Surrounding Floating Cards */}
            {/* Top-Left: Email Outreach */}
            <div className="floating-card-hover animate-float" style={{
              position: 'absolute',
              top: '5%',
              left: '-2%',
              width: '140px',
              height: '62px',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer'
            }}>
              <img 
                src="/contact/email_card.png" 
                alt="Email Outreach"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: 'scale(1.22)',
                  transformOrigin: 'center',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Bottom-Left: LinkedIn Outreach */}
            <div className="floating-card-hover animate-float-delayed" style={{
              position: 'absolute',
              bottom: '5%',
              left: '-2%',
              width: '140px',
              height: '62px',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer'
            }}>
              <img 
                src="/contact/linkedin_card.png" 
                alt="LinkedIn Outreach"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: 'scale(1.22)',
                  transformOrigin: 'center',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Top-Right: SMS Outreach */}
            <div className="floating-card-hover animate-float-delayed" style={{
              position: 'absolute',
              top: '5%',
              right: '-2%',
              width: '140px',
              height: '62px',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer'
            }}>
              <img 
                src="/contact/sms_card.png" 
                alt="SMS Outreach"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: 'scale(1.22)',
                  transformOrigin: 'center',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Bottom-Right: AI Follow-ups */}
            <div className="floating-card-hover animate-float" style={{
              position: 'absolute',
              bottom: '5%',
              right: '-2%',
              width: '140px',
              height: '62px',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              cursor: 'pointer'
            }}>
              <img 
                src="/contact/follow_up_card.png" 
                alt="AI Follow-ups"
                style={{
                  width: '100%',
                  height: 'auto',
                  transform: 'scale(1.22)',
                  transformOrigin: 'center',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
          </div>

          {/* Social Proof Section */}
          <div style={{ textAlign: 'center', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
            
            {/* Rating Text without Stars - Centered */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0052FF' }}>
                Trusted by 500+ GTM Teams
              </span>
            </div>

            {/* Infinite Horizontal Logo Ticker */}
            <div className="logo-ticker-container" style={{ margin: '0 auto 16px' }}>
              <div className="logo-ticker-track">
                {/* Render logos twice to create a seamless infinite loop */}
                {[...logos, ...logos].map((num, idx) => (
                  <div key={idx} style={{ 
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                    height: '44px',
                    width: '120px',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={`/contact/compet${num}.png`}
                      alt={`Partner Logo ${num}`}
                      style={{ 
                        height: '100%', 
                        width: '100%', 
                        objectFit: 'contain',
                        transform: 'scale(3.4)',
                        transformOrigin: 'center'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* Right Side: Form Card Container */}
        <section style={{
          flex: 0.9,
          maxWidth: '480px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
            padding: '24px 32px',
            width: '100%',
            boxSizing: 'border-box'
          }}>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h2 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#0F172A',
                  textAlign: 'center',
                  marginBottom: '2px'
                }}>
                  Tell us about yourself
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: '#64748B',
                  textAlign: 'center',
                  marginBottom: '10px'
                }}>
                  Fill in your details to get in touch with our team.
                </p>

                {/* Name & Email Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="contact-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        outline: 'none',
                        color: '#0F172A',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <label htmlFor="contact-email" style={{ fontSize: '12px', fontWeight: 600, color: '#334155', margin: 0 }}>Email address</label>
                      {emailError && <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>{emailError}</span>}
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        outline: 'none',
                        color: '#0F172A',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Phone & Company URL Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <label htmlFor="contact-phone" style={{ fontSize: '12px', fontWeight: 600, color: '#334155', margin: 0 }}>Phone number</label>
                      {phoneError && <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>{phoneError}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <select
                        value={selectedCountryIndex}
                        onChange={(e) => setSelectedCountryIndex(parseInt(e.target.value))}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 4px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          color: '#334155',
                          fontSize: '13px',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        {countries.map((c, i) => (
                          <option key={i} value={i}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          fontSize: '13.5px',
                          outline: 'none',
                          color: '#0F172A',
                          boxSizing: 'border-box',
                          minWidth: 0
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company-url" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>Company website URL</label>
                    <input
                      id="contact-company-url"
                      type="url"
                      placeholder="https://company.com"
                      value={formData.companyUrl}
                      onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        outline: 'none',
                        color: '#0F172A',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Interested In Field */}
                <div>
                  <label htmlFor="contact-interest" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '3px' }}>Interested in</label>
                  <select
                    id="contact-interest"
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      outline: 'none',
                      color: '#0F172A',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="AI SDR Agent">AI SDR Agent</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Outbound Infrastructure">Outbound Infrastructure</option>
                    <option value="Multichannel Sequencing">Multichannel Sequencing</option>
                    <option value="Pricing / Enterprise">Pricing / Enterprise</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <label htmlFor="contact-message" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>How can we help?</label>
                    <span style={{ fontSize: '10.5px', color: formData.message.length >= 200 ? '#EF4444' : '#64748B' }}>
                      {formData.message.length}/200
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    maxLength={200}
                    placeholder="How can we help? (maximum 200 characters)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      fontSize: '13.5px',
                      outline: 'none',
                      resize: 'none',
                      color: '#0F172A',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {submitError && (
                  <p style={{ color: '#EF4444', fontSize: '12.5px', marginTop: '4px', fontWeight: 500 }}>
                    ⚠️ {submitError}
                  </p>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting ? '#94A3B8' : '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '11px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    marginTop: '10px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(0, 82, 255, 0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send your message'}
                </button>

                <p style={{
                  fontSize: '11px',
                  color: '#64748B',
                  marginTop: '8px',
                  lineHeight: '1.4',
                  textAlign: 'center'
                }}>
                  By submitting, you agree to our <Link href="/terms" style={{ color: '#0052FF', textDecoration: 'underline' }}>Terms & Conditions</Link>, <Link href="/privacy-policy" style={{ color: '#0052FF', textDecoration: 'underline' }}>Privacy Policy</Link> and Cookies Policy.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  border: '2px solid #A7F3D0',
                  color: '#10B981',
                  fontSize: '24px',
                  marginBottom: '12px'
                }}>
                  ✓
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Message Sent!
                </h2>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
                  Thank you for contacting us, <strong>{formData.name}</strong>. We have received your message and will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      companyUrl: '',
                      interestedIn: 'AI SDR Agent',
                      message: ''
                    });
                    setEmailError('');
                    setPhoneError('');
                  }}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    color: '#475569',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* Footer is only visible on scroll down below the single-screen viewport */}
      <div style={{
        background: '#161920',
        width: '100%',
        padding: '60px 24px 0',
        position: 'relative',
        zIndex: 5
      }}>
        <Footer />
      </div>
    </div>
  );
}
