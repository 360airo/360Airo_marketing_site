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
  { id: 'why-look-for-alternative', label: 'Why Businesses Look for an Apollo Alternative', arrow: true },
  { id: 'what-makes-good', label: 'What Makes a Good Apollo.io Alternative?', arrow: true },
  { id: 'alt-360airo', label: '1. 360 Airo – Best for AI-Powered Prospect Research', arrow: true },
  { id: 'alt-zoominfo', label: '2. ZoomInfo – Best for Enterprise-Scale Databases', arrow: true },
  { id: 'alt-clay', label: '3. Clay – Best for AI Workflows and Data Enrichment', arrow: true },
  { id: 'alt-lusha', label: '4. Lusha – Best Budget-Friendly Apollo Competitor', arrow: true },
  { id: 'alt-cognism', label: '5. Cognism – Best for European Prospecting', arrow: true },
  { id: 'alt-lead411', label: '6. Lead411 – Best for Verified Phone Numbers', arrow: true },
  { id: 'alt-linkedin', label: '7. LinkedIn Sales Navigator – Best for Relationship Selling', arrow: true },
  { id: 'alt-saleshandy', label: '8. Saleshandy – Best for Cold Email Outreach', arrow: true },
  { id: 'comparison-table', label: 'Quick Comparison of Apollo Alternatives', arrow: true },
  { id: '360airo-vs-apollo', label: '360 Airo vs Apollo: Which One Is Better?', arrow: true },
  { id: 'how-to-choose', label: 'How to Choose the Right Apollo Alternative', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
  { id: 'faqs', label: 'FAQs', arrow: true },
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
    alt: 'Apollo.io alternatives comparison',
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
          Apollo Alternatives
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the top 8 Apollo.io alternatives for SMBs in 2026 and find the right fit for your sales team.
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
          Know your bottleneck
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The best alternative depends on your biggest challenge – data accuracy, AI prospecting, cold email, or budget.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table ---
function ComparisonTable() {
  const rows = [
    { tool: '360 Airo', bestFor: 'AI-powered prospect research' },
    { tool: 'ZoomInfo', bestFor: 'Enterprise contact database' },
    { tool: 'Clay', bestFor: 'AI workflows and enrichment' },
    { tool: 'Lusha', bestFor: 'Budget-friendly prospecting' },
    { tool: 'Cognism', bestFor: 'European markets' },
    { tool: 'Lead411', bestFor: 'Verified phone numbers' },
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
          If you are looking for the right prospects, qualification and reaching out to them in a way that actually produces results, then solutions like 360 Airo offer a much better option.
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

export default function BlogApolloAlternativesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/best-apollo-alternatives-2026.jpg';

  return (
    <>
      <Head>
        <title>Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster</title>
        <meta
          name="description"
          content="Compare the top 8 Apollo.io alternatives for SMBs in 2026. Discover better options for AI-powered prospecting, contact accuracy, automation, and sales growth."
        />
        <meta
          name="keywords"
          content="Apollo.io alternatives, Apollo competitors, best Apollo alternatives, SMB sales tools, 360 Airo, ZoomInfo, Clay, Lusha"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-apollo-alternatives-smb-2026"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster"
        />
        <meta
          property="og:description"
          content="Compare the top 8 Apollo.io alternatives for SMBs in 2026. Discover better options for AI-powered prospecting, contact accuracy, automation, and sales growth."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-apollo-alternatives-smb-2026"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster"
        />
        <meta
          name="twitter:description"
          content="Compare the top 8 Apollo.io alternatives for SMBs in 2026. Discover better options for AI-powered prospecting, contact accuracy, automation, and sales growth."
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
                  '@id': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026/#webpage',
                  'url': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026',
                  'name': 'Best Apollo.io Alternatives for SMBs in 2026',
                  'description': 'Compare the top 8 Apollo.io alternatives for SMBs in 2026. Discover better options for AI-powered prospecting, contact accuracy, automation, and sales growth.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026/#article',
                  'headline': 'Best Apollo.io Alternatives for SMBs in 2026',
                  'description': 'Compare the top 8 Apollo.io alternatives for SMBs in 2026. Discover better options for AI-powered prospecting, contact accuracy, automation, and sales growth.',
                  'url': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026',
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
                    '@id': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'Apollo.io alternatives',
                    'Apollo competitors',
                    'best Apollo alternatives',
                    'SMB sales tools',
                    '360 Airo',
                    'ZoomInfo',
                    'Clay',
                    'Lusha',
                  ],
                  'datePublished': '2026-12-02',
                  'dateModified': '2026-12-02',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026/#breadcrumb',
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
                      'name': 'Best Apollo.io Alternatives',
                      'item': 'https://360airo.com/blogs/best-apollo-alternatives-smb-2026',
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
                  <span className="hidden sm:inline">Best Apollo.io Alternatives for SMBs in 2026</span>
                  <span className="sm:hidden">Apollo Alternatives</span>
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
                      alt="Apollo.io alternatives"
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
                    Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Apollo.io is a popular sales tool, but it isn't the perfect fit for every SMB. Compare 8 better alternatives – from AI-powered prospecting to verified contact data and cold email outreach.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Dec 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.7K reads</span>
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
                    "Apollo.io is a sales tool that sooner or later becomes known to almost every growing sales team due to its enormous database of contacts, automated email outreach, and sufficient automation opportunities to launch outbound marketing campaigns using a single platform.",
                    "And to be honest, it works pretty well for many organizations.",
                    "However, as your sales strategy becomes more advanced, Apollo's disadvantages become more apparent. You may experience unexpected depletion of credits, spend too much time on verifying your contact data, or feel that it lacks smart AI-powered prospecting rather than just another list of leads.",
                    "And if this situation resonates with you, you're in luck. Fortunately, there are a number of Apollo competitors offering better contact accuracy, superior automation, and SMB-specific features.",
                    "This guide will help you choose the best Apollo.io alternatives in 2026 by analyzing 360 Airo vs Apollo and other similar solutions.",
                  ]}
                  infographic={{
                    title: 'Why look beyond Apollo?',
                    paragraphs: ['Apollo works well for many teams, but advanced sales strategies often reveal its limitations.'],
                    bullets: [
                      'Credit limits can become expensive',
                      'Contact data accuracy varies by region',
                      'AI-powered prospecting is limited',
                      'Better alternatives exist for SMBs',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-look-for-alternative"
                  id="why-look-for-alternative"
                  title="Why Businesses Look for an Apollo Alternative"
                  showImage={true}
                  intro={[
                    "Apollo integrates contact discovery, email communication, and sales automation in one solution, but that does not mean that it will work perfectly for every organization.",
                    "For small and medium-sized businesses, each salesperson plays several roles. They need to research their leads, write emails, schedule calls, follow up, etc. If the tool hampers any of these steps, efficiency is compromised.",
                    "Some of the most common reasons why companies stop using Apollo are:",
                  ]}
                  infographic={{
                    title: 'Common reasons for switching',
                    paragraphs: ['Many SMBs outgrow Apollo and look for more advanced or accurate solutions.'],
                    bullets: [
                      'Contact information isn\'t always accurate in certain industries or regions',
                      'Credit limits make large-scale prospecting expensive',
                      'Email sequencing feels basic compared to dedicated outreach platforms',
                      'AI-powered lead research is still fairly limited',
                      'Better buying intent signals are available elsewhere',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The shift to AI-powered tools',
                      paragraphs: [
                        'Instead of simply collecting more contacts, today\'s sales teams want tools that help them identify the right prospects faster. That\'s exactly where newer AI sales tools are making a difference.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-makes-good"
                  id="what-makes-good"
                  title="What Makes a Good Apollo.io Alternative?"
                  showImage={false}
                  intro={[
                    "Not every sales intelligence platform solves the same problem.",
                    "Some focus on building massive contact databases. Others specialize in cold email, data enrichment, or AI-assisted prospect research.",
                    "Before switching, look for features that actually support your sales process:",
                  ]}
                  infographic={{
                    title: 'Key features to evaluate',
                    paragraphs: ['The right platform should save your team time, not add complexity.'],
                    bullets: [
                      'Verified contact information',
                      'Company insights beyond basic firmographics',
                      'CRM integrations',
                      'AI-powered lead qualification',
                      'Email outreach capabilities',
                      'Pricing that makes sense for SMBs',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Alternative 1 - 360 Airo */}
                <ArticleSection
                  key="alt-360airo"
                  id="alt-360airo"
                  title="1. 360 Airo – Best for AI-Powered Prospect Research"
                  showImage={false}
                  intro={[
                    "Best for AI-powered prospect research.",
                    "If your sales team spends hours researching companies before reaching out, 360 Airo stands out as one of the strongest Apollo alternatives available today.",
                    "Instead of acting like another contact database, it focuses on helping sales teams understand prospects before making contact. That difference matters. Rather than opening LinkedIn, company websites, news articles, and multiple tabs, reps can gather meaningful insights much faster.",
                    "Why SMBs choose it: AI-powered prospect research, faster lead qualification, better personalization for outreach, company insights beyond contact details, and built for growing sales teams.",
                    "360 Airo vs Apollo: Apollo helps you find people. 360 Airo helps you decide who deserves your attention first. For SMBs with limited resources, that research-first approach can significantly improve outreach quality without increasing workload.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI-powered research, lead qualification, personalization, and company insights.'],
                    bullets: [
                      'AI-powered prospect research',
                      'Faster lead qualification',
                      'Better personalization for outreach',
                      'Company insights beyond contact details',
                      'Built for growing sales teams',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Alternative 2 - ZoomInfo */}
                <ArticleSection
                  key="alt-zoominfo"
                  id="alt-zoominfo"
                  title="2. ZoomInfo – Best for Enterprise-Scale Databases"
                  showImage={false}
                  intro={[
                    "Best for enterprise-scale databases.",
                    "ZoomInfo has been one of Apollo's biggest competitors for years. Its biggest strength is simple: data. The platform offers an enormous B2B contact database along with company intelligence and buying intent signals that larger organizations rely on.",
                    "Pros: Extensive global database, strong company insights, advanced intent data, excellent CRM integrations.",
                    "Cons: Expensive for smaller businesses, more features than many SMBs actually need.",
                    "If your business targets large enterprise accounts and has the budget for premium sales intelligence, ZoomInfo remains a powerful option.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Extensive B2B database, company intelligence, and intent signals.'],
                    bullets: [
                      'Extensive global database',
                      'Strong company insights',
                      'Advanced intent data',
                      'Excellent CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose ZoomInfo',
                      paragraphs: ['ZoomInfo is best for businesses targeting large enterprise accounts with the budget for premium sales intelligence.'],
                    },
                  ]}
                />

                {/* Alternative 3 - Clay */}
                <ArticleSection
                  key="alt-clay"
                  id="alt-clay"
                  title="3. Clay – Best for AI Workflows and Data Enrichment"
                  showImage={false}
                  intro={[
                    "Best for AI workflows and data enrichment.",
                    "Clay has quickly become one of the most talked-about AI sales tools. Instead of relying on a single database, it pulls information from multiple providers and lets you build customized workflows for prospecting and enrichment.",
                    "Think of it as a platform that automates research instead of simply storing contacts.",
                    "Pros: AI-powered workflows, multi-source data enrichment, highly customizable automation, great for outbound teams.",
                    "Cons: Takes time to learn, better suited for technical users.",
                    "If your team enjoys building automated sales systems, Clay offers flexibility that Apollo doesn't.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI workflows, multi-source enrichment, and customizable automation.'],
                    bullets: [
                      'AI-powered workflows',
                      'Multi-source data enrichment',
                      'Highly customizable automation',
                      'Great for outbound teams',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Clay',
                      paragraphs: ['Clay is best for teams that enjoy building automated sales systems and need flexibility beyond traditional databases.'],
                    },
                  ]}
                />

                {/* Alternative 4 - Lusha */}
                <ArticleSection
                  key="alt-lusha"
                  id="alt-lusha"
                  title="4. Lusha – Best Budget-Friendly Apollo Competitor"
                  showImage={false}
                  intro={[
                    "Best budget-friendly Apollo competitor.",
                    "Lusha keeps things refreshingly simple. Instead of overwhelming users with dozens of features, it focuses on helping sales professionals find verified contact information quickly. Its Chrome extension makes it particularly useful for LinkedIn prospecting.",
                    "Pros: Easy to use, affordable pricing, quick contact lookup, CRM integrations.",
                    "Cons: Smaller database, limited advanced automation.",
                    "It's a practical choice for founders, recruiters, and smaller sales teams that want reliable contact information without unnecessary complexity.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Simple contact lookup, Chrome extension, and affordable pricing.'],
                    bullets: [
                      'Easy to use',
                      'Affordable pricing',
                      'Quick contact lookup',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Lusha',
                      paragraphs: ['Lusha is best for founders, recruiters, and smaller sales teams that need reliable contact information without unnecessary complexity.'],
                    },
                  ]}
                />

                {/* Alternative 5 - Cognism */}
                <ArticleSection
                  key="alt-cognism"
                  id="alt-cognism"
                  title="5. Cognism – Best for European Prospecting"
                  showImage={false}
                  intro={[
                    "Best for European prospecting.",
                    "Selling into Europe requires more than accurate data. Compliance matters too. That's where Cognism stands out. Its GDPR-focused approach and verified mobile numbers make it particularly valuable for businesses targeting EMEA markets.",
                    "Pros: GDPR-compliant data, verified mobile numbers, strong European coverage, better connect rates.",
                    "Cons: Premium pricing, less valuable for US-only businesses.",
                    "For companies expanding across Europe, Cognism often becomes a stronger long-term investment than Apollo.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['GDPR-compliant data, verified mobile numbers, and European coverage.'],
                    bullets: [
                      'GDPR-compliant data',
                      'Verified mobile numbers',
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

                {/* Alternative 6 - Lead411 */}
                <ArticleSection
                  key="alt-lead411"
                  id="alt-lead411"
                  title="6. Lead411 – Best for Verified Phone Numbers"
                  showImage={false}
                  intro={[
                    "Best for verified phone numbers.",
                    "If your outbound strategy depends heavily on cold calling, Lead411 deserves attention. Rather than trying to compete across every category, it focuses on delivering verified direct dials and useful buying signals.",
                    "Pros: Verified phone numbers, buying intent data, affordable plans, easy onboarding.",
                    "Cons: Smaller database than enterprise platforms.",
                    "For SDR teams making high volumes of calls, accuracy matters more than sheer database size.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Verified phone numbers, buying intent, and affordable plans.'],
                    bullets: [
                      'Verified phone numbers',
                      'Buying intent data',
                      'Affordable plans',
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

                {/* Alternative 7 - LinkedIn Sales Navigator */}
                <ArticleSection
                  key="alt-linkedin"
                  id="alt-linkedin"
                  title="7. LinkedIn Sales Navigator – Best for Relationship Selling"
                  showImage={false}
                  intro={[
                    "Best for relationship selling.",
                    "Not every sale begins with a cold email. Sometimes the fastest way into an account is through existing connections and professional insights.",
                    "LinkedIn Sales Navigator gives sales professionals advanced search filters, job-change alerts, and relationship-building opportunities that Apollo can't fully replicate.",
                    "Pros: Advanced prospect filters, real-time career updates, mutual connection insights, CRM integrations.",
                    "Cons: Doesn't provide a traditional contact database, often needs another outreach tool alongside it.",
                    "For account-based selling, it's one of the most valuable tools available.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Advanced filters, job-change alerts, and relationship insights.'],
                    bullets: [
                      'Advanced prospect filters',
                      'Real-time career updates',
                      'Mutual connection insights',
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

                {/* Alternative 8 - Saleshandy */}
                <ArticleSection
                  key="alt-saleshandy"
                  id="alt-saleshandy"
                  title="8. Saleshandy – Best for Cold Email Outreach"
                  showImage={false}
                  intro={[
                    "Best for cold email outreach.",
                    "If cold email is your primary growth channel, Saleshandy deserves a spot on your shortlist. Unlike Apollo, it puts significant emphasis on email deliverability and campaign management while still offering lead-finding capabilities.",
                    "Pros: Better email deliverability, built-in campaign management, lead finder included, simple pricing.",
                    "Cons: More outreach-focused than research-focused.",
                    "For teams sending hundreds of personalized emails every week, that specialization can make a noticeable difference.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email deliverability, campaign management, and lead finding.'],
                    bullets: [
                      'Better email deliverability',
                      'Built-in campaign management',
                      'Lead finder included',
                      'Simple pricing',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Who should choose Saleshandy',
                      paragraphs: ['Saleshandy is best for teams where cold email is the primary growth channel and deliverability is a top priority.'],
                    },
                  ]}
                />

                {/* Comparison Table */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Quick Comparison of Apollo Alternatives
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s a quick summary of the best Apollo alternatives and their primary strengths:</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                {/* 360 Airo vs Apollo */}
                <ArticleSection
                  key="360airo-vs-apollo"
                  id="360airo-vs-apollo"
                  title="360 Airo vs Apollo: Which One Is Better?"
                  showImage={false}
                  intro={[
                    "Both platforms help businesses find prospects, but they approach sales intelligence differently.",
                    "Apollo works well if your priority is accessing a large contact database with built-in outreach tools.",
                    "360 Airo focuses more on helping sales teams understand prospects through AI-assisted research, making personalization faster and lead qualification more efficient.",
                    "For SMBs where every sales conversation counts, that extra context can become a meaningful advantage.",
                  ]}
                  infographic={{
                    title: '360 Airo vs Apollo',
                    paragraphs: ['Apollo = large database + outreach; 360 Airo = AI research + qualification + personalization.'],
                    bullets: [
                      'Apollo: large contact database, built-in outreach tools',
                      '360 Airo: AI-assisted research, faster qualification, better personalization',
                      'For SMBs, 360 Airo provides the context that drives better conversations',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Choose */}
                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="How to Choose the Right Apollo Alternative"
                  showImage={false}
                  intro={[
                    "The optimal solution will depend on what's holding back your sales team at this point.",
                  ]}
                  infographic={{
                    title: 'Decision guide',
                    paragraphs: ['Choose the platform that solves your specific bottleneck.'],
                    bullets: [
                      'Opt for 360 Airo if you want AI-driven prospecting and better personalization',
                      'Opt for ZoomInfo if you require enterprise-grade contact information',
                      'Opt for Clay if automation and enrichment features are important',
                      'Opt for Lusha if price is the deciding factor',
                      'Opt for Cognism if your target is European',
                      'Opt for Lead411 if phone numbers are key for you',
                      'Opt for LinkedIn Sales Navigator if relationship building is the essence of your approach',
                      'Opt for Saleshandy if cold emailing is your most efficient channel',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Solve your bottleneck',
                      paragraphs: ['Rather than going for the solution with the longest list of features, go for the one that solves your bottleneck.'],
                    },
                  ]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    "Apollo.io is still a good sales intelligence tool, but not the only one available today for small businesses.",
                    "Current AI-powered sales tools enable better prospecting, more automation capabilities, enhanced compliance, and more advanced workflows that allow small sales teams to close more business.",
                    "If you are looking only for leads, then Apollo works just fine.",
                    "If you are looking for the right prospects, qualification and reaching out to them in a way that actually produces results, then solutions like 360 Airo offer a much better option.",
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      'For SMBs that want to move beyond lead lists and focus on qualified prospects with AI-powered research, 360 Airo offers a smarter alternative.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    FAQs
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about Apollo.io alternatives for SMBs.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'What is the best Apollo.io alternative for SMBs?',
                          paragraphs: ['360 Airo is one of the best Apollo.io alternatives for SMBs because it combines AI-powered prospect research, company insights, and sales intelligence to help teams find and qualify better leads faster.'],
                        },
                        {
                          subtitle: 'Which Apollo competitor has the most accurate contact database?',
                          paragraphs: ['ZoomInfo is known for its extensive contact database, while Cognism is often preferred for verified mobile numbers and strong coverage in European markets.'],
                        },
                        {
                          subtitle: 'Is 360 Airo better than Apollo?',
                          paragraphs: ['If your priority is AI-driven prospect research and personalized outreach, 360 Airo offers an advantage. Apollo is a better fit for businesses that mainly need a large contact database with built-in outreach tools.'],
                        },
                        {
                          subtitle: 'What are the top Apollo.io competitors in 2026?',
                          paragraphs: ['Some of the leading Apollo competitors include 360 Airo, ZoomInfo, Clay, Lusha, Cognism, Lead411, LinkedIn Sales Navigator, and Saleshandy.'],
                        },
                        {
                          subtitle: 'Which Apollo alternative is best for cold email outreach?',
                          paragraphs: ['Saleshandy is a strong choice for cold email outreach because it focuses on email deliverability, campaign management, and lead generation.'],
                        },
                        {
                          subtitle: 'Which Apollo alternative is best for European businesses?',
                          paragraphs: ['Cognism is one of the best options for European businesses due to its GDPR-compliant data and verified contact information.'],
                        },
                        {
                          subtitle: 'Is there a budget-friendly alternative to Apollo.io?',
                          paragraphs: ['Yes. Lusha and Lead411 are affordable Apollo alternatives that provide verified contact information without the higher cost of enterprise platforms.'],
                        },
                        {
                          subtitle: 'How do I choose the right Apollo alternative?',
                          paragraphs: ['Choose a platform based on your sales goals, whether that\'s AI-powered prospecting, better contact data, cold email automation, or regional coverage for your target market.'],
                        },
                      ]}
                    />
                  </div>
                </section>

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
                  {
                    title: '360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?',
                    tag: 'Listicles',
                    href: '/blogs/360airo-vs-apollo-which-is-better',
                    description: 'Compare 360 Airo and Apollo to find the best fit for your team.',
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