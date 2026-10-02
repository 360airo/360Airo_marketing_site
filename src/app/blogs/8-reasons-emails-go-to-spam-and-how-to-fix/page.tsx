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
  { id: 'reason-1', label: '1. Your Domain Isn\'t Properly Authenticated', arrow: true },
  { id: 'reason-2', label: '2. Your Sender Reputation Is Poor', arrow: true },
  { id: 'reason-3', label: '3. You\'re Sending Too Many Emails Too Quickly', arrow: true },
  { id: 'reason-4', label: '4. Your Email List Contains Too Many Invalid Addresses', arrow: true },
  { id: 'reason-5', label: '5. Your Emails Look Too Promotional', arrow: true },
  { id: 'reason-6', label: '6. You\'re Sending to People Who Don\'t Want Your Emails', arrow: true },
  { id: 'reason-7', label: '7. Your Sending Behavior Is Inconsistent', arrow: true },
  { id: 'reason-8', label: '8. You\'re Ignoring Recipient Engagement', arrow: true },
  { id: 'how-to-tell', label: 'How to Tell If Your Emails Are Going to Spam', arrow: true },
  { id: 'what-to-do', label: 'What to Do If Your Emails Are Already Going to Spam', arrow: true },
  { id: 'final-thoughts', label: 'Final Thoughts', arrow: true },
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
    alt: 'Emails going to spam',
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
          Deliverability
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Stop landing in spam. Fix authentication, reputation, and list quality to reach the inbox.
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
          Trust is built over time
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Sender reputation takes months to build and days to damage. Slow, consistent sending beats aggressive spikes.
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
          Improve email deliverability with 360Airo – automate domain warm-up, monitor sender reputation, verify lists, and track campaign performance from one platform.
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

export default function BlogReasonsEmailsGoToSpamPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/reasons-emails-go-to-spam.jpg';

  return (
    <>
      <Head>
        <title>8 Reasons Your Emails Go to Spam (And How to Fix Them)</title>
        <meta
          name="description"
          content="Learn the top 8 reasons your emails go to spam – from poor authentication to low engagement – and discover actionable fixes to improve deliverability and reach the inbox."
        />
        <meta
          name="keywords"
          content="email spam, deliverability, sender reputation, SPF DKIM DMARC, email authentication, bounce rate, cold email"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="8 Reasons Your Emails Go to Spam (And How to Fix Them)"
        />
        <meta
          property="og:description"
          content="Learn the top 8 reasons your emails go to spam – from poor authentication to low engagement – and discover actionable fixes to improve deliverability and reach the inbox."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="8 Reasons Your Emails Go to Spam (And How to Fix Them)"
        />
        <meta
          name="twitter:description"
          content="Learn the top 8 reasons your emails go to spam – from poor authentication to low engagement – and discover actionable fixes to improve deliverability and reach the inbox."
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
                  '@id': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix/#webpage',
                  'url': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix',
                  'name': '8 Reasons Your Emails Go to Spam (And How to Fix Them)',
                  'description': 'Learn the top 8 reasons your emails go to spam – from poor authentication to low engagement – and discover actionable fixes to improve deliverability and reach the inbox.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix/#article',
                  'headline': '8 Reasons Your Emails Go to Spam (And How to Fix Them)',
                  'description': 'Learn the top 8 reasons your emails go to spam – from poor authentication to low engagement – and discover actionable fixes to improve deliverability and reach the inbox.',
                  'url': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix',
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
                    '@id': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'email spam',
                    'deliverability',
                    'sender reputation',
                    'SPF DKIM DMARC',
                    'email authentication',
                    'bounce rate',
                    'cold email',
                  ],
                  'datePublished': '2026-10-28',
                  'dateModified': '2026-10-28',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix/#breadcrumb',
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
                      'name': 'Reasons Emails Go to Spam',
                      'item': 'https://360airo.com/blogs/reasons-emails-go-to-spam-and-how-to-fix',
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
                  <span className="hidden sm:inline">8 Reasons Your Emails Go to Spam (And How to Fix Them)</span>
                  <span className="sm:hidden">Emails Go to Spam</span>
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
                      alt="Emails going to spam hero"
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
                    8 Reasons Your Emails Go to Spam (And How to Fix Them)
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    You spend hours crafting the perfect email, but it never reaches the inbox. Discover the most common reasons emails land in spam – and actionable fixes to protect your deliverability.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 10 min read</span>
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
                    "You spend time researching prospects, writing personalized emails, and building the perfect outbound sequence. Then you hit send—and your emails end up in spam.",
                    "It's one of the most frustrating problems in B2B email outreach. And the issue isn't always your email copy. Your sender reputation, domain authentication, list quality, sending behavior, and recipient engagement can all influence whether your emails reach the inbox.",
                    "If your emails consistently land in spam, sending more won't solve the problem. You need to identify what's triggering filtering and fix the underlying issue.",
                    "Here are eight common reasons your emails go to spam—and what you can do about each one.",
                  ]}
                  infographic={{
                    title: 'The spam problem',
                    paragraphs: ['Emails land in spam for many reasons – often a combination of technical, behavioral, and content issues.'],
                    bullets: [
                      'Poor authentication',
                      'Damaged sender reputation',
                      'Aggressive sending volume',
                      'Invalid email addresses',
                      'Overly promotional content',
                      'Disengaged recipients',
                      'Inconsistent sending patterns',
                      'Ignoring engagement signals',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 1 */}
                <ArticleSection
                  key="reason-1"
                  id="reason-1"
                  title="1. Your Domain Isn't Properly Authenticated"
                  showImage={true}
                  intro={[
                    "One of the first things you should check when emails start going to spam is your domain authentication.",
                    "Email providers use authentication protocols to verify whether a message genuinely comes from an authorized sender.",
                    "The three key standards are: SPF (specifies which servers are authorized to send email for your domain), DKIM (adds a cryptographic signature that helps verify the message hasn't been altered), and DMARC (builds on SPF and DKIM and provides instructions for handling authentication failures).",
                    "How to fix it: Make sure SPF and DKIM are configured correctly and that your DMARC policy is appropriate for your organization. Don't simply copy records from another domain – your configuration should reflect your actual sending infrastructure. If you're unsure about your setup, have your technical team or email administrator verify the records.",
                  ]}
                  infographic={{
                    title: 'Authentication basics',
                    paragraphs: ['SPF, DKIM, and DMARC prove your emails are legitimate.'],
                    bullets: [
                      'SPF – authorizes sending servers',
                      'DKIM – cryptographic signature',
                      'DMARC – policy for authentication failures',
                      'Configure correctly to improve trust',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 2 */}
                <ArticleSection
                  key="reason-2"
                  id="reason-2"
                  title="2. Your Sender Reputation Is Poor"
                  showImage={false}
                  intro={[
                    "Your domain and sending infrastructure develop a reputation based on how recipients and email providers respond to your messages.",
                    "If your emails consistently generate spam complaints, high bounce rates, low engagement, unsubscribes, or suspicious sending patterns, your reputation can suffer.",
                    "Once your reputation deteriorates, future emails may be more likely to land in spam—even when the content itself is perfectly legitimate.",
                    "How to fix it: Start by identifying what caused the reputation decline. Reduce sending volume if necessary and focus on higher-quality prospects. Remove invalid addresses and suppress contacts who have previously bounced or opted out. Don't try to solve a reputation problem by simply changing your email copy and continuing to send at the same volume.",
                  ]}
                  infographic={{
                    title: 'Reputation signals',
                    paragraphs: ['Your reputation is built on recipient responses and provider feedback.'],
                    bullets: [
                      'Spam complaints',
                      'Bounce rates',
                      'Engagement (opens, replies)',
                      'Unsubscribes',
                      'Sending patterns',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 3 */}
                <ArticleSection
                  key="reason-3"
                  id="reason-3"
                  title="3. You're Sending Too Many Emails Too Quickly"
                  showImage={false}
                  intro={[
                    "Suddenly sending hundreds or thousands of cold emails from a new or previously inactive mailbox can look suspicious to receiving providers. This is particularly risky when you're launching a new outbound domain or inbox.",
                    "For example, if a mailbox normally sends a few personal emails and suddenly sends 1,000 sales emails in a day, the change in behavior can raise filtering concerns.",
                    "How to fix it: Scale your sending gradually. If you're setting up new outbound infrastructure, establish a consistent sending history before increasing volume. Maintain reasonable limits per mailbox and avoid sudden spikes. For larger campaigns, use an appropriately designed sending infrastructure rather than trying to push all your volume through one inbox.",
                  ]}
                  infographic={{
                    title: 'Scale gradually',
                    paragraphs: ['Sudden volume spikes trigger spam filters – build reputation slowly.'],
                    bullets: [
                      'Start with low daily volume',
                      'Increase by 10–20% per week',
                      'Keep per‑mailbox limits reasonable',
                      'Use multiple mailboxes for large campaigns',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 4 */}
                <ArticleSection
                  key="reason-4"
                  id="reason-4"
                  title="4. Your Email List Contains Too Many Invalid Addresses"
                  showImage={true}
                  intro={[
                    "A high bounce rate is a major warning sign for your sending reputation. If you're emailing outdated databases, purchased lists, or poorly maintained contact lists, many addresses may no longer exist.",
                    "Common causes include employees changing jobs, companies shutting down, incorrect email addresses, outdated databases, typographical errors, and disposable or inactive addresses.",
                    "How to fix it: Verify your email list before sending. Remove invalid addresses, previous hard bounces, duplicate contacts, and clearly outdated records. Continue cleaning your database regularly rather than treating verification as a one‑time task. A smaller list of accurate prospects is much more valuable than a large list filled with invalid addresses.",
                  ]}
                  infographic={{
                    title: 'List hygiene',
                    paragraphs: ['A clean list protects your reputation and improves deliverability.'],
                    bullets: [
                      'Verify every email before sending',
                      'Remove hard bounces immediately',
                      'Eliminate duplicates',
                      'Regularly re‑verify older contacts',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 5 */}
                <ArticleSection
                  key="reason-5"
                  id="reason-5"
                  title="5. Your Emails Look Too Promotional"
                  showImage={false}
                  intro={[
                    "Email filtering isn't based only on technical configuration. Content and recipient behavior also matter.",
                    "If your cold email looks like an advertisement, recipients may be more likely to ignore it, delete it, or mark it as spam. Watch out for excessive promotional language, ALL CAPS, multiple exclamation marks, misleading claims, fake urgency, overly aggressive sales language, too many links, and large image-heavy layouts.",
                    "For example: 'LIMITED TIME OFFER!!! INCREASE YOUR SALES BY 500% TODAY!' is far more likely to look promotional than: 'Quick question about your outbound process.'",
                    "How to fix it: Write emails like professional conversations. Keep your copy concise, relevant, and specific to the recipient. Avoid making unrealistic claims or stuffing your message with promotional language. Your goal should be to start a conversation—not replicate a marketing newsletter.",
                  ]}
                  infographic={{
                    title: 'Avoid promotional red flags',
                    paragraphs: ['Conversational, relevant emails outperform aggressive sales copy.'],
                    bullets: [
                      'Avoid ALL CAPS and excessive punctuation',
                      'Skip misleading claims and fake urgency',
                      'Limit links and images',
                      'Write like a professional, not a marketer',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 6 */}
                <ArticleSection
                  key="reason-6"
                  id="reason-6"
                  title="6. You're Sending to People Who Don't Want Your Emails"
                  showImage={false}
                  intro={[
                    "Even technically perfect emails can struggle if you're consistently contacting people who aren't interested.",
                    "When recipients repeatedly ignore your messages, unsubscribe, or mark them as spam, those engagement signals can hurt future campaign performance. This usually starts with poor targeting.",
                    "How to fix it: Improve your Ideal Customer Profile and segment your audience. Before adding someone to a campaign, ask: Does this person fit our target customer? Is their role relevant? Is our solution potentially useful to their company? Do we have a legitimate reason to contact them? Personalization also matters – don't personalize an irrelevant email just for the sake of adding a prospect's first name. Relevant outreach is more likely to generate positive engagement.",
                  ]}
                  infographic={{
                    title: 'Target the right people',
                    paragraphs: ['Relevance is the foundation of engagement – and engagement protects deliverability.'],
                    bullets: [
                      'Define your ICP clearly',
                      'Segment by role, industry, and need',
                      'Personalize meaningfully',
                      'Only contact those who fit your profile',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 7 */}
                <ArticleSection
                  key="reason-7"
                  id="reason-7"
                  title="7. Your Sending Behavior Is Inconsistent"
                  showImage={false}
                  intro={[
                    "Email providers look at patterns, not just individual messages.",
                    "If your sending behavior constantly changes—for example, a few emails one day followed by thousands the next—it can create unnecessary risk. The same applies when you repeatedly start and stop campaigns or suddenly change sending volumes.",
                    "How to fix it: Build a consistent sending pattern. Plan your campaign volume in advance and increase it gradually as your infrastructure and reputation support higher volumes. If performance suddenly deteriorates, don't continue scaling. Pause, investigate the cause, and make corrections first. Consistency is generally safer than aggressive spikes.",
                  ]}
                  infographic={{
                    title: 'Consistency matters',
                    paragraphs: ['Predictable sending patterns build trust with email providers.'],
                    bullets: [
                      'Maintain steady daily volume',
                      'Avoid sudden spikes',
                      'Plan campaigns in advance',
                      'Pause if performance drops – then investigate',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Reason 8 */}
                <ArticleSection
                  key="reason-8"
                  id="reason-8"
                  title="8. You're Ignoring Recipient Engagement"
                  showImage={true}
                  intro={[
                    "One of the biggest mistakes is assuming that deliverability is purely a technical problem.",
                    "You can have perfectly configured SPF, DKIM, and DMARC records and still struggle if recipients consistently ignore your emails or respond negatively.",
                    "Low engagement can indicate deeper problems with your targeting, messaging, personalization, offer, or sending frequency.",
                    "How to fix it: Monitor campaign performance beyond open rates. Track delivery rate, bounce rate, reply rate, positive reply rate, unsubscribe rate, spam complaints, and meetings generated. If engagement is consistently poor, don't simply increase your sending volume – review the audience and messaging first.",
                  ]}
                  infographic={{
                    title: 'Engagement signals',
                    paragraphs: ['Recipient behavior directly influences your reputation and inbox placement.'],
                    bullets: [
                      'Open rate',
                      'Reply rate',
                      'Positive reply rate',
                      'Unsubscribe rate',
                      'Spam complaints',
                      'Meetings generated',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Tell Section */}
                <ArticleSection
                  key="how-to-tell"
                  id="how-to-tell"
                  title="How to Tell If Your Emails Are Going to Spam"
                  showImage={false}
                  intro={[
                    "A sudden drop in campaign performance can be an early warning sign. For example, if your usual reply rate suddenly falls while your sending volume remains unchanged, investigate your deliverability before assuming the messaging is the problem.",
                    "You can also monitor bounce rates, sender reputation, authentication status, spam complaints, domain health, and inbox placement where testing tools are available.",
                    "Don't wait until your entire outbound program is affected. Early intervention makes deliverability problems easier to correct.",
                  ]}
                  infographic={{
                    title: 'Early warning signs',
                    paragraphs: ['Watch for these indicators of deliverability trouble.'],
                    bullets: [
                      'Sudden drop in reply rate',
                      'Rising bounce rate',
                      'Increased spam complaints',
                      'Authentication failures',
                      'Poor domain reputation scores',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What to Do Section */}
                <ArticleSection
                  key="what-to-do"
                  id="what-to-do"
                  title="What to Do If Your Emails Are Already Going to Spam"
                  showImage={false}
                  intro={[
                    "If you suspect your emails are consistently landing in spam, resist the temptation to immediately send more.",
                    "Instead, follow these steps:",
                  ]}
                  infographic={{
                    title: 'Recovery steps',
                    paragraphs: ['A systematic approach is better than guesswork.'],
                    bullets: [
                      'Step 1: Check authentication – verify SPF, DKIM, and DMARC',
                      'Step 2: Review your reputation – look for spikes in bounces or complaints',
                      'Step 3: Clean your list – remove invalid addresses and hard bounces',
                      'Step 4: Reduce sending volume – bring back to a sustainable level',
                      'Step 5: Review your messaging – remove promotional language',
                      'Step 6: Reassess your audience – make sure you\'re targeting ICP',
                      'Step 7: Scale gradually – increase volume slowly once fixed',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Final Thoughts */}
                <ArticleSection
                  key="final-thoughts"
                  id="final-thoughts"
                  title="Final Thoughts"
                  showImage={false}
                  intro={[
                    "Emails going to spam is rarely caused by one isolated problem. More often, it's the result of several factors working together: poor list quality, weak authentication, aggressive sending, low engagement, or messaging that recipients don't find relevant.",
                    "The best solution is to treat deliverability as an ongoing part of your outbound strategy. Keep your prospect data clean, authenticate your domain, maintain consistent sending patterns, personalize your outreach, and monitor engagement. Most importantly, don't prioritize email volume over email quality.",
                    "Modern outbound platforms can simplify much of this process by combining email infrastructure, inbox management, warm-up, personalization, sequencing, and campaign monitoring. For sales teams using 360Airo, these capabilities can help create a more controlled outbound workflow while allowing teams to scale personalized outreach.",
                    "Getting emails into the inbox is only the first step. Once they're there, your messaging still needs to earn the prospect's attention. Better deliverability starts with better sending practices—and better sending practices start before you hit Send.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams improve deliverability with domain warm‑up, sender reputation monitoring, email verification, and campaign analytics – all from one platform.',
                      'Stop landing in spam. Start reaching the inbox and generating conversations.',
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
                    title: '7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/common-cold-email-mistakes-reply-rates',
                    description: 'Avoid these 7 common cold email mistakes that destroy reply rates.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
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