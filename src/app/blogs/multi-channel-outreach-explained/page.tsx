'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
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
  { id: 'what-is-multi-channel', label: '1. What Is Multi‑Channel Outreach?', arrow: true },
  { id: 'why-single-channel-fails', label: '2. Why Single‑Channel Outreach No Longer Works', arrow: true },
  { id: 'benefits-of-omnichannel', label: '3. The Benefits of Omnichannel Sales Outreach', arrow: true },
  { id: 'choosing-the-right-channels', label: '4. Choosing the Right Channels for Multi‑Channel Prospecting', arrow: true },
  { id: 'build-a-cadence', label: '5. Build a Multi‑Channel Cadence That Converts', arrow: true },
  { id: 'best-practices', label: '6. Best Practices for Successful Omnichannel Sales Outreach', arrow: true },
  { id: 'common-mistakes', label: '7. Common Multi‑Channel Outreach Mistakes', arrow: true },
  { id: 'future-of-outbound', label: '8. Multi‑Channel Outreach Is the Future of Outbound Sales', arrow: true },
  { id: 'faqs', label: '9. Frequently Asked Questions', arrow: true },
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
    alt: 'Multi‑channel outreach dashboard',
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
          Multi‑Channel Outreach
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Automate coordinated campaigns across email, LinkedIn, SMS, and calls from one platform.
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
          Don't confuse volume with value
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A coordinated cadence beats sporadic contact. Space your touchpoints and personalize each interaction.
        </p>
      </div>
    </aside>
  );
});

// --- Cadence Table Component (matches reference styling) ---
const CADENCE_ROWS = [
  { day: 'Day 1', channel: 'Email', objective: 'Send a personalized cold email introducing the business problem you solve.' },
  { day: 'Day 2', channel: 'LinkedIn', objective: "View the prospect's profile and engage with a recent post if relevant." },
  { day: 'Day 3', channel: 'LinkedIn', objective: 'Send a personalized connection request referencing your email.' },
  { day: 'Day 5', channel: 'Email', objective: 'Follow up with a useful insight, customer story, or industry statistic.' },
  { day: 'Day 6', channel: 'Phone', objective: 'Place a short call. If unanswered, leave a concise voicemail.' },
  { day: 'Day 8', channel: 'LinkedIn', objective: 'Like or comment on a recent post to remain visible without selling.' },
  { day: 'Day 10', channel: 'Email', objective: 'Send another follow‑up focused on business outcomes rather than product features.' },
  { day: 'Day 11', channel: 'Phone', objective: 'Make a second call if the account is high priority.' },
  { day: 'Day 12', channel: 'LinkedIn', objective: 'Share a relevant article or continue engaging naturally.' },
  { day: 'Day 14', channel: 'Email', objective: 'Send a final follow‑up asking whether the timing is right for a conversation.' },
];

const CadenceTable = memo(function CadenceTable() {
  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Day</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Channel</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Objective</th>
          </tr>
        </thead>
        <tbody>
          {CADENCE_ROWS.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Day">{row.day}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Channel">{row.channel}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Objective">{row.objective}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

// --- Hoisted static FAQ data ---
const FAQ_ITEMS = [
  {
    subtitle: '9.1 What is multi‑channel outreach?',
    paragraphs: ['Multi‑channel outreach is the practice of engaging prospects across multiple communication channels—such as email, LinkedIn, phone calls, and SMS—instead of relying on a single method.'],
  },
  {
    subtitle: '9.2 Why is multi‑channel outreach more effective?',
    paragraphs: ['It meets buyers where they spend time, increases visibility, builds trust through repeated exposure, and allows for a more personalized, coordinated experience. Studies show multi‑channel campaigns generate up to 287% higher purchase rates.'],
  },
  {
    subtitle: '9.3 How many channels should I use?',
    paragraphs: ['Most successful teams start with email and LinkedIn, then add phone calls for high‑priority accounts and SMS for timely reminders. The exact number depends on your audience and resources.'],
  },
  {
    subtitle: '9.4 What is a good cadence for multi‑channel outreach?',
    paragraphs: ['A typical cadence spans 10–14 days with 6–10 well‑spaced touchpoints across 2–3 channels. Each touchpoint should have a distinct purpose, and you should adjust based on engagement signals.'],
  },
  {
    subtitle: '9.5 Can I automate multi‑channel outreach?',
    paragraphs: ['Yes, platforms like 360Airo allow you to automate sequences across email, LinkedIn, SMS, and more, while still enabling personalization and tracking. Automation helps maintain consistency and saves time.'],
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
    title: 'Email vs SMS Outreach: Conversion Benchmarks',
    tag: 'Multichannel',
    href: '/blogs/email-vs-sms-outreach-conversion-benchmarks',
    description: 'Compare email and SMS for better conversions.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
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

export default function BlogMultiChannelOutreachPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/multi-channel-outreach.jpg';

  return (
    <>
      <Head>
        {/* PRIMARY META TAGS */}
        <title>Multi-Channel Outreach: Definition, Benefits &amp; Best Practices</title>
        <meta
          name="description"
          content="Learn what multi-channel outreach is, how email, LinkedIn, SMS, and other channels work together, and how to build effective outbound campaigns."
        />
        <meta
          name="keywords"
          content="multi-channel outreach, multichannel outreach, multichannel outreach strategy, multichannel sales outreach, multichannel prospecting, outbound outreach, multichannel sales engagement, email LinkedIn SMS outreach"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blog/multi-channel-outreach-explained"
        />

        {/* ROBOTS */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* OPEN GRAPH */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Multi-Channel Outreach: Definition, Benefits &amp; Best Practices"
        />
        <meta
          property="og:description"
          content="Learn what multi-channel outreach is, how email, LinkedIn, SMS, and other channels work together, and how to build effective outbound campaigns."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blog/multi-channel-outreach-explained"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Multi-Channel Outreach: Definition, Benefits &amp; Best Practices"
        />
        <meta
          name="twitter:description"
          content="Understand multi-channel outreach, its benefits, key channels, and how to build effective email, LinkedIn, and SMS outbound campaigns."
        />
        <meta name="twitter:image" content={featuredImageUrl} />

        {/* JSON‑LD: Combined @graph */}
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
                  '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#webpage',
                  'url': 'https://360airo.com/blog/multi-channel-outreach-explained',
                  'name': 'Multi-Channel Outreach Explained',
                  'description': 'Learn what multi-channel outreach is, how email, LinkedIn, SMS, and other channels work together, and how to build effective outbound campaigns.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#article',
                  'headline': 'Multi-Channel Outreach Explained',
                  'description': 'Learn what multi-channel outreach is, how email, LinkedIn, SMS, and other channels work together, and how to build effective outbound campaigns.',
                  'url': 'https://360airo.com/blog/multi-channel-outreach-explained',
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
                    '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#webpage',
                  },
                  'articleSection': 'Multichannel Outreach',
                  'keywords': [
                    'multi-channel outreach',
                    'multichannel outreach',
                    'multi-channel outreach strategy',
                    'multichannel sales outreach',
                    'multichannel prospecting',
                    'outbound outreach',
                    'multichannel sales engagement',
                    'email LinkedIn SMS outreach',
                  ],
                  'datePublished': '2026-08-18',
                  'dateModified': '2026-08-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#breadcrumb',
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
                      'name': 'Multi-Channel Outreach Explained',
                      'item': 'https://360airo.com/blog/multi-channel-outreach-explained',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://360airo.com/blog/multi-channel-outreach-explained/#faq',
                  'mainEntity': [
                    {
                      '@type': 'Question',
                      'name': 'What is multi-channel outreach?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Multi-channel outreach is a sales and marketing strategy that uses multiple communication channels, such as email, LinkedIn, SMS, and other touchpoints, to engage prospects throughout an outbound campaign.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What channels are used in multi-channel outreach?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Common channels include cold email, LinkedIn, SMS, phone calls, and other digital communication channels. The specific combination depends on the audience, campaign objective, and sales process.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'What is the difference between multichannel and omnichannel outreach?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Multichannel outreach uses multiple channels to engage prospects, while omnichannel outreach focuses on creating a connected and consistent experience across those channels, with customer interactions and context carried between touchpoints.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Is multi-channel outreach better than email outreach alone?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Multi-channel outreach can create more opportunities to engage prospects because it combines different communication channels. Its effectiveness depends on targeting, messaging, timing, personalization, channel selection, and campaign execution.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Can AI automate multi-channel outreach?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Yes. AI-powered outreach platforms can help automate prospect research, message personalization, email sequences, follow-ups, scheduling, campaign management, and reporting across multiple outreach channels.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'How do you measure multi-channel outreach success?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Multi-channel outreach can be measured using metrics such as delivery rates, engagement, replies, positive response rates, meetings booked, conversion rates, pipeline generated, revenue, and return on investment.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

        {/* PRELOAD HERO IMAGE (performance) */}
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
          type="image/webp"
        />

        {/* GLOBAL STYLES */}
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

          /* Mobile responsive: stack table cells as cards */
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
                <Link href="/blogs?category=multichannel" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Multichannel
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Multi‑Channel Outreach Explained: Why One Channel Is No Longer Enough</span>
                  <span className="sm:hidden">Multi‑Channel Outreach</span>
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
                    {/* FIX: Broken local path replaced with a working Unsplash image */}
                    <Image
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
                      alt="Multi‑channel outreach hero"
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
                    Sales Strategy
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Multi‑Channel Outreach Explained: Why One Channel Is No Longer Enough in B2B Sales
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Today's buyers don't make decisions after a single email. Learn how to combine email, LinkedIn, calls, and SMS into a coordinated outreach strategy that drives 287% higher purchase rates.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Aug 2026</span>
                    <span>• 12 min read</span>
                    <span>• 3.1K reads</span>
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
                    "Imagine receiving a cold email from a company you've never heard of.",
                    'You skim it, get distracted by another task, and forget about it.',
                    "Two days later, you notice the same salesperson viewed your LinkedIn profile. A day after that, you receive a personalized connection request referencing your company's recent expansion. Later that week, another email arrives with a relevant case study. Finally, you receive a short phone call asking if you'd be interested in learning how similar businesses solved the same challenge.",
                    "Suddenly, that company doesn't feel unfamiliar anymore.",
                    "That's the power of multi‑channel outreach.",
                    "Today's buyers don't make decisions after a single email. They research vendors, browse LinkedIn, read reviews, visit websites, and compare alternatives before responding. Reaching them through only one channel means missing countless opportunities to build familiarity and trust.",
                    'The numbers reinforce this shift. Multi‑channel campaigns generate a 287% higher purchase rate than single‑channel campaigns, while adding LinkedIn to email outreach increases reply rates by 45%. Businesses that coordinate outreach across multiple touchpoints consistently outperform those relying on email alone.',
                    "In this guide, you'll learn what multi‑channel outreach is, why it has become essential for modern sales teams, which channels deliver the best results, and how to build a high‑converting outreach cadence.",
                  ]}
                  infographic={{
                    title: 'The core insight',
                    paragraphs: ['Multi‑channel outreach isn’t about sending more messages—it’s about creating more opportunities to connect.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-multi-channel"
                  id="what-is-multi-channel"
                  title="1. What Is Multi‑Channel Outreach?"
                  showImage={false}
                  intro={[
                    'Multi‑channel outreach is the practice of engaging prospects across multiple communication channels—such as email, LinkedIn, phone calls, SMS, and other touchpoints—instead of relying on a single method.',
                    "The goal isn't to contact prospects more often.",
                    "It's to contact them more effectively.",
                    'Every buyer has different communication preferences.',
                    'Some respond quickly to emails.',
                    'Others rarely check their inbox but remain active on LinkedIn.',
                    'Enterprise buyers often appreciate a follow‑up phone call after reviewing an email.',
                    'Multi‑channel outreach recognizes these differences and creates multiple opportunities for engagement.',
                    'Instead of repeatedly sending the same email, sales teams build a coordinated experience that feels natural and relevant.',
                    'This approach increases visibility without overwhelming prospects.',
                  ]}
                  infographic={{
                    title: 'Key definition',
                    paragraphs: ['Multi‑channel = engaging prospects where they already spend time, with a consistent and personalized message.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-single-channel-fails"
                  id="why-single-channel-fails"
                  title="2. Why Single‑Channel Outreach No Longer Works"
                  showImage={false}
                  intro={[
                    'For years, cold email dominated outbound sales.',
                    'Today, inboxes are crowded.',
                    'Decision‑makers receive hundreds of emails every week, making it increasingly difficult to stand out.',
                    'Even a well‑written email can disappear beneath dozens of competing messages.',
                    "That's why relying on a single communication channel limits your chances of success.",
                    'Modern buyers move between platforms throughout the day.',
                    'They check email in the morning, browse LinkedIn between meetings, answer phone calls selectively, and research vendors online before making decisions.',
                    'Meeting buyers where they already spend time significantly improves engagement.',
                    'Rather than hoping one email gets noticed, multi‑channel outreach creates multiple opportunities to start the conversation.',
                    'More touchpoints create greater familiarity.',
                    'Greater familiarity builds trust.',
                    'Trust creates replies.',
                  ]}
                  infographic={{
                    title: 'Why email alone fails',
                    paragraphs: ['Inboxes are too crowded. Buyers are distracted. One channel is no longer enough to capture attention.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="benefits-of-omnichannel"
                  id="benefits-of-omnichannel"
                  title="3. The Benefits of Omnichannel Sales Outreach"
                  showImage={true}
                  intro={[
                    'Although the terms are sometimes used interchangeably, omnichannel sales outreach focuses on creating a connected experience across every interaction.',
                    'Each touchpoint supports the previous one instead of operating independently.',
                    'This produces several advantages.',
                  ]}
                  infographic={{
                    title: 'Key benefits',
                    paragraphs: ['Higher visibility, better brand recognition, stronger personalization, and higher conversion rates.'],
                    bullets: [
                      'Higher Visibility – prospects who miss your email may notice your LinkedIn request.',
                      'Better Brand Recognition – repeated exposure builds familiarity.',
                      'Stronger Personalization – different channels allow different types of value.',
                      'Higher Conversion Rates – coordinated outreach consistently outperforms single‑channel.',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="choosing-the-right-channels"
                  id="choosing-the-right-channels"
                  title="4. Choosing the Right Channels for Multi‑Channel Prospecting"
                  showImage={false}
                  intro={[
                    'Not every channel serves the same purpose.',
                    'The strongest multi‑channel prospecting strategies use each platform where it adds the most value.',
                  ]}
                  infographic={{
                    title: 'Channel roles',
                    paragraphs: [
                      'Email – foundation for outbound; shares insights and resources.',
                      'LinkedIn – builds credibility and professional connection.',
                      'Phone Calls – valuable for enterprise and high‑intent prospects.',
                      'SMS – best for timely reminders and confirmations after interest is shown.',
                    ],
                    bullets: [
                      'Email: personalized insights, business value, resources, scheduling.',
                      'LinkedIn: profile views, engagement, connection requests, professional conversation.',
                      'Phone Calls: short, well‑timed conversations after multiple touches.',
                      'SMS: appointment reminders, meeting confirmations (use sparingly).',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Combine email and LinkedIn for best results',
                      paragraphs: ['Research shows that adding LinkedIn to email outreach increases reply rates by 45%.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="build-a-cadence"
                  id="build-a-cadence"
                  title="5. Build a Multi‑Channel Cadence That Converts"
                  showImage={false}
                  intro={[
                    'One of the biggest mistakes in outbound sales is confusing multi‑channel outreach with simply contacting prospects more often.',
                    "Sending an email today, a LinkedIn message tomorrow, and calling twice the next day isn't a strategy—it's spam.",
                    'The purpose of a multi‑channel cadence is to create multiple meaningful touchpoints while respecting the buyer\'s time.',
                    'Each interaction should build on the previous one rather than repeating the same message.',
                    'Think of your outreach like a conversation instead of a broadcast.',
                    'Start by introducing yourself through email. Reinforce your credibility on LinkedIn. Follow up with additional insights. Use a phone call only after you\'ve established some familiarity. Every touchpoint should answer the question, \'Why should this prospect hear from me today?\'',
                    'A well‑planned cadence increases visibility without becoming intrusive.',
                  ]}
                  infographic={{
                    title: 'Cadence mindset',
                    paragraphs: ['Not more messages – better messages. Each touchpoint serves a distinct purpose.'],
                  }}
                  blocks={[
                    {
                      subtitle: 'Sample 14‑Day Multi‑Channel Outreach Cadence',
                      paragraphs: [
                        'Below is a proven sequence that spaces interactions naturally and builds trust over two weeks.',
                      ],
                    },
                  ]}
                />

                {/* Cadence Table */}
                <CadenceTable />

                <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                  <p>Notice how every touchpoint has a different purpose.</p>
                  <p>You're not repeating the same pitch.</p>
                  <p>You're gradually building trust.</p>
                </div>

                <ArticleSection
                  key="best-practices"
                  id="best-practices"
                  title="6. Best Practices for Successful Omnichannel Sales Outreach"
                  showImage={false}
                  intro={[
                    "The difference between average and exceptional outreach isn't the number of channels.",
                    "It's how well they're coordinated.",
                  ]}
                  infographic={{
                    title: 'Core principles',
                    paragraphs: ['Consistency, personalization, value‑first, natural spacing, and tracking.'],
                    bullets: [
                      'Keep Your Messaging Consistent – same value proposition across all channels.',
                      'Personalize Every Touchpoint – each channel should feel tailored, not copied.',
                      'Add Value Before Asking for Time – share insights, case studies, or market data.',
                      'Space Your Touchpoints Naturally – avoid multiple contacts in one day.',
                      'Track Every Interaction – use a CRM to avoid duplicate or conflicting outreach.',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="common-mistakes"
                  id="common-mistakes"
                  title="7. Common Multi‑Channel Outreach Mistakes"
                  showImage={false}
                  intro={[
                    'Even experienced sales teams sometimes misuse multiple channels.',
                    'Here are some mistakes to avoid.',
                  ]}
                  infographic={{
                    title: 'Avoid these pitfalls',
                    paragraphs: ['Treating every channel the same, overwhelming prospects, ignoring engagement, failing to personalize, and giving up too early.'],
                    bullets: [
                      'Treating Every Channel the Same – use each channel for its strength.',
                      'Overwhelming Prospects – space your touches; don’t attack all channels at once.',
                      'Ignoring Engagement Signals – adjust your approach based on opens, replies, or connection accepts.',
                      'Failing to Personalize – generic outreach is even more obvious across channels.',
                      'Giving Up Too Early – B2B buyers often need 6–12 touches before engaging.',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="future-of-outbound"
                  id="future-of-outbound"
                  title="8. Multi‑Channel Outreach Is the Future of Outbound Sales"
                  showImage={false}
                  intro={[
                    "Today's buyers don't interact with businesses through a single channel.",
                    'They move seamlessly between email, LinkedIn, websites, phone calls, webinars, and social media before making purchasing decisions.',
                    'Your outreach strategy should reflect that behavior.',
                    "Multi‑channel outreach isn't about increasing activity.",
                    "It's about increasing relevance.",
                    'By combining email, LinkedIn, phone calls, and other touchpoints into one coordinated strategy, businesses create more opportunities to engage buyers, build trust, and stay top of mind throughout the sales journey.',
                    "The result isn't simply higher reply rates.",
                    "It's stronger relationships, better‑qualified meetings, shorter sales cycles, and more predictable revenue.",
                    'The teams that continue relying on one communication channel will find it increasingly difficult to capture attention in crowded markets.',
                    'Those that embrace omnichannel sales outreach will consistently outperform them.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'Managing outreach across multiple platforms manually can quickly become complex. 360Airo simplifies the process by bringing together AI‑powered prospect research, personalized email campaigns, LinkedIn outreach, SMS, automated follow‑up sequences, and campaign analytics into one intelligent platform.',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Final thought',
                      paragraphs: ['Instead of switching between disconnected tools, your sales team can build coordinated multi‑channel prospecting campaigns that reach buyers through the right channel at the right time. Book a demo today.'],
                    },
                  ]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    9. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about multi‑channel outreach.']}
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