'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../../../styles/blogs.css';

// ---------- FAQ Accordion Component (local) ----------
function FaqAccordion({ faqs }: { faqs: { subtitle: string; paragraphs: string[] }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className={`px-4 md:px-6 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] pb-3 md:pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                {faq.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- Table of Contents ----------
type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'what-is-ai-for-sales', label: '1. What Is AI for Sales?', arrow: true },
  { id: 'what-is-artificial-intelligence', label: '1.1 What Is Artificial Intelligence?', arrow: true, indent: true },
  { id: 'what-is-automation', label: '1.2 What Is Automation?', arrow: true, indent: true },
  { id: 'why-ai-changing-sales', label: '2. Why AI Is Changing Sales', arrow: true },
  { id: 'use-case-1', label: '3. Use Case 1: AI for Prospect Research and Lead Qualification', arrow: true },
  { id: 'use-case-2', label: '4. Use Case 2: AI for Personalized Outreach at Scale', arrow: true },
  { id: 'use-case-3', label: '5. Use Case 3: AI for Follow‑Ups, Forecasting, and Sales Automation', arrow: true },
  { id: 'how-to-start', label: '6. How to Start Using AI in Sales', arrow: true },
  { id: 'step-1', label: 'Step 1: Identify Time‑Consuming Tasks', arrow: true, indent: true },
  { id: 'step-2', label: 'Step 2: Choose One Use Case', arrow: true, indent: true },
  { id: 'step-3', label: 'Step 3: Measure the Results', arrow: true, indent: true },
  { id: 'common-misconceptions', label: '7. Common Misconceptions About AI for Sales', arrow: true },
  { id: 'misconception-1', label: '7.1 "AI Will Replace Salespeople"', arrow: true, indent: true },
  { id: 'misconception-2', label: '7.2 "AI Makes Outreach Sound Robotic"', arrow: true, indent: true },
  { id: 'misconception-3', label: '7.3 "AI Is Only for Large Enterprises"', arrow: true, indent: true },
  { id: 'faqs', label: '8. Frequently Asked Questions', arrow: true },
  { id: 'future-of-sales', label: '9. The Future of Sales Is Human + AI', arrow: true },
];

// ---------- Reusable Components ----------
function MiniInfographic({ title, paragraphs, bullets }: { title: string; paragraphs: string[]; bullets?: string[] }) {
  return (
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
      <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">{title}</h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
      </div>
      {bullets && (
        <ul className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
          {bullets.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

function ContentBlock({ subtitle, paragraphs, bullets }: { subtitle: string; paragraphs: string[]; bullets?: string[] }) {
  return (
    <div>
      {subtitle && (
        <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">{subtitle}</h3>
      )}
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
      </div>
      {bullets && (
        <ul className="mt-2 md:mt-3 space-y-2 md:space-y-3 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
          {bullets.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

function SectionImage() {
  const image = {
    src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=75&fm=webp',
    alt: 'AI for sales concept',
    label: 'AI Sales',
  };
  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
          loading="lazy"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({ id, title, intro, blocks, infographic, showImage = true }: any) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">{title}</h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
            {intro.map((text: string, index: number) => <p key={index}>{text}</p>)}
          </div>
        )}
        {infographic && <MiniInfographic {...infographic} />}
        {blocks.map((block: any) => {
          if (block.subtitle === 'Get Started With AI‑Powered Sales Using 360Airo') {
            return (
              <div key={block.subtitle} className="mt-6 md:mt-8">
                <div className="rounded-[24px] bg-gradient-to-br from-[#0C162C] to-[#1a2a4a] p-6 md:p-10 text-white shadow-xl border border-[#2a3a6a]">
                  <h3 className="text-[22px] md:text-[28px] font-bold leading-tight mb-3 md:mb-4">
                    {block.subtitle}
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-[15px] md:text-[17px] leading-7 text-gray-200 text-justify">
                    {block.paragraphs.map((text: string, idx: number) => (
                      <p key={idx}>{text}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base hover:bg-[#3a4ee0] transition shadow-lg hover:shadow-[#4f63ff]/30">
                      Book a Demo →
                    </button>
                    <button className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return <ContentBlock key={block.subtitle} {...block} />;
        })}
        {showImage && <SectionImage />}
      </div>
    </section>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          AI‑Powered Sales Made Simple
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Automate prospect research, personalize outreach, and close more deals with AI.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white text-[12px] md:text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-3 md:p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">Quick Tip</p>
        <h4 className="text-[12px] md:text-[13px] leading-5 font-bold text-[#111827] mb-1 md:mb-2">
          Start with one use case
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Don't try to automate everything at once. Pick one repetitive task and let AI handle it first.
        </p>
      </div>
    </aside>
  );
}

// ---------- Main Page Component ----------
export default function BlogAISalesBeginnersGuidePage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = requestAnimationFrame(() => {
        const offset = 180;
        let currentSectionId = 'introduction';

        for (const item of tocItems) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSectionId = item.id;
          }
        }

        setActiveId((prev) => (prev === currentSectionId ? prev : currentSectionId));
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="blog-shell">
      {/* Preconnect to Unsplash for faster image loading */}
      <link rel="preconnect" href="https://images.unsplash.com" />

      <Navbar activeTab="resources" />
      <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
        <style jsx global>{`
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          @font-face { font-family: 'Barlow Condensed'; font-display: swap; }
          @font-face { font-family: 'DM Sans'; font-display: swap; }
          @font-face { font-family: 'Outfit'; font-display: swap; }
        `}</style>

        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=75&fm=webp"
          type="image/webp"
        />

        {/* Hero Section */}
        <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
              <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">Blog</Link>
              <span>›</span>
              <Link href="/blogs?category=ai" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">AI</Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">AI for Sales: A Beginner's Guide to Working Smarter</span>
                <span className="sm:hidden">AI for Sales Guide</span>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                <Image
                  src="/ai-for-sales.png"
                  alt="AI for sales hero"
                  fill
                  priority
                  fetchPriority="high"
                  decoding="sync"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>

              <div className="max-w-2xl">
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">AI Guide</p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  AI for Sales: A Beginner's Guide to Working Smarter
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  Sales has never been short on tools – but salespeople still spend too much time on administrative work. Discover how AI can help you work smarter, not harder.
                </p>
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Aug 2026</span>
                  <span>• 12 min read</span>
                  <span>• 3.4K reads</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base shadow-md hover:bg-[#4154f5] transition-all">Start Reading</button>
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-sm md:text-base hover:bg-white/60 transition-all">Schedule a Demo</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-3 md:px-4 py-4 md:py-8">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-6 md:gap-8">
            {/* TOC */}
            <aside className="sticky top-20 self-start hidden lg:block mb-6 md:mb-10">
              <h2 className="text-[16px] font-bold text-[#20242c] mb-4">Table of Contents</h2>
              <nav className="space-y-1.5 border-l border-[#d9dfef] pl-3">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative block rounded-r-lg px-3 py-1.5 text-[13px] leading-5 transition-all duration-200 ${
                        isActive ? 'bg-[#edf2ff] text-[#2f66db] font-semibold' : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
                      } ${item.indent ? 'ml-3' : ''}`}
                    >
                      <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
                      <span className="flex items-start gap-1.5">
                        {item.arrow ? <span className={`mt-[1px] text-sm ${isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'}`}>›</span> : <span className="w-2" />}
                        <span>{item.label}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Articles */}
            <div className="min-w-0 space-y-4">
              <ArticleSection
                id="introduction" title="Introduction" showImage={false}
                intro={[
                  "Sales has never been short on tools.",
                  "CRMs organize customer data. Email platforms automate campaigns. Meeting schedulers eliminate back-and-forth emails. Analytics dashboards measure performance.",
                  "Yet despite all this technology, one challenge remains unchanged:",
                  "Salespeople still spend too much time doing work that doesn't involve selling.",
                  "Hours disappear into researching prospects, updating CRM records, writing follow-up emails, scheduling meetings, and qualifying leads. Every hour spent on administrative work is an hour not spent building relationships or closing deals.",
                  "That's why AI for sales has become one of the fastest-growing investments for modern revenue teams.",
                  "In fact, 51% of sales organizations have already implemented AI, and that number continues to grow as businesses look for smarter ways to improve productivity.",
                  "More importantly, AI isn't replacing salespeople.",
                  "It's helping them spend more time selling.",
                  "Another study found that AI can reduce the time sales teams spend on manual prospecting by approximately 14%, freeing up valuable hours for conversations that generate revenue.",
                  "If you're new to the topic, don't worry. AI isn't as complicated as it sounds.",
                  "In this guide, we'll explain AI in sales using simple language, explore three practical use cases, and show how businesses are using artificial intelligence sales tools to increase productivity without replacing the human element of selling.",
                ]}
                infographic={{ title: 'The core insight', paragraphs: ['AI reduces manual work so salespeople can focus on building relationships and closing deals.'] }}
                blocks={[]}
              />

              <ArticleSection
                id="what-is-ai-for-sales" title="1. What Is AI for Sales?" showImage={false}
                intro={[
                  "Before discussing software and automation, let's simplify two terms that are often confused: Artificial Intelligence (AI) and automation.",
                  "Although they're related, they're not the same thing.",
                ]}
                infographic={{ title: 'AI vs Automation', paragraphs: ['AI analyzes and recommends; automation follows rules.'] }}
                blocks={[]}
              />

              <ArticleSection
                id="what-is-artificial-intelligence" title="1.1 What Is Artificial Intelligence?" showImage={false}
                intro={[
                  "Artificial Intelligence (AI) refers to computer systems that can analyze information, recognize patterns, learn from data, and make recommendations that would normally require human thinking.",
                  "A simple way to understand AI is to imagine a smart sales assistant sitting beside every salesperson.",
                  "Instead of making coffee or taking notes, this assistant helps you:",
                ]}
                blocks={[
                  {
                    subtitle: 'What AI can do for you',
                    paragraphs: [],
                    bullets: [
                      'Research prospects',
                      'Draft personalized emails',
                      'Prioritize leads',
                      'Recommend the best time to follow up',
                      'Identify buying signals',
                      'Summarize meetings',
                    ],
                  },
                  {
                    subtitle: '',
                    paragraphs: ['The assistant doesn\'t replace your judgment. It helps you make faster, better decisions. That\'s exactly what AI does.'],
                  },
                ]}
              />

              <ArticleSection
                id="what-is-automation" title="1.2 What Is Automation?" showImage={false}
                intro={[
                  "Automation is much simpler. It follows predefined rules to complete repetitive tasks.",
                  "For example:",
                ]}
                blocks={[
                  {
                    subtitle: 'Common automation examples',
                    paragraphs: [],
                    bullets: [
                      'Sending a follow-up email three days after no reply',
                      'Creating a CRM task after a meeting',
                      'Assigning new leads to sales reps',
                      'Scheduling reminders',
                    ],
                  },
                  {
                    subtitle: 'The difference',
                    paragraphs: ['Automation doesn\'t think. It follows instructions. AI, on the other hand, can analyze situations and recommend the next best action. Think of it this way: automation is like setting an alarm clock. AI is like having a personal assistant who decides whether you should wake up earlier because traffic is worse today.'],
                  },
                ]}
              />

              <ArticleSection
                id="why-ai-changing-sales" title="2. Why AI Is Changing Sales" showImage={true}
                intro={[
                  "The sales process has become significantly more complex. Buyers conduct independent research before speaking with sales representatives. Decision-making involves multiple stakeholders. Competition for attention has never been greater.",
                  "Sales teams are expected to personalize outreach while contacting more prospects than ever before.",
                  "Trying to accomplish all of this manually isn't sustainable. That's where AI sales automation creates value.",
                  "Rather than replacing human interaction, AI removes repetitive work so salespeople can focus on conversations, problem-solving, and relationship building.",
                  "Instead of spending an hour researching ten prospects, AI can surface useful information within minutes.",
                  "Instead of writing every email from scratch, AI can create personalized first drafts.",
                  "Instead of manually reviewing hundreds of CRM records, AI can identify which accounts are most likely to convert.",
                  "The result isn't fewer salespeople. It's more productive salespeople.",
                ]}
                infographic={{ title: 'Why AI now?', paragraphs: ['Buyers do their own research, competition is fierce, and personalisation at scale is impossible without AI.'] }}
                blocks={[]}
              />

              <ArticleSection
                id="use-case-1" title="3. Use Case 1: AI for Prospect Research and Lead Qualification" showImage={false}
                intro={[
                  "One of the most time‑consuming parts of sales happens before the first email is even sent.",
                  "Sales representatives often spend hours researching companies, identifying decision-makers, checking LinkedIn profiles, reading company news, and determining whether a prospect is worth contacting.",
                  "AI dramatically reduces this workload.",
                  "Modern artificial intelligence sales tools can automatically gather information such as:",
                ]}
                infographic={{
                  title: 'AI‑powered research',
                  paragraphs: ['Company size, industry, funding announcements, hiring trends, technology stack, job titles, and buying intent signals.'],
                  bullets: [
                    'Company size',
                    'Industry',
                    'Funding announcements',
                    'Hiring trends',
                    'Technology stack',
                    'Job titles',
                    'Buying intent signals',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Real‑world example',
                    paragraphs: ['Imagine you\'re selling cybersecurity software. Instead of manually researching 200 companies, AI identifies organizations that recently expanded their engineering teams, announced new funding, are hiring security professionals, and match your ideal company size. Your prospecting list becomes smaller – but significantly more qualified.'],
                  },
                ]}
              />

              <ArticleSection
                id="use-case-2" title="4. Use Case 2: AI for Personalized Outreach at Scale" showImage={false}
                intro={[
                  "Personalization has become one of the biggest drivers of successful outbound sales.",
                  "The challenge is scale. Writing highly personalized emails for ten prospects is manageable. Writing them for one thousand prospects isn't.",
                  "This is where AI in sales becomes especially valuable.",
                  "AI analyzes publicly available information, company news, LinkedIn profiles, and buyer context to help create more relevant outreach.",
                  "Instead of producing identical templates, AI can suggest personalized opening lines based on:",
                ]}
                infographic={{
                  title: 'AI‑powered personalization',
                  paragraphs: ['Company announcements, industry trends, recent hiring, product launches, executive interviews, and business challenges.'],
                  bullets: [
                    'Company announcements',
                    'Industry trends',
                    'Recent hiring',
                    'Product launches',
                    'Executive interviews',
                    'Business challenges',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Real‑world example',
                    paragraphs: ['Without AI, a sales representative might spend fifteen minutes researching one company before writing an email. With AI, that research is summarized within seconds, allowing the representative to review, refine, and send a more personalized message much faster. The result is not robotic communication – it\'s more time available for thoughtful communication.'],
                  },
                ]}
              />

              <ArticleSection
                id="use-case-3" title="5. Use Case 3: AI for Follow‑Ups, Forecasting, and Sales Automation" showImage={false}
                intro={[
                  "Every salesperson knows that follow‑ups win deals. Yet they're also one of the easiest tasks to forget.",
                  "A busy week, back‑to‑back meetings, or an overflowing inbox can cause opportunities to slip through the cracks.",
                  "AI helps solve this problem by ensuring that no prospect is forgotten.",
                  "Instead of manually tracking every conversation, AI sales automation can monitor buyer activity and recommend the next best action.",
                  "For example, AI can:",
                ]}
                infographic={{
                  title: 'AI as your sales coordinator',
                  paragraphs: ['Reminders, scheduling, intent detection, and forecasting – all automated.'],
                  bullets: [
                    'Remind you when a prospect hasn\'t replied',
                    'Suggest the best time to send the next email',
                    'Automatically schedule follow‑ups',
                    'Detect when prospects revisit your website',
                    'Identify deals that are losing momentum',
                    'Highlight accounts showing strong buying intent',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'AI can improve sales forecasting',
                    paragraphs: ['Forecasting has traditionally relied on spreadsheets, intuition, and pipeline reviews. Human predictions are often influenced by optimism. AI approaches forecasting differently: by analyzing historical sales performance, deal progression, customer engagement, and buying patterns, it can identify trends that might otherwise go unnoticed. For example, AI may recognize that deals involving multiple stakeholders close faster, prospects who open several emails are more likely to book meetings, and opportunities inactive for more than two weeks have a lower probability of closing. These insights allow sales managers to forecast revenue with greater confidence and identify deals that need immediate attention.'],
                  },
                ]}
              />

              <ArticleSection
                id="how-to-start" title="6. How to Start Using AI in Sales" showImage={false}
                intro={[
                  "Adopting AI doesn't require replacing your entire sales process.",
                  "The most successful organizations introduce AI gradually, beginning with repetitive tasks that consume the most time.",
                ]}
                infographic={{ title: 'Start small, measure results', paragraphs: ['Identify time‑consuming tasks, choose one use case, and track measurable outcomes.'] }}
                blocks={[]}
              />

              {/* Step 1, 2, 3 – using list‑none for bullet‑free lists */}
              <section id="step-1" className="scroll-mt-28">
                <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">Step 1: Identify Time‑Consuming Tasks</h3>
                <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                  <p>Start by asking your sales team:</p>
                </div>
                <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
                  <ul className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-none pl-0">
                    <li>• What tasks consume the most time?</li>
                    <li>• Which activities feel repetitive?</li>
                    <li>• Where do opportunities get delayed?</li>
                  </ul>
                </div>
                <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                  <p>Common answers include: prospect research, CRM updates, writing first‑draft emails, scheduling follow‑ups, and lead qualification. These are excellent starting points for AI adoption.</p>
                </div>
              </section>

              <section id="step-2" className="scroll-mt-28">
                <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">Step 2: Choose One Use Case</h3>
                <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
                  <ul className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-none pl-0">
                    <li>• AI prospect research</li>
                    <li>• AI‑powered email personalization</li>
                    <li>• Automated follow‑up reminders</li>
                    <li>• Lead scoring</li>
                    <li>• Meeting summaries</li>
                  </ul>
                </div>
                <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                  <p>Avoid trying to automate everything at once. Early success builds confidence and encourages broader adoption across the team.</p>
                </div>
              </section>

              <section id="step-3" className="scroll-mt-28">
                <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">Step 3: Measure the Results</h3>
                <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
                  <ul className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-none pl-0">
                    <li>• Time saved per sales representative</li>
                    <li>• More qualified meetings booked</li>
                    <li>• Faster response times</li>
                    <li>• Improved pipeline generation</li>
                    <li>• Higher conversion rates</li>
                  </ul>
                </div>
                <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                  <p>The goal isn't simply using AI. It's improving business outcomes.</p>
                </div>
              </section>

              <ArticleSection
                id="common-misconceptions" title="7. Common Misconceptions About AI for Sales" showImage={false}
                intro={[
                  "Despite its growing adoption, many misconceptions still prevent businesses from exploring AI. Let's address a few of the most common ones.",
                ]}
                infographic={{ title: 'Debunking myths', paragraphs: ['AI doesn\'t replace people, doesn\'t sound robotic, and isn\'t only for large enterprises.'] }}
                blocks={[]}
              />

              <ArticleSection
                id="misconception-1" title='7.1 "AI Will Replace Salespeople"' showImage={false}
                intro={[
                  "Perhaps the biggest misconception is that AI will eliminate sales jobs.",
                  "In reality, AI excels at repetitive, data‑heavy tasks – not human conversations.",
                  "Buyers still want to speak with knowledgeable people who understand their challenges, answer questions, and build trust.",
                  "AI handles the administrative work. Salespeople handle the relationships.",
                ]}
                blocks={[]}
              />

              <ArticleSection
                id="misconception-2" title='7.2 "AI Makes Outreach Sound Robotic"' showImage={false}
                intro={[
                  "Poorly implemented AI can produce generic messages. Well‑implemented AI does the opposite.",
                  "It helps sales teams research prospects faster, generate personalized first drafts, and tailor messaging based on real business context.",
                  "The salesperson remains responsible for reviewing and refining every message. AI accelerates personalization – it shouldn't replace it.",
                ]}
                blocks={[]}
              />

              <ArticleSection
                id="misconception-3" title='7.3 "AI Is Only for Large Enterprises"' showImage={false}
                intro={[
                  "This might have been true a few years ago. Today, AI‑powered sales tools are available for startups, growing businesses, and enterprise organizations alike.",
                  "Cloud‑based platforms have made AI significantly more accessible, allowing even small sales teams to benefit from automation without investing in large technical teams.",
                ]}
                blocks={[]}
              />

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">8. Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <MiniInfographic title="Quick answers" paragraphs={['Common questions about AI in sales.']} />
                  <FaqAccordion
                    faqs={[
                      {
                        subtitle: '8.1 What is AI for sales?',
                        paragraphs: ['AI for sales refers to the use of artificial intelligence to help sales teams automate repetitive work, analyze customer data, personalize outreach, prioritize leads, and improve decision-making throughout the sales process.'],
                      },
                      {
                        subtitle: "8.2 What's the difference between AI and automation?",
                        paragraphs: ['Automation follows predefined rules to complete repetitive tasks. AI analyzes information, identifies patterns, and recommends actions based on data. Simply put, automation follows instructions; AI helps make smarter decisions.'],
                      },
                      {
                        subtitle: '8.3 Can small businesses use AI sales tools?',
                        paragraphs: ['Absolutely. Many modern AI sales platforms are designed for businesses of all sizes and offer scalable pricing based on team requirements. Small businesses often benefit the most because AI reduces manual work without requiring additional headcount.'],
                      },
                      {
                        subtitle: '8.4 Which sales activities benefit most from AI?',
                        paragraphs: ['Some of the most valuable use cases include: prospect research, lead qualification, email personalization, follow‑up automation, meeting summaries, sales forecasting, CRM updates, and pipeline prioritization.'],
                      },
                      {
                        subtitle: '8.5 Is AI replacing human sales representatives?',
                        paragraphs: ['No. AI is designed to support sales teams by handling repetitive administrative work. Human salespeople remain essential for relationship‑building, negotiation, problem‑solving, and closing deals.'],
                      },
                    ]}
                  />
                </div>
              </section>

              <ArticleSection
                id="future-of-sales" title="9. The Future of Sales Is Human + AI" showImage={false}
                intro={[
                  "Artificial intelligence isn't changing the purpose of sales. It's changing how salespeople spend their time.",
                  "Instead of researching prospects for hours, updating CRM records, or manually scheduling follow‑ups, sales professionals can focus on what they do best – building relationships, understanding customer needs, and creating value.",
                  "The organizations gaining the greatest advantage from AI aren't replacing people. They're equipping people with better tools.",
                  "As AI continues to evolve, the most successful sales teams will combine human expertise with intelligent automation to create faster, more personalized, and more efficient buying experiences.",
                  "The future isn't AI versus salespeople. It's AI working alongside salespeople.",
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    'If you\'re looking to introduce AI into your sales process, the best place to start is with the tasks that consume the most time. 360Airo combines AI‑powered prospect research, intelligent personalization, multi‑channel outreach, automated follow‑ups, lead qualification, and campaign analytics into one platform – helping revenue teams spend less time on manual work and more time closing deals.',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Get Started With AI‑Powered Sales Using 360Airo',
                    paragraphs: ['Book a demo today and discover how 360Airo helps you turn AI into a practical advantage for every stage of your sales process.'],
                  },
                ]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>

        {/* Recent Posts */}
        <section className="px-3 md:px-4 pb-4 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
              <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                  tag: 'Cold Email',
                  href: '/blogs/10-cheapest-cold-email-software',
                  description: 'Discover affordable cold email tools for 2026.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=75&fm=webp',
                },
                {
                  title: 'What Are Email Warmup Tools and How Do They Work?',
                  tag: 'Deliverability',
                  href: '/blogs/email-warmup-tools-guide',
                  description: 'Learn how warmup tools protect sender reputation.',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=75&fm=webp',
                },
                {
                  title: 'Why Your Cold Emails Go to Spam (And How to Keep Them Out)',
                  tag: 'Deliverability',
                  href: '/blogs/why-cold-emails-go-to-spam',
                  description: 'Learn why spam filters block cold emails and how to fix it.',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=75&fm=webp',
                },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      priority={false}
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  <div className="p-3 md:p-5">
                    <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">{post.tag}</p>
                    <h3 className="text-[14px] md:text-[16px] font-bold text-[#111827] leading-snug mb-1.5 md:mb-3 group-hover:text-[#4f63ff] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-[11px] md:text-[13px] text-[#6b7280] line-clamp-2">{post.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}