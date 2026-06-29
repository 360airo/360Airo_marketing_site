"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #020817 0%, #06122B 38%, #081B3E 68%, #020817 100%)',
      fontFamily: "'Outfit', sans-serif",
      color: '#fff'
    }}>
      <Navbar activeTab="" />

      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 20px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        lineHeight: '1.7',
        color: '#cbd5e1'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '40px',
          background: 'linear-gradient(90deg, #fff 0%, #b0c4ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          Privacy Policy
        </h1>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Introduction</h2>
          <p style={{ marginBottom: '16px' }}>At 360 Airo, your privacy is our priority. We are committed to protecting the confidentiality, integrity, and security of your personal data.</p>
          <p style={{ marginBottom: '16px' }}>For our multichannel outreach services (Email, LinkedIn and SMS), we do not store, sell, or transmit the actual content of your personal emails or private messages from within your inbox. However, we may collect metadata (information that describes other data, such as recipient details, send times, and engagement metrics like opens and clicks) strictly for providing those Services. For our Lead Finder and Data Enrichment products, we may provide professional contact details such as business email addresses, LinkedIn profile URLs, and mobile numbers to subscribers, as explained in this Privacy Policy.</p>
          <p style={{ marginBottom: '16px' }}>Our platform complies with the latest Content Security Policy (CSP) guidelines, a security standard that acts like a set of rules for your web browser to prevent malicious attacks and control which resources can load on our pages ensuring a secure browsing experience.</p>
          <p style={{ marginBottom: '16px' }}>This Privacy Policy explains how we collect, use, and protect your personal data when you access or use our websites, products, services, and applications (collectively, the "Services"). It forms part of our Terms of Service. By using our Services, you acknowledge that we collect, use, and share personal data as described in this Privacy Policy.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Scope of this Privacy Policy</h2>
          <p style={{ marginBottom: '16px' }}>This Privacy Policy applies to the collection, use, and sharing of personally identifiable information ("Personal Data") we collect when you use our Services.</p>
          <p style={{ marginBottom: '16px' }}>This Privacy Policy also applies to our browser extensions, including the 360 Airo LinkedIn & Outreach Chrome Extension. The extension may detect prospect profiles on platforms like LinkedIn, extract contact details, and allow users to initiate multichannel sequences, log activity outcomes, add notes, save activity, and schedule follow-up tasks directly from their browser.</p>
          <p style={{ marginBottom: '16px' }}>We do not knowingly collect or solicit personal data from children under the age of 16. If you are under this age, please do not attempt to register for our Services. If we discover that such data has been collected, we will delete it promptly.</p>
          <p style={{ marginBottom: '16px' }}>We process your Personal Data only when we get Consent: Where you have explicitly given permission.<br/>
          Contractual Necessity: Where processing is necessary to fulfill a contract with you.<br/>
          Legal Obligation: When processing is required to comply with the law.<br/>
          Legitimate Interests: Where processing is necessary for our legitimate business operations, provided these do not override your fundamental rights and freedoms.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Modifications to This Privacy Policy</h2>
          <p style={{ marginBottom: '16px' }}>We may update this Privacy Policy as our Services evolve. Changes will be posted on this page. Where required by law, we will provide additional notice of material changes.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Information We Collect</h2>
          <p style={{ marginBottom: '16px' }}>We collect various types of data to provide our AI-driven multichannel outreach Services effectively. The following table outlines the data we collect and its lawful basis for processing:</p>
          <p style={{ marginBottom: '16px' }}>In addition to our core 360 Airo services, we offer Lead Finder and Data Enrichment tools, which provide subscribers with professional contact information such as names, job titles, company details, business email addresses, and mobile numbers. This data is collected from publicly available sources, licensed third-party providers, and lawful enrichment processes.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Use of Collected Information</h2>
          <p style={{ marginBottom: '16px' }}>The information collected is used to maintain and improve the service. For example, it allows you to save settings or modify aspects of the service based on anonymous usage statistics.</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>To personalize your experience:</strong> Your information helps us to better respond to your individual needs, including powering our AI personalization engine to draft highly relevant outreach messages.</li>
            <li style={{ marginBottom: '8px' }}><strong>To improve our Services:</strong> We continually strive to improve our AI algorithms and platform features based on the information and feedback we receive from you.</li>
            <li style={{ marginBottom: '8px' }}><strong>To improve customer service:</strong> Your information helps us to more effectively respond to your support needs.</li>
            <li style={{ marginBottom: '8px' }}><strong>To contact you:</strong> By email or other electronic communication (such as mobile app push notifications) regarding updates, security alerts, or informative communications related to functionalities or contracted services.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Data Disclosure</h2>
          <p style={{ marginBottom: '16px' }}>We do not sell, trade, or transfer your personal information except as outlined here. Trusted third parties may have access to your data in connection with their services for 360 Airo, provided they adhere to confidentiality obligations.</p>
          <p style={{ marginBottom: '16px' }}>If we transfer your Personal Data outside the EEA or UK, we ensure that appropriate safeguards, such as Standard Contractual Clauses (SCCs) pre-approved legal contracts that ensure your data remains protected when moved across borders or adequacy decisions, are in place to ensure lawful transfer.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Email Warmup</h2>
          <p style={{ marginBottom: '16px' }}>360 Airo offers a built-in Email Warmup feature designed to automatically build and maintain a strong sender reputation for your connected mailboxes. When enabled, our system sends and receives automated emails through a secure network of inboxes to simulate natural human sending behavior.</p>
          <p style={{ marginBottom: '16px' }}>During this process, we follow specific numerical guidelines to ensure natural sending behavior. Typically, the warmup starts with a low volume of 5 to 10 emails per day and gradually increases over a period of 14 to 30 days, ensuring your daily sending limit is reached safely without triggering spam filters.</p>
          <p style={{ marginBottom: '16px' }}>We only process metadata (such as sender, recipient, subject line, and whether the email landed in the spam folder) to monitor deliverability and adjust warmup algorithms. We do not read, store, or analyze the actual content of your business emails during the warmup process.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>360 Airo LinkedIn & Outreach Chrome Extension</h2>
          <p style={{ marginBottom: '16px' }}>This section applies to the 360 Airo LinkedIn & Outreach Chrome Extension and supplements the rest of this Privacy Policy.</p>
          <p style={{ marginBottom: '16px' }}>The extension is designed to detect prospect profiles on LinkedIn and other web pages, extract contact information, and allow users to manage multichannel outreach from their browser, including logging activity outcomes, adding notes, and scheduling follow-up tasks.</p>
          <p style={{ marginBottom: '16px' }}>To provide this functionality, the extension may request permissions such as <code>activeTab</code>, <code>host permissions</code>, <code>storage</code>, <code>scripting</code>, and <code>notifications</code>. These permissions are used to detect profiles, display outreach options, store user preferences, and send campaign-related alerts.</p>
          
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', marginTop: '24px', marginBottom: '16px' }}>Data Processed by the Extension</h3>
          <p style={{ marginBottom: '16px' }}>The 360 Airo Chrome Extension scans visible webpage content locally in your browser to identify profile patterns and extract contact details. We do not transmit, store, or analyze the full contents of webpages you visit.</p>
          <p style={{ marginBottom: '16px' }}>When you use the extension, we may process limited data needed to provide outreach functionality, including profile URLs, extracted email addresses, connection request statuses, message responses, notes, tags, dispositions, follow-up tasks, authentication/session identifiers, and, where applicable, the page URL for CRM activity logging.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>CRM and Third-Party Integrations</h2>
          <p style={{ marginBottom: '16px' }}>When you connect 360 Airo to a third-party CRM or platform, such as HubSpot, Salesforce, Pipedrive, or Zoho, we may sync email activity, LinkedIn engagement, notes, tasks, and related details to that platform at your direction. Your use of any connected third-party service is governed by that service's own terms and privacy policy. 360 Airo is not responsible for the privacy or security practices of third-party services, except for data we transmit to them on your instruction.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Chrome Web Store Limited Use Disclosure</h2>
          <p style={{ marginBottom: '16px' }}>360 Airo's use and transfer of data collected or accessed through the Chrome Extension, including any data received from Google APIs, will comply with the Chrome Web Store User Data Policy, including the Limited Use requirements. Specifically, we affirm that we will not:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Sell user data;</li>
            <li style={{ marginBottom: '8px' }}>Use or transfer user data for advertising or interest-based ads;</li>
            <li style={{ marginBottom: '8px' }}>Use or transfer user data for purposes unrelated to the extension's disclosed outreach functionality;</li>
            <li style={{ marginBottom: '8px' }}>Allow human access to user data except with user consent, for security, to comply with law, or where data is aggregated and anonymized.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Data Protection</h2>
          <p style={{ marginBottom: '16px' }}>We protect your data through encryption, access controls, and administrative, physical, and technical safeguards.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Sharing of Personal Information</h2>
          <p style={{ marginBottom: '16px' }}>We neither rent nor sell your Personal Information to anyone. However, we may share your Personal Information with third parties as described below:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Group Accounts:</strong> If your account is managed by a company administrator, they may have access to your account information and stats.</li>
            <li style={{ marginBottom: '8px' }}><strong>Agents and Vendors:</strong> We employ third-party hosting providers, email delivery infrastructure providers, or software developers to help implement the Services. They have no right to use the Personal Information beyond what is necessary to assist us.</li>
            <li style={{ marginBottom: '8px' }}><strong>Business Transfers:</strong> If we are involved in a reorganization, merger, or acquisition, your information may be transferred. We will notify you in advance.</li>
            <li style={{ marginBottom: '8px' }}><strong>Protection of 360 Airo and Others:</strong> We may disclose information to comply with the law, enforce our terms, or protect rights, property, or safety.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Data Access, Correction, and Deletion</h2>
          <p style={{ marginBottom: '16px' }}>You have the right to access, update, or request the deletion of your personal data. If you'd like to have your personal information removed from our Lead Finder database, reach out to us at <a href="mailto:privacy@360airo.com" style={{ color: '#2f7bff', textDecoration: 'none' }}>privacy@360airo.com</a>. We may need to verify your identity before processing these requests.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Retention of Personal Data</h2>
          <p style={{ marginBottom: '16px' }}>We retain Personal Data for as long as your account is active and only for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, or enforce agreements. After the applicable retention period, we may retain information in a depersonalized or aggregated form.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Cookies and Similar Technologies</h2>
          <p style={{ marginBottom: '16px' }}>Whenever you interact with our Services, we automatically receive and record information from your browser or device, which may include cookie information. Cookies are identifiers transferred to your browser that allow us to recognize your device and understand how our Services are visited. For more information, please review our Cookie Policy.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Transfers of Personal Data</h2>
          <p style={{ marginBottom: '16px' }}>Our Services are hosted in the United States. If you reside outside the United States, please note that the laws of the United States may differ from those in your country of residence. By using the Services, you acknowledge that your data may be transferred to, stored in, and processed within the United States.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Application</h2>
          <p style={{ marginBottom: '16px' }}>This Privacy Policy applies to all services offered by 360 Airo. This Privacy Policy does not apply to third-party services, websites, or integrations that are not owned or controlled by 360 Airo.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>What If You Have Questions Regarding Your Personal Data?</h2>
          <p style={{ marginBottom: '16px' }}>If you have any questions about this Privacy Notice or our data practices generally, please contact us using the following information:</p>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Name:</strong> 360 Airo</li>
            <li style={{ marginBottom: '8px' }}><strong>Physical address:</strong> #744 - 9314 Forest Hill Blvd, Wellington, FL 33411</li>
            <li style={{ marginBottom: '8px' }}><strong>Email address for contact:</strong> <a href="mailto:info@360airo.com" style={{ color: '#2f7bff', textDecoration: 'none' }}>info@360airo.com</a></li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
}
