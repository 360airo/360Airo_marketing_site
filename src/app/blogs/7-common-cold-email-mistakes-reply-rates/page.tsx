import type { Metadata } from 'next';
import ColdEmailMistakesClient from './ColdEmailMistakesClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL =
  'https://360airo.com/blog/7-common-cold-email-mistakes-that-kill-reply-rates';
const OG_IMAGE =
  'https://360airo.com/og-images/common-cold-email-mistakes.jpg';
const PAGE_TITLE = '7 Cold Email Mistakes That Kill Reply Rates & Fixes';
const ARTICLE_TITLE =
  '7 Common Cold Email Mistakes That Kill Reply Rates (And How to Fix Them)';
const PAGE_DESCRIPTION =
  'Discover 7 common cold email mistakes that reduce reply rates and learn how to fix targeting, personalization, subject lines, CTAs, follow-ups, and deliverability.';
const TWITTER_DESCRIPTION =
  'Learn 7 cold email mistakes that hurt reply rates and how to improve targeting, personalization, messaging, CTAs, follow-ups, and deliverability.';
const DATE_PUBLISHED = '2026-10-25T08:00:00+00:00';
const DATE_MODIFIED = '2026-10-25T08:00:00+00:00';

/* ────────────────────────────────────────────────────────────
   Metadata (Next.js App Router API)
   ──────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // ── Core ────────────────────────────────────────────────
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'cold email mistakes',
    'cold email reply rates',
    'improve cold email reply rate',
    'cold email best practices',
    'cold email mistakes to avoid',
    'cold email outreach mistakes',
    'cold email personalization',
    'cold email follow-up',
    'cold email CTA',
    'cold email deliverability',
    'cold email response rate',
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
        alt: '7 Common Cold Email Mistakes That Kill Reply Rates',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Cold Email',
    tags: [
      'cold email mistakes',
      'cold email reply rates',
      'improve cold email reply rate',
      'cold email best practices',
      'cold email mistakes to avoid',
      'cold email personalization',
      'cold email follow-up',
      'cold email deliverability',
      'cold email response rate',
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
  category: 'Cold Email',
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
      articleSection: 'Cold Email',
      keywords: [
        'cold email mistakes',
        'cold email reply rates',
        'improve cold email reply rate',
        'cold email best practices',
        'cold email mistakes to avoid',
        'cold email personalization',
        'cold email follow-up',
        'cold email deliverability',
        'cold email response rate',
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
          name: 'Why are my cold emails not getting replies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cold emails may receive few replies because of poor prospect targeting, generic messaging, weak personalization, unclear value propositions, ineffective calls to action, insufficient follow-ups, or email deliverability problems.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I improve my cold email reply rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Improve your cold email reply rate by targeting relevant prospects, personalizing messages around the recipient’s context, communicating a clear value proposition, using simple calls to action, testing messaging, following up appropriately, and maintaining good email deliverability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does personalization increase cold email reply rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Relevant personalization can improve cold email engagement by making messages more specific to the recipient. Effective personalization should reflect useful information about the prospect rather than simply inserting their name or company.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many follow-ups should a cold email sequence have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There is no universal number of follow-ups that works for every campaign. The appropriate sequence length depends on the audience, offer, sales cycle, messaging, and engagement signals. Follow-ups should provide additional context or value rather than simply repeating the original email.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can poor email deliverability reduce cold email reply rates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. If emails are rejected, filtered into spam, or fail to reach the recipient’s inbox, fewer prospects will see the message and have an opportunity to respond. Sender reputation, authentication, bounce rates, list quality, and sending behavior can affect deliverability.',
          },
        },
        {
          '@type': 'Question',
          name: 'What makes a good cold email call to action?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A good cold email call to action is clear, specific, relevant to the prospect, and easy to respond to. Simple questions or low-friction next steps are often easier for prospects to act on than complex requests.',
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
      <ColdEmailMistakesClient />
    </>
  );
}