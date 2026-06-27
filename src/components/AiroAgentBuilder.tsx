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

  const getLineClass = (buildStep: number, sourceNode: string, beforeNodes: string[]) => {
    const isBuild = !runningNode;
    const isActive = (isBuild && currentStep === buildStep) || runningNode === sourceNode;
    const isCompleted = (isBuild && currentStep > buildStep) || (runningNode && !beforeNodes.includes(runningNode));
    
    if (isActive) return 'flow-line active';
    if (isCompleted) return 'flow-line completed';
    return 'flow-line';
  };

  return (
    <div className="agent-builder-section-wrapper" ref={sectionRef} style={{ backgroundColor: '#fdfdfe' }}>
      <div className="agent-builder-section">
        <div className="agent-builder-header">
          <h2>Build the outbound campaigns <br /><span>your team actually needs</span></h2>
          <p>Drop in criteria, let Airo Agent write sequences, and preview automation charts in real time.</p>
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
                  <svg className="flow-svg-lines" viewBox="0 0 700 620" preserveAspectRatio="none">
                    {/* Start → Email */}
                    <line x1="350" y1="38" x2="350" y2="62" className={getLineClass(1, 'start', ['start'])} />
                    {/* Email → Decision1 */}
                    <line x1="350" y1="135" x2="350" y2="160" className={getLineClass(2, 'email1', ['start', 'email1'])} />
                    {/* Decision1 → CRM (Yes left) */}
                    <path d="M 350 195 L 350 230 L 150 230 L 150 240" className={getLineClass(2, 'decision1', ['start', 'email1', 'decision1'])} />
                    {/* Decision1 → LinkedIn (No right) */}
                    <path d="M 350 195 L 350 230 L 550 230 L 550 240" className={getLineClass(2, 'decision1', ['start', 'email1', 'decision1'])} />
                    {/* LinkedIn → Decision2 */}
                    <line x1="550" y1="330" x2="550" y2="390" className={getLineClass(3, 'linkedin-invite', ['start', 'email1', 'decision1', 'crm', 'linkedin-invite'])} />
                    {/* Decision2 → LinkedIn Msg (Yes left) */}
                    <path d="M 550 425 L 550 460 L 350 460 L 350 470" className={getLineClass(3, 'decision2', ['start', 'email1', 'decision1', 'crm', 'linkedin-invite', 'decision2'])} />
                    {/* Decision2 → SMS (No right) */}
                    <path d="M 550 425 L 550 460 L 650 460 L 650 470" className={getLineClass(3, 'decision2', ['start', 'email1', 'decision1', 'crm', 'linkedin-invite', 'decision2'])} />
                  </svg>

                  {/* Flowchart Nodes */}
                  <div className="flow-nodes">

                    {/* Node 1: Start */}
                    <div className="flow-node node-start" style={{ top: '1.9%', left: '50%', transform: 'translateX(-50%)' }}>
                      Start
                    </div>

                    {/* Node 2: Email 1 */}
                    <div className={`flow-node node-action ${currentStep >= 1 ? 'visible' : ''} ${runningNode === 'email1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== null)) ? 'active-completed' : ''}`}
                      style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: 200 }}>
                      <div className="node-meta">Send immediately</div>
                      <div className="node-title">
                        Email 1 – Send outreach
                      </div>
                    </div>

                    {/* Node 3: Decision 1 (Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'decision1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== 'decision1' && runningNode !== null)) ? 'active-completed' : ''}`}
                      style={{ top: '25.8%', left: '50%', transform: 'translateX(-50%)', width: 180 }}>
                      <span style={{ fontSize: '0.8rem' }}>⏱</span> Replied in 2 days?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* LEFT BRANCH (Yes) — Node 4: Pipedrive CRM */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'crm' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'crm' ? 'active-completed' : ''}`}
                      style={{ top: '38.7%', left: '21.4%', transform: 'translateX(-50%)', width: 190 }}>
                      <div className="node-meta">Action on Reply</div>
                      <div className="node-title">
                        Push to Pipedrive CRM
                      </div>
                    </div>

                    {/* RIGHT BRANCH (No) — Node 5: LinkedIn Invite */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'linkedin-invite' ? 'running' : ''} ${(runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'linkedin-invite' ? 'active-completed' : ''}`}
                      style={{ top: '38.7%', left: '78.5%', transform: 'translateX(-50%)', width: 190 }}>
                      <div className="node-meta">Action if No Reply</div>
                      <div className="node-title">
                        LinkedIn invite (personalized)
                      </div>
                    </div>

                    {/* Node 6: Decision 2 (Accepted & Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'decision2' ? 'running' : ''} ${(runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'decision2' ? 'active-completed' : ''}`}
                      style={{ top: '62.9%', left: '78.5%', transform: 'translateX(-50%)', width: 190 }}>
                      <span style={{ fontSize: '0.8rem' }}>🔗</span> Accepted &amp; Replied?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'linkedin-msg' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'linkedin-msg' ? 'active-completed' : ''}`}
                      style={{ top: '75.8%', left: '50%', transform: 'translateX(-50%)', width: 210 }}>
                      <div className="node-meta">Reach out re: email</div>
                      <div className="node-title">
                        Msg: "I tried to reach out..."
                      </div>
                    </div>

                    {/* Node 8: SMS (No) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'sms' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'sms' ? 'active-completed' : ''}`}
                      style={{ top: '75.8%', left: '92.8%', transform: 'translateX(-50%)', width: 170 }}>
                      <div className="node-meta">SMS Follow-up</div>
                      <div className="node-title">
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
                                                                                <path id="ep1" d="M 218 110 L 400 110 L 400 190 L 430 190" fill="none" stroke="none"/>
                    <path id="ep2" d="M 218 190 L 430 190" fill="none" stroke="none"/>
                    <path id="ep3" d="M 218 270 L 400 270 L 400 190 L 430 190" fill="none" stroke="none"/>
                    <path id="ep4" d="M 430 190 L 525 190 L 525 104 L 620 104" fill="none" stroke="none"/>
                    <path id="ep5" d="M 765 104 L 782 104 L 782 190 L 800 190" fill="none" stroke="none"/>
                    <path id="ep6" d="M 430 190 L 525 190 L 525 276 L 620 276" fill="none" stroke="none"/>
                    <path id="ep7" d="M 765 276 L 782 276 L 782 190 L 800 190" fill="none" stroke="none"/>
                  </defs>

                  {/* Background */}
                  <rect width="960" height="380" rx="14" fill="#f0f4ff"/>
                  <rect width="960" height="380" rx="14" fill="url(#edg)"/>

                                                                        {/* BASE WIRES */}
                  <path d="M 218 110 L 400 110 L 400 190" fill="none" stroke="#c7d2fe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 218 190 L 400 190" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 218 270 L 400 270 L 400 190" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 400 190 L 430 190" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 430 190 L 525 190 L 525 104 L 620 104" fill="none" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 765 104 L 782 104 L 782 190 L 800 190" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 430 190 L 525 190 L 525 276 L 620 276" fill="none" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="6 4"/>
                  <path d="M 765 276 L 782 276 L 782 190 L 800 190" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 4"/>

                  {/* Wire connection dots */}
                  <circle cx="400" cy="110" r="4" fill="#6366f1" opacity="0.4"/>
                  <circle cx="400" cy="270" r="4" fill="#f59e0b" opacity="0.4"/>
                  <circle cx="400" cy="190" r="5" fill="#94a3b8" opacity="0.8"/>
                  <circle cx="525" cy="190" r="5" fill="#94a3b8" opacity="0.8"/>
                  <circle cx="782" cy="190" r="5" fill="#8b5cf6" opacity="0.8"/>

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
                  
                  {/* LinkedIn → Book Meeting */}
                  <circle fill="#8b5cf6" filter="url(#egA)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="3.2s" calcMode="linear"><mpath href="#ep5"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.2s" repeatCount="indefinite" begin="3.2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#8b5cf6" filter="url(#egB)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="3.2s" calcMode="linear"><mpath href="#ep5"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.2s" repeatCount="indefinite" begin="3.2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  
                  {/* Hub → SMS */}
                  <circle fill="#10b981" filter="url(#egA)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="2s" calcMode="linear"><mpath href="#ep6"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.2s" repeatCount="indefinite" begin="2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#059669" filter="url(#egB)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="2s" calcMode="linear"><mpath href="#ep6"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.2s" repeatCount="indefinite" begin="2s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  
                  {/* SMS → Book Meeting */}
                  <circle fill="#8b5cf6" filter="url(#egA)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="3.6s" calcMode="linear"><mpath href="#ep7"/></animateMotion>
                    <animate attributeName="r" values="3;6;3" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;1;1;0;0" dur="3.2s" repeatCount="indefinite" begin="3.6s" keyTimes="0;0.05;0.5;0.55;1"/>
                  </circle>
                  <circle fill="#8b5cf6" filter="url(#egB)">
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="3.6s" calcMode="linear"><mpath href="#ep7"/></animateMotion>
                    <animate attributeName="r" values="8;16;8" dur="0.55s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0;0.22;0.22;0;0" dur="3.2s" repeatCount="indefinite" begin="3.6s" keyTimes="0;0.05;0.5;0.55;1"/>
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
                  <circle cx="430" cy="190" r="44" fill="url(#hubGrad)" opacity="0.12" filter="url(#hubGlow)"/>
                  <circle cx="430" cy="190" r="36" fill="url(#hubGrad)" opacity="0.18"/>
                  {/* Spinning ring */}
                  <circle cx="430" cy="190" r="34" fill="none" stroke="url(#hubGrad)" strokeWidth="2.5" strokeDasharray="22 8">
                    <animateTransform attributeName="transform" type="rotate" from="0 430 190" to="360 430 190" dur="6s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="430" cy="190" r="26" fill="#0f172a"/>
                  {/* 360Airo icon */}
                  <image href="/logo-icon.png" x="412" y="172" width="36" height="36" />
                  {/* Hub label */}
                  <text x="430" y="238" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">360Airo Hub</text>

                                                      {/* ══ RIGHT OUTPUT NODES ══ */}
                  {/* LinkedIn */}
                  <rect x="620" y="76" width="145" height="56" rx="12" fill="#ffffff" stroke="#1d4ed8" strokeWidth="1.5"/>
                  <rect x="632" y="88" width="32" height="32" rx="8" fill="#1e3a5f"/>
                  <svg x="636" y="92" width="24" height="24" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="5" fill="#0a66c2"/>
                    <path d="M7.4 20h-3.8v-11.4h3.8v11.4zm-1.9-13c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm14.9 13h-3.8v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7h-3.8v-11.4h3.6v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.5 4.4 5.7v6z" fill="white"/>
                  </svg>
                  <text x="671" y="100" fill="#0f172a" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">LinkedIn</text>
                  <text x="671" y="116" fill="#64748b" fontSize="9.5" fontFamily="Inter,sans-serif">Connect + Message</text>

                  {/* Book Meeting */}
                  <rect x="800" y="162" width="145" height="56" rx="12" fill="#ffffff" stroke="#8b5cf6" strokeWidth="1.5"/>
                  <rect x="812" y="174" width="32" height="32" rx="8" fill="#4c1d95"/>
                  <svg x="816" y="178" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
                  </svg>
                  <text x="851" y="186" fill="#0f172a" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">Book Meeting</text>
                  <text x="851" y="202" fill="#64748b" fontSize="9.5" fontFamily="Inter,sans-serif">Auto-scheduler</text>

                  {/* SMS / Call */}
                  <rect x="620" y="248" width="145" height="56" rx="12" fill="#ffffff" stroke="#059669" strokeWidth="1.5"/>
                  <rect x="632" y="260" width="32" height="32" rx="8" fill="#064e3b"/>
                  <svg x="636" y="264" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="1" y="4" width="22" height="13" rx="4" fill="#10b981" opacity=".9"/>
                    <path d="M5 9h14M5 13h9" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M7 17l-4 4v-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <text x="671" y="272" fill="#0f172a" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">SMS / Call</text>
                  <text x="671" y="288" fill="#64748b" fontSize="9.5" fontFamily="Inter,sans-serif">Follow-up task</text>

                  {/* Wire labels */}
                  <rect x="320" y="96" width="52" height="16" rx="8" fill="white" stroke="#e0e7ff" strokeWidth="1"/>
                  <text x="346" y="108" fill="#6366f1" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">sequence</text>
                  <rect x="320" y="182" width="42" height="16" rx="8" fill="white" stroke="#dbeafe" strokeWidth="1"/>
                  <text x="341" y="194" fill="#3b82f6" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">enrich</text>
                  <rect x="320" y="257" width="38" height="16" rx="8" fill="white" stroke="#fef3c7" strokeWidth="1"/>
                  <text x="339" y="269" fill="#f59e0b" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="600" textAnchor="middle">sync</text>
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
