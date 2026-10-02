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
  { id: 'how-we-evaluated', label: 'How We Evaluated Clay Alternatives', arrow: true },
  { id: 'alt-360airo', label: '1. 360Airo — Best Overall Clay Alternative for Complete Outbound ⭐', arrow: true },
  { id: 'alt-apollo', label: '2. Apollo.io — Best for Prospect Database and Sales Intelligence', arrow: true },
  { id: 'alt-instantly', label: '3. Instantly — Best for High-Volume Cold Email Outreach', arrow: true },
  { id: 'alt-salesforge', label: '4. Salesforge — Best for AI-Assisted Outbound Campaigns', arrow: true },
  { id: 'alt-reply', label: '5. Reply.io — Best for Sales Engagement and Outbound Automation', arrow: true },
  { id: 'alt-snov', label: '6. Snov.io — Best for Email Finding and Verification', arrow: true },
  { id: 'alt-lemlist', label: '7. Lemlist — Best for Personalized Cold Outreach', arrow: true },
  { id: 'alt-growbots', label: '8. Growbots — Best for Prospecting and Outbound Prospect Generation', arrow: true },
  { id: 'alt-lgm', label: '9. La Growth Machine — Best for Multi-Channel Outreach Automation', arrow: true },
  { id: 'alt-lead411', label: '10. Lead411 — Best for Sales Intelligence and Buyer Intent', arrow: true },
  { id: 'comparison-table', label: 'Feature Comparison', arrow: true },
  { id: 'which-alternative', label: 'Which Clay Alternative Should You Choose?', arrow: true },
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
    alt: 'Clay alternatives comparison',
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
          Clay
          <br />
          Alternatives
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the best alternatives to Clay for prospecting, outreach, and automation.
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
          Know your workflow
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The best platform depends on your biggest bottleneck – data, personalization, or campaign execution.
        </p>
      </div>
    </aside>
  );
}

// --- Feature Comparison Table (10 columns) ---
function FeatureComparisonTable() {
  const rows = [
    {
      platform: '360Airo',
      prospectDb: '✅',
      ai: '✅',
      multiChannel: '✅',
      deliverability: '✅',
      automation: '✅',
      bestFor: 'Complete outbound',
    },
    {
      platform: 'Apollo.io',
      prospectDb: '✅',
      ai: 'Limited',
      multiChannel: 'Limited',
      deliverability: 'Limited',
      automation: '✅',
      bestFor: 'Sales intelligence',
    },
    {
      platform: 'Instantly',
      prospectDb: '❌',
      ai: 'Limited',
      multiChannel: '❌',
      deliverability: '✅',
      automation: '✅',
      bestFor: 'Cold email volume',
    },
    {
      platform: 'Salesforge',
      prospectDb: 'Limited',
      ai: '✅',
      multiChannel: 'Limited',
      deliverability: '✅',
      automation: '✅',
      bestFor: 'AI email generation',
    },
    {
      platform: 'Reply.io',
      prospectDb: 'Limited',
      ai: '✅',
      multiChannel: '✅',
      deliverability: 'Limited',
      automation: '✅',
      bestFor: 'Sales engagement',
    },
    {
      platform: 'Snov.io',
      prospectDb: '✅',
      ai: 'Limited',
      multiChannel: 'Limited',
      deliverability: 'Limited',
      automation: '✅',
      bestFor: 'Email finder',
    },
    {
      platform: 'Lemlist',
      prospectDb: 'Limited',
      ai: '✅',
      multiChannel: '✅',
      deliverability: '✅',
      automation: '✅',
      bestFor: 'Personalized outreach',
    },
    {
      platform: 'Growbots',
      prospectDb: '✅',
      ai: 'Limited',
      multiChannel: 'Limited',
      deliverability: 'Limited',
      automation: '✅',
      bestFor: 'Prospect generation',
    },
    {
      platform: 'La Growth Machine',
      prospectDb: '❌',
      ai: 'Limited',
      multiChannel: '✅',
      deliverability: 'Limited',
      automation: '✅',
      bestFor: 'Sequence automation',
    },
    {
      platform: 'Lead411',
      prospectDb: '✅',
      ai: '❌',
      multiChannel: '❌',
      deliverability: '❌',
      automation: '❌',
      bestFor: 'Sales intelligence',
    },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Platform</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Prospect Database</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">AI Personalization</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Multi-Channel</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Deliverability</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Campaign Automation</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Best For</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-2 py-2 md:px-3 md:py-3 font-medium text-[#111827] whitespace-nowrap" data-label="Platform">{row.platform}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="Prospect Database">{row.prospectDb}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="AI Personalization">{row.ai}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="Multi-Channel">{row.multiChannel}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="Deliverability">{row.deliverability}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="Campaign Automation">{row.automation}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668] text-center" data-label="Best For">{row.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogClayAlternativesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/clay-alternatives.jpg';

  return (
    <>
      <Head>
        <title>10 Best Clay Alternatives for Outreach Teams in 2026</title>
        <meta
          name="description"
          content="Compare the top 10 Clay alternatives for outreach teams in 2026. Discover platforms with better prospecting, AI personalization, multi-channel engagement, and automation."
        />
        <meta
          name="keywords"
          content="Clay alternatives, outbound platforms, sales engagement, prospecting, AI personalization, 360Airo, Apollo, Instantly, Reply.io, Lemlist"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-clay-alternatives-outreach"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="10 Best Clay Alternatives for Outreach Teams in 2026"
        />
        <meta
          property="og:description"
          content="Compare the top 10 Clay alternatives for outreach teams in 2026. Discover platforms with better prospecting, AI personalization, multi-channel engagement, and automation."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-clay-alternatives-outreach"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="10 Best Clay Alternatives for Outreach Teams in 2026"
        />
        <meta
          name="twitter:description"
          content="Compare the top 10 Clay alternatives for outreach teams in 2026. Discover platforms with better prospecting, AI personalization, multi-channel engagement, and automation."
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
                  '@id': 'https://360airo.com/blogs/best-clay-alternatives-outreach/#webpage',
                  'url': 'https://360airo.com/blogs/best-clay-alternatives-outreach',
                  'name': '10 Best Clay Alternatives for Outreach Teams in 2026',
                  'description': 'Compare the top 10 Clay alternatives for outreach teams in 2026. Discover platforms with better prospecting, AI personalization, multi-channel engagement, and automation.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-clay-alternatives-outreach/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-clay-alternatives-outreach/#article',
                  'headline': '10 Best Clay Alternatives for Outreach Teams in 2026',
                  'description': 'Compare the top 10 Clay alternatives for outreach teams in 2026. Discover platforms with better prospecting, AI personalization, multi-channel engagement, and automation.',
                  'url': 'https://360airo.com/blogs/best-clay-alternatives-outreach',
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
                    '@id': 'https://360airo.com/blogs/best-clay-alternatives-outreach/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'Clay alternatives',
                    'outbound platforms',
                    'sales engagement',
                    'prospecting',
                    'AI personalization',
                    '360Airo',
                    'Apollo',
                    'Instantly',
                    'Reply.io',
                    'Lemlist',
                  ],
                  'datePublished': '2026-10-31',
                  'dateModified': '2026-10-31',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-clay-alternatives-outreach/#breadcrumb',
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
                      'name': 'Clay Alternatives',
                      'item': 'https://360airo.com/blogs/best-clay-alternatives-outreach',
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
                  <span className="hidden sm:inline">10 Best Clay Alternatives for Outreach Teams in 2026</span>
                  <span className="sm:hidden">Clay Alternatives</span>
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
                      alt="Clay alternatives comparison"
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
                    10 Best Clay Alternatives for Outreach Teams in 2026
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Clay is powerful, but it isn&apos;t the perfect fit for every team. Compare the 10 best alternatives – from all-in-one platforms like 360Airo to specialized tools for prospecting, personalization, and automation.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 12 min read</span>
                    <span>• 2.6K reads</span>
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
                    "Clay has become one of the most talked-about tools in modern outbound. Its ability to combine prospect data, enrich contacts, automate workflows, and connect with dozens of third-party tools has made it a favourite among growth teams and outbound specialists.",
                    "But Clay isn't the perfect fit for every business.",
                    "Some teams find themselves spending more time building workflows than running campaigns. Others want built-in outreach instead of connecting multiple applications. Growing sales teams often need a platform that not only enriches prospect data but also helps them personalize emails, automate follow-ups, monitor deliverability, and measure campaign performance from one place.",
                    "That's why many companies start looking for alternatives.",
                    "The good news is that there isn't a shortage of options. Whether you're looking for a complete outbound platform, better prospect data, AI-powered personalization, or multi-channel campaign management, there are several tools worth considering.",
                    "In this guide, we'll compare the ten best Clay alternatives for outreach teams, highlighting what each platform does well, where it falls short, and which type of sales team it's best suited for.",
                  ]}
                  infographic={{
                    title: 'Beyond Clay',
                    paragraphs: ['Clay excels at enrichment and workflows, but many teams need an all‑in‑one outbound platform.'],
                    bullets: [
                      'Complete outbound from prospecting to analytics',
                      'Built‑in AI personalization',
                      'Multi‑channel engagement (Email, LinkedIn, SMS)',
                      'Fewer tools to manage',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-we-evaluated"
                  id="how-we-evaluated"
                  title="How We Evaluated Clay Alternatives"
                  showImage={false}
                  intro={[
                    "No outbound platform is perfect for every business.",
                    "Instead of ranking tools based on popularity alone, we looked at the capabilities that matter most to modern sales teams.",
                    "We evaluated each platform based on:",
                  ]}
                  infographic={{
                    title: 'Evaluation criteria',
                    paragraphs: ['We compared platforms across 10 key dimensions.'],
                    bullets: [
                      'Prospect discovery and contact quality',
                      'AI-powered personalization',
                      'Email campaign management',
                      'Multi-channel outreach',
                      'Deliverability features',
                      'Workflow automation',
                      'Reporting and analytics',
                      'CRM integrations',
                      'Ease of use',
                      'Scalability for growing teams',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Alternative 1 - 360Airo */}
                <ArticleSection
                  key="alt-360airo"
                  id="alt-360airo"
                  title="1. 360Airo — Best Overall Clay Alternative for Complete Outbound ⭐"
                  showImage={true}
                  intro={[
                    "Best for: Sales teams looking for an all-in-one outbound platform.",
                    "Unlike Clay, which focuses heavily on prospect enrichment and workflow automation, 360Airo helps teams manage the entire outbound journey.",
                    "Instead of finding prospects in one tool, enriching them in another, sending campaigns elsewhere, and tracking results in a fourth platform, everything happens inside a single workspace.",
                    "Sales teams can discover verified prospects, create AI-personalized emails, launch Email, LinkedIn, and SMS campaigns, monitor deliverability, and analyze campaign performance without stitching together multiple applications.",
                    "This makes it particularly attractive for growing outbound teams that want simplicity without sacrificing functionality.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Built‑in B2B database, AI personalization, multi‑channel, and analytics.'],
                    bullets: [
                      'Built-in B2B prospect database',
                      'AI-powered email personalization',
                      'Email, LinkedIn & SMS outreach',
                      'Campaign automation',
                      'Email deliverability monitoring',
                      'Campaign analytics',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Complete outbound platform',
                        '✅ AI personalization built in',
                        '✅ Multi-channel campaigns',
                        '✅ Excellent for scaling teams',
                        '✅ Fewer tools to manage',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Teams looking only for data enrichment may not need the full platform.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 2 - Apollo.io */}
                <ArticleSection
                  key="alt-apollo"
                  id="alt-apollo"
                  title="2. Apollo.io — Best for Prospect Database and Sales Intelligence"
                  showImage={false}
                  intro={[
                    "Best for: Prospect database and sales intelligence.",
                    "Apollo.io has become one of the most widely used sales intelligence platforms thanks to its extensive contact database and integrated sales engagement features.",
                    "It offers verified B2B contacts, buying signals, email sequencing, and CRM integrations, making it a strong choice for companies that want prospecting and outreach in one solution.",
                    "Its database is one of its biggest strengths, although many users still supplement Apollo with additional deliverability or personalization tools as their outbound becomes more sophisticated.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Large database, intent signals, sequencing, and CRM integrations.'],
                    bullets: [
                      'Large B2B contact database',
                      'Buying intent signals',
                      'Email sequencing',
                      'Chrome extension',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Massive prospect database',
                        '✅ Good value for growing teams',
                        '✅ Built-in outreach',
                        '✅ Strong search filters',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Deliverability features are less comprehensive than dedicated outbound platforms.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 3 - Instantly */}
                <ArticleSection
                  key="alt-instantly"
                  id="alt-instantly"
                  title="3. Instantly — Best for High-Volume Cold Email Outreach"
                  showImage={false}
                  intro={[
                    "Best for: High-volume cold email outreach.",
                    "Instantly is designed for companies sending thousands of cold emails every month.",
                    "It focuses heavily on email automation, inbox rotation, warm-up, and campaign management, making it popular among agencies and outbound specialists.",
                    "While it excels at email volume and deliverability, it offers fewer capabilities for prospect discovery and multi-channel engagement compared to more comprehensive outbound platforms.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Unlimited accounts, warm‑up, inbox rotation, and analytics.'],
                    bullets: [
                      'Unlimited email accounts',
                      'Email warm-up',
                      'Campaign automation',
                      'Inbox rotation',
                      'Analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Excellent for large-scale email campaigns',
                        '✅ Strong deliverability tools',
                        '✅ Easy campaign management',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Limited support for LinkedIn and SMS outreach.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 4 - Salesforge */}
                <ArticleSection
                  key="alt-salesforge"
                  id="alt-salesforge"
                  title="4. Salesforge — Best for AI-Assisted Outbound Campaigns"
                  showImage={false}
                  intro={[
                    "Best for: AI-assisted outbound campaigns.",
                    "Salesforge focuses on helping sales teams write better outbound emails using AI.",
                    "The platform assists with creating personalized messaging while also supporting campaign automation and deliverability improvements.",
                    "It's a good option for teams that already have prospect data but want to improve the quality and consistency of their email outreach.",
                    "However, businesses looking for an end-to-end outbound workflow may still need additional tools for prospect discovery and broader campaign management.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI emails, personalization, automation, and deliverability.'],
                    bullets: [
                      'AI-generated emails',
                      'Personalization',
                      'Campaign automation',
                      'Deliverability optimization',
                      'Email sequences',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong AI capabilities',
                        '✅ Faster campaign creation',
                        '✅ Easy personalization',
                        '✅ Helpful for SDR teams',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ More focused on email creation than complete outbound execution.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 5 - Reply.io */}
                <ArticleSection
                  key="alt-reply"
                  id="alt-reply"
                  title="5. Reply.io — Best for Sales Engagement and Outbound Automation"
                  showImage={false}
                  intro={[
                    "Best for: Sales engagement and outbound automation.",
                    "Reply.io is a well-established sales engagement platform that helps teams automate outreach across email, LinkedIn, calls, WhatsApp, and SMS. It's designed for SDR and BDR teams that want to build structured outbound sequences while reducing repetitive manual work.",
                    "The platform also includes AI-assisted email writing, meeting scheduling, analytics, and CRM integrations, making it a strong option for organizations running consistent outbound programs.",
                    "Where Reply.io is strongest is campaign execution. However, many teams still rely on external prospect databases and enrichment tools to build their contact lists before launching campaigns.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multi‑channel sequences, AI assistant, CRM integrations, and reporting.'],
                    bullets: [
                      'Multi-channel sales sequences',
                      'AI email assistant',
                      'Email automation',
                      'CRM integrations',
                      'Campaign reporting',
                      'Meeting scheduling',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Mature sales engagement platform',
                        '✅ Supports multiple outreach channels',
                        '✅ Strong automation capabilities',
                        '✅ Easy CRM integration',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Prospect discovery isn\'t as comprehensive as dedicated sales intelligence platforms.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 6 - Snov.io */}
                <ArticleSection
                  key="alt-snov"
                  id="alt-snov"
                  title="6. Snov.io — Best for Email Finding and Verification"
                  showImage={false}
                  intro={[
                    "Best for: Email finding and verification.",
                    "Snov.io has built its reputation around helping sales teams find verified business email addresses and launch cold email campaigns from the same platform.",
                    "It's especially popular among startups, recruiters, agencies, and small sales teams that need affordable prospecting tools without investing in enterprise software.",
                    "Alongside email discovery, Snov.io offers email verification, drip campaigns, CRM functionality, and basic automation. It's a practical choice for businesses that want an all-in-one prospecting solution, although larger outbound teams may eventually require more advanced reporting and multi-channel capabilities.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email finder, verifier, automation, and CRM.'],
                    bullets: [
                      'Email finder',
                      'Email verifier',
                      'Cold email automation',
                      'Basic CRM',
                      'Chrome extension',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Affordable pricing',
                        '✅ Good email verification',
                        '✅ Easy to learn',
                        '✅ Suitable for smaller teams',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Multi-channel outreach and analytics are more limited than enterprise outbound platforms.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 7 - Lemlist */}
                <ArticleSection
                  key="alt-lemlist"
                  id="alt-lemlist"
                  title="7. Lemlist — Best for Personalized Cold Outreach"
                  showImage={false}
                  intro={[
                    "Best for: Personalized cold outreach.",
                    "Lemlist helped popularize personalized cold email campaigns by allowing sales teams to add custom images, videos, and dynamic personalization into their outreach.",
                    "Over time, the platform has evolved into a broader sales engagement solution with email automation, LinkedIn outreach, warm-up features, and campaign reporting.",
                    "Teams that prioritize creative, highly personalized outreach often find Lemlist appealing. However, organizations looking for a complete outbound ecosystem may still need separate tools for prospect discovery and sales intelligence.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Personalized images/videos, sequences, LinkedIn, and warm‑up.'],
                    bullets: [
                      'Personalized images',
                      'Personalized videos',
                      'Email sequences',
                      'LinkedIn outreach',
                      'Email warm-up',
                      'Analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Excellent personalization options',
                        '✅ Strong brand recognition',
                        '✅ Good campaign builder',
                        '✅ Supports creative outreach',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Prospect database isn\'t its primary strength.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 8 - Growbots */}
                <ArticleSection
                  key="alt-growbots"
                  id="alt-growbots"
                  title="8. Growbots — Best for Prospecting and Outbound Prospect Generation"
                  showImage={false}
                  intro={[
                    "Best for: Prospecting and outbound prospect generation.",
                    "Growbots combines a B2B contact database with outbound email capabilities, helping teams identify prospects and launch campaigns without switching between multiple applications.",
                    "Its search filters make it easy to build targeted prospect lists, while campaign automation reduces manual outreach.",
                    "Growbots works particularly well for businesses focused primarily on email outreach. Companies looking for broader multi-channel engagement may require additional tools.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Database, email campaigns, sequences, and reporting.'],
                    bullets: [
                      'Prospect database',
                      'Email campaigns',
                      'Automated sequences',
                      'Search filters',
                      'Campaign reporting',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Reliable B2B database',
                        '✅ Easy prospect search',
                        '✅ Built-in outreach',
                        '✅ Simple user interface',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Limited support for channels beyond email.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 9 - La Growth Machine */}
                <ArticleSection
                  key="alt-lgm"
                  id="alt-lgm"
                  title="9. La Growth Machine — Best for Multi-Channel Outreach Automation"
                  showImage={false}
                  intro={[
                    "Best for: Multi-channel outreach automation.",
                    "La Growth Machine helps sales teams automate outreach across Email, LinkedIn, and Twitter through structured sequences.",
                    "Instead of relying on one communication channel, users can build workflows that combine several touchpoints, helping create a more consistent buyer experience.",
                    "The platform excels at automation, but many organizations continue using separate tools for prospecting, deliverability, and analytics.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multi‑channel sequences, LinkedIn automation, and workflow builder.'],
                    bullets: [
                      'Multi-channel sequences',
                      'LinkedIn automation',
                      'Email campaigns',
                      'Workflow automation',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Flexible campaign builder',
                        '✅ Strong automation',
                        '✅ Multiple communication channels',
                        '✅ Easy workflow creation',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Requires additional tools for complete outbound operations.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 10 - Lead411 */}
                <ArticleSection
                  key="alt-lead411"
                  id="alt-lead411"
                  title="10. Lead411 — Best for Sales Intelligence and Buyer Intent"
                  showImage={false}
                  intro={[
                    "Best for: Sales intelligence and buyer intent.",
                    "Lead411 focuses on helping sales teams identify the right prospects through verified contact information, company insights, and buyer intent data.",
                    "Instead of simply providing contact details, the platform surfaces buying signals such as hiring activity, funding announcements, and company growth, allowing sales teams to prioritize accounts more effectively.",
                    "Lead411 works well alongside existing sales engagement tools, although it isn't designed to replace a complete outbound platform.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Verified contacts, intent data, company intelligence, and triggers.'],
                    bullets: [
                      'Verified contact database',
                      'Buyer intent data',
                      'Company intelligence',
                      'Sales triggers',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong sales intelligence',
                        '✅ Accurate contact data',
                        '✅ Useful buying signals',
                        '✅ Good search capabilities',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Primarily focused on prospect data rather than campaign execution.',
                      ],
                    },
                  ]}
                />

                {/* Feature Comparison Table */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Feature Comparison
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here's how the top Clay alternatives compare across key capabilities:</p>
                    </div>

                    <FeatureComparisonTable />
                  </div>
                </section>

                {/* Which Clay Alternative Should You Choose? */}
                <ArticleSection
                  key="which-alternative"
                  id="which-alternative"
                  title="Which Clay Alternative Should You Choose?"
                  showImage={false}
                  intro={[
                    "The best alternative depends on what your team is trying to improve.",
                    "If your biggest challenge is finding verified prospects, platforms like Apollo.io, Lead411, and Growbots offer strong sales intelligence capabilities.",
                    "If your priority is sending high-volume cold email campaigns, Instantly and Lemlist provide powerful automation and deliverability features.",
                    "Teams looking for advanced sales engagement may prefer Reply.io or La Growth Machine because of their structured sequence builders and multi-channel workflows.",
                    "However, if your goal is to reduce the number of tools your team manages while improving every stage of outbound, an all-in-one platform often makes more sense.",
                    "360Airo combines prospect discovery, AI-powered personalization, Email, LinkedIn and SMS outreach, campaign automation, deliverability, analytics, and CRM integrations into a single platform. Instead of stitching together multiple applications, your sales team can manage the entire outbound process from one place.",
                    "That approach not only simplifies day-to-day operations but also makes it easier to scale outbound as your business grows.",
                  ]}
                  infographic={{
                    title: 'Choose what fits your workflow',
                    paragraphs: ['Pick a platform that aligns with your biggest outbound bottleneck.'],
                    bullets: [
                      'Prospecting bottleneck → Apollo, Lead411, Growbots',
                      'Email volume → Instantly, Lemlist',
                      'Engagement sequences → Reply.io, La Growth Machine',
                      'Complete outbound → 360Airo (all‑in‑one)',
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
                    title: '10 SPF Record Mistakes That Hurt Email Deliverability',
                    tag: 'Listicles',
                    href: '/blogs/spf-record-mistakes-email-deliverability',
                    description: 'Avoid the top 10 SPF record mistakes that damage email deliverability.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '8 Reasons Your Emails Go to Spam (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/reasons-emails-go-to-spam-and-how-to-fix',
                    description: 'Learn the top 8 reasons your emails go to spam – and how to fix them.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '7 Common Cold Email Mistakes That Kill Reply Rates',
                    tag: 'Listicles',
                    href: '/blogs/common-cold-email-mistakes-reply-rates',
                    description: 'Avoid these 7 common cold email mistakes that destroy reply rates.',
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