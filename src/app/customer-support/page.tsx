"use client";
import Link from 'next/link';
import Navbar from '../../components/Navbar';

export default function CustomerSupportPage() {
  const supportChannels = [
    {
      title: 'Email Support',
      description: 'Get help via email - we respond within 24 hours',
      icon: '📧',
      action: 'support@360airo.com'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: '💬',
      action: 'Start Chat'
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our comprehensive help documentation',
      icon: '📚',
      action: 'Browse Docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other 360Airo users and share tips',
      icon: '👥',
      action: 'Visit Forum'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with 360Airo?',
      answer: 'Sign up for a free account and follow our onboarding guide. You can be sending emails in minutes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and PayPal.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no penalties or hidden fees.'
    },
    {
      question: 'Do you offer API access?',
      answer: 'Yes, we provide comprehensive API documentation for enterprise users.'
    }
  ];

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

      <Navbar activeTab="customer-support" />

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(90deg, #fff 0%, #b0c4ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Customer Support
          </h1>
          <p style={{
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto',
            color: '#a0aec0'
          }}>
            We're here to help. Choose how you'd like to get in touch with us.
          </p>
        </div>

        {/* Support Channels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '80px'
        }}>
          {supportChannels.map((channel, idx) => (
            <div
              key={idx}
              style={{
                padding: '32px 24px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(71, 85, 139, 0.3)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(20, 30, 50, 0.9)';
                e.currentTarget.style.borderColor = 'rgba(71, 85, 139, 0.6)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
                e.currentTarget.style.borderColor = 'rgba(71, 85, 139, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {channel.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                {channel.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#cbd5e1',
                marginBottom: '24px',
                minHeight: '40px'
              }}>
                {channel.description}
              </p>
              <button style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #2f7bff 0%, #6b63ff 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(47, 123, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {channel.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Frequently Asked Questions
          </h2>
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                style={{
                  padding: '20px',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(71, 85, 139, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <summary style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  {faq.question}
                </summary>
                <p style={{
                  marginTop: '16px',
                  color: '#a0aec0',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
