"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../data/navLinks';

interface NavbarProps {
  activeTab?: 'home' | 'features' | 'solutions' | 'resources' | 'pricing';
}

const dropdownItems = [
  { label: 'Blogs', icon: '📝', href: '/blogs', active: true },
  { label: 'Articles', icon: '📄', href: '#', active: false },
  { label: 'Customer Stories', icon: '👥', href: '#', active: false },
  { label: 'Testimonials', icon: '💬', href: '#', active: false },
  { label: 'FAQs', icon: '❓', href: '#', active: false },
];

export function Navbar({ activeTab = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

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
              const linkLower = link.toLowerCase();

              if (linkLower === 'resources') {
                return (
                  <li
                    key={link}
                    className={`nav-text-item ${activeTab === 'resources' ? 'active' : ''}`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {link}
                      <span style={{
                        fontSize: '9px',
                        transition: 'transform 0.2s',
                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}>▼</span>
                    </span>

                    {dropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '10px',
                        width: '220px',
                        background: 'rgba(3, 7, 18, 0.25)',
                        backdropFilter: 'blur(32px) saturate(180%) brightness(110%)',
                        WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(110%)',
                        border: '1px solid rgba(255, 255, 255, 0.09)',
                        borderRadius: '16px',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                        padding: '12px',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        textAlign: 'left'
                      }}>
                        {dropdownItems.map((item, idx) => (
                          item.active ? (
                            <Link
                              key={idx}
                              href={item.href}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '8px',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'background 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <span>{item.label}</span>
                              <span style={{ fontSize: '13px' }}>{item.icon}</span>
                            </Link>
                          ) : (
                            <div
                              key={idx}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '8px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'default'
                              }}
                            >
                              <span>{item.label}</span>
                              <span style={{
                                fontSize: '9px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '2px 6px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255, 255, 255, 0.04)'
                              }}>Soon</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

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
          const linkLower = link.toLowerCase();

          if (linkLower === 'resources') {
            return (
              <div key={link} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div 
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 600,
                    padding: '12px 0'
                  }}
                >
                  {link}
                  <span style={{ 
                    fontSize: '14px', 
                    transform: mobileResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.2s',
                    display: 'inline-block'
                  }}>▼</span>
                </div>
                {mobileResourcesOpen && (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '12px',
                    width: '80%',
                    margin: '0 auto'
                  }}>
                    {dropdownItems.map((item, idx) => (
                      item.active ? (
                        <Link 
                          key={idx} 
                          href={item.href} 
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            color: '#7963ff',
                            fontSize: '18px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {item.icon} {item.label}
                        </Link>
                      ) : (
                        <span 
                          key={idx} 
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.4)', 
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {item.icon} {item.label} (Soon)
                        </span>
                      )
                    ))}
                  </div>
                )}
              </div>
            );
          }

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

export default Navbar;
