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
  { id: 'why-matters', label: 'Why Sales Intelligence Matters More for SMBs', arrow: true },
  { id: 'what-makes-different', label: 'What Makes 360 Airo Different?', arrow: true },
  { id: 'features', label: 'Features That Actually Help Sales Teams', arrow: true },
  { id: 'supports-journey', label: 'How It Supports the Entire Sales Journey', arrow: true },
  { id: 'benefits', label: 'The Biggest Benefits for Growing Businesses', arrow: true },
  { id: 'why-ai', label: 'Why AI Makes a Difference', arrow: true },
  { id: 'comparison-table', label: 'Traditional Prospecting vs. 360 Airo', arrow: true },
  { id: 'who-gets-value', label: 'Who Gets the Most Value from 360 Airo?', arrow: true },
  { id: 'growth-looks-like', label: 'What Growth Looks Like with Better Sales Intelligence', arrow: true },
  { id: 'why-choosing', label: 'Why More SMBs Are Choosing 360 Airo', arrow: true },
  { id: 'conclusion', label: 'Ready to Build a Stronger Sales Pipeline?', arrow: true },
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
    alt: 'Sales intelligence platform for SMB growth',
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
          SMB Growth Platform
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Discover why 360 Airo is the best sales intelligence platform for SMB growth – verified contacts, AI research, and faster pipeline.
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
          Efficiency is survival for SMBs
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Every hour saved on manual research is an hour spent on selling. The right platform makes that possible.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table ---
function ComparisonTable() {
  const rows = [
    { traditional: 'Manual LinkedIn research', airo: 'AI-powered prospect discovery' },
    { traditional: 'Multiple research tools', airo: 'One organised platform' },
    { traditional: 'Outdated contact lists', airo: 'Verified business contacts' },
    { traditional: 'Spreadsheet-heavy workflows', airo: 'Streamlined lead management' },
    { traditional: 'Generic outreach', airo: 'Better prospect insights' },
    { traditional: 'Slow list building', airo: 'Faster pipeline creation' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Traditional Prospecting</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">360 Airo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Traditional Prospecting">{row.traditional}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="360 Airo">{row.airo}</td>
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
          If you're ready to spend less time searching and more time selling, book a personalised demo and see how 360 Airo can support your next stage of growth.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Book a Demo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogWhy360AiroBestSMBPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/why-360airo-best-sales-intelligence-smb.jpg';

  return (
    <>
      <Head>
        <title>Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth</title>
        <meta
          name="description"
          content="Discover why 360 Airo is the best sales intelligence platform for SMB growth. Learn how verified contacts, AI-powered research, and streamlined workflows drive pipeline."
        />
        <meta
          name="keywords"
          content="sales intelligence platform, SMB growth, 360 Airo, lead generation, prospecting, AI sales tools"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth"
        />
        <meta
          property="og:description"
          content="Discover why 360 Airo is the best sales intelligence platform for SMB growth. Learn how verified contacts, AI-powered research, and streamlined workflows drive pipeline."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth"
        />
        <meta
          name="twitter:description"
          content="Discover why 360 Airo is the best sales intelligence platform for SMB growth. Learn how verified contacts, AI-powered research, and streamlined workflows drive pipeline."
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
                  '@id': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth/#webpage',
                  'url': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth',
                  'name': 'Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth',
                  'description': 'Discover why 360 Airo is the best sales intelligence platform for SMB growth. Learn how verified contacts, AI-powered research, and streamlined workflows drive pipeline.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth/#article',
                  'headline': 'Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth',
                  'description': 'Discover why 360 Airo is the best sales intelligence platform for SMB growth. Learn how verified contacts, AI-powered research, and streamlined workflows drive pipeline.',
                  'url': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth',
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
                    '@id': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence platform',
                    'SMB growth',
                    '360 Airo',
                    'lead generation',
                    'prospecting',
                    'AI sales tools',
                  ],
                  'datePublished': '2026-12-08',
                  'dateModified': '2026-12-08',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth/#breadcrumb',
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
                      'name': 'Why 360 Airo Is Best for SMB Growth',
                      'item': 'https://360airo.com/blogs/why-360airo-best-sales-intelligence-smb-growth',
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
                  <span className="hidden sm:inline">Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth</span>
                  <span className="sm:hidden">360 Airo for SMBs</span>
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
                      alt="Sales intelligence platform for SMB growth"
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
                    Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    For those who have experienced working within small sales teams, the most difficult part wasn't finding leads – it was finding people worth contacting. Discover why 360 Airo is the best sales intelligence platform for SMB growth.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Dec 2026</span>
                    <span>• 9 min read</span>
                    <span>• 1.4K reads</span>
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
                    "For those of you who have experienced working within small sales teams, I bet the most difficult part wasn't to find leads; it was to find people worth contacting.",
                    "One is trying to extract email from LinkedIn. Another one is cleaning the spreadsheet filled with outdated contacts. The third one is using three different tools just to find out who the decision-maker is. By the time lunch comes, hours pass by, but no selling happened at all.",
                    "This is costly for scaling companies.",
                    "What makes the best sales teams to create consistent pipeline is not the number of phone calls made, but the amount of time spent manually rather than speaking with the right prospects.",
                    "And here is where 360 Airo plays its role.",
                    "360 Airo is a sales intelligence platform powered by AI and designed specifically for SMBs who need reliable prospecting data, smarter lead generation and quick pipeline creation.",
                  ]}
                  infographic={{
                    title: 'The SMB sales challenge',
                    paragraphs: ['Small teams spend too much time on manual research – not because they aren\'t working hard, but because they lack reliable sales intelligence.'],
                    bullets: [
                      'Hours wasted on manual research',
                      'Outdated contact information',
                      'Wrong decision-makers contacted',
                      'Generic outreach with low replies',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-matters"
                  id="why-matters"
                  title="Why Sales Intelligence Matters More for SMBs"
                  showImage={true}
                  intro={[
                    "Large enterprises can afford bigger sales teams. Most SMBs can't.",
                    "Every hour a sales rep spends researching contacts instead of speaking to prospects affects revenue. When your team is small, efficiency isn't a bonus. It's survival.",
                    "Some of the most common challenges look familiar:",
                  ]}
                  infographic={{
                    title: 'The cost of incomplete information',
                    paragraphs: ['Small teams lose valuable time to manual research and outdated data.'],
                    bullets: [
                      'Email addresses bounce',
                      'Contact information is outdated',
                      'Decision-makers are hard to identify',
                      'CRM records become messy',
                      'Outreach feels generic because there\'s no context',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The real problem',
                      paragraphs: [
                        'These problems don\'t usually happen because salespeople aren\'t working hard. They happen because they\'re working with incomplete information.',
                        'Sales intelligence fills that gap. Instead of starting from scratch every time, your team gets the context needed to approach prospects with confidence.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-makes-different"
                  id="what-makes-different"
                  title="What Makes 360 Airo Different?"
                  showImage={false}
                  intro={[
                    "There are many platforms offering millions of contacts but the thing is that even with such platforms you spend half of your time checking the data and putting things together.",
                    "360 Airo does differently.",
                    "This platform brings together prospecting, business contact verification, lead enrichment, and AI-driven workflows, making your team less time to spend on research and more on sales.",
                    "It matters especially for SMBs because there is no need for them to adopt another complex system which will take weeks to master.",
                  ]}
                  infographic={{
                    title: 'The 360 Airo difference',
                    paragraphs: ['One platform for prospecting, verification, enrichment, and AI workflows – designed for SMBs.'],
                    bullets: [
                      'Prospecting and contact verification',
                      'Lead enrichment',
                      'AI-driven workflows',
                      'Simple, not complex',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="features"
                  id="features"
                  title="Features That Actually Help Sales Teams"
                  showImage={false}
                  intro={[
                    "Find the right prospects faster: Building a prospect list shouldn't feel like detective work. With 360 Airo, you can narrow your search using filters like industry, company size, revenue, job title, location, and growth stage. Instead of scrolling endlessly through profiles, you can focus on companies that actually match your ideal customer.",
                    "Work with verified contact data: Nothing kills momentum like bounced emails. 360 Airo helps reduce that problem by providing verified business contact information, including work emails, phone numbers, and company details. That means fewer dead ends and more chances to start real conversations.",
                    "Get context before reaching out: A name and email address rarely tell the full story. Lead enrichment adds useful business information that helps you personalise outreach without spending another fifteen minutes researching every company. Depending on the prospect, you can quickly understand things like company size, revenue range, industry, website details, and business background. The result is outreach that sounds informed instead of copied and pasted.",
                    "Focus on leads that matter most: Not every lead deserves equal attention. Some companies are a much stronger fit than others. 360 Airo helps organise prospects so sales teams can prioritise better opportunities instead of treating every contact the same way. For smaller teams, that kind of focus can make a noticeable difference.",
                    "Keep your workflow organised: Prospecting gets messy when information lives across spreadsheets, browser tabs, and different sales tools. Keeping everything in one place makes it easier to stay organised, maintain cleaner records, and keep momentum throughout the sales process.",
                  ]}
                  infographic={{
                    title: '5 features that drive results',
                    paragraphs: ['From filtering to verified data to workflow organisation – these features save time and improve outreach.'],
                    bullets: [
                      'Find prospects faster – filter by industry, size, revenue, role, location',
                      'Verified contact data – reduce bounced emails',
                      'Lead enrichment – get context before reaching out',
                      'Prioritise better opportunities – focus on the best leads',
                      'Keep workflow organised – one place for all prospecting data',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="supports-journey"
                  id="supports-journey"
                  title="How It Supports the Entire Sales Journey"
                  showImage={false}
                  intro={[
                    "Sales intelligence isn't useful only at the beginning of the funnel. It creates value throughout the process.",
                    "At the top of the funnel: This is where you're discovering new opportunities. 360 Airo helps you find new accounts, identify decision-makers, build targeted prospect lists, and expand into new markets.",
                    "During outreach: Once conversations begin, context becomes everything. Better prospect data makes it easier to write personalised emails, prepare for calls, and avoid sending generic messages that get ignored.",
                    "As deals progress: The closer a deal gets to closing, the more useful company insights become. Knowing more about the business helps sales reps have stronger conversations with stakeholders and stay prepared throughout the buying process.",
                  ]}
                  infographic={{
                    title: 'Value at every stage',
                    paragraphs: ['From discovery to closing – 360 Airo supports the entire sales journey.'],
                    bullets: [
                      'Top of funnel: find accounts, identify decision-makers, build lists',
                      'During outreach: better data for personalized emails and calls',
                      'As deals progress: company insights for stronger conversations',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="benefits"
                  id="benefits"
                  title="The Biggest Benefits for Growing Businesses"
                  showImage={false}
                  intro={[
                    "The biggest advantage isn't one feature. It's what happens when small improvements add up every single day.",
                    "Your team gets more selling time: Less research means more conversations.",
                    "Lead quality improves: Targeted prospecting usually produces stronger opportunities than broad outreach.",
                    "Personalisation becomes easier: Better context helps emails feel relevant instead of templated.",
                    "Pipeline grows more consistently: More qualified conversations naturally create more opportunities.",
                    "Data stays cleaner: Accurate information makes your sales process easier to manage over time.",
                  ]}
                  infographic={{
                    title: '5 cumulative benefits',
                    paragraphs: ['Small improvements add up to meaningful advantages for SMBs.'],
                    bullets: [
                      'More selling time – less research, more conversations',
                      'Better lead quality – targeted prospecting, stronger opportunities',
                      'Easier personalisation – context helps emails feel relevant',
                      'Consistent pipeline growth – more qualified conversations',
                      'Cleaner data – accurate information over time',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-ai"
                  id="why-ai"
                  title="Why AI Makes a Difference"
                  showImage={false}
                  intro={[
                    "AI works best when it removes repetitive work. Sales reps shouldn't spend hours copying information between tools or manually researching every company.",
                    "360 Airo uses AI to simplify tasks like prospect discovery, contact enrichment, lead organisation, and workflow management.",
                    "That gives sales teams more time to focus on what humans do best: building relationships and closing deals.",
                  ]}
                  infographic={{
                    title: 'AI removes friction',
                    paragraphs: ['Let AI handle repetitive work so your team can focus on relationships.'],
                    bullets: [
                      'Prospect discovery',
                      'Contact enrichment',
                      'Lead organisation',
                      'Workflow management',
                      'More time for relationships and closing',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Comparison Table */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Traditional Prospecting vs. 360 Airo
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The difference becomes even clearer as your sales team grows.</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                <ArticleSection
                  key="who-gets-value"
                  id="who-gets-value"
                  title="Who Gets the Most Value from 360 Airo?"
                  showImage={false}
                  intro={[
                    "360 Airo is designed for businesses that rely on outbound sales and relationship building.",
                    "It's especially useful for:",
                  ]}
                  infographic={{
                    title: 'Ideal users',
                    paragraphs: ['B2B SaaS, agencies, consultancies, and growing sales teams benefit most.'],
                    bullets: [
                      'B2B SaaS companies',
                      'Marketing agencies',
                      'IT service providers',
                      'Consulting firms',
                      'Recruiters',
                      'Sales development teams',
                      'Startup founders',
                      'Growing SMB sales organisations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'When sales intelligence becomes strategic',
                      paragraphs: [
                        'If your business depends on reaching decision-makers quickly, sales intelligence becomes much more than a convenience. It becomes part of your growth strategy.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="growth-looks-like"
                  id="growth-looks-like"
                  title="What Growth Looks Like with Better Sales Intelligence"
                  showImage={false}
                  intro={[
                    "Imagine two sales reps. Both start work at nine. The first spends three hours searching for contacts, checking emails, and updating spreadsheets. The second already has verified prospects, company insights, and organised lead lists waiting.",
                    "By the end of the day, they've both worked equally hard. One simply spent more time selling.",
                    "That's how better systems quietly change results. The hours saved each week turn into more conversations, more meetings, and a healthier pipeline over time.",
                  ]}
                  infographic={{
                    title: 'The compounding advantage',
                    paragraphs: ['Small daily time savings compound into significant pipeline growth over time.'],
                    bullets: [
                      'More conversations per week',
                      'More meetings booked',
                      'Healthier pipeline over time',
                      'Better systems drive better results',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-choosing"
                  id="why-choosing"
                  title="Why More SMBs Are Choosing 360 Airo"
                  showImage={false}
                  intro={[
                    "Growing businesses don't need more complexity. They need tools that remove friction.",
                    "360 Airo brings together AI-powered sales intelligence, verified B2B contacts, lead enrichment, and smarter prospect discovery in a way that feels practical instead of overwhelming.",
                    "It helps small sales teams work like much larger ones without adding unnecessary manual work.",
                    "And when every sales hour counts, that's exactly the kind of advantage that matters.",
                  ]}
                  infographic={{
                    title: 'Practical advantage',
                    paragraphs: ['360 Airo removes friction so small teams can work like much larger ones.'],
                    bullets: [
                      'AI-powered sales intelligence',
                      'Verified B2B contacts',
                      'Lead enrichment',
                      'Smarter prospect discovery',
                      'No unnecessary manual work',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Ready to Build a Stronger Sales Pipeline?"
                  showImage={false}
                  intro={[
                    "The best sales intelligence platform isn't the one with the biggest database. It's the one your team actually uses because it saves time, improves outreach, and helps create more qualified conversations.",
                    "360 Airo gives SMBs a faster, smarter way to find the right prospects and turn them into real opportunities.",
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      '360 Airo gives SMBs a faster, smarter way to find the right prospects and turn them into real opportunities.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about 360 Airo and sales intelligence for SMBs.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Why is 360 Airo a good choice for SMBs?',
                          paragraphs: ['It helps sales professionals of smaller sizes to discover verified leads faster, reduce manual research and spend more time on productive conversations.'],
                        },
                        {
                          subtitle: 'What is unique about 360 Airo comparing to the basic lead database?',
                          paragraphs: ['Unlike traditional databases that only provide you with contacts, 360 Airo unites prospecting, verified data, lead enrichment and automated workflows in one platform.'],
                        },
                        {
                          subtitle: 'Can 360 Airo help boost sales productivity?',
                          paragraphs: ['Sure. By saving time on researching and organizing your prospects, you can spend more time on reaching out and talking to customers.'],
                        },
                        {
                          subtitle: 'Can startups benefit from using 360 Airo?',
                          paragraphs: ['Of course. Startups will be able to identify decision makers and generate qualified leads to develop their own outbound sales process.'],
                        },
                        {
                          subtitle: 'What is the advantage of lead enrichment?',
                          paragraphs: ['Lead enrichment helps to add valuable business context to the outreach, which increases its relevance and personalization.'],
                        },
                        {
                          subtitle: 'Does 360 Airo provide you with verified business contacts?',
                          paragraphs: ['Yes, this tool concentrates on verified business contacts in order to minimize email bounces.'],
                        },
                        {
                          subtitle: 'What types of businesses can use 360 Airo?',
                          paragraphs: ['B2B SaaS businesses, agencies, consultancies, IT, recruitment and outbound sales businesses can get sales intelligence.'],
                        },
                        {
                          subtitle: 'How does AI help in the sales process?',
                          paragraphs: ['AI takes all routine work such as research and organizing leads off your shoulders, so you can communicate with prospects.'],
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
                    title: 'Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo',
                    tag: 'Listicles',
                    href: '/blogs/customer-success-story-smb-pipeline-growth',
                    description: 'Read real customer success stories of SMBs that increased their pipeline with 360 Airo.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026',
                    tag: 'Listicles',
                    href: '/blogs/zoominfo-alternatives-small-businesses-2026',
                    description: 'Compare the top 8 ZoomInfo alternatives for small businesses in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster',
                    tag: 'Listicles',
                    href: '/blogs/best-apollo-alternatives-smb-2026',
                    description: 'Compare the top 8 Apollo.io alternatives for SMBs in 2026.',
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