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
  { id: 'mistake-1', label: '1. Targeting Everyone Instead of Your ICP', arrow: true },
  { id: 'mistake-2', label: '2. Using an Outdated or Unverified Email List', arrow: true },
  { id: 'mistake-3', label: '3. Sending the Same Email to Everyone', arrow: true },
  { id: 'mistake-4', label: '4. Thinking "Hi {{First Name}}" Is Personalization', arrow: true },
  { id: 'mistake-5', label: '5. Making the Email About Yourself', arrow: true },
  { id: 'mistake-6', label: '6. Writing Emails That Are Too Long', arrow: true },
  { id: 'mistake-7', label: '7. Writing Like a Marketing Brochure', arrow: true },
  { id: 'mistake-8', label: '8. Using a Weak or Misleading Subject Line', arrow: true },
  { id: 'mistake-9', label: '9. Adding Too Many CTAs', arrow: true },
  { id: 'mistake-10', label: '10. Sending Without Checking Deliverability', arrow: true },
  { id: 'mistake-11', label: '11. Sending Too Many Emails Too Quickly', arrow: true },
  { id: 'mistake-12', label: '12. Ignoring Follow-Ups', arrow: true },
  { id: 'mistake-13', label: '13. Sending Follow-Ups That Add No Value', arrow: true },
  { id: 'mistake-14', label: '14. Ignoring Timing and Time Zones', arrow: true },
  { id: 'mistake-15', label: '15. Not Testing Your Campaign Before Launch', arrow: true },
  { id: 'mistake-16', label: '16. Measuring Opens Instead of Actual Outcomes', arrow: true },
  { id: 'mistake-17', label: '17. Treating Cold Email as "Set It and Forget It"', arrow: true },
  { id: 'how-to-avoid', label: 'How to Avoid These Cold Email Mistakes', arrow: true },
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
    alt: 'Cold email mistakes',
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
          Mistakes
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting to follow-ups.
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
          Quality over volume
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A smaller list of highly relevant prospects beats a massive database of unqualified contacts every time.
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
          Avoid cold email mistakes and scale personalized outreach with 360Airo – AI personalization, automated sequences, deliverability, and analytics in one platform.
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

export default function BlogColdEmailMistakesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/cold-email-mistakes.jpg';

  return (
    <>
      <Head>
        <title>17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)</title>
        <meta
          name="description"
          content="Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting and personalization to deliverability and follow-ups. Learn how to fix them and improve results."
        />
        <meta
          name="keywords"
          content="cold email mistakes, email campaign mistakes, cold email best practices, deliverability, personalization, follow-ups"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/cold-email-mistakes-killing-campaigns"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)"
        />
        <meta
          property="og:description"
          content="Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting and personalization to deliverability and follow-ups. Learn how to fix them and improve results."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/cold-email-mistakes-killing-campaigns"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)"
        />
        <meta
          name="twitter:description"
          content="Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting and personalization to deliverability and follow-ups. Learn how to fix them and improve results."
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
                  '@id': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns/#webpage',
                  'url': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns',
                  'name': '17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)',
                  'description': 'Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting and personalization to deliverability and follow-ups. Learn how to fix them and improve results.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns/#article',
                  'headline': '17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)',
                  'description': 'Avoid these 17 common cold email mistakes that quietly hurt your campaigns – from targeting and personalization to deliverability and follow-ups. Learn how to fix them and improve results.',
                  'url': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns',
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
                    '@id': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'cold email mistakes',
                    'email campaign mistakes',
                    'cold email best practices',
                    'deliverability',
                    'personalization',
                    'follow-ups',
                  ],
                  'datePublished': '2026-11-07',
                  'dateModified': '2026-11-07',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns/#breadcrumb',
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
                      'name': 'Cold Email Mistakes',
                      'item': 'https://360airo.com/blogs/cold-email-mistakes-killing-campaigns',
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
                  <span className="hidden sm:inline">17 Cold Email Mistakes Killing Your Campaigns</span>
                  <span className="sm:hidden">Cold Email Mistakes</span>
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
                      alt="Cold email mistakes hero"
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
                    17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Cold email can be one of the most effective ways to generate B2B conversations – but only when it's done well. Discover 17 common mistakes that could be quietly hurting your campaigns and learn how to fix them.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 12 min read</span>
                    <span>• 2.0K reads</span>
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
                    "Cold email can be one of the most effective ways to generate B2B conversations, but only when it's done well. A strong offer can still fail if your emails are poorly targeted, overly generic, badly timed, or consistently landing in spam.",
                    "The problem is that cold email mistakes often compound. A poor-quality list can increase bounce rates. Weak deliverability can reduce inbox placement. Generic messaging can lower replies. And without proper follow-ups, even interested prospects can disappear from your pipeline.",
                    "As inboxes become increasingly crowded, successful cold email requires more than sending large volumes of messages. Sales teams need a combination of accurate targeting, relevant personalization, strong deliverability, concise copy, and continuous optimization.",
                    "Here are 17 common cold email mistakes that could be quietly hurting your campaigns—and what to do instead.",
                  ]}
                  infographic={{
                    title: 'Mistakes compound quickly',
                    paragraphs: ['One mistake can snowball – poor targeting leads to low replies, which leads to more volume, which hurts deliverability.'],
                    bullets: [
                      'Poor targeting = irrelevant messaging',
                      'Weak deliverability = low inbox placement',
                      'Generic copy = low replies',
                      'No follow-ups = lost opportunities',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 1 */}
                <ArticleSection
                  key="mistake-1"
                  id="mistake-1"
                  title="1. Targeting Everyone Instead of Your ICP"
                  showImage={true}
                  intro={[
                    "The biggest cold email mistake is sending your campaign to anyone who might theoretically need your product.",
                    "A broad audience makes personalization difficult and usually results in irrelevant messaging.",
                    "Instead, define your Ideal Customer Profile (ICP) before building your prospect list.",
                    "Consider industry, company size, job role, seniority, geography, business model, and specific pain points.",
                    "The narrower and more relevant your audience, the easier it becomes to create messaging that resonates.",
                  ]}
                  infographic={{
                    title: 'Define your ICP first',
                    paragraphs: ['A broad audience makes personalization difficult – narrow your focus.'],
                    bullets: [
                      'Industry',
                      'Company size',
                      'Job role and seniority',
                      'Geography',
                      'Business model',
                      'Specific pain points',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 2 */}
                <ArticleSection
                  key="mistake-2"
                  id="mistake-2"
                  title="2. Using an Outdated or Unverified Email List"
                  showImage={false}
                  intro={[
                    "A large contact database isn't valuable if many of the addresses are invalid.",
                    "Sending emails to outdated or incorrect addresses increases bounce rates and can negatively affect your sender reputation. Before launching a campaign, verify your contacts and remove invalid, duplicate, and outdated addresses.",
                    "A smaller, clean list is usually more valuable than a massive database filled with questionable contacts.",
                  ]}
                  infographic={{
                    title: 'Clean your list',
                    paragraphs: ['Invalid addresses hurt your reputation – verify before you send.'],
                    bullets: [
                      'Verify every email address',
                      'Remove duplicates',
                      'Delete outdated contacts',
                      'Suppress previous hard bounces',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 3 */}
                <ArticleSection
                  key="mistake-3"
                  id="mistake-3"
                  title="3. Sending the Same Email to Everyone"
                  showImage={false}
                  intro={[
                    "A single template sent to your entire database may save time, but it rarely produces strong engagement.",
                    "Different prospects have different responsibilities, challenges, and priorities. A VP of Sales shouldn't necessarily receive the same message as a marketing manager.",
                    "Segment your audience and adjust your messaging based on role, industry, company size, or use case.",
                  ]}
                  infographic={{
                    title: 'Segment your audience',
                    paragraphs: ['Different roles = different priorities = different messages.'],
                    bullets: [
                      'Segment by role (VP, Manager, IC)',
                      'Segment by industry or company size',
                      'Adapt messaging to each segment',
                      'Relevance improves engagement',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 4 */}
                <ArticleSection
                  key="mistake-4"
                  id="mistake-4"
                  title='4. Thinking "Hi {{First Name}}" Is Personalization'
                  showImage={false}
                  intro={[
                    "Adding a prospect's first name isn't enough.",
                    "True personalization shows that you've done some research into the recipient or their company.",
                    "You might reference a recent company announcement, a new product, a hiring trend, their website, a LinkedIn post, or an industry-specific challenge.",
                    "The goal is to make the prospect think, 'This email was actually written for me.'",
                    "AI-powered personalization can help sales teams research and tailor messages at scale without requiring SDRs to manually research every prospect.",
                  ]}
                  infographic={{
                    title: 'Real personalization',
                    paragraphs: ['First‑name personalization is expected – context is what stands out.'],
                    bullets: [
                      'Reference recent company news',
                      'Mention LinkedIn activity',
                      'Connect to industry challenges',
                      'Use AI to scale relevant research',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 5 */}
                <ArticleSection
                  key="mistake-5"
                  id="mistake-5"
                  title="5. Making the Email About Yourself"
                  showImage={false}
                  intro={[
                    "Another common mistake is starting with a long introduction about your company.",
                    "'We are a leading provider of...' 'We've been in business for 15 years...' 'Our award-winning platform...'",
                    "Your prospect probably doesn't care—at least not yet.",
                    "Start with their problem instead. Show that you understand the challenge they're facing and explain how your solution could help.",
                    "Your product should be the solution to the conversation, not the subject of the entire email.",
                  ]}
                  infographic={{
                    title: 'Talk about them',
                    paragraphs: ['Start with their problem – your company can come later.'],
                    bullets: [
                      'Avoid company introductions',
                      'Begin with their challenge',
                      'Show you understand their situation',
                      'Make it about solving, not selling',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 6 */}
                <ArticleSection
                  key="mistake-6"
                  id="mistake-6"
                  title="6. Writing Emails That Are Too Long"
                  showImage={false}
                  intro={[
                    "Cold emails don't need to explain everything your product can do.",
                    "Long emails create friction, especially when the recipient doesn't know you.",
                    "Keep your message focused on: 1) Why you're reaching out, 2) Why it matters to the prospect, 3) What you want them to do next.",
                    "Remove unnecessary features, company history, lengthy explanations, and marketing language.",
                    "If the prospect is interested, you can provide more information during the next conversation.",
                  ]}
                  infographic={{
                    title: 'Keep it concise',
                    paragraphs: ['Short emails are easier to read and reply to.'],
                    bullets: [
                      'Under 125 words',
                      'Focus on one problem and one CTA',
                      'Skip feature lists and company history',
                      'Save details for the conversation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 7 */}
                <ArticleSection
                  key="mistake-7"
                  id="mistake-7"
                  title="7. Writing Like a Marketing Brochure"
                  showImage={false}
                  intro={[
                    "Cold emails should sound like conversations—not advertisements.",
                    "Phrases such as 'revolutionary solution,' 'industry-leading platform,' and 'transform your business' often make emails feel promotional.",
                    "Use simple, conversational language instead.",
                    "Write as though you're speaking directly to another professional rather than trying to impress an entire audience.",
                  ]}
                  infographic={{
                    title: 'Write conversationally',
                    paragraphs: ['Avoid marketing speak – write like a professional, not a brochure.'],
                    bullets: [
                      'Use simple, natural language',
                      'Avoid buzzwords and superlatives',
                      'Write as if you&apos;re speaking directly to them',
                      'Focus on clarity, not impressiveness',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 8 */}
                <ArticleSection
                  key="mistake-8"
                  id="mistake-8"
                  title="8. Using a Weak or Misleading Subject Line"
                  showImage={false}
                  intro={[
                    "Your subject line needs to earn attention without misleading the recipient.",
                    "Avoid exaggerated claims, excessive punctuation, and clickbait.",
                    "Instead, keep your subject line short and relevant to the reason you're contacting the prospect.",
                    "For example: 'Quick question about your outbound process' is generally more natural than: '🚨 INCREASE SALES BY 300%!!!'",
                    "The subject line should create enough curiosity to encourage the recipient to read the email without making promises the email can't support.",
                  ]}
                  infographic={{
                    title: 'Write natural subject lines',
                    paragraphs: ['Earn attention honestly – avoid clickbait and exaggeration.'],
                    bullets: [
                      'Keep it short and relevant',
                      'Avoid ALL CAPS and excessive punctuation',
                      'Don&apos;t make promises you can&apos;t keep',
                      'Create curiosity without misleading',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 9 */}
                <ArticleSection
                  key="mistake-9"
                  id="mistake-9"
                  title="9. Adding Too Many CTAs"
                  showImage={false}
                  intro={[
                    "A cold email should have one clear objective.",
                    "Asking the prospect to book a meeting, download an ebook, watch a video, visit your website, and follow you on LinkedIn creates unnecessary friction.",
                    "Choose one primary CTA.",
                    "For example: 'Would it make sense to explore this for your team?'",
                    "Simple questions can make it easier for prospects to respond without feeling pressured into a sales call.",
                  ]}
                  infographic={{
                    title: 'One CTA per email',
                    paragraphs: ['Multiple requests create decision fatigue – choose one.'],
                    bullets: [
                      'One clear objective per email',
                      'Ask a simple, low‑pressure question',
                      'Make it easy to respond',
                      'Save other asks for later conversations',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 10 */}
                <ArticleSection
                  key="mistake-10"
                  id="mistake-10"
                  title="10. Sending Without Checking Deliverability"
                  showImage={true}
                  intro={[
                    "Even excellent copy is useless if the email doesn't reach the inbox.",
                    "Before launching cold email campaigns, make sure your sending infrastructure is properly configured.",
                    "Check SPF, DKIM, DMARC, domain reputation, mailbox health, sending limits, and bounce rates.",
                    "If you're using a new domain or inbox, gradually build sending volume instead of immediately sending large batches.",
                    "Deliverability isn't a one-time setup. It needs to be monitored continuously.",
                  ]}
                  infographic={{
                    title: 'Protect your deliverability',
                    paragraphs: ['Great copy means nothing if your email never reaches the inbox.'],
                    bullets: [
                      'Configure SPF, DKIM, and DMARC',
                      'Monitor domain reputation',
                      'Check mailbox health and limits',
                      'Scale sending volume gradually',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 11 */}
                <ArticleSection
                  key="mistake-11"
                  id="mistake-11"
                  title="11. Sending Too Many Emails Too Quickly"
                  showImage={false}
                  intro={[
                    "More emails don't automatically mean more sales.",
                    "Sudden spikes in sending volume can negatively affect sender reputation and increase the likelihood of spam filtering.",
                    "Instead, scale your volume gradually and distribute sending appropriately across healthy mailboxes.",
                    "A sustainable outbound system prioritizes consistent deliverability over short-term volume.",
                  ]}
                  infographic={{
                    title: 'Scale gradually',
                    paragraphs: ['Sudden spikes trigger spam filters – build volume slowly.'],
                    bullets: [
                      'Avoid sudden volume increases',
                      'Distribute sending across multiple mailboxes',
                      'Prioritize sustainability over volume',
                      'Consistency builds reputation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 12 */}
                <ArticleSection
                  key="mistake-12"
                  id="mistake-12"
                  title="12. Ignoring Follow-Ups"
                  showImage={false}
                  intro={[
                    "Sending one email and waiting for a response leaves a significant amount of potential pipeline untouched.",
                    "People are busy. An unanswered email doesn't necessarily mean a prospect isn't interested.",
                    "Create a thoughtful follow-up sequence rather than repeatedly sending: 'Just following up.'",
                    "Each follow-up can introduce a different angle, insight, use case, or relevant customer result.",
                    "The goal is persistence without becoming annoying.",
                  ]}
                  infographic={{
                    title: 'Follow up with purpose',
                    paragraphs: ['One email is rarely enough – create a thoughtful sequence.'],
                    bullets: [
                      'Build a 3‑5 touch sequence',
                      'Add new value with each follow‑up',
                      'Introduce different angles and insights',
                      'Be persistent without being annoying',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 13 */}
                <ArticleSection
                  key="mistake-13"
                  id="mistake-13"
                  title="13. Sending Follow-Ups That Add No Value"
                  showImage={false}
                  intro={[
                    "Follow-up frequency matters, but so does the content.",
                    "Five emails saying essentially the same thing aren't five opportunities to convince someone – they're five opportunities to annoy them.",
                    "Instead, change the reason for reaching out. Follow‑up 1: Clarify the problem. Follow‑up 2: Share an insight. Follow‑up 3: Provide a relevant customer example. Follow‑up 4: Address another potential objection. Follow‑up 5: Give the prospect an easy way to close the loop.",
                    "Every follow-up should have a reason to exist.",
                  ]}
                  infographic={{
                    title: 'Add value with every touch',
                    paragraphs: ['Don&apos;t repeat the same message – each follow‑up should be different.'],
                    bullets: [
                      'Clarify the problem',
                      'Share an insight or stat',
                      'Provide a customer example',
                      'Address an objection',
                      'Give an easy way to close the loop',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 14 */}
                <ArticleSection
                  key="mistake-14"
                  id="mistake-14"
                  title="14. Ignoring Timing and Time Zones"
                  showImage={false}
                  intro={[
                    "A great email can easily get buried if it arrives at the wrong time.",
                    "When building campaigns, account for the prospect's location and working hours.",
                    "Avoid blindly sending every email at the same time regardless of where your prospects are located.",
                    "More importantly, don't assume that one universal send time works for every audience. Test different schedules and use your campaign data to identify what works best for your specific market.",
                  ]}
                  infographic={{
                    title: 'Time it right',
                    paragraphs: ['Timing matters – send when your prospects are actually working.'],
                    bullets: [
                      'Account for time zones',
                      'Test different send times',
                      'Use data to find what works',
                      'Don&apos;t assume one time fits all',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 15 */}
                <ArticleSection
                  key="mistake-15"
                  id="mistake-15"
                  title="15. Not Testing Your Campaign Before Launch"
                  showImage={false}
                  intro={[
                    "Never assume that your campaign will work simply because the email looks correct in your editor.",
                    "Send test emails before launching and check personalization fields, subject lines, links, formatting, spelling, mobile appearance, and CTA functionality.",
                    "Pay particular attention to dynamic fields. Nothing undermines credibility faster than an email that says 'Hi {{First_Name}}'.",
                  ]}
                  infographic={{
                    title: 'Test before you send',
                    paragraphs: ['A few minutes of testing can save hours of lost opportunities.'],
                    bullets: [
                      'Personalization fields',
                      'Subject lines and links',
                      'Formatting and spelling',
                      'Mobile appearance',
                      'Dynamic fields and CTAs',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 16 */}
                <ArticleSection
                  key="mistake-16"
                  id="mistake-16"
                  title="16. Measuring Opens Instead of Actual Outcomes"
                  showImage={false}
                  intro={[
                    "Open rates can provide useful directional information, but they shouldn't be your primary measure of success.",
                    "What matters more is whether your campaign generates meaningful business outcomes.",
                    "Track reply rate, positive reply rate, meetings booked, qualified opportunities, conversion rate, bounce rate, and unsubscribe rate.",
                    "A campaign with a modest open rate can still be highly successful if it consistently generates qualified meetings.",
                    "Focus on the metrics closest to revenue.",
                  ]}
                  infographic={{
                    title: 'Measure what matters',
                    paragraphs: ['Opens are vanity – replies and meetings are what matter.'],
                    bullets: [
                      'Reply rate',
                      'Positive reply rate',
                      'Meetings booked',
                      'Qualified opportunities',
                      'Conversion rate',
                      'Bounce rate',
                      'Unsubscribe rate',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 17 */}
                <ArticleSection
                  key="mistake-17"
                  id="mistake-17"
                  title='17. Treating Cold Email as "Set It and Forget It"'
                  showImage={true}
                  intro={[
                    "Launching a campaign isn't the end of the process.",
                    "The best-performing outbound teams continuously review their campaigns and identify opportunities to improve.",
                    "Test different audiences, subject lines, opening lines, value propositions, CTAs, follow-up sequences, and sending schedules.",
                    "Look at the data and make incremental changes rather than completely rebuilding campaigns every time something underperforms.",
                    "Over time, these small improvements compound.",
                  ]}
                  infographic={{
                    title: 'Continuous improvement',
                    paragraphs: ['The best campaigns are never truly finished – they evolve.'],
                    bullets: [
                      'Test audiences and subject lines',
                      'Experiment with CTAs and sequences',
                      'Make incremental changes',
                      'Small improvements compound over time',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Avoid */}
                <ArticleSection
                  key="how-to-avoid"
                  id="how-to-avoid"
                  title="How to Avoid These Cold Email Mistakes"
                  showImage={false}
                  intro={[
                    "Avoiding these mistakes starts with building a repeatable outbound process.",
                    "Before launching any campaign, make sure you have a clearly defined ICP, a verified prospect list, proper email authentication, healthy sending infrastructure, personalized messaging, a clear CTA, a structured follow-up sequence, campaign tracking, and a testing process.",
                    "Automation can also eliminate many of the manual tasks responsible for common mistakes. Modern outbound platforms can help with prospect research, personalization, email sequencing, inbox management, deliverability, and campaign analytics.",
                    "The goal isn't to automate everything blindly. It's to automate repetitive work while keeping the outreach relevant and human.",
                  ]}
                  infographic={{
                    title: 'Build a repeatable process',
                    paragraphs: ['Avoid mistakes by systematizing your outbound approach.'],
                    bullets: [
                      'Define your ICP',
                      'Verify your prospect list',
                      'Authenticate your domain',
                      'Personalize your messaging',
                      'Structure follow‑ups',
                      'Track and test continuously',
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
                    "Cold email doesn't fail because the channel is dead. It fails when businesses treat it like a numbers game.",
                    "Sending more emails to a larger list won't solve poor targeting, weak messaging, or poor deliverability. In fact, it can make those problems worse.",
                    "The strongest campaigns combine accurate targeting with relevant personalization, concise copy, healthy sending infrastructure, thoughtful follow-ups, and continuous testing.",
                    "If you're still managing these processes manually, an outbound platform like 360Airo can help streamline the workflow. AI-powered personalization, automated sequences, multichannel outreach, and deliverability-focused features allow sales teams to scale prospecting without turning every campaign into a manual exercise.",
                    "Ultimately, the goal of cold email isn't to send more messages. It's to start more relevant conversations with the right prospects. Avoid these 17 mistakes, focus on quality over volume, and use campaign data to keep improving your approach.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps sales teams avoid cold email mistakes with AI personalization, automated sequences, deliverability monitoring, and campaign analytics – all from one platform.',
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
                    title: '15 Email Deliverability Tips Every Sales Team Should Know',
                    tag: 'Listicles',
                    href: '/blogs/email-deliverability-tips-sales-teams',
                    description: 'Master email deliverability with 15 proven tips for your sales team.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '15 Best Cold Email Software Platforms for B2B Sales in 2026',
                    tag: 'Listicles',
                    href: '/blogs/best-cold-email-software-platforms-b2b-sales',
                    description: 'Compare the 15 best cold email software platforms for B2B sales.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '13 Proven Ways to Improve Cold Email Response Rates',
                    tag: 'Listicles',
                    href: '/blogs/improve-cold-email-response-rates',
                    description: 'Discover 13 proven strategies to boost cold email response rates.',
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