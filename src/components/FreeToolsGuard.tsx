'use client';

import React from 'react';

interface FreeToolsGuardProps {
  children: React.ReactNode;
}

export default function FreeToolsGuard({ children }: FreeToolsGuardProps) {
  // Free tools are completely open with no email wall or authentication required
  return <>{children}</>;
}
