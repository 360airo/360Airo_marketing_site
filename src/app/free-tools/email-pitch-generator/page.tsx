"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Zap, Copy, Check } from 'lucide-react';

export default function PitchGeneratorPage() {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [valueProp, setValueProp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{subject: string, body: string} | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generatePitch = async () => {
    if (!product || !audience || !valueProp) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/free-tools/email-pitch-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, targetAudience: audience, valueProp }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate pitch. Please try again.');
      }

      const data = await response.json();
      setResult(data.email || { subject: data.subject || 'Generated Subject', body: data.body || 'Generated Body' });
    } catch (err: any) {
      setError(err.message || 'Error generating pitch.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: "How to Write a Winning Cold Email Pitch",
      content: "A good cold email pitch is never about your product; it's about the prospect's problem. By focusing on the target audience and their specific pain points, you can generate a pitch that resonates.",
      list: [
        ". Keep it under 100 words",
        ". Focus on the prospect's pain point",
        ". Include a clear, low-friction CTA",
        ". Avoid marketing jargon"
      ]
    }
  ];

  return (
    <FreeToolTemplate
      title="AI Email Pitch Generator"
      subtitle="Turn Features Into Meetings"
      description="Input your product, audience, and value proposition. Our AI will generate a personalized, high-converting cold email pitch in seconds."
      sections={sections}
      faqs={[]}
      ctaTitle="Want to Send This Pitch at Scale?"
      ctaSubtitle="360Airo's infrastructure allows you to send thousands of pitches without landing in spam."
      ctaButtonText="Explore Infrastructure"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827', textAlign: 'center' }}>Generate Your Pitch</h3>
            
            {error && <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif' }}>{error}</div>}
            
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>What is your product/service?</label>
              <input 
                value={product} onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g., Cold Email Infrastructure"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Who is your target audience?</label>
              <input 
                value={audience} onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., SDR Managers and Founders"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>What is the primary value proposition?</label>
              <textarea 
                value={valueProp} onChange={(e) => setValueProp(e.target.value)}
                placeholder="e.g., Helps you land in the primary inbox and scale sending without domain bans."
                rows={3}
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', resize: 'vertical' }}
              />
            </div>
            
            <button 
              onClick={generatePitch} disabled={loading}
              style={{ width: '100%', marginTop: '8px', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? 'Generating with AI...' : <><Zap size={18} /> Generate Pitch</>}
            </button>
          </div>

          {result && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#F3F4F6', padding: '16px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827' }}>AI Generated Pitch</h4>
                <button 
                  onClick={handleCopy}
                  style={{ backgroundColor: copied ? '#10B981' : '#E5E7EB', color: copied ? 'white' : '#374151', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Pitch'}
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Subject Line</span>
                  <div style={{ marginTop: '8px', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', fontFamily: '"DM Sans", sans-serif', color: '#111827', fontWeight: 700, fontSize: '18px' }}>{result.subject}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Email Body</span>
                  <div style={{ marginTop: '8px', padding: '24px', backgroundColor: '#F9FAFB', borderRadius: '8px', fontFamily: '"DM Sans", sans-serif', color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '16px' }}>{result.body}</div>
                </div>
              </div>
            </div>
          )}

        </div>
      }
    />
  );
}
