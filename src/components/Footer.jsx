import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="cs-footer-dark">
      <div className="cs-footer-dark-container">
        {/* Newsletter Section */}
        <div className="cs-footer-newsletter">
          <div className="cs-newsletter-content">
            <div className="cs-newsletter-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <h2>Stay Ahead in Prospecting</h2>
            </div>
            <p>Get exclusive AI-powered sales insights, prospecting strategies, and industry updates delivered directly to your inbox.</p>
          </div>
          <div className="cs-newsletter-form">
            <input type="email" placeholder="Enter your best email address" className="cs-newsletter-input" />
            <button className="cs-newsletter-button">
              Subscribe Now <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="cs-footer-dark-grid">
          {/* Brand Column */}
          <div className="cs-footer-brand-col">
            <div className="cs-footer-brand-logo">
              <img src="/images/logo-mark.png" alt="360Airo Logo" className="cs-footer-logo-img" />
              <div className="cs-footer-brand-text">
                <span className="cs-brand-name">360airo</span>
                <span className="cs-brand-tagline">AI-Powered Prospecting</span>
              </div>
            </div>
            <p className="cs-brand-desc">
              Transform your sales pipeline with intelligent prospect management and AI-driven outreach.
            </p>
            <div className="cs-social-icons">
              <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
              <a href="#" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="#" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="cs-footer-link-col">
            <h3><span className="cs-purple-dot"></span> Product</h3>
            <div className="cs-footer-dark-links">
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">AI SDR</a>
              <a href="#">Integrations</a>
            </div>
          </div>

          <div className="cs-footer-link-col">
            <h3><span className="cs-purple-dot"></span> Resources</h3>
            <div className="cs-footer-dark-links">
              <a href="#">Blog</a>
              <a href="#">360 Academy</a>
              <a href="#">Case Studies</a>
              <a href="#">Community</a>
            </div>
          </div>

          <div className="cs-footer-link-col">
            <h3><span className="cs-purple-dot"></span> Company</h3>
            <div className="cs-footer-dark-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Anti-Spam Policy</a>
            </div>
          </div>

          {/* CTA Card */}
          <div className="cs-footer-cta-col">
            <div className="cs-footer-cta-card">
              <h3>Ready to Transform?</h3>
              <p>Start your journey with 360airo today.</p>
              <button className="cs-footer-cta-button">Get Started</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cs-footer-dark-bottom">
          <p className="cs-copyright">
            © 2026 360airo. All Rights Reserved and designed by <a href="#">360 Marketing Concepts</a>
          </p>
          <div className="cs-bottom-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Anti-Spam Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
