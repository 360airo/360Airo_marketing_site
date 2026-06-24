'use client';

import React from 'react';

export function Card({ children, className, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} style={{background: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.04)', ...style}} {...rest}>
      {children}
    </div>
  );
}
