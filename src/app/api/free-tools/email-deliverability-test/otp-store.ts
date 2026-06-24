// Use Node.js global object to persist across module reloads
declare global {
  var emailOtpStore: Map<string, { otp: string; timestamp: number; expires: number }> | undefined;
  var emailVerifiedSet: Set<string> | undefined;
}

// Initialize global store
if (!global.emailOtpStore) {
  global.emailOtpStore = new Map<string, { otp: string; timestamp: number; expires: number }>();
}
if (!global.emailVerifiedSet) {
  global.emailVerifiedSet = new Set<string>();
}

export const otpStore = global.emailOtpStore;
export const verifiedEmails = global.emailVerifiedSet;

// Clean up expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  otpStore.forEach((data, email) => {
    if (now > data.expires) {
      otpStore.delete(email);
      console.log(`🧹 [OTP] Cleaned up expired OTP for ${email}`);
    }
  });
}, 300000);

console.log('✅ [OTP Store] Global OTP store initialized');

