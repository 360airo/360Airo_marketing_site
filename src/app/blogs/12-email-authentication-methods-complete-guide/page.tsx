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
  { id: 'spf', label: '1. SPF (Sender Policy Framework)', arrow: true },
  { id: 'dkim', label: '2. DKIM (DomainKeys Identified Mail)', arrow: true },
  { id: 'dmarc', label: '3. DMARC (Domain-based Message Authentication, Reporting & Conformance)', arrow: true },
  { id: 'arc', label: '4. ARC (Authenticated Received Chain)', arrow: true },
  { id: 'bimi', label: '5. BIMI (Brand Indicators for Message Identification)', arrow: true },
  { id: 'mta-sts', label: '6. MTA-STS', arrow: true },
  { id: 'tls-rpt', label: '7. TLS-RPT', arrow: true },
  { id: 'dane', label: '8. DANE for SMTP', arrow: true },
  { id: 'smime', label: '9. S/MIME', arrow: true },
  { id: 'pgp', label: '10. PGP/GPG', arrow: true },
  { id: 'smtp-tls', label: '11. SMTP TLS', arrow: true },
  { id: 'dnssec', label: '12. DNSSEC', arrow: true },
  { id: 'auth-vs-deliverability', label: 'Email Authentication vs. Email Deliverability', arrow: true },
  { id: 'what-sales-teams-need', label: 'Which Authentication Methods Do Sales Teams Actually Need?', arrow: true },
  { id: 'how-to-check', label: 'How to Check Your Email Authentication', arrow: true },
  { id: 'common-mistakes', label: 'Common Email Authentication Mistakes', arrow: true },
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
    alt: 'Email authentication methods',
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
          Authentication
          <br />
          Best Practices
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Understand the key authentication methods that protect your domain and improve deliverability.
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
          Start with the basics
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          For most sales teams, SPF + DKIM + DMARC + TLS is the authentication stack you need. Everything else is optional.
        </p>
      </div>
    </aside>
  );
}

export default function BlogEmailAuthenticationPage() {
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

  const featuredImageUrl = 'https://360airo.com/og-images/email-authentication-methods.jpg';

  return (
    <>
      <Head>
        <title>12 Email Authentication Methods Explained: A Complete Guide for Sales Teams</title>
        <meta
          name="description"
          content="Learn the 12 essential email authentication methods – SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP/GPG, SMTP TLS, and DNSSEC. A complete guide for B2B sales teams."
        />
        <meta
          name="keywords"
          content="email authentication, SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP, DNSSEC, deliverability"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blogs/email-authentication-methods-complete-guide"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="12 Email Authentication Methods Explained: A Complete Guide for Sales Teams"
        />
        <meta
          property="og:description"
          content="Learn the 12 essential email authentication methods – SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP/GPG, SMTP TLS, and DNSSEC. A complete guide for B2B sales teams."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blogs/email-authentication-methods-complete-guide"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="12 Email Authentication Methods Explained: A Complete Guide for Sales Teams"
        />
        <meta
          name="twitter:description"
          content="Learn the 12 essential email authentication methods – SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP/GPG, SMTP TLS, and DNSSEC. A complete guide for B2B sales teams."
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
                  '@id': 'https://360airo.com/blogs/email-authentication-methods-complete-guide/#webpage',
                  'url': 'https://360airo.com/blogs/email-authentication-methods-complete-guide',
                  'name': '12 Email Authentication Methods Explained: A Complete Guide for Sales Teams',
                  'description': 'Learn the 12 essential email authentication methods – SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP/GPG, SMTP TLS, and DNSSEC. A complete guide for B2B sales teams.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blogs/email-authentication-methods-complete-guide/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blogs/email-authentication-methods-complete-guide/#article',
                  'headline': '12 Email Authentication Methods Explained: A Complete Guide for Sales Teams',
                  'description': 'Learn the 12 essential email authentication methods – SPF, DKIM, DMARC, ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, PGP/GPG, SMTP TLS, and DNSSEC. A complete guide for B2B sales teams.',
                  'url': 'https://360airo.com/blogs/email-authentication-methods-complete-guide',
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
                    '@id': 'https://360airo.com/blogs/email-authentication-methods-complete-guide/#webpage',
                  },
                  'articleSection': 'Listicles',
                  'keywords': [
                    'email authentication',
                    'SPF',
                    'DKIM',
                    'DMARC',
                    'ARC',
                    'BIMI',
                    'MTA-STS',
                    'TLS-RPT',
                    'DANE',
                    'S/MIME',
                    'PGP',
                    'DNSSEC',
                    'deliverability',
                  ],
                  'datePublished': '2026-11-02',
                  'dateModified': '2026-11-02',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blogs/email-authentication-methods-complete-guide/#breadcrumb',
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
                      'name': 'Email Authentication Methods',
                      'item': 'https://360airo.com/blogs/email-authentication-methods-complete-guide',
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
                  <span className="hidden sm:inline">12 Email Authentication Methods Explained</span>
                  <span className="sm:hidden">Email Authentication</span>
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
                      alt="Email authentication methods hero"
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
                    12 Email Authentication Methods Explained: A Complete Guide for Sales Teams
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    From SPF and DKIM to DMARC, ARC, BIMI, MTA-STS, and more – understand the essential email authentication standards that protect your domain and improve deliverability.
                  </p>

                  {/* Meta info */}
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Nov 2026</span>
                    <span>• 14 min read</span>
                    <span>• 1.3K reads</span>
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
                    "Email authentication is one of the foundations of reliable email deliverability. It helps receiving email providers determine whether a message genuinely comes from the domain it claims to represent and whether the sender is authorized to send it.",
                    "For sales teams running outbound email campaigns, authentication is especially important. Poorly configured authentication can contribute to delivery problems, spoofing risks, and reduced trust in your sending domain.",
                    "But email authentication isn't limited to SPF, DKIM, and DMARC. There are several related standards, mechanisms, and technologies that work together to authenticate, evaluate, and protect email.",
                    "In this guide, we'll explain 12 important email authentication methods and standards, what they do, and why they matter for B2B email outreach.",
                  ]}
                  infographic={{
                    title: 'Authentication matters',
                    paragraphs: ['Email authentication helps receiving providers trust your messages and protects your domain from abuse.'],
                    bullets: [
                      'SPF – authorizes sending servers',
                      'DKIM – cryptographic signatures',
                      'DMARC – policy and alignment',
                      'Other methods address transport security, identity, and monitoring',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 1 - SPF */}
                <ArticleSection
                  key="spf"
                  id="spf"
                  title="1. SPF (Sender Policy Framework)"
                  showImage={true}
                  intro={[
                    "SPF is one of the most widely used email authentication standards. It allows a domain owner to specify which mail servers are authorized to send email on behalf of that domain. This information is published in the domain's DNS as a TXT record.",
                    "For example, if example.com uses a particular email provider to send messages, its SPF record can identify that provider's authorized sending infrastructure.",
                    "Why SPF matters: SPF helps receiving servers identify unauthorized senders and can reduce domain spoofing. For sales teams, properly configured SPF is an essential part of a trustworthy sending setup.",
                    "Important limitation: SPF authenticates the envelope sender, not necessarily the visible 'From' address. That's why SPF works best alongside DKIM and DMARC.",
                  ]}
                  infographic={{
                    title: 'SPF at a glance',
                    paragraphs: ['Authorizes servers to send email for your domain via a DNS TXT record.'],
                    bullets: [
                      'Publish a single SPF record',
                      'Include all legitimate sending services',
                      'Use ~all or -all to limit unauthorized use',
                      'Works best with DKIM and DMARC',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 2 - DKIM */}
                <ArticleSection
                  key="dkim"
                  id="dkim"
                  title="2. DKIM (DomainKeys Identified Mail)"
                  showImage={false}
                  intro={[
                    "DKIM adds a digital signature to outgoing email. The sending mail server signs parts of the message using a private cryptographic key. The corresponding public key is published in DNS. The receiving server can then retrieve the public key and verify that the signature is valid.",
                    "Why DKIM matters: DKIM helps establish that the message was authorized by the signing domain, important parts of the message weren't altered after signing, and the sender has control over the domain used for signing.",
                    "DKIM is particularly important for businesses using third-party email platforms because it provides a mechanism for those messages to be cryptographically authenticated.",
                  ]}
                  infographic={{
                    title: 'DKIM at a glance',
                    paragraphs: ['Adds a cryptographic signature to your emails that can be verified by receivers.'],
                    bullets: [
                      'Sign with a private key on your mail server',
                      'Publish the public key in DNS',
                      'Receivers verify the signature against the key',
                      'Helps prevent message tampering',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 3 - DMARC */}
                <ArticleSection
                  key="dmarc"
                  id="dmarc"
                  title="3. DMARC (Domain-based Message Authentication, Reporting & Conformance)"
                  showImage={false}
                  intro={[
                    "DMARC builds on SPF and DKIM. It allows a domain owner to publish a policy telling receiving servers what to do when an email fails authentication checks.",
                    "A DMARC policy can generally be configured to take no special action (p=none), quarantine suspicious messages (p=quarantine), or reject messages that fail the policy (p=reject). DMARC can also provide reporting information that helps domain owners understand how their domains are being used.",
                    "Why DMARC matters for sales teams: DMARC helps protect your domain from spoofing and provides visibility into authentication failures. It also helps align the domain visible to the recipient with the domains authenticated through SPF and/or DKIM.",
                  ]}
                  infographic={{
                    title: 'DMARC at a glance',
                    paragraphs: ['Sets a policy for handling authentication failures and provides reporting.'],
                    bullets: [
                      'p=none – monitor only',
                      'p=quarantine – send to spam',
                      'p=reject – block the message',
                      'Get reports on authentication failures',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 4 - ARC */}
                <ArticleSection
                  key="arc"
                  id="arc"
                  title="4. ARC (Authenticated Received Chain)"
                  showImage={false}
                  intro={[
                    "ARC is designed for situations where an email passes through intermediary systems that may modify or forward messages. Those intermediaries can add ARC headers containing information about authentication results and the chain of handling.",
                    "Why ARC matters: Forwarding can sometimes break traditional authentication checks. ARC provides receiving systems with additional context about what happened to a message before it reached them.",
                    "ARC is more relevant to email service providers and forwarding systems than to everyday sales teams, but it plays an important role in the broader email authentication ecosystem.",
                  ]}
                  infographic={{
                    title: 'ARC at a glance',
                    paragraphs: ['Preserves authentication results through forwarding and modification chains.'],
                    bullets: [
                      'Used by intermediary systems',
                      'Adds headers about authentication state',
                      'Helps receivers make decisions about forwarded mail',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 5 - BIMI */}
                <ArticleSection
                  key="bimi"
                  id="bimi"
                  title="5. BIMI (Brand Indicators for Message Identification)"
                  showImage={false}
                  intro={[
                    "BIMI is a standard that allows eligible organizations to associate a verified brand logo with authenticated email. When supported by the receiving provider, the logo may appear alongside messages in the inbox.",
                    "BIMI generally relies on strong email authentication, particularly DMARC enforcement.",
                    "Why BIMI matters: For established brands, BIMI can increase brand recognition, improve visual trust, make legitimate messages easier to identify, and reduce opportunities for impersonation.",
                    "BIMI is generally more relevant to brand and marketing email than one-to-one cold sales outreach.",
                  ]}
                  infographic={{
                    title: 'BIMI at a glance',
                    paragraphs: ['Displays verified brand logos in supported inboxes.'],
                    bullets: [
                      'Requires DMARC enforcement (p=quarantine or p=reject)',
                      'Logo is verified and cached',
                      'Enhances brand trust and recognition',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 6 - MTA-STS */}
                <ArticleSection
                  key="mta-sts"
                  id="mta-sts"
                  title="6. MTA-STS"
                  showImage={false}
                  intro={[
                    "MTA-STS, or Mail Transfer Agent Strict Transport Security, helps protect email traffic between mail servers by allowing a domain to specify that SMTP connections should use TLS encryption. It can help prevent attackers from downgrading or intercepting email connections between participating mail servers.",
                    "Why MTA-STS matters: MTA-STS is primarily a transport-security mechanism rather than a sender authentication method. For businesses handling sensitive email communications, it adds another layer of protection to the delivery process.",
                  ]}
                  infographic={{
                    title: 'MTA-STS at a glance',
                    paragraphs: ['Enforces TLS encryption for email delivery between servers.'],
                    bullets: [
                      'Publishes a policy in DNS',
                      'Specifies which IPs are allowed to deliver email',
                      'Helps prevent downgrade and interception attacks',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 7 - TLS-RPT */}
                <ArticleSection
                  key="tls-rpt"
                  id="tls-rpt"
                  title="7. TLS-RPT"
                  showImage={false}
                  intro={[
                    "TLS-RPT, short for TLS Reporting, works alongside MTA-STS. It allows domain owners to receive reports about problems encountered when attempting to establish secure TLS connections for email delivery.",
                    "Why TLS-RPT matters: These reports can help organizations identify TLS configuration problems, certificate issues, delivery failures related to secure transport, and potential configuration changes.",
                    "It's a monitoring mechanism rather than a method for proving sender identity.",
                  ]}
                  infographic={{
                    title: 'TLS-RPT at a glance',
                    paragraphs: ['Provides reporting on TLS connection issues during email delivery.'],
                    bullets: [
                      'Works with MTA-STS',
                      'Reports TLS failures',
                      'Helps diagnose transport problems',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 8 - DANE */}
                <ArticleSection
                  key="dane"
                  id="dane"
                  title="8. DANE for SMTP"
                  showImage={false}
                  intro={[
                    "DANE, or DNS-based Authentication of Named Entities, can use DNSSEC to associate TLS certificates with domain names. For SMTP, DANE can help receiving mail servers verify that the TLS connection is associated with the intended destination.",
                    "Why DANE matters: DANE provides a strong mechanism for authenticating TLS connections, although adoption depends heavily on DNSSEC and support from participating systems.",
                    "It is more common in technically sophisticated mail environments than in typical sales-email setups.",
                  ]}
                  infographic={{
                    title: 'DANE at a glance',
                    paragraphs: ['Uses DNSSEC to verify TLS certificates for mail servers.'],
                    bullets: [
                      'Requires DNSSEC',
                      'Associates certificates with domain names',
                      'Helps prevent certificate impersonation',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 9 - S/MIME */}
                <ArticleSection
                  key="smime"
                  id="smime"
                  title="9. S/MIME"
                  showImage={false}
                  intro={[
                    "S/MIME, or Secure/Multipurpose Internet Mail Extensions, uses digital certificates to provide email signing and encryption. A digitally signed email can help recipients verify the sender's identity, while encryption can protect the message contents from unauthorized access.",
                    "Why S/MIME matters: S/MIME is particularly useful for organizations that need strong message-level security, such as businesses handling confidential information. However, it's not typically used as the primary authentication mechanism for large-scale cold email campaigns.",
                  ]}
                  infographic={{
                    title: 'S/MIME at a glance',
                    paragraphs: ['Provides digital signing and encryption using X.509 certificates.'],
                    bullets: [
                      'Signs and/or encrypts messages',
                      'Requires certificate management',
                      'Common in regulated industries',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 10 - PGP/GPG */}
                <ArticleSection
                  key="pgp"
                  id="pgp"
                  title="10. PGP/GPG"
                  showImage={false}
                  intro={[
                    "PGP (Pretty Good Privacy) and GPG (GNU Privacy Guard) use public-key cryptography to encrypt and digitally sign messages. A sender can sign an email with a private key, allowing recipients with the corresponding public key to verify its authenticity.",
                    "Why PGP/GPG matters: PGP/GPG provides strong message-level security and authentication, but it isn't widely used for ordinary B2B sales email because it requires recipients to participate in the key-management process. It's more common among technical communities and users with specific security requirements.",
                  ]}
                  infographic={{
                    title: 'PGP/GPG at a glance',
                    paragraphs: ['Public-key cryptography for signing and encrypting email.'],
                    bullets: [
                      'Uses a web of trust model',
                      'Requires key exchange with recipients',
                      'Strong message-level authentication',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 11 - SMTP TLS */}
                <ArticleSection
                  key="smtp-tls"
                  id="smtp-tls"
                  title="11. SMTP TLS"
                  showImage={false}
                  intro={[
                    "SMTP TLS encrypts email traffic while it travels between participating mail servers. Unlike SPF or DKIM, TLS doesn't establish whether the sender is authorized to use a particular domain. Instead, it protects the communication channel during transmission.",
                    "Why SMTP TLS matters: Encryption helps protect email from interception while it moves between servers. It's an important part of secure email transport, but it should not be confused with sender authentication.",
                  ]}
                  infographic={{
                    title: 'SMTP TLS at a glance',
                    paragraphs: ['Encrypts email traffic between servers – protects against interception.'],
                    bullets: [
                      'Transport‑layer security',
                      'Not a sender authentication method',
                      'Essential for secure delivery',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Method 12 - DNSSEC */}
                <ArticleSection
                  key="dnssec"
                  id="dnssec"
                  title="12. DNSSEC"
                  showImage={false}
                  intro={[
                    "DNSSEC, or Domain Name System Security Extensions, adds cryptographic validation to DNS records. Because email authentication mechanisms such as SPF, DKIM, and DMARC rely heavily on DNS, securing DNS information can help protect the integrity of the records that email systems depend on.",
                    "Why DNSSEC matters: DNSSEC helps protect against certain forms of DNS manipulation and strengthens the trust model behind DNS-based email technologies. Like DANE, however, it is primarily an infrastructure-level security technology rather than a tool sales teams configure directly for each campaign.",
                  ]}
                  infographic={{
                    title: 'DNSSEC at a glance',
                    paragraphs: ['Secures DNS records against tampering using cryptographic signatures.'],
                    bullets: [
                      'Protects SPF, DKIM, and DMARC record integrity',
                      'Infrastructure‑level security',
                      'Requires support from DNS providers',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Email Authentication vs Deliverability */}
                <ArticleSection
                  key="auth-vs-deliverability"
                  id="auth-vs-deliverability"
                  title="Email Authentication vs. Email Deliverability"
                  showImage={false}
                  intro={[
                    "It's important to understand that authentication and deliverability aren't the same thing.",
                    "Authentication answers: 'Is this sender authorized to send this email?'",
                    "Deliverability asks: 'Should this email be delivered to the recipient's inbox?'",
                    "Authentication is one factor in the larger deliverability equation. Even if your SPF, DKIM, and DMARC records are configured correctly, your emails can still encounter delivery problems if you have high bounce rates, poor sender reputation, spam complaints, low-quality prospect data, excessive sending volumes, or irrelevant messaging.",
                    "In other words, authentication establishes trust in the sender, but it doesn't guarantee inbox placement.",
                  ]}
                  infographic={{
                    title: 'Authentication ≠ Deliverability',
                    paragraphs: ['Authentication proves legitimacy; deliverability depends on reputation, engagement, and more.'],
                    bullets: [
                      'Authentication = technical trust',
                      'Deliverability = inbox placement',
                      'Both are necessary but not sufficient alone',
                      'Reputation and engagement also matter',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Which Authentication Methods Do Sales Teams Actually Need? */}
                <ArticleSection
                  key="what-sales-teams-need"
                  id="what-sales-teams-need"
                  title="Which Authentication Methods Do Sales Teams Actually Need?"
                  showImage={false}
                  intro={[
                    "For most B2B sales teams, you don't need to implement all 12 technologies.",
                    "The core setup should generally include:",
                    "SPF – Authorize legitimate sending infrastructure.",
                    "DKIM – Cryptographically authenticate outgoing messages.",
                    "DMARC – Define how authentication failures should be handled and monitor domain usage.",
                    "TLS – Protect email traffic during transmission.",
                    "The other standards become relevant depending on your organization's size, infrastructure, security requirements, and email architecture.",
                  ]}
                  infographic={{
                    title: 'Core stack for sales teams',
                    paragraphs: ['Focus on SPF, DKIM, DMARC, and TLS – everything else is optional.'],
                    bullets: [
                      'SPF – authorize sending servers',
                      'DKIM – cryptographic message signatures',
                      'DMARC – policy and reporting',
                      'TLS – encrypt email transport',
                    ],
                  }}
                  blocks={[]}
                />

                {/* How to Check Your Email Authentication */}
                <ArticleSection
                  key="how-to-check"
                  id="how-to-check"
                  title="How to Check Your Email Authentication"
                  showImage={false}
                  intro={[
                    "Before launching an outbound campaign, verify that your authentication setup is working correctly.",
                    "Review: SPF record, DKIM record, DMARC record, DMARC alignment, sending domains, third-party email services, and TLS configuration.",
                    "You should also confirm that every platform authorized to send email for your domain is correctly represented in your authentication setup. A common mistake is adding multiple SPF records. A domain should have a single SPF policy that includes all legitimate sending services.",
                    "If you're unsure about your configuration, involve your domain administrator or email infrastructure team before making changes.",
                  ]}
                  infographic={{
                    title: 'Checklist',
                    paragraphs: ['Validate your setup before sending campaigns.'],
                    bullets: [
                      'SPF record (single, includes all senders)',
                      'DKIM key (public key in DNS)',
                      'DMARC record (policy and reporting)',
                      'DMARC alignment (SPF/DKIM align with From)',
                      'TLS (encryption in transit)',
                      'Third‑party services are included',
                    ],
                  }}
                  blocks={[]}
                />

                {/* Common Email Authentication Mistakes */}
                <ArticleSection
                  key="common-mistakes"
                  id="common-mistakes"
                  title="Common Email Authentication Mistakes"
                  showImage={false}
                  intro={[
                    "Using multiple SPF records: Multiple SPF TXT records can cause authentication failures. Consolidate authorized senders into a single SPF policy.",
                    "Forgetting third-party platforms: If your sales platform sends email on your behalf, make sure its sending infrastructure is properly authorized and authenticated.",
                    "Publishing an incorrect DKIM key: A mismatch between the private signing key and public DNS key can cause DKIM verification to fail.",
                    "Ignoring DMARC alignment: Passing SPF or DKIM alone isn't necessarily enough for DMARC. The authenticated domain needs to align appropriately with the visible From domain under the relevant DMARC rules.",
                    "Assuming authentication guarantees inbox placement: Authentication is necessary, but sender reputation, engagement, content, and recipient behavior still matter.",
                  ]}
                  infographic={{
                    title: 'Common mistakes',
                    paragraphs: ['Avoid these authentication pitfalls.'],
                    bullets: [
                      'Multiple SPF records',
                      'Missing third‑party platforms',
                      'Incorrect DKIM keys',
                      'DMARC alignment issues',
                      'Assuming authentication = inbox placement',
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
                    "Email authentication provides the technical foundation for trustworthy email communication. SPF helps identify authorized senders. DKIM provides cryptographic message signatures. DMARC builds policy and alignment around those mechanisms. Technologies such as ARC, BIMI, MTA-STS, TLS-RPT, DANE, S/MIME, and PGP/GPG address additional authentication, security, identity, or transport requirements.",
                    "For most B2B sales teams, however, the priority should be getting the fundamentals right. Configure SPF, DKIM, and DMARC correctly, use secure email transport, maintain healthy sending practices, and monitor your domain continuously.",
                    "Authentication alone won't guarantee that your cold emails reach the inbox. But without a properly authenticated sending infrastructure, you're making it significantly harder to establish trust with receiving email providers.",
                    "As outbound programs scale, dedicated platforms such as 360Airo can help sales teams manage campaigns, inboxes, personalization, sequencing, and deliverability workflows from a centralized platform.",
                    "The takeaway is simple: authenticate your sending infrastructure first, then optimize everything else around it.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      '360Airo helps revenue teams manage authentication, deliverability, and outbound campaigns from one platform – so you can focus on building pipeline.',
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
                  {
                    title: '8 Reasons Your Emails Go to Spam (And How to Fix Them)',
                    tag: 'Listicles',
                    href: '/blogs/reasons-emails-go-to-spam-and-how-to-fix',
                    description: 'Learn the top 8 reasons your emails go to spam – and how to fix them.',
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