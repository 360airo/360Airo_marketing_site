"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';

export default function MailboxCalculatorPage() {
  const [emailsPerDay, setEmailsPerDay] = useState(50);
  const [warmupDays, setWarmupDays] = useState(14);
  const [results, setResults] = useState<any>(null);

  const calculateLimits = () => {
    const dailyIncrement = emailsPerDay / warmupDays;
    const totalEmails = emailsPerDay * 30; // Monthly estimate
    const warmupDuration = warmupDays;
    
    setResults({
      dailyIncrement: Math.round(dailyIncrement * 100) / 100,
      day1: Math.round(dailyIncrement),
      day7: Math.round(dailyIncrement * 7),
      day14: emailsPerDay,
      monthlyCapacity: totalEmails,
      warmupDuration
    });
  };

  const sections = [
    {
      title: "Why Do You Need Multiple Domains and Mailboxes?",
      content: "Sending thousands of emails from your primary company domain is the fastest way to get blacklisted. Modern outbound requires a decentralized infrastructure where sending volume is spread across multiple secondary domains and mailboxes to protect your primary domain's reputation.",
      list: [
        ". Protect Primary Domain",
        ". Avoid Spam Filters",
        ". Scale Sending Volume Safely",
        ". Maintain Sender Reputation",
        ". Ensure Consistent Delivery",
        ". Isolate Risk"
      ]
    },
    {
      title: "Cold Email Sending Limits and Best Practices",
      content: "Inbox providers like Google and Microsoft have strict limits on sending volume. Pushing past these limits triggers spam filters.",
      list: [
        ". Max 30-50 Cold Emails Per Day Per Mailbox",
        ". Max 2-3 Mailboxes Per Domain",
        ". Use Secondary Domains (e.g., getcompany.com)",
        ". Always Warm Up New Mailboxes",
        ". Monitor Domain Health Regularly"
      ]
    },
    {
      title: "How to Setup Your Cold Email Infrastructure",
      content: "Building an outbound infrastructure requires careful planning. Here is the standard process for safe sending:",
      list: [
        ". Purchase Secondary Domains",
        ". Setup Google Workspace or Microsoft 365 Accounts",
        ". Configure SPF, DKIM, and DMARC Records",
        ". Connect to a Warmup Tool",
        ". Wait 14-21 Days Before Sending"
      ]
    },
    {
      title: "Who Is This Calculator For?",
      content: "This tool is built for teams planning their outbound strategy and need to understand the technical requirements for scale.",
      list: [
        ". Founders",
        ". SDR Teams",
        ". Sales Leaders",
        ". Marketing Professionals",
        ". RevOps Specialists",
        ". Agencies",
        ". Consultants"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the maximum number of emails I can send per day?",
      a: "For cold email, we strongly recommend sending no more than 30 to 50 emails per day, per mailbox. Sending more increases the risk of being marked as spam."
    },
    {
      q: "How many mailboxes should I have per domain?",
      a: "You should set up a maximum of 2 to 3 mailboxes per domain. This ensures that if one domain is flagged, the impact on your overall sending capacity is minimized."
    },
    {
      q: "Why shouldn't I use my primary domain?",
      a: "If your primary domain gets blacklisted for spam, your company's internal emails, customer communications, and system notifications will also go to spam. Always use secondary domains for cold outreach."
    },
    {
      q: "How long should I warm up new mailboxes?",
      a: "New mailboxes should be warmed up for at least 14 to 21 days before sending any cold emails. Warmup should continue even after you start sending campaigns."
    },
    {
      q: "Is this calculator free?",
      a: "Yes. The 360 AIRO Mailbox Calculator is completely free to use."
    }
  ];

  return (
    <FreeToolTemplate
      title="Email Mailbox Calculator"
      subtitle="Calculate the Number of Domains and Mailboxes Needed for Cold Email"
      description="Scaling outbound requires the right infrastructure. Sending too many emails from a single domain or mailbox will destroy your sender reputation and send your emails to spam. Use the 360 AIRO Mailbox Calculator to determine exactly how many domains and mailboxes you need to hit your sending goals safely."
      sections={sections}
      faqs={faqs}
      ctaTitle="Still Guessing Your Infrastructure Requirements?"
      ctaSubtitle="Your Competitors Are Scaling Safely While You're Risking the Spam Folder. Calculate your exact infrastructure needs and start building a predictable outbound engine today."
      ctaButtonText="Calculate My Infrastructure Now"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>Interactive Capacity Planner</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginBottom: '32px', backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '12px', color: '#374151', fontSize: '16px' }}>Target Emails/Day per Mailbox</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10" 
                  value={emailsPerDay} 
                  onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                  style={{ flex: 1, height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#3B82F6' }}
                />
                <input 
                  type="number" 
                  value={emailsPerDay} 
                  onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                  style={{ width: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '16px', fontWeight: 600, textAlign: 'center' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '12px', color: '#374151', fontSize: '16px' }}>Warmup Duration (days)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input 
                  type="range" 
                  min="7" 
                  max="30" 
                  step="1" 
                  value={warmupDays} 
                  onChange={(e) => setWarmupDays(Number(e.target.value))}
                  style={{ flex: 1, height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#10B981' }}
                />
                <input 
                  type="number" 
                  value={warmupDays} 
                  onChange={(e) => setWarmupDays(Number(e.target.value))}
                  style={{ width: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '16px', fontWeight: 600, textAlign: 'center' }}
                />
              </div>
            </div>

            <button 
              onClick={calculateLimits} 
              style={{ backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', marginTop: '8px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
            >
              Calculate Live Schedule
            </button>
          </div>

          {results && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', marginBottom: '24px', color: '#111827', borderBottom: '2px solid #F3F4F6', paddingBottom: '12px' }}>Your Projected Metrics</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#EEF2FF', padding: '24px', borderRadius: '12px', border: '1px solid #E0E7FF' }}>
                  <p style={{ color: '#4F46E5', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Daily Increment</p>
                  <p style={{ fontSize: '36px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#312E81' }}>{results.dailyIncrement}</p>
                  <p style={{ color: '#4338CA', fontSize: '13px', marginTop: '4px' }}>emails/day increase</p>
                </div>
                <div style={{ backgroundColor: '#F0FDF4', padding: '24px', borderRadius: '12px', border: '1px solid #DCFCE7' }}>
                  <p style={{ color: '#16A34A', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Day 7 Target</p>
                  <p style={{ fontSize: '36px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#14532D' }}>{results.day7}</p>
                  <p style={{ color: '#15803D', fontSize: '13px', marginTop: '4px' }}>emails by day 7</p>
                </div>
                <div style={{ backgroundColor: '#FEF2F2', padding: '24px', borderRadius: '12px', border: '1px solid #FEE2E2' }}>
                  <p style={{ color: '#DC2626', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Monthly Capacity</p>
                  <p style={{ fontSize: '36px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#7F1D1D' }}>{results.monthlyCapacity.toLocaleString()}</p>
                  <p style={{ color: '#B91C1C', fontSize: '13px', marginTop: '4px' }}>estimated monthly</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '32px' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Warming Schedule Timeline</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[...Array(Math.min(warmupDays, 14))].map((_, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, color: '#374151', width: '80px' }}>Day {i + 1}</span>
                      <div style={{ flex: 1, margin: '0 24px', height: '12px', backgroundColor: '#E5E7EB', borderRadius: '100px', overflow: 'hidden' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            backgroundColor: '#3B82F6', 
                            width: `${((i + 1) / warmupDays) * 100}%`,
                            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                          }} 
                        />
                      </div>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, color: '#111827', width: '60px', textAlign: 'right' }}>
                        {Math.round(results.dailyIncrement * (i + 1))}
                      </span>
                    </div>
                  ))}
                </div>
                {warmupDays > 14 && (
                  <div style={{ textAlign: 'center', marginTop: '16px', color: '#6B7280', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', fontStyle: 'italic' }}>
                    Showing first 14 days of {warmupDays} day schedule...
                  </div>
                )}
              </div>
            </div>
          )}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      }
    />
  );
}
