import type { Metadata } from "next";
import "../index.css";
import "../styles/globals.css";
import "../styles/all.css";
import "../styles/hero-bg.css";

export const metadata: Metadata = {
  title: "360 Airo - AI SDR Built for High-Growth B2B Teams",
  description: "AI SDR Built for High-Growth B2B Teams",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=DM+Sans:opsz,wght@9..40,400;500;600;700&family=Inter:wght@400;500;600;700&family=Outfit:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
