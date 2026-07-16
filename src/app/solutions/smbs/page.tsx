import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SMBHeroSection from '../../../components/SMBHeroSection';
import SMBSolutionSection from '../../../components/SMBSolutionSection';
import BentoFeaturesSection from '../../../components/BentoFeaturesSection';
import HowItWorksSection from '../../../components/HowItWorksSection';
import CTASection from '../../../components/CTASection';

export default function SMBSolutionsPage() {
  return (
    <div className="app-container">
      <Navbar activeTab="solutions" />
      
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SMBHeroSection />
        <SMBSolutionSection />
        <HowItWorksSection />
        <BentoFeaturesSection />
        
        <CTASection />
      </main>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
