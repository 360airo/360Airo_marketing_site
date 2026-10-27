import type { Metadata, Viewport } from 'next';
import AiProspectingToolsClient from './AiProspectingToolsClient';

// 1. Export Viewport Configuration
export const viewport: Viewport = {
  themeColor: '#08124A',
  width: 'device-width',
  initialScale: 1,
};

// 2. Export Complete Blog Post SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://360airo.com'),
  title: 'Best AI Tools for Outbound Prospecting in 2026',
  description:
    'Discover the best AI tools for outbound prospecting in 2026. Compare AI sales, lead generation, prospecting, and outreach tools to find the right fit.',
  keywords: [
    'AI outbound prospecting tools',
    'AI sales tools',
    'AI prospecting software',
    'outbound prospecting',
    'AI lead generation tools',
    'sales automation tools',
    'AI outreach tools',
    'B2B sales prospecting',
    'multichannel outreach',
    'cold email automation',
  ],
  authors: [{ name: '360 Airo', url: 'https://360airo.com/' }],
  creator: '360 Airo',
  publisher: '360 Airo',
  category: 'Sales & Outreach',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://360airo.com/blogs/ai-prospecting-tools-2026',
  },
  openGraph: {
    type: 'article',
    title: 'Best AI Tools for Outbound Prospecting in 2026',
    description:
      'Discover the best AI tools for outbound prospecting in 2026. Compare AI sales, lead generation, prospecting, and outreach tools to find the right fit.',
    url: 'https://360airo.com/blog/best-ai-tools-for-outbound-prospecting-in-2026',
    siteName: '360 Airo',
    locale: 'en_US',
    publishedTime: '2026-06-25T08:00:00.000Z',
    modifiedTime: '2026-06-25T08:00:00.000Z',
    section: 'Sales & Outreach',
    tags: [
      'AI outbound prospecting tools',
      'AI sales tools',
      'AI prospecting software',
      'outbound prospecting',
      'AI lead generation tools',
      'sales automation tools',
      'AI outreach tools',
    ],
    images: [
      {
        url: 'https://360airo.com/og-images/best-ai-tools-for-outbound-prospecting-in-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Best AI Tools for Outbound Prospecting in 2026',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@360airo',
    creator: '@360airo',
    title: 'Best AI Tools for Outbound Prospecting in 2026',
    description:
      'Compare the best AI tools for outbound prospecting, lead generation, sales automation, personalization, and multichannel outreach in 2026.',
    images: [
      {
        url: 'https://360airo.com/og-images/best-ai-tools-for-outbound-prospecting-in-2026.jpg',
        alt: 'Best AI Tools for Outbound Prospecting in 2026',
      },
    ],
  },
};

// 3. Structured Data: Article Schema (Exact user schema + rich properties)
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best AI Tools for Outbound Prospecting in 2026',
  description:
    'Discover the best AI tools for outbound prospecting in 2026. Compare AI sales, lead generation, prospecting, and outreach tools to find the right fit.',
  image: [
    'https://360airo.com/og-images/best-ai-tools-for-outbound-prospecting-in-2026.jpg',
  ],
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
    '@id': 'https://360airo.com/blog/best-ai-tools-for-outbound-prospecting-in-2026',
  },
  url: 'https://360airo.com/blog/best-ai-tools-for-outbound-prospecting-in-2026',
  articleSection: 'Sales & Outreach',
  datePublished: '2026-06-25T08:00:00.000Z',
  dateModified: '2026-06-25T08:00:00.000Z',
  keywords: [
    'AI outbound prospecting tools',
    'AI sales tools',
    'AI prospecting software',
    'outbound prospecting',
    'AI lead generation tools',
    'sales automation tools',
    'AI outreach tools',
  ],
};

// 4. Structured Data: BreadcrumbList Schema
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
      name: 'Best AI Tools for Outbound Prospecting in 2026',
      item: 'https://360airo.com/blogs/ai-prospecting-tools-2026',
    },
  ],
};

// 5. Structured Data: WebPage Schema
const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Best AI Tools for Outbound Prospecting in 2026',
  url: 'https://360airo.com/blogs/ai-prospecting-tools-2026',
  description:
    'A comparison of the best AI tools for outbound prospecting in 2026, covering prospect research, lead generation, sales automation, personalization, and multichannel outreach.',
  isPartOf: {
    '@type': 'WebSite',
    name: '360 Airo',
    url: 'https://360airo.com/',
  },
};

// 6. Structured Data: FAQPage Schema
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are AI outbound prospecting tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI outbound prospecting tools use artificial intelligence to help sales teams find prospects, research accounts, personalize outreach, automate follow-ups, and manage outbound sales workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best AI tool for outbound prospecting in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best AI outbound prospecting tool depends on your sales workflow, channels, prospecting needs, automation requirements, and budget. Compare features such as prospect research, AI personalization, email automation, LinkedIn outreach, analytics, and CRM integrations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can AI tools automate outbound prospecting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI outbound prospecting tools can automate parts of the workflow, including prospect research, lead qualification, personalized messaging, email sequences, follow-ups, and campaign reporting.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I look for in an AI prospecting tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Look for accurate prospect data, AI personalization, multichannel outreach, email automation, LinkedIn capabilities, deliverability features, CRM integrations, analytics, and workflow automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are AI prospecting tools useful for B2B sales teams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AI prospecting tools can help B2B sales teams identify relevant prospects, personalize outreach, automate repetitive tasks, manage follow-ups, and scale outbound campaigns.',
      },
    },
  ],
};

// 7. Server Component Default Export
export default function BlogAIProspectingToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AiProspectingToolsClient />
    </>
  );
}