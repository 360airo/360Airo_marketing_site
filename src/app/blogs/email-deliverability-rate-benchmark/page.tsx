import type { Metadata } from 'next';
import DeliverabilityFactorsClient from './DeliverabilityFactorsClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL =
  'https://360airo.com/blogs/what-factors-influence-email-deliverability';
const OG_IMAGE = 'https://360airo.com/og-image.jpg';
const PAGE_TITLE =
  'What Factors Influence Email Deliverability? Key Factors Explained';
const PAGE_DESCRIPTION =
  'Learn what factors influence email deliverability, including sender reputation, email authentication, engagement, content, bounce rates, spam complaints, and sending practices.';
const TWITTER_DESCRIPTION =
  'Learn the key factors that influence email deliverability, including sender reputation, authentication, engagement, and sending practices.';
const DATE_PUBLISHED = '2026-06-01T08:00:00+00:00';
const DATE_MODIFIED = '2026-06-15T08:00:00+00:00';

/* ────────────────────────────────────────────────────────────
   Metadata (Next.js App Router API)
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // ── Core ────────────────────────────────────────────────
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'email deliverability',
    'email deliverability rate',
    'email deliverability benchmark',
    'what factors influence email deliverability',
    'email sender reputation',
    'email authentication',
    'SPF DKIM DMARC',
    'email list hygiene',
    'bounce rate',
    'spam complaint rate',
    'email warmup',
    'improve email deliverability',
  ],

  // ── Canonical ───────────────────────────────────────────
  alternates: { canonical: PAGE_URL },

  // ── Robots ──────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },

  // ── Open Graph ──────────────────────────────────────────
  openGraph: {
    type: 'article',
    title: PAGE_TITLE,
    description:
      'Explore the key factors that influence email deliverability, from sender reputation and authentication to engagement, content, bounce rates, and spam complaints.',
    url: PAGE_URL,
    siteName: '360Airo',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Factors That Influence Email Deliverability',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Email Deliverability',
    tags: [
      'email deliverability',
      'email sender reputation',
      'email authentication',
      'SPF DKIM DMARC',
      'email list hygiene',
      'bounce rate',
      'spam complaint rate',
      'email warmup',
      'improve email deliverability',
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: TWITTER_DESCRIPTION,
    images: [OG_IMAGE],
    creator: '@360airo',
    site: '@360airo',
  },

  // ── Extra ───────────────────────────────────────────────
  authors: [{ name: '360Airo', url: 'https://360airo.com/' }],
  category: 'Email Deliverability',
  creator: '360Airo',
  publisher: '360Airo',
  other: {
    'theme-color': '#08124A',
  },
};

/* ────────────────────────────────────────────────────────────
   JSON-LD — combined @graph
   ──────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://360airo.com/#organization',
      name: '360Airo',
      url: 'https://360airo.com/',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://360airo.com/#logo',
        url: 'https://360airo.com/logo.svg',
        contentUrl: 'https://360airo.com/logo.svg',
      },
      sameAs: [
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
      url: 'https://360airo.com/',
      name: '360Airo',
      publisher: { '@id': 'https://360airo.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { '@id': 'https://360airo.com/#website' },
      about: {
        '@type': 'Thing',
        name: 'Email Deliverability',
      },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
      publisher: { '@id': 'https://360airo.com/#organization' },
      mainEntity: { '@id': `${PAGE_URL}#article` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      url: PAGE_URL,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
      publisher: { '@id': 'https://360airo.com/#organization' },
      author: { '@id': 'https://360airo.com/#organization' },
      image: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      articleSection: 'Email Deliverability',
      keywords: [
        'email deliverability',
        'email deliverability rate',
        'email deliverability benchmark',
        'what factors influence email deliverability',
        'email sender reputation',
        'email authentication',
        'SPF DKIM DMARC',
        'email list hygiene',
        'bounce rate',
        'spam complaint rate',
        'email warmup',
        'improve email deliverability',
      ],
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://360airo.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blogs',
          item: 'https://360airo.com/blogs',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'What Factors Influence Email Deliverability?',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is email deliverability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Email deliverability is the ability of an email to reach the recipient's inbox rather than being rejected, blocked, or filtered into spam.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why is 95–99% deliverability considered a benchmark?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A 95–99% delivery rate indicates that most messages are being accepted by recipient mail servers. However, delivery rate should be evaluated alongside inbox placement, bounce rates, and spam complaints.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does sender reputation affect email deliverability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sender reputation helps mailbox providers evaluate the trustworthiness of sending activity. Poor reputation may increase the likelihood of filtering, throttling, or rejection.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are SPF, DKIM, and DMARC important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "These authentication standards help recipient servers verify that messages are legitimately associated with the sending domain and haven't been altered during transit.",
          },
        },
        {
          '@type': 'Question',
          name: 'How does email list hygiene improve deliverability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Maintaining clean and verified contact data reduces hard bounces and helps protect sender reputation.',
          },
        },
      ],
    },
  ],
};

/* ────────────────────────────────────────────────────────────
   Page (server component)
   ──────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Client UI */}
      <DeliverabilityFactorsClient />
    </>
  );
}