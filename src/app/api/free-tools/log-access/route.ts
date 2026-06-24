import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, toolName } = await request.json();

    if (!userId || !toolName) {
      return NextResponse.json(
        { error: 'userId and toolName are required' },
        { status: 400 }
      );
    }

    // Check if access record exists
    const { data: existingAccess, error: fetchError } = await supabase
      .from('user_free_tool_access')
      .select('*')
      .eq('user_id', userId)
      .eq('tool_name', toolName)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected for new users)
      console.error('Fetch error:', fetchError);
    }

    if (existingAccess) {
      // Update existing record
      await supabase
        .from('user_free_tool_access')
        .update({
          last_accessed_at: new Date().toISOString(),
          usage_count: (existingAccess.usage_count || 0) + 1,
        })
        .eq('id', existingAccess.id);
    } else {
      // Create new record
      await supabase.from('user_free_tool_access').insert({
        user_id: userId,
        tool_name: toolName,
        usage_count: 1,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Tool access logged' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
