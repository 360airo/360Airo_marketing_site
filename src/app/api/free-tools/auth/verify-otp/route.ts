import { NextRequest, NextResponse } from 'next/server';
import { dbVerifyOTP, dbAddVerifiedUser } from '@/lib/free-tools-db';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // If no OTP provided, grant direct access without OTP
    if (!otp) {
      await dbAddVerifiedUser(normalizedEmail);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Access granted successfully!', 
          email: normalizedEmail 
        },
        { status: 200 }
      );
    }

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
