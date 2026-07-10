import React from 'react';
import { Navbar } from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import AgenciesHeroSection from '../../../components/AgenciesHeroSection';
import AgenciesFeaturesGrid from '../../../components/AgenciesFeaturesGrid';
import AgenciesTestimonialSection from '../../../components/AgenciesTestimonialSection';

export default function AgenciesSolutionsPage() {
  return (
    <div className="app-container">
      <Navbar activeTab="solutions" />
      
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AgenciesHeroSection />
        <AgenciesFeaturesGrid />
        <AgenciesTestimonialSection />
      </main>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
