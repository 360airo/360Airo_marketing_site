import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { otpStore } from '../otp-store';

function generateOTP(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
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

    // Read environment variables inside the function
    // Try SMTP_* first, fallback to GMAIL_*
    const smtpHost = process.env.SMTP_HOST || process.env.GMAIL_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || process.env.GMAIL_PORT || '587');
    const smtpSecure = (process.env.SMTP_SECURE || process.env.GMAIL_SECURE || 'false') === 'true';
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    console.log(`📧 [OTP] SMTP Config Check:`);
    console.log(`  Host: ${smtpHost}`);
    console.log(`  Port: ${smtpPort}`);
    console.log(`  Secure: ${smtpSecure}`);
    console.log(`  User: ${smtpUser ? '✓' : '✗'} ${smtpUser ? `(${smtpUser})` : '(missing)'}`);
    console.log(`  Pass: ${smtpPass ? '✓ (length: ' + smtpPass.length + ')' : '✗ (missing)'}`);

    if (!smtpUser || !smtpPass) {
      console.error('❌ [SMTP] Missing SMTP/GMAIL credentials in environment variables');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('SMTP') || k.includes('GMAIL')));
      return NextResponse.json(
        { error: 'SMTP credentials not configured' },
        { status: 500 }
      );
    }

    // Create transporter inside the function with latest env vars
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const otp = generateOTP();
    const timestamp = Date.now();
    const expiresIn = 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(email, {
      otp,
      timestamp,
      expires: timestamp + expiresIn,
    });

    console.log(`📧 [OTP] Generated OTP for ${email}: ${otp}`);

    // Send OTP via email
    try {
      await transporter.sendMail({
        from: smtpUser,
        to: email,
        subject: '🔐 Email Deliverability Tester - Your Verification Code',
        html: `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=600, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style type="text/css">
        * { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        body { margin: 0; padding: 0; background-color: #f5f5f5; width: 600px; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 600px; }
        td { vertical-align: top; }
        img { border: 0; display: block; }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f5f5f5 !important; width: 600px !important; max-width: 600px !important;">
<table align="center" width="600" cellpadding="0" cellspacing="0" style="width: 600px !important; max-width: 600px !important; margin: 0 auto !important; min-width: 600px !important;">
    <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">Email Deliverability Tester</h1>
            <p style="color: white; font-size: 16px; margin: 0;">Email Verification Code</p>
        </td>
    </tr>
    <tr>
        <td style="background-color: white; padding: 40px 30px; border: 1px solid #e0e0e0;">
            <h2 style="font-size: 22px; color: #333; margin: 0 0 16px 0;">Verify Your Email</h2>
            <p style="font-size: 15px; color: #666; margin: 0 0 24px 0;">Your verification code is valid for 10 minutes.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; margin: 30px 0; border: 2px solid #667eea;">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <div style="font-size: 48px; font-weight: 700; color: #667eea; letter-spacing: 12px; margin: 0 0 16px 0;">${otp}</div>
                        <div style="color: #999; font-size: 13px;">⏱️ Valid for 10 minutes</div>
                    </td>
                </tr>
            </table>
            <p style="font-size: 15px; color: #666; margin: 30px 0 0 0; text-align: center;">If you didn't request this code, please ignore this email.</p>
        </td>
    </tr>
    <tr>
        <td style="background-color: white; border: 1px solid #e0e0e0; padding: 24px 30px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">© 2024 360 Airo. All rights reserved.</p>
        </td>
    </tr>
</table>
</body>
</html>
        `,
        text: `Your verification code is: ${otp}\nValid for 10 minutes.`,
      });

      console.log(`✅ [OTP] OTP email sent to ${email}`);
      return NextResponse.json(
        { success: true, message: 'OTP sent successfully' },
        { status: 200 }
      );
    } catch (emailError: any) {
      const errorMsg = emailError?.message || String(emailError);
      console.error(`❌ [OTP] Failed to send email:`, errorMsg);
      console.error(`❌ [OTP] Full error:`, emailError);
      
      // Delete the OTP if we couldn't send it
      otpStore.delete(email);
      
      return NextResponse.json(
        { error: `Failed to send OTP email: ${errorMsg}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ [OTP] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
