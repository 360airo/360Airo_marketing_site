import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/email-deliverability-db';

export async function POST(req: NextRequest) {
  try {
    console.log(`\n📝 [RECORD-SEND] Request received`);
    const body = await req.json();
    console.log(`📝 [RECORD-SEND] Body:`, JSON.stringify(body));
    
    const { test_email_id, recipient_email, sent_from_email } = body;

    if (!test_email_id || !recipient_email || !sent_from_email) {
      console.error(`❌ [RECORD-SEND] Missing fields. Got:`, { test_email_id, recipient_email, sent_from_email });
      return NextResponse.json(
        { error: 'Missing required fields', received: { test_email_id, recipient_email, sent_from_email } },
        { status: 400 }
      );
    }

    // Infer provider from email domain
    const domain = sent_from_email.split('@')[1]?.toLowerCase() || 'unknown';
    let provider = 'custom';
    if (domain.includes('gmail.com')) provider = 'gmail';
    else if (domain.includes('outlook.com') || domain.includes('hotmail.com')) provider = 'outlook';
    else if (domain.includes('yahoo.com')) provider = 'yahoo';
    else if (domain.includes('zoho.com')) provider = 'zoho';

    console.log(`📝 [RECORD-SEND] Provider detected: ${provider} (domain: ${domain})`);

    // Record the sent email in database
    db.addSentEmail({
      test_id: test_email_id,
      recipient_email,
      sent_from: sent_from_email,
      provider,
      marked_sent_at: new Date().toISOString(),
      status: 'sent',
      folder_location: 'Unresolved', // Simple tool - just mark as sent
      opened_count: 0,
      clicked_count: 0,
    });

    console.log(`✅ [RECORD-SEND] Email recorded successfully`);

    return NextResponse.json({
      success: true,
      message: 'Email marked as sent',
      test_email_id,
      recipient_email,
      sent_from: sent_from_email,
      provider,
    }, { status: 200 });
  } catch (error) {
    console.error('❌ [RECORD-SEND] Error:', error);
    return NextResponse.json(
      { error: 'Failed to record send', details: String(error) },
      { status: 500 }
    );
  }
}
