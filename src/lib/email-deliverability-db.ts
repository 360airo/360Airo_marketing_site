// In-memory database for email deliverability tracking
// In production, replace with MongoDB, PostgreSQL, or Firebase

interface SentEmail {
  test_id: string;
  recipient_email: string;
  sent_from: string;
  provider: string;
  marked_sent_at: string;
  status: 'pending' | 'sent' | 'checking' | 'delivered' | 'spam' | 'unresolved';
  folder_location?: string;
  opened_count: number;
  clicked_count: number;
}

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  password?: string; // For IMAP (should be encrypted in production)
  app_password?: string; // For Gmail/Outlook
  imap_host: string;
  imap_port: number;
  created_at: string;
}

// Use global object for persistence across requests
const globalStore = global as any;

function getSentEmails(): Map<string, SentEmail> {
  if (!globalStore.sentEmails) {
    globalStore.sentEmails = new Map();
  }
  return globalStore.sentEmails;
}

function getEmailAccounts(): Map<string, EmailAccount> {
  if (!globalStore.emailAccounts) {
    globalStore.emailAccounts = new Map();
  }
  return globalStore.emailAccounts;
}

export const db = {
  // Sent Emails
  addSentEmail: (email: SentEmail) => {
    getSentEmails().set(email.test_id, email);
    console.log(`✅ Marked email as sent: ${email.recipient_email} from ${email.sent_from}`);
  },

  getSentEmails: () => {
    return Array.from(getSentEmails().values());
  },

  getSentEmailById: (test_id: string) => {
    return getSentEmails().get(test_id);
  },

  updateSentEmailStatus: (test_id: string, update: Partial<SentEmail>) => {
    const sentEmails = getSentEmails();
    const email = sentEmails.get(test_id);
    if (email) {
      sentEmails.set(test_id, { ...email, ...update });
      console.log(`✅ Updated ${test_id}: ${update.status}`);
    }
  },

  // Email Accounts
  addEmailAccount: (account: EmailAccount) => {
    getEmailAccounts().set(account.id, account);
    console.log(`✅ Added email account: ${account.email}`);
    console.log(`📋 Stored accounts:`, Array.from(getEmailAccounts().values()).map(a => a.email));
  },

  getEmailAccounts: () => {
    return Array.from(getEmailAccounts().values());
  },

  getEmailAccountByEmail: (email: string) => {
    const accounts = Array.from(getEmailAccounts().values());
    const found = accounts.find(acc => acc.email === email);
    console.log(`🔍 Looking for account: ${email}`);
    console.log(`📋 Available accounts:`, accounts.map(a => a.email));
    console.log(`✅ Found:`, found ? 'YES' : 'NO');
    return found;
  },

  deleteEmailAccount: (id: string) => {
    getEmailAccounts().delete(id);
  },

  // Clear all (for testing)
  clear: () => {
    getSentEmails().clear();
    getEmailAccounts().clear();
  },
};

export type { SentEmail, EmailAccount };
