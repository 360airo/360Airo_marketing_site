'use client';

import React from 'react';

// Shim hook used by free-tools pages to manage API key / auth state.
export function useFreeToolsAuth() {
  return {
    apiKey: '',
    setApiKey: (k: string) => {},
    clearApiKey: () => {},
    isApiKeyConfigured: false,
    consumeCredit: (n = 1) => true,
    email: '',
  };
}

export function FreeToolsAuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
