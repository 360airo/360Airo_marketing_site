"use client";
import React, { useState, useEffect } from 'react';
import BookDemoModal from './BookDemoModal';

export default function BookDemoModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Custom event listener for manual programmatic triggers
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-book-demo-modal', handleOpenModal);

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
          text === 'book a live demo' ||
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
        }
      }
    };

    // Listen on the capture phase so we can prevent Next.js client-side router navigation
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('open-book-demo-modal', handleOpenModal);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return <BookDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
