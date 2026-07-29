import { createServerClient } from './supabase';
import fs from 'fs';
import path from 'path';

// Local fallbacks
const VERIFIED_EMAILS_FILE = path.join(process.cwd(), 'verified-emails.txt');
const ACCESS_LOGS_FILE = path.join(process.cwd(), 'free-tools-access-logs.txt');

// Server-side in-memory OTP store (no database table needed for OTP codes)
// Persisted on global object in development to prevent wiping during hot-reloads
const globalForOTP = global as unknown as {
  otpStore: Map<string, { otp: string; expires: number }>;
};
const otpStore = globalForOTP.otpStore || new Map<string, { otp: string; expires: number }>();
if (process.env.NODE_ENV !== 'production') {
  if (!globalForOTP.otpStore) {
    globalForOTP.otpStore = otpStore;
    console.log(`✅ [OTP Store] Global OTP store initialized`);
  }
}

// Helper to initialize local text files if they don't exist
function initLocalFiles() {
  try {
    if (!fs.existsSync(VERIFIED_EMAILS_FILE)) {
      fs.writeFileSync(VERIFIED_EMAILS_FILE, '', 'utf-8');
      console.log('📝 Created verified-emails.txt');
    }
    if (!fs.existsSync(ACCESS_LOGS_FILE)) {
      fs.writeFileSync(ACCESS_LOGS_FILE, JSON.stringify([]), 'utf-8');
      console.log('📝 Created free-tools-access-logs.txt');
    }
  } catch (err) {
    console.error('Error initializing fallback files:', err);
  }
}

// Extract company domain from email
export function getCompanyDomain(email: string): string {
  const parts = email.split('@');
  return parts.length > 1 ? parts[1].toLowerCase().trim() : '';
}

// 1. Get all verified users and their usage statistics (combining DB & fallback files)
export async function dbGetVerifiedUsers() {
  initLocalFiles();
  const usersMap = new Map<string, any>();

  // Attempt Supabase fetch
  try {
    const supabase = createServerClient();
    console.log('🔌 DB: Fetching verified users from Supabase...');
    
    // Fetch all users
    const { data: dbUsers, error: usersErr } = await supabase
      .from('free_tool_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (usersErr) {
      console.warn('⚠️ Supabase users fetch warning:', usersErr.message);
    } else if (dbUsers) {
      // Fetch access logs
      const { data: dbLogs, error: logsErr } = await supabase
        .from('user_free_tool_access')
        .select('*');

      if (logsErr) {
        console.warn('⚠️ Supabase access logs fetch warning:', logsErr.message);
      }

      for (const u of dbUsers) {
        const userLogs = (dbLogs || []).filter((l: any) => l.user_id === u.id || l.email === u.email);
        usersMap.set(u.email.toLowerCase(), {
          id: u.id,
          email: u.email,
          company_domain: u.company_domain || getCompanyDomain(u.email),
          email_verified: u.email_verified,
          verified_at: u.verified_at || u.created_at,
          last_login: u.last_login || u.updated_at,
          created_at: u.created_at,
          usage: userLogs.map((l: any) => ({
            tool_name: l.tool_name,
            usage_count: l.usage_count,
            last_accessed_at: l.last_accessed_at,
          })),
        });
      }
    }
  } catch (error: any) {
    console.warn('⚠️ Supabase not reachable, using fallback file registry. Details:', error.message);
  }

  // Load from local files (for local offline mode or sync fallback)
  try {
    if (fs.existsSync(VERIFIED_EMAILS_FILE)) {
      const content = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
      const fileEmails = content
        .split('\n')
        .map(e => e.trim().toLowerCase())
        .filter(e => e.length > 0);

      // Read local access logs
      let localLogs: any[] = [];
      if (fs.existsSync(ACCESS_LOGS_FILE)) {
        try {
          localLogs = JSON.parse(fs.readFileSync(ACCESS_LOGS_FILE, 'utf-8'));
        } catch {
          localLogs = [];
        }
      }

      for (const email of fileEmails) {
        if (!usersMap.has(email)) {
          const userLogs = localLogs.filter((l: any) => l.email === email);
          usersMap.set(email, {
            id: `local-${email}`,
            email: email,
            company_domain: getCompanyDomain(email),
            email_verified: true,
            verified_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            created_at: new Date().toISOString(),
            usage: userLogs.map((l: any) => ({
              tool_name: l.tool_name,
              usage_count: l.usage_count,
              last_accessed_at: l.last_accessed_at,
            })),
          });
        } else {
          // If in DB but not marked verified there, override with local file verification
          const existing = usersMap.get(email);
          if (!existing.email_verified) {
            existing.email_verified = true;
            existing.verified_at = existing.verified_at || new Date().toISOString();
          }
          // Merge local logs if not in DB
          const localLogsForEmail = localLogs.filter((l: any) => l.email === email);
          for (const ll of localLogsForEmail) {
            const hasTool = existing.usage.some((u: any) => u.tool_name === ll.tool_name);
            if (!hasTool) {
              existing.usage.push({
                tool_name: ll.tool_name,
                usage_count: ll.usage_count,
                last_accessed_at: ll.last_accessed_at,
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading fallback verified emails file:', err);
  }

  return Array.from(usersMap.values());
}

// 2. Add verified user (Optimized to perform Supabase write in background)
export async function dbAddVerifiedUser(email: string) {
  initLocalFiles();
  const normalizedEmail = email.toLowerCase().trim();
  const domain = getCompanyDomain(normalizedEmail);

  // Write to local file first to ensure offline-first verification works instantly (< 1ms)
  try {
    const fileContent = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
    const existingEmails = fileContent
      .split('\n')
      .map(e => e.trim().toLowerCase())
      .filter(e => e.length > 0);

    if (!existingEmails.includes(normalizedEmail)) {
      fs.appendFileSync(VERIFIED_EMAILS_FILE, `${normalizedEmail}\n`, 'utf-8');
      console.log(`✅ Appended ${normalizedEmail} to verified-emails.txt`);
    }
  } catch (err) {
    console.error('Error writing fallback verified-emails.txt:', err);
  }

  // Save to Supabase asynchronously in background (do NOT await it so the response is sent immediately!)
  Promise.resolve().then(async () => {
    try {
      const supabase = createServerClient();
      console.log(`🔌 DB: Upserting user ${normalizedEmail} in Supabase free_tool_users table in background...`);

      // Check if user exists
      const { data: existingUser, error: findError } = await supabase
        .from('free_tool_users')
        .select('id')
        .eq('email', normalizedEmail)
        .single();

      if (existingUser) {
        const { error: updateError } = await supabase
          .from('free_tool_users')
          .update({
            email_verified: true,
            verified_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingUser.id);
        
        if (updateError) {
          console.error(`❌ Supabase update failed for ${normalizedEmail}:`, updateError.message);
        } else {
          console.log(`✅ Updated existing user in Supabase: ${normalizedEmail}`);
        }
      } else {
        const { error: insertError } = await supabase
          .from('free_tool_users')
          .insert([
            {
              email: normalizedEmail,
              company_domain: domain,
              email_verified: true,
              verified_at: new Date().toISOString(),
              last_login: new Date().toISOString(),
            }
          ]);

        if (insertError) {
          console.warn('⚠️ Supabase insert user failed:', insertError.message);
        } else {
          console.log(`✅ Inserted new user in Supabase: ${normalizedEmail}`);
        }
      }
    } catch (error: any) {
      console.warn('⚠️ Supabase not reachable during background dbAddVerifiedUser:', error.message);
    }
  });

  return true;
}

// 3. Check if user is verified
export async function dbCheckUserVerified(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();

  // Try file first as a fast path for local offline fallback
  try {
    if (fs.existsSync(VERIFIED_EMAILS_FILE)) {
      const content = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
      const fileEmails = content
        .split('\n')
        .map(e => e.trim().toLowerCase())
        .filter(e => e.length > 0);
      if (fileEmails.includes(normalizedEmail)) {
        return true;
      }
    }
  } catch (err) {
    console.error('Error reading verified-emails.txt:', err);
  }

  // Try Supabase
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('free_tool_users')
      .select('email_verified')
      .eq('email', normalizedEmail)
      .single();

    if (!error && data) {
      return data.email_verified;
    }
  } catch (error: any) {
    console.warn('⚠️ Supabase error in dbCheckUserVerified:', error.message);
  }

  return false;
}

// 4. Save generated OTP (Pure server cache storage)
export async function dbSaveOTP(email: string, otpCode: string, expiresAt: Date) {
  const normalizedEmail = email.toLowerCase().trim();

  // Store OTP in server cache map
  otpStore.set(normalizedEmail, {
    otp: otpCode,
    expires: expiresAt.getTime(),
  });
  console.log(`💾 Stored OTP ${otpCode} in server-side cache for ${normalizedEmail}. Valid until ${expiresAt.toISOString()}`);

  return true;
}

// 5. Verify OTP against server cache
export async function dbVerifyOTP(email: string, otpCode: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const receivedOtp = otpCode.trim();
  const now = Date.now();

  console.log(`🔍 [VERIFY OTP] Checking cache for email: "${normalizedEmail}" (Received code: "${receivedOtp}")`);
  console.log(`🔍 [VERIFY OTP] Current cache keys:`, Array.from(otpStore.keys()));

  const cached = otpStore.get(normalizedEmail);
  if (!cached) {
    console.warn(`❌ [VERIFY OTP] No cached OTP entry found for: "${normalizedEmail}". Expiry might have triggered or process was restarted.`);
    return false;
  }

  console.log(`🔍 [VERIFY OTP] Stored code is "${cached.otp}". Expires at: ${new Date(cached.expires).toISOString()} (Current: ${new Date(now).toISOString()})`);

  if (now > cached.expires) {
    console.warn(`❌ [VERIFY OTP] OTP has expired for: "${normalizedEmail}"`);
    otpStore.delete(normalizedEmail);
    return false;
  }

  if (cached.otp !== receivedOtp) {
    console.warn(`❌ [VERIFY OTP] OTP code mismatch for "${normalizedEmail}": Expected "${cached.otp}", Got "${receivedOtp}"`);
    return false;
  }

  // OTP matched and is valid!
  otpStore.delete(normalizedEmail);
  console.log(`✅ [VERIFY OTP] OTP matched! Granting access to: "${normalizedEmail}"`);
  
  // Verification complete: mark as verified in background (resolves instantly!)
  dbAddVerifiedUser(normalizedEmail).catch((err) => {
    console.error('Background dbAddVerifiedUser failed:', err);
  });
  
  return true;
}

// 6. Log free tool usage (Optimized to perform Supabase write in background)
export async function dbLogAccess(email: string, toolName: string) {
  initLocalFiles();
  const normalizedEmail = email.toLowerCase().trim();

  // File Logging Fallback (instant)
  try {
    let localLogs: any[] = [];
    if (fs.existsSync(ACCESS_LOGS_FILE)) {
      try {
        localLogs = JSON.parse(fs.readFileSync(ACCESS_LOGS_FILE, 'utf-8'));
      } catch {
        localLogs = [];
      }
    }

    const logIdx = localLogs.findIndex(l => l.email === normalizedEmail && l.tool_name === toolName);
    if (logIdx >= 0) {
      localLogs[logIdx].usage_count += 1;
      localLogs[logIdx].last_accessed_at = new Date().toISOString();
    } else {
      localLogs.push({
        email: normalizedEmail,
        tool_name: toolName,
        usage_count: 1,
        last_accessed_at: new Date().toISOString(),
      });
    }

    fs.writeFileSync(ACCESS_LOGS_FILE, JSON.stringify(localLogs, null, 2), 'utf-8');
    console.log(`✅ Logged access locally: ${normalizedEmail} used ${toolName}`);
  } catch (err) {
    console.error('Error logging access locally:', err);
  }

  // DB Sync in background (do NOT await it so the response is sent immediately!)
  Promise.resolve().then(async () => {
    try {
      const supabase = createServerClient();
      
      // Fetch user if they exist (using maybeSingle to prevent PGRST116 single() errors)
      const { data: user } = await supabase
        .from('free_tool_users')
        .select('id')
        .eq('email', normalizedEmail)
        .maybeSingle();

      // Check if access record exists by email and toolName (indexed)
      const { data: existingAccess } = await supabase
        .from('user_free_tool_access')
        .select('id, usage_count')
        .eq('email', normalizedEmail)
        .eq('tool_name', toolName)
        .maybeSingle();

      if (existingAccess) {
        const { error: updateErr } = await supabase
          .from('user_free_tool_access')
          .update({
            usage_count: (existingAccess.usage_count || 0) + 1,
            last_accessed_at: new Date().toISOString(),
          })
          .eq('id', existingAccess.id);

        if (updateErr) {
          console.error(`❌ Supabase log-access update failed for ${normalizedEmail}:`, updateErr.message);
        } else {
          console.log(`✅ Updated existing access log in Supabase: ${normalizedEmail} -> ${toolName}`);
        }
      } else {
        const { error: insertErr } = await supabase
          .from('user_free_tool_access')
          .insert({
            user_id: user?.id || null,
            email: normalizedEmail,
            tool_name: toolName,
            usage_count: 1,
          });

        if (insertErr) {
          console.error(`❌ Supabase log-access insert failed for ${normalizedEmail}:`, insertErr.message);
        } else {
          console.log(`✅ Logged access to Supabase: ${normalizedEmail} used ${toolName}`);
        }
      }
    } catch (error: any) {
      console.warn('⚠️ Supabase logging failed in background:', error.message);
    }
  });

  return true;
}

// 7. Revoke/delete a user
export async function dbDeleteUser(email: string) {
  initLocalFiles();
  const normalizedEmail = email.toLowerCase().trim();

  // Remove from file
  try {
    if (fs.existsSync(VERIFIED_EMAILS_FILE)) {
      const content = fs.readFileSync(VERIFIED_EMAILS_FILE, 'utf-8');
      const emails = content
        .split('\n')
        .map(e => e.trim().toLowerCase())
        .filter(e => e.length > 0 && e !== normalizedEmail);
      
      fs.writeFileSync(VERIFIED_EMAILS_FILE, emails.join('\n') + (emails.length > 0 ? '\n' : ''), 'utf-8');
      console.log(`🗑️ Removed ${normalizedEmail} from verified-emails.txt`);
    }

    if (fs.existsSync(ACCESS_LOGS_FILE)) {
      try {
        let localLogs = JSON.parse(fs.readFileSync(ACCESS_LOGS_FILE, 'utf-8'));
        localLogs = localLogs.filter((l: any) => l.email !== normalizedEmail);
        fs.writeFileSync(ACCESS_LOGS_FILE, JSON.stringify(localLogs, null, 2), 'utf-8');
      } catch {
        // ignore
      }
    }
  } catch (err) {
    console.error('Error deleting user from files:', err);
  }

  // Remove from Supabase
  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('free_tool_users')
      .delete()
      .eq('email', normalizedEmail);

    if (error) {
      console.warn('⚠️ Supabase delete user failed:', error.message);
    } else {
      console.log(`✅ Deleted user from Supabase: ${normalizedEmail}`);
    }
  } catch (error: any) {
    console.warn('⚠️ Supabase error during delete:', error.message);
  }

  return true;
}
