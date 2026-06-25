"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import '../../../styles/shiro-case-study.css';
import '../../../styles/customer-stories.css';
import CustomerStoryCard from '../../../components/CustomerStoryCard';
import FeatureMarquee from '../../../components/FeatureMarquee';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ChainOfEventsCaseStudy() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [compareView, setCompareView] = useState('after');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('.scs-article-content section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Visual Renderers
  const renderIntroVisual = () => (
    <div className="scs-visual-img-wrapper" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
        alt="Sales team dashboard showing pipeline growth"
        loading="lazy"
        width="2508"
        height="1110"
        className="scs-inline-img"
        style={{ margin: 0, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', borderRadius: '12px', border: '1px solid #E5E5E5' }}
      />
    </div>
  );

  const renderChallengeVisual = () => (
    <div className="scs-visual-illustration">
      <div className="scs-illustration-card red">
        <span className="scs-card-number">01</span>
        <h4>Manual Research</h4>
        <p>Before 360Airo, reps spent close to four hours a day researching events decision-makers working through directories to find people worth contacting.</p>
      </div>
      <div className="scs-illustration-card red">
        <span className="scs-card-number">02</span>
        <h4>Scaling Ceiling</h4>
        <p>Without a system to manage sequencing, replies and next steps were tracked manually, and prospects who didn’t respond often went unanswered.</p>
      </div>
      <div className="scs-illustration-card red">
        <span className="scs-card-number">03</span>
        <h4>Headcount Dependency</h4>
        <p>Adding capacity meant adding people, and even then, the ceiling on qualified conversations stayed low.</p>
      </div>
    </div>
  );

  const renderSolutionVisual = () => (
    <div className="scs-visual-illustration">
      <div className="scs-illustration-card purple">
        <span className="scs-card-number">01</span>
        <h4>Automated Prospecting</h4>
        <p>Instead of reps hand-searching for buyers, the platform identified qualified events decision-makers automatically and queued them for outreach.</p>
      </div>
      <div className="scs-illustration-card purple">
        <span className="scs-card-number">02</span>
        <h4>Personalized Scale</h4>
        <p>From there, personalized messaging went out across email and LinkedIn, with automated sequencing handling follow-up timing.</p>
      </div>
      <div className="scs-illustration-card purple">
        <span className="scs-card-number">03</span>
        <h4>Unified Inbox</h4>
        <p>Reply intent detection flagged genuine interest and routed it to the right rep, while a unified inbox kept every conversation in one place.</p>
      </div>
    </div>
  );

  const renderResultsVisual = () => (
    <div className="scs-table-wrapper-light" style={{ margin: 0, width: '100%' }}>
      <table className="scs-metrics-table-light">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Before 360Airo</th>
            <th>After 360Airo</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>New Clients Acquired</td>
            <td>1–3 per month</td>
            <td>7 in 30 days</td>
            <td className="scs-positive-light">+250% growth</td>
          </tr>
          <tr>
            <td>Qualified Conversations</td>
            <td>12 / month</td>
            <td>41 / month</td>
            <td className="scs-positive-light">3.4x increase</td>
          </tr>
          <tr>
            <td>Outreach Capacity</td>
            <td>300 / month</td>
            <td>1,500 / month</td>
            <td className="scs-positive-light">5x increase</td>
          </tr>
          <tr>
            <td>Prospect Research Time</td>
            <td>4 hours / day</td>
            <td>1 hour / day</td>
            <td className="scs-positive-light">70% reduction</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderComparisonVisual = () => (
    <div className="scs-interactive-comparison" style={{ margin: 0, width: '100%' }}>
      <div className="scs-ic-toggle-container" style={{ marginBottom: '20px' }}>
        <div className="scs-ic-toggle-bg">
          <div className={`scs-ic-toggle-slider ${compareView === 'after' ? 'right' : 'left'}`}></div>
          <button
            className={`scs-ic-toggle-btn ${compareView === 'before' ? 'active' : ''}`}
            onClick={() => setCompareView('before')}
          >
            The Old Way
          </button>
          <button
            className={`scs-ic-toggle-btn ${compareView === 'after' ? 'active' : ''}`}
            onClick={() => setCompareView('after')}
          >
            With 360Airo
          </button>
        </div>
      </div>

      <div className="scs-ic-content-container" style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E5E5', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        <div className={`scs-ic-view ${compareView === 'before' ? 'active' : ''}`}>
          <ul className="scs-ic-before-list" style={{ gap: '16px' }}>
            <li><span>Sales reps manually searched for events decision-makers</span></li>
            <li><span>Outreach volume was limited by available time</span></li>
            <li><span>Follow-ups were inconsistent and often missed</span></li>
            <li><span>Generating new business required significant manual effort</span></li>
            <li><span>Growth depended on hiring more sales resources</span></li>
          </ul>
        </div>

        <div className={`scs-ic-view ${compareView === 'after' ? 'active' : ''}`}>
          <ul className="scs-ic-after-list" style={{ gap: '16px' }}>
            <li><Check size={18} className="scs-ic-check" /> <span>AI automatically identified qualified events buyers</span></li>
            <li><Check size={18} className="scs-ic-check" /> <span>Personalized outreach launched at scale across multiple channels</span></li>
            <li><Check size={18} className="scs-ic-check" /> <span>Automated follow-ups ensured no opportunity was missed</span></li>
            <li><Check size={18} className="scs-ic-check" /> <span>Sales team spent more time closing and less time researching</span></li>
            <li><Check size={18} className="scs-ic-check" /> <span>7 new clients acquired in just 30 days</span></li>
            <li><Check size={18} className="scs-ic-check" /> <span>Predictable pipeline generation without increasing headcount</span></li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderOutcomeVisual = () => (
    <div className="scs-kpi-card" style={{ margin: 0, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: '40px', padding: '32px 48px' }}>
      <div className="scs-kpi-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <div className="scs-kpi-ring yellow"></div>
        <div className="scs-kpi-text">
          <span className="scs-kpi-value">4.6/5</span>
          <span className="scs-kpi-label">customer satisfaction<br />rate on G2</span>
        </div>
      </div>
      <div className="scs-kpi-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <div className="scs-kpi-ring green"></div>
        <div className="scs-kpi-text">
          <span className="scs-kpi-value">96%</span>
          <span className="scs-kpi-label">support satisfaction<br />rate</span>
        </div>
      </div>
      <div className="scs-kpi-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <div className="scs-kpi-ring blue"></div>
        <div className="scs-kpi-text">
          <span className="scs-kpi-value">2 min</span>
          <span className="scs-kpi-label">average response time<br />in live chat</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="scs-page-light">
      <Navbar activeTab="customer-stories" />
      {/* Artisan-style Header & Hero Image Block */}
      <section className="cs-featured-artisan" style={{ marginTop: '-40px', paddingTop: '100px' }}>
        <div className="cs-featured-artisan-grid" style={{ padding: '0 24px' }}>
          <div className="cs-featured-artisan-content">
            <div className="cs-featured-artisan-header">
              <Link href="/customer-stories" style={{ color: 'white', opacity: 0.8, marginBottom: '24px', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Customer stories
              </Link>
              <div className="cs-featured-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span>Chain of Events</span>
              </div>
              <h2>How Chain of Events automates the output of 5 BDRs with 360Airo</h2>
              <p className="cs-featured-quote">
                “Chain of Events transformed their event outreach and booked record meetings.”
              </p>
            </div>

            <div className="cs-featured-artisan-stats">
              <div className="cs-featured-stat">
                <h4>30hrs</h4>
                <p>BDR output automated</p>
              </div>
              <div className="cs-featured-stat">
                <h4>120%</h4>
                <p>Increase in attendance</p>
              </div>
              <div className="cs-featured-stat">
                <h4>30hrs</h4>
                <p>Saved per week</p>
              </div>
            </div>
          </div>

          <div className="cs-featured-artisan-image">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chain of Events" width="600" height="600" loading="eager" decoding="async" />
            <div className="cs-featured-image-overlay">
              <p className="cs-featured-name">Jane Doe</p>
              <p className="cs-featured-title">Head of Events at Chain of Events</p>
            </div>
          </div>
        </div>
      </section>

      <div className="scs-split-container">
        {/* Left Column: Scrollable Content */}
        <div className="scs-right-scrollable-content">
          <article className="scs-article-content">
            {/* Table of Contents */}
            <div className="scs-toc-container" style={{ marginBottom: '64px' }}>
              <div className="scs-sidebar-box" style={{ padding: '24px 0', borderRadius: '16px', backgroundColor: '#FAF9F6' }}>
                <p className="scs-toc-title" style={{ paddingLeft: '24px', marginBottom: '24px', fontSize: '13px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Table of contents</p>
                <nav className="scs-toc-links" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="#introduction" className={activeSection === 'introduction' ? 'scs-toc-active' : ''}>Introduction</a>
                  <a href="#the-challenge" className={activeSection === 'the-challenge' ? 'scs-toc-active' : ''}>The problems</a>
                  <a href="#the-solution" className={activeSection === 'the-solution' ? 'scs-toc-active' : ''}>Why 360Airo worked</a>
                  <a href="#results" className={activeSection === 'results' ? 'scs-toc-active' : ''}>Results in 30 days</a>
                  <a href="#what-changed" className={activeSection === 'what-changed' ? 'scs-toc-active' : ''}>What Changed</a>
                  <a href="#outcome" className={activeSection === 'outcome' ? 'scs-toc-active' : ''}>Outcome</a>
                </nav>
              </div>
            </div>

            <section id="introduction">
              <h2 className="scs-section-heading" style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px', color: '#111827' }}>Introduction</h2>
              <h3 style={{ fontSize: '36px', lineHeight: '1.2', marginBottom: '24px', fontWeight: 500, letterSpacing: '-0.02em', color: '#111827' }}>
                Chain of Events, a events company size 30, came to 360Airo with a familiar problem
              </h3>
              <p style={{ fontSize: '20px', color: '#525252' }}>
                A capable sales team that worked hard but couldn’t scale outbound the way the business needed. Within 30 days of implementation, the team’s outreach capacity, qualified conversation volume, and new client wins moved in ways that changed how leadership thought about pipeline generation.
              </p>
              <div className="scs-inline-visual" style={{ marginTop: '32px', width: '100%' }}>
                {renderIntroVisual()}
              </div>
            </section>

            <section id="the-challenge">
              <h2>The problems: Manual research and difficulty scaling outreach</h2>
              <p style={{ marginBottom: '32px' }}>Manual workflows could not support both quality and volume at the same time. Chain of Events needed quality at scale, not just more volume.</p>

              <div className="scs-numbered-item">
                <div className="scs-number-badge">1</div>
                <div className="scs-numbered-content">
                  <h3>Manual research consumed hundreds of hours</h3>
                  <p>Before 360Airo, reps spent close to four hours a day researching events decision-makers working through directories to find people worth contacting.</p>
                </div>
              </div>
              <div className="scs-numbered-item">
                <div className="scs-number-badge">2</div>
                <div className="scs-numbered-content">
                  <h3>Scaling was impossible</h3>
                  <p>Without a system to manage sequencing, replies and next steps were tracked manually, and prospects who didn’t respond often went unanswered.</p>
                </div>
              </div>
              <div className="scs-numbered-item">
                <div className="scs-number-badge">3</div>
                <div className="scs-numbered-content">
                  <h3>Growth was tied directly to headcount</h3>
                  <p>Adding capacity meant adding people, and even then, the ceiling on qualified conversations stayed low.</p>
                </div>
              </div>
            </section>

            <section id="the-solution">
              <h2>Why 360Airo worked: Scale, speed, and automation</h2>
              <p style={{ marginBottom: '32px' }}>360Airo replaced the manual front end of the sales process with AI-driven prospecting built around Shiro’s ideal customer profile.</p>

              <div className="scs-numbered-item">
                <div className="scs-number-badge purple">1</div>
                <div className="scs-numbered-content">
                  <h3>Automated Prospecting</h3>
                  <p>Instead of reps hand-searching for buyers, the platform identified qualified events decision-makers automatically and queued them for outreach.</p>
                </div>
              </div>
              <div className="scs-numbered-item">
                <div className="scs-number-badge purple">2</div>
                <div className="scs-numbered-content">
                  <h3>Personalized Messaging at Scale</h3>
                  <p>From there, personalized messaging went out across email and LinkedIn, with automated sequencing handling follow-up timing.</p>
                </div>
              </div>
              <div className="scs-numbered-item">
                <div className="scs-number-badge purple">3</div>
                <div className="scs-numbered-content">
                  <h3>Unified Inbox</h3>
                  <p>Reply intent detection flagged genuine interest and routed it to the right rep, while a unified inbox kept every conversation in one place.</p>
                </div>
              </div>
            </section>

            <section id="results">
              <h2>Results in 30 days</h2>
              <div style={{ overflowX: 'auto', marginTop: '40px', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px -4px rgba(0,0,0,0.06), 0 4px 12px -4px rgba(0,0,0,0.03)', border: '1px solid #F3F4F6' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #070b17 0%, #0c162c 40%, #1a244d 100%)', color: 'white' }}>
                      <th style={{ padding: '20px 24px', fontWeight: 600, fontSize: '15px', letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.9 }}>Metric</th>
                      <th style={{ padding: '20px 24px', fontWeight: 600, fontSize: '15px', letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.9 }}>Before 360AIRO</th>
                      <th style={{ padding: '20px 24px', fontWeight: 600, fontSize: '15px', letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.9 }}>After 360AIRO</th>
                      <th style={{ padding: '20px 24px', fontWeight: 600, fontSize: '15px', letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.9, textAlign: 'center' }}>Impact</th>
                    </tr>
                  </thead>
                  <tbody className="scs-premium-table-body">
                    <tr style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s ease', backgroundColor: '#FAFAFA' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>New Clients Acquired</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>1–3 per month</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>7 in 30 days</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #D1FAE5' }}>+250% growth</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s ease', backgroundColor: 'white' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>Qualified Conversations</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>12 / month</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>41 / month</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #D1FAE5' }}>3.4x increase</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s ease', backgroundColor: '#FAFAFA' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>Outreach Capacity</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>300 prospects / month</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>1,500 prospects / month</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #D1FAE5' }}>5x increase</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s ease', backgroundColor: 'white' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>Prospect Research Time</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>4 hours / day</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>1 hour / day</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #DBEAFE' }}>70% reduction</span>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s ease', backgroundColor: '#FAFAFA' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>Follow-Up Process</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>Manual</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>Fully automated</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #D1FAE5' }}>100% consistency</span>
                      </td>
                    </tr>
                    <tr style={{ transition: 'background-color 0.2s ease', backgroundColor: 'white' }}>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 600, fontSize: '16px' }}>Sales Team Productivity</td>
                      <td style={{ padding: '24px', color: '#6B7280', fontSize: '15px' }}>Limited by bandwidth</td>
                      <td style={{ padding: '24px', color: '#111827', fontWeight: 500, fontSize: '15px' }}>Focused on closing deals</td>
                      <td style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', backgroundColor: '#F5F3FF', color: '#6D28D9', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid #EDE9FE' }}>Significant improvement</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="what-changed">
              <h2>What Changed</h2>
              <p>The core difference wasn’t more effort it was where effort went. Research, which used to consume most of the team’s day, dropped to about an hour, with the platform handling discovery and qualification in the background. That freed reps to spend their time on conversations that were already warm, rather than the search for who to talk to next.</p>
              <p>Follow-up stopped depending on memory or bandwidth. Every sequence ran automatically and consistently, so prospects who needed a second or third touch actually got one. And because outreach volume was no longer capped by available hours, the team reached five times more prospects without adding a single new hire.</p>

              <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                {renderComparisonVisual()}
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', color: '#111827', marginTop: '64px' }}>How Shiro runs 360Airo day to day</h3>
              <div className="scs-checklist" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="scs-checklist-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <rect width="24" height="24" rx="6" fill="#DCFCE7" />
                    <path d="M17 8L10.125 15.3333L7 12.0001" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '18px', color: '#111827', fontWeight: 500 }}>Discovery and qualification handled in the background</span>
                </div>
                <div className="scs-checklist-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <rect width="24" height="24" rx="6" fill="#DCFCE7" />
                    <path d="M17 8L10.125 15.3333L7 12.0001" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '18px', color: '#111827', fontWeight: 500 }}>Follow-up runs automatically and consistently</span>
                </div>
                <div className="scs-checklist-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <rect width="24" height="24" rx="6" fill="#DCFCE7" />
                    <path d="M17 8L10.125 15.3333L7 12.0001" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '18px', color: '#111827', fontWeight: 500 }}>Reps spend time on already warm conversations</span>
                </div>
                <div className="scs-checklist-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <rect width="24" height="24" rx="6" fill="#DCFCE7" />
                    <path d="M17 8L10.125 15.3333L7 12.0001" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '18px', color: '#111827', fontWeight: 500 }}>Reached 5x more prospects without adding new hires</span>
                </div>
              </div>
            </section>

            <section id="outcome">
              <h2>Outcome</h2>
              <div className="scs-inline-visual" style={{ marginTop: '32px', marginBottom: '32px', width: '100%' }}>
                {renderOutcomeVisual()}
              </div>
              <p>Thirty days in, Chain of Events had a different sales motion one where pipeline growth no longer depended on adding people, and qualified conversations were no longer a function of how many hours a rep could squeeze into research. The team kept its size and changed its output.</p>
              <p>For revenue leaders managing the same constraints too much manual prospecting, follow-up that depends on individual discipline, growth capped by headcount 360AIRO offers a path to the same result: more pipeline, generated with less manual work.</p>
            </section>
          </article>
        </div>

        {/* Right Column: Company Details + Sticky Dynamic Visual Panel */}
        <aside className="scs-right-details-column">
          <div className="scs-sidebar-box" style={{ padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF9F6' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Company</p>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>Chain of Events</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Industry</p>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827' }}>Events</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '10px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Region</p>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://hatscripts.github.io/circle-flags/flags/eu.svg" alt="EU Flag" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
                EMEA
              </div>
            </div>
          </div>

          {/* 360Airo Ad Box */}
          <div className="scs-sidebar-box" style={{ 
            padding: '16px', 
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#070b17', 
            backgroundImage: 'linear-gradient(135deg, #070b17 0%, #0c162c 40%, #1a244d 100%)',
            color: 'white',
            marginTop: '12px',
            boxShadow: '0 8px 20px rgba(12, 22, 44, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img src="/FinalLogo_icon_transparent.png" alt="360Airo Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              <div style={{ fontWeight: 700, fontSize: '15px', color: 'white', fontFamily: '"Outfit", sans-serif' }}>360Airo</div>
            </div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 4px 0', lineHeight: 1.3, color: 'white' }}>Put Multichannel outbound on autopilot</h4>
            <p style={{ fontSize: '11px', opacity: 0.85, margin: '0 0 12px 0', lineHeight: 1.4, color: 'rgba(255, 255, 255, 0.8)' }}>
              Hire the AI BDR that discovers qualified events leads and books meetings 24/7.
            </p>
            <Link href="/pricing" style={{ 
              backgroundColor: 'white', 
              color: '#1a244d', 
              padding: '8px 12px', 
              borderRadius: '100px', 
              textDecoration: 'none', 
              fontWeight: 600, 
              fontSize: '11px', 
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition: 'all 0.2s ease'
            }}>
              Learn More →
            </Link>
          </div>
        </aside>
      </div>

      {/* Explore more customers */}
      <section style={{ backgroundColor: '#F8F9FA', padding: '64px 24px', marginTop: '0px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 400, color: '#111827', marginBottom: '48px', fontFamily: '"Outfit", sans-serif' }}>Explore more customers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            <CustomerStoryCard
              company="Chain of Events"
              title="How Chain of Events automates the output of 5 BDRs with Artisan"
              image="https://images.ctfassets.net/kyprwggh4muz/3krp9IBrWkPRpU1CTzc6VD/5a9a2064d421a3bf569d090160ab3721/Raise_Promo.png"
              tags={[
                { label: "Events" },
                { label: "EMEA", icon: "🌍" }
              ]}
              to="/customer-stories/chain-of-events"
            />
            <CustomerStoryCard
              company="Zirtual"
              title="How Zirtual tripled its monthly leads with Artisan"
              image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              tags={[
                { label: "VA service" },
                { label: "USA", icon: "🇺🇸" }
              ]}
              to="/customer-stories/zirtual"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/customer-stories" style={{ padding: '8px 20px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '100px', fontSize: '14px', color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              View all <span style={{ fontSize: '12px' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Autopilot CTA Section */}
      <section style={{ padding: '80px 24px', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '40px', fontWeight: 500, color: '#111827', marginBottom: '32px', fontFamily: '"Inter", sans-serif', letterSpacing: '-0.02em' }}>
            Put  Multichannel outbound on autopilot<br />
            <span style={{ background: 'linear-gradient(135deg, #070b17 0%, #0c162c 40%, #1a244d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>with 360Airo, the AI BDR</span>
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}>
            <Link href="/pricing" style={{ background: 'linear-gradient(135deg, #070b17 0%, #0c162c 40%, #1a244d 100%)', color: 'white', padding: '12px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, fontSize: '15px', boxShadow: '0 4px 20px rgba(7,11,23,0.35)', letterSpacing: '0.01em' }}>
              Try 360Airo →
            </Link>
            <Link href="/demo" style={{ background: 'transparent', color: '#0c162c', border: '2px solid #1a244d', padding: '12px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, fontSize: '15px', letterSpacing: '0.01em' }}>
              Book a demo →
            </Link>
          </div>

          {/* Feature Marquee */}
          <div style={{ marginTop: '64px', width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden' }}>
            <FeatureMarquee />
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div style={{ position: 'absolute', left: '-200px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.05)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', right: '-200px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.05)', zIndex: 1 }}></div>
      </section>
      <Footer />
    </div>
  );
}
