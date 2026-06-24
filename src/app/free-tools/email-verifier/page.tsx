"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Upload, Download, Copy, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface VerificationResult {
  email: string;
  status: 'valid' | 'invalid' | 'unknown';
  reason: string;
  verificationTime: number;
}

export default function EmailVerifierPage() {
  const [emails, setEmails] = useState('');
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    setResults([]);
    setProgress(0);

    const emailList = [...new Set(emails
      .split(/[\n,;\s]+/)
      .map(e => e.trim().toLowerCase())
      .filter(e => e.length > 0 && e.includes('@')))];

    if (emailList.length === 0) {
      setError('Please enter at least one valid email address');
      return;
    }

    if (emailList.length > 100) {
      setError('For the free tool, maximum 100 emails at a time');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/free-tools/email-verifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: emailList }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || 'Verification failed. API limit reached or server error.');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No response body');

      let buffer = '';
      const processedEmails = new Set<string>();

      while (true) {
        const { done, value } = await reader.read();
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const cleaned = line.trim();
            if (cleaned) {
              try {
                const result: VerificationResult = JSON.parse(cleaned);
                if (!processedEmails.has(result.email)) {
                  processedEmails.add(result.email);
                  setResults(prev => [...prev, result]);
                  setProgress(Math.round((processedEmails.size / emailList.length) * 100));
                }
              } catch (e) {
                // ignore parse errors for partial chunks
              }
            }
          }
        }

        if (done) {
          const cleaned = buffer.trim();
          if (cleaned) {
            try {
              const result: VerificationResult = JSON.parse(cleaned);
              if (!processedEmails.has(result.email)) {
                processedEmails.add(result.email);
                setResults(prev => [...prev, result]);
              }
            } catch (e) {}
          }
          break;
        }
      }

      setProgress(100);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: "Why Verify Emails?",
      content: "Sending to invalid or risky email addresses damages your sender reputation, increases bounce rates, and can get your domain blacklisted. The Email Verifier ensures you only send to active, safe inboxes.",
      list: [
        ". Reduce Bounce Rates",
        ". Protect Domain Reputation",
        ". Improve Campaign ROI",
        ". Clean Prospect Lists"
      ]
    }
  ];

  const faqs = [
    {
      q: "How does the email verifier work?",
      a: "It performs syntax checks, domain validation, MX record lookups, and SMTP handshakes to verify the mailbox exists without actually sending an email."
    }
  ];

  return (
    <FreeToolTemplate
      title="Free Bulk Email Verifier"
      subtitle="Clean Your Prospect Lists & Protect Your Domain"
      description="Stop guessing if your leads are valid. Verify emails in bulk with syntax checks, domain validation, and SMTP pinging to ensure you only send to real, active inboxes."
      sections={sections}
      faqs={faqs}
      ctaTitle="Protect Your Sender Reputation Today"
      ctaSubtitle="Bouncing emails destroy deliverability. Start verifying your lists for free."
      ctaButtonText="Verify Emails Now"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          
          <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', marginBottom: '24px', textAlign: 'center', color: '#111827' }}>List Verification Console</h3>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
            <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Paste Emails (One per line or comma-separated)</label>
            <textarea 
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="john@example.com&#10;jane@company.com"
              rows={6}
              style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: 'monospace', fontSize: '14px', resize: 'vertical' }}
            />
            {error && <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} />{error}</div>}
            
            <button 
              onClick={handleVerify}
              disabled={loading}
              style={{ width: '100%', marginTop: '16px', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? `Verifying... (${progress}%)` : <><Shield size={18} /> Verify List Now</>}
            </button>
          </div>

          {(results.length > 0 || loading) && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827' }}>Verification Results</h4>
                {loading && <div style={{ height: '8px', width: '200px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#3B82F6', transition: 'width 0.3s' }} />
                </div>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px' }}>
                {results.map((res, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: res.status === 'valid' ? '#F0FDF4' : (res.status === 'invalid' ? '#FEF2F2' : '#FFFBEB'), borderRadius: '8px', border: `1px solid ${res.status === 'valid' ? '#DCFCE7' : (res.status === 'invalid' ? '#FEE2E2' : '#FEF3C7')}` }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#111827', fontWeight: 600 }}>{res.email}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: '"DM Sans", sans-serif' }}>{res.reason}</span>
                      {res.status === 'valid' ? <CheckCircle size={18} color="#10B981" /> : (res.status === 'invalid' ? <XCircle size={18} color="#DC2626" /> : <AlertCircle size={18} color="#F59E0B" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      }
    />
  );
}
