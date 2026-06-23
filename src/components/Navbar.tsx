"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../data/navLinks';


interface NavbarProps {
  activeTab?: 'home' | 'features' | 'solutions' | 'resources' | 'pricing';
}

export default function Navbar({ activeTab = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav id="main-nav" className="nav-dark">
        <div className="nav-wrap">
          <Link className="nav-logo" href="/">
            <Image
              id="nav-logo-icon"
              src="/logo.svg"
              alt="360Airo Logo"
              width={274}
              height={78}
              priority
              unoptimized
            />
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => {
              const linkLower = link.toLowerCase() as 'home' | 'features' | 'solutions' | 'resources' | 'pricing';
              const href = linkLower === 'home' ? '/' : `/${linkLower}`;
              return (
                <li
                  key={link}
                  className={`nav-text-item ${activeTab === linkLower ? 'active' : ''}`}
                >
                  <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link}
                  </Link>
                </li>
              );
            })}
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
        {navLinks.map((link) => {
          const linkLower = link.toLowerCase() as 'home' | 'features' | 'solutions' | 'resources' | 'pricing';
          const href = linkLower === 'home' ? '/' : `/${linkLower}`;
          return (
            <Link key={link} href={href} onClick={() => setMobileMenuOpen(false)}>
              {link}
            </Link>
          );
        })}
      </div>
    </>
  );
}
