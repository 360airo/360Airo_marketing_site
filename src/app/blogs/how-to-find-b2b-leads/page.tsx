'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../../../styles/blogs.css';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'what-is-b2b-lead', label: '1. What Is a B2B Lead?', arrow: true },
  { id: 'what-is-intent-data', label: '1.1 What Is Intent Data?', arrow: true, indent: true },
  { id: 'manual-methods', label: '2. Manual Methods: Finding High-Quality B2B Leads', arrow: true },
  { id: 'linkedin-prospecting', label: '2.1 Use LinkedIn for Prospecting', arrow: true, indent: true },
  { id: 'research-company-websites', label: '2.2 Research Company Websites', arrow: true, indent: true },
  { id: 'industry-directories', label: '2.3 Explore Industry Directories', arrow: true, indent: true },
  { id: 'monitor-company-news', label: '2.4 Monitor Company News', arrow: true, indent: true },
  { id: 'referrals', label: '2.5 Ask Existing Customers for Referrals', arrow: true, indent: true },
  { id: 'manual-limitations', label: '3. Why Manual Prospecting Has Limitations', arrow: true },
  { id: 'automated-tools', label: '4. Automated Tools: Scale B2B Lead Generation Faster', arrow: true },
  { id: 'qualify-leads', label: '5. Qualify Every Lead Before Your Sales Team Invests Time', arrow: true },
  { id: 'qualification-framework', label: '5.1 The 5-Step Lead Qualification Framework', arrow: true, indent: true },
  { id: 'common-mistakes', label: '6. Common B2B Lead Generation Mistakes', arrow: true },
  { id: 'conclusion', label: '7. Build a Smarter B2B Lead Generation Process', arrow: true },
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
    alt: 'B2B lead generation strategy',
    label: 'Lead Generation',
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
          B2B Lead Gen Complete Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Find qualified B2B leads, prioritize high-intent accounts, and build a sales pipeline that drives predictable revenue.
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
          A list of 200 qualified prospects will almost always outperform a list of 5,000 random contacts.
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
          Book a demo today and discover how 360Airo helps you find better B2B leads, qualify them faster, and turn prospecting into predictable revenue.
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
    title: 'How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide',
    tag: 'Cold Email',
    href: '/blogs/how-to-build-first-cold-email-campaign',
    description: 'Build your first cold email campaign that actually gets replies.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'How Does Email Deliverability Work? A Step‑by‑Step Guide',
    tag: 'Deliverability',
    href: '/blogs/how-email-deliverability-works',
    description: 'Learn how email deliverability works and how to keep your messages out of spam.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: "Email Delivery vs Email Deliverability: What's the Difference?",
    tag: 'Deliverability',
    href: '/blogs/email-delivery-vs-deliverability',
    description: 'Learn the critical difference between delivery and inbox placement.',
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

export default function BlogHowToFindB2BLeadsPage() {
  const [activeId, setActiveId] = useState('introduction');
  const activeIdRef = useRef('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  // INP FIX: Throttle scroll handler with requestAnimationFrame
  // PERF: Only update state when active section actually changes
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

  return (
    <div className="blog-shell">
      <Navbar activeTab="resources" />
      <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
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

        {/* LCP FIX: Preload hero image with WebP and high priority */}
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
          type="image/webp"
        />

        {/* Hero Section */}
        <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
              <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Blog
              </Link>
              <span>›</span>
              <Link href="/blogs?category=lead-generation" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Lead Generation
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">How to Find B2B Leads: A Complete Guide to Building a High-Quality Sales Pipeline</span>
                <span className="sm:hidden">How to Find B2B Leads</span>
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
                    alt="How to find B2B leads hero"
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
                  Lead Generation Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  How to Find B2B Leads: A Complete Guide to Building a High-Quality Sales Pipeline
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  Finding B2B leads has never been easier—or more difficult. Learn how to find the right leads, use intent data, qualify prospects, and build a sales pipeline that drives predictable revenue.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 12 min read</span>
                  <span>• 2.1K reads</span>
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
                  'Finding B2B leads has never been easier—or more difficult.',
                  'There are countless databases, AI prospecting tools, LinkedIn searches, directories, and intent data platforms promising thousands of qualified prospects. Yet, according to recent research, 61% of marketers say improving lead generation remains their biggest challenge.',
                  'Why?',
                  "Because finding leads isn't the same as finding the right leads.",
                  "A list filled with random contacts won't generate revenue. What sales teams need are qualified prospects who match their Ideal Customer Profile (ICP) and are likely to become customers.",
                  'Fortunately, modern technology is changing the game. Companies using intent data—signals that indicate a business is actively researching or considering a purchase—report up to a 20% increase in pipeline, proving that timing matters just as much as targeting.',
                  "In this guide, you'll learn how to find B2B leads, compare manual prospecting methods with automated tools, and discover a proven framework for qualifying leads before they enter your sales pipeline.",
                ]}
                infographic={{
                  title: 'Why lead generation matters',
                  paragraphs: ['Finding the right leads is the foundation of every successful sales pipeline.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-b2b-lead"
                id="what-is-b2b-lead"
                title="1. What Is a B2B Lead?"
                showImage={false}
                intro={[
                  'A B2B lead is a business or decision-maker who has the potential to become a customer because they match your target audience and could benefit from your product or service.',
                  'Unlike B2C sales, where purchases are often made by individuals, B2B sales usually involve multiple stakeholders, longer buying cycles, and higher-value decisions.',
                  'A B2B lead might be:',
                ]}
                infographic={{
                  title: 'Examples of B2B leads',
                  paragraphs: ['These are the types of decision-makers you should target.'],
                  bullets: [
                    'A Sales Director looking for outreach software',
                    'A Marketing Manager evaluating lead generation platforms',
                    'A Founder searching for CRM automation',
                    'A Revenue Operations Manager improving forecasting accuracy',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The real objective',
                    paragraphs: ["The objective isn't simply to collect contacts. It's to identify businesses that have both the need and the potential to buy."],
                  },
                ]}
              />

              <ArticleSection
                key="what-is-intent-data"
                id="what-is-intent-data"
                title="1.1 What Is Intent Data?"
                showImage={false}
                intro={[
                  'Intent Data refers to behavioral signals that indicate a company may be actively researching a product or service.',
                  'Examples include:',
                ]}
                infographic={{
                  title: 'Intent data signals',
                  paragraphs: ['These behaviors indicate buying interest.'],
                  bullets: [
                    'Visiting pricing pages',
                    'Reading comparison articles',
                    'Downloading buying guides',
                    'Searching for specific software categories',
                    'Increasing engagement with industry content',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why intent data matters',
                    paragraphs: ["Rather than contacting every business in your market, intent data helps you focus on companies already showing buying interest. That's why organizations using intent data often generate stronger pipeline and higher conversion rates."],
                  },
                ]}
              />

              <ArticleSection
                key="manual-methods"
                id="manual-methods"
                title="2. Manual Methods: Finding High-Quality B2B Leads"
                showImage={true}
                intro={[
                  'Before AI-powered prospecting existed, sales teams relied almost entirely on manual research.',
                  'Although it takes more time, manual prospecting remains valuable because it helps build highly targeted prospect lists.',
                ]}
                infographic={{
                  title: 'Manual prospecting still works',
                  paragraphs: ['Manual research provides deeper context and better personalization.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="linkedin-prospecting"
                id="linkedin-prospecting"
                title="2.1 Use LinkedIn for Prospecting"
                showImage={false}
                intro={[
                  'LinkedIn remains one of the most effective platforms for B2B lead generation.',
                  'You can search using filters such as:',
                ]}
                infographic={{
                  title: 'LinkedIn filters',
                  paragraphs: ['Refine your search to find the right prospects.'],
                  bullets: [
                    'Industry',
                    'Company size',
                    'Job title',
                    'Location',
                    'Seniority level',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Be specific',
                    paragraphs: ['For example, instead of searching broadly for "marketing," you could search for VP of Marketing, Demand Generation Manager, or Revenue Operations Director. This immediately improves targeting. Spend time reviewing company profiles, recent posts, hiring activity, and shared connections before reaching out.'],
                  },
                ]}
              />

              <ArticleSection
                key="research-company-websites"
                id="research-company-websites"
                title="2.2 Research Company Websites"
                showImage={false}
                intro={[
                  'Company websites contain valuable information that can improve both prospect selection and personalization.',
                  'Look for:',
                ]}
                infographic={{
                  title: 'What to look for on company websites',
                  paragraphs: ['Small observations often lead to stronger outreach.'],
                  bullets: [
                    'Products and services',
                    'Team size',
                    'Leadership pages',
                    'Careers page',
                    'Press releases',
                    'Customer success stories',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Example',
                    paragraphs: ['If a company is hiring multiple SDRs, it may indicate growing outbound activity—making it a strong prospect for sales engagement software.'],
                  },
                ]}
              />

              <ArticleSection
                key="industry-directories"
                id="industry-directories"
                title="2.3 Explore Industry Directories"
                showImage={false}
                intro={[
                  'Industry associations and business directories remain excellent sources of qualified leads.',
                  'These directories often categorize companies by:',
                ]}
                infographic={{
                  title: 'Directory categories',
                  paragraphs: ['Directories provide pre-filtered prospects.'],
                  bullets: [
                    'Industry',
                    'Revenue',
                    'Employee count',
                    'Geography',
                    'Specialization',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Quality over quantity',
                    paragraphs: ['Unlike purchased contact lists, these sources often provide businesses that already match your target market.'],
                  },
                ]}
              />

              <ArticleSection
                key="monitor-company-news"
                id="monitor-company-news"
                title="2.4 Monitor Company News"
                showImage={false}
                intro={[
                  'Business news creates natural outreach opportunities.',
                  'Watch for:',
                ]}
                infographic={{
                  title: 'News triggers',
                  paragraphs: ['Timely outreach based on news improves relevance.'],
                  bullets: [
                    'Funding announcements',
                    'Product launches',
                    'Executive hires',
                    'Market expansion',
                    'Partnerships',
                    'Acquisitions',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Example outreach',
                    paragraphs: ['"Congratulations on your recent Series A funding. Many companies experience outbound scaling challenges after rapid hiring…" This immediately makes your outreach more relevant.'],
                  },
                ]}
              />

              <ArticleSection
                key="referrals"
                id="referrals"
                title="2.5 Ask Existing Customers for Referrals"
                showImage={false}
                intro={[
                  'One of the most overlooked lead generation strategies is referrals.',
                  'Satisfied customers often know similar businesses facing the same challenges.',
                  'Referral leads usually convert faster because trust already exists before the first conversation begins.',
                  'Never underestimate the value of asking happy customers:',
                  '"Do you know another company that could benefit from a solution like ours?"',
                  'Sometimes your best prospects are already within your existing network.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="manual-limitations"
                id="manual-limitations"
                title="3. Why Manual Prospecting Has Limitations"
                showImage={false}
                intro={[
                  'Manual prospecting produces high-quality leads.',
                  "But it doesn't always scale.",
                  'Researching hundreds of companies individually requires significant time and effort.',
                  'Sales representatives can spend hours gathering information before sending a single email.',
                  'As outbound programs grow, maintaining that level of research becomes increasingly difficult.',
                  "That's why many organizations now combine manual prospecting with AI-powered automation.",
                  'Instead of replacing human judgment, automation accelerates the research process while allowing sales teams to focus on building relationships.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="automated-tools"
                id="automated-tools"
                title="4. Automated Tools: Scale B2B Lead Generation Faster"
                showImage={true}
                intro={[
                  'Manual prospecting helps you find highly relevant leads, but it becomes difficult to maintain as your outreach grows.',
                  "Researching hundreds of companies every week isn't sustainable for most sales teams.",
                  "That's where B2B prospecting tools make a significant difference.",
                  'Instead of replacing sales representatives, these tools automate repetitive research tasks so teams can spend more time building relationships and closing deals.',
                  'The best lead generation platforms combine data, AI, and automation to identify prospects who are most likely to convert.',
                ]}
                infographic={{
                  title: 'Automated tools explained',
                  paragraphs: ['Scale your lead generation without sacrificing quality.'],
                  bullets: [
                    'Prospect databases with advanced filtering',
                    'AI-powered prospect research',
                    'Intent data platforms for buying signals',
                    'CRM integration for seamless workflows',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Prospect Databases',
                    paragraphs: ['Modern B2B databases allow sales teams to search for prospects using filters like industry, job title, company size, revenue, technologies used, and geographic location. Instead of manually searching LinkedIn for every contact, you can build highly targeted prospect lists in minutes. The key is choosing quality over quantity. A list of 200 qualified prospects will almost always outperform a list of 5,000 random contacts.'],
                  },
                  {
                    subtitle: 'AI-Powered Prospect Research',
                    paragraphs: ['Artificial intelligence has transformed how businesses find sales leads. Rather than spending hours researching every company, AI can analyze company websites, news articles, hiring trends, funding announcements, LinkedIn activity, and buying signals. It then summarizes the most relevant insights for your sales team. Instead of spending 15 minutes researching one company, AI can provide useful context in seconds.'],
                  },
                  {
                    subtitle: 'Intent Data Platforms',
                    paragraphs: ["One of the biggest challenges in B2B sales isn't finding companies. It's finding companies that are ready to buy. Intent data identifies businesses actively researching products or services similar to yours. Examples include companies reading software comparison articles, visiting pricing pages, searching for specific solutions, downloading buying guides, or engaging with competitor content. These behaviors indicate buying interest before a prospect fills out a contact form. Instead of contacting every company in your market, your team focuses on organizations already showing purchase intent."],
                  },
                  {
                    subtitle: 'CRM Integration',
                    paragraphs: ["Lead generation shouldn't end when a prospect enters your CRM. The best sales teams connect their prospecting tools directly to platforms like Salesforce or HubSpot. This ensures that prospect information remains accurate and automatically updates when new data becomes available. A connected CRM also helps sales teams avoid duplicate outreach and maintain a complete history of every interaction."],
                  },
                ]}
              />

              <ArticleSection
                key="qualify-leads"
                id="qualify-leads"
                title="5. Qualify Every Lead Before Your Sales Team Invests Time"
                showImage={false}
                intro={[
                  'Finding leads is only half the job.',
                  "The next step is determining whether they're actually worth pursuing.",
                  'Without qualification, sales teams spend valuable time speaking with businesses that may never become customers.',
                  'One of the most widely used qualification methods is BANT.',
                ]}
                infographic={{
                  title: 'Why qualification matters',
                  paragraphs: ['Qualification ensures your team focuses on the right opportunities.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="qualification-framework"
                id="qualification-framework"
                title="5.1 The 5-Step Lead Qualification Framework"
                showImage={false}
                intro={[
                  'Use this framework to qualify every lead before investing sales time.',
                ]}
                infographic={{
                  title: 'BANT + Fit qualification',
                  paragraphs: ['A complete qualification framework considers multiple factors.'],
                  bullets: [
                    'Budget – Does the company have the financial resources to purchase?',
                    'Authority – Are you speaking with someone who can influence or approve the buying decision?',
                    'Need – Does the prospect have a genuine business problem that your solution solves?',
                    'Timeline – When does the prospect intend to implement a solution?',
                    'Fit – Does the company match your Ideal Customer Profile?',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="common-mistakes"
                id="common-mistakes"
                title="6. Common B2B Lead Generation Mistakes"
                showImage={false}
                intro={[
                  'Many businesses struggle with lead generation because they focus on volume instead of quality.',
                  'Some of the most common mistakes include:',
                ]}
                infographic={{
                  title: 'Mistakes to avoid',
                  paragraphs: ['Avoid these to build a better pipeline.'],
                  bullets: [
                    'Targeting companies outside your Ideal Customer Profile',
                    'Purchasing outdated contact lists',
                    'Ignoring intent signals',
                    'Failing to qualify leads before outreach',
                    'Personalizing too little—or not at all',
                    'Relying entirely on manual research without automation',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The result',
                    paragraphs: ['Avoiding these mistakes helps sales teams spend more time with qualified prospects and less time chasing poor-fit opportunities.'],
                  },
                ]}
              />

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="7. Build a Smarter B2B Lead Generation Process"
                showImage={false}
                intro={[
                  "The best sales teams don't simply generate more leads.",
                  'They generate better ones.',
                  'By combining manual research with modern automation, businesses can identify decision-makers faster, personalize outreach more effectively, and prioritize prospects who are most likely to convert.',
                  'Manual prospecting remains valuable because it provides context and deeper understanding.',
                  'Automation adds speed, consistency, and scalability.',
                  "Together, they create a lead generation strategy that's both efficient and effective.",
                  "The goal isn't to fill your CRM with contacts.",
                  "It's to build a pipeline of qualified opportunities that drive predictable revenue growth.",
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    'Successful B2B lead generation requires more than a prospect database. 360Airo combines AI-powered prospect research, intent data, contact enrichment, verified business contacts, personalized outreach, and multi-channel sales automation into one intelligent platform.',
                    'Instead of spending hours searching for leads, your team can identify qualified buyers, prioritize high-intent accounts, and launch personalized campaigns that generate more meetings and pipeline.',
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
  );
}