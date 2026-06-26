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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
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
            className="contact-form-card animate-fade-in-up delay-3"
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
                      <option value="Email Campaign">Email Campaign</option>
                      <option value="Outbound Infrastructure">Outbound Infrastructure</option>
                      <option value="Multichannel Sequencing">Multichannel Sequencing</option>
                      <option value="Pricing / Enterprise">Pricing / Enterprise</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label htmlFor="contact-message" style={{ fontSize: '13px', color: '#475569', fontWeight: 600, margin: 0 }}>How can we help?</label>
                    <span style={{ fontSize: '11px', color: formData.message.length >= 200 ? '#EF4444' : '#64748B', fontWeight: 500 }}>
                      {formData.message.length}/200
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={200}
                    placeholder="How can we help? (maximum 200 characters)"
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
                {submitError && (
                  <p style={{ color: '#EF4444', fontSize: '13px', margin: '4px 0 16px', textAlign: 'center', fontWeight: 500 }}>
                    ⚠️ {submitError}
                  </p>
                )}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting ? '#94A3B8' : '#0052FF',
                      borderRadius: '24px',
                      padding: '14px 44px',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 600,
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(0, 82, 255, 0.25)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 82, 255, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 82, 255, 0.25)';
                      }
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send your message'}
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
            Get in <span className="contact-heading-shine">touch with 360Airo</span>
          </h2>

          {/* Grid: Address Card Centered */}
          <div 
            className="contact-info-grid animate-fade-in-up delay-2"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              margin: '0 auto',
            }}
          >

            {/* Neumorphic Address Card */}
            <div 
              className="contact-address-card"
              style={{
                background: '#F1F5F9', // Soft gray for neumorphism
                border: 'none',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                maxWidth: '900px',
                boxShadow: '12px 12px 24px #cbd5e1, -12px -12px 24px #ffffff',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '40px',
                textAlign: 'left'
              }}
            >
              {/* Address Column */}
              <div>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  color: '#64748B',
                  marginBottom: '16px'
                }}>
                  Office Location
                </h3>
                <p style={{ fontSize: '16px', fontWeight: 500, color: '#0F172A', lineHeight: '1.6', margin: '0 0 12px 0' }}>
                  #744 - 9314 Forest Hill Blvd,<br />Wellington, FL 33411
                </p>
                <p style={{ fontSize: '15px', color: '#64748B', margin: '0' }}>United States</p>
              </div>

              {/* Contact Information Column */}
              <div>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  color: '#64748B',
                  marginBottom: '16px'
                }}>
                  Contact Information
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="mailto:info@360airo.com" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#0052FF',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '15px',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e)=>e.currentTarget.style.opacity='0.8'}
                  onMouseLeave={(e)=>e.currentTarget.style.opacity='1'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    info@360airo.com
                  </a>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a href="tel:+15612574066" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#0F172A',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '15px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e)=>e.currentTarget.style.color='#0052FF'}
                    onMouseLeave={(e)=>e.currentTarget.style.color='#0F172A'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      +1 (561) 257-4066
                    </a>
                    
                    <a href="tel:+15614893335" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#0F172A',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '15px',
                      transition: 'color 0.2s',
                      paddingLeft: '28px'
                    }}
                    onMouseEnter={(e)=>e.currentTarget.style.color='#0052FF'}
                    onMouseLeave={(e)=>e.currentTarget.style.color='#0F172A'}
                    >
                      +1 (561) 489-3335
                    </a>
                  </div>
                </div>
              </div>


              {/* Social Icons Column */}
              <div>
                <h3 style={{ 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  color: '#64748B',
                  marginBottom: '16px'
                }}>
                  Follow Us
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Facebook */}
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                  </a>
                  {/* X */}
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                  </a>
                  {/* GitHub */}
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: 'none', boxShadow: '5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', transition: 'all 0.2s' }} onMouseEnter={(e)=>{e.currentTarget.style.color='#0052FF'; e.currentTarget.style.boxShadow='inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff'}} onMouseLeave={(e)=>{e.currentTarget.style.color='#475569'; e.currentTarget.style.boxShadow='5px 5px 10px #cbd5e1, -5px -5px 10px #ffffff'}}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                  </a>
                </div>
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
