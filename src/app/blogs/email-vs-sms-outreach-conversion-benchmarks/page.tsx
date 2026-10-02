'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
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
  { id: 'what-is-the-difference', label: "1. SMS vs Email Marketing: What's the Difference?", arrow: true },
  { id: 'email-outreach', label: '1.1 Email Outreach', arrow: true, indent: true },
  { id: 'sms-sales-outreach', label: '1.2 SMS Sales Outreach', arrow: true, indent: true },
  { id: 'comparing-conversion-benchmarks', label: '2. Comparing Conversion Benchmarks', arrow: true },
  { id: 'open-rates', label: '2.1 Open Rates', arrow: true, indent: true },
  { id: 'response-rates', label: '2.2 Response Rates', arrow: true, indent: true },
  { id: 'click-through-rates', label: '2.3 Click‑Through Rates', arrow: true, indent: true },
  { id: 'conversion-rates', label: '2.4 Conversion Rates', arrow: true, indent: true },
  { id: 'when-to-use-email', label: '3. When Should Revenue Teams Use Email?', arrow: true },
  { id: 'lead-nurturing', label: '3.1 Lead Nurturing', arrow: true, indent: true },
  { id: 'content-sharing', label: '3.2 Content Sharing', arrow: true, indent: true },
  { id: 'relationship-building', label: '3.3 Relationship Building', arrow: true, indent: true },
  { id: 'when-to-use-sms', label: '4. When Should Revenue Teams Use SMS?', arrow: true },
  { id: 'following-up-quickly', label: '4.1 Following Up Quickly', arrow: true, indent: true },
  { id: 'confirming-meetings', label: '4.2 Confirming Meetings', arrow: true, indent: true },
  { id: 'driving-immediate-action', label: '4.3 Driving Immediate Action', arrow: true, indent: true },
  { id: 'supporting-conversations', label: '4.4 Supporting Existing Conversations', arrow: true, indent: true },
  { id: 'choose-email-or-sms', label: '5. Should You Choose Email or SMS?', arrow: true },
  { id: 'email-builds-context', label: '5.1 Email Builds Context', arrow: true, indent: true },
  { id: 'sms-creates-momentum', label: '5.2 SMS Creates Momentum', arrow: true, indent: true },
  { id: 'best-practices-combining', label: '6. Best Practices for Combining Email and SMS', arrow: true },
  { id: 'keep-messaging-consistent', label: '6.1 Keep Messaging Consistent', arrow: true, indent: true },
  { id: 'personalize-interactions', label: '6.2 Personalize Every Interaction', arrow: true, indent: true },
  { id: 'respect-preferences', label: '6.3 Respect Customer Preferences', arrow: true, indent: true },
  { id: 'measure-performance', label: '6.4 Measure Performance Across Channels', arrow: true, indent: true },
  { id: 'smarter-strategy', label: '7. Build a Smarter Multichannel Outreach Strategy', arrow: true },
  { id: 'faqs', label: '8. Frequently Asked Questions', arrow: true },
];

const MiniInfographic = memo(function MiniInfographic({
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
});

const ContentBlock = memo(function ContentBlock({
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
});

const SectionImage = memo(function SectionImage() {
  const image = {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Email and SMS communication dashboard',
    label: 'Multichannel',
  };

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          decoding="async"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
});

const ArticleSection = memo(function ArticleSection({
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
        {showImage && <SectionImage />}
      </div>
    </section>
  );
});

// --- FAQ Accordion Component ---
const FaqAccordion = memo(function FaqAccordion({
  faqs,
}: {
  faqs: { subtitle: string; paragraphs: string[] }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]"
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span
                className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
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
});

const RightPromoCards = memo(function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4 pt-2">
          Multichannel Outreach
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Combine email and SMS for higher engagement. Automate both from one platform.
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
          Use both channels
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Email builds trust with detailed information; SMS drives immediate action. Together they outperform either alone.
        </p>
      </div>
    </aside>
  );
});

// --- Hoisted static FAQ data ---
const FAQ_ITEMS = [
  {
    subtitle: '8.1 Is SMS more effective than email?',
    paragraphs: ['SMS often generates faster engagement, while email provides more space for detailed communication. The best results usually come from using both together.'],
  },
  {
    subtitle: '8.2 What is SMS sales outreach?',
    paragraphs: ['SMS sales outreach is the use of business text messaging to engage prospects and customers throughout the sales process, including follow‑ups, reminders, and appointment confirmations.'],
  },
  {
    subtitle: '8.3 Should I replace email with SMS?',
    paragraphs: ['No. Email and SMS serve different purposes. Combining both channels creates a more balanced and effective outreach strategy.'],
  },
  {
    subtitle: '8.4 When should I send an SMS instead of an email?',
    paragraphs: ['Use SMS for time‑sensitive communication, meeting reminders, follow‑ups, and quick confirmations. Use email when you need to share detailed information or educational content.'],
  },
  {
    subtitle: '8.5 Which channel converts better?',
    paragraphs: ['The answer depends on your audience, message, and stage of the buyer journey. Revenue teams typically achieve the best conversion benchmarks by integrating email and SMS into a coordinated outreach strategy.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
    tag: 'Cold Email',
    href: '/blogs/10-cheapest-cold-email-software',
    description: 'Discover affordable cold email tools for 2026.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'What Are Email Warmup Tools and How Do They Work?',
    tag: 'Deliverability',
    href: '/blogs/email-warmup-tools-guide',
    description: 'Learn how warmup tools protect sender reputation.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'AI SDR vs Human SDR: Cost, Performance & ROI Comparison',
    tag: 'AI SDR',
    href: '/blogs/ai-sdr-vs-human-sdr',
    description: 'Compare cost, performance, and ROI of AI vs human SDRs.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
];

const RecentPosts = memo(function RecentPosts() {
  return (
    <section className="px-3 md:px-4 pb-4 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
          <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {RECENT_POSTS.map((post) => (
            <a
              key={post.href}
              href={post.href}
              className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
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
  );
});

export default function BlogEmailVsSmsPage() {
  const [activeId, setActiveId] = useState('introduction');
  const activeIdRef = useRef('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  // INP FIX: Throttle scroll handler with requestAnimationFrame
  // PERF: Only update state when active section actually changes
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

          if (currentSectionId !== activeIdRef.current) {
            activeIdRef.current = currentSectionId;
            setActiveId(currentSectionId);
          }
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

  const featuredImageUrl = 'https://360airo.com/og-images/email-vs-sms-outreach.jpg';

  return (
    <>
      <Head>
        <title>Email vs SMS Outreach: Conversion Benchmarks</title>
        <meta
          name="description"
          content="Compare email vs SMS outreach conversion benchmarks, response rates, engagement, and ROI to understand which channel works best for different sales campaigns."
        />
        <link
          rel="canonical"
          href="https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta property="og:title" content="Email vs SMS Outreach: Conversion Benchmarks" />
        <meta
          property="og:description"
          content="Compare email vs SMS outreach conversion benchmarks, response rates, engagement, and ROI to understand which channel works best for different sales campaigns."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Email vs SMS Outreach: Conversion Benchmarks" />
        <meta
          name="twitter:description"
          content="Compare email and SMS outreach benchmarks across conversion rates, engagement, response rates, and ROI to choose the right channel."
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
                  'publisher': { '@id': 'https://360airo.com/#organization' },
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#webpage',
                  'url': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks',
                  'name': 'Email vs SMS Outreach: Conversion Benchmarks',
                  'description': 'Compare email vs SMS outreach conversion benchmarks, response rates, engagement, and ROI to understand which channel works best for different sales campaigns.',
                  'isPartOf': { '@id': 'https://360airo.com/#website' },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#article',
                  'headline': 'Email vs SMS Outreach: Conversion Benchmarks',
                  'description': 'Compare email vs SMS outreach conversion benchmarks, response rates, engagement, and ROI to understand which channel works best for different sales campaigns.',
                  'url': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks',
                  'image': {
                    '@type': 'ImageObject',
                    'url': featuredImageUrl,
                  },
                  'author': { '@id': 'https://360airo.com/#organization' },
                  'publisher': { '@id': 'https://360airo.com/#organization' },
                  'mainEntityOfPage': {
                    '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#webpage',
                  },
                  'articleSection': 'Sales & Outreach',
                  'keywords': [
                    'email vs SMS outreach',
                    'email conversion rates',
                    'SMS conversion rates',
                    'email outreach benchmarks',
                    'SMS outreach benchmarks',
                    'email vs SMS conversion',
                    'multichannel outreach',
                  ],
                  'datePublished': '2026-08-18',
                  'dateModified': '2026-08-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#breadcrumb',
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://360airo.com/' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://360airo.com/blog' },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': 'Email vs SMS Outreach: Conversion Benchmarks',
                      'item': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks/#faq',
                  'mainEntity': [
                    {
                      '@type': 'Question',
                      'name': 'Is email or SMS better for outreach?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'The better channel depends on the audience, offer, campaign objective, message length, timing, and consent requirements. Email is generally better for detailed B2B communication, while SMS can be effective for short, time‑sensitive messages.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Does SMS have a higher conversion rate than email?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'SMS can generate strong engagement because text messages are typically viewed quickly, but conversion rates vary by industry, audience, campaign type, offer, and measurement method. Email can perform better for longer sales cycles and detailed B2B outreach.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What is a good email outreach conversion rate?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'There is no universal good email outreach conversion rate. Performance depends on factors such as targeting, deliverability, personalization, offer, industry, and the conversion event being measured.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What is a good SMS outreach conversion rate?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'A good SMS conversion rate varies by campaign type, audience, offer, industry, and conversion event. Businesses should compare results against their own historical performance and relevant industry benchmarks.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Can email and SMS be used together?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Yes. Email and SMS can be combined as part of a multichannel outreach strategy. Teams can use email for detailed communication and SMS for timely follow‑ups, reminders, or short messages when appropriate.',
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
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
                <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Blog
                </Link>
                <span>›</span>
                <Link href="/blogs?category=email-marketing" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Email Marketing
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Email vs SMS Outreach: Conversion Benchmarks</span>
                  <span className="sm:hidden">Email vs SMS Benchmarks</span>
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative transform-gpu"
                >
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp"
                      alt="Email vs SMS outreach hero"
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
                  className="max-w-2xl transform-gpu"
                >
                  <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">
                    Multichannel Guide
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Email vs SMS Outreach: Conversion Benchmarks
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Your buyers aren't ignoring your outreach because they're uninterested—they're busy. Learn when to use email, when to use SMS, and how to combine them for maximum conversions.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Aug 2026</span>
                    <span>• 10 min read</span>
                    <span>• 2.3K reads</span>
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
                        <span
                          className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${
                            isActive ? 'bg-[#4f63ff]' : 'bg-transparent'
                          }`}
                        />
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
                    "Your buyers aren't ignoring your outreach because they're uninterested.",
                    "They're ignoring it because they're busy.",
                    'Every day, prospects receive dozens of emails, LinkedIn requests, phone calls, and marketing messages competing for their attention. As a result, revenue teams are asking an important question: Should you prioritize email or SMS?',
                    "The answer isn't as simple as choosing one over the other.",
                    'Email and SMS serve different purposes throughout the buyer journey. While email is ideal for sharing detailed information and nurturing leads, SMS excels at creating timely, high-engagement conversations.',
                    'Understanding the strengths of each channel—and knowing when to use them—can help revenue teams improve response rates, increase conversions, and build a more effective multichannel outreach strategy.',
                  ]}
                  infographic={{
                    title: 'The core insight',
                    paragraphs: ['Email educates; SMS activates. The best results come from using both intentionally.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-the-difference"
                  id="what-is-the-difference"
                  title="1. SMS vs Email Marketing: What's the Difference?"
                  showImage={false}
                  intro={[
                    'Both email and SMS are powerful communication channels, but they solve different problems.',
                    'Email gives you room to educate prospects, tell a story, and share detailed resources. SMS, on the other hand, is designed for short, immediate communication that encourages quick responses.',
                    'Instead of asking which channel is better, ask which channel is better for the moment.',
                  ]}
                  infographic={{
                    title: 'Channel comparison',
                    paragraphs: ['Email = depth and storytelling. SMS = speed and convenience.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="email-outreach"
                  id="email-outreach"
                  title="1.1 Email Outreach"
                  showImage={false}
                  intro={[
                    'Email is one of the most widely used channels for prospecting and lead nurturing.',
                    'It works well for:',
                  ]}
                  infographic={{
                    title: 'Best uses for email',
                    paragraphs: ['Email gives buyers flexibility to review information on their own time.'],
                    bullets: [
                      'Sharing proposals and presentations',
                      'Sending product information',
                      'Long-form educational content',
                      'Lead nurturing campaigns',
                      'Follow-up sequences',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The trade‑off',
                      paragraphs: ['Busy inboxes make it harder to capture attention.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="sms-sales-outreach"
                  id="sms-sales-outreach"
                  title="1.2 SMS Sales Outreach"
                  showImage={false}
                  intro={[
                    'SMS sales outreach focuses on speed and convenience.',
                    'Instead of delivering large amounts of information, SMS encourages quick interactions that move conversations forward.',
                    'Revenue teams commonly use SMS for:',
                  ]}
                  infographic={{
                    title: 'Best uses for SMS',
                    paragraphs: ['Text messages are short, direct, and often viewed much sooner than emails.'],
                    bullets: [
                      'Demo confirmations',
                      'Meeting reminders',
                      'Follow-ups',
                      'Appointment scheduling',
                      'Quick customer updates',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="comparing-conversion-benchmarks"
                  id="comparing-conversion-benchmarks"
                  title="2. Comparing Conversion Benchmarks"
                  showImage={true}
                  intro={[
                    "When evaluating SMS vs email marketing, conversion isn't determined by one metric alone.",
                    'Revenue teams should look at engagement throughout the customer journey.',
                  ]}
                  infographic={{
                    title: 'Key metrics',
                    paragraphs: ['Open rates, response rates, click‑throughs, and conversions—each tells a different story.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="open-rates"
                  id="open-rates"
                  title="2.1 Open Rates"
                  showImage={false}
                  intro={[
                    "SMS consistently achieves higher visibility than email because messages appear directly on a recipient's mobile device.",
                    'Email remains effective, but inbox competition means even well-crafted campaigns can go unnoticed.',
                    'Higher visibility often makes SMS an excellent channel for time-sensitive communication.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="response-rates"
                  id="response-rates"
                  title="2.2 Response Rates"
                  showImage={false}
                  intro={[
                    'SMS encourages conversational engagement.',
                    'A prospect can confirm a meeting, ask a question, or respond within seconds.',
                    'Email responses often take longer because recipients typically process emails in batches throughout the day.',
                    'For follow-ups that require immediate action, SMS often creates less friction.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="click-through-rates"
                  id="click-through-rates"
                  title="2.3 Click‑Through Rates"
                  showImage={false}
                  intro={[
                    'Email gives marketers more space to explain offers before asking recipients to click.',
                    'SMS relies on concise messaging and a single call to action.',
                    'When messages are relevant and timely, both channels can drive meaningful engagement—but they do so in different ways.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="conversion-rates"
                  id="conversion-rates"
                  title="2.4 Conversion Rates"
                  showImage={false}
                  intro={[
                    'Conversion depends on more than the communication channel.',
                    'Audience quality, timing, personalization, and messaging all influence results.',
                    'Revenue teams often see the strongest outcomes when SMS supports an existing email strategy rather than replacing it.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="when-to-use-email"
                  id="when-to-use-email"
                  title="3. When Should Revenue Teams Use Email?"
                  showImage={false}
                  intro={['Email remains essential throughout the buying journey.']}
                  infographic={{
                    title: 'Email strengths',
                    paragraphs: ['Use email when you need to educate, share resources, and build relationships over time.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="lead-nurturing"
                  id="lead-nurturing"
                  title="3.1 Lead Nurturing"
                  showImage={false}
                  intro={[
                    'Complex buying decisions require education.',
                    'Email gives teams enough space to explain products, answer objections, and build trust over time.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="content-sharing"
                  id="content-sharing"
                  title="3.2 Content Sharing"
                  showImage={false}
                  intro={[
                    'Whitepapers, case studies, proposals, and product guides are better suited for email than text messages.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="relationship-building"
                  id="relationship-building"
                  title="3.3 Relationship Building"
                  showImage={false}
                  intro={[
                    'Not every conversation needs immediate action.',
                    'Email works well for maintaining ongoing communication without interrupting recipients.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="when-to-use-sms"
                  id="when-to-use-sms"
                  title="4. When Should Revenue Teams Use SMS?"
                  showImage={false}
                  intro={['SMS performs best when speed matters.']}
                  infographic={{
                    title: 'SMS strengths',
                    paragraphs: ['Use SMS for follow‑ups, meeting confirmations, and driving immediate action.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="following-up-quickly"
                  id="following-up-quickly"
                  title="4.1 Following Up Quickly"
                  showImage={false}
                  intro={[
                    'Responding soon after a prospect expresses interest can significantly improve engagement.',
                    'SMS provides an immediate way to continue the conversation.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="confirming-meetings"
                  id="confirming-meetings"
                  title="4.2 Confirming Meetings"
                  showImage={false}
                  intro={[
                    'Meeting reminders reduce no-shows and help prospects stay engaged throughout the sales process.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="driving-immediate-action"
                  id="driving-immediate-action"
                  title="4.3 Driving Immediate Action"
                  showImage={false}
                  intro={[
                    'Need someone to confirm a call, complete a form, or reply to a question?',
                    'SMS creates less friction than many other channels.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="supporting-conversations"
                  id="supporting-conversations"
                  title="4.4 Supporting Existing Conversations"
                  showImage={false}
                  intro={[
                    'The most effective SMS sales outreach builds on an existing relationship rather than introducing one.',
                    'Prospects are more likely to respond when the conversation already has context.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="choose-email-or-sms"
                  id="choose-email-or-sms"
                  title="5. Should You Choose Email or SMS?"
                  showImage={false}
                  intro={[
                    'The short answer? No.',
                    "The highest‑performing revenue teams don't choose one channel over the other—they combine both.",
                  ]}
                  infographic={{
                    title: 'The winning combination',
                    paragraphs: ['Email explains and nurtures. SMS reminds and confirms. Together they create momentum.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="email-builds-context"
                  id="email-builds-context"
                  title="5.1 Email Builds Context"
                  showImage={false}
                  intro={['Email explains. It educates. It nurtures.']}
                  blocks={[]}
                />

                <ArticleSection
                  key="sms-creates-momentum"
                  id="sms-creates-momentum"
                  title="5.2 SMS Creates Momentum"
                  showImage={false}
                  intro={['SMS reminds. It confirms. It encourages quick responses.']}
                  blocks={[
                    {
                      subtitle: 'Example workflow',
                      paragraphs: [
                        'A prospect might receive:',
                        '• An introductory email',
                        '• A follow‑up email with helpful resources',
                        '• A text reminder before a scheduled meeting',
                        '• A post‑meeting SMS thanking them and sharing the next step',
                        'Each channel plays a different role while supporting the same buyer journey.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="best-practices-combining"
                  id="best-practices-combining"
                  title="6. Best Practices for Combining Email and SMS"
                  showImage={false}
                  intro={[
                    "Using multiple channels doesn't mean sending more messages—it means creating better experiences.",
                  ]}
                  infographic={{
                    title: 'Core principles',
                    paragraphs: ['Consistency, personalization, respect preferences, and measure everything.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="keep-messaging-consistent"
                  id="keep-messaging-consistent"
                  title="6.1 Keep Messaging Consistent"
                  showImage={false}
                  intro={[
                    'Whether someone receives an email or a text message, the conversation should feel connected.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="personalize-interactions"
                  id="personalize-interactions"
                  title="6.2 Personalize Every Interaction"
                  showImage={false}
                  intro={[
                    'Use CRM data to tailor communication based on customer behavior, buying stage, and previous interactions.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="respect-preferences"
                  id="respect-preferences"
                  title="6.3 Respect Customer Preferences"
                  showImage={false}
                  intro={[
                    'Some buyers prefer email. Others respond faster to text messages. Providing communication choices helps build trust.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="measure-performance"
                  id="measure-performance"
                  title="6.4 Measure Performance Across Channels"
                  showImage={false}
                  intro={[
                    'Monitor open rates, reply rates, meeting bookings, conversions, and revenue influence to understand how each channel contributes to pipeline generation.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="smarter-strategy"
                  id="smarter-strategy"
                  title="7. Build a Smarter Multichannel Outreach Strategy"
                  showImage={false}
                  intro={[
                    "The debate isn't really SMS vs email marketing. It's about knowing when each channel creates the greatest impact.",
                    'Email remains the foundation for education and relationship building. SMS excels at creating timely, high-engagement conversations that keep deals moving forward.',
                    'When combined thoughtfully, they create a stronger buyer experience and help revenue teams communicate more effectively throughout the sales cycle.',
                    "Instead of choosing one channel, build a strategy where each supports the other. That's how modern revenue teams increase engagement, improve conversions, and create more meaningful customer relationships.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo unifies email and SMS outreach in one AI‑powered platform, helping you orchestrate multichannel campaigns that drive conversions.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    8. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about email vs SMS outreach.']}
                    />
                    <FaqAccordion faqs={FAQ_ITEMS} />
                  </div>
                </section>
              </div>

              <RightPromoCards />
            </div>
          </section>

          {/* Recent Posts */}
          <RecentPosts />
        </main>
        <Footer />
      </div>
    </>
  );
}