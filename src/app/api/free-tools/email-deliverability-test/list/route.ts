import { NextRequest, NextResponse } from 'next/server';

// Mock database (replace with actual DB)
const testEmailDatabase: any[] = [
  {
    id: 'test_001',
    recipient: 'athulk8182004@gmail.com',
    test_token: 'abc123def456',
    test_email_html: `
      <html>
        <head><title>Deliverability Test</title></head>
        <body>
          <h2>🚀 Email Deliverability Test</h2>
          <p>This email is part of a deliverability test.</p>
          <p><strong>Test ID:</strong> TEST001</p>
          <p>Click the link below to confirm tracking:</p>
          <a href="#">Track Email</a>
        </body>
      </html>
    `,
    test_email_copy: `Email Deliverability Test\n\nTest ID: TEST001\n\nThis is a test email for deliverability checking.`,
    tracking_pixel_url: 'https://example.com/pixel/abc123',
    created_at: new Date().toISOString(),
    test_name: 'Q4 Campaign Deliverability Test',
  },
  {
    id: 'test_002',
    recipient: 'athul8182004@gmail.com',
    test_token: 'xyz789uvw012',
    test_email_html: `
      <html>
        <head><title>Deliverability Test</title></head>
        <body>
          <h2>🚀 Email Deliverability Test</h2>
          <p>This email is part of a deliverability test.</p>
          <p><strong>Test ID:</strong> TEST002</p>
        </body>
      </html>
    `,
    test_email_copy: `Email Deliverability Test\n\nTest ID: TEST002\n\nThis is a test email for deliverability checking.`,
    tracking_pixel_url: 'https://example.com/pixel/xyz789',
    created_at: new Date().toISOString(),
    test_name: 'Q4 Campaign Deliverability Test',
  },
  {
    id: 'test_003',
    recipient: 'athulk8182004@outllook.com',
    test_token: 'mno345pqr678',
    test_email_html: `
      <html>
        <head><title>Deliverability Test</title></head>
        <body>
          <h2>🚀 Email Deliverability Test</h2>
          <p>This email is part of a deliverability test.</p>
          <p><strong>Test ID:</strong> TEST003</p>
        </body>
      </html>
    `,
    test_email_copy: `Email Deliverability Test\n\nTest ID: TEST003\n\nThis is a test email for deliverability checking.`,
    tracking_pixel_url: 'https://example.com/pixel/mno345',
    created_at: new Date().toISOString(),
    test_name: 'Q4 Campaign Deliverability Test',
  },
];

export async function GET(req: NextRequest) {
  try {
    console.log('✅ Fetching all test emails from database...');

    // In production, fetch from MongoDB or your database
    // const testEmails = await TestEmails.find({ status: 'pending' }).limit(100);

    return NextResponse.json({
      success: true,
      count: testEmailDatabase.length,
      test_emails: testEmailDatabase,
      message: 'Test emails retrieved successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching test emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test emails' },
      { status: 500 }
    );
  }
}
