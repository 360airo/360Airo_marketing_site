import { NextRequest, NextResponse } from 'next/server';
import { dbAddVerifiedUser } from '@/lib/free-tools-db';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    let normalizedEmail = email.toLowerCase().trim();

    // If user provided a username without domain, append @gmail.com
    if (!normalizedEmail.includes('@')) {
      normalizedEmail = `${normalizedEmail}@gmail.com`;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Register user in verified list & Supabase in background
    await dbAddVerifiedUser(normalizedEmail);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Access granted!', 
        email: normalizedEmail 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ [AUTH ACCESS] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}
