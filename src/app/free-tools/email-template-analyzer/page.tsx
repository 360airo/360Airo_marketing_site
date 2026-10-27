// page.tsx
import type { Metadata, Viewport } from 'next';
import EmailTemplateAnalyzerClient from './EmailTemplateAnalyzerClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Template Analyzer | Analyze Your Email Templates',
  description: "Use 360Airo's free email template analyzer to review your email templates for content, structure, readability, personalization, and potential issues before sending.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-template-analyzer',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Template Analyzer | Analyze Your Email Templates',
    description: "Analyze your email templates for content, structure, readability, personalization, and potential issues with 360Airo's free email template analyzer.",
    url: 'https://360airo.com/free-tools/email-template-analyzer',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Template Analyzer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Template Analyzer | Analyze Your Email Templates',
    description: "Analyze your email templates for content, structure, readability, personalization, and potential issues with 360Airo's free tool.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color natively)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data (Corrected for the Template Analyzer)
const emailTemplateAnalyzerJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-template-analyzer#webpage",
      "url": "https://360airo.com/free-tools/email-template-analyzer",
      "name": "Free Email Template Analyzer | Analyze Your Email Templates",
      "description": "Use 360Airo's free email template analyzer to review your email templates for content, structure, readability, personalization, and potential issues before sending.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/email-template-analyzer#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/email-template-analyzer#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/email-template-analyzer#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-template-analyzer#tool",
      "name": "360Airo Email Template Analyzer",
      "url": "https://360airo.com/free-tools/email-template-analyzer",
      "description": "A free online email template analyzer that reviews email templates for content, structure, readability, personalization, and potential issues before sending.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Analysis Tool",
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
      "@id": "https://360airo.com/free-tools/email-template-analyzer#breadcrumb",
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
          "name": "Email Template Analyzer",
          "item": "https://360airo.com/free-tools/email-template-analyzer"
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
export default function EmailTemplateAnalyzerPage() {
  return (
    <>
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emailTemplateAnalyzerJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <EmailTemplateAnalyzerClient />
    </>
  );
}