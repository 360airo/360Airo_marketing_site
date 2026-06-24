'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../../../styles/blogs.css';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const blogCategories = [
  'Blog',
  'Sales Prospecting',
  'AI Sales',
  'Lead Generation',
  'CRM Integration',
  'Sales Automation',
  'Revenue Operations',
  'Outbound Sales',
];

const tocItems: TocItem[] = [
  { id: 'toc-main', label: 'Introduction', arrow: false },
  { id: 'why-consider-an-outreach-io-alternative', label: 'Why Consider an Outreach.io Alternative?', arrow: true },
  { id: 'quick-comparison-best-outreach-io-alternatives', label: 'Quick Comparison: Best Outreach.io Alternatives', arrow: true },
  { id: 'what-is-outreach-io', label: 'What Is Outreach.io?', arrow: true },
  { id: 'how-we-selected-the-best-outreach-io-alternatives', label: 'How We Selected the Best Outreach.io Alternatives', arrow: true },
  { id: 'platform-1-360airo', label: '1. 360Airo', arrow: true },
];

const sectionImages: Record<
  string,
  {
    src: string;
    alt: string;
    label: string;
  }
> = {
  'why-consider-an-outreach-io-alternative': {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Outreach.io alternatives overview',
    label: 'Overview',
  },
  'platform-1-360airo': {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80',
    alt: 'AI powered sales engagement',
    label: '360Airo',
  },
};

function SectionImage({ id }: { id: string }) {
  const image = sectionImages[id];
  if (!image) return null;

  return (
    <div className="mt-8 rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative h-[230px] md:h-[340px] w-full">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function MiniInfographic({
  title,
  paragraphs,
  bullets,
}: {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}) {
  return (
    <div className="mt-8 rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-5 md:p-6">
      <h3 className="text-[22px] md:text-[26px] font-bold text-[#111827] leading-tight mb-5">
        {title}
      </h3>

      <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-[#4f5668] text-[16px] leading-8 list-disc pl-5">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ContentBlock({
  subtitle,
  paragraphs,
}: {
  subtitle: string;
  paragraphs: string[];
}) {
  return (
    <div className="mt-7">
      <h3 className="text-[20px] md:text-[22px] font-bold text-[#111827] mb-3">
        {subtitle}
      </h3>
      <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-[20vh] self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="relative w-[200px] h-[130px] shrink-0">
            <Image
              src="/360aironewlog.png"
              alt="360Airo logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <h3 className="text-[18px] leading-[1.3] font-bold text-white text-center mt-[-30px] mb-4">
          Outreach Alternatives
          <br />
          Made Simple
        </h3>

        <p className="text-[13px] leading-6 text-white text-center mb-5">
          Compare AI sales engagement tools, pricing, and outbound automation in one place.
        </p>

        <button className="w-full rounded-[12px] border border-white bg-transparent px-4 py-3 text-white text-[15px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>

      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
          Quick Tip
        </p>
        <h4 className="text-[15px] leading-6 font-bold text-[#111827] mb-2">
          Compare AI + pricing
        </h4>
        <p className="text-[12px] leading-5 text-[#5f6472]">
          The best Outreach alternative depends on workflow fit, AI depth, deliverability, and budget.
        </p>
      </div>
    </aside>
  );
}

function ArticleSection({
  id,
  title,
  intro,
  blocks,
  infographic,
  showImage = true,
}: {
  id: string;
  title: string;
  intro: string[];
  blocks: { subtitle: string; paragraphs: string[] }[];
  infographic: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  };
  showImage?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div>
        <h2 className="text-[28px] md:text-[34px] font-bold text-[#111827] mb-5">
          {title}
        </h2>

        <div className="space-y-4 text-[#4f5668] text-[16px] leading-8">
          {intro.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <MiniInfographic
          title={infographic.title}
          paragraphs={infographic.paragraphs}
          bullets={infographic.bullets}
        />

        {blocks.map((block) => (
          <ContentBlock
            key={block.subtitle}
            subtitle={block.subtitle}
            paragraphs={block.paragraphs}
          />
        ))}

        {showImage ? <SectionImage id={id} /> : null}
      </div>
    </section>
  );
}

export default function BlogColdEmailPage() {
  const [activeId, setActiveId] = useState('toc-main');
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  const searchableSections = [
    {
      id: 'toc-main',
      title: 'Introduction',
      content:
        'Outreach.io is one of the most recognized sales engagement platforms in the market. It helps sales teams automate outreach, manage prospect interactions, and improve pipeline generation through multi-channel engagement.',
    },
    {
      id: 'why-consider-an-outreach-io-alternative',
      title: 'Why Consider an Outreach.io Alternative?',
      content:
        'Outreach.io is widely used by enterprise sales teams, but it is not always the perfect fit for every business.',
    },
    {
      id: 'quick-comparison-best-outreach-io-alternatives',
      title: 'Quick Comparison: Best Outreach.io Alternatives',
      content:
        '360Airo, Apollo.io, Salesloft, Reply.io, Smartlead, Instantly, Klenty, Groove, Mixmax, and Yesware.',
    },
    {
      id: 'what-is-outreach-io',
      title: 'What Is Outreach.io?',
      content:
        'Outreach.io is a sales engagement platform that helps sales teams manage prospect interactions across multiple channels.',
    },
    {
      id: 'how-we-selected-the-best-outreach-io-alternatives',
      title: 'How We Selected the Best Outreach.io Alternatives',
      content:
        'The platforms were evaluated based on sales engagement capabilities, AI functionality, deliverability, ease of use, integrations, scalability, reviews, and pricing transparency.',
    },
    {
      id: 'platform-1-360airo',
      title: '1. 360Airo',
      content:
        '360Airo is an AI-first sales engagement platform that combines prospecting, personalization, automation, and outbound execution in a single solution.',
    },
  ];

  const filteredSearchResults = searchableSections.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return false;

    return (
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  const handleSearchSelect = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setSearchQuery('');
    }
  };

  const scrollCategories = () => {
    if (!categoryScrollRef.current) return;

    const amount = 260;
    const container = categoryScrollRef.current;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;

    if (scrollDirection === 'right') {
      container.scrollBy({
        left: amount,
        behavior: 'smooth',
      });

      if (currentScrollLeft + amount >= maxScrollLeft - 10) {
        setScrollDirection('left');
      }
    } else {
      container.scrollBy({
        left: -amount,
        behavior: 'smooth',
      });

      if (currentScrollLeft - amount <= 10) {
        setScrollDirection('right');
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 180;
      let currentSectionId = sections[0]?.id || 'toc-main';

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = section.id;
        }
      }

      setActiveId(currentSectionId);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar activeTab="resources" />

      <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>



        <section className="pt-8 md:pt-10 pb-14 px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#6b7280] mb-8">
              <span className="font-medium text-[#111827]">Blog</span>
              <span>›</span>
              <span className="font-medium text-[#111827]">Sales Automation</span>
              <span>›</span>
              <span>10 Best Outreach.io Alternatives in 2026 (Features, Pricing & AI Comparison)</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative min-h-[300px] md:min-h-[410px] rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80"
                    alt="Outreach.io alternatives hero"
                    fill
                    priority
                    className="object-cover mix-blend-overlay opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#072f63]/95 via-[#0b4f96]/70 to-transparent" />
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <p className="text-white text-[30px] md:text-[44px] font-bold leading-tight max-w-[420px]">
                      10 Best
                      <br />
                      Outreach.io
                      <br />
                      Alternatives
                    </p>

                    <div className="absolute bottom-0 right-0 w-[48%] h-[92%] hidden md:block">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                        alt="Sales technology team"
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-2xl"
              >
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[11px] md:text-[12px] mb-3">
                  Outreach.io Alternatives Guide
                </p>
                <h1 className="text-[#111827] text-[24px] md:text-[36px] lg:text-[40px] font-bold leading-[1.08] tracking-[-0.02em] mb-5">
                  10 Best Outreach.io Alternatives in 2026 (Features, Pricing & AI Comparison)
                </h1>

                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-8 leading-relaxed">
                  Compare leading Outreach.io alternatives by features, pricing, AI capabilities, workflow simplicity, and deliverability strengths.
                </p>

                <div className="mb-8 inline-flex flex-wrap items-center gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-4 py-3 text-white text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logonew.png"
                      alt="360Airo Team"
                      width={140}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span>•360AIRO Team </span>
                  <span>Updated: Jun 2026</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-7 py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-base shadow-md hover:bg-[#4154f5] transition-all">
                    Start Reading
                  </button>
                  <button className="px-7 py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-base hover:bg-white/60 transition-all">
                    Schedule a Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-8">
            <aside className="sticky top-[20vh] self-start hidden lg:block mb-10">
              <h2 className="text-[16px] font-bold text-[#20242c] mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-1.5 border-l border-[#d9dfef] pl-3">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative block rounded-r-lg px-3 py-1.5 text-[13px] leading-5 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#edf2ff] text-[#2f66db] font-semibold'
                          : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
                      } ${item.indent ? 'ml-3' : ''}`}
                    >
                      <span
                        className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${
                          isActive ? 'bg-[#4f63ff]' : 'bg-transparent'
                        }`}
                      />
                      <span className="flex items-start gap-1.5">
                        {item.arrow ? (
                          <span
                            className={`mt-[1px] text-sm ${
                              isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'
                            }`}
                          >
                            ›
                          </span>
                        ) : (
                          <span className="w-2" />
                        )}
                        <span>{item.label}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0 space-y-14">
              <ArticleSection
                id="toc-main"
                title="Introduction"
                showImage={false}
                intro={[
                  'Outreach.io is one of the most recognized sales engagement platforms in the market. It helps sales teams automate outreach, manage prospect interactions, and improve pipeline generation through multi-channel engagement.',
                  'However, as sales technology continues to evolve, many businesses are exploring Outreach.io alternatives that offer better AI capabilities, simpler workflows, improved deliverability, or more affordable pricing.',
                  'While Outreach.io remains a powerful platform, it may not be the ideal solution for every organization. Some teams find it expensive, while others need more flexibility, stronger AI personalization, or a platform that better aligns with their sales processes.',
                  'The good news is that there are several excellent Outreach.io competitors available today. From AI-powered sales engagement platforms to specialized outbound sales solutions, businesses now have more options than ever before.',
                  'In this guide, we’ll compare the best Outreach.io alternatives, evaluate their features, pricing, strengths, and limitations, and help you determine which platform best fits your sales team’s needs.',
                ]}
                infographic={{
                  title: 'What this guide covers',
                  paragraphs: [
                    'This article explores why companies look for Outreach alternatives, what Outreach.io does, how alternatives were selected, and why 360Airo stands out as a strong option.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="why-consider-an-outreach-io-alternative"
                title="Why Consider an Outreach.io Alternative?"
                showImage={true}
                intro={[
                  'Outreach.io is widely used by enterprise sales teams, but it’s not always the perfect fit for every business.',
                  'Here are some of the most common reasons organizations explore Outreach alternatives.',
                ]}
                infographic={{
                  title: 'Top reasons businesses switch',
                  paragraphs: [
                    'Businesses often compare alternatives when they need stronger AI, easier workflows, better deliverability support, or more cost-efficient pricing.',
                  ],
                  bullets: [
                    'High pricing',
                    'Complex setup and administration',
                    'Growing demand for AI-powered sales engagement',
                    'Deliverability and outreach performance',
                    'Different business requirements',
                  ],
                }}
                blocks={[
                  {
                    subtitle: '1. High Pricing',
                    paragraphs: [
                      'One of the most frequently cited concerns about Outreach.io is cost.',
                      'While Outreach doesn’t publicly disclose all pricing details, many businesses report that the platform can become expensive as teams grow and require additional users, integrations, and advanced functionality.',
                      'For startups, small businesses, and growing sales teams, this often leads them to search for more cost-effective Outreach.io alternatives.',
                    ],
                  },
                  {
                    subtitle: '2. Complex Setup and Administration',
                    paragraphs: [
                      'Outreach offers a comprehensive feature set, but that depth can also create complexity.',
                      'Many teams require dedicated onboarding, training, and ongoing administration to fully utilize the platform. Organizations looking for faster implementation and easier adoption may prefer alternatives with a more intuitive user experience.',
                    ],
                  },
                  {
                    subtitle: '3. Growing Demand for AI-Powered Sales Engagement',
                    paragraphs: [
                      'Artificial intelligence is rapidly transforming outbound sales.',
                      'Modern sales teams increasingly want tools that can:',
                      'Personalize outreach at scale.',
                      'Generate prospect insights.',
                      'Recommend next-best actions.',
                      'Optimize engagement strategies.',
                      'While Outreach continues to invest in AI, many newer platforms have built AI capabilities directly into their core workflows, making them attractive alternatives.',
                    ],
                  },
                  {
                    subtitle: '4. Deliverability and Outreach Performance',
                    paragraphs: [
                      'Successful outbound sales depends on more than sending emails—it requires ensuring those emails actually reach the inbox.',
                      'Many businesses now prioritize platforms that offer advanced deliverability optimization, sender reputation management, and email infrastructure support alongside traditional sales engagement features.',
                    ],
                  },
                  {
                    subtitle: '5. Different Business Requirements',
                    paragraphs: [
                      'Every sales organization operates differently.',
                      'Some teams prioritize:',
                      'Cold email outreach.',
                      'Multi-channel engagement.',
                      'Sales automation.',
                      'Prospecting capabilities.',
                      'CRM integrations.',
                      'AI-driven workflows.',
                      'As a result, businesses often compare multiple Outreach competitors before choosing a platform that aligns with their goals and budget.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="quick-comparison-best-outreach-io-alternatives"
                title="Quick Comparison: Best Outreach.io Alternatives"
                showImage={false}
                intro={[
                  'Here is a quick comparison of the best Outreach.io alternatives based on positioning and key strengths.',
                ]}
                infographic={{
                  title: 'Top alternatives at a glance',
                  paragraphs: [
                    'These platforms serve a range of needs, from AI-powered outbound sales to lightweight email productivity and Salesforce-native workflows.',
                  ],
                  bullets: [
                    '360Airo — AI-powered outbound sales — Advanced AI personalization and automation',
                    'Apollo.io — Prospecting and outreach — Large contact database',
                    'Salesloft — Enterprise sales teams — Revenue workflow management',
                    'Reply.io — Multichannel outreach — Automated sales sequences',
                    'Smartlead — Agencies and cold email teams — Deliverability-focused outreach',
                    'Instantly — High-volume cold emailing — Unlimited sending infrastructure',
                    'Klenty — SMB sales teams — Ease of use',
                    'Groove — Salesforce-centric organizations — Native Salesforce workflow',
                    'Mixmax — Gmail users — Simplicity and email productivity',
                    'Yesware — Individual sales reps — Lightweight sales engagement',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="what-is-outreach-io"
                title="What Is Outreach.io?"
                showImage={false}
                intro={[
                  'Outreach.io is a sales engagement platform that helps sales teams manage prospect interactions across multiple channels.',
                ]}
                infographic={{
                  title: 'Core Outreach.io capabilities',
                  paragraphs: [
                    'Its primary goal is to help sales representatives engage prospects more effectively and improve sales productivity.',
                  ],
                  bullets: [
                    'Email outreach',
                    'Calling workflows',
                    'Task automation',
                    'Sales analytics',
                    'CRM synchronization',
                    'Revenue intelligence',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why teams compare alternatives',
                    paragraphs: [
                      'While Outreach remains a market leader, many businesses evaluate alternative solutions to find better pricing, AI functionality, deliverability support, or workflow flexibility.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="how-we-selected-the-best-outreach-io-alternatives"
                title="How We Selected the Best Outreach.io Alternatives"
                showImage={false}
                intro={[
                  'To identify the best Outreach.io alternatives, we evaluated each platform based on several important factors:',
                ]}
                infographic={{
                  title: 'Evaluation criteria',
                  paragraphs: [
                    'The goal was to include a mix of enterprise-grade solutions, SMB-friendly tools, and AI-powered sales engagement platforms for different outbound sales strategies.',
                  ],
                  bullets: [
                    'Sales engagement capabilities',
                    'AI functionality',
                    'Email deliverability features',
                    'Ease of use',
                    'Integration ecosystem',
                    'Scalability',
                    'Customer reviews',
                    'Pricing transparency',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Selection approach',
                    paragraphs: [
                      'The platforms included in this list represent a mix of enterprise-grade solutions, SMB-friendly tools, and AI-powered sales engagement platforms designed to support a variety of outbound sales strategies.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="platform-1-360airo"
                title="1. 360Airo"
                showImage={true}
                intro={[
                  'Best For',
                  'Sales teams looking for an AI-first sales engagement platform that combines prospecting, personalization, automation, and outbound execution in a single solution.',
                ]}
                infographic={{
                  title: 'Key Features',
                  paragraphs: [
                    '360Airo is designed to help teams manage the full outbound workflow with AI embedded throughout the experience.',
                  ],
                  bullets: [
                    'AI-powered sales engagement',
                    'Personalized outreach generation',
                    'Multi-channel prospect engagement',
                    'Workflow automation',
                    'Lead enrichment',
                    'Advanced analytics',
                    'Sales pipeline visibility',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Pros',
                    paragraphs: [
                      'Strong AI capabilities.',
                      'Streamlined outbound workflows.',
                      'Scalable for growing teams.',
                      'Supports modern sales engagement strategies.',
                    ],
                  },
                  {
                    subtitle: 'Cons',
                    paragraphs: [
                      'Pricing available on request.',
                      'Newer platform compared to some established competitors.',
                    ],
                  },
                  {
                    subtitle: 'Why 360Airo Is a Strong Outreach.io Alternative',
                    paragraphs: [
                      'Unlike traditional sales engagement tools that add AI as an additional feature, 360Airo focuses on using AI throughout the sales workflow.',
                      'This makes it a compelling option for teams looking to increase efficiency, improve personalization, and scale outbound sales efforts without adding complexity.',
                    ],
                  },
                ]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] md:text-[28px] font-bold text-[#111827]">
                Recent blog posts
              </h2>
              <a
                href="/blogs"
                className="text-[14px] font-medium text-[#4f63ff] hover:underline"
              >
                View all
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'How AI Sales Engagement Platforms Compare in 2026',
                  tag: 'AI Sales',
                  href: '/blogs/ai-sales-engagement-platforms-2026',
                  description: 'Read this next to compare modern outbound platforms in more detail.',
                  image:
                    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'Best Cold Email and Deliverability Tools for Growing Teams',
                  tag: 'Sales Automation',
                  href: '/blogs/best-cold-email-deliverability-tools',
                  description: 'Read this next to explore deliverability-focused outreach tools.',
                  image:
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'How to Choose the Right Sales Engagement Platform',
                  tag: 'CRM Integration',
                  href: '/blogs/how-to-choose-sales-engagement-platform',
                  description: 'Read this next to evaluate platform fit, workflows, and pricing.',
                  image:
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                },
              ].map((post) => (
                <a
                  key={post.href}
                  href={post.href}
                  className="group overflow-hidden rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow"
                >
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
                      {post.tag}
                    </p>
                    <h3 className="text-[18px] font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4f63ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-[#6b7280]">
                      {post.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
