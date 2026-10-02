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
  { id: 'mistake-1', label: '1. Sending Generic Emails', arrow: true },
  { id: 'mistake-2', label: '2. Writing Emails That Are Too Long', arrow: true },
  { id: 'mistake-3', label: '3. Talking About Yourself Instead of the Prospect', arrow: true },
  { id: 'mistake-4', label: '4. Skipping Follow-Ups Too Soon', arrow: true },
  { id: 'mistake-5', label: '5. Ignoring Email Deliverability', arrow: true },
  { id: 'mistake-6', label: '6. Using Weak Calls-to-Action', arrow: true },
  { id: 'mistake-7', label: '7. Sending Without Measuring Results', arrow: true },
  { id: 'conclusion', label: 'Common Cold Email Mistakes Are Easy to Avoid', arrow: true },
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
    alt: 'Cold email mistakes',
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
          Cold Email
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Avoid these 7 common mistakes and turn your cold emails into conversations.
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
          Fix one mistake at a time
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Instead of overhauling everything, pick one mistake from this list and fix it. Small improvements compound quickly.
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
          Turn cold email best practices into better results with 360Airo – automate personalization, improve deliverability, and generate more qualified conversations.
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

export default function BlogColdEmailMistakesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/common-cold-email-mistakes.jpg';

  return (
    <>
      <Head>
        <title>7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)</title>
        <meta
          name="description"
          content="Avoid these 7 common cold email mistakes that kill reply rates. Learn how to fix generic messaging, long emails, weak CTAs, and more to improve your outreach performance."
        />
        <meta
          name="keywords"
          content="cold email mistakes, email reply rates, cold email best practices, personalization, deliverability, follow-ups, CTAs"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/common-cold-email-mistakes-reply-rates"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)"
        />
        <meta
          property="og:description"
          content="Avoid these 7 common cold email mistakes that kill reply rates. Learn how to fix generic messaging, long emails, weak CTAs, and more to improve your outreach performance."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/common-cold-email-mistakes-reply-rates"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)"
        />
        <meta
          name="twitter:description"
          content="Avoid these 7 common cold email mistakes that kill reply rates. Learn how to fix generic messaging, long emails, weak CTAs, and more to improve your outreach performance."
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
                  '@id': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates/#webpage',
                  'url': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates',
                  'name': '7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)',
                  'description': 'Avoid these 7 common cold email mistakes that kill reply rates. Learn how to fix generic messaging, long emails, weak CTAs, and more to improve your outreach performance.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates/#article',
                  'headline': '7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)',
                  'description': 'Avoid these 7 common cold email mistakes that kill reply rates. Learn how to fix generic messaging, long emails, weak CTAs, and more to improve your outreach performance.',
                  'url': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates',
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
                    '@id': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'cold email mistakes',
                    'email reply rates',
                    'cold email best practices',
                    'personalization',
                    'deliverability',
                    'follow-ups',
                    'CTAs',
                  ],
                  'datePublished': '2026-10-25',
                  'dateModified': '2026-10-25',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates/#breadcrumb',
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
                      'name': 'Common Cold Email Mistakes',
                      'item': 'https://360airo.com/blogs/common-cold-email-mistakes-reply-rates',
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
                  <span className="hidden sm:inline">7 Common Cold Email Mistakes That Kill Reply Rates</span>
                  <span className="sm:hidden">Cold Email Mistakes</span>
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
                      alt="Cold email mistakes hero"
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
                    7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    You spend hours building lists and personalizing emails – but the replies never come. Discover the 7 most common cold email mistakes that destroy reply rates and learn how to fix them.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 8 min read</span>
                    <span>• 1.6K reads</span>
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
                    "You spend hours building a prospect list.",
                    "You personalize every email, hit send, and wait for replies.",
                    "Nothing happens.",
                    "The natural assumption is that cold email no longer works.",
                    "But in reality, it often isn't the channel that's failing—it's the execution.",
                    "Small mistakes can have a significant impact on campaign performance. Generic messaging, lengthy emails, poor targeting, and weak follow-ups can all reduce engagement before prospects even consider your offer.",
                    "The good news? Most of these mistakes are easy to fix.",
                    "In this guide, we'll cover the most common cold email mistakes, explain why they hurt your campaigns, and show you the cold email best practices that consistently improve reply rates.",
                  ]}
                  infographic={{
                    title: 'The root of the problem',
                    paragraphs: ['Cold email still works – but execution mistakes often kill reply rates before you get a chance.'],
                    bullets: [
                      'Generic messaging feels like spam',
                      'Long emails get ignored',
                      "Self‑focused copy doesn&apos;t resonate",
                      'Weak follow‑ups leave opportunities on the table',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 1 */}
                <ArticleSection
                  key="mistake-1"
                  id="mistake-1"
                  title="1. Sending Generic Emails"
                  showImage={true}
                  intro={[
                    "The Mistake: One of the biggest cold email errors is sending the same message to every prospect. Emails that begin with 'We help companies increase productivity...' could be sent to thousands of businesses. Nothing about them feels relevant.",
                    "Why It Hurts: Prospects receive dozens—sometimes hundreds—of sales emails every week. If your message looks like a mass email, it will likely be ignored. In fact, 68% of consumers unsubscribe from emails because the content isn't relevant to them. While this statistic applies broadly to email marketing, the same principle applies to cold outreach: relevance drives engagement.",
                    "How to Fix It: Personalization goes beyond inserting a first name. Reference something specific, such as: a recent funding announcement, company growth, a product launch, hiring activity, industry trends, or their role and responsibilities. The goal is to show that the email was written for them, not for everyone.",
                  ]}
                  infographic={{
                    title: 'Fix generic emails',
                    paragraphs: ['Move beyond first‑name personalization to show you understand their business.'],
                    bullets: [
                      'Reference recent company news or funding',
                      'Mention hiring or product launches',
                      'Connect to industry trends',
                      'Show you researched their role',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 2 */}
                <ArticleSection
                  key="mistake-2"
                  id="mistake-2"
                  title="2. Writing Emails That Are Too Long"
                  showImage={false}
                  intro={[
                    "The Mistake: Many sales reps try to explain everything in the first email. They introduce the company, describe every feature, share customer stories, explain pricing, and end with a meeting request. The result is an email nobody wants to read.",
                    "Why It Hurts: Busy decision-makers scan emails—not study them. Research shows that emails longer than 200 words experience roughly a 50% drop in response rates. Long emails increase cognitive effort, making prospects more likely to postpone reading—or ignore the message altogether.",
                    "How to Fix It: Keep your cold email concise. Aim for fewer than 125 words—about 30 seconds of reading time. Focus on one business problem, one relevant insight, and one simple call‑to‑action. Your goal isn't to close the sale – it's to start the conversation.",
                  ]}
                  infographic={{
                    title: 'Keep it short',
                    paragraphs: ['Short emails are read, understood, and replied to more often.'],
                    bullets: [
                      'Under 125 words',
                      'One problem, one insight, one CTA',
                      '30 seconds of reading time',
                      "Start the conversation, don&apos;t close the sale",
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 3 */}
                <ArticleSection
                  key="mistake-3"
                  id="mistake-3"
                  title="3. Talking About Yourself Instead of the Prospect"
                  showImage={true}
                  intro={[
                    "The Mistake: Many cold emails begin with paragraphs describing the company. 'We're a leading provider of...' 'Our platform offers...' 'We've been helping businesses for...' The prospect hasn't yet decided why they should care.",
                    "Why It Hurts: People pay attention to problems they recognize. If your email focuses on your company before addressing their challenges, it immediately feels promotional. Prospects don't buy software because it's impressive – they buy solutions because they solve business problems.",
                    "How to Fix It: Reverse the structure. Start with the prospect. For example: ❌ 'We help sales teams automate outreach.' ✅ 'Many growing sales teams struggle to personalize outreach while managing hundreds of prospects every week.' Once you've established relevance, introduce your solution naturally. The conversation becomes about solving a problem—not promoting a product.",
                  ]}
                  infographic={{
                    title: 'Talk about them first',
                    paragraphs: ['Start with a challenge your prospect likely faces – then offer your solution.'],
                    bullets: [
                      'Begin with a problem they recognize',
                      'Show you understand their world',
                      'Introduce your solution naturally',
                      'Make it about solving, not selling',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 4 */}
                <ArticleSection
                  key="mistake-4"
                  id="mistake-4"
                  title="4. Skipping Follow-Ups Too Soon"
                  showImage={false}
                  intro={[
                    "The Mistake: Some sales teams send one email, wait a few days, and move on when there's no response.",
                    "Why It Hurts: Silence doesn't always mean lack of interest. Decision-makers are busy. Your email may have arrived during meetings, travel, or competing priorities. Giving up after one attempt means missing opportunities that simply required another touchpoint.",
                    "How to Fix It: Build a structured follow‑up sequence. Instead of repeating the same message, add value with each interaction. For example: share a relevant industry insight, mention a customer success story, offer a helpful resource, or ask a simpler question. A sequence of three to five meaningful touchpoints is often far more effective than relying on a single email. Persistence works best when every follow‑up contributes something new.",
                  ]}
                  infographic={{
                    title: 'Follow up with value',
                    paragraphs: ['Persistence pays off – but only if you add something new each time.'],
                    bullets: [
                      'Share an industry insight or case study',
                      'Offer a helpful resource',
                      'Ask a simpler question',
                      'Use 3–5 meaningful touchpoints',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 5 */}
                <ArticleSection
                  key="mistake-5"
                  id="mistake-5"
                  title="5. Ignoring Email Deliverability"
                  showImage={false}
                  intro={[
                    "The Mistake: Many teams focus entirely on copywriting while overlooking technical factors like sender reputation, authentication, and email verification.",
                    "Why It Hurts: Even the best email can't generate replies if it lands in spam. Poor deliverability reduces inbox placement, making every campaign less effective regardless of message quality.",
                    "How to Fix It: Follow essential cold email best practices before launching campaigns: warm up new email domains, configure SPF, DKIM, and DMARC, verify every email address, monitor bounce rates, and avoid sudden spikes in sending volume. Strong deliverability creates the foundation for successful outreach.",
                  ]}
                  infographic={{
                    title: 'Protect your deliverability',
                    paragraphs: ['Your email can\'t work if it never reaches the inbox.'],
                    bullets: [
                      'Warm up new domains gradually',
                      'Set up SPF, DKIM, and DMARC',
                      'Verify every email address',
                      'Monitor bounce rates',
                      'Avoid sudden volume spikes',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 6 */}
                <ArticleSection
                  key="mistake-6"
                  id="mistake-6"
                  title="6. Using Weak Calls-to-Action"
                  showImage={false}
                  intro={[
                    "The Mistake: Many cold emails end with multiple requests. 'Would you like a demo, a call, or should I send more information?' Too many choices create friction.",
                    "Why It Hurts: Decision fatigue makes people less likely to respond. If prospects have to think about what you're asking, they're more likely to do nothing.",
                    "How to Fix It: End with one simple, low‑pressure question. Examples include: 'Would you be open to a quick conversation next week?' 'Is this something you're currently exploring?' 'Would it make sense to share a few ideas?' Simple CTAs feel easier to answer – and easier questions usually receive more replies.",
                  ]}
                  infographic={{
                    title: 'One CTA wins',
                    paragraphs: ['A single, clear call‑to‑action removes friction and boosts replies.'],
                    bullets: [
                      'Ask one simple question',
                      'Make it low‑pressure',
                      'Avoid multiple choices',
                      'Easier questions = more replies',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 7 */}
                <ArticleSection
                  key="mistake-7"
                  id="mistake-7"
                  title="7. Sending Without Measuring Results"
                  showImage={true}
                  intro={[
                    "The Mistake: Some teams launch campaigns and judge success based solely on whether meetings were booked.",
                    "Why It Hurts: Without tracking performance, it's impossible to know what's working. Poor reply rates could be caused by weak subject lines, poor targeting, deliverability issues, long emails, or weak CTAs. Without data, every improvement becomes guesswork.",
                    "How to Fix It: Track key performance metrics such as open rate, reply rate, positive reply rate, bounce rate, spam complaint rate, meeting booking rate, and conversion rate. Then optimize one variable at a time. Small improvements compound into significantly better campaign performance over time.",
                  ]}
                  infographic={{
                    title: 'Measure and improve',
                    paragraphs: ['Data tells you what\'s working – and what isn\'t.'],
                    bullets: [
                      'Open rate',
                      'Reply rate',
                      'Positive reply rate',
                      'Bounce rate',
                      'Spam complaint rate',
                      'Meeting booking rate',
                      'Conversion rate',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Common Cold Email Mistakes Are Easy to Avoid"
                  showImage={false}
                  intro={[
                    "Cold email isn't becoming less effective.",
                    "Buyers are simply becoming better at recognizing irrelevant outreach.",
                    "The best‑performing campaigns don't rely on clever subject lines or aggressive sales tactics. They succeed because they personalize every message, stay concise, focus on the buyer's problem, follow up consistently, maintain strong deliverability, use clear CTAs, and continuously optimize performance.",
                    "Avoiding these common cold email mistakes can dramatically improve reply rates and help your team generate more qualified conversations.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'Building successful cold email campaigns takes more than great copy. 360Airo helps sales teams automate personalization, improve email deliverability, verify prospect lists, build intelligent follow‑up sequences, and monitor campaign performance – all from one platform.',
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
                    title: '5 Seamless.AI Alternatives & Competitors for Lead Finding (2026)',
                    tag: 'Listicles',
                    href: '/blogs/seamless-ai-alternatives-lead-finding',
                    description: 'Compare the top 5 Seamless.AI alternatives for lead finding.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)',
                    tag: 'Listicles',
                    href: '/blogs/best-instantly-alternatives-b2b-outreach',
                    description: 'Compare the top 5 Instantly alternatives for B2B outreach.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Benefits of Using Agentic AI for Sales Forecasting',
                    tag: 'AI',
                    href: '/blogs/benefits-agentic-ai-sales-forecasting',
                    description: 'Discover how Agentic AI improves forecast accuracy and pipeline visibility.',
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