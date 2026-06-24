import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Email Test Endpoint ===');
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
    console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    // Test email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('✅ Email transporter verified successfully!');

    return NextResponse.json(
      {
        status: 'ok',
        message: 'Email configuration is correct',
        config: {
          gmail_user: process.env.GMAIL_USER,
          has_password: !!process.env.GMAIL_APP_PASSWORD,
          has_supabase_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email test error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        code: error.code,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
