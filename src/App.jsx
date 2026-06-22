import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CustomerStories from './pages/CustomerStories';
import ShiroCaseStudy from './pages/ShiroCaseStudy';
import './styles/globals.css';
import './styles/all.css';
import './styles/hero-bg.css';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    document.getElementById('mob')?.classList.remove('open');
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="mobile-overlay" id="mob">
        <div className="mobile-close" onClick={(e) => e.target.parentElement.classList.remove('open')}>✕</div>
        <Link to="/" onClick={() => document.getElementById('mob').classList.remove('open')}>Home</Link>
        <a href="#" onClick={() => document.getElementById('mob').classList.remove('open')}>Features</a>
        <a href="#" onClick={() => document.getElementById('mob').classList.remove('open')}>Solutions</a>
        <a href="#" onClick={() => document.getElementById('mob').classList.remove('open')}>Resources</a>
        <Link to="/customer-stories" style={{fontSize: "18px", paddingLeft: "16px"}} onClick={() => document.getElementById('mob').classList.remove('open')}>- Customer Stories</Link>
        <a href="#" onClick={() => document.getElementById('mob').classList.remove('open')}>Pricing</a>
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-stories" element={<CustomerStories />} />
        <Route path="/customer-stories/shiro" element={<ShiroCaseStudy />} />
      </Routes>
    </div>
  );
}
