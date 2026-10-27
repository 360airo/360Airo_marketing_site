// page.tsx
import type { Metadata } from 'next';
// 👇 THIS IS HOW YOU CONNECT THE TWO FILES
import SpamCheckerClient from './SpamCheckerClient'; 

// 1. Tell Next.js to put this in the <head>
export const metadata: Metadata = {
  title: 'Free Email Spam Checker | Check If Your Email Goes to Spam',
  description: "Use 360Airo's free email spam checker to test your email for spam risks, identify deliverability issues, and improve your chances of reaching the inbox.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-spam-checker',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Spam Checker | Check If Your Email Goes to Spam',
    description: "Test your email for spam risks and deliverability issues with 360Airo's free email spam checker.",
    url: 'https://360airo.com/free-tools/email-spam-checker',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Spam Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Spam Checker | Check If Your Email Goes to Spam',
    description: "Check your email for spam risks and deliverability issues with 360Airo's free email spam checker.",
    images: ['https://360airo.com/og-image.jpg'],
  },
};

// 2. Your JSON-LD Structured Data
const spamCheckerJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-spam-checker#webpage",
      "url": "https://360airo.com/free-tools/email-spam-checker",
      "name": "Free Email Spam Checker | Check If Your Email Goes to Spam",
      "description": "Use 360Airo's free email spam checker to test your email for spam risks, identify deliverability issues, and improve your chances of reaching the inbox.",
      "isPartOf": { "@id": "https://360airo.com/#website" },
      "about": { "@id": "https://360airo.com/free-tools/email-spam-checker#tool" },
      "breadcrumb": { "@id": "https://360airo.com/free-tools/email-spam-checker#breadcrumb" },
      "publisher": { "@id": "https://360airo.com/#organization" },
      "inLanguage": "en-US",
      "mainEntity": { "@id": "https://360airo.com/free-tools/email-spam-checker#tool" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-spam-checker#tool",
      "name": "360Airo Email Spam Checker",
      "url": "https://360airo.com/free-tools/email-spam-checker",
      "description": "A free email spam checker that helps identify potential spam risks and email deliverability issues before sending your emails.",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Email Deliverability Tool",
      "operatingSystem": "Web",
      "browserRequirements": "Requires a modern web browser with JavaScript enabled",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "creator": { "@id": "https://360airo.com/#organization" },
      "publisher": { "@id": "https://360airo.com/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://360airo.com/free-tools/email-spam-checker#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://360airo.com/" },
        { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://360airo.com/free-tools" },
        { "@type": "ListItem", "position": 3, "name": "Email Spam Checker", "item": "https://360airo.com/free-tools/email-spam-checker" }
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
      "publisher": { "@id": "https://360airo.com/#organization" },
      "inLanguage": "en-US"
    }
  ]
};

// 3. Render the Page
export default function SpamCheckerPage() {
  return (
    <>
      {/* This script goes into the server HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(spamCheckerJsonLd) }}
      />
      
      {/* 👇 THIS IS HOW YOU RENDER THE CLIENT COMPONENT */}
      <SpamCheckerClient />
    </>
  );
}