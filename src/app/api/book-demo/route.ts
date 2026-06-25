import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

const getOrganizationName = (email: string, teamType: string) => {
  if (!email) return teamType === 'company' ? 'Company' : 'Small Team';
  const parts = email.split('@');
  if (parts.length < 2) return teamType === 'company' ? 'Company' : 'Small Team';
  const domain = parts[1].toLowerCase();
  
  const publicDomains = [
    'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com',
    'yahoo.com', 'ymail.com', 'aol.com', 'icloud.com', 'mail.com',
    'live.com', 'msn.com', 'zoho.com', 'proton.me', 'protonmail.com',
    'gmx.com', 'yandex.com'
  ];
  if (publicDomains.includes(domain)) {
    return teamType === 'company' ? 'Organization' : 'Small Team';
  }
  
  const namePart = domain.split('.')[0];
  return namePart
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatTimeTo24h = (timeStr: string) => {
  const match = timeStr.match(/^(\d{2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '09:00:00';
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  const hoursStr = hours.toString().padStart(2, '0');
  return `${hoursStr}:${minutes}:00`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      employeeSize,
      demoDate,
      demoTime,
      timezone,
      teamType
    } = body;

    if (!firstName || !lastName || !email || !phone || !demoDate || !demoTime || !timezone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orgName = getOrganizationName(email, teamType || 'small-team');
    const time24h = formatTimeTo24h(demoTime);
    
    // Format date as YYYY-MM-DD
    const dateFormatted = new Date(demoDate).toISOString().split('T')[0];

    const insertData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      organization: orgName,
      country_code: countryCode || '+1',
      phone_number: phone,
      phone_extension: null,
      employee_size: employeeSize || '1-10',
      demo_date: dateFormatted,
      demo_time: time24h,
      timezone: timezone
    };

    const { data, error } = await supabase
      .from('book_demo')
      .upsert(insertData, { onConflict: 'email' })
      .select();

    if (error) {
      console.error('Supabase error inserting demo booking:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Error handling demo booking submission:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
