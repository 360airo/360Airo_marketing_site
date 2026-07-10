import React from 'react';

export default function AgenciesTestimonialSection() {
  return (
    <section className="agencies-testimonial-section" style={{ padding: '80px 20px', backgroundColor: '#0b0f19', textAlign: 'center', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '24px' }}>
          Helping You Build a Predictable Revenue Pipeline
        </h2>
        <p style={{ fontSize: '1.25rem', color: '#a0aec0', marginBottom: '40px' }}>
          ( hear from what our customers are saying about 360 airo )
        </p>
        
        {/* Placeholder for testimonials */}
        <div style={{ padding: '40px', backgroundColor: '#1a202c', borderRadius: '16px', border: '1px solid #2d3748' }}>
          <p style={{ fontSize: '1.125rem', fontStyle: 'italic', marginBottom: '20px' }}>
            "360Airo completely transformed our agency's outreach capabilities. Managing multiple clients is now a breeze."
          </p>
          <div style={{ fontWeight: 600 }}>- Marketing Agency Partner</div>
        </div>
      </div>
    </section>
  );
}
