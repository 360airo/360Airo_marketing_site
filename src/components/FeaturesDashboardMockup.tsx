"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function FeaturesDashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [iframeSrc, setIframeSrc] = useState('/features-dashboard.html');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const width = container.offsetWidth;
      // Target desktop dashboard layout width (1600px)
      const virtualWidth = 1600;
      setScale(width / virtualWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Update theme inside iframe whenever the theme state changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        if (iframeDoc && iframeDoc.documentElement) {
          iframeDoc.documentElement.setAttribute('data-theme', theme);
        }
      } catch (err) {
        console.error("Error updating theme on iframe element:", err);
      }
    }
  }, [theme]);

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const iframeWin = iframeRef.current.contentWindow;
        const iframeDoc = iframeRef.current.contentDocument || iframeWin.document;

        // Apply current theme to newly loaded iframe content
        iframeDoc.documentElement.setAttribute('data-theme', theme);
        
        // Forward wheel events to parent window so GSAP scrolling continues normally
        iframeWin.addEventListener('wheel', (e) => {
          window.dispatchEvent(new WheelEvent('wheel', {
            deltaY: e.deltaY,
            deltaX: e.deltaX,
            deltaMode: e.deltaMode,
            bubbles: true,
          }));
        }, { passive: true });

        // Setup click listener inside the iframe to catch tab changes and theme toggles
        iframeDoc.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;

          // Catch clicks on views switching to load separate dashboard/inbox pages
          const viewBtn = target.closest('[data-target-view]');
          if (viewBtn) {
            const targetView = viewBtn.getAttribute('data-target-view');
            if (targetView === 'inbox') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-inbox.html');
            } else if (targetView === 'dashboard') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-dashboard.html');
            } else if (targetView === 'performance') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-performance.html');
            } else if (targetView === 'email-sequence') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-email-sequence.html');
            } else if (targetView === 'scheduled-event') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-scheduled-event.html');
            }
          }

          // Catch sidebar section clicks to load default pages for sections
          const sectionBtn = target.closest('[data-section-target]');
          if (sectionBtn) {
            const defaultView = sectionBtn.getAttribute('data-default-view');
            if (defaultView === 'email-sequence') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-email-sequence.html');
            } else if (defaultView === 'dashboard') {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              setIframeSrc('/features-dashboard.html');
            }
          }

          // Catch theme switch button clicks to persist current theme in React state
          const themeBtn = target.closest('#themeToggle');
          if (themeBtn) {
            // Read data-theme value right after theme toggle logic fires
            setTimeout(() => {
              const newTheme = iframeDoc.documentElement.getAttribute('data-theme') || 'light';
              setTheme(newTheme);
            }, 50);
          }
        }, true);

      } catch (err) {
        console.error("Error setting up iframe event forwarding:", err);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        position: 'relative'
      }}
    >
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        onLoad={handleIframeLoad}
        style={{
          width: `calc(100% / var(--iframe-scale, ${scale}))`,
          height: `calc(100% / var(--iframe-scale, ${scale}))`,
          border: 'none',
          position: 'absolute',
          top: '0',
          left: '0',
          transform: `scale(var(--iframe-scale, ${scale}))`,
          transformOrigin: 'top left',
          pointerEvents: 'auto',
        }}
        title="360Airo Features Dashboard Mockup"
        scrolling="no"
      />
    </div>
  );
}
