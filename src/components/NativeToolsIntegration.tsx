// @ts-nocheck
"use client";
import React from 'react';
import '../styles/NativeToolsIntegration.css';

export default function NativeToolsIntegration() {
  return (
    <section className="native-tools-wrapper" id="section-native-tools">
      <div className="native-tools-container">
        <div className="native-tools-card">
          {/* Section Header */}
          <div className="native-tools-header">
            <div className="native-tools-title-row">
              <span className="native-tools-sparkle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
              </span>
              <h3 className="native-tools-title">Native Tools Integration</h3>
            </div>
            <p className="native-tools-desc">
              Track real-time activity of agents with detailed records of triggers, tools used, outcomes, and timestamps.
            </p>
          </div>

          {/* Workflow Canvas */}
          <div className="native-tools-canvas">
            <div className="canvas-dot-grid" aria-hidden="true" />

            <div className="flow-diagram-stage">
              {/* SVG Connecting Lines Layer */}
              <svg className="flow-svg-layer" viewBox="0 0 960 320" fill="none">
                <defs>
                  {/* Top Orange/Red Gradient */}
                  <linearGradient id="gradOrangeRed" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)"/>
                    <stop offset="50%" stopColor="#f87171"/>
                    <stop offset="100%" stopColor="#ef4444"/>
                  </linearGradient>

                  {/* Middle Blue Gradient */}
                  <linearGradient id="gradBlueLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)"/>
                    <stop offset="60%" stopColor="#38bdf8"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>

                  {/* Bottom Amber/Yellow Gradient */}
                  <linearGradient id="gradYellowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)"/>
                    <stop offset="60%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                </defs>

                {/* Left 3 Trigger Lines entering center Hub */}
                {/* 1. Meeting Summarizer (Top -> down into hub top) */}
                <path 
                  d="M 215 90 L 460 90 L 460 130" 
                  stroke="url(#gradOrangeRed)" 
                  strokeWidth="1.5" 
                  className="animated-flow-line"
                />
                
                {/* 2. Code Reviewer (Middle -> direct into hub left) */}
                <path 
                  d="M 185 160 L 430 160" 
                  stroke="url(#gradBlueLine)" 
                  strokeWidth="1.5" 
                  className="animated-flow-line"
                />

                {/* 3. Customer Support (Bottom -> up into hub bottom) */}
                <path 
                  d="M 205 230 L 460 230 L 460 190" 
                  stroke="url(#gradYellowLine)" 
                  strokeWidth="1.5" 
                  className="animated-flow-line"
                />

                {/* Hub -> Connected Pill Line */}
                <line x1="490" y1="160" x2="640" y2="160" stroke="#2563eb" strokeWidth="1.5"/>

                {/* Vertical Line Up to Notion */}
                <line x1="675" y1="144" x2="675" y2="102" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Vertical Line Down to Linear */}
                <line x1="675" y1="176" x2="675" y2="218" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Horizontal Line from Connected to Slack */}
                <line x1="710" y1="160" x2="770" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Vertical Line Up from Slack to Lightning Bolt */}
                <line x1="792" y1="138" x2="792" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                {/* Horizontal Line from Slack to OpenAI */}
                <line x1="814" y1="160" x2="870" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              </svg>

              {/* Left Trigger Items (Clean text + icons, no bulky cards) */}
              <div className="flow-left-triggers">
                {/* Meeting Summarizer */}
                <div className="flow-trigger-item trigger-item-top">
                  <svg className="flow-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="14" rx="2"/>
                    <line x1="8" y1="9" x2="10" y2="9"/>
                  </svg>
                  <span>Meeting Summarizer</span>
                </div>

                {/* Code Reviewer */}
                <div className="flow-trigger-item trigger-item-mid">
                  <svg className="flow-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="8 7 3 12 8 17"/>
                    <polyline points="16 7 21 12 16 17"/>
                  </svg>
                  <span>Code Reviewer</span>
                </div>

                {/* Customer Support */}
                <div className="flow-trigger-item trigger-item-bot">
                  <svg className="flow-trigger-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Customer Support</span>
                </div>
              </div>

              {/* Center Hub Node */}
              <div className="flow-center-hub">
                <div className="hub-box">
                  <div className="hub-cubes-mark">
                    <div className="hub-dot hub-dot-1" />
                    <div className="hub-dot hub-dot-2" />
                  </div>
                </div>
              </div>

              {/* Connected Blue Pill */}
              <div className="flow-connected-pill">
                Connected
              </div>

              {/* Right Integrations Network Nodes */}
              <div className="flow-right-network">
                {/* 1. Notion Node (Top) */}
                <div className="network-node node-notion" title="Notion">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.435-.654c1.12-.093 1.307-.466 1.027-.933L17.79 1.41C17.324.757 16.67.477 15.643.57L3.619 1.41c-.933.093-1.12.56-.746 1.027l1.586 1.77zm.933 3.92v13.626c0 .84.467 1.213 1.4 1.12l13.116-.747c.933-.093 1.12-.653 1.12-1.493V7.008c0-.746-.373-1.12-1.12-1.027L5.86 6.915c-.933.093-.467.466-.467 1.213zm12.32 1.493c.093.467 0 .933-.467 1.027l-.746.186v8.494l1.213.653c.467.28.653.654.467 1.12l-2.613.187-3.92-5.787v4.667l1.027.467c.373.186.467.56.373.933l-2.613.187-.84-.187v-9.333l-.84-.28c-.373-.187-.467-.56-.373-.933l2.8-.187 4.107 6.067V10.09l-.933-.466c-.374-.187-.374-.654-.094-.934l2.427-.186z"/>
                  </svg>
                </div>

                {/* 2. Linear Node (Bottom) */}
                <div className="network-node node-linear" title="Linear">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="1.8"/>
                    <line x1="6" y1="15" x2="15" y2="6" stroke="#ffffff" strokeWidth="1.5"/>
                    <line x1="8" y1="17" x2="17" y2="8" stroke="#ffffff" strokeWidth="1.5"/>
                    <line x1="10" y1="19" x2="19" y2="10" stroke="#ffffff" strokeWidth="1.5"/>
                  </svg>
                </div>

                {/* 3. Slack Node (Middle) */}
                <div className="network-node node-slack" title="Slack">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523 2.52 2.52 0 0 1 2.52-2.52h2.52v2.52c0 1.394-1.126 2.523-2.52 2.523z"/>
                    <path fill="#E01E5A" d="M6.313 15.165a2.528 2.528 0 0 1 2.521-2.523 2.52 2.52 0 0 1 2.52 2.523v6.313A2.52 2.52 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
                    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.52 2.52 0 0 1 8.834 0h2.52v2.522c0 1.393-1.126 2.52-2.52 2.52z"/>
                    <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.52 2.521 2.52 2.52 0 0 1-2.52 2.52H2.522A2.52 2.52 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                    <path fill="#2EB67D" d="M18.958 8.834a2.528 2.528 0 0 1 2.522 2.521 2.52 2.52 0 0 1-2.522 2.52h-2.52V11.355c0-1.393 1.127-2.521 2.52-2.521z"/>
                    <path fill="#2EB67D" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.52 2.52 0 0 1-2.52-2.521V2.522A2.52 2.52 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
                    <path fill="#ECB22E" d="M15.165 18.958a2.528 2.528 0 0 1 2.523 2.522 2.52 2.52 0 0 1-2.523 2.52h-2.52v-2.52c0-1.395 1.127-2.522 2.52-2.522z"/>
                    <path fill="#ECB22E" d="M15.165 17.688a2.528 2.528 0 0 1-2.52-2.523 2.52 2.52 0 0 1 2.52-2.52h6.313A2.52 2.52 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                </div>

                {/* 4. Lightning Bolt Node (Top-Right above Slack) */}
                <div className="network-node node-bolt" title="Fast Trigger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>

                {/* 5. OpenAI Node (Far-Right of Slack) */}
                <div className="network-node node-openai" title="OpenAI">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-8.66-4.666a4.477 4.477 0 0 1-.533-3.008l.142.083 4.78 2.758a.791.791 0 0 0 .78 0l5.834-3.369v2.335a.08.08 0 0 1-.033.065l-4.839 2.793a4.506 4.506 0 0 1-6.131-1.657zm-1.074-9.363c.306-1.025.99-1.9 1.943-2.476l-.001.164v5.516a.79.79 0 0 0 .389.682l5.834 3.369-2.02 1.168a.078.078 0 0 1-.071 0l-4.839-2.793a4.508 4.508 0 0 1-1.235-5.63zm14.507 3.633l-5.834-3.369 2.02-1.168a.078.078 0 0 1 .071 0l4.839 2.793a4.508 4.508 0 0 1-.708 8.113v-5.688a.79.79 0 0 0-.388-.681zm2.445-3.07a4.513 4.513 0 0 1-.39 2.928l-.142-.082-4.78-2.758a.79.79 0 0 0-.78 0L8.632 12.39V10.05a.077.077 0 0 1 .033-.064l4.839-2.794a4.498 4.498 0 0 1 4.79.467 4.53 4.53 0 0 1 1.34 2.457zm-9.068-1.572l-2.02-1.168a.07.07 0 0 1-.038-.052V2.083a4.504 4.504 0 0 1 7.37 3.453l-.142.08-4.779 2.758a.795.795 0 0 0-.391.681v.342zm-1.024 4.364l2.836-1.638 2.836 1.638v3.275l-2.836 1.637-2.836-1.637z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Feature Columns */}
          <div className="native-tools-features">
            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <circle cx="12" cy="11" r="2"/>
                </svg>
                <span>One Click Auth</span>
              </h4>
              <p className="native-feature-desc">
                A drag-and-drop interface to create, connect, and configure agents into logical workflows.
              </p>
            </div>

            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                <span>Realtime Sync</span>
              </h4>
              <p className="native-feature-desc">
                Agents operate independently and coordinate tasks to complete complex all goals.
              </p>
            </div>

            <div className="native-feature-col">
              <h4 className="native-feature-title">
                <svg className="native-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                  <line x1="14" y1="4" x2="10" y2="20"/>
                </svg>
                <span>Custom Connector SDK</span>
              </h4>
              <p className="native-feature-desc">
                Run agent workflows in a sandbox to preview behavior, debug logic, and test interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
