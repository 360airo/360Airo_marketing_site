"use client";
import React, { useEffect } from 'react';
import '../../styles/customer-stories.css';
import '../../styles/tailwind-comparison.css';
import FeaturedStory from '../../components/FeaturedStory';
import CustomerStoryCard from '../../components/CustomerStoryCard';
import StatsCard from '../../components/StatsCard';
import TestimonialCarousel from '../../components/TestimonialCarousel';
import FeatureMarquee from '../../components/FeatureMarquee';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function ComparisonPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const comparisons = [
    {
      company: 'Reply.io Alternative',
      title: 'Why modern teams choose 360Airo over Reply.io for unified outbound',
      tags: [{ label: 'Sales' }, { icon: '🤖', label: 'AI Driven' }],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/comparison/reply-io'
    },
    {
      company: 'Outreach.io Alternative',
      title: 'The best Outreach alternative for scaling your personalized sequences',
      tags: [{ label: 'Sales' }, { icon: '📈', label: 'High Volume' }],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/comparison/outreach'
    },
    {
      company: 'Apollo.io Alternative',
      title: 'How 360Airo compares to Apollo for B2B prospecting and enrichment',
      tags: [{ label: 'Data' }, { icon: '🎯', label: 'Targeting' }],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/comparison/apollo'
    },
    {
      company: 'Lemlist Alternative',
      title: 'Why agencies move from Lemlist to 360Airo to manage client campaigns',
      tags: [{ label: 'Agencies' }, { icon: '🚀', label: 'Growth' }],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/comparison/lemlist'
    },
    {
      company: 'Woodpecker Alternative',
      title: 'A better alternative to Woodpecker for email deliverability and warmup',
      tags: [{ label: 'Deliverability' }, { icon: '🔥', label: 'Warmup' }],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/comparison/woodpecker'
    }
  ];

  return (
    <div className="cs-page comparison-page">
      <Navbar />
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #070b17 0%, #0c162c 40%, #1a244d 100%)', borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px' }}>
        {/* Decorative elements to match the Artisan Blog banner */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -left-[5%] top-[10%] w-[30%] aspect-square rounded-full border border-white/20"></div>
          <div className="absolute right-[5%] -bottom-[20%] w-[40%] aspect-square rounded-full border border-white/20"></div>
          <div className="absolute left-[15%] top-0 w-px h-full bg-white/10"></div>
          <div className="absolute right-[15%] top-0 w-px h-full bg-white/10"></div>
          <div className="absolute top-[30%] left-0 w-full h-px bg-white/10"></div>
          <div className="absolute bottom-[20%] left-0 w-full h-px bg-white/10"></div>
        </div>

        <div className="w-full max-w-7xl text-white mx-auto flex flex-col items-center py-28 px-4 gap-6 h-full justify-center relative z-10">
          <h1 className="heading-mobile-xxlarge sm:heading-tablet-xxlarge lg:desktop-heading-xxlarge text-center" style={{ opacity: 1, transform: 'none', color: '#ffffff' }}>
            360Airo Comparison
          </h1>
          <p className="text-lg lg:text-xl max-w-[560px] text-center" style={{ opacity: 1, transform: 'none', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
            See how 360Airo stacks up against the competition and why leading teams choose our unified outbound platform.
          </p>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="cs-grid-section" style={{ paddingTop: '130px' }}>
        <div className="cs-container">
          <div className="cs-section-header">
            <h2>All Comparisons</h2>
            <div className="cs-filters">
              <button className="cs-filter active">All</button>
              <button className="cs-filter">Sales</button>
              <button className="cs-filter">Data</button>
              <button className="cs-filter">Deliverability</button>
            </div>
          </div>
          <div className="cs-grid">
            {comparisons.map((comp, i) => (
              <CustomerStoryCard key={i} {...comp} />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="cs-metrics-section">
        <div className="cs-container">
          <div className="cs-metrics-card-modern">
            <StatsCard ringColor="#FBBF24" percentage={92} value="4.6/5" label="customer satisfaction rate on G2" />
            <StatsCard ringColor="#34D399" percentage={96} value="96%" label="support satisfaction rate" />
            <StatsCard ringColor="#60A5FA" percentage={90} value="2 min" label="average response time in live chat" />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <TestimonialCarousel />

      {/* Final CTA */}
      <section className="cs-cta-modern">
        <div className="cs-cta-bg">
          <div className="cs-cta-pattern"></div>
        </div>
        <div className="cs-cta-content" style={{width: '100%'}}>
          <h2>Put multichannel outbound on autopilot<br/>with 360Airo</h2>
          <div className="cs-cta-buttons">
            <button className="btn-primary-purple">Start free &rarr;</button>
            <button className="btn-secondary-white">Book a demo &rarr;</button>
          </div>
          
          <FeatureMarquee />
        </div>
      </section>
      <Footer />
    </div>
  );
}
