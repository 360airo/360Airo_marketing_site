import type { Metadata } from 'next';
import ColdEmailMetricsClient from './ColdEmailMetricsClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL =
  'https://360airo.com/blog/key-metrics-used-to-measure-cold-email-outreach-success';
const OG_IMAGE = 'https://360airo.com/og-images/cold-email-metrics.jpg';
const PAGE_TITLE = 'Cold Email Metrics: Key KPIs to Measure Outreach Success';
const ARTICLE_TITLE =
  'Key Metrics Used to Measure Cold Email Outreach Success';
const PAGE_DESCRIPTION =
  'Learn which cold email metrics matter most, from open and reply rates to meetings, conversions, bounce rates, and ROI, to measure outreach success.';
const TWITTER_DESCRIPTION =
  'Discover the key cold email KPIs to track, including reply rates, conversions, meetings booked, bounce rates, and ROI.';
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
    'cold email metrics',
    'cold email KPIs',
    'cold email outreach metrics',
    'cold email success metrics',
    'email outreach KPIs',
    'cold email reply rate',
    'cold email conversion rate',
    'cold email ROI',
    'email deliverability',
    'cold email benchmark',
    'cold email analytics',
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
        alt: 'Cold Email Metrics: Key KPIs to Measure Outreach Success',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Email Outreach',
    tags: [
      'cold email metrics',
      'cold email KPIs',
      'cold email outreach metrics',
      'cold email success metrics',
      'cold email reply rate',
      'cold email conversion rate',
      'cold email ROI',
      'email outreach KPIs',
      'email deliverability',
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
  category: 'Email Outreach',
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
      articleSection: 'Email Outreach',
      keywords: [
        'cold email metrics',
        'cold email KPIs',
        'cold email outreach metrics',
        'cold email success metrics',
        'cold email reply rate',
        'cold email conversion rate',
        'cold email ROI',
        'email outreach KPIs',
        'email deliverability',
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
          name: 'What are the key metrics to measure cold email outreach success?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The key metrics include delivery rate, bounce rate, email open rate, email response rate, positive reply rate, conversion rate, unsubscribe rate, spam complaint rate, meetings booked, and pipeline generated.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which KPIs matter in cold email campaigns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The most valuable KPIs depend on campaign goals, but positive replies, qualified meetings, opportunities created, and pipeline generated generally provide stronger business insight than open rates alone.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I improve cold email reply rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Improve targeting, use verified prospect data, personalize messaging, communicate a clear value proposition, simplify the call to action, and optimize follow-up timing based on campaign performance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are cold email open rate benchmarks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cold email open rates vary based on audience, industry, personalization, deliverability, and tracking methodology. Teams should compare performance across similar campaigns and use their own historical results as a primary benchmark.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the best metrics for outbound email campaigns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best metrics include deliverability, bounce rate, reply rate, positive reply rate, meeting conversion rate, opportunities created, and pipeline generated.',
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
      <ColdEmailMetricsClient />
    </>
  );
}