// @ts-nocheck
"use client";
import React from 'react';
import '../styles/ImportEnrichmentSection.css';

export default function ImportEnrichmentSection() {
  return (
    <div className="import-enrichment-wrapper">
      <div className="import-enrichment-container">
        
        {/* Card 1: Import List */}
        <div className="ie-card ie-card-normal">
          <div className="ie-card-content">
            <span className="ie-card-subtitle">01 — MULTI-SOURCE IMPORT</span>
            <h3>
              Import list from <br />
              <span>any source</span>
            </h3>
            <p className="ie-card-desc">
              Bring your prospect database to life. We support all kinds of import formats—CSV files, HubSpot, Salesforce, or directly from LinkedIn Sales Navigator. Feed your outreach pipeline instantly with no formatting headaches.
            </p>
            <div className="ie-card-bullets">
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">Support for CSV, XLSX, and CRM sync</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">LinkedIn Sales Navigator scraper</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">Automatic formatting & cleanup</span>
              </div>
            </div>
          </div>
          <div className="ie-card-image">
            <img 
              src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/test/Gemini_Generated_Image_iff3aniff3aniff3.png" 
              alt="Import leads interface" 
              className="ie-mockup-image"
            />
          </div>
        </div>

        {/* Card 2: Signal Agents */}
        <div className="ie-card ie-card-reverse">
          <div className="ie-card-content">
            <span className="ie-card-subtitle">02 — SIGNAL AGENTS</span>
            <h3>
              Spot high-intent leads <br />
              <span>with AI Signal tracking</span>
            </h3>
            <p className="ie-card-desc">
              Outreach works best when it's timely. AI agents track user events, job changes, company funding rounds, or social engagements to spot when prospects are most likely to convert, then trigger context-based outreach automatically.
            </p>
            <div className="ie-card-bullets">
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">Real-time trigger alerts</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">Custom outreach action rules</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">High-intent lead ranking</span>
              </div>
            </div>
          </div>
          <div className="ie-card-image">
            <img 
              src="/signals_preview.png" 
              alt="Signals tracking interface" 
              className="ie-mockup-image"
            />
          </div>
        </div>

        {/* Card 3: Enrichment Agents */}
        <div className="ie-card ie-card-normal">
          <div className="ie-card-content">
            <span className="ie-card-subtitle">03 — ENRICHMENT AGENTS</span>
            <h3>
              Pull deep context <br />
              <span>from all sources</span>
            </h3>
            <p className="ie-card-desc">
              Never send a generic message again. Let enrichment agents fetch lead intelligence from LinkedIn profiles, company websites, CRM histories, and even call recordings to build highly personalized, structured variables.
            </p>
            <div className="ie-card-bullets">
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">Waterfall email & phone finder</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">LinkedIn profile scraper & analyzer</span>
              </div>
              <div className="ie-bullet">
                <span className="bullet-check">✓</span>
                <span className="bullet-text">AI-generated custom icebreakers</span>
              </div>
            </div>
          </div>
          <div className="ie-card-image">
            <img 
              src="/enrichment_preview.png" 
              alt="Data enrichment interface" 
              className="ie-mockup-image"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
