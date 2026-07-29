'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FreeToolsAuthContextType {
  email: string | null;
  isVerified: boolean;
  verifyEmail: (email: string) => void;
  logout: () => void;
  // Kept for backward compatibility/shims if any:
  apiKey: string;
  setApiKey: (k: string) => void;
  clearApiKey: () => void;
  isApiKeyConfigured: boolean;
  consumeCredit: (n?: number) => boolean;
}

const FreeToolsAuthContext = createContext<FreeToolsAuthContextType | undefined>(undefined);

export function FreeToolsAuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem('360airo_free_tools_email');
      const verifiedStatus = localStorage.getItem('360airo_free_tools_verified');
      
      if (storedEmail && verifiedStatus === 'true') {
        setEmail(storedEmail);
        setVerified(true);
      }
    } catch (e) {
      console.error('LocalStorage load error:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const verifyEmail = (userEmail: string) => {
    const normalizedEmail = userEmail.toLowerCase().trim();
    setEmail(normalizedEmail);
    setVerified(true);
    try {
      localStorage.setItem('360airo_free_tools_email', normalizedEmail);
      localStorage.setItem('360airo_free_tools_verified', 'true');
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  };

  const logout = () => {
    setEmail(null);
    setVerified(false);
    try {
      localStorage.removeItem('360airo_free_tools_email');
      localStorage.removeItem('360airo_free_tools_verified');
    } catch (e) {
      console.error('LocalStorage remove error:', e);
    }
  };

  // Shim/Placeholder fields for compatibility:
  const apiKey = '';
  const setApiKey = () => {};
  const clearApiKey = () => {};
  const isApiKeyConfigured = false;
  const consumeCredit = () => true;

  return (
    <FreeToolsAuthContext.Provider
      value={{
        email,
        isVerified,
        verifyEmail,
        logout,
        apiKey,
        setApiKey,
        clearApiKey,
        isApiKeyConfigured,
        consumeCredit,
      }}
    >
      {isHydrated ? children : <div style={{ minHeight: '100vh', background: '#0a0014' }} />}
    </FreeToolsAuthContext.Provider>
  );
}

export function useFreeToolsAuth() {
  const context = useContext(FreeToolsAuthContext);
  if (context === undefined) {
    // Return a default shim for safety outside the provider
    return {
      email: null,
      isVerified: false,
      verifyEmail: (e: string) => {},
      logout: () => {},
      apiKey: '',
      setApiKey: (k: string) => {},
      clearApiKey: () => {},
      isApiKeyConfigured: false,
      consumeCredit: (n = 1) => true,
    };
  }
  return context;
}
