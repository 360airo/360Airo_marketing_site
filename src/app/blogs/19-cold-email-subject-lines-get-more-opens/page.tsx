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
  { id: 'subject-1', label: '1. Keep It Simple: "Quick Question"', arrow: true },
  { id: 'subject-2', label: '2. Personalize It Around the Company', arrow: true },
  { id: 'subject-3', label: '3. Reference a Specific Challenge', arrow: true },
  { id: 'subject-4', label: '4. Use a Curiosity Gap', arrow: true },
  { id: 'subject-5', label: '5. Make It About a Recent Event', arrow: true },
  { id: 'subject-6', label: '6. Use a Relevant Industry Angle', arrow: true },
  { id: 'subject-7', label: '7. Ask a Straightforward Question', arrow: true },
  { id: 'subject-8', label: '8. Mention a Specific Outcome', arrow: true },
  { id: 'subject-9', label: '9. Use a "Thought" or "Idea" Angle', arrow: true },
  { id: 'subject-10', label: '10. Create a Short, Direct Subject Line', arrow: true },
  { id: 'subject-11', label: '11. Use a Trigger-Based Subject Line', arrow: true },
  { id: 'subject-12', label: '12. Try a "Worth Exploring?" Angle', arrow: true },
  { id: 'subject-13', label: '13. Use a Mutual Connection or Shared Context', arrow: true },
  { id: 'subject-14', label: '14. Personalize Around the Prospect\'s Role', arrow: true },
  { id: 'subject-15', label: '15. Use a Customer Story', arrow: true },
  { id: 'subject-16', label: '16. Try a "Saw This" Format', arrow: true },
  { id: 'subject-17', label: '17. Use a Personalized Observation', arrow: true },
  { id: 'subject-18', label: '18. Test Lowercase Subject Lines', arrow: true },
  { id: 'subject-19', label: '19. Test Different Angles Instead of Searching for One "Perfect" Subject Line', arrow: true },
  { id: 'what-makes-effective', label: 'What Makes a Cold Email Subject Line Effective?', arrow: true },
  { id: 'subject-lines-to-avoid', label: 'Cold Email Subject Lines to Avoid', arrow: true },
  { id: 'how-to-test', label: 'How to Test Cold Email Subject Lines', arrow: true },
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
    alt: 'Cold email subject lines',
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
          Subject Lines
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Test these 19 subject line strategies to earn more opens and start more conversations.
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
          Test, don't guess
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          The best subject line depends on your audience. Run A/B tests to see what works, then iterate.
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
          Scale personalized cold email campaigns with AI-powered subject line testing, personalization, and sequencing – all from one platform.
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

export default function BlogColdEmailSubjectLinesPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/cold-email-subject-lines.jpg';

  return (
    <>
      <Head>
        <title>19 Cold Email Subject Lines That Get More Opens in 2026</title>
        <meta
          name="description"
          content="Discover 19 proven cold email subject lines that get more opens in 2026 – from simple questions to personalized observations. Learn how to test and optimize your subject lines."
        />
        <meta
          name="keywords"
          content="cold email subject lines, email opens, B2B cold email, subject line testing, email personalization, curiosity gap"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/cold-email-subject-lines-get-more-opens"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="19 Cold Email Subject Lines That Get More Opens in 2026"
        />
        <meta
          property="og:description"
          content="Discover 19 proven cold email subject lines that get more opens in 2026 – from simple questions to personalized observations. Learn how to test and optimize your subject lines."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/cold-email-subject-lines-get-more-opens"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="19 Cold Email Subject Lines That Get More Opens in 2026"
        />
        <meta
          name="twitter:description"
          content="Discover 19 proven cold email subject lines that get more opens in 2026 – from simple questions to personalized observations. Learn how to test and optimize your subject lines."
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
                  '@id': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens/#webpage',
                  'url': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens',
                  'name': '19 Cold Email Subject Lines That Get More Opens in 2026',
                  'description': 'Discover 19 proven cold email subject lines that get more opens in 2026 – from simple questions to personalized observations. Learn how to test and optimize your subject lines.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens/#article',
                  'headline': '19 Cold Email Subject Lines That Get More Opens in 2026',
                  'description': 'Discover 19 proven cold email subject lines that get more opens in 2026 – from simple questions to personalized observations. Learn how to test and optimize your subject lines.',
                  'url': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens',
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
                    '@id': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'cold email subject lines',
                    'email opens',
                    'B2B cold email',
                    'subject line testing',
                    'email personalization',
                    'curiosity gap',
                  ],
                  'datePublished': '2026-11-08',
                  'dateModified': '2026-11-08',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens/#breadcrumb',
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
                      'name': 'Cold Email Subject Lines',
                      'item': 'https://360airo.com/blogs/cold-email-subject-lines-get-more-opens',
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
                  <span className="hidden sm:inline">19 Cold Email Subject Lines That Get More Opens in 2026</span>
                  <span className="sm:hidden">Cold Email Subject Lines</span>
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
                      alt="Cold email subject lines hero"
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
                    19 Cold Email Subject Lines That Get More Opens in 2026
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    Your cold email can have the perfect offer and strong personalization – but none of it matters if the prospect never opens it. Discover 19 proven subject line strategies to earn attention and start more conversations.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 12 min read</span>
                    <span>• 1.6K reads</span>
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
                    "Your cold email can have the perfect offer, strong personalization, and a compelling CTA—but none of it matters if the prospect never opens it.",
                    "The subject line is the first thing a prospect sees in their inbox, and it determines whether your email earns attention or gets ignored. For B2B sales teams, the challenge is finding the balance between creating curiosity and staying relevant without sounding like clickbait.",
                    "The best cold email subject lines are usually short, specific, natural, and connected to the reason you're reaching out. They don't try too hard to sell. Instead, they give the recipient a reason to open the email and find out more.",
                    "Here are 19 cold email subject lines you can test across different B2B outreach scenarios.",
                  ]}
                  infographic={{
                    title: 'The subject line challenge',
                    paragraphs: ['Earn attention without misleading – relevance beats cleverness.'],
                    bullets: [
                      'Short and specific',
                      'Natural and conversational',
                      'Connected to your reason for reaching out',
                      'Creates curiosity without being clickbait',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 1 */}
                <ArticleSection
                  key="subject-1"
                  id="subject-1"
                  title='1. Keep It Simple: "Quick Question"'
                  showImage={true}
                  intro={[
                    "Sometimes the simplest subject lines work best.",
                    "Examples: 'Quick question', 'Quick question about {{Company}}', 'Quick question for {{First Name}}'.",
                    "These work because they create curiosity without immediately announcing a sales pitch.",
                    "However, don't rely on them for every campaign. Generic curiosity can lose its effectiveness when overused.",
                  ]}
                  infographic={{
                    title: 'Simple curiosity',
                    paragraphs: ['Short, low‑pressure subject lines can earn attention without sounding salesy.'],
                    bullets: [
                      'Quick question',
                      'Quick question about {{Company}}',
                      'Quick question for {{First Name}}',
                      'Use sparingly to avoid generic feel',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 2 */}
                <ArticleSection
                  key="subject-2"
                  id="subject-2"
                  title="2. Personalize It Around the Company"
                  showImage={false}
                  intro={[
                    "Adding a relevant company reference can make the subject line feel more targeted.",
                    "Examples: '{{Company}} + outbound', 'Scaling outbound at {{Company}}', 'Question about {{Company}}', '{{Company}}'s sales process'.",
                    "This approach works particularly well when the email itself contains genuine research about the company.",
                  ]}
                  infographic={{
                    title: 'Company personalization',
                    paragraphs: ['Reference the company directly to show you&apos;ve done your research.'],
                    bullets: [
                      '{{Company}} + outbound',
                      'Scaling outbound at {{Company}}',
                      'Question about {{Company}}',
                      '{{Company}}&apos;s sales process',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 3 */}
                <ArticleSection
                  key="subject-3"
                  id="subject-3"
                  title="3. Reference a Specific Challenge"
                  showImage={false}
                  intro={[
                    "If you understand a pain point your audience commonly faces, make it the focus of your subject line.",
                    "Examples: 'Scaling personalized outreach', 'Reducing outbound workload', 'Improving reply rates', 'Scaling SDR outreach'.",
                    "A relevant problem gives prospects a reason to open because they can immediately see the potential value.",
                  ]}
                  infographic={{
                    title: 'Pain point focus',
                    paragraphs: ['Highlight a challenge your audience recognizes and wants to solve.'],
                    bullets: [
                      'Scaling personalized outreach',
                      'Reducing outbound workload',
                      'Improving reply rates',
                      'Scaling SDR outreach',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 4 */}
                <ArticleSection
                  key="subject-4"
                  id="subject-4"
                  title="4. Use a Curiosity Gap"
                  showImage={false}
                  intro={[
                    "A curiosity-driven subject line creates an information gap that encourages the recipient to open the email.",
                    "Examples: 'One thing I noticed', 'A thought on your outbound', 'Something worth testing', 'An idea for {{Company}}'.",
                    "The key is to make sure the email actually delivers on the curiosity created by the subject line.",
                  ]}
                  infographic={{
                    title: 'Curiosity gap',
                    paragraphs: ['Create just enough curiosity to earn an open – then deliver value.'],
                    bullets: [
                      'One thing I noticed',
                      'A thought on your outbound',
                      'Something worth testing',
                      'An idea for {{Company}}',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 5 */}
                <ArticleSection
                  key="subject-5"
                  id="subject-5"
                  title="5. Make It About a Recent Event"
                  showImage={false}
                  intro={[
                    "Recent company activity can provide a natural reason for reaching out.",
                    "Examples: 'Saw your recent expansion', 'Congrats on the new launch', 'Your recent hiring push', 'Noticed the new product'.",
                    "This works particularly well for account-based outreach because it demonstrates that the email isn't completely automated.",
                  ]}
                  infographic={{
                    title: 'Event‑based outreach',
                    paragraphs: ['Recent news gives you a natural reason to start a conversation.'],
                    bullets: [
                      'Saw your recent expansion',
                      'Congrats on the new launch',
                      'Your recent hiring push',
                      'Noticed the new product',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 6 */}
                <ArticleSection
                  key="subject-6"
                  id="subject-6"
                  title="6. Use a Relevant Industry Angle"
                  showImage={false}
                  intro={[
                    "Industry-specific subject lines can make your outreach more relevant without being overly promotional.",
                    "Examples: 'Outbound trends in SaaS', 'B2B outreach in 2026', 'Personalization for SaaS teams', 'Scaling sales outreach'.",
                    "The more closely the topic matches the prospect's responsibilities, the more compelling the subject line becomes.",
                  ]}
                  infographic={{
                    title: 'Industry relevance',
                    paragraphs: ['Speak to industry trends that matter to your prospect.'],
                    bullets: [
                      'Outbound trends in SaaS',
                      'B2B outreach in 2026',
                      'Personalization for SaaS teams',
                      'Scaling sales outreach',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 7 */}
                <ArticleSection
                  key="subject-7"
                  id="subject-7"
                  title="7. Ask a Straightforward Question"
                  showImage={false}
                  intro={[
                    "Questions naturally encourage curiosity and can make a cold email feel more conversational.",
                    "Examples: 'How are you handling outbound?', 'Are you scaling SDR outreach?', 'Who owns outbound at {{Company}}?', 'Is personalization a priority?'.",
                    "Keep the question simple. Avoid turning the subject line into a long sales pitch.",
                  ]}
                  infographic={{
                    title: 'Direct questions',
                    paragraphs: ['Questions create curiosity and feel more conversational.'],
                    bullets: [
                      'How are you handling outbound?',
                      'Are you scaling SDR outreach?',
                      'Who owns outbound at {{Company}}?',
                      'Is personalization a priority?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 8 */}
                <ArticleSection
                  key="subject-8"
                  id="subject-8"
                  title="8. Mention a Specific Outcome"
                  showImage={false}
                  intro={[
                    "If your product helps solve a measurable problem, you can highlight the outcome without making exaggerated promises.",
                    "Examples: 'More replies from outbound', 'Scaling meetings without more SDRs', 'Improving outbound efficiency', 'More personalized outreach'.",
                    "Avoid unrealistic claims such as '10X your sales overnight.' Credibility matters more than hype.",
                  ]}
                  infographic={{
                    title: 'Outcome focus',
                    paragraphs: ['Highlight measurable outcomes without overpromising.'],
                    bullets: [
                      'More replies from outbound',
                      'Scaling meetings without more SDRs',
                      'Improving outbound efficiency',
                      'More personalized outreach',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 9 */}
                <ArticleSection
                  key="subject-9"
                  id="subject-9"
                  title='9. Use a "Thought" or "Idea" Angle'
                  showImage={false}
                  intro={[
                    "These subject lines position the email as an exchange of ideas rather than a sales pitch.",
                    "Examples: 'An idea for {{Company}}', 'A thought on outbound', 'An idea for your SDR team', 'Thought on personalization'.",
                    "This can work particularly well for senior decision-makers who receive large volumes of promotional emails.",
                  ]}
                  infographic={{
                    title: 'Idea exchange',
                    paragraphs: ['Position your outreach as a thoughtful suggestion, not a sales pitch.'],
                    bullets: [
                      'An idea for {{Company}}',
                      'A thought on outbound',
                      'An idea for your SDR team',
                      'Thought on personalization',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 10 */}
                <ArticleSection
                  key="subject-10"
                  id="subject-10"
                  title="10. Create a Short, Direct Subject Line"
                  showImage={false}
                  intro={[
                    "You don't always need to be clever. Sometimes a straightforward subject line is the strongest option.",
                    "Examples: 'Outbound personalization', 'Email outreach', 'Sales automation', 'Cold email', 'AI personalization'.",
                    "These work best when the email content clearly explains why the topic is relevant to the recipient.",
                  ]}
                  infographic={{
                    title: 'Direct and simple',
                    paragraphs: ['Clarity beats cleverness – be direct about what the email covers.'],
                    bullets: [
                      'Outbound personalization',
                      'Email outreach',
                      'Sales automation',
                      'Cold email',
                      'AI personalization',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 11 */}
                <ArticleSection
                  key="subject-11"
                  id="subject-11"
                  title="11. Use a Trigger-Based Subject Line"
                  showImage={false}
                  intro={[
                    "Trigger-based outreach uses a specific event or signal as the reason for contacting someone. Examples include a new executive joining the company, expansion into a new market, increased hiring, or a new product launch.",
                    "Examples: 'Saw you're hiring SDRs', 'Noticed your sales team grew', 'Congrats on the new market', 'Saw the recent launch'.",
                    "This approach is especially useful for account-based sales because the subject line is connected to something that actually happened.",
                  ]}
                  infographic={{
                    title: 'Trigger‑based outreach',
                    paragraphs: ['Connect your subject line to a real event or signal.'],
                    bullets: [
                      "Saw you're hiring SDRs",
                      'Noticed your sales team grew',
                      'Congrats on the new market',
                      'Saw the recent launch',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 12 */}
                <ArticleSection
                  key="subject-12"
                  id="subject-12"
                  title='12. Try a "Worth Exploring?" Angle'
                  showImage={false}
                  intro={[
                    "A soft question can create curiosity without putting immediate pressure on the prospect.",
                    "Examples: 'Worth exploring?', 'Worth a conversation?', 'Worth testing?', 'Worth a quick look?'.",
                    "These subject lines work best when the email contains a clear, relevant value proposition.",
                  ]}
                  infographic={{
                    title: 'Low‑pressure curiosity',
                    paragraphs: ['Soft questions invite response without demanding commitment.'],
                    bullets: [
                      'Worth exploring?',
                      'Worth a conversation?',
                      'Worth testing?',
                      'Worth a quick look?',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 13 */}
                <ArticleSection
                  key="subject-13"
                  id="subject-13"
                  title="13. Use a Mutual Connection or Shared Context"
                  showImage={false}
                  intro={[
                    "If you genuinely have a mutual connection, customer, event, community, or other shared context, mentioning it can increase relevance.",
                    "Examples: '{{Mutual Contact}} suggested I reach out', 'From {{Event Name}}', 'Saw you at {{Event Name}}', 'Connecting through {{Company/Community}}'.",
                    "Only use this approach when the connection is genuine. Artificially implying familiarity can quickly damage trust.",
                  ]}
                  infographic={{
                    title: 'Shared context',
                    paragraphs: ['Genuine connections can make your outreach feel warmer and more relevant.'],
                    bullets: [
                      '{{Mutual Contact}} suggested I reach out',
                      'From {{Event Name}}',
                      'Saw you at {{Event Name}}',
                      'Connecting through {{Company/Community}}',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 14 */}
                <ArticleSection
                  key="subject-14"
                  id="subject-14"
                  title="14. Personalize Around the Prospect's Role"
                  showImage={false}
                  intro={[
                    "A subject line can become more relevant when it speaks directly to the recipient's responsibilities.",
                    "Examples: 'For your SDR team', 'Question for sales leaders', 'Outbound for {{Job Title}}', 'Scaling your sales team'.",
                    "Role-based subject lines are particularly useful when running segmented campaigns.",
                  ]}
                  infographic={{
                    title: 'Role‑based personalization',
                    paragraphs: ['Address the recipient&apos;s specific role and responsibilities.'],
                    bullets: [
                      'For your SDR team',
                      'Question for sales leaders',
                      'Outbound for {{Job Title}}',
                      'Scaling your sales team',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 15 */}
                <ArticleSection
                  key="subject-15"
                  id="subject-15"
                  title="15. Use a Customer Story"
                  showImage={false}
                  intro={[
                    "A short customer reference can create credibility and curiosity.",
                    "Examples: 'How {{Similar Company}} scaled outbound', '{{Similar Company}} + personalization', 'What worked for {{Customer}}', 'A result from a similar team'.",
                    "Keep the subject line focused on relevance rather than turning it into an advertisement.",
                  ]}
                  infographic={{
                    title: 'Social proof subject lines',
                    paragraphs: ['Customer examples build credibility and curiosity.'],
                    bullets: [
                      'How {{Similar Company}} scaled outbound',
                      '{{Similar Company}} + personalization',
                      'What worked for {{Customer}}',
                      'A result from a similar team',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 16 */}
                <ArticleSection
                  key="subject-16"
                  id="subject-16"
                  title='16. Try a "Saw This" Format'
                  showImage={false}
                  intro={[
                    "A simple observation can make your outreach feel personal.",
                    "Examples: 'Saw this on your site', 'Saw your latest post', 'Saw your hiring page', 'Saw your new product'.",
                    "The email should immediately explain what you noticed and why it matters. Otherwise, the subject line becomes curiosity bait.",
                  ]}
                  infographic={{
                    title: 'Observation‑based',
                    paragraphs: ['A genuine observation shows you&apos;ve paid attention.'],
                    bullets: [
                      'Saw this on your site',
                      'Saw your latest post',
                      'Saw your hiring page',
                      'Saw your new product',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 17 */}
                <ArticleSection
                  key="subject-17"
                  id="subject-17"
                  title="17. Use a Personalized Observation"
                  showImage={false}
                  intro={[
                    "If your sales team researches prospects before contacting them, turn that research into a short subject line.",
                    "Examples: 'Noticed your outbound motion', 'Your recent sales hiring', 'Your approach to personalization', 'Your new SDR team'.",
                    "This works particularly well with AI-powered personalization because relevant prospect signals can be incorporated into outreach at scale.",
                  ]}
                  infographic={{
                    title: 'Research‑based personalization',
                    paragraphs: ['Turn prospect research into a relevant subject line.'],
                    bullets: [
                      'Noticed your outbound motion',
                      'Your recent sales hiring',
                      'Your approach to personalization',
                      'Your new SDR team',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 18 */}
                <ArticleSection
                  key="subject-18"
                  id="subject-18"
                  title="18. Test Lowercase Subject Lines"
                  showImage={false}
                  intro={[
                    "Not every B2B subject line needs to follow traditional title capitalization.",
                    "A lowercase subject line can feel more like a personal email.",
                    "Examples: 'quick question', 'idea for {{Company}}', 'outbound question', 'thought on your sales process'.",
                    "This is worth testing against conventional capitalization to see which style your audience responds to.",
                  ]}
                  infographic={{
                    title: 'Lowercase testing',
                    paragraphs: ['A casual style can sometimes feel more personal – but test it.'],
                    bullets: [
                      'quick question',
                      'idea for {{Company}}',
                      'outbound question',
                      'thought on your sales process',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject 19 */}
                <ArticleSection
                  key="subject-19"
                  id="subject-19"
                  title='19. Test Different Angles Instead of Searching for One "Perfect" Subject Line'
                  showImage={true}
                  intro={[
                    "There is no universally best cold email subject line.",
                    "What works for a SaaS founder may not work for an enterprise sales leader. Even within the same audience, performance can change based on the offer, timing, industry, and campaign context.",
                    "Test different approaches: curiosity, personalization, pain points, questions, industry trends, recent events, customer stories, and direct statements.",
                    "Keep the rest of the email consistent when possible so you can understand whether the subject line is actually influencing performance.",
                  ]}
                  infographic={{
                    title: 'Test systematically',
                    paragraphs: ['There&apos;s no single best subject line – test multiple approaches.'],
                    bullets: [
                      'Curiosity vs. direct',
                      'Personalized vs. generic',
                      'Questions vs. statements',
                      'Pain points vs. outcomes',
                      'Keep email copy consistent when testing',
                    ],
                  }}
                  blocks={[]}
                />

                {/* What Makes Effective */}
                <ArticleSection
                  key="what-makes-effective"
                  id="what-makes-effective"
                  title="What Makes a Cold Email Subject Line Effective?"
                  showImage={false}
                  intro={[
                    "While there are many approaches you can test, strong cold email subject lines tend to share a few characteristics:",
                    "They're relevant – the subject should connect naturally to the recipient and the content of the email.",
                    "They're concise – busy professionals don't need a paragraph in their inbox preview. Get to the point quickly.",
                    "They're natural – avoid language that sounds like an advertisement.",
                    "They're specific – a relevant observation is usually more compelling than a vague promise.",
                    "They create curiosity without misleading – give the prospect a reason to open, but make sure the email delivers on the subject line's promise.",
                  ]}
                  infographic={{
                    title: 'Key characteristics',
                    paragraphs: ['Relevant, concise, natural, specific, and honest.'],
                    bullets: [
                      'Relevant – connects to the recipient',
                      'Concise – gets to the point quickly',
                      'Natural – conversational, not salesy',
                      'Specific – observations beat vague promises',
                      'Curious without misleading – deliver on the promise',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Subject Lines to Avoid */}
                <ArticleSection
                  key="subject-lines-to-avoid"
                  id="subject-lines-to-avoid"
                  title="Cold Email Subject Lines to Avoid"
                  showImage={false}
                  intro={[
                    "Some approaches can hurt credibility or make your message look like spam.",
                    "Avoid subject lines containing excessive punctuation, ALL CAPS, fake 'Re:' or 'Fwd:', unrealistic income claims, aggressive sales language, misleading urgency, clickbait, and excessive emojis.",
                    "For example: '🚨 YOU'RE LOSING THOUSANDS OF DOLLARS!!!' may attract attention, but it can also make the email immediately look promotional.",
                    "A simple 'quick question about outbound' may be far more appropriate for a B2B prospect.",
                  ]}
                  infographic={{
                    title: 'Avoid these mistakes',
                    paragraphs: ['Clickbait and spammy language damage credibility instantly.'],
                    bullets: [
                      'Excessive punctuation and ALL CAPS',
                      'Fake "Re:" or "Fwd:" prefixes',
                      'Unrealistic income or growth claims',
                      'Aggressive sales language',
                      'Misleading urgency and clickbait',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Test */}
                <ArticleSection
                  key="how-to-test"
                  id="how-to-test"
                  title="How to Test Cold Email Subject Lines"
                  showImage={false}
                  intro={[
                    "Don't choose a subject line based solely on what sounds good to you.",
                    "Use controlled testing. Create two or more variations and compare their performance across similar audience segments.",
                    "You can test question vs. statement, personalized vs. generic, short vs. descriptive, curiosity vs. pain point, and lowercase vs. conventional capitalization.",
                    "However, don't evaluate subject lines using opens alone. Modern email privacy features can make open-rate data less reliable than other campaign metrics.",
                    "Also track reply rates and positive responses. The ultimate goal isn't simply to get more opens—it's to generate more meaningful conversations.",
                  ]}
                  infographic={{
                    title: 'Test with purpose',
                    paragraphs: ['A/B test subject lines – but measure replies, not just opens.'],
                    bullets: [
                      'Question vs. statement',
                      'Personalized vs. generic',
                      'Short vs. descriptive',
                      'Curiosity vs. pain point',
                      'Lowercase vs. conventional capitalization',
                      'Track replies and positive responses',
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
                    "A great cold email subject line doesn't need to be clever. It needs to be relevant enough to earn attention.",
                    "The strongest approach is to understand your audience, identify what matters to them, and create a subject line that naturally connects to your reason for reaching out.",
                    "Test questions, observations, pain points, company triggers, role-specific messaging, and personalized angles. Keep your language conversational and avoid exaggerated claims.",
                    "Most importantly, don't optimize for opens at the expense of replies. A subject line that gets opened but creates no interest isn't necessarily a successful subject line.",
                    "The best cold email campaigns connect the subject line, personalized message, and CTA into one coherent conversation. With AI-powered personalization and automated testing, platforms such as 360Airo can help sales teams experiment with different messaging angles while scaling personalized outbound campaigns.",
                    "The goal isn't to trick prospects into opening your email. It's to give the right prospects a genuine reason to want to read it.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps sales teams test subject lines, personalize outreach, and scale campaigns with AI-powered insights – all from one platform.',
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
                    title: '17 Cold Email Mistakes Killing Your Campaigns (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/cold-email-mistakes-killing-campaigns',
                    description: 'Avoid these 17 common cold email mistakes that quietly hurt your campaigns.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
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