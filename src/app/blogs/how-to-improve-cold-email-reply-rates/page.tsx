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
  { id: 'what-is-reply-rate', label: '1. What Is a Cold Email Reply Rate?', arrow: true },
  { id: 'write-about-prospect', label: '2. Write About the Prospect, Not Yourself', arrow: true },
  { id: 'keep-email-short', label: '3. Keep Your Email Short', arrow: true },
  { id: 'personalize-beyond-first-name', label: '4. Personalize Beyond the First Name', arrow: true },
  { id: 'build-follow-up-sequence', label: '5. Build a Follow-Up Sequence Instead of Sending One Email', arrow: true },
  { id: 'end-with-one-cta', label: '6. End With One Clear Call-to-Action', arrow: true },
  { id: 'test-measure-improve', label: '7. Test, Measure, and Improve Every Campaign', arrow: true },
  { id: 'best-practices-checklist', label: 'Common Cold Email Best Practices to Remember', arrow: true },
  { id: 'faqs', label: 'Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: 'Turn More Opens Into Replies', arrow: true },
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
    alt: 'Cold email reply rate strategies',
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
          Reply Rate Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Learn 7 proven strategies to improve cold email reply rates and generate more conversations.
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
          Follow‑ups drive replies
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Emails with at least one follow‑up receive 66% more replies than a single email. Don't stop after one send.
        </p>
      </div>
    </aside>
  );
});

// --- Follow-Up Sequence Table Component ---
const FOLLOW_UP_ROWS = [
  { day: 'Day 1', touchpoint: 'Initial email' },
  { day: 'Day 3', touchpoint: 'Follow‑up with an additional insight' },
  { day: 'Day 6', touchpoint: 'Share a relevant case study or resource' },
  { day: 'Day 9', touchpoint: 'Final follow‑up with a simple CTA' },
];

const FollowUpSequenceTable = memo(function FollowUpSequenceTable() {
  return (
    <div className="my-6 md:my-8 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Day</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Touchpoint</th>
          </tr>
        </thead>
        <tbody>
          {FOLLOW_UP_ROWS.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Day">{row.day}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Touchpoint">{row.touchpoint}</td>
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
          Book a demo today and discover how 360Airo helps you improve cold email reply rates and turn outreach into predictable pipeline growth.
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

// --- Hoisted static FAQ data ---
const FAQ_ITEMS = [
  {
    subtitle: 'What is a good cold email reply rate?',
    paragraphs: ['A good cold email reply rate typically ranges from 1% to 5%. The top 10% of campaigns achieve reply rates above 9%.'],
  },
  {
    subtitle: 'Why are my cold emails opened but not replied to?',
    paragraphs: ['If your emails are opened but not replied to, your subject line is working, but your message may not be compelling enough. Focus on personalization, value proposition, and a clear call-to-action.'],
  },
  {
    subtitle: 'How many follow-ups should I send?',
    paragraphs: ['Research shows that 3–5 touchpoints generate nearly 80% of all replies. A sequence of 4 emails over 9 days is a good starting point.'],
  },
  {
    subtitle: 'Should I personalize every cold email?',
    paragraphs: ['Yes. Personalization beyond the first name significantly improves reply rates. Reference company news, recent activity, or specific business challenges.'],
  },
  {
    subtitle: 'How long should a cold email be?',
    paragraphs: ['Keep your cold email under 125 words, or about 30 seconds of reading time. Focus on one problem, one value proposition, and one call-to-action.'],
  },
];

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

export default function BlogHowToImproveColdEmailReplyRatesPage() {
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
                <span className="hidden sm:inline">How to Improve Cold Email Reply Rates: 7 Proven Strategies</span>
                <span className="sm:hidden">Improve Cold Email Reply Rates</span>
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
                    alt="Improve cold email reply rates hero"
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
                  How to Improve Cold Email Reply Rates: 7 Proven Strategies
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  You spent hours building a prospect list. The opens start coming in – but the replies never follow. Learn 7 proven strategies to turn more opens into meaningful conversations.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 10 min read</span>
                  <span>• 1.9K reads</span>
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
                  'You spent hours building a prospect list.',
                  'You verified every email address, personalized your message, and finally launched your campaign.',
                  'The opens start coming in.',
                  'But the replies never follow.',
                  "It's one of the most frustrating situations in outbound sales. High open rates may indicate your subject line worked—but reply rate is what determines whether your campaign actually generates opportunities.",
                  "The average cold email response rate typically falls between 1% and 5%, yet the top 10% of campaigns consistently achieve reply rates above 9%. The difference isn't luck. It's the strategy.",
                  'Another important insight? Emails with at least one follow-up receive 66% more replies than those that stop after the first message.',
                  "The encouraging news is that improving reply rates doesn't require sending more emails. It requires sending better ones.",
                  "In this guide, you'll learn seven practical ways to improve cold email reply rates, backed by proven cold email best practices that help turn more prospects into conversations.",
                ]}
                infographic={{
                  title: 'The reply rate reality',
                  paragraphs: ['Average reply rates are 1–5%. Top performers achieve 9%+. The difference is strategy, not luck.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-reply-rate"
                id="what-is-reply-rate"
                title="1. What Is a Cold Email Reply Rate?"
                showImage={false}
                intro={[
                  "Before improving it, it's important to understand what it measures.",
                  'Reply rate is the percentage of recipients who respond to your cold email.',
                  'The formula is simple:',
                  'Reply Rate = (Total Replies ÷ Total Emails Delivered) × 100',
                  'Unlike open rates, reply rates measure genuine engagement.',
                  'Someone who replies has taken the time to respond, ask a question, request a meeting, or continue the conversation.',
                ]}
                infographic={{
                  title: 'Why reply rate matters',
                  paragraphs: ['Reply rate is one of the most meaningful indicators of cold email success because replies create opportunities—not opens.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="write-about-prospect"
                id="write-about-prospect"
                title="2. Write About the Prospect, Not Yourself"
                showImage={true}
                intro={[
                  'One of the biggest reasons cold emails fail is that they sound like company introductions.',
                  'Many emails begin with paragraphs explaining who the sender is, what the company does, and why the product is great.',
                  "Prospects don't care about that—at least not yet.",
                  'They care about solving their own problems.',
                  'Instead of introducing your company first, begin with a challenge your prospect is likely facing.',
                ]}
                infographic={{
                  title: 'Bad vs. Good Example',
                  paragraphs: ["Talk about the prospect's business before talking about your own."],
                  bullets: [
                    "❌ BAD: \"We're an AI-powered sales automation platform...\"",
                    '✅ GOOD: "Many growing sales teams struggle to personalize outreach while maintaining consistent follow-ups..."',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="keep-email-short"
                id="keep-email-short"
                title="3. Keep Your Email Short"
                showImage={false}
                intro={[
                  'Long emails rarely improve reply rates.',
                  'In fact, they often do the opposite.',
                  "Decision-makers scan emails quickly. If your message looks like a wall of text, most recipients won't read it.",
                  'Aim for:',
                ]}
                infographic={{
                  title: 'Short email guidelines',
                  paragraphs: ['Short emails are easier to read, understand, and reply to.'],
                  bullets: [
                    'Under 125 words',
                    'One business challenge',
                    'One value proposition',
                    'One simple call-to-action',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why short works',
                    paragraphs: ['Avoid explaining every feature of your product. Your first email should create curiosity—not complete the sales process.'],
                  },
                ]}
              />

              <ArticleSection
                key="personalize-beyond-first-name"
                id="personalize-beyond-first-name"
                title="4. Personalize Beyond the First Name"
                showImage={false}
                intro={[
                  "Adding {{First Name}} isn't real personalization.",
                  "It's expected.",
                  "True personalization demonstrates that you've invested time understanding the prospect's business.",
                  'Mention something meaningful, such as:',
                ]}
                infographic={{
                  title: 'Meaningful personalization',
                  paragraphs: ['Context creates curiosity—and curiosity drives replies.'],
                  bullets: [
                    'A recent funding announcement',
                    'Company expansion',
                    'A new product launch',
                    'Hiring activity',
                    'Industry news',
                    'A LinkedIn post',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Real personalization in action',
                    paragraphs: ["Imagine receiving two emails. One begins with your first name. The other references your company's recent expansion into a new market. Which one feels more relevant? Exactly."],
                  },
                ]}
              />

              <ArticleSection
                key="build-follow-up-sequence"
                id="build-follow-up-sequence"
                title="5. Build a Follow-Up Sequence Instead of Sending One Email"
                showImage={true}
                intro={[
                  'Many campaigns fail because they stop too soon.',
                  'Sales representatives often assume that no reply means no interest.',
                  'In reality, buyers are busy.',
                  'They miss emails. They postpone decisions. They forget to respond.',
                  'Research shows that emails with at least one follow-up receive 66% more replies, making follow-up one of the simplest ways to improve campaign performance.',
                  'Instead of sending the same message repeatedly, add value with each touchpoint.',
                ]}
                infographic={{
                  title: 'Follow‑up facts',
                  paragraphs: ['Persistence works when every follow‑up adds something new.'],
                  bullets: [
                    'Share a customer success story.',
                    'Mention a relevant industry trend.',
                    'Provide a useful resource.',
                    'Ask a simpler question.',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Example follow‑up sequence',
                    paragraphs: ['Every follow‑up should move the conversation forward—not simply ask whether the prospect saw your previous email.'],
                  },
                ]}
              />

              {/* Follow-Up Sequence Table */}
              <div className="my-4 md:my-6">
                <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-3 md:mb-4">
                  Example Follow‑Up Sequence
                </h3>
                <FollowUpSequenceTable />
              </div>

              <ArticleSection
                key="end-with-one-cta"
                id="end-with-one-cta"
                title="6. End With One Clear Call-to-Action"
                showImage={false}
                intro={[
                  "You've written a compelling email. You've personalized it. You've kept it concise.",
                  "Now don't lose the reply by asking too much.",
                  'One of the most common cold email mistakes is ending with multiple questions.',
                  'For example: "Would you like a demo, should I send more information, or would next Tuesday work?"',
                  'Too many choices create decision fatigue.',
                  'The easier it is to respond, the more likely prospects are to do so.',
                  'Instead, include one clear call-to-action.',
                ]}
                infographic={{
                  title: 'One CTA that works',
                  paragraphs: ['Ask one simple question. Make replying easier than ignoring the email.'],
                  bullets: [
                    'Would you be open to a 15-minute conversation next week?',
                    'Is this currently something your team is exploring?',
                    'Would it make sense to share a few ideas?',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Low‑friction wins',
                    paragraphs: ['A low‑friction CTA feels less like a sales pitch and more like a professional discussion.'],
                  },
                ]}
              />

              <ArticleSection
                key="test-measure-improve"
                id="test-measure-improve"
                title="7. Test, Measure, and Improve Every Campaign"
                showImage={true}
                intro={[
                  "The highest-performing outbound teams don't rely on intuition.",
                  'They rely on data.',
                  "Every campaign provides insights into what's working—and what isn't.",
                  'Rather than launching one campaign and hoping for better results next time, review your performance regularly.',
                ]}
                infographic={{
                  title: 'Metrics to track',
                  paragraphs: ['Small improvements can produce significant long‑term gains.'],
                  bullets: [
                    'Reply rate',
                    'Positive reply rate',
                    'Open rate',
                    'Bounce rate',
                    'Meeting booking rate',
                    'Spam complaint rate',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Optimize systematically',
                    paragraphs: ["If reply rates are low but open rates are high, your subject line is probably working—but your message isn't compelling enough. If both metrics are low, you may have deliverability or targeting issues. When testing improvements, change one variable at a time. Great cold email campaigns aren't written once—they're continuously optimized."],
                  },
                ]}
              />

              <ArticleSection
                key="best-practices-checklist"
                id="best-practices-checklist"
                title="Common Cold Email Best Practices to Remember"
                showImage={false}
                intro={[
                  'Before launching your next campaign, review this checklist:',
                ]}
                infographic={{
                  title: 'Quick checklist',
                  paragraphs: ['These simple best practices can dramatically improve your response rates over time.'],
                  bullets: [
                    '✔ Target the right prospects.',
                    "✔ Personalize beyond the recipient's name.",
                    '✔ Keep emails under 125 words.',
                    "✔ Focus on the buyer's challenge, not your product.",
                    '✔ Include one clear call-to-action.',
                    '✔ Follow up consistently with additional value.',
                    '✔ Measure performance and optimize continuously.',
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
                    paragraphs={['Common questions about improving cold email reply rates.']}
                  />
                  <FaqAccordion faqs={FAQ_ITEMS} />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="Turn More Opens Into Replies"
                showImage={false}
                intro={[
                  'A high open rate might feel encouraging.',
                  "But opens don't create revenue.",
                  'Replies do.',
                  "The difference between an average campaign and an exceptional one usually isn't a completely different strategy—it's better execution.",
                  'The best-performing outreach campaigns focus on relevance instead of volume, conversations instead of pitches, and continuous improvement instead of guesswork.',
                  "Whether you're writing your first cold email or optimizing an existing outbound program, small improvements in personalization, follow-up, messaging, and targeting can significantly increase your reply rates.",
                  "Remember, the goal isn't simply to send more emails.",
                  "It's to start more meaningful conversations.",
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    'Generating more replies requires more than great copy. It requires the right data, intelligent personalization, strong deliverability, and consistent follow-up. 360Airo combines AI-powered prospect research, personalized email generation, email verification, deliverability monitoring, automated follow-up sequences, and campaign analytics into one platform.',
                    'Instead of managing multiple tools, your sales team can build campaigns that reach the inbox, engage decision-makers, and generate more qualified conversations.',
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