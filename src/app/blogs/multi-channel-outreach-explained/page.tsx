import type { Metadata } from 'next';
import MultiChannelOutreachClient from './MultiChannelOutreachClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL = 'https://360airo.com/blog/multi-channel-outreach-explained';
const OG_IMAGE = 'https://360airo.com/og-images/multi-channel-outreach.jpg';
const PAGE_TITLE =
  'Multi-Channel Outreach: Definition, Benefits & Best Practices';
const ARTICLE_TITLE = 'Multi-Channel Outreach Explained';
const PAGE_DESCRIPTION =
  'Learn what multi-channel outreach is, how email, LinkedIn, SMS, and other channels work together, and how to build effective outbound campaigns.';
const TWITTER_DESCRIPTION =
  'Understand multi-channel outreach, its benefits, key channels, and how to build effective email, LinkedIn, and SMS outbound campaigns.';
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
    'multi-channel outreach',
    'multichannel outreach',
    'multichannel outreach strategy',
    'multichannel sales outreach',
    'multichannel prospecting',
    'outbound outreach',
    'multichannel sales engagement',
    'email LinkedIn SMS outreach',
    'omnichannel outreach',
    'multi-channel cadence',
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
        alt: 'Multi-Channel Outreach: Definition, Benefits & Best Practices',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Multichannel Outreach',
    tags: [
      'multi-channel outreach',
      'multichannel outreach',
      'multi-channel outreach strategy',
      'multichannel sales outreach',
      'multichannel prospecting',
      'outbound outreach',
      'multichannel sales engagement',
      'email LinkedIn SMS outreach',
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
  category: 'Multichannel Outreach',
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
      name: ARTICLE_TITLE,
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
      headline: ARTICLE_TITLE,
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
      articleSection: 'Multichannel Outreach',
      keywords: [
        'multi-channel outreach',
        'multichannel outreach',
        'multi-channel outreach strategy',
        'multichannel sales outreach',
        'multichannel prospecting',
        'outbound outreach',
        'multichannel sales engagement',
        'email LinkedIn SMS outreach',
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
          name: ARTICLE_TITLE,
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
          name: 'What is multi-channel outreach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multi-channel outreach is a sales and marketing strategy that uses multiple communication channels, such as email, LinkedIn, SMS, and other touchpoints, to engage prospects throughout an outbound campaign.',
          },
        },
        {
          '@type': 'Question',
          name: 'What channels are used in multi-channel outreach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Common channels include cold email, LinkedIn, SMS, phone calls, and other digital communication channels. The specific combination depends on the audience, campaign objective, and sales process.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between multichannel and omnichannel outreach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multichannel outreach uses multiple channels to engage prospects, while omnichannel outreach focuses on creating a connected and consistent experience across those channels, with customer interactions and context carried between touchpoints.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is multi-channel outreach better than email outreach alone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multi-channel outreach can create more opportunities to engage prospects because it combines different communication channels. Its effectiveness depends on targeting, messaging, timing, personalization, channel selection, and campaign execution.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can AI automate multi-channel outreach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. AI-powered outreach platforms can help automate prospect research, message personalization, email sequences, follow-ups, scheduling, campaign management, and reporting across multiple outreach channels.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you measure multi-channel outreach success?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Multi-channel outreach can be measured using metrics such as delivery rates, engagement, replies, positive response rates, meetings booked, conversion rates, pipeline generated, revenue, and return on investment.',
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
      <MultiChannelOutreachClient />
    </>
  );
}