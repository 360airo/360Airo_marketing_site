"use client";
import React from 'react';

export function Footer() {
  return (
    <div id="section-pricing" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
      <footer>
        <div className="fg">
          <div className="fb">
            <img 
              src="/logo.svg" 
              alt="360Airo Logo" 
              style={{ height: 36, marginBottom: 8, filter: 'brightness(0) invert(1)' }} 
            />
            <p>AI-powered multichannel sales outreach. Discover prospects, start conversations, close more deals.</p>
          </div>
          <div className="fc">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Integrations</a>
          </div>
          <div className="fc">
            <h4>Solutions</h4>
            <a href="#">For SDRs</a>
            <a href="#">For Agencies</a>
            <a href="#">For Founders</a>
          </div>
          <div className="fc">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Docs</a>
            <a href="#">Case Studies</a>
          </div>
          <div className="fc">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="fbot">
          <p>© 2024 360Airo. All rights reserved.</p>
          <div className="fsc">
            <a href="#">𝕏</a>
            <a href="#">in</a>
            <a href="#">▶</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
