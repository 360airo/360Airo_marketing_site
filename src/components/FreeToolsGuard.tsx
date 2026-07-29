'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useFreeToolsAuth } from '../app/contexts/FreeToolsAuthContext';
import { Mail, Key, ShieldCheck, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

interface FreeToolsGuardProps {
  children: React.ReactNode;
}

export default function FreeToolsGuard({ children }: FreeToolsGuardProps) {
  const pathname = usePathname();
  const { email, isVerified, verifyEmail } = useFreeToolsAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [inputEmail, setInputEmail] = useState('');
  const [otpCodes, setOtpCodes] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [resendTimer, setResendTimer] = useState<number>(0);

  const otpInputsRef = useRef<HTMLInputElement[]>([]);

  // Check if current path is a free tool (exclude free-tools index, admin page, and api routes)
  const isGuardedRoute = 
    pathname.startsWith('/free-tools/') && 
    pathname !== '/free-tools' && 
    pathname !== '/free-tools/admin';

  // Timer logic for OTP expiry (2 minutes)
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Timer logic for OTP resend limit (60 seconds)
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

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

  // Reset scroll position to top when showing the OTP gating screen
  useEffect(() => {
    if (isGuardedRoute && !isVerified) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [isGuardedRoute, isVerified, step]);

  if (!isGuardedRoute || isVerified) {
    return <>{children}</>;
  }

  // Handle email submission
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/free-tools/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setStep(2);
      setTimer(120); // 2 minutes
      setResendTimer(60); // 60 seconds resend limit
      // Auto-focus first OTP input after DOM renders
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP digit inputs change
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCodes = [...otpCodes];
    // Keep only last character if multiple entered
    newCodes[index] = value.slice(-1);
    setOtpCodes(newCodes);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto trigger verify if last input filled
    const fullOtp = newCodes.join('');
    if (fullOtp.length === 6 && index === 5) {
      triggerVerifyOtp(fullOtp);
    }
  };

  // Handle backspaces in OTP fields
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCodes[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Direct paste support for OTP code
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pasteData.trim())) {
      const digits = pasteData.trim().split('');
      setOtpCodes(digits);
      triggerVerifyOtp(pasteData.trim());
      e.preventDefault();
    }
  };

  // Trigger verify API
  const triggerVerifyOtp = async (code: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/free-tools/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail, otp: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      // Success
      verifyEmail(inputEmail);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
      // Highlight boxes red on error
      setOtpCodes(Array(6).fill(''));
      otpInputsRef.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Format countdown timer (MM:SS)
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="ft-guard-container" style={styles.container}>
      <div className="ft-guard-card" style={styles.card}>
        <div style={styles.badge}>
          <ShieldCheck size={20} color="#a78bfa" />
          <span>Access Authorization</span>
        </div>

        {step === 1 ? (
          <div>
            <h2 style={styles.title}>Unlock Free Tools</h2>
            <p style={styles.subtitle}>
              Verify your company email to unlock our complete suite of outbound analytics and delivery testing tools instantly.
            </p>

            <form onSubmit={handleSendOtp} style={styles.form}>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.inputIcon} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
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
                disabled={isLoading || !inputEmail}
                style={{
                  ...styles.submitButton,
                  opacity: isLoading || !inputEmail ? 0.7 : 1,
                  cursor: isLoading || !inputEmail ? 'not-allowed' : 'pointer',
                }}
              >
                {isLoading ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <>
                    Send Verification Code <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
            
            <p style={styles.footerText}>
              🛡️ We require a corporate email domain to prevent abuse. Public email domains (gmail, yahoo, etc.) are restricted.
            </p>
          </div>
        ) : (
          <div>
            <h2 style={styles.title}>Enter Verification Code</h2>
            <p style={styles.subtitle}>
              We sent a 6-digit code to <strong style={{ color: '#a78bfa' }}>{inputEmail}</strong>. Please enter it below.
            </p>

            <div style={styles.form}>
              <div style={styles.otpGrid}>
                {otpCodes.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      if (el) otpInputsRef.current[idx] = el;
                    }}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    style={styles.otpBox}
                    disabled={isLoading}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <div style={styles.timerRow}>
                {timer > 0 ? (
                  <span style={styles.timerText}>
                    Code expires in: <strong style={{ color: '#f43f5e' }}>{formatTimer(timer)}</strong>
                  </span>
                ) : (
                  <span style={{ ...styles.timerText, color: '#ef4444' }}>Code expired. Please request a new one.</span>
                )}
              </div>

              {error && (
                <div style={styles.errorContainer}>
                  <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                  <span style={styles.errorText}>{error}</span>
                </div>
              )}

              <div style={styles.actionsRow}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={styles.backButton}
                  disabled={isLoading}
                >
                  Change Email
                </button>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{
                    ...styles.resendButton,
                    opacity: resendTimer > 0 || isLoading ? 0.5 : 1,
                    cursor: resendTimer > 0 || isLoading ? 'not-allowed' : 'pointer',
                  }}
                  disabled={resendTimer > 0 || isLoading}
                >
                  {resendTimer > 0 ? `Resend Code (${resendTimer}s)` : 'Resend Code'}
                </button>
              </div>
            </div>
          </div>
        )}
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
    padding: '6px 12px',
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
    color: '#64748b',
    marginTop: '20px',
    lineHeight: 1.5,
  },
  otpGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '8px',
    margin: '12px 0',
  },
  otpBox: {
    width: '100%',
    height: '56px',
    borderRadius: '10px',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'center' as const,
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: '"Outfit", monospace',
  },
  timerRow: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '13px',
  },
  timerText: {
    color: '#94a3b8',
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '8px',
  },
  backButton: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#cbd5e1',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  resendButton: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    background: 'transparent',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: '#a78bfa',
    fontSize: '13px',
    fontWeight: 600,
    transition: 'all 0.2s',
  },
};
