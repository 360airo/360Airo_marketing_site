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
  { id: 'how-we-defined-cheapest-cold-email-software', label: 'How We Defined “Cheapest Cold Email Software”', arrow: true },
  { id: 'tool-1-360airo', label: '1. 360Airo', arrow: true },
  { id: 'tool-2-instantly', label: '2. Instantly', arrow: true },
  { id: 'tool-3-smartreach', label: '3. SmartReach', arrow: true },
  { id: 'tool-4-mailmeteor', label: '4. Mailmeteor', arrow: true },
  { id: 'tool-5-gmass', label: '5. GMass', arrow: true },
  { id: 'tool-6-lemlist', label: '6. Lemlist', arrow: true },
  { id: 'tool-7-woodpecker', label: '7. Woodpecker', arrow: true },
  { id: 'tool-8-mailshake', label: '8. Mailshake', arrow: true },
  { id: 'tool-9-yesware', label: '9. Yesware', arrow: true },
  { id: 'tool-10-snovio', label: '10. Snov.io', arrow: true },
  { id: 'why-we-built-360airo', label: 'Why We Built 360Airo', arrow: true },
  { id: 'cheapest-cold-email-software-vs-long-term-cost', label: 'Cheapest Cold Email Software vs Long-Term Cost', arrow: true },
  { id: 'are-free-email-outreach-tools-enough', label: 'Are Free Email Outreach Tools Enough?', arrow: true },
  { id: 'how-to-choose-the-cheapest-cold-email-software-for-your-team', label: 'How to Choose the Cheapest Cold Email Software for Your Team', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
];

const sectionImages: Record<
  string,
  {
    src: string;
    alt: string;
    label: string;
  }
> = {
  'tool-1-360airo': {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
    alt: 'Cold email software dashboard',
    label: 'Platform',
  },
  'why-we-built-360airo': {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    alt: 'Startup outreach workflow',
    label: 'Why 360Airo',
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
      <h3 className="text-[18px] md:text-[22px] font-bold text-[#111827] leading-tight mb-5">
        {title}
      </h3>

      <div className="space-y-4 text-[#4f5668] text-[14px] leading-7">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-[#4f5668] text-[14px] leading-7 list-disc pl-5">
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
      <h3 className="text-[17px] md:text-[19px] font-bold text-[#111827] mb-3">
        {subtitle}
      </h3>
      <div className="space-y-4 text-[#4f5668] text-[14px] leading-7">
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

        <h3 className="text-[16px] leading-[1.3] font-bold text-white text-center mt-[-30px] mb-4">
          Cheapest Cold
          <br />
          Email Software
        </h3>

        <p className="text-[12px] leading-5 text-white text-center mb-5">
          Run outreach, warmup, verification, LinkedIn, and reply management in one place.
        </p>

        <button className="w-full rounded-[12px] border border-white bg-transparent px-4 py-3 text-white text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>

      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
          Quick Tip
        </p>
        <h4 className="text-[13px] leading-5 font-bold text-[#111827] mb-2">
          Look beyond sticker price
        </h4>
        <p className="text-[11px] leading-5 text-[#5f6472]">
          The cheapest tool upfront can become expensive if it needs extra tools for warmup, verification, and inbox workflows.
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
        <h2 className="text-[24px] md:text-[28px] font-bold text-[#111827] mb-5">
          {title}
        </h2>

        <div className="space-y-4 text-[#4f5668] text-[14px] leading-7">
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
        'Cold email remains one of the most cost-effective growth channels for startups and agencies when the tooling makes sense and budget stays controlled.',
    },
    {
      id: 'how-we-defined-cheapest-cold-email-software',
      title: 'How We Defined “Cheapest Cold Email Software”',
      content:
        'This list focuses on affordable tools that still support core cold email needs like sequences, scheduling, tracking, and practical deliverability support.',
    },
    {
      id: 'tool-1-360airo',
      title: '1. 360Airo',
      content:
        '360Airo combines email campaigns, LinkedIn outreach, email warmup, free email verification, analytics, and a unified inbox in one platform.',
    },
    {
      id: 'tool-2-instantly',
      title: '2. Instantly',
      content:
        'Instantly is popular among high-volume senders and agencies focused on outbound scale.',
    },
    {
      id: 'tool-3-smartreach',
      title: '3. SmartReach',
      content:
        'SmartReach offers a balance between price and features for structured campaigns and moderate automation.',
    },
    {
      id: 'tool-4-mailmeteor',
      title: '4. Mailmeteor',
      content:
        'Mailmeteor works inside Gmail and Google Sheets and is useful for budget-conscious teams testing outbound.',
    },
    {
      id: 'tool-5-gmass',
      title: '5. GMass',
      content:
        'GMass is a simple Gmail extension for basic cold email campaigns with low pricing.',
    },
    {
      id: 'tool-6-lemlist',
      title: '6. Lemlist',
      content:
        'Lemlist focuses on personalization-heavy outreach with dynamic images, fields, and creative campaign options.',
    },
    {
      id: 'tool-7-woodpecker',
      title: '7. Woodpecker',
      content:
        'Woodpecker is a straightforward choice for small teams that want simple follow-up automation.',
    },
    {
      id: 'tool-8-mailshake',
      title: '8. Mailshake',
      content:
        'Mailshake is used by teams that want reliable structure without deep customization.',
    },
    {
      id: 'tool-9-yesware',
      title: '9. Yesware',
      content:
        'Yesware is sometimes used as a budget-friendly alternative for warm or semi-cold outreach.',
    },
    {
      id: 'tool-10-snovio',
      title: '10. Snov.io',
      content:
        'Snov.io combines lead sourcing, verification, and outreach in one platform for early-stage teams.',
    },
    {
      id: 'why-we-built-360airo',
      title: 'Why We Built 360Airo',
      content:
        '360Airo was built to replace fragmented stacks of sending, warmup, verification, tracking, and spreadsheet-driven workflows.',
    },
    {
      id: 'cheapest-cold-email-software-vs-long-term-cost',
      title: 'Cheapest Cold Email Software vs Long-Term Cost',
      content:
        'Real cost often comes from extra tools, lost deliverability, and the time spent managing fragmented workflows.',
    },
    {
      id: 'are-free-email-outreach-tools-enough',
      title: 'Are Free Email Outreach Tools Enough?',
      content:
        'Free outreach tools are useful for learning and testing, but most teams outgrow them once results start to matter.',
    },
    {
      id: 'how-to-choose-the-cheapest-cold-email-software-for-your-team',
      title: 'How to Choose the Cheapest Cold Email Software for Your Team',
      content:
        'The right tool should protect deliverability, reduce add-ons, support teams, and grow with your outreach volume.',
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content:
        'Affordable cold email software in 2026 is about efficient growth, predictable cost, and sustainable outbound.',
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
    <div className="blog-shell">
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
              <span>10 Cheapest Cold Email Software Tools for Startups & Agencies:2026 Guide</span>
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
                    alt="Cheapest cold email software hero"
                    fill
                    priority
                    className="object-cover mix-blend-overlay opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#072f63]/95 via-[#0b4f96]/70 to-transparent" />
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <p className="text-white text-[26px] md:text-[36px] font-bold leading-tight max-w-[420px]">
                      10 Cheapest
                      <br />
                      Cold Email
                      <br />
                      Software Tools
                    </p>

                    <div className="absolute bottom-0 right-0 w-[48%] h-[92%] hidden md:block">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                        alt="Cold email software team"
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
                  2026 Cold Email Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[30px] lg:text-[34px] font-bold leading-[1.08] tracking-[-0.02em] mb-5">
                  10 Cheapest Cold Email Software Tools for Startups & Agencies:2026 Guide
                </h1>

                <p className="text-[14px] md:text-[15px] text-[#5f6472] max-w-2xl mb-8 leading-relaxed">
                  Discover affordable cold email tools startups and agencies use in 2026, including pricing mindset, tradeoffs, and how 360Airo fits into a lean outreach stack.
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
                  'Cold email remains one of the most cost-effective growth channels for startups and agencies — but only if the tooling makes sense. Paying enterprise-level prices before proving outbound is one of the fastest ways to burn budget without results.',
                  'That’s why many early-stage teams look for the cheapest cold email software that still supports deliverability, personalization, and scale.',
                  'This 2026 guide breaks down 10 affordable cold email tools startups and agencies actually use — including what each tool is good at, where it falls short, and who it’s best for.',
                ]}
                infographic={{
                  title: 'What this guide focuses on',
                  paragraphs: [
                    'Affordable cold email software is not just about low sticker price. It is about getting enough infrastructure to test and scale outreach without wasting money on fragmented tools.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="how-we-defined-cheapest-cold-email-software"
                title="How We Defined “Cheapest Cold Email Software”"
                showImage={false}
                intro={[
                  'This list isn’t about tools that are “cheap” but unusable. To qualify, a platform had to meet at least three of the following:',
                ]}
                infographic={{
                  title: 'Qualification criteria',
                  paragraphs: [
                    'We focused on tools that are realistic for startups and agencies rather than enterprise sales orgs with large budgets.',
                  ],
                  bullets: [
                    'Low entry price suitable for startups',
                    'Transparent pricing (no hidden seat costs)',
                    'Core cold email functionality (sequences, scheduling, tracking)',
                    'Basic deliverability support',
                    'Practical for agencies or small sales teams',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Important note',
                    paragraphs: [
                      'Some tools are fully paid, some are freemium, and some overlap with free email outreach tools for early testing.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="tool-1-360airo"
                title="1. 360Airo"
                showImage={true}
                intro={[
                  'Best for: Startups and agencies that want an all-in-one outreach stack without stacking tools.',
                  '360Airo is positioned as one of the cheapest cold email software options that doesn’t sacrifice infrastructure. It combines email campaigns, LinkedIn outreach, email warmup, free email verification, analytics, and a unified inbox in one platform.',
                  'Instead of paying separately for verification, warmup, sequences, and reply management, teams get a consolidated system that keeps costs predictable.',
                ]}
                infographic={{
                  title: 'Why it works well for budget teams',
                  paragraphs: [
                    '360Airo is designed to reduce tool sprawl and keep outreach operations inside one connected workflow.',
                  ],
                  bullets: [
                    'Built-in free email verification',
                    'Native email warmup',
                    'Email + LinkedIn campaigns',
                    'Unified inbox and analytics',
                    'Scales without adding multiple tools',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-2-instantly"
                title="2. Instantly"
                showImage={false}
                intro={[
                  'Best for: High-volume cold email senders focused on scale.',
                  'Instantly is popular among agencies running large outbound volumes. Pricing is relatively affordable compared to enterprise platforms, though add-ons can increase costs over time.',
                  'It’s often used alongside other tools, which can raise the total spend beyond what early startups expect.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'A strong choice for scale-focused teams, but real cost depends on the rest of your stack.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-3-smartreach"
                title="3. SmartReach"
                showImage={false}
                intro={[
                  'Best for: Teams wanting structured campaigns with moderate automation.',
                  'SmartReach offers a balance between price and features. It’s not the cheapest option on this list, but it’s still competitive for teams that want a stable, mid-range cold email platform.',
                  'For agencies managing multiple clients, pricing can scale quickly.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'A balanced tool for structured outreach, though costs can rise for multi-client agency usage.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-4-mailmeteor"
                title="4. Mailmeteor"
                showImage={false}
                intro={[
                  'Best for: Gmail-based outreach on a tight budget.',
                  'Mailmeteor works directly inside Gmail and Google Sheets. It’s one of the more affordable options for founders testing outbound for the first time.',
                  'It lacks advanced deliverability tools but works well as an early experiment.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'Useful for early tests and founder-led outbound when simplicity matters more than infrastructure depth.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-5-gmass"
                title="5. GMass"
                showImage={false}
                intro={[
                  'Best for: Simple Gmail campaigns without complexity.',
                  'GMass is a long-standing Gmail extension used for basic cold email campaigns. Pricing is low, making it attractive as a cheapest cold email software entry point.',
                  'However, it’s limited in reporting, inbox management, and long-term scalability.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'Low-cost and simple to start with, but more limited as outbound operations become more serious.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-6-lemlist"
                title="6. Lemlist"
                showImage={false}
                intro={[
                  'Best for: Personalization-heavy campaigns.',
                  'Lemlist focuses heavily on creative personalization (images, dynamic fields, videos). While not the cheapest tool outright, it remains cost-effective for teams prioritizing highly customized outreach.',
                  'Many teams pair Lemlist with free email outreach tools for verification or warmup to manage costs.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'A good fit when creative personalization is a priority, though supporting tools may still be needed.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-7-woodpecker"
                title="7. Woodpecker"
                showImage={false}
                intro={[
                  'Best for: Simple follow-up automation.',
                  'Woodpecker is straightforward and reasonably priced for small teams. It handles core sequencing well but often requires integrations for deeper analytics and inbox workflows.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'A practical choice for smaller teams that mainly need structured follow-ups and lightweight workflow support.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-8-mailshake"
                title="8. Mailshake"
                showImage={false}
                intro={[
                  'Best for: Sales teams that want structure without heavy customization.',
                  'Mailshake sits in the mid-price range but remains accessible compared to enterprise tools. It’s often used by agencies that value reliability over experimentation.',
                  'Costs can rise with additional features and seats.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'Reliable for structured outreach, but total cost depends on seats and added capabilities.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-9-yesware"
                title="9. Yesware"
                showImage={false}
                intro={[
                  'Best for: Sales teams already using Gmail or Outlook heavily.',
                  'Yesware blends email tracking with basic sequencing. While not a pure cold email tool, it’s sometimes used as a cheaper alternative for outbound when budgets are tight.',
                  'It’s better suited for warm or semi-cold outreach.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'A lighter option for teams already living in email clients and running less complex outbound motions.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="tool-10-snovio"
                title="10. Snov.io"
                showImage={false}
                intro={[
                  'Best for: All-in-one prospecting and outreach on a budget.',
                  'Snov.io combines lead sourcing, verification, and outreach. It’s often considered among the cheapest cold email software options for startups that want prospecting and sending in one place.',
                  'Deliverability features are basic but sufficient for early-stage campaigns.',
                ]}
                infographic={{
                  title: 'Summary',
                  paragraphs: [
                    'Useful for startups that want prospecting and sending together without paying for a large stack.',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                id="why-we-built-360airo"
                title="Why We Built 360Airo"
                showImage={true}
                intro={[
                  'Most cold email tools didn’t fail because they were expensive.',
                  'They failed because they forced teams to duct-tape five different tools together just to run one campaign properly.',
                  'We saw startups paying for:',
                ]}
                infographic={{
                  title: 'What fragmented stacks usually include',
                  paragraphs: [
                    'The real problem is often not the base sending tool, but everything else required around it.',
                  ],
                  bullets: [
                    'One tool to send emails',
                    'Another to warm inboxes',
                    'A third to verify lists',
                    'A fourth to track replies',
                    'And spreadsheets to hold it all together',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why that setup breaks',
                    paragraphs: [
                      'That setup breaks fast — especially for small teams and agencies managing multiple campaigns.',
                      'We built 360Airo because cold outreach shouldn’t require an ops team.',
                    ],
                  },
                  {
                    subtitle: 'The goal was simple',
                    paragraphs: [
                      'Make deliverability the default, not an add-on.',
                      'Remove the need for third-party verification and warmup tools.',
                      'Let teams manage email, LinkedIn, campaigns, replies, and analytics in one place.',
                      'Keep pricing accessible so early-stage teams don’t have to choose between growth and budget.',
                    ],
                  },
                  {
                    subtitle: 'What 360Airo is meant to be',
                    paragraphs: [
                      '360Airo wasn’t designed as another point solution.',
                      'It was built as a complete outreach system — one teams can start with and scale on without rebuilding their stack every few months.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="cheapest-cold-email-software-vs-long-term-cost"
                title="Cheapest Cold Email Software vs Long-Term Cost"
                showImage={false}
                intro={[
                  'Many teams focus only on sticker price. In practice, real cost comes from:',
                ]}
                infographic={{
                  title: 'Hidden cost drivers',
                  paragraphs: [
                    'The lowest monthly price does not always produce the lowest total cost of ownership.',
                  ],
                  bullets: [
                    'Needing multiple tools to fill feature gaps',
                    'Paying separately for verification and warmup',
                    'Losing deliverability due to missing safeguards',
                    'Wasting time managing fragmented workflows',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'What this means',
                    paragraphs: [
                      'Sometimes the cheapest tool upfront becomes expensive over time.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="are-free-email-outreach-tools-enough"
                title="Are Free Email Outreach Tools Enough?"
                showImage={false}
                intro={[
                  'Free email outreach tools are useful for:',
                ]}
                infographic={{
                  title: 'Where free tools help',
                  paragraphs: [
                    'They can be useful in the earliest stages, especially when teams are still validating outreach assumptions.',
                  ],
                  bullets: [
                    'Learning cold email basics',
                    'Testing early assumptions',
                    'Sending very low volumes',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Where free tools fall short',
                    paragraphs: [
                      'However, they usually lack deliverability protection, inbox placement visibility, and scalable workflows.',
                      'Most teams outgrow free tools once results start to matter.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="how-to-choose-the-cheapest-cold-email-software-for-your-team"
                title="How to Choose the Cheapest Cold Email Software for Your Team"
                showImage={false}
                intro={[
                  'Before choosing based on price alone, ask:',
                ]}
                infographic={{
                  title: 'Key questions',
                  paragraphs: [
                    'The cheapest cold email software is not just the lowest-priced option. It is the one that lets your team operate cleanly without constant workarounds.',
                  ],
                  bullets: [
                    'Does this tool protect deliverability?',
                    'Will I need multiple add-ons later?',
                    'Can it grow with my outreach volume?',
                    'Does it support agencies or teams?',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Decision principle',
                    paragraphs: [
                      'The cheapest cold email software is the one that lets you grow without constantly switching platforms.',
                    ],
                  },
                ]}
              />

              <ArticleSection
                id="conclusion"
                title="Conclusion"
                showImage={false}
                intro={[
                  'In 2026, affordable cold email software is less about “cheap” and more about efficient.',
                  'Startups and agencies should look for tools that:',
                ]}
                infographic={{
                  title: 'What matters most',
                  paragraphs: [
                    'The best affordable tools reduce risk and make outbound more sustainable over time.',
                  ],
                  bullets: [
                    'Reduce risk',
                    'Minimize dependencies',
                    'Support sustainable outreach',
                    'Keep costs predictable',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Final thought',
                    paragraphs: [
                      'Whether you start with Gmail-based tools or move directly to a platform like 360Airo, the goal is the same: outbound that scales without burning budget or domains.',
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
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827]">
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
                  title: 'How AI Prospecting Improves Sales Efficiency',
                  tag: 'AI Sales',
                  href: '/blogs/ai-prospecting-sales-efficiency',
                  description: 'Read this next to go deeper into modern sales workflows.',
                  image:
                    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'Why Modern Sales Teams Need Better Prospecting Workflows',
                  tag: 'Sales Prospecting',
                  href: '/blogs/better-prospecting-workflows',
                  description: 'Read this next to go deeper into modern sales workflows.',
                  image:
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'CRM Integration Best Practices for Outreach Teams',
                  tag: 'CRM Integration',
                  href: '/blogs/crm-integration-best-practices',
                  description: 'Read this next to go deeper into modern sales workflows.',
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
                    <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4f63ff] transition-colors">
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
    </div>
  );
}
