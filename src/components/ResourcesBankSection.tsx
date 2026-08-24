// @ts-nocheck
"use client";
import React from 'react';
import '../styles/ResourcesBankSection.css';

export default function ResourcesBankSection() {
  return (
    <section className="resources-bank-wrapper" id="section-resources-bank">
      <div className="resources-bank-container">
        {/* Section Heading */}
        <h2 className="resources-bank-title">Resources bank</h2>

        {/* Featured Resource Card */}
        <div className="resource-featured-card">
          {/* Left Media Image */}
          <div className="resource-image-container">
            <img 
              src="/vr_headset_changelog.jpg" 
              alt="Changelog for 2024" 
              className="resource-image"
              loading="lazy"
            />
          </div>

          {/* Right Text Content */}
          <div className="resource-content">
            <h3 className="resource-title">Changelog for 2024</h3>
            <p className="resource-desc">
              Explore the latest updates and enhancements in our 2024 changelog. Discover new features and improvements that enhance user experience.
            </p>

            {/* Author & Date Footer */}
            <div className="resource-meta">
              <div className="resource-avatar-wrap">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span className="resource-author">Manu Arora</span>
              <span className="resource-dot">•</span>
              <span className="resource-date">January 01, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
