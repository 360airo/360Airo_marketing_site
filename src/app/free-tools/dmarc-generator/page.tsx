// page.tsx
import type { Metadata, Viewport } from 'next';
import DmarcGeneratorClient from './DmarcGeneratorClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free DMARC Generator | Create a DMARC Record',
  description: "Use 360Airo's free DMARC generator to create a DMARC record for your domain and configure an email authentication policy to help protect your domain from spoofing.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/dmarc-generator',
  },
  openGraph: {
    type: 'website',
    title: 'Free DMARC Generator | Create a DMARC Record',
    description: "Generate a DMARC record for your domain with 360Airo's free DMARC generator and configure your email authentication policy.",
    url: 'https://360airo.com/free-tools/dmarc-generator',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free DMARC Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free DMARC Generator | Create a DMARC Record',
    description: "Generate a DMARC record for your domain with 360Airo's free DMARC generator.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const dmarcGeneratorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/dmarc-generator#webpage",
      "url": "https://360airo.com/free-tools/dmarc-generator",
      "name": "Free DMARC Generator | Create a DMARC Record",
      "description": "Use 360Airo's free DMARC generator to create a DMARC record for your domain and configure an email authentication policy to help protect your domain from spoofing.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/dmarc-generator#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/dmarc-generator#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/dmarc-generator#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/dmarc-generator#tool",
      "name": "360Airo DMARC Generator",
      "url": "https://360airo.com/free-tools/dmarc-generator",
      "description": "A free DMARC record generator that helps create a DMARC policy record for email authentication and domain protection.",
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
      "@id": "https://360airo.com/free-tools/dmarc-generator#breadcrumb",
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
          "name": "DMARC Generator",
          "item": "https://360airo.com/free-tools/dmarc-generator"
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
export default function DmarcGeneratorPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dmarcGeneratorJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <DmarcGeneratorClient />
    </>
  );
}