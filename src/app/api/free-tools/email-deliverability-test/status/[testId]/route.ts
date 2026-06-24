import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const { testId } = params;

    if (!testId) {
      return NextResponse.json(
        { error: 'Missing test ID' },
        { status: 400 }
      );
    }

    // Simulate retrieving test status from database
    const testStatus = {
      test_id: testId,
      status: 'monitoring',
      current_folder: 'Inbox',
      delivery_confirmed: true,
      open_detected: Math.random() > 0.5,
      click_detected: Math.random() > 0.7,
      folder_tracking: {
        inbox: {
          detected: true,
          timestamp: new Date(Date.now() - 30000).toISOString(),
          provider: 'gmail'
        },
        spam: {
          detected: false,
          timestamp: null
        },
        promotions: {
          detected: false,
          timestamp: null
        }
      },
      engagement: {
        first_open: Math.random() > 0.5 ? new Date(Date.now() - 20000).toISOString() : null,
        open_count: Math.floor(Math.random() * 3),
        click_count: Math.floor(Math.random() * 2),
        first_click: Math.random() > 0.8 ? new Date(Date.now() - 10000).toISOString() : null,
      },
      provider_results: {
        gmail: {
          status: 'delivered',
          folder: 'Inbox',
          opened: Math.random() > 0.5,
          clicked: Math.random() > 0.7,
        },
        outlook: {
          status: 'pending',
          folder: null,
          opened: false,
          clicked: false,
        },
        google_workspace: {
          status: 'pending',
          folder: null,
          opened: false,
          clicked: false,
        }
      },
      monitoring_started: new Date(Date.now() - 60000).toISOString(),
      last_checked: new Date().toISOString(),
      monitoring_duration_seconds: 60,
    };

    console.log(`📊 Status retrieved for test ${testId}:`, testStatus);

    return NextResponse.json(testStatus, { status: 200 });
  } catch (error) {
    console.error('❌ Error retrieving test status:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve status' },
      { status: 500 }
    );
  }
}
