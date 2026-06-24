import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {},
    supabase: {},
    email: {},
    tables: {},
  };

  try {
    // 1. Check Environment Variables
    diagnostics.environment = {
      hasGmailUser: !!process.env.GMAIL_USER,
      hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      gmailUser: process.env.GMAIL_USER || 'NOT SET',
    };

    // 2. Test Supabase Connection
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: pingError } = await supabase
      .from('free_tool_users')
      .select('count', { count: 'exact' })
      .limit(1);

    diagnostics.supabase.connected = !pingError;
    diagnostics.supabase.error = pingError?.message || null;

    // 3. Test Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    try {
      await transporter.verify();
      diagnostics.email.connected = true;
      diagnostics.email.message = 'Email transporter verified successfully';
    } catch (emailError: any) {
      diagnostics.email.connected = false;
      diagnostics.email.error = emailError.message;
      diagnostics.email.code = emailError.code;
    }

    // 4. Check if OTP table exists
    const { data: otpTableData, error: otpTableError } = await supabase
      .from('free_tool_otp_codes')
      .select('count', { count: 'exact' })
      .limit(1);

    diagnostics.tables.free_tool_otp_codes = {
      exists: !otpTableError || otpTableError.code === 'PGRST100',
      error: otpTableError?.message || null,
    };

    // 5. Check free_tool_users table
    const { data: usersData, error: usersError } = await supabase
      .from('free_tool_users')
      .select('count', { count: 'exact' });

    diagnostics.tables.free_tool_users = {
      exists: !usersError,
      error: usersError?.message || null,
    };

    // 6. Check user_free_tool_access table
    const { data: accessData, error: accessError } = await supabase
      .from('user_free_tool_access')
      .select('count', { count: 'exact' })
      .limit(1);

    diagnostics.tables.user_free_tool_access = {
      exists: !accessError,
      error: accessError?.message || null,
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error: any) {
    diagnostics.error = error.message;
    return NextResponse.json(diagnostics, { status: 500 });
  }
}
