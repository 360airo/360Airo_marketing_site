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
  { id: 'what-is-prospecting-accuracy', label: 'What Is Prospecting Accuracy?', arrow: true },
  { id: 'why-traditional-falls-short', label: 'Why Traditional Prospecting Falls Short', arrow: true },
  { id: 'how-sales-intelligence-improves', label: 'How Sales Intelligence Improves Prospecting Accuracy', arrow: true },
  { id: 'workflow', label: 'The Sales Intelligence Workflow', arrow: true },
  { id: 'accuracy-vs-volume', label: 'Prospecting Accuracy vs Volume', arrow: true },
  { id: 'how-automation-helps', label: 'How Automation Helps', arrow: true },
  { id: 'how-to-measure', label: 'How to Measure Improvement', arrow: true },
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
    alt: 'Sales intelligence prospecting accuracy',
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
          Prospecting Accuracy
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Improve prospecting accuracy with sales intelligence – find the right accounts, contacts, and timing.
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
          Quality over volume
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A smaller list of accurately targeted prospects generates more meetings and higher win rates than a massive list of unqualified contacts.
        </p>
      </div>
    </aside>
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
          Ready to improve prospecting accuracy? Explore 360Airo and build a smarter pipeline with better prospect insights.
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
});

// --- Hoisted static FAQ data ---
const FAQ_ITEMS = [
  {
    subtitle: 'What is Sales Intelligence in B2B sales?',
    paragraphs: ["Sales intelligence involves using information and insights to help the sales team find better-fit leads, understand the buyers' intentions, and reach out more effectively."],
  },
  {
    subtitle: 'How does sales intelligence help with the quality of leads?',
    paragraphs: ['It helps by filtering and enriching data in such a way that leads which fall into the ideal customer profile will be prioritized.'],
  },
  {
    subtitle: 'What are buying signals in sales intelligence?',
    paragraphs: ['Buying signals are factors like hiring, funding, and expanding which signal that a company might be ready to make a purchase.'],
  },
  {
    subtitle: 'Why is prospecting accuracy important?',
    paragraphs: ['Proper prospecting helps ensure the sales team spends their time contacting the right prospects, leading to better response rates and more meetings.'],
  },
  {
    subtitle: "What's the difference between sales intelligence and traditional prospecting?",
    paragraphs: ['Sales intelligence uses real-time data, insights, and other information compared to traditional prospecting which is done through static lists.'],
  },
  {
    subtitle: 'Does sales intelligence cut down on manual research?',
    paragraphs: ["Sales intelligence gathers and centralizes company and contact information so there isn't a need for researching manually across multiple platforms."],
  },
  {
    subtitle: 'What metrics show improved prospecting accuracy?',
    paragraphs: ['Key metrics include lead-to-opportunity rate, win rate, meetings booked, and pipeline value per rep.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'Sales Intelligence vs CRM: Key Differences, Benefits & Which You Need',
    tag: 'Listicles',
    href: '/blogs/sales-intelligence-vs-crm-key-differences',
    description: 'Understand the key differences between sales intelligence and CRM, and how they work together.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
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

export default function BlogProspectingAccuracyPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/prospecting-accuracy.jpg';

  return (
    <>
      <Head>
        <title>How Sales Intelligence Improves B2B Prospecting Accuracy</title>
        <meta
          name="description"
          content="Learn how sales intelligence improves B2B prospecting accuracy by helping teams find the right accounts, right contacts, and right timing with better data and insights."
        />
        <meta
          name="keywords"
          content="sales intelligence, B2B prospecting, prospecting accuracy, lead enrichment, buying signals, sales automation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How Sales Intelligence Improves B2B Prospecting Accuracy"
        />
        <meta
          property="og:description"
          content="Learn how sales intelligence improves B2B prospecting accuracy by helping teams find the right accounts, right contacts, and right timing with better data and insights."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How Sales Intelligence Improves B2B Prospecting Accuracy"
        />
        <meta
          name="twitter:description"
          content="Learn how sales intelligence improves B2B prospecting accuracy by helping teams find the right accounts, right contacts, and right timing with better data and insights."
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
                  '@id': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy/#webpage',
                  'url': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
                  'name': 'How Sales Intelligence Improves B2B Prospecting Accuracy',
                  'description': 'Learn how sales intelligence improves B2B prospecting accuracy by helping teams find the right accounts, right contacts, and right timing with better data and insights.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy/#article',
                  'headline': 'How Sales Intelligence Improves B2B Prospecting Accuracy',
                  'description': 'Learn how sales intelligence improves B2B prospecting accuracy by helping teams find the right accounts, right contacts, and right timing with better data and insights.',
                  'url': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
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
                    '@id': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence',
                    'B2B prospecting',
                    'prospecting accuracy',
                    'lead enrichment',
                    'buying signals',
                    'sales automation',
                  ],
                  'datePublished': '2026-11-18',
                  'dateModified': '2026-11-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy/#breadcrumb',
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
                      'name': 'Prospecting Accuracy',
                      'item': 'https://360airo.com/blogs/how-sales-intelligence-improves-b2b-prospecting-accuracy',
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
                  <span className="hidden sm:inline">How Sales Intelligence Improves B2B Prospecting Accuracy</span>
                  <span className="sm:hidden">Prospecting Accuracy</span>
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
                      alt="Sales intelligence prospecting accuracy hero"
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
                    How Sales Intelligence Improves B2B Prospecting Accuracy
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Sales intelligence increases the accuracy of prospecting by helping sales teams locate the right companies, the right people, verify information, and discover purchase intentions prior to contacting. Learn how to convert data into insights.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 8 min read</span>
                    <span>• 1.4K reads</span>
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
                    "Sales intelligence increases the accuracy of prospecting through helping the sales team locate the right companies, the right people, verify the information and discover purchase intentions prior to contacting. Unlike the outdated process of relying on lists of static data or guesswork, today's sales team can leverage the current data to determine who to target, what their motivations are and when to contact.",
                    "In B2B sales, prospecting has ceased to be a process of acquiring the largest possible list of leads but is now focused on generating the most valuable list of prospects, whose profiles align with that of the ideal customer and therefore will be more responsive. This becomes possible thanks to sales intelligence that converts data into insights.",
                    "Prospecting for B2B companies is no longer about having more contacts but about having high-quality contacts that have a real reason for talking to you. The increased accuracy will improve other aspects as well, such as response rate, meetings scheduled and revenue.",
                  ]}
                  infographic={{
                    title: 'From volume to value',
                    paragraphs: ["B2B prospecting is no longer about having the largest list – it's about having the most valuable list."],
                    bullets: [
                      'Sales intelligence converts raw data into actionable insights',
                      'Better targeting leads to higher response rates',
                      'Accurate prospecting drives more meetings and revenue',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What Is Prospecting Accuracy? */}
                <ArticleSection
                  key="what-is-prospecting-accuracy"
                  id="what-is-prospecting-accuracy"
                  title="What Is Prospecting Accuracy?"
                  showImage={true}
                  intro={[
                    "Prospecting accuracy is how well a sales team finds, qualifies, and ranks the right prospects before reaching out. It shows how closely your outreach matches real buyers instead of surface-level matches.",
                    "A lead may look good on paper, like having the right job title or working at a known company, but still not be a good fit if they do not have budget, authority, need, or timing. Accurate prospecting helps reduce this problem.",
                    "Prospecting accuracy includes several parts:",
                  ]}
                  infographic={{
                    title: 'Components of prospecting accuracy',
                    paragraphs: ['Accurate prospecting goes beyond surface-level matches to evaluate fit, timing, and intent.'],
                    bullets: [
                      'ICP fit – industry, size, revenue, location, stage',
                      'Role relevance – ability to make or influence decisions',
                      'Data accuracy – correct job titles, emails, company details',
                      'Business need – likelihood of needing your solution',
                      'Buying signals – hiring, funding, growth indicators',
                      'Timing – stage in the buying journey',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Why Traditional Falls Short */}
                <ArticleSection
                  key="why-traditional-falls-short"
                  id="why-traditional-falls-short"
                  title="Why Traditional Prospecting Falls Short"
                  showImage={false}
                  intro={[
                    "Traditional prospecting often depends on manual research, static databases, and old contact lists. These methods do not keep up with how fast B2B companies change.",
                    "Common problems include outdated contact data from job changes and role updates, limited company context with little insight into growth or intent, poor prioritization where all leads are treated the same, generic outreach that does not feel relevant, and too much manual research across LinkedIn, websites, and news.",
                    "Because of this, sales teams spend time on weak leads and miss stronger opportunities. The issue is not effort, but lack of good data.",
                  ]}
                  infographic={{
                    title: 'Traditional prospecting problems',
                    paragraphs: ["Old methods can't keep up with how fast B2B companies change."],
                    bullets: [
                      'Outdated contact data from job changes',
                      'Limited company context and growth insights',
                      'Poor prioritization – all leads treated equally',
                      'Generic outreach that feels irrelevant',
                      'Too much manual research across multiple platforms',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How Sales Intelligence Improves */}
                <ArticleSection
                  key="how-sales-intelligence-improves"
                  id="how-sales-intelligence-improves"
                  title="How Sales Intelligence Improves Prospecting Accuracy"
                  showImage={false}
                  intro={[
                    "Sales intelligence tools fix these issues by improving data, finding patterns, and showing useful insights that are hard to find manually.",
                  ]}
                  infographic={{
                    title: '8 ways sales intelligence improves accuracy',
                    paragraphs: ['From better-fit accounts to less manual research – sales intelligence transforms prospecting.'],
                    bullets: [
                      'Better-Fit Accounts – use ICP filters instead of broad guesses',
                      'Right Contacts – find decision-makers and influencers',
                      'Lead Enrichment – fill in missing or outdated data',
                      'Buying Signals – identify hiring, funding, and growth indicators',
                      'Better Qualification – use structured checks for fit and intent',
                      'More Relevant Outreach – mention company news and industry problems',
                      'Smarter Prioritization – rank leads by fit, data, and signals',
                      'Less Manual Research – see key insights in one place',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Better-Fit Accounts',
                      paragraphs: ['Sales intelligence helps teams build account lists using clear ICP filters instead of broad guesses. Instead of targeting "tech companies" or "mid-size firms," teams can focus on specific industries, employee size ranges, revenue levels, locations, growth stage, and technology used. This helps teams start with accounts that are a better match for their product. Reps spend less time removing bad leads and more time talking to good ones.'],
                    },
                    {
                      subtitle: 'Right Contacts',
                      paragraphs: ['Finding the right company is only part of the work. Sales intelligence also helps find the right people inside those companies. It shows decision-makers like directors, VPs, and executives, influencers who affect buying choices, and end users who feel the problem most. It also helps separate similar job titles that may mean different things in different companies. This reduces wasted outreach.'],
                    },
                    {
                      subtitle: 'Lead Enrichment',
                      paragraphs: ['Lead enrichment fills in missing or outdated data so CRM records are more complete. This can include updated job titles, verified emails and phone numbers, company size and revenue, industry type, technology used, and recent company updates. With better data, sales reps do not need to guess or double-check everything manually.'],
                    },
                    {
                      subtitle: 'Buying Signals',
                      paragraphs: ['Buying signals are one of the most useful parts of sales intelligence. They show when a company may be ready to buy or going through change. Examples include hiring for related roles, new funding or investment, leadership changes, expansion into new markets, and increased product or tech activity. These signals help teams focus on timing, not just fit. A good-fit company with no urgency is often less valuable than a slightly weaker fit with strong intent.'],
                    },
                    {
                      subtitle: 'Better Qualification',
                      paragraphs: ['Sales intelligence helps teams qualify leads in a more structured way. Instead of guessing, they can use clear checks like ICP match level, decision-making role, data quality, business need, buying signals, and past engagement. This makes qualification more consistent and reduces poor leads moving forward.'],
                    },
                    {
                      subtitle: 'More Relevant Outreach',
                      paragraphs: ["When sales reps understand a prospect's situation, their messages become more relevant. Instead of generic emails, they can mention recent company news, industry problems, tools they use, and growth or hiring trends. This leads to better response rates and stronger first conversations."],
                    },
                    {
                      subtitle: 'Smarter Prioritization',
                      paragraphs: ['Not all leads should be treated the same. Sales intelligence helps rank leads based on strong ICP match, clean and complete data, active buying signals, and past engagement. This helps teams focus on the best opportunities first.'],
                    },
                    {
                      subtitle: 'Less Manual Research',
                      paragraphs: ['Sales intelligence reduces the need for manual research. Instead of switching between LinkedIn, websites, and spreadsheets, reps can see key insights in one place. This gives them more time for outreach, follow-ups, and closing deals.'],
                    },
                  ]}
                />

                {/* The Sales Intelligence Workflow */}
                <ArticleSection
                  key="workflow"
                  id="workflow"
                  title="The Sales Intelligence Workflow"
                  showImage={false}
                  intro={[
                    "A simple workflow looks like this:",
                  ]}
                  infographic={{
                    title: 'Sales intelligence workflow',
                    paragraphs: ['A repeatable process from ICP definition to personalized outreach.'],
                    bullets: [
                      '1. Define a clear ICP',
                      '2. Build targeted account lists',
                      '3. Find key contacts in those accounts',
                      '4. Enrich company and contact data',
                      '5. Track buying signals',
                      '6. Rank and prioritize leads',
                      '7. Personalize outreach',
                      '8. Automate research tasks',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Accuracy vs Volume */}
                <ArticleSection
                  key="accuracy-vs-volume"
                  id="accuracy-vs-volume"
                  title="Prospecting Accuracy vs Volume"
                  showImage={false}
                  intro={[
                    "Many teams think more leads means better results. This is not true. More leads without quality often hurts performance.",
                    "Large low-quality lists create noise and lower conversion. Smaller high-quality lists lead to better conversations and stronger pipeline.",
                    "Sales intelligence shifts focus from quantity to quality.",
                  ]}
                  infographic={{
                    title: 'Quality over quantity',
                    paragraphs: ['More leads without quality hurts performance. Focus on high-quality, targeted prospects.'],
                    bullets: [
                      'Large low-quality lists = noise and low conversion',
                      'Smaller high-quality lists = better conversations',
                      'Sales intelligence shifts focus from volume to value',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How Automation Helps */}
                <ArticleSection
                  key="how-automation-helps"
                  id="how-automation-helps"
                  title="How Automation Helps"
                  showImage={false}
                  intro={[
                    "Automation helps scale sales intelligence by:",
                  ]}
                  infographic={{
                    title: 'Automation benefits',
                    paragraphs: ['Automation removes repetitive work so reps can focus on selling.'],
                    bullets: [
                      'Finding new accounts that match ICP',
                      'Identifying contacts inside those accounts',
                      'Updating and enriching data',
                      'Tracking buying signals in real time',
                      'Syncing everything with CRM',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Measure Improvement */}
                <ArticleSection
                  key="how-to-measure"
                  id="how-to-measure"
                  title="How to Measure Improvement"
                  showImage={false}
                  intro={[
                    "To see if prospecting accuracy is improving, track:",
                  ]}
                  infographic={{
                    title: 'Key metrics for prospecting accuracy',
                    paragraphs: ['Track these metrics to measure the impact of sales intelligence on your prospecting.'],
                    bullets: [
                      'Lead to opportunity rate',
                      'Meetings booked',
                      'Win rate',
                      'Sales cycle length',
                      'Time spent on research',
                      'CRM data completeness',
                      'Pipeline value per rep',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why these metrics matter',
                      paragraphs: ['Better numbers here show better prospecting quality. When prospecting accuracy improves, response rates increase, more meetings are booked, and the sales cycle shortens – all indicators of a healthier pipeline.'],
                    },
                  ]}
                />

                {/* Conclusion */}
                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="Conclusion"
                  showImage={false}
                  intro={[
                    "Sales intelligence improves prospecting accuracy by helping teams focus on the right accounts, the right people, and the right timing using clean and updated data. Instead of guessing or using old lists, sales teams get a clearer path to better conversations and stronger pipeline growth.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps sales teams improve prospecting accuracy with better data, insights, and automation – all in one platform.',
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
                      paragraphs={['Common questions about sales intelligence and prospecting accuracy.']}
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