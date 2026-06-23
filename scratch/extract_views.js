const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const html = fs.readFileSync(filePath, 'utf-8');

// Find all elements with data-view attribute
const dataViewReg = /data-view="([^"]*)"/g;
const views = new Set();
let match;
while ((match = dataViewReg.exec(html)) !== null) {
  views.add(match[1]);
}
console.log('Unique data-views found in HTML:', Array.from(views));

// Find all elements with data-section-tabs attribute
const tabsReg = /data-section-tabs="([^"]*)"/g;
const tabs = new Set();
while ((match = tabsReg.exec(html)) !== null) {
  tabs.add(match[1]);
}
console.log('Unique data-section-tabs found in HTML:', Array.from(tabs));
