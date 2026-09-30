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
  { id: 'what-is-sales-intelligence', label: 'What Is Sales Intelligence?', arrow: true },
  { id: 'why-lead-gen-challenging', label: 'Why Lead Generation Is Challenging for SMBs', arrow: true },
  { id: 'how-sales-intelligence-helps', label: 'How Sales Intelligence Helps SMBs Find Better Leads', arrow: true },
  { id: 'sales-intelligence-workflow', label: 'A Simple Sales Intelligence Workflow for SMBs', arrow: true },
  { id: 'sales-intelligence-vs-traditional', label: 'Sales Intelligence vs. Traditional Lead Generation', arrow: true },
  { id: 'how-360airo-helps', label: 'How 360Airo Helps SMBs With Sales Intelligence', arrow: true },
  { id: 'metrics-to-track', label: 'What Metrics Should SMBs Track?', arrow: true },
  { id: 'faqs', label: 'FAQs', arrow: true },
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
    alt: 'Sales intelligence for SMBs',
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
          for SMBs
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Turn sales intelligence into better leads – find the right prospects at the right time.
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
          Quality over quantity
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Better data + better signals = better leads. Sales intelligence helps you find the right prospects, not more prospects.
        </p>
      </div>
    </aside>
  );
}

// --- Comparison Table Component ---
function ComparisonTable() {
  const rows = [
    { aspect: 'Focuses on', traditional: 'Lead volume', intelligence: 'Lead quality' },
    { aspect: 'Uses', traditional: 'Static lists', intelligence: 'Enriched prospect data' },
    { aspect: 'Research', traditional: 'Relies heavily on manual research', intelligence: 'Automates research and discovery' },
    { aspect: 'Prospect context', traditional: 'Limited', intelligence: 'Provides company and prospect insights' },
    { aspect: 'Targeting', traditional: 'Generic targeting', intelligence: 'ICP-based targeting' },
    { aspect: 'Prioritization', traditional: 'Manual prioritization', intelligence: 'Signal-based prioritization' },
    { aspect: 'Outreach timing', traditional: 'Reactive outreach', intelligence: 'More timely outreach' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Aspect</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Traditional Lead Generation</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Sales Intelligence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Aspect">{row.aspect}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Traditional Lead Generation">{row.traditional}</td>
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
          Ready to make your prospecting smarter? Start your free trial with 360Airo and turn sales intelligence into better leads.
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

export default function BlogSalesIntelligenceSMBPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/sales-intelligence-smb-leads.jpg';

  return (
    <>
      <Head>
        <title>How Sales Intelligence Helps SMBs Find Better Leads</title>
        <meta
          name="description"
          content="Learn how sales intelligence helps SMBs identify the right prospects, enrich lead data, detect buying signals, and generate more qualified leads for B2B sales."
        />
        <meta
          name="keywords"
          content="sales intelligence, SMB lead generation, B2B prospecting, lead enrichment, buying signals, AI prospecting"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/sales-intelligence-smb-better-leads"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How Sales Intelligence Helps SMBs Find Better Leads"
        />
        <meta
          property="og:description"
          content="Learn how sales intelligence helps SMBs identify the right prospects, enrich lead data, detect buying signals, and generate more qualified leads for B2B sales."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/sales-intelligence-smb-better-leads"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How Sales Intelligence Helps SMBs Find Better Leads"
        />
        <meta
          name="twitter:description"
          content="Learn how sales intelligence helps SMBs identify the right prospects, enrich lead data, detect buying signals, and generate more qualified leads for B2B sales."
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
                  '@id': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads/#webpage',
                  'url': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads',
                  'name': 'How Sales Intelligence Helps SMBs Find Better Leads',
                  'description': 'Learn how sales intelligence helps SMBs identify the right prospects, enrich lead data, detect buying signals, and generate more qualified leads for B2B sales.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads/#article',
                  'headline': 'How Sales Intelligence Helps SMBs Find Better Leads',
                  'description': 'Learn how sales intelligence helps SMBs identify the right prospects, enrich lead data, detect buying signals, and generate more qualified leads for B2B sales.',
                  'url': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads',
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
                    '@id': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence',
                    'SMB lead generation',
                    'B2B prospecting',
                    'lead enrichment',
                    'buying signals',
                    'AI prospecting',
                  ],
                  'datePublished': '2026-11-10',
                  'dateModified': '2026-11-10',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads/#breadcrumb',
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
                      'name': 'Sales Intelligence for SMBs',
                      'item': 'https://360airo.com/blogs/sales-intelligence-smb-better-leads',
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
                  <span className="hidden sm:inline">How Sales Intelligence Helps SMBs Find Better Leads</span>
                  <span className="sm:hidden">Sales Intelligence for SMBs</span>
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
                      alt="Sales intelligence SMB leads hero"
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
                    Lead Generation
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    How Sales Intelligence Helps SMBs Find Better Leads
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Sales intelligence enables SMBs to generate more effective leads through precise prospect information, lead enrichment, buying cues, and AI-based prospecting to identify the right companies and the right people at the right moment.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 9 min read</span>
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
                    "Sales intelligence enables SMBs to generate more effective leads through an amalgamation of precise prospect information, lead enrichment, buying cues, and AI-based prospecting to identify the right companies and the right people at the right moment. In place of wasting their hours searching for leads or sending identical communications to numerous prospects, salespeople can employ sales intelligence to pinpoint the right prospects who fit into their buyer persona, know their requirements, rank the high-value prospects, and personalize their communication with them.",
                  ]}
                  infographic={{
                    title: 'What is sales intelligence?',
                    paragraphs: ['Sales intelligence is the practice of gathering, organizing, and analyzing data related to firms and prospects to assist sales teams in making better prospecting decisions.'],
                    bullets: [
                      'Traditional lead generation: long lists of potential clients',
                      'Sales intelligence: informs which prospects are worth contacting and why',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-sales-intelligence"
                  id="what-is-sales-intelligence"
                  title="What Is Sales Intelligence?"
                  showImage={true}
                  intro={[
                    "Sales intelligence is the practice of gathering, organizing, and analyzing data related to firms and prospects to assist sales teams in making better prospecting decisions.",
                    "Traditional lead generation tends to rely on creating a long list of potential clients. Sales intelligence does even more for sales teams than that by informing them about the prospects that are worth contacting and why.",
                    "A sales intelligence solution can provide the following data:",
                  ]}
                  infographic={{
                    title: 'Data provided by sales intelligence',
                    paragraphs: ['Sales intelligence solutions provide a wide range of company and prospect data.'],
                    bullets: [
                      'Size and industry of the company',
                      'Revenue and location of the company',
                      'Job titles and decision-makers',
                      'Professional contact details',
                      'Growth and hiring activity of the company',
                      'Technology adoption',
                      'Company news',
                      'Buying signals',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-lead-gen-challenging"
                  id="why-lead-gen-challenging"
                  title="Why Lead Generation Is Challenging for SMBs"
                  showImage={false}
                  intro={[
                    "Lead generation can be particularly difficult for SMBs because sales teams often have fewer people and limited resources.",
                    "A salesperson may spend hours every week searching for potential companies, finding relevant decision-makers, looking for email addresses and phone numbers, checking whether contact information is accurate, researching companies before outreach, identifying potential buying signals, writing personalized messages, and following up with prospects.",
                    "The problem is that much of this work happens before the actual sales conversation.",
                    "There is also the issue of lead quality. A large database does not automatically mean a better pipeline. A prospect may fit your industry and company-size criteria but have no current need for your product.",
                    "This is where Sales Intelligence for SMBs becomes valuable. It helps sales teams evaluate prospects using more than basic demographic or firmographic information.",
                  ]}
                  infographic={{
                    title: 'The SMB lead gen challenge',
                    paragraphs: ['Small teams waste too much time on manual research – sales intelligence automates the process.'],
                    bullets: [
                      'Limited resources and small teams',
                      'Hours spent on manual research',
                      'Quality issues with large databases',
                      'Need for better prospect evaluation',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-sales-intelligence-helps"
                  id="how-sales-intelligence-helps"
                  title="How Sales Intelligence Helps SMBs Find Better Leads"
                  showImage={false}
                  intro={[
                    "Here are the key ways sales intelligence helps SMBs generate better leads:",
                  ]}
                  infographic={{
                    title: '5 ways sales intelligence improves SMB lead gen',
                    paragraphs: ['From ICP targeting to buying signals, sales intelligence transforms prospecting.'],
                    bullets: [
                      'Identifies Prospects That Match Your ICP',
                      'Makes Lead Enrichment Easier',
                      'Finds Decision-Makers Faster',
                      'Identifies Buying Signals',
                      'Enables AI Prospecting',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: '1. Identifies Prospects That Match Your ICP',
                      paragraphs: [
                        'Every business has an Ideal Customer Profile (ICP). For example, a B2B software company might target SaaS companies with 50–500 employees based in the US, with growing sales teams and VP or Head of Sales as decision-makers.',
                        'Instead of searching for leads randomly, sales intelligence allows teams to find companies matching these characteristics. This improves lead generation because sales representatives can begin with a more relevant prospect pool.',
                      ],
                    },
                    {
                      subtitle: '2. Makes Lead Enrichment Easier',
                      paragraphs: [
                        'A prospect record is only useful when the information is accurate and complete. However, lead databases often contain missing, outdated, or incomplete information. A contact may have changed jobs, a company may have grown significantly, or an important decision-maker may be missing from the database.',
                        'Lead enrichment helps fill these gaps by adding relevant information to existing prospect records. Depending on the platform, this may include job title, company information, work email, phone number, industry, company size, location, and other professional data. With better-enriched records, salespeople can understand who they are contacting and create more relevant outreach.',
                      ],
                    },
                    {
                      subtitle: '3. Finds Decision-Makers Faster',
                      paragraphs: [
                        'Finding a company is only the first step. Sales teams also need to identify the person who can influence or make the purchasing decision.',
                        'For example, if you sell cybersecurity software, contacting a random employee may not be effective. The relevant stakeholders could include a CISO, CTO, IT Director, or another technology leader. Sales intelligence can help teams identify relevant contacts based on their roles and responsibilities. This reduces the time spent searching across different platforms and helps salespeople reach the right person faster.',
                      ],
                    },
                    {
                      subtitle: '4. Identifies Buying Signals',
                      paragraphs: [
                        'One of the biggest advantages of sales intelligence is that it can provide information about timing. A company may be a perfect fit for your product but may not be ready to buy today.',
                        'Buying signals can help sales teams identify changes that may indicate a potential need. Common buying signals include a company hiring aggressively, expansion into a new market, new funding, leadership changes, rapid employee growth, new technology adoption, product launches, and increased engagement with relevant content.',
                        'For example, if a company is rapidly expanding its sales team, it may soon need tools to improve its prospecting and outbound process. Instead of contacting that company randomly, a salesperson now has a relevant reason to start a conversation.',
                      ],
                    },
                    {
                      subtitle: '5. Enables AI Prospecting',
                      paragraphs: [
                        'AI prospecting can automate several repetitive parts of lead generation. Instead of manually researching hundreds of companies, AI-powered systems can help identify potential prospects based on specific criteria, analyze available information, and prioritize accounts.',
                        'AI can also help sales teams understand prospects at scale. This is particularly useful for SMBs because a small sales team may not have enough time to manually research every account.',
                        'The combination is simple: better data + AI + relevant signals = smarter prospecting. However, AI prospecting works best when it is supported by reliable and relevant prospect data. Automation cannot compensate for poor targeting.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="sales-intelligence-workflow"
                  id="sales-intelligence-workflow"
                  title="A Simple Sales Intelligence Workflow for SMBs"
                  showImage={true}
                  intro={[
                    "Here is a practical workflow for implementing sales intelligence in an SMB sales team:",
                  ]}
                  infographic={{
                    title: '7‑step sales intelligence workflow',
                    paragraphs: ['From ICP definition to optimization – a complete process for better prospecting.'],
                    bullets: [
                      'Step 1: Identify Your Ideal Customer',
                      'Step 2: Create a Target Account List',
                      'Step 3: Enrich Lead Information',
                      'Step 4: Look for Buying Signals',
                      'Step 5: Prioritize Your Leads',
                      'Step 6: Personalize Outreach',
                      'Step 7: Track and Optimize',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Step 1: Identify Your Ideal Customer',
                      paragraphs: ['Begin with your ICP. Establish the attributes of industry, company size, location, position, and other elements that would define a good-fit customer for you.'],
                    },
                    {
                      subtitle: 'Step 2: Create a Target Account List',
                      paragraphs: ['Utilize the above parameters to determine which companies fit your ICP. This allows you to create a specific list rather than have a generic database comprising hundreds or even thousands of irrelevant leads.'],
                    },
                    {
                      subtitle: 'Step 3: Enrich Lead Information',
                      paragraphs: ['After identifying accounts, enrich the data of the company with relevant information about the person or people. This way, you will not only know whom to approach but also will have some useful background information for the conversation.'],
                    },
                    {
                      subtitle: 'Step 4: Look for Buying Signals',
                      paragraphs: ['Analyze the recent actions taken by the company and find out the possible buying signals. This way, you can prioritize your leads in terms of fit and timing.'],
                    },
                    {
                      subtitle: 'Step 5: Prioritize Your Leads',
                      paragraphs: ['All of your leads do not necessarily require the same amount of effort. Prioritize your leads based on ICP fit + buying signals + relevancy of the decision-makers + engagement.'],
                    },
                    {
                      subtitle: 'Step 6: Personalize Outreach',
                      paragraphs: ['Use the information collected during prospecting to make outreach more relevant. Instead of "Hi, we help companies improve their sales process," a salesperson can reference a relevant company event, role-specific challenge, or business change. The more relevant the message, the more likely it is to start a meaningful conversation.'],
                    },
                    {
                      subtitle: 'Step 7: Track and Optimize',
                      paragraphs: ['Finally, monitor campaign performance. Look at which types of prospects respond, which signals correlate with meetings, and which messaging generates the best engagement. Over time, these insights can improve your ICP and prospecting strategy.'],
                    },
                  ]}
                />

                <section id="sales-intelligence-vs-traditional" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Sales Intelligence vs. Traditional Lead Generation
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The key difference is context. Traditional lead generation may tell you who a potential customer is. Sales intelligence can help explain why that prospect may be worth contacting now.</p>
                    </div>

                    <ComparisonTable />
                  </div>
                </section>

                <ArticleSection
                  key="how-360airo-helps"
                  id="how-360airo-helps"
                  title="How 360Airo Helps SMBs With Sales Intelligence"
                  showImage={false}
                  intro={[
                    "For SMBs, using separate tools for prospect discovery, contact databases, enrichment, research, outreach, and campaign management can make the sales process fragmented.",
                    "360Airo brings these activities into a more connected workflow. With capabilities around prospect intelligence, contact databases, lead enrichment, AI prospecting, buying signals, and multichannel outreach, sales teams can move from finding a prospect to engaging them without relying entirely on manual research.",
                    "The workflow can look like: Find prospects → Enrich data → Identify buying signals → Prioritize → Personalize → Reach out → Follow up → Measure.",
                    "This can help SMB sales teams reduce repetitive prospecting work and spend more time on actual sales conversations.",
                    "The advantage is not simply automation. It is the ability to combine prospect information with actionable signals and outreach.",
                  ]}
                  infographic={{
                    title: '360Airo for SMBs',
                    paragraphs: ['A connected workflow from prospecting to engagement – all in one platform.'],
                    bullets: [
                      'Prospect intelligence and contact databases',
                      'Lead enrichment and AI prospecting',
                      'Buying signal detection',
                      'Multichannel outreach and follow-up',
                      'Campaign analytics and optimization',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="metrics-to-track"
                  id="metrics-to-track"
                  title="What Metrics Should SMBs Track?"
                  showImage={false}
                  intro={[
                    "Implementing sales intelligence should ultimately improve sales performance.",
                    "SMBs can track metrics such as:",
                  ]}
                  infographic={{
                    title: 'Key metrics for SMBs',
                    paragraphs: ['Track these metrics to measure the impact of sales intelligence on your pipeline.'],
                    bullets: [
                      'Lead Quality – Are prospects a good match for your ICP?',
                      'Data Accuracy – How many records contain usable, up-to-date information?',
                      'Response Rate – Are targeted prospects responding more frequently?',
                      'Meeting Booking Rate – How many prospects convert into qualified meetings?',
                      'Conversion Rate – How many leads become sales opportunities or customers?',
                      'Sales Cycle – Does better research help move opportunities faster?',
                      'Time Saved – How much time is saved on manual research and list building?',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why these metrics matter',
                      paragraphs: ['Tracking these metrics helps businesses understand whether their sales intelligence strategy is actually improving pipeline quality.'],
                    },
                  ]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    FAQs
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about sales intelligence for SMBs.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'How does sales intelligence improve lead generation?',
                          paragraphs: ['Sales intelligence improves lead generation by helping SMBs identify better-fit prospects, enrich contact data, detect buying signals, find decision-makers, and prioritize accounts. This allows sales teams to focus on prospects with stronger potential instead of relying only on large, generic lead lists.'],
                        },
                        {
                          subtitle: 'What is Sales Intelligence for SMBs?',
                          paragraphs: ['Sales Intelligence for SMBs involves the utilization of prospect, company, and buying signals data in order to enhance lead generation and sales prospecting.'],
                        },
                        {
                          subtitle: 'What is lead enrichment?',
                          paragraphs: ['Lead enrichment is the process of enriching the record of a prospect with missing or updated data such as job title, company data, contact details, industry, company size, etc.'],
                        },
                        {
                          subtitle: 'What are buying signals?',
                          paragraphs: ['Buying signals refer to the activity of a business firm or any event that indicates the possibility of having a demand for the products or services being offered. Examples of such activities include hiring, funding, expansion, leadership changes, technology adoption, and increased engagement.'],
                        },
                        {
                          subtitle: 'How does AI prospecting help SMBs?',
                          paragraphs: ['AI prospecting helps small businesses by automating repetitive research and prospect discovery activities. It is helpful in the identification of possible accounts, prospect information analysis, prioritization of leads, and personalization of outreach efforts.'],
                        },
                        {
                          subtitle: 'Can sales intelligence replace salespeople?',
                          paragraphs: ['No. Sales intelligence is used to complement the effort of salespeople and not as a replacement for them. It can be used to automate repetitive research and find better leads but the salesperson remains in charge of the conversation, relationship building, negotiations, and closing.'],
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
                    "Lead generation isn't a numbers game for SMBs.",
                    "It doesn't matter how many contacts you have; what matters is whether they are qualified enough to make your sales pipeline successful. It all comes down to identifying the right prospects according to your ICP and needs, and perhaps even contacting them.",
                    "That's where sales intelligence helps, as it incorporates elements of prospect intelligence, lead enrichment, contact information, buying intent, and AI prospecting.",
                    "In other words, sales teams can focus on qualified leads and not on searching for them.",
                  ]}
                  infographic={{
                    title: 'Start smarter prospecting',
                    paragraphs: ['Sales intelligence turns lead generation from a numbers game into a quality-driven process.'],
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
                  {
                    title: '15 Email Deliverability Tips Every Sales Team Should Know',
                    tag: 'Listicles',
                    href: '/blogs/email-deliverability-tips-sales-teams',
                    description: 'Master email deliverability with 15 proven tips for your sales team.',
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