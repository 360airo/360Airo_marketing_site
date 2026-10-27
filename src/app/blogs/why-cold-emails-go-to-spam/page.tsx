import type { Metadata } from 'next';
import ColdEmailsSpamClient from './ColdEmailsSpamClient';

/* ────────────────────────────────────────────────────────────
   Shared constants
   ──────────────────────────────────────────────────────────── */
const PAGE_URL = 'https://360airo.com/blog/why-your-cold-emails-go-to-spam';
const OG_IMAGE = 'https://360airo.com/og-images/why-cold-emails-go-to-spam.jpg';
const PAGE_TITLE = 'Why Cold Emails Go to Spam: Causes & Fixes';
const ARTICLE_TITLE = 'Why Your Cold Emails Go to Spam';
const PAGE_DESCRIPTION =
  'Find out why cold emails go to spam and how to improve deliverability. Learn about sender reputation, authentication, content, lists, and email warm-up.';
const TWITTER_DESCRIPTION =
  'Learn why cold emails land in spam and what to fix, from sender reputation and authentication to email lists, content, and warm-up.';
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
    'why cold emails go to spam',
    'cold email spam',
    'cold email deliverability',
    'emails going to spam',
    'cold email spam folder',
    'improve cold email deliverability',
    'email sender reputation',
    'email warm-up',
    'SPF DKIM DMARC',
    'cold email best practices',
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
        alt: 'Why Cold Emails Go to Spam: Causes & Fixes',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Email Deliverability',
    tags: [
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
  category: 'Email Deliverability',
  creator: '360 Airo',
  publisher: '360 Airo',
};

/* ────────────────────────────────────────────────────────────
   JSON-LD — combined @graph (FAQ matches the visible FAQ)
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
      articleSection: 'Email Deliverability',
      keywords: [
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
          name: 'Why do my cold emails go to spam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cold emails can land in spam because of poor sender or domain reputation, missing email authentication, high bounce or complaint rates, low-quality contact lists, sudden sending spikes, poor engagement, or content and sending patterns that trigger filtering systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a spam filter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A spam filter is a system used by email providers to evaluate incoming emails and determine whether they belong in the inbox, spam folder, or should be blocked entirely.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do spam trigger words really matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but context matters too. Using several promotional phrases together—especially alongside poor sender reputation or high sending volumes—can increase spam scores and reduce deliverability.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I stop cold emails from going to spam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Improve email deliverability by authenticating your domain with SPF, DKIM, and DMARC, maintaining clean email lists, controlling sending volume, gradually warming new mailboxes, reducing spam complaints and bounces, and monitoring sender reputation and inbox placement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does email warm-up prevent emails from going to spam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email warm-up can help establish and maintain sender reputation by gradually increasing sending activity and generating healthy email interactions. It is one part of a broader deliverability strategy and does not guarantee inbox placement.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do SPF, DKIM, and DMARC affect cold email deliverability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. SPF, DKIM, and DMARC are email authentication mechanisms that help receiving systems verify legitimate email sources and reduce unauthorized use of domains. Proper configuration is an important part of email deliverability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can a high bounce rate cause cold emails to go to spam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'High bounce rates can negatively affect sender reputation and indicate poor list quality. Maintaining accurate, verified contact lists and removing invalid addresses can help reduce bounces and support better deliverability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does changing email content fix spam placement?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Changing email content may help when message patterns contribute to filtering, but spam placement depends on multiple factors including sender reputation, authentication, recipient engagement, list quality, sending behavior, and message content.',
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
      <ColdEmailsSpamClient />
    </>
  );
}