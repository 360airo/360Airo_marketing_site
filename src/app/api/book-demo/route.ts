import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

// Reusable Nodemailer Transporter using environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

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

    let supabaseSaved = false;
    let insertDataResult = null;

    // Fail-safe Supabase database insert to prevent offline database DNS errors from crashing submission
    try {
      const { data, error } = await supabase
        .from('book_demo')
        .upsert(insertData, { onConflict: 'email' })
        .select();

      if (error) {
        console.error('Supabase error inserting demo booking:', error);
      } else {
        insertDataResult = data;
        supabaseSaved = true;
      }
    } catch (dbErr: any) {
      console.error('Supabase network/connection error on demo booking:', dbErr.message || dbErr);
    }

    // Send Formally Confirmation Email to the recipient lead on behalf of 360Airo
    let emailSent = false;
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <img src="https://dnbgjzscuxrlbceqsrhz.supabase.co/storage/v1/object/public/comany_logo_for_resue/FinalLogo_icon_transparent%20(1).png" alt="360Airo Logo" style="height: 36px; width: auto; vertical-align: middle;" />
            <span style="font-family: 'Outfit', 'Helvetica Neue', Arial, sans-serif; font-size: 28px; font-weight: bold; vertical-align: middle; letter-spacing: -0.03em;">
              <span style="color: #0F172A;">360</span><span style="color: #0052FF;">Airo</span>
            </span>
          </div>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for booking a demo with 360Airo! We are excited to show you how to scale your outreach and automate your GTM campaigns.</p>
          <p>Your demo session has been scheduled successfully. Here are your booking details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #f0f0f0;">
            <h4 style="margin-top: 0; color: #555555;">Booking Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #eeeeee;">Date:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${dateFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Time:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${demoTime}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Timezone:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${timezone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Organization:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${orgName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Phone Number:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${countryCode || '+1'} ${phone}</td>
              </tr>
            </table>
          </div>
          
          <p>A calendar invitation containing the meeting link (Google Meet / Zoom) will be sent to this email address shortly.</p>
          <p>If you need to reschedule or cancel your session, please feel free to reply directly to this email.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777777; text-align: center;">
            Best regards,<br />
            <strong>The 360Airo Team</strong><br />
            <a href="https://360airo.com" style="color: #0052ff; text-decoration: none;">360airo.com</a>
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"360Airo" <${process.env.SMTP_USER || 'Info@360airo.com'}>`,
        to: email,
        subject: 'Your demo booking is confirmed! - 360Airo',
        html: emailHtml
      });
      emailSent = true;
      console.log(`Demo booking confirmation email sent to ${email}`);

      // Internal lead notification to the GTM / Sales team
      try {
        const teamEmailHtml = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="background-color: #0052ff; color: #ffffff; padding: 15px; text-align: center; border-radius: 6px 6px 0 0;">
              <h2 style="margin: 0; font-size: 20px; font-family: 'Outfit', sans-serif;">New Demo Booked!</h2>
            </div>
            <p>Hello Team,</p>
            <p>A new lead has just scheduled a demo session on 360Airo website. Here are the details:</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #f0f0f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #eeeeee;">Name:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Email:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Phone:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${countryCode || '+1'} ${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Organization:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${orgName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Employee Size:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${employeeSize || '1-10'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Date & Time:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${dateFormatted} at ${demoTime} (${timezone})</td>
                </tr>
              </table>
            </div>
            <p style="font-size: 12px; color: #777777; text-align: center;">
              This notification was generated automatically by 360Airo Lead Capture.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"360Airo Lead Alerts" <${process.env.SMTP_USER || 'Info@360airo.com'}>`,
          to: 'Harish.k@globopersona.com, info@360airo.com, nihal.y@globopersona.com',
          subject: `⚡ New Demo Booked: ${firstName} ${lastName} (${orgName})`,
          html: teamEmailHtml
        });
        console.log(`Internal demo lead notification sent to GTM team.`);
      } catch (teamEmailErr: any) {
        console.error('Nodemailer error sending internal team notification:', teamEmailErr.message || teamEmailErr);
      }
    } catch (emailErr: any) {
      console.error('Nodemailer error sending demo confirmation:', emailErr.message || emailErr);
    }

    // Trigger webhook if configured (e.g. to feed Excel sheet via Power Automate/Zapier)
    const webhookUrl = process.env.DEMO_BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: `'${countryCode || '+1'} ${phone}`,
            organization: orgName,
            employeeSize: employeeSize || '1-10',
            demoDate: dateFormatted,
            demoTime: time24h,
            timezone,
            teamType: teamType || 'small-team',
            bookedAt: new Date().toISOString()
          }),
        });
        if (!webhookResponse.ok) {
          console.error(`Webhook returned status ${webhookResponse.status}`);
        }
      } catch (webhookErr) {
        console.error('Failed to send data to webhook:', webhookErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      supabaseSaved,
      emailSent,
      data: insertDataResult 
    });
  } catch (err: any) {
    console.error('Error handling demo booking submission:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
