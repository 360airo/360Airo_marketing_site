import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PlacementResult {
  id: string;
  from: string;
  to: string;
  subject: string;
  folder: string;
  date: string;
  provider: string;
  dns: {
    spf: { status: 'valid' | 'invalid'; value: string; explanation: string };
    dkim: { status: 'valid' | 'invalid'; value: string; explanation: string };
    dmarc: { status: 'valid' | 'invalid'; value: string; explanation: string };
  };
  contentAnalysis: {
    spamScore: number;
    triggersFound: string[];
    shortenedUrls: boolean;
    unsubscribedLink: boolean;
  };
}

async function checkGmailPlacement(subjectCode: string): Promise<PlacementResult[]> {
  const results: PlacementResult[] = [];
  
  let gmailUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.GMAIL_EMAIL;
  let gmailPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('❌ [IMAP] Missing Gmail credentials');
    return [];
  }

  if (process.env.NODE_ENV === 'production' && process.env.__NEXT_PRIVATE_PREBUILD_PHASE) {
    console.log('⏭️ [IMAP] Skipping during build phase');
    return [];
  }

  console.log(`🔐 [IMAP] Checking Gmail for test emails with subject containing: "${subjectCode}"`);

  try {
    let Imap: any;
    try {
      const imapModule = require('imap');
      Imap = imapModule.default || imapModule;
    } catch (importErr) {
      console.error('❌ [IMAP] Failed to import IMAP:', importErr);
      return [];
    }

    const imap = new Imap({
      user: gmailUser,
      password: gmailPass,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000,
    });

    return new Promise((resolve) => {
      let timeoutHandle: any = null;
      let isResolved = false;

      const cleanup = (res: PlacementResult[]) => {
        if (isResolved) return;
        isResolved = true;
        clearTimeout(timeoutHandle);
        try {
          imap.closeBox(() => {
            try {
              imap.end();
            } catch (e) {}
          });
        } catch (e) {}
        resolve(res);
      };

      timeoutHandle = setTimeout(() => {
        console.warn('⚠️ [IMAP] Timeout waiting for connection (30s)');
        cleanup(results);
      }, 30000);

      imap.on('error', (err: any) => {
        const errorMsg = err?.message || String(err);
        console.error('❌ [IMAP] Connection error:', errorMsg);
        cleanup(results);
      });

      imap.on('ready', () => {
        // Define Gmail folders to check
        const foldersToCheck = ['INBOX', '[Gmail]/Spam', '[Gmail]/Promotions', '[Gmail]/Updates', '[Gmail]/All Mail'];
        let boxesProcessed = 0;
        let foundMostRecent = false;

        const checkNextBox = () => {
          if (foundMostRecent || boxesProcessed >= foldersToCheck.length) {
            cleanup(results);
            return;
          }

          const boxName = foldersToCheck[boxesProcessed];
          boxesProcessed++;

          imap.openBox(boxName, false, (err: any, mailbox: any) => {
            if (err) {
              console.warn(`⚠️ [IMAP] Could not open folder "${boxName}", skipping...`);
              checkNextBox();
              return;
            }

            // Search for email with the specific subject code
            const searchCriteria = [['SUBJECT', subjectCode]];
            
            imap.search(searchCriteria, (err: any, emailIds: any) => {
              if (err) {
                console.warn(`⚠️ [IMAP] Search error in "${boxName}":`, err?.message || String(err));
                checkNextBox();
                return;
              }

              if (!emailIds || emailIds.length === 0) {
                checkNextBox();
                return;
              }

              // Get the last matching email
              const mostRecentId = emailIds[emailIds.length - 1];
              
              // Fetch entire message to get body & authentication headers
              const f = imap.fetch([mostRecentId], { bodies: '' });

              f.on('message', (msg: any, seqno: any) => {
                let rawEmail = '';
                let labels: string[] = [];

                msg.on('attributes', (attrs: any) => {
                  labels = attrs['x-gm-labels'] || [];
                  console.log(`🏷️ [IMAP] Gmail labels for message:`, labels);
                });

                msg.on('body', (stream: any) => {
                  stream.on('data', (chunk: any) => {
                    rawEmail += chunk.toString();
                  });

                  stream.on('end', async () => {
                    try {
                      const { simpleParser } = require('mailparser');
                      const parsed = await simpleParser(rawEmail);

                      const from = parsed.from?.text || 'Unknown';
                      const to = parsed.to?.text || 'Unknown';
                      const subject = parsed.subject || '(No Subject)';
                      const date = parsed.date ? parsed.date.toISOString() : new Date().toISOString();
                      
                      // Extract Authentication-Results
                      const authResultsRaw = parsed.headers.get('authentication-results');
                      const authString = Array.isArray(authResultsRaw) ? authResultsRaw.join('; ') : (authResultsRaw || '');
                      
                      const spfMatch = authString.match(/spf=(\w+)/i);
                      const dkimMatch = authString.match(/dkim=(\w+)/i);
                      const dmarcMatch = authString.match(/dmarc=(\w+)/i);

                      const spfStatus = spfMatch ? spfMatch[1].toLowerCase() : 'none';
                      const dkimStatus = dkimMatch ? dkimMatch[1].toLowerCase() : 'none';
                      const dmarcStatus = dmarcMatch ? dmarcMatch[1].toLowerCase() : 'none';

                      const textContent = parsed.text || '';
                      const spamTriggers = ['act now', 'click here', '100% free', 'make money', 'buy now', 'cheap', 'earn money', 'winner', 'gift card', 'guaranteed'];
                      const foundTriggers = spamTriggers.filter(trigger => textContent.toLowerCase().includes(trigger));

                      // Determine placement folder based on Box and labels
                      let folderPlacement = boxName;
                      if (boxName === 'INBOX' || boxName === '[Gmail]/All Mail') {
                        if (labels.some(l => l.toLowerCase().includes('promotions') || l.toLowerCase().includes('category/promotions'))) {
                          folderPlacement = 'Promotions';
                        } else if (labels.some(l => l.toLowerCase().includes('updates') || l.toLowerCase().includes('category/updates'))) {
                          folderPlacement = 'Updates';
                        } else if (labels.some(l => l.toLowerCase().includes('social') || l.toLowerCase().includes('category/social'))) {
                          folderPlacement = 'Social';
                        } else if (labels.some(l => l.toLowerCase().includes('spam') || l.toLowerCase().includes('spam'))) {
                          folderPlacement = 'Spam';
                        } else {
                          folderPlacement = 'Inbox (Primary)';
                        }
                      } else {
                        if (boxName.toLowerCase().includes('spam')) folderPlacement = 'Spam';
                        else if (boxName.toLowerCase().includes('promotions')) folderPlacement = 'Promotions';
                        else if (boxName.toLowerCase().includes('updates')) folderPlacement = 'Updates';
                        else if (boxName === 'INBOX') folderPlacement = 'Inbox (Primary)';
                      }

                      results.push({
                        id: `${boxName}-${seqno}`,
                        from,
                        to,
                        subject,
                        folder: folderPlacement,
                        date,
                        provider: 'Gmail',
                        dns: {
                          spf: {
                            status: spfStatus === 'pass' ? 'valid' : 'invalid',
                            value: `spf=${spfStatus}`,
                            explanation: spfStatus === 'pass'
                              ? 'SPF record is valid and matches the sending IP.'
                              : `SPF authentication failed or returned status: ${spfStatus}.`
                          },
                          dkim: {
                            status: dkimStatus === 'pass' ? 'valid' : 'invalid',
                            value: `dkim=${dkimStatus}`,
                            explanation: dkimStatus === 'pass'
                              ? 'DKIM digital signature is valid and authentic.'
                              : `DKIM authentication failed or returned status: ${dkimStatus}.`
                          },
                          dmarc: {
                            status: dmarcStatus === 'pass' ? 'valid' : 'invalid',
                            value: `dmarc=${dmarcStatus}`,
                            explanation: dmarcStatus === 'pass'
                              ? 'DMARC alignment is valid and policy matches.'
                              : `DMARC policy check failed or returned status: ${dmarcStatus}.`
                          }
                        },
                        contentAnalysis: {
                          spamScore: foundTriggers.length * 1.5,
                          triggersFound: foundTriggers,
                          shortenedUrls: /bit\.ly|tinyurl\.com|goo\.gl|t\.co|rebrand\.ly/i.test(textContent),
                          unsubscribedLink: /unsubscribe/i.test(textContent)
                        }
                      });

                      foundMostRecent = true;
                    } catch (parseErr) {
                      console.error('❌ [IMAP] Parsing error:', parseErr);
                    }
                  });
                });
              });

              f.on('error', (err: any) => {
                console.warn(`⚠️ [IMAP] Fetch error in "${boxName}":`, err?.message || String(err));
                checkNextBox();
              });

              f.on('end', () => {
                setTimeout(checkNextBox, 200);
              });
            });
          });
        };

        checkNextBox();
      });

      imap.connect();
    });
  } catch (error: any) {
    console.error('❌ [IMAP] Setup error:', error?.message || String(error));
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const subjectCode = url.searchParams.get('subjectCode');

    if (!subjectCode) {
      return NextResponse.json(
        { error: 'subjectCode query parameter is required' },
        { status: 400 }
      );
    }

    console.log(`📧 [CHECK-PLACEMENT] Starting placement check for subject code: ${subjectCode}`);

    const results = await checkGmailPlacement(subjectCode);

    console.log(`✅ [CHECK-PLACEMENT] Found ${results.length} emails`);

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error('❌ [CHECK-PLACEMENT] Error:', errorMsg);
    return NextResponse.json(
      { error: `Failed to check placement: ${errorMsg}` },
      { status: 500 }
    );
  }
}
