const http = require('http');

http.get('http://localhost:3000/features', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Fetched features page successfully.');
    
    // Print snippet around features-page-root
    const idxRoot = data.indexOf('features-page-root');
    if (idxRoot !== -1) {
      console.log('Root snippet:', data.substring(idxRoot - 50, idxRoot + 150));
    }
    
    // Print snippet around hero-actions
    const idxActions = data.indexOf('hero-actions');
    if (idxActions !== -1) {
      console.log('Hero actions snippet:', data.substring(idxActions - 50, idxActions + 150));
    }
    
    // Print snippet around future-transition-layer
    const idxLayer = data.indexOf('future-transition-layer');
    if (idxLayer !== -1) {
      console.log('Transition layer snippet:', data.substring(idxLayer - 50, idxLayer + 150));
    }
  });
}).on('error', (err) => {
  console.error('Error fetching features page:', err.message);
});
