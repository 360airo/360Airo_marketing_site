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
  { id: 'what-is-email-bounce-rate', label: '1. What Is Email Bounce Rate?', arrow: true },
  { id: 'why-keeping-bounce-rates-low', label: '2. Why Keeping Bounce Rates Below 3% Matters', arrow: true },
  { id: 'hard-bounces-vs-soft-bounces', label: '3. Understand Hard Bounces vs Soft Bounces', arrow: true },
  { id: 'what-is-a-hard-bounce', label: '3.1 What Is a Hard Bounce?', arrow: true, indent: true },
  { id: 'what-is-a-soft-bounce', label: '3.2 What Is a Soft Bounce?', arrow: true, indent: true },
  { id: 'verify-and-validate-emails', label: '4. Verify and Validate Emails Before Sending', arrow: true },
  { id: 'what-does-email-verification-check', label: '4.1 What Does Email Verification Check?', arrow: true, indent: true },
  { id: 'verify-data-at-point-of-entry', label: '4.2 Verify Data at the Point of Entry', arrow: true, indent: true },
  { id: 'maintain-email-list-hygiene', label: '5. Maintain Strong Email List Hygiene', arrow: true },
  { id: 'clean-email-lists-regularly', label: '5.1 Clean Email Lists Regularly', arrow: true, indent: true },
  { id: 'remove-inactive-contacts', label: '5.2 Remove Inactive and Invalid Contacts', arrow: true, indent: true },
  { id: 'configure-email-authentication', label: '6. Configure Email Authentication Correctly', arrow: true },
  { id: 'configure-spf-record', label: '6.1 Configure an SPF Record', arrow: true, indent: true },
  { id: 'use-dkim-authentication', label: '6.2 Use DKIM Authentication', arrow: true, indent: true },
  { id: 'implement-dmarc-policy', label: '6.3 Implement a DMARC Policy', arrow: true, indent: true },
  { id: 'warm-up-new-mailboxes', label: '7. Warm Up New Mailboxes Gradually', arrow: true },
  { id: 'monitor-bounce-metrics', label: '8. Monitor Bounce Metrics Continuously', arrow: true },
  { id: 'best-practices-for-low-bounce', label: '9. Best Practices for Keeping Bounce Rates Low', arrow: true },
  { id: 'faqs', label: '10. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '11. Protect Deliverability With Better Data', arrow: true },
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
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Email bounce rate dashboard',
    label: 'Bounce Rate',
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
          Bounce Rate Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Keep bounce rates below 3% with verified data, authentication, and continuous monitoring.
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
          Verify before you send
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          A single invalid address can damage your sender reputation. Always verify your prospect list before launching a campaign.
        </p>
      </div>
    </aside>
  );
}

export default function BlogBounceRatePage() {
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

  const featuredImage = 'https://360airo.com/og-image.jpg';

  return (
    <>
      <Head>
        <title>Best Practices to Keep Email Bounce Rates Low | Email Guide</title>
        <meta
          name="description"
          content="Learn the best practices to keep email bounce rates low, including email verification, list hygiene, reducing invalid addresses, managing sending volume, and improving email deliverability."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Best Practices to Keep Email Bounce Rates Low | Email Guide"
        />
        <meta
          property="og:description"
          content="Discover practical ways to reduce email bounce rates through list hygiene, email verification, better sending practices, and improved deliverability."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low"
        />
        <meta property="og:site_name" content="360Airo" />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:alt" content="Best Practices to Keep Email Bounce Rates Low" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best Practices to Keep Email Bounce Rates Low | Email Guide"
        />
        <meta
          name="twitter:description"
          content="Learn practical ways to reduce email bounce rates and improve email deliverability through better list and sending practices."
        />
        <meta name="twitter:image" content={featuredImage} />

        <meta name="author" content="360Airo" />
        <meta name="theme-color" content="#08124A" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#article',
                  'url': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low',
                  'headline': 'Best Practices to Keep Email Bounce Rates Low',
                  'description': 'Learn the best practices to keep email bounce rates low, including email verification, list hygiene, reducing invalid addresses, managing sending volume, and improving email deliverability.',
                  'mainEntityOfPage': {
                    '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#webpage',
                  },
                  'publisher': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'author': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'image': {
                    '@type': 'ImageObject',
                    'url': featuredImage,
                  },
                  'inLanguage': 'en-US',
                },
                {
                  '@type': 'WebPage',
                  '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#webpage',
                  'url': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low',
                  'name': 'Best Practices to Keep Email Bounce Rates Low',
                  'description': 'Learn practical ways to reduce email bounce rates through email verification, list hygiene, sending best practices, and improved email deliverability.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'about': {
                    '@type': 'Thing',
                    'name': 'Email Bounce Rate',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#breadcrumb',
                  },
                  'publisher': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'mainEntity': {
                    '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#article',
                  },
                  'inLanguage': 'en-US',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low#breadcrumb',
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
                      'name': 'Blogs',
                      'item': 'https://360airo.com/blogs',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': 'Best Practices to Keep Email Bounce Rates Low',
                      'item': 'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low',
                    },
                  ],
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://360airo.com/#organization',
                  'name': '360Airo',
                  'url': 'https://360airo.com/',
                  'logo': {
                    '@type': 'ImageObject',
                    '@id': 'https://360airo.com/#logo',
                    'url': 'https://360airo.com/logo.svg',
                    'contentUrl': 'https://360airo.com/logo.svg',
                  },
                  'sameAs': [
                    'https://www.linkedin.com/company/360-airo/posts/',
                    'https://x.com/360airo',
                    'https://www.instagram.com/360airo',
                    'https://www.youtube.com/@360airo',
                    'https://www.facebook.com/p/360-Airo-61583637801140/',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://360airo.com/#website',
                  'url': 'https://360airo.com/',
                  'name': '360Airo',
                  'publisher': {
                    '@id': 'https://360airo.com/#organization',
                  },
                  'inLanguage': 'en-US',
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
        `}</style>
      </Head>

      <div className="blog-shell">
        <Navbar activeTab="resources" />
        <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
          {/* Hero Section */}
          <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
            <div className="max-w-7xl mx-auto">
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
                  <span className="hidden sm:inline">Best Practices to Keep Email Bounce Rates Below the 3% Target</span>
                  <span className="sm:hidden">Best Practices for Email Bounce Rates</span>
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
                      src="/email-bounce-rate.png"
                      alt="Email bounce rate hero"
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
                    Deliverability Guide
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Best Practices to Keep Email Bounce Rates Below the 3% Target
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    You launch an email campaign to 1,000 prospects. Some emails fail to deliver. Those bounces aren't just missed opportunities — they can damage your sender reputation. Learn how to keep bounce rates below 3%.
                  </p>

                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Jun 2026</span>
                    <span>• 10 min read</span>
                    <span>• 1.1K reads</span>
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
                    'You launch an email campaign to 1,000 prospects.',
                    'Some emails reach their destination. Others return almost immediately.',
                    'Those failed deliveries aren\'t just missed opportunities. A consistently high Email Bounce Rate can indicate poor data quality, weaken sender reputation, and affect future email deliverability.',
                    'For outbound sales teams, keeping bounce rates below 3% is a useful target. But achieving it requires more than removing a few invalid addresses before launching a campaign.',
                    'Strong Cold Email Deliverability depends on verified contact data, regular email list cleaning, proper authentication, and continuous monitoring.',
                    "Let's explore the best practices that can help revenue teams reduce email bounce rates and build healthier outreach campaigns.",
                  ]}
                  infographic={{
                    title: 'Why bounce rates matter',
                    paragraphs: ['High bounce rates signal poor data quality and can damage sender reputation. Keeping them below 3% is a key deliverability target.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-email-bounce-rate"
                  id="what-is-email-bounce-rate"
                  title="1. What Is Email Bounce Rate?"
                  showImage={false}
                  intro={[
                    'Email Bounce Rate is the percentage of sent emails that cannot be successfully delivered to recipients.',
                    'It can be calculated using a simple formula:',
                    'Email Bounce Rate = (Bounced Emails ÷ Total Emails Sent) × 100',
                    'For example, if 20 out of 1,000 emails bounce, the campaign has a 2% bounce rate.',
                    'Bounce rate is one of the most important Email Deliverability Metrics because it provides insight into the quality of your prospect data and sending infrastructure.',
                    'A rising bounce rate may indicate:',
                  ]}
                  infographic={{
                    title: 'Common causes of rising bounce rates',
                    paragraphs: ['Identifying the root cause is the first step to fixing it.'],
                    bullets: [
                      'Outdated email addresses',
                      'Poor-quality prospect data',
                      'Invalid domains',
                      'Temporary mailbox problems',
                      'Authentication issues',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="why-keeping-bounce-rates-low"
                  id="why-keeping-bounce-rates-low"
                  title="2. Why Keeping Bounce Rates Below 3% Matters"
                  showImage={true}
                  intro={[
                    'A low bounce rate supports a healthier email program.',
                    'When large numbers of emails repeatedly fail to reach recipients, mailbox providers may interpret the activity as a sign of poor sending practices.',
                    'This can affect Sender Reputation and make future campaigns more difficult to deliver successfully.',
                    'A bounce rate below 3% is a useful operational target, but lower is generally better.',
                    'Maintaining a healthy Bounce Rate Benchmark can help teams:',
                  ]}
                  infographic={{
                    title: 'Benefits of low bounce rates',
                    paragraphs: ['Keeping bounce rates low protects your sender reputation and improves overall campaign performance.'],
                    bullets: [
                      'Protect sender reputation',
                      'Improve email deliverability',
                      'Maintain cleaner prospect databases',
                      'Reduce wasted outreach volume',
                      'Improve campaign measurement',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Impact on reporting',
                      paragraphs: ['A high bounce rate also affects reporting accuracy. If a large portion of your campaign never reaches its intended audience, open rates, reply rates, and conversion metrics become more difficult to evaluate.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="hard-bounces-vs-soft-bounces"
                  id="hard-bounces-vs-soft-bounces"
                  title="3. Understand Hard Bounces vs Soft Bounces"
                  showImage={false}
                  intro={[
                    'Not every bounced email fails for the same reason.',
                    'Understanding the difference between a Hard Bounce and a Soft Bounce helps teams determine the correct response.',
                  ]}
                  infographic={{
                    title: 'Hard vs Soft Bounces',
                    paragraphs: ['Hard bounces are permanent; soft bounces are temporary. Handle each appropriately.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-is-a-hard-bounce"
                  id="what-is-a-hard-bounce"
                  title="3.1 What Is a Hard Bounce?"
                  showImage={false}
                  intro={[
                    'A hard bounce is a permanent delivery failure.',
                    'Common causes include:',
                  ]}
                  infographic={{
                    title: 'Hard bounce causes',
                    paragraphs: ['These addresses should be removed immediately.'],
                    bullets: [
                      "The email address doesn't exist",
                      'The domain is invalid',
                      'The recipient account has been permanently closed',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Action required',
                      paragraphs: ['Hard-bounced addresses should be removed or suppressed from future campaigns. Continuing to send emails to permanently invalid addresses can damage sender reputation and increase unnecessary campaign volume.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="what-is-a-soft-bounce"
                  id="what-is-a-soft-bounce"
                  title="3.2 What Is a Soft Bounce?"
                  showImage={false}
                  intro={[
                    'A soft bounce is usually caused by a temporary delivery problem.',
                    'Examples include:',
                  ]}
                  infographic={{
                    title: 'Soft bounce examples',
                    paragraphs: ['These are often temporary and may not require immediate removal.'],
                    bullets: [
                      'A full inbox',
                      'Temporary server problems',
                      'Message size restrictions',
                      'Short-term receiving server issues',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Monitoring soft bounces',
                      paragraphs: ['Soft bounces don\'t always require immediate removal. However, repeated soft bounces from the same address should be investigated and monitored.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="verify-and-validate-emails"
                  id="verify-and-validate-emails"
                  title="4. Verify and Validate Emails Before Sending"
                  showImage={true}
                  intro={[
                    'One of the most effective ways to Reduce Email Bounce Rate is to identify invalid addresses before launching a campaign.',
                    'This is where Email Verification and Email Validation become important.',
                  ]}
                  infographic={{
                    title: 'Verification matters',
                    paragraphs: ['Catch invalid addresses before they damage your reputation.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="what-does-email-verification-check"
                  id="what-does-email-verification-check"
                  title="4.1 What Does Email Verification Check?"
                  showImage={false}
                  intro={[
                    'Depending on the verification process, Email Verification Tools may evaluate:',
                  ]}
                  infographic={{
                    title: 'Verification checks',
                    paragraphs: ['Email verification tools scan for multiple risk factors.'],
                    bullets: [
                      'Email address formatting',
                      'Domain validity',
                      'Mail server availability',
                      'Mailbox status',
                      'Disposable email addresses',
                      'Risk indicators',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Proactive verification',
                      paragraphs: ['Verification helps sales teams identify potentially invalid contacts before those addresses enter active outreach sequences.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="verify-data-at-point-of-entry"
                  id="verify-data-at-point-of-entry"
                  title="4.2 Verify Data at the Point of Entry"
                  showImage={false}
                  intro={[
                    "Don't wait until campaign launch to check contact information.",
                    'Email validation should be integrated into the lead generation workflow.',
                    'When new contacts enter your prospect database, verify their information before adding them to active campaigns.',
                    'This creates a cleaner foundation for outbound outreach and reduces the amount of list cleaning required later.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="maintain-email-list-hygiene"
                  id="maintain-email-list-hygiene"
                  title="5. Maintain Strong Email List Hygiene"
                  showImage={true}
                  intro={[
                    'Email databases change constantly.',
                    'People leave companies, change roles, switch domains, and abandon old email accounts.',
                    "That's why Email List Hygiene should be an ongoing process.",
                  ]}
                  infographic={{
                    title: 'Why list hygiene matters',
                    paragraphs: ['Regular cleaning protects your sender reputation and improves deliverability.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="clean-email-lists-regularly"
                  id="clean-email-lists-regularly"
                  title="5.1 Clean Email Lists Regularly"
                  showImage={false}
                  intro={[
                    'Email List Cleaning helps identify and remove records that may affect campaign performance.',
                    'Review lists for:',
                  ]}
                  infographic={{
                    title: 'What to check during cleaning',
                    paragraphs: ['Keep your database healthy by removing these records.'],
                    bullets: [
                      'Invalid addresses',
                      'Duplicate contacts',
                      'Repeated hard bounces',
                      'Outdated information',
                      'Inactive accounts',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Cleaning frequency',
                      paragraphs: ['How frequently you clean your list depends on how quickly your database grows and changes. Large outbound teams may need more frequent checks than teams running smaller, highly targeted campaigns.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="remove-inactive-contacts"
                  id="remove-inactive-contacts"
                  title="5.2 Remove Inactive and Invalid Contacts"
                  showImage={false}
                  intro={[
                    "Large databases aren't always better databases.",
                    'Keeping outdated contacts simply to maintain a higher contact count can create unnecessary deliverability risks.',
                    'Remove or suppress permanently invalid addresses and review contacts that repeatedly fail to receive messages.',
                    'The goal is to maintain a database of reachable and relevant prospects.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="configure-email-authentication"
                  id="configure-email-authentication"
                  title="6. Configure Email Authentication Correctly"
                  showImage={true}
                  intro={[
                    "Not every bounce is caused by bad contact data.",
                    'Problems with Email Authentication can also affect delivery.',
                    'Three important authentication standards are SPF, DKIM, and DMARC.',
                  ]}
                  infographic={{
                    title: 'Authentication triad',
                    paragraphs: ['SPF, DKIM, and DMARC work together to protect your domain.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="configure-spf-record"
                  id="configure-spf-record"
                  title="6.1 Configure an SPF Record"
                  showImage={false}
                  intro={[
                    'An SPF Record identifies the mail servers authorized to send messages on behalf of your domain.',
                    'Correct SPF configuration helps receiving servers verify that your sending infrastructure is legitimate.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="use-dkim-authentication"
                  id="use-dkim-authentication"
                  title="6.2 Use DKIM Authentication"
                  showImage={false}
                  intro={[
                    'DKIM Authentication adds a digital signature to outgoing emails.',
                    'The receiving server can use this signature to verify that the email is associated with the expected domain and hasn\'t been altered during delivery.',
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="implement-dmarc-policy"
                  id="implement-dmarc-policy"
                  title="6.3 Implement a DMARC Policy"
                  showImage={false}
                  intro={[
                    'A DMARC Policy works with SPF and DKIM to provide instructions for handling messages that fail authentication checks.',
                    'It can also provide reporting that helps teams identify authentication issues and unauthorized domain usage.',
                    "Authentication alone won't guarantee inbox placement, but it provides an essential foundation for healthy email deliverability.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  key="warm-up-new-mailboxes"
                  id="warm-up-new-mailboxes"
                  title="7. Warm Up New Mailboxes Gradually"
                  showImage={false}
                  intro={[
                    "A new or inactive mailbox shouldn't immediately begin sending large volumes of outreach.",
                    'Email Warmup helps establish consistent sending activity before campaigns scale.',
                    'A structured warmup process generally involves:',
                  ]}
                  infographic={{
                    title: 'Warmup steps',
                    paragraphs: ['Gradual sending activity builds trust with mailbox providers.'],
                    bullets: [
                      'Starting with lower sending volumes',
                      'Increasing activity gradually',
                      'Monitoring delivery performance',
                      'Tracking reputation indicators',
                      'Adjusting volume when issues appear',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Combine with good data',
                      paragraphs: ['Warmup should be combined with clean prospect data and proper authentication. Sending gradually to a poor-quality list won\'t solve underlying bounce problems.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="monitor-bounce-metrics"
                  id="monitor-bounce-metrics"
                  title="8. Monitor Bounce Metrics Continuously"
                  showImage={false}
                  intro={[
                    "Bounce management shouldn't happen only after a campaign fails.",
                    'Revenue teams should continuously monitor bounce and deliverability performance.',
                    'Track:',
                  ]}
                  infographic={{
                    title: 'Metrics to monitor',
                    paragraphs: ['Continuous monitoring helps you detect issues early.'],
                    bullets: [
                      'Total bounce rate',
                      'Hard bounce rate',
                      'Soft bounce rate',
                      'Bounce trends by campaign',
                      'Bounce trends by mailbox',
                      'Bounce trends by domain',
                      'Overall deliverability performance',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Early detection',
                      paragraphs: ['A sudden increase in bounce rate may indicate a list quality problem, configuration issue, or change in sending infrastructure. Early detection makes it easier to investigate before the problem affects future campaigns.'],
                    },
                  ]}
                />

                <ArticleSection
                  key="best-practices-for-low-bounce"
                  id="best-practices-for-low-bounce"
                  title="9. Best Practices for Keeping Bounce Rates Low"
                  showImage={true}
                  intro={[
                    'Keeping email bounce rates below the 3% target requires consistent attention across data, infrastructure, and campaign execution.',
                    'Revenue teams should:',
                  ]}
                  infographic={{
                    title: 'Action checklist',
                    paragraphs: ['Proactive management is the key to sustained low bounce rates.'],
                    bullets: [
                      'Verify email addresses before outreach',
                      'Validate new contacts as they enter the database',
                      'Clean prospect lists regularly',
                      'Remove hard-bounced addresses',
                      'Monitor repeated soft bounces',
                      'Configure SPF, DKIM, and DMARC',
                      'Warm up new mailboxes gradually',
                      'Monitor sender reputation',
                      'Track bounce rates across campaigns and domains',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Be proactive',
                      paragraphs: ["Don't wait for bounce rates to increase before reviewing data quality and sending infrastructure."],
                    },
                  ]}
                />

                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    10. Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic
                      title="Quick answers"
                      paragraphs={['Common questions about email bounce rates.']}
                    />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: '10.1 What is email bounce rate?',
                          paragraphs: ['Email bounce rate is the percentage of sent emails that cannot be successfully delivered to recipients.'],
                        },
                        {
                          subtitle: '10.2 Why does keeping bounce rates below 3% matter?',
                          paragraphs: ['A lower bounce rate supports healthier sender reputation, cleaner campaign data, and stronger email deliverability. Consistently high bounce rates may indicate problems with contact data or sending infrastructure.'],
                        },
                        {
                          subtitle: '10.3 What is the difference between hard bounces and soft bounces?',
                          paragraphs: ['Hard bounces are permanent delivery failures, often caused by invalid addresses or domains. Soft bounces are generally temporary and may be caused by full inboxes or short-term server issues.'],
                        },
                        {
                          subtitle: '10.4 How does email verification reduce bounce rates?',
                          paragraphs: ['Email verification helps identify invalid, malformed, or risky addresses before campaigns begin, reducing the likelihood of sending to contacts that cannot receive messages.'],
                        },
                        {
                          subtitle: '10.5 How often should email lists be cleaned?',
                          paragraphs: ['The right frequency depends on database size, data sources, and campaign volume. High-volume outbound teams should review and verify contact data regularly rather than relying on occasional list cleaning.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  key="conclusion"
                  id="conclusion"
                  title="11. Protect Deliverability With Better Data"
                  showImage={false}
                  intro={[
                    'A low bounce rate starts with accurate data.',
                    'But maintaining healthy email performance also requires authenticated domains, controlled sending activity, clean prospect lists, and continuous monitoring.',
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams connect prospect data, email verification, deliverability monitoring, and AI-powered outreach into one workflow. Reduce unnecessary bounces, protect sender reputation, and improve cold email deliverability with smarter data and connected outreach from 360Airo.',
                    ],
                  }}
                  blocks={[]}
                />
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
                    title: 'What Are Email Warmup Tools and How Do They Work?',
                    tag: 'Warmup',
                    href: '/blogs/email-warmup-tools-guide',
                    description: 'Learn how warmup tools protect sender reputation.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'What Factors Influence the 95–99% Email Deliverability Rate Benchmark?',
                    tag: 'Deliverability',
                    href: '/blogs/email-deliverability-rate-benchmark',
                    description: 'Understand the metrics that drive inbox placement.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                    tag: 'Cold Email',
                    href: '/blogs/10-cheapest-cold-email-software',
                    description: 'Discover affordable cold email tools for 2026.',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80&fm=webp',
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