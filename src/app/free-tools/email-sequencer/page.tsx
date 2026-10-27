// page.tsx
import type { Metadata, Viewport } from 'next';
import SequenceBuilderClient from './SequenceBuilderClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Sequencer | Create Email Sequences',
  description: "Use 360Airo's free email sequencer to create structured email sequences for cold outreach, follow-ups, lead generation, and sales campaigns.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-sequencer',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Sequencer | Create Email Sequences',
    description: "Create structured email sequences and follow-up campaigns for sales outreach with 360Airo's free email sequencer.",
    url: 'https://360airo.com/free-tools/email-sequencer',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Sequencer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Sequencer | Create Email Sequences',
    description: "Create structured email sequences and follow-up campaigns with 360Airo's free email sequencer.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const sequenceBuilderJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-sequencer#webpage",
      "url": "https://360airo.com/free-tools/email-sequencer",
      "name": "Free Email Sequencer | Create Email Sequences",
      "description": "Use 360Airo's free email sequencer to create structured email sequences for cold outreach, follow-ups, lead generation, and sales campaigns.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-sequencer#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-sequencer#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-sequencer#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-sequencer#tool",
      "name": "360Airo Email Sequencer",
      "url": "https://360airo.com/free-tools/email-sequencer",
      "description": "A free online email sequencer that helps create structured email sequences and follow-up campaigns for sales outreach and lead generation.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Outreach Tool",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser with JavaScript enabled",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "creator": {
        "@id": "https://360airo.com/#organization"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://360airo.com/free-tools/email-sequencer#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://360airo.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Free Tools",
          "item": "https://360airo.com/free-tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Email Sequencer",
          "item": "https://360airo.com/free-tools/email-sequencer"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://360airo.com/#organization",
      "name": "360Airo",
      "url": "https://360airo.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://360airo.com/#logo",
        "url": "https://360airo.com/logo.svg",
        "contentUrl": "https://360airo.com/logo.svg"
      },
      "sameAs": [
        "https://www.linkedin.com/company/360-airo/posts/",
        "https://x.com/360airo",
        "https://www.instagram.com/360airo",
        "https://www.youtube.com/@360airo",
        "https://www.facebook.com/p/360-Airo-61583637801140/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://360airo.com/#website",
      "url": "https://360airo.com/",
      "name": "360Airo",
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
};

// 4. Render the Page
export default function SequenceBuilderPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sequenceBuilderJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <SequenceBuilderClient />
    </>
  );
}