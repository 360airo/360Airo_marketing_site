import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_API_KEY = process.env.NEXT_PUBLIC_MAILTESTER_API_KEY || process.env.MAILTESTER_KEY;

const MAILTESTER_API_ENDPOINT = 'https://happy.mailtester.ninja/ninja';




// Email format validation using regex
function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Verify email using MailTester Ninja API
async function verifyEmailViaMailTester(email: string): Promise<{ status: string; reason: string; code?: number; user?: string; domain?: string }> {
  try {
    console.log(`🔍 Verifying email: ${email}...`);

    
    const { data } = await axios.get(MAILTESTER_API_ENDPOINT, {
      params: {
        email: email.toLowerCase().trim(),
        key: BACKEND_API_KEY,
      },
      timeout: 10000,
      family: 4,
    });
    
    console.log(`📥 API Response for ${email}:`, data);
    
    // Map MailTester response message to status
    // Accepted = Valid email
    // Rejected = Invalid email
    // DNS check passed but email rejected = Unknown (DNS valid, email not accepted)
    const messageToStatus: { [key: string]: string } = {
      'Accepted': 'valid',
      'Rejected': 'invalid',
      'Invalid Format': 'invalid',
      'Unknown': 'unknown',
      'Domain has no MX records': 'invalid',
    };

    // Get status from message, default to message itself if not in map
    let status = 'unknown';
    if (data.message) {
      const messageLower = data.message.toLowerCase();
      
      if (messageLower.includes('accepted')) {
        status = 'valid';
      } else if (messageLower.includes('rejected')) {
        status = 'invalid';
      } else if (messageLower.includes('invalid')) {
        status = 'invalid';
      } else if (messageLower.includes('unknown')) {
        status = 'unknown';
      } else if (messageLower.includes('invalid format')) {
        status = 'invalid';
      }
    }

    return {
      status: status || 'unknown', // Ensure status is never null/undefined
      reason: data.message || 'Verification completed',
      code: data.code,
      user: data.user,
      domain: data.domain,
    };
  } catch (error: any) {
    console.error(`❌ Error verifying ${email} via MailTester:`, error.message);
    console.error(`❌ Error details:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('API authentication failed - please contact support');
    }
    
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      throw new Error('Verification service temporarily unavailable - please try again');
    }

    return {
      status: 'unknown',
      reason: error.response?.data?.message || 'Verification service error',
      code: 2,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_API_KEY) {
      return NextResponse.json(
        { error: 'MailTester API key is missing. Please define NEXT_PUBLIC_MAILTESTER_API_KEY in your .env file.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { emails, stopOnFirstValid } = body;

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of emails' },
        { status: 400 }
      );
    }

    if (emails.length > 1000) {
      return NextResponse.json(
        { error: 'Maximum 1000 emails at a time' },
        { status: 400 }
      );
    }

    // Initialize results array

    const allResults = [];

    // Process emails sequentially
    const verifyEmailWithLimit = async (email: string) => {
      try {
        const trimmedEmail = email.toLowerCase().trim();
        const startTime = Date.now();

        // Step 1: Format validation
        if (!validateEmailFormat(trimmedEmail)) {
          return {
            email: trimmedEmail,
            status: 'invalid',
            reason: 'Invalid email format',
            verificationTime: Date.now() - startTime,
            verificationMethod: 'format-check',
          };
        }

        // Step 2: Verify via MailTester API with backend key
        const result = await verifyEmailViaMailTester(trimmedEmail);
        
        return {
          email: trimmedEmail,
          status: result.status,
          reason: result.reason,
          code: result.code,
          user: result.user,
          domain: result.domain,
          verificationTime: Date.now() - startTime,
          verificationMethod: 'mailtester-api',
        };

      } catch (err) {
        console.error(`Error verifying ${email}:`, err);
        return {
          email: email.toLowerCase().trim(),
          status: 'unknown',
          reason: err instanceof Error ? err.message : 'Verification service error',
          verificationTime: 0,
          verificationMethod: 'error',
        };
      }
    };

    // Process all emails sequentially and stream results
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('🚀 Starting email verification stream...');
          
          let foundValid = false;
          for (let i = 0; i < emails.length; i++) {
            if (foundValid) {
              console.log('⏭️ Stopping verification stream because a valid email was found');
              break;
            }
            
            // Introduce a short throttle delay (300ms) between requests to prevent concurrent API rate limits
            if (i > 0) {
              await new Promise(r => setTimeout(r, 300));
            }
            
            const emailToVerify = emails[i];
            console.log(`⚡ Verifying email ${i + 1}/${emails.length}: ${emailToVerify}...`);
            const result = await verifyEmailWithLimit(emailToVerify);
            allResults.push(result);
            
            // Send each result as it completes with a newline separator
            const json = JSON.stringify(result);
            console.log('📤 Streaming result:', json);
            controller.enqueue(encoder.encode(json + '\n'));
            
            console.log(`✓ Verified ${i + 1}/${emails.length}: ${emailToVerify} -> Status: ${result.status}`);

            if (stopOnFirstValid && result.status === 'valid') {
              foundValid = true;
            }
          }
          
          console.log('🏁 Stream completed successfully');
          controller.close();
          console.log(`✅ All ${emails.length} emails verified and streamed`);
        } catch (error) {
          console.error('❌ Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Email verifier route error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
