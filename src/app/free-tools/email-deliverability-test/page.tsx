import type { Metadata } from 'next';
import EmailDeliverabilityClient from './EmailDeliverabilityClient';

// 1. Export the Metadata (This goes to the <head>)
export const metadata: Metadata = {
  title: 'Free Email Deliverability Test | Check Your Email Deliverability',
  description: "Use 360Airo's free email deliverability test to identify potential delivery issues, check email configuration, and improve your chances of reaching the inbox.",
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://360airo.com/free-tools/email-deliverability-test',
  },
  openGraph: {
    type: 'website',
    title: 'Free Email Deliverability Test | Check Your Email Deliverability',
    description: "Test your email deliverability and identify potential issues affecting inbox placement with 360Airo's free tool.",
    url: 'https://360airo.com/free-tools/email-deliverability-test',
    siteName: '360Airo',
    images: [
      {
        url: 'https://360airo.com/og-image.jpg',
        alt: '360Airo Free Email Deliverability Test',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Deliverability Test | Check Your Email Deliverability',
    description: "Test your email deliverability and identify potential issues affecting inbox placement with 360Airo's free tool.",
    images: ['https://360airo.com/og-image.jpg'],
  },
};

// 2. Define the JSON-LD Structured Data
const deliverabilityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://360airo.com/free-tools/email-deliverability-test#webpage",
      "url": "https://360airo.com/free-tools/email-deliverability-test",
      "name": "Free Email Deliverability Test | Check Your Email Deliverability",
      "description": "Use 360Airo's free email deliverability test to identify potential delivery issues, check email configuration, and improve your chances of reaching the inbox.",
      "isPartOf": { "@id": "https://360airo.com/#website" },
      "about": { "@id": "https://360airo.com/free-tools/email-deliverability-test#tool" },
      "breadcrumb": { "@id": "https://360airo.com/free-tools/email-deliverability-test#breadcrumb" },
      "publisher": { "@id": "https://360airo.com/#organization" },
      "inLanguage": "en-US",
      "mainEntity": { "@id": "https://360airo.com/free-tools/email-deliverability-test#tool" }
    },
    {
      "@type": "WebApplication",
      "@id": "https://360airo.com/free-tools/email-deliverability-test#tool",
      "name": "360Airo Email Deliverability Test",
      "url": "https://360airo.com/free-tools/email-deliverability-test",
      "description": "A free email deliverability testing tool that helps identify potential email delivery issues and configuration problems that may affect inbox placement.",
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
      "@id": "https://360airo.com/free-tools/email-deliverability-test#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://360airo.com/" },
        { "@type": "ListItem", "position": 2, "name": "Free Tools", "item": "https://360airo.com/free-tools" },
        { "@type": "ListItem", "position": 3, "name": "Email Deliverability Test", "item": "https://360airo.com/free-tools/email-deliverability-test" }
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

// 3. Render the Server Component
export default function EmailDeliverabilityPage() {
  return (
    <>
      {/* Inject JSON-LD into the server-rendered HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deliverabilityJsonLd) }}
      />

      {/* Render the interactive Client Component */}
      <EmailDeliverabilityClient />
    </>
  );
}