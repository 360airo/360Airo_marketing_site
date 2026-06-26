"use client";
import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <div className="fg">
        <div className="fb">
          <Link href="/">
            <img 
              src="/logo.svg" 
              alt="360Airo Logo" 
              style={{ height: 36, marginBottom: 8, filter: 'brightness(0) invert(1)', cursor: 'pointer' }} 
            />
          </Link>
          <p>AI-powered multichannel sales outreach. Discover prospects, start conversations, close more deals.</p>
        </div>
        <div className="fc">
          <h4>Product</h4>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/free-tools">Free Tools</Link>
        </div>
        <div className="fc">
          <h4>Solutions</h4>
          <Link href="/solutions">For SDRs</Link>
          <Link href="/solutions">For Agencies</Link>
          <Link href="/solutions">For Founders</Link>
        </div>
        <div className="fc">
          <h4>Resources</h4>
          <Link href="/blogs">Blog</Link>
          <Link href="/customer-support">Docs</Link>
          <Link href="/customer-stories">Case Studies</Link>
        </div>
        <div className="fc">
          <h4>Company</h4>
          <Link href="/book-a-demo">About</Link>
          <Link href="/contact-us">Careers</Link>
          <Link href="/contact-us">Contact</Link>
        </div>
      </div>
      <div className="fbot">
        <p>© 2024 360Airo. All rights reserved.</p>
        <div className="fsc">
          <a href="#">𝕏</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">in</a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">▶</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
