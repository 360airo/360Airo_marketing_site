"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { LayoutTemplate, Copy, Check } from 'lucide-react';

export default function TemplateBuilderPage() {
  const [templateType, setTemplateType] = useState('newsletter');
  const [purpose, setPurpose] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateTemplate = async () => {
    if (!purpose) {
      setError('Please describe the purpose of your email.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/free-tools/email-template-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateType, purpose, companyName, productName }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate template. Please try again.');
      }

      const data = await response.json();
      setResult(data.html || data.template);
    } catch (err: any) {
      setError(err.message || 'Error generating template.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: "Why Use HTML Email Templates?",
      content: "While plain text is best for cold outreach, newsletters and transactional emails perform much better with a professional, branded HTML layout. A well-designed template guides the reader's eye toward your Call to Action.",
      list: [
        ". Establish Brand Identity",
        ". Higher Click-Through Rates",
        ". Clear Visual Hierarchy",
        ". Professional Appearance"
      ]
    }
  ];

  return (
    <FreeToolTemplate
      title="AI HTML Email Template Builder"
      subtitle="Generate Responsive Email Designs in Seconds"
      description="Stop wrestling with tables and inline CSS. Tell our AI what kind of email you want to send, and it will generate a fully responsive, cross-client compatible HTML template ready for your marketing campaigns."
      sections={sections}
      faqs={[]}
      ctaTitle="Need to Send at Scale?"
      ctaSubtitle="Beautiful templates are useless if they land in spam. Deliver your newsletters to the primary inbox with 360Airo."
      ctaButtonText="Explore Infrastructure"
      calculator={
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Template Details</h3>
            
            {error && <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif' }}>{error}</div>}
            
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Template Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { value: 'newsletter', label: 'Newsletter' },
                  { value: 'promotional', label: 'Promotional' },
                  { value: 'transactional', label: 'Transactional' },
                  { value: 'announcement', label: 'Announcement' }
                ].map((t) => (
                  <button 
                    key={t.value} onClick={() => setTemplateType(t.value)}
                    style={{ padding: '10px', borderRadius: '8px', border: templateType === t.value ? '2px solid #3B82F6' : '1px solid #D1D5DB', backgroundColor: templateType === t.value ? '#EFF6FF' : 'white', color: templateType === t.value ? '#2563EB' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>What is the purpose of this email?</label>
              <textarea 
                value={purpose} onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Announcing our new Q3 product features and inviting users to a webinar."
                rows={3}
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Company Name</label>
                <input 
                  value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Optional"
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Product Name</label>
                <input 
                  value={productName} onChange={(e) => setProductName(e.target.value)}
                  placeholder="Optional"
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
                />
              </div>
            </div>
            
            <button 
              onClick={generateTemplate} disabled={loading}
              style={{ width: '100%', marginTop: '8px', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? 'Designing Template...' : <><LayoutTemplate size={18} /> Build HTML Template</>}
            </button>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#F3F4F6', padding: '16px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827' }}>Live Preview</h4>
              {result && (
                <button 
                  onClick={handleCopy}
                  style={{ backgroundColor: copied ? '#10B981' : '#E5E7EB', color: copied ? 'white' : '#374151', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied HTML' : 'Copy HTML'}
                </button>
              )}
            </div>
            <div style={{ flex: 1, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: '500px' }}>
              {result ? (
                <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} dangerouslySetInnerHTML={{ __html: result }} />
              ) : (
                <div style={{ textAlign: 'center', color: '#9CA3AF', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}>
                  Fill in your requirements and click Build to see your generated HTML template here.
                </div>
              )}
            </div>
          </div>

        </div>
      }
    />
  );
}
