"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
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
      {/* Decorative Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(47, 123, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(107, 99, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <Navbar activeTab="" />

      {/* Main Content */}
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
          Terms of Service
        </h1>

        <p style={{ marginBottom: '40px', fontSize: '18px', textAlign: 'center' }}>
          Welcome to 360Airo. These Terms of Service (“Terms”) govern your access to and use of our platform, tools, and services related to AI-powered outreach, email automation, and sales engagement.
        </p>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Introduction</h2>
          <p style={{ marginBottom: '16px' }}>Welcome to 360Airo. These Terms of Service (“Terms”) govern your access to and use of our platform, tools, and services related to AI-powered outreach, email automation, and sales engagement.</p>
          <p style={{ marginBottom: '16px' }}>By accessing or using 360Airo, you agree to comply with these Terms. If you do not agree, you should not use the platform.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Description of Service</h2>
          <p style={{ marginBottom: '16px' }}>360Airo provides AI-driven tools for cold email campaigns, multichannel outreach, deliverability optimization, and sales workflow automation.</p>
          <p style={{ marginBottom: '16px' }}>Our platform helps users manage outreach campaigns, improve inbox placement, and streamline communication across email and other channels. Features may evolve over time as we improve the product.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>User Accounts</h2>
          <p style={{ marginBottom: '16px' }}>To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
          <p style={{ marginBottom: '16px' }}>You agree to provide accurate and complete information during registration and keep your account details updated.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Acceptable Use</h2>
          <p style={{ marginBottom: '16px' }}>You agree to use 360Airo responsibly and in compliance with all applicable laws and regulations.</p>
          <p style={{ marginBottom: '16px' }}>You must not use the platform to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Send spam, unsolicited, or deceptive communications</li>
            <li style={{ marginBottom: '8px' }}>Violate email marketing laws (such as CAN-SPAM or GDPR)</li>
            <li style={{ marginBottom: '8px' }}>Distribute harmful, fraudulent, or misleading content</li>
            <li style={{ marginBottom: '8px' }}>Interfere with the platform’s functionality or security</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>We reserve the right to restrict or suspend accounts that violate these guidelines.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Data and Privacy</h2>
          <p style={{ marginBottom: '16px' }}>Your use of 360Airo is subject to our Privacy Policy. We are committed to protecting your data and ensuring secure handling of user information.</p>
          <p style={{ marginBottom: '16px' }}>You are responsible for ensuring that any data you upload or use within the platform complies with applicable data protection laws.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Intellectual Property</h2>
          <p style={{ marginBottom: '16px' }}>All content, software, features, and functionality provided by 360Airo are the intellectual property of the company or its licensors.</p>
          <p style={{ marginBottom: '16px' }}>You may not copy, modify, distribute, or reverse-engineer any part of the platform without prior written permission.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Service Availability</h2>
          <p style={{ marginBottom: '16px' }}>We strive to provide reliable and uninterrupted service. However, we do not guarantee that the platform will always be available or error-free.</p>
          <p style={{ marginBottom: '16px' }}>Maintenance, updates, or unforeseen technical issues may result in temporary service interruptions.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Limitation of Liability</h2>
          <p style={{ marginBottom: '16px' }}>360Airo is provided on an “as is” and “as available” basis.</p>
          <p style={{ marginBottom: '16px' }}>We are not liable for:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Any indirect, incidental, or consequential damages</li>
            <li style={{ marginBottom: '8px' }}>Loss of business, revenue, or data</li>
            <li style={{ marginBottom: '8px' }}>Email deliverability outcomes or campaign performance</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>Users are responsible for how they use the platform and the results of their outreach activities.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Account Termination</h2>
          <p style={{ marginBottom: '16px' }}>We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in harmful or unlawful activities.</p>
          <p style={{ marginBottom: '16px' }}>You may also discontinue use of the platform at any time.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Governing Law</h2>
          <p style={{ marginBottom: '16px' }}>These Terms are governed by and interpreted in accordance with applicable laws and jurisdiction where 360Airo operates.</p>
          <p style={{ marginBottom: '16px' }}>Any disputes arising from these Terms will be subject to the appropriate legal authorities in that jurisdiction.</p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '16px' }}>Contact Information</h2>
          <p style={{ marginBottom: '16px' }}>If you have any questions regarding these Terms of Service, you can contact us at:</p>
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
