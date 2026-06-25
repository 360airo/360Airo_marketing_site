"use client";
import React, { useState, useEffect } from 'react';
import BookDemoModal from './BookDemoModal';

export default function BookDemoModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // 1. Custom event listener for manual programmatic triggers
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-book-demo-modal', handleOpenModal);

    // Reset redirecting state when page is shown (especially from BFcache on back button navigation)
    const handlePageShow = (e: PageTransitionEvent) => {
      setIsRedirecting(false);
    };
    window.addEventListener('pageshow', handlePageShow);

    // 2. Global click interceptor (capture phase)
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cta = target.closest('a, button') as HTMLElement;
      if (cta) {
        const href = cta.getAttribute('href');
        const text = cta.textContent?.toLowerCase().trim() || '';

        const isBookDemo = 
          (cta.tagName === 'A' && href?.includes('/book-a-demo')) ||
          text === 'book demo' ||
          text === 'book a demo' ||
          text === 'book a live demo';

        const isFreeTrialOrSignup =
          text.includes('free trial') ||
          text.includes('signup') ||
          text.includes('sign up') ||
          text.includes('start trial') ||
          text.includes('14-day trial') ||
          (href && (href.includes('free-trial') || href.includes('signup') || href.includes('sign-up')));

        if (isBookDemo) {
          if (window.location.pathname.includes('/book-a-demo')) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        } else if (isFreeTrialOrSignup) {
          e.preventDefault();
          e.stopPropagation();
          setIsRedirecting(true);
          
          // Redirect after 1.8 seconds
          setTimeout(() => {
            window.location.href = 'https://app.360airo.com/';
          }, 1800);

          // Auto-close redirection pop-up after 3.0 seconds total
          setTimeout(() => {
            setIsRedirecting(false);
          }, 3000);
        }
      }
    };

    // Listen on the capture phase so we can prevent Next.js client-side router navigation
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('open-book-demo-modal', handleOpenModal);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return (
    <>
      <BookDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      {isRedirecting && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 8, 16, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Outfit', sans-serif",
          color: '#fff',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '40px 32px',
            maxWidth: '460px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
            {/* Spinning Loader */}
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(59, 130, 246, 0.2)',
              borderTop: '3px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginBottom: '24px'
            }} />
            
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#fff' }}>
              Redirecting to 360Airo App
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', margin: 0 }}>
              Please sign up to activate your 14-day free trial and start scaling your outbound sales outreach.
            </p>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />
        </div>
      )}
    </>
  );
}
