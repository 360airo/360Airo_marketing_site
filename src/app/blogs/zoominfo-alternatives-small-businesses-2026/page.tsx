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
  { id: 'why-moving-away', label: 'Why Small Businesses Are Moving Away from ZoomInfo', arrow: true },
  { id: 'what-makes-good', label: 'What Makes a Good ZoomInfo Alternative?', arrow: true },
  { id: 'alt-360airo', label: '1. 360 Airo – Best for AI-Powered Prospect Research', arrow: true },
  { id: 'alt-apollo', label: '2. Apollo.io – Best All-in-One ZoomInfo Competitor', arrow: true },
  { id: 'alt-lusha', label: '3. Lusha – Best for Quick Contact Lookup', arrow: true },
  { id: 'alt-clay', label: '4. Clay – Best for Lead Enrichment', arrow: true },
  { id: 'alt-cognism', label: '5. Cognism – Best for European Businesses', arrow: true },
  { id: 'alt-lead411', label: '6. Lead411 – Best for Phone-Based Prospecting', arrow: true },
  { id: 'alt-linkedin', label: '7. LinkedIn Sales Navigator – Best for Relationship Selling', arrow: true },
  { id: 'alt-saleshandy', label: '8. Saleshandy – Best for Cold Email Outreach', arrow: true },
  { id: 'comparison-table', label: 'Quick Comparison of ZoomInfo Competitors', arrow: true },
  { id: 'which-offers-best-value', label: 'Which ZoomInfo Alternative Offers the Best Value?', arrow: true },
  { id: 'how-to-choose', label: 'How to Choose the Right Platform', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
  { id: 'faqs', label: 'Frequently Asked Questions', arrow: true },
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
    alt: 'ZoomInfo alternatives comparison',
    label: 'Listicles',
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
          loading="lazy"
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

// --- FAQ Accordion Component ---
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

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          ZoomInfo Alternatives
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the top 8 ZoomInfo alternatives for small businesses in 2026 and find the right fit for your sales team.
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
          Pay for what you need
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Don't pay enterprise prices for features you won't use. Choose a platform built for SMBs that solves your actual bottleneck.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table ---
function ComparisonTable() {
  const rows = [
    { tool: '360 Airo', bestFor: 'AI-powered prospect research' },
    { tool: 'Apollo.io', bestFor: 'All-in-one prospecting' },
    { tool: 'Lusha', bestFor: 'Quick contact lookup' },
    { tool: 'Clay', bestFor: 'Lead enrichment' },
    { tool: 'Cognism', bestFor: 'European markets' },
    { tool: 'Lead411', bestFor: 'Phone prospecting' },
    { tool: 'LinkedIn Sales Navigator', bestFor: 'Relationship selling' },
    { tool: 'Saleshandy', bestFor: 'Cold email outreach' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Tool</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Best For</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Tool">{row.tool}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Best For">{row.bestFor}</td>
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
          If you want to have an established sales pipeline rather than pay for enterprise features that you may not need, you can benefit from using solutions like 360 Airo.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Explore 360 Airo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogZoomInfoAlternativesPage() {
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
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const featuredImageUrl = 'https://360airo.com/og-images/zoominfo-alternatives-2026.jpg';

  return (
    <>
      <Head>
        <title>ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026</title>
        <meta
          name="description"
          content="Compare the top 8 ZoomInfo alternatives for small businesses in 2026. Discover better options for AI-powered prospecting, lead enrichment, and sales growth."
        />
        <meta
          name="keywords"
          content="ZoomInfo alternatives, ZoomInfo competitors, best ZoomInfo alternatives, SMB sales tools, 360 Airo, Apollo.io, Lusha, Clay"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026"
        />
        <meta
          property="og:description"
          content="Compare the top 8 ZoomInfo alternatives for small businesses in 2026. Discover better options for AI-powered prospecting, lead enrichment, and sales growth."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026"
        />
        <meta
          name="twitter:description"
          content="Compare the top 8 ZoomInfo alternatives for small businesses in 2026. Discover better options for AI-powered prospecting, lead enrichment, and sales growth."
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
                  '@id': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026/#webpage',
                  'url': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026',
                  'name': 'ZoomInfo Alternatives for Small Businesses',
                  'description': 'Compare the top 8 ZoomInfo alternatives for small businesses in 2026. Discover better options for AI-powered prospecting, lead enrichment, and sales growth.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026/#article',
                  'headline': 'ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026',
                  'description': 'Compare the top 8 ZoomInfo alternatives for small businesses in 2026. Discover better options for AI-powered prospecting, lead enrichment, and sales growth.',
                  'url': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026',
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
                    '@id': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'ZoomInfo alternatives',
                    'ZoomInfo competitors',
                    'best ZoomInfo alternatives',
                    'SMB sales tools',
                    '360 Airo',
                    'Apollo.io',
                    'Lusha',
                    'Clay',
                  ],
                  'datePublished': '2026-12-04',
                  'dateModified': '2026-12-04',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026/#breadcrumb',
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
                      'name': 'ZoomInfo Alternatives',
                      'item': 'https://360airo.com/blogs/zoominfo-alternatives-small-businesses-2026',
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
                  <span className="hidden sm:inline">ZoomInfo Alternatives for Small Businesses in 2026</span>
                  <span className="sm:hidden">ZoomInfo Alternatives</span>
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
                      alt="ZoomInfo alternatives for small businesses"
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
                    Listicles
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    ZoomInfo is powerful for enterprises, but small businesses often pay for features they don't need. Compare 8 better alternatives – from AI-powered prospecting to affordable contact lookup and cold email outreach.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Dec 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.5K reads</span>
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
                    "ZoomInfo has been the number one go-to solution for a long time now for large contact databases, company information, and sales insights all in one place. And ZoomInfo has established itself well, particularly among the enterprise sales teams that deal with thousands of leads every single month but that is definitely not how small businesses operate.",
                    "A startup founder, five-member sales team, or rapidly growing agency doesn't need all those hundreds of features from the enterprise solution. What they really need is an efficient, accurate contact information provider, fast lead enrichment capabilities, and enough context to reach out and actually have a response. More importantly, it needs to be a cost-effective tool that doesn't force them to pay for costly plans that they won't even use.",
                    "This is precisely why there is now such a high demand for a ZoomInfo alternative.",
                    "Over the last few years, there has been quite a shift in the market, with the emergence of numerous highly advanced AI sales tools that made prospecting much faster, lead research much more effective, and personalization much easier than it has ever been before. Now, SMBs are free to pick the tool that best suits their workflow.",
                    "And this guide will help you find the best ZoomInfo alternatives. Finding good B2B leads shouldn't feel like paying enterprise prices for enterprise problems.",
                  ]}
                  infographic={{
                    title: 'Enterprise tool, SMB price tag',
                    paragraphs: ['ZoomInfo is powerful for enterprises, but SMBs often pay for features they don\'t need.'],
                    bullets: [
                      'High pricing that doesn\'t match SMB budgets',
                      'Features designed for enterprise teams',
                      'Annual contracts that reduce flexibility',
                      'The need for better AI-powered lead research',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-moving-away"
                  id="why-moving-away"
                  title="Why Small Businesses Are Moving Away from ZoomInfo"
                  showImage={true}
                  intro={[
                    "ZoomInfo is not a poor service, actually; it is one of the most powerful sales intelligence solutions out there on the market, especially for enterprises.",
                    "The problem is that SMBs end up purchasing functionalities that they will never take advantage of fully.",
                    "For instance, the daily routine of the average SMB sales person does not just involve prospecting, but responding to emails, demos, creating proposals, entering information into the CRM, and contacting leads. Every hour that the sales rep spends conducting company research manually is an hour wasted from closing more deals.",
                    "This leads SMBs to consider other solutions due to reasons such as:",
                  ]}
                  infographic={{
                    title: 'Why SMBs are switching',
                    paragraphs: ['Small businesses need SMB-focused tools, not enterprise solutions with unused features.'],
                    bullets: [
                      'High pricing that doesn\'t match SMB budgets',
                      'Features designed for enterprise teams',
                      'Annual contracts that reduce flexibility',
                      'Credit-based limitations',
                      'The need for better AI-powered lead research',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The shift to smarter prospecting',
                      paragraphs: [
                        'Rather than simply finding more contacts, today\'s sales teams want to find better prospects faster. That\'s where newer sales intelligence platforms are making a noticeable difference.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-makes-good"
                  id="what-makes-good"
                  title="What Makes a Good ZoomInfo Alternative?"
                  showImage={false}
                  intro={[
                    "Choosing a replacement isn't about finding the cheapest option.",
                    "It's about finding a platform that solves the problems your sales team faces every day.",
                    "A strong ZoomInfo alternative should offer:",
                  ]}
                  infographic={{
                    title: 'Key features to evaluate',
                    paragraphs: ['The right platform should solve your team\'s daily challenges.'],
                    bullets: [
                      'Verified B2B contact information',
                      'Company insights',
                      'Lead enrichment',
                      'CRM integrations',
                      'AI-assisted prospect research',
                      'Pricing that scales with growing businesses',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="alt-360airo"
                  id="alt-360airo"
                  title="1. 360 Airo – Best for AI-Powered Prospect Research"
                  showImage={false}
                  intro={[
                    "Best for AI-powered prospect research.",
                    "If your team spends too much time researching companies before sending the first email, 360 Airo deserves serious attention.",
                    "Instead of acting like another contact database, it focuses on helping sales teams understand prospects before reaching out. That difference matters more than it sounds. Instead of opening LinkedIn, company websites, funding announcements, and multiple browser tabs, teams can gather meaningful context much faster.",
                    "Why small businesses like it: AI-powered prospect research, faster lead qualification, better outreach personalization, useful company insights, and built for growing sales teams.",
                    "360 Airo vs ZoomInfo: ZoomInfo wins when database size is the priority. 360 Airo becomes more useful when personalization matters. For smaller teams trying to increase reply rates rather than simply exporting thousands of contacts, that research-first approach often feels more practical.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI-powered research, lead qualification, personalization, and company insights.'],
                    bullets: [
                      'AI-powered prospect research',
                      'Faster lead qualification',
                      'Better outreach personalization',
                      'Useful company insights',
                      'Built for growing sales teams',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="alt-apollo"
                  id="alt-apollo"
                  title="2. Apollo.io – Best All-in-One ZoomInfo Competitor"
                  showImage={false}
                  intro={[
                    "Best all-in-one ZoomInfo competitor.",
                    "Apollo.io has become one of the most popular choices for startups because it combines prospect discovery with outreach tools inside one platform. Instead of paying separately for contact lookup and email sequencing, businesses can manage both from a single dashboard.",
                    "What works well: Large B2B contact database, email sequencing, CRM integrations, affordable entry point.",
                    "Where it struggles: Credit-based usage, contact accuracy can vary depending on industry.",
                    "For businesses building their outbound process from scratch, Apollo remains one of the easiest platforms to adopt.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Large database, email sequencing, and CRM integrations.'],
                    bullets: [
                      'Large B2B contact database',
                      'Email sequencing',
                      'CRM integrations',
                      'Affordable entry point',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Apollo',
                      paragraphs: ['Apollo is best for businesses building their outbound process from scratch and wanting an all-in-one platform.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-lusha"
                  id="alt-lusha"
                  title="3. Lusha – Best for Quick Contact Lookup"
                  showImage={false}
                  intro={[
                    "Best for quick contact lookup.",
                    "Some sales teams don't want a complicated platform. They just want accurate contact information as quickly as possible. That's where Lusha shines.",
                    "Its Chrome extension makes it easy to find contact details while browsing LinkedIn or company websites, which makes it particularly useful for founders, recruiters, and smaller sales teams.",
                    "Pros: Simple setup, affordable pricing, fast contact lookup, CRM integrations.",
                    "Cons: Smaller database, limited automation.",
                    "If speed matters more than advanced workflows, Lusha is worth considering.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Simple contact lookup, Chrome extension, and affordable pricing.'],
                    bullets: [
                      'Simple setup',
                      'Affordable pricing',
                      'Fast contact lookup',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Lusha',
                      paragraphs: ['Lusha is best for founders, recruiters, and smaller sales teams that need quick, accurate contact information without complexity.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-clay"
                  id="alt-clay"
                  title="4. Clay – Best for Lead Enrichment"
                  showImage={false}
                  intro={[
                    "Best for lead enrichment.",
                    "Clay has become one of the fastest-growing AI sales tools for a reason. Instead of relying on a single data provider, it connects multiple sources into customizable workflows that automate research and lead enrichment.",
                    "It feels less like a traditional database and more like a sales research engine.",
                    "Why teams choose Clay: Multi-source enrichment, AI-powered workflows, flexible automation, better personalization.",
                    "Downsides: Learning curve, better suited for technical users.",
                    "If your team enjoys building custom workflows, Clay offers flexibility that many traditional platforms don't.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multi-source enrichment, AI workflows, and flexible automation.'],
                    bullets: [
                      'Multi-source enrichment',
                      'AI-powered workflows',
                      'Flexible automation',
                      'Better personalization',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Clay',
                      paragraphs: ['Clay is best for teams that enjoy building custom workflows and need flexibility beyond traditional databases.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-cognism"
                  id="alt-cognism"
                  title="5. Cognism – Best for European Businesses"
                  showImage={false}
                  intro={[
                    "Best for European businesses.",
                    "Selling into European markets comes with different challenges. Compliance matters. Cognism has built its reputation around GDPR-compliant data and verified mobile numbers, making it a strong choice for businesses targeting EMEA markets.",
                    "Why it stands out: Verified mobile numbers, GDPR-compliant data, strong European coverage, better connect rates.",
                    "Where it falls short: Premium pricing, less attractive for businesses focused only on North America.",
                    "If Europe is a major part of your growth strategy, Cognism deserves a closer look.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['GDPR-compliant data, verified mobile numbers, and European coverage.'],
                    bullets: [
                      'Verified mobile numbers',
                      'GDPR-compliant data',
                      'Strong European coverage',
                      'Better connect rates',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Cognism',
                      paragraphs: ['Cognism is best for businesses expanding into European markets where GDPR compliance and verified data are critical.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-lead411"
                  id="alt-lead411"
                  title="6. Lead411 – Best for Phone-Based Prospecting"
                  showImage={false}
                  intro={[
                    "Best for phone-based prospecting.",
                    "Not every outbound strategy revolves around email. Many sales teams still rely heavily on phone calls. Lead411 focuses on delivering verified direct dials along with useful buying intent signals that help teams prioritize outreach.",
                    "Pros: Verified phone numbers, buying intent data, affordable pricing, easy onboarding.",
                    "Cons: Smaller database.",
                    "For outbound calling teams, accuracy often matters more than database size.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Verified phone numbers, buying intent, and affordable plans.'],
                    bullets: [
                      'Verified phone numbers',
                      'Buying intent data',
                      'Affordable pricing',
                      'Easy onboarding',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Lead411',
                      paragraphs: ['Lead411 is best for SDR teams making high volumes of cold calls where accuracy matters more than database size.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-linkedin"
                  id="alt-linkedin"
                  title="7. LinkedIn Sales Navigator – Best for Relationship Selling"
                  showImage={false}
                  intro={[
                    "Best for relationship selling.",
                    "Sometimes the fastest way into an account isn't through a cold email. It's through relationships.",
                    "LinkedIn Sales Navigator helps sales professionals identify decision-makers, track job changes, and discover mutual connections that make outreach more relevant.",
                    "What makes it valuable: Advanced search filters, professional insights, job-change alerts, CRM integrations.",
                    "Limitations: Doesn't replace a contact database, usually works best alongside another prospecting tool.",
                    "For account-based selling, it's one of the strongest complementary tools available.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Advanced filters, job-change alerts, and relationship insights.'],
                    bullets: [
                      'Advanced search filters',
                      'Professional insights',
                      'Job-change alerts',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose LinkedIn Sales Navigator',
                      paragraphs: ['LinkedIn Sales Navigator is best for account-based selling and relationship-driven sales approaches.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="alt-saleshandy"
                  id="alt-saleshandy"
                  title="8. Saleshandy – Best for Cold Email Outreach"
                  showImage={false}
                  intro={[
                    "Best for cold email outreach.",
                    "Saleshandy takes a slightly different approach. While many sales platforms prioritize contact databases, Saleshandy focuses heavily on getting cold emails delivered successfully.",
                    "For businesses running outbound email campaigns every day, that specialization can make a real difference.",
                    "Pros: Better email deliverability, campaign management, lead finder included, straightforward pricing.",
                    "Cons: More outreach-focused than research-focused.",
                    "If cold email drives most of your pipeline, Saleshandy is a practical alternative.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email deliverability, campaign management, and lead finding.'],
                    bullets: [
                      'Better email deliverability',
                      'Campaign management',
                      'Lead finder included',
                      'Straightforward pricing',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Saleshandy',
                      paragraphs: ['Saleshandy is best for teams where cold email is the primary growth channel and deliverability is a top priority.'],
                    },
                  ]}
                />

                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Quick Comparison of ZoomInfo Competitors
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s a quick summary of the best ZoomInfo alternatives and their primary strengths:</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                <ArticleSection
                  key="which-offers-best-value"
                  id="which-offers-best-value"
                  title="Which ZoomInfo Alternative Offers the Best Value?"
                  showImage={false}
                  intro={[
                    "Not all the time will the costliest one be the most beneficial.",
                    "For most small to medium businesses, the value lies in saving research time, personalization, and scheduling more meetings for the sales team.",
                    "In case of the importance of prospect research through artificial intelligence, 360 Airo can be a great choice. When you consider affordability, Apollo and Lusha can still be good choices. For cold emailing, Saleshandy would make sense. And when Europe is the focus area, Cognism becomes a worthwhile choice in the long run.",
                  ]}
                  infographic={{
                    title: 'Value by use case',
                    paragraphs: ['The best value depends on your specific sales challenge and priorities.'],
                    bullets: [
                      'AI prospect research → 360 Airo',
                      'Affordability → Apollo, Lusha',
                      'Cold email → Saleshandy',
                      'European market → Cognism',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="How to Choose the Right Platform"
                  showImage={false}
                  intro={[
                    "The easiest mistake businesses make is choosing the platform with the longest feature list. Instead, choose the one that removes your biggest sales bottleneck.",
                  ]}
                  infographic={{
                    title: 'Decision guide',
                    paragraphs: ['Choose the platform that solves your specific bottleneck.'],
                    bullets: [
                      'Choose 360 Airo if you want AI-powered research and smarter lead qualification',
                      'Choose Apollo.io if you want an affordable all-in-one platform',
                      'Choose Lusha if quick contact lookup is your biggest priority',
                      'Choose Clay if lead enrichment and automation matter most',
                      'Choose Cognism if Europe is your primary market',
                      'Choose Lead411 if phone outreach drives your sales',
                      'Choose LinkedIn Sales Navigator if relationship selling is central to your strategy',
                      'Choose Saleshandy if cold email is your biggest acquisition channel',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Adoption matters most',
                      paragraphs: ['The best platform is the one your team will actually use consistently.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    "Despite ZoomInfo being one of the leading providers of sales intelligence, not all businesses should consider it to be the optimal solution.",
                    "Modern sales intelligence tools for small- and medium-sized businesses feature improved scalability, affordability, machine learning lead generation, and streamlined processes that enable young teams to create more high-quality leads without going over budget.",
                    "In case you want to have an established sales pipeline rather than pay for enterprise features that you may not need, you can benefit from using solutions like 360 Airo.",
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      'For SMBs that want to move beyond enterprise pricing and focus on AI-powered prospect research, 360 Airo offers a smarter alternative.',
                    ],
                  }}
                  blocks={[]}
                />

                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about ZoomInfo alternatives for small businesses.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'What is the best ZoomInfo alternative for small businesses?',
                          paragraphs: ['360 Airo is one of the best ZoomInfo alternatives for SMBs because it combines AI-powered prospect research, company insights, and lead qualification without the enterprise-heavy approach.'],
                        },
                        {
                          subtitle: 'Which ZoomInfo competitor is the most affordable?',
                          paragraphs: ['Lusha and Apollo.io are popular budget-friendly alternatives that offer verified contact data and essential prospecting features for growing businesses.'],
                        },
                        {
                          subtitle: 'Is ZoomInfo worth it for startups?',
                          paragraphs: ['ZoomInfo can be valuable for startups with larger sales budgets, but many early-stage companies find better value in more affordable alternatives that focus on SMB needs.'],
                        },
                        {
                          subtitle: 'Which tool is best for lead enrichment?',
                          paragraphs: ['Clay stands out for lead enrichment because it combines multiple data sources and AI-powered workflows to build richer prospect profiles.'],
                        },
                        {
                          subtitle: 'What is the difference between 360 Airo and ZoomInfo?',
                          paragraphs: ['ZoomInfo focuses heavily on database size, while 360 Airo emphasizes AI-powered prospect research and smarter lead qualification for smaller sales teams.'],
                        },
                      ]}
                    />
                  </div>
                </section>

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
                    title: 'Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster',
                    tag: 'Listicles',
                    href: '/blogs/best-apollo-alternatives-smb-2026',
                    description: 'Compare the top 8 Apollo.io alternatives for SMBs in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How to Choose the Right Sales Intelligence Platform for Your Business',
                    tag: 'Listicles',
                    href: '/blogs/how-to-choose-sales-intelligence-platform',
                    description: 'Learn how to choose the right sales intelligence platform for your business.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams',
                    tag: 'Listicles',
                    href: '/blogs/360airo-vs-zoominfo-complete-comparison',
                    description: 'Compare 360 Airo and ZoomInfo side by side.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                ].map((post) => (
                  <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} loading="lazy" />
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