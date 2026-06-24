"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const resourcesList = [
  {
    title: 'Blogs',
    description: 'Read the latest B2B growth playbooks, tips, and cold email sequence breakdowns.',
    link: '/blogs',
    icon: '📝',
    active: true,
  },
  {
    title: 'Articles',
    description: 'In-depth sales analyses, guides, and tutorials from our outbound marketing specialists.',
    link: '#',
    icon: '📄',
    active: false,
  },
  {
    title: 'Customer Stories',
    description: 'See how startups and agencies use 360Airo to generate meetings and scale pipeline.',
    link: '#',
    icon: '👥',
    active: false,
  },
  {
    title: 'Testimonials',
    description: 'Reviews and feedback from users regarding deliverability, warmup, and results.',
    link: '#',
    icon: '💬',
    active: false,
  },
  {
    title: 'FAQs',
    description: 'Find answers to standard questions about setting up mailboxes, custom tracking, and limits.',
    link: '#',
    icon: '❓',
    active: false,
  },
];

export default function ResourcesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #020817 0%, #06122B 38%, #081B3E 68%, #020817 100%)',
      fontFamily: "'Outfit', sans-serif",
      color: '#fff',
      padding: '120px 24px 80px'
    }}>
      {/* Decorative Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(47, 123, 255, 0.12) 0%, transparent 75%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(107, 99, 255, 0.1) 0%, transparent 75%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <Navbar activeTab="resources" />

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '960px',
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Header section */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff 50%, #BDD4F1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          Resources Hub
        </h1>

        <p style={{
          fontSize: '17px',
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          Explore insights, guides, and tutorials to automate your outbound campaigns and scale replies.
        </p>

        {/* Resources Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          width: '100%',
          marginBottom: '48px',
          textAlign: 'left'
        }}>
          {resourcesList.map((res, index) => {
            const isHovered = hoveredIndex === index;
            const cardContent = (
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  height: '100%',
                  padding: '30px 24px',
                  background: isHovered 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isHovered 
                    ? '1px solid rgba(79, 99, 255, 0.3)' 
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '20px',
                  boxShadow: isHovered 
                    ? '0 12px 32px rgba(79, 99, 255, 0.12)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.15)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: res.active ? 'pointer' : 'default',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Status Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: res.active 
                    ? 'rgba(16, 185, 129, 0.12)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  color: res.active ? '#10B981' : 'rgba(255, 255, 255, 0.4)',
                  border: res.active 
                    ? '1px solid rgba(16, 185, 129, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.06)',
                }}>
                  {res.active ? 'Active' : 'Coming Soon'}
                </div>

                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  {res.icon}
                </div>

                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: isHovered && res.active ? '#7963ff' : '#fff',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {res.title}
                  {res.active && <span style={{ fontSize: '14px' }}>→</span>}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {res.description}
                </p>
              </div>
            );

            return res.active ? (
              <Link href={res.link} key={res.title} style={{ textDecoration: 'none', color: 'inherit' }}>
                {cardContent}
              </Link>
            ) : (
              <div key={res.title}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Home Button */}
        <Link href="/">
          <button style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '12px 28px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
