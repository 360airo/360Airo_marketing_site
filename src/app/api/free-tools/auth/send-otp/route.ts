import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory OTP store
const otpStore = new Map<string, { otp: string; timestamp: number; expires: number }>();

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

    // Normalize email to lowercase for consistency across all operations
    const normalizedEmail = email.toLowerCase().trim();

    const smtpHost = process.env.SMTP_HOST || process.env.GMAIL_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || process.env.GMAIL_PORT || '587');
    const smtpSecure = (process.env.SMTP_SECURE || process.env.GMAIL_SECURE || 'false') === 'true';
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    console.log(`📧 [GLOBAL OTP] Sending OTP to ${normalizedEmail}`);

    if (!smtpUser || !smtpPass) {
      console.error('❌ [GLOBAL OTP] Missing SMTP credentials');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

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

    // Store OTP in memory with normalized email key
    otpStore.set(normalizedEmail, {
      otp,
      timestamp,
      expires: timestamp + expiresIn,
    });

    console.log(`📧 [GLOBAL OTP] Generated OTP for ${normalizedEmail}: ${otp}`);
    console.log(`📧 [GLOBAL OTP] OTP stored in memory. Store size: ${otpStore.size}, Keys: ${Array.from(otpStore.keys()).join(', ')}`);

    try {
      await transporter.sendMail({
        from: smtpUser,
        to: normalizedEmail,
        subject: '🔐 360 Airo Free Tools - Your Verification Code',
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
            <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0 0 8px 0;">360 Airo Free Tools</h1>
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
            <p style="font-size: 15px; color: #666; margin: 30px 0 0 0; text-align: center;">Use this code to access all 360 Airo free tools.</p>
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
        text: `Your verification code is: ${otp}\nValid for 10 minutes.\n\nUse this code to access all 360 Airo free tools.\n\n© 2024 360 Airo. All rights reserved.`,
      });

      console.log(`✅ [GLOBAL OTP] Email sent to ${normalizedEmail}`);
      return NextResponse.json(
        { success: true, message: 'OTP sent successfully' },
        { status: 200 }
      );
    } catch (emailError: any) {
      const errorMsg = emailError?.message || String(emailError);
      console.error(`❌ [GLOBAL OTP] Failed to send email:`, errorMsg);
      otpStore.delete(normalizedEmail);
      
      return NextResponse.json(
        { error: `Failed to send OTP: ${errorMsg}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ [GLOBAL OTP] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export store for verify-otp endpoint
export { otpStore };
