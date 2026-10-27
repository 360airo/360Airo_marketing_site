import type { Metadata, Viewport } from 'next';
import HomeClient from './HomeClient';

// 1. Export Viewport Configuration
export const viewport: Viewport = {
  themeColor: '#08124A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
};

// 2. Export Complete Homepage SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://360airo.com'),
  title: '360AIRO | Multichannel Outreach Platform for Sales Teams',
  description:
    'Generate more meetings with a multichannel outreach platform that automates cold email, LinkedIn outreach, follow-ups, inbox rotation, email warmup, and sales engagement from one place.',
  keywords: [
    'multichannel outreach platform',
    'cold email software',
    'sales engagement platform',
    'email outreach software',
    'LinkedIn outreach automation',
    'outbound sales software',
    'sales prospecting software',
    'email warmup',
    'inbox rotation',
    'email deliverability',
    'outreach automation',
    'B2B sales software',
    'sales automation',
  ],
  authors: [{ name: '360AIRO', url: 'https://360airo.com' }],
  creator: '360AIRO',
  publisher: '360AIRO',
  applicationName: '360AIRO',
  category: 'Business & Sales Software',
  classification: 'Multichannel Outreach & Sales Engagement Platform',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://360airo.com/',
    languages: {
      'en-US': 'https://360airo.com/',
      'x-default': 'https://360airo.com/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: '360AIRO',
    title: '360AIRO | AI Multichannel Outreach Platform',
    description:
      'AI multichannel outreach platform that Scales outbound sales with cold email, LinkedIn outreach, smart follow-ups, inbox management.',
    url: 'https://360airo.com/',
    locale: 'en_US',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        secureUrl: 'https://360airo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '360AIRO Multichannel Outreach Platform',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@360airo',
    creator: '@360airo',
    title: '360AIRO | Multichannel Outreach Platform for B2b  SDR  Teams',
    description:
      'Automate cold email, LinkedIn outreach, inbox rotation, email warmup, and follow-ups to book more meetings with 360AIRO.',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360AIRO Multichannel Outreach Platform',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/FinalLogo_icon_transparent.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  other: {
    language: 'English',
    'meta[name=title]': '360AIRO | Multichannel Outreach Platform for Sales Teams',
    rating: 'General',
    distribution: 'Global',
  },
};

// 3. Schema 1: SoftwareApplication Structured Data
const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://360airo.com/#software",
  "name": "360AIRO",
  "alternateName": "360 AIRO",
  "url": "https://360airo.com/",
  "description": "360AIRO is a multichannel outreach platform that helps businesses automate cold email, LinkedIn outreach, email warm-up, inbox rotation, follow-ups, personalization, lead management, and sales engagement from one platform.",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Sales Engagement Platform",
  "applicationSuite": "360AIRO",
  "operatingSystem": "Web",
  "browserRequirements": "Requires a modern web browser",
  "softwareVersion": "Latest",
  "inLanguage": "en-US",
  "publisher": {
    "@id": "https://360airo.com/#organization"
  },
  "brand": {
    "@id": "https://360airo.com/#organization"
  },
  "image": "https://360airo.com/logo.svg",
  "screenshot": "https://360airo.com/logo.svg",
  "sameAs": [
    "https://www.facebook.com/p/360-Airo-61583637801140/",
    "https://x.com/360airo",
    "https://www.instagram.com/360airo",
    "https://www.youtube.com/@360airo"
  ],
  "featureList": [
    "Cold Email Campaigns",
    "LinkedIn Outreach",
    "Email Personalization",
    "Email Warm-up",
    "Inbox Rotation",
    "Unified Inbox",
    "Email Verification",
    "Email Deliverability Monitoring",
    "Campaign Analytics",
    "Prospect Management",
    "CRM Integration",
    "Follow-up Sequences",
    "Multichannel Outreach",
    "Team Collaboration",
    "Reporting Dashboard"
  ],
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://360airo.com/pricing",
    "priceCurrency": "USD",
    "lowPrice": "0",
    "highPrice": "299",
    "offerCount": "7",
    "offers": [
      {
        "@type": "Offer",
        "name": "Freemium",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Starter Monthly",
        "price": "99",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Starter Yearly",
        "price": "990",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Professional Monthly",
        "price": "299",
        "priceCurrency": "USD",
        "billingDuration": "P1M",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Professional Yearly",
        "price": "2990",
        "priceCurrency": "USD",
        "billingDuration": "P1Y",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/pricing"
      },
      {
        "@type": "Offer",
        "name": "Enterprise",
        "availability": "https://schema.org/InStock",
        "url": "https://360airo.com/contact-sales",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "priceType": "https://schema.org/Quote"
        }
      }
    ]
  }
};

// 4. Schema 2: SiteNavigationElement Structured Data
const siteNavigationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": [
    "Home",
    "Features",
    "Solutions",
    "Free Tools",
    "Resources",
    "Pricing",
    "Contact Us"
  ],
  "url": [
    "https://360airo.com/",
    "https://360airo.com/features",
    "https://360airo.com/solutions",
    "https://360airo.com/tools",
    "https://360airo.com/resources",
    "https://360airo.com/pricing",
    "https://360airo.com/contact-us"
  ]
};

// 5. Schema 3: Organization, WebSite, WebPage, and BreadcrumbList Structured Data
const knowledgeGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://360airo.com/#organization",
      "name": "360AIRO",
      "alternateName": "360 AIRO",
      "url": "https://360airo.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://360airo.com/#logo",
        "url": "https://360airo.com/logo.svg",
        "contentUrl": "https://360airo.com/logo.svg",
        "caption": "360AIRO Logo"
      },
      "image": "https://360airo.com/logo.svg",
      "sameAs": [
        "https://www.facebook.com/p/360-Airo-61583637801140/",
        "https://x.com/360airo",
        "https://www.instagram.com/360airo",
        "https://www.youtube.com/@360airo"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Sales and Customer Support",
          "url": "https://360airo.com/contact-us",
          "availableLanguage": ["en"]
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://360airo.com/#website",
      "url": "https://360airo.com/",
      "name": "360AIRO",
      "description": "Multichannel Outreach Platform for Sales Teams",
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/#webpage",
      "url": "https://360airo.com/",
      "name": "360AIRO | Multichannel Outreach Platform for Sales Teams",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/#software"
      },
      "description":
        "Generate more meetings with a multichannel outreach platform that automates cold email, LinkedIn outreach, follow-ups, inbox rotation, email warmup, and sales engagement from one place.",
      "breadcrumb": {
        "@id": "https://360airo.com/#breadcrumb"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://360airo.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://360airo.com/"
        }
      ]
    }
  ]
};

// 6. Root Home Page Component (Server Component)
export default function HomePage() {
  return (
    <>
      {/* Structured Data: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      {/* Structured Data: SiteNavigationElement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
      />
      {/* Structured Data: Organization, WebSite, WebPage, BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeGraphJsonLd) }}
      />
      {/* Client-Side Interactive Components & GSAP Animations */}
      <HomeClient />
    </>
  );
}