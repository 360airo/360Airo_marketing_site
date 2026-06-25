"use client";

import { FreeToolsAuthProvider } from "../contexts/FreeToolsAuthContext";
import "../../styles/free-tools.css";
import "../../styles/aurora.css";
import Script from 'next/script';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <FreeToolsAuthProvider>
      <Script
        src="/aurora.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            if ((window as any)._resolveStars) (window as any)._resolveStars();
          } catch {
            // ignore
          }
        }}
        onError={() => {
          console.error('Failed to load aurora script');
        }}
      />

      <canvas id="aurora-canvas"></canvas>
      <div className="ft-site">
        <Navbar activeTab="free-tools" />
        {children}
        <Footer />
      </div>
    </FreeToolsAuthProvider>
  );
}
