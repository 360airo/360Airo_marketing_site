// page.tsx
import type { Metadata, Viewport } from 'next';
import EmailTemplateBuilderClient from './EmailTemplateBuilderClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Template Builder | Create Professional Email Templates',
  description: "Use 360Airo's free email template builder to create professional email templates for sales outreach, marketing campaigns, business communication, and follow-up emails.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-template-builder',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Template Builder | Create Professional Email Templates',
    description: "Create professional email templates for sales outreach, marketing campaigns, and business communication with 360Airo's free email template builder.",
    url: 'https://360airo.com/free-tools/email-template-builder',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Template Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Template Builder | Create Professional Email Templates',
    description: "Create professional email templates for sales outreach and business communication with 360Airo's free email template builder.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const emailTemplateBuilderJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-template-builder#webpage",
      "url": "https://360airo.com/free-tools/email-template-builder",
      "name": "Free Email Template Builder | Create Professional Email Templates",
      "description": "Use 360Airo's free email template builder to create professional email templates for sales outreach, marketing campaigns, business communication, and follow-up emails.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-template-builder#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-template-builder#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-template-builder#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-template-builder#tool",
      "name": "360Airo Email Template Builder",
      "url": "https://360airo.com/free-tools/email-template-builder",
      "description": "A free online email template builder that helps create professional email templates for sales outreach, marketing campaigns, business communication, and follow-ups.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Template Tool",
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
      "@id": "https://360airo.com/free-tools/email-template-builder#breadcrumb",
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
          "name": "Email Template Builder",
          "item": "https://360airo.com/free-tools/email-template-builder"
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
export default function EmailTemplateBuilderPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailTemplateBuilderJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <EmailTemplateBuilderClient />
    </>
  );
}