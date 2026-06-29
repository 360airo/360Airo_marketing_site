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
  const [visitedNodes, setVisitedNodes] = useState([]);
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
    setVisitedNodes([]);
    setChatMessages([
      { sender: 'agent', text: "Hello! I am AiroAgent, your outbound growth architect. How can I help you today?" },
      { sender: 'user', text: "I want to build outbound automation" },
      { sender: 'agent', text: "Brilliant outbound choice! Email outreach is a high-converting foundation. If they don't reply within 2 days, what should we do as a follow-up? Also, what if they do reply?" },
      { sender: 'user', text: "After 2 days, take follow up. If replied -> push to Pipedrive CRM. If no replies -> send LinkedIn invite with personalized note." },
      { sender: 'agent', text: "Excellent multichannel logic! Pipedrive for active leads, and a personalized LinkedIn invite to keep the outreach warm. Now, if they accept the LinkedIn connection, how should we proceed if they reply vs. if they remain silent?" },
      { sender: 'user', text: "If accepted and replied -> Msg about the mail 'I tried to reach out to you on this email, no replies'. If no reply, message them SMS." },
      { sender: 'agent', text: "A masterfully structured setup! Connecting email, Pipedrive CRM, LinkedIn, and SMS creates a highly cohesive, high-converting loop. I am ready to generate this automation campaign flowchart. Shall we launch it?" },
      { sender: 'user', text: "Launch campaign" },
      { sender: 'agent', text: "Analyzing templates, writing sequence copies, setting up Pipedrive CRM Webhooks, and drawing the automation flowchart..." }
    ]);
    setCurrentStep(4);
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
        // Path 1
        { node: 'start', delay: 300, path: ['start'] },
        { node: 'email1', delay: 1000, path: ['start', 'email1'] },
        { node: 'crm', delay: 2000, path: ['start', 'email1', 'decision1', 'crm'] },
        
        // Path 2
        { node: 'linkedin-invite', delay: 3500, path: ['start', 'email1', 'decision1', 'linkedin-invite'] },
        { node: 'linkedin-msg', delay: 4500, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'linkedin-msg'] },
        
        // Path 3 No
        { node: 'sms', delay: 6000, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] },
        
        { node: 'complete', delay: 7200, path: ['start', 'email1', 'decision1', 'linkedin-invite', 'decision2', 'sms'] }
      ];

      sequence.forEach((step) => {
        const id = window.setTimeout(() => {
          setRunningNode(step.node);
          setVisitedNodes(step.path);
          if (step.node === 'complete') {
            setCurrentStep(5);
            setChatMessages(prev => [
              ...prev,
              { sender: 'agent', text: "Outreach campaign running successfully! Sequences active, Pipedrive CRM integrated, replies and messages will stream in real time." }
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

          const getLineClass = (buildStep: number, sourceNode: string, targetNode: string) => {
    const isBuildPhase = !runningNode && currentStep <= 4;
    
    // We do NOT highlight lines during the build phase, so they don't pulse simultaneously
    
    if (!isBuildPhase) {
      if (runningNode === targetNode) return 'flow-line active';
      if (visitedNodes.includes(targetNode) && runningNode !== targetNode) return 'flow-line completed';
    }
    
    return 'flow-line';
  };

        const getNodeClass = (nodeId: string, baseClass: string, buildStep: number) => {
    let classes = [baseClass];
    if (currentStep >= buildStep) classes.push('visible');
    
    const isBuildPhase = !runningNode && currentStep <= 4;
    
    // We do NOT highlight nodes during the build phase, so they don't pulse simultaneously

    if (!isBuildPhase) {
      if (runningNode === nodeId) classes.push('running');
      if (visitedNodes.includes(nodeId) && runningNode !== nodeId) classes.push('active-completed');
    }
    
    return classes.join(' ');
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
                    <line x1="350" y1="38" x2="350" y2="62" className={getLineClass(1, 'start', 'email1')} />
                    {/* Email → Decision1 */}
                    <line x1="350" y1="135" x2="350" y2="160" className={getLineClass(2, 'email1', 'decision1')} />
                    
                    {/* Decision1 → CRM (Yes left) - Smooth Curve */}
                    <path d="M 350 195 L 350 220 Q 350 230 340 230 L 160 230 Q 150 230 150 240" className={getLineClass(2, 'decision1', 'crm')} />
                    
                    {/* Decision1 → LinkedIn (No right) - Smooth Curve */}
                    <path d="M 350 195 L 350 220 Q 350 230 360 230 L 540 230 Q 550 230 550 240" className={getLineClass(2, 'decision1', 'linkedin-invite')} />
                    
                    {/* LinkedIn → Decision2 */}
                    <line x1="550" y1="330" x2="550" y2="390" className={getLineClass(3, 'linkedin-invite', 'decision2')} />
                    
                    {/* Decision2 → LinkedIn Msg (Yes left) - Smooth Curve */}
                    <path d="M 550 425 L 550 450 Q 550 460 540 460 L 360 460 Q 350 460 350 470" className={getLineClass(3, 'decision2', 'linkedin-msg')} />
                    
                    {/* Decision2 → SMS (No right) - Smooth Curve */}
                    <path d="M 550 425 L 550 450 Q 550 460 560 460 L 640 460 Q 650 460 650 470" className={getLineClass(3, 'decision2', 'sms')} />
                  </svg>

                  {/* Flowchart Nodes */}
                  <div className="flow-nodes">

                    {/* Node 1: Start */}
                    <div className="flow-node node-start" style={{ top: '1.9%', left: '50%', transform: 'translateX(-50%)' }}>
                      Start
                    </div>

                    {/* Node 2: Email 1 */}
                    <div className={getNodeClass('email1', 'flow-node node-action', 1)}
                      style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: 200 }}>
                      <div className="node-meta">Send immediately</div>
                      <div className="node-title">
                        Email 1 – Send outreach
                      </div>
                    </div>

                    {/* Node 3: Decision 1 (Replied?) */}
                    <div className={getNodeClass('decision1', 'flow-node node-decision', 2)}
                      style={{ top: '25.8%', left: '50%', transform: 'translateX(-50%)', width: 180 }}>
                      <span style={{ fontSize: '0.8rem' }}>⏱</span> Replied in 2 days?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* LEFT BRANCH (Yes) — Node 4: Pipedrive CRM */}
                    <div className={getNodeClass('crm', 'flow-node node-action', 2)}
                      style={{ top: '38.7%', left: '21.4%', transform: 'translateX(-50%)', width: 190 }}>
                      <div className="node-meta">Action on Reply</div>
                      <div className="node-title">
                        Push to Pipedrive CRM
                      </div>
                    </div>

                    {/* RIGHT BRANCH (No) — Node 5: LinkedIn Invite */}
                    <div className={getNodeClass('linkedin-invite', 'flow-node node-action', 2)}
                      style={{ top: '38.7%', left: '78.5%', transform: 'translateX(-50%)', width: 190 }}>
                      <div className="node-meta">Action if No Reply</div>
                      <div className="node-title">
                        LinkedIn invite (personalized)
                      </div>
                    </div>

                                        {/* Node 6: Decision 2 (Accepted & Replied?) */}
                    <div className={getNodeClass('decision2', 'flow-node node-decision', 3)}
                      style={{ top: '62.9%', left: '78.5%', transform: 'translateX(-50%)', width: 190 }}>
                      <span style={{ fontSize: '0.8rem' }}>🔗</span> Accepted &amp; Replied?
                      <div className="dec-yes">Yes</div>
                      <div className="dec-no">No</div>
                    </div>

                    {/* Node 7: LinkedIn Message (Yes) */}
                    <div className={getNodeClass('linkedin-msg', 'flow-node node-action', 3)}
                      style={{ top: '75.8%', left: '50%', transform: 'translateX(-50%)', width: 210 }}>
                      <div className="node-meta">Reach out re: email</div>
                      <div className="node-title">
                        Msg: "I tried to reach out..."
                      </div>
                    </div>

                    {/* Node 8: SMS (No) */}
                    <div className={getNodeClass('sms', 'flow-node node-action', 3)}
                      style={{ top: '75.8%', left: '88.5%', transform: 'translateX(-50%)', width: 130 }}>
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
