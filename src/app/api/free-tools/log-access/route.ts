import { NextRequest, NextResponse } from 'next/server';
import { dbLogAccess } from '@/lib/free-tools-db';

export async function POST(request: NextRequest) {
  try {
    const { email, toolName } = await request.json();

    if (!email || !toolName) {
      return NextResponse.json(
        { error: 'email and toolName are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Log access (will write to Supabase and log locally as fallback)
    await dbLogAccess(normalizedEmail, toolName);

    return NextResponse.json(
      { success: true, message: 'Free tool access logged successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ [LOG ACCESS] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
