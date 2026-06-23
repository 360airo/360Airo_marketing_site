// @ts-nocheck
"use client";
import { useState } from 'react';
import { navLinks } from '../data/navLinks';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav" id="nav">
        <div className="nav-content">
          <a href="#" className="nav-logo">
            <div className="nav-logo-fallback"><span style={{color: '#3B82F6'}}>360</span>Airo</div>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li 
                key={link} 
                className={`nav-text-item ${link === 'Solutions' ? 'active' : ''}`}
              >
                {link}
              </li>
            ))}
          </ul>
          
          <div className="nav-btns">
            <button className="btn-nav-login">Log in</button>
          </div>
          
          <div className="nav-hamburger" onClick={() => setMobileMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} id="mob">
        <div className="mobile-close" onClick={() => setMobileMenuOpen(false)}>✕</div>
        {navLinks.map((link) => (
          <a href="#" key={link} onClick={() => setMobileMenuOpen(false)}>{link}</a>
        ))}
      </div>
    </>
  );
}
