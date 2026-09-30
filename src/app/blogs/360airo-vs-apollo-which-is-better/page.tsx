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
  { id: 'at-a-glance', label: '360 Airo vs Apollo at a Glance', arrow: true },
  { id: 'difference', label: 'What Is the Difference Between 360 Airo and Apollo?', arrow: true },
  { id: 'contact-database', label: '1. Contact Database', arrow: true },
  { id: 'email-outreach', label: '2. Email Outreach', arrow: true },
  { id: 'linkedin-outreach', label: '3. LinkedIn Outreach', arrow: true },
  { id: 'ai-sdr', label: '4. AI SDR and Personalization', arrow: true },
  { id: 'deliverability', label: '5. Deliverability', arrow: true },
  { id: 'analytics', label: '6. Analytics and Revenue Tracking', arrow: true },
  { id: 'pricing', label: '7. Pricing: 360 Airo vs Apollo', arrow: true },
  { id: 'which-one', label: '360 Airo vs Apollo: Which One Should You Choose?', arrow: true },
  { id: 'is-360airo-better', label: 'Is 360 Airo Better Than Apollo?', arrow: true },
  { id: 'verdict', label: 'The Final Verdict', arrow: true },
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

function SectionImage() {
  const image = {
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: '360 Airo vs Apollo comparison',
    label: 'Sales Intelligence',
  };

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
        {showImage && <SectionImage />}
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
          360 Airo vs Apollo
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the two platforms and find the best sales intelligence fit for your team.
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
          Know your priority
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Choose Apollo for database depth, 360 Airo for outbound execution. Your biggest bottleneck decides.
        </p>
      </div>
    </aside>
  );
}

// --- Feature Comparison Table ---
function FeatureComparisonTable() {
  const rows = [
    { feature: 'Contact database', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Lead enrichment', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Email outreach', airo: 'Yes', apollo: 'Yes' },
    { feature: 'LinkedIn outreach', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Email warmup', airo: 'Yes', apollo: 'Yes' },
    { feature: 'AI personalization', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Unified inbox', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Sales analytics', airo: 'Yes', apollo: 'Yes' },
    { feature: 'CRM integrations', airo: 'Yes', apollo: 'Yes' },
    { feature: 'AI SDR capabilities', airo: 'Strong outbound focus', apollo: 'Available' },
    { feature: 'Free plan', airo: 'Yes', apollo: 'Yes' },
    { feature: 'Starting paid plan', airo: '$99/month', apollo: '$49/user/month annually' },
    { feature: 'Best suited for', airo: 'Outbound-focused teams', apollo: 'Broad GTM and prospecting teams' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Feature</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">360 Airo</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Apollo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-2 py-2 md:px-3 md:py-3 font-medium text-[#111827] whitespace-nowrap" data-label="Feature">{row.feature}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="360 Airo">{row.airo}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="Apollo">{row.apollo}</td>
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
          Want to see how 360 Airo fits your outbound workflow? Compare the platforms and explore the right plan for your team.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Explore 360 Airo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogAiroVsApolloBetterPage() {
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
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const featuredImageUrl = 'https://360airo.com/og-images/360airo-vs-apollo-better.jpg';

  return (
    <>
      <Head>
        <title>360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?</title>
        <meta
          name="description"
          content="Compare 360 Airo and Apollo to find the best sales intelligence platform for your team. See how they stack up on contact database, outreach, AI, pricing, and more."
        />
        <meta
          name="keywords"
          content="360 Airo vs Apollo, Apollo alternative, sales intelligence, outbound platform, AI SDR, multichannel outreach"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/360airo-vs-apollo-which-is-better"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?"
        />
        <meta
          property="og:description"
          content="Compare 360 Airo and Apollo to find the best sales intelligence platform for your team. See how they stack up on contact database, outreach, AI, pricing, and more."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/360airo-vs-apollo-which-is-better"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?"
        />
        <meta
          name="twitter:description"
          content="Compare 360 Airo and Apollo to find the best sales intelligence platform for your team. See how they stack up on contact database, outreach, AI, pricing, and more."
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
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better/#webpage',
                  'url': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better',
                  'name': '360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?',
                  'description': 'Compare 360 Airo and Apollo to find the best sales intelligence platform for your team. See how they stack up on contact database, outreach, AI, pricing, and more.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better/#article',
                  'headline': '360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?',
                  'description': 'Compare 360 Airo and Apollo to find the best sales intelligence platform for your team. See how they stack up on contact database, outreach, AI, pricing, and more.',
                  'url': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better',
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
                    '@id': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    '360 Airo vs Apollo',
                    'Apollo alternative',
                    'sales intelligence',
                    'outbound platform',
                    'AI SDR',
                    'multichannel outreach',
                  ],
                  'datePublished': '2026-11-26',
                  'dateModified': '2026-11-26',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better/#breadcrumb',
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
                      'name': '360 Airo vs Apollo',
                      'item': 'https://360airo.com/blogs/360airo-vs-apollo-which-is-better',
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
                  <span className="hidden sm:inline">360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?</span>
                  <span className="sm:hidden">360 Airo vs Apollo</span>
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
                      alt="360 Airo vs Apollo comparison"
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
                    Sales Intelligence
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    When you compare 360 Airo to Apollo, which sales intelligence software is better depends not on the number of tools but on what your sales team really needs. Compare contact databases, outreach, AI, pricing, and more.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.8K reads</span>
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
                    "When you compare 360 Airo to Apollo, which sales intelligence software is better depends not on the number of tools but on what your sales team really needs.",
                    "Apollo is a reliable sales intelligence and engagement platform. It provides a huge B2B contact database as well as prospecting, sequencing, enriching, analytics, and other sales processes. Apollo claims to have over 240 million contacts in its database.",
                    "360 Airo represents an outbound sales solution that unites the prospecting, email outreach, LinkedIn outreach, email warming, inbox management, CRM, analytics, and automation in one place. 360 Airo offers free plans as well as paid plans that start from $99 per month.",
                    "Thus, is 360 Airo better than Apollo? When your need is a good outbound sales platform with multichannel outreach and simple pricing for teams, then 360 Airo will be the better solution for you. Apollo suits when you need a large database and a comprehensive sales intelligence ecosystem.",
                    "Now let's compare them properly.",
                  ]}
                  infographic={{
                    title: 'The right tool for your team',
                    paragraphs: ['Apollo = database depth; 360 Airo = outbound execution. Choose based on your priority.'],
                    bullets: [
                      'Apollo: 240M+ contacts, broad GTM platform',
                      '360 Airo: Outbound-first, multichannel, AI SDR',
                      'Choose based on workflow, not just features',
                    ],
                  }}
                  blocks={[]}
                />

                {/* At a Glance */}
                <section id="at-a-glance" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    360 Airo vs Apollo at a Glance
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The important thing is that these platforms overlap, but they are not identical in how they approach sales.</p>
                    </div>

                    <FeatureComparisonTable />
                  </div>
                </section>

                {/* Difference */}
                <ArticleSection
                  key="difference"
                  id="difference"
                  title="What Is the Difference Between 360 Airo and Apollo?"
                  showImage={true}
                  intro={[
                    "The easiest way to understand the difference is to look at the problem each platform is trying to solve.",
                    "Apollo is built around a large sales intelligence database and then adds the tools needed to turn that data into outreach. Its platform covers prospecting, engagement, enrichment, analytics, workflows and other GTM activities.",
                    "360 Airo is more focused on the execution side of outbound sales. Instead of simply helping you find a prospect, it is designed to help you move from finding that prospect to contacting them, managing replies and tracking the outcome.",
                    "That distinction matters. A small sales team may not need a massive collection of features. It may simply need a reliable way to find relevant prospects, get their contact information, personalize outreach, send emails without damaging deliverability, reach prospects on LinkedIn, manage replies, track campaign performance, and keep the sales process organized.",
                    "That is where 360 Airo becomes interesting.",
                  ]}
                  infographic={{
                    title: 'The core difference',
                    paragraphs: ['Apollo = database-first; 360 Airo = execution-first.'],
                    bullets: [
                      'Apollo: built around a large sales intelligence database',
                      '360 Airo: built around outbound execution and workflow',
                      'Choose based on whether you need data or action',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Contact Database */}
                <ArticleSection
                  key="contact-database"
                  id="contact-database"
                  title="1. Contact Database"
                  showImage={false}
                  intro={[
                    "Apollo has a clear advantage when it comes to the sheer scale of its database. Apollo currently promotes a database of more than 240 million buyers, along with company information and prospecting filters. For sales teams that need to search through a huge number of companies and contacts, this is a major benefit.",
                    "360 Airo also provides prospect data through its ecosystem, with contact and post-built data powered by 360marco.com. The company states that its data has around 90% accuracy.",
                    "So, if database size is your number-one requirement, Apollo has the stronger proposition. But database size isn't everything. A database only becomes useful when your team can quickly turn those contacts into actual conversations.",
                  ]}
                  infographic={{
                    title: 'Database comparison',
                    paragraphs: ['Apollo has a larger database; 360 Airo offers 90% accuracy and outbound integration.'],
                    bullets: [
                      'Apollo: 240M+ contacts, 65+ filters',
                      '360 Airo: 90% data accuracy, integrated with outbound workflow',
                      'Size vs. actionability – choose your priority',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Email Outreach */}
                <ArticleSection
                  key="email-outreach"
                  id="email-outreach"
                  title="2. Email Outreach"
                  showImage={false}
                  intro={[
                    "Both platforms can handle outbound email campaigns. Apollo provides sequences and sales engagement tools that allow teams to automate prospect communication. It also offers analytics for tracking sequence performance and engagement.",
                    "360 Airo also supports email campaigns and automated sequences. Its plans include unlimited email sending, multiple mailboxes, inbox rotation, email warmup and campaign analytics depending on the plan.",
                    "This is particularly useful for teams that are serious about outbound. Instead of connecting several separate tools for sending, warming inboxes and monitoring campaigns, the core workflow can stay inside one platform.",
                    "Winner: 360 Airo for outbound-focused execution.",
                  ]}
                  infographic={{
                    title: 'Email outreach',
                    paragraphs: ['Both support email campaigns, but 360 Airo includes warmup, rotation, and analytics in one workflow.'],
                    bullets: [
                      'Unlimited email sending (360 Airo)',
                      'Multiple mailboxes and inbox rotation',
                      'Email warmup built in',
                      'Campaign analytics and tracking',
                    ],
                  }}
                  blocks={[]}
                />

                {/* LinkedIn Outreach */}
                <ArticleSection
                  key="linkedin-outreach"
                  id="linkedin-outreach"
                  title="3. LinkedIn Outreach"
                  showImage={false}
                  intro={[
                    "Modern B2B outreach rarely happens through email alone. A prospect may ignore an email but notice a LinkedIn connection request. Another person may respond better to a combination of email and LinkedIn touches.",
                    "360 Airo supports LinkedIn outreach alongside email, allowing teams to build multichannel campaigns instead of relying entirely on cold email. Its published features include LinkedIn actions such as profile views and personalized connection requests.",
                    "Apollo also supports multichannel engagement and broader sales workflows. The difference is more about how you intend to use the platform. If LinkedIn is an important part of your daily outbound process, 360 Airo's multichannel approach can make the workflow easier to manage from one place.",
                  ]}
                  infographic={{
                    title: 'LinkedIn outreach',
                    paragraphs: ['360 Airo integrates LinkedIn actions into outbound sequences; Apollo also supports multichannel.'],
                    bullets: [
                      'Profile views and connection requests',
                      'Multichannel campaigns (email + LinkedIn)',
                      'Unified workflow management',
                      'Apollo also supports LinkedIn engagement',
                    ],
                  }}
                  blocks={[]}
                />

                {/* AI SDR */}
                <ArticleSection
                  key="ai-sdr"
                  id="ai-sdr"
                  title="4. AI SDR and Personalization"
                  showImage={false}
                  intro={[
                    "This is where sales platforms are changing quickly. Instead of asking a salesperson to research every prospect, write every email and decide every follow-up manually, modern tools can automate parts of that process.",
                    "Apollo has continued expanding its AI capabilities. Its 2026 product updates include an AI Assistant designed to help users decide who to target, what to send and what to do next.",
                    "360 Airo also puts AI personalization and automation at the centre of its outbound workflow. Its paid plans include AI credits, while higher plans offer more advanced AI automation.",
                    "For a sales team, the real question isn't whether a platform has AI. It is whether the automation actually removes work. If your team wants help with repetitive prospecting and outreach tasks, both platforms can help. If you want an outbound-first platform where these workflows sit close to email, LinkedIn and campaign execution, 360 Airo has a strong case.",
                  ]}
                  infographic={{
                    title: 'AI capabilities',
                    paragraphs: ['Both platforms offer AI, but 360 Airo focuses on outbound automation.'],
                    bullets: [
                      '360 Airo: AI SDR for prospecting, personalization, and follow-ups',
                      'Apollo: AI Assistant for targeting and recommendations',
                      'Choose based on how you want AI to fit your workflow',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Deliverability */}
                <ArticleSection
                  key="deliverability"
                  id="deliverability"
                  title="5. Deliverability"
                  showImage={false}
                  intro={[
                    "This is one area sales teams shouldn't overlook. You can have the best prospect list in the world, but if your emails land in spam, the list doesn't matter.",
                    "360 Airo includes email warmup, inbox rotation and deliverability monitoring in its platform. Its dashboard also tracks sender health, warmup activity, inbox placement and related performance metrics. That makes deliverability part of the actual outreach workflow rather than something your team has to manage separately.",
                    "Apollo also focuses heavily on email quality and verification. Its platform uses verified contact data and credit-based access to contact information.",
                    "For teams running high-volume outbound campaigns, however, having warmup and inbox management directly within the outreach platform can simplify operations.",
                    "Winner: 360 Airo for teams that want deliverability tools built directly into their outbound workflow.",
                  ]}
                  infographic={{
                    title: 'Deliverability features',
                    paragraphs: ['360 Airo includes warmup, rotation, and monitoring in the workflow; Apollo focuses on verification.'],
                    bullets: [
                      'Email warmup built in',
                      'Inbox rotation',
                      'Deliverability monitoring',
                      'Sender health tracking',
                      'Apollo: verified contact data and credit-based access',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Analytics */}
                <ArticleSection
                  key="analytics"
                  id="analytics"
                  title="6. Analytics and Revenue Tracking"
                  showImage={false}
                  intro={[
                    "Sending hundreds of emails isn't the same as generating revenue. You need to know which campaigns are getting replies, which messages are working and how many meetings are actually being booked.",
                    "Both platforms offer analytics. Apollo provides dashboards and reports for prospecting and engagement activity, including sequence performance and outbound metrics.",
                    "360 Airo also provides campaign and revenue analytics, including metrics such as opens, replies, bounces, appointments and revenue generated.",
                    "For a small sales team, this kind of visibility can be especially useful because you don't want to spend hours putting reports together manually.",
                  ]}
                  infographic={{
                    title: 'Analytics and tracking',
                    paragraphs: ['Both platforms provide analytics, but 360 Airo focuses on campaign and revenue outcomes.'],
                    bullets: [
                      'Opens, replies, bounces, appointments',
                      'Revenue generated tracking',
                      'Campaign performance dashboards',
                      'Apollo: sequence and engagement analytics',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Pricing */}
                <ArticleSection
                  key="pricing"
                  id="pricing"
                  title="7. Pricing: 360 Airo vs Apollo"
                  showImage={false}
                  intro={[
                    "Pricing is where the comparison becomes particularly interesting.",
                    "360 Airo has a free plan. Its Starter plan starts at $99 per month, while the Pro plan starts at $299 per month. The Starter plan includes up to 5,000 email contacts, 8 mailboxes and 3 users, while Pro increases the limits to 25,000 contacts, 20 mailboxes and 5 users.",
                    "Apollo also has a free plan. Its published annual pricing currently starts at $49 per user per month for Basic, followed by $79 for Professional and $119 for Organization. Apollo's pricing is based partly around credits and user plans.",
                    "At first glance, Apollo looks cheaper. But don't compare the headline monthly number alone. The pricing structures are different. Apollo's plans are primarily user-based, while 360 Airo's plans bundle multiple mailboxes, users, contacts and outreach capabilities into its packages.",
                    "For a team running multiple inboxes and outbound campaigns, the actual cost should be calculated based on number of users, number of mailboxes, contact requirements, email volume, LinkedIn seats, verification requirements, AI usage, and number of campaigns.",
                    "Apollo wins on the lower entry price for individual users. 360 Airo can make more sense for teams that need a bundled outbound setup.",
                  ]}
                  infographic={{
                    title: 'Pricing comparison',
                    paragraphs: ['Apollo has lower per-user entry pricing; 360 Airo bundles outbound infrastructure.'],
                    bullets: [
                      '360 Airo: Free, Starter ($99), Pro ($299)',
                      'Starter: 5,000 contacts, 8 mailboxes, 3 users',
                      'Apollo: Free, Basic ($49/user), Professional ($79), Organization ($119)',
                      'Apollo: user-based + credits; 360 Airo: bundled outbound setup',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Which One */}
                <ArticleSection
                  key="which-one"
                  id="which-one"
                  title="360 Airo vs Apollo: Which One Should You Choose?"
                  showImage={false}
                  intro={[
                    "There isn't one correct answer for every sales team.",
                    "Choose Apollo if you need access to a very large B2B contact database, prospect research is your biggest priority, you want extensive prospecting filters, you need a broad GTM platform, your team wants sales intelligence and engagement in one ecosystem, and you are comfortable with user-based and credit-based pricing.",
                    "Choose 360 Airo if your main focus is outbound sales, you want email and LinkedIn outreach together, you need multiple mailboxes, deliverability is a major concern, you want email warmup and inbox rotation built into the workflow, you want AI personalization for campaigns, you prefer a platform designed around executing outbound campaigns, and you want a bundled solution for a growing sales team.",
                  ]}
                  infographic={{
                    title: 'Decision guide',
                    paragraphs: ['Choose Apollo for database, 360 Airo for outbound execution.'],
                    bullets: [
                      'Apollo: large database, prospecting filters, broad GTM',
                      '360 Airo: outbound-first, multichannel, AI SDR, deliverability',
                      'For execution-focused teams, 360 Airo is the better fit',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Is 360 Airo Better? */}
                <ArticleSection
                  key="is-360airo-better"
                  id="is-360airo-better"
                  title="Is 360 Airo Better Than Apollo?"
                  showImage={false}
                  intro={[
                    "For pure database size, Apollo is ahead. There is no reason to pretend otherwise. Apollo has built a huge contact database and a broad sales intelligence platform.",
                    "But a sales intelligence platform should not be judged only by how many contacts it can show you. The bigger question is what happens after you find the lead. Do you have to move that lead between multiple tools? Can you reach them through different channels? Can you manage multiple inboxes? Can you protect email deliverability? Can you personalize outreach? Can you see which campaigns are actually producing meetings?",
                    "This is where 360 Airo can be the better fit for an outbound-focused team. It brings prospecting and outreach closer together, while features such as email warmup, inbox rotation, LinkedIn outreach, campaign analytics and unified inbox management are designed around the day-to-day reality of outbound sales.",
                  ]}
                  infographic={{
                    title: 'The real question',
                    paragraphs: ['A platform should be judged by what happens after you find the lead, not just by database size.'],
                    bullets: [
                      'Can you move leads between tools seamlessly?',
                      'Can you reach prospects through different channels?',
                      'Can you manage multiple inboxes and protect deliverability?',
                      'Can you personalize outreach and track meetings?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Verdict */}
                <ArticleSection
                  key="verdict"
                  id="verdict"
                  title="The Final Verdict"
                  showImage={false}
                  intro={[
                    "So, 360 Airo vs Apollo: which sales intelligence platform is better?",
                    "If your priority is the largest possible contact database and a broad sales intelligence ecosystem, Apollo is a strong choice.",
                    "If your priority is turning prospects into conversations through practical, multichannel outbound execution, 360 Airo deserves serious consideration.",
                    "For startups, SMBs and growing B2B sales teams, the decision should come down to workflow rather than feature count. You don't need a platform that looks impressive on a feature page. You need one that helps your team find the right prospects, reach them consistently, manage conversations and ultimately book more meetings.",
                    "That is the lens through which 360 Airo should be compared with Apollo.",
                  ]}
                  infographic={{
                    title: 'The verdict',
                    paragraphs: ['360 Airo wins for outbound execution; Apollo wins for database depth.'],
                    bullets: [
                      'Apollo: largest database, broad ecosystem',
                      '360 Airo: outbound-first, AI SDR, multichannel, deliverability',
                      'Choose 360 Airo for execution-focused SMBs and startups',
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
                    title: 'Best Sales Intelligence Platform for SMBs in 2026',
                    tag: 'Listicles',
                    href: '/blogs/best-sales-intelligence-platform-smb-2026',
                    description: 'Discover the best sales intelligence platform for SMBs in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Sales Intelligence Features Every SMB Should Look For',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-features-smb',
                    description: 'Discover the 13 key sales intelligence features every SMB should look for.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How Sales Intelligence Improves B2B Prospecting Accuracy',
                    tag: 'Listicles',
                    href: '/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
                    description: 'Learn how sales intelligence improves B2B prospecting accuracy with better data and insights.',
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