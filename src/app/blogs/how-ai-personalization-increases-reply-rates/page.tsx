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
  { id: 'why-reply-rates-matter', label: '1. Why Reply Rates Matter More Than Open Rates', arrow: true },
  { id: 'why-generic-emails-get-ignored', label: '2. Why Generic Outbound Emails Get Ignored', arrow: true },
  { id: 'buyers-spot-templates', label: '2.1 Buyers Can Spot Templates Instantly', arrow: true, indent: true },
  { id: 'manual-personalization-scaling', label: "2.2 Manual Personalization Doesn't Scale", arrow: true, indent: true },
  { id: 'relevance-drives-responses', label: '2.3 Relevance Drives Responses', arrow: true, indent: true },
  { id: 'inconsistent-messaging', label: '2.4 Inconsistent Messaging Hurts Campaign Performance', arrow: true, indent: true },
  { id: 'how-ai-improves-personalization', label: '3. How AI Improves Outbound Personalization', arrow: true },
  { id: 'research-prospects', label: '3.1 Research Prospects in Seconds', arrow: true, indent: true },
  { id: 'generate-context-aware-messaging', label: '3.2 Generate Context-Aware Messaging', arrow: true, indent: true },
  { id: 'personalize-at-scale', label: '3.3 Personalize at Scale', arrow: true, indent: true },
  { id: 'keep-followups-relevant', label: '3.4 Keep Every Follow-up Relevant', arrow: true, indent: true },
  { id: 'learn-from-campaign-performance', label: '3.5 Learn From Campaign Performance', arrow: true, indent: true },
  { id: 'give-reps-more-time', label: '3.6 Give Sales Reps More Time to Sell', arrow: true, indent: true },
  { id: 'manual-vs-ai-personalization', label: '4. Manual Personalization vs AI Personalization', arrow: true },
  { id: 'faqs', label: '5. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: 'Turn Better Personalization Into Better Conversations', arrow: true },
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
    alt: 'AI personalization for outbound email',
    label: 'AI Personalization',
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
          AI Personalization Reply Rate Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Learn how AI-powered personalization helps you scale relevant, context-aware outreach and generate more conversations.
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
          Relevance drives replies
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Prospects are more likely to engage when outreach reflects their role, company, or recent business activity. AI makes this scalable.
        </p>
      </div>
    </aside>
  );
});

// --- Comparison Table Component ---
const ComparisonTable = memo(function ComparisonTable() {
  return (
    <div className="my-6 md:my-8 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Capability</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827] text-center">Manual</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827] text-center">AI with 360Airo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#f0f2f8]">
            <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]">Research every prospect</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#e53e3e]">✕ Time‑consuming</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#38a169]">✅</td>
          </tr>
          <tr className="border-b border-[#f0f2f8]">
            <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]">Personalized messaging</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#e53e3e]">✕ Limited by time</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#38a169]">✅</td>
          </tr>
          <tr className="border-b border-[#f0f2f8]">
            <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]">Consistent quality</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#e53e3e]">✕ Varies</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#38a169]">✅</td>
          </tr>
          <tr className="border-b border-[#f0f2f8]">
            <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]">Scale outreach</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#e53e3e]">✕ Limited</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#38a169]">✅</td>
          </tr>
          <tr>
            <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]">Optimize campaigns</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#e53e3e]">✕ Manual</td>
            <td className="px-4 py-3 md:px-6 md:py-4 text-center text-[#38a169]">✅</td>
          </tr>
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
          Book a demo today and discover how 360Airo helps you combine AI-powered personalization, automated outreach, and campaign insights to create outbound emails that generate more conversations and more pipeline.
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
    subtitle: 'How does AI personalize outbound emails?',
    paragraphs: ['AI personalizes outbound emails by analyzing prospect data such as role, company, industry, recent activity, and business context to generate relevant, tailored messaging at scale.'],
  },
  {
    subtitle: 'Does AI replace sales reps?',
    paragraphs: ['No. AI is designed to augment sales reps, not replace them. It handles repetitive research and writing tasks, allowing sales professionals to focus on relationship-building, discovery calls, and closing deals.'],
  },
  {
    subtitle: 'What data does AI use for personalization?',
    paragraphs: ['AI typically uses data such as job title, company size, industry, recent funding, hiring activity, LinkedIn activity, and other publicly available business information to generate personalized messaging.'],
  },
  {
    subtitle: 'Can every email be personalized?',
    paragraphs: ['Yes. With AI, every email in a campaign can be personalized based on prospect data. This includes initial outreach, follow-ups, and even LinkedIn connection messages.'],
  },
  {
    subtitle: 'Does AI improve reply rates?',
    paragraphs: ['Yes. Studies show that personalized emails consistently outperform generic ones. AI enables personalization at scale, helping teams achieve higher reply rates without increasing manual effort.'],
  },
  {
    subtitle: 'Can I edit AI-generated emails before sending?',
    paragraphs: ['Absolutely. AI-generated emails are designed to be reviewed and refined by sales reps before sending. The AI provides a strong starting point, and reps can add their personal touch.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
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

export default function BlogHowAIPersonalizationIncreasesReplyRatesPage() {
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
              <Link href="/blogs?category=ai" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                AI
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">How AI Personalization Increases Outbound Email Reply Rates</span>
                <span className="sm:hidden">AI Personalization &amp; Reply Rates</span>
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
                    alt="AI personalization hero"
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
                  AI Sales Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  How AI Personalization Increases Outbound Email Reply Rates
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  Prospects receive dozens of sales emails every day, and most of them sound the same. AI-powered personalization helps revenue teams create relevant, context-aware outreach at scale, making it easier to capture attention, earn replies, and generate more qualified pipeline.
                </p>

                {/* Meta info — broken 360Airo Team image removed */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Sep 2026</span>
                  <span>• 8 min read</span>
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
                  "Personalization doesn't just improve emails. It starts more conversations.",
                  'Prospects receive dozens of sales emails every day, and most of them sound the same.',
                  'AI-powered personalization helps revenue teams create relevant, context-aware outreach at scale, making it easier to capture attention, earn replies, and generate more qualified pipeline.',
                ]}
                infographic={{
                  title: 'The personalization advantage',
                  paragraphs: ['Relevant, context-aware outreach captures attention and drives replies. AI makes it scalable.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="why-reply-rates-matter"
                id="why-reply-rates-matter"
                title="1. Why Reply Rates Matter More Than Open Rates"
                showImage={false}
                intro={[
                  "A high open rate doesn't guarantee a successful campaign. The real measure of outbound success is whether prospects choose to respond.",
                  'Every reply represents an opportunity to start a conversation, book a meeting, or move a deal forward. Improving reply rates requires more than compelling subject lines—it requires emails that feel relevant to the person receiving them.',
                ]}
                infographic={{
                  title: 'Key metrics to track',
                  paragraphs: ['Track these to measure what truly matters.'],
                  bullets: [
                    'Total Reply Rate',
                    'Positive Reply Rate',
                    'Meeting Booking Rate',
                    'Opportunity-to-Win Rate',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="why-generic-emails-get-ignored"
                id="why-generic-emails-get-ignored"
                title="2. Why Generic Outbound Emails Get Ignored"
                showImage={true}
                intro={[
                  'Generic outbound emails consistently underperform for several reasons.',
                ]}
                infographic={{
                  title: 'The problem with generic',
                  paragraphs: ['Buyers can spot templates instantly. Relevance drives responses.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="buyers-spot-templates"
                id="buyers-spot-templates"
                title="2.1 Buyers Can Spot Templates Instantly"
                showImage={false}
                intro={[
                  'Decision-makers receive hundreds of outreach emails every week. Generic introductions and broad value propositions rarely stand out.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="manual-personalization-scaling"
                id="manual-personalization-scaling"
                title="2.2 Manual Personalization Doesn't Scale"
                showImage={false}
                intro={[
                  'Researching every prospect individually takes time, making it difficult for sales teams to maintain quality while increasing outreach volume.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="relevance-drives-responses"
                id="relevance-drives-responses"
                title="2.3 Relevance Drives Responses"
                showImage={false}
                intro={[
                  'Prospects are more likely to engage when outreach reflects their role, company, industry, or recent business activity.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="inconsistent-messaging"
                id="inconsistent-messaging"
                title="2.4 Inconsistent Messaging Hurts Campaign Performance"
                showImage={false}
                intro={[
                  'Without a repeatable personalization process, different reps create different experiences, making campaign results difficult to improve.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="how-ai-improves-personalization"
                id="how-ai-improves-personalization"
                title="3. How AI Improves Outbound Personalization"
                showImage={true}
                intro={[
                  'AI transforms personalization from a manual, time-consuming process into a scalable, data-driven capability.',
                ]}
                infographic={{
                  title: 'AI personalization at a glance',
                  paragraphs: ['AI enables sales teams to personalize at scale while maintaining quality and consistency.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="research-prospects"
                id="research-prospects"
                title="3.1 Research Prospects in Seconds"
                showImage={false}
                intro={[
                  'AI gathers relevant business and professional context, reducing the time spent preparing each email.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="generate-context-aware-messaging"
                id="generate-context-aware-messaging"
                title="3.2 Generate Context-Aware Messaging"
                showImage={false}
                intro={[
                  "Instead of relying on generic templates, AI creates messaging tailored to the prospect's role, company, and priorities.",
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="personalize-at-scale"
                id="personalize-at-scale"
                title="3.3 Personalize at Scale"
                showImage={false}
                intro={[
                  'Sales teams can send hundreds of personalized emails while maintaining consistency across campaigns.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="keep-followups-relevant"
                id="keep-followups-relevant"
                title="3.4 Keep Every Follow-up Relevant"
                showImage={false}
                intro={[
                  'AI adapts messaging throughout the sequence, helping follow-ups feel like a continuation of the conversation rather than repeated reminders.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="learn-from-campaign-performance"
                id="learn-from-campaign-performance"
                title="3.5 Learn From Campaign Performance"
                showImage={false}
                intro={[
                  'Track reply rates, positive responses, meetings booked, and engagement trends to understand which personalization strategies generate the strongest results.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="give-reps-more-time"
                id="give-reps-more-time"
                title="3.6 Give Sales Reps More Time to Sell"
                showImage={false}
                intro={[
                  'By reducing manual research and repetitive writing, AI allows sales teams to spend more time speaking with prospects and less time preparing emails.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="manual-vs-ai-personalization"
                id="manual-vs-ai-personalization"
                title="4. Manual Personalization vs AI Personalization"
                showImage={true}
                intro={[
                  'The contrast between manual and AI-powered personalization is clear across key sales capabilities.',
                ]}
                blocks={[]}
              />

              {/* Comparison Table */}
              <div className="my-4 md:my-6">
                <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-3 md:mb-4">
                  Manual vs AI Personalization
                </h3>
                <ComparisonTable />
              </div>

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                  5. Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <MiniInfographic
                    title="Quick answers"
                    paragraphs={['Common questions about AI personalization for outbound email.']}
                  />
                  <FaqAccordion faqs={FAQ_ITEMS} />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="Turn Better Personalization Into Better Conversations"
                showImage={false}
                intro={[
                  "Reply rates don't improve because you send more emails. They improve because every email gives prospects a better reason to respond.",
                  'With 360Airo, you can combine AI-powered personalization, automated outreach, and campaign insights to create outbound emails that generate more conversations and more pipeline.',
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    '360Airo combines AI-powered personalization, automated outreach, and campaign insights into one platform. Start your free trial or book a personalized demo today.',
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