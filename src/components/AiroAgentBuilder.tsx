// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../styles/AiroAgentBuilder.css';

export default function AiroAgentBuilder() {
  const [activeTab, setActiveTab] = useState('ai');
  const [currentStep, setCurrentStep] = useState(0); // 0: help query, 1: follow-up logic query, 2: linkedin/sms logic, 3: launch query, 4: running, 5: completed
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'agent',
      text: "Hello! I am AiroAgent, your outbound growth architect. How can I help you today?"
    }
  ]);
  const [runningNode, setRunningNode] = useState(null); // Keeps track of which node is currently "pulsing" or processing
  const chatEndRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutsRef = useRef([]);

  const addTimeout = (callback, delay) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  const messagesContainerRef = useRef(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  // Autoplay simulation sequence when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          } else {
            setHasStarted(false);
          }
        });
      },
      { threshold: 0.4 } // trigger when 40% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const runAutoplaySequence = () => {
    clearAllTimeouts();
    setRunningNode(null);
    setCurrentStep(0);
    setChatMessages([
      {
        sender: 'agent',
        text: "Hello! I am AiroAgent, your outbound growth architect. How can I help you today?"
      }
    ]);

    // Turn 1
    addTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: "I want to build outbound automation" },
        { sender: 'agent', text: "Brilliant outbound choice! Email outreach is a high-converting foundation. If they don't reply within 2 days, what should we do as a follow-up? Also, what if they do reply?" }
      ]);
      setCurrentStep(1);
    }, 1200);

    // Turn 2
    addTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: "After 2 days, take follow up. If replied -> push to Pipedrive CRM. If no replies -> send LinkedIn invite with personalized note." },
        { sender: 'agent', text: "Excellent multichannel logic! Pipedrive for active leads, and a personalized LinkedIn invite to keep the outreach warm. Now, if they accept the LinkedIn connection, how should we proceed if they reply vs. if they remain silent?" }
      ]);
      setCurrentStep(2);
    }, 3600);

    // Turn 3
    addTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: "If accepted and replied -> Msg about the mail 'I tried to reach out to you on this email, no replies'. If no reply, message them SMS." },
        { sender: 'agent', text: "A masterfully structured setup! Connecting email, Pipedrive CRM, LinkedIn, and SMS creates a highly cohesive, high-converting loop. I am ready to generate this automation campaign flowchart. Shall we launch it?" }
      ]);
      setCurrentStep(3);
    }, 6000);

    // Turn 4
    addTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'user', text: "Launch campaign" },
        { sender: 'agent', text: "Analyzing templates, writing sequence copies, setting up Pipedrive CRM Webhooks, and drawing the automation flowchart..." }
      ]);
      setCurrentStep(4);
    }, 8400);
  };

  useEffect(() => {
    if (hasStarted) {
      runAutoplaySequence();
    }
    return () => {
      clearAllTimeouts();
    };
  }, [hasStarted]);

  // Autoplay simulation sequence if campaign is launched
  useEffect(() => {
    if (currentStep === 4) {
      const sequence = [
        { node: 'start', delay: 300 },
        { node: 'email1', delay: 1000 },
        { node: 'decision1', delay: 1700 },
        { node: 'crm', delay: 2400 },
        { node: 'linkedin-invite', delay: 3100 },
        { node: 'decision2', delay: 3800 },
        { node: 'linkedin-msg', delay: 4500 },
        { node: 'sms', delay: 5200 },
        { node: 'complete', delay: 5900 }
      ];

      sequence.forEach((step) => {
        const id = window.setTimeout(() => {
          setRunningNode(step.node);
          if (step.node === 'complete') {
            setCurrentStep(5);
            setChatMessages(prev => [
              ...prev,
              { sender: 'agent', text: "Outreach campaign running successfully! 🚀 Sequences active, Pipedrive CRM integrated, replies and messages will stream in real time." }
            ]);

            // Wait 3.5 seconds, then loop back
            const loopId = window.setTimeout(() => {
              runAutoplaySequence();
            }, 3500);
            timeoutsRef.current.push(loopId);
          }
        }, step.delay);
        timeoutsRef.current.push(id);
      });
    }
  }, [currentStep]);

  const resetBuilder = () => {
    runAutoplaySequence();
  };

  return (
    <div className="agent-builder-section-wrapper" ref={sectionRef}>
      <div className="agent-builder-section">
        <div className="agent-builder-header">
          <h2>Build the outbound campaigns <br /><span>your team actually needs</span></h2>
          <p>Drop in criteria, let AiroAgent write sequences, and preview automation charts in real time.</p>
        </div>

      {/* Tabs */}
      <div className="ab-tabs">
        <button 
          className={`ab-tab ${activeTab === 'ai' ? 'active' : ''}`} 
          onClick={() => setActiveTab('ai')}
        >
          ✨ Let AI handle it
        </button>
        <button 
          className={`ab-tab ${activeTab === 'leads' ? 'active' : ''}`} 
          onClick={() => setActiveTab('leads')}
        >
          🔍 Get verified data
        </button>

        <button 
          className={`ab-tab ${activeTab === 'engage' ? 'active' : ''}`} 
          onClick={() => setActiveTab('engage')}
        >
          ✉️ Engage on multi-channels
        </button>
        <button 
          className={`ab-tab ${activeTab === 'spam' ? 'active' : ''}`} 
          onClick={() => setActiveTab('spam')}
        >
          🛡️ Avoid spam
        </button>
      </div>

      {/* App Window Frame Mockup */}
      <div className="ab-window">
        <div className="ab-window-header">
          <div className="ab-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="ab-window-title">
            <span className="ab-logo-icon"><Image src="/logo-icon.png" alt="360Airo" width={18} height={18} /></span>
            <strong>360Airo Agent</strong>
            <span className="ab-title-campaign">Find CFOs in B2B SaaS companies in the US</span>
          </div>
          <div className="ab-window-actions">
            <span>💻 Preview</span>
          </div>
        </div>

        <div className="ab-window-body">
          {activeTab === 'ai' && (
            <>
              {/* LEFT SIDE: Conversational AI Agent Chat */}
              <div className="ab-chat-panel">
                <div className="chat-header">
                  <span className="agent-avatar"><Image src="/logo-icon.png" alt="360Airo" width={22} height={22} /></span>
                  <div>
                    <h4>AiroAgent</h4>
                    <span className="status-online">Online</span>
                  </div>
                </div>

                <div className="chat-messages-container" ref={messagesContainerRef}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'agent-msg'}`}>
                      {msg.sender === 'agent' && <span className="msg-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image src="/logo-icon.png" alt="360Airo" width={16} height={16} /></span>}
                      <div className="chat-bubble">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="chat-actions-panel">
                  {currentStep === 0 && (
                    <div className="chat-options animate-fade-in">
                      <button className="chat-opt-btn" style={{ pointerEvents: 'none' }}>
                        I want to build outbound automation
                      </button>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="chat-options animate-fade-in">
                      <button className="chat-opt-btn" style={{ pointerEvents: 'none' }}>
                        {"If replied → Pipedrive CRM, else → LinkedIn invite with personalized note"}
                      </button>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="chat-options animate-fade-in">
                      <button className="chat-opt-btn" style={{ pointerEvents: 'none' }}>
                        {"If replied → Msg about email, else → SMS follow-up"}
                      </button>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="chat-options animate-fade-in">
                      <button className="chat-opt-btn btn-launch" style={{ pointerEvents: 'none' }}>
                        ✓ Launch campaign
                      </button>
                      <button className="chat-opt-btn btn-secondary" onClick={resetBuilder}>
                        Reset / Edit criteria
                      </button>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="campaign-running-indicator">
                      <span className="running-spinner"></span>
                      Campaign building... Please watch the flowchart.
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="chat-options animate-fade-in">
                      <button className="chat-opt-btn btn-secondary" onClick={resetBuilder}>
                        🔄 Build another campaign
                      </button>
                    </div>
                  )}

                  <div className="chat-input-mock">
                    <input type="text" placeholder="Type a message or instruction..." disabled />
                    <button className="chat-send-btn">➔</button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Animated Flowchart Grid */}
              <div className="ab-flow-panel">
                <div className="flow-canvas-grid">
                  <div className="sequence-label">Sequence Editor</div>

                  {/* SVG Connection Lines overlay */}
                  <svg className="flow-svg-lines" viewBox="0 0 700 560" preserveAspectRatio="xMidYMid meet">
                    {/* Start → Email */}
                    <line x1="350" y1="38" x2="350" y2="62" className={`flow-line ${runningNode ? 'active' : ''}`} />
                    {/* Email → Decision1 */}
                    <line x1="350" y1="106" x2="350" y2="136" className={`flow-line ${runningNode === 'email1' || runningNode === 'decision1' || runningNode === 'crm' || runningNode === 'linkedin-invite' || runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />
                    {/* Decision1 → CRM (Yes left) */}
                    <path d="M 280 170 L 160 170 L 160 210" className={`flow-line ${runningNode === 'crm' ? 'active' : ''}`} />
                    {/* Decision1 → LinkedIn (No right) */}
                    <path d="M 420 170 L 540 170 L 540 210" className={`flow-line ${runningNode === 'linkedin-invite' || runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />
                    {/* LinkedIn → Decision2 */}
                    <line x1="540" y1="265" x2="540" y2="300" className={`flow-line ${runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />
                    {/* Decision2 → LinkedIn Msg (Yes left) */}
                    <path d="M 480 335 L 310 335 L 310 370" className={`flow-line ${runningNode === 'linkedin-msg' ? 'active' : ''}`} />
                    {/* Decision2 → SMS (No right) */}
                    <path d="M 600 335 L 620 335 L 620 370" className={`flow-line ${runningNode === 'sms' ? 'active' : ''}`} />
                  </svg>

                  {/* Flowchart Nodes */}
                  <div className="flow-nodes">

                    {/* Node 1: Start */}
                    <div className="flow-node node-start" style={{ top: 12, left: '50%', transform: 'translateX(-50%)' }}>
                      Start
                    </div>

                    {/* Node 2: Email 1 */}
                    <div className={`flow-node node-action ${currentStep >= 1 ? 'visible' : ''} ${runningNode === 'email1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== null)) ? 'active-completed' : ''}`}
                      style={{ top: 62, left: '50%', transform: 'translateX(-50%)', width: 200 }}>
                      <div className="node-meta">Send immediately</div>
                      <div className="node-title">
                        <span className="node-logo node-logo-email">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="3" fill="#4f46e5" opacity=".15"/><rect x="2" y="4" width="20" height="16" rx="3" stroke="#4f46e5" strokeWidth="1.5"/><path d="M2 7l10 6 10-6" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                        Email 1 – Send outreach
                      </div>
                    </div>

                    {/* Node 3: Decision 1 (Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'decision1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== 'decision1' && runningNode !== null)) ? 'active-completed' : ''}`}
                      style={{ top: 136, left: '50%', transform: 'translateX(-50%)', width: 180 }}>
                      <span style={{ fontSize: '0.8rem' }}>⏱</span> Replied in 2 days?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* LEFT BRANCH (Yes) — Node 4: Pipedrive CRM */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'crm' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'crm' ? 'active-completed' : ''}`}
                      style={{ top: 210, left: 60, width: 190 }}>
                      <div className="node-meta">Action on Reply</div>
                      <div className="node-title">
                        <span className="node-logo node-logo-pipedrive">
                          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="5" fill="#e84e1b" opacity=".15"/><circle cx="12" cy="9" r="5" stroke="#e84e1b" strokeWidth="1.5"/><path d="M12 14v7" stroke="#e84e1b" strokeWidth="2" strokeLinecap="round"/></svg>
                        </span>
                        Push to Pipedrive CRM
                      </div>
                    </div>

                    {/* RIGHT BRANCH (No) — Node 5: LinkedIn Invite */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'linkedin-invite' ? 'running' : ''} ${(runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'linkedin-invite' ? 'active-completed' : ''}`}
                      style={{ top: 210, right: 60, width: 190 }}>
                      <div className="node-meta">Action if No Reply</div>
                      <div className="node-title">
                        <span className="node-logo node-logo-linkedin">
                          <svg viewBox="0 0 24 24" fill="#0a66c2"><rect width="24" height="24" rx="4" fill="#0a66c2" opacity=".12"/><path d="M7 10v8M7 7v.01M12 18v-5a2 2 0 014 0v5M12 13v5" stroke="#0a66c2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                        LinkedIn invite (personalized)
                      </div>
                    </div>

                    {/* Node 6: Decision 2 (Accepted & Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'decision2' ? 'running' : ''} ${(runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'decision2' ? 'active-completed' : ''}`}
                      style={{ top: 300, right: 60, width: 190 }}>
                      <span style={{ fontSize: '0.8rem' }}>🔗</span> Accepted &amp; Replied?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'linkedin-msg' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'linkedin-msg' ? 'active-completed' : ''}`}
                      style={{ top: 370, left: '50%', transform: 'translateX(-65%)', width: 210 }}>
                      <div className="node-meta">Reach out re: email</div>
                      <div className="node-title">
                        <span className="node-logo node-logo-linkedin">
                          <svg viewBox="0 0 24 24" fill="#0a66c2"><rect width="24" height="24" rx="4" fill="#0a66c2" opacity=".12"/><path d="M7 10v8M7 7v.01M12 18v-5a2 2 0 014 0v5M12 13v5" stroke="#0a66c2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                        Msg: "I tried to reach out..."
                      </div>
                    </div>

                    {/* Node 8: SMS (No) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'sms' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'sms' ? 'active-completed' : ''}`}
                      style={{ top: 370, right: 40, width: 160 }}>
                      <div className="node-meta">SMS Follow-up</div>
                      <div className="node-title">
                        <span className="node-logo node-logo-sms">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="3" fill="#10b981" opacity=".15"/><rect x="2" y="4" width="20" height="14" rx="3" stroke="#10b981" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 18l-3 3v-3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                        Send SMS
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'leads' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header-premium">
                <h3>Power Smarter Decisions with 95% Accurate Data from <a href="https://360marco.com/" target="_blank" rel="noopener noreferrer" className="marco-link">360Marco</a>.</h3>
                <p>Filter through 650M+ prospects with absolute precision.</p>
              </div>
              <div className="mock-leads-grid-premium">
                <div className="mock-filter-sidebar-premium">
                  <div className="filter-header-premium">
                    <span className="filter-icon">⚡</span>
                    <strong>Smart Filters</strong>
                  </div>
                  <div className="filter-group-premium">
                    <label>Job Title</label>
                    <div className="filter-chip-premium active">CFO</div>
                    <div className="filter-chip-premium">VP Finance</div>
                  </div>
                  <div className="filter-group-premium">
                    <label>Industry</label>
                    <div className="filter-chip-premium active">SaaS</div>
                    <div className="filter-chip-premium active">B2B Software</div>
                  </div>
                  <button className="apply-filter-btn">Apply Filters</button>
                </div>
                <div className="mock-leads-table-container">
                  <div className="mock-leads-table-premium">
                    <div className="table-row-premium header-premium">
                      <span>Prospect Name</span>
                      <span>Email</span>
                      <span>Phone</span>
                      <span>Company</span>
                    </div>
                    <div className="table-row-premium">
                      <div className="prospect-info">
                        <div className="prospect-avatar">TG</div>
                        <span>Tyler Grayson</span>
                      </div>
                      <span className="email-pill">tyler@procol.io</span>
                      <span className="phone-text">+1 (512) 345-6789</span>
                      <span className="company-badge">Procol</span>
                    </div>
                    <div className="table-row-premium">
                      <div className="prospect-info">
                        <div className="prospect-avatar">MR</div>
                        <span>Matteo Ricciard</span>
                      </div>
                      <span className="email-pill">matteo@helium.co</span>
                      <span className="phone-text">+33 6 12 34 56 78</span>
                      <span className="company-badge">Helium</span>
                    </div>
                    <div className="table-row-premium">
                      <div className="prospect-info">
                        <div className="prospect-avatar">LL</div>
                        <span>Laura Lawthorne</span>
                      </div>
                      <span className="email-pill">laura@spot.com</span>
                      <span className="phone-text">+1 (415) 888-9999</span>
                      <span className="company-badge">Spot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



          {activeTab === 'engage' && (
            <div className="engage-animated-wrapper">
              <div className="engage-animated-header">
                <h3>Multi-Channel Sequencing</h3>
                <p>Email campaigns sync seamlessly with automated LinkedIn connection requests, follow-up messages, and SMS.</p>
              </div>
              <div className="engage-svg-container">
                <svg viewBox="0 0 960 380" width="100%" style={{ display: 'block' }}>
                  <defs>
                    <pattern id="edg" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.9" fill="#d1d9e6" />
                    </pattern>
                    <filter id="egA" x="-200%" y="-200%" width="500%" height="500%">
                      <feGaussianBlur stdDeviation="4" result="b" />
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="egB" x="-300%" y="-300%" width="700%" height="700%">
                      <feGaussianBlur stdDeviation="9" result="b" />
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="hubGlow" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="12" result="b"/>
                      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    {/* Gradients */}
                    <linearGradient id="emailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                    <linearGradient id="leadsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                    <linearGradient id="crmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/>
                    </linearGradient>
                    <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1"/><stop offset="50%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#10b981"/>
                    </linearGradient>
                    <linearGradient id="liGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0a66c2"/><stop offset="100%" stopColor="#1d4ed8"/>
                    </linearGradient>
                    <linearGradient id="smsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#059669"/>
                    </linearGradient>
                    <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#6366f1"/>
                    </linearGradient>
                    {/* Motion paths */}
                    <path id="ep1" d="M 218 110 L 432 110 L 432 174" fill="none" stroke="none"/>
                    <path id="ep2" d="M 218 190 L 432 190" fill="none" stroke="none"/>
                    <path id="ep3" d="M 218 270 L 432 270 L 432 206" fill="none" stroke="none"/>
                    <path id="ep4" d="M 482 190 L 600 190 L 600 126" fill="none" stroke="none"/>
                    <path id="ep5" d="M 482 190 L 600 190 L 600 254" fill="none" stroke="none"/>
                    <path id="ep6" d="M 660 104 L 820 190" fill="none" stroke="none"/>
                    <path id="ep7" d="M 660 276 L 820 190" fill="none" stroke="none"/>
                    <path id="ep8" d="M 482 190 L 820 190" fill="none" stroke="none"/>
                  </defs>

                  {/* Background */}
                  <rect width="960" height="380" rx="14" fill="#f0f4ff"/>
                  <rect width="960" height="380" rx="14" fill="url(#edg)"/>

                  {/* BASE WIRES */}
                  <path d="M 218 110 L 432 110 L 432 174" fill="none" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 218 190 L 432 190" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 218 270 L 432 270 L 432 206" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 482 190 L 600 190 L 600 126" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 482 190 L 600 190 L 600 254" fill="none" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 660 104 L 820 190" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <path d="M 660 276 L 820 190" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <path d="M 482 190 L 820 190" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4 4"/>

                  {/* Wire connection dots */}
                  <circle cx="432" cy="110" r="4" fill="#6366f1" opacity="0.4"/>
                  <circle cx="432" cy="270" r="4" fill="#f59e0b" opacity="0.4"/>
                  <circle cx="600" cy="190" r="4" fill="#3b82f6" opacity="0.4"/>

                  {/* ANIMATED PULSES */}
                  {/* Email → Hub */}
                  <circle fill="#6366f1" filter="url(#egA)">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0s" calcMode="linear"><mpath href="#ep1"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.7s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#6366f1" filter="url(#egB)">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0s" calcMode="linear"><mpath href="#ep1"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.7s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* Leads → Hub */}
                  <circle fill="#3b82f6" filter="url(#egA)">
                    <animateMotion dur="1.7s" repeatCount="indefinite" begin="0.5s" calcMode="linear"><mpath href="#ep2"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.4s" repeatCount="indefinite" begin="0.5s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#06b6d4" filter="url(#egB)">
                    <animateMotion dur="1.7s" repeatCount="indefinite" begin="0.5s" calcMode="linear"><mpath href="#ep2"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.4s" repeatCount="indefinite" begin="0.5s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* CRM → Hub */}
                  <circle fill="#f59e0b" filter="url(#egA)">
                    <animateMotion dur="2.1s" repeatCount="indefinite" begin="1s" calcMode="linear"><mpath href="#ep3"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.75s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="4.2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#ef4444" filter="url(#egB)">
                    <animateMotion dur="2.1s" repeatCount="indefinite" begin="1s" calcMode="linear"><mpath href="#ep3"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.75s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="4.2s" repeatCount="indefinite" begin="1s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* Hub → LinkedIn */}
                  <circle fill="#0a66c2" filter="url(#egA)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.6s" calcMode="linear"><mpath href="#ep4"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.2s" repeatCount="indefinite" begin="1.6s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#0a66c2" filter="url(#egB)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="1.6s" calcMode="linear"><mpath href="#ep4"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.2s" repeatCount="indefinite" begin="1.6s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* Hub → SMS */}
                  <circle fill="#10b981" filter="url(#egA)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="2s" calcMode="linear"><mpath href="#ep5"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.2s" repeatCount="indefinite" begin="2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#059669" filter="url(#egB)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="2s" calcMode="linear"><mpath href="#ep5"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.2s" repeatCount="indefinite" begin="2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* LinkedIn → AI */}
                  <circle fill="#8b5cf6" filter="url(#egA)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" begin="2.4s" calcMode="linear"><mpath href="#ep6"/></animateMotion>
                    <animate attributeName="r" values="2.5;5;2.5" dur="0.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.9;0.9;0;0" dur="3s" repeatCount="indefinite" begin="2.4s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* SMS → AI */}
                  <circle fill="#8b5cf6" filter="url(#egA)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" begin="2.8s" calcMode="linear"><mpath href="#ep7"/></animateMotion>
                    <animate attributeName="r" values="2.5;5;2.5" dur="0.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.9;0.9;0;0" dur="3s" repeatCount="indefinite" begin="2.8s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  {/* Hub → AI direct */}
                  <circle fill="#a78bfa" filter="url(#egA)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" begin="2.2s" calcMode="linear"><mpath href="#ep8"/></animateMotion>
                    <animate attributeName="r" values="2.5;5;2.5" dur="0.8s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.9;0.9;0;0" dur="4.8s" repeatCount="indefinite" begin="2.2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#8b5cf6" filter="url(#egB)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" begin="2.2s" calcMode="linear"><mpath href="#ep8"/></animateMotion>
                    <animate attributeName="r" values="8;14;8" dur="0.8s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.18;0.18;0;0" dur="4.8s" repeatCount="indefinite" begin="2.2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>

                  {/* ══ LEFT INPUT NODES ══ */}
                  {/* Email Outbound */}
                  <rect x="18" y="82" width="200" height="56" rx="12" fill="white" stroke="#e0e7ff" strokeWidth="1.8"/>
                  <rect x="18" y="82" width="200" height="56" rx="12" fill="none" stroke="url(#emailGrad)" strokeWidth="1.8" opacity="0.5"/>
                  <rect x="30" y="94" width="32" height="32" rx="8" fill="#eef2ff"/>
                  <svg x="34" y="98" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="3" fill="#6366f1" opacity=".2"/>
                    <rect x="2" y="4" width="20" height="16" rx="3" stroke="#6366f1" strokeWidth="1.6"/>
                    <path d="M2 8l10 6 10-6" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <text x="70" y="108" fill="#1e293b" fontSize="12.5" fontFamily="Inter,sans-serif" fontWeight="700">Email Outbound</text>
                  <text x="70" y="124" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">outreach trigger</text>
                  {/* status badge */}
                  <rect x="172" y="88" width="38" height="16" rx="8" fill="#ecfdf5"/>
                  <text x="191" y="100" fill="#10b981" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">LIVE</text>

                  {/* Lead Database */}
                  <rect x="18" y="162" width="200" height="56" rx="12" fill="white" stroke="#dbeafe" strokeWidth="1.8"/>
                  <rect x="18" y="162" width="200" height="56" rx="12" fill="none" stroke="url(#leadsGrad)" strokeWidth="1.8" opacity="0.5"/>
                  <rect x="30" y="174" width="32" height="32" rx="8" fill="#eff6ff"/>
                  <svg x="34" y="178" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#3b82f6" strokeWidth="1.6"/>
                    <path d="M16.5 16.5l4 4" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <text x="70" y="188" fill="#1e293b" fontSize="12.5" fontFamily="Inter,sans-serif" fontWeight="700">Lead Database</text>
                  <text x="70" y="204" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">650M+ verified contacts</text>
                  <rect x="172" y="168" width="38" height="16" rx="8" fill="#eff6ff"/>
                  <text x="191" y="180" fill="#3b82f6" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">SYNC</text>

                  {/* Pipedrive CRM */}
                  <rect x="18" y="242" width="200" height="56" rx="12" fill="white" stroke="#fef3c7" strokeWidth="1.8"/>
                  <rect x="18" y="242" width="200" height="56" rx="12" fill="none" stroke="url(#crmGrad)" strokeWidth="1.8" opacity="0.5"/>
                  <rect x="30" y="254" width="32" height="32" rx="8" fill="#fffbeb"/>
                  <svg x="34" y="258" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="9" r="5" fill="#f59e0b" opacity=".25"/>
                    <circle cx="12" cy="9" r="5" stroke="#f59e0b" strokeWidth="1.6"/>
                    <path d="M12 14v7" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="9" r="2" fill="#f59e0b"/>
                  </svg>
                  <text x="70" y="268" fill="#1e293b" fontSize="12.5" fontFamily="Inter,sans-serif" fontWeight="700">Pipedrive CRM</text>
                  <text x="70" y="284" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">deal activity trigger</text>
                  <rect x="160" y="248" width="50" height="16" rx="8" fill="#fffbeb"/>
                  <text x="185" y="260" fill="#f59e0b" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">ACTIVE</text>

                  {/* ══ CENTER HUB — 360Airo ══ */}
                  {/* Glow ring */}
                  <circle cx="457" cy="190" r="44" fill="url(#hubGrad)" opacity="0.12" filter="url(#hubGlow)"/>
                  <circle cx="457" cy="190" r="36" fill="url(#hubGrad)" opacity="0.18"/>
                  {/* Spinning ring */}
                  <circle cx="457" cy="190" r="34" fill="none" stroke="url(#hubGrad)" strokeWidth="2.5" strokeDasharray="22 8">
                    <animateTransform attributeName="transform" type="rotate" from="0 457 190" to="360 457 190" dur="6s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="457" cy="190" r="26" fill="#0f172a"/>
                  {/* 360Airo icon */}
                  <image href="/logo-icon.png" x="439" y="172" width="36" height="36" />
                  {/* Hub label */}
                  <text x="457" y="238" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">360Airo Hub</text>

                  {/* ══ RIGHT OUTPUT NODES ══ */}
                  {/* LinkedIn */}
                  <rect x="562" y="76" width="110" height="56" rx="12" fill="#0f172a" stroke="#1d4ed8" strokeWidth="1.5"/>
                  <rect x="574" y="88" width="32" height="32" rx="8" fill="#1e3a5f"/>
                  <svg x="578" y="92" width="24" height="24" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="5" fill="#0a66c2"/>
                    <path d="M7.4 20h-3.8v-11.4h3.8v11.4zm-1.9-13c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm14.9 13h-3.8v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7h-3.8v-11.4h3.6v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.5 4.4 5.7v6z" fill="white"/>
                  </svg>
                  <text x="613" y="100" fill="#e2e8f0" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">LinkedIn</text>
                  <text x="613" y="116" fill="#64748b" fontSize="9.5" fontFamily="Inter,sans-serif">Connect + Message</text>

                  {/* SMS / Call */}
                  <rect x="562" y="248" width="110" height="56" rx="12" fill="#0f172a" stroke="#059669" strokeWidth="1.5"/>
                  <rect x="574" y="260" width="32" height="32" rx="8" fill="#064e3b"/>
                  <svg x="578" y="264" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="1" y="4" width="22" height="13" rx="4" fill="#10b981" opacity=".9"/>
                    <path d="M5 9h14M5 13h9" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M7 17l-4 4v-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <text x="613" y="272" fill="#e2e8f0" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">SMS / Call</text>
                  <text x="613" y="288" fill="#64748b" fontSize="9.5" fontFamily="Inter,sans-serif">Follow-up task</text>

                  {/* ══ FAR RIGHT: AI Reply Detection ══ */}
                  {/* glow */}
                  <circle cx="857" cy="190" r="50" fill="#8b5cf6" opacity="0.07"/>
                  <rect x="808" y="155" width="110" height="70" rx="14" fill="#0f172a" stroke="url(#aiGrad)" strokeWidth="2"/>
                  {/* spinning outer ring */}
                  <circle cx="863" cy="190" r="46" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="8 14" opacity="0.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 863 190" to="-360 863 190" dur="10s" repeatCount="indefinite"/>
                  </circle>
                  {/* icon */}
                  <svg x="820" y="163" width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="#8b5cf6" opacity=".3" stroke="#a78bfa" strokeWidth="1.2"/>
                    <line x1="12" y1="2" x2="12" y2="22" stroke="#a78bfa" strokeWidth="0.8"/>
                    <line x1="2" y1="8" x2="22" y2="16" stroke="#a78bfa" strokeWidth="0.8"/>
                    <line x1="2" y1="16" x2="22" y2="8" stroke="#a78bfa" strokeWidth="0.8"/>
                    <circle cx="12" cy="12" r="3.5" fill="#8b5cf6"/>
                    <circle cx="12" cy="12" r="1.5" fill="white"/>
                  </svg>
                  <text x="854" y="182" fill="#e2e8f0" fontSize="11.5" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">AI Reply</text>
                  <text x="854" y="196" fill="#a78bfa" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">Detection</text>
                  <text x="854" y="212" fill="#475569" fontSize="8.5" fontFamily="Inter,sans-serif" textAnchor="middle">powered by 360Airo</text>

                  {/* Wire labels */}
                  <rect x="290" y="96" width="52" height="16" rx="8" fill="white" stroke="#e0e7ff" strokeWidth="1"/>
                  <text x="316" y="108" fill="#6366f1" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">sequence</text>
                  <rect x="290" y="182" width="42" height="16" rx="8" fill="white" stroke="#dbeafe" strokeWidth="1"/>
                  <text x="311" y="194" fill="#3b82f6" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">enrich</text>
                  <rect x="290" y="257" width="38" height="16" rx="8" fill="white" stroke="#fef3c7" strokeWidth="1"/>
                  <text x="309" y="269" fill="#f59e0b" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">sync</text>
                </svg>
              </div>
            </div>
          )}

          {activeTab === 'spam' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header-premium">
                <h3>Mailbox Health & Deliverability Guard</h3>
                <p>Monitor configurations, SPF/DKIM/DMARC status, and spam score metrics automatically.</p>
              </div>
              <div className="spam-metrics-grid">
                <div className="spam-card">
                  <h4>Deliverability Score</h4>
                  <div className="spam-large-value text-green">99.4%</div>
                  <p>All configurations correct. SPF, DKIM, DMARC active.</p>
                </div>
                <div className="spam-card">
                  <h4>Bounce Rate</h4>
                  <div className="spam-large-value text-cyan">0.8%</div>
                  <p>Well below the 3.0% spam filter threshold.</p>
                </div>
                <div className="spam-card">
                  <h4>Spam Complaints</h4>
                  <div className="spam-large-value">0.0%</div>
                  <p>Excellent reputation across all sender domains.</p>
                </div>
              </div>

              <div className="warmup-chart-container">
                <div className="warmup-chart-header">
                  <h4>Email Warmup Progress (Last 7 Days)</h4>
                  <span className="warmup-status">Warming Active</span>
                </div>
                <div className="warmup-bars">
                  <div className="warmup-bar" style={{ height: '20%' }} data-val="12"></div>
                  <div className="warmup-bar" style={{ height: '35%', animationDelay: '0.1s' }} data-val="18"></div>
                  <div className="warmup-bar" style={{ height: '50%', animationDelay: '0.2s' }} data-val="25"></div>
                  <div className="warmup-bar" style={{ height: '65%', animationDelay: '0.3s' }} data-val="32"></div>
                  <div className="warmup-bar" style={{ height: '80%', animationDelay: '0.4s' }} data-val="40"></div>
                  <div className="warmup-bar" style={{ height: '90%', animationDelay: '0.5s' }} data-val="45"></div>
                  <div className="warmup-bar" style={{ height: '100%', animationDelay: '0.6s' }} data-val="50"></div>
                </div>
                <div className="warmup-days">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
