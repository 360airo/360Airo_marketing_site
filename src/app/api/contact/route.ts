import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interestedIn, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required fields.' },
        { status: 400 }
      );
    }

    const insertData = {
      name,
      email,
      phone_number: phone || null,
      interested_in: interestedIn || null,
      how_can_we_help: message || null
    };

    // Insert into Supabase table public.contact_us
    const { data, error } = await supabase
      .from('contact_us')
      .insert(insertData)
      .select();

    if (error) {
      console.error('Supabase error inserting into contact_us:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Trigger Google Apps Script Webhook
    const webhookUrl = process.env.CONTACT_US_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxjqQqTnJCC6jWWaILBVXRRZE3GC1T5oDuumcfZCOO9M48_VtuJK7WDiP-S6O3sGcmBnw/exec';
    
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '',
          phone_number: phone || '',
          phoneNumber: phone || '',
          interestedIn: interestedIn || '',
          interested_in: interestedIn || '',
          message: message || '',
          how_can_we_help: message || '',
          howCanWeHelp: message || '',
          submittedAt: new Date().toISOString()
        }),
      });

      if (!webhookResponse.ok) {
        console.error(`Google Sheet Webhook returned status ${webhookResponse.status}`);
      }
    } catch (webhookErr) {
      console.error('Failed to trigger Google Sheet Webhook:', webhookErr);
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error handling contact form submission:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
