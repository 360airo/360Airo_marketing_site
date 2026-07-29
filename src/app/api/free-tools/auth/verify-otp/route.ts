import { NextRequest, NextResponse } from 'next/server';
import { dbVerifyOTP } from '@/lib/free-tools-db';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP code are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log(`🔐 [VERIFY OTP] Checking OTP for ${normalizedEmail}...`);

    const verified = await dbVerifyOTP(normalizedEmail, String(otp));

    if (verified) {
      console.log(`✅ [VERIFY OTP] Email successfully verified: ${normalizedEmail}`);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email verified successfully. Access granted!', 
          email: normalizedEmail 
        },
        { status: 200 }
      );
    } else {
      console.log(`❌ [VERIFY OTP] Invalid or expired OTP code for ${normalizedEmail}`);
      return NextResponse.json(
        { error: 'Invalid or expired verification code. Please request a new one.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ [VERIFY OTP] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
