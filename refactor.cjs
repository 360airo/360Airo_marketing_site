const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

const navRegex = /<nav id=\"main-nav\" className=\"nav-dark\">[\s\S]*?<\/nav>/;
const navMatch = content.match(navRegex);
let navHtml = navMatch ? navMatch[0] : '';

const navbarCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
    ` + navHtml.replace(/<a([^>]*)>Resources<\/a>/g, `<div className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)} style={{position: 'relative'}}>
          <span $1 style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>Resources <ChevronDown size={14}/></span>
          {dropdownOpen && (
            <div className="dropdown-menu" style={{position: 'absolute', top: '100%', left: 0, backgroundColor: '#1A1E26', padding: '10px', borderRadius: '8px', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 100, border: '1px solid #333'}}>
              <Link to="/customer-stories" style={{color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '4px'}} className="dropdown-item">
                <BookOpen size={16} color="#4ADE80"/>
                Customer Stories
              </Link>
            </div>
          )}
        </div>`).replace(/href=\"#\"/g, 'to="/" as={Link}').replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>') + `
    </>
  );
}`;

fs.writeFileSync('src/components/Navbar.jsx', navbarCode);

const homeHtml = content.replace(navRegex, '').match(/<div className=\"app-container\">([\s\S]*)<\/div>/)[1];
const homeCode = `import React, { useEffect } from 'react';
import '../styles/globals.css';
import '../styles/all.css';
import '../styles/hero-bg.css';
import { initAnimations } from '../animations';

export default function Home() {
  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="home-container">
      ` + homeHtml + `
    </div>
  );
}`;

if (!fs.existsSync('src/pages')) fs.mkdirSync('src/pages');
fs.writeFileSync('src/pages/Home.jsx', homeCode);

const appCode = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CustomerStories from './pages/CustomerStories';
import './styles/globals.css';
import './styles/all.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-stories" element={<CustomerStories />} />
        </Routes>
      </div>
    </Router>
  );
}`;
fs.writeFileSync('src/App.jsx', appCode);

const csCode = `import React, { useEffect } from 'react';
import '../styles/customer-stories.css';

export default function CustomerStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="customer-stories-page">
      <div style={{paddingTop: '100px', minHeight: '100vh'}}>
         <h1>Customer Stories</h1>
      </div>
    </div>
  );
}`;
fs.writeFileSync('src/pages/CustomerStories.jsx', csCode);

console.log('Files created');
