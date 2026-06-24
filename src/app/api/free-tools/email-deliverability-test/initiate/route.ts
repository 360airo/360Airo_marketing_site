import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

// Simulated database for test emails (replace with actual DB)
let testEmailDatabase: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const { recipient_emails, test_name, selected_providers } = await req.json();

    if (!recipient_emails || !Array.isArray(recipient_emails) || recipient_emails.length === 0) {
      return NextResponse.json(
        { error: 'Invalid recipient emails' },
        { status: 400 }
      );
    }

    if (recipient_emails.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 emails per test' },
        { status: 400 }
      );
    }

    const testEmails = recipient_emails.map((recipient: string) => {
      const testToken = randomBytes(32).toString('hex');
      const testId = randomBytes(16).toString('hex');

      // Generate tracking pixel URL
      const trackingPixelUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/free-tools/email-deliverability-test/pixel/${testToken}`;

      // Generate test email HTML with tracking
      const testEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Deliverability Test</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
    .button { background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
    .tracking { width: 1px; height: 1px; display: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Email Deliverability Test</h1>
      <p>This email is part of a deliverability test to verify email delivery across providers.</p>
    </div>
    <div class="content">
      <h2>Test ID: ${testId.substring(0, 8).toUpperCase()}</h2>
      <p>This email contains tracking pixels to monitor delivery and engagement.</p>
      
      <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
        <strong>✓ Tracking Enabled</strong>
        <p>This email will track:</p>
        <ul>
          <li>Email delivery status</li>
          <li>Folder placement (Inbox, Spam, Promotions, etc.)</li>
          <li>Email opens</li>
          <li>Link clicks</li>
        </ul>
      </div>

      <p>Test providers selected: <strong>${selected_providers.join(', ')}</strong></p>
      
      <p>
        <a href="${trackingPixelUrl}?action=click" class="button">Click to Track</a>
      </p>

      <div class="footer">
        <p>This is an automated test email. Do not reply.</p>
        <p>Test Token: ${testToken}</p>
      </div>
    </div>

    <!-- Tracking Pixel -->
    <img src="${trackingPixelUrl}?action=open" alt="" class="tracking" />
  </div>
</body>
</html>
      `;

      // Plain text version
      const testEmailCopy = `
Email Deliverability Test
========================

Test ID: ${testId.substring(0, 8).toUpperCase()}

This email contains tracking pixels to monitor delivery and engagement.

Tracking Enabled ✓
- Email delivery status
- Folder placement (Inbox, Spam, Promotions, etc.)
- Email opens
- Link clicks

Test providers selected: ${selected_providers.join(', ')}

Click to track: ${trackingPixelUrl}?action=click

---
This is an automated test email. Do not reply.
Test Token: ${testToken}
      `;

      const testEmail = {
        id: testId,
        recipient,
        test_name: test_name,
        test_token: testToken,
        test_email_html: testEmailHtml,
        test_email_copy: testEmailCopy,
        tracking_pixel_url: trackingPixelUrl,
        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trackingPixelUrl)}`,
        created_at: new Date().toISOString(),
        status: 'pending',
        selected_providers: selected_providers,
      };

      testEmailDatabase.push(testEmail);
      return testEmail;
    });

    console.log(`✅ Generated ${testEmails.length} test emails for: ${selected_providers.join(', ')}`);

    return NextResponse.json({
      success: true,
      test_name,
      test_count: testEmails.length,
      selected_providers,
      test_emails: testEmails,
      message: 'Test emails generated successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('❌ Error generating test emails:', error);
    return NextResponse.json(
      { error: 'Failed to generate test emails' },
      { status: 500 }
    );
  }
}
