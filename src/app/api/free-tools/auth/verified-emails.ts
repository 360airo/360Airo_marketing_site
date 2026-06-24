import fs from 'fs';
import path from 'path';

const VERIFIED_EMAILS_FILE = path.join(process.cwd(), 'verified-emails.txt');

console.log(`📁 Verified emails file path: ${VERIFIED_EMAILS_FILE}`);

/**
 * Initialize the verified emails file if it doesn't exist
 */
export function initializeVerifiedEmailsFile() {
  try {
    if (!fs.existsSync(VERIFIED_EMAILS_FILE)) {
      fs.writeFileSync(VERIFIED_EMAILS_FILE, '', 'utf-8');
      console.log('📝 Created verified-emails.txt file');
    } else {
      console.log('✅ verified-emails.txt exists');
    }
  } catch (error) {
    console.error('Error initializing verified emails file:', error);
  }
}

/**
 * Get all verified emails from the file
 */
export function getVerifiedEmails(): string[] {
  try {
    if (!fs.existsSync(VERIFIED_EMAILS_FILE)) {
      console.log('📄 [GET EMAILS] File does not exist, initializing...');
      initializeVerifiedEmailsFile();
      return [];
    }
    
    const content = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
    const emails = content
      .split('\n')
      .map(email => email.trim().toLowerCase())
      .filter(email => email.length > 0);
    
    console.log(`📄 [GET EMAILS] Found ${emails.length} verified emails:`, emails);
    return emails;
  } catch (error) {
    console.error('❌ [GET EMAILS] Error reading verified emails:', error);
    return [];
  }
}

/**
 * Check if an email is verified
 */
export function isEmailVerified(email: string): boolean {
  const verifiedEmails = getVerifiedEmails();
  return verifiedEmails.includes(email.toLowerCase());
}

/**
 * Add an email to verified emails list
 */
export function addVerifiedEmail(email: string): boolean {
  try {
    initializeVerifiedEmailsFile();
    
    const normalizedEmail = email.toLowerCase();
    console.log(`📧 [ADD EMAIL] Processing: ${normalizedEmail}`);
    
    // Check if already verified
    if (isEmailVerified(normalizedEmail)) {
      console.log(`📧 [ADD EMAIL] Already verified: ${normalizedEmail}`);
      return true;
    }
    
    // Append email to file
    console.log(`📧 [ADD EMAIL] Writing to file: ${VERIFIED_EMAILS_FILE}`);
    fs.appendFileSync(VERIFIED_EMAILS_FILE, `${normalizedEmail}\n`, 'utf-8');
    console.log(`✅ [ADD EMAIL] Verified email saved: ${normalizedEmail}`);
    
    // Verify it was written
    const content = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
    console.log(`✅ [ADD EMAIL] File content after write:\n${content}`);
    
    return true;
  } catch (error) {
    console.error('❌ [ADD EMAIL] Error adding verified email:', error);
    return false;
  }
}

/**
 * Remove an email from verified list
 */
export function removeVerifiedEmail(email: string): boolean {
  try {
    const normalizedEmail = email.toLowerCase();
    const verifiedEmails = getVerifiedEmails();
    
    const filtered = verifiedEmails.filter(e => e !== normalizedEmail);
    fs.writeFileSync(VERIFIED_EMAILS_FILE, filtered.join('\n') + (filtered.length > 0 ? '\n' : ''), 'utf-8');
    
    console.log(`🗑️ Removed from verified emails: ${normalizedEmail}`);
    return true;
  } catch (error) {
    console.error('Error removing verified email:', error);
    return false;
  }
}

// Initialize on module load
initializeVerifiedEmailsFile();
