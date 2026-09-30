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
  { id: 'what-is-ai-sales-forecasting', label: '1. What Is AI Sales Forecasting?', arrow: true },
  { id: 'what-is-agentic-ai', label: '2. What Is Agentic AI in Sales?', arrow: true },
  { id: 'benefits-ai-forecasting', label: '3. Benefits of AI-Powered Sales Forecasting', arrow: true },
  { id: 'agentic-ai-pipeline', label: '4. Agentic AI for Sales Pipeline Forecasting', arrow: true },
  { id: 'best-practices-forecasting', label: '5. Best Practices for AI Sales Forecasting', arrow: true },
  { id: 'why-teams-adopting', label: '6. Why Revenue Teams Are Adopting Agentic AI', arrow: true },
  { id: 'predict-revenue', label: '7. Predict Revenue With Greater Confidence', arrow: true },
  { id: 'forecast-smarter', label: 'Forecast Smarter. Grow Faster.', arrow: true },
  { id: 'faqs', label: '8. Frequently Asked Questions', arrow: true },
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
    alt: 'AI sales forecasting benefits',
    label: 'AI Forecasting',
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
          AI Forecasting Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Improve forecast accuracy with AI-powered predictive intelligence and autonomous pipeline monitoring.
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
          Clean data = better forecasts
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          AI forecasting relies on accurate CRM data. Keep opportunity records updated to improve prediction quality.
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
          Discover how 360Airo helps revenue teams transform forecasting into a competitive advantage with AI-powered insights and intelligent sales automation.
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

export default function BlogAgenticAISalesForecastingPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/agentic-ai-sales-forecasting.jpg';

  return (
    <>
      <Head>
        <title>Benefits of Using Agentic AI for Sales Forecasting</title>
        <meta
          name="description"
          content="Discover the benefits of Agentic AI for sales forecasting – improve accuracy, automate reporting, identify pipeline risks, and make smarter revenue decisions with AI-powered insights."
        />
        <meta
          name="keywords"
          content="agentic AI, sales forecasting, AI sales forecasting, predictive analytics, revenue intelligence, pipeline forecasting, sales automation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Benefits of Using Agentic AI for Sales Forecasting"
        />
        <meta
          property="og:description"
          content="Discover the benefits of Agentic AI for sales forecasting – improve accuracy, automate reporting, identify pipeline risks, and make smarter revenue decisions with AI-powered insights."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Benefits of Using Agentic AI for Sales Forecasting"
        />
        <meta
          name="twitter:description"
          content="Discover the benefits of Agentic AI for sales forecasting – improve accuracy, automate reporting, identify pipeline risks, and make smarter revenue decisions with AI-powered insights."
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
                  '@id': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting/#webpage',
                  'url': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting',
                  'name': 'Benefits of Using Agentic AI for Sales Forecasting',
                  'description': 'Discover the benefits of Agentic AI for sales forecasting – improve accuracy, automate reporting, identify pipeline risks, and make smarter revenue decisions with AI-powered insights.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting/#article',
                  'headline': 'Benefits of Using Agentic AI for Sales Forecasting',
                  'description': 'Discover the benefits of Agentic AI for sales forecasting – improve accuracy, automate reporting, identify pipeline risks, and make smarter revenue decisions with AI-powered insights.',
                  'url': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting',
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
                    '@id': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting/#webpage',
                  },
                  'articleSection': 'AI Sales',
                  'keywords': [
                    'agentic AI',
                    'sales forecasting',
                    'AI sales forecasting',
                    'predictive analytics',
                    'revenue intelligence',
                    'pipeline forecasting',
                    'sales automation',
                  ],
                  'datePublished': '2026-10-18',
                  'dateModified': '2026-10-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting/#breadcrumb',
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
                      'name': 'Agentic AI Sales Forecasting',
                      'item': 'https://360airo.com/blogs/benefits-agentic-ai-sales-forecasting',
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
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
                <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Blog
                </Link>
                <span>›</span>
                <Link href="/blogs?category=ai" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  AI
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Benefits of Using Agentic AI for Sales Forecasting</span>
                  <span className="sm:hidden">Agentic AI Forecasting</span>
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
                      alt="Agentic AI sales forecasting benefits"
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
                    AI Sales
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Benefits of Using Agentic AI for Sales Forecasting
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Every sales leader wants accurate forecasts. Discover how Agentic AI – with machine learning, predictive analytics, and autonomous decision-making – helps revenue teams forecast smarter, identify pipeline risks, and drive predictable growth.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 8 min read</span>
                    <span>• 1.2K reads</span>
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
                    "Every sales leader wants accurate forecasts.",
                    "Knowing which deals are likely to close, how much revenue to expect, and where risks exist helps organizations make smarter business decisions. Yet traditional forecasting often relies on spreadsheets, historical trends, and manual updates that can quickly become outdated.",
                    "As sales cycles grow more complex, these methods struggle to keep pace with changing buyer behavior and market conditions.",
                    "That's why businesses are turning to AI Sales Forecasting.",
                    "Powered by machine learning, predictive analytics, and autonomous decision-making, Agentic AI in Sales helps revenue teams move beyond static forecasts to real-time predictions that continuously improve as new data becomes available.",
                    "Instead of simply reporting what has happened, AI helps predict what is likely to happen next.",
                    "Let's explore how AI-Powered Sales Forecasting is transforming revenue planning and why more organizations are adopting it.",
                  ]}
                  infographic={{
                    title: 'The future of forecasting',
                    paragraphs: ['Agentic AI moves beyond static reports to real‑time predictions that continuously improve with new data.'],
                    bullets: [
                      'Traditional forecasting relies on manual updates and historical trends',
                      'AI analyzes live pipeline and engagement data',
                      'Predictions update automatically as conditions change',
                      'Helps revenue teams make smarter, proactive decisions',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-ai-sales-forecasting"
                  id="what-is-ai-sales-forecasting"
                  title="1. What Is AI Sales Forecasting?"
                  showImage={false}
                  intro={[
                    "AI Sales Forecasting uses artificial intelligence to analyze sales data, customer behavior, historical trends, and pipeline activity to predict future revenue more accurately.",
                    "Unlike traditional forecasting, which depends heavily on manual inputs and assumptions, sales forecasting using AI continuously processes large volumes of data and identifies patterns that humans might overlook.",
                    "The goal isn't just to estimate future sales—it's to provide revenue teams with actionable insights that improve planning and decision-making.",
                  ]}
                  infographic={{
                    title: 'How AI Sales Forecasting works',
                    paragraphs: ['Modern AI forecasting combines multiple technologies to generate accurate, continuously updated predictions.'],
                    bullets: [
                      'Machine learning models',
                      'Predictive sales intelligence',
                      'CRM data analysis',
                      'Pipeline monitoring',
                      'Customer engagement analysis',
                      'Historical sales performance',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why traditional forecasting falls short',
                      paragraphs: [
                        'Many organizations still rely on spreadsheets or manager estimates. While these methods provide a basic forecast, they\'re often limited by human bias, incomplete pipeline visibility, delayed CRM updates, static historical analysis, and manual reporting.',
                        'As pipelines become larger and more dynamic, manual forecasting becomes increasingly difficult to maintain.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-is-agentic-ai"
                  id="what-is-agentic-ai"
                  title="2. What Is Agentic AI in Sales?"
                  showImage={true}
                  intro={[
                    "Most AI systems provide recommendations.",
                    "Agentic AI goes a step further.",
                    "Instead of simply identifying trends, it can analyze information, make decisions based on predefined objectives, and automate actions with minimal human intervention.",
                    "In sales forecasting, this means AI doesn't just predict revenue—it continuously monitors the pipeline, identifies potential risks, recommends corrective actions, and updates forecasts automatically.",
                    "Rather than functioning as another reporting dashboard, Agentic AI acts as an intelligent revenue assistant.",
                  ]}
                  infographic={{
                    title: 'Agentic AI in action',
                    paragraphs: ['Agentic AI continuously analyzes pipeline health and recommends actions to improve forecast accuracy.'],
                    bullets: [
                      'Opportunity progression',
                      'Deal velocity',
                      'Customer engagement',
                      'Buying signals',
                      'Historical win rates',
                      'Sales representative activity',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'From reporting to prediction',
                      paragraphs: [
                        'Traditional forecasting explains what happened. AI-Powered Sales Forecasting focuses on what is likely to happen next.',
                        'By identifying pipeline risks before they become missed targets, organizations can take corrective action earlier, improving overall forecast reliability.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="benefits-ai-forecasting"
                  id="benefits-ai-forecasting"
                  title="3. Benefits of AI-Powered Sales Forecasting"
                  showImage={false}
                  intro={[
                    "Organizations invest in AI for sales forecasting because it delivers more than improved predictions.",
                    "It supports better planning across sales, finance, operations, and executive leadership.",
                  ]}
                  infographic={{
                    title: 'Key benefits',
                    paragraphs: ['AI‑powered forecasting improves accuracy, automation, and decision‑making across the business.'],
                    bullets: [
                      'Improve Forecast Accuracy – evaluate live pipeline and engagement data',
                      'Identify Pipeline Risks Earlier – spot deals showing signs of slowing down',
                      'Support Better Strategic Decisions – guide budgeting, hiring, and growth planning',
                      'Automate Sales Forecasting – continuous updates without manual effort',
                      'Improve Sales Pipeline Forecasting – monitor deal velocity and win rates',
                      'Deliver Predictive Sales Intelligence – understand why forecasts change',
                      'Scale Forecasting Across the Business – maintain consistency across regions and teams',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="agentic-ai-pipeline"
                  id="agentic-ai-pipeline"
                  title="4. Agentic AI for Sales Pipeline Forecasting"
                  showImage={true}
                  intro={[
                    "Sales forecasting is only as strong as the pipeline behind it.",
                    "Without visibility into pipeline quality, forecasts become unreliable.",
                    "Agentic AI continuously monitors pipeline activity to provide a more accurate view of future revenue.",
                  ]}
                  infographic={{
                    title: 'Pipeline intelligence',
                    paragraphs: ['Agentic AI evaluates deal quality and recommends actions to improve forecast confidence.'],
                    bullets: [
                      'Monitor Pipeline Health – evaluate deal progression, engagement, and conversion rates',
                      'Prioritize High‑Value Opportunities – focus on deals with greatest revenue potential',
                      'Recommend Next Best Actions – suggest follow‑ups, stakeholder engagement, and stage updates',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="best-practices-forecasting"
                  id="best-practices-forecasting"
                  title="5. Best Practices for AI Sales Forecasting"
                  showImage={false}
                  intro={[
                    "Technology alone doesn't guarantee accurate forecasts.",
                    "Organizations should combine AI with strong sales processes and reliable customer data.",
                  ]}
                  infographic={{
                    title: 'Best practices',
                    paragraphs: ['Combine AI with clean data, regular reviews, and human expertise.'],
                    bullets: [
                      'Maintain Clean CRM Data – accurate information improves prediction quality',
                      'Review Forecasts Regularly – validate assumptions and identify changing market conditions',
                      'Combine AI With Human Expertise – leverage both patterns and market context',
                      'Measure Forecast Accuracy – track predictions against actual revenue',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-teams-adopting"
                  id="why-teams-adopting"
                  title="6. Why Revenue Teams Are Adopting Agentic AI"
                  showImage={false}
                  intro={[
                    "Forecasting has evolved from a reporting exercise into a strategic advantage.",
                    "Revenue teams are adopting Agentic AI in Sales because it helps them improve sales forecast accuracy, automate repetitive forecasting tasks, identify pipeline risks earlier, generate predictive sales intelligence, optimize resource planning, and support better executive decision-making.",
                    "Instead of spending valuable time creating forecasts manually, teams can focus on improving the outcomes those forecasts predict.",
                  ]}
                  infographic={{
                    title: 'The shift to Agentic AI',
                    paragraphs: ['Revenue teams are adopting AI to move from manual reporting to intelligent, proactive forecasting.'],
                    bullets: [
                      'Improve sales forecast accuracy',
                      'Automate repetitive forecasting tasks',
                      'Identify pipeline risks earlier',
                      'Generate predictive sales intelligence',
                      'Optimize resource planning',
                      'Support better executive decision‑making',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="predict-revenue"
                  id="predict-revenue"
                  title="7. Predict Revenue With Greater Confidence"
                  showImage={false}
                  intro={[
                    "Accurate forecasting is no longer just about reviewing historical sales performance.",
                    "It's about understanding what's happening in your pipeline today and predicting how those opportunities will influence tomorrow's revenue.",
                    "AI-Powered Sales Forecasting gives organizations the ability to move beyond static reports by continuously analyzing customer behavior, pipeline activity, and sales performance in real time.",
                    "Combined with Agentic AI in Sales, forecasting becomes more than a prediction—it becomes an intelligent decision-making system that helps revenue teams identify risks, uncover opportunities, and improve planning across the business.",
                    "As organizations continue embracing AI-driven revenue operations, sales forecasting will become increasingly proactive, automated, and data-driven.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo combines AI Sales Forecasting, predictive sales intelligence, and Agentic AI to help organizations automate forecasting, uncover revenue opportunities, and build greater confidence in every sales decision.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Forecast Smarter. Grow Faster. */}
                <section id="forecast-smarter" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Forecast Smarter. Grow Faster.
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Forecasting shouldn't rely on guesswork or outdated spreadsheets.</p>
                      <p>
                        With AI-powered forecasting and autonomous decision-making, revenue teams can monitor pipeline health in real time, improve forecast accuracy, and make proactive decisions that support predictable growth.
                      </p>
                      <p>
                        360Airo combines AI Sales Forecasting, predictive sales intelligence, and Agentic AI to help organizations automate forecasting, uncover revenue opportunities, and build greater confidence in every sales decision.
                      </p>
                    </div>
                    <MiniInfographic
                      title="Start forecasting smarter"
                      paragraphs={[
                        'Discover how 360Airo helps revenue teams transform forecasting into a competitive advantage with AI-powered insights and intelligent sales automation.',
                      ]}
                    />
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    8. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about AI sales forecasting and Agentic AI.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'What is AI Sales Forecasting?',
                          paragraphs: ['AI Sales Forecasting uses artificial intelligence, machine learning, and predictive analytics to estimate future sales based on CRM data, customer behavior, and pipeline activity.'],
                        },
                        {
                          subtitle: 'How is AI used in sales forecasting?',
                          paragraphs: ['AI analyzes historical sales data, opportunity progression, customer engagement, and buying signals to generate continuously updated revenue forecasts.'],
                        },
                        {
                          subtitle: 'How does Agentic AI improve sales forecast accuracy?',
                          paragraphs: ['Agentic AI continuously monitors pipeline health, identifies risks, updates forecasts automatically, and recommends actions that improve forecast reliability.'],
                        },
                        {
                          subtitle: 'What are the benefits of AI-powered sales forecasting?',
                          paragraphs: ['Benefits include improved forecast accuracy, automated reporting, predictive sales intelligence, stronger pipeline visibility, better resource planning, and faster decision-making.'],
                        },
                        {
                          subtitle: 'What is the best AI for forecasting?',
                          paragraphs: ['The best solution combines predictive analytics, CRM integration, machine learning, pipeline monitoring, and autonomous decision-making to deliver accurate, continuously updated forecasts.'],
                        },
                        {
                          subtitle: 'What\'s the best AI tool for sales?',
                          paragraphs: ['The ideal AI sales platform supports forecasting, sales intelligence, pipeline management, lead prioritization, automation, and multichannel revenue workflows within a single solution.'],
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
                    title: 'How Does the Lead Finder Feature Identify Ideal Customer Profiles?',
                    tag: 'Lead Generation',
                    href: '/blogs/how-lead-finder-identifies-ideal-customer-profiles',
                    description: 'Learn how AI-powered Lead Finder identifies ICP using firmographic data and sales intelligence.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Competitors Offering Similar Unlimited Inbox Pricing Models',
                    tag: 'Pricing',
                    href: '/blogs/competitors-offering-unlimited-inbox-pricing',
                    description: 'Compare unlimited inbox pricing vs per-user, contact, and send‑based models.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Why 360Airo Is the Best Outbound Email Campaign Platform',
                    tag: 'Outbound',
                    href: '/blogs/why-360airo-is-best-outbound-email-platform',
                    description: 'Discover why 360Airo is the best outbound email campaign platform.',
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