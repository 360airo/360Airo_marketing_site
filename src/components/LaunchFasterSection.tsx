// @ts-nocheck
"use client";
import React from 'react';
import '../styles/LaunchFasterSection.css';

export default function LaunchFasterSection() {
  return (
    <div className="launch-section-wrapper">
      <section className="launch-faster-section">
        <div className="launch-faster-container">
        
        {/* TOP AREA */}
        <div className="launch-faster-top">
          
          {/* Left Column Content */}
          <div className="launch-faster-content">
            <h2>
              Launch faster with<br />
              <span>production-ready UI blocks.</span>
            </h2>
            <p>
              Ship polished landing pages in hours. Pick a block, customize it,
              and move from idea to launch without rebuilding layout primitives.
            </p>
            <button className="cta-button-blue">
              Get all CTA blocks <span>→</span>
            </button>
          </div>

          {/* Right Column Grid - Product UI Mockups */}
          <div className="ui-preview-grid">
            
            {/* Card 1: Mini Dashboard */}
            <div className="ui-card card-dashboard">
              <div className="ui-dash-header">
                <div className="dash-tabs">
                  <span className="active"></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="ui-dash-body">
                <div className="dash-row"><div className="dash-dot"></div><div className="dash-line long"></div></div>
                <div className="dash-row"><div className="dash-dot"></div><div className="dash-line medium"></div></div>
                <div className="dash-row"><div className="dash-dot"></div><div className="dash-line short"></div></div>
                <div className="dash-row"><div className="dash-dot"></div><div className="dash-line long"></div></div>
              </div>
            </div>

            {/* Card 2: Feature Cards */}
            <div className="ui-card card-features">
              <div className="feat-header"></div>
              <div className="feat-boxes">
                <div className="feat-box"></div>
                <div className="feat-box active-box">
                  <div className="feat-icon"></div>
                  <div className="feat-line"></div>
                </div>
                <div className="feat-box"></div>
              </div>
            </div>

            {/* Card 3: Gradient Signup */}
            <div className="ui-card card-signup">
              <div className="signup-gradient-panel">
                <div className="sg-icon"></div>
                <div className="sg-text"></div>
              </div>
              <div className="signup-form-panel">
                <div className="sf-line title"></div>
                <div className="sf-input"></div>
                <div className="sf-input"></div>
                <div className="sf-button"></div>
              </div>
            </div>

            {/* Card 4: Chat Conversation */}
            <div className="ui-card card-chat">
              <div className="chat-msg left">
                <div className="chat-avatar a1"></div>
                <div className="chat-bubble">Hey! Are you free for a quick call?</div>
              </div>
              <div className="chat-msg right">
                <div className="chat-bubble reply">Sure, give me 5 minutes!</div>
                <div className="chat-avatar a2"></div>
              </div>
              <div className="chat-msg left">
                <div className="chat-avatar a1"></div>
                <div className="chat-bubble">Sounds good ✨</div>
              </div>
              <div className="chat-msg right">
                <div className="chat-bubble reply faded">I'm not sure if I can make it.</div>
                <div className="chat-avatar a2"></div>
              </div>
            </div>

            {/* Card 5: Workflow Automation */}
            <div className="ui-card card-workflow">
              <div className="wf-node n1"></div>
              <svg className="wf-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 20 50 L 50 20 L 80 50 L 50 80 Z" fill="none" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="4 2"/>
              </svg>
              <div className="wf-node n2"></div>
              <div className="wf-node n3"></div>
              <div className="wf-node n4"></div>
              <div className="wf-panel">
                <div className="wf-line"></div>
                <div className="wf-toggle"></div>
              </div>
            </div>

            {/* Card 6: Global Coverage */}
            <div className="ui-card card-global">
              <div className="global-text">
                <h4>All over the world</h4>
                <p>Meet our distributed team of experts working across 6 continents.</p>
              </div>
              <div className="global-globe">
                <div className="globe-accent-dot"></div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM CENTER AREA */}
        <div className="launch-faster-bottom">
          <h3>
            Build the front end your<br />
            <span>team will actually ship.</span>
          </h3>
          <p>
            Drop in blocks, tune copy, and keep momentum. No wrestling with
            layout primitives every time you need a new section.
          </p>
        </div>

      </div>
    </section>
    </div>
  );
}
