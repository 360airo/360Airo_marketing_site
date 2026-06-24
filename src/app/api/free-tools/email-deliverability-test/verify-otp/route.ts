import { NextRequest, NextResponse } from 'next/server';
import { otpStore, verifiedEmails } from '../otp-store';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    console.log(`📧 [VERIFY] Received request - Email: ${email}, OTP: ${otp}`);
    console.log(`📧 [VERIFY] OTP Store size: ${otpStore.size}`);
    console.log(`📧 [VERIFY] All emails in store:`, Array.from(otpStore.keys()));

    if (!email || !otp) {
      console.error(`❌ [VERIFY] Missing email or OTP`);
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Get the OTP from the shared store
    const storedData = otpStore.get(email);

    console.log(`📧 [VERIFY] Stored data for ${email}:`, storedData ? { otp: storedData.otp, expiresIn: storedData.expires - Date.now() } : 'NOT FOUND');

    // Check if OTP exists and hasn't expired
    if (!storedData) {
      console.error(`❌ [VERIFY] OTP not found for ${email}`);
      return NextResponse.json(
        { error: 'OTP not found or expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const now = Date.now();
    if (now > storedData.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Check if OTP matches (compare as strings)
    const receivedOtp = String(otp).trim();
    const storedOtp = String(storedData.otp).trim();
    
    console.log(`📧 [VERIFY] OTP Comparison:`);
    console.log(`  Stored: "${storedOtp}" (length: ${storedOtp.length})`);
    console.log(`  Received: "${receivedOtp}" (length: ${receivedOtp.length})`);
    console.log(`  Match: ${storedOtp === receivedOtp}`);

    if (storedOtp !== receivedOtp) {
      console.log(`❌ [VERIFY] Invalid OTP attempt for ${email}. Expected: ${storedOtp}, Got: ${receivedOtp}`);
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    // OTP is valid - mark email as verified
    otpStore.delete(email); // Remove used OTP
    verifiedEmails.add(email);

    console.log(`✅ [VERIFY] Email verified: ${email}`);

    return NextResponse.json(
      { success: true, message: 'Email verified successfully', email },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ [VERIFY] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
