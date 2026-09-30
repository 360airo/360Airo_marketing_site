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
  { id: 'tip-1', label: '1. Authenticate Your Sending Domain', arrow: true },
  { id: 'tip-2', label: '2. Protect Your Domain Reputation', arrow: true },
  { id: 'tip-3', label: '3. Warm Up New Email Accounts Gradually', arrow: true },
  { id: 'tip-4', label: '4. Don\'t Send Huge Volumes From One Inbox', arrow: true },
  { id: 'tip-5', label: '5. Use a High-Quality Prospect List', arrow: true },
  { id: 'tip-6', label: '6. Keep Your Bounce Rate Low', arrow: true },
  { id: 'tip-7', label: '7. Avoid Spammy Email Copy', arrow: true },
  { id: 'tip-8', label: '8. Keep Your Emails Relevant', arrow: true },
  { id: 'tip-9', label: '9. Personalize Your Outreach', arrow: true },
  { id: 'tip-10', label: '10. Make Unsubscribing Easy', arrow: true },
  { id: 'tip-11', label: '11. Monitor Your Sender Reputation', arrow: true },
  { id: 'tip-12', label: '12. Don\'t Ignore Email Engagement', arrow: true },
  { id: 'tip-13', label: '13. Maintain Consistent Sending Patterns', arrow: true },
  { id: 'tip-14', label: '14. Separate Marketing and Sales Sending Infrastructure', arrow: true },
  { id: 'tip-15', label: '15. Continuously Test and Optimize', arrow: true },
  { id: 'checklist', label: 'Email Deliverability Checklist', arrow: true },
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
    alt: 'Email deliverability tips',
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
          Deliverability
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Protect your sender reputation and improve inbox placement with these 15 proven tips.
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
          Deliverability is foundational
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Great copy and targeting mean nothing if your emails never reach the inbox. Build deliverability into your outbound process from day one.
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
          Improve your email deliverability with 360Airo – automate inbox warm-up, monitor sender reputation, verify lists, and scale campaigns with confidence.
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

export default function BlogDeliverabilityTipsPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/email-deliverability-tips.jpg';

  return (
    <>
      <Head>
        <title>15 Email Deliverability Tips Every Sales Team Should Know</title>
        <meta
          name="description"
          content="Master email deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns. Protect your inbox placement."
        />
        <meta
          name="keywords"
          content="email deliverability, inbox placement, sender reputation, SPF DKIM DMARC, bounce rate, cold email, sales outreach"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/email-deliverability-tips-sales-teams"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="15 Email Deliverability Tips Every Sales Team Should Know"
        />
        <meta
          property="og:description"
          content="Master email deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns. Protect your inbox placement."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/email-deliverability-tips-sales-teams"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="15 Email Deliverability Tips Every Sales Team Should Know"
        />
        <meta
          name="twitter:description"
          content="Master email deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns. Protect your inbox placement."
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
                  '@id': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams/#webpage',
                  'url': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams',
                  'name': '15 Email Deliverability Tips Every Sales Team Should Know',
                  'description': 'Master email deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns. Protect your inbox placement.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams/#article',
                  'headline': '15 Email Deliverability Tips Every Sales Team Should Know',
                  'description': 'Master email deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns. Protect your inbox placement.',
                  'url': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams',
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
                    '@id': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'email deliverability',
                    'inbox placement',
                    'sender reputation',
                    'SPF DKIM DMARC',
                    'bounce rate',
                    'cold email',
                    'sales outreach',
                  ],
                  'datePublished': '2026-11-06',
                  'dateModified': '2026-11-06',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams/#breadcrumb',
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
                      'name': 'Email Deliverability Tips',
                      'item': 'https://360airo.com/blogs/email-deliverability-tips-sales-teams',
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
                  <span className="hidden sm:inline">15 Email Deliverability Tips Every Sales Team Should Know</span>
                  <span className="sm:hidden">Deliverability Tips</span>
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
                      alt="Email deliverability tips hero"
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
                    15 Email Deliverability Tips Every Sales Team Should Know
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Great copy and precise targeting mean nothing if your emails never reach the inbox. Master deliverability with 15 proven tips – from authentication and reputation management to list quality, engagement, and sending patterns.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 12 min read</span>
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
                    "A cold email campaign can have great copy, precise targeting, and a compelling offer—but none of it matters if your emails don't reach the inbox.",
                    "Email deliverability is the foundation of successful outbound sales. It determines whether your messages reach the primary inbox, get filtered into spam, or fail to reach the recipient altogether. As email providers become more sophisticated at identifying unwanted or low-quality messages, sales teams need to pay closer attention to their sending infrastructure, domain reputation, list quality, and campaign behavior.",
                    "For B2B teams, deliverability isn't something you fix once and forget. It requires ongoing monitoring and good sending practices.",
                    "Here are 15 email deliverability tips every sales team should follow to protect sender reputation and improve inbox placement.",
                  ]}
                  infographic={{
                    title: 'Deliverability matters',
                    paragraphs: ['Great copy and targeting mean nothing if your emails never reach the inbox.'],
                    bullets: [
                      'Authentication builds trust',
                      'Reputation takes time to build and is easily damaged',
                      'List quality directly impacts deliverability',
                      'Engagement signals influence filtering decisions',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 1 */}
                <ArticleSection
                  key="tip-1"
                  id="tip-1"
                  title="1. Authenticate Your Sending Domain"
                  showImage={true}
                  intro={[
                    "Your first priority should be establishing a properly authenticated sending domain.",
                    "Email providers use authentication protocols to verify that messages are genuinely being sent by authorized sources. The three key standards sales teams should understand are:",
                    "SPF: Identifies which servers are authorized to send emails for your domain.",
                    "DKIM: Adds a digital signature that helps verify message authenticity.",
                    "DMARC: Builds on SPF and DKIM and tells receiving servers how to handle messages that fail authentication.",
                    "Set up these records correctly before scaling outbound campaigns.",
                    "Authentication doesn't guarantee inbox placement, but it establishes the technical foundation for a trustworthy sending identity.",
                  ]}
                  infographic={{
                    title: 'The authentication trifecta',
                    paragraphs: ['SPF, DKIM, and DMARC work together to prove your emails are legitimate.'],
                    bullets: [
                      'SPF – authorizes sending servers',
                      'DKIM – cryptographic signature',
                      'DMARC – policy for authentication failures',
                      'Configure correctly before scaling',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 2 */}
                <ArticleSection
                  key="tip-2"
                  id="tip-2"
                  title="2. Protect Your Domain Reputation"
                  showImage={false}
                  intro={[
                    "Your domain reputation influences how email providers perceive your messages.",
                    "A history of high bounce rates, spam complaints, or poor engagement can make future emails more likely to be filtered.",
                    "Protect your reputation by sending to verified contacts, maintaining reasonable sending volumes, avoiding spam-heavy messaging, monitoring bounce rates, removing problematic contacts, and responding to deliverability warnings quickly.",
                    "Think of your domain reputation as an asset. It takes time to establish and can be damaged surprisingly quickly.",
                  ]}
                  infographic={{
                    title: 'Protect your reputation',
                    paragraphs: ['Your reputation is built on recipient responses and provider feedback.'],
                    bullets: [
                      'Send to verified contacts only',
                      'Maintain reasonable sending volumes',
                      'Monitor bounce rates closely',
                      'Remove problematic contacts immediately',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 3 */}
                <ArticleSection
                  key="tip-3"
                  id="tip-3"
                  title="3. Warm Up New Email Accounts Gradually"
                  showImage={false}
                  intro={[
                    "New domains and mailboxes shouldn't immediately send hundreds of cold emails every day.",
                    "Gradually increasing sending activity helps establish a history of legitimate email behavior.",
                    "A warm-up strategy should focus on gradually increasing volume rather than suddenly moving from a handful of emails to large-scale outreach.",
                    "This is particularly important when setting up new domains or inboxes specifically for outbound sales.",
                  ]}
                  infographic={{
                    title: 'Warm up properly',
                    paragraphs: ['Build trust slowly – don&apos;t spike your sending volume from day one.'],
                    bullets: [
                      'Start with a few emails per day',
                      'Increase volume gradually over 2‑4 weeks',
                      'Monitor bounce rates during warm‑up',
                      'Don&apos;t launch large campaigns immediately',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 4 */}
                <ArticleSection
                  key="tip-4"
                  id="tip-4"
                  title="4. Don't Send Huge Volumes From One Inbox"
                  showImage={false}
                  intro={[
                    "Sending your entire campaign through a single mailbox creates unnecessary risk.",
                    "If one inbox suddenly sends an unusually large number of cold emails, receiving providers may view that activity as suspicious.",
                    "Instead, sales teams scaling outbound should distribute sending appropriately across healthy, authenticated mailboxes and maintain sensible limits for each account.",
                    "The objective isn't to maximize the number of emails sent per inbox. It's to build a sustainable sending system.",
                  ]}
                  infographic={{
                    title: 'Distribute your sending',
                    paragraphs: ['One inbox sending thousands of emails looks suspicious – spread the load.'],
                    bullets: [
                      'Use multiple authenticated mailboxes',
                      'Keep per‑inbox volume reasonable',
                      'Rotate sending accounts',
                      'Build a sustainable infrastructure',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 5 */}
                <ArticleSection
                  key="tip-5"
                  id="tip-5"
                  title="5. Use a High-Quality Prospect List"
                  showImage={false}
                  intro={[
                    "List quality has a direct impact on deliverability.",
                    "Sending emails to invalid addresses increases bounce rates and signals that your campaigns may be poorly targeted.",
                    "Before launching a campaign, verify email addresses, remove duplicates, remove outdated contacts, check domains, and suppress previous hard bounces.",
                    "Don't purchase massive databases simply because they offer thousands of contacts. A smaller, accurate list is much safer and more useful.",
                  ]}
                  infographic={{
                    title: 'Quality over quantity',
                    paragraphs: ['A smaller, accurate list beats a massive, outdated one every time.'],
                    bullets: [
                      'Verify every email address',
                      'Remove duplicates and outdated contacts',
                      'Suppress previous hard bounces',
                      'Don&apos;t rely on purchased databases',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 6 */}
                <ArticleSection
                  key="tip-6"
                  id="tip-6"
                  title="6. Keep Your Bounce Rate Low"
                  showImage={false}
                  intro={[
                    "Bounces occur when emails cannot be delivered to the intended recipient.",
                    "Hard bounces are particularly problematic because they often indicate that an address doesn't exist or cannot receive mail.",
                    "Monitor bounce rates after every campaign. If they suddenly increase, pause your campaign and investigate.",
                    "Potential causes include outdated databases, poor email verification, incorrect domains, sending to inactive addresses, and data-entry errors.",
                    "A clean list is one of your strongest defenses against unnecessary bounces.",
                  ]}
                  infographic={{
                    title: 'Watch your bounce rate',
                    paragraphs: ['High bounce rates damage your reputation and hurt future deliverability.'],
                    bullets: [
                      'Monitor bounce rates after every campaign',
                      'Investigate sudden increases immediately',
                      'Remove hard bounces permanently',
                      'Keep bounce rate below 3‑5%',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 7 */}
                <ArticleSection
                  key="tip-7"
                  id="tip-7"
                  title="7. Avoid Spammy Email Copy"
                  showImage={false}
                  intro={[
                    "Deliverability isn't purely a technical problem. Your content also matters.",
                    "Excessive promotional language, misleading claims, and aggressive formatting can increase the likelihood of your emails being filtered.",
                    "Avoid ALL CAPS, excessive exclamation marks, misleading subject lines, fake urgency, overly promotional claims, excessive links, and suspicious attachments.",
                    "Write like a person starting a professional conversation rather than a marketer broadcasting an advertisement.",
                  ]}
                  infographic={{
                    title: 'Write like a professional',
                    paragraphs: ['Conversational, relevant emails outperform aggressive sales copy.'],
                    bullets: [
                      'Avoid ALL CAPS and excessive punctuation',
                      'Skip misleading claims and fake urgency',
                      'Limit links and images',
                      'Write like a real person, not a marketer',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 8 */}
                <ArticleSection
                  key="tip-8"
                  id="tip-8"
                  title="8. Keep Your Emails Relevant"
                  showImage={false}
                  intro={[
                    "Engagement signals can influence how receiving providers evaluate future messages from your domain.",
                    "If recipients consistently ignore your emails or mark them as unwanted, that's a warning sign.",
                    "Relevance starts with targeting. Make sure the recipient fits your ICP, has a plausible need for your solution, holds a relevant role, and is in an appropriate market.",
                    "The better your targeting, the more likely recipients are to engage positively.",
                  ]}
                  infographic={{
                    title: 'Relevance drives engagement',
                    paragraphs: ['Targeting the right people is the first step to positive engagement.'],
                    bullets: [
                      'Define your ICP clearly',
                      'Ensure prospects have a plausible need',
                      'Target relevant roles and markets',
                      'Relevance builds positive engagement',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 9 */}
                <ArticleSection
                  key="tip-9"
                  id="tip-9"
                  title="9. Personalize Your Outreach"
                  showImage={false}
                  intro={[
                    "Personalization isn't just useful for improving response rates. It can also contribute to healthier engagement when done properly.",
                    "Instead of sending the same message to everyone, tailor emails around relevant information such as company, role, industry, business challenge, recent company activity, and relevant use case.",
                    "However, personalization should be accurate. Incorrect or obviously automated information can have the opposite effect.",
                    "AI-powered personalization can help sales teams research prospects and create relevant messaging at scale without manually writing every email.",
                  ]}
                  infographic={{
                    title: 'Personalize with purpose',
                    paragraphs: ['Relevant personalization improves engagement and response rates.'],
                    bullets: [
                      'Reference company, role, and industry',
                      'Mention recent activity or challenges',
                      'Use accurate, researched information',
                      'AI can help scale personalization',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 10 */}
                <ArticleSection
                  key="tip-10"
                  id="tip-10"
                  title="10. Make Unsubscribing Easy"
                  showImage={false}
                  intro={[
                    "Not every prospect will want to hear from you.",
                    "Making it easy for recipients to opt out is better than forcing uninterested people to mark your email as spam.",
                    "Maintain a clear suppression process so that contacts who unsubscribe aren't accidentally added to future campaigns.",
                    "Respecting opt-outs also helps protect your sender reputation and supports responsible email outreach.",
                  ]}
                  infographic={{
                    title: 'Respect opt‑outs',
                    paragraphs: ['An easy unsubscribe is better than a spam complaint.'],
                    bullets: [
                      'Include a clear unsubscribe link',
                      'Maintain a suppression list',
                      'Don&apos;t re‑add unsubscribed contacts',
                      'Protect your reputation by respecting preferences',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 11 */}
                <ArticleSection
                  key="tip-11"
                  id="tip-11"
                  title="11. Monitor Your Sender Reputation"
                  showImage={false}
                  intro={[
                    "Don't wait until emails start landing in spam before investigating deliverability.",
                    "Monitor your sending reputation regularly and watch for changes in bounce rates, spam complaints, engagement, delivery rates, domain health, and authentication issues.",
                    "If performance changes suddenly, investigate before increasing campaign volume.",
                    "Early detection can prevent a small deliverability problem from becoming a much larger one.",
                  ]}
                  infographic={{
                    title: 'Monitor continuously',
                    paragraphs: ['Catch deliverability issues early before they affect large campaigns.'],
                    bullets: [
                      'Track bounce rates and spam complaints',
                      'Monitor engagement and delivery rates',
                      'Check domain health regularly',
                      'Investigate sudden changes immediately',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 12 */}
                <ArticleSection
                  key="tip-12"
                  id="tip-12"
                  title="12. Don't Ignore Email Engagement"
                  showImage={false}
                  intro={[
                    "Deliverability and engagement are closely connected.",
                    "If your campaigns consistently generate no replies or interaction, it may indicate that your audience, messaging, or sending strategy needs improvement.",
                    "Look beyond opens and track reply rate, positive reply rate, bounce rate, unsubscribe rate, and meetings generated.",
                    "If prospects aren't engaging, don't simply send more emails. Review your targeting and messaging first.",
                  ]}
                  infographic={{
                    title: 'Engagement signals matter',
                    paragraphs: ['Low engagement tells providers your emails aren&apos;t valuable to recipients.'],
                    bullets: [
                      'Track reply rate and positive replies',
                      'Monitor unsubscribe rate',
                      'Measure meetings generated',
                      'Review targeting and messaging if engagement is low',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 13 */}
                <ArticleSection
                  key="tip-13"
                  id="tip-13"
                  title="13. Maintain Consistent Sending Patterns"
                  showImage={false}
                  intro={[
                    "Sudden changes in sending behavior can create unnecessary deliverability risks.",
                    "For example, sending a small number of emails for several weeks and then suddenly launching a massive campaign creates a significant change in activity.",
                    "Maintain relatively consistent sending patterns and scale gradually.",
                    "Consistency is particularly important when expanding your outbound program.",
                  ]}
                  infographic={{
                    title: 'Stay consistent',
                    paragraphs: ['Predictable sending patterns build trust with email providers.'],
                    bullets: [
                      'Avoid sudden volume spikes',
                      'Scale gradually over time',
                      'Maintain steady daily volumes',
                      'Consistency builds reputation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 14 */}
                <ArticleSection
                  key="tip-14"
                  id="tip-14"
                  title="14. Separate Marketing and Sales Sending Infrastructure"
                  showImage={false}
                  intro={[
                    "If your organization sends newsletters, transactional emails, and cold sales outreach, consider how these activities affect your overall email infrastructure.",
                    "Sales outreach and marketing campaigns have different sending patterns and audiences.",
                    "Separating infrastructure appropriately can help isolate reputation risks and make it easier to monitor performance.",
                    "For example, businesses may use dedicated subdomains or separate sending infrastructure for different email functions, depending on their technical setup and compliance requirements.",
                  ]}
                  infographic={{
                    title: 'Separate sending streams',
                    paragraphs: ['Marketing and sales emails have different patterns – isolate them.'],
                    bullets: [
                      'Use dedicated subdomains for sales outreach',
                      'Separate transactional and marketing email',
                      'Isolate reputation risks',
                      'Monitor each stream independently',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Tip 15 */}
                <ArticleSection
                  key="tip-15"
                  id="tip-15"
                  title="15. Continuously Test and Optimize"
                  showImage={true}
                  intro={[
                    "Deliverability isn't a 'set it and forget it' activity.",
                    "Email providers change their filtering systems, audiences change, and your sending patterns evolve.",
                    "Regularly review authentication, bounce rates, sending volumes, campaign engagement, domain reputation, list quality, and spam complaints.",
                    "If something changes unexpectedly, investigate before scaling further.",
                    "The best sales teams treat deliverability as an ongoing operational process rather than a technical task handled once during setup.",
                  ]}
                  infographic={{
                    title: 'Optimize continuously',
                    paragraphs: ['Deliverability is an ongoing process – not a one‑time setup.'],
                    bullets: [
                      'Review authentication regularly',
                      'Monitor bounce rates and sending volumes',
                      'Track engagement and domain reputation',
                      'Investigate unexpected changes immediately',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Checklist */}
                <ArticleSection
                  key="checklist"
                  id="checklist"
                  title="Email Deliverability Checklist"
                  showImage={false}
                  intro={[
                    "Before launching your next outbound campaign, make sure you've covered the essentials:",
                  ]}
                  infographic={{
                    title: 'Pre‑launch checklist',
                    paragraphs: ['Run through these items before sending at scale.'],
                    bullets: [
                      '☐ SPF is configured correctly',
                      '☐ DKIM is enabled',
                      '☐ DMARC is configured',
                      '☐ Sending domains and inboxes are healthy',
                      '☐ New mailboxes have been appropriately warmed',
                      '☐ Prospect emails have been verified',
                      '☐ Previous bounces have been suppressed',
                      '☐ Sending volume is appropriate',
                      '☐ Email copy isn&apos;t overly promotional',
                      '☐ Prospects are relevant to the campaign',
                      '☐ Personalization is accurate',
                      '☐ Unsubscribe handling is in place',
                      '☐ Sender reputation is being monitored',
                      '☐ Campaign performance is tracked',
                      '☐ Sending volume will be scaled gradually',
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
                    "Email deliverability is one of the most important—and most overlooked—parts of outbound sales.",
                    "A strong campaign requires more than compelling copy. Your domain needs to be authenticated, your sending infrastructure needs to be healthy, your prospect data needs to be accurate, and your campaigns need to generate genuine engagement.",
                    "The biggest mistake sales teams can make is treating deliverability as something that can be repaired after a campaign starts landing in spam. By then, sender reputation may already have suffered.",
                    "Instead, build deliverability into your outbound process from the beginning.",
                    "Modern outbound platforms can simplify many of these tasks by combining inbox management, warm-up, campaign controls, personalization, sequencing, and performance monitoring in one workflow. For teams using 360Airo, these capabilities help create a more structured approach to outbound while allowing sales teams to scale personalized campaigns without relying entirely on manual processes.",
                    "Ultimately, good deliverability comes down to one principle: send relevant emails to the right people from a healthy sending infrastructure—and do it consistently.",
                    "When those fundamentals are in place, your sales team has a much better chance of reaching the inbox and generating conversations.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps sales teams manage deliverability with inbox warm‑up, sender reputation monitoring, email verification, and campaign analytics – all from one platform.',
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
                  {
                    title: '12 Email Authentication Methods Explained: A Complete Guide for Sales Teams',
                    tag: 'Listicles',
                    href: '/blogs/email-authentication-methods-complete-guide',
                    description: 'Learn the 12 essential email authentication methods for B2B sales teams.',
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