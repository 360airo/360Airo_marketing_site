import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/email-deliverability-db';

export async function GET(req: NextRequest) {
  try {
    const sentEmails = db.getSentEmails();
    
    console.log(`\n📋 DEBUG DATABASE STATE:`);
    console.log(`   Total emails in database: ${sentEmails.length}`);
    
    sentEmails.forEach(email => {
      console.log(`   - ID: ${email.test_id}`);
      console.log(`     To: ${email.recipient_email}`);
      console.log(`     From: ${email.sent_from}`);
      console.log(`     Status: ${email.status}`);
      console.log(`     Folder: ${email.folder_location || 'Not set'}`);
      console.log(`     Time: ${email.marked_sent_at}`);
    });
    
    return NextResponse.json({
      debug: true,
      totalEmails: sentEmails.length,
      emails: sentEmails.map(e => ({
        test_id: e.test_id,
        recipient_email: e.recipient_email,
        sent_from: e.sent_from,
        status: e.status,
        folder_location: e.folder_location,
        marked_sent_at: e.marked_sent_at,
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
