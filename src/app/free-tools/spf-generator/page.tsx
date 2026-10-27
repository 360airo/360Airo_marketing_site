// page.tsx
import type { Metadata, Viewport } from 'next';
import SpfGeneratorClient from './SpfGeneratorClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free SPF Generator | Create an SPF Record',
  description: "Use 360Airo's free SPF generator to create an SPF record for your domain and configure email authentication to help prevent unauthorized senders and improve email security.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/spf-generator',
  },
  openGraph: {
    type: 'website',
    title: 'Free SPF Generator | Create an SPF Record',
    description: "Create an SPF record for your domain with 360Airo's free SPF generator and configure your email authentication policy.",
    url: 'https://360airo.com/free-tools/spf-generator',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free SPF Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SPF Generator | Create an SPF Record',
    description: "Create an SPF record for your domain with 360Airo's free SPF generator.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const spfGeneratorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/spf-generator#webpage",
      "url": "https://360airo.com/free-tools/spf-generator",
      "name": "Free SPF Generator | Create an SPF Record",
      "description": "Use 360Airo's free SPF generator to create an SPF record for your domain and configure email authentication to help prevent unauthorized senders and improve email security.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/spf-generator#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/spf-generator#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/spf-generator#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/spf-generator#tool",
      "name": "360Airo SPF Generator",
      "url": "https://360airo.com/free-tools/spf-generator",
      "description": "A free SPF record generator that helps create an SPF policy for your domain to specify authorized email senders and strengthen email authentication.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Authentication Tool",
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
      "@id": "https://360airo.com/free-tools/spf-generator#breadcrumb",
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
          "name": "SPF Generator",
          "item": "https://360airo.com/free-tools/spf-generator"
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
export default function SpfGeneratorPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spfGeneratorJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <SpfGeneratorClient />
    </>
  );
}