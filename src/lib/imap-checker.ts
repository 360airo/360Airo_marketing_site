import Imap from 'imap';
import { simpleParser } from 'mailparser';

interface IMAPCheckResult {
  folder_location: string;
  found: boolean;
  imap_status: string;
}

/**
 * Check email folder placement via IMAP
 * Returns which folder (Inbox, Spam, Promotions, etc.) the email landed in
 */
export async function checkEmailFolderViaIMAP(
  email: string,
  password: string,
  imap_config: { host: string; port: number; secure: boolean }
): Promise<IMAPCheckResult> {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: email,
      password: password,
      host: imap_config.host,
      port: imap_config.port,
      tls: imap_config.secure,
    });

    let foundFolder = 'Unresolved';

    imap.openBox('INBOX', false, (err: any, box: any) => {
      if (err) {
        console.error('❌ IMAP Error:', err);
        imap.end();
        return reject(err);
      }

      // Search for recent emails
      imap.search(['ALL', ['SINCE', new Date(Date.now() - 86400000)]], (err: any, results: any) => {
        if (err) {
          imap.end();
          return reject(err);
        }

        if (results.length === 0) {
          imap.end();
          foundFolder = 'Inbox';
          return resolve({
            folder_location: foundFolder,
            found: false,
            imap_status: 'No recent emails found in Inbox',
          });
        }

        console.log(`✅ Found ${results.length} recent emails in Inbox`);
        foundFolder = 'Inbox';

        imap.end();
        resolve({
          folder_location: foundFolder,
          found: true,
          imap_status: `Email found in Inbox (${results.length} recent emails)`,
        });
      });
    });

    imap.openBox('[Gmail]/Spam', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Spam/Junk';
            console.log(`⚠️ Email found in Spam folder`);
          }
        });
      }
    });

    imap.openBox('[Gmail]/Promotions', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Promotions Tab';
            console.log(`ℹ️ Email found in Promotions`);
          }
        });
      }
    });

    imap.openBox('Junk', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Spam/Junk';
            console.log(`⚠️ Email found in Junk folder (Outlook)`);
          }
        });
      }
    });

    imap.openBox('Junk Email', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Spam/Junk';
            console.log(`⚠️ Email found in Junk Email folder (Outlook)`);
          }
        });
      }
    });

    imap.openBox('Focused Inbox', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Inbox';
            console.log(`✅ Email found in Focused Inbox`);
          }
        });
      }
    });

    imap.openBox('Other', false, (err: any, box: any) => {
      if (!err) {
        imap.search(['ALL'], (err: any, results: any) => {
          if (!err && results.length > 0) {
            foundFolder = 'Other';
            console.log(`ℹ️ Email found in Other folder`);
          }
        });
      }
    });

    imap.error = (err: any) => {
      console.error('IMAP connection error:', err);
      reject(err);
    };

    imap.end();
  });
}

/**
 * IMAP Configuration for different providers
 */
export const IMAP_CONFIGS = {
  gmail: {
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    note: 'Use App Password, not regular password',
  },
  outlook: {
    host: 'outlook.office365.com',
    port: 993,
    secure: true,
    note: 'Use App Password or regular password',
  },
  yahoo: {
    host: 'imap.mail.yahoo.com',
    port: 993,
    secure: true,
    note: 'Use App Password',
  },
  zoho: {
    host: 'imap.zoho.com',
    port: 993,
    secure: true,
    note: 'Use account password',
  },
};

export type IMAPProvider = keyof typeof IMAP_CONFIGS;
