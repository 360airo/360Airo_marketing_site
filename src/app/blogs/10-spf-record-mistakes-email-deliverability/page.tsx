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
  { id: 'mistake-1', label: '1. Publishing Multiple SPF Records', arrow: true },
  { id: 'mistake-2', label: '2. Forgetting to Authorize a Sending Service', arrow: true },
  { id: 'mistake-3', label: '3. Exceeding the SPF DNS Lookup Limit', arrow: true },
  { id: 'mistake-4', label: '4. Using an Incorrect SPF Syntax', arrow: true },
  { id: 'mistake-5', label: '5. Using +all and Authorizing Everyone', arrow: true },
  { id: 'mistake-6', label: '6. Using -all Before Your Sending Infrastructure Is Ready', arrow: true },
  { id: 'mistake-7', label: '7. Forgetting About Third-Party Email Platforms', arrow: true },
  { id: 'mistake-8', label: '8. Leaving Old SPF Entries in Place', arrow: true },
  { id: 'mistake-9', label: '9. Assuming SPF Alone Protects Your Domain', arrow: true },
  { id: 'mistake-10', label: '10. Never Checking Your SPF Record After Changes', arrow: true },
  { id: 'how-spf-affects', label: 'How SPF Affects Cold Email Deliverability', arrow: true },
  { id: 'spf-checklist', label: 'SPF Checklist for Sales Teams', arrow: true },
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
    alt: 'SPF record mistakes',
    label: 'Deliverability',
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
          SPF
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Avoid common SPF mistakes that hurt deliverability – protect your domain and reach the inbox.
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
          One record, one policy
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Each domain should have exactly one SPF record. Multiple records can invalidate your entire authentication setup.
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
          Protect your domain reputation and improve deliverability with 360Airo – manage authentication, monitor sender reputation, and scale outbound campaigns with confidence.
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

export default function BlogSPFMistakesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/spf-record-mistakes.jpg';

  return (
    <>
      <Head>
        <title>10 SPF Record Mistakes That Hurt Email Deliverability</title>
        <meta
          name="description"
          content="Avoid the top 10 SPF record mistakes that damage email deliverability – from multiple records to missing services. Learn how to fix authentication issues and reach the inbox."
        />
        <meta
          name="keywords"
          content="SPF record, email deliverability, authentication, SPF mistakes, DNS, DKIM, DMARC, sender reputation"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/spf-record-mistakes-email-deliverability"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="10 SPF Record Mistakes That Hurt Email Deliverability"
        />
        <meta
          property="og:description"
          content="Avoid the top 10 SPF record mistakes that damage email deliverability – from multiple records to missing services. Learn how to fix authentication issues and reach the inbox."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/spf-record-mistakes-email-deliverability"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="10 SPF Record Mistakes That Hurt Email Deliverability"
        />
        <meta
          name="twitter:description"
          content="Avoid the top 10 SPF record mistakes that damage email deliverability – from multiple records to missing services. Learn how to fix authentication issues and reach the inbox."
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
                  '@id': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability/#webpage',
                  'url': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability',
                  'name': '10 SPF Record Mistakes That Hurt Email Deliverability',
                  'description': 'Avoid the top 10 SPF record mistakes that damage email deliverability – from multiple records to missing services. Learn how to fix authentication issues and reach the inbox.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability/#article',
                  'headline': '10 SPF Record Mistakes That Hurt Email Deliverability',
                  'description': 'Avoid the top 10 SPF record mistakes that damage email deliverability – from multiple records to missing services. Learn how to fix authentication issues and reach the inbox.',
                  'url': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability',
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
                    '@id': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'SPF record',
                    'email deliverability',
                    'authentication',
                    'SPF mistakes',
                    'DNS',
                    'DKIM',
                    'DMARC',
                    'sender reputation',
                  ],
                  'datePublished': '2026-10-30',
                  'dateModified': '2026-10-30',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability/#breadcrumb',
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
                      'name': 'SPF Record Mistakes',
                      'item': 'https://360airo.com/blogs/spf-record-mistakes-email-deliverability',
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
                  <span className="hidden sm:inline">10 SPF Record Mistakes That Hurt Email Deliverability</span>
                  <span className="sm:hidden">SPF Record Mistakes</span>
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
                      alt="SPF record mistakes hero"
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
                    10 SPF Record Mistakes That Hurt Email Deliverability
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    SPF is a fundamental building block of email authentication, but it&apos;s easy to configure incorrectly. Discover the 10 most common SPF mistakes that hurt deliverability – and learn how to fix them.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Oct 2026</span>
                    <span>• 12 min read</span>
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
                    "SPF is one of the fundamental building blocks of email authentication. When configured correctly, it helps receiving mail servers verify whether a sending server is authorized to send email on behalf of your domain.",
                    "But SPF is also easy to configure incorrectly.",
                    "A single DNS mistake can cause legitimate emails to fail authentication, while an outdated or overly permissive SPF record can create unnecessary security and deliverability risks. For sales teams running outbound campaigns, these issues can become especially problematic when multiple email platforms, domains, and sending services are involved.",
                    "If your outbound emails are suddenly landing in spam, bouncing, or failing authentication checks, your SPF record is one of the first things worth reviewing.",
                    "Here are 10 common SPF mistakes that can hurt email deliverability—and how to fix them.",
                  ]}
                  infographic={{
                    title: 'SPF at a glance',
                    paragraphs: ['SPF is a DNS record that tells receiving servers which IPs are authorized to send email for your domain.'],
                    bullets: [
                      'One SPF record per domain',
                      'Authorizes legitimate sending services',
                      'Helps prevent spoofing and phishing',
                      'A key part of a layered authentication strategy',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 1 */}
                <ArticleSection
                  key="mistake-1"
                  id="mistake-1"
                  title="1. Publishing Multiple SPF Records"
                  showImage={true}
                  intro={[
                    "This is one of the most common SPF configuration mistakes.",
                    "A domain should have one SPF policy. If you publish multiple separate SPF TXT records beginning with v=spf1, receiving servers may treat the SPF configuration as invalid.",
                    "For example, a company might accidentally create:",
                    "v=spf1 include:provider-a.com ~all",
                    "v=spf1 include:provider-b.com ~all",
                    "Instead, the authorized services should generally be consolidated into a single SPF record.",
                    "How to fix it: Identify every legitimate service that sends email for your domain and combine the necessary mechanisms into one SPF record. Before making changes, verify which platforms actually send email on your behalf.",
                  ]}
                  infographic={{
                    title: 'One record per domain',
                    paragraphs: ['Multiple SPF records can invalidate your entire authentication setup.'],
                    bullets: [
                      'Only one SPF record is allowed',
                      'Combine all mechanisms into a single record',
                      'Check for duplicate records in DNS',
                      'Use a validation tool to confirm',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 2 */}
                <ArticleSection
                  key="mistake-2"
                  id="mistake-2"
                  title="2. Forgetting to Authorize a Sending Service"
                  showImage={false}
                  intro={[
                    "Businesses often add new tools without updating their SPF record.",
                    "For example, your marketing platform may be authorized, but your sales engagement platform isn't. Emails sent through the new platform can then fail SPF authentication.",
                    "This becomes particularly common as organizations add sales engagement platforms, marketing automation tools, CRM email systems, customer support platforms, and transactional email services.",
                    "How to fix it: Maintain a list of every legitimate service authorized to send email for your domain. Whenever you introduce a new sending provider, review whether its SPF authorization needs to be added to your existing policy.",
                  ]}
                  infographic={{
                    title: 'Keep your record current',
                    paragraphs: ['Every new sending service must be added to your SPF record.'],
                    bullets: [
                      'Sales engagement platforms',
                      'Marketing automation tools',
                      'CRM email systems',
                      'Customer support and transactional services',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 3 */}
                <ArticleSection
                  key="mistake-3"
                  id="mistake-3"
                  title="3. Exceeding the SPF DNS Lookup Limit"
                  showImage={false}
                  intro={[
                    "SPF has a limit of 10 DNS-based lookups during evaluation.",
                    "This can become a problem when your SPF record contains numerous include, a, mx, exists, or redirect mechanisms that require DNS lookups.",
                    "For example: v=spf1 include:provider1.com include:provider2.com include:provider3.com ... ~all",
                    "Each included service can potentially introduce additional DNS lookups.",
                    "How to fix it: Review your SPF dependency chain and remove services you no longer use. Avoid adding unnecessary mechanisms simply because they're available. If your organization has a complex email infrastructure, your technical team may need to optimize the SPF structure to stay within the lookup limit.",
                  ]}
                  infographic={{
                    title: 'Stay within 10 lookups',
                    paragraphs: ['Exceeding the limit can cause SPF to fail silently.'],
                    bullets: [
                      'Each include adds DNS lookups',
                      'Remove unused services',
                      'Simplify your record where possible',
                      'Use SPF flattening services if needed',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 4 */}
                <ArticleSection
                  key="mistake-4"
                  id="mistake-4"
                  title="4. Using an Incorrect SPF Syntax"
                  showImage={false}
                  intro={[
                    "SPF records follow a specific syntax. A typo or incorrectly formatted mechanism can invalidate or weaken your policy.",
                    "Common mistakes include misspelled include statements, incorrect domain names, missing mechanisms, incorrect qualifiers, extra characters, and incorrect placement of all.",
                    "For example, an incorrectly entered provider domain can prevent the intended service from being recognized as an authorized sender.",
                    "How to fix it: Don't manually guess SPF syntax. Use the SPF record provided by your email service and validate the completed record using a reputable DNS or email authentication testing tool.",
                  ]}
                  infographic={{
                    title: 'Syntax matters',
                    paragraphs: ['One typo can break your authentication.'],
                    bullets: [
                      'Use provider-generated SPF records',
                      'Validate with DNS testing tools',
                      'Avoid manual edits without verification',
                      'Watch for extra spaces or characters',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 5 */}
                <ArticleSection
                  key="mistake-5"
                  id="mistake-5"
                  title="5. Using +all and Authorizing Everyone"
                  showImage={false}
                  intro={[
                    "One of the most dangerous SPF configurations is: v=spf1 +all",
                    "This effectively indicates that any server is authorized to send email for your domain. That's the opposite of what SPF is intended to accomplish.",
                    "How to fix it: Your SPF policy should authorize only legitimate sending infrastructure. Many organizations use a terminating mechanism such as -all or ~all. The appropriate policy depends on your organization's email infrastructure and deployment stage, so changes should be made carefully.",
                  ]}
                  infographic={{
                    title: 'Never use +all',
                    paragraphs: ['+all tells providers that anyone can send as your domain – a serious security risk.'],
                    bullets: [
                      'Replace +all with ~all or -all',
                      '~all = soft fail (use during testing)',
                      '-all = hard fail (use when configuration is complete)',
                      'Only authorize legitimate senders',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 6 */}
                <ArticleSection
                  key="mistake-6"
                  id="mistake-6"
                  title="6. Using -all Before Your Sending Infrastructure Is Ready"
                  showImage={false}
                  intro={[
                    "While -all can provide a strong policy, using it prematurely can cause legitimate emails to fail SPF when you haven't included every authorized sender.",
                    "For example, if your sales platform, CRM, and marketing system all send email but only one is included in SPF, the others may fail.",
                    "How to fix it: First identify every legitimate sending service. Test the configuration and review authentication results before enforcing a strict policy. For organizations transitioning to stronger authentication, a staged approach can help identify missing senders before enforcement is tightened.",
                  ]}
                  infographic={{
                    title: 'Staged enforcement',
                    paragraphs: ['Don&apos;t move to -all until all senders are properly authorized.'],
                    bullets: [
                      'Start with ~all (soft fail)',
                      'Monitor authentication results',
                      'Identify and add missing services',
                      'Switch to -all when confident',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 7 */}
                <ArticleSection
                  key="mistake-7"
                  id="mistake-7"
                  title="7. Forgetting About Third-Party Email Platforms"
                  showImage={false}
                  intro={[
                    "Modern businesses rarely send all their email directly from their own infrastructure.",
                    "They may use different platforms for cold outreach, marketing automation, transactional email, customer support, and CRM notifications. Each service can have different authentication requirements.",
                    "How to fix it: Create an inventory of all platforms that send email using your domain. Then make sure each legitimate service is correctly configured according to the provider's documentation. Don't add a service to SPF simply because it appears in your technology stack – confirm that it actually sends email on behalf of the domain.",
                  ]}
                  infographic={{
                    title: 'Inventory your senders',
                    paragraphs: ['Every platform that sends email for your domain needs to be authorized.'],
                    bullets: [
                      'Cold outreach platforms',
                      'Marketing automation',
                      'Transactional email services',
                      'CRM notifications',
                      'Customer support systems',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 8 */}
                <ArticleSection
                  key="mistake-8"
                  id="mistake-8"
                  title="8. Leaving Old SPF Entries in Place"
                  showImage={false}
                  intro={[
                    "SPF records can become cluttered over time.",
                    "A company may stop using one email provider but forget to remove it from the SPF record. This creates unnecessary DNS dependencies and can contribute to lookup-limit problems.",
                    "How to fix it: Review your SPF record periodically. Remove discontinued platforms, old vendors, former email providers, unused domains, and redundant mechanisms. Treat SPF as a living configuration rather than something you set once and never revisit.",
                  ]}
                  infographic={{
                    title: 'Keep your record clean',
                    paragraphs: ['Old entries waste lookups and add risk.'],
                    bullets: [
                      'Remove discontinued services',
                      'Delete old vendor entries',
                      'Eliminate unused domains',
                      'Review your record every 6 months',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 9 */}
                <ArticleSection
                  key="mistake-9"
                  id="mistake-9"
                  title="9. Assuming SPF Alone Protects Your Domain"
                  showImage={true}
                  intro={[
                    "SPF is important, but it isn't a complete email authentication strategy.",
                    "SPF has limitations, particularly around the visible From address and email forwarding.",
                    "That's why modern email authentication typically uses SPF alongside DKIM and DMARC.",
                    "How to fix it: Use a layered authentication setup: SPF → DKIM → DMARC. SPF identifies authorized sending infrastructure. DKIM provides a cryptographic signature. DMARC allows domain owners to establish policy and evaluate alignment between authenticated domains and the visible From domain. Together, these mechanisms provide a much stronger authentication framework than SPF alone.",
                  ]}
                  infographic={{
                    title: 'Layer your authentication',
                    paragraphs: ['SPF is one piece – DKIM and DMARC complete the picture.'],
                    bullets: [
                      'SPF – identifies authorized senders',
                      'DKIM – cryptographic signature',
                      'DMARC – policy and alignment',
                      'Use all three for maximum protection',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Mistake 10 */}
                <ArticleSection
                  key="mistake-10"
                  id="mistake-10"
                  title="10. Never Checking Your SPF Record After Changes"
                  showImage={false}
                  intro={[
                    "Adding a new sales platform, changing email providers, or modifying your domain configuration can unintentionally break authentication.",
                    "Yet many teams never recheck SPF after making infrastructure changes.",
                    "How to fix it: Test your SPF configuration whenever you add a new sending platform, remove an email provider, change DNS settings, launch a new outbound domain, move email infrastructure, or change marketing or transactional platforms. Regular monitoring can catch configuration problems before they affect a large campaign.",
                  ]}
                  infographic={{
                    title: 'Test after every change',
                    paragraphs: ['Any infrastructure change can affect your SPF record.'],
                    bullets: [
                      'Add new sending platform → test SPF',
                      'Remove email provider → test SPF',
                      'Change DNS settings → test SPF',
                      'Launch new domain → test SPF',
                      'Monitor with validation tools',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How SPF Affects */}
                <ArticleSection
                  key="how-spf-affects"
                  id="how-spf-affects"
                  title="How SPF Affects Cold Email Deliverability"
                  showImage={false}
                  intro={[
                    "SPF doesn't directly determine whether your email reaches the inbox. Instead, it is one part of the broader authentication and sender-reputation system that receiving providers use when evaluating email.",
                    "A healthy outbound setup should consider SPF, DKIM, DMARC, domain reputation, IP reputation where applicable, bounce rates, spam complaints, sending volume, recipient engagement, and list quality.",
                    "This distinction is important. Passing SPF doesn't guarantee inbox placement. You can have a perfectly valid SPF record and still have your emails filtered if your domain has a poor reputation or your campaigns generate negative engagement.",
                  ]}
                  infographic={{
                    title: 'SPF is not a silver bullet',
                    paragraphs: ['Authentication is necessary but not sufficient for inbox placement.'],
                    bullets: [
                      'SPF + DKIM + DMARC = strong authentication',
                      'Reputation and engagement also matter',
                      'Valid SPF doesn&apos;t guarantee inbox placement',
                      'Monitor all factors together',
                    ],
                  }}
                  blocks={[]}
                />

                {/* SPF Checklist */}
                <ArticleSection
                  key="spf-checklist"
                  id="spf-checklist"
                  title="SPF Checklist for Sales Teams"
                  showImage={false}
                  intro={[
                    "Before launching a new outbound campaign, review your SPF setup:",
                  ]}
                  infographic={{
                    title: 'Quick checklist',
                    paragraphs: ['Run through these items before sending at scale.'],
                    bullets: [
                      '☐ There is only one SPF record for the domain.',
                      '☐ Every legitimate sending service is accounted for.',
                      '☐ The SPF record stays within the DNS lookup limit.',
                      '☐ Provider domains are spelled correctly.',
                      '☐ Unused services have been removed.',
                      '☐ The SPF syntax has been validated.',
                      '☐ Your policy isn&apos;t accidentally authorizing everyone.',
                      '☐ Strict enforcement isn&apos;t enabled before all legitimate senders are covered.',
                      '☐ SPF is used alongside DKIM and DMARC.',
                      '☐ The record is reviewed whenever your sending infrastructure changes.',
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
                    "SPF may look like a simple DNS record, but small configuration mistakes can create significant authentication and deliverability problems.",
                    "The most common issues are surprisingly straightforward: multiple SPF records, missing sending services, excessive DNS lookups, incorrect syntax, outdated entries, and assuming SPF alone is enough.",
                    "For sales teams, the stakes are even higher when outbound email depends on multiple sending platforms and inboxes. A poorly maintained authentication setup can make it harder for legitimate emails to establish trust with receiving providers.",
                    "The best approach is to treat SPF as part of a broader email authentication and deliverability strategy. Keep your record accurate, authorize only legitimate senders, monitor changes, and pair SPF with DKIM and DMARC.",
                    "Outbound platforms such as 360Airo can also help sales teams manage sending infrastructure and campaign workflows more systematically, but no platform can compensate for fundamentally broken domain authentication.",
                    "Get the authentication basics right first. Then scale your outbound.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams manage authentication, monitor deliverability, and scale outbound campaigns with confidence – all from one platform.',
                      'Start with a strong foundation, then grow your outreach.',
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
                    title: '8 Reasons Your Emails Go to Spam (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/reasons-emails-go-to-spam-and-how-to-fix',
                    description: 'Learn the top 8 reasons your emails go to spam – and how to fix them.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/common-cold-email-mistakes-reply-rates',
                    description: 'Avoid these 7 common cold email mistakes that destroy reply rates.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: '5 Seamless.AI Alternatives & Competitors for Lead Finding (2026)',
                    tag: 'Listicles',
                    href: '/blogs/seamless-ai-alternatives-lead-finding',
                    description: 'Compare the top 5 Seamless.AI alternatives for lead finding.',
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