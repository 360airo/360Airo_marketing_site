"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Shield, Copy, Check } from 'lucide-react';

export default function SpfGeneratorPage() {
  const [domain, setDomain] = useState('');
  const [allowMx, setAllowMx] = useState(true);
  const [allowA, setAllowA] = useState(true);
  const [includeGoogle, setIncludeGoogle] = useState(false);
  const [includeOutlook, setIncludeOutlook] = useState(false);
  const [customIncludes, setCustomIncludes] = useState('');
  const [policy, setPolicy] = useState('~all');
  const [record, setRecord] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRecord = () => {
    if (!domain) {
      alert("Please enter a domain");
      return;
    }
    let parts = ['v=spf1'];
    if (allowMx) parts.push('mx');
    if (allowA) parts.push('a');
    if (includeGoogle) parts.push('include:_spf.google.com');
    if (includeOutlook) parts.push('include:spf.protection.outlook.com');
    
    if (customIncludes) {
      const includes = customIncludes.split(',').map(i => i.trim()).filter(i => i);
      includes.forEach(inc => parts.push(`include:${inc}`));
    }

    parts.push(policy);
    setRecord(parts.join(' '));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(record);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: "Why You Need an SPF Record",
      content: "Sender Policy Framework (SPF) tells email receivers which servers are authorized to send emails on your behalf. Without a valid SPF record, your emails are highly likely to be marked as spam or rejected completely.",
      list: [
        ". Authorize Trusted Senders",
        ". Prevent Domain Spoofing",
        ". Improve Inbox Placement",
        ". Pass Spam Filters"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the difference between ~all and -all?",
      a: "~all (Soft Fail) means emails from unauthorized servers will be marked as spam. -all (Hard Fail) means they will be rejected entirely. We recommend starting with ~all."
    }
  ];

  return (
    <FreeToolTemplate
      title="Free SPF Record Generator"
      subtitle="Authorize Your Senders & Pass Spam Filters"
      description="Build a valid SPF record for Google, Microsoft, and custom IPs in seconds to ensure your cold emails don't bounce."
      sections={sections}
      faqs={faqs}
      ctaTitle="Protect Your Domain Reputation"
      ctaSubtitle="SPF is just one piece of the puzzle. Ensure your complete infrastructure is bulletproof."
      ctaButtonText="Learn About Infrastructure"
      calculator={
        <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
          
          <h3 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '28px', marginBottom: '24px', textAlign: 'center', color: '#0F172A' }}>Build SPF Record</h3>
          
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.02)' }}>
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Domain Name</label>
              <input 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., yourcompany.com"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={allowMx} onChange={(e) => setAllowMx(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4F46E5' }} />
                Allow MX servers to send
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={allowA} onChange={(e) => setAllowA(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4F46E5' }} />
                Allow A records to send
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeGoogle} onChange={(e) => setIncludeGoogle(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4F46E5' }} />
                Include Google Workspace
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', color: '#374151', cursor: 'pointer' }}>
                <input type="checkbox" checked={includeOutlook} onChange={(e) => setIncludeOutlook(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4F46E5' }} />
                Include Outlook / Office365
              </label>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Custom Includes (comma separated) - Optional</label>
              <input 
                value={customIncludes}
                onChange={(e) => setCustomIncludes(e.target.value)}
                placeholder="e.g., sendgrid.net, mailgun.org"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Strictness Policy</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {[
                  { value: '~all', label: '~all (Soft Fail - Recommended)' },
                  { value: '-all', label: '-all (Hard Fail - Strict)' }
                ].map((p) => (
                  <button 
                    key={p.value}
                    onClick={() => setPolicy(p.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: policy === p.value ? '2px solid #4F46E5' : '1px solid #D1D5DB', backgroundColor: policy === p.value ? '#EEF2FF' : 'white', color: policy === p.value ? '#4F46E5' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={generateRecord}
              style={{ width: '100%', marginTop: '8px', background: 'linear-gradient(135deg, #4f46e5, #2563eb)', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.25)' }}
            >
              <Shield size={18} /> Generate SPF Record
            </button>
          </div>

          {record && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <h4 style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '22px', color: '#0F172A', marginBottom: '16px' }}>Your DNS Record</h4>
              
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                  <span>Type: TXT</span>
                  <span>Name: @ (or root)</span>
                </div>
                <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#111827', fontWeight: 700, wordBreak: 'break-all' }}>{record}</span>
                  <button 
                    onClick={handleCopy}
                    style={{ flexShrink: 0, backgroundColor: copied ? '#10B981' : '#E5E7EB', color: copied ? 'white' : '#374151', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      }
    />
  );
}
