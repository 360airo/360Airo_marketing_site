'use client';

import React from 'react';

export default function ProtectedFreeTool({ children, toolName }: { children: React.ReactNode; toolName?: string }) {
  // Shim: no auth gating. Simply render children.
  return (
    <div data-tool-name={toolName}>
      {children}
    </div>
  );
}
