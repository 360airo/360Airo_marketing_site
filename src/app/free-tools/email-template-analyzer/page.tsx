"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Activity, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export default function TemplateAnalyzerPage() {
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const analyzeTemplate = async () => {
    if (!emailContent.trim()) {
      setError('Please paste your email copy to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      // We use the analyze-email endpoint
      const response = await fetch('/api/analyze-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze template. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error analyzing template.');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: "Why Analyze Your Email Copy?",
      content: "Even if your technical infrastructure is perfect, bad copy will send you straight to the spam folder or get ignored by prospects. The Template Analyzer looks for spam words, structural issues, and readability to ensure your email actually converts.",
      list: [
        ". Avoid Spam Filters",
        ". Improve Readability",
        ". Optimize Length",
        ". Increase Reply Rates"
      ]
    }
  ];

  return (
    <FreeToolTemplate
      title="Free Email Template Analyzer"
      subtitle="Score Your Copy Before You Hit Send"
      description="Paste your cold email copy below. Our AI engine will analyze it for spam triggers, reading level, and structure, giving you actionable suggestions to improve your reply rate."
      sections={sections}
      faqs={[]}
      ctaTitle="Are You Sending Invisible Emails?"
      ctaSubtitle="Fix your copy and your infrastructure. 360Airo helps you scale outbound safely."
      ctaButtonText="Explore 360Airo Infrastructure"
      calculator={
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '32px' }}>
          
          {/* Input Side */}
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Paste Your Email Copy</h3>
            
            {error && <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif' }}>{error}</div>}
            
            <textarea 
              value={emailContent} onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Hi {{first_name}},&#10;&#10;I noticed that your company is currently scaling its outbound efforts..."
              rows={12}
              style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', resize: 'vertical' }}
            />
            
            <button 
              onClick={analyzeTemplate} disabled={loading}
              style={{ width: '100%', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? 'Analyzing Copy...' : <><Search size={18} /> Analyze Template</>}
            </button>
          </div>

          {/* Results Side */}
          {result && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity color="#3B82F6" /> Analysis Report
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', marginBottom: '8px' }}>Copy Score</p>
                  <p style={{ fontSize: '48px', fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: result.score >= 80 ? '#10B981' : (result.score >= 60 ? '#F59E0B' : '#DC2626') }}>{result.score}/100</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ backgroundColor: '#F3F4F6', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#4B5563', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Word Count</span>
                    <span style={{ fontSize: '14px', color: '#111827', fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>{result.metrics?.wordCount || result.wordCount || 0}</span>
                  </div>
                  <div style={{ backgroundColor: '#F3F4F6', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#4B5563', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Reading Level</span>
                    <span style={{ fontSize: '14px', color: '#111827', fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>{result.metrics?.readingLevel || result.readingLevel || 'Grade 6'}</span>
                  </div>
                  <div style={{ backgroundColor: '#F3F4F6', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '14px', color: '#4B5563', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>Spam Words</span>
                    <span style={{ fontSize: '14px', color: result.metrics?.spamWordsFound > 0 ? '#DC2626' : '#10B981', fontFamily: '"DM Sans", sans-serif', fontWeight: 700 }}>{result.metrics?.spamWordsFound || result.spamWords || 0}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Actionable Feedback</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(result.suggestions || result.feedback || ["Good job!"]).map((fb: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: fb.toLowerCase().includes('good') || fb.toLowerCase().includes('great') ? '#F0FDF4' : '#FFFBEB', border: `1px solid ${fb.toLowerCase().includes('good') || fb.toLowerCase().includes('great') ? '#DCFCE7' : '#FEF3C7'}`, padding: '16px', borderRadius: '8px' }}>
                      {fb.toLowerCase().includes('good') || fb.toLowerCase().includes('great') ? <CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} /> : <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>{fb}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      }
    />
  );
}
