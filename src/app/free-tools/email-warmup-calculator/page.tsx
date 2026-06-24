"use client";

import React, { useState } from 'react';
import FreeToolTemplate from '../../../components/FreeToolTemplate';

export default function WarmupCalculatorPage() {
  const [targetVolume, setTargetVolume] = useState<number>(50);
  const [startingVolume, setStartingVolume] = useState<number>(2);
  const [dailyIncrease, setDailyIncrease] = useState<number>(15);
  const [results, setResults] = useState<any>(null);

  const calculateWarmupSchedule = () => {
    const schedule = [];
    let currentVolume = startingVolume;
    let day = 1;

    while (currentVolume < targetVolume && day <= 60) { // cap at 60 days to prevent infinite loops
      schedule.push({ day, volume: Math.round(currentVolume) });
      currentVolume += Math.max(1, currentVolume * (dailyIncrease / 100));
      day++;
    }
    schedule.push({ day, volume: targetVolume });
    
    setResults({
      totalDays: day,
      day14Volume: schedule.find(s => s.day === 14)?.volume || targetVolume,
      schedule
    });
  };

  const sections = [
    {
      title: "Why Do You Need to Warm Up Email Accounts?",
      content: "Sending a large volume of emails from a brand-new domain or mailbox looks highly suspicious to email providers like Google and Microsoft. Email warmup simulates normal human sending behavior to slowly build trust and establish a positive sender reputation over time.",
      list: [
        ". Avoid the Spam Folder",
        ". Build Domain Reputation",
        ". Establish Sending History",
        ". Prevent Account Suspension",
        ". Ensure Campaign Success"
      ]
    },
    {
      title: "How Does Email Warmup Work?",
      content: "Email warmup involves slowly increasing the number of emails sent from an account each day. These emails are sent to a network of real inboxes that automatically open, reply, and mark the emails as 'Not Spam', showing inbox providers that your emails are wanted.",
      list: [
        ". Gradual Volume Increase",
        ". Automated Opens & Replies",
        ". Spam Folder Rescue",
        ". Realistic Sending Patterns",
        ". Ongoing Reputation Maintenance"
      ]
    },
    {
      title: "Warmup Best Practices",
      content: "Follow these rules to ensure your mailboxes are properly warmed up before launching campaigns:",
      list: [
        ". Start Slow (1-2 Emails/Day)",
        ". Increase Volume Gradually",
        ". Maintain High Reply Rates",
        ". Warm Up for at Least 14-21 Days",
        ". Never Stop Warming Up (Even While Sending)"
      ]
    },
    {
      title: "Who Is This Calculator For?",
      content: "This tool helps teams plan their warmup timeline to ensure mailboxes are ready for outreach without rushing the process and risking their domains.",
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
      q: "What is an email warmup calculator?",
      a: "An email warmup calculator generates a day-by-day sending schedule to safely increase email volume from a new domain or mailbox."
    },
    {
      q: "How long does email warmup take?",
      a: "A proper email warmup process takes a minimum of 14 to 21 days before you should send any cold outreach."
    },
    {
      q: "Should I stop warmup once I start sending campaigns?",
      a: "No. You should keep warmup running continuously in the background, even while sending active campaigns, to maintain a high sender reputation."
    },
    {
      q: "What is the starting volume for a new domain?",
      a: "New domains should start by sending just 1 to 2 emails per day to establish initial trust."
    },
    {
      q: "Is this calculator free?",
      a: "Yes. The 360 AIRO Email Warmup Calculator is completely free to use."
    }
  ];

  return (
    <FreeToolTemplate
      title="Email Warmup Calculator"
      subtitle="Generate a Safe Sending Schedule to Protect Your Domains"
      description="Don't burn your new domains on day one. Sending too many emails from a fresh mailbox triggers spam filters and ruins your reputation. Use the 360 AIRO Email Warmup Calculator to generate a safe, day-by-day warmup schedule that builds trust with inbox providers."
      sections={sections}
      faqs={faqs}
      ctaTitle="Still Sending Without Warming Up?"
      ctaSubtitle="Your Competitors Are Building Sender Reputation While You're Going to Spam. Generate your custom warmup schedule and protect your domains today."
      ctaButtonText="Generate My Warmup Schedule"
      calculator={
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '32px', marginBottom: '32px', textAlign: 'center', color: '#111827' }}>Interactive Warmup Planner</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px', backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '12px', color: '#374151', fontSize: '15px' }}>Target Daily Volume (Emails)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input 
                  type="range" min="10" max="200" step="5" 
                  value={targetVolume} onChange={(e) => setTargetVolume(Number(e.target.value))}
                  style={{ flex: 1, height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#8B5CF6' }}
                />
                <input 
                  type="number" value={targetVolume} onChange={(e) => setTargetVolume(Number(e.target.value))}
                  style={{ width: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', fontWeight: 600, textAlign: 'center' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '12px', color: '#374151', fontSize: '15px' }}>Starting Daily Volume (Emails)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input 
                  type="range" min="1" max="10" step="1" 
                  value={startingVolume} onChange={(e) => setStartingVolume(Number(e.target.value))}
                  style={{ flex: 1, height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#A855F7' }}
                />
                <input 
                  type="number" value={startingVolume} onChange={(e) => setStartingVolume(Number(e.target.value))}
                  style={{ width: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', fontWeight: 600, textAlign: 'center' }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, marginBottom: '12px', color: '#374151', fontSize: '15px' }}>Daily Ramp-Up Increase (%)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input 
                  type="range" min="5" max="30" step="1" 
                  value={dailyIncrease} onChange={(e) => setDailyIncrease(Number(e.target.value))}
                  style={{ flex: 1, height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: '#D946EF' }}
                />
                <input 
                  type="number" value={dailyIncrease} onChange={(e) => setDailyIncrease(Number(e.target.value))}
                  style={{ width: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: '"DM Sans", sans-serif', fontSize: '15px', fontWeight: 600, textAlign: 'center' }}
                />
              </div>
            </div>

            <button 
              onClick={calculateWarmupSchedule} 
              style={{ backgroundColor: '#111827', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s', marginTop: '16px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111827'}
            >
              Generate Visual Schedule
            </button>
          </div>

          {results && (
            <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#F5F3FF', padding: '24px', borderRadius: '12px', border: '1px solid #EDE9FE', textAlign: 'center' }}>
                  <p style={{ color: '#7C3AED', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Total Days to Target</p>
                  <p style={{ fontSize: '36px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#4C1D95' }}>{results.totalDays}</p>
                </div>
                <div style={{ backgroundColor: '#FDF4FF', padding: '24px', borderRadius: '12px', border: '1px solid #FAE8FF', textAlign: 'center' }}>
                  <p style={{ color: '#C026D3', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>Volume at Day 14</p>
                  <p style={{ fontSize: '36px', fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#701A75' }}>{results.day14Volume}</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '32px', overflow: 'hidden' }}>
                <h4 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '24px', marginBottom: '24px', color: '#111827' }}>Volume Ramp-Up Chart</h4>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '4px', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>
                  {results.schedule.map((item: any, i: number) => {
                    const heightPercent = (item.volume / targetVolume) * 100;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                        <div 
                          style={{ 
                            width: '100%', 
                            backgroundColor: '#8B5CF6', 
                            height: `${heightPercent}%`, 
                            borderTopLeftRadius: '4px', 
                            borderTopRightRadius: '4px',
                            transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: i >= 14 ? 1 : 0.6
                          }} 
                          title={`Day ${item.day}: ${item.volume} emails`}
                        />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', color: '#6B7280', fontSize: '12px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600 }}>
                  <span>Day 1</span>
                  <span>Day {results.totalDays}</span>
                </div>
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
