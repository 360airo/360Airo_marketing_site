import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '../send-otp/route';
import { addVerifiedEmail } from '../verified-emails';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();
    console.log(`📧 [GLOBAL VERIFY] Checking OTP for ${normalizedEmail}`);
    console.log(`📧 [GLOBAL VERIFY] OTP Store size: ${otpStore.size}, Keys: ${Array.from(otpStore.keys()).join(', ')}`);

    const storedData = otpStore.get(normalizedEmail);

    if (!storedData) {
      return NextResponse.json(
        { error: 'OTP not found or expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const now = Date.now();
    if (now > storedData.expires) {
      otpStore.delete(normalizedEmail);
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const receivedOtp = String(otp).trim();
    const storedOtp = String(storedData.otp).trim();

    console.log(`📧 [GLOBAL VERIFY] Comparing OTPs - Received: "${receivedOtp}" vs Stored: "${storedOtp}"`);

    if (storedOtp !== receivedOtp) {
      console.log(`❌ [GLOBAL VERIFY] Invalid OTP for ${normalizedEmail}`);
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    // OTP is valid
    otpStore.delete(normalizedEmail);

    // Save verified email to file
    const saved = addVerifiedEmail(normalizedEmail);
    if (!saved) {
      console.warn(`⚠️ Failed to save verified email: ${normalizedEmail}`);
    }

    console.log(`✅ [GLOBAL VERIFY] Email verified: ${normalizedEmail}`);

    return NextResponse.json(
      { success: true, message: 'Email verified successfully', email: normalizedEmail },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [GLOBAL VERIFY] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
