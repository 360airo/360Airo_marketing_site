import React from 'react';
import '../styles/CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-heading">So what are you waiting for?</h2>
        <p className="cta-description">
          We are here to help you with your business. Get in touch with us and we will get back to you as soon as possible.
        </p>
        <button className="cta-button">Contact Us</button>
      </div>
    </section>
  );
}
