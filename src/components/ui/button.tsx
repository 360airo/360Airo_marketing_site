'use client';

import React from 'react';

export function Button({ children, ...props }: any) {
  return (
    <button {...props} style={{padding: '8px 12px', borderRadius: 6, background: '#1a244d', color: '#fff', border: 'none'}}>
      {children}
    </button>
  );
}
