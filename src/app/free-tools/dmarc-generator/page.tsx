"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Shield, Copy, Check } from 'lucide-react';

export default function DmarcGeneratorPage() {
  const [domain, setDomain] = useState('');
  const [policy, setPolicy] = useState('none');
  const [ruaEmail, setRuaEmail] = useState('');
  const [record, setRecord] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRecord = () => {
    if (!domain) {
      alert("Please enter a domain");
      return;
    }
    let dmarc = `v=DMARC1; p=${policy};`;
    if (ruaEmail) {
      dmarc += ` rua=mailto:${ruaEmail};`;
    }
    setRecord(dmarc);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(record);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: "Why You Need a DMARC Record",
      content: "DMARC prevents hackers from spoofing your domain and sending malicious emails on your behalf. Since February 2024, Google and Yahoo require DMARC records for all bulk senders.",
      list: [
        ". Stop Domain Spoofing",
        ". Comply with Google & Yahoo Rules",
        ". Improve Deliverability",
        ". Get Visibility into Failures"
      ]
    }
  ];

  const faqs = [
    {
      q: "What policy should I choose?",
      a: "Start with 'none' (monitoring mode) to see which emails pass or fail without blocking them. Once you're confident your legitimate emails are passing, upgrade to 'quarantine' or 'reject'."
    }
  ];

  return (
    <FreeToolTemplate
      title="Free DMARC Record Generator"
      subtitle="Comply with Google & Yahoo Sender Requirements"
      description="Create a deployment-ready DMARC policy in seconds. Protect your domain reputation and ensure your emails reach the inbox instead of the spam folder."
      sections={sections}
      faqs={faqs}
      ctaTitle="Need Help Implementing DMARC?"
      ctaSubtitle="Generating the record is step one. Monitoring it is step two. Build a complete outbound infrastructure with 360Airo."
      ctaButtonText="Explore Infrastructure Solutions"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          
          <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', marginBottom: '24px', textAlign: 'center', color: '#111827' }}>Configure DMARC Policy</h3>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Domain Name</label>
              <input 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., yourcompany.com"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Policy Action (p=)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { value: 'none', label: 'None (Monitor Only)' },
                  { value: 'quarantine', label: 'Quarantine (Spam Folder)' },
                  { value: 'reject', label: 'Reject (Block)' }
                ].map((p) => (
                  <button 
                    key={p.value}
                    onClick={() => setPolicy(p.value)}
                    style={{ padding: '12px', borderRadius: '8px', border: policy === p.value ? '2px solid #3B82F6' : '1px solid #D1D5DB', backgroundColor: policy === p.value ? '#EFF6FF' : 'white', color: policy === p.value ? '#2563EB' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Aggregate Reporting Email (rua=) - Optional</label>
              <input 
                value={ruaEmail}
                onChange={(e) => setRuaEmail(e.target.value)}
                placeholder="e.g., dmarc-reports@yourcompany.com"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>
            
            <button 
              onClick={generateRecord}
              style={{ width: '100%', marginTop: '8px', backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Shield size={18} /> Generate DMARC Record
            </button>
          </div>

          {record && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827', marginBottom: '16px' }}>Your DNS Record</h4>
              
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                  <span>Type: TXT</span>
                  <span>Name: _dmarc</span>
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
