"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Mail, Copy, Check } from 'lucide-react';

export default function PermutatorPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generatePermutations = () => {
    if (!firstName || !lastName || !domain) {
      alert("Please fill in First Name, Last Name, and Domain.");
      return;
    }

    const f = firstName.toLowerCase().trim();
    const l = lastName.toLowerCase().trim();
    const d = domain.toLowerCase().trim().replace('@', '');
    const fi = f.charAt(0);
    const li = l.charAt(0);

    const permutations = [
      `${f}@${d}`,
      `${l}@${d}`,
      `${f}${l}@${d}`,
      `${f}.${l}@${d}`,
      `${fi}${l}@${d}`,
      `${fi}.${l}@${d}`,
      `${f}${li}@${d}`,
      `${f}.${li}@${d}`,
      `${fi}${li}@${d}`,
      `${fi}.${li}@${d}`,
      `${l}${f}@${d}`,
      `${l}.${f}@${d}`,
      `${l}${fi}@${d}`,
      `${l}.${fi}@${d}`,
      `${li}${f}@${d}`,
      `${li}.${f}@${d}`,
      `${li}${fi}@${d}`,
      `${li}.${fi}@${d}`,
      `${f}-${l}@${d}`,
      `${fi}-${l}@${d}`,
      `${f}-${li}@${d}`,
      `${l}-${f}@${d}`,
      `${f}_${l}@${d}`,
      `${fi}_${l}@${d}`,
      `${f}_${li}@${d}`,
      `${l}_${f}@${d}`
    ];

    setResults(permutations);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(results.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: "Why Use an Email Permutator?",
      content: "If you know a prospect's name and company domain but not their exact email address, an email permutator generates all the most common corporate email formats. You can then copy these into an Email Verifier to find the correct, active address.",
      list: [
        ". Guess Corporate Emails",
        ". Build Targeted Lists",
        ". Combine with Email Verification"
      ]
    }
  ];

  return (
    <FreeToolTemplate
      title="Free Email Permutator"
      subtitle="Guess Any Corporate Email Address"
      description="Enter a prospect's name and company domain. We'll generate the 26 most common corporate email formats so you can find their exact address."
      sections={sections}
      faqs={[]}
      ctaTitle="Want to Find Leads Without Guessing?"
      ctaSubtitle="Our tools are great, but our full infrastructure handles lead generation and verification automatically."
      ctaButtonText="Explore Infrastructure"
      calculator={
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: results.length > 0 ? '1fr 1fr' : '1fr', gap: '32px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', color: '#111827' }}>Prospect Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>First Name</label>
                <input 
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g., John"
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Last Name</label>
                <input 
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g., Doe"
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '8px', color: '#374151' }}>Company Domain</label>
              <input 
                value={domain} onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., apple.com"
                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}
              />
            </div>
            
            <button 
              onClick={generatePermutations}
              style={{ width: '100%', marginTop: '8px', backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Mail size={18} /> Generate Permutations
            </button>
          </div>

          {results.length > 0 && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: '#F3F4F6', padding: '16px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', color: '#111827' }}>Generated Emails</h4>
                <button 
                  onClick={handleCopy}
                  style={{ backgroundColor: copied ? '#10B981' : '#E5E7EB', color: copied ? 'white' : '#374151', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy All'}
                </button>
              </div>
              <div style={{ padding: '24px', flex: 1, overflowY: 'auto', maxHeight: '400px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {results.map((email, i) => (
                    <div key={i} style={{ padding: '12px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#111827' }}>
                      {email}
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
