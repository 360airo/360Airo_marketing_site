import type { Metadata } from "next";
import "../index.css";
import "../styles/globals.css";
import "../styles/all.css";
import "../styles/hero-bg.css";
import "../styles/chatbot.css";
import SmoothScroller from "../components/SmoothScroller";
import BookDemoModalWrapper from "../components/BookDemoModalWrapper";
import ChatBot from "../components/ChatBot";

export const metadata: Metadata = {
  title: "360 Airo - AI SDR Built for High-Growth B2B Teams",
  description: "AI SDR Built for High-Growth B2B Teams",
  icons: {
    icon: "/favicon.ico",
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRZT42V5');`
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-47EH84SGE7"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-47EH84SGE7');
            `,
          }}
        />
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
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRZT42V5"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SmoothScroller>
          {children}
        </SmoothScroller>
        <BookDemoModalWrapper />
        <ChatBot />
      </body>
    </html>
  );
}
