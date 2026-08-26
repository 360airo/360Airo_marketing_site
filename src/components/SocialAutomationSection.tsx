// @ts-nocheck
"use client";
import React from 'react';
import '../styles/SocialAutomationSection.css';

export default function SocialAutomationSection() {
  return (
    <section className="social-auto-wrapper" id="section-social-auto">
      <div className="social-auto-container">
        
        {/* Section Header */}
        <div className="social-auto-header">
          <h2 className="social-auto-title">Automate your social media</h2>
          <p className="social-auto-subtitle">
            Proactiv houses a rich set of features to automate your marketing efforts across all social medias
          </p>
        </div>

        {/* Unified 3-Column Bento Grid */}
        <div className="social-auto-bento-layout">
          
          {/* Card 1: Post to multiple platforms at once (SPANS 2 COLUMNS - Exactly matches bottom 2 cards) */}
          <div className="social-bento-card card-platforms">
            <div className="social-card-text-top">
              <h3 className="social-card-title">Post to multiple platforms at once</h3>
              <p className="social-card-desc">
                With our AI-powered platform, you can post to multiple platforms at once, saving you time and effort.
              </p>
            </div>

            {/* Staggered Social Media Icons Grid with S-curve line */}
            <div className="social-platforms-stage">
              {/* S-curve connection line */}
              <svg className="social-grid-connector" viewBox="0 0 540 180" fill="none">
                <path 
                  d="M 235 0 L 235 45 Q 235 65 255 65 L 285 65 Q 305 65 305 85 L 305 125 Q 305 145 325 145 L 420 145" 
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1.5" 
                />
                <path 
                  d="M 235 0 L 235 45 Q 235 65 255 65 L 285 65 Q 305 65 305 85 L 305 125 Q 305 145 325 145 L 420 145" 
                  stroke="#38bdf8" 
                  strokeWidth="1.5" 
                  strokeOpacity="0.4"
                  strokeDasharray="4 4"
                  className="social-flow-path"
                />
              </svg>

              {/* Row 1 */}
              <div className="social-icons-row row-1">
                {/* 1. Instagram */}
                <div className="social-app-icon icon-ig" title="Instagram">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#igGrad)" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="url(#igGrad)" strokeWidth="2"/>
                    <circle cx="18" cy="6" r="1" fill="#f43f5e"/>
                    <defs>
                      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b"/>
                        <stop offset="50%" stopColor="#ec4899"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* 2. TikTok */}
                <div className="social-app-icon icon-tt" title="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#25f4ee" d="M12.5 7.5v6.25a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v1.5z"/>
                    <path fill="#fe2c55" d="M14 6.9v6.85a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v.9z"/>
                    <path fill="#ffffff" d="M13 7.5v6.25a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v1.5z"/>
                  </svg>
                </div>

                {/* 3. Twitter / Bird */}
                <div className="social-app-icon icon-tw" title="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00d8f6">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </div>

                {/* 4. Facebook */}
                <div className="social-app-icon icon-fb" title="Facebook">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877f2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>

                {/* 5. Meta */}
                <div className="social-app-icon icon-meta" title="Meta">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#0081fb">
                    <path d="M12 7.2c-2.4 0-4.4 1.7-5.5 3.8-1.1-2.1-3.1-3.8-5.5-3.8C.4 7.2 0 7.9 0 8.8c0 3.3 2.7 6 6 6 2.4 0 4.4-1.7 5.5-3.8 1.1 2.1 3.1 3.8 5.5 3.8 3.3 0 6-2.7 6-6 0-.9-.4-1.6-1-1.6z"/>
                  </svg>
                </div>

                {/* 6. LinkedIn */}
                <div className="social-app-icon icon-li" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>

                {/* 7. Slack */}
                <div className="social-app-icon icon-slack" title="Slack">
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
              </div>

              {/* Row 2 */}
              <div className="social-icons-row row-2">
                <div className="social-app-icon icon-meta">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#0081fb">
                    <path d="M12 7.2c-2.4 0-4.4 1.7-5.5 3.8-1.1-2.1-3.1-3.8-5.5-3.8C.4 7.2 0 7.9 0 8.8c0 3.3 2.7 6 6 6 2.4 0 4.4-1.7 5.5-3.8 1.1 2.1 3.1 3.8 5.5 3.8 3.3 0 6-2.7 6-6 0-.9-.4-1.6-1-1.6z"/>
                  </svg>
                </div>
                <div className="social-app-icon icon-li">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0a66c2">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div className="social-app-icon icon-slack">
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
                <div className="social-app-icon icon-ig">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#igGrad2)" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="url(#igGrad2)" strokeWidth="2"/>
                    <circle cx="18" cy="6" r="1" fill="#f43f5e"/>
                    <defs>
                      <linearGradient id="igGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b"/>
                        <stop offset="50%" stopColor="#ec4899"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="social-app-icon icon-tt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#25f4ee" d="M12.5 7.5v6.25a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v1.5z"/>
                    <path fill="#fe2c55" d="M14 6.9v6.85a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v.9z"/>
                    <path fill="#ffffff" d="M13 7.5v6.25a3.75 3.75 0 1 1-3.75-3.75c.42 0 .82.07 1.19.2V7.47a6.22 6.22 0 0 0-1.19-.12 6.25 6.25 0 1 0 6.25 6.25V9.45c1.47 1.05 3.26 1.67 5.2 1.67v-2.5a6.27 6.27 0 0 1-5.2-2.62v1.5z"/>
                  </svg>
                </div>
                <div className="social-app-icon icon-tw">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00d8f6">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </div>
                <div className="social-app-icon icon-fb">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877f2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Analytics for everything (SPANS 1 COLUMN - Exactly matches bottom 3rd card) */}
          <div className="social-bento-card card-analytics">
            <div className="analytics-radar-wrap">
              <div className="radar-circle-bg" />
              <div className="radar-dashed-axis" />

              <svg viewBox="0 0 280 140" className="analytics-vector-curve" fill="none">
                <path 
                  d="M 15 90 C 55 115, 85 45, 140 45 C 190 45, 225 105, 265 65" 
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="2.5" 
                />
                <path 
                  d="M 15 90 C 55 115, 85 45, 140 45" 
                  stroke="#38bdf8" 
                  strokeWidth="2.5" 
                />
              </svg>

              <div className="analytics-node-apex">
                <div className="analytics-apex-dot" />
                <div className="analytics-badge-tooltip">
                  <span>+200 connections</span>
                </div>
                <div className="analytics-blue-cursor">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
                    <polygon points="3 2 22 12 12 14 3 22 3 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="social-card-text-bot">
              <h3 className="social-card-title">Analytics for everything</h3>
              <p className="social-card-desc">
                Check analytics, track your posts, and get insights into your audience.
              </p>
            </div>
          </div>

          {/* Card 3: Integrated AI (Column 1) */}
          <div className="social-bento-card card-integrated-ai">
            <div className="ai-carousel-wrap">
              <div className="ai-ambient-particles" />

              <div className="ai-logo-node node-claude">
                <span className="claude-letter">A</span>
              </div>

              <div className="ai-logo-node node-robot">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2"/>
                  <circle cx="12" cy="5" r="2"/>
                  <path d="M12 7v4"/>
                  <line x1="8" y1="16" x2="8" y2="16"/>
                  <line x1="16" y1="16" x2="16" y2="16"/>
                </svg>
              </div>

              <div className="ai-logo-node node-openai-main">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-8.66-4.666a4.477 4.477 0 0 1-.533-3.008l.142.083 4.78 2.758a.791.791 0 0 0 .78 0l5.834-3.369v2.335a.08.08 0 0 1-.033.065l-4.839 2.793a4.506 4.506 0 0 1-6.131-1.657zm-1.074-9.363c.306-1.025.99-1.9 1.943-2.476l-.001.164v5.516a.79.79 0 0 0 .389.682l5.834 3.369-2.02 1.168a.078.078 0 0 1-.071 0l-4.839-2.793a4.508 4.508 0 0 1-1.235-5.63zm14.507 3.633l-5.834-3.369 2.02-1.168a.078.078 0 0 1 .071 0l4.839 2.793a4.508 4.508 0 0 1-.708 8.113v-5.688a.79.79 0 0 0-.388-.681zm2.445-3.07a4.513 4.513 0 0 1-.39 2.928l-.142-.082-4.78-2.758a.79.79 0 0 0-.78 0L8.632 12.39V10.05a.077.077 0 0 1 .033-.064l4.839-2.794a4.498 4.498 0 0 1 4.79.467 4.53 4.53 0 0 1 1.34 2.457zm-9.068-1.572l-2.02-1.168a.07.07 0 0 1-.038-.052V2.083a4.504 4.504 0 0 1 7.37 3.453l-.142.08-4.779 2.758a.795.795 0 0 0-.391.681v.342zm-1.024 4.364l2.836-1.638 2.836 1.638v3.275l-2.836 1.637-2.836-1.637z"/>
                </svg>
              </div>

              <div className="ai-logo-node node-meta-ai">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0081fb">
                  <path d="M12 7.2c-2.4 0-4.4 1.7-5.5 3.8-1.1-2.1-3.1-3.8-5.5-3.8C.4 7.2 0 7.9 0 8.8c0 3.3 2.7 6 6 6 2.4 0 4.4-1.7 5.5-3.8 1.1 2.1 3.1 3.8 5.5 3.8 3.3 0 6-2.7 6-6 0-.9-.4-1.6-1-1.6z"/>
                </svg>
              </div>

              <div className="ai-logo-node node-sparkle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
              </div>
            </div>

            <div className="social-card-text-bot">
              <h3 className="social-card-title">Integrated AI</h3>
              <p className="social-card-desc">
                Proactiv uses AI to help you create engaging content.
              </p>
            </div>
          </div>

          {/* Card 4: Easy Collaboration (Column 2) */}
          <div className="social-bento-card card-easy-collab">
            <div className="collab-stage-wrap">
              <div className="collab-dot-row">
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
                <span className="dot-ind" />
              </div>

              <div className="collab-nodes-stack">
                <div className="collab-item-box">
                  <span className="collab-box-text">Twitter post</span>
                  <div className="collab-pointer-tag tag-blue">
                    <svg className="pointer-cursor-icon" width="10" height="10" viewBox="0 0 24 24" fill="#00d8f6">
                      <polygon points="3 2 22 12 12 14 3 22 3 2" />
                    </svg>
                    <span>Manu Arora</span>
                  </div>
                </div>

                <div className="collab-v-line" />

                <div className="collab-item-box active-cyan-box">
                  <span className="collab-box-text">Email Campaign</span>
                </div>

                <div className="collab-v-line" />

                <div className="collab-item-box">
                  <span className="collab-box-text">Newsletter Campaign</span>
                  <div className="collab-pointer-tag tag-subtle">
                    <svg className="pointer-cursor-icon" width="10" height="10" viewBox="0 0 24 24" fill="#64748b">
                      <polygon points="3 2 22 12 12 14 3 22 3 2" />
                    </svg>
                    <span>Tyler Durden</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-card-text-bot">
              <h3 className="social-card-title">Easy Collaboration</h3>
              <p className="social-card-desc">
                Proactive can integrate with Zapier, Slack and every other popular integration tools.
              </p>
            </div>
          </div>

          {/* Card 5: Know your audience (Column 3 - Exactly matches top 2nd card width) */}
          <div className="social-bento-card card-audience">
            <div className="audience-stage-wrap">
              <div className="audience-avatar-container">
                <img 
                  src="/manu_avatar.jpg" 
                  alt="Manu Arora Avatar" 
                  className="audience-photo-img"
                />
              </div>

              <div className="audience-text-meta">
                <div className="audience-user-name">Manu Arora</div>
                <div className="audience-user-stats">Most engagements • 69,420</div>
              </div>

              <div className="audience-waveform-box">
                <svg viewBox="0 0 200 45" className="audience-waveform-svg" fill="none">
                  <path 
                    d="M 5 28 Q 15 10, 25 32 T 45 22 T 65 35 T 85 14 T 105 32 T 125 10 T 145 28 T 175 18 T 195 25" 
                    stroke="rgba(255, 255, 255, 0.18)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="social-card-text-bot">
              <h3 className="social-card-title">Know your audience</h3>
              <p className="social-card-desc">
                Based on your audience, create funnels and drive more traffic.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}