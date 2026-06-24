"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Search, AlertTriangle, ShieldCheck } from 'lucide-react';

const SPAM_WORDS = [
  'free', 'guarantee', 'increase sales', 'order now', 'buy direct', 'cash', 'earn money',
  'get paid', 'make money', 'no credit card', 'save big', 'special promotion', 'act now',
  'apply now', 'click here', 'do it today', 'don\'t delete', 'exclusive deal', 'get it now',
  'urgent', 'winner', 'winning', 'won', 'you have been selected', '100% free', 'bonus',
  'cheap', 'discount', 'lowest price', 'sale', 'trial', 'unlimited', 'dear friend',
  'opportunity', 'promise', 'risk free', 'satisfaction guaranteed'
];

export default function SpamCheckerPage() {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<any>(null);

  const checkSpam = () => {
    if (!emailContent.trim()) {
      alert("Please enter email content.");
      return;
    }

    const lowerContent = emailContent.toLowerCase();
    const foundWords = SPAM_WORDS.filter(word => lowerContent.includes(word));
    
    let score = 100;
    score -= (foundWords.length * 15);
    if (score < 0) score = 0;

    let riskLevel = 'Low Risk';
    if (score < 80) riskLevel = 'Medium Risk';
    if (score < 50) riskLevel = 'High Risk';

    setResult({
      score,
      riskLevel,
      foundWords
    });
  };

  const sections = [
    {
      title: "Why Check for Spam Words?",
      content: "Email providers use advanced algorithms to detect spam. While algorithms look at many factors, certain 'trigger words' related to money, urgency, or exaggerated claims drastically increase your chances of landing in the spam folder.",
      list: [
        ". Avoid Spam Filters",
        ". Ensure Inbox Placement",
        ". Maintain Domain Reputation",
        ". Sound More Human"
      ]
    }
  ];

  return (
    <FreeToolTemplate
      title="Free Email Spam Checker"
      subtitle="Detect Spam Triggers Before You Send"
      description="Don't let a few bad words ruin your campaign. Paste your email copy below and we'll instantly highlight high-risk spam words that could trigger filters."
      sections={sections}
      faqs={[]}
      ctaTitle="Spam Words Are Just One Piece of the Puzzle"
      ctaSubtitle="Even perfect copy goes to spam if your infrastructure is bad. Learn how to build a scalable, safe outbound system."
      ctaButtonText="Explore Infrastructure"
      calculator={
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '32px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Scan Your Copy</h3>
            
            <textarea 
              value={emailContent} onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste your email subject and body here..."
              rows={10}
              style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', resize: 'vertical' }}
            />
            
            <button 
              onClick={checkSpam}
              style={{ width: '100%', backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Search size={18} /> Check for Spam Triggers
            </button>
          </div>

          {result && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Spam Analysis</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: result.score >= 80 ? '#F0FDF4' : (result.score >= 50 ? '#FFFBEB' : '#FEF2F2'), border: `1px solid ${result.score >= 80 ? '#DCFCE7' : (result.score >= 50 ? '#FEF3C7' : '#FEE2E2')}`, borderRadius: '12px', padding: '24px' }}>
                  {result.score >= 80 ? <ShieldCheck size={48} color="#10B981" /> : <AlertTriangle size={48} color={result.score >= 50 ? '#F59E0B' : '#DC2626'} />}
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', marginBottom: '4px' }}>Spam Risk Level</p>
                    <p style={{ fontSize: '32px', fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: result.score >= 80 ? '#10B981' : (result.score >= 50 ? '#F59E0B' : '#DC2626'), lineHeight: 1 }}>{result.riskLevel}</p>
                    <p style={{ fontSize: '14px', color: '#4B5563', fontFamily: '"DM Sans", sans-serif', marginTop: '8px' }}>Safety Score: {result.score}/100</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>Triggers Found ({result.foundWords.length})</h4>
                {result.foundWords.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {result.foundWords.map((word: string, i: number) => (
                      <span key={i} style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '6px 12px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', textTransform: 'lowercase' }}>
                        "{word}"
                      </span>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '16px', backgroundColor: '#F0FDF4', color: '#15803D', borderRadius: '8px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>
                    Great! No common spam triggers were detected in your copy.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      }
    />
  );
}
