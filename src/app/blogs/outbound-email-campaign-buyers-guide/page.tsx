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
  { id: 'start-with-business-goals', label: '1. Start with Your Business Goals', arrow: true },
  { id: 'understand-team-workflow', label: "2. Understand Your Team's Workflow", arrow: true },
  { id: 'evaluate-ai-personalization', label: '3. Evaluate AI Personalization Capabilities', arrow: true },
  { id: 'check-deliverability', label: '4. Check Deliverability Features', arrow: true },
  { id: 'compare-automation', label: '5. Compare Automation and Sequencing', arrow: true },
  { id: 'look-beyond-email', label: '6. Look Beyond Email', arrow: true },
  { id: 'assess-integrations', label: '7. Assess CRM and Third-Party Integrations', arrow: true },
  { id: 'evaluate-analytics', label: '8. Evaluate Reporting and Analytics', arrow: true },
  { id: 'review-ease-of-use', label: '9. Review Ease of Use', arrow: true },
  { id: 'compare-pricing', label: '10. Compare Pricing Carefully', arrow: true },
  { id: 'evaluate-support', label: '11. Evaluate Customer Support', arrow: true },
  { id: 'read-reviews', label: '12. Read Customer Reviews', arrow: true },
  { id: 'request-demo', label: '13. Request a Live Demo', arrow: true },
  { id: 'ask-scalability', label: '14. Ask About Scalability', arrow: true },
  { id: 'create-checklist', label: '15. Create a Vendor Comparison Checklist', arrow: true },
  { id: 'final-thoughts', label: 'Final Thoughts', arrow: true },
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
    alt: "Outbound email campaign buyer's guide",
    label: "Buyer's Guide",
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
          Buyer's Guide Outbound Email
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Evaluate outbound email software with confidence. This guide covers AI personalization, deliverability, automation, and more.
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
          Don't just compare features
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The best platform is the one that fits your workflow. Prioritize ease of use, integrations, and support alongside features.
        </p>
      </div>
    </aside>
  );
});

// --- Vendor Comparison Checklist Component ---
const VENDOR_CHECKLIST_ITEMS = [
  'AI personalization',
  'Deliverability features',
  'Automation capabilities',
  'CRM integrations',
  'Reporting & analytics',
  'Ease of use',
  'Customer support',
  'Pricing transparency',
  'Scalability',
  'Overall value',
];

const VendorChecklist = memo(function VendorChecklist() {
  return (
    <div className="my-6 md:my-8 rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm overflow-hidden">
      <div className="bg-[#f8f9ff] px-4 py-3 md:px-6 md:py-4 border-b border-[#dbe3f4]">
        <h3 className="text-[16px] md:text-[18px] font-bold text-[#111827]">Vendor Comparison Checklist</h3>
        <p className="text-[13px] md:text-[14px] text-[#4f5668] mt-1">Score each platform on these criteria before deciding.</p>
      </div>
      <div className="p-4 md:p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {VENDOR_CHECKLIST_ITEMS.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-[15px] md:text-[16px] text-[#4f5668]">
              <span className="text-[#4f63ff] font-bold mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'How AI Personalization Increases Outbound Email Reply Rates',
    tag: 'AI',
    href: '/blogs/how-ai-personalization-increases-reply-rates',
    description: 'Learn how AI-powered personalization helps you scale relevant, context-aware outreach.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'How to Improve Cold Email Reply Rates: 7 Proven Strategies',
    tag: 'Cold Email',
    href: '/blogs/how-to-improve-cold-email-reply-rates',
    description: 'Learn 7 proven strategies to turn more opens into meaningful conversations.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'How Does Email Deliverability Work? A Step‑by‑Step Guide',
    tag: 'Deliverability',
    href: '/blogs/how-email-deliverability-works',
    description: 'Learn how email deliverability works and how to keep your messages out of spam.',
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

export default function BlogOutboundEmailBuyersGuidePage() {
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
              <Link href="/blogs?category=buyers-guide" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Buyer's Guide
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">Outbound Email Campaign Buyer's Guide</span>
                <span className="sm:hidden">Outbound Email Buyer's Guide</span>
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
                    alt="Outbound email buyer's guide hero"
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
                  Buyer's Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  Outbound Email Campaign Buyer's Guide: What to Evaluate Before You Buy
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  Buying outbound email software isn't just about comparing feature lists. The right platform can help your sales team generate more qualified meetings, improve email deliverability, and scale personalized outreach. This guide walks you through the key factors to evaluate before investing.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 12 min read</span>
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
                  "Buying outbound email software isn't just about comparing feature lists. The right platform can help your sales team generate more qualified meetings, improve email deliverability, and scale personalized outreach. The wrong one can lead to poor inbox placement, limited automation, hidden costs, and hours of manual work.",
                  'With dozens of outbound sales platforms on the market, choosing the right solution can feel overwhelming. Some tools specialize in cold email automation, while others focus on AI personalization, deliverability, prospecting, or multichannel engagement.',
                  "This buyer's guide walks you through the key factors to evaluate before investing in outbound email campaign software, helping you make an informed decision that aligns with your team's goals, workflow, and budget.",
                ]}
                infographic={{
                  title: "What you'll learn",
                  paragraphs: ['This guide covers 15 key evaluation criteria, from business goals and AI personalization to deliverability, automation, integrations, and vendor comparison.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="start-with-business-goals"
                id="start-with-business-goals"
                title="1. Start with Your Business Goals"
                showImage={false}
                intro={[
                  'Before comparing vendors, define what success looks like for your organization.',
                  'Questions to ask:',
                ]}
                infographic={{
                  title: 'Define your goals',
                  paragraphs: ['Clarifying your objectives makes vendor selection easier.'],
                  bullets: [
                    'Are you trying to book more meetings?',
                    'Increase reply rates?',
                    'Replace manual outreach?',
                    'Improve deliverability?',
                    'Scale outbound without hiring more SDRs?',
                    'Support multiple sales teams?',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The takeaway',
                    paragraphs: ["Choosing software becomes much easier once you understand the problem you're trying to solve."],
                  },
                ]}
              />

              <ArticleSection
                key="understand-team-workflow"
                id="understand-team-workflow"
                title="2. Understand Your Team's Workflow"
                showImage={false}
                intro={[
                  'The best platform should fit naturally into your existing sales process.',
                  'Evaluate:',
                ]}
                infographic={{
                  title: 'Workflow factors',
                  paragraphs: ['A startup with one sales rep has very different needs from a global enterprise.'],
                  bullets: [
                    'Team size',
                    'Number of SDRs and AEs',
                    'Monthly email volume',
                    'Current CRM',
                    'Existing sales tools',
                    'Approval workflows',
                    'Reporting requirements',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="evaluate-ai-personalization"
                id="evaluate-ai-personalization"
                title="3. Evaluate AI Personalization Capabilities"
                showImage={true}
                intro={[
                  'Generic email templates no longer deliver consistent results.',
                  'Modern outbound platforms should help sales teams personalize outreach at scale.',
                  'Look for software that can personalize emails using:',
                ]}
                infographic={{
                  title: 'AI personalization sources',
                  paragraphs: ['Reduce research time without sacrificing authenticity.'],
                  bullets: [
                    'Company websites',
                    'LinkedIn profiles',
                    'Job titles',
                    'Industry insights',
                    'Recent company news',
                    'Buyer intent signals',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Questions to ask vendors',
                    paragraphs: ['How is personalization generated? Can users edit AI outputs? Does it reference real prospect information? How much manual work is still required?'],
                  },
                ]}
              />

              <ArticleSection
                key="check-deliverability"
                id="check-deliverability"
                title="4. Check Deliverability Features"
                showImage={false}
                intro={[
                  'Deliverability should be a top priority.',
                  "Without strong inbox placement, even exceptional emails won't generate results.",
                ]}
                infographic={{
                  title: 'Essential deliverability capabilities',
                  paragraphs: ['Protect your sender reputation and inbox placement.'],
                  bullets: [
                    'Email warm-up',
                    'Inbox rotation',
                    'SPF, DKIM, and DMARC support',
                    'Reputation monitoring',
                    'Bounce management',
                    'Sending limits',
                    'Domain health insights',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Long-term health',
                    paragraphs: ['Ask how the platform helps maintain long-term sender reputation.'],
                  },
                ]}
              />

              <ArticleSection
                key="compare-automation"
                id="compare-automation"
                title="5. Compare Automation and Sequencing"
                showImage={false}
                intro={[
                  'Automation saves time—but flexibility matters.',
                  'Evaluate whether the platform supports:',
                ]}
                infographic={{
                  title: 'Automation capabilities',
                  paragraphs: ['The more adaptable the workflow, the easier it is to create personalized buyer journeys.'],
                  bullets: [
                    'Multi-step sequences',
                    'Conditional follow-ups',
                    'Reply detection',
                    'Time zone scheduling',
                    'Pause rules',
                    'Branching logic',
                    'Trigger-based automation',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="look-beyond-email"
                id="look-beyond-email"
                title="6. Look Beyond Email"
                showImage={false}
                intro={[
                  "Today's buyers engage across multiple channels.",
                  'Consider platforms that support:',
                ]}
                infographic={{
                  title: 'Multichannel capabilities',
                  paragraphs: ['A multichannel approach often produces higher engagement than email alone.'],
                  bullets: [
                    'LinkedIn outreach',
                    'SMS',
                    'Phone tasks',
                    'WhatsApp (where applicable)',
                    'CRM activities',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="assess-integrations"
                id="assess-integrations"
                title="7. Assess CRM and Third-Party Integrations"
                showImage={false}
                intro={[
                  'Your outbound platform should integrate seamlessly with the tools your team already uses.',
                  'Common integrations include:',
                ]}
                infographic={{
                  title: 'Key integrations',
                  paragraphs: ['Native integrations reduce manual work and improve data accuracy.'],
                  bullets: [
                    'Salesforce',
                    'HubSpot',
                    'Pipedrive',
                    'Zoho CRM',
                    'Slack',
                    'Calendly',
                    'Zapier',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="evaluate-analytics"
                id="evaluate-analytics"
                title="8. Evaluate Reporting and Analytics"
                showImage={false}
                intro={[
                  'Good analytics help improve future campaigns.',
                  'Look for dashboards covering:',
                ]}
                infographic={{
                  title: 'Metrics to track',
                  paragraphs: ['Advanced reporting makes it easier to optimize campaigns over time.'],
                  bullets: [
                    'Delivery rates',
                    'Open rates',
                    'Reply rates',
                    'Positive replies',
                    'Meetings booked',
                    'Bounce rates',
                    'Sequence performance',
                    'Team productivity',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="review-ease-of-use"
                id="review-ease-of-use"
                title="9. Review Ease of Use"
                showImage={false}
                intro={[
                  'Powerful features mean little if your team struggles to use them.',
                  'During product demos, evaluate:',
                ]}
                infographic={{
                  title: 'Usability factors',
                  paragraphs: ['Ask how quickly new users typically become productive.'],
                  bullets: [
                    'Interface design',
                    'Campaign creation process',
                    'Learning curve',
                    'Onboarding experience',
                    'Template management',
                    'Team collaboration',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="compare-pricing"
                id="compare-pricing"
                title="10. Compare Pricing Carefully"
                showImage={false}
                intro={[
                  "Don't compare vendors based solely on monthly subscription costs.",
                  'Understand:',
                ]}
                infographic={{
                  title: 'Pricing components',
                  paragraphs: ['A slightly higher subscription may deliver better ROI if it saves hours of manual work.'],
                  bullets: [
                    'Pricing per user',
                    'Email limits',
                    'Inbox limits',
                    'AI usage restrictions',
                    'Premium integrations',
                    'Onboarding fees',
                    'Support costs',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="evaluate-support"
                id="evaluate-support"
                title="11. Evaluate Customer Support"
                showImage={false}
                intro={[
                  'Responsive support becomes invaluable during campaign launches.',
                  'Ask:',
                ]}
                infographic={{
                  title: 'Support questions',
                  paragraphs: ['Reliable support shortens adoption time and reduces downtime.'],
                  bullets: [
                    'Is onboarding included?',
                    'Is live chat available?',
                    'Are dedicated success managers offered?',
                    "What's the average response time?",
                    'Is training provided?',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="read-reviews"
                id="read-reviews"
                title="12. Read Customer Reviews"
                showImage={false}
                intro={[
                  "Independent reviews often reveal strengths and weaknesses that sales demos don't.",
                  'Look for recurring themes around:',
                ]}
                infographic={{
                  title: 'What to look for in reviews',
                  paragraphs: ['Focus on long-term customer experiences rather than isolated opinions.'],
                  bullets: [
                    'Deliverability',
                    'Ease of use',
                    'Customer support',
                    'Reliability',
                    'AI quality',
                    'Scalability',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="request-demo"
                id="request-demo"
                title="13. Request a Live Demo"
                showImage={false}
                intro={[
                  'A demo should answer practical questions, not just showcase features.',
                  'Ask the vendor to demonstrate:',
                ]}
                infographic={{
                  title: 'Demo checklist',
                  paragraphs: ['Seeing real workflows is more valuable than watching polished marketing videos.'],
                  bullets: [
                    'Campaign creation',
                    'AI personalization',
                    'Sequence setup',
                    'Reporting',
                    'CRM sync',
                    'Deliverability tools',
                    'User permissions',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="ask-scalability"
                id="ask-scalability"
                title="14. Ask About Scalability"
                showImage={false}
                intro={[
                  'Your needs today may look very different a year from now.',
                  'Evaluate whether the platform can support:',
                ]}
                infographic={{
                  title: 'Scalability factors',
                  paragraphs: ['Buying software that scales prevents expensive migrations later.'],
                  bullets: [
                    'Additional users',
                    'Multiple brands',
                    'Larger prospect databases',
                    'Higher email volumes',
                    'Global sales teams',
                    'Advanced reporting',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="create-checklist"
                id="create-checklist"
                title="15. Create a Vendor Comparison Checklist"
                showImage={true}
                intro={[
                  'Before making a decision, compare vendors using consistent criteria.',
                  'Score each platform based on:',
                ]}
                infographic={{
                  title: 'Comparison criteria',
                  paragraphs: ['A structured comparison makes it easier to identify the solution that best fits your business.'],
                  bullets: [
                    'AI personalization',
                    'Deliverability',
                    'Automation',
                    'CRM integrations',
                    'Reporting',
                    'Ease of use',
                    'Customer support',
                    'Pricing',
                    'Scalability',
                    'Overall value',
                  ],
                }}
                blocks={[]}
              />

              {/* Vendor Comparison Checklist Component */}
              <VendorChecklist />

              <ArticleSection
                key="final-thoughts"
                id="final-thoughts"
                title="Final Thoughts"
                showImage={false}
                intro={[
                  "The best outbound email campaign software isn't necessarily the one with the longest feature list—it's the one that helps your team consistently generate qualified conversations while reducing manual work.",
                  'As outbound sales continue to evolve, businesses should prioritize platforms that combine AI-powered personalization, deliverability optimization, intelligent automation, and multichannel engagement. These capabilities not only improve campaign performance but also allow sales teams to scale outreach without sacrificing relevance.',
                  "By evaluating vendors against the criteria outlined in this buyer's guide, you'll be better equipped to invest in software that supports both your current sales process and your long-term growth strategy. Taking the time to assess each platform carefully today can save your team significant time, cost, and frustration in the future.",
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    '360Airo combines AI-powered personalization, deliverability optimization, intelligent automation, and multichannel engagement in one platform. Book a demo to see how it can help your team generate more qualified conversations and scale outbound with confidence.',
                  ],
                }}
                blocks={[]}
              />
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