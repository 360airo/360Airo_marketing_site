"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function DashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const width = container.offsetWidth;
      // Target desktop dashboard layout width (1600px for more zoom out)
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
        src="/dashboard-mockup.html"
        style={{
          width: '1600px',
          height: `calc(100% / ${scale})`,
          border: 'none',
          position: 'absolute',
          top: '0',
          left: '0',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'auto',
        }}
        title="360Airo Dashboard Mockup"
        scrolling="no"
      />
    </div>
  );
}
