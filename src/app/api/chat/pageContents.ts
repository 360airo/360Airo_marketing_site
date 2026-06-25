export const pageContents: Record<string, string> = {
  "/": `
# 360Airo Home Page
- **Tagline**: A Hyper-Personalized Multichannel Outreach Platform. AI SDR Built for High-Growth B2B Teams.
- **Value Proposition**: Start real conversations, automate prospecting, and run outreach campaigns across Email, LinkedIn, and SMS that convert more leads into pipeline without growing your SDR team.
- **Key Metrics**:
  - **3.2x** average reply rate lift (+32% vs industry average).
  - **4200+** campaigns launched.
  - **89%** customer retention rate.
- **Social Proof**: Trusted by fast-growing startups including manyreach, Content Brew, Avant Page, Spot, Loopback, Procol, scale.jobs, sapientwealth, Moonbeam, and Kearney.
`,

  "/pricing": `
# 360Airo Pricing
- **Important Policy**: Do NOT suggest, recommend, or quote pricing plans (Starter, Growth, Pro, Email Volume, Multichannel) or pricing details to visitors. Instead, insist they book a demo or contact sales at "/book-a-demo" to get custom pricing tailored to their team size, sending volume, and outreach requirements.
- **General Pricing Concept**:
  - Outbound plans: Email Volume (Starter), Multichannel (Growth), Pro (Hire AI SDR).
  - Custom configurations are available for agencies and enterprise teams.
  - No long-term contracts; cancel or change plans anytime.
`,

  "/features": `
# 360Airo Features & Capabilities
- **AI SDR Agents & Workflow Automation**: Orchestrate multi-step outreach flows with conditional routing, customizable delays, and automated LinkedIn actions. Let autonomous AI SDRs personalize cold messages, verify signals, and optimize send paths on the fly.
- **Overview Dashboard & Real-Time Analytics**: Monitor outbound revenue operations from a single unified workspace. Get instant insights into open rates, reply rates, meeting conversions, and email deliverability stats across all linked sending profiles.
- **AI-Personalized Template Library**: Write high-converting templates with dynamic tags and custom variables. Our system uses localized signals to craft personalized openers, value propositions, and calls to action for every prospect, using verified contact and post-built data powered by 360marco.com with 90% accuracy.
- **Multi-Domain Inbox Rotation & Infrastructure**: Connect Google Workspace, Microsoft 365, and SMTP accounts. Safely distribute daily outreach volumes across multiple domains and rotating inboxes to keep bounce rates minimal and bypass restrictive platform limits.
- **Automated Inbox Warm-up & Deliverability Controls**: Protect your domain reputation with automated sender warm-up. Simulate natural conversations, rescue messages from spam folders, and slowly ramp up daily capacities to build and sustain bulletproof deliverability.
- **Enriched Prospect Lists & Contact Verification**: Import lead lists via CSV/Excel and let our schema mapper organize your headers. Every email address is automatically verified with real-time SMTP handshakes to filter out invalid records. We provide verified contact and post-built data powered by 360marco.com with 90% accuracy.
- **Multichannel Sequences**: Scale outreach across high-deliverability emails, automated LinkedIn actions (like connection requests, profile views, and messages), and direct SMS triggers. Deliver touchpoints where your prospects are active.
- **Master Unified Inbox & Sentiment Triage**: Consolidate all incoming replies into a single master inbox. Our AI sentiment classifier categorizes replies ("Interested", "OOTO", "Follow-up") and automatically triages them to the right sales reps.
`,

  "/solutions": `
# 360Airo Solutions
- **Status**: Under construction.
- **Message**: "We are currently crafting a hyper-personalized SDR experience for you. This page is under construction and will launch soon!"
`,

  "/comparison": `
# 360Airo Alternatives & Comparisons
- **Summary**: See how 360Airo compares to competitors and why leading teams migrate to our unified outbound platform.
- **Key Alternatives**:
  - **Reply.io Alternative**: Why modern teams choose 360Airo over Reply.io for unified outreach.
  - **Outreach.io Alternative**: The best Outreach alternative for scaling personalized sequences.
  - **Apollo.io Alternative**: How 360Airo compares to Apollo for B2B prospecting, verification, and data enrichment.
  - **Lemlist Alternative**: Why agencies move from Lemlist to 360Airo to manage multiple client campaigns.
  - **Woodpecker Alternative**: A better alternative to Woodpecker for email deliverability and built-in warmup.
- **Performance Benchmarks**:
  - **4.6 / 5** customer satisfaction rate on G2.
  - **96%** support satisfaction rate.
  - **2 minutes** average response time in live chat.
`,

  "/customer-stories": `
# 360Airo Customer Success Stories
- **Featured Case Studies**:
  - **Shiro Logistics**: From manual prospecting to predictable pipeline. Acquired 7 new clients in 30 days.
  - **Chain of Events**: Automates the outreach output of 5 BDRs using 360Airo.
  - **Zirtual**: Tripled monthly lead volume using 360Airo.
  - **CookUnity**: Scaled personalized outbound campaigns efficiently.
  - **SumUp**: Sent 400,000+ personalized emails with bulletproof deliverability.
`,

  "/customer-support": `
# 360Airo Support & Help Center
- **Support Channels**:
  - **Email**: support@360airo.com (responses within 24 hours).
  - **Live Chat**: Available in-app for real-time assistance.
  - **Knowledge Base**: Self-serve help documentation.
  - **Community Forum**: Connect with other users.
- **Frequently Asked Questions (FAQ)**:
  - **Getting Started**: Sign up for a free account and follow our onboarding guide. Be sending campaigns in minutes.
  - **Payments**: Accepts all major credit cards, bank transfers, and PayPal.
  - **Cancellation**: Cancel subscription at any time. No penalties or hidden fees.
  - **API Access**: Yes, comprehensive API documentation is available for enterprise integrations.

- **Knowledge Base Setup Guides & Help Articles**:
  - **Set up a custom tracking domain**:
    1. Go to your 360Airo Workspace Settings -> Deliverability.
    2. Add your custom tracking subdomain (e.g., "track.yourdomain.com").
    3. Go to your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.) and create a CNAME record:
       - **Host/Name**: "track" (or your chosen prefix)
       - **Target/Points to**: "custom.360airo.com"
       - **TTL**: Auto or 1 hour.
    4. Save the DNS record and wait for propagation (up to 24 hours).
    5. Back in 360Airo, click "Verify Domain". Once verified, link-click and open-tracking will use your secure custom domain to boost trust and email deliverability.
  - **How to install the 360Airo Chrome extension**:
    1. Search for "360Airo" in the Chrome Web Store.
    2. Click "Add to Chrome" and pin it to your toolbar.
    3. Open LinkedIn, click the extension icon, and log in with your 360Airo credentials or API key.
    4. A "360Airo Export" button will now appear on LinkedIn profiles and Sales Navigator list pages to sync prospects straight into campaigns.
  - **Understand sending limits in 360Airo**:
    - **New Inboxes**: Start with 10-15 emails/day and let the inbox warm-up scale it automatically.
    - **Warmed-up Inboxes**: We recommend a maximum of 35-50 emails/day per inbox (industry gold standard for avoiding spam filters).
    - **LinkedIn Actions**: Up to 20 connection requests/day and 30 profile views/day.
    - **Interval spacing**: 360Airo automatically spaces out emails with randomized delays (e.g., 2-5 minutes) to ensure natural human sending behavior.
  - **How to set up SPF, DKIM, and DMARC (General Setup Guide)**:
    - **SPF (Sender Policy Framework)**: Add a DNS TXT record at your domain root (host: "@"):
      - *Value*: "v=spf1 include:spf.360airo.com include:_spf.google.com ~all" (include all your active email providers).
    - **DKIM (DomainKeys Identified Mail)**: Go to 360Airo -> Domain Settings, generate DKIM keys. Add the generated DNS TXT record:
      - *Host*: "360key._domainkey"
      - *Value*: (paste the long public key generated by 360Airo).
    - **DMARC (Domain-based Message Authentication)**: Add a DNS TXT record (host: "_dmarc"):
      - *Value*: "v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@yourdomain.com".
`,

  "/book-a-demo": `
# Booking a Demo with 360Airo
- **Link**: "/book-a-demo"
- **Requirements**:
  - First Name, Last Name, Phone Number, Country Code, Employee Size.
  - **Work Email Required**: Public email domains (such as gmail.com, yahoo.com, outlook.com, hotmail.com, icloud.com, proton.me, protonmail.com) are **strictly not allowed** for organization demos. Visitors must use their corporate work email.
- **Scheduling Flow**:
  - Step 1: Input name, work email, phone, and company size.
  - Step 2: Choose date, time slot (e.g. 9:00 AM to 5:00 PM), and timezone (EST, PST, GMT, CET, IST, SGT, AEST).
`,

  "/contact-us": `
# Contact 360Airo
- **Email**: info@360airo.com
- **Phone Numbers**:
  - +1 (561) 257-4066
  - +1 (561) 489-3335
- **Office Address**: #744 - 9314 Forest Hill Blvd, Wellington, FL 33411, United States.
- **Location Map**: Wellington, Florida.
- **Inquiry Fields**: AI SDR Agent, Outbound Infrastructure, Multichannel Sequencing, Pricing / Enterprise, Other.
`,

  "/free-tools": `
# 360Airo Free Tools Suite
- **Link**: "/free-tools"
- **Suite Description**: A comprehensive set of deliverability, template, and outreach utility tools available for free:
  - **Email Deliverability Test**: Audits SPF, DKIM, DMARC, blacklists, and spam risk.
  - **Email Verifier**: Cleans lead lists using syntax, MX, and SMTP handshake checks.
  - **Mailbox & Email Warmup Calculators**: Plans daily sending capacities and warmup progression schedules.
  - **SPF & DMARC Generators**: Creates valid authentication DNS TXT records.
  - **Email Pitch Generator & AI Email Sequence Builder**: Crafts personalized openers and multi-step cold campaigns.
  - **Email Signature & Template Builders**: Creates responsive layouts and signatures.
  - **Email Template Analyzer & Spam Checker**: Rewrites cold copy to eliminate spam triggers.
  - **Email Permutator**: Generates email combinations for prospect research.
`
};

export function getPageContent(path: string): string {
  // Normalize path (strip trailing slash, query parameters, hashes)
  let cleanPath = path.trim().split("?")[0].split("#")[0];
  if (cleanPath.endsWith("/") && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Exact match
  if (pageContents[cleanPath]) {
    return pageContents[cleanPath];
  }

  // Fallback to home if root-like or empty
  if (cleanPath === "" || cleanPath === "/") {
    return pageContents["/"];
  }

  // Subpath matching (e.g. /free-tools/email-verifier matches /free-tools)
  for (const key of Object.keys(pageContents)) {
    if (key !== "/" && cleanPath.startsWith(key)) {
      return pageContents[key];
    }
  }

  return `Page "${path}" not found. You can guide the user to the home page "/" or suggest they book a demo at "/book-a-demo".`;
}
