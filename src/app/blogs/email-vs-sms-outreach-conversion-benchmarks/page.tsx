import type { Metadata } from 'next';
import EmailVsSmsClient from './EmailVsSmsClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL =
  'https://360airo.com/blog/email-vs-sms-outreach-conversion-benchmarks';
const OG_IMAGE =
  'https://360airo.com/og-images/email-vs-sms-outreach.jpg';
const PAGE_TITLE = 'Email vs SMS Outreach: Conversion Benchmarks';
const PAGE_DESCRIPTION =
  'Compare email vs SMS outreach conversion benchmarks, response rates, engagement, and ROI to understand which channel works best for different sales campaigns.';
const TWITTER_DESCRIPTION =
  'Compare email and SMS outreach benchmarks across conversion rates, engagement, response rates, and ROI to choose the right channel.';
const DATE_PUBLISHED = '2026-08-18T08:00:00+00:00';
const DATE_MODIFIED = '2026-08-18T08:00:00+00:00';

/* ────────────────────────────────────────────────────────────
   Metadata (Next.js App Router API)
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // ── Core ────────────────────────────────────────────────
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'email vs SMS outreach',
    'email conversion rates',
    'SMS conversion rates',
    'email outreach benchmarks',
    'SMS outreach benchmarks',
    'email vs SMS conversion',
    'multichannel outreach',
    'email vs SMS marketing',
    'SMS sales outreach',
    'email outreach',
    'SMS outreach',
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
    siteName: '360 Airo',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Email vs SMS Outreach: Conversion Benchmarks',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Sales & Outreach',
    tags: [
      'email vs SMS outreach',
      'email conversion rates',
      'SMS conversion rates',
      'email outreach benchmarks',
      'SMS outreach benchmarks',
      'email vs SMS conversion',
      'multichannel outreach',
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
  authors: [{ name: '360 Airo', url: 'https://360airo.com/' }],
  category: 'Sales & Outreach',
  creator: '360 Airo',
  publisher: '360 Airo',
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
      name: '360 Airo',
      url: 'https://360airo.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://360airo.com/logo.svg',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://360airo.com/#website',
      name: '360 Airo',
      url: 'https://360airo.com/',
      publisher: { '@id': 'https://360airo.com/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}/#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { '@id': 'https://360airo.com/#website' },
      breadcrumb: { '@id': `${PAGE_URL}/#breadcrumb` },
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
      '@id': `${PAGE_URL}/#article`,
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      image: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      author: { '@id': 'https://360airo.com/#organization' },
      publisher: { '@id': 'https://360airo.com/#organization' },
      mainEntityOfPage: { '@id': `${PAGE_URL}/#webpage` },
      articleSection: 'Sales & Outreach',
      keywords: [
        'email vs SMS outreach',
        'email conversion rates',
        'SMS conversion rates',
        'email outreach benchmarks',
        'SMS outreach benchmarks',
        'email vs SMS conversion',
        'multichannel outreach',
      ],
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_MODIFIED,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}/#breadcrumb`,
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
          name: 'Blog',
          item: 'https://360airo.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: PAGE_TITLE,
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is SMS more effective than email?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SMS often generates faster engagement, while email provides more space for detailed communication. The best results usually come from using both together.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is SMS sales outreach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SMS sales outreach is the use of business text messaging to engage prospects and customers throughout the sales process, including follow-ups, reminders, and appointment confirmations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I replace email with SMS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Email and SMS serve different purposes. Combining both channels creates a more balanced and effective outreach strategy.',
          },
        },
        {
          '@type': 'Question',
          name: 'When should I send an SMS instead of an email?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use SMS for time-sensitive communication, meeting reminders, follow-ups, and quick confirmations. Use email when you need to share detailed information or educational content.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which channel converts better?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The answer depends on your audience, message, and stage of the buyer journey. Revenue teams typically achieve the best conversion benchmarks by integrating email and SMS into a coordinated outreach strategy.',
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
      {/* Preload hero image */}
      <link
        rel="preload"
        fetchPriority="high"
        as="image"
        href="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp"
        type="image/webp"
      />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Client UI */}
      <EmailVsSmsClient />
    </>
  );
}