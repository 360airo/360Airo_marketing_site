import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';
import net from 'net';

const resolveMx = promisify(dns.resolveMx);

interface DeliverabilityRequest {
  email: string;
}

interface DeliverabilityResponse {
  email: string;
  status: 'valid' | 'invalid' | 'unknown';
  reason: string;
  verificationTime: number;
  mxRecords?: string[];
  smtpCheck?: boolean;
  domainCheck?: boolean;
  formatCheck?: boolean;
}

const BLACKLIST_MX = ['127.0.0.1', 'localhost'];

function isBlacklistedMx(mxHost: string): boolean {
  return BLACKLIST_MX.includes(mxHost.toLowerCase());
}

function smtpExchange(
  host: string,
  email: string,
  timeout = 5000
): Promise<{ status: string; reason: string; verificationTime: number }> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let dataBuffer = '';
    let stage = 0;
    let finished = false;
    const start = Date.now();

    function done(statusObj: { status: string; reason: string }) {
      if (finished) return;
      finished = true;
      try {
        socket.destroy();
      } catch (e) {}
      resolve({
        ...statusObj,
        verificationTime: Date.now() - start,
      });
    }

    const cleanupAndUnknown = (reason: string) => done({ status: 'unknown', reason });

    socket.setTimeout(timeout, () => {
      cleanupAndUnknown('SMTP connection timed out');
    });

    socket.on('error', (err) => {
      cleanupAndUnknown(`SMTP connection error: ${err.message}`);
    });

    socket.connect(25, host, () => {
      // connected, wait for greeting
    });

    socket.on('data', (chunk) => {
      dataBuffer += chunk.toString();
      const lines = dataBuffer.split(/\r\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return;

      const code = parseInt(lastLine.slice(0, 3), 10);
      if (isNaN(code)) return;

      if (stage === 0) {
        if (code >= 200 && code < 400) {
          socket.write(`HELO example.com\r\n`);
          stage = 1;
          dataBuffer = '';
          return;
        } else {
          return cleanupAndUnknown(`Unexpected greeting code ${code}`);
        }
      }

      if (stage === 1) {
        if (code >= 200 && code < 400) {
          socket.write(`MAIL FROM:<no-reply@example.com>\r\n`);
          stage = 2;
          dataBuffer = '';
          return;
        } else {
          return cleanupAndUnknown(`HELO rejected with ${code}`);
        }
      }

      if (stage === 2) {
        if (code >= 200 && code < 400) {
          socket.write(`RCPT TO:<${email}>\r\n`);
          stage = 3;
          dataBuffer = '';
          return;
        } else {
          return done({ status: 'unknown', reason: `MAIL FROM rejected ${code}` });
        }
      }

      if (stage === 3) {
        if (code >= 200 && code < 300) {
          socket.write(`QUIT\r\n`);
          return done({ status: 'valid', reason: `SMTP RCPT accepted (${code})` });
        } else if (code >= 400 && code < 500) {
          socket.write(`QUIT\r\n`);
          return done({ status: 'unknown', reason: `Temporary SMTP failure: ${code}` });
        } else if (code >= 500) {
          socket.write(`QUIT\r\n`);
          return done({ status: 'invalid', reason: `SMTP rejected RCPT: ${code}` });
        } else {
          socket.write(`QUIT\r\n`);
          return done({ status: 'unknown', reason: `Unexpected RCPT response: ${code}` });
        }
      }
    });

    setTimeout(() => {
      if (!finished) cleanupAndUnknown('No SMTP response within allowed time');
    }, timeout + 200);
  });
}

async function testEmailDeliverability(email: string): Promise<DeliverabilityResponse> {
  const startTime = Date.now();

  // Step 1: Format Check
  const simpleEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!simpleEmailRegex.test(email)) {
    return {
      email,
      status: 'invalid',
      reason: 'Invalid email format',
      verificationTime: Date.now() - startTime,
      formatCheck: false,
    };
  }

  const domain = email.split('@')[1].toLowerCase();

  // Step 2: Domain Check - DNS MX lookup
  let mxRecords: any[] = [];
  try {
    mxRecords = await resolveMx(domain);
  } catch (err: any) {
    return {
      email,
      status: 'unknown',
      reason: `DNS MX lookup failed: ${err.code || err.message}`,
      verificationTime: Date.now() - startTime,
      formatCheck: true,
      domainCheck: false,
    };
  }

  if (!mxRecords || mxRecords.length === 0) {
    return {
      email,
      status: 'unknown',
      reason: 'No MX records found for domain',
      verificationTime: Date.now() - startTime,
      formatCheck: true,
      domainCheck: false,
    };
  }

  // Sort by priority
  mxRecords.sort((a: any, b: any) => a.priority - b.priority);

  // Step 3: SMTP Check
  for (const mx of mxRecords) {
    const host = mx.exchange.toLowerCase();

    if (isBlacklistedMx(host)) {
      continue;
    }

    try {
      const res = await smtpExchange(host, email, 6000);
      if (res && (res.status === 'valid' || res.status === 'invalid')) {
        return {
          email,
          status: res.status as 'valid' | 'invalid',
          reason: res.reason,
          verificationTime: res.verificationTime,
          mxRecords: mxRecords.slice(0, 3).map((mx: any) => mx.exchange),
          formatCheck: true,
          domainCheck: true,
          smtpCheck: res.status === 'valid',
        };
      }
    } catch (err: any) {
      // continue to next MX
    }
  }

  return {
    email,
    status: 'unknown',
    reason: 'No definitive SMTP response from MX hosts',
    verificationTime: Date.now() - startTime,
    mxRecords: mxRecords.slice(0, 3).map((mx: any) => mx.exchange),
    formatCheck: true,
    domainCheck: true,
    smtpCheck: false,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as DeliverabilityRequest;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log(`🧪 Testing deliverability for: ${email}`);

    const result = await testEmailDeliverability(email.toLowerCase().trim());

    console.log(`✅ Test result for ${email}:`, result);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Error testing email deliverability:', error);
    return NextResponse.json(
      { error: error.message || 'Deliverability test failed' },
      { status: 500 }
    );
  }
}
