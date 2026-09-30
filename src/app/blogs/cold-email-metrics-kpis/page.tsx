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
  { id: 'why-metrics-matter', label: '1. Why Cold Email Metrics Matter', arrow: true },
  { id: 'delivery-and-bounce', label: '2. Delivery Rate and Bounce Rate', arrow: true },
  { id: 'open-rate', label: '3. Email Open Rate', arrow: true },
  { id: 'open-rate-benchmarks', label: '3.1 What Are Cold Email Open Rate Benchmarks?', arrow: true, indent: true },
  { id: 'response-rate', label: '4. Email Response Rate', arrow: true },
  { id: 'positive-reply-rate', label: '5. Positive Reply Rate', arrow: true },
  { id: 'conversion-rate', label: '6. Email Conversion Rate', arrow: true },
  { id: 'unsubscribe-rate', label: '7. Unsubscribe Rate', arrow: true },
  { id: 'spam-complaint-rate', label: '8. Spam Complaint Rate', arrow: true },
  { id: 'which-kpis-matter', label: '9. Which KPIs Matter Most in Cold Email Campaigns?', arrow: true },
  { id: 'improve-reply-rate', label: '10. How to Improve Cold Email Reply Rate', arrow: true },
  { id: 'faqs', label: '11. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '12. Measure What Moves the Pipeline', arrow: true },
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
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Cold email metrics dashboard',
    label: 'Cold Email Metrics',
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
          Cold Email Metrics Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Track the KPIs that actually matter—from deliverability to pipeline impact.
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
          Focus on replies, not opens
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Opens are vanity; replies are sanity. A positive reply tells you more about message-market fit than any open rate ever will.
        </p>
      </div>
    </aside>
  );
}

export default function BlogColdEmailMetricsPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/cold-email-metrics.jpg';

  return (
    <>
      <Head>
        <title>Cold Email Metrics: Key KPIs to Measure Outreach Success</title>
        <meta
          name="description"
          content="Learn which cold email metrics matter most, from open and reply rates to meetings, conversions, bounce rates, and ROI, to measure outreach success."
        />
        <meta
          name="keywords"
          content="cold email metrics, cold email KPIs, cold email outreach metrics, cold email success metrics, email outreach KPIs, cold email reply rate, cold email conversion rate, cold email ROI"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Cold Email Metrics: Key KPIs to Measure Outreach Success"
        />
        <meta
          property="og:description"
          content="Learn which cold email metrics matter most, from open and reply rates to meetings, conversions, bounce rates, and ROI, to measure outreach success."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Cold Email Metrics: Key KPIs to Measure Outreach Success"
        />
        <meta
          name="twitter:description"
          content="Discover the key cold email KPIs to track, including reply rates, conversions, meetings booked, bounce rates, and ROI."
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
                  '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#webpage',
                  'url': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success',
                  'name': 'Key Metrics Used to Measure Cold Email Outreach Success',
                  'description': 'Learn which cold email metrics matter most, from open and reply rates to meetings, conversions, bounce rates, and ROI, to measure outreach success.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#article',
                  'headline': 'Key Metrics Used to Measure Cold Email Outreach Success',
                  'description': 'Learn which cold email metrics matter most, from open and reply rates to meetings, conversions, bounce rates, and ROI, to measure outreach success.',
                  'url': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success',
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
                    '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#webpage',
                  },
                  'articleSection': 'Email Outreach',
                  'keywords': [
                    'cold email metrics',
                    'cold email KPIs',
                    'cold email outreach metrics',
                    'cold email success metrics',
                    'cold email reply rate',
                    'cold email conversion rate',
                    'cold email ROI',
                    'email outreach KPIs',
                    'email deliverability',
                  ],
                  'datePublished': '2026-08-18',
                  'dateModified': '2026-08-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#breadcrumb',
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
                      'item': 'https://360airo.com/blog',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': 'Key Metrics Used to Measure Cold Email Outreach Success',
                      'item': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success/#faq',
                  'mainEntity': [
                    {
                      '@type': 'Question',
                      'name': 'What are the most important cold email metrics?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Important cold email metrics include delivery rate, bounce rate, open rate, reply rate, positive reply rate, meeting booking rate, conversion rate, unsubscribe rate, spam complaint rate, and return on investment.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What is a good cold email reply rate?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'There is no universal good cold email reply rate because performance varies by audience, industry, offer, targeting, personalization, deliverability, and campaign quality. Teams should compare results with relevant benchmarks and their own historical performance.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Should cold email open rate be used as a primary KPI?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Open rate can provide directional insight into email engagement, but it should not be treated as the primary measure of cold email success. Reply rates, positive replies, meetings, conversions, pipeline, and revenue are more meaningful business outcomes.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'How do you measure cold email ROI?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Cold email ROI can be measured by comparing revenue or attributable pipeline generated from outreach against the total cost of the campaign, including software, data, infrastructure, labor, and other campaign expenses.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What metrics indicate poor cold email deliverability?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'High bounce rates, low delivery rates, increasing spam complaints, poor inbox placement, and declining sender reputation can indicate cold email deliverability problems.',
                      },
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
          href="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp"
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
                <Link href="/blogs?category=cold-email" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Cold Email
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Key Metrics Used to Measure Cold Email Outreach Success</span>
                  <span className="sm:hidden">Cold Email Metrics Guide</span>
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
                      src="/kpi's-meassure-outreach-success.png"
                      alt="Cold email metrics hero"
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
                    Cold Email Guide
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Key Metrics Used to Measure Cold Email Outreach Success
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    You send 1,000 cold emails. Seven hundred are opened. Fifty prospects reply. Ten book a meeting. Was the campaign successful? Learn which metrics truly measure cold email performance.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Jun 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.3K reads</span>
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
                    'You send 1,000 cold emails.',
                    'Seven hundred are opened. Fifty prospects reply. Ten book a meeting.',
                    'Was the campaign successful?',
                    'The answer depends on which numbers you look at.',
                    'A high email open rate may show that your subject line is getting attention, but it doesn\'t tell you whether prospects are interested. A strong email reply rate may look promising, but the campaign may still produce few positive responses. And even a campaign with modest engagement can be valuable if it creates qualified opportunities.',
                    "That's why measuring cold email success requires more than tracking one metric.",
                    'The right email marketing metrics help revenue teams understand every stage of outreach, from deliverability and engagement to replies, conversions, and pipeline.',
                    "Let's explore the most important cold email metrics, what they reveal about campaign performance, and how teams can use them to improve results.",
                  ]}
                  infographic={{
                    title: 'Why metrics matter',
                    paragraphs: ['Cold email success isn\'t about a single number — it\'s about understanding the entire funnel from delivery to pipeline.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-metrics-matter"
                  id="why-metrics-matter"
                  title="1. Why Cold Email Metrics Matter"
                  showImage={true}
                  intro={[
                    'Every cold email campaign generates data.',
                    'The challenge is knowing which data deserves attention.',
                    'Cold email outreach metrics help teams understand whether campaigns are reaching the right prospects, generating interest, and moving potential buyers toward meaningful sales conversations.',
                    'The most important cold email KPIs typically include:',
                  ]}
                  infographic={{
                    title: 'Key cold email KPIs',
                    paragraphs: ['These metrics, viewed together, reveal the health of your outreach.'],
                    bullets: [
                      'Delivery rate',
                      'Bounce rate',
                      'Email open rate',
                      'Email response rate',
                      'Positive reply rate',
                      'Email conversion rate',
                      'Unsubscribe rate',
                      'Spam complaint rate',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Holistic analysis',
                      paragraphs: ['These email campaign metrics should be evaluated together. For example, a campaign with a strong open rate but weak reply rate may have effective subject lines but irrelevant messaging. A campaign with a high bounce rate may have a list-quality problem before messaging performance can even be evaluated accurately.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="delivery-and-bounce"
                  id="delivery-and-bounce"
                  title="2. Delivery Rate and Bounce Rate"
                  showImage={false}
                  intro={[
                    'Before measuring engagement, you need to know whether emails are reaching their destination.',
                    'Delivery rate measures the percentage of sent emails accepted by receiving mail servers. Bounce rate email metrics show the percentage of messages that could not be delivered.',
                    'Bounces generally fall into two categories:',
                  ]}
                  infographic={{
                    title: 'Types of bounces',
                    paragraphs: ['Understanding bounce types helps you take the right action.'],
                    bullets: [
                      'Hard bounces caused by permanent problems, such as invalid email addresses',
                      'Soft bounces caused by temporary issues, such as a full inbox or short-term server problem',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Monitoring bounce trends',
                      paragraphs: ['A rising bounce rate can indicate outdated contact data, weak email verification, or poor list hygiene. For outbound teams, monitoring bounce trends is essential because repeated delivery failures can affect sender reputation and overall email outreach performance.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="open-rate"
                  id="open-rate"
                  title="3. Email Open Rate"
                  showImage={true}
                  intro={[
                    'The email open rate measures the percentage of delivered emails recorded as opened.',
                    'It has traditionally been one of the most closely watched sales email metrics because it can provide directional insight into:',
                  ]}
                  infographic={{
                    title: 'What open rate indicates',
                    paragraphs: ['Open rate offers clues about subject lines, sender recognition, and initial interest.'],
                    bullets: [
                      'Subject line effectiveness',
                      'Sender recognition',
                      'Campaign targeting',
                      'Initial prospect interest',
                      'Inbox placement',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Limitations of open tracking',
                      paragraphs: ['However, open tracking isn\'t always precise. Privacy features and automated image loading can affect recorded opens. This means open rate should be treated as a directional metric rather than the final measure of campaign success.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="open-rate-benchmarks"
                  id="open-rate-benchmarks"
                  title="3.1 What Are Cold Email Open Rate Benchmarks?"
                  showImage={false}
                  intro={[
                    'Cold email benchmarks vary by industry, audience, campaign size, personalization, and tracking methodology.',
                    'Rather than chasing one universal percentage, compare similar campaigns against one another.',
                    'For example, compare:',
                  ]}
                  infographic={{
                    title: 'Benchmark comparisons',
                    paragraphs: ['Use your own historical data as the most relevant benchmark.'],
                    bullets: [
                      'Persona against persona',
                      'Industry against industry',
                      'Subject line against subject line',
                      'Personalized campaigns against broader campaigns',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Best benchmark',
                      paragraphs: ['The most useful benchmark is often your own historical performance across comparable campaigns.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="response-rate"
                  id="response-rate"
                  title="4. Email Response Rate"
                  showImage={false}
                  intro={[
                    'The email response rate measures the percentage of recipients who reply to your outreach.',
                    'For most sales teams, this is more meaningful than open rate because a reply represents active engagement.',
                    'The average cold email response rate can vary widely depending on targeting, offer quality, message relevance, and personalization. Similarly, B2B cold email response rates may differ significantly across industries and buyer roles.',
                    'A low response rate can indicate problems with:',
                  ]}
                  infographic={{
                    title: 'Causes of low response rate',
                    paragraphs: ['Diagnose reply issues by examining these factors.'],
                    bullets: [
                      'Prospect targeting',
                      'Message relevance',
                      'Value proposition',
                      'Personalization',
                      'Call to action',
                      'Follow-up strategy',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Quality over quantity',
                      paragraphs: ['The goal isn\'t simply to generate more replies. It\'s to generate the right replies.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="positive-reply-rate"
                  id="positive-reply-rate"
                  title="5. Positive Reply Rate"
                  showImage={false}
                  intro={[
                    'Not every response is a successful response.',
                    'A prospect may reply to say they\'re not interested, request removal from future communication, or explain that you\'ve contacted the wrong person.',
                    'The positive reply rate measures responses that indicate genuine interest or move the conversation forward.',
                    'Positive replies may include prospects who:',
                  ]}
                  infographic={{
                    title: 'Positive reply signals',
                    paragraphs: ['These responses indicate genuine interest.'],
                    bullets: [
                      'Request more information',
                      'Agree to a meeting',
                      'Ask about pricing',
                      'Request a demo',
                      'Refer you to another stakeholder',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Strong indicator of message-market fit',
                      paragraphs: ['Among all cold email success metrics, positive reply rate is one of the strongest indicators of message-market fit. Two campaigns may have identical reply rates but completely different business outcomes. Positive reply rate helps reveal that difference.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="conversion-rate"
                  id="conversion-rate"
                  title="6. Email Conversion Rate"
                  showImage={false}
                  intro={[
                    'The email conversion rate measures how many recipients complete the desired action after receiving outreach.',
                    'For a cold email campaign, a conversion could be:',
                  ]}
                  infographic={{
                    title: 'What counts as a conversion',
                    paragraphs: ['Align conversions with your campaign goals.'],
                    bullets: [
                      'Booking a meeting',
                      'Scheduling a demo',
                      'Starting a trial',
                      'Becoming a qualified opportunity',
                      'Completing another defined sales action',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Connect outreach to outcomes',
                      paragraphs: ['The cold email conversion rate connects outreach activity with actual campaign goals. A campaign may generate fewer total replies but a stronger conversion rate because it reaches a better-qualified audience. That\'s why conversion metrics should be evaluated alongside lead quality and pipeline impact.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="unsubscribe-rate"
                  id="unsubscribe-rate"
                  title="7. Unsubscribe Rate"
                  showImage={false}
                  intro={[
                    'The unsubscribe rate measures the percentage of recipients who choose not to receive future communication.',
                    'A rising unsubscribe rate can indicate:',
                  ]}
                  infographic={{
                    title: 'Causes of rising unsubscribes',
                    paragraphs: ['Unsubscribes are a signal worth investigating.'],
                    bullets: [
                      'Poor targeting',
                      'Irrelevant messaging',
                      'Excessive frequency',
                      'Weak audience segmentation',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Feedback opportunity',
                      paragraphs: ['Unsubscribes should not be viewed only as a negative campaign metric. They can also provide useful feedback about audience relevance. If unsubscribe rates increase across a particular segment or campaign, review the targeting criteria and message strategy.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="spam-complaint-rate"
                  id="spam-complaint-rate"
                  title="8. Spam Complaint Rate"
                  showImage={false}
                  intro={[
                    'The spam complaint rate measures how frequently recipients mark emails as spam.',
                    'This is one of the most important deliverability-related outbound email metrics.',
                    'High complaint rates may affect sender reputation and future inbox placement.',
                    'Common causes include:',
                  ]}
                  infographic={{
                    title: 'Complaint triggers',
                    paragraphs: ['Avoid these to protect sender reputation.'],
                    bullets: [
                      'Irrelevant outreach',
                      'Poor targeting',
                      'Excessive sending frequency',
                      'Misleading subject lines',
                      'Unclear sender identity',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Monitor and act quickly',
                      paragraphs: ['Monitor complaint rates continuously and investigate sudden changes quickly. Better targeting and more relevant messaging are among the most effective ways to reduce unwanted responses and complaints.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="which-kpis-matter"
                  id="which-kpis-matter"
                  title="9. Which KPIs Matter Most in Cold Email Campaigns?"
                  showImage={true}
                  intro={[
                    'Not every metric deserves equal attention.',
                    'For sales teams, the strongest measurement framework connects campaign activity to business outcomes.',
                    'A useful hierarchy is:',
                  ]}
                  infographic={{
                    title: 'Metrics hierarchy',
                    paragraphs: ['Prioritize metrics that connect to revenue outcomes.'],
                    bullets: [
                      'Deliverability metrics: Are emails reaching prospects?',
                      'Engagement metrics: Are prospects interacting with outreach?',
                      'Reply metrics: Are messages generating conversations?',
                      'Positive reply metrics: Are the right prospects interested?',
                      'Conversion metrics: Are conversations becoming meetings and opportunities?',
                      'Pipeline metrics: Is outreach contributing to revenue?',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Move beyond basics',
                      paragraphs: ['A cold email outreach platform should help teams move beyond basic opens and clicks by connecting outreach performance with replies, conversions, and pipeline outcomes.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="improve-reply-rate"
                  id="improve-reply-rate"
                  title="10. How to Improve Cold Email Reply Rate"
                  showImage={true}
                  intro={[
                    'If emails are being delivered and opened but prospects aren\'t replying, the issue is usually deeper than the subject line.',
                    'To improve cold email reply rate:',
                  ]}
                  infographic={{
                    title: 'Actionable reply rate improvements',
                    paragraphs: ['Diagnose and improve reply performance with these tactics.'],
                    bullets: [
                      'Target a more specific audience',
                      'Research prospects before outreach',
                      'Personalize messages around relevant context',
                      'Make the value proposition clear',
                      'Keep the email concise',
                      'Use one clear call to action',
                      'Test different messaging angles',
                      'Improve follow-up timing',
                      'Analyze positive and negative replies separately',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Use analytics to pinpoint issues',
                      paragraphs: ['Effective cold email analytics should help teams identify where performance is breaking down. For example, healthy delivery with low opens may suggest an inbox placement or subject-line problem. Strong opens with weak replies may indicate poor message relevance. Good replies with few meetings may suggest a weak call to action or qualification process.'],
                    },
                  ]}
                />

                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    11. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about cold email metrics.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: '11.1 What are the key metrics to measure cold email outreach success?',
                          paragraphs: ['The key metrics include delivery rate, bounce rate, email open rate, email response rate, positive reply rate, conversion rate, unsubscribe rate, spam complaint rate, meetings booked, and pipeline generated.'],
                        },
                        {
                          subtitle: '11.2 Which KPIs matter in cold email campaigns?',
                          paragraphs: ['The most valuable KPIs depend on campaign goals, but positive replies, qualified meetings, opportunities created, and pipeline generated generally provide stronger business insight than open rates alone.'],
                        },
                        {
                          subtitle: '11.3 How can I improve cold email reply rate?',
                          paragraphs: ['Improve targeting, use verified prospect data, personalize messaging, communicate a clear value proposition, simplify the call to action, and optimize follow-up timing based on campaign performance.'],
                        },
                        {
                          subtitle: '11.4 What are cold email open rate benchmarks?',
                          paragraphs: ['Cold email open rates vary based on audience, industry, personalization, deliverability, and tracking methodology. Teams should compare performance across similar campaigns and use their own historical results as a primary benchmark.'],
                        },
                        {
                          subtitle: '11.5 What are the best metrics for outbound email campaigns?',
                          paragraphs: ['The best metrics include deliverability, bounce rate, reply rate, positive reply rate, meeting conversion rate, opportunities created, and pipeline generated.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="12. Measure What Moves the Pipeline"
                  showImage={false}
                  intro={[
                    'Cold email success isn\'t defined by the number of emails sent.',
                    'And it isn\'t defined by open rates alone.',
                    'The strongest revenue teams measure the entire outreach journey—from delivery and engagement to positive replies, meetings, opportunities, and pipeline.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps teams connect outreach execution with cold email analytics, deliverability insights, engagement data, and AI-powered sales workflows. Track the metrics that matter, optimize outreach performance, and turn more cold email conversations into qualified pipeline with 360Airo.',
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
                    title: 'AI SDR vs Human SDR: Cost, Performance & ROI Comparison',
                    tag: 'AI SDR',
                    href: '/blogs/ai-sdr-vs-human-sdr',
                    description: 'Compare AI and human SDRs across cost, performance, and ROI.',
                    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Best AI Tools for Outbound Prospecting in 2026',
                    tag: 'AI Prospecting',
                    href: '/blogs/ai-prospecting-tools-2026',
                    description: 'Discover the top AI platforms for outbound sales.',
                    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Best Practices to Keep Email Bounce Rates Below the 3% Target',
                    tag: 'Bounce Rate',
                    href: '/blogs/best-practices-email-bounce-rates',
                    description: 'Keep bounce rates low with verified data and proper authentication.',
                    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp',
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