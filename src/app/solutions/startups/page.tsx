import React from 'react';
import { Navbar } from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import StartupsHeroSection from '../../../components/StartupsHeroSection';
import StartupsSolutionSection from '../../../components/StartupsSolutionSection';
import StartupsHowItWorksSection from '../../../components/StartupsHowItWorksSection';
import StartupsDetailedFeatures from '../../../components/StartupsDetailedFeatures';
import StartupsCTASection from '../../../components/StartupsCTASection';

export default function StartupsSolutionsPage() {
  return (
    <div className="app-container">
      <Navbar activeTab="solutions" />
      
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StartupsHeroSection />
        <StartupsHowItWorksSection />
        <StartupsDetailedFeatures />
        <StartupsCTASection />
      </main>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
