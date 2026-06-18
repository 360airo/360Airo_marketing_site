const fs = require('fs');
const lines = fs.readFileSync('src/body.jsx', 'utf8').split('\n');

const writeComponent = (name, jsxContent) => {
    if (!jsxContent || jsxContent.trim() === '') return;
    const template = `import React, { useEffect, useRef } from 'react';\nimport gsap from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\nexport default function ${name}() {\n  const rootRef = useRef(null);\n  return (\n    <div ref={rootRef}>\n      ${jsxContent}\n    </div>\n  );\n}\n`;
    fs.writeFileSync(`src/components/${name}.jsx`, template);
}

let homeSection = '';
let inHome = false;

for (const line of lines) {
    if (line.includes('<div id="section-home">')) inHome = true;
    if (inHome && !line.includes('<div id="section-compare">')) homeSection += line + '\n';
    
    if (line.includes('<div id="section-compare">')) writeComponent('CompareSection', line);
    if (line.includes('<div id="section-trusted">')) writeComponent('TrustedTeams', line);
    if (line.includes('<div id="section-mobile">')) writeComponent('MobileReady', line);
    if (line.includes('<div id="section-analytics">')) writeComponent('AnalyticsSection', line);
    if (line.includes('<div id="section-pricing">')) writeComponent('PricingCTA', line);
}

writeComponent('Hero', homeSection);

// App.jsx setup
const appJsx = `import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompareSection from './components/CompareSection';
import TrustedTeams from './components/TrustedTeams';
import MobileReady from './components/MobileReady';
import AnalyticsSection from './components/AnalyticsSection';
import PricingCTA from './components/PricingCTA';
import './styles/globals.css';
import './styles/all.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CompareSection />
      <TrustedTeams />
      <MobileReady />
      <AnalyticsSection />
      <PricingCTA />
    </div>
  );
}

export default App;
`;
fs.writeFileSync('src/App.jsx', appJsx);
console.log("Migration script completed.");
