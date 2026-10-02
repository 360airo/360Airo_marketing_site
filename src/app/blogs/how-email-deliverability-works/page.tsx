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
  { id: 'what-is-email-deliverability', label: '1. What Is Email Deliverability?', arrow: true },
  { id: 'what-is-inbox-placement', label: '1.1 What Is Inbox Placement?', arrow: true, indent: true },
  { id: 'how-email-deliverability-works', label: '2. How Email Deliverability Works: The Journey of Every Email', arrow: true },
  { id: 'step-sender-creates-email', label: '3. Step 1: The Sender Creates and Sends the Email', arrow: true },
  { id: 'step-authentication', label: '4. Step 2: Authentication Proves Your Identity', arrow: true },
  { id: 'step-server-evaluates-reputation', label: '5. Step 3: The Receiving Mail Server Evaluates Your Reputation', arrow: true },
  { id: 'step-spam-filters', label: '6. Step 4: Spam Filters Inspect Every Email', arrow: true },
  { id: 'step-inbox-placement', label: '7. Step 5: Inbox Placement Determines Where Your Email Lands', arrow: true },
  { id: 'step-recipient-engagement', label: '8. Step 6: Recipient Engagement Shapes Future Deliverability', arrow: true },
  { id: 'step-monitor-improve', label: '9. Step 7: Monitor and Improve Email Deliverability', arrow: true },
  { id: 'best-practices', label: '10. Email Deliverability Best Practices', arrow: true },
  { id: 'common-mistakes', label: '11. Common Email Deliverability Mistakes', arrow: true },
  { id: 'faqs', label: '12. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '13. Deliverability Is the Foundation of Every Successful Email Campaign', arrow: true },
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
    alt: 'Email deliverability process illustration',
    label: 'Deliverability',
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
          Deliverability Step‑by‑Step
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Learn how email deliverability works and how to keep your messages out of spam.
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
          Inbox placement &gt; delivery
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A 98% delivery rate means nothing if your emails end up in spam. Focus on inbox placement.
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
          Book a demo today to discover how 360Airo helps your emails land where they belong – the inbox.
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
    subtitle: '1. What is email deliverability?',
    paragraphs: ["Email deliverability is the ability of an email to successfully reach a recipient's inbox instead of being blocked or filtered into spam."],
  },
  {
    subtitle: '2. What is inbox placement?',
    paragraphs: ['Inbox placement measures where your email lands after being accepted by the receiving mail server. A higher inbox placement rate means more emails reach the primary inbox.'],
  },
  {
    subtitle: '3. Why is email reputation important?',
    paragraphs: ["Email reputation helps mailbox providers determine whether you're a trustworthy sender. A strong reputation improves inbox placement, while a poor reputation increases the likelihood of spam filtering."],
  },
  {
    subtitle: '4. What affects email deliverability?',
    paragraphs: ['Several factors influence deliverability, including sender reputation, domain reputation, authentication (SPF, DKIM, DMARC), email list quality, bounce rates, spam complaints, recipient engagement, and sending consistency.'],
  },
  {
    subtitle: '5. How can I improve email deliverability?',
    paragraphs: ['You can improve deliverability by authenticating your domain, warming up new email accounts, verifying email addresses, sending personalized relevant emails, monitoring sender reputation, and maintaining consistent sending behavior.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: "Email Delivery vs Email Deliverability: What's the Difference?",
    tag: 'Deliverability',
    href: '/blogs/email-delivery-vs-deliverability',
    description: 'Learn the critical difference between delivery and inbox placement.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Why Your Cold Emails Go to Spam (And How to Keep Them Out)',
    tag: 'Deliverability',
    href: '/blogs/why-cold-emails-go-to-spam',
    description: 'Understand why spam filters block your emails and how to fix it.',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp',
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

export default function BlogHowEmailDeliverabilityWorksPage() {
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
              <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Deliverability
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">How Does Email Deliverability Work? A Step-by-Step Guide</span>
                <span className="sm:hidden">Email Deliverability Guide</span>
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
                    alt="How email deliverability works hero"
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
                  Deliverability Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  How Does Email Deliverability Work? A Step‑by‑Step Guide
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  You spend hours crafting the perfect email. Your subject line is compelling. Your message is personalized. You click Send, expecting conversations to begin. But reply rates remain low. The problem might not be your copy – it might be that your email never reached the inbox.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 11 min read</span>
                  <span>• 1.5K reads</span>
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

            <div className="min-w-0 space-y-4">
              <ArticleSection
                key="introduction"
                id="introduction"
                title="Introduction"
                showImage={false}
                intro={[
                  'You spend hours crafting the perfect email.',
                  'Your subject line is compelling. Your message is personalized. Your prospect list is carefully verified.',
                  'You click Send, expecting conversations to begin.',
                  'Instead, reply rates remain disappointingly low.',
                  'Was the copy ineffective?',
                  'Maybe.',
                  "But there's another possibility.",
                  'Your email never reached the inbox.',
                  'This happens more often than many businesses realize. In fact, 1 in 4 marketing emails never reaches the inbox, meaning thousands of carefully written emails are filtered into spam folders or blocked before recipients ever see them.',
                  "That's why understanding email deliverability is just as important as writing a great email.",
                  "A well-written email has little value if it isn't delivered.",
                  "In this guide, you'll learn how email deliverability works, what influences your email reputation, why inbox placement matters, and the journey every email takes before reaching your recipient.",
                ]}
                infographic={{
                  title: "What you'll learn",
                  paragraphs: ['The complete journey of an email – from send to inbox – and how to improve your deliverability step by step.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-deliverability"
                id="what-is-email-deliverability"
                title="1. What Is Email Deliverability?"
                showImage={false}
                intro={[
                  "Email deliverability is the ability of an email to successfully reach a recipient's inbox instead of being rejected, blocked, or delivered to the spam folder.",
                  'Many people confuse delivery with deliverability.',
                  "They're not the same.",
                  'Imagine mailing a letter.',
                  "The postal service may successfully deliver it to the recipient's building.",
                  'But if someone immediately throws it into the recycling bin before the recipient sees it, your message still failed to achieve its purpose.',
                  'Email works similarly.',
                  'An email can technically be delivered while still landing in spam.',
                  'True email deliverability measures whether your message reaches the primary inbox, where recipients are most likely to read and respond.',
                ]}
                infographic={{
                  title: 'Delivery vs Deliverability',
                  paragraphs: ['Delivery = accepted by the server. Deliverability = reaches the inbox.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-inbox-placement"
                id="what-is-inbox-placement"
                title="1.1 What Is Inbox Placement?"
                showImage={false}
                intro={[
                  'Inbox placement refers to where your email ends up after it has been accepted by the receiving mail server.',
                  'There are three possible outcomes:',
                ]}
                infographic={{
                  title: 'Inbox placement outcomes',
                  paragraphs: ['Where your email lands determines its effectiveness.'],
                  bullets: [
                    'Primary inbox – best chance of being seen and acted upon',
                    'Spam or junk folder – unlikely to be seen',
                    'Blocked or rejected – never reaches the recipient',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The benchmark',
                    paragraphs: ['For healthy, well-managed domains, the average inbox placement rate should generally exceed 95%. A strong inbox placement rate means mailbox providers trust your sending behavior. A poor inbox placement rate usually indicates reputation or technical issues that need attention.'],
                  },
                ]}
              />

              <ArticleSection
                key="how-email-deliverability-works"
                id="how-email-deliverability-works"
                title="2. How Email Deliverability Works: The Journey of Every Email"
                showImage={true}
                intro={[
                  'Every email follows a series of checks before reaching the recipient.',
                  'Think of it like airport security.',
                  "Passengers don't simply walk onto the plane.",
                  'They pass through several checkpoints first.',
                  'Emails follow a similar process.',
                ]}
                infographic={{
                  title: 'The email journey',
                  paragraphs: ['Authentication → ISP → Spam filters → Inbox (or spam)'],
                  bullets: [
                    'Sender creates and sends the email',
                    'Domain authentication (SPF, DKIM, DMARC)',
                    'Internet Service Provider (ISP) evaluation',
                    'Spam filter inspection',
                    'Inbox placement decision',
                    'Recipient engagement feedback',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="step-sender-creates-email"
                id="step-sender-creates-email"
                title="3. Step 1: The Sender Creates and Sends the Email"
                showImage={false}
                intro={[
                  'Everything begins with the sender.',
                  'When you click Send, your email provider packages your message together with important information, including:',
                ]}
                infographic={{
                  title: 'What’s in your email package',
                  paragraphs: ['Your email carries metadata that influences its journey.'],
                  bullets: [
                    'Sender address',
                    'Recipient address',
                    'Subject line',
                    'Email content',
                    'Attachments',
                    'Domain information',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Your behavior already matters',
                    paragraphs: ['Mailbox providers consider questions such as: Is this a new domain? How many emails are being sent? Has this sender previously generated spam complaints? Is sending behavior consistent? These factors contribute to your email reputation, which influences every step that follows.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-authentication"
                id="step-authentication"
                title="4. Step 2: Authentication Proves Your Identity"
                showImage={false}
                intro={[
                  'Before mailbox providers trust your email, they first verify that it genuinely came from your domain.',
                  'This is where authentication comes in.',
                  'Three important records help establish trust:',
                ]}
                infographic={{
                  title: 'The authentication triad',
                  paragraphs: ['SPF, DKIM, and DMARC answer the question: "Is this sender who they claim to be?"'],
                  bullets: [
                    'SPF – specifies which servers can send for your domain',
                    'DKIM – adds a digital signature to your email',
                    'DMARC – tells providers what to do if authentication fails',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why it matters',
                    paragraphs: ["Without authentication, mailbox providers may suspect spoofing or phishing attempts. Even legitimate emails can struggle with deliverability if authentication isn't configured correctly. Think of authentication as showing identification before entering a secure building – without ID, entry becomes much more difficult."],
                  },
                ]}
              />

              <ArticleSection
                key="step-server-evaluates-reputation"
                id="step-server-evaluates-reputation"
                title="5. Step 3: The Receiving Mail Server Evaluates Your Reputation"
                showImage={false}
                intro={[
                  'Once your identity has been verified, the receiving email provider – such as Gmail or Outlook – evaluates your reputation.',
                  'This is one of the most important stages in how email deliverability works.',
                  'Mailbox providers maintain historical information about every sender.',
                  'They consider factors such as:',
                ]}
                infographic={{
                  title: 'Reputation factors',
                  paragraphs: ['Your reputation is built on many signals.'],
                  bullets: [
                    'Sender reputation',
                    'Domain reputation',
                    'Sending consistency',
                    'Bounce rates',
                    'Spam complaints',
                    'Recipient engagement',
                    'Authentication status',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Think of it like a credit score',
                    paragraphs: ["You build it gradually through consistent, responsible behavior. Positive sending habits improve reputation; negative behavior damages it. For example, sending relevant emails to verified contacts strengthens trust, while sending thousands of emails to outdated lists creates the opposite effect. Once reputation begins declining, recovering it takes time – that's why proactive deliverability management is so important."],
                  },
                ]}
              />

              <ArticleSection
                key="step-spam-filters"
                id="step-spam-filters"
                title="6. Step 4: Spam Filters Inspect Every Email"
                showImage={false}
                intro={[
                  'Even if your reputation is strong, one final checkpoint remains: spam filters.',
                  'These systems analyze every incoming email before deciding where it belongs.',
                  "They don't evaluate just one factor. Instead, they combine hundreds of signals.",
                ]}
                infographic={{
                  title: 'Spam filter signals',
                  paragraphs: ['Spam filters look at many indicators.'],
                  bullets: [
                    'Authentication status',
                    'Sender reputation',
                    'Email content',
                    'Links',
                    'Images',
                    'Attachments',
                    'Complaint history',
                    'Recipient engagement',
                    'Sending behavior',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'What triggers spam filtering?',
                    paragraphs: ["If enough signals appear suspicious, your email may be routed to spam instead of the inbox. Importantly, this doesn't necessarily mean your email was malicious – it simply means the provider wasn't confident enough to place it directly into the inbox."],
                  },
                ]}
              />

              <ArticleSection
                key="step-inbox-placement"
                id="step-inbox-placement"
                title="7. Step 5: Inbox Placement Determines Where Your Email Lands"
                showImage={true}
                intro={[
                  'After your email passes authentication, reputation checks, and spam filter analysis, the email provider decides where it belongs.',
                  'This decision is known as inbox placement.',
                  'There are three possible outcomes:',
                ]}
                infographic={{
                  title: 'Inbox placement decisions',
                  paragraphs: ['Where your email lands determines its success.'],
                  bullets: [
                    "Primary inbox – your email reaches the main inbox, where it's most likely to be opened and acted upon.",
                    'Spam or junk folder – the email is delivered but unlikely to be seen.',
                    'Rejected or blocked – the email never reaches the recipient at all.',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Why inbox placement matters more than delivery',
                    paragraphs: ['An email sitting unnoticed in the spam folder is just as ineffective as an email that was never delivered. For most businesses, an inbox placement rate above 95% indicates healthy email practices and a strong sender reputation. The higher your inbox placement rate, the greater your chances of generating opens, replies, meetings, and ultimately, revenue.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-recipient-engagement"
                id="step-recipient-engagement"
                title="8. Step 6: Recipient Engagement Shapes Future Deliverability"
                showImage={false}
                intro={[
                  'Many marketers think the email journey ends once the message reaches the inbox.',
                  "In reality, that's only the beginning.",
                  'Mailbox providers closely monitor how recipients interact with your emails.',
                  'Every action tells them something about the quality and relevance of your messages.',
                ]}
                infographic={{
                  title: 'Engagement signals',
                  paragraphs: ['Recipient actions send powerful signals.'],
                  bullets: [
                    'Positive: opens, replies, clicks, forwarding, moving from spam to inbox, marking as important',
                    'Negative: deleting without reading, ignoring multiple emails, marking as spam, unsubscribing immediately',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The feedback loop',
                    paragraphs: ['Over time, these interactions strengthen – or weaken – your email reputation. If recipients consistently engage with your emails, mailbox providers become more confident that future messages deserve a place in the inbox. If engagement remains poor, deliverability gradually declines. Every campaign influences the next one.'],
                  },
                ]}
              />

              <ArticleSection
                key="step-monitor-improve"
                id="step-monitor-improve"
                title="9. Step 7: Monitor and Improve Email Deliverability"
                showImage={false}
                intro={[
                  "Email deliverability isn't something you set up once and forget.",
                  "It's an ongoing process that requires regular monitoring and optimization.",
                  'The most successful outbound teams continuously track key performance indicators to ensure their domains remain healthy.',
                  'Some of the most important metrics include:',
                ]}
                infographic={{
                  title: 'Key metrics to monitor',
                  paragraphs: ['Track these to catch issues early.'],
                  bullets: [
                    'Inbox placement rate',
                    'Bounce rate',
                    'Open rate',
                    'Reply rate',
                    'Spam complaint rate',
                    'Sender reputation',
                    'Domain reputation',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Early detection is key',
                    paragraphs: ['Monitoring these metrics helps identify potential issues before they become major deliverability problems. For example, a sudden increase in bounce rates could indicate an outdated contact list, while a decline in inbox placement may signal that your sender reputation is weakening. Addressing these issues early helps protect future campaigns.'],
                  },
                ]}
              />

              <ArticleSection
                key="best-practices"
                id="best-practices"
                title="10. Email Deliverability Best Practices"
                showImage={true}
                intro={[
                  'Understanding how email deliverability works is only the first step.',
                  'Consistently reaching the inbox requires following proven best practices.',
                ]}
                infographic={{
                  title: 'Top best practices',
                  paragraphs: ['Follow these to keep your emails out of spam.'],
                  bullets: [
                    'Authenticate your domain (SPF, DKIM, DMARC)',
                    'Warm up new domains gradually',
                    'Verify email addresses before sending',
                    'Personalize your emails',
                    'Maintain consistent sending patterns',
                    'Monitor your reputation regularly',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="common-mistakes"
                id="common-mistakes"
                title="11. Common Email Deliverability Mistakes"
                showImage={false}
                intro={[
                  'Even experienced sales and marketing teams make mistakes that hurt deliverability.',
                  'The most common include:',
                ]}
                infographic={{
                  title: 'Mistakes to avoid',
                  paragraphs: ['These can quickly damage your sender reputation.'],
                  bullets: [
                    'Sending from a new domain without warming it up',
                    'Skipping SPF, DKIM, and DMARC authentication',
                    'Purchasing outdated email lists',
                    'Ignoring email verification',
                    'Sending large campaigns too quickly',
                    'Failing to monitor bounce rates and spam complaints',
                    'Using generic emails that generate little engagement',
                  ],
                }}
                blocks={[]}
              />

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                  12. Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <MiniInfographic
                    title="Quick answers"
                    paragraphs={['Common questions about email deliverability.']}
                  />
                  <FaqAccordion faqs={FAQ_ITEMS} />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="13. Deliverability Is the Foundation of Every Successful Email Campaign"
                showImage={false}
                intro={[
                  'Every successful email begins long before the recipient reads the subject line.',
                  'It begins with trust.',
                  'Mailbox providers continuously evaluate who you are, how you send emails, and how recipients respond to your messages. Those signals determine whether your emails reach the inbox, disappear into spam, or get blocked entirely.',
                  "Understanding email deliverability isn't just a technical exercise – it's a competitive advantage. Businesses that invest in healthy sender reputation, strong authentication, clean email lists, and consistent sending practices give every campaign a better chance of succeeding.",
                  'When your emails consistently reach the inbox, every other part of your outreach – from personalization to follow-ups – becomes more effective.',
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    'Building high-performing email campaigns requires more than compelling copy. It requires the infrastructure to ensure your emails actually reach your audience. 360Airo combines email warm-up, deliverability monitoring, sender reputation tracking, email verification, AI-powered personalization, and campaign automation into a single platform. Revenue teams can improve inbox placement, protect their domain reputation, and scale outbound campaigns with confidence.',
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