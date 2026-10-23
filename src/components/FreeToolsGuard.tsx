'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useFreeToolsAuth } from '../app/contexts/FreeToolsAuthContext';
import { Mail, Sparkles, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

interface FreeToolsGuardProps {
  children: React.ReactNode;
}

export default function FreeToolsGuard({ children }: FreeToolsGuardProps) {
  const pathname = usePathname();
  const { email, isVerified, verifyEmail } = useFreeToolsAuth();

  const [inputEmail, setInputEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if current path is a free tool (exclude free-tools index, admin page, and api routes)
  const isGuardedRoute = 
    pathname.startsWith('/free-tools/') && 
    pathname !== '/free-tools' && 
    pathname !== '/free-tools/admin';

  // Sync access logs once verified
  useEffect(() => {
    if (isGuardedRoute && isVerified && email) {
      const toolName = pathname.replace('/free-tools/', '');
      console.log(`Logging access for ${email} on tool: ${toolName}`);
      fetch('/api/free-tools/log-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, toolName }),
      }).catch(err => console.warn('Failed to log access:', err));
    }
  }, [isGuardedRoute, isVerified, email, pathname]);

  // Reset scroll position to top when showing the gating screen
  useEffect(() => {
    if (isGuardedRoute && !isVerified) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [isGuardedRoute, isVerified]);

  if (!isGuardedRoute || isVerified) {
    return <>{children}</>;
  }

  // Handle email submission - direct access with no OTP
  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let emailToUse = inputEmail.trim().toLowerCase();
    if (!emailToUse) {
      setError('Please enter your email.');
      return;
    }

    // If user typed only a username (e.g. without domain), default to @gmail.com
    if (!emailToUse.includes('@')) {
      emailToUse = `${emailToUse}@gmail.com`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToUse)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Record access / register user in background
      await fetch('/api/free-tools/auth/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToUse }),
      });
    } catch (err) {
      console.warn('Access record request warning:', err);
    }

    // Immediately grant verified access in context and localStorage
    verifyEmail(emailToUse);
    setIsLoading(false);
  };

  return (
    <div className="ft-guard-container" style={styles.container}>
      <div className="ft-guard-card" style={styles.card}>
        <div style={styles.badge}>
          <Sparkles size={16} color="#a78bfa" />
          <span>Free Instant Access</span>
        </div>

        <div>
          <h2 style={styles.title}>Unlock Free Tools</h2>
          <p style={styles.subtitle}>
            Enter your email to get instant, unlimited access to our outbound analytics, deliverability tests, and email calculators.
          </p>

          <form onSubmit={handleAccess} style={styles.form}>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.inputIcon} />
              <input
                type="text"
                required
                placeholder="name@gmail.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                style={styles.input}
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && (
              <div style={styles.errorContainer}>
                <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span style={styles.errorText}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !inputEmail.trim()}
              style={{
                ...styles.submitButton,
                opacity: isLoading || !inputEmail.trim() ? 0.7 : 1,
                cursor: isLoading || !inputEmail.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <>
                  Get Instant Access <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
          
          <p style={styles.footerText}>
            ⚡ No password or OTP required. Type your email and get in immediately.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

// Inline CSS for the high-end premium Glassmorphism look
const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #090514 0%, #150d2a 100%)',
    position: 'relative' as const,
    zIndex: 10,
    borderRadius: '24px',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    padding: '40px 32px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
    textAlign: 'center' as const,
    color: '#f8fafc',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '999px',
    background: 'rgba(167, 139, 250, 0.1)',
    border: '1px solid rgba(167, 139, 250, 0.2)',
    color: '#c084fc',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 12px 0',
    fontFamily: '"Outfit", sans-serif',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '15px',
    lineHeight: 1.6,
    color: '#94a3b8',
    margin: '0 0 32px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    alignItems: 'stretch',
  },
  inputWrapper: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute' as const,
    left: '16px',
    color: '#64748b',
    pointerEvents: 'none' as const,
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    borderRadius: '12px',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    border: 'none',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
    transition: 'all 0.2s',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'left' as const,
  },
  errorText: {
    fontSize: '13px',
    color: '#fca5a5',
    lineHeight: 1.4,
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '20px',
    lineHeight: 1.5,
  },
};
