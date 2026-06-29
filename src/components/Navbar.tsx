"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '../data/navLinks';
import { BookOpen, Users, HelpCircle, ChevronDown, FileText, Scale, Star, MessageCircle, Zap, Briefcase, Building2, Target } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  theme?: 'light' | 'dark';
}

const mainResources = [
  { label: 'Blogs', description: 'Read our latest insights and outbound playbooks', href: '/blogs', icon: FileText },
  { label: 'Comparisons', description: 'See how 360Airo stacks up against competitors', href: '/comparison', icon: Scale },
  { label: 'Customer stories', description: 'How high-growth B2B teams scale sales outreach', href: '/customer-stories', icon: Users },
  { label: 'Testimonial', description: 'Hear what our customers have to say', href: '#testimonials', icon: Star },
  { label: 'FAQs', description: 'Frequently asked questions about our platform', href: '#faq', icon: HelpCircle }
];

const mainSolutions = [
  { label: 'Startups', description: 'Scale your early-stage growth', href: '/solutions/startups', icon: Zap },
  { label: 'SMBs', description: 'Grow your small to medium business', href: '/solutions/smbs', icon: Briefcase },
  { label: 'Enterprise', description: 'Power your large-scale operations', href: '/solutions/enterprise', icon: Building2 },
  { label: 'Marketing agencies', description: 'Drive client success efficiently', href: '/solutions/agencies', icon: Target }
];

const footerResource = { label: 'Customer Support', href: '/customer-support' };

export function Navbar({ activeTab = 'home', theme = 'dark' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  return (
    <>
      <nav id="main-nav" className="nav-dark">
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

              if (linkSlug === 'resources' || linkSlug === 'solutions') {
                const isResources = linkSlug === 'resources';
                const isOpen = isResources ? dropdownOpen : solutionsDropdownOpen;
                const setOpen = isResources ? setDropdownOpen : setSolutionsDropdownOpen;
                const items = isResources ? mainResources : mainSolutions;
                const isActive = isResources 
                  ? (activeTab === 'resources' || activeTab === 'customer-stories')
                  : activeTab === 'solutions';

                return (
                  <li
                    key={link}
                    className={`nav-text-item ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {link}
                      <ChevronDown 
                        size={14} 
                        style={{
                          transition: 'transform 0.2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          display: 'inline-block'
                        }}
                      />
                    </span>

                    {isOpen && (
                      <div className="nav-dropdown-menu">
                        {items.map((item, idx) => {
                          const IconComponent = item.icon;
                          return (
                            <Link key={idx} href={item.href} className="nav-dropdown-item">
                              <div className="nav-dropdown-icon-box">
                                <IconComponent size={16} />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <span className="nav-dropdown-title">{item.label}</span>
                                <span className="nav-dropdown-desc">{item.description}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              }

              const href = linkSlug === 'home' ? '/' : linkSlug === 'login' ? 'https://app.360airo.com/' : `/${linkSlug}`;
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

          if (linkSlug === 'resources' || linkSlug === 'solutions') {
            const isResources = linkSlug === 'resources';
            const isOpen = isResources ? mobileResourcesOpen : mobileSolutionsOpen;
            const setOpen = isResources ? setMobileResourcesOpen : setMobileSolutionsOpen;
            const items = isResources ? mainResources : mainSolutions;

            return (
              <div key={link} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div 
                  onClick={() => setOpen(!isOpen)}
                  className="mobile-resources-toggle"
                >
                  {link}
                  <span 
                    className="mobile-resources-arrow"
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                      display: 'inline-block'
                    }}
                  >▼</span>
                </div>
                {isOpen && (
                  <div className="mobile-submenu">
                    {items.map((item, idx) => {
                      const IconComponent = item.icon;
                      const isActiveDropdown = activeTab === item.href.substring(1);
                      return (
                        <Link 
                          key={idx} 
                          href={item.href} 
                          onClick={() => setMobileMenuOpen(false)}
                          className="mobile-submenu-link"
                          style={{
                            color: isActiveDropdown ? '#0EB5BB' : undefined
                          }}
                        >
                          <IconComponent size={16} color={isActiveDropdown ? '#0EB5BB' : 'rgba(255, 255, 255, 0.4)'} />
                          {item.label}
                        </Link>
                      );
                    })}
                    {isResources && (
                      <>
                        <div style={{ width: '80%', height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />
                        <Link 
                          href={footerResource.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="mobile-submenu-link"
                          style={{
                            color: activeTab === 'customer-support' ? '#0EB5BB' : undefined
                          }}
                        >
                          <HelpCircle size={15} color={activeTab === 'customer-support' ? '#0EB5BB' : 'rgba(255, 255, 255, 0.4)'} />
                          {footerResource.label}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          }

          const href = linkSlug === 'home' ? '/' : linkSlug === 'login' ? 'https://app.360airo.com/' : `/${linkSlug}`;
          if (linkSlug === 'book-a-demo') {
            return (
              <Link 
                key={link} 
                href={href} 
                onClick={() => setMobileMenuOpen(false)}
                className="btn-nav-login mobile-book-btn"
                style={{ textDecoration: 'none' }}
              >
                {link}
              </Link>
            );
          }

          return (
            <Link 
              key={link} 
              href={href} 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              {link}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;
