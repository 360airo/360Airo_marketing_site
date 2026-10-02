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
  { id: 'outbound-success-starts', label: '1. Outbound Success Starts Long Before You Send the First Email', arrow: true },
  { id: 'why-sales-teams-choose', label: '2. Why Sales Teams Choose 360Airo', arrow: true },
  { id: 'what-makes-different', label: '3. What Makes 360Airo Different?', arrow: true },
  { id: 'comparison-table', label: '4. More Than an Email Campaign Tool', arrow: true },
  { id: 'testimonials', label: '5. Trusted by Modern Revenue Teams', arrow: true },
  { id: 'faqs', label: '6. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: 'Everything Outbound. One Platform.', arrow: true },
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
    alt: 'Outbound email campaign platform',
    label: 'Outbound Platform',
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
          Outbound All-in-One
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Prospect, personalize, automate, and analyze – all from a single platform. No more juggling tools.
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
          One platform &gt; five tools
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Switching between prospecting, email, LinkedIn, and analytics kills productivity. A unified platform keeps your team focused.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component ---
function ComparisonTable() {
  const rows = [
    { capability: 'Prospect Database', traditional: '❌', airo: '✅' },
    { capability: 'AI Personalization', traditional: 'Limited', airo: '✅' },
    { capability: 'Email Automation', traditional: '✅', airo: '✅' },
    { capability: 'LinkedIn & SMS Outreach', traditional: 'Limited', airo: '✅' },
    { capability: 'Deliverability Monitoring', traditional: '❌', airo: '✅' },
    { capability: 'Campaign Analytics', traditional: 'Basic', airo: '✅' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Capability</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Traditional Tools</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">360Airo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Capability">{row.capability}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Traditional Tools">{row.traditional}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668] font-semibold text-[#0b5ca8]" data-label="360Airo">{row.airo}</td>
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
          Ready to replace your fragmented sales stack with one platform?<br />
          <span className="font-semibold">Start your free trial</span> or book a personalized demo today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
            </motion.button>
          </Link>
          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              Book a Demo →
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogWhy360AiroBestOutboundPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/why-360airo-best-outbound-platform.jpg';

  return (
    <>
      <Head>
        <title>Why 360Airo Is the Best Outbound Email Campaign Platform</title>
        <meta
          name="description"
          content="Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, automation, deliverability, and analytics in one unified workspace."
        />
        <meta
          name="keywords"
          content="outbound email platform, best outbound tool, email campaign software, AI personalization, multichannel outreach, sales automation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Why 360Airo Is the Best Outbound Email Campaign Platform"
        />
        <meta
          property="og:description"
          content="Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, automation, deliverability, and analytics in one unified workspace."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Why 360Airo Is the Best Outbound Email Campaign Platform"
        />
        <meta
          name="twitter:description"
          content="Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, automation, deliverability, and analytics in one unified workspace."
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
                  '@id': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform/#webpage',
                  'url': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform',
                  'name': 'Why 360Airo Is the Best Outbound Email Campaign Platform',
                  'description': 'Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, automation, deliverability, and analytics in one unified workspace.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform/#article',
                  'headline': 'Why 360Airo Is the Best Outbound Email Campaign Platform',
                  'description': 'Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, automation, deliverability, and analytics in one unified workspace.',
                  'url': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform',
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
                    '@id': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform/#webpage',
                  },
                  'articleSection': 'Outbound Platform',
                  'keywords': [
                    'outbound email platform',
                    'best outbound tool',
                    'email campaign software',
                    'AI personalization',
                    'multichannel outreach',
                    'sales automation',
                  ],
                  'datePublished': '2026-10-10',
                  'dateModified': '2026-10-10',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform/#breadcrumb',
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
                      'name': 'Why 360Airo Is the Best Outbound Email Campaign Platform',
                      'item': 'https://360airo.com/blogs/why-360airo-is-best-outbound-email-platform',
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
                <Link href="/blogs?category=outbound" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Outbound
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Why 360Airo Is the Best Outbound Email Campaign Platform</span>
                  <span className="sm:hidden">Best Outbound Platform</span>
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
                      alt="Best outbound email campaign platform"
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
                    Outbound Platform
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Why 360Airo Is the Best Outbound Email Campaign Platform
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Everything you need to run high‑performing outbound email campaigns – from prospect discovery and AI personalization to automation, deliverability, and analytics – all in one platform.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 6 min read</span>
                    <span>• 2.1K reads</span>
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
                    "Running successful outbound campaigns takes more than sending emails. You need the right prospects, relevant messaging, reliable deliverability, timely follow-ups, and clear performance insights.",
                    "360Airo brings every stage of outbound together, helping sales teams launch better campaigns, generate more conversations, and build predictable pipeline from one platform.",
                  ]}
                  infographic={{
                    title: 'One platform for every stage',
                    paragraphs: ['Prospecting, personalization, automation, deliverability, and analytics – all connected.'],
                    bullets: [
                      'Verified prospect discovery',
                      'AI‑powered email personalization',
                      'Automated follow‑up sequences',
                      'Campaign performance analytics',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="outbound-success-starts"
                  id="outbound-success-starts"
                  title="1. Outbound Success Starts Long Before You Send the First Email"
                  showImage={true}
                  intro={[
                    "The best campaigns don't begin with writing copy.",
                    "They begin with finding the right prospects, understanding who you're reaching out to, and building a strategy that gives every email a better chance of generating a reply.",
                    "360Airo combines every essential part of the outbound process into one platform, helping your team move from planning to execution without relying on multiple disconnected tools.",
                  ]}
                  infographic={{
                    title: 'The complete outbound workflow',
                    paragraphs: ['From prospect discovery to analytics – all in one place.'],
                    bullets: [
                      'Verified Prospect Discovery – build targeted lists using verified B2B contact data',
                      'AI‑Powered Email Personalization – generate relevant, context‑aware emails for every prospect',
                      'Automated Follow‑up Sequences – multi‑step sequences that run automatically',
                      'Campaign Performance Analytics – track opens, replies, meetings, and more',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-sales-teams-choose"
                  id="why-sales-teams-choose"
                  title="2. Why Sales Teams Choose 360Airo"
                  showImage={false}
                  intro={[
                    "Sales teams across industries choose 360Airo because it simplifies outbound without sacrificing effectiveness.",
                  ]}
                  infographic={{
                    title: 'Why teams love 360Airo',
                    paragraphs: ['A unified workflow that replaces multiple tools and boosts productivity.'],
                    bullets: [
                      'Everything Works Together – prospecting, personalization, execution, and reporting in one place',
                      'Built for Scale – maintain quality while increasing volume from hundreds to thousands of emails',
                      'AI That Supports Your Team – accelerates research and content creation while you stay in control',
                      'Insights That Help You Improve – every campaign produces data to optimize future outreach',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-makes-different"
                  id="what-makes-different"
                  title="3. What Makes 360Airo Different?"
                  showImage={true}
                  intro={[
                    "While many tools offer a single piece of the outbound puzzle, 360Airo delivers the complete picture.",
                  ]}
                  infographic={{
                    title: 'The 360Airo difference',
                    paragraphs: ['Six key capabilities that set 360Airo apart from fragmented solutions.'],
                    bullets: [
                      'Prospect Discovery – find qualified prospects without relying on separate data providers',
                      'AI Personalization – create relevant emails at scale while maintaining quality',
                      'Multi‑Channel Campaigns – coordinate Email, LinkedIn, and SMS through one platform',
                      'Deliverability Monitoring – protect sender reputation and improve inbox placement',
                      'Campaign Intelligence – track every stage from opens to meetings booked',
                      'One Platform Instead of Five – replace multiple point solutions with one connected workspace',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Comparison Table Section */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    4. More Than an Email Campaign Tool
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>360Airo goes beyond simple email automation. Here&apos;s how it compares to traditional outbound tools:</p>
                    </div>

                    <ComparisonTable />

                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>With 360Airo, you get a complete outbound workspace – not just another email sender.</p>
                    </div>
                  </div>
                </section>

                <ArticleSection
                  key="testimonials"
                  id="testimonials"
                  title="5. Trusted by Modern Revenue Teams"
                  showImage={false}
                  intro={[
                    "Revenue teams choose 360Airo to replace multiple tools, increase reply rates, scale campaigns, and improve productivity.",
                  ]}
                  infographic={{
                    title: 'What teams are saying',
                    paragraphs: ['Real results from modern revenue teams using 360Airo.'],
                    bullets: [
                      'Replaced 5 separate outbound tools with one platform',
                      'Increased reply rates by 45% within 30 days',
                      'Scaled campaigns from 500 to 5,000 emails per week',
                      'Saved 10+ hours per week on manual prospecting and follow‑ups',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    6. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about 360Airo and its outbound capabilities.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Why is 360Airo different from other outbound platforms?',
                          paragraphs: ['360Airo combines prospect discovery, AI personalization, multichannel outreach, deliverability monitoring, and analytics into one unified platform – eliminating the need for multiple point solutions.'],
                        },
                        {
                          subtitle: 'Can I personalize every email with AI?',
                          paragraphs: ['Yes. 360Airo uses AI to analyze prospect and company data, generating context‑aware, personalized messages at scale – without sacrificing quality.'],
                        },
                        {
                          subtitle: 'Does it support automated follow-ups?',
                          paragraphs: ['Absolutely. You can build multi‑step email sequences that run automatically, ensuring consistent follow‑up without manual effort.'],
                        },
                        {
                          subtitle: 'Can I run multi-channel campaigns?',
                          paragraphs: ['Yes. 360Airo supports Email, LinkedIn, and SMS outreach from a single platform, with coordinated sequences that adapt based on prospect engagement.'],
                        },
                        {
                          subtitle: 'Does it integrate with my CRM?',
                          paragraphs: ['360Airo integrates seamlessly with major CRM platforms, enabling smooth data flow between your outbound campaigns and sales pipeline.'],
                        },
                        {
                          subtitle: 'Is it suitable for growing sales teams?',
                          paragraphs: ['Yes. 360Airo is built to scale – from small teams sending hundreds of emails to enterprise organizations managing thousands of campaigns.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Everything Outbound. One Platform."
                  showImage={false}
                  intro={[
                    "The best outbound campaigns aren't built with more tools—they're built with better workflows.",
                    "With 360Airo, your team can discover prospects, personalize every email, automate outreach, monitor campaign performance, and build predictable pipeline without managing a fragmented sales stack.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'From prospect discovery to revenue intelligence, 360Airo gives modern revenue teams everything they need to run high‑performing outbound campaigns from a single, connected platform.',
                      'Whether you\'re launching your first campaign or scaling enterprise outbound, 360Airo helps you reach the right buyers, start more conversations, and build pipeline predictably.',
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
                    title: 'Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing',
                    tag: 'Enterprise',
                    href: '/blogs/why-fortune-100-companies-choose-360airo',
                    description: 'Discover why leading enterprises trust 360Airo for AI‑powered outbound marketing.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
                    tag: 'Deliverability',
                    href: '/blogs/what-is-spam-filter-analysis',
                    description: 'Learn how spam filter analysis helps you maximize inbox placement.',
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