import React from 'react';
import Link from 'next/link';
import '../styles/CTASection.css';

export default function StartupsCTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-heading">Start Growing Your Startup Today</h2>
        <p className="cta-description">
          Find your ideal customers, automate personalized outreach, and book more qualified meetings all from one AI-powered sales engagement platform built for startups.
        </p>
        <Link href="/book-a-demo" className="cta-button">
          Start a 14 day trial
        </Link>
      </div>
    </section>
  );
}
