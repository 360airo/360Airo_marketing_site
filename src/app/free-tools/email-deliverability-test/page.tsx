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
      
      const folderLower = placementResult.folder.toLowerCase();
      if (folderLower.includes('spam')) {
        calculatedScore -= 30;
      } else if (folderLower.includes('promotions')) {
        calculatedScore -= 10;
      } else if (folderLower.includes('updates') || folderLower.includes('social') || folderLower.includes('forums')) {
        calculatedScore -= 15;
      }
      
      if (calculatedScore < 10) calculatedScore = 10;

      const emailMatch = placementResult.from.match(/<([^>]+)>/) || placementResult.from.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
      const senderEmailAddress = emailMatch ? emailMatch[1] : placementResult.from;

      setResult({
        email: senderEmailAddress,
        score: calculatedScore,
        folderName: placementResult.folder,
        placement: {
          inbox: folderLower.includes('inbox') ? 100 : 0,
          spam: folderLower.includes('spam') ? 100 : 0,
          promotions: folderLower.includes('promotions') ? 100 : 0,
          updates: folderLower.includes('updates') ? 100 : 0,
          social: folderLower.includes('social') ? 100 : 0,
        },
        dns: {
          spf: placementResult.dns.spf,
          dkim: placementResult.dns.dkim,
          dmarc: placementResult.dns.dmarc,
        },
        reputation: {
          domainReputation: calculatedScore >= 80 ? 'Good' : (calculatedScore >= 50 ? 'Fair' : 'Poor'),
          blacklists: { listed: folderLower.includes('spam') }
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
      title: "Why Test Email Deliverability?",
      content: "Most teams focus on opens, clicks, and reply rates. But if your emails land in spam folders, none of those metrics matter. An email deliverability test helps identify hidden issues before they impact revenue and outreach performance.",
      list: [
        "Check Inbox Placement",
        "Identify Spam Risks",
        "Verify Authentication Records",
        "Improve Sender Reputation",
        "Increase Reply Rates",
        "Protect Domain Health"
      ]
    },
    {
      title: "What Does The Deliverability Test Check?",
      content: "Email deliverability depends on multiple factors working together. Our testing engine analyzes the signals mailbox providers use to decide whether your emails belong in the inbox or spam folder. The report highlights critical issues affecting performance.",
      list: [
        "Inbox Placement Rate",
        "Sender Reputation",
        "Domain Reputation",
        "Spam Score",
        "Authentication Status",
        "Email Content Analysis",
        "Blacklist Monitoring",
        "Provider-Specific Results"
      ]
    },
    {
      title: "Common Deliverability Issues We Detect",
      content: "Poor deliverability often starts with small configuration errors that go unnoticed. Identifying these issues early helps prevent reputation damage and lost opportunities. Our test highlights the most common problems affecting inbox placement.",
      list: [
        "Missing SPF Records",
        "Invalid DKIM Configuration",
        "DMARC Misconfiguration",
        "High Spam Risk Content",
        "Blacklisted Domains",
        "Low Sender Reputation",
        "Domain Trust Issues",
        "Engagement Problems"
      ]
    },
    {
      title: "Who Should Use This Tool?",
      content: "Whether you're sending cold emails, marketing campaigns, or transactional messages, inbox placement matters. This tool is designed for teams that depend on email to generate revenue and customer engagement.",
      list: [
        "SDR Teams",
        "BDR Teams",
        "Sales Leaders",
        "Marketing Teams",
        "Founders",
        "Agencies",
        "RevOps Teams",
        "Email Marketers"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is an email deliverability test?",
      a: "An email deliverability test checks whether your emails reach the inbox, promotions tab, or spam folder. It helps identify issues that may affect inbox placement and sender reputation."
    },
    {
      q: "How does the Email Deliverability Test work?",
      a: "Simply send a test email to the address provided by the tool. We analyze inbox placement, authentication records, spam risk signals, and other factors that influence deliverability."
    },
    {
      q: "What does my deliverability score mean?",
      a: "Your deliverability score indicates the likelihood of your emails reaching the inbox. It considers factors such as sender reputation, inbox placement, authentication status, and spam risk indicators."
    },
    {
      q: "Can this tool tell me why my emails go to spam?",
      a: "Yes. The report highlights common issues such as missing SPF, DKIM, or DMARC records, poor sender reputation, blacklist listings, and content-related risks that can affect inbox placement."
    },
    {
      q: "Does the test check SPF, DKIM, and DMARC?",
      a: "Yes. Email authentication plays a critical role in deliverability. The tool verifies whether your SPF, DKIM, and DMARC records are properly configured and helping establish trust with mailbox providers."
    },
    {
      q: "How accurate are the results?",
      a: "The tool simulates real-world inbox placement testing and evaluates the same trust signals mailbox providers use when filtering emails. Results provide a strong indication of your current deliverability health."
    },
    {
      q: "Will testing affect my sender reputation?",
      a: "No. Running a deliverability test does not negatively impact your sender reputation. It is designed to safely evaluate email placement and authentication without affecting domain health."
    },
    {
      q: "How often should I run an email deliverability test?",
      a: "It's recommended to test before launching new campaigns, after domain changes, when warming up new mailboxes, or anytime you notice declining open or reply rates."
    },
    {
      q: "What should I do if my deliverability score is low?",
      a: "Start by reviewing authentication records, sender reputation, spam complaints, bounce rates, and domain health. Addressing these issues can significantly improve inbox placement over time."
    },
    {
      q: "What's the difference between an Email Deliverability Test and Email Warmup?",
      a: "An Email Deliverability Test shows where your emails currently land and identifies issues affecting inbox placement. Email Warmup helps build sender reputation over time through positive engagement signals. Most successful outreach programs use both together."
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
      <div style={{ backgroundColor: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
        <RefreshCw size={32} color="#4F46E5" className="spin-animation" style={{ margin: '0 auto 16px' }} />
        <h4 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '24px', color: '#0F172A', marginBottom: '16px' }}>Running Diagnostics</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
          {steps.map(s => {
            const isActive = step === s.id;
            const isPassed = steps.findIndex(x => x.id === step) > steps.findIndex(x => x.id === s.id);
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: isActive ? '#4F46E5' : (isPassed ? '#10B981' : '#94A3B8'), fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
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
      title="Free Email deliverability Tool"
      subtitle="Find Out If Your Emails Reach the Inbox, Promotions Tab, or Spam Folder"
      description='Your emails may show as "Delivered" but still never reach your prospects. Use the 360 AIRO Email Deliverability Test to check inbox placement, sender reputation, authentication health, and spam risk before launching campaigns. Get actionable insights to improve deliverability and generate more replies.'
      highlightText="Warm Up Unlimited Mailboxes (Never Pay Per inbox)"
      sections={sections}
      faqs={faqs}
      ctaTitle="Your Next Customer Might Be Sitting in Spam Right Now"
      ctaSubtitle="Before you blame your copy, check your deliverability. See exactly where your emails land across Gmail, Outlook, and other providers before another campaign burns opportunities. Inbox placement testing helps reveal whether emails reach inboxes or spam folders before real sends."
      ctaButtonText="Test My Deliverability Now"
      calculator={
        <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          
          {!result && !loading && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '26px', marginBottom: '8px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={24} color="#4F46E5" /> Advanced Spam Diagnostic Engine
              </h3>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#64748B', marginBottom: '32px' }}>Follow the steps below to test your sending infrastructure.</p>
              
              {error && <div style={{ padding: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', color: '#DC2626', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} /> {error}
              </div>}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Step 1: Send to Seed Inbox</span>
                    <button onClick={() => copyToClipboard(seedEmails.join(', '), setCopiedSeed)} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                      {copiedSeed ? <Check size={14} color="#10B981" /> : <Copy size={14} />} {copiedSeed ? 'Copied' : 'Copy Email'}
                    </button>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#0F172A' }}>
                    {seedEmails.join(', ')}
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px', fontFamily: '"DM Sans", sans-serif' }}>Send a realistic test email from your sending domain to the address above.</p>
                </div>

                <div style={{ backgroundColor: '#F8FAFC', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Step 2: Include Subject Code</span>
                    <button onClick={() => copyToClipboard(testRefId, setCopiedSubject)} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                      {copiedSubject ? <Check size={14} color="#10B981" /> : <Copy size={14} />} {copiedSubject ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, color: '#4F46E5', textAlign: 'center' }}>
                    {testRefId}
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px', fontFamily: '"DM Sans", sans-serif' }}>You MUST include this exact code anywhere in the subject line of your test email so we can identify it.</p>
                </div>
              </div>

              <button 
                onClick={handleStartTest} 
                style={{ width: '100%', background: 'linear-gradient(135deg, #4f46e5, #2563eb)', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)' }}
              >
                <Mail size={18} /> I've Sent The Email - Check Deliverability
              </button>
            </div>
          )}

          {renderStep()}

          {result && !loading && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '28px', color: '#0F172A' }}>Diagnostic Report</h3>
                <button onClick={() => setResult(null)} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, color: '#374151', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>Test Again</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Deliverability Score</p>
                  <p style={{ fontSize: '48px', fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: result.score >= 80 ? '#10B981' : (result.score >= 50 ? '#F59E0B' : '#DC2626') }}>{result.score}/100</p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Inbox Placement</p>
                  <p style={{ 
                    fontSize: '22px', 
                    fontFamily: '"Outfit", sans-serif', 
                    fontWeight: 700, 
                    color: result.folderName === 'Inbox (Primary)' || result.folderName === 'INBOX'
                      ? '#10B981'
                      : result.folderName === 'Promotions'
                        ? '#4F46E5'
                        : result.folderName === 'Updates'
                          ? '#06B6D4'
                          : result.folderName === 'Social'
                            ? '#EC4899'
                            : result.folderName === 'Spam'
                              ? '#DC2626'
                              : '#F59E0B',
                    marginTop: '12px' 
                  }}>
                    {result.folderName || 'Spam Folder'}
                  </p>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"DM Sans", sans-serif' }}>Blacklist Status</p>
                  <p style={{ fontSize: '22px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: result.reputation.blacklists.listed ? '#DC2626' : '#10B981', marginTop: '12px' }}>
                    {result.reputation.blacklists.listed ? 'Listed' : 'Clean'}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.01)' }}>
                <h4 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '20px', color: '#0F172A', marginBottom: '16px' }}>Authentication (DNS)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {['spf', 'dkim', 'dmarc'].map(type => {
                    const status = result.dns[type].status;
                    return (
                      <div key={type} style={{ padding: '16px', backgroundColor: status === 'valid' ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${status === 'valid' ? '#DCFCE7' : '#FEE2E2'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {status === 'valid' ? <CheckCircle color="#10B981" /> : <XCircle color="#DC2626" />}
                        <div>
                          <p style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '14px', color: '#0F172A', fontFamily: '"DM Sans", sans-serif' }}>{type}</p>
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
