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
  { id: 'mistake-1', label: '1. Targeting the Wrong Audience', arrow: true },
  { id: 'mistake-2', label: '2. Sending Generic Template‑Based Emails', arrow: true },
  { id: 'mistake-3', label: '3. Ignoring Email Deliverability', arrow: true },
  { id: 'mistake-4', label: '4. Writing Weak Subject Lines', arrow: true },
  { id: 'mistake-5', label: '5. Talking Too Much About Your Company', arrow: true },
  { id: 'mistake-6', label: '6. Including Multiple Calls‑to‑Action', arrow: true },
  { id: 'mistake-7', label: '7. Neglecting Follow‑Up Emails', arrow: true },
  { id: 'mistake-8', label: '8. Sending Too Many Emails Too Quickly', arrow: true },
  { id: 'mistake-9', label: '9. Skipping Email Verification', arrow: true },
  { id: 'mistake-10', label: '10. Poor Audience Segmentation', arrow: true },
  { id: 'mistake-11', label: '11. Overlooking Mobile Optimization', arrow: true },
  { id: 'mistake-12', label: '12. Failing to Test Before Launch', arrow: true },
  { id: 'mistake-13', label: '13. Ignoring Campaign Analytics', arrow: true },
  { id: 'mistake-14', label: '14. Giving Up Too Early', arrow: true },
  { id: 'mistake-15', label: '15. Relying on Manual Processes', arrow: true },
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
    alt: 'Outbound email mistakes',
    label: 'Outbound Email',
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
          Outbound
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Avoid common pitfalls and launch email campaigns that reach inboxes and generate replies.
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
          A smaller, targeted list with personalized emails will always outperform a massive generic blast.
        </p>
      </div>
    </aside>
  );
}

export default function BlogTop15MistakesOutboundEmailPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/top-15-mistakes-outbound-email.jpg';

  return (
    <>
      <Head>
        <title>Top 15 Mistakes That Kill Outbound Email Campaign Performance</title>
        <meta
          name="description"
          content="Avoid the most common outbound email mistakes that hurt deliverability, reply rates, and sender reputation. Learn how to fix them and launch campaigns that generate real conversations."
        />
        <meta
          name="keywords"
          content="outbound email mistakes, email campaign performance, deliverability, cold email, sender reputation, reply rates, prospect targeting, email personalization"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/top-15-mistakes-outbound-email"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Top 15 Mistakes That Kill Outbound Email Campaign Performance"
        />
        <meta
          property="og:description"
          content="Avoid the most common outbound email mistakes that hurt deliverability, reply rates, and sender reputation. Learn how to fix them and launch campaigns that generate real conversations."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/top-15-mistakes-outbound-email"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top 15 Mistakes That Kill Outbound Email Campaign Performance"
        />
        <meta
          name="twitter:description"
          content="Avoid the most common outbound email mistakes that hurt deliverability, reply rates, and sender reputation. Learn how to fix them and launch campaigns that generate real conversations."
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
                  '@id': 'https://360airo.com/blogs/top-15-mistakes-outbound-email/#webpage',
                  'url': 'https://360airo.com/blogs/top-15-mistakes-outbound-email',
                  'name': 'Top 15 Mistakes That Kill Outbound Email Campaign Performance',
                  'description': 'Avoid the most common outbound email mistakes that hurt deliverability, reply rates, and sender reputation. Learn how to fix them and launch campaigns that generate real conversations.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/top-15-mistakes-outbound-email/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/top-15-mistakes-outbound-email/#article',
                  'headline': 'Top 15 Mistakes That Kill Outbound Email Campaign Performance',
                  'description': 'Avoid the most common outbound email mistakes that hurt deliverability, reply rates, and sender reputation. Learn how to fix them and launch campaigns that generate real conversations.',
                  'url': 'https://360airo.com/blogs/top-15-mistakes-outbound-email',
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
                    '@id': 'https://360airo.com/blogs/top-15-mistakes-outbound-email/#webpage',
                  },
                  'articleSection': 'Outbound Email',
                  'keywords': [
                    'outbound email mistakes',
                    'email campaign performance',
                    'deliverability',
                    'cold email',
                    'sender reputation',
                    'reply rates',
                    'prospect targeting',
                    'email personalization',
                  ],
                  'datePublished': '2026-09-25',
                  'dateModified': '2026-09-25',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/top-15-mistakes-outbound-email/#breadcrumb',
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
                      'name': 'Top 15 Mistakes That Kill Outbound Email',
                      'item': 'https://360airo.com/blogs/top-15-mistakes-outbound-email',
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
                <Link href="/blogs?category=outbound" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                  Outbound
                </Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Top 15 Mistakes That Kill Outbound Email Campaign Performance</span>
                  <span className="sm:hidden">Outbound Email Mistakes</span>
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
                      alt="Top 15 outbound email mistakes hero"
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
                    Outbound Email
                  </p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Top 15 Mistakes That Kill Outbound Email Campaign Performance
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Outbound email remains one of the most effective B2B sales channels, but simple mistakes can destroy your deliverability, reply rates, and sender reputation. Learn how to avoid the most common pitfalls.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Sep 2026</span>
                    <span>• 10 min read</span>
                    <span>• 2.8K reads</span>
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
                    "Outbound email remains one of the most effective B2B sales channels, but simply sending more emails doesn't guarantee better results. Many campaigns fail—not because the product is poor or the audience is wrong—but because of avoidable mistakes that reduce deliverability, lower reply rates, and weaken sender reputation.",
                    "Today's buyers receive dozens of sales emails every day. If your message isn't relevant, personalized, or timed correctly, it will likely be ignored—or worse, marked as spam.",
                    "The good news is that most outbound email mistakes are preventable. By identifying common pitfalls before launching your campaigns, you can improve inbox placement, generate more conversations, and maximize your return on every email sent.",
                    "In this guide, we'll explore the top mistakes that hurt outbound email campaign performance and how you can avoid them.",
                  ]}
                  infographic={{
                    title: 'The cost of mistakes',
                    paragraphs: ['Most outbound email failures come from preventable mistakes—not from poor products or bad lists. Fixing these issues can dramatically improve performance.'],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-1"
                  id="mistake-1"
                  title="1. Targeting the Wrong Audience"
                  showImage={false}
                  intro={[
                    "No amount of personalization can fix a poor prospect list.",
                    "Many sales teams cast a wide net, hoping higher email volume will generate more replies. Instead, they end up contacting people who have no need, authority, or budget for their solution.",
                    "Before launching a campaign, define your Ideal Customer Profile (ICP) based on factors such as industry, company size, job title, geography, revenue, and buying intent.",
                  ]}
                  infographic={{
                    title: 'Define your ICP',
                    paragraphs: ['A smaller, well‑qualified audience almost always outperforms a large, generic list.'],
                    bullets: [
                      'Industry',
                      'Company size',
                      'Job title',
                      'Geography',
                      'Revenue',
                      'Buying intent',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-2"
                  id="mistake-2"
                  title="2. Sending Generic, Template‑Based Emails"
                  showImage={true}
                  intro={[
                    "Modern buyers can recognize mass-produced emails instantly.",
                    "Messages that sound identical except for the recipient's first name rarely create meaningful engagement. Prospects expect outreach that demonstrates an understanding of their business and challenges.",
                    "Instead of relying on static templates, personalize your emails using information such as company initiatives, industry trends, LinkedIn activity, website messaging, and recent announcements.",
                  ]}
                  infographic={{
                    title: 'Personalization signals',
                    paragraphs: ['Relevant emails build trust and significantly improve reply rates.'],
                    bullets: [
                      'Company initiatives',
                      'Industry trends',
                      'LinkedIn activity',
                      'Website messaging',
                      'Recent announcements',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-3"
                  id="mistake-3"
                  title="3. Ignoring Email Deliverability"
                  showImage={false}
                  intro={[
                    "Deliverability is often overlooked because it isn't visible—but it directly impacts campaign performance.",
                    "If your emails land in spam folders, your prospects never have the opportunity to respond.",
                    "Common deliverability mistakes include sending from new domains without warming them up, missing SPF, DKIM, or DMARC records, sending too many emails too quickly, and using poor-quality email lists.",
                  ]}
                  infographic={{
                    title: 'Deliverability checklist',
                    paragraphs: ['Monitor sender reputation and authenticate your domain for strong inbox placement.'],
                    bullets: [
                      'Warm up new domains gradually',
                      'Set up SPF, DKIM, and DMARC',
                      'Keep sending volumes steady and moderate',
                      'Use verified email lists',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-4"
                  id="mistake-4"
                  title="4. Writing Weak Subject Lines"
                  showImage={false}
                  intro={[
                    "Your subject line determines whether your email gets opened.",
                    "Long, promotional, or clickbait-style subject lines often discourage recipients from engaging.",
                    "Avoid ALL CAPS, excessive punctuation, spam-trigger words, and misleading claims. Instead, write subject lines that are short, relevant, and conversational.",
                  ]}
                  infographic={{
                    title: 'Subject line best practices',
                    paragraphs: ['Even small improvements in open rates can have a significant impact.'],
                    bullets: [
                      'Keep it short (4‑6 words)',
                      'Make it relevant to the prospect',
                      'Avoid spam triggers',
                      'Use a conversational tone',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-5"
                  id="mistake-5"
                  title="5. Talking Too Much About Your Company"
                  showImage={false}
                  intro={[
                    "One of the most common outbound mistakes is making the email entirely about your business.",
                    "Prospects don't care how long you've been in business or how many awards you've won—they care about solving their own problems.",
                    "Shift the focus from your company to the prospect's challenges, goals, and opportunities. Demonstrate how your solution addresses their specific needs rather than listing product features.",
                  ]}
                  infographic={{
                    title: 'Focus on the prospect',
                    paragraphs: ['Prospects care about their problems, not your company history.'],
                    bullets: [
                      'Highlight their challenges',
                      'Show how you solve them',
                      'Avoid feature dumps',
                      'Keep the spotlight on them',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-6"
                  id="mistake-6"
                  title="6. Including Multiple Calls‑to‑Action"
                  showImage={false}
                  intro={[
                    "Every outbound email should guide the recipient toward one clear next step.",
                    "Asking prospects to book a demo, visit your website, download a guide, reply to your email, and follow you on LinkedIn all within the same message creates decision fatigue.",
                    "Choose one CTA and make it easy to act on.",
                  ]}
                  infographic={{
                    title: 'One CTA per email',
                    paragraphs: ['A single, clear call‑to‑action increases response rates.'],
                    bullets: [
                      'Focus on one desired action',
                      'Make it simple and low‑commitment',
                      'Avoid overwhelming the reader',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-7"
                  id="mistake-7"
                  title="7. Neglecting Follow‑Up Emails"
                  showImage={true}
                  intro={[
                    "Many positive replies don't come from the first email.",
                    "Busy decision-makers often intend to respond but simply forget. Giving up after one email means missing valuable opportunities.",
                    "Create a follow-up sequence where each email adds new value rather than repeating the same request. Share customer success stories, industry insights, different use cases, or helpful resources.",
                  ]}
                  infographic={{
                    title: 'Follow‑up best practices',
                    paragraphs: ['Persistence, when done respectfully, often leads to better results.'],
                    bullets: [
                      'Add new value each time',
                      'Space follow‑ups appropriately',
                      'Keep the conversation going',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-8"
                  id="mistake-8"
                  title="8. Sending Too Many Emails Too Quickly"
                  showImage={false}
                  intro={[
                    "High email volume isn't always a sign of an effective outbound strategy.",
                    "Sending thousands of emails from a single domain within a short period increases the likelihood of spam complaints and damages your sender reputation.",
                    "Instead, gradually scale your campaigns, distribute sending across multiple inboxes when appropriate, and maintain consistent daily sending volumes. A healthy sender reputation is built over time.",
                  ]}
                  infographic={{
                    title: 'Scale gradually',
                    paragraphs: ['Build reputation slowly to avoid spam filters.'],
                    bullets: [
                      'Increase volume incrementally',
                      'Use multiple sending domains',
                      'Keep daily volumes steady',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-9"
                  id="mistake-9"
                  title="9. Skipping Email Verification"
                  showImage={false}
                  intro={[
                    "Invalid email addresses lead to higher bounce rates, which can negatively affect deliverability.",
                    "Before every campaign, verify email addresses, remove duplicates, delete inactive contacts, and clean outdated records.",
                    "A clean contact database helps protect your domain while improving campaign accuracy.",
                  ]}
                  infographic={{
                    title: 'Clean your list',
                    paragraphs: ['Verification protects your sender reputation.'],
                    bullets: [
                      'Verify every email address',
                      'Remove duplicates',
                      'Delete hard bounces',
                      'Keep your list fresh',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-10"
                  id="mistake-10"
                  title="10. Poor Audience Segmentation"
                  showImage={false}
                  intro={[
                    "Treating every prospect the same is a missed opportunity.",
                    "A CEO, Marketing Director, and Sales Manager may all work at the same company, but they have different priorities and pain points.",
                    "Segment your audience based on industry, role, seniority, company size, and buying stage. Tailored messaging consistently outperforms one‑size‑fits‑all campaigns.",
                  ]}
                  infographic={{
                    title: 'Segment for relevance',
                    paragraphs: ['Different roles need different messages.'],
                    bullets: [
                      'Industry',
                      'Job role',
                      'Seniority level',
                      'Company size',
                      'Buying stage',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-11"
                  id="mistake-11"
                  title="11. Overlooking Mobile Optimization"
                  showImage={false}
                  intro={[
                    "Many professionals read emails on their smartphones.",
                    "If your email contains long paragraphs, oversized images, or poorly formatted layouts, recipients may abandon it before reaching your CTA.",
                    "Write concise paragraphs, use clear formatting, and preview emails on multiple devices before launching your campaign. A mobile‑friendly email creates a better experience for busy decision‑makers.",
                  ]}
                  infographic={{
                    title: 'Mobile‑first design',
                    paragraphs: ['Most B2B emails are opened on mobile devices.'],
                    bullets: [
                      'Use short paragraphs',
                      'Keep formatting clean',
                      'Preview on multiple screens',
                      'Make CTAs tappable',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-12"
                  id="mistake-12"
                  title="12. Failing to Test Before Launch"
                  showImage={true}
                  intro={[
                    "Launching a campaign without testing is risky.",
                    "Always send test emails to yourself and your team to review personalization fields, subject lines, formatting, links, grammar, and mobile appearance.",
                    "Testing helps identify small issues before they affect hundreds or thousands of recipients.",
                  ]}
                  infographic={{
                    title: 'Test everything',
                    paragraphs: ['A few minutes of testing can save hours of lost opportunities.'],
                    bullets: [
                      'Personalization fields',
                      'Subject lines',
                      'Links',
                      'Spelling and grammar',
                      'Mobile rendering',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-13"
                  id="mistake-13"
                  title="13. Ignoring Campaign Analytics"
                  showImage={false}
                  intro={[
                    "Many teams focus only on open rates.",
                    "While opens provide some insight, they don't tell the full story.",
                    "Monitor metrics such as delivery rate, bounce rate, reply rate, positive replies, meeting bookings, and unsubscribes. Analyzing performance helps you refine future campaigns and improve ROI over time.",
                  ]}
                  infographic={{
                    title: 'Metrics that matter',
                    paragraphs: ['Beyond opens, track actions that drive pipeline.'],
                    bullets: [
                      'Delivery rate',
                      'Bounce rate',
                      'Reply rate',
                      'Positive replies',
                      'Meetings booked',
                      'Unsubscribes',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-14"
                  id="mistake-14"
                  title="14. Giving Up Too Early"
                  showImage={false}
                  intro={[
                    "Outbound success rarely happens overnight.",
                    "Some teams abandon campaigns after a few days because reply rates aren't immediately impressive.",
                    "Instead, evaluate performance over multiple campaigns. Experiment with different subject lines, messaging, CTAs, follow‑up timing, and audience segments. Continuous optimization is what separates high‑performing outbound teams from average ones.",
                  ]}
                  infographic={{
                    title: 'Stay persistent',
                    paragraphs: ['Winning campaigns are built through iteration.'],
                    bullets: [
                      'Test different angles',
                      'Adjust timing',
                      'Segment further',
                      'Learn from every campaign',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="mistake-15"
                  id="mistake-15"
                  title="15. Relying on Manual Processes"
                  showImage={false}
                  intro={[
                    "As your outreach scales, spreadsheets and manual personalization become increasingly difficult to manage.",
                    "Modern outbound sales require automation to maintain consistency while still delivering personalized experiences.",
                    "Platforms that automate prospect research, personalization, follow-ups, deliverability monitoring, and analytics allow sales teams to spend less time on repetitive tasks and more time building relationships with qualified prospects.",
                    "Automation doesn't replace personalization—it enables it at scale.",
                  ]}
                  infographic={{
                    title: 'Automate smartly',
                    paragraphs: ['Use technology to handle repetition, not relationships.'],
                    bullets: [
                      'Prospect research',
                      'Personalization at scale',
                      'Follow‑up sequences',
                      'Deliverability monitoring',
                      'Analytics and reporting',
                    ],
                  }}
                  blocks={[]}
                />

                <ArticleSection
                  key="final-thoughts"
                  id="final-thoughts"
                  title="Final Thoughts"
                  showImage={false}
                  intro={[
                    "Most outbound email campaigns don't fail because of poor products or ineffective sales teams—they fail because of preventable execution mistakes. From targeting the wrong audience and neglecting deliverability to sending generic emails and skipping follow-ups, even small oversights can significantly reduce campaign performance.",
                    "Fortunately, every mistake discussed in this guide can be corrected with the right strategy and tools. Building high‑quality prospect lists, personalizing every interaction, monitoring sender reputation, testing campaigns before launch, and analyzing performance consistently are all habits that contribute to long‑term outbound success.",
                    "Modern outbound platforms make these best practices easier to implement by automating repetitive tasks, improving personalization, and providing actionable insights that help teams optimize every campaign. Instead of focusing solely on sending more emails, successful organizations prioritize sending better emails—ones that are relevant, timely, and genuinely valuable to the recipient.",
                    "Avoiding these common mistakes won't guarantee overnight success, but it will create a stronger foundation for every campaign you launch. Over time, these incremental improvements translate into better deliverability, higher reply rates, more booked meetings, and a healthier sales pipeline.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps outbound teams avoid these mistakes by automating prospect research, personalization, deliverability monitoring, follow‑up sequences, and campaign analytics in one platform.',
                      'Whether you’re launching your first campaign or scaling enterprise outbound, 360Airo gives you the tools to send better emails, generate more conversations, and build pipeline predictably.',
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
                    title: 'The Future of AI in B2B Sales: 4 Trends Every Revenue Team Should Prepare For',
                    tag: 'AI',
                    href: '/blogs/future-of-ai-in-b2b-sales',
                    description: 'Explore the top AI trends shaping B2B sales: autonomous decision-making, hyper-personalization, revenue intelligence, and AI copilots.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide That Gets Replies',
                    tag: 'Cold Email',
                    href: '/blogs/how-to-build-first-cold-email-campaign',
                    description: 'Learn how to build your first cold email campaign that actually gets replies.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'AI for Sales: A Beginner\'s Guide to Working Smarter',
                    tag: 'AI',
                    href: '/blogs/ai-for-sales-beginners-guide',
                    description: 'Discover how AI can help you work smarter, not harder in sales.',
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