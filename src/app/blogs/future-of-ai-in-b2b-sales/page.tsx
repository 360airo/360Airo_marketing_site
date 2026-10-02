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
  { id: 'trend-autonomous-decision-making', label: '1. AI Will Shift From Automation to Autonomous Decision‑Making', arrow: true },
  { id: 'trend-hyper-personalization', label: '2. Hyper‑Personalization Will Become the Standard', arrow: true },
  { id: 'trend-revenue-intelligence', label: '3. Revenue Intelligence Will Become the Brain of Sales Organizations', arrow: true },
  { id: 'trend-ai-copilot', label: '4. AI Will Become Every Salesperson\'s Daily Copilot', arrow: true },
  { id: 'what-this-means', label: '5. What This Means for Sales Teams', arrow: true },
  { id: 'what-to-do-today', label: '6. What Your Team Should Do Today', arrow: true },
  { id: 'conclusion', label: '7. The Future Belongs to Teams That Combine AI With Human Expertise', arrow: true },
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
    alt: 'AI in B2B sales future trends',
    label: 'AI Sales',
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
          AI Sales Future Trends
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Stay ahead of the curve with AI‑powered prospecting, personalization, and revenue intelligence.
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
          AI augments, doesn't replace
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The most successful teams use AI to remove friction, so salespeople can spend more time building relationships.
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
          Book a demo today and discover how 360Airo helps you turn the future of AI in B2B sales into measurable business growth.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Book a Demo →
          </motion.button>
        </Link>
      </div>
    </div>
  );
});

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide That Gets Replies',
    tag: 'Cold Email',
    href: '/blogs/how-to-build-first-cold-email-campaign',
    description: 'Learn how to build your first cold email campaign that actually gets replies.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: "AI for Sales: A Beginner's Guide to Working Smarter",
    tag: 'AI',
    href: '/blogs/ai-for-sales-beginners-guide',
    description: 'Discover how AI can help you work smarter, not harder in sales.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Multi‑Channel Outreach Explained: Why One Channel Is No Longer Enough',
    tag: 'Multichannel',
    href: '/blogs/multi-channel-outreach-explained',
    description: 'Combine email, LinkedIn, calls, and SMS for 287% higher purchase rates.',
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

export default function BlogFutureOfAIInB2BSalesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/future-of-ai-b2b-sales.jpg';

  return (
    <>
      <Head>
        <title>The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For</title>
        <meta
          name="description"
          content="Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots. Learn how to prepare your revenue team for the next generation of selling."
        />
        <meta
          name="keywords"
          content="AI in B2B sales, autonomous AI, hyper-personalization, revenue intelligence, AI copilot, sales automation, future of sales, 360Airo"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/future-of-ai-in-b2b-sales"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For"
        />
        <meta
          property="og:description"
          content="Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots. Learn how to prepare your revenue team for the next generation of selling."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/future-of-ai-in-b2b-sales"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For"
        />
        <meta
          name="twitter:description"
          content="Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots."
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
                  '@id': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales/#webpage',
                  'url': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales',
                  'name': 'The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For',
                  'description': 'Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots. Learn how to prepare your revenue team for the next generation of selling.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales/#article',
                  'headline': 'The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For',
                  'description': 'Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots.',
                  'url': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales',
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
                    '@id': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales/#webpage',
                  },
                  'articleSection': 'AI Sales',
                  'keywords': [
                    'AI in B2B sales',
                    'autonomous AI',
                    'hyper-personalization',
                    'revenue intelligence',
                    'AI copilot',
                    'sales automation',
                    'future of sales',
                    '360Airo',
                  ],
                  'datePublished': '2026-09-20',
                  'dateModified': '2026-09-20',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales/#breadcrumb',
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
                      'name': 'Future of AI in B2B Sales',
                      'item': 'https://360airo.com/blogs/future-of-ai-in-b2b-sales',
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
                <Link href="/blogs?category=AI" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  AI
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For</span>
                  <span className="sm:hidden">Future of AI in Sales</span>
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
                      alt="Future of AI in B2B sales hero"
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
                    AI Sales
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    A decade ago, AI in sales sounded like science fiction. Today, it's writing emails, identifying buying signals, and forecasting revenue. Discover the four AI trends that will define the next generation of B2B sales.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Sep 2026</span>
                    <span>• 8 min read</span>
                    <span>• 2.3K reads</span>
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
                    "A decade ago, AI in sales sounded like science fiction.",
                    "Today, it's writing personalized emails, identifying buying signals, forecasting revenue, qualifying leads, and helping sales teams prioritize the right opportunities—all before the first meeting is booked.",
                    "But despite rapid adoption, we're only at the beginning.",
                    "The future of AI in B2B sales isn't about replacing salespeople. It's about changing how they work. The sales organizations that thrive over the next five years won't necessarily be the ones with the largest teams. They'll be the ones that combine human expertise with intelligent automation to build stronger relationships, move faster, and make better decisions.",
                    "The market reflects this shift. AI in sales is projected to reach nearly $10 billion by 2028, growing at a 29% CAGR (Compound Annual Growth Rate). CAGR represents the average annual growth rate of an investment or market over a specific period, assuming growth compounds over time. In simple terms, a 29% CAGR means the AI sales market isn't just growing—it's accelerating year after year.",
                    "The impact is already visible inside sales teams. Nearly 73% of sales representatives using AI outperform their peers, highlighting that AI has become a competitive advantage rather than an experimental technology.",
                    "So, what does the future actually look like?",
                    "Let's explore the trends shaping the next generation of B2B sales.",
                  ]}
                  infographic={{
                    title: 'The AI sales opportunity',
                    paragraphs: ['AI in B2B sales is projected to grow at 29% CAGR, reaching nearly $10 billion by 2028. 73% of sales reps using AI outperform their peers.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="trend-autonomous-decision-making"
                  id="trend-autonomous-decision-making"
                  title="1. AI Will Shift From Automation to Autonomous Decision‑Making"
                  showImage={false}
                  intro={[
                    "The first wave of AI focused on making repetitive work faster.",
                    "It automated follow-up emails, updated CRM records, and scheduled meetings.",
                    "The next wave is fundamentally different.",
                    "Instead of waiting for instructions, AI will increasingly recommend—and in some cases execute—the next best action based on real-time data.",
                    "Think of today's automation as cruise control in a car. It maintains speed after you tell it what to do. Future AI will resemble an intelligent co-pilot that notices traffic, recommends a better route, warns you about hazards, and adjusts the journey before problems arise.",
                    "For sales teams, that means AI will increasingly:",
                  ]}
                  infographic={{
                    title: 'What autonomous AI will do',
                    paragraphs: ['AI will move from executing commands to recommending and acting on next best actions.'],
                    bullets: [
                      'Prioritize the highest-value prospects',
                      'Recommend the best communication channel',
                      'Predict when buyers are ready to engage',
                      'Suggest personalized messaging',
                      'Identify stalled deals before they’re lost',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Smarter selling, not less human',
                      paragraphs: ['Rather than replacing sales judgment, AI will enhance it by reducing uncertainty and surfacing insights that humans may overlook. The result isn’t less human selling – it’s smarter selling.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="trend-hyper-personalization"
                  id="trend-hyper-personalization"
                  title="2. Hyper‑Personalization Will Become the Standard"
                  showImage={true}
                  intro={[
                    "Buyers have become remarkably good at recognizing generic outreach.",
                    "Mass-produced emails filled with first-name personalization no longer stand out.",
                    "The future belongs to contextual personalization.",
                    "Instead of simply inserting a prospect's name or company, AI will analyze hundreds of data points to understand what's happening inside an organization before generating outreach.",
                    "Future AI systems may consider:",
                  ]}
                  infographic={{
                    title: 'Data points for hyper‑personalization',
                    paragraphs: ['AI will use hundreds of data points to craft contextually relevant outreach.'],
                    bullets: [
                      'Recent funding announcements',
                      'Hiring trends',
                      'Executive promotions',
                      'Product launches',
                      'Technology changes',
                      'Industry news',
                      'Website activity',
                      'Buying intent signals',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Scale without losing authenticity',
                      paragraphs: ['Rather than writing one email template for thousands of prospects, AI will create thousands of variations built around each prospect’s unique context. That level of personalization would be almost impossible to achieve manually. Yet it will soon become an expectation rather than a competitive advantage.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="trend-revenue-intelligence"
                  id="trend-revenue-intelligence"
                  title="3. Revenue Intelligence Will Become the Brain of Sales Organizations"
                  showImage={false}
                  intro={[
                    "Today's sales leaders spend significant time reviewing dashboards, pipeline reports, CRM updates, and forecasting spreadsheets.",
                    "The challenge isn't collecting data. It's knowing what the data actually means.",
                    "This is where AI-powered revenue intelligence is transforming B2B sales.",
                    "Instead of simply displaying metrics, future platforms will explain them.",
                    "Imagine logging into your sales dashboard and seeing insights like:",
                  ]}
                  infographic={{
                    title: 'Revenue intelligence in action',
                    paragraphs: ['AI will not only show data but explain what it means and what to do about it.'],
                    bullets: [
                      'Pipeline growth slowed because enterprise prospects are responding 30% less frequently this month.',
                      'Three high‑value accounts show strong buying signals and should be contacted this week.',
                      'Your team’s reply rates are increasing, but follow‑up timing is reducing meeting conversions.',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'From reactive to proactive leadership',
                      paragraphs: ['Rather than forcing managers to interpret reports manually, AI will surface recommendations automatically. Managers spend less time collecting information and more time coaching their teams. Revenue reviews become proactive instead of reactive. Forecasts become more reliable because they’re built on behavioral patterns rather than intuition alone.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="trend-ai-copilot"
                  id="trend-ai-copilot"
                  title="4. AI Will Become Every Salesperson's Daily Copilot"
                  showImage={true}
                  intro={[
                    "One of the biggest misconceptions about AI is that it exists as a separate tool.",
                    "The future looks different.",
                    "AI will become embedded into almost every stage of the sales workflow.",
                    "Instead of opening multiple applications throughout the day, sales representatives will work alongside an AI assistant that supports every task.",
                    "Imagine starting your morning and receiving a summary like this:",
                  ]}
                  infographic={{
                    title: 'Your AI copilot morning briefing',
                    paragraphs: ['AI will proactively surface insights and actions to start each day.'],
                    bullets: [
                      'These five accounts show increased buying intent.',
                      'These three opportunities need immediate follow‑up.',
                      'This prospect viewed your pricing page yesterday.',
                      'These emails should be rewritten because engagement is declining.',
                      'Here are two personalized opening lines based on today’s company news.',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Continuous assistance throughout the day',
                      paragraphs: ['Throughout the day, AI continues assisting by summarizing meetings, updating CRM records, drafting follow-up emails, suggesting next steps, identifying cross-sell opportunities, and highlighting risks within active deals. Salespeople remain in control – AI simply removes repetitive work and delivers recommendations exactly when they’re needed.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-this-means"
                  id="what-this-means"
                  title="5. What This Means for Sales Teams"
                  showImage={false}
                  intro={[
                    "The future of AI in B2B sales isn't about sending more emails or replacing SDRs with software.",
                    "It's about helping sales professionals spend more time where they create the greatest value:",
                  ]}
                  infographic={{
                    title: 'The human advantage',
                    paragraphs: ['AI will free salespeople to focus on high‑value activities.'],
                    bullets: [
                      'Building trust',
                      'Understanding customer challenges',
                      'Solving business problems',
                      'Negotiating complex deals',
                      'Creating long‑term relationships',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'People at the center',
                      paragraphs: ['The organizations that benefit most from AI won’t be those chasing every new feature. They’ll be the ones that thoughtfully integrate AI into existing workflows while keeping people at the center of every customer interaction. Technology will continue evolving – human relationships will continue closing deals. The future belongs to businesses that combine both.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-to-do-today"
                  id="what-to-do-today"
                  title="6. What Your Team Should Do Today"
                  showImage={false}
                  intro={[
                    "Preparing for the future doesn't require transforming your sales organization overnight.",
                    "Start with three practical steps.",
                  ]}
                  infographic={{
                    title: 'Three steps to prepare',
                    paragraphs: ['Build momentum with small, intentional improvements.'],
                    bullets: [
                      '1. Automate One Repetitive Workflow – identify one daily task (e.g., prospect research, CRM updates, follow‑up reminders) and introduce AI to streamline it.',
                      '2. Invest in Better Data Before More Automation – verify contacts, enrich prospect information, and maintain a clean CRM. Better inputs produce better recommendations.',
                      '3. Train Your Team to Work Alongside AI – help your team learn how to review AI‑generated insights, personalize recommendations, and use automation without sacrificing authenticity.',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="7. The Future Belongs to Teams That Combine AI With Human Expertise"
                  showImage={false}
                  intro={[
                    "Artificial intelligence is reshaping B2B sales, but its greatest impact won't come from replacing human interaction.",
                    "It will come from removing friction.",
                    "As AI becomes more capable, sales professionals will spend less time researching prospects, updating CRMs, and managing repetitive tasks – and more time building relationships that drive revenue.",
                    "The future of AI in B2B sales belongs to organizations that view AI as a strategic partner rather than a shortcut. Those teams will move faster, make better decisions, personalize at scale, and create buying experiences that stand out in increasingly competitive markets.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams prepare for the next generation of AI-powered selling by combining intelligent prospect research, AI-driven personalization, multi‑channel outreach, revenue intelligence, and workflow automation into one platform.',
                      'Whether you’re beginning your AI journey or scaling an established outbound program, 360Airo gives your team the tools to work smarter, respond faster, and build predictable pipeline with confidence.',
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
          <RecentPosts />
        </main>
        <Footer />
      </div>
    </>
  );
}