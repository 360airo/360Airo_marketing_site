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
  { id: 'what-is-cold-email', label: '1. What Is Cold Email?', arrow: true },
  { id: 'cold-vs-warm-vs-spam', label: '2. Cold Email vs. Warm Email vs. Spam', arrow: true },
  { id: 'why-cold-email-works', label: '3. Why Cold Email Still Works', arrow: true },
  { id: 'cold-outreach-basics', label: '4. Cold Outreach Basics: What Makes a Good Cold Email?', arrow: true },
  { id: 'best-practices', label: '5. Cold Email Best Practices', arrow: true },
  { id: 'start-better-conversations', label: '6. Start Better Conversations With Cold Email', arrow: true },
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
    alt: 'Cold email explained',
    label: 'Cold Email',
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

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Beginner's Guide
          <br />
          to Cold Email
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Learn the fundamentals of B2B cold outreach and start conversations that drive revenue.
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
          Relevance beats volume
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A single, highly relevant cold email often outperforms a dozen generic ones. Invest time in research before you write.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component (matches reference styling) ---
function ComparisonTable() {
  const rows = [
    { feature: 'Relationship', cold: 'No previous relationship', warm: 'Existing relationship', spam: 'Usually none' },
    { feature: 'Personalization', cold: 'High', warm: 'High', spam: 'Very low or none' },
    { feature: 'Audience', cold: 'Carefully researched prospects', warm: 'Existing customers or leads', spam: 'Mass audience' },
    { feature: 'Purpose', cold: 'Start a conversation', warm: 'Continue an existing relationship', spam: 'Mass promotion' },
    { feature: 'Recipient Interest', cold: 'Potentially relevant', warm: 'Already interested', spam: 'Often irrelevant' },
    { feature: 'Sending Method', cold: 'Targeted outreach', warm: 'Ongoing communication', spam: 'Bulk sending' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Feature</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Cold Email</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Warm Email</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Spam Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Feature">{row.feature}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Cold Email">{row.cold}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Warm Email">{row.warm}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Spam Email">{row.spam}</td>
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
          Scale cold outreach with AI-powered prospect data, personalization, deliverability, and follow‑up automation. <br />
          <span className="font-semibold">Book a demo today</span> and turn cold emails into revenue.
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

export default function BlogWhatIsColdEmailPage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

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
          setActiveId(currentSectionId);
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

  const featuredImageUrl = 'https://360airo.com/og-images/what-is-cold-email.jpg';

  return (
    <>
      <Head>
        <title>What Is Cold Email? A Beginner's Guide to B2B Cold Outreach</title>
        <meta
          name="description"
          content="Learn what cold email is, how it differs from spam and warm email, and why it remains one of the most effective B2B sales channels. A complete beginner's guide to cold outreach."
        />
        <meta
          name="keywords"
          content="what is cold email, cold email definition, B2B cold outreach, cold email vs spam, cold outreach basics, beginner's guide cold email"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/what-is-cold-email-beginners-guide"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="What Is Cold Email? A Beginner's Guide to B2B Cold Outreach"
        />
        <meta
          property="og:description"
          content="Learn what cold email is, how it differs from spam and warm email, and why it remains one of the most effective B2B sales channels. A complete beginner's guide to cold outreach."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/what-is-cold-email-beginners-guide"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="What Is Cold Email? A Beginner's Guide to B2B Cold Outreach"
        />
        <meta
          name="twitter:description"
          content="Learn what cold email is, how it differs from spam and warm email, and why it remains one of the most effective B2B sales channels."
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
                  '@id': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide/#webpage',
                  'url': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide',
                  'name': 'What Is Cold Email? A Beginner\'s Guide to B2B Cold Outreach',
                  'description': 'Learn what cold email is, how it differs from spam and warm email, and why it remains one of the most effective B2B sales channels. A complete beginner\'s guide to cold outreach.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide/#article',
                  'headline': 'What Is Cold Email? A Beginner\'s Guide to B2B Cold Outreach',
                  'description': 'Learn what cold email is, how it differs from spam and warm email, and why it remains one of the most effective B2B sales channels.',
                  'url': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide',
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
                    '@id': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide/#webpage',
                  },
                  'articleSection': 'Cold Email',
                  'keywords': [
                    'what is cold email',
                    'cold email definition',
                    'B2B cold outreach',
                    'cold email vs spam',
                    'cold outreach basics',
                    'beginner\'s guide cold email',
                  ],
                  'datePublished': '2026-09-28',
                  'dateModified': '2026-09-28',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide/#breadcrumb',
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
                      'name': 'What Is Cold Email?',
                      'item': 'https://360airo.com/blogs/what-is-cold-email-beginners-guide',
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
                <Link href="/blogs?category=cold-email" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Cold Email
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">What Is Cold Email? A Beginner's Guide to B2B Cold Outreach</span>
                  <span className="sm:hidden">Cold Email Guide</span>
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
                      alt="What is cold email hero"
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
                    What Is Cold Email? A Beginner's Guide to B2B Cold Outreach
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Every business starts as a stranger. Cold email helps you start conversations with decision-makers who don't know you yet. Learn what cold email is, how it differs from spam, and why it remains one of the most effective B2B sales channels.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Sep 2026</span>
                    <span>• 7 min read</span>
                    <span>• 2.2K reads</span>
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
                    "Every business starts as a stranger.",
                    "Before someone becomes a customer, they first have to discover your company, understand the value you offer, and decide whether you're worth talking to.",
                    "That's where cold email comes in.",
                    "Cold email is a personalized email sent to someone with whom you've had no previous relationship, while a warm email is sent to someone who already knows your business through a previous conversation, referral, event, or interaction.",
                    "Many people assume cold email is outdated or ineffective. The numbers tell a different story.",
                    "73% of B2B buyers are open to receiving emails from vendors they've never worked with before, provided the outreach is relevant and personalized. Even more encouraging, the average cold email open rate ranges between 40% and 45%, making it one of the most effective outbound sales channels when executed correctly.",
                    "The key isn't sending more emails. It's sending better ones.",
                    "In this guide, you'll learn the cold email definition, how cold email differs from warm email and spam, why businesses continue to rely on it, and the cold outreach basics every beginner should know.",
                  ]}
                  infographic={{
                    title: 'Cold email by the numbers',
                    paragraphs: ['73% of B2B buyers are open to relevant cold emails. Average open rates: 40–45%.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-cold-email"
                  id="what-is-cold-email"
                  title="1. What Is Cold Email?"
                  showImage={false}
                  intro={[
                    "A cold email is a personalized email sent to a potential customer who has had no previous interaction with your business. Its purpose is to start a conversation—not to close a sale in the very first message.",
                    "Unlike newsletters or promotional email campaigns sent to subscribers, cold emails are directed toward carefully selected prospects who are likely to benefit from a specific product or service.",
                  ]}
                  infographic={{
                    title: 'Cold email definition',
                    paragraphs: ['Think of cold email as introducing yourself at a professional networking event. The other person doesn\'t know you yet. You don\'t begin by delivering a sales pitch. Instead, you start a conversation by showing that you understand their business or challenges.'],
                    bullets: [
                      'Focus on a business problem the recipient is likely experiencing',
                      'Explain why it might be worth discussing',
                      'Earn a reply—not an immediate sale',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why businesses use cold email',
                      paragraphs: [
                        'Cold email remains one of the most effective outbound sales strategies because it allows businesses to proactively reach decision-makers instead of waiting for inbound inquiries.',
                        'Organizations use cold email to generate qualified B2B leads, book discovery meetings, introduce new products or services, expand into new markets, build predictable sales pipeline, and start conversations with ideal customers. When targeted correctly, cold email creates opportunities that advertising or inbound marketing alone may never uncover.',
                      ],
                    },
                  ]}
                />

                {/* Section with comparison table */}
                <section id="cold-vs-warm-vs-spam" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    2. Cold Email vs. Warm Email vs. Spam
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>One of the biggest misconceptions is that cold email and spam are the same thing.</p>
                      <p>They're not.</p>
                      <p>The difference lies in relevance, intent, and personalization.</p>
                    </div>

                    {/* Comparison Table */}
                    <ComparisonTable />

                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>A cold email is intentional. Spam is indiscriminate.</p>
                    </div>

                    <ContentBlock
                      subtitle="What Is a Warm Email?"
                      paragraphs={[
                        'A warm email is sent to someone who already knows your business. Examples include existing customers, webinar attendees, referral contacts, previous sales conversations, newsletter subscribers, and event participants. Because a relationship already exists, warm emails usually generate higher engagement. Cold emails, however, create those relationships in the first place.',
                      ]}
                    />

                    <ContentBlock
                      subtitle="Why Cold Email Isn't Spam"
                      paragraphs={[
                        'Spam is sent to large numbers of people with little consideration for relevance. Cold email is the opposite. A successful cold email is personalized, relevant, research‑driven, sent to qualified prospects, and focused on solving a business problem. The recipient may not know you—but the email should demonstrate that you understand them. That\'s what separates professional outreach from spam.',
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  key="why-cold-email-works"
                  id="why-cold-email-works"
                  title="3. Why Cold Email Still Works"
                  showImage={true}
                  intro={[
                    "With LinkedIn, paid advertising, webinars, and social selling becoming increasingly popular, many businesses wonder whether cold email is still worth investing in.",
                    "The answer is yes.",
                  ]}
                  infographic={{
                    title: 'Cold email statistics',
                    paragraphs: ['73% of B2B buyers are open to receiving emails from unknown vendors when the outreach is relevant. Average cold email open rates range between 40% and 45%, significantly higher than many traditional email marketing campaigns.'],
                    bullets: [
                      'Buyers aren\'t avoiding cold emails—they\'re avoiding irrelevant ones',
                      'When outreach addresses a genuine business challenge, decision-makers often engage',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Benefits of cold outreach',
                      paragraphs: [
                        'Unlike inbound marketing, which depends on prospects finding your business, cold outreach allows you to proactively start conversations. Benefits include faster pipeline generation, direct access to decision‑makers, greater control over prospecting, scalable lead generation, and measurable campaign performance. Cold email gives businesses the ability to create opportunities instead of waiting for opportunities to arrive.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="cold-outreach-basics"
                  id="cold-outreach-basics"
                  title="4. Cold Outreach Basics: What Makes a Good Cold Email?"
                  showImage={false}
                  intro={[
                    "Successful cold email isn't about clever writing. It's about relevance.",
                    "Every message should answer one question: Why should this person care?",
                  ]}
                  infographic={{
                    title: 'The four pillars of a great cold email',
                    paragraphs: ['Focus on relevance, brevity, prospect focus, and a single CTA.'],
                    bullets: [
                      'Personalize beyond the first name – reference company news, funding, hiring, or industry trends',
                      'Keep it under 125 words – busy decision‑makers scan, not read',
                      'Focus on the prospect – start with their problem, not your company',
                      'One clear call‑to‑action – make it easy to reply',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Keep it short and relevant',
                      paragraphs: ['Busy decision‑makers don\'t read lengthy emails. They scan. Keep your cold email under 125 words, or roughly 30 seconds of reading time. Focus on one business challenge, one insight, and one call‑to‑action. Less information often leads to more replies.'],
                    },
                    {
                      subtitle: 'Focus on the prospect',
                      paragraphs: ['Avoid opening with a description of your company. Instead, begin with a problem your prospect may be facing. Compare these examples: ❌ "We\'re an AI platform that automates sales outreach." ✅ "Many growing sales teams struggle to personalize outreach while managing hundreds of prospects." The second example immediately creates relevance.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="best-practices"
                  id="best-practices"
                  title="5. Cold Email Best Practices"
                  showImage={true}
                  intro={[
                    "Writing a strong email is only one part of successful outreach.",
                    "Following proven cold email best practices improves both deliverability and response rates.",
                  ]}
                  infographic={{
                    title: 'Essential best practices',
                    paragraphs: ['Beyond the email itself, these steps protect your deliverability and performance.'],
                    bullets: [
                      'Warm up your email domain – gradually increase sending volume to establish sender reputation',
                      'Authenticate your domain – configure SPF, DKIM, and DMARC',
                      'Verify email addresses – remove invalid contacts to reduce bounces',
                      'Track and optimize – measure open rate, reply rate, bounce rate, and meeting bookings',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="start-better-conversations"
                  id="start-better-conversations"
                  title="6. Start Better Conversations With Cold Email"
                  showImage={false}
                  intro={[
                    "Cold email isn't about sending thousands of generic messages. It's about starting relevant conversations with businesses that genuinely benefit from what you offer.",
                    "When you understand what is cold email, personalize every message, and follow proven cold outreach basics, cold email becomes one of the most effective ways to generate qualified pipeline and build lasting business relationships.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'Successful cold outreach requires more than great copy. It requires accurate prospect data, strong email deliverability, intelligent personalization, and consistent follow‑up.',
                      '360Airo brings all of these capabilities together in one AI‑powered platform, helping revenue teams find qualified prospects, personalize outreach at scale, automate follow‑ups, and optimize campaign performance.',
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
                    title: 'Top 15 Mistakes That Kill Outbound Email Campaign Performance',
                    tag: 'Outbound',
                    href: '/blogs/top-15-mistakes-outbound-email',
                    description: 'Avoid common pitfalls that hurt deliverability and reply rates.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide That Gets Replies',
                    tag: 'Cold Email',
                    href: '/blogs/how-to-build-first-cold-email-campaign',
                    description: 'Learn how to build your first cold email campaign that actually gets replies.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For',
                    tag: 'AI',
                    href: '/blogs/future-of-ai-in-b2b-sales',
                    description: 'Explore the top AI trends shaping B2B sales.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                ].map((post) => (
                  <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} />
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