// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';
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
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.15 } // trigger when 15% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

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
          🔍 Find & enrich leads
        </button>
        <button 
          className={`ab-tab ${activeTab === 'intent' ? 'active' : ''}`} 
          onClick={() => setActiveTab('intent')}
        >
          🎯 Spot buying intent
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
            <span className="ab-logo-icon">🤖</span>
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
                  <span className="agent-avatar">🤖</span>
                  <div>
                    <h4>AiroAgent</h4>
                    <span className="status-online">Online</span>
                  </div>
                </div>

                <div className="chat-messages-container" ref={messagesContainerRef}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'agent-msg'}`}>
                      {msg.sender === 'agent' && <span className="msg-avatar">🤖</span>}
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
                  <svg className="flow-svg-lines" viewBox="0 0 600 500">
                    {/* Main Trunk Connectors */}
                    <line x1="300" y1="40" x2="300" y2="70" className={`flow-line ${runningNode ? 'active' : ''}`} />
                    <line x1="300" y1="110" x2="300" y2="140" className={`flow-line ${runningNode === 'email1' || runningNode === 'decision1' || runningNode === 'crm' || runningNode === 'linkedin-invite' || runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />
                    
                    {/* Decision 1 Split Connectors */}
                    <path d="M 300 180 L 140 180 L 140 220" className={`flow-line ${runningNode === 'crm' ? 'active' : ''}`} />
                    <path d="M 300 180 L 460 180 L 460 220" className={`flow-line ${runningNode === 'linkedin-invite' || runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />

                    {/* LinkedIn Invite to Decision 2 Connector */}
                    <line x1="460" y1="270" x2="460" y2="300" className={`flow-line ${runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' ? 'active' : ''}`} />
                    
                    {/* Decision 2 Split Connectors */}
                    <path d="M 460 350 L 310 350 L 310 380" className={`flow-line ${runningNode === 'linkedin-msg' ? 'active' : ''}`} />
                    <path d="M 460 350 L 520 350 L 520 380" className={`flow-line ${runningNode === 'sms' ? 'active' : ''}`} />
                  </svg>

                  {/* Flowchart Nodes */}
                  <div className="flow-nodes">
                    
                    {/* Node 1: Start */}
                    <div className="flow-node node-start" style={{ top: 15, left: '50%', transform: 'translateX(-50%)' }}>
                      Start
                    </div>

                    {/* Node 2: Email 1 */}
                    <div className={`flow-node node-action ${currentStep >= 1 ? 'visible' : ''} ${runningNode === 'email1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== null)) ? 'active-completed' : ''}`} style={{ top: 70, left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="node-meta">Send immediately</div>
                      <div className="node-title">📧 Email 1 - Send outreach</div>
                    </div>

                    {/* Node 3: Decision 1 (Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'decision1' ? 'running' : ''} ${(currentStep === 5 || (runningNode !== 'start' && runningNode !== 'email1' && runningNode !== 'decision1' && runningNode !== null)) ? 'active-completed' : ''}`} style={{ top: 140, left: '50%', transform: 'translateX(-50%)' }}>
                      ❓ Replied in 2 days?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* LEFT BRANCH (Yes) */}
                    {/* Node 4: Push to Pipedrive CRM */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'crm' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'crm' ? 'active-completed' : ''}`} style={{ top: 220, left: '40px', width: '180px' }}>
                      <div className="node-meta">Action on Reply</div>
                      <div className="node-title">💼 Push to Pipedrive CRM</div>
                    </div>

                    {/* RIGHT BRANCH (No) */}
                    {/* Node 5: LinkedIn Invitation */}
                    <div className={`flow-node node-action ${currentStep >= 2 ? 'visible' : ''} ${runningNode === 'linkedin-invite' ? 'running' : ''} ${(runningNode === 'decision2' || runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'linkedin-invite' ? 'active-completed' : ''}`} style={{ top: 220, right: '40px', width: '180px' }}>
                      <div className="node-meta">Action if No Reply</div>
                      <div className="node-title">🤝 Send LinkedIn invite (personalized)</div>
                    </div>

                    {/* Node 6: Decision 2 (Accepted & Replied?) */}
                    <div className={`flow-node node-decision ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'decision2' ? 'running' : ''} ${(runningNode === 'linkedin-msg' || runningNode === 'sms' || currentStep === 5) && runningNode !== 'decision2' ? 'active-completed' : ''}`} style={{ top: 300, right: '40px', width: '180px' }}>
                      ❓ Accepted & Replied?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'linkedin-msg' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'linkedin-msg' ? 'active-completed' : ''}`} style={{ top: 380, left: '220px', width: '180px' }}>
                      <div className="node-meta">Reach out re: email</div>
                      <div className="node-title">💬 Msg: "I tried to reach out..."</div>
                    </div>

                    {/* Node 8: SMS (No) */}
                    <div className={`flow-node node-action ${currentStep >= 3 ? 'visible' : ''} ${runningNode === 'sms' ? 'running' : ''} ${(runningNode === 'complete' || currentStep === 5) && runningNode !== 'sms' ? 'active-completed' : ''}`} style={{ top: 380, right: '20px', width: '120px' }}>
                      <div className="node-meta">SMS Follow-up</div>
                      <div className="node-title">📱 Send SMS</div>
                    </div>

                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'leads' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header">
                <h3>Lead Database Explorer</h3>
                <p>Filter through 650M+ prospects with absolute precision.</p>
              </div>
              <div className="mock-leads-grid">
                <div className="mock-filter-sidebar">
                  <div className="filter-group">
                    <label>Job Title</label>
                    <div className="filter-chip">CFO</div>
                    <div className="filter-chip">VP Finance</div>
                  </div>
                  <div className="filter-group">
                    <label>Industry</label>
                    <div className="filter-chip">SaaS</div>
                    <div className="filter-chip">B2B Software</div>
                  </div>
                </div>
                <div className="mock-leads-table">
                  <div className="table-row header">
                    <span>Full name</span>
                    <span>Email</span>
                    <span>Phone</span>
                    <span>Company</span>
                  </div>
                  <div className="table-row">
                    <span>Tyler Grayson</span>
                    <span className="pill-blue">tyler@procol.io</span>
                    <span className="pill-gray">+1 (512) 345-6789</span>
                    <span>Procol</span>
                  </div>
                  <div className="table-row">
                    <span>Matteo Ricciard</span>
                    <span className="pill-blue">matteo@helium.co</span>
                    <span className="pill-gray">+33 6 12 34 56 78</span>
                    <span>Helium</span>
                  </div>
                  <div className="table-row">
                    <span>Laura Lawthorne</span>
                    <span className="pill-blue">laura@spot.com</span>
                    <span className="pill-gray">+1 (415) 888-9999</span>
                    <span>Spot</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intent' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header">
                <h3>Buying Intent Signals Stream</h3>
                <p>Real-time notifications of prospect activities triggers immediate outreach workflows.</p>
              </div>
              <div className="signals-stream">
                <div className="sig-item">
                  <span className="sig-icon sig-green">🚀</span>
                  <div className="sig-info">
                    <h4>Acme Corp just raised Series B funding</h4>
                    <span>1 min ago</span>
                  </div>
                  <span className="sig-action">Triggered Sequence 1</span>
                </div>
                <div className="sig-item">
                  <span className="sig-icon sig-blue">💼</span>
                  <div className="sig-info">
                    <h4>Sarah Chen changed job to VP Finance at Stark Labs</h4>
                    <span>12 min ago</span>
                  </div>
                  <span className="sig-action">Enriched Contact</span>
                </div>
                <div className="sig-item">
                  <span className="sig-icon sig-purple">👀</span>
                  <div className="sig-info">
                    <h4>Dave Allison visited pricing page 3 times</h4>
                    <span>28 min ago</span>
                  </div>
                  <span className="sig-action">Scheduled Call task</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engage' && (
            <div className="tab-mock-content text-center py-5">
              <h3>Multi-Channel Sequencing</h3>
              <p>Email campaigns sync seamlessly with automated LinkedIn connection requests, follow-up messages, and SMS.</p>
              <div className="engage-visual-flow">
                <div className="ev-step">📧 Email Outbound</div>
                <div className="ev-arrow">➔</div>
                <div className="ev-step">🤝 LinkedIn Connect</div>
                <div className="ev-arrow">➔</div>
                <div className="ev-step">📞 Call / SMS Task</div>
              </div>
            </div>
          )}

          {activeTab === 'spam' && (
            <div className="tab-mock-content">
              <div className="mock-leads-header">
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
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
