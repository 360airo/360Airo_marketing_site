"use client";
import React, { useEffect } from 'react';
import '../../styles/customer-stories.css';
import FeaturedStory from '../../components/FeaturedStory';
import CustomerStoryCard from '../../components/CustomerStoryCard';
import StatsCard from '../../components/StatsCard';
import TestimonialCarousel from '../../components/TestimonialCarousel';
import FeatureMarquee from '../../components/FeatureMarquee';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Users, Zap, BarChart2 } from 'lucide-react';

export default function CustomerStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      company: 'Shiro Logistics',
      title: 'From Manual Prospecting to Predictable Pipeline: How Shiro Logistics acquired 7 new clients in 30 days',
      tags: [{ label: 'Logistics' }, { icon: '🇺🇸', label: 'USA' }],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/customer-stories/shiro'
    },
    {
      company: 'Chain of Events',
      title: 'How Chain of Events automates the output of 5 BDRs with 360Airo',
      tags: [{ label: 'Events' }, { icon: '🌍', label: 'EMEA' }],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/customer-stories/chain-of-events'
    },
    {
      company: 'Zirtual',
      title: 'How Zirtual tripled its monthly leads with 360Airo',
      tags: [{ label: 'VA service' }, { icon: '🇺🇸', label: 'USA' }],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/customer-stories/zirtual'
    },
    {
      company: 'CookUnity',
      title: 'How CookUnity scaled personalized outbound with 360Airo',
      tags: [{ label: 'Meal delivery service' }, { icon: '🇺🇸', label: 'USA' }],
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/customer-stories/cookunity'
    },
    {
      company: 'SumUp',
      title: 'How SumUp sent 400,000+ personalized emails with 360Airo',
      tags: [{ label: 'Fintech' }, { icon: '🌍', label: 'Global' }],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      to: '/customer-stories/sumup'
    }
  ];

  return (
    <div className="cs-page">
      <Navbar activeTab="customer-stories" />
      {/* Hero Section */}
      <section className="cs-hero" style={{ background: '#FAF9FB' }}>
        <div className="cs-hero-content">
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '64px', fontWeight: '400', color: '#111827', marginBottom: '16px' }}>
            Customer stories
          </h1>
          <p style={{ fontSize: '22px', lineHeight: '1.6', color: '#475569', maxWidth: '650px', margin: '0 auto', letterSpacing: '-0.01em' }}>
            See how leading startups and businesses across all sectors are growing faster via outbound powered by 360Airo.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <div className="cs-container">
        <FeaturedStory />
      </div>


      {/* Stories Grid */}
      <section className="cs-grid-section">
        <div className="cs-container">
          <div className="cs-section-header">
            <h2>More Success Stories</h2>
            <div className="cs-filters">
              <button className="cs-filter active">All</button>
              <button className="cs-filter">B2B SaaS</button>
              <button className="cs-filter">Agencies</button>
              <button className="cs-filter">Enterprise</button>
            </div>
          </div>
          <div className="cs-grid">
            {stories.map((story, i) => (
              <CustomerStoryCard key={i} {...story} />
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
          <h2>Put outbound on autopilot<br/>with 360Airo</h2>
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
