// page.tsx
import type { Metadata, Viewport } from 'next';
import MailboxCalculatorClient from './MailboxCalculatorClient';

// 1. Export SEO Metadata
export const metadata: Metadata = {
  title: 'Free Email Mailbox Calculator | Calculate Mailboxes for Cold Email',
  description: "Use 360Airo's free email mailbox calculator to estimate how many mailboxes and email accounts you need for your cold email campaigns based on your sending volume.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/mailbox-calculator',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Mailbox Calculator | Calculate Mailboxes for Cold Email',
    description: "Calculate how many mailboxes you need for your cold email campaigns based on your sending volume with 360Airo's free mailbox calculator.",
    url: 'https://360airo.com/free-tools/mailbox-calculator',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Mailbox Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Mailbox Calculator | Calculate Mailboxes for Cold Email',
    description: "Calculate the number of mailboxes needed for your cold email campaigns with 360Airo's free mailbox calculator.",
    images: ['https://360airo.com/og-image.jpg'],
  },
  authors: [{ name: '360Airo' }],
};

// 2. Export Viewport (Handles theme-color in Next.js 14+)
export const viewport: Viewport = {
  themeColor: '#08124A',
};

// 3. Define the JSON-LD Structured Data
const mailboxCalculatorJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/mailbox-calculator#webpage",
      "url": "https://360airo.com/free-tools/mailbox-calculator",
      "name": "Free Email Mailbox Calculator | Calculate Mailboxes for Cold Email",
      "description": "Use 360Airo's free email mailbox calculator to estimate how many mailboxes and email accounts you need for your cold email campaigns based on your sending volume.",
      "isPartOf": {
        "@id": "https://360airo.com/#website"
      },
      "about": {
        "@id": "https://360airo.com/free-tools/mailbox-calculator#tool"
      },
      "breadcrumb": {
        "@id": "https://360airo.com/free-tools/mailbox-calculator#breadcrumb"
      },
      "publisher": {
        "@id": "https://360airo.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@id": "https://360airo.com/free-tools/mailbox-calculator#tool"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/mailbox-calculator#tool",
      "name": "360Airo Email Mailbox Calculator",
      "url": "https://360airo.com/free-tools/mailbox-calculator",
      "description": "A free email mailbox calculator that helps estimate the number of mailboxes needed for cold email campaigns based on sending volume and mailbox limits.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Campaign Calculator",
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
      "@id": "https://360airo.com/free-tools/mailbox-calculator#breadcrumb",
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
          "name": "Mailbox Calculator",
          "item": "https://360airo.com/free-tools/mailbox-calculator"
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
export default function MailboxCalculatorPage() {
  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mailboxCalculatorJsonLd) }}
      />
      
      {/* Interactive Client Component */}
      <MailboxCalculatorClient />
    </>
  );
}