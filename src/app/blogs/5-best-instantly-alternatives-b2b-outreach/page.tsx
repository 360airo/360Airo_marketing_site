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
  { id: 'what-to-look-for', label: 'What to Look for in an Instantly Alternative', arrow: true },
  { id: 'alternative-360airo', label: '1. 360Airo — Best All-in-One Instantly Alternative', arrow: true },
  { id: 'alternative-apollo', label: '2. Apollo.io — Best for Prospecting + Sales Engagement', arrow: true },
  { id: 'alternative-salesforge', label: '3. Salesforge — Best for AI-Powered Cold Email', arrow: true },
  { id: 'alternative-lemlist', label: '4. Lemlist — Best for Highly Personalized Outreach', arrow: true },
  { id: 'alternative-reply', label: '5. Reply.io — Best for Multi-Channel Sales Engagement', arrow: true },
  { id: 'comparison-table', label: 'Instantly Alternatives: Feature Comparison', arrow: true },
  { id: 'which-alternative', label: 'Which Instantly Alternative Is Right for You?', arrow: true },
  { id: 'conclusion', label: 'Turn More B2B Outreach Into Pipeline', arrow: true },
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
    alt: 'Instantly alternatives comparison',
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

// --- Comparison Table Component (7 columns) ---
function ComparisonTable() {
  const rows = [
    {
      capability: 'Prospect database',
      airo: '✅',
      instantly: 'Limited',
      apollo: '✅',
      salesforge: 'Limited',
      lemlist: 'Limited',
      reply: 'Limited',
    },
    {
      capability: 'AI personalization',
      airo: '✅',
      instantly: 'Limited',
      apollo: '✅',
      salesforge: '✅',
      lemlist: '✅',
      reply: '✅',
    },
    {
      capability: 'Email outreach',
      airo: '✅',
      instantly: '✅',
      apollo: '✅',
      salesforge: '✅',
      lemlist: '✅',
      reply: '✅',
    },
    {
      capability: 'LinkedIn outreach',
      airo: '✅',
      instantly: 'Limited',
      apollo: 'Limited',
      salesforge: 'Limited',
      lemlist: '✅',
      reply: '✅',
    },
    {
      capability: 'SMS outreach',
      airo: '✅',
      instantly: '❌',
      apollo: 'Limited',
      salesforge: '❌',
      lemlist: 'Limited',
      reply: '✅',
    },
    {
      capability: 'Automated sequences',
      airo: '✅',
      instantly: '✅',
      apollo: '✅',
      salesforge: '✅',
      lemlist: '✅',
      reply: '✅',
    },
    {
      capability: 'Deliverability features',
      airo: '✅',
      instantly: '✅',
      apollo: 'Limited',
      salesforge: '✅',
      lemlist: '✅',
      reply: 'Limited',
    },
    {
      capability: 'Campaign analytics',
      airo: '✅',
      instantly: '✅',
      apollo: '✅',
      salesforge: '✅',
      lemlist: '✅',
      reply: '✅',
    },
    {
      capability: 'All-in-one outbound workflow',
      airo: '✅',
      instantly: 'Email-focused',
      apollo: '✅',
      salesforge: 'Email-focused',
      lemlist: 'Outreach-focused',
      reply: 'Engagement-focused',
    },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-xs md:text-sm">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Capability</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">360Airo</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Instantly</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Apollo.io</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Salesforge</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Lemlist</th>
            <th className="px-2 py-2 md:px-4 md:py-3 font-semibold text-[#111827] whitespace-nowrap">Reply.io</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-2 py-2 md:px-4 md:py-3 font-medium text-[#111827] whitespace-nowrap" data-label="Capability">{row.capability}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="360Airo">{row.airo}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="Instantly">{row.instantly}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="Apollo.io">{row.apollo}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="Salesforge">{row.salesforge}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="Lemlist">{row.lemlist}</td>
              <td className="px-2 py-2 md:px-4 md:py-3 text-[#4f5668] text-center" data-label="Reply.io">{row.reply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Instantly
          <br />
          Alternatives
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the top competitors for B2B outreach and find the right fit for your team.
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
          Evaluate your workflow
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The best platform isn't always the one with the most features – it's the one that fits how your team actually works.
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
          Turn more B2B outreach into pipeline with 360Airo – the all‑in‑one platform for prospecting, personalization, and multi‑channel engagement.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
            >
              Book a Demo
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              Start Free Trial
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogInstantlyAlternativesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/instantly-alternatives.jpg';

  return (
    <>
      <Head>
        <title>5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)</title>
        <meta
          name="description"
          content="Compare the top 5 Instantly alternatives for B2B outreach. Discover platforms that offer prospecting, AI personalization, multi-channel engagement, and more."
        />
        <meta
          name="keywords"
          content="Instantly alternatives, Instantly competitors, B2B outreach, cold email platforms, sales engagement, Apollo.io, Salesforge, Lemlist, Reply.io, 360Airo"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)"
        />
        <meta
          property="og:description"
          content="Compare the top 5 Instantly alternatives for B2B outreach. Discover platforms that offer prospecting, AI personalization, multi-channel engagement, and more."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)"
        />
        <meta
          name="twitter:description"
          content="Compare the top 5 Instantly alternatives for B2B outreach. Discover platforms that offer prospecting, AI personalization, multi-channel engagement, and more."
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
                  '@id': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach/#webpage',
                  'url': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach',
                  'name': '5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)',
                  'description': 'Compare the top 5 Instantly alternatives for B2B outreach. Discover platforms that offer prospecting, AI personalization, multi-channel engagement, and more.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach/#article',
                  'headline': '5 Best Instantly Alternatives & Competitors for B2B Outreach (2026)',
                  'description': 'Compare the top 5 Instantly alternatives for B2B outreach. Discover platforms that offer prospecting, AI personalization, multi-channel engagement, and more.',
                  'url': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach',
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
                    '@id': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'Instantly alternatives',
                    'Instantly competitors',
                    'B2B outreach',
                    'cold email platforms',
                    'sales engagement',
                    'Apollo.io',
                    'Salesforge',
                    'Lemlist',
                    'Reply.io',
                    '360Airo',
                  ],
                  'datePublished': '2026-10-20',
                  'dateModified': '2026-10-20',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach/#breadcrumb',
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
                      'name': 'Best Instantly Alternatives',
                      'item': 'https://360airo.com/blogs/best-instantly-alternatives-b2b-outreach',
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
                  <span className="hidden sm:inline">5 Best Instantly Alternatives &amp; Competitors for B2B Outreach</span>
                  <span className="sm:hidden">Instantly Alternatives</span>
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
                      alt="Instantly alternatives comparison"
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
                    5 Best Instantly Alternatives &amp; Competitors for B2B Outreach
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Instantly is great for cold email at scale. But as teams grow, they often need prospecting, AI personalization, multi‑channel engagement, and a unified workflow. Compare the top 5 alternatives for B2B outreach in 2026.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>Updated: Oct 2026</span>
                    <span>• 10 min read</span>
                    <span>• 2.4K reads</span>
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
                    "Instantly has become a popular choice for teams running cold email at scale. Its focus on campaign automation, multiple sending accounts, inbox management, and deliverability makes it particularly useful for agencies, SDR teams, and businesses running high-volume outbound.",
                    "But email volume isn't the only consideration when choosing an outbound platform.",
                    "As teams grow, they often need better prospect discovery, AI-powered personalization, multi-channel outreach, campaign intelligence, and a simpler way to manage the entire outbound workflow.",
                    "If you're evaluating Instantly alternatives, here are five platforms worth considering in 2026.",
                  ]}
                  infographic={{
                    title: 'Beyond email volume',
                    paragraphs: ['The right platform should support your entire outbound workflow – not just sending.'],
                    bullets: [
                      'Prospect discovery',
                      'AI personalization',
                      'Multi‑channel outreach',
                      'Deliverability',
                      'Automation & analytics',
                      'Scalability',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-to-look-for"
                  id="what-to-look-for"
                  title="What to Look for in an Instantly Alternative"
                  showImage={false}
                  intro={[
                    "Before switching platforms, consider what your team actually needs from its outbound stack:",
                  ]}
                  infographic={{
                    title: 'Key evaluation criteria',
                    paragraphs: ['Use these questions to evaluate any Instantly alternative.'],
                    bullets: [
                      'Prospect discovery: Can you find the right contacts without another database?',
                      'Personalization: Can you tailor messaging without manually researching every prospect?',
                      'Multi-channel outreach: Does the platform support Email, LinkedIn, and SMS?',
                      'Deliverability: Are there tools to help protect sender reputation and inbox placement?',
                      'Automation: Can you build sequences and automate follow-ups?',
                      'Analytics: Can you see which campaigns are producing replies and meetings?',
                      'Scalability: Can the platform support your team as outbound volume increases?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Alternative 1 - 360Airo */}
                <ArticleSection
                  key="alternative-360airo"
                  id="alternative-360airo"
                  title="1. 360Airo — Best All-in-One Instantly Alternative"
                  showImage={true}
                  intro={[
                    "Best for: B2B teams that want prospecting, personalization, outreach, and campaign management in one platform.",
                    "Instantly is particularly strong when your priority is sending and managing cold email campaigns at scale. 360Airo takes a broader approach to outbound.",
                    "Instead of starting with a list of contacts and figuring out the rest of the workflow separately, 360Airo brings prospect discovery, AI personalization, campaign execution, deliverability, and analytics together.",
                    "Your team can find relevant B2B prospects, generate personalized messaging using prospect and company context, and launch campaigns across Email, LinkedIn, and SMS. Automated follow-ups keep campaigns moving, while campaign analytics help your team understand what's generating engagement and qualified conversations.",
                    "That makes 360Airo a particularly useful option for teams that have outgrown an email-first workflow and want to manage more of their outbound process from one place.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Built‑in prospect database, AI personalization, multi‑channel campaigns, and analytics.'],
                    bullets: [
                      'Built-in prospect database',
                      'AI-powered email personalization',
                      'Email, LinkedIn, and SMS campaigns',
                      'Automated follow-ups',
                      'Deliverability features',
                      'Campaign analytics',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Complete outbound workflow',
                        '✅ Prospecting and outreach in one platform',
                        '✅ AI personalization',
                        '✅ Multi-channel campaigns',
                        '✅ Designed for growing revenue teams',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Teams looking exclusively for high-volume cold email may prefer a more email-focused platform.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 2 - Apollo.io */}
                <ArticleSection
                  key="alternative-apollo"
                  id="alternative-apollo"
                  title="2. Apollo.io — Best for Prospecting + Sales Engagement"
                  showImage={false}
                  intro={[
                    "Best for: Teams that want a large B2B database alongside sales engagement features.",
                    "Apollo.io combines prospect data with sales engagement, giving teams the ability to search for contacts and launch outreach without immediately adding another prospecting platform.",
                    "Its database is one of its biggest attractions. Sales teams can filter companies and contacts based on attributes such as job title, industry, location, and company characteristics before adding prospects to outreach sequences.",
                    "Apollo also provides email automation, analytics, CRM integrations, and other sales intelligence capabilities.",
                    "The main advantage is convenience: prospecting and engagement sit relatively close together. For teams that need extensive data and a broad sales toolkit, Apollo is worth considering.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['B2B database, search, email sequences, and sales intelligence.'],
                    bullets: [
                      'B2B contact database',
                      'Company search',
                      'Email sequences',
                      'Sales intelligence',
                      'CRM integrations',
                      'Campaign analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong prospect database',
                        '✅ Prospecting and outreach combined',
                        '✅ Broad sales functionality',
                        '✅ Useful for growing sales teams',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Teams may still need additional tools for specialized deliverability or advanced outbound workflows.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 3 - Salesforge */}
                <ArticleSection
                  key="alternative-salesforge"
                  id="alternative-salesforge"
                  title="3. Salesforge — Best for AI-Powered Cold Email"
                  showImage={false}
                  intro={[
                    "Best for: Teams that want AI to accelerate email personalization and campaign creation.",
                    "Salesforge puts AI at the center of its outbound experience. Rather than relying entirely on manually written templates, teams can use AI to create more personalized messaging and streamline campaign preparation.",
                    "This can be useful for sales teams that already have prospect data but don't want reps spending hours researching and writing individual emails.",
                    "Salesforge also supports email campaign automation and deliverability-related workflows, making it more than simply an AI copywriting tool.",
                    "However, teams looking for a broader prospecting and multi-channel platform may need additional tools alongside it.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI personalization, cold email campaigns, sequences, and deliverability.'],
                    bullets: [
                      'AI email personalization',
                      'Cold email campaigns',
                      'Automated sequences',
                      'Deliverability features',
                      'Campaign management',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong AI focus',
                        '✅ Faster campaign creation',
                        '✅ Personalization at scale',
                        '✅ Useful for outbound-focused teams',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ More focused on email than a complete multi-channel outbound workflow.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 4 - Lemlist */}
                <ArticleSection
                  key="alternative-lemlist"
                  id="alternative-lemlist"
                  title="4. Lemlist — Best for Highly Personalized Outreach"
                  showImage={false}
                  intro={[
                    "Best for: Teams that want creative and personalized cold outreach.",
                    "Lemlist has long focused on making cold outreach more personalized. Beyond standard email personalization, teams can customize campaigns with dynamic images, videos, and other elements designed to make individual messages feel less generic.",
                    "The platform has also expanded beyond email, supporting LinkedIn outreach and broader sales engagement workflows.",
                    "For teams that believe personalization is central to their outbound strategy, Lemlist can be an attractive Instantly alternative.",
                    "Its focus, however, remains outreach execution rather than being a comprehensive prospect database.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Personalized email, dynamic content, LinkedIn, and automation.'],
                    bullets: [
                      'Personalized cold email',
                      'Dynamic content',
                      'LinkedIn outreach',
                      'Campaign automation',
                      'Email warm-up',
                      'Campaign analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong personalization capabilities',
                        '✅ Creative outreach options',
                        '✅ Multi-channel functionality',
                        '✅ Established outbound platform',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ You may need another solution for comprehensive prospect discovery.',
                      ],
                    },
                  ]}
                />

                {/* Alternative 5 - Reply.io */}
                <ArticleSection
                  key="alternative-reply"
                  id="alternative-reply"
                  title="5. Reply.io — Best for Multi-Channel Sales Engagement"
                  showImage={false}
                  intro={[
                    "Best for: Sales teams running structured sequences across several channels.",
                    "Reply.io is designed around sales engagement rather than email alone. Teams can create automated sequences that combine different outreach methods and use analytics to monitor campaign performance.",
                    "That makes it useful for organizations that have moved beyond email-only outreach and want a more coordinated engagement process.",
                    "Reply.io also offers AI-assisted capabilities, CRM integrations, and sales automation features.",
                    "For teams that need sophisticated sequence management, it's a strong alternative. However, prospect discovery may still require additional data sources depending on the team's requirements.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multi‑channel sequences, email automation, LinkedIn, and AI messaging.'],
                    bullets: [
                      'Multi-channel sequences',
                      'Email automation',
                      'LinkedIn outreach',
                      'AI-assisted messaging',
                      'CRM integrations',
                      'Campaign analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros',
                      paragraphs: [
                        '✅ Strong sequence automation',
                        '✅ Multi-channel support',
                        '✅ Mature sales engagement features',
                        '✅ Good CRM connectivity',
                      ],
                    },
                    {
                      subtitle: 'Cons',
                      paragraphs: [
                        '⚠️ Teams may need separate tools for prospect data and other parts of the outbound workflow.',
                      ],
                    },
                  ]}
                />

                {/* Comparison Table Section */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Instantly Alternatives: Feature Comparison
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here's how the top Instantly alternatives compare across key capabilities:</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                {/* Which Alternative Section */}
                <ArticleSection
                  key="which-alternative"
                  id="which-alternative"
                  title="Which Instantly Alternative Is Right for You?"
                  showImage={false}
                  intro={[
                    "There's no single best alternative for every sales team.",
                  ]}
                  infographic={{
                    title: 'How to choose',
                    paragraphs: ['Pick the platform that aligns with your team\'s primary needs.'],
                    bullets: [
                      'Choose 360Airo if you want to combine prospect discovery, AI personalization, multi-channel outreach, deliverability, and campaign analytics in one platform.',
                      'Choose Apollo.io if building prospect lists and accessing a broad sales intelligence database are your primary priorities.',
                      'Choose Salesforge if AI-powered email personalization is at the centre of your outbound strategy.',
                      'Choose Lemlist if creative personalization and multi-channel engagement are particularly important to your team.',
                      'Choose Reply.io if you need a mature sales engagement platform for managing structured multi-channel sequences.',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The important question',
                      paragraphs: [
                        'The important question isn\'t simply which tool can send the most emails. It\'s whether the platform supports the entire process that happens before, during, and after an email is sent.',
                      ],
                    },
                  ]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Turn More B2B Outreach Into Pipeline"
                  showImage={false}
                  intro={[
                    "More emails don't automatically mean more meetings.",
                    "The strongest outbound programs combine accurate prospect data, relevant messaging, consistent follow-ups, strong deliverability, and clear campaign insights.",
                    "360Airo brings those pieces together so your team can discover the right prospects, personalize outreach, engage buyers across multiple channels, and optimize campaigns without constantly adding another tool to the stack.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'From prospecting to analytics, 360Airo gives revenue teams a unified platform for outbound success.',
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
                    title: 'Benefits of Using Agentic AI for Sales Forecasting',
                    tag: 'AI',
                    href: '/blogs/benefits-agentic-ai-sales-forecasting',
                    description: 'Discover how Agentic AI improves forecast accuracy and pipeline visibility.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How Does the Lead Finder Feature Identify Ideal Customer Profiles?',
                    tag: 'Lead Generation',
                    href: '/blogs/how-lead-finder-identifies-ideal-customer-profiles',
                    description: 'Learn how AI-powered Lead Finder identifies ICP using firmographic data and sales intelligence.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Competitors Offering Similar Unlimited Inbox Pricing Models',
                    tag: 'Pricing',
                    href: '/blogs/competitors-offering-unlimited-inbox-pricing',
                    description: 'Compare unlimited inbox pricing vs per-user, contact, and send‑based models.',
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