'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  { id: 'what-is-unlimited-inbox-pricing', label: '1. What Is Unlimited Inbox Pricing?', arrow: true },
  { id: 'common-pricing-models', label: '2. Common Email Pricing Models', arrow: true },
  { id: 'platforms-offering', label: '3. Platforms Offering Unlimited Inbox Pricing or Flexible Mailbox Models', arrow: true },
  { id: 'pricing-comparison', label: '4. Unlimited Inbox Pricing vs Traditional Pricing Models', arrow: true },
  { id: 'why-teams-prefer', label: '5. Why Revenue Teams Prefer Unlimited Mailboxes', arrow: true },
  { id: 'how-to-choose', label: '6. How to Choose the Right Pricing Model', arrow: true },
  { id: 'scale-outbound', label: '7. Scale Outbound Sales Without Scaling Software Costs', arrow: true },
  { id: 'faqs', label: '8. Frequently Asked Questions', arrow: true },
];

function MiniInfographic({
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
}

function ContentBlock({
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
}

function SectionImage({ id }: { id: string }) {
  const image = {
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Unlimited inbox pricing comparison',
    label: 'Pricing',
  };
  if (!image) return null;

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({
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
        {showImage && <SectionImage id={id} />}
      </div>
    </section>
  );
}

// --- FAQ Accordion Component ---
function FaqAccordion({ faqs }: { faqs: { subtitle: string; paragraphs: string[] }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Pricing Comparison
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare unlimited inbox pricing vs per-user, contact, and send‑based models – and find the best fit for your team.
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
          Scale without surprises
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Choose a pricing model that grows with your outbound volume – not one that penalizes you for scaling.
        </p>
      </div>
    </aside>
  );
}

// --- Pricing Comparison Table ---
function PricingComparisonTable() {
  const rows = [
    { model: 'Per-user pricing', bestFor: 'Small teams', limitation: 'Costs increase as teams grow' },
    { model: 'Contact-based pricing', bestFor: 'Marketing automation', limitation: 'Large databases increase pricing' },
    { model: 'Send-based pricing', bestFor: 'Occasional campaigns', limitation: 'High-volume outreach becomes expensive' },
    { model: 'Unlimited inbox pricing', bestFor: 'Growing outbound sales teams', limitation: 'Requires choosing the right platform' },
  ];

  return (
    <div className="my-4 overflow-x-auto rounded-[16px] border border-[#dbe3f4] bg-white shadow-sm">
      <table className="w-full text-left text-sm md:text-base">
        <thead>
          <tr className="bg-[#f8f9ff] border-b border-[#dbe3f4]">
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Pricing Model</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Best For</th>
            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-[#111827]">Limitation</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[#f0f2f8] last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4 font-medium text-[#111827]" data-label="Pricing Model">{row.model}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Best For">{row.bestFor}</td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-[#4f5668]" data-label="Limitation">{row.limitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BlogUnlimitedInboxPricingPage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      rafId.current = requestAnimationFrame(() => {
        const offset = 180;
        let currentSectionId = 'introduction';

        for (const item of tocItems) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSectionId = item.id;
          }
        }

        setActiveId((prev) => (prev === currentSectionId ? prev : currentSectionId));
        ticking.current = false;
      });
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

  const featuredImageUrl = 'https://360airo.com/og-images/unlimited-inbox-pricing.jpg';

  return (
    <>
      <Head>
        <title>Competitors Offering Similar Unlimited Inbox Pricing Models</title>
        <meta
          name="description"
          content="Compare unlimited inbox pricing vs per-user, contact, and send-based models. Discover which platforms offer flexible mailbox pricing for outbound sales teams."
        />
        <meta
          name="keywords"
          content="unlimited inbox pricing, email pricing models, per-user pricing, contact-based pricing, send-based pricing, outbound sales platform, 360Airo"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Competitors Offering Similar Unlimited Inbox Pricing Models"
        />
        <meta
          property="og:description"
          content="Compare unlimited inbox pricing vs per-user, contact, and send-based models. Discover which platforms offer flexible mailbox pricing for outbound sales teams."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Competitors Offering Similar Unlimited Inbox Pricing Models"
        />
        <meta
          name="twitter:description"
          content="Compare unlimited inbox pricing vs per-user, contact, and send-based models. Discover which platforms offer flexible mailbox pricing for outbound sales teams."
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
                  '@id': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing/#webpage',
                  'url': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing',
                  'name': 'Competitors Offering Similar Unlimited Inbox Pricing Models',
                  'description': 'Compare unlimited inbox pricing vs per-user, contact, and send-based models. Discover which platforms offer flexible mailbox pricing for outbound sales teams.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing/#article',
                  'headline': 'Competitors Offering Similar Unlimited Inbox Pricing Models',
                  'description': 'Compare unlimited inbox pricing vs per-user, contact, and send-based models. Discover which platforms offer flexible mailbox pricing for outbound sales teams.',
                  'url': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing',
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
                    '@id': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing/#webpage',
                  },
                  'articleSection': 'Pricing',
                  'keywords': [
                    'unlimited inbox pricing',
                    'email pricing models',
                    'per-user pricing',
                    'contact-based pricing',
                    'send-based pricing',
                    'outbound sales platform',
                    '360Airo',
                  ],
                  'datePublished': '2026-10-12',
                  'dateModified': '2026-10-12',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing/#breadcrumb',
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
                      'name': 'Unlimited Inbox Pricing Models',
                      'item': 'https://360airo.com/blogs/competitors-offering-unlimited-inbox-pricing',
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
                <Link href="/blogs?category=pricing" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Pricing
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Competitors Offering Similar Unlimited Inbox Pricing Models</span>
                  <span className="sm:hidden">Unlimited Inbox Pricing</span>
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
                      alt="Unlimited inbox pricing comparison"
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
                  className="max-w-2xl"
                >
                  <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">
                    Pricing Guide
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Competitors Offering Similar Unlimited Inbox Pricing Models
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Choosing an email outreach platform isn't just about features anymore. Compare unlimited inbox pricing against per-user, contact, and send‑based models – and find the best fit for your outbound sales team.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 7 min read</span>
                    <span>• 1.8K reads</span>
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
                        <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
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
                    "Choosing an email outreach platform isn't just about features anymore.",
                    "Pricing has become one of the biggest factors influencing purchasing decisions, especially for growing sales teams that manage multiple campaigns, domains, and sender accounts.",
                    "Many platforms still charge based on users, contacts, or email volume. While these pricing models may work for smaller teams, they can become expensive as outbound operations scale.",
                    "That's why more organizations are evaluating unlimited inbox pricing. Instead of paying for every mailbox, contact, or additional sender, businesses can scale outreach with predictable costs and fewer pricing limitations.",
                    "But which platforms actually offer unlimited inboxes? And is unlimited inbox pricing better than traditional pricing models?",
                    "Let's compare the most common approaches.",
                  ]}
                  infographic={{
                    title: 'The pricing shift',
                    paragraphs: ['More teams are moving toward unlimited inbox pricing to avoid scaling costs.'],
                    bullets: [
                      'Pricing is now a top purchase factor',
                      'Traditional models limit scaling',
                      'Unlimited inboxes offer predictability',
                      'Compare models to choose wisely',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-unlimited-inbox-pricing"
                  id="what-is-unlimited-inbox-pricing"
                  title="1. What Is Unlimited Inbox Pricing?"
                  showImage={false}
                  intro={[
                    "Unlimited inbox pricing is a pricing model that allows businesses to connect multiple email accounts—or even unlimited mailboxes—without paying additional fees for every inbox.",
                    "Rather than charging per mailbox or sender account, the platform allows teams to scale outbound outreach while keeping pricing predictable.",
                    "This approach is becoming increasingly attractive for revenue teams running high-volume outbound campaigns across multiple domains.",
                  ]}
                  infographic={{
                    title: 'What is unlimited inbox pricing?',
                    paragraphs: ['Connect multiple inboxes without per‑mailbox fees – scale outreach with predictable costs.'],
                    bullets: [
                      'No per‑mailbox charges',
                      'Predictable scaling costs',
                      'Ideal for multi‑domain campaigns',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why does it matter?',
                      paragraphs: [
                        'Modern outbound sales rarely relies on a single email account. Revenue teams often use multiple sender domains, dedicated SDR mailboxes, regional email accounts, and department‑specific inboxes. Traditional mailbox pricing models become expensive as these numbers grow. Unlimited inbox pricing removes that limitation.',
                      ],
                    },
                  ]}
                />

                <ArticleSection
                  key="common-pricing-models"
                  id="common-pricing-models"
                  title="2. Common Email Pricing Models"
                  showImage={true}
                  intro={[
                    "Not every sales engagement platform follows the same pricing strategy.",
                    "Understanding different email marketing pricing models makes it easier to compare platforms.",
                  ]}
                  infographic={{
                    title: 'Four common pricing models',
                    paragraphs: ['Each model has pros and cons depending on team size and outbound volume.'],
                    bullets: [
                      'Per‑User Pricing – charged per sales rep; simple but scales poorly',
                      'Contact‑Based Pricing – based on database size; grows with your list',
                      'Send‑Based Pricing – charged per email sent; unpredictable for high volume',
                      'Unlimited Inbox Pricing – no per‑mailbox fees; supports scaling',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Per-User Pricing',
                      paragraphs: ['Many sales engagement platforms charge for each sales representative using the software. While simple, costs increase as teams grow. This model works well for small businesses but can become expensive for larger outbound organizations.'],
                    },
                    {
                      subtitle: 'Contact-Based Pricing',
                      paragraphs: ['Some email marketing pricing plans charge based on the number of contacts stored in your CRM or email database. This model is common in marketing automation platforms. As databases grow, pricing often increases—even if only a small percentage of contacts receive outreach.'],
                    },
                    {
                      subtitle: 'Send-Based Pricing',
                      paragraphs: ['Some providers calculate email outreach pricing based on the number of emails sent each month. This model works for occasional campaigns but becomes difficult to predict during periods of rapid growth. High‑volume outreach can quickly increase monthly costs.'],
                    },
                    {
                      subtitle: 'Unlimited Inbox Pricing',
                      paragraphs: ['Instead of limiting inboxes or charging for every additional sender, unlimited inbox pricing allows organizations to connect multiple mailboxes under a predictable pricing structure. For outbound sales teams managing several domains and campaigns, this model offers greater flexibility and scalability.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="platforms-offering"
                  id="platforms-offering"
                  title="3. Platforms Offering Unlimited Inbox Pricing or Flexible Mailbox Models"
                  showImage={false}
                  intro={[
                    "Different platforms approach pricing in different ways. Some focus on contact‑based billing, while others emphasize users, sends, or mailboxes.",
                  ]}
                  infographic={{
                    title: 'Platform comparisons',
                    paragraphs: ['Each platform has a distinct pricing focus – choose based on your team\'s needs.'],
                    bullets: [
                      '360Airo – designed for modern revenue teams with predictable pricing and unlimited mailbox support',
                      'Brevo – primarily send‑based, suited for marketing campaigns',
                      'Other sales engagement platforms – often charge per user, mailbox, contact, or sending volume',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Pricing Comparison Table Section */}
                <section id="pricing-comparison" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    4. Unlimited Inbox Pricing vs Traditional Pricing Models
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>The biggest difference isn't price alone. It's scalability.</p>
                    </div>

                    <PricingComparisonTable />

                    <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                      <p>For organizations focused on outbound growth, unlimited inbox pricing often provides greater cost predictability.</p>
                    </div>
                  </div>
                </section>

                <ArticleSection
                  key="why-teams-prefer"
                  id="why-teams-prefer"
                  title="5. Why Revenue Teams Prefer Unlimited Mailboxes"
                  showImage={true}
                  intro={[
                    "Outbound sales has evolved. Instead of relying on one company email address, organizations now distribute outreach across multiple mailboxes to protect sender reputation and improve deliverability.",
                  ]}
                  infographic={{
                    title: 'Benefits of unlimited mailboxes',
                    paragraphs: ['Scale outreach while protecting deliverability and simplifying management.'],
                    bullets: [
                      'Better Deliverability – distribute volume naturally across multiple sender accounts',
                      'Easier Team Scaling – add SDRs and campaigns without purchasing new mailbox licenses',
                      'Predictable Costs – budget confidently without per‑mailbox surprises',
                      'Simplified Management – manage all inboxes from a single platform',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="6. How to Choose the Right Pricing Model"
                  showImage={false}
                  intro={[
                    "The lowest monthly price doesn't always deliver the best value.",
                    "Instead, evaluate pricing based on how your team plans to scale.",
                  ]}
                  infographic={{
                    title: 'What to evaluate',
                    paragraphs: ['Consider your team structure, volume, and feature needs – not just the monthly cost.'],
                    bullets: [
                      'Number of SDRs',
                      'Number of mailboxes',
                      'Monthly email volume',
                      'Contact database size',
                      'AI capabilities',
                      'Deliverability monitoring',
                      'Sales automation features',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Think long‑term',
                      paragraphs: ['If your organization expects significant outbound growth, unlimited inbox pricing often provides greater long‑term flexibility than traditional pricing models.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="scale-outbound"
                  id="scale-outbound"
                  title="7. Scale Outbound Sales Without Scaling Software Costs"
                  showImage={false}
                  intro={[
                    "Modern revenue teams need more than email automation. They need pricing that supports growth.",
                    "As outbound sales becomes increasingly personalized and multichannel, businesses require the flexibility to manage multiple inboxes, automate outreach, and expand campaigns without worrying about rising mailbox costs.",
                    "Unlimited inbox pricing offers a more scalable approach by removing many of the limitations associated with per-user, contact-based, and send-based pricing models.",
                    "Combined with AI-powered sales automation, deliverability optimization, and intelligent prospecting, it enables organizations to grow revenue without adding unnecessary complexity to their technology stack.",
                    "The right pricing model isn't simply the cheapest option. It's the one that grows with your business.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo supports unlimited mailbox management, AI‑powered personalization, multichannel outreach, and analytics – all with predictable pricing that scales with your outbound program.',
                      'Whether you\'re a growing startup or an enterprise revenue team, 360Airo gives you the flexibility to expand without worrying about mailbox limits or hidden costs.',
                    ],
                  }}
                  blocks={[]}
                />

                {/* FAQ Section */}
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    8. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about unlimited inbox pricing and email pricing models.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'What is unlimited inbox pricing?',
                          paragraphs: ['Unlimited inbox pricing allows businesses to connect multiple or unlimited mailboxes without paying separately for every inbox.'],
                        },
                        {
                          subtitle: 'Which platforms offer unlimited inboxes?',
                          paragraphs: ['Some AI‑powered outbound sales platforms support unlimited or flexible mailbox models, while many traditional sales engagement platforms continue using user‑based, contact‑based, or send‑based pricing.'],
                        },
                        {
                          subtitle: 'Is unlimited inbox pricing better than per‑user pricing?',
                          paragraphs: ['For growing outbound sales teams managing multiple mailboxes, unlimited inbox pricing often provides better scalability and more predictable costs.'],
                        },
                        {
                          subtitle: 'What is the difference between pay‑per‑email and pay‑per‑contact pricing?',
                          paragraphs: ['Pay‑per‑email (send‑based pricing) charges based on monthly email volume, while contact‑based pricing depends on the size of your contact database.'],
                        },
                        {
                          subtitle: 'What should I look for beyond pricing?',
                          paragraphs: ['Consider AI capabilities, deliverability monitoring, multichannel engagement, CRM integrations, reporting, automation, and scalability – not just the monthly subscription cost.'],
                        },
                      ]}
                    />
                  </div>
                </section>
              </div>

              <RightPromoCards />
            </div>
          </section>

          {/* Recent Posts */}
          <section className="px-3 md:px-4 pb-4 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
                <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  {
                    title: 'Why 360Airo Is the Best Outbound Email Campaign Platform',
                    tag: 'Outbound',
                    href: '/blogs/why-360airo-is-best-outbound-email-platform',
                    description: 'Discover why 360Airo is the best outbound email campaign platform – combining prospect discovery, AI personalization, and analytics.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Why Fortune 100 Companies Choose 360Airo for Outbound B2B Marketing',
                    tag: 'Enterprise',
                    href: '/blogs/why-fortune-100-companies-choose-360airo',
                    description: 'Discover why leading enterprises trust 360Airo for AI‑powered outbound marketing.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'What Is Spam Filter Analysis? How It Works and Why It Matters for Email Deliverability',
                    tag: 'Deliverability',
                    href: '/blogs/what-is-spam-filter-analysis',
                    description: 'Learn how spam filter analysis helps you maximize inbox placement.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                ].map((post) => (
                  <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} loading="lazy" />
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
        </main>
        <Footer />
      </div>
    </>
  );
}