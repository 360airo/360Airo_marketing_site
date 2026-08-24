// @ts-nocheck
"use client";
import React from 'react';
import '../styles/BuiltForSpeedSection.css';

export default function BuiltForSpeedSection() {
  return (
    <section className="speed-scale-wrapper" id="section-speed-scale">
      <div className="speed-scale-container">
        {/* Top-Left Heading & Copy */}
        <div className="speed-scale-header">
          <h2 className="speed-scale-title">
            <span className="title-line">Built for Speed</span>
            <span className="title-line">Designed for Scale</span>
          </h2>
          <p className="speed-scale-desc">
            Deploy AI agents that plan, act through your tools, and report outcomes—without changing how your teams work.
          </p>
        </div>

        {/* 2-Card 3D Stage with straight linear lighting and straight gradient fade */}
        <div className="speed-scale-stage">
          <div className="speed-scale-3d-group">
            {/* Card 1: Back Underlay Layer */}
            <div className="isometric-card layer-back">
              <img 
                src="/3.webp" 
                alt="Aceternity Core Background Layer" 
                className="isometric-image" 
              />
            </div>

            {/* Card 2: Front Active Layer */}
            <div className="isometric-card layer-front">
              <img 
                src="/3.webp" 
                alt="Aceternity Core Active Layer" 
                className="isometric-image" 
              />
              {/* Straight Diagonal Light Beam */}
              <div className="isometric-spotlight-beam" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Black Overlay Layer to smoothly hide bottom half of images */}
      <div className="speed-scale-bottom-fade" aria-hidden="true" />
    </section>
  );
}