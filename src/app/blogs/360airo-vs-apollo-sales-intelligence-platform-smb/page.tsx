'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Head from 'next/head';
import '../../../styles/blogs.css';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'comparison-table', label: 'Feature Comparison', arrow: true },
  { id: 'what-makes-different', label: 'What Makes 360Airo Different?', arrow: true },
  { id: 'prospecting', label: '1. Prospecting and Contact Intelligence', arrow: true },
  { id: 'ai-sdr', label: '2. AI SDR and Automation', arrow: true },
  { id: 'multichannel', label: '3. Multichannel Outreach', arrow: true },
  { id: 'deliverability', label: '4. Deliverability Is Not an Afterthought', arrow: true },
  { id: 'personalization', label: '5. Personalization Without Doing Everything Manually', arrow: true },
  { id: 'crm-integration', label: '6. CRM and Workflow Integration', arrow: true },
  { id: 'pricing', label: '7. Pricing and SMB Value', arrow: true },
  { id: 'which-one', label: '360Airo vs Apollo: Which One Should You Choose?', arrow: true },
  { id: 'verdict', label: 'The Verdict: 360Airo vs Apollo', arrow: true },
];

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
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
      <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">
        {title}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
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
    <div>
      <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">
        {subtitle}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function SectionImage({ id }: { id: string }) {
  const image = {
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: '360Airo vs Apollo comparison',
    label: 'Sales Intelligence',
  };
  if (!image) return null;

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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
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
  infographic?: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  };
  showImage?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
            {intro.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
        {infographic && <MiniInfographic {...infographic} />}
        {blocks.map((block) => (
          <ContentBlock key={block.subtitle} {...block} />
        ))}
        {showImage && <SectionImage id={id} />}
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
          360Airo vs Apollo
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the two platforms and find the best sales intelligence fit for your SMB.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white text-[12px] md:text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-3 md:p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">
          Quick Tip
        </p>
        <h4 className="text-[12px] md:text-[13px] leading-5 font-bold text-[#111827] mb-1 md:mb-2">
          Know your priority
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Choose Apollo for database depth, 360Airo for automated outbound execution. Your biggest bottleneck decides.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component (two columns) ---
function ComparisonTable() {
  const rows = [
    { parameter: 'Prospect Intelligence', airo: 'detailed prospect and company intelligence designed for faster targeting', apollo: 'extensive contact and company intelligence' },
    { parameter: 'Lead Enrichment', airo: 'enriches lead profiles with relevant firmographic and contact data', apollo: 'broad enrichment capabilities across prospect databases' },
    { parameter: 'AI-Powered Prospecting', airo: 'AI helps identify, qualify and prioritize relevant prospects', apollo: 'AI-assisted prospect discovery and targeting' },
    { parameter: 'AI Personalization', airo: 'generates personalized outreach based on prospect context', apollo: 'AI-assisted email personalization' },
    { parameter: 'AI SDR Workflows', airo: 'AI-driven workflows help automate prospecting and follow-ups', apollo: 'supports automated sales engagement workflows' },
    { parameter: 'Email Outreach', airo: 'prospecting, personalization and email execution in one workflow', apollo: 'mature email sequencing and engagement features' },
    { parameter: 'LinkedIn Outreach', airo: 'supports LinkedIn as part of outbound workflows', apollo: 'LinkedIn touchpoints can be incorporated into sequences' },
    { parameter: 'Multichannel Workflows', airo: 'combines email, LinkedIn and other touchpoints into unified campaigns', apollo: 'supports multichannel sales engagement' },
    { parameter: 'Email Warmup', airo: 'helps improve deliverability before scaling outreach', apollo: 'email warmup and deliverability tools' },
    { parameter: 'Inbox Rotation', airo: 'useful for distributing outbound activity across multiple inboxes', apollo: 'supports mailbox rotation for scaling campaigns' },
    { parameter: 'Unified Inbox', airo: 'centralizes conversations and outreach activity', apollo: 'provides centralized engagement management' },
    { parameter: 'Buying Signals', airo: 'helps identify prospects showing potential purchase intent', apollo: 'provides intent and buying-signal capabilities' },
    { parameter: 'CRM Integrations', airo: 'connects outbound activity with CRM workflows', apollo: 'broad CRM and sales-stack integrations' },
    { parameter: 'Analytics', airo: 'focuses on campaign, prospect and outbound performance', apollo: 'detailed campaign and engagement analytics' },
    { parameter: 'Ease of Use', airo: 'designed as a streamlined outbound workflow with fewer moving parts', apollo: 'powerful, but broader feature set can create a steeper learning curve' },
    { parameter: 'All-in-One Outbound Workflow', airo: 'prospecting → enrichment → personalization → outreach → follow-up in one ecosystem', apollo: 'combines database, prospecting and sales engagement' },
    { parameter: 'SMB-Focused Outbound Workflow', airo: 'particularly suited to SMBs wanting a simple, execution-focused outbound stack', apollo: 'suitable for SMBs but also built for larger sales teams' },
    { parameter: 'Automation', airo: 'emphasizes automated prospecting and outreach execution', apollo: 'extensive automation and sequencing capabilities' },
    { parameter: 'Workflow Simplicity', airo: 'fewer tools needed to manage an outbound campaign', apollo: 'highly capable but can feel more complex' },
    { parameter: 'Best For', airo: 'SMBs, startups and lean sales teams seeking AI-led outbound execution', apollo: 'Sales teams needing a large prospect database + established sales engagement platform' },
    { parameter: 'Free Plan', airo: 'useful for testing the platform before scaling', apollo: 'allows users to explore core capabilities' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Parameter</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">360Airo</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Apollo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-2 py-2 md:px-3 md:py-3 font-medium text-[#111827] whitespace-nowrap" data-label="Parameter">{row.parameter}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="360Airo">{row.airo}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="Apollo">{row.apollo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Demo CTA Component ---
function DemoCTA() {
  return (
    <div className="mt-8 rounded-[24px] bg-gradient-to-r from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] p-6 md:p-10 shadow-xl overflow-hidden relative text-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/10"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-white text-base md:text-lg leading-relaxed mb-6">
          If you are evaluating Apollo alternatives, try 360Airo and see how quickly you can go from a prospect list to a live, personalized outbound campaign.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Try 360Airo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogAiroVsApolloPage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(() => {
          const sections = tocItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

          const scrollPosition = window.scrollY + 180;
          let currentSectionId = sections[0]?.id || 'introduction';

          for (const section of sections) {
            if (scrollPosition >= section.offsetTop) {
              currentSectionId = section.id;
            }
          }
          setActiveId(currentSectionId);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const featuredImageUrl = 'https://360airo.com/og-images/360airo-vs-apollo.jpg';

  return (
    <>
      <Head>
        <title>360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?</title>
        <meta
          name="description"
          content="Compare 360Airo and Apollo for SMB sales intelligence. See which platform offers better AI SDR, multichannel outreach, automation, and outbound workflow for small teams."
        />
        <meta
          name="keywords"
          content="360Airo vs Apollo, Apollo alternative, sales intelligence platform, SMB sales, AI SDR, outbound automation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?"
        />
        <meta
          property="og:description"
          content="Compare 360Airo and Apollo for SMB sales intelligence. See which platform offers better AI SDR, multichannel outreach, automation, and outbound workflow for small teams."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?"
        />
        <meta
          name="twitter:description"
          content="Compare 360Airo and Apollo for SMB sales intelligence. See which platform offers better AI SDR, multichannel outreach, automation, and outbound workflow for small teams."
        />
        <meta name="twitter:image" content={featuredImageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://360airo.com/#organization',
                  'name': '360 Airo',
                  'url': 'https://360airo.com/',
                  'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://360airo.com/logo.svg',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://360airo.com/#website',
                  'name': '360 Airo',
                  'url': 'https://360airo.com/',
                  'publisher': {
                    '@id': 'https://360airo.com/#organization',
                  },
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb/#webpage',
                  'url': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb',
                  'name': '360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?',
                  'description': 'Compare 360Airo and Apollo for SMB sales intelligence. See which platform offers better AI SDR, multichannel outreach, automation, and outbound workflow for small teams.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb/#article',
                  'headline': '360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?',
                  'description': 'Compare 360Airo and Apollo for SMB sales intelligence. See which platform offers better AI SDR, multichannel outreach, automation, and outbound workflow for small teams.',
                  'url': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb',
                  'image': {
                    '@type': 'ImageObject',
                    'url': featuredImageUrl,
                  },
                  'author': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'publisher': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'mainEntityOfPage': {
                    '@id': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    '360Airo vs Apollo',
                    'Apollo alternative',
                    'sales intelligence platform',
                    'SMB sales',
                    'AI SDR',
                    'outbound automation',
                  ],
                  'datePublished': '2026-11-22',
                  'dateModified': '2026-11-22',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb/#breadcrumb',
                  'itemListElement': [
                    {
                      '@type': 'ListItem',
                      'position': 1,
                      'name': 'Home',
                      'item': 'https://360airo.com/',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 2,
                      'name': 'Blog',
                      'item': 'https://360airo.com/blogs',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': '360Airo vs Apollo',
                      'item': 'https://360airo.com/blogs/360airo-vs-apollo-sales-intelligence-platform-smb',
                    },
                  ],
                },
              ],
            }),
          }}
        />

        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
          type="image/webp"
        />

        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          @font-face {
            font-family: 'Barlow Condensed';
            font-display: swap;
          }
          @font-face {
            font-family: 'DM Sans';
            font-display: swap;
          }
          @font-face {
            font-family: 'Outfit';
            font-display: swap;
          }

          @media (max-width: 640px) {
            table,
            thead,
            tbody,
            tr,
            th,
            td {
              display: block;
            }
            thead {
              display: none;
            }
            tr {
              border-bottom: 2px solid #dbe3f4;
              margin-bottom: 12px;
              padding: 4px 0;
              border-radius: 8px;
              background: white;
              border: 1px solid #dbe3f4;
            }
            td {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 12px;
              border: none;
              border-bottom: 1px solid #ebf0f8;
              font-size: 12px;
              gap: 12px;
              background: transparent;
              border-radius: 0;
            }
            td::before {
              content: attr(data-label);
              font-weight: 600;
              color: #111827;
              flex-shrink: 0;
              min-width: 80px;
            }
            td:last-child {
              border-bottom: none;
            }
          }
        `}</style>
      </Head>

      <div className="blog-shell">
        <Navbar activeTab="resources" />
        <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
          {/* Hero Section */}
          <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
                <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Blog
                </Link>
                <span>›</span>
                <Link href="/blogs?category=listicles" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Listicles
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?</span>
                  <span className="sm:hidden">360Airo vs Apollo</span>
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
                      alt="360Airo vs Apollo comparison"
                      fill
                      priority
                      fetchPriority="high"
                      decoding="sync"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="max-w-2xl"
                >
                  <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">
                    Sales Intelligence
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    If you&apos;re trying to find an Apollo alternative, it&apos;s not only about comparing platforms&apos; numbers of contacts and capabilities. For an SMB, the question should be different – how does it help my small sales team find relevant prospects, personalize outreach, automate repetitive tasks, and drive pipeline?
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.6K reads</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base shadow-md hover:bg-[#4154f5] transition-all">
                      Start Reading
                    </button>
                    <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-sm md:text-base hover:bg-white/60 transition-all">
                      Schedule a Demo
                    </button>
                  </div>
                </motion.div>
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
                          isActive
                            ? 'bg-[#edf2ff] text-[#2f66db] font-semibold'
                            : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
                        } ${item.indent ? 'ml-3' : ''}`}
                      >
                        <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
                        <span className="flex items-start gap-1.5">
                          {item.arrow ? (
                            <span className={`mt-[1px] text-sm ${isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'}`}>›</span>
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

              {/* Articles */}
              <div className="min-w-0 space-y-4">
                <ArticleSection
                  key="introduction"
                  id="introduction"
                  title="Introduction"
                  showImage={false}
                  intro={[
                    "If you're trying to find an Apollo alternative, it's not only about comparing platforms' numbers of contacts and capabilities.",
                    "When it comes to an SMB, the question should be different – how does it help my small sales team find relevant prospects, personalize outreach, automate repetitive tasks, and drive pipeline?",
                    "That's where 360Airo excels.",
                    "Apollo is a popular sales intelligence and engagement platform featuring a huge B2B database, prospecting capabilities, enrichment, sequences, intent signals, AI capabilities, and analytics. According to Apollo, their database includes more than 240 million contacts and offers 65+ filters for prospecting.",
                    "360Airo's strategy is more focused on outbound marketing efforts. The platform includes prospect intelligence, AI-powered workflows for SDRs, enrichment, email/LinkedIn outreach, deliverability, inbox management, automation, and analytics all in one place.",
                  ]}
                  infographic={{
                    title: 'SMBs need execution, not just data',
                    paragraphs: ['Apollo offers database depth; 360Airo offers automated outbound execution – each excels in different areas.'],
                    bullets: [
                      'Apollo: 240M+ contacts, 65+ filters, broad sales intelligence',
                      '360Airo: AI SDR, multichannel outreach, deliverability, unified outbound workflow',
                      'Choose based on your primary bottleneck',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature Comparison Table */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Feature Comparison
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s a side-by-side comparison of key capabilities:</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                {/* What Makes 360Airo Different? */}
                <ArticleSection
                  key="what-makes-different"
                  id="what-makes-different"
                  title="What Makes 360Airo Different?"
                  showImage={true}
                  intro={[
                    "The concept behind 360Airo is straightforward – outbound sales do not have to be performed with five separate apps.",
                    "360Airo combines prospecting and enrichment with execution in a single solution. Finding and importing prospects, enriching them, creating sequences that suit your needs, reaching out to prospects through emails and LinkedIn, managing responses, measuring deliverability and campaign results are all done from a single dashboard.",
                    "This is relevant for SMBs, since sales software can become costly and cumbersome rather quickly. A typical outbound stack might involve one tool for finding contacts, another for enrichment, another for email sequences, another for LinkedIn outreach, another for inbox warmup, and another for analytics.",
                    "360Airo's approach is to bring much of that workflow together. Its current platform includes AI SDR agents, automated workflows, enriched prospect lists, email verification, multichannel sequences, unified inbox functionality, deliverability monitoring, and real-time campaign analytics.",
                  ]}
                  infographic={{
                    title: 'The 360Airo advantage',
                    paragraphs: ['One platform for prospecting, enrichment, outreach, deliverability, and analytics.'],
                    bullets: [
                      'AI SDR agents',
                      'Automated workflows',
                      'Multichannel sequences',
                      'Unified inbox and deliverability monitoring',
                      'Real-time campaign analytics',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Prospecting */}
                <ArticleSection
                  key="prospecting"
                  id="prospecting"
                  title="1. Prospecting and Contact Intelligence"
                  showImage={false}
                  intro={[
                    "Apollo has a major advantage in the breadth of its public database. It currently advertises 240M+ contacts, 30M+ companies, and 65+ prospecting filters. That makes Apollo particularly useful for teams whose primary requirement is large-scale contact discovery.",
                    "360Airo approaches prospecting from the perspective of actionable outbound. Its platform supports prospect importing, enrichment, email finding and verification, account-based prospecting, and prospect management. It also uses prospect and company information to power personalization and outreach workflows.",
                    "So if your priority is simply finding the largest possible pool of contacts, Apollo deserves consideration. But if your priority is finding prospects and immediately putting them into an outbound workflow, 360Airo has a stronger proposition.",
                  ]}
                  infographic={{
                    title: 'Prospecting priorities',
                    paragraphs: ['Apollo = database depth; 360Airo = actionable outbound workflow.'],
                    bullets: [
                      'Apollo: 240M+ contacts, 65+ filters',
                      '360Airo: Prospect importing, enrichment, email verification, account-based prospecting',
                      'Choose based on whether you need data or execution',
                    ],
                  }}
                  blocks={[]}
                />

                {/* AI SDR */}
                <ArticleSection
                  key="ai-sdr"
                  id="ai-sdr"
                  title="2. AI SDR and Automation"
                  showImage={false}
                  intro={[
                    "This is one of 360Airo's biggest advantages. 360Airo's AI SDR agents are designed to research prospects, personalize messages, verify signals, automate workflow steps, and help manage replies. That changes the role of AI from 'write me an email' to something closer to an automated sales assistant.",
                    "For an SMB, that can be valuable. You may not have the budget to hire a large SDR team. Instead, you want your existing salespeople to spend more time on qualified conversations and less time researching accounts, writing repetitive messages, and managing follow-ups.",
                    "Apollo also has substantial AI capabilities, including AI-assisted prospecting and lead scoring. Its AI-generated scoring can evaluate prospects based on ICP-related filters and signals.",
                    "The difference is positioning. Apollo uses AI to make a broad sales platform smarter. 360Airo puts AI automation closer to the center of the outbound workflow. For lean sales teams, that distinction can be important.",
                  ]}
                  infographic={{
                    title: 'AI as a sales assistant',
                    paragraphs: ['360Airo turns AI into an automated SDR; Apollo uses AI to enhance a broad sales platform.'],
                    bullets: [
                      '360Airo AI SDR: research, personalize, prioritize, automate',
                      'Apollo AI: assisted prospecting and lead scoring',
                      'Choose 360Airo for AI-led execution, Apollo for AI-enhanced intelligence',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Multichannel */}
                <ArticleSection
                  key="multichannel"
                  id="multichannel"
                  title="3. Multichannel Outreach"
                  showImage={false}
                  intro={[
                    "Modern buyers rarely respond to a single touchpoint. 360Airo supports outreach across email, LinkedIn, and SMS, allowing teams to build multichannel sequences rather than relying entirely on cold email. Its workflow can combine different actions, such as sending an email, triggering a LinkedIn action, and following up based on what happens next.",
                    "That gives SMBs more flexibility without requiring separate tools for every channel. Apollo also supports multichannel sales engagement, including sequences, email, LinkedIn, and calling capabilities.",
                    "The difference comes down to what your team wants to prioritize. For teams heavily invested in Apollo's broader sales ecosystem, Apollo remains compelling. For an SMB looking for an outbound-first workspace with AI automation and multichannel execution built into the same system, 360Airo is a strong alternative.",
                  ]}
                  infographic={{
                    title: 'Multichannel workflows',
                    paragraphs: ['360Airo combines email, LinkedIn, and SMS in one unified workflow.'],
                    bullets: [
                      'Email, LinkedIn, and SMS sequences',
                      'Unified campaign management',
                      'Apollo also supports multichannel, but 360Airo is more execution-focused',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Deliverability */}
                <ArticleSection
                  key="deliverability"
                  id="deliverability"
                  title="4. Deliverability Is Not an Afterthought"
                  showImage={false}
                  intro={[
                    "A prospecting platform is only useful if your messages reach the prospect. 360Airo puts considerable emphasis on outbound infrastructure, including automated email warmup, inbox rotation, smart scheduling, sending limits, deliverability monitoring, and domain management.",
                    "This is particularly useful for SMBs running outbound campaigns from multiple mailboxes. Instead of treating deliverability as something the sales team has to figure out separately, 360Airo builds it into the outbound workflow.",
                    "Apollo also provides email warmup and deliverability functionality. But for teams where outbound infrastructure is a major concern, 360Airo's focus on inbox management and sending infrastructure is a meaningful advantage.",
                  ]}
                  infographic={{
                    title: 'Deliverability built in',
                    paragraphs: ['360Airo includes automated warmup, inbox rotation, and sending limits – all essential for outbound.'],
                    bullets: [
                      'Automated email warmup',
                      'Inbox rotation',
                      'Smart scheduling and sending limits',
                      'Deliverability monitoring',
                      'Domain management',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Personalization */}
                <ArticleSection
                  key="personalization"
                  id="personalization"
                  title="5. Personalization Without Doing Everything Manually"
                  showImage={false}
                  intro={[
                    "'Personalized outreach' sounds great until a sales rep has to research 200 prospects individually. 360Airo uses enrichment and AI to create personalized messaging based on prospect and company information. Its platform can use signals from sources such as LinkedIn profiles, company websites, and CRM information to build context for outreach.",
                    "That means personalization can happen at scale without requiring a salesperson to manually research every prospect. Apollo also offers AI-assisted research and personalization.",
                    "The important distinction is that 360Airo connects personalization directly to its automated outreach engine. For an SMB, that can mean fewer manual steps between finding a prospect and launching a relevant campaign.",
                  ]}
                  infographic={{
                    title: 'Personalization at scale',
                    paragraphs: ['360Airo uses AI and enrichment to automate personalization; Apollo requires more manual effort.'],
                    bullets: [
                      'AI-generated messaging based on prospect context',
                      'Enrichment signals from LinkedIn, websites, CRM',
                      'Automated personalization engine',
                    ],
                  }}
                  blocks={[]}
                />

                {/* CRM Integration */}
                <ArticleSection
                  key="crm-integration"
                  id="crm-integration"
                  title="6. CRM and Workflow Integration"
                  showImage={false}
                  intro={[
                    "360Airo supports CRM synchronization and integrations, allowing teams to bring prospect and sales data into their outbound workflows. Its platform currently lists integrations with systems such as Salesforce, HubSpot, and Pipedrive.",
                    "Apollo also offers CRM integrations and workflow automation. Neither platform should be judged simply on whether it has a CRM integration. The better question is how much manual work remains after the integration is connected.",
                    "For an SMB, the ideal setup is one where prospect data, enrichment, outreach, replies, and pipeline activity move through the workflow without constant spreadsheet exports and manual updates.",
                  ]}
                  infographic={{
                    title: 'CRM integration matters',
                    paragraphs: ['Both platforms integrate with major CRMs – but the workflow integration is key.'],
                    bullets: [
                      '360Airo: Salesforce, HubSpot, Pipedrive',
                      'Apollo: broad CRM and sales-stack integrations',
                      'Focus on seamless data flow and reduced manual work',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Pricing */}
                <ArticleSection
                  key="pricing"
                  id="pricing"
                  title="7. Pricing and SMB Value"
                  showImage={false}
                  intro={[
                    "Pricing is another area where the comparison needs context. 360Airo currently offers: Free ($0), Starter ($99/month), Pro ($299/month), and Enterprise (custom pricing). Its Starter plan includes 5,000 contacts, eight mailboxes, three users, 3,000 AI credits per month, three LinkedIn seats, verification credits, warmup, inbox rotation, and a unified inbox. The Pro plan increases the limits to 25,000 contacts, 20 mailboxes, five users, 10,000 AI credits, and five LinkedIn seats, along with advanced AI and integrations.",
                    "Apollo also has a free plan, with paid plans and credit-based usage depending on the plan and activity.",
                    "The key difference is that 360Airo's pricing is structured around the outbound infrastructure and capabilities an SMB needs, rather than making the comparison solely about contact volume. If you need more mailboxes, LinkedIn seats, AI personalization, inbox rotation, and multichannel outreach in one package, 360Airo can offer strong value.",
                  ]}
                  infographic={{
                    title: 'Pricing and value',
                    paragraphs: ['360Airo offers outbound-focused plans starting at $99/month; Apollo has credit-based usage.'],
                    bullets: [
                      '360Airo: Free, Starter ($99), Pro ($299), Enterprise',
                      'Starter includes 5,000 contacts, 8 mailboxes, 3 users, AI credits, warmup, inbox rotation',
                      'Apollo: free plan with credit-based usage',
                      '360Airo focuses on outbound infrastructure value for SMBs',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Which One */}
                <ArticleSection
                  key="which-one"
                  id="which-one"
                  title="360Airo vs Apollo: Which One Should You Choose?"
                  showImage={false}
                  intro={[
                    "Choose Apollo if you mainly need a very large B2B contact database, extensive prospecting filters, large-scale account and contact research, intent and buying signals, lead scoring, a broad sales intelligence ecosystem, and established sales engagement capabilities. Apollo's database and prospecting depth are genuine strengths.",
                    "Choose 360Airo if you want AI-driven outbound workflows, AI SDR capabilities, multichannel outreach, email and LinkedIn automation, prospect enrichment and verification, email warmup and inbox rotation, unified inbox management, AI personalization, a single outbound workspace, and a platform designed around lean, growth-focused sales teams.",
                    "That is where 360Airo makes its strongest case. It is not trying to win simply by claiming to have a bigger database. It is trying to make the entire journey from prospect discovery to personalized outreach to reply management easier.",
                  ]}
                  infographic={{
                    title: 'Decision guide',
                    paragraphs: ['Choose Apollo for data, choose 360Airo for execution.'],
                    bullets: [
                      'Apollo: large database, prospecting filters, intent signals, lead scoring',
                      '360Airo: AI SDR, multichannel outreach, deliverability, unified outbound workflow',
                      'For SMBs focused on execution, 360Airo is the better fit',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Verdict */}
                <ArticleSection
                  key="verdict"
                  id="verdict"
                  title="The Verdict: 360Airo vs Apollo"
                  showImage={false}
                  intro={[
                    "Apollo is a strong choice if your biggest priority is large-scale sales intelligence and prospect discovery.",
                    "360Airo is the better fit if your priority is turning prospect intelligence into automated, personalized outbound without building a complicated sales stack.",
                    "And for many SMBs, that second part is what matters most. You do not need another giant database sitting inside your tech stack. You need a system that helps your team find the right people, understand why they might care, reach them through the right channels, follow up consistently, and turn conversations into pipeline.",
                    "That is the problem 360Airo is built to solve. If you are evaluating Apollo alternatives, try 360Airo and see how quickly you can go from a prospect list to a live, personalized outbound campaign.",
                  ]}
                  infographic={{
                    title: '360Airo wins for outbound execution',
                    paragraphs: ['For SMBs, the ability to turn data into action is more valuable than data alone.'],
                    bullets: [
                      '360Airo: outbound-first, AI SDR, multichannel, deliverability, all-in-one workflow',
                      'Apollo: database-first, broad intelligence, sales engagement',
                      '360Airo is the better fit for lean SMB teams focused on pipeline generation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Demo CTA */}
                <DemoCTA />
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
                    title: 'Sales Intelligence Features Every SMB Should Look For',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-features-smb',
                    description: 'Discover the 13 key sales intelligence features every SMB should look for.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How Sales Intelligence Improves B2B Prospecting Accuracy',
                    tag: 'Listicles',
                    href: '/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
                    description: 'Learn how sales intelligence improves B2B prospecting accuracy with better data and insights.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-vs-crm-key-differences',
                    description: 'Understand the key differences between sales intelligence and CRM, and how they work together.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                ].map((post) => (
                  <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} />
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
    </>
  );
}