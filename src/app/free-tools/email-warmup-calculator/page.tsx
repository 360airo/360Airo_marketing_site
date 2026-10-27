// page.tsx
import type { Metadata, Viewport } from 'next';
import WarmupCalculatorClient from './WarmupCalculatorClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Warmup Calculator | Calculate Your Warmup Plan',
  description: "Use 360Airo's free email warmup calculator to estimate your email warmup requirements, sending volume, and timeline for preparing mailboxes for cold email campaigns.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-warmup-calculator',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Warmup Calculator | Calculate Your Warmup Plan',
    description: "Calculate your email warmup requirements, sending volume, and timeline with 360Airo's free email warmup calculator.",
    url: 'https://360airo.com/free-tools/email-warmup-calculator',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Warmup Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Warmup Calculator | Calculate Your Warmup Plan',
    description: "Calculate your email warmup requirements, sending volume, and timeline with 360Airo's free email warmup calculator.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const warmupCalculatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-warmup-calculator#webpage",
      "url": "https://360airo.com/free-tools/email-warmup-calculator",
      "name": "Free Email Warmup Calculator | Calculate Your Warmup Plan",
      "description": "Use 360Airo's free email warmup calculator to estimate your email warmup requirements, sending volume, and timeline for preparing mailboxes for cold email campaigns.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-warmup-calculator#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-warmup-calculator#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-warmup-calculator#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-warmup-calculator#tool",
      "name": "360Airo Email Warmup Calculator",
      "url": "https://360airo.com/free-tools/email-warmup-calculator",
      "description": "A free email warmup calculator that helps estimate mailbox warmup requirements, sending volume, and warmup timelines for cold email campaigns.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Warmup Calculator",
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
      "@id": "https://360airo.com/free-tools/email-warmup-calculator#breadcrumb",
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
          "name": "Email Warmup Calculator",
          "item": "https://360airo.com/free-tools/email-warmup-calculator"
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
export default function WarmupCalculatorPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(warmupCalculatorJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <WarmupCalculatorClient />
    </>
  );
}