const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Add import Navbar
if (!code.includes('import Navbar')) {
  code = code.replace(
    "import ModernOutreachSection from './components/ModernOutreachSection';",
    "import ModernOutreachSection from './components/ModernOutreachSection';\nimport Navbar from './components/Navbar';\nimport { Link } from 'react-router-dom';"
  );
}

// Replace the <nav> block
code = code.replace(/<nav id="main-nav"[\s\S]*?<\/nav>/, '<Navbar />');

// Update mobile menu to add Customer Stories
code = code.replace(
    '<a href="#" onClick={() => document.getElementById(\'mob\').classList.remove(\'open\')}>Resources</a>',
    '<a href="#" onClick={() => document.getElementById(\'mob\').classList.remove(\'open\')}>Resources</a>\n    <Link to="/customer-stories" style={{fontSize: "18px", paddingLeft: "16px"}} onClick={() => document.getElementById(\'mob\').classList.remove(\'open\')}>- Customer Stories</Link>'
);

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx updated successfully!');
