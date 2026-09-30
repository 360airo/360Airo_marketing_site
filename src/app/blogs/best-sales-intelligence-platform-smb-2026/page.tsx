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
  { id: 'what-is-sales-intelligence', label: 'What Is a Sales Intelligence Platform?', arrow: true },
  { id: 'why-smbs-need', label: 'Why SMBs Need Sales Intelligence in 2026', arrow: true },
  { id: 'what-makes-great', label: 'What Makes a Great Sales Intelligence Platform?', arrow: true },
  { id: 'best-platforms', label: 'Best Sales Intelligence Platforms for SMBs in 2026', arrow: true },
  { id: 'why-360airo', label: 'Why 360 Airo Is Built for SMB Growth', arrow: true },
  { id: 'how-improves-roi', label: 'How Sales Intelligence Improves ROI', arrow: true },
  { id: 'traditional-vs-ai', label: 'Traditional Prospecting vs AI-Powered Prospecting', arrow: true },
  { id: 'how-to-choose', label: 'How to Choose the Right Platform', arrow: true },
  { id: 'who-should-use', label: 'Who Should Use 360 Airo?', arrow: true },
  { id: 'faqs', label: 'Common Questions SMBs Ask', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
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
    alt: 'Best sales intelligence platform for SMBs',
    label: 'Sales Intelligence',
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
        {showImage && <SectionImage id={id} />}
      </div>
    </section>
  );
}

// --- FAQ Accordion Component ---
function FaqAccordion({ faqs }: { faqs: { subtitle: string; paragraphs: string[] }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Sales Intelligence for SMBs
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Find the best sales intelligence platform for your SMB in 2026 – compare features, pricing, and value.
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
          Time is your scarcest resource
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The right platform saves your team hours of manual research – invest in tools that give you back time to sell.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table (Platforms) ---
function PlatformsComparisonTable() {
  const rows = [
    { platform: '360 Airo', bestFor: 'Growing SMBs', keyStrength: 'AI-powered GTM platform with lead enrichment and AI SDR' },
    { platform: 'Apollo', bestFor: 'Outbound teams', keyStrength: 'Large contact database' },
    { platform: 'ZoomInfo', bestFor: 'Enterprise', keyStrength: 'Extensive company database' },
    { platform: 'Lusha', bestFor: 'Small sales teams', keyStrength: 'Simple contact lookup' },
    { platform: 'Cognism', bestFor: 'International prospecting', keyStrength: 'Global contact coverage' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Platform</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Best For</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Key Strength</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Platform">{row.platform}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Best For">{row.bestFor}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Key Strength">{row.keyStrength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Traditional vs AI Table ---
function TraditionalVsAITable() {
  const rows = [
    { task: 'Finding companies', traditional: 'Manual', ai: 'AI-assisted' },
    { task: 'Researching contacts', traditional: 'Time-consuming', ai: 'Automated enrichment' },
    { task: 'Lead qualification', traditional: 'Manual review', ai: 'AI-supported' },
    { task: 'CRM updates', traditional: 'Manual entry', ai: 'Streamlined workflow' },
    { task: 'Prospecting speed', traditional: 'Slow', ai: 'Much faster' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Task</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Traditional</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">AI-powered with 360 Airo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Task">{row.task}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Traditional">{row.traditional}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="AI-powered with 360 Airo">{row.ai}</td>
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
          Ready to grow your sales faster? See how 360 Airo&apos;s AI GTM Platform can help your business find better leads, enrich prospect data, and streamline sales workflows.
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

export default function BlogBestSalesIntelligenceSMBSalesPage() {
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
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const featuredImageUrl = 'https://360airo.com/og-images/best-sales-intelligence-platform-smb-2026.jpg';

  return (
    <>
      <Head>
        <title>Best Sales Intelligence Platform for SMBs in 2026</title>
        <meta
          name="description"
          content="Discover the best sales intelligence platform for SMBs in 2026. Compare 360 Airo, Apollo, ZoomInfo, and more – and find the right tool for your growing business."
        />
        <meta
          name="keywords"
          content="sales intelligence platform, SMB sales, 360 Airo, Apollo, ZoomInfo, Lusha, Cognism, AI prospecting"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Best Sales Intelligence Platform for SMBs in 2026"
        />
        <meta
          property="og:description"
          content="Discover the best sales intelligence platform for SMBs in 2026. Compare 360 Airo, Apollo, ZoomInfo, and more – and find the right tool for your growing business."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best Sales Intelligence Platform for SMBs in 2026"
        />
        <meta
          name="twitter:description"
          content="Discover the best sales intelligence platform for SMBs in 2026. Compare 360 Airo, Apollo, ZoomInfo, and more – and find the right tool for your growing business."
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
                  '@id': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026/#webpage',
                  'url': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026',
                  'name': 'Best Sales Intelligence Platform for SMBs in 2026',
                  'description': 'Discover the best sales intelligence platform for SMBs in 2026. Compare 360 Airo, Apollo, ZoomInfo, and more – and find the right tool for your growing business.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026/#article',
                  'headline': 'Best Sales Intelligence Platform for SMBs in 2026',
                  'description': 'Discover the best sales intelligence platform for SMBs in 2026. Compare 360 Airo, Apollo, ZoomInfo, and more – and find the right tool for your growing business.',
                  'url': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026',
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
                    '@id': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence platform',
                    'SMB sales',
                    '360 Airo',
                    'Apollo',
                    'ZoomInfo',
                    'Lusha',
                    'Cognism',
                    'AI prospecting',
                  ],
                  'datePublished': '2026-11-24',
                  'dateModified': '2026-11-24',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026/#breadcrumb',
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
                      'name': 'Best Sales Intelligence Platform SMB',
                      'item': 'https://360airo.com/blogs/best-sales-intelligence-platform-smb-2026',
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
                  <span className="hidden sm:inline">Best Sales Intelligence Platform for SMBs in 2026</span>
                  <span className="sm:hidden">Best Sales Intelligence SMB</span>
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
                      alt="Best sales intelligence platform for SMBs"
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
                    Best Sales Intelligence Platform for SMBs in 2026
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    The problem that small companies face is not a lack of desire but a lack of time. Time is limited, and even small businesses have to spend too much of it looking for suitable leads. Discover the best sales intelligence platform to save time and boost revenue.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 8 min read</span>
                    <span>• 1.3K reads</span>
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
                    "The problem that small companies face is not a lack of desire but a lack of time. Time is limited, and even small businesses have to spend too much of it looking for suitable leads, researching every company, verifying contact information, and closing deals within the month.",
                    "Here comes the power of the sales intelligence software.",
                    "Your team won't have to waste hours on digging up information from LinkedIn, company websites, public sources – all the relevant information will be delivered in one place at once.",
                    "However, in 2026, with so many software solutions available, which one really works for an SMB? Find out from this guide.",
                  ]}
                  infographic={{
                    title: 'The SMB time challenge',
                    paragraphs: ['Small teams spend too much time on research – sales intelligence gives that time back.'],
                    bullets: [
                      'Hours wasted on manual research',
                      'Time is the scarcest resource',
                      'Sales intelligence automates the research process',
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
                    "A sales intelligence system is a software solution designed to assist sales representatives in locating and reaching out to potential clients in a shorter time frame.",
                    "Such software gathers business information from various reliable sources and presents it in a way that is valuable for your sales team to use. For SMBs with small sales teams, this means spending less time researching and more time having conversations that can turn into revenue.",
                    "Rather than having to manually research each lead, you can quickly find verified company information, decision-maker contact details, job titles and departments, company size and industry, buying intent signals, and CRM-ready lead data.",
                  ]}
                  infographic={{
                    title: 'What sales intelligence provides',
                    paragraphs: ['Quick access to verified company and contact data so your team can focus on selling.'],
                    bullets: [
                      'Verified company information',
                      'Decision-maker contact details',
                      'Job titles and departments',
                      'Company size and industry',
                      'Buying intent signals',
                      'CRM-ready lead data',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-smbs-need"
                  id="why-smbs-need"
                  title="Why SMBs Need Sales Intelligence in 2026"
                  showImage={false}
                  intro={[
                    "The buying process has evolved. Decision makers get emails on a daily basis. Generic email marketing no longer generates any responses. Now salespeople require a smarter approach to sales rather than just blasting out more emails.",
                    "A lack of sales intelligence can bring about challenges such as outdated contacts, hours wasted doing research on prospects, bad open rates for emails, poor lead qualification, duplicate entries in CRM system, and inadequate visibility on target accounts.",
                    "It all seems insignificant, but it can really add up. If each salesperson dedicates two hours a day to lead research, it amounts to 40 hours a month wasted.",
                  ]}
                  infographic={{
                    title: 'The cost of not using sales intelligence',
                    paragraphs: ['Manual research drains productivity – 40 hours per rep per month can be saved.'],
                    bullets: [
                      'Outdated contacts',
                      'Hours wasted on research',
                      'Poor email open rates',
                      'Bad lead qualification',
                      'CRM duplication issues',
                      'Limited account visibility',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-makes-great"
                  id="what-makes-great"
                  title="What Makes a Great Sales Intelligence Platform?"
                  showImage={false}
                  intro={[
                    "Not every platform is built for small businesses. Some tools are designed for enterprise companies with massive budgets and complicated workflows.",
                    "SMBs need something simpler, faster, and more affordable.",
                    "Here are the features worth looking for.",
                  ]}
                  infographic={{
                    title: 'Key features for SMBs',
                    paragraphs: ['Focus on features that save time and improve lead quality.'],
                    bullets: [
                      'Accurate Lead Enrichment – automatically add verified company and contact data',
                      'AI-Powered Prospecting – identify high-potential accounts based on ICP',
                      'Intent Signals – know who is actively researching solutions',
                      'CRM Integration – seamless data flow with popular CRMs',
                      'Email Verification – reduce bounce rates',
                      'Automation – automate lead research, enrichment, and qualification',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Platforms Comparison Table */}
                <section id="best-platforms" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Best Sales Intelligence Platforms for SMBs in 2026
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s how some of the leading platforms compare.</p>
                      <p>While each platform has strengths, SMBs often need the best balance between AI automation, affordability, and ease of use. That&apos;s where 360 Airo stands out.</p>
                    </div>

                    <PlatformsComparisonTable />
                  </div>
                </section>

                <ArticleSection
                  key="why-360airo"
                  id="why-360airo"
                  title="Why 360 Airo Is Built for SMB Growth"
                  showImage={false}
                  intro={[
                    "360 Airo goes beyond traditional sales intelligence. Instead of only giving you contact information, it combines AI-powered prospecting, lead enrichment, and AI SDR capabilities into one platform.",
                    "AI GTM Platform: Expanding companies may be using various software for prospecting, enrichment, outreach, and updating their CRM. The 360 Airo tool consolidates all these processes. Salespeople don't have to change systems when doing their tasks but can handle most aspects of GTM from a single platform.",
                    "Lead Enrichment That Saves Hours: One of the biggest challenges for SMB sales teams is incomplete lead data. 360 Airo enriches leads with valuable business information, helping teams qualify prospects much faster. This means fewer hours spent researching and more confidence before reaching out.",
                    "AI SDR Capabilities: Hiring additional sales development representatives isn't always possible for growing businesses. 360 Airo's AI SDR helps automate parts of the prospecting process, allowing sales teams to focus on conversations rather than repetitive research.",
                    "Faster Sales Workflows: Instead of manually updating spreadsheets and CRM records, teams can keep their sales pipeline moving with less manual work.",
                  ]}
                  infographic={{
                    title: 'Why 360 Airo stands out',
                    paragraphs: ['AI GTM platform with lead enrichment and AI SDR – built specifically for growing SMBs.'],
                    bullets: [
                      'Consolidates prospecting, enrichment, outreach, and CRM updates',
                      'Lead enrichment saves hours of research',
                      'AI SDR automates repetitive prospecting tasks',
                      'Faster workflows and less manual work',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-improves-roi"
                  id="how-improves-roi"
                  title="How Sales Intelligence Improves ROI"
                  showImage={false}
                  intro={[
                    "Buying software only makes sense if it improves business results. Fortunately, sales intelligence creates value in several measurable ways.",
                  ]}
                  infographic={{
                    title: 'Measurable ROI benefits',
                    paragraphs: ['Sales intelligence delivers value through time savings, better leads, and higher conversion.'],
                    bullets: [
                      'More Selling Time – less research, more conversations',
                      'Better Lead Quality – target verified decision-makers',
                      'Higher Email Deliverability – reduced bounce rates',
                      'Improved Conversion Rates – better targeting leads to better engagement',
                      'Lower Customer Acquisition Costs – less wasted outreach',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Traditional vs AI Table */}
                <section id="traditional-vs-ai" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Traditional Prospecting vs AI-Powered Prospecting
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>For SMBs trying to compete with larger companies, these time savings can create a meaningful advantage.</p>
                    </div>

                    <TraditionalVsAITable />
                  </div>
                </section>

                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="How to Choose the Right Platform"
                  showImage={false}
                  intro={[
                    "Before investing, ask these questions.",
                  ]}
                  infographic={{
                    title: '4 questions to ask',
                    paragraphs: ['Choose a platform that fits your team size, data needs, and growth plans.'],
                    bullets: [
                      'Does It Match Your Team Size? – Choose a platform that fits your current sales process',
                      'Is the Data Reliable? – Accurate contact information matters more than database size',
                      'Can It Scale? – Your platform should grow with your business',
                      'Does It Reduce Manual Work? – The best platforms eliminate repetitive tasks',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="who-should-use"
                  id="who-should-use"
                  title="Who Should Use 360 Airo?"
                  showImage={false}
                  intro={[
                    "360 Airo is especially useful for businesses that are actively growing and need better sales efficiency.",
                    "It's a strong fit for:",
                  ]}
                  infographic={{
                    title: 'Ideal users',
                    paragraphs: ['360 Airo is built for lean, growth-focused sales teams.'],
                    bullets: [
                      'B2B SaaS companies',
                      'Agencies',
                      'IT service providers',
                      'Consulting firms',
                      'Startups',
                      'Small sales teams',
                      'Growing outbound teams',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'When to make the switch',
                      paragraphs: ['If your team spends too much time researching prospects instead of selling, AI-powered sales intelligence can help improve productivity.'],
                    },
                  ]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Common Questions SMBs Ask
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about sales intelligence for small businesses.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Can sales intelligence be used for small businesses?',
                          paragraphs: ['Yes. Small sales organizations can benefit a lot from saving time by cutting down the research process.'],
                        },
                        {
                          subtitle: 'How does lead enrichment differ from sales intelligence?',
                          paragraphs: ['Lead enrichment is when additional information is collected about the current leads, whereas sales intelligence is used to find, qualify, and prioritize leads.'],
                        },
                        {
                          subtitle: 'Can AI be used instead of SDRs?',
                          paragraphs: ['No. The technology can\'t substitute conversations but will assist SDRs with automating processes.'],
                        },
                        {
                          subtitle: 'Does 360 Airo suit growing sales organizations?',
                          paragraphs: ['Yes. 360 Airo uses an AI go-to-market strategy.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    "Choosing the optimal prospecting tool for SMBs isn't about finding the largest company. The point is about the need to find a service that saves your time, provides you with high-quality leads, and assists your employees in conducting better business.",
                    "In 2026, AI-powered prospecting is not an advantage but a must-have for the successful growth of your business.",
                    "Though there are many tools with good contact databases, 360 Airo distinguishes itself from others with its combination of AI GTM solutions, lead enrichment, and AI SDR services, tailored to the needs of fast-growing businesses which don't need extra complications.",
                    "If the time your salespeople spend on the research is bigger than on sales, it's high time to improve the prospecting process.",
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      '360 Airo combines AI GTM solutions, lead enrichment, and AI SDR services – all designed for fast-growing SMBs.',
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
                    title: '360Airo vs Apollo: Which Sales Intelligence Platform Is Better for SMBs?',
                    tag: 'Listicles',
                    href: '/blogs/360airo-vs-apollo-sales-intelligence-platform-smb',
                    description: 'Compare 360Airo and Apollo for SMB sales intelligence.',
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