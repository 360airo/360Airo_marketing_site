import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { dbSaveOTP } from '@/lib/free-tools-db';

const publicDomains = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com',
  'yahoo.com', 'ymail.com', 'aol.com', 'icloud.com', 'mail.com',
  'live.com', 'msn.com', 'zoho.com', 'proton.me', 'protonmail.com',
  'gmx.com', 'yandex.com'
];

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    const domain = normalizedEmail.split('@')[1];

    // Check if it is a company email
    if (publicDomains.includes(domain)) {
      return NextResponse.json(
        { error: 'Please use a work/company email address. Public domains are not allowed for free tool usage.' },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';

    if (!smtpUser || !smtpPass) {
      console.error('❌ [SEND OTP] Missing SMTP credentials');
      return NextResponse.json(
        { error: 'Email service credentials not configured on the server.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const otp = generateOTP();
    const expiresInSeconds = 2 * 60; // 2 minutes
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    // Save OTP using DB helper (will auto handle local fallback cache)
    await dbSaveOTP(normalizedEmail, otp, expiresAt);

    console.log(`📧 [SEND OTP] Sending code ${otp} to ${normalizedEmail}...`);

    try {
      // Must await email sending in production serverless environments (like Vercel),
      // otherwise the serverless function terminates immediately and cancels the dispatch.
      await transporter.sendMail({
        from: `"360Airo" <${smtpUser}>`,
        to: normalizedEmail,
        subject: '🔑 Your 360Airo Free Tools Verification Code',
        html: `
          <div style="font-family: 'Outfit', 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-radius: 16px; color: #f8fafc; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
            <div style="margin-bottom: 24px;">
              <h1 style="color: #a78bfa; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.025em;">360Airo</h1>
              <p style="color: #94a3b8; font-size: 14px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.1em;">Free Tools Access</p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 32px; margin-bottom: 24px;">
              <h2 style="font-size: 20px; margin-top: 0; color: #ffffff;">Verify your work email</h2>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.5;">Please use the following verification code to access all of our outbound sales infrastructure and content analysis tools.</p>
              
              <div style="font-size: 40px; font-weight: 700; color: #a78bfa; letter-spacing: 8px; margin: 28px 0; padding: 12px; background: rgba(167, 139, 250, 0.1); border-radius: 8px; border: 1px dashed rgba(167, 139, 250, 0.3); display: inline-block;">
                ${otp}
              </div>
              
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">⏱️ This code is valid for 2 minutes</p>
            </div>
            
            <div style="color: #64748b; font-size: 12px;">
              <p style="margin: 0 0 8px 0;">If you did not request this verification code, please ignore this email.</p>
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} 360Airo. All rights reserved.</p>
            </div>
          </div>
        `,
        text: `Your 360Airo Free Tools verification code is: ${otp}\n\nThis code is valid for 2 minutes.\n\nIf you did not request this code, please ignore this email.`,
      });

      console.log(`✅ [SEND OTP] Email successfully sent to ${normalizedEmail}`);

      return NextResponse.json(
        { success: true, message: 'Verification code sent successfully.' },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error(`❌ [SEND OTP] Email dispatch failed for ${normalizedEmail}:`, emailError);
      return NextResponse.json(
        { error: `Failed to send email: ${emailError?.message || 'SMTP Error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ [SEND OTP] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
