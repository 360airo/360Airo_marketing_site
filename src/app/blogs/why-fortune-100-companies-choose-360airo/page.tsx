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
  { id: 'ai-personalization', label: '1. AI‑Powered Personalization That Scales', arrow: true },
  { id: 'multichannel-engagement', label: '2. Multichannel Outreach Improves Buyer Engagement', arrow: true },
  { id: 'prospect-intelligence', label: '3. AI Identifies the Right Prospects Faster', arrow: true },
  { id: 'deliverability', label: '4. Better Email Deliverability Protects Outbound Performance', arrow: true },
  { id: 'automation-productivity', label: '5. Automation Improves Productivity Without Replacing Sales Teams', arrow: true },
  { id: 'security-scalability', label: '6. Enterprise‑Grade Security and Scalability', arrow: true },
  { id: 'analytics', label: '7. Actionable Analytics Drive Better Sales Decisions', arrow: true },
  { id: 'why-invest', label: '8. Why Fortune 100 Companies Continue to Invest in 360Airo', arrow: true },
  { id: 'faqs', label: '9. Frequently Asked Questions', arrow: true },
  { id: 'transform-outbound', label: '10. Transform Enterprise Outbound Marketing With 360Airo', arrow: true },
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
    alt: 'Enterprise outbound B2B marketing',
    label: 'Enterprise',
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
          Enterprise Outbound
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Discover why Fortune 100 companies trust 360Airo for AI‑powered, scalable outbound B2B marketing.
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
          Personalization scales with AI
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Enterprise teams use AI to personalize at scale – not to replace human connection, but to make every interaction more relevant.
        </p>
      </div>
    </aside>
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
          Book a demo today and discover why leading enterprises choose 360Airo for smarter, AI‑powered outbound B2B marketing.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Book a Demo →
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogWhyFortune100Page() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/why-fortune-100-choose-360airo.jpg';

  return (
    <>
      <Head>
        <title>Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing</title>
        <meta
          name="description"
          content="Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, prospect intelligence, and scalable outbound B2B marketing."
        />
        <meta
          name="keywords"
          content="Fortune 100, outbound B2B marketing, AI sales platform, enterprise outbound, 360Airo, multichannel outreach, prospecting, deliverability"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/why-fortune-100-companies-choose-360airo"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing"
        />
        <meta
          property="og:description"
          content="Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, prospect intelligence, and scalable outbound B2B marketing."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/why-fortune-100-companies-choose-360airo"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing"
        />
        <meta
          name="twitter:description"
          content="Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, prospect intelligence, and scalable outbound B2B marketing."
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
                  '@id': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo/#webpage',
                  'url': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo',
                  'name': 'Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing',
                  'description': 'Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, prospect intelligence, and scalable outbound B2B marketing.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo/#article',
                  'headline': 'Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing',
                  'description': 'Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, prospect intelligence, and scalable outbound B2B marketing.',
                  'url': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo',
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
                    '@id': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo/#webpage',
                  },
                  'articleSection': 'Enterprise Outbound',
                  'keywords': [
                    'Fortune 100',
                    'outbound B2B marketing',
                    'AI sales platform',
                    'enterprise outbound',
                    '360Airo',
                    'multichannel outreach',
                    'prospecting',
                    'deliverability',
                  ],
                  'datePublished': '2026-10-05',
                  'dateModified': '2026-10-05',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo/#breadcrumb',
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
                      'name': 'Why Fortune 100 Companies Choose 360Airo',
                      'item': 'https://360airo.com/blogs/why-fortune-100-companies-choose-360airo',
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
                <Link href="/blogs?category=enterprise" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Enterprise
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing</span>
                  <span className="sm:hidden">Fortune 100 &amp; 360Airo</span>
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
                      alt="Fortune 100 companies choose 360Airo"
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
                    Enterprise Outbound
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Enterprise outbound marketing is no longer about sending more emails. Discover why Fortune 100 companies trust 360Airo for AI-powered personalization, multichannel engagement, and scalable pipeline generation.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 8 min read</span>
                    <span>• 2.5K reads</span>
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
                    "Outbound B2B marketing has changed dramatically over the past decade.",
                    "Enterprise buyers no longer respond to generic cold emails sent in bulk. They research solutions independently, compare vendors across multiple channels, and expect every interaction to be timely, relevant, and personalized. At the same time, sales teams are expected to generate more pipeline with fewer resources while maintaining email deliverability and improving productivity.",
                    "This shift has exposed the limitations of traditional outbound tools. Automating email sequences alone is no longer enough to engage modern buyers or support enterprise-scale sales teams. Organizations need platforms that combine artificial intelligence, automation, prospect intelligence, analytics, and multichannel engagement to deliver meaningful customer experiences.",
                    "That's why many Fortune 100 companies are investing in AI-powered outbound sales platforms like 360Airo.",
                    "Rather than simply helping businesses send more emails, 360Airo enables revenue teams to identify the right prospects, personalize outreach at scale, improve inbox placement, automate repetitive tasks, and continuously optimize campaign performance.",
                    "Here's why leading enterprises trust 360Airo to power their outbound B2B marketing strategy.",
                  ]}
                  infographic={{
                    title: 'The enterprise shift',
                    paragraphs: ['Generic bulk emails no longer work. Leading enterprises invest in AI‑powered platforms that combine personalization, automation, and multichannel engagement.'],
                    bullets: [
                      'Buyers expect relevance and personalization',
                      'Sales teams need to do more with less',
                      'Deliverability and reputation are critical',
                      'Data-driven decision-making is essential',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="ai-personalization"
                  id="ai-personalization"
                  title="1. AI‑Powered Personalization That Scales"
                  showImage={true}
                  intro={[
                    "Enterprise sales teams engage with thousands of prospects every month. While buyers expect personalized communication, manually researching every account simply isn't practical.",
                    "360Airo solves this challenge by using AI to gather relevant prospect and company insights before generating outreach. Instead of relying on generic templates or simple merge fields, the platform helps sales teams create messages that reflect a prospect's business, industry, and context.",
                    "This allows organizations to maintain personalization without sacrificing efficiency. Sales representatives spend less time researching accounts and more time having meaningful conversations with qualified buyers.",
                    "For Fortune 100 companies managing high-volume outbound campaigns, this balance between personalization and scale is essential.",
                  ]}
                  infographic={{
                    title: 'AI personalization at scale',
                    paragraphs: ['AI gathers relevant insights to craft context‑aware messages – without manual research.'],
                    bullets: [
                      'Analyzes prospect and company data',
                      'Generates relevant, personalized messaging',
                      'Reduces manual research time',
                      'Maintains personalization at scale',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="multichannel-engagement"
                  id="multichannel-engagement"
                  title="2. Multichannel Outreach Improves Buyer Engagement"
                  showImage={false}
                  intro={[
                    "Enterprise buyers rarely make purchasing decisions after receiving a single email.",
                    "They interact with brands across multiple touchpoints, including LinkedIn, email, SMS, company websites, webinars, and digital advertising before scheduling a conversation.",
                    "360Airo helps revenue teams coordinate these interactions through intelligent multichannel outreach. Instead of treating every channel independently, the platform builds connected outreach sequences that adapt based on prospect engagement.",
                    "If a prospect ignores an email but engages on LinkedIn, the campaign evolves accordingly. This creates a more natural buyer experience while reducing repetitive messaging.",
                    "By engaging prospects where they are most active, businesses increase visibility and improve the likelihood of meaningful conversations.",
                  ]}
                  infographic={{
                    title: 'Intelligent multichannel',
                    paragraphs: ['Connected outreach sequences adapt to prospect engagement across email, LinkedIn, SMS, and more.'],
                    bullets: [
                      'Coordinated sequences across channels',
                      'Adapts based on prospect behavior',
                      'Creates a natural buyer experience',
                      'Increases visibility and engagement',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="prospect-intelligence"
                  id="prospect-intelligence"
                  title="3. AI Identifies the Right Prospects Faster"
                  showImage={false}
                  intro={[
                    "Finding prospects isn't the difficult part.",
                    "Finding prospects who are likely to become customers is.",
                    "Large enterprises often manage millions of contact records across multiple markets and industries. Without intelligent prioritization, sales representatives can spend valuable time pursuing accounts that have little chance of converting.",
                    "360Airo uses AI-powered prospect intelligence to identify businesses that closely match an organization's Ideal Customer Profile (ICP). It analyzes firmographic information, buyer signals, and engagement patterns to surface prospects with the highest potential.",
                    "Rather than working through static prospect lists, sales teams receive prioritized opportunities supported by data.",
                    "This helps improve productivity while increasing the quality of pipeline generated through outbound marketing.",
                  ]}
                  infographic={{
                    title: 'AI‑powered prospect intelligence',
                    paragraphs: ['Surface the highest‑potential prospects based on ICP, buyer signals, and engagement.'],
                    bullets: [
                      'Analyzes firmographic and behavioral data',
                      'Prioritizes prospects most likely to convert',
                      'Improves sales productivity',
                      'Generates higher‑quality pipeline',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="deliverability"
                  id="deliverability"
                  title="4. Better Email Deliverability Protects Outbound Performance"
                  showImage={true}
                  intro={[
                    "Even the best outreach campaign fails if emails never reach the inbox.",
                    "Enterprise organizations sending thousands of emails every day must carefully manage sender reputation, authentication, and domain health. Poor deliverability affects reply rates, weakens brand credibility, and makes future campaigns increasingly difficult.",
                    "360Airo helps businesses maintain strong email deliverability through intelligent email warm-up, domain reputation monitoring, authentication guidance, and campaign optimization.",
                    "By encouraging healthy sending practices and monitoring deliverability metrics continuously, the platform helps organizations maximize inbox placement while protecting long-term sender reputation.",
                    "For enterprise outbound programs, deliverability isn't simply a technical metric—it's a critical business requirement.",
                  ]}
                  infographic={{
                    title: 'Enterprise deliverability',
                    paragraphs: ['Protect sender reputation and inbox placement with intelligent monitoring and best practices.'],
                    bullets: [
                      'Email warm‑up and domain reputation monitoring',
                      'Authentication guidance (SPF, DKIM, DMARC)',
                      'Continuous deliverability optimization',
                      'Protects long‑term sender reputation',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="automation-productivity"
                  id="automation-productivity"
                  title="5. Automation Improves Productivity Without Replacing Sales Teams"
                  showImage={false}
                  intro={[
                    "Sales representatives shouldn't spend most of their day updating CRM records or managing follow-up schedules.",
                    "Yet administrative work continues to consume valuable selling time across many organizations.",
                    "360Airo automates repetitive sales tasks such as campaign execution, follow-up sequencing, prospect tracking, and workflow management. This reduces manual effort while allowing representatives to focus on activities that require human judgment, such as relationship building and complex sales conversations.",
                    "Instead of replacing sales teams, automation strengthens them by removing repetitive operational work.",
                    "The result is greater efficiency without sacrificing the personal interactions that enterprise selling depends on.",
                  ]}
                  infographic={{
                    title: 'Automation that empowers',
                    paragraphs: ['Remove repetitive work so sales teams can focus on building relationships.'],
                    bullets: [
                      'Automates campaign execution and follow‑ups',
                      'Reduces administrative burden',
                      'Frees time for high‑value activities',
                      'Strengthens sales teams rather than replacing them',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="security-scalability"
                  id="security-scalability"
                  title="6. Enterprise‑Grade Security and Scalability"
                  showImage={false}
                  intro={[
                    "Fortune 100 companies evaluate software differently from smaller businesses.",
                    "While features are important, scalability, reliability, governance, and operational consistency are equally critical.",
                    "Enterprise sales organizations often operate across multiple countries, departments, and business units. They require a platform capable of supporting thousands of users while maintaining centralized visibility into campaign performance and sales activity.",
                    "360Airo is designed to scale alongside enterprise growth. Teams can manage outbound campaigns from a single platform, standardize processes across regions, and maintain consistent reporting throughout the organization.",
                    "As businesses expand into new markets, they need technology that grows with them. A scalable outbound platform helps organizations increase campaign volume without increasing operational complexity.",
                  ]}
                  infographic={{
                    title: 'Built for enterprise scale',
                    paragraphs: ['Support thousands of users across regions with centralized governance and reporting.'],
                    bullets: [
                      'Scalable to support enterprise growth',
                      'Centralized campaign management',
                      'Consistent processes across regions',
                      'Maintains visibility and control',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="analytics"
                  id="analytics"
                  title="7. Actionable Analytics Drive Better Sales Decisions"
                  showImage={true}
                  intro={[
                    "Modern sales teams generate enormous amounts of performance data every day.",
                    "The challenge isn't collecting information—it's knowing how to use it.",
                    "360Airo provides real-time analytics that help revenue teams understand campaign performance, buyer engagement, channel effectiveness, and pipeline trends. Instead of reviewing static reports weeks after a campaign ends, teams receive continuous insights that support ongoing optimization.",
                    "Sales and marketing leaders can identify which messaging resonates, which channels produce qualified opportunities, and where prospects disengage during the buying journey.",
                    "These insights allow organizations to refine outbound strategies using measurable evidence rather than assumptions.",
                    "Over time, this creates a more predictable and efficient revenue engine.",
                  ]}
                  infographic={{
                    title: 'Real‑time analytics',
                    paragraphs: ['Continuous insights help teams optimize campaigns and make data‑driven decisions.'],
                    bullets: [
                      'Campaign performance tracking',
                      'Buyer engagement analysis',
                      'Channel effectiveness measurement',
                      'Pipeline trend identification',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-invest"
                  id="why-invest"
                  title="8. Why Fortune 100 Companies Continue to Invest in 360Airo"
                  showImage={false}
                  intro={[
                    "Enterprise outbound marketing is no longer about sending more emails.",
                    "It's about delivering the right message to the right prospect through the right channel at the right time.",
                    "Fortune 100 organizations require platforms that combine AI-powered personalization, intelligent prospecting, workflow automation, multichannel engagement, deliverability optimization, and advanced analytics into a single solution.",
                    "360Airo brings these capabilities together, helping revenue teams simplify operations while improving pipeline generation and customer engagement.",
                    "For organizations competing in complex B2B markets, that combination provides a significant competitive advantage.",
                  ]}
                  infographic={{
                    title: 'The 360Airo advantage',
                    paragraphs: ['An all‑in‑one platform that combines the capabilities enterprise teams need.'],
                    bullets: [
                      'AI‑powered personalization at scale',
                      'Intelligent prospecting and prioritization',
                      'Multichannel engagement and automation',
                      'Deliverability optimization and analytics',
                      'Enterprise‑grade security and scalability',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    9. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about 360Airo for enterprise outbound marketing.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Is 360Airo suitable only for Fortune 100 companies?',
                          paragraphs: ['No. While it\'s built to support enterprise-scale outbound operations, growing B2B businesses can also use 360Airo to automate prospecting, personalize outreach, and improve pipeline generation.'],
                        },
                        {
                          subtitle: 'How does 360Airo personalize outbound campaigns?',
                          paragraphs: ['360Airo uses AI to analyze prospect and company data, enabling sales teams to create relevant, context-aware messaging instead of relying on generic templates or simple merge fields.'],
                        },
                        {
                          subtitle: 'Does 360Airo support multichannel outreach?',
                          paragraphs: ['Yes. The platform helps businesses engage prospects across email, LinkedIn, SMS, and other channels through coordinated outreach sequences that improve engagement and buyer experience.'],
                        },
                        {
                          subtitle: 'How does 360Airo improve outbound marketing performance?',
                          paragraphs: ['By combining AI-powered prospect intelligence, sales automation, deliverability optimization, and analytics, 360Airo helps businesses generate more qualified conversations while reducing manual effort.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  key="transform-outbound"
                  id="transform-outbound"
                  title="10. Transform Enterprise Outbound Marketing With 360Airo"
                  showImage={false}
                  intro={[
                    "The future of outbound B2B marketing isn't defined by higher email volume or larger prospect lists. It's defined by intelligent automation, meaningful personalization, and data-driven decision-making.",
                    "360Airo gives enterprise sales teams everything they need to execute modern outbound campaigns from a single platform. From AI-powered prospect intelligence and multichannel engagement to workflow automation, deliverability management, and campaign analytics, it helps organizations build a scalable outbound strategy that drives measurable business results.",
                    "Whether your goal is to improve lead generation, increase sales productivity, or create a more predictable pipeline, 360Airo empowers your team to engage the right buyers with the right message—at the right time.",
                  ]}
                  infographic={{
                    title: 'Start your journey',
                    paragraphs: [
                      'Book a demo today to discover why leading enterprises choose 360Airo for smarter, AI‑powered outbound B2B marketing.',
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
                    title: 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
                    tag: 'Deliverability',
                    href: '/blogs/what-is-spam-filter-analysis',
                    description: 'Learn how spam filter analysis helps you identify issues before sending and maximize inbox placement.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
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