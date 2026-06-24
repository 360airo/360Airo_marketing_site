"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';
import { Copy, PenTool } from 'lucide-react';

export default function SignatureBuilderPage() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [signature, setSignature] = useState('');
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState('classic');
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSignature = async () => {
    if (!fullName || !jobTitle || !company || !email) {
      setError('Please fill in Name, Job Title, Company, and Email');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/free-tools/email-signature-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, jobTitle, company, email, phone, website, style: template, logoUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate signature');
      }

      const data = await response.json();
      setSignature(data.html);
    } catch (err) {
      setError('Failed to generate signature. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(signature);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500000) {
      setError('Logo file is too large. Please use an image under 500KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setLogoUrl(result);
        setError('');
      }
    };
    reader.readAsDataURL(file);
  };

  const sections = [
    {
      title: "Why Does Your Email Signature Matter?",
      content: "Your email signature is often the last thing a prospect sees before deciding whether to reply. A professional signature adds credibility, builds trust, and gives recipients confidence that they're talking to a legitimate business.",
      list: [
        ". Increase Trust & Credibility",
        ". Strengthen Personal Branding",
        ". Improve Response Rates",
        ". Showcase Social Profiles"
      ]
    },
    // ... keep the rest brief for succinctness in the prompt
  ];

  const faqs = [
    {
      q: "What is an email signature builder?",
      a: "An email signature builder helps you create a professional email signature without coding or design skills. Simply enter your details and generate a ready-to-use signature."
    },
    {
      q: "Is the email signature builder free?",
      a: "Yes. The 360 AIRO Email Signature Builder is completely free to use."
    }
  ];

  return (
    <FreeToolTemplate
      title="Free Email Signature Builder"
      subtitle="Every Email You Send Is Judged in Seconds"
      description="You spend hours crafting the perfect email, but prospects still judge your credibility in seconds. Create a professional email signature that builds trust, reinforces your brand, and makes every email look polished and professional."
      sections={sections}
      faqs={faqs}
      ctaTitle="Still Using a Plain Text Signature?"
      ctaSubtitle="First Impressions Happen Before Prospects Read Your Email. Create a professional email signature that builds trust, strengthens your brand, and helps every email look more credible."
      ctaButtonText="Create My Free Email Signature"
      calculator={
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Form Side */}
          <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Signature Details</h3>
            
            {error && <div style={{ padding: '12px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontFamily: '"DM Sans", sans-serif' }}>{error}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4B5563', marginBottom: '6px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Template Style</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['classic', 'modern', 'minimalist', 'corporate'].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTemplate(t)}
                      style={{ padding: '10px', borderRadius: '8px', border: template === t ? '2px solid #3B82F6' : '1px solid #D1D5DB', backgroundColor: template === t ? '#EFF6FF' : 'white', color: template === t ? '#2563EB' : '#4B5563', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textTransform: 'capitalize' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
                <input placeholder="Job Title *" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
              </div>
              <input placeholder="Company Name *" value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
              <input placeholder="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
                <input placeholder="Website URL" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4B5563', marginBottom: '6px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>Company Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px dashed #D1D5DB', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }} />
              </div>
            </div>

            <button 
              onClick={generateSignature} 
              disabled={loading}
              style={{ width: '100%', backgroundColor: loading ? '#9CA3AF' : '#111827', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {loading ? 'Generating...' : <><PenTool size={18} /> Generate Signature</>}
            </button>
          </div>

          {/* Preview Side */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Live Preview</h3>
            
            <div style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', display: 'flex', alignItems: 'center', justifyItems: 'flex-start', overflow: 'auto', minHeight: '300px' }}>
              {signature ? (
                <div dangerouslySetInnerHTML={{ __html: signature }} />
              ) : (
                <div style={{ textAlign: 'center', width: '100%', color: '#9CA3AF', fontFamily: '"DM Sans", sans-serif', fontSize: '15px' }}>
                  Fill in your details and click Generate to see your signature preview here.
                </div>
              )}
            </div>

            {signature && (
              <button 
                onClick={copyToClipboard}
                style={{ marginTop: '24px', backgroundColor: copied ? '#10B981' : '#F3F4F6', color: copied ? 'white' : '#111827', border: '1px solid', borderColor: copied ? '#059669' : '#D1D5DB', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              >
                {copied ? 'Copied to Clipboard!' : <><Copy size={18} /> Copy HTML Signature</>}
              </button>
            )}
          </div>

        </div>
      }
    />
  );
}
