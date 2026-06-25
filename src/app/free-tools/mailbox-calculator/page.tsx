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
      title: "Planning to Send More Emails? Calculate Your Mailbox Infrastructure First",
      content: "Use the 360 AIRO Mailbox Calculator to determine the ideal number of mailboxes, domains, and daily sending capacity needed to scale outreach safely. Mailbox planning helps protect deliverability while creating room for predictable pipeline growth.",
    },
    {
      title: "Why Mailbox Planning Matters",
      content: "Mailbox providers monitor sending patterns, engagement, and reputation before deciding where your emails belong. Sending too much volume through a limited number of mailboxes increases the likelihood of spam placement and reputation damage. Proper mailbox distribution creates a healthier foundation for scaling cold outreach.",
    },
    {
      title: "Benefits of Proper Mailbox Allocation",
      list: [
        "Protect Sender Reputation",
        "Improve Inbox Placement",
        "Reduce Spam Folder Risk",
        "Scale Outreach Safely",
        "Increase Reply Rates",
        "Generate More Pipeline",
      ],
    },
    {
      title: "Calculate Before You Scale",
      content: "Many outbound campaigns fail because teams focus on volume instead of infrastructure. Before increasing sending activity, you need to understand the capacity of your domains and mailboxes. A mailbox calculator removes guesswork and provides a realistic roadmap for growth.",
      list: [
        "Monthly Outreach Goals",
        "Mailbox Sending Limits",
        "Domain Distribution",
        "Deliverability Risk",
        "Outreach Capacity",
        "Growth Potential",
      ],
    },
    {
      title: "Recommended Mailbox Capacity",
      content: "The safest outbound programs distribute email volume across multiple mailboxes and domains. This approach reduces risk while creating sustainable growth. Instead of relying on a single inbox, build an infrastructure that can support long-term outreach.",
      list: [
        "New Mailbox: 20–50 Emails/Day",
        "Warmed Mailbox: 50–150 Emails/Day",
        "Multiple Mailboxes = Higher Capacity",
        "Multiple Domains = Better Risk Distribution",
        "Actual recommendations vary based on deliverability performance and domain health.",
      ],
    },
    {
      title: "Example Mailbox Scenarios",
      content: "Different outreach goals require different infrastructure setups. Use these examples to understand how mailbox requirements scale with campaign volume.",
      list: [
        "Startup Founder — Goal: 10 Meetings / Month • Mailboxes: 2–3 • Domains: 1",
        "Growing SDR Team — Goal: 50 Meetings / Month • Mailboxes: 10–15 • Domains: 2–3",
        "Agency or Revenue Team — Goal: 100+ Meetings / Month • Mailboxes: 20+ • Domains: 4+",
      ],
    },
    {
      title: "Mailbox Best Practices",
      content: "Mailbox infrastructure is only one part of the equation. Deliverability depends on how you manage volume, reputation, and engagement over time. Following best practices helps maintain inbox placement as you scale.",
      list: [
        "Warm Up New Mailboxes",
        "Verify SPF, DKIM & DMARC",
        "Increase Volume Gradually",
        "Monitor Bounce Rates",
        "Track Spam Complaints",
        "Use Multiple Domains",
        "Rotate Sending Capacity",
        "Maintain Consistent Activity",
      ],
    },
    {
      title: "Build The Infrastructure Before You Need It",
      content: "Most companies wait until deliverability drops before fixing their email infrastructure. By then, sender reputation has already been damaged. The best outbound teams build mailbox capacity before they scale campaigns.",
      list: [
        "Calculate Mailbox Requirements",
        "Plan Domain Infrastructure",
        "Warm Up Mailboxes",
        "Monitor Deliverability",
        "Automate Outreach",
        "Generate More Pipeline",
      ],
    },
  ];

  const faqs = [
    {
      q: "What is a mailbox calculator?",
      a: "A mailbox calculator estimates the number of mailboxes and domains required to safely achieve your outreach goals while maintaining healthy sender reputation."
    },
    {
      q: "Why can't I send everything from one mailbox?",
      a: "Mailbox providers monitor sending behavior and may flag sudden volume increases as suspicious activity. Distributing volume helps reduce risk and improve deliverability."
    },
    {
      q: "How many emails can one mailbox send per day?",
      a: "Capacity varies depending on provider, domain reputation, mailbox age, and engagement levels. Mailboxes typically require proper warmup before reaching higher sending volumes."
    },
    {
      q: "Do I need multiple domains?",
      a: "For larger outreach programs, multiple domains help distribute risk and create additional sending capacity."
    },
    {
      q: "Should I warm up every mailbox?",
      a: "Yes. Every mailbox should establish its own sender reputation before being used for large-scale outreach."
    },
  ];

  return (
    <FreeToolTemplate
      title="Email Mailbox Calculator"
      subtitle="Planning to Send More Emails? Calculate Your Mailbox Infrastructure First"
      description="Use the 360 AIRO Mailbox Calculator to determine the ideal number of mailboxes, domains, and daily sending capacity needed to scale outreach safely. Mailbox planning helps protect deliverability while creating room for predictable pipeline growth."
      sections={sections}
      faqs={faqs}
      ctaTitle="Your Next Meeting Starts With The Right Infrastructure"
      ctaSubtitle="Find out exactly how many mailboxes you need before you send another campaign. Protect deliverability, improve inbox placement, and build an outbound engine that scales without damaging your sender reputation."
      ctaButtonText="Calculate My Mailbox Capacity"
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
