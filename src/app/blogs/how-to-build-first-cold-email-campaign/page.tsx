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
  { id: 'what-is-cold-email-campaign', label: '1. What Is a Cold Email Campaign?', arrow: true },
  { id: 'step-identify-ideal-customer', label: '2. Step 1: Identify Your Ideal Customer', arrow: true },
  { id: 'step-build-prospect-list', label: '3. Step 2: Build a High-Quality Prospect List', arrow: true },
  { id: 'step-prepare-infrastructure', label: '4. Step 3: Prepare Your Email Infrastructure', arrow: true },
  { id: 'step-write-first-email', label: '5. Step 4: Write Your First Cold Email', arrow: true },
  { id: 'step-build-follow-up-sequence', label: '6. Step 5: Build a Follow-Up Sequence', arrow: true },
  { id: 'step-launch-measure', label: '7. Step 6: Launch and Measure Your Campaign', arrow: true },
  { id: 'common-mistakes', label: '8. Common First-Time Cold Email Mistakes', arrow: true },
  { id: 'conclusion', label: '9. Build Your First Campaign With Confidence', arrow: true },
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
    alt: 'Cold email campaign strategy',
    label: 'Cold Email',
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
          First Campaign Step‑by‑Step
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Build your first cold email campaign that actually gets replies, from targeting to follow-ups.
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
          A smaller, targeted list with personalised emails will always outperform a massive generic blast.
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
          Book a demo today and discover how 360Airo simplifies every step of building a successful cold email campaign.
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
  {
    title: 'Best Practices to Keep Email Bounce Rates Below the 3% Target',
    tag: 'Bounce Rate',
    href: '/blogs/best-practices-email-bounce-rates',
    description: 'Keep bounce rates low with verified data and proper authentication.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp',
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

export default function BlogHowToBuildFirstColdEmailCampaignPage() {
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
              <Link href="/blogs?category=cold-email" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Cold Email
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">How to Build Your First Cold Email Campaign: A Step-by-Step Guide</span>
                <span className="sm:hidden">First Cold Email Campaign</span>
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
                    alt="How to build your first cold email campaign hero"
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
                  Cold Email Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  You don't need a massive sales team to generate pipeline. Learn how to build your first cold email campaign that actually gets replies – from targeting the right prospects to writing emails that start meaningful conversations.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 10 min read</span>
                  <span>• 1.6K reads</span>
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
                  "You don't need a massive sales team to generate pipeline.",
                  "You don't need thousands of prospects or dozens of SDRs either.",
                  'What you need is a cold email campaign built on the right strategy.',
                  "Many first-time campaigns fail for predictable reasons. Businesses target the wrong audience, skip email warm-up, write generic messages, or stop after sending a single email. When replies don't come in, they assume cold email doesn't work.",
                  'The truth is different.',
                  "Cold email remains one of the most effective outbound channels when it's done correctly. Research shows that campaigns with 3–5 touchpoints generate nearly 80% of all replies, while personalized emails consistently outperform generic outreach.",
                  "Building a successful campaign isn't about sending more emails—it's about sending smarter ones.",
                  "In this guide, you'll learn how to build your first cold email campaign, from identifying your ideal prospects to launching a campaign that generates meaningful conversations.",
                ]}
                infographic={{
                  title: 'Why this matters',
                  paragraphs: ['A structured, well-targeted cold email campaign generates replies and pipeline, even without a large sales team.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-cold-email-campaign"
                id="what-is-cold-email-campaign"
                title="1. What Is a Cold Email Campaign?"
                showImage={false}
                intro={[
                  "A cold email campaign is a structured sequence of personalized emails sent to potential customers who haven't interacted with your business before.",
                  'Unlike email marketing campaigns sent to subscribers, cold email focuses on carefully selected prospects who fit your Ideal Customer Profile (ICP).',
                  "The objective isn't to close a sale immediately.",
                  "It's to start a conversation.",
                  'A successful campaign answers three questions:',
                  'Who should you contact?',
                  'What problem can you solve?',
                  'Why should they respond today?',
                ]}
                infographic={{
                  title: 'The three questions',
                  paragraphs: ['Every successful campaign answers who, what, and why.'],
                  bullets: [
                    'Who should you contact? (ICP and targeting)',
                    'What problem can you solve? (Value proposition)',
                    'Why should they respond today? (Urgency and relevance)',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="step-identify-ideal-customer"
                id="step-identify-ideal-customer"
                title="2. Step 1: Identify Your Ideal Customer"
                showImage={false}
                intro={[
                  'One of the biggest mistakes beginners make is trying to reach everyone.',
                  'The broader your audience, the less relevant your message becomes.',
                  'Instead, define your Ideal Customer Profile (ICP) before writing a single email.',
                  'Ask yourself:',
                ]}
                infographic={{
                  title: 'Define your ICP',
                  paragraphs: ['A clear ICP makes personalization easier and improves reply rates.'],
                  bullets: [
                    'Which industries benefit most from your solution?',
                    'What company size do you serve?',
                    'Which departments make buying decisions?',
                    'What business problems do you solve?',
                    'Which job titles should you target?',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Example',
                    paragraphs: ['If you sell AI-powered sales software, your ICP might include SaaS companies with 50–500 employees, targeting Sales Directors, Revenue Operations Managers, and Founders of growing startups. Quality beats quantity every time.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-build-prospect-list"
                id="step-build-prospect-list"
                title="3. Step 2: Build a High-Quality Prospect List"
                showImage={false}
                intro={[
                  "Once you've identified your ICP, the next step is finding people who match it.",
                  'Your prospect list is the foundation of your campaign.',
                  'A poor-quality list leads to low reply rates, higher bounce rates, and damaged sender reputation.',
                  'Look for prospects using:',
                ]}
                infographic={{
                  title: 'Where to find prospects',
                  paragraphs: ['Use multiple sources to build a targeted list.'],
                  bullets: [
                    'B2B lead databases',
                    'LinkedIn Sales Navigator',
                    'Company websites',
                    'Buying intent data',
                    'Industry directories',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'What to collect',
                    paragraphs: ['For every prospect, collect: full name, job title, company, verified business email, LinkedIn profile, and relevant company information.'],
                  },
                  {
                    subtitle: 'Verify before sending',
                    paragraphs: ["Before launching your campaign, always verify email addresses. Sending emails to invalid contacts increases bounce rates and can negatively affect your email deliverability. The goal isn't to build the biggest list – it's to build the right one."],
                  },
                ]}
              />

              <ArticleSection
                key="step-prepare-infrastructure"
                id="step-prepare-infrastructure"
                title="4. Step 3: Prepare Your Email Infrastructure"
                showImage={true}
                intro={[
                  'Many businesses spend hours writing emails but overlook the technical setup that determines whether those emails actually reach the inbox.',
                  'Before launching your first campaign, prepare your email infrastructure.',
                ]}
                infographic={{
                  title: 'Infrastructure checklist',
                  paragraphs: ['Proper setup ensures your emails reach the inbox.'],
                  bullets: [
                    'Warm up your domain gradually (14–21 days)',
                    'Configure SPF, DKIM, and DMARC authentication',
                    'Monitor your sender reputation regularly',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Sender reputation is like a credit score',
                    paragraphs: ['Mailbox providers evaluate your sending behavior, bounce rates, spam complaints, and recipient engagement before deciding whether your emails deserve inbox placement. Healthy domains typically maintain an inbox placement rate above 95%. Skipping this step can prevent even excellent emails from reaching prospects.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-write-first-email"
                id="step-write-first-email"
                title="5. Step 4: Write Your First Cold Email"
                showImage={false}
                intro={[
                  "Now it's time to write.",
                  'Many first-time cold emails fail because they focus too much on the sender.',
                  "Your prospect doesn't care about your product—at least not yet.",
                  'They care about solving a problem.',
                  'A simple structure works best:',
                ]}
                infographic={{
                  title: 'Cold email structure',
                  paragraphs: ['A clear structure improves readability and response rates.'],
                  bullets: [
                    'Subject Line – keep it natural and curiosity-driven',
                    'Opening – reference something relevant about the prospect or company',
                    "Problem – highlight a challenge they're likely facing",
                    'Value – briefly explain how you help solve that challenge',
                    'Call-to-Action – end with one simple question',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Keep it short',
                    paragraphs: ['Keep your cold email under 125 words, or about 30 seconds of reading time. The purpose of the first email is to earn a reply – not deliver a complete product presentation.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-build-follow-up-sequence"
                id="step-build-follow-up-sequence"
                title="6. Step 5: Build a Follow-Up Sequence"
                showImage={true}
                intro={[
                  'One email is rarely enough.',
                  'Prospects are busy, not necessarily uninterested.',
                  "That's why follow-ups are essential.",
                  'Research shows that 3–5 touchpoints generate nearly 80% of all replies, making structured sequences far more effective than one-off emails.',
                  "Here's a simple sequence to get started:",
                ]}
                infographic={{
                  title: 'Example 5‑step sequence',
                  paragraphs: ['A structured sequence increases reply rates significantly.'],
                  bullets: [
                    'Day 1 – Email 1: Introduce the problem and value proposition',
                    'Day 3 – Follow-up 1: Add an insight or customer example',
                    'Day 5 – LinkedIn: Connect with a personalized note',
                    'Day 7 – Email 2: Share a relevant resource or case study',
                    'Day 10 – Final follow-up: Ask whether timing is right',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Add value with every touch',
                    paragraphs: ['Each follow-up should introduce something new. Avoid repeatedly asking "Just checking if you saw my last email." Instead, add value with every interaction.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-launch-measure"
                id="step-launch-measure"
                title="7. Step 6: Launch and Measure Your Campaign"
                showImage={false}
                intro={[
                  "Once your sequence is ready, launch your campaign – but don't stop paying attention.",
                  'Successful outreach is built through continuous improvement.',
                  'Monitor key performance metrics such as:',
                ]}
                infographic={{
                  title: 'Metrics to track',
                  paragraphs: ['Measurement drives optimization.'],
                  bullets: [
                    'Open rate',
                    'Reply rate',
                    'Positive reply rate',
                    'Bounce rate',
                    'Spam complaint rate',
                    'Meeting booking rate',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Optimize continuously',
                    paragraphs: ['If reply rates are low, review your messaging. If bounce rates are high, verify your contact list. If inbox placement declines, investigate deliverability before increasing sending volume. Small optimizations often produce significant improvements over time.'],
                  },
                ]}
              />

              <ArticleSection
                key="common-mistakes"
                id="common-mistakes"
                title="8. Common First-Time Cold Email Mistakes"
                showImage={false}
                intro={[
                  'Avoid these mistakes when launching your first campaign:',
                ]}
                infographic={{
                  title: 'Mistakes to avoid',
                  paragraphs: ['Learn from the most common pitfalls.'],
                  bullets: [
                    'Targeting everyone instead of a defined ICP',
                    'Buying unverified contact lists',
                    'Sending emails from a new domain without warming it up',
                    'Writing emails longer than 125 words',
                    'Talking about your company instead of the prospect',
                    'Using multiple calls-to-action in one email',
                    'Giving up after one email',
                    'Ignoring campaign performance metrics',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Continuous improvement',
                    paragraphs: ["The most successful cold email campaigns aren't perfect from day one. They're continuously improved."],
                  },
                ]}
              />

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="9. Build Your First Campaign With Confidence"
                showImage={false}
                intro={[
                  "Your first cold email campaign doesn't need to be complicated.",
                  'It needs to be intentional.',
                  'Start with the right audience. Build a verified prospect list. Protect your sender reputation. Write concise, relevant emails. Follow up consistently. Then measure, learn, and improve.',
                  "Cold email isn't about sending thousands of messages.",
                  "It's about creating meaningful conversations with the right people.",
                  'When every part of your campaign works together – from targeting and deliverability to personalization and follow-ups – you create a predictable system for generating pipeline.',
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    "Launching your first campaign shouldn't require juggling multiple tools. 360Airo brings together AI-powered prospect research, email verification, deliverability monitoring, domain warm-up, intelligent personalization, automated follow-up sequences, and campaign analytics in one platform.",
                    "Whether you're sending your first 100 emails or scaling outbound across multiple markets, 360Airo helps you build campaigns that reach inboxes, generate replies, and turn prospects into qualified opportunities.",
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