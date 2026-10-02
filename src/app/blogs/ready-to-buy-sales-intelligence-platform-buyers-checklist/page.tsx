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
  { id: 'start-with-problem', label: 'Start With the Problem, Not the Feature List', arrow: true },
  { id: 'checklist-1', label: '1. Look at the Data Before You Look at the AI', arrow: true },
  { id: 'checklist-2', label: '2. Check How Easy It Is to Find Your Ideal Prospects', arrow: true },
  { id: 'checklist-3', label: '3. Be Skeptical About "AI-Powered"', arrow: true },
  { id: 'checklist-4', label: '4. See What Happens After You Find a Lead', arrow: true },
  { id: 'checklist-5', label: '5. Do Not Ignore Email Deliverability', arrow: true },
  { id: 'checklist-6', label: '6. Check Your CRM and Other Integrations', arrow: true },
  { id: 'checklist-7', label: '7. Test the Product Yourself', arrow: true },
  { id: 'checklist-8', label: '8. Look Beyond the Dashboard', arrow: true },
  { id: 'checklist-9', label: '9. Calculate the Real Price', arrow: true },
  { id: 'checklist-10', label: '10. Ask About Support', arrow: true },
  { id: 'questions-to-ask', label: 'Questions to Ask During the Demo', arrow: true },
  { id: 'how-to-compare', label: 'How to Compare Different Vendors', arrow: true },
  { id: 'where-360airo-fits', label: 'Where Does 360Airo Fit?', arrow: true },
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
    alt: 'Sales intelligence platform buyer checklist',
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
          Buyer's Checklist
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Use this 10-step checklist to evaluate and choose the right sales intelligence platform for your team.
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
          Workflow fit over features
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A platform with fewer features that fits your workflow is better than one with dozens of features your team never uses.
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
          Ready to find the right sales intelligence platform for your team? Use this checklist to evaluate 360Airo and other platforms – and see which one fits your workflow best.
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
    subtitle: 'What should I evaluate before buying a sales intelligence platform?',
    paragraphs: ['Start with data quality, prospecting, AI capabilities, outreach, deliverability, integrations, usability, analytics, support and total cost. Most importantly, make sure the platform addresses a specific problem in your existing sales process.'],
  },
  {
    subtitle: 'How do I compare sales intelligence platforms?',
    paragraphs: ['Use the same criteria for every vendor. A weighted scorecard covering data, prospecting, AI, outreach, integrations, usability and pricing can make the final decision much less subjective.'],
  },
  {
    subtitle: 'Is a sales intelligence platform worth it for a small business?',
    paragraphs: ['It can be, particularly when salespeople are spending a significant amount of time finding prospects, researching accounts or managing repetitive follow-ups. The software needs to save enough time or generate enough additional opportunity to justify its cost.'],
  },
  {
    subtitle: 'What should I ask during a sales intelligence software demo?',
    paragraphs: ['Ask about data sources, data freshness, verification, AI functionality, automation, integrations, deliverability, pricing limits, onboarding and support. Also ask the vendor to demonstrate a real workflow instead of only showing individual features.'],
  },
  {
    subtitle: 'How much does 360Airo cost?',
    paragraphs: ['360Airo offers a free plan and paid plans such as Starter and Pro, with Enterprise pricing available for larger requirements. Pricing varies depending on factors including contacts, users, mailboxes, AI credits and other platform usage.'],
  },
  {
    subtitle: 'Is 360Airo good for SMBs?',
    paragraphs: ['360Airo is designed to support sales teams that want prospect intelligence and outbound execution in the same platform. Its current capabilities include prospecting, enrichment, AI personalization, email and LinkedIn outreach, automation and deliverability features.'],
  },
  {
    subtitle: 'Is a larger sales database always better?',
    paragraphs: ['No. Database size does not guarantee better sales results. Freshness, accuracy, relevance and how easily your team can turn prospect data into actual outreach matter much more.'],
  },
  {
    subtitle: 'Should I request a demo before buying?',
    paragraphs: ['Yes. A demo gives you the chance to test the product against your actual sales process. Ideally, give the vendor a specific use case and ask them to show how they would find, enrich, personalize, contact and manage that prospect from beginning to end.'],
  },
  {
    subtitle: 'What is the biggest mistake companies make when buying sales intelligence software?',
    paragraphs: ['Choosing based on features instead of workflow fit. A platform can have every feature you can think of and still be a poor choice if your team finds it difficult to use or if it does not integrate with the way you already sell.'],
  },
  {
    subtitle: 'What is the most important thing to check before signing up?',
    paragraphs: ['Look at the total cost and the actual workflow. Make sure you know what happens when you increase users, contacts, AI usage or outreach volume. Then test the product with a real sales use case before committing.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'Why 360 Airo Is the Best Sales Intelligence Platform for SMB Growth',
    tag: 'Listicles',
    href: '/blogs/why-360airo-best-sales-intelligence-smb-growth',
    description: 'Discover why 360 Airo is the best sales intelligence platform for SMB growth.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Customer Success Story: How SMBs Increased Their Pipeline with 360 Airo',
    tag: 'Listicles',
    href: '/blogs/customer-success-story-smb-pipeline-growth',
    description: 'Read real customer success stories of SMBs that increased their pipeline with 360 Airo.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'ZoomInfo Alternatives for Small Businesses: 8 Better Options That Deliver More Value in 2026',
    tag: 'Listicles',
    href: '/blogs/zoominfo-alternatives-small-businesses-2026',
    description: 'Compare the top 8 ZoomInfo alternatives for small businesses in 2026.',
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

export default function BlogSalesIntelligenceBuyersChecklistPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/sales-intelligence-buyers-checklist.jpg';

  return (
    <>
      <Head>
        <title>Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist</title>
        <meta
          name="description"
          content="Use this complete sales intelligence platform buyer's checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase."
        />
        <meta
          name="keywords"
          content="sales intelligence platform, buyer checklist, choose sales software, evaluate sales intelligence, 360Airo"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist"
        />
        <meta
          property="og:description"
          content="Use this complete sales intelligence platform buyer's checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist"
        />
        <meta
          name="twitter:description"
          content="Use this complete sales intelligence platform buyer's checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase."
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
                  '@id': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist/#webpage',
                  'url': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist',
                  'name': "Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist",
                  'description': "Use this complete sales intelligence platform buyer's checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase.",
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist/#article',
                  'headline': "Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist",
                  'description': "Use this complete sales intelligence platform buyer's checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase.",
                  'url': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist',
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
                    '@id': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'sales intelligence platform',
                    'buyer checklist',
                    'choose sales software',
                    'evaluate sales intelligence',
                    '360Airo',
                  ],
                  'datePublished': '2026-12-10',
                  'dateModified': '2026-12-10',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist/#breadcrumb',
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
                      'name': "Sales Intelligence Buyer's Checklist",
                      'item': 'https://360airo.com/blogs/ready-to-buy-sales-intelligence-platform-buyers-checklist',
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
                  <span className="hidden sm:inline">Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist</span>
                  <span className="sm:hidden">Buyer's Checklist</span>
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
                      alt="Sales intelligence platform buyer checklist"
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
                    Ready to Buy? Complete Sales Intelligence Platform Buyer's Checklist
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Buying sales software can look deceptively easy. Use this 10-step checklist to evaluate data quality, AI, deliverability, integrations, pricing, and more before making a purchase.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Dec 2026</span>
                    <span>• 14 min read</span>
                    <span>• 1.3K reads</span>
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
                    'Buying sales software can look deceptively easy.',
                    'You find a few platforms, compare their features, check the pricing pages, book a couple of demos, and pick the one that looks like the best deal.',
                    'Except that is usually where things go wrong.',
                    'Most sales intelligence platforms will tell you they can help you find better prospects, enrich contact data, automate outreach, personalize emails, and generate more pipeline. On paper, many of them start looking almost identical.',
                    'The real difference shows up when your sales team actually starts using the product.',
                    'Can your reps find the right prospects quickly? Is the data reliable? Does the AI save time or just give you another text generator? Can you run outreach without constantly moving between five different tools? And, perhaps most importantly, what will the platform actually cost once you start using it seriously?',
                    'If you are evaluating a sales intelligence platform, this is the checklist to take into the buying process.',
                  ]}
                  infographic={{
                    title: 'The buying challenge',
                    paragraphs: ['Most platforms look identical on paper – the real difference shows up when your team uses them.'],
                    bullets: [
                      'Can reps find prospects quickly?',
                      'Is the data reliable?',
                      'Does AI save time?',
                      'Can you run outreach without switching tools?',
                      'What will it actually cost?',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="start-with-problem"
                  id="start-with-problem"
                  title="Start With the Problem, Not the Feature List"
                  showImage={true}
                  intro={[
                    'Before looking at vendors, figure out what you want the software to fix. This sounds obvious, but it is surprisingly easy to skip.',
                    'Maybe your sales reps are spending two hours every day searching for prospects. Maybe you already have a database but half the contact information is outdated. Or perhaps you have plenty of leads but no proper system for following up with them.',
                    'Those are three different problems.',
                    'A useful starting point is to write down the biggest frustrations in your current sales process. For example:',
                  ]}
                  infographic={{
                    title: 'Define the problem first',
                    paragraphs: ["Start with your team's biggest frustrations – not the vendor's feature list."],
                    bullets: [
                      'Finding the right prospects takes too long',
                      'Contact information is incomplete or outdated',
                      'Reps spend too much time researching accounts',
                      'Personalizing outreach takes too much manual work',
                      'Follow-ups are inconsistent',
                      'Email and LinkedIn campaigns live in separate tools',
                      'No clear view of campaign performance',
                      'Paying for too many disconnected sales tools',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Features follow problems',
                      paragraphs: [
                        'Once you know what you are trying to solve, evaluating software becomes much easier. You are no longer asking, "Which platform has the most features?" You are asking, "Which platform fixes our actual problem?"',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="checklist-1"
                  id="checklist-1"
                  title="1. Look at the Data Before You Look at the AI"
                  showImage={false}
                  intro={[
                    'AI gets most of the attention in sales software right now, but none of it matters much if the underlying prospect data is poor. A perfectly written email sent to the wrong person is still a bad sales email.',
                    'During the evaluation, find out where the platform gets its data, how often that data is refreshed, and how email addresses and other contact details are verified.',
                    'Ask: How often is the database updated? How are email addresses verified? Can the platform identify job changes? Can it enrich existing CRM records? Does it provide company-level information? How much information is available for each prospect? What happens when you find incorrect data? Can you see the source or reason behind a prospect\'s information?',
                    "Do not get too distracted by claims such as 'hundreds of millions of contacts.' A smaller database with information you can actually trust can be far more useful than a gigantic database filled with stale records.",
                  ]}
                  infographic={{
                    title: 'Data quality questions',
                    paragraphs: ['AI is only as good as the data it works with. Ask these questions before you buy.'],
                    bullets: [
                      'How often is the database updated?',
                      'How are email addresses verified?',
                      'Can the platform identify job changes?',
                      'Can it enrich existing CRM records?',
                      'Does it provide company-level information?',
                      'What happens when you find incorrect data?',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-2"
                  id="checklist-2"
                  title="2. Check How Easy It Is to Find Your Ideal Prospects"
                  showImage={false}
                  intro={[
                    'A sales intelligence platform should help you narrow down your market, not dump another enormous list of contacts in front of your sales team.',
                    'Think about the filters your team actually needs. Can you search by industry, company size, location, revenue, job title, seniority, technology used, department, company characteristics, and buying or intent signals? More importantly, can you combine those filters without making the process unnecessarily complicated?',
                    "Give the platform a real prospecting exercise during the demo. For example, tell the salesperson: 'We sell X to SaaS companies with 50 to 500 employees. Show me how you would find 100 relevant prospects.' That will tell you much more than a generic product presentation.",
                  ]}
                  infographic={{
                    title: 'Test the prospecting process',
                    paragraphs: ['A platform should help you find the right prospects – not dump another huge list on your team.'],
                    bullets: [
                      'Industry and company size',
                      'Location and revenue',
                      'Job title and seniority',
                      'Technology used',
                      'Department and company characteristics',
                      'Buying or intent signals',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-3"
                  id="checklist-3"
                  title='3. Be Skeptical About "AI-Powered"'
                  showImage={false}
                  intro={[
                    'Almost every sales platform has AI somewhere on its website now. That does not automatically make it useful.',
                    'The better question is: What does the AI actually do? There is a big difference between an AI tool that writes an email and one that can help with the entire workflow around that email.',
                    'Look for capabilities such as prospect research, account research, lead prioritization, personalization, automated sequence creation, follow-up recommendations, workflow automation, reply analysis, and next-step suggestions.',
                    "If the AI saves a rep 30 minutes of research every day, that is meaningful. If it simply generates another generic 'Hope you're doing well' email, it probably is not.",
                    'This is one area where 360Airo is worth looking at closely. Its platform combines prospect intelligence and enrichment with AI personalization, automated workflows and AI SDR capabilities, rather than treating AI as just a copywriting feature.',
                  ]}
                  infographic={{
                    title: 'Evaluate AI practically',
                    paragraphs: ['Look at what AI actually does for your workflow – not just the label.'],
                    bullets: [
                      'Prospect research',
                      'Account research',
                      'Lead prioritization',
                      'Personalization',
                      'Automated sequence creation',
                      'Follow-up recommendations',
                      'Workflow automation',
                      'Reply analysis',
                      'Next-step suggestions',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-4"
                  id="checklist-4"
                  title="4. See What Happens After You Find a Lead"
                  showImage={false}
                  intro={[
                    'This is where many buying decisions become interesting. Finding a prospect is only the first step. Once you have the person, what happens next?',
                    'Ideally, you should be able to move from prospect discovery to enrichment, personalization and outreach without rebuilding the same workflow somewhere else.',
                    'Check whether the platform supports email sequences, automated follow-ups, LinkedIn outreach, multichannel campaigns, personalization, conditional workflows, reply management, campaign tracking, and unified inbox functionality.',
                    'For a small sales team, having these functions connected can make a noticeable difference. You do not want one tool for finding leads, another for enrichment, another for email, another for LinkedIn, and yet another dashboard to figure out what happened.',
                    '360Airo takes a more integrated approach, bringing prospecting, personalization, email and LinkedIn outreach, AI workflows and inbox management into the same platform.',
                  ]}
                  infographic={{
                    title: 'From prospect to outreach',
                    paragraphs: ['The best platforms connect discovery to outreach – not leave you to stitch tools together.'],
                    bullets: [
                      'Email sequences',
                      'Automated follow-ups',
                      'LinkedIn outreach',
                      'Multichannel campaigns',
                      'Personalization',
                      'Conditional workflows',
                      'Reply management',
                      'Campaign tracking',
                      'Unified inbox functionality',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-5"
                  id="checklist-5"
                  title="5. Do Not Ignore Email Deliverability"
                  showImage={false}
                  intro={[
                    'This is one of those things that tends to get ignored until there is a problem. You can have excellent prospect data and great messaging. If your emails keep landing in spam, your campaign is not going anywhere.',
                    'So ask about the infrastructure behind outbound email.',
                    'Look for email warmup, inbox rotation, multiple mailboxes, domain management, sending limits, bounce monitoring, deliverability monitoring, spam protection, and sender reputation controls.',
                    'The important thing here is not simply whether the feature exists. Ask how it works. Ask what happens when you increase sending volume. Ask what controls you have. And ask what the vendor recommends before you launch a large campaign.',
                    '360Airo includes features such as email warmup, inbox rotation and deliverability-related infrastructure as part of its outbound offering.',
                  ]}
                  infographic={{
                    title: 'Deliverability matters',
                    paragraphs: ['Great data and messaging mean nothing if your emails land in spam.'],
                    bullets: [
                      'Email warmup',
                      'Inbox rotation',
                      'Multiple mailboxes',
                      'Domain management',
                      'Sending limits',
                      'Bounce monitoring',
                      'Deliverability monitoring',
                      'Spam protection',
                      'Sender reputation controls',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-6"
                  id="checklist-6"
                  title="6. Check Your CRM and Other Integrations"
                  showImage={false}
                  intro={[
                    'A sales intelligence platform should fit into your existing workflow. If your team already uses a CRM, make sure the integration does more than simply exist on a feature page.',
                    'Find out what information gets synced, whether the sync is one-way or two-way, whether existing CRM contacts can be enriched, whether new prospects can be pushed into the CRM, whether activities are recorded automatically, whether you can export your data, whether there is an API, and whether your sales or RevOps team will need developers to maintain the integration.',
                    'Also, do not choose a platform just because it has 50 integrations. You probably will not use 50. The five or six systems your team relies on every day are the ones that matter.',
                  ]}
                  infographic={{
                    title: 'Integration questions',
                    paragraphs: ['Your platform should fit your workflow – not create more work.'],
                    bullets: [
                      'What information gets synced?',
                      'Is the sync one-way or two-way?',
                      'Can existing CRM contacts be enriched?',
                      'Can new prospects be pushed into the CRM?',
                      'Are activities recorded automatically?',
                      'Can you export your data?',
                      'Is there an API?',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-7"
                  id="checklist-7"
                  title="7. Test the Product Yourself"
                  showImage={false}
                  intro={[
                    'A sales demo can make almost any software look easy. That is why you should test the actual workflow.',
                    'During a trial or demo, try doing something your sales team would genuinely do every week.',
                    'For example: Find a company → find the right decision-maker → enrich the contact → research the account → personalize an email → add the prospect to a sequence → track the response.',
                    'Notice how many clicks it takes. Notice whether you need to leave the platform. Notice whether the information is easy to understand. And notice how much of the process still needs to be done manually. Those little things become very noticeable when a sales rep repeats them 50 or 100 times a week.',
                  ]}
                  infographic={{
                    title: 'Test the real workflow',
                    paragraphs: ['A demo can look easy – test the actual workflow your team will use daily.'],
                    bullets: [
                      'Find a company',
                      'Find the right decision-maker',
                      'Enrich the contact',
                      'Research the account',
                      'Personalize an email',
                      'Add to a sequence',
                      'Track the response',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-8"
                  id="checklist-8"
                  title="8. Look Beyond the Dashboard"
                  showImage={false}
                  intro={[
                    'Every sales platform will show you numbers. The question is whether those numbers help you make decisions.',
                    'At minimum, you should be able to understand how many prospects were contacted, how many emails were delivered, reply rates, positive reply rates, meetings booked, campaign performance, conversion rates, deliverability, and rep or team performance.',
                    'The best reporting is not necessarily the dashboard with the most charts. It is the one that helps answer simple questions: Which campaign is working? Which audience responds best? Which reps need help? Where are prospects dropping out? Are we generating meetings, or are we just sending more emails?',
                    'That last question matters more than most sales teams realise.',
                  ]}
                  infographic={{
                    title: 'Meaningful reporting',
                    paragraphs: ['The best dashboard helps answer simple questions – not just display charts.'],
                    bullets: [
                      'Which campaign is working?',
                      'Which audience responds best?',
                      'Which reps need help?',
                      'Where are prospects dropping out?',
                      'Are we generating meetings or just sending more emails?',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-9"
                  id="checklist-9"
                  title="9. Calculate the Real Price"
                  showImage={false}
                  intro={[
                    'This is where a platform that looks cheap can suddenly become expensive. Do not compare only the number on the pricing page. Work out the cost of actually running your sales process.',
                    'You may need to account for user seats, contact limits, AI credits, verification credits, mailboxes, LinkedIn seats, domains, additional integrations, onboarding, extra usage, and annual commitments.',
                    'The easiest way to compare vendors is to calculate what you will spend over a year based on your expected usage, not the smallest available plan. For example, if your team needs 10,000 contacts today but expects that number to double within six months, use the higher figure when comparing platforms.',
                    '360Airo currently has a free plan, with paid plans including Starter and Pro, while larger requirements can be handled through its Enterprise offering. The exact cost depends on factors such as contacts, users, mailboxes, AI credits and other usage requirements.',
                  ]}
                  infographic={{
                    title: 'Total cost checklist',
                    paragraphs: ["Headline price is just the beginning – calculate what you'll actually spend."],
                    bullets: [
                      'User seats',
                      'Contact limits',
                      'AI credits',
                      'Verification credits',
                      'Mailboxes',
                      'LinkedIn seats',
                      'Domains',
                      'Additional integrations',
                      'Onboarding',
                      'Extra usage',
                      'Annual commitments',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="checklist-10"
                  id="checklist-10"
                  title="10. Ask About Support"
                  showImage={false}
                  intro={[
                    'Software adoption rarely fails because people cannot click a button. It usually fails because nobody knows how to set the system up properly or how to fit it into the team\'s existing process.',
                    'Ask what happens after you buy. Do you get onboarding, training, documentation, campaign support, technical support, a dedicated account manager, or help with migration?',
                    'For a small team without a dedicated RevOps person, this can make a surprisingly big difference.',
                  ]}
                  infographic={{
                    title: 'Support matters',
                    paragraphs: ['Adoption fails without proper support – especially for small teams.'],
                    bullets: [
                      'Onboarding',
                      'Training',
                      'Documentation',
                      'Campaign support',
                      'Technical support',
                      'Dedicated account manager',
                      'Help with migration',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="questions-to-ask"
                  id="questions-to-ask"
                  title="Questions to Ask During the Demo"
                  showImage={false}
                  intro={[
                    'Do not let the demo become a 45-minute feature tour. Take a list of questions with you.',
                    'Where does your data come from? How often is it updated? How do you verify emails? How do you handle inaccurate records? What does the AI automate beyond writing emails? Can you demonstrate it using our actual use case? How much control does the user have over AI-generated actions? Can I run email and LinkedIn campaigns from the same workflow? How flexible are the sequences? Can follow-ups change based on what a prospect does? What will we actually pay at our expected usage? What happens when we cross our contact or credit limits? Are there any additional costs we should know about? Which metrics should we track after implementation? How do similar companies measure success with the platform?',
                  ]}
                  infographic={{
                    title: 'Demo questions',
                    paragraphs: ["Take these questions to your demo – don't let it become a feature tour."],
                    bullets: [
                      'Where does your data come from? How often is it updated?',
                      'How do you verify emails and handle inaccurate records?',
                      'What does the AI automate beyond writing emails?',
                      'Can you demonstrate using our actual use case?',
                      'Can I run email and LinkedIn campaigns from the same workflow?',
                      'What will we actually pay at our expected usage?',
                      'What happens when we cross our contact or credit limits?',
                      'Which metrics should we track after implementation?',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-to-compare"
                  id="how-to-compare"
                  title="How to Compare Different Vendors"
                  showImage={false}
                  intro={[
                    'Once you have finished the demos, resist the temptation to pick the platform you liked the most. Score them.',
                    'A simple decision matrix can help:',
                  ]}
                  infographic={{
                    title: 'Vendor comparison matrix',
                    paragraphs: ['Score each platform against the same criteria to make an objective decision.'],
                    bullets: [
                      'Data quality and freshness – 20%',
                      'Prospecting and intelligence – 15%',
                      'AI and automation – 15%',
                      'Outreach – 15%',
                      'Deliverability – 10%',
                      'Integrations – 10%',
                      'Ease of use – 5%',
                      'Reporting – 5%',
                      'Total cost – 5%',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'How to use the matrix',
                      paragraphs: [
                        'Give each platform a score from 1 to 10. Then multiply the score by the relevant weight. This sounds unnecessarily formal when you are buying software for a small team, but it solves a very common problem: choosing a platform because one feature looked impressive during the demo. A decision matrix forces you to look at the whole product.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="where-360airo-fits"
                  id="where-360airo-fits"
                  title="Where Does 360Airo Fit?"
                  showImage={false}
                  intro={[
                    "There is no universal 'best' sales intelligence platform. The right choice depends heavily on how your team sells.",
                    '360Airo makes the most sense to consider when you want more than a prospect database and would rather have prospecting, intelligence, personalization and outbound execution connected in one place.',
                    'That can be particularly useful for small and mid-sized sales teams that do not want to maintain a large collection of separate sales tools, founders handling their own outbound who can use automation to reduce the amount of manual prospect research and follow-up, agencies running outbound campaigns for different clients who may benefit from having prospecting and campaign workflows under one platform, and growing outbound teams moving from basic cold email toward structured email, LinkedIn and multichannel campaigns who may find the broader workflow useful.',
                    'But that does not mean 360Airo should automatically be your choice. If your company has highly specialised enterprise requirements, an unusually complex RevOps setup, or needs a particular data ecosystem, another platform may fit better. That is exactly why the evaluation process matters.',
                  ]}
                  infographic={{
                    title: 'Where 360Airo fits',
                    paragraphs: ['360Airo is best for teams that want prospecting, intelligence, and execution connected in one place.'],
                    bullets: [
                      'Small and mid-sized sales teams',
                      'Founders handling their own outbound',
                      'Agencies running campaigns for clients',
                      'Growing outbound teams',
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
                    'Choosing sales intelligence software should not be about finding the platform with the longest feature list. It should be about finding the platform that removes the most friction from your sales process without creating a new set of problems.',
                    "Start with your team's actual workflow. Test the data. Try the prospecting process yourself. See how AI behaves in real situations. Run a sample campaign. Check the integrations. Calculate the full cost.",
                    'And then compare the options against the same criteria.',
                    'For SMBs and growing outbound teams that want prospect intelligence, AI personalization, automated outreach and deliverability features in one place, 360Airo deserves a serious place on the shortlist.',
                    'But do not take that conclusion at face value. Use the checklist. Run the numbers. Test the workflow.',
                    'The best sales intelligence platform is the one that makes your sales team better at selling, not the one with the most impressive product page.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo combines prospect intelligence, AI personalization, automated outreach, and deliverability features – all in one platform for growing SMB teams.',
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
                      paragraphs={['Common questions about buying sales intelligence platforms.']}
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