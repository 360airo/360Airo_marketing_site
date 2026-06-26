"use client";
import React from 'react';
import Link from 'next/link';

export function Footer() {
  const prompt = "I'm researching AI-powered sales outreach platforms and want to know how 360Airo combines its AI SDR, multichannel outreach automation, lead enrichment, personalized email sequences, and deliverability infrastructure to help sales teams, agencies, and startups book more meetings and generate pipeline at scale. Summarize the highlights from 360Airo's website: https://360airo.com";

  const handleLLMClick = (e: React.MouseEvent<HTMLAnchorElement>, baseUrl: string, param: string = "q") => {
    e.preventDefault();
    const url = `${baseUrl}?${param}=${encodeURIComponent(prompt)}`;
    window.open(url, '_blank');
  };

  return (
    <footer>
      <div className="fg footer-grid-override">
        <div className="fb">
          <Link href="/">
            <img 
              src="/logo.svg" 
              alt="360Airo Logo" 
              style={{ height: 36, marginBottom: 8, cursor: 'pointer' }} 
            />
          </Link>
          <p>AI-powered multichannel sales outreach. Discover prospects, start conversations, close more deals.</p>
          
          <div style={{ marginTop: '32px' }}>
            <p style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#F8FAFC', marginBottom: '16px' }}>
              Ask AI How <span style={{ background: '#F97316', color: '#0F172A', padding: '1px 4px', borderRadius: '2px', margin: '0 2px' }}>360</span>Airo Builds Your Pipeline
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#" onClick={(e) => handleLLMClick(e, "https://chatgpt.com/")} title="ChatGPT" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/llm-logos/images.png" alt="ChatGPT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
              <a href="#" onClick={(e) => handleLLMClick(e, "https://claude.ai/new")} title="Claude" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/llm-logos/3d-claude-ai-logo.jpg" alt="Claude" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
              <a href="#" onClick={(e) => handleLLMClick(e, "https://www.google.com/search")} title="Gemini" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/llm-logos/Google_Gemini_icon_2025.svg.png" alt="Gemini" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
              <a href="#" onClick={(e) => handleLLMClick(e, "https://www.perplexity.ai/search")} title="Perplexity" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/llm-logos/images (1).png" alt="Perplexity" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
              <a href="#" onClick={(e) => handleLLMClick(e, "https://grok.com/")} title="Grok" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/llm-logos/gcMkPKyj2RX8EOEja8A1GWvCb7E.avif" alt="Grok" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </a>
            </div>
          </div>
        </div>
        <div className="fc">
          <h4>Product</h4>
          <Link href="#">Sales Engagement platform</Link>
          <Link href="#">Revenue generation Platform</Link>
          <Link href="#">Sales intelligence Platform</Link>
          <Link href="#">AI Outreach platform</Link>
          <Link href="#">Email Campaign</Link>
          <Link href="#">Linkedin Outreach</Link>
          <Link href="#">AI Outreach tool</Link>
          <Link href="#">Email Outreach Tool</Link>
        </div>
        <div className="fc">
          <h4>Solution</h4>
          <Link href="#">Startups</Link>
          <Link href="#">SMBs</Link>
          <Link href="#">Enterprise</Link>
        </div>
        <div className="fc">
          <h4>Features</h4>
          <Link href="#">Email Warmup</Link>
          <Link href="#">Domains & Emails</Link>
          <Link href="#">Email Campaigns</Link>
          <Link href="#">AI Email Generator</Link>
          <Link href="#">Prospect CRM</Link>
          <Link href="#">Unified Inbox</Link>
          <Link href="#">Email Sequences</Link>
          <Link href="#">Ai Email Automation</Link>
          <Link href="#">LinkedIn Automation</Link>
          <Link href="#">Email Campaign Analytics</Link>
          <Link href="#">Team Collaboration</Link>
          <Link href="#">Email Deliverability</Link>
          <Link href="#">Smart Scheduler</Link>
          <Link href="#">AI Sequencing</Link>
          <Link href="#">Sender Rotation</Link>
          <Link href="#">Sequence Score</Link>
          <Link href="#">Email Infrastructure</Link>
          <Link href="#">Email Personalization</Link>
          <Link href="#">Email Spam Checker</Link>
        </div>
        <div className="fc">
          <h4>Free Tools</h4>
          <Link href="#">Email Verifier</Link>
          <Link href="#">Mailbox Calculator</Link>
          <Link href="#">DMARC Generator</Link>
          <Link href="#">SPF Generator</Link>
          <Link href="#">Email Pitch Generator</Link>
          <Link href="#">Email Signature Builder</Link>
          <Link href="#">Email Sequencer</Link>
          <Link href="#">Email Template Analyzer</Link>
          <Link href="#">Email Deliverability Test</Link>
          <Link href="#">Email Permutator</Link>
        </div>
        <div className="fc">
          <h4>Resources</h4>
          <Link href="#">Blogs</Link>
          <Link href="#">Articles</Link>
          <Link href="#">Customer stories</Link>
          <Link href="#">Testimonial</Link>
          <Link href="#">FAQs</Link>
          <Link href="#">Playbook</Link>
        </div>
        <div className="fc">
          <h4>Address</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
            #744 - 9314 Forest Hill Blvd,<br/>Wellington, FL 33411, United States
          </p>
          <h4>Email Address</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '16px' }}>
            <a href="mailto:info@360airo.com" style={{ padding: 0 }}>info@360airo.com</a>
          </p>
          <h4>Phone</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
            <a href="tel:+15612574066" style={{ padding: 0 }}>+1 (561) 257-4066</a><br/>
            <a href="tel:+15614893335" style={{ padding: 0 }}>+1 (561) 489-3335</a>
          </p>
          <div className="footer-social-icons" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Facebook */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            {/* X */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </a>
            {/* GitHub */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="fbot">
        <p>© 2024 360Airo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
