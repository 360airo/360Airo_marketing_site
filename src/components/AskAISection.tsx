"use client";
import React from 'react';

export default function AskAISection() {
  const prompt = "I'm researching AI-powered sales outreach platforms and want to know how 360Airo combines its AI SDR, multichannel outreach automation, lead enrichment, personalized email sequences, and deliverability infrastructure to help sales teams, agencies, and startups book more meetings and generate pipeline at scale. Summarize the highlights from 360Airo's website: https://360airo.com";

  const handleLLMClick = (e: React.MouseEvent<HTMLAnchorElement>, baseUrl: string, param: string = "q") => {
    e.preventDefault();
    const url = `${baseUrl}?${param}=${encodeURIComponent(prompt)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="ask-ai-section">
      <div className="ask-ai-container">
        <h2 className="ask-ai-title">
          ASK AI HOW <span className="highlight-360">360</span>AIRO BUILDS<br/>YOUR PIPELINE
        </h2>
        
        <div className="llm-grid">
          {/* ChatGPT */}
          <a href="#" className="llm-btn" onClick={(e) => handleLLMClick(e, "https://chatgpt.com/")} title="Ask ChatGPT">
            <div className="llm-icon chatgpt">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                <path d="M12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6Z" />
                <path d="M12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12Z" />
              </svg>
            </div>
          </a>

          {/* Claude */}
          <a href="#" className="llm-btn" onClick={(e) => handleLLMClick(e, "https://claude.ai/new")} title="Ask Claude">
            <div className="llm-icon claude">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
              </svg>
            </div>
          </a>

          {/* Gemini */}
          <a href="#" className="llm-btn" onClick={(e) => handleLLMClick(e, "https://gemini.google.com/app", "q")} title="Ask Gemini">
            <div className="llm-icon gemini">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10.5 15.5L9 19L7.5 15.5L4 14L7.5 12.5L9 9L10.5 12.5L14 14L10.5 15.5ZM16.5 10.5L15.75 8.25L13.5 7.5L15.75 6.75L16.5 4.5L17.25 6.75L19.5 7.5L17.25 8.25L16.5 10.5Z" />
              </svg>
            </div>
          </a>

          {/* Perplexity */}
          <a href="#" className="llm-btn" onClick={(e) => handleLLMClick(e, "https://www.perplexity.ai/search")} title="Ask Perplexity">
            <div className="llm-icon perplexity">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </a>

          {/* Copilot */}
          <a href="#" className="llm-btn" onClick={(e) => handleLLMClick(e, "https://copilot.microsoft.com/")} title="Ask Copilot">
            <div className="llm-icon copilot">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
