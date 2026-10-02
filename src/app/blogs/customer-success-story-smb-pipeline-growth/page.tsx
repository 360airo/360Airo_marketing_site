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
  { id: 'why-pipeline-difficult', label: 'Why Pipeline Growth Becomes Difficult for SMBs', arrow: true },
  { id: 'three-businesses', label: 'Three Businesses Facing the Same Challenge', arrow: true },
  { id: 'how-360airo-changed', label: 'How 360 Airo Changed the Prospecting Process', arrow: true },
  { id: 'the-results', label: 'The Results', arrow: true },
  { id: 'before-and-after', label: 'Before and After', arrow: true },
  { id: 'why-improvements-happened', label: 'Why These Improvements Happened', arrow: true },
  { id: 'roi-beyond-revenue', label: 'The ROI Went Beyond Revenue', arrow: true },
  { id: 'lessons', label: 'Lessons Other SMBs Can Learn', arrow: true },
  { id: 'how-360airo-helps', label: 'How 360 Airo Helps Growing Businesses', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
  { id: 'faqs', label: 'Frequently Asked Questions', arrow: true },
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
    alt: 'Customer success story SMB pipeline growth',
    label: 'Case Study',
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
          Customer Success
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          See how SMBs increased their pipeline with 360 Airo – real stories, real results.
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
          Better data drives better results
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          These SMBs didn't work harder – they worked smarter with verified contacts and targeted prospecting.
        </p>
      </div>
    </aside>
  );
}

// --- Before/After Table ---
function BeforeAfterTable() {
  const rows = [
    { activity: 'Prospect research', before: 'Hours', after: 'Minutes' },
    { activity: 'Finding decision-makers', before: 'Manual', after: 'Faster' },
    { activity: 'Contact accuracy', before: 'Inconsistent', after: 'Verified' },
    { activity: 'Outreach personalization', before: 'Limited', after: 'More relevant' },
    { activity: 'Pipeline quality', before: 'Mixed', after: 'Stronger' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Sales Activity</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Before 360 Airo</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">After 360 Airo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Sales Activity">{row.activity}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Before 360 Airo">{row.before}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="After 360 Airo">{row.after}</td>
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
          Ready to increase your pipeline with better prospecting? See how 360 Airo can help your SMB find the right contacts, faster.
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

export default function BlogCustomerSuccessSMBPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/customer-success-smb-pipeline.jpg';

  return (
    <>
      <Head>
        <title>Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo</title>
        <meta
          name="description"
          content="Read real customer success stories of SMBs that increased their pipeline with 360 Airo. Learn how better prospect targeting, verified contacts, and AI-powered research drive growth."
        />
        <meta
          name="keywords"
          content="customer success story, SMB pipeline growth, sales intelligence case study, 360 Airo, prospecting, lead generation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/customer-success-story-smb-pipeline-growth"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo"
        />
        <meta
          property="og:description"
          content="Read real customer success stories of SMBs that increased their pipeline with 360 Airo. Learn how better prospect targeting, verified contacts, and AI-powered research drive growth."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/customer-success-story-smb-pipeline-growth"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo"
        />
        <meta
          name="twitter:description"
          content="Read real customer success stories of SMBs that increased their pipeline with 360 Airo. Learn how better prospect targeting, verified contacts, and AI-powered research drive growth."
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
                  '@id': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth/#webpage',
                  'url': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth',
                  'name': 'Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo',
                  'description': 'Read real customer success stories of SMBs that increased their pipeline with 360 Airo. Learn how better prospect targeting, verified contacts, and AI-powered research drive growth.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth/#article',
                  'headline': 'Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo',
                  'description': 'Read real customer success stories of SMBs that increased their pipeline with 360 Airo. Learn how better prospect targeting, verified contacts, and AI-powered research drive growth.',
                  'url': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth',
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
                    '@id': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'customer success story',
                    'SMB pipeline growth',
                    'sales intelligence case study',
                    '360 Airo',
                    'prospecting',
                    'lead generation',
                  ],
                  'datePublished': '2026-12-06',
                  'dateModified': '2026-12-06',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth/#breadcrumb',
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
                      'name': 'Customer Success Story',
                      'item': 'https://360airo.com/blogs/customer-success-story-smb-pipeline-growth',
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
                  <span className="hidden sm:inline">Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo</span>
                  <span className="sm:hidden">Customer Success SMB</span>
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
                      alt="Customer success story SMB pipeline growth"
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
                    Case Study
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    If you've been in sales within a small business environment, then you know the struggle. This case study shows how SMB sales teams solved their sales intelligence problems with 360 Airo – and increased pipeline quality, productivity, and revenue.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Dec 2026</span>
                    <span>• 8 min read</span>
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
                    "If you've been in sales within a small business environment, then you know what I'm talking about.",
                    "You start out trying to find ten great prospects. In two hours, you've opened up twenty tabs on LinkedIn, visited company sites, added names to an Excel sheet, and you still aren't sure whether or not you have identified the correct decision-maker.",
                    "That is the harsh reality of selling in many small businesses.",
                    "The problem is not that there aren't enough leads. The problem is finding the right leads before wasting any more sales time researching.",
                    "This is a case study on how SMB sales teams were able to solve their sales intelligence problems with 360 Airo.",
                  ]}
                  infographic={{
                    title: 'The SMB sales reality',
                    paragraphs: ['Small teams spend too much time on manual research – not because they lack effort, but because they lack reliable sales intelligence.'],
                    bullets: [
                      'Hours wasted on manual research',
                      'Outdated contact information',
                      'Wrong decision-makers contacted',
                      'Generic outreach with low replies',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-pipeline-difficult"
                  id="why-pipeline-difficult"
                  title="Why Pipeline Growth Becomes Difficult for SMBs"
                  showImage={true}
                  intro={[
                    "Small businesses rarely have dedicated teams for every stage of sales. One person often handles prospecting, cold emails, follow-ups, demos, and CRM updates. When finding prospects becomes a manual process, pipeline growth naturally slows down.",
                    "Some of the most common problems include:",
                  ]}
                  infographic={{
                    title: 'The pipeline bottleneck',
                    paragraphs: ['Manual research, outdated data, and wrong contacts slow down SMB sales teams.'],
                    bullets: [
                      'Spending hours researching companies',
                      'Finding outdated email addresses',
                      'Contacting the wrong decision-makers',
                      'Sending generic outreach that receives few replies',
                      'Wasting time on companies that don\'t fit the ideal customer profile',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Effort isn\'t the problem',
                      paragraphs: ['None of these problems come from a lack of effort. They come from a lack of reliable sales intelligence.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="three-businesses"
                  id="three-businesses"
                  title="Three Businesses Facing the Same Challenge"
                  showImage={false}
                  intro={[
                    "These examples reflect common situations faced by growing B2B businesses.",
                    "TechSpark Solutions: A growing SaaS company with eighteen employees. Their sales team depended heavily on manual LinkedIn research. Finding prospects took so long that outreach often happened much later than planned.",
                    "GrowthEdge Marketing: Wanted to expand into healthcare and manufacturing. Finding decision-makers across unfamiliar industries became increasingly difficult, and personalizing emails required too much research.",
                    "FinCore Services: Had plenty of contacts inside its CRM. The problem was that many of them were outdated. Emails bounced. Phone numbers didn't work. Sales reps spent time chasing conversations that never had a chance to happen.",
                    "Different industries. The same bottleneck.",
                  ]}
                  infographic={{
                    title: 'Three SMBs, one challenge',
                    paragraphs: ['TechSpark, GrowthEdge, and FinCore all faced the same prospecting bottleneck despite different industries.'],
                    bullets: [
                      'TechSpark Solutions: manual LinkedIn research, delayed outreach',
                      'GrowthEdge Marketing: unfamiliar industries, difficult decision-maker identification',
                      'FinCore Services: outdated CRM data, bounced emails, wasted time',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'What these teams wanted',
                      paragraphs: [
                        'None of these businesses wanted another complicated sales tool. They wanted something practical.',
                        'Their goals were straightforward: Build better prospect lists, find verified business contacts, identify decision-makers faster, personalize outreach without spending half an hour researching every company, and improve pipeline quality with the same team.',
                        'That\'s where 360 Airo entered the picture.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="how-360airo-changed"
                  id="how-360airo-changed"
                  title="How 360 Airo Changed the Prospecting Process"
                  showImage={false}
                  intro={[
                    "The biggest improvements happened before the first sales email was even sent. Instead of rebuilding their sales process, these businesses removed the slowest parts of it.",
                    "Smarter prospect lists: Before using 360 Airo, prospecting often started with Google searches, LinkedIn, or old spreadsheets. Now teams could filter companies by industry, employee count, revenue range, company size, and location. That immediately made prospect lists more focused. Instead of reaching out to hundreds of random businesses, they started with companies that actually matched their ideal customer profile.",
                    "Finding decision-makers became easier: Every sales rep knows this situation. You find a company. Now you have to figure out who actually makes buying decisions. Founder? CEO? Marketing Head? Operations Manager? That search often takes longer than finding the company itself. With 360 Airo, teams could identify relevant contacts much faster, allowing outreach to happen sooner.",
                    "Outreach became more personal: Everyone talks about personalization. The difficult part is doing it consistently. When sales reps already have useful company context, writing relevant emails becomes much easier. Instead of sending another generic pitch, they could reference details that actually mattered. That small shift helped conversations feel more natural.",
                  ]}
                  infographic={{
                    title: 'Three key changes',
                    paragraphs: ['Better lists, faster decision-maker identification, and more personal outreach – all before the first email.'],
                    bullets: [
                      'Smarter prospect lists – filter by industry, employee count, revenue, location',
                      'Faster decision-maker identification – find the right contacts quickly',
                      'More personal outreach – use company context for relevant messaging',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="the-results"
                  id="the-results"
                  title="The Results"
                  showImage={false}
                  intro={[
                    "Every business measured success differently, but several improvements appeared across all three teams.",
                    "Higher-quality pipeline: The biggest win wasn't simply getting more leads. It was getting better opportunities. Instead of filling the pipeline with companies that were unlikely to convert, teams focused on businesses that genuinely fit their offering. One team reported a 42% increase in qualified opportunities after improving prospect targeting.",
                    "Faster prospecting: Research that once took hours became much quicker. That extra time was spent on work that actually moved deals forward – discovery calls, follow-ups, demo preparation, relationship building. For small sales teams, saving several hours every week creates a meaningful advantage.",
                    "Better contact accuracy: Outdated contact information quietly hurts outbound performance. Every bounced email wastes effort. Every incorrect phone number slows momentum. Having verified business contacts helped reduce those unnecessary setbacks.",
                  ]}
                  infographic={{
                    title: 'Measurable improvements',
                    paragraphs: ['Better pipeline quality, faster prospecting, and verified contacts drove real business results.'],
                    bullets: [
                      '42% increase in qualified opportunities (one team)',
                      'Hours saved on research – more time for selling',
                      'Verified contacts reduced bounce rates and wasted effort',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Before/After Table */}
                <section id="before-and-after" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Before and After
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Here&apos;s how the prospecting process changed after implementing 360 Airo:</p>
                    </div>

                    <BeforeAfterTable />
                  </div>
                </section>

                <ArticleSection
                  key="why-improvements-happened"
                  id="why-improvements-happened"
                  title="Why These Improvements Happened"
                  showImage={false}
                  intro={[
                    "Many companies assume pipeline growth comes from sending more emails. In reality, better targeting usually matters more than higher volume.",
                    "Three things changed.",
                    "Better data: Sales reps stopped relying on outdated spreadsheets. Accurate business information reduced wasted outreach.",
                    "Better targeting: Filtering prospects by industry, company size, and revenue helped teams focus on businesses that actually matched their services.",
                    "Better conversations: Having useful company context before reaching out made conversations feel more relevant from the very beginning.",
                  ]}
                  infographic={{
                    title: 'The three drivers',
                    paragraphs: ['Better data, better targeting, and better conversations – not just more emails.'],
                    bullets: [
                      'Better data – accurate business information reduces wasted outreach',
                      'Better targeting – focus on ICP-aligned companies',
                      'Better conversations – relevant context from the start',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="roi-beyond-revenue"
                  id="roi-beyond-revenue"
                  title="The ROI Went Beyond Revenue"
                  showImage={false}
                  intro={[
                    "Revenue matters. But these SMBs also noticed operational improvements.",
                    "Sales reps became more productive: Instead of hiring additional SDRs immediately, existing teams simply worked more efficiently.",
                    "Less repetitive work: There was less copy-pasting. Less switching between tabs. Less cleaning spreadsheets.",
                    "More confidence: Knowing they were contacting the right people made sales reps more confident during outreach. That confidence often translated into stronger conversations.",
                  ]}
                  infographic={{
                    title: 'Beyond the numbers',
                    paragraphs: ['Productivity, efficiency, and confidence improved – not just revenue.'],
                    bullets: [
                      'More productive sales reps – no need to hire immediately',
                      'Less repetitive work – fewer tabs, less copy-pasting',
                      'More confidence – knowing you\'re contacting the right people',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="lessons"
                  id="lessons"
                  title="Lessons Other SMBs Can Learn"
                  showImage={false}
                  intro={[
                    "These customer success stories point to a few practical takeaways.",
                    "Quality beats quantity: A smaller list of qualified prospects usually performs better than a massive list of random contacts.",
                    "Verified contacts matter: Bad data wastes time and budget. Accurate contact information improves outreach performance.",
                    "Personalization doesn't need to be complicated: Even one relevant company insight can make an email feel more thoughtful.",
                    "Measure the right metrics: Don't focus only on lead volume. Track qualified opportunities, meetings booked, response rates, conversion rates, and pipeline value. Those numbers reveal whether your prospecting process is actually improving.",
                  ]}
                  infographic={{
                    title: 'Key takeaways',
                    paragraphs: ['Quality, verified data, simple personalization, and the right metrics drive better results.'],
                    bullets: [
                      'Quality beats quantity – a smaller list of qualified prospects performs better',
                      'Verified contacts matter – bad data wastes time and budget',
                      'Personalization doesn\'t need to be complicated – one relevant insight helps',
                      'Measure the right metrics – qualified opportunities, meetings booked, pipeline value',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-360airo-helps"
                  id="how-360airo-helps"
                  title="How 360 Airo Helps Growing Businesses"
                  showImage={false}
                  intro={[
                    "360 Airo brings together the tools SMB sales teams need most during prospecting.",
                    "Its capabilities include company search, verified contact discovery, decision-maker identification, business insights, prospect filtering, and revenue intelligence support.",
                    "Instead of switching between multiple platforms, sales teams can keep their prospecting workflow much more organized.",
                  ]}
                  infographic={{
                    title: '360 Airo capabilities',
                    paragraphs: ['Company search, verified contacts, decision-maker identification, and revenue intelligence.'],
                    bullets: [
                      'Company search',
                      'Verified contact discovery',
                      'Decision-maker identification',
                      'Business insights',
                      'Prospect filtering',
                      'Revenue intelligence support',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    "These businesses didn't increase their pipeline simply by working harder. They improved the quality of their prospecting.",
                    "By using 360 Airo, they spent less time searching for contacts, reached the right decision-makers faster, and built stronger pipelines with better-qualified opportunities.",
                    "For growing SMBs, that's often the difference between staying busy and actually growing sales.",
                  ]}
                  infographic={{
                    title: '360 Airo',
                    paragraphs: [
                      'For SMBs, smarter prospecting means stronger pipeline growth – without working harder.',
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
                      paragraphs={['Common questions about sales intelligence and pipeline growth for SMBs.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Is sales intelligence good for pipeline growth?',
                          paragraphs: ['Yes. Sales intelligence will allow companies to reach better prospects, qualify leads, and improve outreach to gain more qualified opportunities.'],
                        },
                        {
                          subtitle: 'What is a sales intelligence case study?',
                          paragraphs: ['Sales intelligence case studies describe the way companies make use of sales data and prospecting tools to enhance pipeline, productivity, and revenue.'],
                        },
                        {
                          subtitle: 'How can 360 Airo benefit SMB sales?',
                          paragraphs: ['360 Airo allows SMBs to locate verified contacts, decision-makers, ideal prospects, and personalize outreach based on company information.'],
                        },
                        {
                          subtitle: 'What is the main advantage of sales intelligence?',
                          paragraphs: ['The major advantage is spending less time on manual research and more time holding valuable conversations with qualified prospects.'],
                        },
                        {
                          subtitle: 'Why is it important to have verified contacts?',
                          paragraphs: ['It allows lowering the rate of emails bounces, increasing outreach precision, and reaching decision-makers.'],
                        },
                        {
                          subtitle: 'How do you measure pipeline growth?',
                          paragraphs: ['The main metrics that should be tracked are qualified opportunities, meetings booked, response rates, conversion rates, and opportunity values.'],
                        },
                      ]}
                    />
                  </div>
                </section>

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
                    title: 'ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026',
                    tag: 'Listicles',
                    href: '/blogs/zoominfo-alternatives-small-businesses-2026',
                    description: 'Compare the top 8 ZoomInfo alternatives for small businesses in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Best Apollo.io Alternatives for SMBs in 2026: 8 Better Options to Grow Sales Faster',
                    tag: 'Listicles',
                    href: '/blogs/best-apollo-alternatives-smb-2026',
                    description: 'Compare the top 8 Apollo.io alternatives for SMBs in 2026.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How to Choose the Right Sales Intelligence Platform for Your Business',
                    tag: 'Listicles',
                    href: '/blogs/how-to-choose-sales-intelligence-platform',
                    description: 'Learn how to choose the right sales intelligence platform for your business.',
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