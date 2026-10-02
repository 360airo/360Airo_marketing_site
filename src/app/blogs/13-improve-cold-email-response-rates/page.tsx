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
  { id: 'tip-1', label: '1. Target a Narrower Ideal Customer Profile', arrow: true },
  { id: 'tip-2', label: '2. Personalize the Opening Line', arrow: true },
  { id: 'tip-3', label: '3. Focus on the Prospect\'s Problem', arrow: true },
  { id: 'tip-4', label: '4. Keep Your Emails Short', arrow: true },
  { id: 'tip-5', label: '5. Make Your CTA Easy to Answer', arrow: true },
  { id: 'tip-6', label: '6. Write Conversational Subject Lines', arrow: true },
  { id: 'tip-7', label: '7. Use Social Proof Strategically', arrow: true },
  { id: 'tip-8', label: '8. Build a Thoughtful Follow-Up Sequence', arrow: true },
  { id: 'tip-9', label: '9. Improve Email Deliverability', arrow: true },
  { id: 'tip-10', label: '10. Segment Your Campaigns', arrow: true },
  { id: 'tip-11', label: '11. Test One Variable at a Time', arrow: true },
  { id: 'tip-12', label: '12. Send at the Right Time for Your Audience', arrow: true },
  { id: 'tip-13', label: '13. Automate Personalization Without Losing Relevance', arrow: true },
  { id: 'how-to-measure', label: 'How to Measure Cold Email Response Rates', arrow: true },
  { id: 'final-thoughts', label: 'Final Thoughts', arrow: true },
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
    alt: 'Cold email response rates',
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
          Response Rates
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Apply these 13 proven strategies to turn more cold emails into meaningful conversations.
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
          Test one variable at a time
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Small, disciplined tests compound into significant improvements. Change one element, measure, then iterate.
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
          Scale personalized outreach with AI-powered campaigns that improve response rates and build pipeline – all from one platform.
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

export default function BlogImproveColdEmailResponsePage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/improve-cold-email-response-rates.jpg';

  return (
    <>
      <Head>
        <title>13 Proven Ways to Improve Cold Email Response Rates</title>
        <meta
          name="description"
          content="Discover 13 proven strategies to boost cold email response rates – from targeting and personalization to deliverability and testing. Turn more emails into conversations."
        />
        <meta
          name="keywords"
          content="cold email response rates, improve cold email, email personalization, deliverability, follow-up sequences, cold email best practices"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/improve-cold-email-response-rates"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="13 Proven Ways to Improve Cold Email Response Rates"
        />
        <meta
          property="og:description"
          content="Discover 13 proven strategies to boost cold email response rates – from targeting and personalization to deliverability and testing. Turn more emails into conversations."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/improve-cold-email-response-rates"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="13 Proven Ways to Improve Cold Email Response Rates"
        />
        <meta
          name="twitter:description"
          content="Discover 13 proven strategies to boost cold email response rates – from targeting and personalization to deliverability and testing. Turn more emails into conversations."
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
                  '@id': 'https://360airo.com/blogs/improve-cold-email-response-rates/#webpage',
                  'url': 'https://360airo.com/blogs/improve-cold-email-response-rates',
                  'name': '13 Proven Ways to Improve Cold Email Response Rates',
                  'description': 'Discover 13 proven strategies to boost cold email response rates – from targeting and personalization to deliverability and testing. Turn more emails into conversations.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/improve-cold-email-response-rates/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/improve-cold-email-response-rates/#article',
                  'headline': '13 Proven Ways to Improve Cold Email Response Rates',
                  'description': 'Discover 13 proven strategies to boost cold email response rates – from targeting and personalization to deliverability and testing. Turn more emails into conversations.',
                  'url': 'https://360airo.com/blogs/improve-cold-email-response-rates',
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
                    '@id': 'https://360airo.com/blogs/improve-cold-email-response-rates/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'cold email response rates',
                    'improve cold email',
                    'email personalization',
                    'deliverability',
                    'follow-up sequences',
                    'cold email best practices',
                  ],
                  'datePublished': '2026-11-03',
                  'dateModified': '2026-11-03',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/improve-cold-email-response-rates/#breadcrumb',
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
                      'name': 'Improve Cold Email Response Rates',
                      'item': 'https://360airo.com/blogs/improve-cold-email-response-rates',
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
                  <span className="hidden sm:inline">13 Proven Ways to Improve Cold Email Response Rates</span>
                  <span className="sm:hidden">Improve Response Rates</span>
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
                      alt="Improve cold email response rates hero"
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
                    13 Proven Ways to Improve Cold Email Response Rates
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Getting someone to open your email is only the beginning. Discover 13 proven strategies to turn more cold emails into meaningful conversations – from targeting and personalization to deliverability and testing.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
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
                    "Cold email can put your sales team directly in front of decision-makers, but getting someone to open an email is only the beginning. The real challenge is getting them to respond.",
                    "A high sending volume doesn't necessarily translate into more conversations. If your emails are poorly targeted, too generic, overly promotional, or difficult to respond to, prospects will simply move on.",
                    "Improving cold email response rates requires a combination of precise targeting, relevant personalization, compelling messaging, strong deliverability, and consistent testing. The goal isn't to convince every prospect to buy. It's to give the right prospect a good enough reason to start a conversation.",
                    "Here are 13 proven ways to improve cold email response rates and turn more outbound emails into meaningful sales conversations.",
                  ]}
                  infographic={{
                    title: 'The response rate challenge',
                    paragraphs: ['High volume doesn&apos;t equal high replies – focus on relevance, clarity, and ease of response.'],
                    bullets: [
                      'Target the right people',
                      'Personalize meaningfully',
                      'Keep it concise and clear',
                      'Make it easy to reply',
                      'Test and iterate continuously',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 1 */}
                <ArticleSection
                  key="tip-1"
                  id="tip-1"
                  title="1. Target a Narrower Ideal Customer Profile"
                  showImage={true}
                  intro={[
                    "Better response rates start with better targeting.",
                    "Instead of sending the same campaign to everyone who could potentially use your product, define a specific Ideal Customer Profile (ICP). Consider company size, industry, location, technology stack, job role, seniority, and business challenges.",
                    "A highly targeted list allows you to write more relevant messaging because you understand what your audience is likely to care about.",
                    "For example, a sales automation platform might create separate campaigns for startup founders, Heads of Sales, SDR managers, and revenue leaders. Each group may have different priorities, so the messaging should reflect those differences.",
                    "The more relevant the audience, the easier it is to write an email worth responding to.",
                  ]}
                  infographic={{
                    title: 'Target with precision',
                    paragraphs: ['A narrow ICP = more relevant messaging = higher response rates.'],
                    bullets: [
                      'Define firmographic and behavioral filters',
                      'Segment by role, industry, and company size',
                      'Write separate campaigns for different audiences',
                      'Relevance drives replies',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 2 */}
                <ArticleSection
                  key="tip-2"
                  id="tip-2"
                  title="2. Personalize the Opening Line"
                  showImage={false}
                  intro={[
                    "The opening line is one of the most important parts of a cold email.",
                    "Avoid generic introductions such as: 'Hope you're doing well. I wanted to reach out because...'",
                    "Instead, give the prospect a specific reason for contacting them. You could reference a recent company announcement, a new product launch, a hiring trend, a LinkedIn post, a recent funding round, their website, or an industry-specific challenge.",
                    "For example: 'Saw that your team recently doubled the size of its SDR team. Scaling outbound while keeping personalization consistent can get difficult pretty quickly.'",
                    "This immediately establishes relevance.",
                  ]}
                  infographic={{
                    title: 'Open with relevance',
                    paragraphs: ['A specific, relevant opening shows you did your homework.'],
                    bullets: [
                      'Reference recent company news or activity',
                      'Mention a LinkedIn post or announcement',
                      'Connect to an industry trend or challenge',
                      'Avoid generic openings that could apply to anyone',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 3 */}
                <ArticleSection
                  key="tip-3"
                  id="tip-3"
                  title="3. Focus on the Prospect's Problem"
                  showImage={false}
                  intro={[
                    "Your prospect isn't interested in your product simply because it exists. They care about a problem they need to solve.",
                    "Instead of starting with your company's history, features, or awards, focus on the challenge your prospect is likely experiencing.",
                    "Rather than: '360Airo is an AI-powered sales platform with advanced automation features...'",
                    "Try: 'Scaling personalized outbound usually means either increasing SDR workload or sacrificing personalization.'",
                    "The second approach creates a problem the reader can recognize. Once you've established the problem, introduce your product as a potential solution.",
                  ]}
                  infographic={{
                    title: 'Start with the problem',
                    paragraphs: ['People care about problems they recognize – not features you want to sell.'],
                    bullets: [
                      'Identify a common challenge your ICP faces',
                      'Lead with that challenge, not your company history',
                      'Introduce your solution after establishing the problem',
                      'Make it about solving, not selling',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 4 */}
                <ArticleSection
                  key="tip-4"
                  id="tip-4"
                  title="4. Keep Your Emails Short"
                  showImage={false}
                  intro={[
                    "Your first cold email doesn't need to explain everything about your product.",
                    "A prospect who doesn't know you is unlikely to spend several minutes reading a detailed product pitch.",
                    "Aim for a concise structure: 1) Relevant observation, 2) Problem or opportunity, 3) Brief value proposition, 4) Simple CTA.",
                    "Remove unnecessary paragraphs, technical explanations, and feature lists. If the prospect wants more information, you can provide it after they respond. Shorter emails also make your CTA easier to find and respond to.",
                  ]}
                  infographic={{
                    title: 'Short emails work',
                    paragraphs: ['Busy decision-makers scan – make it easy for them.'],
                    bullets: [
                      'Under 125 words is ideal',
                      '4‑part structure: observation → problem → value → CTA',
                      'Skip feature lists and technical jargon',
                      'Shorter = easier to reply to',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 5 */}
                <ArticleSection
                  key="tip-5"
                  id="tip-5"
                  title="5. Make Your CTA Easy to Answer"
                  showImage={false}
                  intro={[
                    "One of the easiest ways to improve response rates is to reduce the effort required to reply.",
                    "Instead of asking: 'Would you be available for a 30-minute product demonstration next Tuesday at 2 PM?'",
                    "Consider: 'Worth exploring?' or 'Is improving outbound personalization a priority for your team?'",
                    "A low-friction question gives prospects an easy way to respond without immediately committing to a meeting. Once a prospect shows interest, you can move the conversation toward a call.",
                  ]}
                  infographic={{
                    title: 'Low‑friction CTAs win',
                    paragraphs: ['Make it so easy to reply that ignoring takes more effort.'],
                    bullets: [
                      'Ask a simple yes/no question',
                      'Avoid scheduling requests in the first email',
                      'Use questions like "Worth exploring?" or "Priority?"',
                      'Shift to scheduling after they show interest',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 6 */}
                <ArticleSection
                  key="tip-6"
                  id="tip-6"
                  title="6. Write Conversational Subject Lines"
                  showImage={false}
                  intro={[
                    "Your subject line should feel like something a real person would send—not a marketing campaign.",
                    "Avoid excessive capitalization, multiple exclamation marks, clickbait, overly promotional claims, and generic sales language.",
                    "Instead, experiment with short, natural subject lines such as: 'Quick question', 'Outbound at {{Company}}', 'Scaling personalization', 'Your SDR workflow', or 'Question about {{Company}}'.",
                    "The best subject line depends on your audience, so test different approaches rather than assuming one formula will work for every campaign.",
                  ]}
                  infographic={{
                    title: 'Keep subject lines natural',
                    paragraphs: ['Think "professional colleague", not "marketing campaign".'],
                    bullets: [
                      'Use short, conversational phrases',
                      'Avoid ALL CAPS and excessive punctuation',
                      'Test multiple subject lines per campaign',
                      'Personalize with company name or role',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 7 */}
                <ArticleSection
                  key="tip-7"
                  id="tip-7"
                  title="7. Use Social Proof Strategically"
                  showImage={false}
                  intro={[
                    "Prospects are more likely to trust a solution when they can see evidence that it has worked for similar companies.",
                    "But social proof doesn't need to be a long list of logos or awards. Use a short, relevant example.",
                    "For instance: 'We recently helped a B2B SaaS team automate personalized outreach across 5,000+ prospects.'",
                    "The important part is relevance. Choose customer examples that resemble the prospect in terms of industry, company size, or challenge.",
                  ]}
                  infographic={{
                    title: 'Relevant social proof',
                    paragraphs: ['Show that similar companies have succeeded with your solution.'],
                    bullets: [
                      'Use a short, specific customer example',
                      'Match the prospect\'s industry or size',
                      'Focus on outcomes, not logos',
                      'One good example is better than a long list',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 8 */}
                <ArticleSection
                  key="tip-8"
                  id="tip-8"
                  title="8. Build a Thoughtful Follow-Up Sequence"
                  showImage={true}
                  intro={[
                    "A single email rarely tells the whole story. Prospects may be interested but busy, distracted, or simply forget to respond.",
                    "Create a follow-up sequence that gives them multiple opportunities to engage.",
                    "However, don't send the same message repeatedly. Instead, introduce a different angle with each follow-up: Follow‑up 1: Reinforce the original problem, Follow‑up 2: Share a useful insight, Follow‑up 3: Provide social proof, Follow‑up 4: Address another use case, Follow‑up 5: Close the loop politely.",
                    "Each message should have a purpose.",
                  ]}
                  infographic={{
                    title: 'Follow up with purpose',
                    paragraphs: ['Each touch should add value – not repeat the same pitch.'],
                    bullets: [
                      'Follow‑up 1: reinforce the problem',
                      'Follow‑up 2: share an insight or stat',
                      'Follow‑up 3: provide social proof',
                      'Follow‑up 4: introduce another use case',
                      'Follow‑up 5: polite close',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 9 */}
                <ArticleSection
                  key="tip-9"
                  id="tip-9"
                  title="9. Improve Email Deliverability"
                  showImage={false}
                  intro={[
                    "Your response rate can't improve if your emails aren't reaching the inbox.",
                    "Poor sender reputation, high bounce rates, and weak authentication can cause emails to land in spam.",
                    "Before scaling outbound campaigns, make sure your sending infrastructure is healthy. Review SPF, DKIM, DMARC, domain reputation, bounce rates, sending volume, and mailbox health.",
                    "Use verified prospect data and scale sending gradually. Deliverability isn't separate from response rates—it is the foundation for them.",
                  ]}
                  infographic={{
                    title: 'Deliverability is the foundation',
                    paragraphs: ['Your email can\'t get a reply if it never reaches the inbox.'],
                    bullets: [
                      'Authenticate with SPF, DKIM, DMARC',
                      'Maintain healthy domain reputation',
                      'Verify email lists to reduce bounces',
                      'Scale sending volume gradually',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 10 */}
                <ArticleSection
                  key="tip-10"
                  id="tip-10"
                  title="10. Segment Your Campaigns"
                  showImage={false}
                  intro={[
                    "Even a well-defined ICP can contain different audiences. Segment prospects based on characteristics that affect their needs or messaging.",
                    "For example, you could create separate campaigns for SMBs vs. enterprises, founders vs. sales leaders, SaaS vs. agencies, new prospects vs. existing leads, or different geographic markets.",
                    "Then adapt the value proposition accordingly. Segmentation allows you to make each campaign feel more relevant without manually rewriting every email.",
                  ]}
                  infographic={{
                    title: 'Segment for relevance',
                    paragraphs: ['Different audiences have different priorities – speak to each one.'],
                    bullets: [
                      'Segment by company size, role, industry, and geography',
                      'Adapt value propositions to each segment',
                      'Create separate campaigns for each audience',
                      'Relevance improves response rates',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 11 */}
                <ArticleSection
                  key="tip-11"
                  id="tip-11"
                  title="11. Test One Variable at a Time"
                  showImage={false}
                  intro={[
                    "If your campaign isn't generating replies, don't change everything at once.",
                    "Test individual elements so you can understand what actually affects performance.",
                    "You can experiment with subject lines, opening lines, value propositions, CTAs, email length, follow-up timing, and audience segments.",
                    "For example, if Version A and Version B have identical copy but different CTAs, you can determine whether the CTA affects response rates. Over time, these tests help you build a repeatable outbound strategy based on evidence rather than assumptions.",
                  ]}
                  infographic={{
                    title: 'Test deliberately',
                    paragraphs: ['Change one variable at a time to understand what drives replies.'],
                    bullets: [
                      'Subject lines',
                      'Opening lines',
                      'Value propositions',
                      'CTAs',
                      'Email length',
                      'Follow-up timing',
                      'Audience segments',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 12 */}
                <ArticleSection
                  key="tip-12"
                  id="tip-12"
                  title="12. Send at the Right Time for Your Audience"
                  showImage={false}
                  intro={[
                    "Timing won't rescue bad messaging, but the wrong timing can make good messaging easier to miss.",
                    "Consider your prospect's time zone, working hours, industry, typical work schedule, and seasonal workload.",
                    "Don't assume that one send time works for every audience. Instead, test different sending windows and compare response rates. The best timing for a US-based SaaS company may not be the same as the best timing for an Indian services company or a European enterprise audience. Use your own campaign data to identify patterns.",
                  ]}
                  infographic={{
                    title: 'Time it right',
                    paragraphs: ['When you send matters – but test to find what works for your audience.'],
                    bullets: [
                      'Consider time zones and working hours',
                      'Test different days and times',
                      'Watch for industry‑specific patterns',
                      'Use data to refine, not assumptions',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 13 */}
                <ArticleSection
                  key="tip-13"
                  id="tip-13"
                  title="13. Automate Personalization Without Losing Relevance"
                  showImage={true}
                  intro={[
                    "Scaling cold email usually creates a difficult trade-off.",
                    "You can manually research every prospect and create highly personalized emails, but the process becomes slow and expensive.",
                    "Or you can send generic templates at scale, but response rates often suffer.",
                    "AI-powered outbound platforms help bridge that gap. Modern tools can analyze prospect and company information, identify relevant context, personalize messaging, automate follow-ups, and manage campaign workflows.",
                    "The key is to use automation to improve relevance—not simply to increase volume. Platforms such as 360Airo combine AI-powered personalization with automated outbound sequences, helping sales teams scale personalized outreach while reducing manual research and repetitive campaign management.",
                  ]}
                  infographic={{
                    title: 'Scale personalization with AI',
                    paragraphs: ['Automate research and personalization without sacrificing relevance.'],
                    bullets: [
                      'Analyze prospect and company data automatically',
                      'Generate relevant context‑aware messaging',
                      'Automate follow‑ups and sequencing',
                      'Maintain quality at scale',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Measure */}
                <ArticleSection
                  key="how-to-measure"
                  id="how-to-measure"
                  title="How to Measure Cold Email Response Rates"
                  showImage={false}
                  intro={[
                    "Improving response rates requires measuring more than just how many people reply.",
                    "Track several metrics together:",
                    "Delivery rate: How many emails successfully reached recipients?",
                    "Bounce rate: How many emails could not be delivered?",
                    "Reply rate: How many recipients responded?",
                    "Positive reply rate: How many replies indicate genuine interest?",
                    "Meeting-booked rate: How many prospects converted into meetings?",
                    "Conversion rate: How many opportunities were generated?",
                    "Most importantly, distinguish between total replies and positive replies. A campaign can have a high response rate because recipients are asking to be removed from future emails. That's not a successful campaign.",
                    "Your ultimate goal should be generating qualified conversations and pipeline.",
                  ]}
                  infographic={{
                    title: 'Metrics that matter',
                    paragraphs: ['Track the full funnel, not just total replies.'],
                    bullets: [
                      'Delivery rate',
                      'Bounce rate',
                      'Reply rate (total vs. positive)',
                      'Meeting‑booked rate',
                      'Conversion rate',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Final Thoughts */}
                <ArticleSection
                  key="final-thoughts"
                  id="final-thoughts"
                  title="Final Thoughts"
                  showImage={false}
                  intro={[
                    "Improving cold email response rates isn't about discovering one magic subject line or sending emails at a specific time. It comes down to consistently making your outreach more relevant, useful, and easier to respond to.",
                    "Start with a tightly defined audience. Research your prospects. Personalize the opening. Focus on their problems rather than your features. Keep the email concise and use a low-friction CTA.",
                    "Then build thoughtful follow-ups, protect deliverability, segment your campaigns, and continuously test your messaging.",
                    "As your outreach volume grows, automation becomes increasingly important. AI-powered personalization can help sales teams maintain relevance without requiring SDRs to manually research every prospect, while automated sequencing ensures promising leads don't fall through the cracks.",
                    "The objective isn't to send more cold emails. It's to send better emails to the right people—and give them a compelling reason to reply.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps sales teams automate personalized outreach, improve deliverability, manage campaigns, and measure performance – all from one platform.',
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
                  {
                    title: '10 SPF Record Mistakes That Hurt Email Deliverability',
                    tag: 'Listicles',
                    href: '/blogs/spf-record-mistakes-email-deliverability',
                    description: 'Avoid the top 10 SPF record mistakes that damage email deliverability.',
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