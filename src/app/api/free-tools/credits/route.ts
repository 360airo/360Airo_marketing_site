import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_DAILY_CREDITS = 10;

// GET: Fetch remaining credits for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    // Fetch daily usage for today
    const { data: usageData, error: fetchError } = await supabase
      .from('free_tool_daily_usage')
      .select('usage_count')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch daily usage error:', fetchError);
      return NextResponse.json({ error: 'Database fetch failed' }, { status: 500 });
    }

    const usageCount = usageData ? usageData.usage_count : 0;
    const creditsRemaining = Math.max(0, MAX_DAILY_CREDITS - usageCount);

    return NextResponse.json({
      creditsRemaining,
      maxCredits: MAX_DAILY_CREDITS,
      today,
    });
  } catch (error) {
    console.error('Credits GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Consume 1 credit
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    // Get current usage inside a transaction-like select/insert flow
    const { data: existingUsage, error: fetchError } = await supabase
      .from('free_tool_daily_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch usage error:', fetchError);
      return NextResponse.json({ error: 'Database fetch failed' }, { status: 500 });
    }

    const currentCount = existingUsage ? existingUsage.usage_count : 0;

    if (currentCount >= MAX_DAILY_CREDITS) {
      return NextResponse.json(
        { error: 'Credit limit reached. 10/10 credits used today.', creditsRemaining: 0 },
        { status: 429 }
      );
    }

    const nextCount = currentCount + 1;

    if (existingUsage) {
      // Update
      const { error: updateError } = await supabase
        .from('free_tool_daily_usage')
        .update({
          usage_count: nextCount,
          last_used_at: new Date().toISOString(),
        })
        .eq('id', existingUsage.id);

      if (updateError) {
        console.error('Update usage error:', updateError);
        return NextResponse.json({ error: 'Failed to update credit usage' }, { status: 500 });
      }
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('free_tool_daily_usage')
        .insert({
          user_id: userId,
          usage_date: today,
          usage_count: 1,
          last_used_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Insert usage error:', insertError);
        return NextResponse.json({ error: 'Failed to log credit usage' }, { status: 500 });
      }
    }

    const creditsRemaining = Math.max(0, MAX_DAILY_CREDITS - nextCount);

    return NextResponse.json({
      success: true,
      creditsRemaining,
      maxCredits: MAX_DAILY_CREDITS,
    });
  } catch (error) {
    console.error('Credits POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
