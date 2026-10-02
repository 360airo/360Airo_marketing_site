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
  { id: 'what-is-sales-intelligence', label: 'What Is a Sales Intelligence Platform?', arrow: true },
  { id: 'start-with-problem', label: "Start With Your Sales Team's Actual Problem", arrow: true },
  { id: 'buying-checklist', label: 'Sales Intelligence Platform Buying Checklist', arrow: true },
  { id: 'dont-compare-on-features-alone', label: "Don't Compare Platforms on Features Alone", arrow: true },
  { id: 'check-total-cost', label: 'Check the Total Cost, Not Just the Subscription Price', arrow: true },
  { id: 'test-before-commit', label: 'Test Before You Commit', arrow: true },
  { id: 'decision-framework', label: 'A Simple Decision Framework', arrow: true },
  { id: 'when-to-choose-ai', label: 'When Should You Choose an AI Sales Platform?', arrow: true },
  { id: 'why-360airo', label: 'Why 360 Airo Can Be Worth Considering', arrow: true },
  { id: 'questions-to-ask', label: 'Questions to Ask Before Buying Sales Intelligence Software', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
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
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Choose sales intelligence platform',
    label: 'Sales Intelligence',
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

const RightPromoCards = memo(function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4 pt-2">
          Platform Selection Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Follow this practical framework to choose the right sales intelligence platform for your business.
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
          Test with real accounts
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A product demo can be polished. Test the platform with your own target accounts to see if it actually saves time.
        </p>
      </div>
    </aside>
  );
});

// --- Demo CTA Component ---
const DemoCTA = memo(function DemoCTA() {
  return (
    <div className="mt-8 rounded-[24px] bg-gradient-to-r from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] p-6 md:p-10 shadow-xl overflow-hidden relative text-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/10"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-white text-base md:text-lg leading-relaxed mb-6">
          When evaluating sales intelligence platforms for your business, reach out to 360 Airo sales team and learn how well the platform fits your sales process, target market, and expansion plans.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Talk to Sales
          </motion.button>
        </Link>
      </div>
    </div>
  );
});

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: '360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams',
    tag: 'Listicles',
    href: '/blogs/360airo-vs-zoominfo-complete-comparison',
    description: 'Compare 360 Airo and ZoomInfo side by side.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: '360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?',
    tag: 'Listicles',
    href: '/blogs/360airo-vs-apollo-which-is-better',
    description: 'Compare 360 Airo and Apollo to find the best fit for your team.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Best Sales Intelligence Platform for SMBs in 2026',
    tag: 'Listicles',
    href: '/blogs/best-sales-intelligence-platform-smb-2026',
    description: 'Discover the best sales intelligence platform for SMBs in 2026.',
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

export default function BlogChooseSalesIntelligencePage() {
  const [activeId, setActiveId] = useState('introduction');
  const activeIdRef = useRef('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  // PERF: rAF-throttled scroll + only update state when active section changes
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

  const featuredImageUrl = 'https://360airo.com/og-images/how-to-choose-sales-intelligence-platform.jpg';

  return (
    <>
      <Head>
        <title>How to Choose the Right Sales Intelligence Platform for Your Business</title>
        <meta
          name="description"
          content="Learn how to choose the right sales intelligence platform for your business. Evaluate data quality, lead enrichment, CRM integration, and more with this practical guide."
        />
        <meta
          name="keywords"
          content="choose sales intelligence platform, sales intelligence software, B2B prospecting, lead enrichment, buying signals, CRM integration"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/how-to-choose-sales-intelligence-platform"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How to Choose the Right Sales Intelligence Platform for Your Business"
        />
        <meta
          property="og:description"
          content="Learn how to choose the right sales intelligence platform for your business. Evaluate data quality, lead enrichment, CRM integration, and more with this practical guide."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/how-to-choose-sales-intelligence-platform"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Choose the Right Sales Intelligence Platform for Your Business"
        />
        <meta
          name="twitter:description"
          content="Learn how to choose the right sales intelligence platform for your business. Evaluate data quality, lead enrichment, CRM integration, and more with this practical guide."
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
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform/#webpage',
                  'url': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform',
                  'name': 'How to Choose the Right Sales Intelligence Platform for Your Business',
                  'description': 'Learn how to choose the right sales intelligence platform for your business. Evaluate data quality, lead enrichment, CRM integration, and more with this practical guide.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform/#article',
                  'headline': 'How to Choose the Right Sales Intelligence Platform for Your Business',
                  'description': 'Learn how to choose the right sales intelligence platform for your business. Evaluate data quality, lead enrichment, CRM integration, and more with this practical guide.',
                  'url': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform',
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
                    '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'choose sales intelligence platform',
                    'sales intelligence software',
                    'B2B prospecting',
                    'lead enrichment',
                    'buying signals',
                    'CRM integration',
                  ],
                  'datePublished': '2026-11-30',
                  'dateModified': '2026-11-30',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform/#breadcrumb',
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
                      'name': 'How to Choose Sales Intelligence Platform',
                      'item': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-platform',
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
                  <span className="hidden sm:inline">How to Choose the Right Sales Intelligence Platform for Your Business</span>
                  <span className="sm:hidden">Choose Sales Intelligence</span>
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
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
                      alt="Choose sales intelligence platform"
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
                    Sales Intelligence
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    How to Choose the Right Sales Intelligence Platform for Your Business
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Choosing a sales intelligence platform sounds simple until you start comparing them. Use this practical guide to evaluate data quality, lead enrichment, CRM integration, and more – and find the platform that fits your sales workflow.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 9 min read</span>
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
                    'Choosing a sales intelligence platform sounds simple until you start comparing them.',
                    'One platform promises a massive contact database. Another focuses on AI-powered prospecting. A third offers CRM integration, lead enrichment, buying signals, and automated outreach. On paper, many tools can look almost identical.',
                    "The real question is not, 'Which sales intelligence platform has the most features?'",
                    'It is: Which platform fits the way your sales team actually finds, qualifies, and converts prospects?',
                    'The right sales intelligence software should help your team spend less time searching for prospects and more time having useful conversations with the right people. It should also fit your CRM, sales process, budget, and team size without creating another complicated system your sales reps have to manage.',
                    'Here is a practical way to evaluate your options before making a decision.',
                  ]}
                  infographic={{
                    title: 'Start with fit, not features',
                    paragraphs: ['The right platform fits your sales process – not just a long feature list.'],
                    bullets: [
                      'Define your sales challenge first',
                      'Evaluate data quality and usability',
                      'Check integration with your CRM',
                      'Test before you commit',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-sales-intelligence"
                  id="what-is-sales-intelligence"
                  title="What Is a Sales Intelligence Platform?"
                  showImage={true}
                  intro={[
                    'A Sales Intelligence platform enables sales teams to locate potential buyers, learn more about their profiles, discover relevant purchase triggers, and convert this data into leads.',
                    'Rather than spending time scouring company websites, LinkedIn accounts, directories, and other similar resources for information on potential prospects, sales teams can now accomplish this through just one platform. Depending on the tool, this may include:',
                  ]}
                  infographic={{
                    title: 'What sales intelligence includes',
                    paragraphs: ['Sales intelligence platforms combine data, insights, and automation to improve prospecting.'],
                    bullets: [
                      'Business and contact databases',
                      'Lead enrichment',
                      'Company information',
                      'Contact information',
                      'Buying signals',
                      'Prospect intelligence',
                      'CRM integration',
                      'Lead qualification',
                      'Sales automation',
                      'AI sales assistance',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: "You don't need every feature",
                      paragraphs: [
                        'A small B2B sales team may care more about accurate contacts and easy CRM integration than an advanced enterprise analytics dashboard. A larger sales organization may need deeper intent data, automation, and account-level intelligence.',
                        'That is why choosing based only on the feature list can lead to the wrong purchase.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="start-with-problem"
                  id="start-with-problem"
                  title="Start With Your Sales Team's Actual Problem"
                  showImage={false}
                  intro={[
                    'Before comparing platforms, identify what is slowing your sales team down today.',
                    'For example, are your sales representatives spending hours finding contact details? Are they struggling to identify the right decision-makers? Are leads entering the CRM with incomplete information? Is your team contacting prospects without knowing whether they are actually interested in your product?',
                    'These are very different problems. If contact discovery is the biggest issue, prioritize database quality and lead enrichment. If your team struggles with timing, look for buying signals and prospect intelligence. If sales representatives are spending too much time moving data between tools, CRM integration should be high on your list.',
                    "A simple starting exercise is to ask your sales team: 'What takes up the most time before you actually speak to a prospect?' The answer can tell you more about what you need than a vendor's feature page.",
                  ]}
                  infographic={{
                    title: 'Identify your bottleneck',
                    paragraphs: ['Your biggest time-waster tells you what to prioritize.'],
                    bullets: [
                      'Contact discovery → prioritize database quality',
                      'Decision-maker identification → look for role filters',
                      'Incomplete CRM data → prioritize lead enrichment',
                      'Poor timing → look for buying signals',
                      'Data movement between tools → prioritize CRM integration',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="buying-checklist"
                  id="buying-checklist"
                  title="Sales Intelligence Platform Buying Checklist"
                  showImage={false}
                  intro={[
                    'Once you understand your requirements, evaluate each platform against the same criteria.',
                  ]}
                  infographic={{
                    title: 'Evaluation checklist',
                    paragraphs: ['Score each platform against these criteria before making a decision.'],
                    bullets: [
                      'Contact and Company Data – accuracy, freshness, coverage',
                      'Lead Enrichment – ability to fill missing fields',
                      'Buying Signals – indicators of interest or intent',
                      'CRM Integration – seamless sync, reduced manual work',
                      'Ease of Use – can your team adopt it quickly?',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: '1. Contact and Company Data',
                      paragraphs: [
                        'Data quality should be one of the first things you check. A database may contain millions of contacts, but volume does not automatically mean value. If phone numbers are outdated, job titles are incorrect, or people have moved companies, your sales team still has to do the research manually.',
                        'Look at number of contacts and companies available, coverage in your target markets, job title accuracy, company information, email availability, phone number availability, and frequency of data updates.',
                        'If possible, test the platform with a small group of accounts that your team already knows. Compare the information in the platform with your own research. That gives you a much better idea of data quality than simply looking at the size of the database.',
                      ],
                    },
                    {
                      subtitle: '2. Lead Enrichment',
                      paragraphs: [
                        'Lead enrichment can become especially important in case your CRM database holds incomplete or outdated entries. Prospect intelligence software can help enrich leads with information on size of company, industry, geography, job title, technology, etc.',
                        'For instance, let us say that a prospective customer filled in a lead form providing just their name and business email address. Without having to conduct any research by hand, salespeople can use lead enrichment to gather more context. Such context is needed for the reason that without it salespeople cannot even start communication with the customer.',
                      ],
                    },
                    {
                      subtitle: '3. Buying Signals',
                      paragraphs: [
                        "Having someone's contact information does not necessarily mean they are ready to buy. This is where buying signals can make a difference. Buying signals are indicators that a company or prospect may be showing interest in a particular product, category, or solution.",
                        'Depending on the platform, these signals could include changes in company activity, hiring patterns, technology adoption, website activity, or other business events. The value is straightforward: your sales team can prioritize prospects based on what is happening now rather than treating every lead equally.',
                        'If timing is important to your sales process, this should be an important part of your evaluation.',
                      ],
                    },
                    {
                      subtitle: '4. CRM Integration',
                      paragraphs: [
                        'Your sales intelligence platform should not become another isolated database. Check whether it works smoothly with the CRM your team already uses.',
                        'Look at how the integration handles contact creation, lead enrichment, data synchronization, duplicate records, field mapping, account information, and activity updates.',
                        'A technically available integration is not always a good integration. Ask how much manual work is involved. If sales representatives still have to copy information from one platform into another, your team may not get the efficiency gains you expected.',
                      ],
                    },
                    {
                      subtitle: '5. Ease of Use',
                      paragraphs: [
                        'This is often overlooked during buying decisions. A platform can have an impressive list of capabilities and still be difficult for salespeople to use every day.',
                        'Think about the people who will actually use the software. Can a new sales representative understand the platform without extensive training? Can they find the right prospect quickly? Can they build a list without needing help from an operations team? Can managers understand how the tool is being used?',
                        'The best sales tool is not necessarily the one with the longest feature list. It is the one your team will consistently use.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="dont-compare-on-features-alone"
                  id="dont-compare-on-features-alone"
                  title="Don't Compare Platforms on Features Alone"
                  showImage={false}
                  intro={[
                    'When comparing sales intelligence tools, it is tempting to create a spreadsheet with dozens of features and award points to each vendor. That can be useful, but it should not be the final decision-making method.',
                    'Consider three platforms. Platform A has 100 features but requires significant setup. Platform B has 60 features and fits your existing sales workflow. Platform C has 40 features but provides excellent data for your target market.',
                    "If your team needs Platform C's data and Platform B's workflow, Platform A being the 'most feature-rich' does not make it the best choice.",
                    'Instead, separate features into three categories: Must-have (without these, the platform cannot solve your problem), Useful (could improve productivity but are not essential), and Nice-to-have (interesting features that are unlikely to influence your results significantly). This makes comparison much more practical.',
                  ]}
                  infographic={{
                    title: 'Three feature categories',
                    paragraphs: ['Separate features into must-have, useful, and nice-to-have to make a practical decision.'],
                    bullets: [
                      'Must-have: Without these, the platform cannot solve your problem',
                      'Useful: Could improve productivity but are not essential',
                      'Nice-to-have: Interesting but unlikely to drive significant results',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="check-total-cost"
                  id="check-total-cost"
                  title="Check the Total Cost, Not Just the Subscription Price"
                  showImage={false}
                  intro={[
                    'Pricing is another area where businesses can make mistakes. Do not look only at the advertised monthly or annual subscription. Consider the full cost of using the platform.',
                    'Ask: How many users are included? Are additional credits charged separately? Are premium data points available only on higher plans? Does CRM integration cost extra? Are there usage limits? Is onboarding included? Will you need additional software to make the platform useful?',
                    'A cheaper platform is not necessarily cheaper if your team spends several hours every week cleaning or verifying its data. Think about the return on the investment instead. If a platform helps a sales representative save five hours every week and improves the quality of their prospect list, that productivity has a real business value.',
                  ]}
                  infographic={{
                    title: 'Total cost checklist',
                    paragraphs: ['Look beyond the headline price to understand the full cost.'],
                    bullets: [
                      'Number of users included',
                      'Additional credits and data costs',
                      'CRM integration fees',
                      'Usage limits',
                      'Onboarding costs',
                      'Need for complementary tools',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="test-before-commit"
                  id="test-before-commit"
                  title="Test Before You Commit"
                  showImage={false}
                  intro={[
                    'If a vendor offers a free trial, demo, or sample database, use it properly. Do not spend the entire trial period clicking through features.',
                    'Give the platform a real sales task. Take 20 to 50 companies from your existing target account list and try to find the right decision-makers, their contact information, relevant company details, useful buying signals, and information that can help personalize outreach. Then measure how long the process takes. Compare the results with your current process.',
                    "This gives you a practical answer to a much more important question: Does this platform actually make my sales team's job easier?",
                  ]}
                  infographic={{
                    title: 'Real-world test',
                    paragraphs: ['Test with your own accounts to see if the platform actually saves time.'],
                    bullets: [
                      'Take 20-50 target companies',
                      'Find decision-makers and contact info',
                      'Identify company details and buying signals',
                      'Measure time taken vs. current process',
                      "Ask: does this make my team's job easier?",
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="decision-framework"
                  id="decision-framework"
                  title="A Simple Decision Framework"
                  showImage={false}
                  intro={[
                    'You can use a four-step framework to narrow down your choices.',
                  ]}
                  infographic={{
                    title: '4-step decision framework',
                    paragraphs: ['Follow these steps to choose the right platform.'],
                    bullets: [
                      'Step 1: Define Your ICP – identify industries, company sizes, locations, job roles',
                      'Step 2: Identify Your Biggest Bottleneck – choose the main problem to solve',
                      'Step 3: Test the Shortlist – test 2-3 platforms with the same accounts',
                      'Step 4: Calculate the Business Value – estimate time saved and improved outcomes',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Step 1: Define Your ICP',
                      paragraphs: ['Start with your ideal customer profile. Identify the industries, company sizes, locations, job roles, and other characteristics that matter to your business. A platform is only as useful as its ability to help you find the customers you actually want.'],
                    },
                    {
                      subtitle: 'Step 2: Identify Your Biggest Bottleneck',
                      paragraphs: ['Choose the main problem you want the software to solve. It could be finding leads, finding decision-makers, enriching CRM data, identifying buying signals, prioritizing accounts, reducing manual research, or improving sales productivity. Do not try to solve every sales problem with one purchase.'],
                    },
                    {
                      subtitle: 'Step 3: Test the Shortlist',
                      paragraphs: ['Select two to three applications and test them using the same accounts and scenarios. Make a comparison regarding data quality, search functionality, enrichment, integration, ease of use, and total time saved.'],
                    },
                    {
                      subtitle: 'Step 4: Calculate the Business Value',
                      paragraphs: ['Finally, ask whether the expected improvement justifies the cost. For example, if your sales team currently spends 20 hours a week on manual prospect research and a new platform can significantly reduce that workload, estimate what that saved time is worth. Also consider whether better prospect targeting could improve meetings booked, conversion rates, or pipeline quality.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="when-to-choose-ai"
                  id="when-to-choose-ai"
                  title="When Should You Choose an AI Sales Platform?"
                  showImage={false}
                  intro={[
                    'AI can make sales intelligence software more useful, but it should not be the only reason you choose a platform.',
                    'Look at what the AI actually does. Does it help identify promising accounts? Can it summarize prospect information? Can it assist with lead qualification? Does it reduce repetitive research? Those practical applications matter more than simply having "AI" mentioned on a product page.',
                    'For B2B teams, the best AI sales platform is one where automation supports the sales process instead of making it more complicated.',
                  ]}
                  infographic={{
                    title: 'Evaluate AI practically',
                    paragraphs: ['Look at what AI actually does for your team, not just the label.'],
                    bullets: [
                      'Identifies promising accounts',
                      'Summarizes prospect information',
                      'Assists with lead qualification',
                      'Reduces repetitive research',
                      'Supports the sales process',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-360airo"
                  id="why-360airo"
                  title="Why 360 Airo Can Be Worth Considering"
                  showImage={false}
                  intro={[
                    'For businesses looking for a platform that brings prospect intelligence, lead enrichment, and sales workflows together, 360 Airo is one option to evaluate.',
                    'Its value should be considered in the context of your specific sales process rather than simply comparing the number of features it offers with competing platforms.',
                    'If your team wants to identify prospects, enrich lead information, understand accounts, and reduce the amount of manual research involved in prospecting, a unified sales intelligence approach can be useful.',
                    'The best way to decide is still to test it against your own target accounts and sales workflow.',
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      '360 Airo combines prospect intelligence, lead enrichment, and sales workflows in one platform – designed to reduce manual research and improve prospecting efficiency.',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="questions-to-ask"
                  id="questions-to-ask"
                  title="Questions to Ask Before Buying Sales Intelligence Software"
                  showImage={false}
                  intro={[
                    'Before signing a contract, ask the vendor these questions:',
                  ]}
                  infographic={{
                    title: 'Key vendor questions',
                    paragraphs: ["Ask these questions to understand what you're really getting."],
                    bullets: [
                      'How accurate is your contact data? – Ask how data is collected, verified, and updated.',
                      'How often is the database refreshed? – Outdated information quickly reduces value.',
                      'Does it cover my target market? – Ensure sufficient coverage in your region and industry.',
                      'What does the CRM integration include? – Find out exactly what data can move between systems.',
                      'Are there credit or usage limits? – Understand what happens when you reach your monthly allowance.',
                      'Can we test it with our own accounts? – A real-world test is more useful than a demo.',
                      'What happens if the data is incorrect? – Ask about replacement credits or correction options.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    'The choice of a suitable sales intelligence platform is not based on the selection of software with the largest database or best features list.',
                    'The task is to select a sales intelligence platform that resolves existing prospecting issues for your sales team without introducing additional complexities.',
                    'Define the sales process. Describe your ideal customer profile. Identify the places where the most time is wasted. Then assess the data quality, lead enrichment, buying signals, CRM integration, usability, cost, and potential value that the sales intelligence platform can bring.',
                    'And, most importantly, try before committing to anything. The software that looks great in a product demo might not be the right solution for your sales reps. The proper sales intelligence platform will seamlessly integrate into the existing sales workflow and will help your representatives to easily find, qualify, and reach out to the right prospects.',
                  ]}
                  infographic={{
                    title: 'Find the right fit',
                    paragraphs: ['Choose a platform that solves your actual prospecting challenges – not one that just looks impressive on paper.'],
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
          <RecentPosts />
        </main>
        <Footer />
      </div>
    </>
  );
}