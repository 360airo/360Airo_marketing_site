// page.tsx
import type { Metadata, Viewport } from 'next';
import EmailSignatureBuilderClient from './EmailSignatureBuilderClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Signature Builder | Create Professional Email Signatures',
  description: "Use 360Airo's free email signature builder to create professional email signatures for business emails, including contact details, social links, and branding.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-signature-builder',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Signature Builder | Create Professional Email Signatures',
    description: "Create professional email signatures with contact details, social links, and branding using 360Airo's free email signature builder.",
    url: 'https://360airo.com/free-tools/email-signature-builder',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Signature Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Signature Builder | Create Professional Email Signatures',
    description: "Create professional email signatures with 360Airo's free email signature builder.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const emailSignatureBuilderJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-signature-builder#webpage",
      "url": "https://360airo.com/free-tools/email-signature-builder",
      "name": "Free Email Signature Builder | Create Professional Email Signatures",
      "description": "Use 360Airo's free email signature builder to create professional email signatures for business emails, including contact details, social links, and branding.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-signature-builder#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-signature-builder#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-signature-builder#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-signature-builder#tool",
      "name": "360Airo Email Signature Builder",
      "url": "https://360airo.com/free-tools/email-signature-builder",
      "description": "A free online email signature builder that helps create professional email signatures with business contact information, social links, and branding.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Signature Tool",
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
      "@id": "https://360airo.com/free-tools/email-signature-builder#breadcrumb",
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
          "name": "Email Signature Builder",
          "item": "https://360airo.com/free-tools/email-signature-builder"
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
export default function EmailSignatureBuilderPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailSignatureBuilderJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <EmailSignatureBuilderClient />
    </>
  );
}