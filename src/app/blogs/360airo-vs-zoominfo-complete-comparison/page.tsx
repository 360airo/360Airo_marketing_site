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
  { id: 'at-a-glance', label: '360 Airo vs ZoomInfo at a Glance', arrow: true },
  { id: 'what-is-360airo', label: 'What Is 360 Airo?', arrow: true },
  { id: 'what-is-zoominfo', label: 'What Is ZoomInfo?', arrow: true },
  { id: 'contact-database', label: '1. Contact Database', arrow: true },
  { id: 'buying-signals', label: '2. Buying Signals and Intent Data', arrow: true },
  { id: 'ai-personalization', label: '3. AI Personalization', arrow: true },
  { id: 'outreach-automation', label: '4. Outreach Automation', arrow: true },
  { id: 'deliverability', label: '5. Deliverability', arrow: true },
  { id: 'data-to-action', label: '6. Ease of Moving From Data to Action', arrow: true },
  { id: 'pros-cons', label: 'Pros and Cons', arrow: true },
  { id: 'which-is-better', label: 'So, Which Is Better: ZoomInfo or 360 Airo?', arrow: true },
  { id: 'verdict', label: 'Final Verdict', arrow: true },
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
    alt: '360 Airo vs ZoomInfo comparison',
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
          360 Airo vs ZoomInfo
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the two platforms and find the best fit for your sales team.
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
          Data vs. execution
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Choose ZoomInfo for deep intelligence; choose 360 Airo for turning intelligence into actual outreach conversations.
        </p>
      </div>
    </aside>
  );
}

// --- Feature Comparison Table ---
function FeatureComparisonTable() {
  const rows = [
    { feature: 'B2B contact database', airo: 'Yes', zoom: 'Yes' },
    { feature: 'Contact enrichment', airo: 'Yes', zoom: 'Yes' },
    { feature: 'Email verification', airo: 'Yes', zoom: 'Yes' },
    { feature: 'Buying/intent signals', airo: 'Yes', zoom: 'Yes' },
    { feature: 'AI personalization', airo: 'Yes', zoom: 'Yes' },
    { feature: 'AI SDR workflows', airo: 'Yes', zoom: 'Yes' },
    { feature: 'Email outreach', airo: 'Yes', zoom: 'Primarily through GTM integrations/workflows' },
    { feature: 'LinkedIn outreach', airo: 'Yes', zoom: 'Integrations/workflows' },
    { feature: 'SMS outreach', airo: 'Yes', zoom: 'Depends on setup/integrations' },
    { feature: 'Email warm-up', airo: 'Yes', zoom: 'Not its core focus' },
    { feature: 'Inbox rotation', airo: 'Yes', zoom: 'Not its core focus' },
    { feature: 'Unified outreach inbox', airo: 'Yes', zoom: 'No comparable core focus' },
    { feature: 'CRM integrations', airo: 'Yes', zoom: 'Yes' },
    { feature: 'Best suited for', airo: 'Teams that want intelligence + execution', zoom: 'Teams prioritizing deep GTM intelligence' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Feature</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">360 Airo</th>
            <th className="px-2 py-2 md:px-3 md:py-3 font-semibold text-[#111827] whitespace-nowrap">ZoomInfo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-2 py-2 md:px-3 md:py-3 font-medium text-[#111827] whitespace-nowrap" data-label="Feature">{row.feature}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="360 Airo">{row.airo}</td>
              <td className="px-2 py-2 md:px-3 md:py-3 text-[#4f5668]" data-label="ZoomInfo">{row.zoom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Pros and Cons Component ---
function ProsConsComponent() {
  return (
    <div className="my-4 grid gap-6 md:grid-cols-2">
      <div className="rounded-[16px] border border-[#dbe3f4] bg-white p-4 md:p-6 shadow-sm">
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#0b5ca8] mb-3 md:mb-4">360 Airo Pros</h3>
        <ul className="space-y-2 text-[#4f5668] text-[14px] md:text-[15px] leading-7 list-disc pl-5">
          <li>More than a contact database – combines prospecting with enrichment, signals, personalization, outreach, and automation</li>
          <li>Strong outbound focus – Email, LinkedIn, and SMS workflows</li>
          <li>AI SDR capabilities – research, personalization, workflow execution, reply handling</li>
          <li>Built-in deliverability features – warm-up, inbox rotation, deliverability monitoring</li>
          <li>Fewer tools to manage – combines prospecting and execution</li>
        </ul>
        <h4 className="text-[15px] md:text-[16px] font-semibold text-[#111827] mt-4 mb-2">Cons</h4>
        <ul className="space-y-2 text-[#4f5668] text-[14px] md:text-[15px] leading-7 list-disc pl-5">
          <li>Less established than ZoomInfo in the B2B intelligence market</li>
          <li>Not necessarily the first choice for pure data research</li>
          <li>Teams may need time to configure workflows properly</li>
        </ul>
      </div>
      <div className="rounded-[16px] border border-[#dbe3f4] bg-white p-4 md:p-6 shadow-sm">
        <h3 className="text-[18px] md:text-[20px] font-bold text-[#0b5ca8] mb-3 md:mb-4">ZoomInfo Pros</h3>
        <ul className="space-y-2 text-[#4f5668] text-[14px] md:text-[15px] leading-7 list-disc pl-5">
          <li>Strong B2B intelligence – extensive search and targeting capabilities</li>
          <li>Intent data – identify companies showing relevant buying behavior</li>
          <li>Enterprise-oriented workflows – integrates with broader GTM stacks</li>
          <li>Strong fit for larger organizations with dedicated sales operations</li>
        </ul>
        <h4 className="text-[15px] md:text-[16px] font-semibold text-[#111827] mt-4 mb-2">Cons</h4>
        <ul className="space-y-2 text-[#4f5668] text-[14px] md:text-[15px] leading-7 list-disc pl-5">
          <li>Data alone does not create pipeline – need a process for turning intelligence into conversations</li>
          <li>Can require a larger tech stack for outreach and deliverability</li>
          <li>May be more than an SMB needs</li>
        </ul>
      </div>
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
          Ready to see whether 360 Airo fits your outbound workflow? Start with the free trial and test it against your current sales stack.
        </p>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Start Free Trial
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogAiroVsZoomInfoPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/360airo-vs-zoominfo.jpg';

  return (
    <>
      <Head>
        <title>360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams</title>
        <meta
          name="description"
          content="Compare 360 Airo and ZoomInfo side by side. See how they stack up on contact database, buying signals, AI personalization, outreach automation, and more."
        />
        <meta
          name="keywords"
          content="360 Airo vs ZoomInfo, ZoomInfo alternative, sales intelligence, B2B prospecting, outbound platform, AI SDR"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams"
        />
        <meta
          property="og:description"
          content="Compare 360 Airo and ZoomInfo side by side. See how they stack up on contact database, buying signals, AI personalization, outreach automation, and more."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams"
        />
        <meta
          name="twitter:description"
          content="Compare 360 Airo and ZoomInfo side by side. See how they stack up on contact database, buying signals, AI personalization, outreach automation, and more."
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
                  '@id': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison/#webpage',
                  'url': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison',
                  'name': '360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams',
                  'description': 'Compare 360 Airo and ZoomInfo side by side. See how they stack up on contact database, buying signals, AI personalization, outreach automation, and more.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison/#article',
                  'headline': '360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams',
                  'description': 'Compare 360 Airo and ZoomInfo side by side. See how they stack up on contact database, buying signals, AI personalization, outreach automation, and more.',
                  'url': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison',
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
                    '@id': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    '360 Airo vs ZoomInfo',
                    'ZoomInfo alternative',
                    'sales intelligence',
                    'B2B prospecting',
                    'outbound platform',
                    'AI SDR',
                  ],
                  'datePublished': '2026-11-28',
                  'dateModified': '2026-11-28',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison/#breadcrumb',
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
                      'name': '360 Airo vs ZoomInfo',
                      'item': 'https://360airo.com/blogs/360airo-vs-zoominfo-complete-comparison',
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
                  <span className="hidden sm:inline">360 Airo vs ZoomInfo: Complete Comparison</span>
                  <span className="sm:hidden">360 Airo vs ZoomInfo</span>
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
                      alt="360 Airo vs ZoomInfo comparison"
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
                    360 Airo vs ZoomInfo: Complete Comparison for B2B Sales Teams
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    If you are building a B2B sales pipeline, you have probably come across both 360 Airo and ZoomInfo. Compare them side by side – from contact databases and buying signals to outreach automation and deliverability.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.5K reads</span>
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
                    "If you are building a B2B sales pipeline, you have probably come across both 360 Airo and ZoomInfo.",
                    "At first glance, the two platforms can look similar. Both help sales and marketing teams find prospects, use business intelligence, identify potential buyers, and improve outbound campaigns.",
                    "But they are built around different priorities. ZoomInfo is primarily known for its large B2B intelligence and contact database, with company and contact profiles, search filters, intent data, and workflows designed to help GTM teams identify and prioritize prospects.",
                    "360 Airo takes a more execution-focused approach. Instead of stopping at finding a prospect, it combines prospect data, enrichment, buying signals, AI personalization, multichannel outreach, deliverability tools, and AI SDR workflows in one platform.",
                    "So, which one should you choose? That depends on what you actually need from a sales intelligence platform.",
                  ]}
                  infographic={{
                    title: 'Two different priorities',
                    paragraphs: ['ZoomInfo = intelligence-first; 360 Airo = execution-first. Choose based on your workflow.'],
                    bullets: [
                      'ZoomInfo: Deep B2B intelligence, company and contact data, intent signals',
                      '360 Airo: Intelligence + execution, AI SDR, multichannel outreach, deliverability',
                      "The right choice depends on your team's biggest bottleneck",
                    ],
                  }}
                  blocks={[]}
                />

                {/* At a Glance */}
                <section id="at-a-glance" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    360 Airo vs ZoomInfo at a Glance
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The important difference is simple: ZoomInfo is heavily focused on intelligence, while 360 Airo connects intelligence with actual outbound execution.</p>
                    </div>

                    <FeatureComparisonTable />
                  </div>
                </section>

                {/* What Is 360 Airo? */}
                <ArticleSection
                  key="what-is-360airo"
                  id="what-is-360airo"
                  title="What Is 360 Airo?"
                  showImage={true}
                  intro={[
                    "360 Airo is an AI-powered outbound and sales intelligence platform designed to help teams move from prospect discovery to outreach without stitching together several different tools.",
                    "You can import prospects from sources such as CSV files, CRM systems, or LinkedIn Sales Navigator. The platform can then enrich and verify prospect information before helping you build an outreach campaign.",
                    "Its platform combines contact and account prospecting, lead enrichment, email verification, buying and intent signals, AI-powered personalization, AI SDR agents, email sequences, LinkedIn outreach, SMS outreach, inbox management, email warm-up, sender rotation, and campaign analytics.",
                    "That matters for a small sales team because prospecting is rarely the only problem. Finding 500 contacts is easy if your database is good enough. Getting those 500 contacts into a campaign, writing relevant messages, following up, protecting deliverability, monitoring replies, and handing interested leads to sales is where the real work begins.",
                    "360 Airo is designed around that entire process.",
                  ]}
                  infographic={{
                    title: '360 Airo overview',
                    paragraphs: ['An AI-powered outbound platform that connects intelligence with execution.'],
                    bullets: [
                      'Prospecting and lead enrichment',
                      'AI personalization and SDR agents',
                      'Email, LinkedIn, and SMS outreach',
                      'Deliverability tools (warm-up, inbox rotation)',
                      'Campaign analytics and unified inbox',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What Is ZoomInfo? */}
                <ArticleSection
                  key="what-is-zoominfo"
                  id="what-is-zoominfo"
                  title="What Is ZoomInfo?"
                  showImage={false}
                  intro={[
                    "ZoomInfo is a well-established B2B go-to-market intelligence platform. Its strength is the depth of information available around companies, contacts, buying signals, and market activity. ZoomInfo has historically positioned its platform around helping sales and marketing teams identify the right accounts and contacts and understand when those prospects may be in a buying cycle.",
                    "The platform supports detailed searches using firmographic and other attributes. Its earlier platform documentation, for example, described 60+ filters and thousands of keywords and attributes for creating targeted company and contact lists.",
                    "For larger sales organizations, that level of data intelligence can be valuable.",
                    "But there is an important distinction. Finding the right prospect and contacting the right prospect are two different jobs. ZoomInfo is particularly strong on the first. 360 Airo tries to bring both together.",
                  ]}
                  infographic={{
                    title: 'ZoomInfo overview',
                    paragraphs: ['A B2B go-to-market intelligence platform with deep company and contact data.'],
                    bullets: [
                      'Extensive B2B intelligence and contact database',
                      '60+ filters and thousands of search attributes',
                      'Buying intent signals and company research',
                      'Enterprise-grade GTM workflows',
                      'Integrations with broader sales and marketing stacks',
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
                    "A good contact database is the starting point for outbound sales.",
                    "ZoomInfo has built its reputation around B2B data coverage, including company and contact information. Its platform combines contact profiles with broader company and market intelligence.",
                    "360 Airo also provides prospecting and enrichment capabilities. Its platform includes email finding, email verification, account-based prospecting, centralized contact management, and lead enrichment.",
                    "The difference comes down to what happens after you find the contact. With 360 Airo, the database is connected directly to the outbound workflow.",
                    "Winner for database depth: ZoomInfo. Winner for connecting database to outreach: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'Contact database comparison',
                    paragraphs: ['ZoomInfo has deeper database coverage; 360 Airo connects database directly to outreach.'],
                    bullets: [
                      'ZoomInfo: Extensive company and contact intelligence',
                      '360 Airo: Prospecting, enrichment, email finding, verification',
                      'ZoomInfo = database depth; 360 Airo = database + execution',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Buying Signals */}
                <ArticleSection
                  key="buying-signals"
                  id="buying-signals"
                  title="2. Buying Signals and Intent Data"
                  showImage={false}
                  intro={[
                    "Timing can be just as important as targeting. A prospect may fit your ideal customer profile perfectly but have zero interest in buying today. That is where buying signals become useful.",
                    "ZoomInfo has offered intent intelligence designed to identify companies showing relevant research and purchasing behavior. Its intent solution was built to prioritize active companies rather than simply producing a large list of potential accounts.",
                    "360 Airo also uses signal tracking to identify high-intent prospects. Its platform describes signals such as job changes, funding rounds, social engagement, and other events that can trigger context-based outreach.",
                    "The practical advantage of 360 Airo is that these signals can feed directly into automated outreach workflows. For example: Signal detected → prospect prioritized → personalized message created → sequence launched. That reduces the amount of manual work between identifying intent and acting on it.",
                    "Winner for established intelligence capabilities: ZoomInfo. Winner for signal-to-action workflow: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'Buying signals comparison',
                    paragraphs: ['ZoomInfo offers deep intent intelligence; 360 Airo connects signals to automated outreach.'],
                    bullets: [
                      'ZoomInfo: intent intelligence for prioritizing active companies',
                      '360 Airo: signal tracking + automated workflow integration',
                      'Signal → prioritize → personalize → launch sequence',
                    ],
                  }}
                  blocks={[]}
                />

                {/* AI Personalization */}
                <ArticleSection
                  key="ai-personalization"
                  id="ai-personalization"
                  title="3. AI Personalization"
                  showImage={false}
                  intro={[
                    "Generic cold emails are easy to ignore. Both platforms use AI to help GTM teams make prospecting more relevant, but their overall product focus is different.",
                    "360 Airo can use prospect and company information to generate personalized messaging and create tailored icebreakers. Its AI SDR workflows can research prospects, personalize sequences, and automate follow-up actions.",
                    "This is particularly useful for teams that do not have enough sales development capacity to manually research every prospect. Instead of writing: 'Hi John, I wanted to introduce our company...' you can build workflows around information about the prospect, their company, role, or relevant signals.",
                    "The objective is not simply to generate more emails. It is to make automated outreach feel more relevant.",
                    "Winner: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'AI personalization',
                    paragraphs: ['360 Airo uses AI to generate personalized messaging and automate research; ZoomInfo also has AI capabilities.'],
                    bullets: [
                      '360 Airo: AI SDR workflows, personalized messaging, context-based outreach',
                      'ZoomInfo: AI-assisted prospecting and intelligence',
                      '360 Airo focuses on making automated outreach feel relevant',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Outreach Automation */}
                <ArticleSection
                  key="outreach-automation"
                  id="outreach-automation"
                  title="4. Outreach Automation"
                  showImage={false}
                  intro={[
                    "This is where the difference becomes much clearer.",
                    "360 Airo is built to execute outreach across multiple channels. The platform supports email, LinkedIn, and SMS sequences, along with automated follow-ups and conditional workflows.",
                    "For example, a workflow could look like: Send an email. Wait for a response. If there is no response, trigger a LinkedIn action. Continue with a follow-up. Stop the sequence when the prospect replies. Route an interested response to the appropriate sales representative.",
                    "That kind of workflow is designed to reduce repetitive sales work.",
                    "ZoomInfo can be connected deeply with sales engagement, CRM, and marketing systems, and its broader platform is designed to activate intelligence within GTM workflows. But if your priority is having prospecting and multichannel outbound execution in one workspace, 360 Airo has a more direct fit.",
                    "Winner: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'Outreach automation',
                    paragraphs: ['360 Airo offers built-in multichannel execution; ZoomInfo connects to external engagement tools.'],
                    bullets: [
                      'Email, LinkedIn, and SMS sequences',
                      'Conditional workflows and automated follow-ups',
                      'Stop sequences on reply, route to rep',
                      'ZoomInfo integrates with external engagement platforms',
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
                    "There is no point having a great contact list if your emails land in spam.",
                    "This is one area where 360 Airo goes beyond traditional sales intelligence. Its platform includes email warm-up, inbox rotation, sending-limit management, deliverability monitoring, and other infrastructure features designed to support outbound campaigns.",
                    "That can be especially useful for startups, agencies, and growing sales teams running outbound at scale.",
                    "ZoomInfo's core strength is not email infrastructure. So if you are comparing the two specifically for outbound execution, 360 Airo has the advantage.",
                    "Winner: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'Deliverability features',
                    paragraphs: ['360 Airo includes warm-up, rotation, and monitoring; ZoomInfo focuses on intelligence.'],
                    bullets: [
                      'Email warm-up built in',
                      'Inbox rotation and sending-limit management',
                      'Deliverability monitoring',
                      'ZoomInfo: core strength is intelligence, not infrastructure',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Data to Action */}
                <ArticleSection
                  key="data-to-action"
                  id="data-to-action"
                  title="6. Ease of Moving From Data to Action"
                  showImage={false}
                  intro={[
                    "Imagine you have identified 1,000 companies that match your ICP. What happens next?",
                    "With a data-first platform, you may still need several other tools for email verification, personalization, email sequencing, LinkedIn outreach, deliverability, inbox management, follow-up automation, and campaign analytics.",
                    "360 Airo attempts to reduce that tool switching by putting these functions together. Its platform supports prospect imports, enrichment, AI personalization, multichannel campaigns, campaign analytics, and unified reply management.",
                    "That can make a noticeable difference for smaller teams. Instead of managing a stack of disconnected tools, you can keep more of the workflow in one place.",
                    "Winner: 360 Airo.",
                  ]}
                  infographic={{
                    title: 'Data to action',
                    paragraphs: ['360 Airo reduces tool switching; ZoomInfo may require additional tools for execution.'],
                    bullets: [
                      'Prospect imports + enrichment + personalization',
                      'Multichannel campaigns + analytics',
                      'Unified reply management',
                      'Fewer tools to manage',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Pros and Cons */}
                <section id="pros-cons" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Pros and Cons
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s how the two platforms compare across strengths and weaknesses:</p>
                    </div>

                    <ProsConsComponent />
                  </div>
                </section>

                {/* Which Is Better */}
                <ArticleSection
                  key="which-is-better"
                  id="which-is-better"
                  title="So, Which Is Better: ZoomInfo or 360 Airo?"
                  showImage={false}
                  intro={[
                    "There is no universal winner. The better choice depends on what you are actually trying to solve.",
                    "Choose ZoomInfo if your main priority is deep B2B intelligence, company and contact research, intent data, enterprise GTM operations, extensive prospect filtering, and integrating intelligence into an existing sales stack.",
                    "Choose 360 Airo if your priority is prospecting plus outreach, AI-powered personalization, automated sales workflows, email, LinkedIn, and SMS outreach, deliverability management, AI SDR capabilities, reducing the number of tools in your outbound stack, and moving from a buying signal to actual outreach faster.",
                    "For a large enterprise with an established sales-technology ecosystem, ZoomInfo can make a lot of sense. For a startup, SMB, agency, or lean revenue team that wants to find prospects and actually reach them from the same platform, 360 Airo is the more practical choice.",
                  ]}
                  infographic={{
                    title: 'Decision guide',
                    paragraphs: ['Choose ZoomInfo for intelligence; choose 360 Airo for intelligence + execution.'],
                    bullets: [
                      'ZoomInfo: deep B2B intelligence, enterprise GTM, extensive data',
                      '360 Airo: prospecting + outreach, AI SDR, deliverability, all-in-one workflow',
                      'For lean teams focused on execution, 360 Airo is the practical choice',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Verdict */}
                <ArticleSection
                  key="verdict"
                  id="verdict"
                  title="Final Verdict"
                  showImage={false}
                  intro={[
                    "ZoomInfo and 360 Airo are not really trying to solve the exact same problem.",
                    "ZoomInfo's biggest strength is GTM intelligence. 360 Airo's bigger advantage is connecting intelligence with execution.",
                    "That distinction matters. A contact database can tell you who to target. Buying signals can tell you who may be interested. But your sales team still needs to turn that information into a conversation.",
                    "360 Airo is designed to shorten that distance. You can bring in prospects, enrich and verify their information, identify signals, personalize messaging, launch multichannel sequences, manage replies, and monitor campaign performance from a connected outbound workflow.",
                    "So if your question is simply 'Which platform has strong B2B intelligence?', ZoomInfo deserves serious consideration. But if your question is 'Which platform can help my team go from finding the right prospect to actually starting a conversation?', 360 Airo is the stronger choice.",
                    "For lean sales teams, that difference can mean fewer tools, less manual work, and a much shorter path from prospect → outreach → reply → meeting.",
                  ]}
                  infographic={{
                    title: 'The verdict',
                    paragraphs: ['360 Airo connects intelligence with execution; ZoomInfo focuses on intelligence first.'],
                    bullets: [
                      'ZoomInfo: data-first, deep intelligence, enterprise-fit',
                      '360 Airo: execution-first, AI SDR, multichannel, deliverability',
                      'For execution-focused teams, 360 Airo is the stronger choice',
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
                    title: '360 Airo vs Apollo: Which Sales Intelligence Platform Is Better?',
                    tag: 'Listicles',
                    href: '/blogs/360airo-vs-apollo-which-is-better',
                    description: 'Compare 360 Airo and Apollo to find the best sales intelligence platform for your team.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
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