"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import {
  AnalyzerIcon, CalculatorIcon, DeliverabilityIcon, DmarcIcon, PermutatorIcon,
  PitchIcon, SequencerIcon, SignatureIcon, SpamCheckerIcon, SpfIcon, VerifierIcon,
} from "../../components/ModernIcons";
import "../../styles/free-tools.css";
import FeatureMarquee from "../../components/FeatureMarquee";

const tools = [
  { name: "Email Deliverability Test", slug: "email-deliverability-test", category: "Deliverability", description: "Audit inbox readiness, authentication, reputation signals, and content risk before you send.", icon: DeliverabilityIcon, accent: "#c084fc", image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Verifier", slug: "email-verifier", category: "Deliverability", description: "Clean prospect lists with syntax, domain, role-address, and risk diagnostics.", icon: VerifierIcon, accent: "#38bdf8", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
  { name: "Mailbox Calculator", slug: "mailbox-calculator", category: "Infrastructure", description: "Model the domains, inboxes, and daily capacity needed for safe outbound scale.", icon: CalculatorIcon, accent: "#34d399", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Warmup Calculator", slug: "email-warmup-calculator", category: "Infrastructure", description: "Generate a day-by-day warmup plan that protects sender reputation before campaigns launch.", icon: CalculatorIcon, accent: "#22c55e", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
  { name: "DMARC Generator", slug: "dmarc-generator", category: "Infrastructure", description: "Create a deployment-ready DMARC policy with reporting and alignment controls.", icon: DmarcIcon, accent: "#60a5fa", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" },
  { name: "SPF Generator", slug: "spf-generator", category: "Infrastructure", description: "Build a valid SPF record for Google, Microsoft, HubSpot, SendGrid, and custom IPs.", icon: SpfIcon, accent: "#fbbf24", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Pitch Generator", slug: "email-pitch-generator", category: "AI Writing", description: "Turn your offer and prospect context into a concise, relevant cold email pitch.", icon: PitchIcon, accent: "#f472b6", image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800&q=80" },
  { name: "AI Email Sequence Builder", slug: "email-sequencer", category: "AI Writing", description: "Instantly create personalized cold email sequences designed to start conversations and book more meetings.", icon: SequencerIcon, accent: "#a855f7", image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Signature Builder", slug: "email-signature-builder", category: "Creation", description: "Create a professional email signature that builds trust, reinforces your brand, and makes every email look polished.", icon: SignatureIcon, accent: "#2dd4bf", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Template Builder", slug: "email-template-builder", category: "Creation", description: "Create responsive campaign HTML from a purpose, format, and call to action.", icon: SequencerIcon, accent: "#8b5cf6", image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Template Analyzer", slug: "email-template-analyzer", category: "Optimization", description: "Score subject lines and email copy for clarity, length, personalization, and risk.", icon: AnalyzerIcon, accent: "#f97316", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Spam Checker", slug: "email-spam-checker", category: "Optimization", description: "Find high-risk phrases and rewrite your copy before spam filters make the decision.", icon: SpamCheckerIcon, accent: "#fb7185", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80" },
  { name: "Email Permutator", slug: "email-permutator", category: "Prospecting", description: "Generate likely work-email patterns from a name and one or more company domains.", icon: PermutatorIcon, accent: "#c084fc", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },
];

export default function FreeToolsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => tools.filter((tool) =>
    `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  return (
    <>
      <main>
        <section className="ft-hero">
          <div className="ft-hero-content">
            <div className="ft-hero-badge">Free toolkit</div>
            <h1 className="ft-hero-title">
              Free tools for teams that take <span>outbound seriously.</span>
            </h1>
            <p className="ft-hero-copy">
              Plan infrastructure, protect deliverability, and produce sharper email campaigns with a practical toolkit built for modern revenue teams.
            </p>
            <div className="ft-hero-pill-row">
              <span>Deliverability-first</span>
              <span>Infrastructure-safe</span>
              <span>Built for scale</span>
            </div>
          </div>
        </section>


        <section className="ft-grid-section scene-light">
          <div className="ft-container">
            <div className="ft-tools-header">
              <div className="ft-tools-heading">
                <p className="ft-tools-label">Operator library</p>
                <h2>The most useful outbound workflow tools, ready instantly.</h2>
              </div>
              <div className="ft-search-group">
                <div className="ft-search-field">
                  <Search size={18} className="ft-search-icon" />
                  <input 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search free tools..." 
                    className="ft-search-input"
                  />
                </div>
                <button className="ft-search-button">Search</button>
              </div>
            </div>

            <div className="ft-grid">
              {filtered.map((tool) => {
                return (
                  <Link href={`/free-tools/${tool.slug}`} className={`ft-card-modern accent-${tool.slug}`} key={tool.slug}>
                    <div className="ft-card-visual">
                      <img src={tool.image} alt={tool.name} className="ft-card-img" />
                      <div className="ft-card-icon-container">
                        <tool.icon size={24} color={tool.accent} />
                      </div>
                    </div>
                    <div className="ft-card-content">
                      <span className="ft-card-category">{tool.category}</span>
                      <h3 className="ft-card-title">{tool.name}</h3>
                      <p className="ft-card-desc">{tool.description}</p>
                      <div className="ft-card-footer">
                        <span className="ft-card-read-more">Open Tool <ArrowRight size={16} /></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA / Autopilot Section */}
        <section className="cs-cta-modern">
          <div className="cs-cta-bg">
            <div className="cs-cta-pattern"></div>
          </div>
          <div className="cs-cta-content" style={{ width: '100%' }}>
            <h2>Put multichannel outbound on autopilot<br/>with 360Airo</h2>
            <div className="cs-cta-buttons">
              <button className="btn-primary-purple" onClick={() => window.location.href = '#'}>Start free &rarr;</button>
              <button className="btn-secondary-white" onClick={() => window.location.href = '#'}>Book a demo &rarr;</button>
            </div>
            
            <FeatureMarquee />
          </div>
        </section>
      </main>
    </>
  );
}
