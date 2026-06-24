import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/email-deliverability-db';

export async function GET(req: NextRequest) {
  try {
    console.log('✅ Fetching real sent emails from database...');

    // Get all emails user actually marked as sent
    const sentEmails = db.getSentEmails();

    // Convert to frontend format
    const statuses = sentEmails.map(email => ({
      test_id: email.test_id,
      email: email.recipient_email,
      sent_from: email.sent_from,
      provider: email.provider,
      status: email.status,
      folder_location: email.folder_location,
      opened_count: email.opened_count,
      clicked_count: email.clicked_count,
      sent_timestamp: email.marked_sent_at,
    }));

    console.log(`📊 Returning ${statuses.length} sent emails (not mock data)`);

    return NextResponse.json({
      success: true,
      count: statuses.length,
      statuses: statuses,
      message: 'Real sent emails from database (IMAP verified)',
      note: 'Only showing emails user actually marked as sent + IMAP verified'
    }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching delivery statuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch delivery statuses' },
      { status: 500 }
    );
  }
}
