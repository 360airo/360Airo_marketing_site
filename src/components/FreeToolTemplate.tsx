"use client";

import React from "react";
// Navbar and Footer are provided by the /free-tools layout to keep header/footer consistent
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  AnalyzerIcon, CalculatorIcon, DeliverabilityIcon, DmarcIcon, PermutatorIcon,
  PitchIcon, SequencerIcon, SignatureIcon, SpamCheckerIcon, SpfIcon, VerifierIcon,
} from "./ModernIcons";
import "../styles/free-tools.css";
import FeatureMarquee from "./FeatureMarquee";

const tools = [
  { name: "Email Deliverability Test", slug: "email-deliverability-test", category: "Deliverability", description: "Audit inbox readiness, authentication, reputation signals, and content risk before you send.", icon: DeliverabilityIcon, accent: "#c084fc" },
  { name: "Email Verifier", slug: "email-verifier", category: "Deliverability", description: "Clean prospect lists with syntax, domain, role-address, and risk diagnostics.", icon: VerifierIcon, accent: "#38bdf8" },
  { name: "Mailbox Calculator", slug: "mailbox-calculator", category: "Infrastructure", description: "Model the domains, inboxes, and daily capacity needed for safe outbound scale.", icon: CalculatorIcon, accent: "#34d399" },
  { name: "Email Warmup Calculator", slug: "email-warmup-calculator", category: "Infrastructure", description: "Generate a day-by-day warmup plan that protects sender reputation before campaigns launch.", icon: CalculatorIcon, accent: "#22c55e" },
  { name: "DMARC Generator", slug: "dmarc-generator", category: "Infrastructure", description: "Create a deployment-ready DMARC policy with reporting and alignment controls.", icon: DmarcIcon, accent: "#60a5fa" },
  { name: "SPF Generator", slug: "spf-generator", category: "Infrastructure", description: "Build a valid SPF record for Google, Microsoft, HubSpot, SendGrid, and custom IPs.", icon: SpfIcon, accent: "#fbbf24" },
  { name: "Email Pitch Generator", slug: "email-pitch-generator", category: "AI Writing", description: "Turn your offer and prospect context into a concise, relevant cold email pitch.", icon: PitchIcon, accent: "#f472b6" },
  { name: "AI Email Sequence Builder", slug: "email-sequencer", category: "AI Writing", description: "Instantly create personalized cold email sequences designed to start conversations and book more meetings.", icon: SequencerIcon, accent: "#a855f7" },
  { name: "Email Signature Builder", slug: "email-signature-builder", category: "Creation", description: "Create a professional email signature that builds trust, reinforces your brand, and makes every email look polished.", icon: SignatureIcon, accent: "#2dd4bf" },
  { name: "Email Template Builder", slug: "email-template-builder", category: "Creation", description: "Create responsive campaign HTML from a purpose, format, and call to action.", icon: SequencerIcon, accent: "#8b5cf6" },
  { name: "Email Template Analyzer", slug: "email-template-analyzer", category: "Optimization", description: "Score subject lines and email copy for clarity, length, personalization, and risk.", icon: AnalyzerIcon, accent: "#f97316" },
  { name: "Email Spam Checker", slug: "email-spam-checker", category: "Optimization", description: "Find high-risk phrases and rewrite your copy before spam filters make the decision.", icon: SpamCheckerIcon, accent: "#fb7185" },
  { name: "Email Permutator", slug: "email-permutator", category: "Prospecting", description: "Generate likely work-email patterns from a name and one or more company domains.", icon: PermutatorIcon, accent: "#c084fc" },
];

interface FAQ {
  q: string;
  a: string;
}

interface FreeToolTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  highlightText?: string;
  calculator?: React.ReactNode;
  sections: { title: string; content?: string; list?: string[] }[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export default function FreeToolTemplate({
  title,
  subtitle,
  description,
  highlightText,
  calculator,
  sections,
  faqs,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
}: FreeToolTemplateProps) {
  const pathname = usePathname();
  const currentSlug = pathname ? pathname.split("/").pop() || "" : "";

  // Get 3 other related tools
  const relatedTools = React.useMemo(() => {
    const filtered = tools.filter(t => t.slug !== currentSlug);
    // Return first 3 tools (or can be randomized/selected by category)
    const currentTool = tools.find(t => t.slug === currentSlug);
    const category = currentTool?.category;
    
    // Sort so same category comes first
    const sorted = [...filtered].sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (a.category !== category && b.category === category) return 1;
      return 0;
    });
    
    return sorted.slice(0, 3);
  }, [currentSlug]);
  return (
    <main className="ft-tool-page-main">
        <header className="ft-tool-hero ft-container">
          <h1 className="ft-tool-title">{title}</h1>
          <h2 className="ft-tool-subtitle">{subtitle}</h2>
          <p className="ft-tool-desc">{description}</p>
          {highlightText && (
            <p className="ft-tool-highlight-text">{highlightText}</p>
          )}
        </header>

        <section className="ft-tool-shell ft-container">
          <aside className="ft-tool-rail" aria-label="360Airo promo">
            <div className="ft-tool-rail-card">
              <p className="ft-tool-rail-kicker">360Airo</p>
              <h3>Run outbound with fewer moving parts.</h3>
              <p>
                One place for deliverability, sequencing, verification, and campaign control.
              </p>
              <ul>
                <li>Compact workflow design</li>
                <li>Deliverability-first foundation</li>
                <li>Built for serious outbound teams</li>
              </ul>
              <a href="/customer-stories" className="ft-button ft-button-light">
                See customer stories
              </a>
            </div>
          </aside>

          <div className="ft-tool-main">
            {calculator && (
              <section className="ft-tool-panel ft-tool-calculator" aria-label="Calculator">
                {calculator}
              </section>
            )}

            <section className="ft-tool-copy-grid" aria-label="Tool guidance">
              {sections.map((section, index) => (
                <article className="ft-tool-copy-card" key={index}>
                  <p className="ft-tool-copy-kicker">Guidance</p>
                  <h3>{section.title}</h3>
                  {section.content && <p className="ft-tool-copy-text">{section.content}</p>}
                  {section.list && section.list.length > 0 && (
                    <ul className="ft-tool-checklist">
                      {section.list.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <CheckCircle2 size={16} />
                          <span>{item.replace(/^\.\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </section>

            <section className="ft-tool-panel ft-tool-faq">
              <div className="ft-tool-section-head">
                <p className="ft-tool-copy-kicker">FAQ</p>
                <h3>Frequently Asked Questions</h3>
              </div>
              <div className="ft-tool-faq-list">
                {faqs.map((faq, index) => (
                  <article key={index} className="ft-tool-faq-item">
                    <h4>{faq.q}</h4>
                    <p>{faq.a}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="ft-tool-cta">
              <div className="ft-tool-cta-copy">
                <p className="ft-tool-copy-kicker">Next step</p>
                <h2>{ctaTitle}</h2>
                <p>{ctaSubtitle}</p>
              </div>
              <button className="ft-button ft-button-dark">
                <span>{ctaButtonText}</span>
                <ArrowRight size={16} />
              </button>
            </section>

            {/* Check out more tools section */}
            <section className="ft-more-tools-section">
              <div className="ft-more-tools-header">
                <h3>Check out more free tools</h3>
                <p>Sharpen your outreach with other practical workflow builders in our operator library.</p>
              </div>
              <div className="ft-more-tools-grid">
                {relatedTools.map((tool) => (
                  <a href={`/free-tools/${tool.slug}`} key={tool.slug} className="ft-more-tool-card">
                    <div className="ft-more-tool-icon">
                      <tool.icon size={20} color={tool.accent} />
                    </div>
                    <div className="ft-more-tool-info">
                      <h4>{tool.name}</h4>
                      <p>{tool.description}</p>
                    </div>
                    <ArrowRight size={16} className="ft-more-tool-arrow" />
                  </a>
                ))}
              </div>
            </section>
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
  );
}
