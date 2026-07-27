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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyUrl, interestedIn, message } = body;

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
      company_url: companyUrl || null,
      interested_in: interestedIn || null,
      how_can_we_help: message || null
    };

    let supabaseSaved = false;
    let insertDataResult = null;

    // Fail-safe Supabase database insert to prevent connection DNS errors from crashing submission
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .insert(insertData)
        .select();

      if (error) {
        console.error('Supabase execution error inserting into contact_us:', error);
      } else {
        insertDataResult = data;
        supabaseSaved = true;
      }
    } catch (dbErr: any) {
      console.error('Supabase network/connection error:', dbErr.message || dbErr);
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
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to 360Airo! We have successfully received your inquiry regarding <strong>${interestedIn}</strong>.</p>
          <p>Our team is currently reviewing your details, and one of our outbound specialists will get back to you shortly (typically within 24 business hours).</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #f0f0f0;">
            <h4 style="margin-top: 0; color: #555555;">Submission Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 120px; border-bottom: 1px solid #eeeeee;">Name:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Email:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${email}</td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Phone:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${phone}</td>
              </tr>` : ''}
              ${companyUrl ? `<tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Company Website:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;"><a href="${companyUrl}" target="_blank" style="color: #0052ff;">${companyUrl}</a></td>
              </tr>` : ''}
              <tr>
                <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Interested In:</td>
                <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${interestedIn}</td>
              </tr>
            </table>
          </div>
          
          <p>If you have any additional details to share or urgent questions, please feel free to reply directly to this email.</p>
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
        subject: 'We received your request - 360Airo',
        html: emailHtml
      });
      emailSent = true;
      console.log(`Confirmation email sent to ${email}`);

      // Internal lead notification to the GTM / Sales team
      try {
        const teamEmailHtml = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="background-color: #0052ff; color: #ffffff; padding: 15px; text-align: center; border-radius: 6px 6px 0 0;">
              <h2 style="margin: 0; font-size: 20px; font-family: 'Outfit', sans-serif;">New Contact Us Lead!</h2>
            </div>
            <p>Hello Team,</p>
            <p>A new lead has just submitted the contact form on 360Airo website. Here are the details:</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #f0f0f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #eeeeee;">Name:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Email:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Phone:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${phone}</td>
                </tr>` : ''}
                ${companyUrl ? `<tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Company Website:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;"><a href="${companyUrl}" target="_blank">${companyUrl}</a></td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; border-bottom: 1px solid #eeeeee;">Interested In:</td>
                  <td style="padding: 6px 0; border-bottom: 1px solid #eeeeee;">${interestedIn}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Message:</td>
                  <td style="padding: 6px 0; white-space: pre-wrap;">${message || 'N/A'}</td>
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
          subject: `🔥 New Contact Lead: ${name}`,
          html: teamEmailHtml
        });
        console.log(`Internal lead notification sent to GTM team.`);
      } catch (teamEmailErr: any) {
        console.error('Nodemailer error sending internal team notification:', teamEmailErr.message || teamEmailErr);
      }
    } catch (emailErr: any) {
      console.error('Nodemailer error sending email:', emailErr.message || emailErr);
    }

    // Trigger Google Apps Script Webhook
    const webhookUrl = process.env.CONTACT_US_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbymjqbLqCxh5UOneK_GbBNnPKzLlzc503pYTlGyK7n90rU2O7RzkEbJyrZzIjBua5sN9g/exec';
    
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
          companyUrl: companyUrl || '',
          company_url: companyUrl || '',
          'Company URL': companyUrl || '',
          // Variations for Interested In
          interestedIn: interestedIn || '',
          interested_in: interestedIn || '',
          interestedin: interestedIn || '',
          'Interested In': interestedIn || '',
          'Interested in': interestedIn || '',
          interest: interestedIn || '',
          interested: interestedIn || '',
          // Variations for How can we help / Message
          message: message || '',
          how_can_we_help: message || '',
          howCanWeHelp: message || '',
          howcanwehelp: message || '',
          'How can we help': message || '',
          'How Can We Help': message || '',
          'How can we help?': message || '',
          'How Can We Help?': message || '',
          submittedAt: new Date().toISOString()
        }),
      });

      if (!webhookResponse.ok) {
        console.error(`Google Sheet Webhook returned status ${webhookResponse.status}`);
      }
    } catch (webhookErr) {
      console.error('Failed to trigger Google Sheet Webhook:', webhookErr);
    }

    // Return success to the client page even if Supabase server is offline (operational fallback)
    return NextResponse.json({ 
      success: true, 
      supabaseSaved,
      emailSent,
      data: insertDataResult 
    });
  } catch (err: any) {
    console.error('Error handling contact form submission:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
