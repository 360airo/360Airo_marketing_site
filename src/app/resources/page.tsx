"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function ResourcesPage() {
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
      color: '#fff'
    }}>
      {/* Decorative Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(47, 123, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(107, 99, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <Navbar activeTab="resources" />

      {/* Glassmorphic Card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '560px',
        width: 'calc(100% - 32px)',
        padding: '48px 32px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(47, 123, 255, 0.2), rgba(107, 99, 255, 0.2))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '24px',
          fontSize: '28px'
        }}>
          📚
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff 60%, rgba(255, 255, 255, 0.7))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          Resources Page
        </h1>

        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          We are currently crafting a hyper-personalized SDR experience for you. 
          This page is under construction and will launch soon!
        </p>

        <Link href="/">
          <button style={{
            background: 'linear-gradient(135deg, #2F7BFF, #6B63FF)',
            borderRadius: '12px',
            padding: '14px 28px',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(47, 123, 255, 0.25)',
            transition: 'transform 0.25s, box-shadow 0.25s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(47, 123, 255, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(47, 123, 255, 0.25)';
          }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
