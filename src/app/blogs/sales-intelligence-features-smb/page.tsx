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
  { id: 'feature-1', label: '1. Reliable Contact Data', arrow: true },
  { id: 'feature-2', label: '2. Lead Enrichment', arrow: true },
  { id: 'feature-3', label: '3. Company Intelligence', arrow: true },
  { id: 'feature-4', label: '4. Buying Signals', arrow: true },
  { id: 'feature-5', label: '5. Intent Data', arrow: true },
  { id: 'feature-6', label: '6. Advanced Search and Filtering', arrow: true },
  { id: 'feature-7', label: '7. AI SDR Features', arrow: true },
  { id: 'feature-8', label: '8. CRM Integration', arrow: true },
  { id: 'feature-9', label: '9. Sales Analytics', arrow: true },
  { id: 'feature-10', label: '10. Technology Intelligence', arrow: true },
  { id: 'feature-11', label: '11. Workflow Automation', arrow: true },
  { id: 'feature-12', label: '12. Personalization Support', arrow: true },
  { id: 'feature-13', label: '13. Data Export, APIs and Flexibility', arrow: true },
  { id: 'checklist', label: 'Sales Intelligence Features Checklist', arrow: true },
  { id: 'how-to-evaluate', label: 'How Should an SMB Evaluate a Sales Intelligence Platform?', arrow: true },
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
    alt: 'Sales intelligence features for SMBs',
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
          SMB Sales Intelligence
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Discover the 13 key sales intelligence features every SMB should look for to improve prospecting and pipeline.
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
          Start with your bottleneck
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Don't buy features – buy solutions. Identify your biggest prospecting challenge first, then evaluate platforms against it.
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
          Try 360Airo to learn how sales intelligence, lead enrichment, buying signals, AI-powered prospecting, and account insights can be implemented in your sales process.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Try 360Airo
          </motion.button>
        </Link>
      </div>
    </div>
  );
});

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'How Sales Intelligence Improves B2B Prospecting Accuracy',
    tag: 'Listicles',
    href: '/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
    description: 'Learn how sales intelligence improves B2B prospecting accuracy with better data and insights.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need',
    tag: 'Listicles',
    href: '/blogs/sales-intelligence-vs-crm-key-differences',
    description: 'Understand the key differences between sales intelligence and CRM, and how they work together.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'How to Choose the Right Sales Intelligence Software',
    tag: 'Listicles',
    href: '/blogs/how-to-choose-sales-intelligence-software',
    description: 'Follow this 8-step framework to choose the right sales intelligence software for your team.',
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

export default function BlogSalesIntelligenceFeaturesSMBPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/sales-intelligence-features-smb.jpg';

  return (
    <>
      <Head>
        <title>Sales Intelligence Features Every SMB Should Look For</title>
        <meta
          name="description"
          content="Discover the 13 key sales intelligence features every SMB should look for – from reliable contact data and lead enrichment to buying signals and CRM integration."
        />
        <meta
          name="keywords"
          content="sales intelligence, SMB sales, lead enrichment, buying signals, AI SDR, CRM integration, prospecting"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/sales-intelligence-features-smb"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Sales Intelligence Features Every SMB Should Look For"
        />
        <meta
          property="og:description"
          content="Discover the 13 key sales intelligence features every SMB should look for – from reliable contact data and lead enrichment to buying signals and CRM integration."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/sales-intelligence-features-smb"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sales Intelligence Features Every SMB Should Look For"
        />
        <meta
          name="twitter:description"
          content="Discover the 13 key sales intelligence features every SMB should look for – from reliable contact data and lead enrichment to buying signals and CRM integration."
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
                  '@id': 'https://360airo.com/blogs/sales-intelligence-features-smb/#webpage',
                  'url': 'https://360airo.com/blogs/sales-intelligence-features-smb',
                  'name': 'Sales Intelligence Features Every SMB Should Look For',
                  'description': 'Discover the 13 key sales intelligence features every SMB should look for – from reliable contact data and lead enrichment to buying signals and CRM integration.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/sales-intelligence-features-smb/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-features-smb/#article',
                  'headline': 'Sales Intelligence Features Every SMB Should Look For',
                  'description': 'Discover the 13 key sales intelligence features every SMB should look for – from reliable contact data and lead enrichment to buying signals and CRM integration.',
                  'url': 'https://360airo.com/blogs/sales-intelligence-features-smb',
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
                    '@id': 'https://360airo.com/blogs/sales-intelligence-features-smb/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence',
                    'SMB sales',
                    'lead enrichment',
                    'buying signals',
                    'AI SDR',
                    'CRM integration',
                    'prospecting',
                  ],
                  'datePublished': '2026-11-20',
                  'dateModified': '2026-11-20',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-features-smb/#breadcrumb',
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
                      'name': 'Sales Intelligence Features for SMBs',
                      'item': 'https://360airo.com/blogs/sales-intelligence-features-smb',
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
                  <span className="hidden sm:inline">Sales Intelligence Features Every SMB Should Look For</span>
                  <span className="sm:hidden">Sales Intelligence Features</span>
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
                      alt="Sales intelligence features for SMBs"
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
                    Sales Intelligence Features Every SMB Should Look For
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    A proper sales intelligence solution aggregates information about prospects and companies, making salespeople waste less time on searching for data and more time on effective communication. Discover the 13 key features every SMB should look for.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.1K reads</span>
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
                    "It is highly unlikely for a sales team in a small or midsize business to have sufficient time for conducting proper research on each prospective company. While the salesperson might have a list of companies to contact, there would be a lot of work to do before even sending the first email. Does the company meet the criteria for being a prospect? Who is the decision-maker? Is he still working there? Has the company grown recently? Does it have a good reason to contact the company now?",
                    "This is where sales intelligence can help.",
                    "A proper sales intelligence solution aggregates the information about prospects and companies, making the salespeople waste less time on searching for data and more time on effective communication. However, in view of so many platforms having similar functions, one might easily get entangled in the size of the database and AI claims.",
                    "What an SMB really needs is a sales intelligence solution with those features that solve sales challenges.",
                    "These are the sales intelligence features that should be taken into account.",
                  ]}
                  infographic={{
                    title: 'What SMBs really need',
                    paragraphs: ['Not every sales intelligence platform is built for small teams – focus on features that solve your specific challenges.'],
                    bullets: [
                      'Accurate and reliable data',
                      'Time-saving automation',
                      'Integration with existing workflows',
                      'Features that actually solve sales problems',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 1 */}
                <ArticleSection
                  key="feature-1"
                  id="feature-1"
                  title="1. Reliable Contact Data"
                  showImage={true}
                  intro={[
                    "The contact information is the base for the whole sales intelligence system. When it's not accurate, none of the other tools will work well.",
                    "This software needs to give you contacts that you can use for your marketing efforts, giving such information about them as their title, department, hierarchy level, business email, phone, etc.",
                    "It's important how fresh the data is as well as how many contacts are in the database. The person who was the Vice President of Sales six months ago may now be working somewhere else. And the company with 50 people last year can now employ 150 people.",
                    "When considering sales intelligence platforms, ask how often the contact information is updated and verified.",
                    "Useful features include verified business email addresses, job title and seniority, department information, phone numbers where available, company details, data verification, and regular record updates.",
                    "For a small sales team, accurate data can save hours of manual checking every week.",
                  ]}
                  infographic={{
                    title: 'Reliable contact data',
                    paragraphs: ['Accurate, fresh contact data is the foundation of effective sales intelligence.'],
                    bullets: [
                      'Verified business email addresses',
                      'Job title and seniority',
                      'Department information',
                      'Phone numbers where available',
                      'Company details',
                      'Data verification',
                      'Regular record updates',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 2 */}
                <ArticleSection
                  key="feature-2"
                  id="feature-2"
                  title="2. Lead Enrichment"
                  showImage={false}
                  intro={[
                    "Most SMBs already have some customer and prospect information stored somewhere. The problem is that those records are often incomplete.",
                    "You might have a company name and website but no employee count. You may have a contact but no current job title. Or perhaps your CRM contains hundreds of accounts with outdated information.",
                    "Lead enrichment helps fill those gaps. Depending on the platform, enrichment can add information such as company size, industry, revenue, location, decision-makers, technologies, and other firmographic details.",
                    "This is particularly useful when your sales team is working with an older CRM database. Instead of asking reps to research each account manually, enrichment can provide the missing information at scale.",
                    "The practical benefit is simple: better information leads to better qualification.",
                  ]}
                  infographic={{
                    title: 'Lead enrichment',
                    paragraphs: ['Fill missing data gaps to qualify leads faster and more accurately.'],
                    bullets: [
                      'Company size and industry',
                      'Revenue and location',
                      'Decision-makers',
                      'Technologies used',
                      'Firmographic details',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 3 */}
                <ArticleSection
                  key="feature-3"
                  id="feature-3"
                  title="3. Company Intelligence"
                  showImage={false}
                  intro={[
                    "Contact information tells you about an individual. Company intelligence gives you context about the business.",
                    "For example, imagine a rep is preparing to contact a software company. Knowing that the company has 300 employees is useful. Knowing that it recently expanded into two new markets and is hiring aggressively tells the rep much more.",
                    "Company intelligence can include employee count, revenue estimates, industry, locations, company growth, funding information, leadership, technologies, and business descriptions.",
                    "This information can help sales teams build and refine their Ideal Customer Profile. It also makes account research much faster. Instead of opening ten browser tabs before every call, a rep can get the key information from one platform.",
                  ]}
                  infographic={{
                    title: 'Company intelligence',
                    paragraphs: ['Understand the full context of a business before reaching out.'],
                    bullets: [
                      'Employee count',
                      'Revenue estimates',
                      'Industry and locations',
                      'Company growth',
                      'Funding information',
                      'Leadership',
                      'Technologies',
                      'Business descriptions',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 4 */}
                <ArticleSection
                  key="feature-4"
                  id="feature-4"
                  title="4. Buying Signals"
                  showImage={false}
                  intro={[
                    "Timing matters in sales. A company can be a perfect fit for your product and still have no reason to speak with you today. Buying signals help sales teams identify changes that may create an opportunity.",
                    "These signals can include a new funding round, expansion, hiring, leadership changes, product launches, acquisitions, or the adoption of a technology related to your solution.",
                    "Suppose you sell recruiting software. A company suddenly starts hiring dozens of people across multiple departments. That does not guarantee that the company will buy your software, but it gives your sales team a logical reason to investigate the account.",
                    "That is how buying signals should be used. They are not magic indicators that say, 'This company is ready to buy.' They provide context that helps reps decide where to spend their time first.",
                  ]}
                  infographic={{
                    title: 'Buying signals',
                    paragraphs: ['Identify changes that may indicate a potential business need.'],
                    bullets: [
                      'New funding rounds',
                      'Expansion into new markets',
                      'Hiring activity',
                      'Leadership changes',
                      'Product launches',
                      'Acquisitions',
                      'Technology adoption',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 5 */}
                <ArticleSection
                  key="feature-5"
                  id="feature-5"
                  title="5. Intent Data"
                  showImage={false}
                  intro={[
                    "Intent data takes things a step further by focusing on signals that might suggest a specific interest in a certain problem or solution.",
                    "If the company is suddenly becoming interested in material related to the problem that your product solves, this could be helpful information for your sales team.",
                    "But the keyword here is 'could.' Intent data should not be taken as a sure-fire way of predicting purchases. People look up information about products for all sorts of different reasons, and it doesn't always translate to sales.",
                    "The true value of intent data lies in its ability to prioritize. Used in combination with company fit, contact data, and other buying signals, intent information can help determine what companies deserve priority.",
                  ]}
                  infographic={{
                    title: 'Intent data',
                    paragraphs: ['Prioritize accounts based on research activity and interest signals.'],
                    bullets: [
                      'Research activity on relevant topics',
                      'Content consumption patterns',
                      'Website visits and engagement',
                      'Use in combination with fit and signals',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 6 */}
                <ArticleSection
                  key="feature-6"
                  id="feature-6"
                  title="6. Advanced Search and Filtering"
                  showImage={false}
                  intro={[
                    "A sales intelligence database is only useful if your team can find the right prospects quickly.",
                    "Basic searches are rarely enough for modern B2B prospecting. Sales teams often need to combine several criteria to build a relevant list.",
                    "For example: 'Find US SaaS companies with 100 to 500 employees, growing headcount, and a VP of Sales.' That is much more useful than searching for 'SaaS companies.'",
                    "Look for filters such as industry, location, employee count, revenue, job title, seniority, department, funding, technology, company growth, and buying signals.",
                    "Strong filtering reduces the amount of time reps spend cleaning up irrelevant results.",
                  ]}
                  infographic={{
                    title: 'Advanced search and filtering',
                    paragraphs: ['Combine multiple criteria to build precise, relevant prospect lists.'],
                    bullets: [
                      'Industry and location',
                      'Employee count and revenue',
                      'Job title and seniority',
                      'Department',
                      'Funding and technology',
                      'Company growth',
                      'Buying signals',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 7 */}
                <ArticleSection
                  key="feature-7"
                  id="feature-7"
                  title="7. AI SDR Features"
                  showImage={false}
                  intro={[
                    "AI SDR capabilities are becoming a common part of sales intelligence platforms. But SMBs should look beyond the word 'AI.' Ask what the feature actually does.",
                    "Useful AI capabilities can assist with prospect research, lead prioritization, account discovery, personalized messaging, follow-up suggestions, and repetitive sales tasks.",
                    "For example, instead of asking a rep to research ten companies manually, AI can summarize relevant company information and highlight potential reasons to contact each account.",
                    "The goal should be to help salespeople make better decisions faster. AI should not simply produce hundreds of generic emails. If every prospect receives the same message with their company name inserted, the automation is not doing much for your sales strategy.",
                  ]}
                  infographic={{
                    title: 'AI SDR features',
                    paragraphs: ['Automate research and prioritization without sacrificing relevance.'],
                    bullets: [
                      'Prospect research automation',
                      'Lead prioritization',
                      'Account discovery',
                      'Personalized messaging support',
                      'Follow-up suggestions',
                      'Repetitive task automation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 8 */}
                <ArticleSection
                  key="feature-8"
                  id="feature-8"
                  title="8. CRM Integration"
                  showImage={false}
                  intro={[
                    "Your sales intelligence platform should fit into the systems your team already uses.",
                    "If reps have to download a spreadsheet from one tool, copy information into another, and manually update the CRM, the workflow becomes unnecessarily complicated.",
                    "A useful CRM integration can support contact synchronization, account enrichment, lead creation, data updates, field mapping, and duplicate management.",
                    "Before choosing a platform, look beyond the phrase 'CRM integration.' Check exactly what data can move between systems and whether the integration supports the workflows your team actually uses.",
                  ]}
                  infographic={{
                    title: 'CRM integration',
                    paragraphs: ['Seamless integration reduces manual work and keeps data consistent.'],
                    bullets: [
                      'Contact synchronization',
                      'Account enrichment',
                      'Lead creation',
                      'Data updates',
                      'Field mapping',
                      'Duplicate management',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 9 */}
                <ArticleSection
                  key="feature-9"
                  id="feature-9"
                  title="9. Sales Analytics"
                  showImage={false}
                  intro={[
                    "Finding prospects is only one part of the job. Sales leaders also need to know whether the prospecting process is producing results.",
                    "Analytics can help teams track lead volume, qualified accounts, outreach activity, conversion rates, campaign performance, and pipeline contribution.",
                    "This matters even more for SMBs because budgets and sales teams are usually smaller. If one prospecting channel consistently produces qualified opportunities while another produces hundreds of low-quality leads, analytics can help make that difference visible.",
                    "Good reporting should make the sales process easier to understand, not bury managers under dozens of unnecessary dashboards.",
                  ]}
                  infographic={{
                    title: 'Sales analytics',
                    paragraphs: ['Track what matters – lead volume, conversion rates, and pipeline contribution.'],
                    bullets: [
                      'Lead volume',
                      'Qualified accounts',
                      'Outreach activity',
                      'Conversion rates',
                      'Campaign performance',
                      'Pipeline contribution',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 10 */}
                <ArticleSection
                  key="feature-10"
                  id="feature-10"
                  title="10. Technology Intelligence"
                  showImage={false}
                  intro={[
                    "Technology intelligence shows which tools and platforms a company is using.",
                    "This can be particularly useful when your product integrates with another technology. For example, if your software works with Salesforce, finding companies already using Salesforce could help your team identify accounts where the integration is relevant.",
                    "Technology information can also support competitive research and account qualification.",
                    "However, technology data is not always perfect. Tools can be added, removed, or replaced without being publicly announced. Treat technology intelligence as useful context rather than unquestionable fact.",
                  ]}
                  infographic={{
                    title: 'Technology intelligence',
                    paragraphs: ['Identify companies using relevant technologies for better targeting.'],
                    bullets: [
                      'Tools and platforms in use',
                      'Integration opportunities',
                      'Competitive research',
                      'Account qualification support',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 11 */}
                <ArticleSection
                  key="feature-11"
                  id="feature-11"
                  title="11. Workflow Automation"
                  showImage={false}
                  intro={[
                    "Salespeople invest an incredible number of hours in trivial administrative activities.",
                    "Adding contacts to the list, lead assignment, data record updating, enrichment initiation, and transition of leads between different stages can all be time-consuming processes that can otherwise be used for sales activity.",
                    "Workflow automation will be able to handle some of these monotonous activities. Even for an SMB, the savings of 30 minutes per salesperson per day can be huge.",
                    "It would be best to automate that activity that does not complicate the sales process.",
                  ]}
                  infographic={{
                    title: 'Workflow automation',
                    paragraphs: ['Automate repetitive tasks and save hours of manual work.'],
                    bullets: [
                      'Lead assignment',
                      'Data record updating',
                      'Enrichment initiation',
                      'Lead stage transitions',
                      'Contact list management',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 12 */}
                <ArticleSection
                  key="feature-12"
                  id="feature-12"
                  title="12. Personalization Support"
                  showImage={false}
                  intro={[
                    "Personalization does not mean adding a prospect's first name to an email.",
                    "Useful personalization comes from understanding why the prospect might care about your product.",
                    "Sales intelligence can provide information about company growth, new hires, funding, technology, expansion, leadership changes, or other relevant developments. That information gives a rep something specific to talk about.",
                    "AI can help turn these insights into outreach suggestions, but human review still matters. A salesperson should be able to check the information and adjust the message before it reaches a prospect.",
                  ]}
                  infographic={{
                    title: 'Personalization support',
                    paragraphs: ['Use insights to create relevant, specific outreach that stands out.'],
                    bullets: [
                      'Company growth and new hires',
                      'Funding and expansion',
                      'Leadership changes',
                      'Technology adoption',
                      'AI-powered outreach suggestions',
                      'Human review and adjustment',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Feature 13 */}
                <ArticleSection
                  key="feature-13"
                  id="feature-13"
                  title="13. Data Export, APIs and Flexibility"
                  showImage={false}
                  intro={[
                    "Your sales stack may become more complicated as your business grows.",
                    "Today, you may only need a CRM integration. Later, you may want to connect your sales intelligence platform with marketing automation, analytics, or internal systems.",
                    "API access, CSV exports, data imports, custom fields, and other integration options can make that easier.",
                    "SMBs do not necessarily need every technical feature from day one. But having room to expand can prevent unnecessary migration work later.",
                  ]}
                  infographic={{
                    title: 'Data export, APIs and flexibility',
                    paragraphs: ['Choose a platform that can grow with your business.'],
                    bullets: [
                      'API access',
                      'CSV exports',
                      'Data imports',
                      'Custom fields',
                      'Integration options',
                      'Room for expansion',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Checklist */}
                <ArticleSection
                  key="checklist"
                  id="checklist"
                  title="Sales Intelligence Features Checklist"
                  showImage={false}
                  intro={[
                    "Before choosing a platform, compare vendors across the features that matter most to your team:",
                  ]}
                  infographic={{
                    title: 'Feature checklist',
                    paragraphs: ['Score each platform against these features before making a decision.'],
                    bullets: [
                      '☐ Accurate contact data',
                      '☐ Lead enrichment',
                      '☐ Company intelligence',
                      '☐ Buying signals',
                      '☐ Intent data',
                      '☐ Advanced search and filtering',
                      '☐ AI SDR capabilities',
                      '☐ CRM integration',
                      '☐ Sales analytics',
                      '☐ Technology intelligence',
                      '☐ Workflow automation',
                      '☐ Personalization support',
                      '☐ API and data exports',
                      '☐ Data verification',
                      '☐ Privacy and compliance controls',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Evaluate */}
                <ArticleSection
                  key="how-to-evaluate"
                  id="how-to-evaluate"
                  title="How Should an SMB Evaluate a Sales Intelligence Platform?"
                  showImage={false}
                  intro={[
                    "Start with your biggest sales bottleneck.",
                    "Write down the tasks that take up the most time during a normal prospecting day. Then compare platforms against those specific problems.",
                    "It is also worth testing a platform with real accounts from your target market. Check whether the contact information is accurate. Look at how much company information is available. Test the search filters. Review the buying signals. See how easily the data moves into your CRM.",
                    "A live test often tells you more than a polished product demo.",
                    "You should also consider how quickly your sales team can learn the platform. A tool can have excellent data and dozens of features, but if reps find it confusing, adoption will suffer.",
                    "For an SMB, usability is not a minor detail. It directly affects whether you get value from the subscription.",
                  ]}
                  infographic={{
                    title: 'Evaluation tips for SMBs',
                    paragraphs: ['Test with real accounts, prioritize usability, and focus on your biggest bottleneck.'],
                    bullets: [
                      'Start with your biggest sales challenge',
                      'Test with real accounts from your target market',
                      'Check data accuracy and company information',
                      'Test search filters and buying signals',
                      'Evaluate CRM integration and workflow',
                      'Consider how quickly your team can learn the platform',
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
                    "Sales Intelligence Platform is not necessarily the largest database and the most feature-packed in terms of AI.",
                    "Sales Intelligence Platform is what will help your Sales Team answer three simple questions fast: Who do we need to contact? Why do we need to contact them? Why do we need to contact them now?",
                    "The data accuracy, lead enrichment, company intelligence, buying signals, intent data, search capabilities, CRM integration, analytics, and automation all work towards the answering of these questions.",
                    "In the case of SMBs, it means spending less time looking for information and more time building connections and pipelines.",
                    "While assessing sales intelligence software, pay less attention to the number of features the provider is able to demonstrate and pay more attention to the solving of the problems your sales team faces every day.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'Try 360Airo to learn how sales intelligence, lead enrichment, buying signals, AI-powered prospecting, and account insights can be implemented in your sales process.',
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
          <RecentPosts />
        </main>
        <Footer />
      </div>
    </>
  );
}