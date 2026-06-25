import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import '../styles/FAQSection.css';

const faqs = [
  {
    question: "What does 360Airo help teams do?",
    answer: "360Airo is an outbound outreach platform that helps teams manage prospect lists, create email and LinkedIn campaigns, personalize messages with AI, schedule follow-ups, monitor deliverability, and track campaign performance from one workspace."
  },
  {
    question: "Do I need technical knowledge to use 360Airo?",
    answer: "No. 360Airo is designed for sales teams, founders, agencies, and growth teams. You can create campaigns, upload prospect lists, connect inboxes, use templates, and launch outreach without writing code."
  },
  {
    question: "Can I send campaigns from my existing email account?",
    answer: "Yes. You can connect Gmail, Outlook, or a custom-domain inbox through SMTP or IMAP. Once connected, 360Airo helps you manage sender capacity, monitor account health, and use the account for outbound campaigns."
  },
  {
    question: "How does AI personalization work?",
    answer: "AI Personalization uses your business information, product details, target audience, pain points, communication style, call-to-action, and value proposition to create tailored messages for each selected prospect."
  },
  {
    question: "Can I create email follow-up sequences?",
    answer: "Yes. You can build multi-step email sequences with an initial email and timed follow-ups. Each follow-up can use a custom delay, personalization variables, and reply-based stopping rules."
  },
  {
    question: "Does 360Airo support LinkedIn outreach?",
    answer: "Yes. You can connect LinkedIn accounts, choose prospects with valid LinkedIn URLs, create manual or AI-generated connection messages, schedule outreach safely, and manage follow-up conversations."
  },
  {
    question: "How does email warm-up improve deliverability?",
    answer: "Email warm-up helps build sender reputation by gradually increasing healthy email activity. 360Airo tracks warm-up activity, inbox placement, spam placement, and account health so teams can send campaigns more confidently."
  },
  {
    question: "Can I connect 360Airo with my CRM?",
    answer: "Yes. 360Airo supports CRM workflows for syncing contacts, updating lead stages, tracking outreach activity, and handing qualified prospects to sales teams. CRM integration options can be configured from the Integrations section."
  },
  {
    question: "Can I manage multiple inboxes in one place?",
    answer: "Yes. The Unified Inbox lets you manage multiple connected email accounts, view campaign replies, search conversations, reply, forward, archive, and organize outreach responses from one workspace."
  },
  {
    question: "Is 360Airo suitable for agencies and large sales teams?",
    answer: "Yes. 360Airo is designed to support individual sales users, growing startups, agencies managing multiple clients, and high-volume outbound teams that need centralized campaign operations, personalization, automation, and reporting."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-container">
        
        {/* Left Column */}
        <div className="faq-left">
          <div className="faq-eyebrow">360AIRO SUPPORT</div>
          <h2 id="faq-heading" className="faq-heading">Frequently Asked Questions</h2>
          <p className="faq-support-text">
            Everything you need to know about building smarter outbound campaigns with 360Airo.
          </p>
          <p className="faq-support-subtext">
            Still have questions? Reach our team at <a href="mailto:support@360airo.com" className="faq-support-link">support@360airo.com</a>
          </p>

          <div className="faq-support-card">
            <h3 className="faq-card-heading">Need help launching your first campaign?</h3>
            <p className="faq-card-desc">
              Our team can help you connect your sending accounts, import prospects, set up AI personalization, and launch outreach with confidence.
            </p>
            <Link href="/contact-us" className="faq-card-btn">
              <MessageCircle size={18} />
              Talk to Our Team
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="faq-right">
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const id = `faq-${index}`;
              
              return (
                <div key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                    id={`${id}-question`}
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <ChevronDown className="faq-chevron" size={20} />
                  </button>
                  <div 
                    id={`${id}-answer`}
                    className="faq-answer-wrapper"
                    role="region"
                    aria-labelledby={`${id}-question`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
