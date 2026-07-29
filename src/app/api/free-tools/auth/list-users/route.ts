import { NextRequest, NextResponse } from 'next/server';
import { dbGetVerifiedUsers, dbDeleteUser } from '@/lib/free-tools-db';

export async function GET(req: NextRequest) {
  try {
    const users = await dbGetVerifiedUsers();
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error: any) {
    console.error('❌ [LIST USERS] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'email is required to delete/revoke a user' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    await dbDeleteUser(normalizedEmail);

    return NextResponse.json(
      { success: true, message: `Successfully revoked verification for ${normalizedEmail}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ [DELETE USER] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
