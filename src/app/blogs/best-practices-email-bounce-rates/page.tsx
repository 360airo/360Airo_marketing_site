import type { Metadata } from 'next';
import BounceRateClient from './BounceRateClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL =
  'https://360airo.com/blogs/best-practices-to-keep-email-bounce-rates-low';
const OG_IMAGE = 'https://360airo.com/og-image.jpg';
const PAGE_TITLE = 'Best Practices to Keep Email Bounce Rates Low | Email Guide';
const ARTICLE_TITLE = 'Best Practices to Keep Email Bounce Rates Low';
const PAGE_DESCRIPTION =
  'Learn the best practices to keep email bounce rates low, including email verification, list hygiene, reducing invalid addresses, managing sending volume, and improving email deliverability.';
const OG_DESCRIPTION =
  'Discover practical ways to reduce email bounce rates through list hygiene, email verification, better sending practices, and improved deliverability.';
const TWITTER_DESCRIPTION =
  'Learn practical ways to reduce email bounce rates and improve email deliverability through better list and sending practices.';
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
    'email bounce rate',
    'keep email bounce rates low',
    'email bounce rate best practices',
    'reduce email bounce rate',
    'email verification',
    'email list hygiene',
    'email deliverability',
    'hard bounce',
    'soft bounce',
    'SPF DKIM DMARC',
    'email warmup',
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
    description: OG_DESCRIPTION,
    url: PAGE_URL,
    siteName: '360Airo',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Best Practices to Keep Email Bounce Rates Low',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Email Deliverability',
    tags: [
      'email bounce rate',
      'email verification',
      'email list hygiene',
      'email deliverability',
      'hard bounce',
      'soft bounce',
      'SPF DKIM DMARC',
      'email warmup',
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
      name: ARTICLE_TITLE,
      description: OG_DESCRIPTION,
      isPartOf: { '@id': 'https://360airo.com/#website' },
      about: {
        '@type': 'Thing',
        name: 'Email Bounce Rate',
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
      headline: ARTICLE_TITLE,
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
        'email bounce rate',
        'keep email bounce rates low',
        'email bounce rate best practices',
        'reduce email bounce rate',
        'email verification',
        'email list hygiene',
        'email deliverability',
        'hard bounce',
        'soft bounce',
        'SPF DKIM DMARC',
        'email warmup',
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
          name: ARTICLE_TITLE,
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
          name: 'What is email bounce rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email bounce rate is the percentage of sent emails that cannot be successfully delivered to recipients.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does keeping bounce rates below 3% matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A lower bounce rate supports healthier sender reputation, cleaner campaign data, and stronger email deliverability. Consistently high bounce rates may indicate problems with contact data or sending infrastructure.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between hard bounces and soft bounces?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hard bounces are permanent delivery failures, often caused by invalid addresses or domains. Soft bounces are generally temporary and may be caused by full inboxes or short-term server issues.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does email verification reduce bounce rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email verification helps identify invalid, malformed, or risky addresses before campaigns begin, reducing the likelihood of sending to contacts that cannot receive messages.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should email lists be cleaned?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The right frequency depends on database size, data sources, and campaign volume. High-volume outbound teams should review and verify contact data regularly rather than relying on occasional list cleaning.',
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
      <BounceRateClient />
    </>
  );
}