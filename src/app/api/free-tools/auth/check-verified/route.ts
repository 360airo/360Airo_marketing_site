import { NextRequest, NextResponse } from 'next/server';
import { isEmailVerified } from '../verified-emails';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const verified = isEmailVerified(email);

    if (verified) {
      console.log(`✅ [CHECK VERIFY] Email is already verified: ${email}`);
      return NextResponse.json(
        { verified: true, message: 'Email is already verified. Access granted!' },
        { status: 200 }
      );
    } else {
      console.log(`❌ [CHECK VERIFY] Email not found in verified list: ${email}`);
      return NextResponse.json(
        { verified: false, message: 'Email not verified. Please get verified again.' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('❌ [CHECK VERIFY] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
