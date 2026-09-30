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
  { id: 'benefit-1', label: '1. Find Better-Fit Prospects', arrow: true },
  { id: 'benefit-2', label: '2. Make Sales Prospecting Faster', arrow: true },
  { id: 'benefit-3', label: '3. Enrich Incomplete Lead Data', arrow: true },
  { id: 'benefit-4', label: '4. Identify Buying Signals', arrow: true },
  { id: 'benefit-5', label: '5. Improve Personalization With Customer Insights', arrow: true },
  { id: 'benefit-6', label: '6. Build a More Consistent Sales Pipeline', arrow: true },
  { id: 'benefit-7', label: '7. Help AI SDRs Focus on the Right Accounts', arrow: true },
  { id: 'benefit-8', label: '8. Keep CRM Data More Useful', arrow: true },
  { id: 'benefit-9', label: '9. Measure the Impact on Revenue', arrow: true },
  { id: 'benefit-10', label: '10. Give Small Sales Teams More Leverage', arrow: true },
  { id: 'use-cases', label: 'Sales Intelligence Use Cases by Industry', arrow: true },
  { id: 'comparison-table', label: 'Sales Intelligence vs. Traditional Prospecting', arrow: true },
  { id: 'how-to-choose', label: 'How to Choose a Sales Intelligence Platform', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
  { id: 'faqs', label: 'FAQs', arrow: true },
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
    alt: 'Sales intelligence platform benefits',
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
          Sales Intelligence
          <br />
          Platform
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Discover the 10 key benefits of using a sales intelligence platform for your small business.
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
          Intelligence over volume
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A smaller list of qualified prospects with buying signals outperforms a massive database of unqualified contacts.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component ---
function ComparisonTable() {
  const rows = [
    { aspect: 'Company research', traditional: 'Manual company research', intelligence: 'Automated account discovery' },
    { aspect: 'Lead lists', traditional: 'Static lead lists', intelligence: 'Dynamic prospect information' },
    { aspect: 'Prospect context', traditional: 'Limited', intelligence: 'Enriched customer insights' },
    { aspect: 'Outreach approach', traditional: 'Broad outreach', intelligence: 'Targeted outreach' },
    { aspect: 'Qualification', traditional: 'Manual qualification', intelligence: 'Data-driven prioritization' },
    { aspect: 'Workflow', traditional: 'Separate research and CRM workflows', intelligence: 'CRM Integration' },
    { aspect: 'Prospecting timing', traditional: 'Reactive prospecting', intelligence: 'Buying-signal-driven prospecting' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Aspect</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Traditional Prospecting</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Sales Intelligence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Aspect">{row.aspect}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Traditional Prospecting">{row.traditional}</td>
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
          Ready to make sales prospecting more efficient? Explore 360Airo and see how sales intelligence can help your team find and prioritize better opportunities.
        </p>
        <Link href="/demo">
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

export default function BlogSalesIntelligenceBenefitsPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/sales-intelligence-platform-benefits.jpg';

  return (
    <>
      <Head>
        <title>10 Benefits of Using a Sales Intelligence Platform for Small Businesses</title>
        <meta
          name="description"
          content="Discover the 10 key benefits of using a sales intelligence platform for small businesses – from better prospecting to measurable revenue impact."
        />
        <meta
          name="keywords"
          content="sales intelligence platform, small business sales, AI prospecting, lead enrichment, buying signals, CRM integration"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="10 Benefits of Using a Sales Intelligence Platform for Small Businesses"
        />
        <meta
          property="og:description"
          content="Discover the 10 key benefits of using a sales intelligence platform for small businesses – from better prospecting to measurable revenue impact."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="10 Benefits of Using a Sales Intelligence Platform for Small Businesses"
        />
        <meta
          name="twitter:description"
          content="Discover the 10 key benefits of using a sales intelligence platform for small businesses – from better prospecting to measurable revenue impact."
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
                  '@id': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses/#webpage',
                  'url': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses',
                  'name': '10 Benefits of Using a Sales Intelligence Platform for Small Businesses',
                  'description': 'Discover the 10 key benefits of using a sales intelligence platform for small businesses – from better prospecting to measurable revenue impact.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses/#article',
                  'headline': '10 Benefits of Using a Sales Intelligence Platform for Small Businesses',
                  'description': 'Discover the 10 key benefits of using a sales intelligence platform for small businesses – from better prospecting to measurable revenue impact.',
                  'url': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses',
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
                    '@id': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence platform',
                    'small business sales',
                    'AI prospecting',
                    'lead enrichment',
                    'buying signals',
                    'CRM integration',
                  ],
                  'datePublished': '2026-11-12',
                  'dateModified': '2026-11-12',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses/#breadcrumb',
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
                      'name': 'Sales Intelligence Platform Benefits',
                      'item': 'https://360airo.com/blogs/sales-intelligence-platform-benefits-small-businesses',
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
                  <span className="hidden sm:inline">10 Benefits of Using a Sales Intelligence Platform for Small Businesses</span>
                  <span className="sm:hidden">Sales Intelligence Benefits</span>
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
                      alt="Sales intelligence platform benefits"
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
                    10 Benefits of Using a Sales Intelligence Platform for Small Businesses
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Sales intelligence software helps small businesses find the proper prospects, understand their needs, recognize buying signals, enhance contact information, and improve the sales pipeline – all while saving time and resources.
                  </p>

                  {/* Meta info */}
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
                    "Sales intelligence software helps small businesses find the proper prospects, understand their needs, recognize buying signals, enhance their contact information, and improve the sales pipeline. In the case of small US sales teams, sales intelligence allows avoiding wasted hours of manual research, making reps focus on more promising prospects.",
                    "Using sales prospecting, AI prospecting, customer insights, Revenue Intelligence, AI SDR, and CRM integration features, sales intelligence enables transforming raw data into valuable insights.",
                    "The importance of sales intelligence for a small business is determined by the limited availability of both time and money. A small number of SDRs and account executives are responsible for creating the whole sales pipeline, which requires spending much money on researching companies, contacting decision-makers, validating information, and updating CRM records.",
                    "Sales intelligence automates many tasks in the process of building a sales pipeline, providing answers to three key questions: Who to contact? Why to contact? And why now?",
                  ]}
                  infographic={{
                    title: 'The 3 key questions',
                    paragraphs: ['Sales intelligence answers who to contact, why to contact, and why now.'],
                    bullets: [
                      'Who to contact? – Find the right decision-makers',
                      'Why to contact? – Understand their needs and challenges',
                      'Why now? – Identify buying signals and timing',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 1 */}
                <ArticleSection
                  key="benefit-1"
                  id="benefit-1"
                  title="1. Find Better-Fit Prospects"
                  showImage={true}
                  intro={[
                    "A larger lead list does not necessarily mean a better pipeline.",
                    "Sales intelligence lets businesses define an Ideal Customer Profile (ICP) using criteria such as industry, company size and revenue, location, job function and seniority, technology used, and growth and hiring activity.",
                    "For example, a US cybersecurity company targeting businesses with 100 to 500 employees could prioritize companies that also use cloud infrastructure or are expanding their IT teams.",
                  ]}
                  infographic={{
                    title: 'Better-fit prospects',
                    paragraphs: ['Define your ICP and find companies that match your ideal customer criteria.'],
                    bullets: [
                      'Industry',
                      'Company size and revenue',
                      'Location',
                      'Job function and seniority',
                      'Technology used',
                      'Growth and hiring activity',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 2 */}
                <ArticleSection
                  key="benefit-2"
                  id="benefit-2"
                  title="2. Make Sales Prospecting Faster"
                  showImage={false}
                  intro={[
                    "The traditional process of sales prospecting usually includes company search, decision maker identification, confirmation of contacts, account research, and CRM updates.",
                    "Using AI prospecting, one can automate some of the tasks and help the sales team to find accounts according to certain requirements.",
                    "Instead of 'Who can we find?', the sales representatives will be able to concentrate on the question 'Which companies fit our ICP and have indicators of our product requirement?'",
                  ]}
                  infographic={{
                    title: 'Faster prospecting',
                    paragraphs: ['Automate repetitive research so your team can focus on qualified leads.'],
                    bullets: [
                      'Automated company search',
                      'Faster decision-maker identification',
                      'Reduced manual research time',
                      'Focus on ICP-qualified accounts',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 3 */}
                <ArticleSection
                  key="benefit-3"
                  id="benefit-3"
                  title="3. Enrich Incomplete Lead Data"
                  showImage={false}
                  intro={[
                    "A CRM record with only a name, job title, and email address provides limited context.",
                    "Lead enrichment can add information such as company size, industry, revenue, technology usage, business growth, and other relevant account details.",
                    "For example, a basic record might show 'Sarah Johnson, VP of Sales, ABC Software.' An enriched record adds '250 employees, B2B SaaS company, growing sales team, recently entered a new market.'",
                    "Now the salesperson has useful context for qualification and outreach without manually researching the account.",
                  ]}
                  infographic={{
                    title: 'Lead enrichment',
                    paragraphs: ['Turn basic contact records into detailed prospect profiles.'],
                    bullets: [
                      'Company size and industry',
                      'Revenue and technology usage',
                      'Business growth indicators',
                      'Recent company activity',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 4 */}
                <ArticleSection
                  key="benefit-4"
                  id="benefit-4"
                  title="4. Identify Buying Signals"
                  showImage={false}
                  intro={[
                    "A buying signal is an event or behavior suggesting that a company may have a relevant business need.",
                    "Common examples include hiring for new positions, raising funding, expanding into new markets, hiring a new executive, launching a product, adopting new technology, and opening new locations.",
                    "For example, a US HR software company could monitor businesses that suddenly begin hiring heavily. That activity may indicate a growing need for HR technology.",
                    "Instead of contacting every company at random, sales reps can prioritize accounts showing relevant business changes.",
                  ]}
                  infographic={{
                    title: 'Buying signals',
                    paragraphs: ['Identify events that indicate a potential business need for your solution.'],
                    bullets: [
                      'Hiring for new positions',
                      'Raising funding',
                      'Expanding into new markets',
                      'New executive hires',
                      'Product launches',
                      'Technology adoption',
                      'Opening new locations',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 5 */}
                <ArticleSection
                  key="benefit-5"
                  id="benefit-5"
                  title="5. Improve Personalization With Customer Insights"
                  showImage={false}
                  intro={[
                    "Personalization is more than adding a prospect's first name to an email.",
                    "Customer insights can help salespeople understand what a company does, who its decision-makers are, what technology it uses, how it is growing, and what business changes are taking place.",
                    "Generic: 'We help companies improve sales productivity. Would you be available for a quick call?'",
                    "Context-based: 'I noticed your sales team has expanded significantly this year. As teams grow, keeping prospect data accurate and prioritizing accounts can become harder. We help sales teams automate that process.'",
                    "The second message gives the prospect a specific reason for the conversation.",
                  ]}
                  infographic={{
                    title: 'Context-based personalization',
                    paragraphs: ['Use insights to create relevant, specific outreach messages.'],
                    bullets: [
                      'Company news and changes',
                      'Technology stack insights',
                      'Growth and hiring activity',
                      'Decision-maker information',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 6 */}
                <ArticleSection
                  key="benefit-6"
                  id="benefit-6"
                  title="6. Build a More Consistent Sales Pipeline"
                  showImage={false}
                  intro={[
                    "Uncertainty about their pipeline is another challenge for many small businesses.",
                    "Sales intelligence can be of great help to Pipeline Generation through the continuous discovery of accounts, decision makers, buying signals, and prioritization of prospects.",
                    "The process looks as follows: ICP definition → Account discovery → Contact enrichment → Buying signal identification → Prospect prioritization → Personalized outreach → CRM sync → Results measurement.",
                    "In this way, a prospecting process that can be repeated becomes possible.",
                  ]}
                  infographic={{
                    title: 'Pipeline generation',
                    paragraphs: ['A repeatable prospecting process that generates consistent pipeline.'],
                    bullets: [
                      'ICP definition → Account discovery',
                      'Contact enrichment → Buying signal identification',
                      'Prospect prioritization → Personalized outreach',
                      'CRM sync → Results measurement',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 7 */}
                <ArticleSection
                  key="benefit-7"
                  id="benefit-7"
                  title="7. Help AI SDRs Focus on the Right Accounts"
                  showImage={false}
                  intro={[
                    "An AI SDR can assist with prospect research, lead qualification, prioritization, and outreach.",
                    "However, automation is only useful when the underlying data is relevant.",
                    "Sales intelligence can provide an AI SDR with information such as company size, industry, job role, technology usage, and buying signals.",
                    "The objective should not be to send more automated emails. It should be to identify better prospects and create more relevant conversations.",
                  ]}
                  infographic={{
                    title: 'AI SDR optimization',
                    paragraphs: ['Better data = better automation = better conversations.'],
                    bullets: [
                      'Company size and industry data',
                      'Job role and technology usage',
                      'Buying signals',
                      'Focus on relevance, not volume',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 8 */}
                <ArticleSection
                  key="benefit-8"
                  id="benefit-8"
                  title="8. Keep CRM Data More Useful"
                  showImage={false}
                  intro={[
                    "Your CRM is only as useful as the information inside it.",
                    "Outdated job titles, missing contact details, duplicate accounts, and incomplete company records can make sales teams less efficient.",
                    "This gives reps more context without requiring them to switch between multiple systems for every prospect.",
                    "CRM Integration can connect sales intelligence with existing sales workflows and help teams: enrich existing records, update prospect information, improve account segmentation, reduce manual data entry, and prioritize accounts.",
                  ]}
                  infographic={{
                    title: 'CRM integration',
                    paragraphs: ['Connect sales intelligence to your existing CRM for better data quality.'],
                    bullets: [
                      'Enrich existing records',
                      'Update prospect information',
                      'Improve account segmentation',
                      'Reduce manual data entry',
                      'Prioritize accounts',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 9 */}
                <ArticleSection
                  key="benefit-9"
                  id="benefit-9"
                  title="9. Measure the Impact on Revenue"
                  showImage={false}
                  intro={[
                    "Sales intelligence should be measured by sales outcomes, not the number of contacts in a database.",
                    "Businesses can track qualified leads generated, meetings booked, response rates, lead-to-opportunity conversion, pipeline value, sales cycle length, and revenue per salesperson.",
                    "For example, if an SDR spends 10 hours every week researching prospects, reducing that time through automation can free up hours for calls, meetings, and follow-ups.",
                    "A simple ROI framework is: Sales intelligence ROI = Additional gross profit + measurable productivity gains − platform costs.",
                    "The exact calculation varies, but these metrics help determine whether the technology is producing measurable value.",
                  ]}
                  infographic={{
                    title: 'Revenue impact',
                    paragraphs: ['Measure sales intelligence by outcomes, not database size.'],
                    bullets: [
                      'Qualified leads generated',
                      'Meetings booked',
                      'Response rates',
                      'Lead-to-opportunity conversion',
                      'Pipeline value',
                      'Sales cycle length',
                      'Revenue per salesperson',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Benefit 10 */}
                <ArticleSection
                  key="benefit-10"
                  id="benefit-10"
                  title="10. Give Small Sales Teams More Leverage"
                  showImage={true}
                  intro={[
                    "Large companies can have dedicated SDR teams, sales operations specialists, data analysts, and RevOps professionals.",
                    "A small business may have only a handful of salespeople handling most of these responsibilities.",
                    "Sales intelligence can automate parts of prospect research, data enrichment, prioritization, and pipeline development. This gives smaller teams more leverage without requiring sales headcount to grow at the same pace.",
                    "It does not replace salespeople. It gives them better information and more time to build relationships and close business.",
                  ]}
                  infographic={{
                    title: 'More leverage for small teams',
                    paragraphs: ['Small teams can compete with enterprise resources using smart automation.'],
                    bullets: [
                      'Automate prospect research',
                      'Automate data enrichment',
                      'Automate prioritization',
                      'More time for building relationships',
                      'Better information for closing deals',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Use Cases */}
                <ArticleSection
                  key="use-cases"
                  id="use-cases"
                  title="Sales Intelligence Use Cases by Industry"
                  showImage={false}
                  intro={[
                    "Different industries benefit from sales intelligence in different ways:",
                  ]}
                  infographic={{
                    title: 'Industry use cases',
                    paragraphs: ['Sales intelligence applies across multiple B2B industries.'],
                    bullets: [
                      'SaaS Companies – ICP matching, technology adoption, growth signals',
                      'IT and Cybersecurity – Identify businesses needing cloud, security, or managed services',
                      'Marketing Agencies – Growing, newly funded companies entering new markets',
                      'Recruitment Firms – Monitor hiring activity for talent needs',
                      'Professional Services – Consulting, accounting, and B2B firms identifying suitable accounts',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Comparison Table Section */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Sales Intelligence vs. Traditional Prospecting
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s how sales intelligence compares to traditional prospecting methods:</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                {/* How to Choose */}
                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="How to Choose a Sales Intelligence Platform"
                  showImage={false}
                  intro={[
                    "It is important for small businesses not to be restricted by database size alone. Consider the following questions:",
                  ]}
                  infographic={{
                    title: 'Selection criteria',
                    paragraphs: ['Evaluate these factors when choosing a sales intelligence platform.'],
                    bullets: [
                      'Is your data accurate? – Company and contact data correctness',
                      'Can you create lists based on your ICP?',
                      'Are there indicators to identify buying signals?',
                      'Is there AI assistance for prospecting and sales development?',
                      'Does it integrate with your sales stack CRM?',
                      'How easy is it for your team to adapt to the platform?',
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
                    "Sales Intelligence isn't all about having the largest database. It's all about making the right decisions using the prospect and business data.",
                    "AI Sales Prospecting is all about saving time on manual research. Account Enrichment helps to get additional information on the company. Signals help to determine the right moment for reaching out. CRM Integration makes sales workflows seamless. Revenue Intelligence allows for deeper insights into pipeline performance.",
                    "With 360Airo, small and mid-sized companies can transform their prospect data into sales intelligence and make the right decisions to find the right-fit accounts and prospects and create a qualified pipeline.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps small and mid-sized companies transform prospect data into sales intelligence – making it easier to find the right-fit accounts and build a qualified pipeline.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    FAQs
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about sales intelligence platforms for small businesses.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'What are some advantages of sales intelligence?',
                          paragraphs: ['Sales intelligence enables companies to discover better leads, enrich their leads, detect buying signals, personalize their outreach, enhance pipeline generation, and boost productivity of sales.'],
                        },
                        {
                          subtitle: 'How does sales intelligence enhance lead generation?',
                          paragraphs: ['With sales intelligence, the teams will be able to identify the right prospects based on ICP criteria, company information, customer knowledge, and buying signals.'],
                        },
                        {
                          subtitle: 'Is sales intelligence helpful for small companies?',
                          paragraphs: ['Yes, it is especially beneficial for smaller companies due to its capability to automate mundane research and help salespeople concentrate on qualified leads.'],
                        },
                        {
                          subtitle: 'What distinguishes sales intelligence from CRM?',
                          paragraphs: ['The CRM stores and manages data about customers and prospects. However, sales intelligence allows the team to identify the right prospects by enriching this information with signals.'],
                        },
                        {
                          subtitle: 'Can sales intelligence increase revenue?',
                          paragraphs: ['Sales intelligence can contribute to revenue growth through improving targeting, finding opportunities earlier, boosting productivity, and enabling building a steady pipeline. However, it depends on the quality of data, sales performance, market fit, and adoption.'],
                        },
                      ]}
                    />
                  </div>
                </section>

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
                    title: 'How Sales Intelligence Helps SMBs Find Better Leads',
                    tag: 'Listicles',
                    href: '/blogs/sales-intelligence-smb-better-leads',
                    description: 'Learn how sales intelligence helps SMBs identify the right prospects and generate more qualified leads.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '19 Cold Email Subject Lines That Get More Opens in 2026',
                    tag: 'Listicles',
                    href: '/blogs/cold-email-subject-lines-get-more-opens',
                    description: 'Discover 19 proven cold email subject lines that get more opens in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/cold-email-mistakes-killing-campaigns',
                    description: 'Avoid these 17 common cold email mistakes that quietly hurt your campaigns.',
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