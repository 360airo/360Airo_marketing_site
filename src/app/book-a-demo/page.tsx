"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BookADemoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', prospects: '500-2000', timezone: 'EST' });
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
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #020817 0%, #06122B 38%, #081B3E 68%, #020817 100%)',
      fontFamily: "'Outfit', sans-serif",
      color: '#fff'
    }}>
      {/* Decorative Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(14, 181, 187, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <Navbar activeTab="book-a-demo" />

      {/* Main Container */}
      <main style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px'
      }}>
        <div style={{
          maxWidth: '560px',
          width: '100%',
          padding: '40px 32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          textAlign: 'center'
        }}>
          {!submitted ? (
            <>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(14, 181, 187, 0.15), rgba(59, 130, 246, 0.15))',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px',
                fontSize: '24px'
              }}>
                📅
              </div>

              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #fff 70%, rgba(255, 255, 255, 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                Book a Demo
              </h1>

              <p style={{
                fontSize: '15px',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.5',
                marginBottom: '28px'
              }}>
                Schedule a custom live demo of 360Airo outbound engine and see how we automate campaign prospecting with 360marco verified contacts.
              </p>

              <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="demo-name" style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>Your Name</label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="demo-email" style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>Work Email</label>
                    <input
                      id="demo-email"
                      type="email"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="demo-company" style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>Company Name</label>
                    <input
                      id="demo-company"
                      type="text"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0EB5BB'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label htmlFor="demo-prospects" style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>Monthly Outreach Volume</label>
                    <select
                      id="demo-prospects"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(3, 7, 18, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                      value={formData.prospects}
                      onChange={(e) => setFormData({ ...formData, prospects: e.target.value })}
                    >
                      <option value="under-500">Under 500 prospects</option>
                      <option value="500-2000">500 - 2,000 prospects</option>
                      <option value="2000-10000">2,000 - 10,000 prospects</option>
                      <option value="10000-plus">10,000+ prospects</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="demo-timezone" style={{ display: 'block', fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', fontWeight: 600 }}>Your Timezone</label>
                    <select
                      id="demo-timezone"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(3, 7, 18, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    >
                      <option value="EST">EST / America</option>
                      <option value="PST">PST / America</option>
                      <option value="GMT">GMT / London</option>
                      <option value="CET">CET / Europe</option>
                      <option value="IST">IST / India</option>
                      <option value="SGT">SGT / Singapore</option>
                    </select>
                  </div>
                </div>

                <button type="submit" style={{
                  background: 'linear-gradient(135deg, #0EB5BB, #3B82F6)',
                  borderRadius: '10px',
                  padding: '14px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(14, 181, 187, 0.25)',
                  marginTop: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(14, 181, 187, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(14, 181, 187, 0.25)';
                }}>
                  Schedule Demo Request
                </button>
              </form>
            </>
          ) : (
            <div style={{ padding: '20px 0' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(14, 181, 187, 0.1)',
                border: '1px solid rgba(14, 181, 187, 0.2)',
                color: '#0EB5BB',
                fontSize: '28px',
                marginBottom: '24px'
              }}>
                ✓
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Request Submitted!</h2>
              <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1.6', marginBottom: '32px' }}>
                Thank you, {formData.name}. We have received your demo request for {formData.company}. An outbound specialist will contact you at {formData.email} shortly to coordinate a calendar slot.
              </p>

              <button 
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                Request Different Demo
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
