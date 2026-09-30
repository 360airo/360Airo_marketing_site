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
  { id: 'what-does-crm-do', label: 'What Does a CRM Do?', arrow: true },
  { id: 'what-does-sales-intelligence-do', label: 'What Does Sales Intelligence Do?', arrow: true },
  { id: 'how-they-work-together', label: 'How Sales Intelligence and CRM Work Together', arrow: true },
  { id: 'which-one-do-you-need', label: 'Sales Intelligence vs CRM: Which One Does Your Team Need?', arrow: true },
  { id: 'do-you-need-both', label: 'Do You Need Both?', arrow: true },
  { id: 'crm-integration', label: 'Importance of CRM Integration', arrow: true },
  { id: 'for-different-teams', label: 'Sales Intelligence vs CRM for Different Sales Teams', arrow: true },
  { id: 'how-to-choose', label: 'How to Choose Between CRM and Sales Intelligence', arrow: true },
  { id: 'faqs', label: 'Frequently Asked Questions', arrow: true },
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
    alt: 'Sales intelligence vs CRM',
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
          CRM vs
          <br />
          Sales Intelligence
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Understand the key differences and learn how both can work together to improve your sales workflow.
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
          Use both, not either/or
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          CRM manages relationships; sales intelligence fuels them with better prospects and insights. They work best together.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component ---
function ComparisonTable() {
  const rows = [
    { crm: 'Manages customer and prospect relationships', intelligence: 'Finds and enriches prospect information' },
    { crm: 'Tracks deals and sales activities', intelligence: 'Identifies potential buying signals' },
    { crm: 'Stores account and contact records', intelligence: 'Adds external company and contact data' },
    { crm: 'Manages sales pipelines', intelligence: 'Helps prioritize high-potential prospects' },
    { crm: 'Tracks interactions', intelligence: 'Provides insights for prospecting' },
    { crm: 'Supports forecasting and reporting', intelligence: 'Supports prospect discovery and research' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">CRM</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Sales Intelligence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="CRM">{row.crm}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Sales Intelligence">{row.intelligence}</td>
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
          Ready to connect prospect intelligence with your sales workflow? Explore 360Airo's integrations and see how sales intelligence can fit into your existing GTM stack.
        </p>
        <Link href="/integrations">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Explore 360Airo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogSalesIntelligenceVsCRMPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/sales-intelligence-vs-crm.jpg';

  return (
    <>
      <Head>
        <title>Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need</title>
        <meta
          name="description"
          content="Understand the key differences between sales intelligence and CRM, how they work together, and which one your sales team needs to improve prospecting and pipeline management."
        />
        <meta
          name="keywords"
          content="sales intelligence, CRM, sales intelligence vs CRM, CRM integration, B2B sales, prospecting, lead generation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need"
        />
        <meta
          property="og:description"
          content="Understand the key differences between sales intelligence and CRM, how they work together, and which one your sales team needs to improve prospecting and pipeline management."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need"
        />
        <meta
          name="twitter:description"
          content="Understand the key differences between sales intelligence and CRM, how they work together, and which one your sales team needs to improve prospecting and pipeline management."
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
                  '@id': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences/#webpage',
                  'url': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences',
                  'name': 'Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need',
                  'description': 'Understand the key differences between sales intelligence and CRM, how they work together, and which one your sales team needs to improve prospecting and pipeline management.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences/#article',
                  'headline': 'Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need',
                  'description': 'Understand the key differences between sales intelligence and CRM, how they work together, and which one your sales team needs to improve prospecting and pipeline management.',
                  'url': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences',
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
                    '@id': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence',
                    'CRM',
                    'sales intelligence vs CRM',
                    'CRM integration',
                    'B2B sales',
                    'prospecting',
                    'lead generation',
                  ],
                  'datePublished': '2026-11-16',
                  'dateModified': '2026-11-16',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences/#breadcrumb',
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
                      'name': 'Sales Intelligence vs CRM',
                      'item': 'https://360airo.com/blogs/sales-intelligence-vs-crm-key-differences',
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
                  <span className="hidden sm:inline">Sales Intelligence vs CRM: Key Differences, Benefits &amp; Which You Need</span>
                  <span className="sm:hidden">Sales Intelligence vs CRM</span>
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
                      alt="Sales intelligence vs CRM"
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
                    Sales Intelligence vs CRM: Key Differences, Benefits &amp; Which You Need
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    CRM tells you what is happening with the prospects and customers already in your system. Sales intelligence helps you discover who to target, enrich the data, and identify why an account may be worth contacting now. Learn how both work together.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 8 min read</span>
                    <span>• 1.0K reads</span>
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
                    "CRM tells you what is happening with the prospects and customers already in your system. Sales intelligence helps you discover who to target, enrich the data, and identify why an account may be worth contacting now.",
                    "Sales intelligence and CRM may be distinct entities; however, they operate most efficiently when combined. CRM allows you to coordinate and manage relations with your customers, while sales intelligence allows you to find the right clients, recognize the purchasing signals, and decide whom to call and when. Simply put, CRM manages the sales process, while sales intelligence provides the required intelligence for it to be efficient.",
                  ]}
                  infographic={{
                    title: 'The core difference',
                    paragraphs: ['CRM manages relationships; sales intelligence fuels them with better data and insights.'],
                    bullets: [
                      'CRM: Tracks existing customers and opportunities',
                      'Sales Intelligence: Finds and researches new prospects',
                      'Together: A complete sales workflow from discovery to close',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What Does a CRM Do? */}
                <ArticleSection
                  key="what-does-crm-do"
                  id="what-does-crm-do"
                  title="What Does a CRM Do?"
                  showImage={true}
                  intro={[
                    "A CRM is primarily built to help businesses manage relationships throughout the sales cycle.",
                    "For example, when a salesperson finds a new prospect, they can add the contact to the CRM. From there, the team can record calls, schedule meetings, send follow-ups, update deal stages, assign tasks, and track whether the opportunity eventually becomes a customer.",
                    "Common CRM use cases include managing leads and contacts, tracking sales opportunities, managing sales pipelines, recording customer interactions, scheduling follow-ups, assigning tasks to sales representatives, creating sales reports, forecasting revenue, and managing customer information.",
                    "A CRM becomes especially valuable once your sales team is dealing with hundreds or thousands of prospects and needs a structured way to manage them.",
                    "However, a CRM typically depends on the quality of the information entered into it. If your database is outdated, incomplete, or missing important prospect information, your sales team may still spend significant time researching accounts before reaching out. That is where sales intelligence can help.",
                  ]}
                  infographic={{
                    title: 'CRM use cases',
                    paragraphs: ['A CRM provides the operational foundation for managing customer relationships.'],
                    bullets: [
                      'Managing leads and contacts',
                      'Tracking sales opportunities',
                      'Managing sales pipelines',
                      'Recording customer interactions',
                      'Scheduling follow-ups',
                      'Assigning tasks',
                      'Creating sales reports',
                      'Forecasting revenue',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What Does Sales Intelligence Do? */}
                <ArticleSection
                  key="what-does-sales-intelligence-do"
                  id="what-does-sales-intelligence-do"
                  title="What Does Sales Intelligence Do?"
                  showImage={false}
                  intro={[
                    "Sales intelligence enables salespeople to ask a different range of questions, which are as follows: Who should we target? Why should we target them? Why right now?",
                    "Sales intelligence tools can go beyond the information already collected in your CRM system to analyze extra data about relevant companies, relevant contacts, and buying intent signals.",
                    "Depending on the sales intelligence tool you use, those data might consist of companies and contacts data, enrichment for contacts and companies, changes in job positions, company expansion, hiring activity, technology usage, funding, signals from websites or research, intent, industry information, and insights at the account level.",
                    "As an illustration, let's say that the type of the customer you are after is a B2B company that is quickly building its sales team. You know based on your CRM system that ABC Technologies is your lead at the moment. Sales intelligence can give you additional insights such as: 'ABC Technologies recently entered two new markets and may be considering new sales technologies.'",
                    "Such additional insights can make a salesperson decide to engage with an account immediately rather than in three months' time.",
                  ]}
                  infographic={{
                    title: 'Sales intelligence answers',
                    paragraphs: ['Sales intelligence helps you find, enrich, and prioritize the right prospects.'],
                    bullets: [
                      'Who should we target?',
                      'Why should we target them?',
                      'Why right now?',
                      'Provides company and contact enrichment',
                      'Identifies buying signals and intent',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How They Work Together */}
                <ArticleSection
                  key="how-they-work-together"
                  id="how-they-work-together"
                  title="How Sales Intelligence and CRM Work Together"
                  showImage={false}
                  intro={[
                    "Sales intelligence does not necessarily replace your CRM. In many sales organizations, the two systems complement each other.",
                    "A typical workflow looks like this:",
                  ]}
                  infographic={{
                    title: 'Integrated workflow',
                    paragraphs: ['Sales intelligence feeds the CRM with better prospects and insights, creating a complete cycle.'],
                    bullets: [
                      '1. Identify target accounts with sales intelligence',
                      '2. Find relevant contacts and decision-makers',
                      '3. Enrich the data with additional company and contact information',
                      '4. Identify buying signals to prioritize accounts',
                      '5. Prioritize prospects based on potential',
                      '6. Sync information with the CRM',
                      '7. Manage the opportunity in the CRM (track outreach, meetings, deals)',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Which One Does Your Team Need? */}
                <ArticleSection
                  key="which-one-do-you-need"
                  id="which-one-do-you-need"
                  title="Sales Intelligence vs CRM: Which One Does Your Team Need?"
                  showImage={false}
                  intro={[
                    "The answer depends on the problem you are trying to solve.",
                    "Choose a CRM if you need to organize customer and prospect information, track sales activities, manage your pipeline, monitor deals, improve follow-up, create sales reports, and manage customer relationships.",
                    "Consider sales intelligence if you need to find more relevant prospects, improve lead quality, enrich incomplete contact records, identify decision-makers, discover buying signals, prioritize accounts, reduce manual prospect research, and improve outbound prospecting.",
                    "If your sales team already has a CRM but spends hours searching for prospects, researching companies, verifying contact information, or deciding which accounts to contact first, adding sales intelligence may solve a different part of the problem.",
                  ]}
                  infographic={{
                    title: 'Choose based on your challenge',
                    paragraphs: ['Pick the tool that solves your biggest gap in the sales process.'],
                    bullets: [
                      'CRM: For managing and tracking existing relationships',
                      'Sales Intelligence: For discovering and prioritizing new prospects',
                      'Both: For a complete prospect-to-revenue workflow',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Do You Need Both? */}
                <ArticleSection
                  key="do-you-need-both"
                  id="do-you-need-both"
                  title="Do You Need Both?"
                  showImage={false}
                  intro={[
                    "For many B2B sales teams, CRM and sales intelligence are not an either-or decision.",
                    "A CRM can provide the operational foundation for your sales process, while sales intelligence can improve the quality of the information feeding that process.",
                    "For example:",
                    "Without sales intelligence: Lead list → Manual research → CRM entry → Outreach → Follow-up",
                    "With sales intelligence + CRM: Target accounts → Prospect intelligence → Enrichment → Buying signals → CRM → Personalized outreach → Follow-up",
                    "The second workflow can reduce the amount of manual research sales representatives have to perform before they start selling.",
                  ]}
                  infographic={{
                    title: 'Both is often better',
                    paragraphs: ['Using both creates a more efficient and data-driven sales process.'],
                    bullets: [
                      'CRM: Provides structure for managing relationships',
                      'Sales Intelligence: Provides better data for prospecting',
                      'Together: A complete, efficient sales workflow',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Importance of CRM Integration */}
                <ArticleSection
                  key="crm-integration"
                  id="crm-integration"
                  title="Importance of CRM Integration"
                  showImage={false}
                  intro={[
                    "If you are considering sales intelligence software, CRM integration should be one of your evaluation criteria.",
                    "A disconnected sales intelligence tool can create another data silo. Your sales team may end up switching between multiple platforms and manually copying information from one system to another.",
                    "A good integration can help synchronize relevant information between your sales intelligence platform and CRM.",
                    "Before choosing a platform, check whether it can sync contacts and accounts, enrich existing CRM records, update outdated information, push qualified prospects into the CRM, support field mapping, reduce duplicate records, maintain data consistency, and fit into your existing sales workflow.",
                  ]}
                  infographic={{
                    title: 'CRM integration checklist',
                    paragraphs: ['Integration should reduce manual work and keep data consistent.'],
                    bullets: [
                      'Sync contacts and accounts',
                      'Enrich existing CRM records',
                      'Update outdated information',
                      'Push qualified prospects into CRM',
                      'Support field mapping',
                      'Reduce duplicate records',
                      'Maintain data consistency',
                      'Fit into your existing workflow',
                    ],
                  }}
                  blocks={[]}
                />

                {/* For Different Sales Teams */}
                <ArticleSection
                  key="for-different-teams"
                  id="for-different-teams"
                  title="Sales Intelligence vs CRM for Different Sales Teams"
                  showImage={false}
                  intro={[
                    "Small sales teams: A CRM can help establish a structured sales process. Sales intelligence becomes valuable when the team needs to scale prospecting without hiring a large research team.",
                    "Growing B2B teams: As the number of accounts increases, sales intelligence can help representatives identify and prioritize prospects instead of manually researching every company.",
                    "Enterprise sales teams: Large sales organizations often need both. CRM systems provide account and pipeline visibility, while sales intelligence can support account research, enrichment, intent signals, and prioritization.",
                    "Outbound sales teams: Sales intelligence can be particularly useful for outbound teams because prospect discovery and timing are central to their workflow.",
                  ]}
                  infographic={{
                    title: 'Team size matters',
                    paragraphs: ['Different teams benefit from sales intelligence in different ways.'],
                    bullets: [
                      'Small teams: CRM first, then sales intelligence to scale prospecting',
                      'Growing teams: Sales intelligence helps prioritize accounts',
                      'Enterprise: Both are essential for visibility and targeting',
                      'Outbound teams: Sales intelligence is critical for discovery and timing',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Choose */}
                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="How to Choose Between CRM and Sales Intelligence"
                  showImage={false}
                  intro={[
                    "Instead of asking, 'Should we buy a CRM or sales intelligence platform?', start by identifying your biggest sales challenge.",
                    "If your problem is poor pipeline management, start with a CRM but if your problem is finding enough qualified prospects, sales intelligence may provide more value.",
                    "If your CRM data is incomplete or outdated, look for sales intelligence with strong data enrichment and CRM integration.",
                    "If your salespeople spend too much time researching accounts, look for prospect intelligence, company intelligence, and AI-powered research capabilities.",
                    "If you want to improve the entire prospect-to-revenue workflow, consider using both together.",
                  ]}
                  infographic={{
                    title: 'Start with your problem',
                    paragraphs: ['Choose the tool that addresses your biggest bottleneck.'],
                    bullets: [
                      'Pipeline management → CRM',
                      'Prospecting and lead quality → Sales Intelligence',
                      'Outdated CRM data → Sales Intelligence with enrichment',
                      'Manual research → AI-powered Sales Intelligence',
                      'End-to-end workflow → Both',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about sales intelligence and CRM.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Is sales intelligence any different from CRM?',
                          paragraphs: ['Yes. A CRM manages the customer relationship, sales process, and pipeline. Sales intelligence offers some extra information that allows the sales team to find and analyze the prospects.'],
                        },
                        {
                          subtitle: 'Can sales intelligence replace a CRM?',
                          paragraphs: ['Typically, no. Sales intelligence and CRM tools solve different challenges. The former can assist with better prospecting and data, but the latter deals with the ongoing management of the relationship and sales process.'],
                        },
                        {
                          subtitle: 'Can sales intelligence be integrated with CRM?',
                          paragraphs: ['Yes. Most sales intelligence systems are designed to work alongside CRM solutions so that teams could enrich their contacts and use the data in a more efficient way.'],
                        },
                        {
                          subtitle: 'Can sales intelligence be helpful for small businesses?',
                          paragraphs: ['Yes. Small companies can benefit from sales intelligence because it would help them save time on prospect research and allow them to concentrate their sales efforts on the most valuable prospects.'],
                        },
                        {
                          subtitle: 'How does sales intelligence differ from revenue intelligence?',
                          paragraphs: ['Sales intelligence usually revolves around prospect, company, contact, and purchase data utilized in sales activities. Revenue intelligence, on the other hand, considers the bigger picture of revenue performance by combining all revenue-related data and sales activities.'],
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
                    "Sales Intelligence and CRM address different issues, but they can be used together to improve your sales process. CRM enables you to track your existing contacts and opportunities. Meanwhile, Sales Intelligence enables you to find new opportunities and know who needs your attention.",
                    "If you face problems such as low-quality leads, out-of-date information about your prospects, manual research, and the need to figure out whom to call, then Sales Intelligence can become an important source of additional intelligence for your existing sales stack.",
                    "It seems that the best solution is not the question of CRM versus Sales Intelligence, but rather CRM and Sales Intelligence combined.",
                  ]}
                  infographic={{
                    title: 'CRM + Sales Intelligence',
                    paragraphs: [
                      'The best approach is not either/or – it\'s both. CRM provides the structure; sales intelligence provides the fuel. Together, they create a complete, efficient sales process.',
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
                    title: 'How to Choose the Right Sales Intelligence Software',
                    tag: 'Listicles',
                    href: '/blogs/how-to-choose-sales-intelligence-software',
                    description: 'Follow this 8-step framework to choose the right sales intelligence software for your team.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '10 Benefits of Using a Sales Intelligence Platform for Small Businesses',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-platform-benefits-small-businesses',
                    description: 'Discover the 10 key benefits of using a sales intelligence platform for small businesses.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How Sales Intelligence Helps SMBs Find Better Leads',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-smb-better-leads',
                    description: 'Learn how sales intelligence helps SMBs identify the right prospects and generate more qualified leads.',
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