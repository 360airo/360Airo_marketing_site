"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Zap, Copy } from 'lucide-react';

interface EmailStep {
  id: string;
  name: string;
  subject: string;
  body: string;
  delayDays?: number;
}

export default function SequenceBuilderPage() {
  const [mood, setMood] = useState('professional');
  const [creativeLevel, setCreativeLevel] = useState('Medium');
  const [keywords, setKeywords] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sequences, setSequences] = useState<EmailStep[]>([]);
  const [showResults, setShowResults] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGenerateSequence = async () => {
    if (!mood || !creativeLevel || !keywords || !emailAddress) {
      setError('Please fill in all fields before generating.');
      return;
    }
    if (!validateEmail(emailAddress)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/free-tools/email-sequencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood, creativeLevel, keywords, recipientEmail: emailAddress
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate sequence');
      }

      const data = await response.json();
      setSequences(data.emails || []);
      setShowResults(true);
    } catch (err) {
      setError('Failed to generate sequence. Please try again or check your API limits.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = (index: number) => {
    const email = sequences[index];
    const text = `Subject: ${email.subject}\n\n${email.body}`;
    navigator.clipboard.writeText(text);
    alert('Email copied to clipboard!');
  };

  const handleReset = () => {
    setShowResults(false);
    setSequences([]);
    setKeywords('');
  };

  const sections = [
    {
      title: "Why Use An AI Sequence Builder?",
      content: "Writing follow-up emails takes time. Worse, most sales reps use generic templates that prospects ignore. Our AI Sequence Builder analyzes your audience and offer to generate multi-touch sequences that feel personal, relevant, and human.",
      list: [
        ". Scale Outreach Faster",
        ". Reduce Manual Work",
        ". Launch Campaigns Faster"
      ]
    },
    // Truncated for brevity...
  ];

  const faqs = [
    {
      q: "What is an email sequence builder?",
      a: "An email sequence builder helps create a structured series of emails and follow-ups that are sent over time to prospects."
    }
  ];

  return (
    <FreeToolTemplate
      title="Free AI Email Sequence Builder"
      subtitle="Instantly Create Personalized Cold Email Sequences"
      description="Writing effective cold emails is hard. Following up is even harder. Use the 360 AIRO Email Sequence Builder to instantly generate multi-touch outreach sequences designed to start conversations and book more meetings."
      sections={sections}
      faqs={faqs}
      ctaTitle="Still Writing Every Follow-Up Manually?"
      ctaSubtitle="Your Competitors Are Launching Campaigns While You're Still Drafting Email #2. Generate personalized cold email sequences in seconds."
      ctaButtonText="Generate My Free Email Sequence"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          
          {!showResults ? (
            <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', marginBottom: '24px', textAlign: 'center', color: '#111827' }}>AI Sequence Generator</h3>
              
              {error && <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', textAlign: 'center' }}>{error}</div>}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Tone / Mood</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {['friendly', 'professional', 'humorous', 'bold'].map((m) => (
                      <button 
                        key={m}
                        onClick={() => setMood(m)}
                        style={{ padding: '10px', borderRadius: '8px', border: mood === m ? '2px solid #8B5CF6' : '1px solid #D1D5DB', backgroundColor: mood === m ? '#F5F3FF' : 'white', color: mood === m ? '#6D28D9' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textTransform: 'capitalize' }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Creative Level</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {['Low', 'Medium', 'High'].map((cl) => (
                      <button 
                        key={cl}
                        onClick={() => setCreativeLevel(cl)}
                        style={{ padding: '10px', borderRadius: '8px', border: creativeLevel === cl ? '2px solid #8B5CF6' : '1px solid #D1D5DB', backgroundColor: creativeLevel === cl ? '#F5F3FF' : 'white', color: creativeLevel === cl ? '#6D28D9' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
                      >
                        {cl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Value Proposition & Keywords</label>
                  <textarea 
                    placeholder="e.g. We help sales teams automate their outbound infrastructure..." 
                    rows={3} 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }} 
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Target Recipient Email Context (Optional Role/Domain)</label>
                  <input 
                    placeholder="e.g. vp.sales@saas.com" 
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }} 
                  />
                </div>
              </div>
              <button 
                onClick={handleGenerateSequence} 
                disabled={loading}
                style={{ width: '100%', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? 'Generating sequence with AI...' : <><Zap size={18} /> Generate Sequence</>}
              </button>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Your AI Sequence</h3>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#6B7280', fontSize: '14px' }}>{sequences.length} emails ready to send • Mood: <span style={{textTransform: 'capitalize', fontWeight: 600}}>{mood}</span></p>
                </div>
                <button 
                  onClick={handleReset}
                  style={{ backgroundColor: 'transparent', border: '1px solid #D1D5DB', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, color: '#374151' }}
                >
                  Generate Another
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {sequences.map((email, index) => (
                  <div key={email.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <div style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '16px', color: '#111827' }}>Email {index + 1}</h4>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>Send after {email.delayDays} days</p>
                      </div>
                      <button 
                        onClick={() => handleCopyEmail(index)}
                        style={{ backgroundColor: 'transparent', border: 'none', color: '#8B5CF6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}
                      >
                        <Copy size={14} /> Copy
                      </button>
                    </div>
                    <div style={{ padding: '24px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Subject</span>
                        <div style={{ marginTop: '4px', padding: '12px', backgroundColor: '#F3F4F6', borderRadius: '8px', fontFamily: '"DM Sans", sans-serif', color: '#111827', fontWeight: 600 }}>{email.subject}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Body</span>
                        <div style={{ marginTop: '4px', padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '8px', fontFamily: '"DM Sans", sans-serif', color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{email.body}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      }
    />
  );
}
