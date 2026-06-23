const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\Nihal\\Downloads\\Dashboard (1).html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// 1. Extract CSS
console.log('Extracting CSS...');
let cssContent = '';
const styleReg = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let styleMatch;
while ((styleMatch = styleReg.exec(htmlContent)) !== null) {
  cssContent += styleMatch[1].trim() + '\n\n';
}

const cssDir = path.join(__dirname, '..', 'src', 'styles');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}
const cssFile = path.join(cssDir, 'DashboardMockup.css');
fs.writeFileSync(cssFile, cssContent);
console.log(`Saved CSS to ${cssFile} (${cssContent.length} bytes)`);

// 2. Extract HTML Body
console.log('Extracting HTML body...');
const appStart = htmlContent.indexOf('<div class="app">');
// Find the end of the app container by locating the index before the first script block after appStart
const nextScriptIndex = htmlContent.indexOf('<script', appStart);
let appBody = htmlContent.substring(appStart, nextScriptIndex).trim();

// Find the last closing </div> of <div class="app">
const lastDivIndex = appBody.lastIndexOf('</div>');
appBody = appBody.substring(0, lastDivIndex + 6); // Keep up to </div>

// 3. Convert HTML to JSX
console.log('Converting HTML to JSX...');
let jsx = appBody;

// Replace class with className
jsx = jsx.replace(/class=/g, 'className=');

// Replace standard HTML attributes with camelCase JSX versions
const attributeMap = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'clip-rule': 'clipRule',
  'fill-rule': 'fillRule',
  'font-size': 'fontSize',
  'text-anchor': 'textAnchor',
  'font-weight': 'fontWeight',
  'letter-spacing': 'letterSpacing',
  'line-height': 'lineHeight',
  'text-transform': 'textTransform',
  'font-family': 'fontFamily',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'stroke-miterlimit': 'strokeMiterlimit',
  'tabindex': 'tabIndex',
  'autocomplete': 'autoComplete',
  'autofocus': 'autoFocus',
  'readonly': 'readOnly',
  'aria-haspopup': 'ariaHasPopup',
  'aria-expanded': 'ariaExpanded',
  'aria-hidden': 'ariaHidden',
  'aria-label': 'ariaLabel'
};

for (const [htmlAttr, jsxAttr] of Object.entries(attributeMap)) {
  const reg = new RegExp(`${htmlAttr}=`, 'g');
  jsx = jsx.replace(reg, `${jsxAttr}=`);
}

// Convert self-closing tags
const selfClosingTags = ['img', 'input', 'br', 'line', 'circle', 'path', 'rect', 'polyline', 'polygon', 'stop', 'use'];
selfClosingTags.forEach(tag => {
  // Matches tags like <img class="avatar" src="..."> that don't end with />
  const tagReg = new RegExp(`<(${tag})([^>]*?)(?<!\\/)>`, 'gi');
  jsx = jsx.replace(tagReg, `<$1$2 />`);
});

// Convert style="width: 100%; height: 100%; ..." to style={{width: '100%', height: '100%', ...}}
const styleAttrReg = /style="([^"]*)"/g;
jsx = jsx.replace(styleAttrReg, (match, styleStr) => {
  const styles = styleStr.split(';').filter(s => s.trim().length > 0);
  const styleObjStr = styles.map(s => {
    const parts = s.split(':');
    const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const val = parts.slice(1).join(':').trim();
    const isNum = !isNaN(val) && val.length > 0;
    return `"${key}": ${isNum ? val : `'${val.replace(/'/g, "\\'")}'`}`;
  }).join(', ');
  return `style={{${styleObjStr}}}`;
});

// Replace HTML character entities
jsx = jsx.replace(/&middot;/g, '·');
jsx = jsx.replace(/&apos;/g, "'");
jsx = jsx.replace(/&quot;/g, '"');
jsx = jsx.replace(/&amp;/g, '&');
jsx = jsx.replace(/&lt;/g, '<');
jsx = jsx.replace(/&gt;/g, '>');

// 4. Create React Component Code
const componentCode = `// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import '../styles/DashboardMockup.css';

export default function DashboardMockup() {
  const [theme, setTheme] = useState('light');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentSection, setCurrentSection] = useState('overview');

  useEffect(() => {
    // Apply theme dataset to HTML document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Quick helper to collapse/expand sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    if (!isSidebarCollapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
  };

  return (
    ${jsx}
  );
}
`;

const compDir = path.join(__dirname, '..', 'src', 'components');
const compFile = path.join(compDir, 'DashboardMockup.tsx');
fs.writeFileSync(compFile, componentCode);
console.log(`Saved Component to ${compFile} (${componentCode.length} bytes)`);
