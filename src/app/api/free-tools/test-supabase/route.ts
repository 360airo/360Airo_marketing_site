import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Test 1: Check if we can connect to Supabase
    const { error: connectionError } = await supabase
      .from('free_tool_users')
      .select('count')
      .limit(1);

    if (connectionError) {
      return NextResponse.json(
        {
          status: 'connection_failed',
          error: connectionError.message,
          details: connectionError,
        },
        { status: 500 }
      );
    }

    // Test 2: Get user count
    const { data: userCountData, error: userCountError } = await supabase
      .from('free_tool_users')
      .select('count', { count: 'exact' });

    // Test 3: Get recent users
    const { data: recentUsers, error: recentUsersError } = await supabase
      .from('free_tool_users')
      .select('id, email, email_verified, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    // Test 4: Get access logs
    const { data: accessLogs, error: accessLogsError } = await supabase
      .from('user_free_tool_access')
      .select('*')
      .order('last_accessed_at', { ascending: false })
      .limit(5);

    // Test 5: Get OTP logs
    const { data: otpLogs, error: otpLogsError } = await supabase
      .from('free_tool_otp_codes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json(
      {
        status: 'connected',
        message: 'Supabase connection successful',
        configuration: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        },
        tables: {
          free_tool_users: {
            status: 'ok',
            totalCount: 'Check dashboard for accurate count',
            recentUsers: recentUsers || [],
            error: recentUsersError?.message || null,
          },
          user_free_tool_access: {
            status: 'ok',
            recentLogs: accessLogs || [],
            error: accessLogsError?.message || null,
          },
          free_tool_otp_codes: {
            status: 'ok',
            recentLogs: otpLogs || [],
            error: otpLogsError?.message || null,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        hint: 'Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local',
      },
      { status: 500 }
    );
  }
}
