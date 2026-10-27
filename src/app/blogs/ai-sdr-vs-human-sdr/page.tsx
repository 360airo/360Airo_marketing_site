import type { Metadata } from 'next';
import AiSdrVsHumanClient from './AiSdrVsHumanClient';

const PAGE_URL =
  'https://360airo.com/blog/ai-sdr-vs-human-sdr-cost-performance-roi';
const OG_IMAGE = 'https://360airo.com/og-images/ai-sdr-vs-human-sdr.jpg';
const PAGE_DESCRIPTION =
  'Compare AI SDRs vs human SDRs across cost, performance, scalability, and ROI. See where AI sales development outperforms—and where humans still win.';
const PAGE_TITLE = 'AI SDR vs Human SDR: Cost, Performance & ROI Comparison';
const OG_TITLE = 'AI SDR vs Human SDR: Cost, Performance & ROI';
const TWITTER_DESCRIPTION =
  'Compare AI SDRs and human SDRs by cost, performance, scalability, productivity, and ROI to determine the right outbound sales model.';
const DATE_PUBLISHED = '2026-06-01T08:00:00+00:00';
const DATE_MODIFIED = '2026-06-15T08:00:00+00:00';

export const metadata: Metadata = {
  // ── Core ────────────────────────────────────────────────
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'AI SDR vs human SDR',
    'AI SDR cost',
    'AI SDR ROI',
    'human SDR vs AI SDR',
    'AI sales development',
    'AI SDR performance',
    'sales development automation',
    'AI SDR',
    'human SDR',
    'outbound sales',
    'sales development representative',
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
    title: OG_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: '360 Airo',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'AI SDR vs Human SDR comparison',
      },
    ],
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    authors: ['https://360airo.com/'],
    section: 'Sales & Outreach',
    tags: [
      'AI SDR vs human SDR',
      'AI SDR cost',
      'AI SDR ROI',
      'human SDR vs AI SDR',
      'AI sales development',
      'AI SDR performance',
      'sales development automation',
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
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
   Structured Data (JSON-LD)
   ──────────────────────────────────────────────────────────── */

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: PAGE_TITLE,
  description:
    'Compare AI SDRs vs human SDRs across cost, performance, scalability, and ROI to understand which sales development model is right for your business.',
  image: [OG_IMAGE],
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: {
    '@type': 'Organization',
    name: '360 Airo',
    url: 'https://360airo.com/',
  },
  publisher: {
    '@type': 'Organization',
    name: '360 Airo',
    logo: {
      '@type': 'ImageObject',
      url: 'https://360airo.com/logo.svg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': PAGE_URL,
  },
  url: PAGE_URL,
  articleSection: 'Sales & Outreach',
  keywords: [
    'AI SDR vs human SDR',
    'AI SDR cost',
    'AI SDR ROI',
    'human SDR vs AI SDR',
    'AI sales development',
    'AI SDR performance',
    'sales development automation',
  ],
};

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: PAGE_TITLE,
  url: PAGE_URL,
  description:
    'A detailed comparison of AI SDRs and human SDRs covering cost, performance, scalability, productivity, sales development, and ROI.',
  isPartOf: {
    '@type': 'WebSite',
    name: '360 Airo',
    url: 'https://360airo.com/',
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: OG_IMAGE,
    width: 1200,
    height: 630,
  },
  inLanguage: 'en-US',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI SDR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI SDR (Artificial Intelligence Sales Development Representative) is software that automates core sales development activities, including prospect research, lead enrichment, personalized outreach, follow-up sequences, lead qualification, and meeting scheduling. It enables sales teams to scale outbound efforts while reducing manual work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an AI SDR replace a human SDR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI SDRs can automate many repetitive outbound tasks, but they cannot fully replace human SDRs. While AI is effective at prospecting, outreach, and follow-ups, human representatives remain essential for building relationships, conducting discovery calls, handling complex objections, and managing consultative sales conversations. For most organizations, a hybrid approach delivers the best results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is AI outbound sales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI outbound sales refers to the use of artificial intelligence to automate and optimize outbound prospecting activities. This includes identifying target accounts, enriching contact data, generating personalized messaging, managing follow-ups, qualifying leads, and scheduling meetings to improve sales efficiency and pipeline generation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are AI SDRs cost-effective?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI SDRs help reduce many of the costs associated with traditional sales development, including recruitment, onboarding, training, and administrative work. Their subscription-based pricing and ability to automate repetitive tasks make them a cost-effective solution for businesses looking to scale outbound sales.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which businesses benefit the most from AI SDRs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI SDRs are particularly beneficial for startups, SaaS companies, B2B organizations, and growing sales teams that need to expand outbound prospecting without proportionally increasing headcount. They are well suited for businesses running high-volume outreach campaigns and looking to improve operational efficiency.',
      },
    },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
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
      item: 'https://360airo.com/blogs',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'AI SDR',
      item: 'https://360airo.com/blogs?category=ai-sdr',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'AI SDR vs Human SDR: Cost, Performance & ROI Comparison',
      item: PAGE_URL,
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Structured Data — JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Client page */}
      <AiSdrVsHumanClient />
    </>
  );
}