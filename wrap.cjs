const fs = require('fs');
let body = fs.readFileSync('src/body.jsx', 'utf8');

// Strip out BOM if present
if (body.charCodeAt(0) === 0xFEFF) {
  body = body.slice(1);
}

// Remove the htmltojsx wrapper if it exists (usually a <div> at the top and </div> at the bottom)
// body.jsx usually has:
// <div>
//   <nav>...
//   ...
// </div>
// Let's just wrap the whole thing.

const appJsx = `import React, { useEffect } from 'react';
import './styles/globals.css';
import './styles/all.css';

export default function App() {
  return (
    <div className="app-container">
      ${body}
    </div>
  );
}
`;
fs.writeFileSync('src/App.jsx', appJsx);
console.log('App.jsx written.');
