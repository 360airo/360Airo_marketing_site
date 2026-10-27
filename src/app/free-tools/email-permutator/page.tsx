// page.tsx
import type { Metadata, Viewport } from 'next';
import EmailPermutatorClient from './EmailPermutatorClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Permutator | Generate Email Address Combinations',
  description: "Use 360Airo's free email permutator to generate possible email address combinations from a person's name and company domain for prospecting and email outreach.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-permutator',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Permutator | Generate Email Address Combinations',
    description: "Generate possible email address combinations from a person's name and company domain with 360Airo's free email permutator.",
    url: 'https://360airo.com/free-tools/email-permutator',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Permutator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Permutator | Generate Email Address Combinations',
    description: "Generate possible email address combinations from a person's name and company domain with 360Airo's free email permutator.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const emailPermutatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-permutator#webpage",
      "url": "https://360airo.com/free-tools/email-permutator",
      "name": "Free Email Permutator | Generate Email Address Combinations",
      "description": "Use 360Airo's free email permutator to generate possible email address combinations from a person's name and company domain for prospecting and email outreach.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-permutator#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-permutator#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-permutator#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-permutator#tool",
      "name": "360Airo Email Permutator",
      "url": "https://360airo.com/free-tools/email-permutator",
      "description": "A free online email permutator that generates possible email address combinations using names and company domains for prospecting and outreach.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Prospecting Tool",
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
      "@id": "https://360airo.com/free-tools/email-permutator#breadcrumb",
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
          "name": "Email Permutator",
          "item": "https://360airo.com/free-tools/email-permutator"
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
export default function EmailPermutatorPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailPermutatorJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <EmailPermutatorClient />
    </>
  );
}