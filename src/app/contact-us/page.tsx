"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'AI SDR Agent',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: '#FFFFFF',
      fontFamily: "'Outfit', sans-serif",
      color: '#1E293B'
    }}>
      <Navbar activeTab="contact-us" theme="light" />

      {/* Main Container */}
      <main style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '130px 24px 60px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Breadcrumbs */}
        <div 
          className="animate-fade-in-up"
          style={{
            fontSize: '13px',
            color: 'rgba(0, 0, 0, 0.4)',
            marginBottom: '32px',
            display: 'flex',
            gap: '8px',
            fontWeight: 500
          }}
        >
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>&gt;</span>
          <span style={{ color: '#0052FF' }}>Contact us</span>
        </div>

        {/* Form Container with Illustrations */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          marginBottom: '80px',
          gap: '40px'
        }} className="contact-form-container-flex">
          
          {/* Left Column: Both Illustrations Side-by-Side (Desktop Only) */}
          <div className="contact-illustrations-wrapper animate-fade-in-up delay-3" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flex: '1',
            maxWidth: '440px',
            position: 'relative'
          }}>
            {/* Left Illustration */}
            <div className="contact-illustration-left animate-float-left" style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              transition: 'transform 0.3s'
            }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="150" r="14" fill="rgba(0, 82, 255, 0.04)" stroke="#0052FF" strokeWidth="2"/>
                <path d="M50 164l-12 24M70 164l12 24M60 164v24" stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M60 100c-10 0-18 8-18 18v22h36v-22c0-10-8-18-18-18z" fill="rgba(0, 82, 255, 0.04)" stroke="#0052FF" strokeWidth="2"/>
                <circle cx="60" cy="85" r="10" fill="rgba(0, 82, 255, 0.04)" stroke="#0052FF" strokeWidth="2"/>
                <path d="M70 95c10-2 15-8 15-8v15H70" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M80 130h60v55" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M95 130l5-15h25l3 15" stroke="#0052FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M90 130h45" stroke="#0052FF" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Right Illustration */}
            <div className="contact-illustration-right animate-float-right" style={{
              flex: '1',
              display: 'flex',
              justifyContent: 'center',
              transition: 'transform 0.3s'
            }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 180c0-20-8-36-24-44v44h24z" fill="rgba(0, 82, 255, 0.04)" stroke="#0052FF" strokeWidth="2"/>
                <circle cx="80" cy="80" r="14" fill="rgba(0, 82, 255, 0.04)" stroke="#0052FF" strokeWidth="2"/>
                <path d="M80 94v42M66 110l-12 18M94 110l15-5" stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M109 105l25-10" stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                <rect x="134" y="90" width="30" height="8" rx="2" stroke="#0052FF" strokeWidth="1.5" fill="rgba(0, 82, 255, 0.04)"/>
              </svg>
            </div>
          </div>

          {/* Form Card */}
          <div 
            className="animate-fade-in-up delay-3"
            style={{
              maxWidth: '680px',
              width: '100%',
              padding: '40px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
              zIndex: 10,
              flex: '1.4'
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Row 1: Name and Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-form-row">
                  <div>
                    <label htmlFor="contact-name" style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        color: '#0F172A',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0052FF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.boxShadow = 'none';
                      }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>Email address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email address"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        color: '#0F172A',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0052FF';
                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 255, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#CBD5E1';
                        e.target.style.boxShadow = 'none';
                      }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Phone number and Interested in */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-form-row">
                  <div>
                    <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>Phone number</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0 12px',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        color: '#334155',
                        fontSize: '14px',
                        cursor: 'default'
                      }}>
                        <span>🇺🇸</span>
                        <span>+1</span>
                      </div>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Phone number"
                        style={{
                          flex: 1,
                          padding: '14px 16px',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: '10px',
                          color: '#0F172A',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0052FF';
                          e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#CBD5E1';
                          e.target.style.boxShadow = 'none';
                        }}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-interest" style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>Interested in</label>
                    <select
                      id="contact-interest"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        color: '#0F172A',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0052FF'}
                      onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                      value={formData.interestedIn}
                      onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    >
                      <option value="AI SDR Agent">AI SDR Agent</option>
                      <option value="Outbound Infrastructure">Outbound Infrastructure</option>
                      <option value="Multichannel Sequencing">Multichannel Sequencing</option>
                      <option value="Pricing / Enterprise">Pricing / Enterprise</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>How can we help?</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can we help?"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      color: '#0F172A',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0052FF';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 82, 255, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#CBD5E1';
                      e.target.style.boxShadow = 'none';
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit button and disclaimer */}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button type="submit" style={{
                    background: '#0052FF',
                    borderRadius: '24px',
                    padding: '14px 44px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0, 82, 255, 0.25)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 82, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 82, 255, 0.25)';
                  }}>
                    Send your message
                  </button>
                  <p style={{
                    fontSize: '12px',
                    color: '#64748B',
                    marginTop: '16px',
                    lineHeight: '1.4'
                  }}>
                    By submitting, you agree to our <Link href="#" style={{ color: '#0052FF', textDecoration: 'underline' }}>Terms & Conditions</Link>, <Link href="#" style={{ color: '#0052FF', textDecoration: 'underline' }}>Privacy Policy</Link> and Cookies Policy.
                  </p>
                </div>
              </form>
            ) : (
              <div style={{ padding: '30px 0', textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: '#10B981',
                  fontSize: '28px',
                  marginBottom: '24px'
                }}>
                  ✓
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Message Sent!</h2>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '32px' }}>
                  Thank you for contacting us, {formData.name}. We have received your message and will reach out to you within 24 hours.
                </p>

                <button 
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    padding: '12px 24px',
                    color: '#0F172A',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#E2E8F0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#F1F5F9'}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>



        </div>

        {/* Office Section */}
        <div style={{
          width: '100%',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <span 
            className="animate-fade-in-up"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#0052FF',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            Offices
          </span>
          <h2 
            className="animate-fade-in-up delay-1"
            style={{
              fontSize: '34px',
              fontWeight: 800,
              marginBottom: '40px',
              color: '#0F172A',
              letterSpacing: '-0.02em'
            }}
          >
            Get in touch with 360Airo
          </h2>

          {/* Grid: Map + Address Card */}
          <div 
            className="contact-info-grid animate-fade-in-up delay-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '24px',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
              textAlign: 'left'
            }}
          >
            
            {/* Clean Styled Map Card */}
            <div style={{
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              background: '#F8FAFC',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              height: '350px'
            }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175394468694!2d-74.01358582343274!3d40.712775371391515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a07e2c949c3%3A0xe7585a21e6992d9f!2sOne%20World%20Trade%20Center!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  opacity: 0.95 
                }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address Information Card */}
            <div style={{
              background: '#F5F2EB',
              border: 'none',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '350px'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', display: 'block', marginBottom: '6px' }}>Address</span>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', lineHeight: '1.4', marginBottom: '20px' }}>
                  One World Trade Center, Suite 85,<br />New York, NY 10007
                </p>

                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', display: 'block', marginBottom: '6px' }}>Email Address</span>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#0052FF', marginBottom: '20px' }}>
                  <a href="mailto:support@360airo.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@360airo.com</a>
                </p>

                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', display: 'block', marginBottom: '6px' }}>Phone (for sales enquiries)</span>
                <p style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', marginBottom: '0' }}>
                  +1 (800) 555-0199
                </p>
              </div>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                {['facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'github'].map((social) => {
                  const href = social === 'linkedin' ? 'https://linkedin.com' : '#';
                  const label = social === 'facebook' ? 'F' : social === 'twitter' ? 'X' : social === 'linkedin' ? 'In' : social === 'youtube' ? 'Yt' : social === 'instagram' ? 'Ig' : 'Git';
                  return (
                    <a 
                      key={social}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#475569',
                        transition: 'background 0.25s, border-color 0.25s, color 0.25s',
                        cursor: 'pointer',
                        textDecoration: 'none'
                      }}
                      className="contact-social-btn"
                    >
                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
                        {label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Dark Banner & Footer Section */}
      <div style={{
        background: '#161920',
        width: '100%',
        marginTop: '80px',
        padding: '60px 24px 0',
        borderTop: '1px solid #E2E8F0',
        position: 'relative',
        zIndex: 5
      }}>
        
        {/* Newsletter Banner */}
        <div 
          className="newsletter-banner-container animate-fade-in-up"
          style={{
            maxWidth: '1000px',
            margin: '0 auto 60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px',
            padding: '40px 60px',
            gap: '40px'
          }}
        >
          
          <div style={{ flex: 1.2, textAlign: 'left' }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.010em'
            }}>
              Get expert tips and business insights
            </h3>
            
            <form style={{ display: 'flex', gap: '12px', marginTop: '24px' }} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Email address"
                required
                style={{
                  padding: '14px 20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                  flex: 1,
                  minWidth: '240px'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: 'transparent',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '30px',
                  padding: '14px 32px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#161920';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                Subscribe
              </button>
            </form>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.35)',
              marginTop: '12px'
            }}>
              By subscribing, you agree to our <Link href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms & Conditions</Link> and <Link href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>

          {/* Right Newsletter Illustration */}
          <div style={{
            flex: 0.8,
            display: 'flex',
            justifyContent: 'center',
            opacity: 0.85
          }} className="newsletter-illustration">
            <svg width="180" height="150" viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="90" cy="75" r="45" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5"/>
              <path d="M70 70l20 20 50-50" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 120h100v4H40z" fill="rgba(255, 255, 255, 0.1)"/>
            </svg>
          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
}
