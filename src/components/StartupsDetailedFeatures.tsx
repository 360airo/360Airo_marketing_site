import React from 'react';
import '../styles/DetailedFeatures.css';

const featuresData = [
  {
    id: 1,
    title: 'Find High-Intent Prospects in Real Time',
    description: 'Build targeted prospect lists with live B2B data and our Chrome extension. Find verified business emails, enrich contacts instantly, and start reaching the right decision-makers in minutes.',
    image: 'https://placehold.co/800x1000/e6f4ea/111827?text=Prospects+Dashboard', 
    list: [
      {
        title: 'Reach Over nearly 1 Billion Global Contacts',
        desc: 'Search verified decision-makers across 150+ countries and connect with the people who matter most to your business.'
      },
      {
        title: 'Target Your Ideal Buyers with Precision',
        desc: 'Filter prospects by job title, industry, company size, location, technologies used, funding stage, and more to build highly targeted outreach lists.'
      },
      {
        title: 'Get Verified Contact Data',
        desc: 'Access accurate business emails, LinkedIn profiles, phone numbers, company details, and other verified contact information to improve your outreach success.'
      },
      {
        title: 'Prioritize Buyers Ready to Engage',
        desc: 'Use buying intent signals, hiring trends, and company insights to focus your outreach on prospects who are more likely to respond.'
      },
      {
        title: 'Capture Prospects Without Leaving LinkedIn',
        desc: 'Find verified contact information while browsing LinkedIn and save prospects directly to your outreach list with a single click.'
      }
    ]
  },
  {
    id: 2,
    title: 'Maximize Your Email Deliverability',
    description: 'Keep your emails landing in the inbox with built-in deliverability tools that protect your sender reputation and help you generate more replies.',
    image: 'https://placehold.co/800x1000/e0e7ff/111827?text=Deliverability+Tools',
    list: [
      {
        title: 'Build a Strong Sender Reputation',
        desc: 'Warm up your mailboxes automatically before launching campaigns, helping you earn trust with inbox providers and improve email deliverability.'
      },
      {
        title: 'Keep Your Domain Healthy',
        desc: 'Monitor SPF, DKIM, DMARC, MX records, and other email settings to identify issues before they impact your outreach performance.'
      },
      {
        title: 'Track Your Email Reputation',
        desc: 'Monitor Gmail spam rates and sender health with Google Postmaster insights, so you can detect deliverability issues early and maintain consistent inbox placement.'
      },
      {
        title: 'Scale Outreach with Unlimited Mailboxes',
        desc: 'Connect as many mailboxes as your outreach strategy requires, increase your daily sending capacity, and grow your campaigns without compromising deliverability.'
      }
    ]
  },
  {
    id: 3,
    title: 'Engage More Prospects Across Every Channel',
    description: 'Create personalized multichannel sequences that help you start more conversations, stay top of mind, and turn interested prospects into booked meetings.',
    image: 'https://placehold.co/800x1000/fef3c7/111827?text=Multichannel+Sequences',
    list: [
      {
        title: 'Reach Buyers Wherever They Respond',
        desc: 'Connect with your prospects through email, LinkedIn, calls, SMS, and WhatsApp from a single automated workflow without switching between multiple tools.'
      },
      {
        title: 'Optimize Every Campaign with A/B Testing',
        desc: 'Test different subject lines, messages, and calls to action to discover what resonates best with your audience and continuously improve your reply rates.'
      },
      {
        title: 'Automatically Prioritize Every Reply',
        desc: 'Categorize replies into "Interested," "Meeting Booked," "Follow Up," or "Not Interested" so you can focus your time on prospects most likely to convert.'
      },
      {
        title: 'Book Meetings Without the Back-and-Forth',
        desc: 'Sync your calendar and let prospects schedule meetings directly from your outreach sequences, making it easier for them to become customers.'
      }
    ]
  },
  {
    id: 4,
    title: 'Personalize Every Conversation with AI',
    description: 'Create highly personalized outreach that helps you capture attention, increase reply rates, and turn more prospects into customers without spending hours researching every lead.',
    image: 'https://placehold.co/800x1000/ffedd5/111827?text=AI+Personalization',
    list: [
      {
        title: 'Create Personalized Outreach in Seconds',
        desc: 'Generate tailored emails, LinkedIn messages, and follow-ups based on each prospect\'s role, industry, company, and pain points so every message feels relevant.'
      },
      {
        title: 'Turn Prospect Data into Better Conversations',
        desc: 'Use company insights, buying signals, LinkedIn activity, and business context to craft outreach that resonates with your ideal buyers.'
      },
      {
        title: 'Stay in Control of Every Message',
        desc: 'Customize AI prompts, messaging styles, and personalization rules to match your brand voice while scaling outreach with confidence.'
      }
    ]
  }
];

export default function StartupsDetailedFeatures() {
  return (
    <section className="detailed-features-section">
      <div className="detailed-container">
        {featuresData.map((feature, index) => {
          const isEven = index % 2 === 1;
          return (
            <div key={feature.id} className={`detailed-feature-row ${isEven ? 'row-reverse' : ''}`}>
              <div className="detailed-feature-content">
                <div className="detailed-step-number">{feature.id}</div>
                <h2 className="detailed-feature-title">{feature.title}</h2>
                <p className="detailed-feature-desc">{feature.description}</p>
                <div className="detailed-feature-list">
                  {feature.list.map((item, i) => (
                    <div key={i} className="detailed-list-item">
                      <div className="detailed-list-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div>
                        <h4 className="detailed-list-title">{item.title}</h4>
                        <p className="detailed-list-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detailed-feature-image">
                <div className="detailed-image-placeholder">
                  {/* Assuming image is placed here */}
                  <img src={feature.image} alt={feature.title} className="detailed-img" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
