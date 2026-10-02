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
  { id: 'what-is-sales-intelligence', label: 'What Is Sales Intelligence Software?', arrow: true },
  { id: 'step-1', label: 'Step 1: Define the Problem You Need to Solve', arrow: true },
  { id: 'step-2', label: 'Step 2: Evaluate Data Quality Before Database Size', arrow: true },
  { id: 'step-3', label: 'Step 3: Look for Useful Prospecting Capabilities', arrow: true },
  { id: 'step-4', label: 'Step 4: Check the Quality of AI Sales Tools', arrow: true },
  { id: 'step-5', label: 'Step 5: Evaluate CRM Sync Carefully', arrow: true },
  { id: 'step-6', label: 'Step 6: Understand Revenue Intelligence Capabilities', arrow: true },
  { id: 'step-7', label: 'Step 7: Test the User Experience', arrow: true },
  { id: 'step-8', label: 'Step 8: Calculate the Total Cost', arrow: true },
  { id: 'checklist', label: 'Sales Intelligence Software Evaluation Checklist', arrow: true },
  { id: 'comparison-table', label: 'A Simple Way to Compare Vendors', arrow: true },
  { id: 'common-mistakes', label: 'Common Mistakes When Buying Sales Intelligence Software', arrow: true },
  { id: 'conclusion', label: 'Conclusion', arrow: true },
  { id: 'faqs', label: 'FAQs', arrow: true },
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
    alt: 'Sales intelligence software selection',
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

// --- FAQ Accordion Component ---
const FaqAccordion = memo(function FaqAccordion({
  faqs,
}: {
  faqs: { subtitle: string; paragraphs: string[] }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]"
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span
                className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
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
});

const RightPromoCards = memo(function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4 pt-2">
          Sales Intelligence Selection Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Follow this 8-step framework to choose the right sales intelligence software for your team.
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
          Define your problem first
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The biggest mistake is buying features instead of solving a specific sales challenge. Start with your gap, then find the tool.
        </p>
      </div>
    </aside>
  );
});

// --- Comparison Table Component ---
const VENDOR_COMPARISON_ROWS = [
  { area: 'Data accuracy and freshness', weight: '25%' },
  { area: 'Prospecting and enrichment', weight: '20%' },
  { area: 'Buying signals and intelligence', weight: '15%' },
  { area: 'AI capabilities', weight: '15%' },
  { area: 'CRM Sync and integrations', weight: '10%' },
  { area: 'Ease of use and adoption', weight: '10%' },
  { area: 'Cost and ROI', weight: '5%' },
];

const VendorComparisonTable = memo(function VendorComparisonTable() {
  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Evaluation Area</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Weight</th>
          </tr>
        </thead>
        <tbody>
          {VENDOR_COMPARISON_ROWS.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Evaluation Area">{row.area}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Weight">{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
          Want to see if 360Airo is right for your sales process? Speak to Sales and discover the potential of 360Airo for your team.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Speak to Sales
          </motion.button>
        </Link>
      </div>
    </div>
  );
});

// --- Hoisted static FAQ data ---
const FAQ_ITEMS = [
  {
    subtitle: 'How to select sales intelligence software?',
    paragraphs: ['First of all, identify your key problem area. And then analyze data quality, prospecting tools, buying signals, AI, integration, usability, security, and cost. Try out shortlisted options with actual accounts before committing to one.'],
  },
  {
    subtitle: 'What should be included in sales intelligence software?',
    paragraphs: ['Main components are quality data, lead enrichment, filters, buying signals, account intelligence, AI-powered research, CRM integration, and reporting. Advanced sales teams might require Revenue Intelligence and AI SDR.'],
  },
  {
    subtitle: 'Does sales intelligence software replace CRM?',
    paragraphs: ['Not really. While a CRM is focused on internal customers, prospects, interactions, and opportunities, sales intelligence software provides you with additional data, insights, and signals that will help you uncover, research, and prioritize the opportunity.'],
  },
  {
    subtitle: 'How much does sales intelligence software cost?',
    paragraphs: ['The cost of such software is quite high. The cost depends on the vendor you have chosen and varies based on number of seats, data, credits, AI, integrations, and terms of agreement.'],
  },
  {
    subtitle: 'Should small businesses use an AI SDR?',
    paragraphs: ['An AI SDR can be useful when a team wants to automate repetitive prospecting and sales development tasks. However, evaluate data quality, personalization, human oversight, deliverability controls, and CRM integration before adopting one.'],
  },
  {
    subtitle: 'How can I measure the ROI of sales intelligence software?',
    paragraphs: ["Track metrics such as prospect research time, qualified leads, meetings booked, conversion rates, pipeline generated, sales cycle length, and revenue influenced. Compare these improvements against the platform's total cost."],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
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
  {
    title: '19 Cold Email Subject Lines That Get More Opens in 2026',
    tag: 'Listicles',
    href: '/blogs/cold-email-subject-lines-get-more-opens',
    description: 'Discover 19 proven cold email subject lines that get more opens in 2026.',
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

export default function BlogHowToChooseSalesIntelligencePage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/how-to-choose-sales-intelligence.jpg';

  return (
    <>
      <Head>
        <title>How to Choose the Right Sales Intelligence Software</title>
        <meta
          name="description"
          content="Learn how to choose the right sales intelligence software with this 8-step framework. Evaluate data quality, AI capabilities, CRM integration, and more."
        />
        <meta
          name="keywords"
          content="sales intelligence software, choose sales intelligence, sales prospecting, AI sales tools, CRM integration, Revenue Intelligence"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/how-to-choose-sales-intelligence-software"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How to Choose the Right Sales Intelligence Software"
        />
        <meta
          property="og:description"
          content="Learn how to choose the right sales intelligence software with this 8-step framework. Evaluate data quality, AI capabilities, CRM integration, and more."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/how-to-choose-sales-intelligence-software"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How to Choose the Right Sales Intelligence Software"
        />
        <meta
          name="twitter:description"
          content="Learn how to choose the right sales intelligence software with this 8-step framework. Evaluate data quality, AI capabilities, CRM integration, and more."
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
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software/#webpage',
                  'url': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software',
                  'name': 'How to Choose the Right Sales Intelligence Software',
                  'description': 'Learn how to choose the right sales intelligence software with this 8-step framework. Evaluate data quality, AI capabilities, CRM integration, and more.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software/#article',
                  'headline': 'How to Choose the Right Sales Intelligence Software',
                  'description': 'Learn how to choose the right sales intelligence software with this 8-step framework. Evaluate data quality, AI capabilities, CRM integration, and more.',
                  'url': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software',
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
                    '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence software',
                    'choose sales intelligence',
                    'sales prospecting',
                    'AI sales tools',
                    'CRM integration',
                    'Revenue Intelligence',
                  ],
                  'datePublished': '2026-11-14',
                  'dateModified': '2026-11-14',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software/#breadcrumb',
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
                      'name': 'How to Choose Sales Intelligence',
                      'item': 'https://360airo.com/blogs/how-to-choose-sales-intelligence-software',
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
                  <span className="hidden sm:inline">How to Choose the Right Sales Intelligence Software</span>
                  <span className="sm:hidden">Sales Intelligence Selection</span>
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
                      alt="Choose sales intelligence software"
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
                    How to Choose the Right Sales Intelligence Software
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Determine your sales challenge first, then analyze data quality, prospects generation, buying signs, AI features, integration with your CRM, usability, and cost. Follow this 8-step framework to find the right tool for your team.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.2K reads</span>
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
                    'Determine your sales challenge first, then analyze data quality, prospects generation, buying signs, AI features, integration with your CRM, usability, and cost. Not every sales intelligence platform which has the largest number of contacts or features is the best. Find the tool that provides useful information for your sales team and integrates well with your existing process and workflow to help reps convert intelligence into a pipeline.',
                    'There are many solutions out there, and choosing the appropriate one may be difficult for US small and medium enterprises. Nowadays, almost all sales platforms offer not only contact databases, but also sales prospecting, AI sales tools, intent data, automation, and revenue intelligence features as well. All their lists of features are quite similar. The main thing here is to analyze the outcome.',
                  ]}
                  infographic={{
                    title: 'Start with your problem, not features',
                    paragraphs: ["The best tool solves your specific sales challenge – not the vendor's feature list."],
                    bullets: [
                      'Define your sales challenge first',
                      'Evaluate data quality and prospecting capabilities',
                      'Check AI features and CRM integration',
                      'Test usability and calculate total cost',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-sales-intelligence"
                  id="what-is-sales-intelligence"
                  title="What Is Sales Intelligence Software?"
                  showImage={true}
                  intro={[
                    'Sales Intelligence software gathers and processes information regarding prospects, businesses, buyers, and sales activities that will enable your team to make more informed sales decisions. Contemporary systems can integrate firmographics data, contact details, technology usage, buying signals, engagement activities, and CRM data.',
                    "In practice, useful sales intelligence is supposed to assist your team in figuring out such questions as which accounts match our ICP, who are the right decision-makers, which prospects show buying signals, what happened in the account, and what's next for the salesperson.",
                  ]}
                  infographic={{
                    title: 'What sales intelligence answers',
                    paragraphs: ['Useful sales intelligence helps answer the key questions every sales team faces.'],
                    bullets: [
                      'Which accounts match our ICP?',
                      'Who are the right decision-makers?',
                      'Which prospects show buying signals?',
                      'What happened in the account?',
                      "What's next for the salesperson?",
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 1 */}
                <ArticleSection
                  key="step-1"
                  id="step-1"
                  title="Step 1: Define the Problem You Need to Solve"
                  showImage={false}
                  intro={[
                    'Before comparing vendors, identify the biggest gap in your current sales process.',
                    'Are your SDRs spending too much time finding prospects? Is your contact data outdated? Are reps struggling to identify decision-makers? Is your pipeline too dependent on manual prospecting? Do sales managers lack visibility into deal health? Do you want to automate parts of prospecting with an AI SDR?',
                    'Your answer determines which features matter most. For example, if your primary problem is finding qualified accounts, prioritize sales prospecting, data enrichment, and buying signals. If pipeline visibility is the bigger problem, Revenue Intelligence and forecasting capabilities may matter more.',
                    'Buying software before defining the problem often leads to paying for features your team rarely uses.',
                  ]}
                  infographic={{
                    title: 'Define your problem first',
                    paragraphs: ['Your sales challenge determines which features actually matter.'],
                    bullets: [
                      'Too much time on prospect research → prioritize prospecting and enrichment',
                      'Outdated contact data → prioritize data freshness and verification',
                      'Limited pipeline visibility → prioritize Revenue Intelligence',
                      'Need automation → prioritize AI SDR capabilities',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 2 */}
                <ArticleSection
                  key="step-2"
                  id="step-2"
                  title="Step 2: Evaluate Data Quality Before Database Size"
                  showImage={false}
                  intro={[
                    'A large database is not automatically a good database. The information needs to be accurate, fresh, relevant to your target market, and useful for your sales motion. Data freshness and accuracy have become major differentiators as sales intelligence platforms increasingly offer similar feature sets.',
                    'Ask vendors: How frequently is contact data updated? How are emails and phone numbers verified? How is outdated information removed? What geographic coverage is available? Can you test the data against your existing prospect list? Does the platform provide company and contact enrichment?',
                  ]}
                  infographic={{
                    title: 'Data quality questions',
                    paragraphs: ["Database size doesn't matter if the data isn't accurate and fresh."],
                    bullets: [
                      'How frequently is contact data updated?',
                      'How are emails and phone numbers verified?',
                      'How is outdated information removed?',
                      'What geographic coverage is available?',
                      'Can you test the data against your existing list?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 3 */}
                <ArticleSection
                  key="step-3"
                  id="step-3"
                  title="Step 3: Look for Useful Prospecting Capabilities"
                  showImage={false}
                  intro={[
                    'A good sales prospecting platform should make it easier to find the accounts and people who actually matter.',
                    'Look for company and contact search, firmographic filters, job title and seniority filters, industry and location filters, technographic data, lead and account enrichment, account scoring, and buying or intent signals.',
                    'The platform should allow your team to build lists around your actual ICP rather than forcing you to work with generic filters.',
                    'For example, a B2B software company might want to find US companies with 200 to 1,000 employees, using a specific technology, hiring sales leadership, and operating in selected industries. The more precisely you can define your target account, the more useful your prospecting workflow becomes.',
                  ]}
                  infographic={{
                    title: 'Prospecting capabilities',
                    paragraphs: ['Build precise ICP-based lists with filters that actually matter.'],
                    bullets: [
                      'Company and contact search',
                      'Firmographic filters',
                      'Job title and seniority filters',
                      'Industry and location filters',
                      'Technographic data',
                      'Lead and account enrichment',
                      'Account scoring',
                      'Buying or intent signals',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 4 */}
                <ArticleSection
                  key="step-4"
                  id="step-4"
                  title="Step 4: Check the Quality of AI Sales Tools"
                  showImage={false}
                  intro={[
                    "AI is now a major part of sales intelligence software, but 'AI-powered' does not automatically mean useful.",
                    'Evaluate what the AI actually does. Can it research an account, summarize relevant company information, identify potential prospects, prioritize accounts, generate personalized messaging, detect buying signals, recommend next actions, and update CRM records?',
                    'If you are considering an AI SDR, also evaluate how much human oversight it provides. Good AI should improve relevance and productivity, not simply increase the number of emails sent.',
                    'Ask for a live demonstration using your type of prospect, not a vendor-selected example.',
                  ]}
                  infographic={{
                    title: 'AI quality checklist',
                    paragraphs: ['AI should improve relevance and productivity – not just volume.'],
                    bullets: [
                      'Research an account',
                      'Summarize relevant company information',
                      'Identify potential prospects',
                      'Prioritize accounts',
                      'Generate personalized messaging',
                      'Detect buying signals',
                      'Recommend next actions',
                      'Update CRM records',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 5 */}
                <ArticleSection
                  key="step-5"
                  id="step-5"
                  title="Step 5: Evaluate CRM Sync Carefully"
                  showImage={false}
                  intro={[
                    'CRM integration should be more than a logo on an integrations page. Your sales intelligence platform should fit naturally into the systems your sales team already uses. Modern platforms increasingly support two-way CRM syncing, enrichment, activity updates, and workflow automation.',
                    'Check whether the platform supports two-way data sync, custom field mapping, automatic enrichment, duplicate prevention, activity logging, account and contact updates, and permission controls.',
                    'Ask one critical question: Will this tool reduce work for my sales reps, or create another system they have to maintain? If reps have to manually move information between platforms, adoption will likely suffer.',
                  ]}
                  infographic={{
                    title: 'CRM integration checklist',
                    paragraphs: ['Integration should reduce work – not create another system to manage.'],
                    bullets: [
                      'Two-way data sync',
                      'Custom field mapping',
                      'Automatic enrichment',
                      'Duplicate prevention',
                      'Activity logging',
                      'Account and contact updates',
                      'Permission controls',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 6 */}
                <ArticleSection
                  key="step-6"
                  id="step-6"
                  title="Step 6: Understand Revenue Intelligence Capabilities"
                  showImage={false}
                  intro={[
                    'Not every sales intelligence platform needs advanced Revenue Intelligence. But if your goal extends beyond prospecting, evaluate how the platform can help you understand the entire revenue process.',
                    'Revenue Intelligence can use information from CRM records, sales activity, conversations, and other signals to provide visibility into pipeline health, deal risk, sales performance, and forecasting.',
                    'Look for capabilities such as pipeline analytics, deal risk identification, forecasting, opportunity scoring, sales activity analysis, revenue trends, and performance reporting. This becomes particularly valuable as a business grows and sales leaders need more than a list of prospects.',
                  ]}
                  infographic={{
                    title: 'Revenue Intelligence features',
                    paragraphs: ['For growing teams, Revenue Intelligence provides visibility beyond prospecting.'],
                    bullets: [
                      'Pipeline analytics',
                      'Deal risk identification',
                      'Forecasting',
                      'Opportunity scoring',
                      'Sales activity analysis',
                      'Revenue trends',
                      'Performance reporting',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 7 */}
                <ArticleSection
                  key="step-7"
                  id="step-7"
                  title="Step 7: Test the User Experience"
                  showImage={false}
                  intro={[
                    'A platform can have excellent data and still fail if your sales team does not use it.',
                    'During a trial, ask several reps to complete common tasks: Find 20 ICP accounts, identify decision-makers, research five accounts, find relevant buying signals, create an outreach list, and push the information into the CRM. Track how long each task takes.',
                    'Also ask the reps: Would you actually use this every day? Seller adoption is a critical part of sales technology ROI. A feature that exists but is rarely used has little practical value.',
                  ]}
                  infographic={{
                    title: 'Test with real reps',
                    paragraphs: ['Seller adoption determines ROI – test with your team before committing.'],
                    bullets: [
                      'Find 20 ICP accounts',
                      'Identify decision-makers',
                      'Research five accounts',
                      'Find relevant buying signals',
                      'Create an outreach list',
                      'Push information into CRM',
                      'Track task completion time',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Step 8 */}
                <ArticleSection
                  key="step-8"
                  id="step-8"
                  title="Step 8: Calculate the Total Cost"
                  showImage={false}
                  intro={[
                    'Do not compare platforms using the headline subscription price alone.',
                    'Look at the complete cost, including per-user pricing, data credits, enrichment costs, AI usage, implementation, CRM integration, additional features, contract commitments, and admin time.',
                    'A platform that appears cheaper may become more expensive once you add the features your team actually needs.',
                    'Then compare the cost with measurable outcomes such as time saved, qualified meetings generated, pipeline created, and revenue influenced.',
                  ]}
                  infographic={{
                    title: 'Calculate total cost',
                    paragraphs: ['Headline price is just the beginning – consider all costs.'],
                    bullets: [
                      'Per-user pricing',
                      'Data credits',
                      'Enrichment costs',
                      'AI usage',
                      'Implementation',
                      'CRM integration',
                      'Additional features',
                      'Contract commitments',
                      'Admin time',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Checklist */}
                <ArticleSection
                  key="checklist"
                  id="checklist"
                  title="Sales Intelligence Software Evaluation Checklist"
                  showImage={false}
                  intro={[
                    "Before choosing a platform, make sure you can answer 'yes' to the questions that matter most:",
                  ]}
                  infographic={{
                    title: 'Evaluation checklist',
                    paragraphs: ['Score each platform against these questions before making a decision.'],
                    bullets: [
                      '☐ Does the data match our target market?',
                      '☐ Can we build precise ICP-based prospect lists?',
                      '☐ Are contact and company records regularly updated?',
                      '☐ Does it provide useful buying signals?',
                      '☐ Can it enrich our existing data?',
                      '☐ Are the AI sales tools actually useful for our workflow?',
                      '☐ Can an AI SDR operate with appropriate human oversight?',
                      '☐ Does it integrate with our CRM?',
                      '☐ Does CRM Sync work reliably?',
                      '☐ Can our sales reps learn it quickly?',
                      '☐ Does it provide the reporting or Revenue Intelligence we need?',
                      '☐ Is the total cost clear?',
                      '☐ Can we measure ROI?',
                      '☐ Does the vendor provide adequate security and privacy controls?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Comparison Table Section */}
                <section id="comparison-table" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    A Simple Way to Compare Vendors
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>Instead of choosing based on the most impressive demo, score each platform against your actual priorities.</p>
                      <p>You can change these weights depending on your sales model. For an outbound-heavy SDR team, prospecting and data quality may deserve more weight. For a mature RevOps organization, CRM integration and revenue analytics may matter more.</p>
                    </div>

                    <VendorComparisonTable />
                  </div>
                </section>

                {/* Common Mistakes */}
                <ArticleSection
                  key="common-mistakes"
                  id="common-mistakes"
                  title="Common Mistakes When Buying Sales Intelligence Software"
                  showImage={false}
                  intro={[
                    'Choosing the biggest database – More contacts do not necessarily mean better prospects.',
                    'Buying based on AI features alone – A flashy AI demo cannot compensate for inaccurate data or poor workflow integration.',
                    'Ignoring CRM compatibility – If the platform does not work well with your CRM, your team may spend more time managing data.',
                    'Focusing only on price – The cheapest tool is not necessarily the lowest-cost option if it produces poor data or low adoption.',
                    'Skipping the trial – Always test the platform with real accounts and real sales workflows before making a long-term commitment.',
                  ]}
                  infographic={{
                    title: 'Avoid these mistakes',
                    paragraphs: ['The most common pitfalls when buying sales intelligence software.'],
                    bullets: [
                      'Choosing the biggest database',
                      'Buying based on AI features alone',
                      'Ignoring CRM compatibility',
                      'Focusing only on price',
                      'Skipping the trial',
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
                    'Finding the best sales intelligence solution begins with your own sales process rather than a list of vendor features.',
                    'The solution should have accurate data, efficient sales prospecting, valuable buying signals, useful AI sales solutions, effective CRM Sync, and appropriate Revenue Intelligence. Above all, try the solution out on actual prospects and assess if it reduces the amount of time you spend researching prospects.',
                    '360Airo combines sales intelligence, sales prospecting, AI workflows, and actionable data in one solution that helps you find and prioritize opportunities.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo combines sales intelligence, sales prospecting, AI workflows, and actionable data in one solution that helps you find and prioritize opportunities.',
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
                      paragraphs={['Common questions about choosing sales intelligence software.']}
                    />
                    <FaqAccordion faqs={FAQ_ITEMS} />
                  </div>
                </section>

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