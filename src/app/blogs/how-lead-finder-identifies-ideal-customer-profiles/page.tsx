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
  { id: 'what-is-lead-finder', label: '1. What Is a Lead Finder?', arrow: true },
  { id: 'what-is-icp', label: '2. What Is an Ideal Customer Profile (ICP)?', arrow: true },
  { id: 'how-lead-finder-identifies-icp', label: '3. How Does Lead Finder Identify Ideal Customer Profiles?', arrow: true },
  { id: 'how-ai-improves-b2b-lead-gen', label: '4. How AI Improves B2B Lead Generation', arrow: true },
  { id: 'best-practices-icp', label: '5. Best Practices for Identifying Your Ideal Customer Profile', arrow: true },
  { id: 'why-teams-choose', label: '6. Why Revenue Teams Choose AI-Powered Lead Finder', arrow: true },
  { id: 'find-better-leads', label: '7. Find Better Leads With AI-Powered ICP Identification', arrow: true },
  { id: 'ready-to-find', label: 'Ready to Find Better-Fit Customers Faster?', arrow: true },
  { id: 'faqs', label: '9. Frequently Asked Questions', arrow: true },
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
    alt: 'Lead finder identifying ideal customer profiles',
    label: 'Lead Finder',
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
          Lead Finder Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Discover how AI‑powered lead finder identifies ICP, enriches prospect data, and accelerates prospecting.
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
          A smaller list of highly qualified ICP matches generates more meetings and higher conversion rates than a massive, unfiltered database.
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
          Discover how 360Airo's AI-powered Lead Finder helps you identify qualified B2B leads, accelerate prospecting, and build a stronger revenue pipeline.
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
    subtitle: 'What is a Lead Finder?',
    paragraphs: ['A Lead Finder is software that helps businesses discover and qualify potential customers based on specific business criteria such as industry, company size, revenue, and location.'],
  },
  {
    subtitle: 'What is the best lead finder?',
    paragraphs: ['The best Lead Finder combines AI‑powered prospecting, lead enrichment, ICP identification, sales intelligence, and CRM integration to help revenue teams identify qualified opportunities more efficiently.'],
  },
  {
    subtitle: 'What is the best way to find leads?',
    paragraphs: ['The most effective approach combines AI‑powered lead generation, firmographic filtering, lead enrichment, and sales intelligence to identify prospects that closely match your Ideal Customer Profile.'],
  },
  {
    subtitle: 'How do I identify my ICP?',
    paragraphs: ['Analyze your highest‑performing customers, identify shared characteristics, evaluate firmographic data, and continuously refine your profile using customer and campaign insights.'],
  },
  {
    subtitle: 'What is an Ideal Customer Profile in sales?',
    paragraphs: ['An Ideal Customer Profile is a detailed description of the type of company most likely to benefit from your solution and become a successful long‑term customer.'],
  },
  {
    subtitle: 'What does ICP stand for?',
    paragraphs: ['ICP stands for Ideal Customer Profile.'],
  },
  {
    subtitle: 'How does a Lead Finder identify Ideal Customer Profiles?',
    paragraphs: ['AI‑powered Lead Finder Software analyzes customer data, firmographic information, lead enrichment, engagement signals, and sales intelligence to identify organizations that closely match your Ideal Customer Profile.'],
  },
  {
    subtitle: 'How do B2B lead generation tools work?',
    paragraphs: ['B2B lead generation tools collect and organize company and contact data, apply filters, enrich prospect information, and help sales teams identify qualified opportunities.'],
  },
  {
    subtitle: 'Can AI help find B2B leads?',
    paragraphs: ['Yes. AI improves B2B lead generation by automating prospect discovery, enriching company profiles, identifying buying signals, and prioritizing leads that best match your ICP.'],
  },
  {
    subtitle: 'What data is used for ICP identification?',
    paragraphs: ['ICP identification typically uses firmographic data, company size, revenue, industry, technology stack, geographic location, customer behavior, engagement history, and sales intelligence.'],
  },
];

// --- Hoisted static recent posts data ---
const RECENT_POSTS = [
  {
    title: 'Competitors Offering Similar Unlimited Inbox Pricing Models',
    tag: 'Pricing',
    href: '/blogs/competitors-offering-unlimited-inbox-pricing',
    description: 'Compare unlimited inbox pricing vs per-user, contact, and send‑based models.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'Why 360Airo Is the Best Outbound Email Campaign Platform',
    tag: 'Outbound',
    href: '/blogs/why-360airo-is-best-outbound-email-platform',
    description: 'Discover why 360Airo is the best outbound email campaign platform.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
  },
  {
    title: 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
    tag: 'Deliverability',
    href: '/blogs/what-is-spam-filter-analysis',
    description: 'Learn how spam filter analysis helps you maximize inbox placement.',
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

export default function BlogLeadFinderICPPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/lead-finder-icp.jpg';

  return (
    <>
      <Head>
        <title>How Does the Lead Finder Feature Identify Ideal Customer Profiles?</title>
        <meta
          name="description"
          content="Learn how AI-powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement. Improve B2B lead generation today."
        />
        <meta
          name="keywords"
          content="lead finder, ideal customer profile, ICP identification, B2B lead generation, lead enrichment, sales intelligence, prospect discovery"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How Does the Lead Finder Feature Identify Ideal Customer Profiles?"
        />
        <meta
          property="og:description"
          content="Learn how AI-powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement. Improve B2B lead generation today."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How Does the Lead Finder Feature Identify Ideal Customer Profiles?"
        />
        <meta
          name="twitter:description"
          content="Learn how AI-powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement."
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
                  '@id': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles/#webpage',
                  'url': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles',
                  'name': 'How Does the Lead Finder Feature Identify Ideal Customer Profiles?',
                  'description': 'Learn how AI-powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement. Improve B2B lead generation today.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles/#article',
                  'headline': 'How Does the Lead Finder Feature Identify Ideal Customer Profiles?',
                  'description': 'Learn how AI-powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement.',
                  'url': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles',
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
                    '@id': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles/#webpage',
                  },
                  'articleSection': 'Lead Generation',
                  'keywords': [
                    'lead finder',
                    'ideal customer profile',
                    'ICP identification',
                    'B2B lead generation',
                    'lead enrichment',
                    'sales intelligence',
                    'prospect discovery',
                  ],
                  'datePublished': '2026-10-15',
                  'dateModified': '2026-10-15',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles/#breadcrumb',
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
                      'name': 'Lead Finder & ICP Identification',
                      'item': 'https://360airo.com/blogs/how-lead-finder-identifies-ideal-customer-profiles',
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
              padding: 10px 16px;
              border: none;
              border-bottom: 1px solid #ebf0f8;
              font-size: 14px;
              gap: 16px;
              background: transparent;
              border-radius: 0;
            }
            td::before {
              content: attr(data-label);
              font-weight: 600;
              color: #111827;
              flex-shrink: 0;
              min-width: 100px;
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
                <Link href="/blogs?category=lead-generation" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Lead Generation
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">How Does the Lead Finder Feature Identify Ideal Customer Profiles?</span>
                  <span className="sm:hidden">Lead Finder &amp; ICP</span>
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
                      alt="Lead Finder ICP identification hero"
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
                    Lead Generation
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    How Does the Lead Finder Feature Identify Ideal Customer Profiles?
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Finding prospects isn't the difficult part anymore – finding the right prospects is. Learn how AI‑powered Lead Finder identifies Ideal Customer Profiles using firmographic data, sales intelligence, lead enrichment, and continuous ICP refinement.
                  </p>

                  {/* Meta info — broken 360Airo Team image removed */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 9 min read</span>
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
                    "Finding prospects isn't the difficult part anymore.",
                    'Finding the right prospects is.',
                    "Today's sales teams have access to millions of contacts, countless databases, and dozens of B2B lead generation tools. Yet many still struggle to consistently identify companies that are genuinely likely to buy.",
                    "The problem isn't a lack of data.",
                    "It's knowing which data matters.",
                    "That's where a modern Lead Finder changes the process.",
                    'Instead of manually searching databases or relying on broad filters, AI-powered Lead Finder software helps revenue teams identify companies and decision-makers that closely match their Ideal Customer Profile (ICP). By combining sales intelligence, lead enrichment, firmographic data, and buying signals, it helps businesses generate qualified opportunities instead of large volumes of unqualified leads.',
                    "Let's explore how Lead Finder identifies ideal customer profiles and why ICP-driven prospecting is becoming essential for modern B2B sales.",
                  ]}
                  infographic={{
                    title: 'The Lead Finder advantage',
                    paragraphs: ['AI-powered Lead Finder combines data and intelligence to surface prospects that match your ICP.'],
                    bullets: [
                      'Moves beyond basic filters to analyze multiple signals',
                      'Enriches prospect data with firmographic and behavioral insights',
                      'Continuously refines ICP based on real customer data',
                      'Helps teams prioritize quality over quantity',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-lead-finder"
                  id="what-is-lead-finder"
                  title="1. What Is a Lead Finder?"
                  showImage={false}
                  intro={[
                    'A Lead Finder is software that helps sales and marketing teams discover potential customers based on specific business criteria.',
                    'Instead of searching manually across multiple websites, spreadsheets, and databases, a Lead Finder centralizes prospect discovery and surfaces companies that match your sales objectives.',
                    'Modern Lead Finder Software goes beyond providing names and email addresses. It combines sales intelligence, company insights, lead enrichment, and AI to help teams prioritize prospects with the highest likelihood of becoming customers.',
                    'Whether your goal is to find B2B leads, expand into new industries, or build an outbound sales pipeline, Lead Finder simplifies the prospecting process.',
                  ]}
                  infographic={{
                    title: 'What is a Lead Finder?',
                    paragraphs: ['A Lead Finder centralizes prospect discovery and uses AI to prioritize high‑fit companies.'],
                    bullets: [
                      'Discovers prospects based on specific business criteria',
                      'Combines sales intelligence and lead enrichment',
                      'Prioritizes prospects with the highest likelihood to convert',
                      'Simplifies prospecting for B2B sales teams',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why traditional lead generation falls short',
                      paragraphs: [
                        'Traditional prospecting often begins with broad searches. Sales representatives filter companies by industry or location, export long lists of contacts, and manually determine whether each business is a good fit.',
                        "This process is time‑consuming and inconsistent. Many prospects meet basic demographic requirements but still don't align with the organization's buying profile. The result? Sales teams spend more time researching than selling.",
                        'Modern B2B lead generation requires a more intelligent approach.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-is-icp"
                  id="what-is-icp"
                  title="2. What Is an Ideal Customer Profile (ICP)?"
                  showImage={true}
                  intro={[
                    "Before you can identify the right leads, you need to define what 'right' actually means.",
                    'This is where the Ideal Customer Profile (ICP) comes in.',
                    'An Ideal Customer Profile is a detailed description of the type of company most likely to benefit from your solution and become a successful long-term customer.',
                    'Unlike a buyer persona, which focuses on individual decision-makers, an ICP focuses on the organization itself.',
                    'It answers questions such as which industries benefit most from our product, what company size should we target, which regions do our best customers operate in, what technologies do they already use, and what business challenges do they typically face.',
                    'These characteristics become the foundation for ICP Identification.',
                  ]}
                  infographic={{
                    title: 'What is an ICP?',
                    paragraphs: ['ICP stands for Ideal Customer Profile – a detailed description of the type of company most likely to buy and succeed with your solution.'],
                    bullets: [
                      'Focuses on the organization, not just the buyer persona',
                      'Includes industry, company size, geography, technology, and challenges',
                      'Helps target high‑value accounts effectively',
                      'Drives better lead qualification and conversion',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why ICP identification matters',
                      paragraphs: [
                        'Without a clearly defined ICP, outbound sales becomes reactive. Teams often chase companies that appear interesting but have little buying potential.',
                        'Effective ICP Identification helps organizations improve lead qualification, increase sales productivity, reduce prospecting time, improve conversion rates, and build healthier sales pipelines.',
                        'Simply put, better targeting leads to better outcomes.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="how-lead-finder-identifies-icp"
                  id="how-lead-finder-identifies-icp"
                  title="3. How Does Lead Finder Identify Ideal Customer Profiles?"
                  showImage={false}
                  intro={[
                    'The strength of a modern Lead Finder lies in its ability to combine multiple data sources into one intelligent prospecting workflow.',
                    'Rather than relying on a single filter, AI evaluates dozens of signals to determine whether a company aligns with your Ideal Customer Profile.',
                  ]}
                  infographic={{
                    title: 'The ICP identification process',
                    paragraphs: ['Lead Finder uses a multi‑step approach to identify ICP matches.'],
                    bullets: [
                      'Analyze your existing customers – build ICP using real customer data',
                      'Evaluate firmographic data – industry, size, revenue, location, tech stack',
                      'Enrich prospect data – add decision‑maker info, titles, funding, growth signals',
                      'Apply AI‑powered sales intelligence – prioritize based on intent and engagement',
                      'Continuously refine ICP – update based on campaign performance and closed deals',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Analyze your existing customers',
                      paragraphs: ['The first step in ICP Identification is understanding your current customers. AI analyzes your highest‑performing accounts to identify common characteristics such as industry, employee count, revenue, geography, technology stack, and growth stage. Instead of creating assumptions, the platform builds an ICP using real customer data. This creates a stronger foundation for future prospecting.'],
                    },
                    {
                      subtitle: 'Evaluate firmographic data',
                      paragraphs: ['Firmographic data plays a central role in customer profiling. Similar to how demographics describe people, firmographics describe businesses. Lead Finder evaluates information such as industry, company size, annual revenue, headquarters location, number of employees, and business model. These insights help determine whether an organization fits your target market before outreach even begins.'],
                    },
                    {
                      subtitle: 'Enrich prospect data',
                      paragraphs: ["Company names and email addresses rarely provide enough information to prioritize leads effectively. That's why Lead Finder uses lead enrichment to add valuable business intelligence to every prospect. Enriched profiles may include decision‑maker information, job titles, verified contact details, technology usage, funding history, company growth indicators, and social profiles. This additional context helps sales representatives personalize outreach and improve lead qualification."],
                    },
                    {
                      subtitle: 'Apply AI‑powered sales intelligence',
                      paragraphs: ["Not every prospect meeting your ICP deserves immediate attention. Some organizations may actively be evaluating solutions, while others aren't currently in a buying cycle. AI‑powered sales intelligence helps prioritize prospects by analyzing intent signals, engagement data, and business activity. Instead of generating long lists of contacts, Lead Finder surfaces organizations that are more likely to engage with your outreach. This allows sales teams to spend less time searching for leads and more time building relationships with qualified buyers."],
                    },
                    {
                      subtitle: 'Continuously refine the Ideal Customer Profile',
                      paragraphs: ["An ICP shouldn't remain static. Markets evolve. Customer needs change. New industries emerge. Modern Lead Finder Software continuously learns from campaign performance, closed deals, and customer engagement to refine the Ideal Customer Profile over time. As new patterns emerge, AI updates prospect recommendations automatically, helping sales teams stay aligned with changing market conditions instead of relying on outdated targeting assumptions."],
                    },
                  ]}
                />

                <ArticleSection
                  key="how-ai-improves-b2b-lead-gen"
                  id="how-ai-improves-b2b-lead-gen"
                  title="4. How AI Improves B2B Lead Generation"
                  showImage={true}
                  intro={[
                    'Traditional lead generation relies heavily on manual research.',
                    'Sales representatives spend hours searching databases, verifying contact information, enriching company profiles, and determining whether prospects fit their Ideal Customer Profile.',
                    'AI changes that process.',
                    'Instead of manually evaluating thousands of companies, AI analyzes firmographic data, engagement signals, historical customer information, and buying patterns to identify prospects that closely match your ICP.',
                    'The result is faster prospecting, better lead quality, and more efficient sales teams.',
                  ]}
                  infographic={{
                    title: 'AI‑powered lead generation',
                    paragraphs: ['AI automates research, enrichment, and qualification – so sales teams can focus on selling.'],
                    bullets: [
                      'Find Qualified Leads Faster – search large databases against your ICP automatically',
                      'Improve Lead Qualification – prioritize based on size, industry, revenue, and engagement',
                      'Support Account‑Based Marketing – identify high‑value accounts that match your best customers',
                      'Build a Smarter Prospect Database – continuously enrich and update contact records',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="best-practices-icp"
                  id="best-practices-icp"
                  title="5. Best Practices for Identifying Your Ideal Customer Profile"
                  showImage={false}
                  intro={[
                    'Technology provides the foundation for smarter prospecting, but defining a strong ICP requires thoughtful planning.',
                    'Here are several best practices that help organizations improve ICP Identification.',
                  ]}
                  infographic={{
                    title: 'ICP best practices',
                    paragraphs: ['A well‑defined ICP combines data, analysis, and continuous refinement.'],
                    bullets: [
                      "Analyze Your Best Customers – identify patterns across revenue, retention, and expansion",
                      "Combine Firmographic and Behavioral Data – understand who a company is and what they're doing",
                      'Continuously Update Your ICP – markets change, so should your profile',
                      'Prioritize Quality Over Quantity – a smaller list of highly qualified leads generates better results',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-teams-choose"
                  id="why-teams-choose"
                  title="6. Why Revenue Teams Choose AI-Powered Lead Finder"
                  showImage={false}
                  intro={[
                    'Revenue teams face increasing pressure to generate more pipeline with fewer resources.',
                    "Manual prospecting simply doesn't scale.",
                    'AI-powered Lead Finder Software helps solve this challenge by combining prospect discovery, lead enrichment, ICP identification, and sales intelligence into one workflow.',
                    'Instead of switching between multiple tools, sales teams gain a single platform that helps them find B2B leads faster, improve lead qualification, enrich customer profiles automatically, build stronger prospect databases, support Account‑Based Marketing initiatives, and generate more personalized outreach.',
                    'By reducing administrative work and improving lead quality, AI enables sales representatives to spend more time building relationships and closing opportunities.',
                    'The result is a more efficient outbound sales process and a healthier revenue pipeline.',
                  ]}
                  infographic={{
                    title: 'Why teams choose AI Lead Finder',
                    paragraphs: ['One platform for discovery, enrichment, qualification, and personalization.'],
                    bullets: [
                      'Faster B2B lead discovery',
                      'Better lead qualification',
                      'Automated data enrichment',
                      'Stronger prospect databases',
                      'Support for ABM initiatives',
                      'More personalized outreach',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="find-better-leads"
                  id="find-better-leads"
                  title="7. Find Better Leads With AI-Powered ICP Identification"
                  showImage={false}
                  intro={[
                    'The success of outbound sales depends on targeting the right companies—not just finding more companies.',
                    'A modern Lead Finder helps revenue teams move beyond manual prospecting by combining AI, sales intelligence, lead enrichment, and continuous ICP identification into one intelligent workflow.',
                    'Instead of relying on static lead lists, organizations can identify businesses that closely resemble their highest-value customers, prioritize qualified accounts, and personalize outreach with greater confidence.',
                    'As competition for buyer attention continues to increase, organizations that combine AI with data-driven prospecting will be better positioned to generate qualified pipeline, improve sales productivity, and accelerate revenue growth.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      "360Airo's AI‑powered Lead Finder helps revenue teams identify qualified B2B leads, enrich prospect data, and continuously refine ICP – all from one platform.",
                      "Whether you're building your first prospect list or scaling enterprise outbound, 360Airo gives you the intelligence to find better‑fit customers faster.",
                    ],
                  }}
                  blocks={[]}
                />

                {/* Ready to Find Better-Fit Customers Faster? - full content section */}
                <section id="ready-to-find" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Ready to Find Better-Fit Customers Faster?
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The quality of your pipeline depends on the quality of your prospects.</p>
                      <p>
                        Instead of spending valuable time searching through disconnected databases, AI-powered Lead Finder helps revenue teams identify companies that match their Ideal Customer Profile, enrich prospect data, and prioritize opportunities with the highest potential to convert.
                      </p>
                      <p>
                        With intelligent prospect discovery, automated lead enrichment, and continuous ICP identification, 360Airo enables sales teams to spend less time researching and more time building meaningful customer relationships.
                      </p>
                    </div>
                    <MiniInfographic
                      title="Start finding better-fit customers"
                      paragraphs={[
                        "Discover how 360Airo's AI-powered Lead Finder helps you identify qualified B2B leads, accelerate prospecting, and build a stronger revenue pipeline.",
                      ]}
                    />
                  </div>
                </section>

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    9. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about Lead Finder, ICP identification, and B2B lead generation.']}
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