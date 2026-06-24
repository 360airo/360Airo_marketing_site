import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MAX_DAILY_CREDITS = 10;

/**
 * Checks if a user has daily credits left, and if so, consumes 1 credit.
 * Returns the check status and remaining credits.
 */
export async function checkAndConsumeCredit(userId: string): Promise<{
  allowed: boolean;
  creditsRemaining?: number;
  error?: string;
}> {
  if (!userId) {
    return { allowed: false, error: 'User ID is required' };
  }

  const today = new Date().toISOString().split('T')[0];

  try {
    // Get current usage
    const { data: existingUsage, error: fetchError } = await supabase
      .from('free_tool_daily_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Fetch usage error in lib:', fetchError);
      return { allowed: false, error: 'Database check failed' };
    }

    const currentCount = existingUsage ? existingUsage.usage_count : 0;

    if (currentCount >= MAX_DAILY_CREDITS) {
      return {
        allowed: false,
        error: 'Credit limit reached. 10/10 credits used today.',
        creditsRemaining: 0,
      };
    }

    const nextCount = currentCount + 1;

    if (existingUsage) {
      const { error: updateError } = await supabase
        .from('free_tool_daily_usage')
        .update({
          usage_count: nextCount,
          last_used_at: new Date().toISOString(),
        })
        .eq('id', existingUsage.id);

      if (updateError) {
        console.error('Update usage error in lib:', updateError);
        return { allowed: false, error: 'Failed to update credit usage' };
      }
    } else {
      const { error: insertError } = await supabase
        .from('free_tool_daily_usage')
        .insert({
          user_id: userId,
          usage_date: today,
          usage_count: 1,
          last_used_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Insert usage error in lib:', insertError);
        return { allowed: false, error: 'Failed to log credit usage' };
      }
    }

    return {
      allowed: true,
      creditsRemaining: Math.max(0, MAX_DAILY_CREDITS - nextCount),
    };
  } catch (error) {
    console.error('checkAndConsumeCredit error:', error);
    return { allowed: false, error: 'Internal server error checking credits' };
  }
}
