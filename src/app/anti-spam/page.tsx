"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AntiSpamPage() {
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
          Usage and Anti-Spam Policy
        </h1>

        <p style={{ marginBottom: '40px', fontSize: '18px', textAlign: 'center' }}>
          At 360Airo, we are committed to promoting responsible, ethical, and compliant outreach practices. This Usage and Anti-Spam Policy outlines the standards every user must follow while using our platform to ensure safe, respectful, and lawful communication across all channels.
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>01. Purpose of the Policy</h2>
          <p style={{ marginBottom: '16px' }}>The goal of this policy is to maintain a high-quality outreach environment for all users while protecting recipients from unsolicited or misleading communication. By using 360Airo, you agree to follow this policy and all applicable local and international email and data protection regulations.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>02. Acceptable Use</h2>
          <p style={{ marginBottom: '16px' }}>360Airo is designed to help businesses and professionals connect with relevant prospects through personalized, permission-based outreach. Users must:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Send messages only to verified and relevant business contacts.</li>
            <li style={{ marginBottom: '8px' }}>Use accurate sender information that clearly identifies your business.</li>
            <li style={{ marginBottom: '8px' }}>Include a valid unsubscribe or opt-out option in every campaign.</li>
            <li style={{ marginBottom: '8px' }}>Maintain a reasonable sending frequency to avoid over-communication.</li>
            <li style={{ marginBottom: '8px' }}>Comply with anti-spam laws such as the CAN-SPAM Act, GDPR, and other data privacy standards.</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>Misuse of the platform to send bulk, irrelevant, or unsolicited messages to non-consenting recipients is strictly prohibited.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>03. Prohibited Activities</h2>
          <p style={{ marginBottom: '16px' }}>To ensure deliverability, compliance, and platform integrity, users must avoid:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Sending emails to purchased, scraped, or rented contact lists.</li>
            <li style={{ marginBottom: '8px' }}>Using deceptive subject lines or misleading information.</li>
            <li style={{ marginBottom: '8px' }}>Sending messages that contain harmful or malicious links, phishing content, or attachments.</li>
            <li style={{ marginBottom: '8px' }}>Impersonating individuals or companies.</li>
            <li style={{ marginBottom: '8px' }}>Sending duplicate or mass emails that could trigger spam filters.</li>
            <li style={{ marginBottom: '8px' }}>Violating any applicable local, national, or international laws governing communication and data usage.</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>Accounts found violating these guidelines may be suspended or permanently terminated without prior notice.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>04. Data Accuracy and Hygiene</h2>
          <p style={{ marginBottom: '16px' }}>Maintaining clean and up-to-date contact data is essential to avoid spam complaints and improve campaign performance. 360Airo provides built-in email verification, bounce tracking, and blacklist monitoring to support compliance. Users are expected to upload only verified contact lists and review them regularly to prevent invalid or outdated addresses.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>05. Monitoring and Enforcement</h2>
          <p style={{ marginBottom: '16px' }}>360Airo actively monitors usage patterns, bounce rates, spam complaints, and sending volumes to identify potential misuse. Our system automatically flags and limits accounts that show suspicious activity or excessive spam indicators.</p>
          <p style={{ marginBottom: '16px' }}>Repeated violations, failure to comply with regulations, or misuse of platform capabilities may result in account suspension or termination.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>06. User Responsibility</h2>
          <p style={{ marginBottom: '16px' }}>Each user is responsible for their content, contact lists, and communication strategy. While 360Airo provides the tools and safeguards to help ensure compliance, it is the user's responsibility to follow all applicable legal and ethical standards when engaging in outreach.</p>
          <p style={{ marginBottom: '16px' }}>Users are also encouraged to stay informed about new regulations or changes to existing laws that may affect their outreach strategy.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>07. How 360Airo Helps Maintain Compliance</h2>
          <p style={{ marginBottom: '16px' }}>360Airo includes several built-in compliance features to help users run ethical and effective campaigns:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Real-time email verification before sending.</li>
            <li style={{ marginBottom: '8px' }}>Automated unsubscribe handling.</li>
            <li style={{ marginBottom: '8px' }}>Domain and sender reputation monitoring.</li>
            <li style={{ marginBottom: '8px' }}>Spam score analysis and testing tools.</li>
            <li style={{ marginBottom: '8px' }}>Daily send limit controls to prevent blacklisting.</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>These safeguards are designed to maintain trust between senders and recipients and to protect your brand reputation.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>08. Reporting Violations</h2>
          <p style={{ marginBottom: '16px' }}>If you believe a 360Airo user is violating this policy or sending unwanted emails, please report it immediately to <a href="mailto:support@360airo.com" style={{ color: '#2f7bff', textDecoration: 'none' }}>support@360airo.com</a>. Include relevant details such as the sender's email, subject line, and any accompanying message.</p>
          <p style={{ marginBottom: '16px' }}>We will investigate all reports promptly and take appropriate action.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>09. Policy Updates</h2>
          <p style={{ marginBottom: '16px' }}>This Usage and Anti-Spam Policy may be updated periodically to reflect new compliance standards, laws, or platform features.</p>
          <p style={{ marginBottom: '16px' }}>Any changes will be posted on this page with an updated effective date. Continued use of the platform after updates indicates your acceptance of the revised policy.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>10. Contact Us</h2>
          <p style={{ marginBottom: '16px' }}>For questions or clarifications regarding this policy, please contact us at:</p>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Email:</strong> <a href="mailto:support@360airo.com" style={{ color: '#2f7bff', textDecoration: 'none' }}>support@360airo.com</a></li>
            <li style={{ marginBottom: '8px' }}><strong>Website:</strong> <a href="https://www.360airo.com" style={{ color: '#2f7bff', textDecoration: 'none' }}>www.360airo.com</a></li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
}
