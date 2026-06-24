'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ToolAuthContext = createContext<any>(null);

export function ToolAuthProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setHydrated] = useState(false);
  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Default: no verification required
    setVerified(false);
  }, []);

  return (
    <ToolAuthContext.Provider value={{ isHydrated, isVerified }}>
      {children}
    </ToolAuthContext.Provider>
  );
}

export function useToolAuth() {
  return useContext(ToolAuthContext) || { isHydrated: true, isVerified: false };
}
