// page.tsx
import type { Metadata, Viewport } from 'next';
import EmailVerifierClient from './EmailVerifierClient';

// 1. Export Metadata
export const metadata: Metadata = {
  title: 'Free Email Verifier | Verify Email Addresses Online',
  description: "Use 360Airo's free email verifier to check email addresses for validity and identify potentially invalid or undeliverable addresses before sending emails.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-verifier',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Verifier | Verify Email Addresses Online',
    description: "Verify email addresses and identify potentially invalid or undeliverable emails with 360Airo's free email verification tool.",
    url: 'https://360airo.com/free-tools/email-verifier',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Verifier',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Verifier | Verify Email Addresses Online',
    description: "Verify email addresses and identify potentially invalid or undeliverable emails with 360Airo's free email verification tool.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Next.js 14+ way to handle theme-color)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const emailVerifierJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-verifier#webpage",
      "url": "https://360airo.com/free-tools/email-verifier",
      "name": "Free Email Verifier | Verify Email Addresses Online",
      "description": "Use 360Airo's free email verifier to check email addresses for validity and identify potentially invalid or undeliverable addresses before sending emails.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-verifier#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-verifier#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-verifier#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-verifier#tool",
      "name": "360Airo Email Verifier",
      "url": "https://360airo.com/free-tools/email-verifier",
      "description": "A free online email verification tool that helps check email addresses for validity and potential delivery issues.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Verification Tool",
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
      "@id": "https://360airo.com/free-tools/email-verifier#breadcrumb",
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
          "name": "Email Verifier",
          "item": "https://360airo.com/free-tools/email-verifier"
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
export default function EmailVerifierPage() {
  return (
    <>
      {/* Inject JSON-LD into the server-rendered HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailVerifierJsonLd) }}
      />
      
      {/* Render the interactive Client Component */}
      <EmailVerifierClient />
    </>
  );
}