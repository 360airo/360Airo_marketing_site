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
  { id: 'platform-360airo', label: '1. 360Airo', arrow: true },
  { id: 'platform-instantly', label: '2. Instantly', arrow: true },
  { id: 'platform-smartlead', label: '3. Smartlead', arrow: true },
  { id: 'platform-apollo', label: '4. Apollo.io', arrow: true },
  { id: 'platform-lemlist', label: '5. lemlist', arrow: true },
  { id: 'platform-saleshandy', label: '6. Saleshandy', arrow: true },
  { id: 'platform-woodpecker', label: '7. Woodpecker', arrow: true },
  { id: 'platform-snov', label: '8. Snov.io', arrow: true },
  { id: 'platform-reply', label: '9. Reply.io', arrow: true },
  { id: 'platform-mailshake', label: '10. Mailshake', arrow: true },
  { id: 'platform-klenty', label: '11. Klenty', arrow: true },
  { id: 'platform-quickmail', label: '12. QuickMail', arrow: true },
  { id: 'platform-hunter', label: '13. Hunter', arrow: true },
  { id: 'platform-outreach', label: '14. Outreach', arrow: true },
  { id: 'platform-salesloft', label: '15. Salesloft', arrow: true },
  { id: 'how-to-choose', label: '16. How to Choose the Best Cold Email Software', arrow: true },
  { id: 'which-is-right', label: '17. Which Cold Email Software Is Right for You?', arrow: true },
  { id: 'final-thoughts', label: '18. Final Thoughts', arrow: true },
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
    alt: 'Cold email software platforms',
    label: 'Listicles',
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

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        {/* Removed the broken Image wrapper here */}
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mb-3 md:mb-4">
          Cold Email
          <br />
          Software Guide
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Compare the top 15 cold email platforms to find the best fit for your B2B sales team.
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
          Define your priority
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Choose a platform that solves your biggest bottleneck – whether it's prospecting, deliverability, personalization, or multichannel execution.
        </p>
      </div>
    </aside>
  );
}

// --- Demo CTA Component ---
function DemoCTA() {
  return (
    <div className="mt-8 rounded-[24px] bg-gradient-to-r from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] p-6 md:p-10 shadow-xl overflow-hidden relative text-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/10"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-white text-base md:text-lg leading-relaxed mb-6">
          Ready to move beyond basic cold email? 360Airo combines AI personalization, automated workflows, email infrastructure, and multichannel engagement in one platform.
        </p>
        <Link href="/demo">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl bg-white text-[#0b5ca8] font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Book a Demo
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default function BlogColdEmailSoftwarePage() {
  const [activeId, setActiveId] = useState('introduction');
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

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
          setActiveId(currentSectionId);
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

  const featuredImageUrl = 'https://360airo.com/og-images/best-cold-email-software.jpg';

  return (
    <>
      <Head>
        <title>15 Best Cold Email Software Platforms for B2B Sales in 2026</title>
        <meta
          name="description"
          content="Compare the 15 best cold email software platforms for B2B sales in 2026 – from 360Airo and Instantly to Apollo, lemlist, Reply.io, and more. Find the right tool for your team."
        />
        <meta
          name="keywords"
          content="cold email software, best cold email platforms, B2B sales, 360Airo, Instantly, Apollo.io, lemlist, Reply.io, sales engagement"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="15 Best Cold Email Software Platforms for B2B Sales in 2026"
        />
        <meta
          property="og:description"
          content="Compare the 15 best cold email software platforms for B2B sales in 2026 – from 360Airo and Instantly to Apollo, lemlist, Reply.io, and more. Find the right tool for your team."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="15 Best Cold Email Software Platforms for B2B Sales in 2026"
        />
        <meta
          name="twitter:description"
          content="Compare the 15 best cold email software platforms for B2B sales in 2026 – from 360Airo and Instantly to Apollo, lemlist, Reply.io, and more. Find the right tool for your team."
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
                  '@id': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales/#webpage',
                  'url': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales',
                  'name': '15 Best Cold Email Software Platforms for B2B Sales in 2026',
                  'description': 'Compare the 15 best cold email software platforms for B2B sales in 2026 – from 360Airo and Instantly to Apollo, lemlist, Reply.io, and more. Find the right tool for your team.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales/#article',
                  'headline': '15 Best Cold Email Software Platforms for B2B Sales in 2026',
                  'description': 'Compare the 15 best cold email software platforms for B2B sales in 2026 – from 360Airo and Instantly to Apollo, lemlist, Reply.io, and more. Find the right tool for your team.',
                  'url': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales',
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
                    '@id': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'cold email software',
                    'best cold email platforms',
                    'B2B sales',
                    '360Airo',
                    'Instantly',
                    'Apollo.io',
                    'lemlist',
                    'Reply.io',
                    'sales engagement',
                  ],
                  'datePublished': '2026-11-04',
                  'dateModified': '2026-11-04',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales/#breadcrumb',
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
                      'name': 'Cold Email Software Platforms',
                      'item': 'https://360airo.com/blogs/best-cold-email-software-platforms-b2b-sales',
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
                  <span className="hidden sm:inline">15 Best Cold Email Software Platforms for B2B Sales in 2026</span>
                  <span className="sm:hidden">Cold Email Software</span>
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
                      alt="Cold email software platforms"
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
                    Listicles
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    15 Best Cold Email Software Platforms for B2B Sales in 2026
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Cold email is still one of the most effective ways to start B2B conversations – but the right software makes all the difference. Compare 15 of the best platforms, from AI-powered outbound to high-volume sending and enterprise sales engagement.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 16 min read</span>
                    <span>• 3.2K reads</span>
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
                    "Cold email is still one of the most effective ways for B2B sales teams to start conversations with potential customers. But as inboxes become increasingly crowded, sending thousands of emails from a basic mail client is no longer enough.",
                    "Modern cold email software helps sales teams automate outreach, personalize messages, manage follow-ups, protect sender reputation, and understand what's driving replies. The best platforms go further by combining prospecting, AI personalization, multichannel outreach, and sales automation in a single workflow.",
                    "But every platform takes a different approach. Some are built for high-volume cold email, while others focus on deliverability, prospecting, personalization, or enterprise sales engagement.",
                    "In this guide, we'll compare 15 of the best cold email software platforms for B2B sales in 2026 and explain what each tool does best.",
                  ]}
                  infographic={{
                    title: 'What to look for',
                    paragraphs: ['Modern cold email software goes beyond sending – it helps with targeting, personalization, deliverability, and analytics.'],
                    bullets: [
                      'Prospecting and data enrichment',
                      'AI‑powered personalization',
                      'Multichannel engagement',
                      'Deliverability infrastructure',
                      'Campaign automation and analytics',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Platform 1 - 360Airo */}
                <ArticleSection
                  key="platform-360airo"
                  id="platform-360airo"
                  title="1. 360Airo"
                  showImage={true}
                  intro={[
                    "360Airo is an AI-powered outbound platform designed for B2B teams that want to combine personalized outreach with automation and multichannel engagement.",
                    "Instead of relying entirely on generic templates, 360Airo can use prospect and company information to create personalized messaging. Its platform brings together AI SDR workflows, email campaigns, LinkedIn outreach, SMS, prospect enrichment, inbox warm-up, and campaign analytics.",
                    "The platform also supports multi-domain inbox rotation and automated warm-up, helping teams build an outbound infrastructure rather than simply sending emails from a single inbox.",
                    "Best for: B2B sales teams looking for AI-powered personalization and multichannel outbound automation.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['AI personalization, multichannel outreach, and outbound infrastructure.'],
                    bullets: [
                      'AI-powered email personalization',
                      'AI SDR workflows',
                      'Email, LinkedIn, and SMS sequences',
                      'Automated inbox warm-up',
                      'Multi-domain inbox rotation',
                      'Prospect enrichment and verification',
                      'Reply and campaign analytics',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Why consider it',
                      paragraphs: [
                        '360Airo is particularly useful for teams that don\'t want to manage separate tools for personalization, sequencing, deliverability, and multichannel outreach.',
                      ],
                    },
                  ]}
                />

                {/* Platform 2 - Instantly */}
                <ArticleSection
                  key="platform-instantly"
                  id="platform-instantly"
                  title="2. Instantly"
                  showImage={false}
                  intro={[
                    "Instantly is one of the most recognizable names in cold email software, particularly among agencies, founders, and businesses focused on scaling outbound email.",
                    "Its core strength is sending infrastructure. Users can connect multiple sending accounts, manage campaigns, automate follow-ups, and monitor campaign performance from a centralized platform.",
                    "Instantly is a strong option for teams that already have prospect data and primarily need a platform to manage high-volume outreach.",
                    "Best for: Scaling cold email campaigns.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['High‑volume sending, warm‑up, and campaign management.'],
                    bullets: [
                      'Multiple sending accounts',
                      'Email warm-up',
                      'Automated sequences',
                      'Inbox management',
                      'Campaign analytics',
                      'Lead database and prospecting features',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Easy to scale, strong sending infrastructure, relatively straightforward campaign management.',
                        '⚠️ Teams looking for sophisticated AI personalization or broader multichannel workflows may need additional tools.',
                      ],
                    },
                  ]}
                />

                {/* Platform 3 - Smartlead */}
                <ArticleSection
                  key="platform-smartlead"
                  id="platform-smartlead"
                  title="3. Smartlead"
                  showImage={false}
                  intro={[
                    "Smartlead focuses heavily on cold email infrastructure and deliverability.",
                    "The platform is designed to help agencies and sales teams manage multiple mailboxes, automate sequences, rotate sending accounts, and handle replies from a centralized inbox.",
                    "Its emphasis on scaling email infrastructure makes it particularly popular among users managing large outbound operations.",
                    "Best for: Agencies and high-volume outbound teams.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multiple mailboxes, warm‑up, inbox rotation, and API.'],
                    bullets: [
                      'Multiple mailboxes',
                      'Automated warm-up',
                      'Inbox rotation',
                      'Master inbox',
                      'Automated sequences',
                      'Deliverability monitoring',
                      'API capabilities',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Strong infrastructure for scaling outbound.',
                        '⚠️ Its extensive functionality can make the platform feel more complex for beginners.',
                      ],
                    },
                  ]}
                />

                {/* Platform 4 - Apollo.io */}
                <ArticleSection
                  key="platform-apollo"
                  id="platform-apollo"
                  title="4. Apollo.io"
                  showImage={false}
                  intro={[
                    "Apollo takes a different approach by combining a B2B prospect database with sales engagement.",
                    "Instead of finding prospects in one tool and exporting them into another platform for outreach, users can search for contacts, filter them based on different criteria, and add them directly to outbound sequences.",
                    "This makes Apollo particularly useful for teams that want prospecting and cold email in one workflow.",
                    "Best for: B2B teams that need both lead data and outreach automation.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['B2B database, search, email sequences, and CRM integrations.'],
                    bullets: [
                      'B2B contact database',
                      'Company search',
                      'Email sequences',
                      'Prospect filters',
                      'CRM integrations',
                      'Sales intelligence',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Combines prospect discovery and outreach.',
                        '⚠️ Teams that already have high-quality prospect data may not need its database-heavy approach.',
                      ],
                    },
                  ]}
                />

                {/* Platform 5 - lemlist */}
                <ArticleSection
                  key="platform-lemlist"
                  id="platform-lemlist"
                  title="5. lemlist"
                  showImage={false}
                  intro={[
                    "lemlist focuses on personalized outbound campaigns and multichannel sales engagement.",
                    "The platform is known for helping users create more personalized cold emails rather than relying exclusively on standard templates. It also provides features for deliverability and multichannel outreach.",
                    "For sales teams where personalization is central to their strategy, lemlist can be a strong option.",
                    "Best for: Personalized multichannel outreach.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Personalization, multichannel, AI messaging, and deliverability.'],
                    bullets: [
                      'Email personalization',
                      'Multichannel sequences',
                      'AI-assisted messaging',
                      'Deliverability tools',
                      'Campaign automation',
                      'Sales engagement workflows',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Strong personalization capabilities.',
                        '⚠️ Can be more feature-heavy than necessary for teams looking only for basic cold email sending.',
                      ],
                    },
                  ]}
                />

                {/* Platform 6 - Saleshandy */}
                <ArticleSection
                  key="platform-saleshandy"
                  id="platform-saleshandy"
                  title="6. Saleshandy"
                  showImage={false}
                  intro={[
                    "Saleshandy is a sales engagement platform focused on making cold email accessible to businesses of different sizes.",
                    "It provides email sequences, automated follow-ups, email tracking, mailbox management, and outreach analytics.",
                    "Its relatively straightforward workflow makes it suitable for small teams and businesses beginning to build a structured outbound process.",
                    "Saleshandy is also frequently included in current 2026 cold-email comparisons alongside Apollo, Instantly, Smartlead, Woodpecker, Snov.io, Klenty, Reply.io, and Mailshake.",
                    "Best for: Small and growing teams starting with cold email.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Sequences, tracking, mailboxes, and analytics.'],
                    bullets: [
                      'Email sequences',
                      'Automated follow-ups',
                      'Email tracking',
                      'Multiple mailboxes',
                      'Campaign analytics',
                      'Unified inbox',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Beginner-friendly and practical.',
                        '⚠️ Advanced sales teams may eventually need more sophisticated workflows.',
                      ],
                    },
                  ]}
                />

                {/* Platform 7 - Woodpecker */}
                <ArticleSection
                  key="platform-woodpecker"
                  id="platform-woodpecker"
                  title="7. Woodpecker"
                  showImage={false}
                  intro={[
                    "Woodpecker is a cold email and sales automation platform designed around personalized campaigns and automated follow-ups.",
                    "One of its strengths is campaign logic. Teams can create sequences that adapt based on prospect behavior instead of sending exactly the same series of emails to everyone.",
                    "It also provides features focused on deliverability and email verification.",
                    "Best for: Small and mid-sized teams that want controlled, personalized campaigns.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Conditional sequences, verification, and deliverability.'],
                    bullets: [
                      'Automated sequences',
                      'Conditional campaigns',
                      'Email verification',
                      'Deliverability monitoring',
                      'Follow-up automation',
                      'Campaign analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Flexible campaign workflows.',
                        '⚠️ Less suitable for businesses looking for a large built-in prospect database.',
                      ],
                    },
                  ]}
                />

                {/* Platform 8 - Snov.io */}
                <ArticleSection
                  key="platform-snov"
                  id="platform-snov"
                  title="8. Snov.io"
                  showImage={false}
                  intro={[
                    "Snov.io combines lead generation, email finding, verification, and outreach automation.",
                    "This makes it useful for teams that want to discover prospects and manage their outreach without constantly switching between different platforms.",
                    "Users can build prospect lists, verify addresses, and enroll contacts into automated email sequences.",
                    "Best for: Prospecting and outreach in one platform.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email finder, verifier, database, and sequences.'],
                    bullets: [
                      'Email finder',
                      'Email verifier',
                      'Prospect database',
                      'Email sequences',
                      'CRM capabilities',
                      'Campaign tracking',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Covers several stages of the prospecting process.',
                        '⚠️ Teams with existing lead-generation tools may not need all of its features.',
                      ],
                    },
                  ]}
                />

                {/* Platform 9 - Reply.io */}
                <ArticleSection
                  key="platform-reply"
                  id="platform-reply"
                  title="9. Reply.io"
                  showImage={false}
                  intro={[
                    "Reply.io is a sales engagement platform built around multichannel outreach.",
                    "While email is a core part of the platform, sales teams can also incorporate LinkedIn, calls, and other tasks into their sequences.",
                    "This makes Reply.io useful for organizations that want to coordinate multiple touchpoints instead of relying exclusively on cold email.",
                    "Best for: SDR teams running structured multichannel sequences.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Multichannel sequences, AI messaging, CRM integrations.'],
                    bullets: [
                      'Email sequences',
                      'LinkedIn automation',
                      'AI-assisted messaging',
                      'Multichannel workflows',
                      'CRM integrations',
                      'Sales analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Strong multichannel capabilities.',
                        '⚠️ Smaller teams may find the broader feature set unnecessary.',
                      ],
                    },
                  ]}
                />

                {/* Platform 10 - Mailshake */}
                <ArticleSection
                  key="platform-mailshake"
                  id="platform-mailshake"
                  title="10. Mailshake"
                  showImage={false}
                  intro={[
                    "Mailshake is designed to simplify cold outreach for sales and marketing teams.",
                    "The platform provides email automation, personalization, follow-ups, and sales engagement features while keeping campaign management relatively straightforward.",
                    "It is particularly useful for teams that want a dedicated outreach platform without an overly complicated setup.",
                    "Best for: Small and mid-sized B2B sales teams.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Automation, personalization, A/B testing, and lead management.'],
                    bullets: [
                      'Cold email campaigns',
                      'Automated follow-ups',
                      'Personalization',
                      'A/B testing',
                      'Lead management',
                      'Multichannel outreach',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Simple and approachable.',
                        '⚠️ Advanced teams may require more sophisticated automation.',
                      ],
                    },
                  ]}
                />

                {/* Platform 11 - Klenty */}
                <ArticleSection
                  key="platform-klenty"
                  id="platform-klenty"
                  title="11. Klenty"
                  showImage={false}
                  intro={[
                    "Klenty is a sales engagement platform that supports email, LinkedIn, phone, and other sales activities.",
                    "It focuses on helping sales development teams create repeatable outbound processes and automate repetitive prospecting tasks.",
                    "Its multichannel capabilities make it a good fit for SDR teams that want to coordinate different outreach channels from one platform.",
                    "Best for: Sales development teams using multichannel prospecting.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email, LinkedIn, calling, and personalization.'],
                    bullets: [
                      'Email sequences',
                      'LinkedIn outreach',
                      'Calling workflows',
                      'Personalization',
                      'CRM integrations',
                      'Sales analytics',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Supports multiple sales channels.',
                        '⚠️ May be more than needed for email-only outreach.',
                      ],
                    },
                  ]}
                />

                {/* Platform 12 - QuickMail */}
                <ArticleSection
                  key="platform-quickmail"
                  id="platform-quickmail"
                  title="12. QuickMail"
                  showImage={false}
                  intro={[
                    "QuickMail is focused primarily on cold email outreach and deliverability.",
                    "The platform supports automated sequences, multiple sending accounts, inbox rotation, and campaign management.",
                    "It's a particularly relevant option for agencies and businesses that prioritize reliable cold email infrastructure while maintaining control over their campaigns.",
                    "Best for: Agencies and B2B teams focused on email outreach.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Sequences, inbox rotation, warm‑up, and analytics.'],
                    bullets: [
                      'Email sequences',
                      'Inbox rotation',
                      'Automated follow-ups',
                      'Email warm-up',
                      'Campaign analytics',
                      'Multiple sending accounts',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Strong focus on cold email infrastructure.',
                        '⚠️ Doesn\'t provide the same breadth of built-in prospecting capabilities as platforms such as Apollo.',
                      ],
                    },
                  ]}
                />

                {/* Platform 13 - Hunter */}
                <ArticleSection
                  key="platform-hunter"
                  id="platform-hunter"
                  title="13. Hunter"
                  showImage={false}
                  intro={[
                    "Hunter is best known for email discovery and verification, but it also provides tools for cold email outreach.",
                    "Its biggest advantage is that prospecting and email outreach can happen within the same ecosystem.",
                    "Teams can find professional email addresses, verify contacts, and use outreach functionality to contact prospects.",
                    "Best for: Freelancers, founders, and teams that prioritize email discovery.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Email finder, verifier, domain search, and outreach.'],
                    bullets: [
                      'Email finder',
                      'Email verifier',
                      'Domain search',
                      'Cold email campaigns',
                      'Prospect management',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Strong email discovery capabilities.',
                        '⚠️ Outreach functionality is not as extensive as dedicated high-volume sales engagement platforms.',
                      ],
                    },
                  ]}
                />

                {/* Platform 14 - Outreach */}
                <ArticleSection
                  key="platform-outreach"
                  id="platform-outreach"
                  title="14. Outreach"
                  showImage={false}
                  intro={[
                    "Outreach is an enterprise sales engagement platform built for sophisticated sales organizations.",
                    "Rather than focusing exclusively on cold email, it supports broader revenue workflows including sales engagement, forecasting, deal management, and analytics.",
                    "Its advanced functionality makes it better suited to larger organizations with established sales operations than individual founders or small businesses.",
                    "Best for: Enterprise sales teams.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Sales sequences, forecasting, analytics, and CRM integrations.'],
                    bullets: [
                      'Sales sequences',
                      'Email automation',
                      'Sales analytics',
                      'Forecasting',
                      'CRM integrations',
                      'Revenue workflows',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Powerful enterprise capabilities.',
                        '⚠️ More expensive and complex than tools designed specifically for small-scale cold email.',
                      ],
                    },
                  ]}
                />

                {/* Platform 15 - Salesloft */}
                <ArticleSection
                  key="platform-salesloft"
                  id="platform-salesloft"
                  title="15. Salesloft"
                  showImage={false}
                  intro={[
                    "Salesloft is another enterprise-focused revenue engagement platform that combines sales engagement with analytics and workflow automation.",
                    "It allows organizations to create structured outreach processes while giving sales leaders visibility into team performance.",
                    "For larger organizations with multiple SDR and AE teams, the platform provides a broader operational layer than a traditional cold email tool.",
                    "Best for: Enterprise sales organizations with complex sales processes.",
                  ]}
                  infographic={{
                    title: 'Key Features',
                    paragraphs: ['Sales engagement, automation, coaching, and analytics.'],
                    bullets: [
                      'Sales engagement',
                      'Email sequences',
                      'Workflow automation',
                      'Analytics',
                      'Sales coaching',
                      'CRM integrations',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Pros & Cons',
                      paragraphs: [
                        '✅ Comprehensive enterprise sales platform.',
                        '⚠️ Its extensive capabilities can be unnecessary for smaller teams looking specifically for cold email software.',
                      ],
                    },
                  ]}
                />

                {/* How to Choose */}
                <ArticleSection
                  key="how-to-choose"
                  id="how-to-choose"
                  title="16. How to Choose the Best Cold Email Software"
                  showImage={false}
                  intro={[
                    "There's no single cold email platform that's ideal for every business. The right choice depends on your sales model, team size, outreach volume, and existing technology stack.",
                    "Before choosing a platform, evaluate these factors:",
                  ]}
                  infographic={{
                    title: 'Key selection criteria',
                    paragraphs: ['Evaluate these dimensions to find the best fit for your team.'],
                    bullets: [
                      'Deliverability – inbox warm‑up, bounce management, mailbox rotation',
                      'Personalization – AI research, dynamic messaging, beyond first‑name',
                      'Automation – sequences, conditional logic, reply‑based actions',
                      'Prospecting – built‑in lead database or integrations',
                      'Multichannel – LinkedIn, SMS, calls, and email in one platform',
                      'Analytics – delivery, bounce, reply, meeting metrics',
                      'Scalability – supports growth in users, inboxes, and markets',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Which Is Right */}
                <ArticleSection
                  key="which-is-right"
                  id="which-is-right"
                  title="17. Which Cold Email Software Is Right for You?"
                  showImage={false}
                  intro={[
                    "The best platform ultimately depends on what you're trying to accomplish.",
                    "If high-volume cold email is your priority, Instantly and Smartlead are strong options.",
                    "If you need prospecting and outreach together, Apollo is worth considering.",
                    "For personalized outreach, lemlist and Woodpecker offer useful capabilities.",
                    "For multichannel sales engagement, Reply.io and Klenty are strong choices.",
                    "For enterprise sales organizations, Outreach and Salesloft provide broader revenue engagement functionality.",
                    "And if you want AI-powered personalization combined with email, LinkedIn, SMS, deliverability infrastructure, and outbound automation, 360Airo offers a more comprehensive approach.",
                  ]}
                  infographic={{
                    title: 'Quick recommendations',
                    paragraphs: ['Match your priority to the platform that solves it best.'],
                    bullets: [
                      'High‑volume email → Instantly, Smartlead',
                      'Prospecting + outreach → Apollo.io',
                      'Personalization → lemlist, Woodpecker',
                      'Multichannel → Reply.io, Klenty',
                      'Enterprise → Outreach, Salesloft',
                      'All‑in‑one AI outbound → 360Airo',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Final Thoughts */}
                <ArticleSection
                  key="final-thoughts"
                  id="final-thoughts"
                  title="18. Final Thoughts"
                  showImage={false}
                  intro={[
                    "Cold email software has evolved far beyond simple email scheduling. The best platforms now help sales teams manage the entire outbound process—from finding and enriching prospects to personalizing messages, automating follow-ups, protecting deliverability, and measuring results.",
                    "The right choice depends on your priorities. A founder sending a few hundred targeted emails a month doesn't need the same platform as an agency managing dozens of campaigns or an enterprise running a global SDR organization.",
                    "Before choosing a tool, identify your biggest bottleneck. If it's prospecting, prioritize data. If it's deliverability, look for strong sending infrastructure. If it's personalization, evaluate the quality of AI-generated messaging. And if your team is managing multiple channels, consider an integrated multichannel platform.",
                    "Most importantly, don't choose software based solely on how many features it has. Choose the platform that makes your actual outbound workflow easier, more scalable, and more effective.",
                    "For B2B teams looking to move beyond basic cold email and build a more automated outbound engine, 360Airo combines AI personalization, automated workflows, email infrastructure, and multichannel engagement in one platform.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps B2B sales teams move beyond basic cold email with AI personalization, automated workflows, email infrastructure, and multichannel engagement – all in one platform.',
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
          <section className="px-3 md:px-4 pb-4 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
                <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  {
                    title: '13 Proven Ways to Improve Cold Email Response Rates',
                    tag: 'Listicles',
                    href: '/blogs/improve-cold-email-response-rates',
                    description: 'Discover 13 proven strategies to boost cold email response rates.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '12 Email Authentication Methods Explained: A Complete Guide for Sales Teams',
                    tag: 'Listicles',
                    href: '/blogs/email-authentication-methods-complete-guide',
                    description: 'Learn the 12 essential email authentication methods for B2B sales teams.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '10 Best Clay Alternatives for Outreach Teams in 2026',
                    tag: 'Listicles',
                    href: '/blogs/best-clay-alternatives-outreach',
                    description: 'Compare the top 10 Clay alternatives for outreach teams.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                ].map((post) => (
                  <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} />
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