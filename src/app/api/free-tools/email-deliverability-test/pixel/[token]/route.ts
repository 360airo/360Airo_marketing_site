import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const action = req.nextUrl.searchParams.get('action') || 'open';

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token' },
        { status: 400 }
      );
    }

    // Log tracking event
    const trackingEvent = {
      token,
      action,
      timestamp: new Date().toISOString(),
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-client-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
      referer: req.headers.get('referer') || 'unknown',
    };

    console.log(`📍 Tracking Event (${action}):`, trackingEvent);

    // TODO: Save to MongoDB
    // await TrackingEvents.create(trackingEvent);

    if (action === 'open') {
      // Return 1x1 tracking pixel
      const pixel = Buffer.from([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00,
        0x01, 0x00, 0x80, 0x00, 0x00, 0xff, 0xff, 0xff,
        0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
        0x01, 0x00, 0x3b
      ]);

      return new NextResponse(new Uint8Array(pixel), {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    } else if (action === 'click') {
      // Return a small HTML page
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="2;url=https://www.google.com">
  <title>Redirecting...</title>
</head>
<body>
  <p>Click tracked. Redirecting...</p>
</body>
</html>
      `;

      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    return NextResponse.json({
      success: true,
      action,
      message: 'Tracking event recorded'
    });
  } catch (error) {
    console.error('❌ Error processing tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to record tracking event' },
      { status: 500 }
    );
  }
}
