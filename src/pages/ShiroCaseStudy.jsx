import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import '../styles/shiro-case-study.css';
import '../styles/customer-stories.css';
import CustomerStoryCard from '../components/CustomerStoryCard';

export default function ShiroCaseStudy() {
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
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.2 }
    );

    const sections = document.querySelectorAll('.scs-article-content section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scs-page-light">
      {/* Artisan-style Header & Hero Image Block */}
      <section className="cs-featured-artisan" style={{ marginTop: '-40px', paddingTop: '100px' }}>
        <div className="cs-featured-artisan-grid" style={{ padding: '0 24px' }}>
          <div className="cs-featured-artisan-content">
            <div className="cs-featured-artisan-header">
              <Link to="/customer-stories" style={{color: 'white', opacity: 0.8, marginBottom: '10px', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: '14px', fontWeight: 500}}>
                <ChevronLeft size={16} style={{marginRight: '4px'}} /> Customer stories
              </Link>
              <div className="cs-featured-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span>Shiro's Logistics</span>
              </div>
              <h2>From Manual Prospecting to Predictable Pipeline</h2>
              <p className="cs-featured-quote">
                “How Logistics Company used 360Airo to acquire 7 new clients in 30 days.”
              </p>
            </div>
            
            <div className="cs-featured-artisan-stats">
              <div className="cs-featured-stat">
                <h4>7</h4>
                <p>New clients in 30 days (+250%)</p>
              </div>
              <div className="cs-featured-stat">
                <h4>3.4x</h4>
                <p>Increase in qualified convos</p>
              </div>
              <div className="cs-featured-stat">
                <h4>5x</h4>
                <p>Outreach capacity growth</p>
              </div>
            </div>
          </div>

          <div className="cs-featured-artisan-image">
            <img src="/images/logistics_hero.png" alt="Shiro Logistics" width="600" height="600" loading="eager" decoding="async" />
            <div className="cs-featured-image-overlay">
              <p className="cs-featured-name">Sarah Chen</p>
              <p className="cs-featured-title">VP of Sales at Shiro</p>
            </div>
          </div>
        </div>
      </section>

      <div className="scs-split-container">
        {/* Left Side: Sticky Sidebar TOC */}


        {/* Center: Scrollable Content with inline images */}
        <div className="scs-right-scrollable-content">
          <article className="scs-article-content">
            {/* Mobile Inline Table of Contents */}
            <div className="scs-inline-toc" style={{ marginBottom: '48px', padding: '32px', background: '#FAFAFA', border: '1px solid #E5E5E5', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px', fontFamily: '"Inter", sans-serif' }}>Table of contents</h3>
              <ul className="toc-items" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-definition-1" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Definition</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-benefits-2" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Benefits</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-considerations-for-table-of-contents-design-3" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Considerations for Table-of-Contents Design</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-placement-considerations-4" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Placement Considerations</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-styling-considerations-5" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Styling Considerations</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-best-practices-for-tables-of-contents-6" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Best Practices for Tables of Contents</a>
                </li>
                <li className="article-table-of-content">
                  <a className="ga-article-toc-item" href="#toc-conclusion-7" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 600, fontSize: '15px', fontFamily: '"Inter", sans-serif' }}>Conclusion</a>
                </li>
              </ul>
            </div>

            <section id="introduction">
              <h2>Introduction</h2>
              <p>Shiro, a logistics company size 30, came to 360Airo with a familiar problem: a capable sales team that worked hard but couldn’t scale outbound the way the business needed. Within 30 days of implementation, the team’s outreach capacity, qualified conversation volume, and new client wins moved in ways that changed how leadership thought about pipeline generation.</p>
              <img 
                src="/images/sales_team_dashboard.png" 
                alt="Sales team dashboard showing pipeline growth" 
                loading="lazy"
                width="2508"
                height="1110"
                className="scs-inline-img"
              />
            </section>

            <section id="the-challenge">
              <h2>The problems: Manual research and difficulty scaling outreach</h2>
              <p style={{marginBottom: '32px'}}>Manual workflows could not support both quality and volume at the same time. Shiro needed quality at scale, not just more volume.</p>
              
              <div className="scs-numbered-item">
                <div className="scs-number-badge">1</div>
                <div className="scs-numbered-content">
                  <h3>Manual research consumed hundreds of hours</h3>
                  <p>Before 360Airo, reps spent close to four hours a day researching logistics decision-makers working through directories to find people worth contacting.</p>
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
              <p style={{marginBottom: '32px'}}>360Airo replaced the manual front end of the sales process with AI-driven prospecting built around Shiro’s ideal customer profile.</p>

              <div className="scs-numbered-item">
                <div className="scs-number-badge purple">1</div>
                <div className="scs-numbered-content">
                  <h3>Automated Prospecting</h3>
                  <p>Instead of reps hand-searching for buyers, the platform identified qualified logistics decision-makers automatically and queued them for outreach.</p>
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
              <p>The shift showed up within the first 30 days, across every stage of the outbound funnel:</p>
              
              <div className="scs-table-wrapper-light">
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
            </section>

            <section id="what-changed">
              <h2>What Changed</h2>
              <p>The core difference wasn’t more effort it was where effort went. Research, which used to consume most of the team’s day, dropped to about an hour, with the platform handling discovery and qualification in the background. That freed reps to spend their time on conversations that were already warm, rather than the search for who to talk to next.</p>
              <p>Follow-up stopped depending on memory or bandwidth. Every sequence ran automatically and consistently, so prospects who needed a second or third touch actually got one. And because outreach volume was no longer capped by available hours, the team reached five times more prospects without adding a single new hire.</p>
              
              <div className="scs-interactive-comparison">
                <div className="scs-ic-toggle-container">
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

                <div className="scs-ic-content-container">
                  <div className={`scs-ic-view ${compareView === 'before' ? 'active' : ''}`}>
                    <ul className="scs-ic-before-list">
                      <li><span>Sales reps manually searched for logistics decision-makers</span></li>
                      <li><span>Outreach volume was limited by available time</span></li>
                      <li><span>Follow-ups were inconsistent and often missed</span></li>
                      <li><span>Generating new business required significant manual effort</span></li>
                      <li><span>Growth depended on hiring more sales resources</span></li>
                    </ul>
                  </div>

                  <div className={`scs-ic-view ${compareView === 'after' ? 'active' : ''}`}>
                    <ul className="scs-ic-after-list">
                      <li><Check size={18} className="scs-ic-check" /> <span>AI automatically identified qualified logistics buyers</span></li>
                      <li><Check size={18} className="scs-ic-check" /> <span>Personalized outreach launched at scale across multiple channels</span></li>
                      <li><Check size={18} className="scs-ic-check" /> <span>Automated follow-ups ensured no opportunity was missed</span></li>
                      <li><Check size={18} className="scs-ic-check" /> <span>Sales team spent more time closing and less time researching</span></li>
                      <li><Check size={18} className="scs-ic-check" /> <span>7 new clients acquired in just 30 days</span></li>
                      <li><Check size={18} className="scs-ic-check" /> <span>Predictable pipeline generation without increasing headcount</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="outcome">
              <h2>Outcome</h2>
              <p>Thirty days in, Shiro had a different sales motion one where pipeline growth no longer depended on adding people, and qualified conversations were no longer a function of how many hours a rep could squeeze into research. The team kept its size and changed its output.</p>
              <p>For revenue leaders managing the same constraints too much manual prospecting, follow-up that depends on individual discipline, growth capped by headcount 360AIRO offers a path to the same result: more pipeline, generated with less manual work.</p>
            </section>

            <div className="scs-kpi-card">
              <div className="scs-kpi-item">
                <div className="scs-kpi-ring yellow"></div>
                <div className="scs-kpi-text">
                  <span className="scs-kpi-value">4.6/5</span>
                  <span className="scs-kpi-label">customer satisfaction<br/>rate on G2</span>
                </div>
              </div>
              <div className="scs-kpi-item">
                <div className="scs-kpi-ring green"></div>
                <div className="scs-kpi-text">
                  <span className="scs-kpi-value">96%</span>
                  <span className="scs-kpi-label">support satisfaction<br/>rate</span>
                </div>
              </div>
              <div className="scs-kpi-item">
                <div className="scs-kpi-ring blue"></div>
                <div className="scs-kpi-text">
                  <span className="scs-kpi-value">2 min</span>
                  <span className="scs-kpi-label">average response time<br/>in live chat</span>
                </div>
              </div>
            </div>


          </article>
        </div>

        {/* Right Side: Company Details */}
        <aside className="scs-right-details-column">
          <div className="scs-sidebar-box" style={{ padding: '24px' }}>
            <div className="scs-info-row" style={{ padding: '16px 0 first:pt-0' }}>
              <span className="scs-info-row-label" style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>Company</span>
              <span className="scs-info-row-value" style={{ fontSize: '18px', color: '#030712', fontWeight: 600 }}>Shiro</span>
            </div>
            <div className="scs-info-row" style={{ padding: '16px 0' }}>
              <span className="scs-info-row-label" style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>Industry</span>
              <span className="scs-info-row-value" style={{ fontSize: '18px', color: '#030712', fontWeight: 600 }}>Logistics</span>
            </div>
            <div className="scs-info-row" style={{ padding: '16px 0 last:pb-0' }}>
              <span className="scs-info-row-label" style={{ fontSize: '14px', color: '#6B7280', fontWeight: 500 }}>Region</span>
              <span className="scs-info-row-value" style={{ fontSize: '18px', color: '#030712', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://hatscripts.github.io/circle-flags/flags/us.svg" alt="USA Flag" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                USA
              </span>
            </div>
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
            <Link to="/customer-stories" style={{ padding: '8px 20px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px', color: '#374151', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', fontWeight: 500, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              View all <span style={{fontSize: '12px'}}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
