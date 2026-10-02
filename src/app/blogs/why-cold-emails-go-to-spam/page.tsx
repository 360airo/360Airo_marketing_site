'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Head from 'next/head';
import '../../../styles/blogs.css';

// ---------- FAQ Accordion Component (local) ----------
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

// ---------- Table of Contents ----------
type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'what-is-a-spam-filter', label: '1. What Is a Spam Filter?', arrow: true },
  { id: 'technical-setup', label: '2. Technical Setup: Build Trust Before You Send', arrow: true },
  { id: 'authenticate-domain', label: '2.1 Authenticate Your Domain', arrow: true, indent: true },
  { id: 'warm-up-domains', label: '2.2 Warm Up New Domains', arrow: true, indent: true },
  { id: 'protect-reputation', label: '2.3 Protect Your Sender Reputation', arrow: true, indent: true },
  { id: 'verify-addresses', label: '2.4 Verify Every Email Address', arrow: true, indent: true },
  { id: 'send-consistently', label: '2.5 Send Consistently', arrow: true, indent: true },
  { id: 'checklist', label: 'Technical Checklist Before Every Campaign', arrow: true, indent: true },
  { id: 'content-rules', label: '3. Content Rules: What You Write Matters', arrow: true },
  { id: 'write-like-a-person', label: '3.1 Write Like a Person, Not a Promotion', arrow: true, indent: true },
  { id: 'keep-formatting-simple', label: '3.2 Keep Formatting Simple', arrow: true, indent: true },
  { id: 'personalization-improves', label: '3.3 Personalization Improves Deliverability', arrow: true, indent: true },
  { id: 'spam-trigger-words', label: 'Top 10 Spam Trigger Words to Avoid', arrow: true, indent: true },
  { id: 'test-before-scale', label: '4. Test Before You Scale', arrow: true },
  { id: 'send-test-emails', label: '4.1 Send Test Emails Across Different Providers', arrow: true, indent: true },
  { id: 'monitor-metrics', label: '4.2 Monitor Deliverability Metrics', arrow: true, indent: true },
  { id: 'test-one-variable', label: '4.3 Test One Variable at a Time', arrow: true, indent: true },
  { id: 'common-reasons', label: '5. Common Reasons Cold Emails Go to Spam', arrow: true },
  { id: 'faqs', label: 'Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: 'Keep Your Cold Emails Out of Spam', arrow: true },
];

// ---------- Reusable Components ----------
function MiniInfographic({ title, paragraphs, bullets }: { title: string; paragraphs: string[]; bullets?: string[] }) {
  return (
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
      <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">{title}</h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
      </div>
      {bullets && (
        <ul className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
          {bullets.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

function ContentBlock({ subtitle, paragraphs, bullets }: { subtitle: string; paragraphs: string[]; bullets?: string[] }) {
  return (
    <div>
      <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">{subtitle}</h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => <p key={index}>{text}</p>)}
      </div>
      {bullets && (
        <ul className="mt-2 md:mt-3 space-y-2 md:space-y-3 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
          {bullets.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      )}
    </div>
  );
}

function SectionImage() {
  const image = {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Email spam filter concept',
    label: 'Spam Prevention',
  };
  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" priority={false} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({ id, title, intro, blocks, infographic, showImage = true }: any) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">{title}</h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
            {intro.map((text: string, index: number) => <p key={index}>{text}</p>)}
          </div>
        )}
        {infographic && <MiniInfographic {...infographic} />}
        {blocks.map((block: any) => {
          if (block.subtitle === 'Stop guessing. Start reaching the inbox.') {
            return (
              <div key={block.subtitle} className="mt-6 md:mt-8">
                <div className="rounded-[24px] bg-gradient-to-br from-[#0C162C] to-[#1a2a4a] p-6 md:p-10 text-white shadow-xl border border-[#2a3a6a]">
                  <h3 className="text-[22px] md:text-[28px] font-bold leading-tight mb-3 md:mb-4">
                    {block.subtitle}
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-[15px] md:text-[17px] leading-7 text-gray-200 text-justify">
                    {block.paragraphs.map((text: string, idx: number) => (
                      <p key={idx}>{text}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button className="px-6 py-3 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base hover:bg-[#3a4ee0] transition shadow-lg hover:shadow-[#4f63ff]/30">
                      Book a Demo →
                    </button>
                    <button className="px-6 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return <ContentBlock key={block.subtitle} {...block} />;
        })}
        {showImage && <SectionImage />}
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
          Spam Protection Made Simple
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Keep your cold emails out of spam with built‑in warmup, authentication, and deliverability monitoring.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white text-[12px] md:text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-3 md:p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">Quick Tip</p>
        <h4 className="text-[12px] md:text-[13px] leading-5 font-bold text-[#111827] mb-1 md:mb-2">
          Authenticate before you send
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          SPF, DKIM, and DMARC aren't optional for cold email. They're essential for inbox placement.
        </p>
      </div>
    </aside>
  );
}

// ---------- Main Page Component ----------
export default function BlogColdEmailsSpamPage() {
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
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const featuredImageUrl = 'https://360airo.com/og-images/why-cold-emails-go-to-spam.jpg';

  return (
    <>
      <Head>
        <title>Why Cold Emails Go to Spam: Causes &amp; Fixes</title>
        <meta
          name="description"
          content="Find out why cold emails go to spam and how to improve deliverability. Learn about sender reputation, authentication, content, lists, and email warm-up."
        />
        <meta
          name="keywords"
          content="why cold emails go to spam, cold email spam, cold email deliverability, emails going to spam, cold email spam folder, improve cold email deliverability, email sender reputation, email warm-up, SPF DKIM DMARC, cold email best practices"
        />
        <link
          rel="canonical"
          href="https://360airo.com/blog/why-your-cold-emails-go-to-spam"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Why Cold Emails Go to Spam: Causes &amp; Fixes"
        />
        <meta
          property="og:description"
          content="Find out why cold emails go to spam and how to improve deliverability. Learn about sender reputation, authentication, content, lists, and email warm-up."
        />
        <meta
          property="og:url"
          content="https://360airo.com/blog/why-your-cold-emails-go-to-spam"
        />
        <meta property="og:site_name" content="360 Airo" />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Why Cold Emails Go to Spam: Causes &amp; Fixes"
        />
        <meta
          name="twitter:description"
          content="Learn why cold emails land in spam and what to fix, from sender reputation and authentication to email lists, content, and warm-up."
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
                  '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#webpage',
                  'url': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam',
                  'name': 'Why Your Cold Emails Go to Spam',
                  'description': 'Find out why cold emails go to spam and how to improve deliverability. Learn about sender reputation, authentication, content, lists, and email warm-up.',
                  'isPartOf': {
                    '@id': 'https://360airo.com/#website',
                  },
                  'breadcrumb': {
                    '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#breadcrumb',
                  },
                },
                {
                  '@type': 'Article',
                  '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#article',
                  'headline': 'Why Your Cold Emails Go to Spam',
                  'description': 'Find out why cold emails go to spam and how to improve deliverability. Learn about sender reputation, authentication, content, lists, and email warm-up.',
                  'url': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam',
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
                    '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#webpage',
                  },
                  'articleSection': 'Email Deliverability',
                  'keywords': [
                    'why cold emails go to spam',
                    'cold email spam',
                    'cold email deliverability',
                    'emails going to spam',
                    'cold email spam folder',
                    'improve cold email deliverability',
                    'email sender reputation',
                    'email warm-up',
                    'SPF',
                    'DKIM',
                    'DMARC',
                  ],
                  'datePublished': '2026-08-18',
                  'dateModified': '2026-08-18',
                },
                {
                  '@type': 'BreadcrumbList',
                  '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#breadcrumb',
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
                      'item': 'https://360airo.com/blog',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': 'Why Your Cold Emails Go to Spam',
                      'item': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://360airo.com/blog/why-your-cold-emails-go-to-spam/#faq',
                  'mainEntity': [
                    {
                      '@type': 'Question',
                      'name': 'Why do my cold emails go to spam?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Cold emails can land in spam because of poor sender or domain reputation, missing email authentication, high bounce or complaint rates, low-quality contact lists, sudden sending spikes, poor engagement, or content and sending patterns that trigger filtering systems.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'How can I stop cold emails from going to spam?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Improve email deliverability by authenticating your domain with SPF, DKIM, and DMARC, maintaining clean email lists, controlling sending volume, gradually warming new mailboxes, reducing spam complaints and bounces, and monitoring sender reputation and inbox placement.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Does email warm-up prevent emails from going to spam?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Email warm-up can help establish and maintain sender reputation by gradually increasing sending activity and generating healthy email interactions. It is one part of a broader deliverability strategy and does not guarantee inbox placement.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Do SPF, DKIM, and DMARC affect cold email deliverability?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Yes. SPF, DKIM, and DMARC are email authentication mechanisms that help receiving systems verify legitimate email sources and reduce unauthorized use of domains. Proper configuration is an important part of email deliverability.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Can a high bounce rate cause cold emails to go to spam?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'High bounce rates can negatively affect sender reputation and indicate poor list quality. Maintaining accurate, verified contact lists and removing invalid addresses can help reduce bounces and support better deliverability.',
                      },
                    },
                    {
                      '@type': 'Question',
                      'name': 'Does changing email content fix spam placement?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Changing email content may help when message patterns contribute to filtering, but spam placement depends on multiple factors including sender reputation, authentication, recipient engagement, list quality, sending behavior, and message content.',
                      },
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
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          @font-face { font-family: 'Barlow Condensed'; font-display: swap; }
          @font-face { font-family: 'DM Sans'; font-display: swap; }
          @font-face { font-family: 'Outfit'; font-display: swap; }
          .hero-fade { opacity: 0; animation: heroFadeIn 0.8s ease forwards; }
          @keyframes heroFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          .hero-fade-delay-1 { animation-delay: 0.1s; }
          .hero-fade-delay-2 { animation-delay: 0.2s; }
        `}</style>
      </Head>

      <div className="blog-shell">
        <Navbar activeTab="resources" />
        <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
          {/* Hero Section */}
          <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4 hero-fade hero-fade-delay-1">
                <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">Blog</Link>
                <span>›</span>
                <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">Deliverability</Link>
                <span>›</span>
                <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                  <span className="hidden sm:inline">Why Your Cold Emails Go to Spam (And How to Keep Them Out)</span>
                  <span className="sm:hidden">Why Cold Emails Go to Spam</span>
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
                <div className="relative hero-fade hero-fade-delay-1">
                  <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden shadow-xl">
                    <Image
                      src="/why-email-goes-to-spam.png"
                      alt="Why cold emails go to spam hero"
                      fill
                      priority
                      fetchPriority="high"
                      decoding="sync"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </div>
                </div>

                <div className="max-w-2xl hero-fade hero-fade-delay-2">
                  <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">Deliverability Guide</p>
                  <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                    Why Your Cold Emails Go to Spam (And How to Keep Them Out)
                  </h1>
                  <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                    You've spent hours building a prospect list and personalizing emails – but days later, barely any replies. The real problem? Your prospects never saw your emails. Learn why spam filters block cold emails and how to fix it.
                  </p>
                  <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                    <span>• 360AIRO Team</span>
                    <span>• Updated: Aug 2026</span>
                    <span>• 11 min read</span>
                    <span>• 2.5K reads</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base shadow-md hover:bg-[#4154f5] transition-all">Start Reading</button>
                    <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-sm md:text-base hover:bg-white/60 transition-all">Schedule a Demo</button>
                  </div>
                </div>
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
                          isActive ? 'bg-[#edf2ff] text-[#2f66db] font-semibold' : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
                        } ${item.indent ? 'ml-3' : ''}`}
                      >
                        <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
                        <span className="flex items-start gap-1.5">
                          {item.arrow ? <span className={`mt-[1px] text-sm ${isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'}`}>›</span> : <span className="w-2" />}
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
                  id="introduction" title="Introduction" showImage={false}
                  intro={[
                    "You've spent hours building a targeted prospect list. You've personalized every email, verified your contacts, and finally clicked Send, expecting conversations to start.",
                    "Days later, your campaign has barely generated any replies.",
                    "It's easy to blame your copy or offer, but the real problem may be something else entirely—your prospects never saw your emails.",
                    "Research shows that 55% of cold emails either land in the spam folder or are blocked before reaching the inbox. Even more concerning, using common spam trigger words can reduce email deliverability by up to 30%, making even well-written emails less likely to reach their destination.",
                    "The good news is that spam placement isn't random. Email providers like Gmail, Outlook, and Yahoo evaluate hundreds of signals before deciding whether your message belongs in the inbox or the spam folder.",
                    "Understanding how these systems work is the first step toward improving deliverability.",
                    "In this guide, you'll learn why cold emails are going to spam, how email spam filters work, and the technical, content, and testing best practices that help you consistently avoid the spam folder.",
                  ]}
                  infographic={{ title: 'The core insight', paragraphs: ['55% of cold emails never reach the inbox – learn why and how to fix it.'] }}
                  blocks={[]}
                />

                <ArticleSection
                  id="what-is-a-spam-filter" title="1. What Is a Spam Filter?" showImage={false}
                  intro={[
                    "A spam filter is a security system used by email providers to decide whether an incoming email should reach the recipient's inbox, be sent to the spam folder, or be blocked entirely.",
                    "Think of it like airport security. Every passenger goes through multiple checkpoints before boarding a flight. Emails go through a similar process before reaching the inbox.",
                    "Spam filters evaluate dozens of signals, including:",
                  ]}
                  infographic={{
                    title: 'Signals spam filters check',
                    paragraphs: ['Sender reputation, domain reputation, authentication, engagement, content, sending behavior, links, attachments, and complaint history.'],
                    bullets: [
                      'Sender reputation',
                      'Domain reputation',
                      'Email authentication',
                      'Recipient engagement',
                      'Email content',
                      'Sending behavior',
                      'Links and attachments',
                      'Spam complaint history',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'The purpose',
                      paragraphs: ['Spam filters aren\'t designed to punish marketers. Their job is to protect users from phishing, malware, and unwanted promotional emails. The more trustworthy your emails appear, the more likely they are to reach the inbox.'],
                    },
                  ]}
                />

                <ArticleSection
                  id="technical-setup" title="2. Technical Setup: Build Trust Before You Send" showImage={true}
                  intro={[
                    "Most businesses spend far more time writing emails than preparing the infrastructure behind them.",
                    "That's a mistake.",
                    "Even excellent copy won't generate replies if your emails fail technical checks.",
                  ]}
                  infographic={{ title: 'Technical foundation', paragraphs: ['Authentication, warmup, reputation, verification, and consistency – the five pillars of deliverability.'] }}
                  blocks={[]}
                />

                <ArticleSection
                  id="authenticate-domain" title="2.1 Authenticate Your Domain" showImage={false}
                  intro={[
                    "Authentication proves that your emails genuinely come from your business.",
                    "Before launching any campaign, configure: SPF, DKIM, DMARC.",
                    "These authentication records reduce spoofing risks and increase trust with mailbox providers.",
                    "Without them, your emails are far more likely to be flagged as suspicious.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="warm-up-domains" title="2.2 Warm Up New Domains" showImage={false}
                  intro={[
                    "Brand-new domains have no sending history.",
                    "Sending hundreds of emails immediately is like applying for a large loan without any credit history.",
                    "Instead, increase sending volume gradually over 14–21 days. This process builds trust and establishes a healthy sender reputation.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="protect-reputation" title="2.3 Protect Your Sender Reputation" showImage={false}
                  intro={[
                    "Your sender reputation works like a business credit score.",
                    "Mailbox providers monitor: bounce rates, spam complaints, sending consistency, recipient engagement, authentication status.",
                    "Healthy sending habits strengthen your reputation. Poor habits damage it—and recovering trust can take weeks or even months.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="verify-addresses" title="2.4 Verify Every Email Address" showImage={false}
                  intro={[
                    "Invalid email addresses increase bounce rates.",
                    "High bounce rates tell mailbox providers that your contact list is outdated or poorly maintained.",
                    "Always verify email addresses before launching outbound campaigns. Clean data protects your sender reputation.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="send-consistently" title="2.5 Send Consistently" showImage={false}
                  intro={[
                    "Sudden spikes in sending volume often trigger spam filters.",
                    "For example: 20 emails on Monday, 400 emails on Tuesday – that behavior appears unnatural.",
                    "Mailbox providers prefer gradual, predictable sending patterns. Consistency builds credibility.",
                  ]}
                  blocks={[]}
                />

                <section id="checklist" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Technical Checklist Before Every Campaign
                  </h2>
                  <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                    <p>Before pressing Send, ask yourself:</p>
                  </div>
                  <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
                    <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">
                      Pre‑flight checklist
                    </h3>
                    <p className="text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify mb-4">
                      A few minutes of preparation can prevent thousands of emails from ending up in spam.
                    </p>
                    <ul className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-none pl-0">
                      <li>✅ Have you configured SPF, DKIM, and DMARC?</li>
                      <li>✅ Is your email domain fully warmed up?</li>
                      <li>✅ Have you verified every email address?</li>
                      <li>✅ Did you check whether your domain appears on any email blacklists?</li>
                      <li>✅ Are you increasing sending volume gradually instead of all at once?</li>
                    </ul>
                  </div>
                  <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                    <p>If you answered "no" to any of these questions, fix the issue before launching your campaign.</p>
                  </div>
                </section>

                <ArticleSection
                  id="content-rules" title="3. Content Rules: What You Write Matters" showImage={false}
                  intro={[
                    "Technical setup gets your email through the first checkpoint.",
                    "Your content determines whether it reaches the inbox.",
                    "Modern email spam filters don't just evaluate your reputation—they also analyze how your email looks, sounds, and performs.",
                  ]}
                  infographic={{ title: 'Content matters', paragraphs: ['Write like a person, keep formatting simple, and personalise – these improve both engagement and deliverability.'] }}
                  blocks={[]}
                />

                <ArticleSection
                  id="write-like-a-person" title="3.1 Write Like a Person, Not a Promotion" showImage={false}
                  intro={[
                    "Cold emails should feel like genuine business conversations.",
                    "If your email sounds like a marketing advertisement, spam filters—and recipients—are more likely to distrust it.",
                  ]}
                  blocks={[
                    {
                      subtitle: 'Instead of writing:',
                      paragraphs: ['"Our revolutionary platform guarantees incredible results!"'],
                    },
                    {
                      subtitle: 'Try:',
                      paragraphs: ['"I noticed your sales team has been growing, and I wondered whether managing personalized outreach has become more challenging."'],
                    },
                  ]}
                />

                <ArticleSection
                  id="keep-formatting-simple" title="3.2 Keep Formatting Simple" showImage={false}
                  intro={[
                    "Avoid: ALL CAPS, multiple exclamation marks, bright colours, large fonts, excessive bold text, multiple hyperlinks, large attachments.",
                    "Simple, text‑based emails usually perform better because they look like genuine business communication.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="personalization-improves" title="3.3 Personalization Improves Deliverability" showImage={false}
                  intro={[
                    "Personalization doesn't just improve reply rates. It also improves deliverability.",
                    "When recipients open, reply to, and engage with your emails, mailbox providers interpret those interactions as positive signals.",
                    "Instead of mentioning only the recipient's name, reference: company announcements, recent funding, hiring activity, industry trends, product launches.",
                    "Relevant emails generate stronger engagement—and stronger engagement improves inbox placement over time.",
                  ]}
                  blocks={[]}
                />

                <section id="spam-trigger-words" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Top 10 Spam Trigger Words to Avoid
                  </h2>
                  <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                    <p>While no single word guarantees spam placement, using multiple promotional phrases together can significantly increase spam scores.</p>
                  </div>
                  <MiniInfographic
                    title="Words to avoid"
                    paragraphs={['Avoid relying on words like:']}
                    bullets={[
                      'Free',
                      'Guaranteed',
                      'Buy Now',
                      'Act Immediately',
                      'Limited Time',
                      'Risk-Free',
                      'Winner',
                      'Congratulations',
                      'Cash Bonus',
                      '100% Free',
                    ]}
                  />
                  <div className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
                    <p>Instead, focus on solving business problems and creating curiosity. Professional language consistently outperforms promotional language.</p>
                  </div>
                </section>

                <ArticleSection
                  id="test-before-scale" title="4. Test Before You Scale" showImage={false}
                  intro={[
                    "Even a well‑written cold email can fail if you never test it.",
                    "One of the biggest mistakes sales teams make is launching hundreds or thousands of emails without first checking whether they're reaching the inbox. Once your sender reputation is damaged, recovering it takes far longer than preventing the problem in the first place.",
                    "That's why testing should be part of every outbound campaign.",
                  ]}
                  infographic={{ title: 'Test early, test often', paragraphs: ['Send test emails to different providers, monitor metrics, and test one variable at a time.'] }}
                  blocks={[]}
                />

                <ArticleSection
                  id="send-test-emails" title="4.1 Send Test Emails Across Different Providers" showImage={false}
                  intro={[
                    "Don't assume that because an email reaches your Gmail inbox, it will also reach Outlook or Yahoo.",
                    "Different providers use different filtering algorithms.",
                    "Before launching a campaign, send test emails to accounts on: Gmail, Outlook, Microsoft 365, Yahoo.",
                    "Check whether the email lands in the primary inbox, promotions tab, or spam folder.",
                    "If multiple providers send your emails to spam, investigate before scaling your campaign.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="monitor-metrics" title="4.2 Monitor Deliverability Metrics" showImage={false}
                  intro={[
                    "Deliverability isn't a one‑time setup—it's an ongoing process.",
                    "Review key metrics after every campaign, including: inbox placement rate, bounce rate, open rate, reply rate, spam complaint rate, sender reputation.",
                    "A sudden increase in bounce rates or spam complaints is often an early warning sign that your reputation is declining.",
                    "Identifying issues early helps protect future campaigns.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="test-one-variable" title="4.3 Test One Variable at a Time" showImage={false}
                  intro={[
                    "If your emails start landing in spam, avoid changing everything at once.",
                    "Instead, test one element at a time so you can identify the real cause.",
                    "Experiment with: subject lines, email length, call‑to‑action, sending schedule, sending volume, number of links.",
                    "Making one change at a time allows you to measure its actual impact and avoid unnecessary guesswork.",
                  ]}
                  blocks={[]}
                />

                <ArticleSection
                  id="common-reasons" title="5. Common Reasons Cold Emails Go to Spam" showImage={false}
                  intro={[
                    "If your emails consistently miss the inbox, chances are one or more of these issues is affecting your campaigns.",
                  ]}
                  infographic={{
                    title: 'Top causes',
                    paragraphs: ['Deliverability problems rarely happen because of a single mistake – they\'re the result of several small issues working together.'],
                    bullets: [
                      'Missing SPF, DKIM, or DMARC authentication',
                      'Sending from a new domain without warming it up',
                      'Using outdated or unverified email lists',
                      'High bounce rates',
                      'Sudden increases in daily sending volume',
                      'Poor sender reputation',
                      'Too many promotional phrases',
                      'Excessive links or attachments',
                      'High spam complaint rates',
                      'Low recipient engagement',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Prevention is possible',
                      paragraphs: ['Most of these issues are preventable with the right sending practices.'],
                    },
                  ]}
                />

                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    <MiniInfographic title="Quick answers" paragraphs={['Common questions about cold email spam.']} />
                    <FaqAccordion
                      faqs={[
                        {
                          subtitle: 'Why are my cold emails going to spam?',
                          paragraphs: ['Cold emails usually go to spam because of poor sender reputation, missing authentication records, high bounce rates, spam‑like content, inconsistent sending behavior, or low recipient engagement.'],
                        },
                        {
                          subtitle: 'What is a spam filter?',
                          paragraphs: ['A spam filter is a system used by email providers to evaluate incoming emails and determine whether they belong in the inbox, spam folder, or should be blocked entirely.'],
                        },
                        {
                          subtitle: 'Do spam trigger words really matter?',
                          paragraphs: ['Yes, but context matters too. Using several promotional phrases together—especially alongside poor sender reputation or high sending volumes—can increase spam scores and reduce deliverability.'],
                        },
                        {
                          subtitle: 'How can I avoid the spam folder?',
                          paragraphs: ['You can improve inbox placement by: authenticating your domain, warming up new email accounts, verifying email addresses, sending personalised emails, avoiding excessive promotional language, and monitoring sender reputation and campaign metrics.'],
                        },
                      ]}
                    />
                  </div>
                </section>

                <ArticleSection
                  id="conclusion" title="Keep Your Cold Emails Out of Spam" showImage={false}
                  intro={[
                    "When people think about cold email success, they often focus on subject lines, personalization, or call‑to‑actions.",
                    "Those factors matter—but none of them matter if your emails never reach the inbox.",
                    "Improving deliverability starts long before you write your first sentence. It begins with a trusted domain, healthy sender reputation, verified contact lists, and consistent sending habits. Combine that technical foundation with relevant, conversational emails, and you'll dramatically improve your chances of landing in front of decision‑makers.",
                    "Remember, inbox placement isn't something you achieve once. It's something you earn with every campaign.",
                    "The businesses that consistently reach the inbox don't rely on luck. They follow proven processes, monitor performance, and continuously optimize their outreach.",
                  ]}
                  infographic={{
                    title: '360Airo',
                    paragraphs: [
                      'Deliverability shouldn\'t be an obstacle to growth. 360Airo helps revenue teams improve inbox placement with built‑in email warm‑up, deliverability monitoring, sender reputation tracking, email verification, AI‑powered personalization, and campaign analytics.',
                    ],
                  }}
                  blocks={[
                    {
                      subtitle: 'Stop guessing. Start reaching the inbox.',
                      paragraphs: [
                        'Book a demo today and discover how 360Airo helps your cold emails land where they belong: the inbox.',
                      ],
                    },
                  ]}
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
                    title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                    tag: 'Cold Email',
                    href: '/blogs/10-cheapest-cold-email-software',
                    description: 'Discover affordable cold email tools for 2026.',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'What Are Email Warmup Tools and How Do They Work?',
                    tag: 'Deliverability',
                    href: '/blogs/email-warmup-tools-guide',
                    description: 'Learn how warmup tools protect sender reputation.',
                    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp',
                  },
                  {
                    title: 'Email vs SMS Outreach: Conversion Benchmarks',
                    tag: 'Multichannel',
                    href: '/blogs/email-vs-sms-outreach-conversion-benchmarks',
                    description: 'Compare email and SMS for better conversions.',
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