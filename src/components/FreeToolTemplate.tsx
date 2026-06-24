"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/free-tools.css';

interface FAQ {
  q: string;
  a: string;
}

interface FreeToolTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  calculator?: React.ReactNode;
  sections: { title: string; content?: string; list?: string[] }[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export default function FreeToolTemplate({
  title, subtitle, description, calculator, sections, faqs, ctaTitle, ctaSubtitle, ctaButtonText
}: FreeToolTemplateProps) {
  return (
    <div className="ft-site" style={{ backgroundColor: '#FDFDFE', color: '#1A1E26', position: 'relative', overflow: 'hidden' }}>
      <Navbar activeTab="free-tools" />
      
      {/* Vibrant Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-20%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />

      <main style={{ paddingTop: '120px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
        <div className="ft-container" style={{ maxWidth: '800px' }}>

          <header style={{ marginBottom: '48px', textAlign: 'center' }}>
            <h1 className="ft-outfit-heading ft-page-title">{title}</h1>
            <h2 className="ft-page-subtitle">{subtitle}</h2>
            <p className="ft-page-desc">{description}</p>
          </header>

          {calculator && (
            <div style={{ position: 'relative', marginBottom: '80px' }}>
              <div style={{ position: 'absolute', inset: -2, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)', borderRadius: '24px', opacity: 0.15, filter: 'blur(10px)' }} />
              <div style={{ position: 'relative', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}>
                {calculator}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '64px' }}>
            {sections.map((sec, i) => (
              <section key={i}>
                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: '28px', color: '#111827', textTransform: 'uppercase', marginBottom: '16px' }}>{sec.title}</h3>
                {sec.content && <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#4B5563', lineHeight: 1.6, marginBottom: '16px' }}>{sec.content}</p>}
                {sec.list && sec.list.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {sec.list.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#374151' }}>
                        <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        {item.replace(/^\.\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section style={{ marginBottom: '64px', backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '40px 32px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 900, fontSize: '32px', color: '#111827', textTransform: 'uppercase', marginBottom: '32px', textAlign: 'center' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h4 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 600, fontSize: '18px', color: '#111827', marginBottom: '8px' }}>{faq.q}</h4>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#4B5563', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ textAlign: 'center', backgroundColor: '#111827', borderRadius: '16px', padding: '48px 32px', color: '#FFFFFF' }}>
            <h2 className="ft-outfit-heading" style={{ fontSize: '36px', marginBottom: '16px' }}>{ctaTitle}</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', color: '#9CA3AF', marginBottom: '32px' }}>{ctaSubtitle}</p>
            <button style={{ backgroundColor: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '100px', padding: '16px 32px', fontSize: '16px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', cursor: 'pointer' }}>
              {ctaButtonText}
            </button>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
