// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import '../styles/OutreachDeploySection.css';

export default function OutreachDeploySection() {
  const [activeTab, setActiveTab] = useState('csv');
  const [csvProgress, setCsvProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState('idle');
  const [linkedInProfiles, setLinkedInProfiles] = useState([
    { name: "Sarah Chen", role: "VP Finance", company: "Stark Labs", status: "Importing..." },
    { name: "Tyler Grayson", role: "CFO", company: "Procol", status: "Verified" }
  ]);
  const [scrapedCount, setScrapedCount] = useState(2);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic Tab Autoplay and Progress Controller
  useEffect(() => {
    if (!isVisible) return;

    let timer;

    if (activeTab === 'csv') {
      setCsvProgress(0);
      const csvInterval = setInterval(() => {
        setCsvProgress((prev) => {
          if (prev >= 100) {
            clearInterval(csvInterval);
            // Transition to the next tab (crm) 1 second after completion
            timer = setTimeout(() => {
              setActiveTab('crm');
            }, 1000);
            return 100;
          }
          return prev + 5;
        });
      }, 100); // Snappy 100ms intervals

      return () => {
        clearInterval(csvInterval);
        clearTimeout(timer);
      };
    } else if (activeTab === 'crm') {
      // Stay on CRM sync tab for 5 seconds before changing
      timer = setTimeout(() => {
        setActiveTab('linkedin');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (activeTab === 'linkedin') {
      // Stay on LinkedIn extension tab for 6 seconds before looping back
      timer = setTimeout(() => {
        setActiveTab('csv');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isVisible]);

  // Auto-running loops inside mockups for autoplay animation effect
  useEffect(() => {
    // CRM sync heartbeat animation loop
    const syncInterval = setInterval(() => {
      setSyncStatus((prev) => (prev === 'syncing' ? 'completed' : 'syncing'));
    }, 3000);

    // LinkedIn profile import ticker loop
    const linkedinInterval = setInterval(() => {
      const names = ["Matteo Ricci", "Laura Law", "Dave Allison", "Elena Rostova", "Marcus Vance"];
      const roles = ["CFO", "VP Finance", "Head of Finance", "Director of Finance"];
      const companies = ["Helium", "Spot", "Avant", "Moonbeam", "Sapient"];
      
      setLinkedInProfiles((prev) => {
        const newProfile = {
          name: names[Math.floor(Math.random() * names.length)],
          role: roles[Math.floor(Math.random() * roles.length)],
          company: companies[Math.floor(Math.random() * companies.length)],
          status: "Verified"
        };
        setScrapedCount(c => c + 1);
        return [newProfile, prev[0]];
      });
    }, 4000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(linkedinInterval);
    };
  }, []);

  // Intersection observer to autoplay tabs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="deploy-section-wrapper" ref={sectionRef}>
      <div className="deploy-section-container">
        
        {/* Title Block */}
        <div className="deploy-section-header">
          <div className="deploy-eyebrow">Outreach Launchpad</div>
          <h2>Deploying campaign sequences <span>made easy</span></h2>
          <p>Launch targeted outreach campaigns from any source list in seconds. Auto-sync, scrub, and start conversations.</p>
        </div>

        {/* Flex Panel: Left Tabs, Right Mockup Screen */}
        <div className="deploy-flex-layout">
          
          {/* Left Columns - Tabs Selection */}
          <div className="deploy-tabs-column">
            
            <div 
              className={`deploy-tab-item ${activeTab === 'csv' ? 'active' : ''}`}
              onClick={() => setActiveTab('csv')}
            >
              <div className="tab-icon-box">
                <svg className="tab-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="tab-text-box">
                <h4>CSV / Excel List Upload</h4>
                <p>Drag and drop lists to clean columns, parse names, and identify channels.</p>
              </div>
            </div>

            <div 
              className={`deploy-tab-item ${activeTab === 'crm' ? 'active' : ''}`}
              onClick={() => setActiveTab('crm')}
            >
              <div className="tab-icon-box">
                <svg className="tab-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
              <div className="tab-text-box">
                <h4>CRM Contacts Sync</h4>
                <p>Sync deals dynamically from Salesforce, HubSpot, or Pipedrive.</p>
              </div>
            </div>

            <div 
              className={`deploy-tab-item ${activeTab === 'linkedin' ? 'active' : ''}`}
              onClick={() => setActiveTab('linkedin')}
            >
              <div className="tab-icon-box">
                <svg className="tab-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="tab-text-box">
                <h4>LinkedIn SalesNav Scraper</h4>
                <p>Import searches directly using our browser chrome extension.</p>
              </div>
            </div>

          </div>

          {/* Right Column - Mockup Window */}
          <div className="deploy-mockup-column">
            <div className="mockup-window-frame">
              <div className="mockup-window-header">
                <span className="mockup-window-dot red"></span>
                <span className="mockup-window-dot yellow"></span>
                <span className="mockup-window-dot green"></span>
                <div className="mockup-window-address">
                  {activeTab === 'csv' && "360airo.app/outbound/import-csv"}
                  {activeTab === 'crm' && "360airo.app/outbound/crm-integrations"}
                  {activeTab === 'linkedin' && "360airo.app/outbound/linkedin-extension"}
                </div>
              </div>
              <div className="mockup-window-body">
                
                {/* CSV MOCKUP */}
                {activeTab === 'csv' && (
                  <div className="mockup-view-content csv-view animate-fade-in">
                    <div className="csv-drop-box">
                      <div className="csv-icon-glow">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <h5>import_list_q3_saas.csv</h5>
                      <span className="csv-size">482KB • 4,820 records</span>
                      
                      <div className="csv-progress-container">
                        <div className="csv-progress-bar" style={{ width: `${csvProgress}%` }}></div>
                      </div>
                      <div className="csv-progress-labels">
                        <span>Verifying Emails & Phones...</span>
                        <span>{csvProgress}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CRM MOCKUP */}
                {activeTab === 'crm' && (
                  <div className="mockup-view-content crm-view animate-fade-in">
                    <div className="crm-sync-grid">
                      <div className="crm-node-box pipedrive" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20 }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L10.5 16c.45.45 1.08.7 1.5.7.83 0 1.5-.67 1.5-1.5 0-.42-.25-1.05-.7-1.5L9.2 10.1c.83-.45 1.79-.7 2.8-.7 3.31 0 6 2.69 6 6 0 3.31-2.69 6-6 6z" fill="currentColor"/>
                          </svg>
                          <span className="crm-logo-mock black" style={{ color: '#000000' }}>Pipedrive</span>
                        </div>
                        <span className="crm-node-status">Connected</span>
                      </div>
                      <div className="crm-sync-center">
                        <div className="crm-sync-arrow-box">
                          <svg className={`sync-spin-icon ${syncStatus === 'syncing' ? 'spin' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                          </svg>
                        </div>
                        <span className="sync-lbl-text">{syncStatus === 'syncing' ? "Syncing contacts..." : "Contacts updated!"}</span>
                      </div>
                      <div className="crm-node-box airo" style={{ justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '30px' }}>
                          <img 
                            src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" 
                            alt="360Airo Logo" 
                            style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
                          />
                        </div>
                        <span className="crm-node-status">Ready</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LINKEDIN MOCKUP */}
                {activeTab === 'linkedin' && (
                  <div className="mockup-view-content linkedin-view animate-fade-in">
                    <div className="linkedin-mock-header">
                      <span className="li-search-pill">Search: "US CFO B2B SaaS"</span>
                      <span className="li-counter">Scraped: <strong>{scrapedCount}</strong></span>
                    </div>
                    <div className="linkedin-profiles-list">
                      {linkedInProfiles.map((p, idx) => (
                        <div key={idx} className="li-profile-row animate-fade-in">
                          <div className="li-prof-avatar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="li-prof-details">
                            <h6>{p.name}</h6>
                            <p>{p.role} @ {p.company}</p>
                          </div>
                          <span className={`li-prof-badge ${p.status.toLowerCase()}`}>
                            {p.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  );
}
