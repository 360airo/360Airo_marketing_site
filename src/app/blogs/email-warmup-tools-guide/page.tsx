import type { Metadata } from 'next';
import EmailWarmupToolsClient from './EmailWarmupToolsClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL = 'https://360airo.com/blogs/what-are-email-warmup-tools';
const OG_IMAGE = 'https://360airo.com/og-image.jpg';
const PAGE_TITLE =
  'What Are Email Warmup Tools? How They Improve Email Deliverability';
const PAGE_DESCRIPTION =
  'Learn what email warmup tools are, how they work, why email warmup matters, and how they help improve sender reputation and email deliverability.';
const TWITTER_DESCRIPTION =
  'Learn how email warmup tools work and how they can help improve sender reputation and email deliverability.';
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
    'email warmup tools',
    'email warmup',
    'email warming',
    'email warmup tool',
    'email warmup software',
    'email warmup service',
    'email sender reputation',
    'email deliverability',
    'email domain warmup',
    'automated email warmup',
    'email warmup API',
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
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: '360Airo',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'What Are Email Warmup Tools',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Email Deliverability',
    tags: [
      'email warmup tools',
      'email warmup',
      'email warming',
      'email warmup software',
      'email warmup service',
      'email sender reputation',
      'email deliverability',
      'email domain warmup',
      'automated email warmup',
      'email warmup API',
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
        name: 'Email Warmup Tools',
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
        'email warmup tools',
        'email warmup',
        'email warming',
        'email warmup software',
        'email warmup service',
        'email sender reputation',
        'email deliverability',
        'email domain warmup',
        'automated email warmup',
        'email warmup API',
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
          name: 'What Are Email Warmup Tools?',
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
          name: 'What is an email warmup tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An email warmup tool is software that automates gradual sending activity and helps monitor mailbox performance before higher-volume outreach begins.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are email warmup services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email warmup services help establish consistent sending activity for new or inactive email accounts through gradual volume increases and performance monitoring.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does email warmup actually work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email warmup can support consistent sending behavior, but it works best alongside authentication, clean data, responsible sending practices, and deliverability monitoring.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best email warmer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best email warmer depends on your needs. Look for automated warmup, multiple mailbox management, deliverability visibility, reputation monitoring, and useful integrations.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Email Warmup Outlook?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Email warmup for Outlook involves gradually establishing consistent sending activity while monitoring performance across Microsoft's email ecosystem. Sender reputation, authentication, engagement, and list quality remain important.",
          },
        },
        {
          '@type': 'Question',
          name: 'Which factors can negatively impact email sender reputation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'High bounce rates, spam complaints, poor list quality, missing authentication, sudden volume increases, and consistently low engagement can negatively affect sender reputation.',
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
      <EmailWarmupToolsClient />
    </>
  );
}