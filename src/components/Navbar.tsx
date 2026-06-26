"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../data/navLinks';
import { BookOpen, Users, HelpCircle, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  theme?: 'light' | 'dark';
}

const mainResources = [
  {
    label: 'Blogs & Articles',
    description: 'Read our latest insights, outbound playbooks, and email marketing guides.',
    href: '/blogs',
    icon: BookOpen
  },
  {
    label: 'Customer Stories',
    description: 'See how high-growth B2B teams automate and scale their sales outreach.',
    href: '/customer-stories',
    icon: Users
  }
];

const footerResource = {
  label: 'Customer Support',
  href: '/customer-support',
  icon: HelpCircle
};

export function Navbar({ activeTab = 'home', theme = 'dark' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  return (
    <>
      <nav id="main-nav" className={theme === 'light' ? 'nav-light' : 'nav-dark'}>
        <div className="nav-wrap">
          <Link className="nav-logo" href="/">
            <Image
              id="nav-logo-icon"
              src="/logo.svg"
              alt="360Airo Logo"
              width={135}
              height={38}
              priority
              unoptimized
            />
          </Link>

          <ul className="nav-links">
            {navLinks.filter(link => link !== 'Book a Demo').map((link) => {
              const linkSlug = link.toLowerCase().replace(/\s+/g, '-');

              if (linkSlug === 'resources') {
                return (
                  <li
                    key={link}
                    className={`nav-text-item ${activeTab === 'resources' || activeTab === 'customer-stories' ? 'active' : ''}`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {link}
                      <ChevronDown 
                        size={14} 
                        style={{
                          transition: 'transform 0.2s',
                          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          display: 'inline-block'
                        }}
                      />
                    </span>

                    {dropdownOpen && (
                      <div className="nav-dropdown-menu">
                        {mainResources.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={idx}
                              href={item.href}
                              className="nav-dropdown-item"
                            >
                              <div className="nav-dropdown-icon-box">
                                <IconComponent size={20} color="#8B5CF6" />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="nav-dropdown-title">{item.label}</span>
                                <span className="nav-dropdown-desc">{item.description}</span>
                              </div>
                            </Link>
                          );
                        })}

                        <div className="nav-dropdown-divider" />

                        <Link
                          href={footerResource.href}
                          className="nav-dropdown-footer"
                        >
                          <HelpCircle size={16} color="rgba(255, 255, 255, 0.5)" />
                          <span className="nav-dropdown-footer-text">{footerResource.label}</span>
                        </Link>
                      </div>
                    )}
                  </li>
                );
              }

              const href = linkSlug === 'home' ? '/' : `/${linkSlug}`;
              return (
                <li
                  key={link}
                  className={`nav-text-item ${activeTab === linkSlug ? 'active' : ''}`}
                >
                  <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-btns">
            <Link 
              href="/book-a-demo" 
              className="btn-nav-login" 
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Book a Demo
            </Link>
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
          const linkSlug = link.toLowerCase().replace(/\s+/g, '-');

          if (linkSlug === 'resources') {
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
                    padding: '12px 0',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '12px',
                    width: '80%',
                    margin: '0 auto'
                  }}>
                    {mainResources.map((item, idx) => {
                      const IconComponent = item.icon;
                      const isActiveDropdown = activeTab === item.href.substring(1);
                      return (
                        <Link 
                          key={idx} 
                          href={item.href} 
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            color: isActiveDropdown ? '#8B5CF6' : '#fff',
                            fontSize: '18px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <IconComponent size={18} color={isActiveDropdown ? '#8B5CF6' : 'rgba(255, 255, 255, 0.6)'} />
                          {item.label}
                        </Link>
                      );
                    })}
                    <div style={{ width: '80%', height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
                    <Link 
                      href={footerResource.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: activeTab === 'customer-support' ? '#8B5CF6' : '#fff',
                        fontSize: '16px',
                        fontWeight: 500,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <HelpCircle size={16} color={activeTab === 'customer-support' ? '#8B5CF6' : 'rgba(255, 255, 255, 0.5)'} />
                      {footerResource.label}
                    </Link>
                  </div>
                )}
              </div>
            );
          }

          const href = linkSlug === 'home' ? '/' : `/${linkSlug}`;
          if (linkSlug === 'book-a-demo') {
            return (
              <Link 
                key={link} 
                href={href} 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-nav-login"
                style={{ 
                  textDecoration: 'none', 
                  display: 'inline-block',
                  marginTop: '12px',
                  textAlign: 'center'
                }}
              >
                {link}
              </Link>
            );
          }

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
