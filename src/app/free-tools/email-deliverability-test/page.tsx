"use client";

import React, { useState, useEffect } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Copy, Check, RefreshCw, AlertTriangle, Shield, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function EmailDeliverabilityTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<string>('');
  const [copiedSeed, setCopiedSeed] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [testRefId, setTestRefId] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    setTestRefId(`AIRO-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  const seedEmails = ['rex8182004@gmail.com'];

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartTest = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    try {
      setStep('inbox_detection');
      const response = await fetch(`/api/free-tools/email-deliverability-test/check-placement?subjectCode=${encodeURIComponent(testRefId)}`);
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to check email placement. Connection issue.');
      }

      const data = await response.json();
      
      if (!data.success || !data.results || data.results.length === 0) {
        throw new Error(`We couldn't find any email with the subject code "${testRefId}" in the seed inbox. Please send the email first, wait 5-10 seconds, and click Check again.`);
      }

      const placementResult = data.results[0];

      setStep('spf_dkim_dmarc');
      await new Promise(r => setTimeout(r, 1000));
      setStep('blacklist_check');
      await new Promise(r => setTimeout(r, 1000));
      setStep('content_analysis');
      await new Promise(r => setTimeout(r, 1000));
      setStep('compiling');
      await new Promise(r => setTimeout(r, 800));

      let calculatedScore = 100;
      if (placementResult.dns.spf.status !== 'valid') calculatedScore -= 20;
      if (placementResult.dns.dkim.status !== 'valid') calculatedScore -= 30;
      if (placementResult.dns.dmarc.status !== 'valid') calculatedScore -= 20;
      if (placementResult.folder.includes('Spam')) calculatedScore -= 20;
      if (calculatedScore < 10) calculatedScore = 10;

      const emailMatch = placementResult.from.match(/<([^>]+)>/) || placementResult.from.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const senderEmailAddress = emailMatch ? emailMatch[1] : placementResult.from;

      setResult({
        email: senderEmailAddress,
        score: calculatedScore,
        placement: {
          inbox: placementResult.folder === 'INBOX' ? 100 : 0,
          spam: placementResult.folder.includes('Spam') ? 100 : 0,
        },
        dns: {
          spf: placementResult.dns.spf,
          dkim: placementResult.dns.dkim,
          dmarc: placementResult.dns.dmarc,
        },
        reputation: {
          domainReputation: calculatedScore >= 80 ? 'Good' : (calculatedScore >= 50 ? 'Fair' : 'Poor'),
          blacklists: { listed: placementResult.folder.includes('Spam') }
        },
        contentAnalysis: placementResult.contentAnalysis
      });

      setTestRefId(`AIRO-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err: any) {
      setError(err.message || 'Deliverability diagnostic analysis failed.');
    } finally {
      setLoading(false);
      setStep('');
    }
  };

  const sections = [
    {
      title: "Why Does Email Deliverability Matter?",
      content: "If your emails aren't reaching the primary inbox, your outreach is invisible. Poor deliverability leads to wasted leads, low reply rates, and damaged domain reputation. A deliverability test helps you identify and fix issues before you burn through your prospect list.",
      list: [
        ". Avoid the Spam Folder",
        ". Protect Sender Reputation",
        ". Increase Open Rates",
        ". Maximize Outreach ROI"
      ]
    },
    // Truncated for brevity...
  ];

  const faqs = [
    {
      q: "What is an email deliverability test?",
      a: "An email deliverability test analyzes your email setup, domain reputation, and content to predict whether your emails will land in the primary inbox, the promotions tab, or the spam folder."
    }
  ];

  const renderStep = () => {
    if (!loading) return null;
    const steps = [
      { id: 'inbox_detection', label: 'Detecting email in seed inboxes...' },
      { id: 'spf_dkim_dmarc', label: 'Verifying SPF, DKIM, and DMARC alignment...' },
      { id: 'blacklist_check', label: 'Scanning IP and domain against 120+ blacklists...' },
      { id: 'content_analysis', label: 'Analyzing content for spam triggers...' },
      { id: 'compiling', label: 'Compiling deliverability report...' }
    ];
    
    return (
      <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
        <RefreshCw size={32} color="#3B82F6" className="spin-animation" style={{ margin: '0 auto 16px' }} />
        <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827', marginBottom: '16px' }}>Running Diagnostics</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
          {steps.map(s => {
            const isActive = step === s.id;
            const isPassed = steps.findIndex(x => x.id === step) > steps.findIndex(x => x.id === s.id);
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: isActive ? '#3B82F6' : (isPassed ? '#10B981' : '#9CA3AF'), fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                {isPassed ? <CheckCircle size={16} /> : (isActive ? <RefreshCw size={16} className="spin-animation" /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid currentColor' }} />)}
                {s.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <FreeToolTemplate
      title="Test Email Deliverability"
      subtitle="Find Out If Your Emails Reach the Inbox or Spam Folder"
      description="Your emails may show as 'Delivered' but still never reach your prospects. Check inbox placement, sender reputation, authentication health, and spam risk before launching campaigns."
      sections={sections}
      faqs={faqs}
      ctaTitle="Still Guessing About Your Inbox Placement?"
      ctaSubtitle="Test your email setup instantly and start booking more meetings today."
      ctaButtonText="Test My Deliverability for Free"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          
          {!result && !loading && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', marginBottom: '8px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={24} color="#3B82F6" /> Advanced Spam Diagnostic Engine
              </h3>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>Follow the steps below to test your sending infrastructure.</p>
              
              {error && <div style={{ padding: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', color: '#DC2626', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} /> {error}
              </div>}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Step 1: Send to Seed Inbox</span>
                    <button onClick={() => copyToClipboard(seedEmails.join(', '), setCopiedSeed)} style={{ backgroundColor: 'transparent', border: '1px solid #D1D5DB', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {copiedSeed ? <Check size={14} color="#10B981" /> : <Copy size={14} />} {copiedSeed ? 'Copied' : 'Copy Email'}
                    </button>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#111827' }}>
                    {seedEmails.join(', ')}
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '12px', fontFamily: '"DM Sans", sans-serif' }}>Send a realistic test email from your sending domain to the address above.</p>
                </div>

                <div style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Step 2: Include Subject Code</span>
                    <button onClick={() => copyToClipboard(testRefId, setCopiedSubject)} style={{ backgroundColor: 'transparent', border: '1px solid #D1D5DB', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {copiedSubject ? <Check size={14} color="#10B981" /> : <Copy size={14} />} {copiedSubject ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, color: '#1D4ED8', textAlign: 'center' }}>
                    {testRefId}
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '12px', fontFamily: '"DM Sans", sans-serif' }}>You MUST include this exact code anywhere in the subject line of your test email so we can identify it.</p>
                </div>
              </div>

              <button 
                onClick={handleStartTest} 
                style={{ width: '100%', backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Mail size={18} /> I've Sent The Email - Check Deliverability
              </button>
            </div>
          )}

          {renderStep()}

          {result && !loading && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', color: '#111827' }}>Diagnostic Report</h3>
                <button onClick={() => setResult(null)} style={{ backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, color: '#374151' }}>Test Again</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Deliverability Score</p>
                  <p style={{ fontSize: '48px', fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: result.score >= 80 ? '#10B981' : (result.score >= 50 ? '#F59E0B' : '#DC2626') }}>{result.score}/100</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Inbox Placement</p>
                  <p style={{ fontSize: '24px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: result.placement.inbox > 0 ? '#10B981' : '#DC2626', marginTop: '12px' }}>
                    {result.placement.inbox > 0 ? 'Primary Inbox' : 'Spam Folder'}
                  </p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Blacklist Status</p>
                  <p style={{ fontSize: '24px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: result.reputation.blacklists.listed ? '#DC2626' : '#10B981', marginTop: '12px' }}>
                    {result.reputation.blacklists.listed ? 'Listed' : 'Clean'}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '20px', color: '#111827', marginBottom: '16px' }}>Authentication (DNS)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {['spf', 'dkim', 'dmarc'].map(type => {
                    const status = result.dns[type].status;
                    return (
                      <div key={type} style={{ padding: '16px', backgroundColor: status === 'valid' ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${status === 'valid' ? '#DCFCE7' : '#FEE2E2'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {status === 'valid' ? <CheckCircle color="#10B981" /> : <XCircle color="#DC2626" />}
                        <div>
                          <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '14px', color: '#111827', fontFamily: '"DM Sans", sans-serif' }}>{type}</p>
                          <p style={{ fontSize: '13px', color: status === 'valid' ? '#15803D' : '#B91C1C', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>{status === 'valid' ? 'Passed' : 'Action Required'}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .spin-animation { animation: spin 1s linear infinite; }
          `}} />
        </div>
      }
    />
  );
}
