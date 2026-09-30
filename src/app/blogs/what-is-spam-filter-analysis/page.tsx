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
  { id: 'what-is-spam-filter-analysis', label: '1. What Is Spam Filter Analysis?', arrow: true },
  { id: 'why-spam-filter-matters', label: '2. Why Spam Filter Analysis Matters', arrow: true },
  { id: 'how-spam-filter-works', label: '3. How Spam Filter Analysis Works', arrow: true },
  { id: 'what-does-analysis-check', label: '4. What Does a Spam Filter Analysis Check?', arrow: true },
  { id: 'common-failure-reasons', label: '5. Common Reasons Emails Fail Spam Filter Analysis', arrow: true },
  { id: 'how-to-improve-score', label: '6. How to Improve Your Spam Filter Analysis Score', arrow: true },
  { id: 'best-tools', label: '7. Best Spam Filter Analysis Tools', arrow: true },
  { id: 'conclusion', label: '8. Conclusion', arrow: true },
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
    alt: 'Spam filter analysis',
    label: 'Deliverability',
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
          Deliverability Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Improve inbox placement with proper authentication, sender reputation, and pre‑send analysis.
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
          Test before you send
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Run every campaign through a spam filter analysis tool to identify issues before your emails reach the inbox.
        </p>
      </div>
    </aside>
  );
}

// --- Common Failure Reasons Table ---
function CommonFailureReasonsTable() {
  const rows = [
    { reason: 'Missing SPF, DKIM, or DMARC records' },
    { reason: 'Poor sender reputation' },
    { reason: 'Sending from a new domain' },
    { reason: 'Blacklisted IP addresses' },
    { reason: 'Excessive promotional language' },
    { reason: 'Too many hyperlinks' },
    { reason: 'Image-heavy emails' },
    { reason: 'Broken HTML formatting' },
    { reason: 'High bounce rates' },
    { reason: 'Low recipient engagement' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Common Failure Reasons</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Common Failure Reasons">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Tools Table ---
function ToolsTable() {
  const rows = [
    { tool: 'Mail Tester' },
    { tool: 'GlockApps' },
    { tool: 'SpamAssassin' },
    { tool: 'Google Postmaster Tools' },
    { tool: 'Microsoft SNDS' },
    { tool: 'MXToolbox' },
    { tool: 'Validity Everest' },
    { tool: 'Litmus' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Popular Spam Filter Analysis Tools</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Popular Spam Filter Analysis Tools">{row.tool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogSpamFilterAnalysisPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/spam-filter-analysis.jpg';

  return (
    <>
      <Head>
        <title>What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability</title>
        <meta
          name="description"
          content="Learn what spam filter analysis is, how it works, and why it's critical for email deliverability. Discover how to improve inbox placement and protect your sender reputation."
        />
        <meta
          name="keywords"
          content="spam filter analysis, email deliverability, spam filter, inbox placement, sender reputation, SPF DKIM DMARC, email authentication"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/what-is-spam-filter-analysis"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability"
        />
        <meta
          property="og:description"
          content="Learn what spam filter analysis is, how it works, and why it's critical for email deliverability. Discover how to improve inbox placement and protect your sender reputation."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/what-is-spam-filter-analysis"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability"
        />
        <meta
          name="twitter:description"
          content="Learn what spam filter analysis is, how it works, and why it's critical for email deliverability."
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
                  '@id': 'https://360airo.com/blogs/what-is-spam-filter-analysis/#webpage',
                  'url': 'https://360airo.com/blogs/what-is-spam-filter-analysis',
                  'name': 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
                  'description': 'Learn what spam filter analysis is, how it works, and why it\'s critical for email deliverability. Discover how to improve inbox placement and protect your sender reputation.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/what-is-spam-filter-analysis/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/what-is-spam-filter-analysis/#article',
                  'headline': 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
                  'description': 'Learn what spam filter analysis is, how it works, and why it\'s critical for email deliverability.',
                  'url': 'https://360airo.com/blogs/what-is-spam-filter-analysis',
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
                    '@id': 'https://360airo.com/blogs/what-is-spam-filter-analysis/#webpage',
                  },
                  'articleSection': 'Email Deliverability',
                  'keywords': [
                    'spam filter analysis',
                    'email deliverability',
                    'spam filter',
                    'inbox placement',
                    'sender reputation',
                    'SPF DKIM DMARC',
                    'email authentication',
                  ],
                  'datePublished': '2026-10-01',
                  'dateModified': '2026-10-01',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/what-is-spam-filter-analysis/#breadcrumb',
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
                      'name': 'What Is Spam Filter Analysis?',
                      'item': 'https://360airo.com/blogs/what-is-spam-filter-analysis',
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
              padding: 10px 16px;
              border: none;
              border-bottom: 1px solid #ebf0f8;
              font-size: 14px;
              gap: 16px;
              background: transparent;
              border-radius: 0;
            }
            td::before {
              content: attr(data-label);
              font-weight: 600;
              color: #111827;
              flex-shrink: 0;
              min-width: 100px;
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
                <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Deliverability
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability</span>
                  <span className="sm:hidden">Spam Filter Analysis</span>
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
                      alt="Spam filter analysis hero"
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
                    Email Deliverability
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Before your email reaches a recipient's inbox, it must pass through multiple spam filters. Learn how spam filter analysis helps you identify issues before sending and maximize inbox placement.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 9 min read</span>
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
                    "Email marketing and cold outreach remain among the most effective ways to generate leads, nurture prospects, and drive conversions. However, before your email reaches a recipient's inbox, it must pass through multiple spam filters designed to identify unwanted, suspicious, or potentially harmful messages.",
                    "This is where spam filter analysis plays a critical role.",
                    "Spam filter analysis is the process of evaluating an email before it is sent to determine whether it's likely to reach the inbox, land in the Promotions tab, or be filtered into the spam folder. By analyzing technical configurations, email content, sender reputation, authentication records, and engagement signals, businesses can identify potential deliverability issues before launching a campaign.",
                    "Whether you're sending marketing newsletters, outbound sales emails, or customer communications, spam filter analysis helps improve inbox placement, protect your domain reputation, and maximize campaign performance.",
                  ]}
                  infographic={{
                    title: 'What is spam filter analysis?',
                    paragraphs: ['A pre‑send evaluation that assesses how mailbox providers like Gmail, Outlook, and Yahoo Mail are likely to classify your email.'],
                    bullets: [
                      'Evaluates sender reputation, authentication, content, and engagement',
                      'Identifies issues before they impact campaign performance',
                      'Helps improve inbox placement and sender reputation',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-spam-filter-analysis"
                  id="what-is-spam-filter-analysis"
                  title="1. What Is Spam Filter Analysis?"
                  showImage={false}
                  intro={[
                    "Spam filter analysis is a pre-send evaluation that assesses how mailbox providers such as Gmail, Outlook, Yahoo Mail, and Apple Mail are likely to classify your email.",
                    "Instead of relying on guesswork, businesses use spam filter analysis to identify technical or content-related issues that could prevent emails from reaching recipients' inboxes.",
                    "A comprehensive spam filter analysis evaluates several factors, including sender reputation, domain authentication, email content, HTML formatting, subject lines, links and attachments, blacklist status, and recipient engagement.",
                    "The primary objective is to improve email deliverability while reducing the likelihood of spam filtering.",
                  ]}
                  infographic={{
                    title: 'Key factors analyzed',
                    paragraphs: ['Spam filter analysis evaluates multiple technical and content signals.'],
                    bullets: [
                      'Sender reputation',
                      'Domain authentication (SPF, DKIM, DMARC)',
                      'Email content and formatting',
                      'Subject lines and preview text',
                      'Links and attachments',
                      'Blacklist status',
                      'Recipient engagement signals',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-spam-filter-matters"
                  id="why-spam-filter-matters"
                  title="2. Why Spam Filter Analysis Matters"
                  showImage={true}
                  intro={[
                    "Many businesses assume poor email performance is caused by weak copywriting or ineffective targeting. While those factors certainly influence campaign results, they matter very little if your emails never reach the inbox.",
                    "Spam filter analysis allows businesses to identify problems before they impact campaign performance.",
                    "The benefits include higher inbox placement, better open rates, increased reply rates, improved sender reputation, lower spam complaints, and higher email marketing ROI.",
                    "For outbound sales teams, improving deliverability by even a few percentage points can translate into significantly more conversations and qualified opportunities.",
                  ]}
                  infographic={{
                    title: 'Benefits of spam filter analysis',
                    paragraphs: ['Identifying issues before sending protects your sender reputation and campaign performance.'],
                    bullets: [
                      'Higher inbox placement',
                      'Better open rates',
                      'Increased reply rates',
                      'Improved sender reputation',
                      'Lower spam complaints',
                      'Higher email marketing ROI',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-spam-filter-works"
                  id="how-spam-filter-works"
                  title="3. How Spam Filter Analysis Works"
                  showImage={false}
                  intro={[
                    "Modern spam filters don't rely on a single spam score. Instead, they analyze hundreds of technical, behavioral, and content-related signals before deciding whether an email belongs in the inbox.",
                  ]}
                  infographic={{
                    title: 'How spam filters evaluate emails',
                    paragraphs: ['Spam filters analyze sender reputation, authentication, content, and engagement signals.'],
                    bullets: [
                      'Sender Reputation – based on spam complaints, bounce rates, sending consistency, and historical engagement',
                      'Email Authentication – validates SPF, DKIM, and DMARC records',
                      'Email Content – evaluates subject lines, HTML formatting, links, and overall readability',
                      'Recipient Engagement – measures opens, replies, clicks, and spam complaints',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Analyze Sender Reputation',
                      paragraphs: ['Sender reputation is one of the strongest indicators of email deliverability. Mailbox providers assign reputation scores to both your sending domain and IP address based on previous sending behavior. Factors affecting sender reputation include spam complaints, hard bounce rates, sending consistency, historical engagement, and domain age. A healthy sender reputation increases inbox placement, while poor reputation causes future emails to be filtered more aggressively.'],
                    },
                    {
                      subtitle: 'Verify Email Authentication',
                      paragraphs: ['Authentication proves that emails genuinely originate from your domain. Spam filter analysis validates three essential protocols: SPF (Sender Policy Framework) determines which mail servers are authorized to send emails from your domain. DKIM (DomainKeys Identified Mail) adds a digital signature that verifies email integrity. DMARC (Domain-based Message Authentication, Reporting & Conformance) builds upon SPF and DKIM by telling mailbox providers how to handle emails that fail authentication. Proper authentication improves trust while reducing spoofing and phishing risks.'],
                    },
                    {
                      subtitle: 'Evaluate Email Content',
                      paragraphs: ['Spam filters also analyze the content and structure of every email. Common evaluation factors include subject line quality, promotional language, HTML formatting, text-to-image ratio, link quality, attachments, grammar, and readability. Contrary to popular belief, modern spam filters don\'t simply flag emails containing certain "spam words." Instead, they evaluate whether the overall email appears trustworthy, relevant, and valuable.'],
                    },
                    {
                      subtitle: 'Measure Recipient Engagement',
                      paragraphs: ['Mailbox providers continuously learn from recipient behavior. Positive engagement signals include email opens, replies, link clicks, marking emails as "Not Spam," and moving emails to the Primary inbox. Negative engagement includes spam complaints, immediate deletion, ignoring multiple campaigns, and unsubscribes. Strong engagement improves future inbox placement, while negative engagement gradually reduces deliverability.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-does-analysis-check"
                  id="what-does-analysis-check"
                  title="4. What Does a Spam Filter Analysis Check?"
                  showImage={false}
                  intro={[
                    "A comprehensive spam filter analysis examines multiple components of an email campaign before it is sent.",
                  ]}
                  infographic={{
                    title: 'What gets checked',
                    paragraphs: ['A thorough analysis covers technical, content, and delivery factors.'],
                    bullets: [
                      'Domain reputation – blacklist status, DNS configuration, historical performance',
                      'Authentication records – SPF, DKIM, and DMARC validation',
                      'Email content and formatting – subject lines, preview text, personalization, HTML quality, images, links, and CTAs',
                      'Deliverability risks – simulated inbox placement across Gmail, Outlook, Yahoo Mail, and other providers',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="common-failure-reasons"
                  id="common-failure-reasons"
                  title="5. Common Reasons Emails Fail Spam Filter Analysis"
                  showImage={false}
                  intro={[
                    "Several issues frequently cause emails to be filtered as spam.",
                    "Identifying these problems before sending protects your sender reputation and improves campaign performance.",
                  ]}
                  infographic={{
                    title: 'Top failure reasons',
                    paragraphs: ['Avoid these common pitfalls to protect your deliverability.'],
                  }}
                  blocks={[]}
                />

                {/* Common Failure Reasons Table */}
                <CommonFailureReasonsTable />

                <ArticleSection
                  key="how-to-improve-score"
                  id="how-to-improve-score"
                  title="6. How to Improve Your Spam Filter Analysis Score"
                  showImage={true}
                  intro={[
                    "Improving your spam score requires both technical optimization and high-quality email practices.",
                  ]}
                  infographic={{
                    title: 'Improvement strategies',
                    paragraphs: ['Focus on authentication, list hygiene, and meaningful personalization.'],
                    bullets: [
                      'Authenticate your domain – configure SPF, DKIM, and DMARC',
                      'Warm up new domains – increase volume gradually over time',
                      'Focus on meaningful personalization – reference specific business insights, not just first names',
                      'Maintain a clean email list – remove invalid addresses and inactive contacts regularly',
                      'Test emails before sending – run every campaign through a spam filter analysis tool',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Test before you send',
                      paragraphs: ['Run every campaign through a spam filter analysis tool to identify technical or content-related issues before your emails reach recipients. This single step can save your domain reputation and significantly improve campaign performance.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="best-tools"
                  id="best-tools"
                  title="7. Best Spam Filter Analysis Tools"
                  showImage={false}
                  intro={[
                    "Several tools help businesses evaluate email deliverability before launching campaigns.",
                    "These platforms analyze authentication records, spam scores, inbox placement, blacklist status, and sender reputation, helping businesses optimize campaigns before sending.",
                  ]}
                  infographic={{
                    title: 'Popular tools',
                    paragraphs: ['Choose the right tools to monitor and improve your deliverability.'],
                  }}
                  blocks={[]}
                />

                {/* Tools Table */}
                <ToolsTable />

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="8. Conclusion"
                  showImage={false}
                  intro={[
                    "Spam filter analysis has become an essential part of modern email marketing and outbound sales. As mailbox providers continue to strengthen their filtering algorithms, businesses can no longer rely solely on compelling copy or attractive offers to achieve strong campaign performance.",
                    "By regularly analyzing your emails, authenticating your domains, maintaining a healthy sender reputation, and following deliverability best practices, you significantly improve your chances of reaching the inbox instead of the spam folder.",
                    "Ultimately, spam filter analysis isn't just about avoiding spam filters—it's about maximizing the visibility, effectiveness, and return on every email you send.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams optimize deliverability with AI-powered prospect research, email verification, domain authentication monitoring, and campaign analytics in one platform.',
                      'Whether you\'re sending cold emails or scaling outbound marketing, 360Airo helps you reach the inbox, generate more conversations, and build predictable pipeline with confidence.',
                    ],
                  }}
                  blocks={[]}
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
                    title: 'What Is Cold Email? A Beginner\'s Guide to B2B Cold Outreach',
                    tag: 'Cold Email',
                    href: '/blogs/what-is-cold-email-beginners-guide',
                    description: 'Learn what cold email is, how it differs from spam, and why it remains one of the most effective B2B sales channels.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Top 15 Mistakes That Kill Outbound Email Campaign Performance',
                    tag: 'Outbound',
                    href: '/blogs/top-15-mistakes-outbound-email',
                    description: 'Avoid common pitfalls that hurt deliverability and reply rates.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How to Improve Cold Email Reply Rates: 7 Proven Strategies',
                    tag: 'Cold Email',
                    href: '/blogs/how-to-improve-cold-email-reply-rates',
                    description: 'Learn 7 proven strategies to turn more opens into meaningful conversations.',
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