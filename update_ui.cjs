const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

let targetTop = `<div className="hero-visual" ref={heroDashboardRef}>
        <div className="tablet-frame">
          <div className="tablet-camera" />
          <div className="tablet-side-dot tablet-left" />
          <div className="tablet-side-dot tablet-right" />
          <div className="tablet-screen">
            <div className="db-container">`;
            
let replacementTop = `<div className="hero-visual">
        <div className="tablet-frame hero-dashboard-tablet" ref={heroTabletRef}>
          <div className="tablet-camera" />
          <div className="tablet-side-dot tablet-left" />
          <div className="tablet-side-dot tablet-right" />
          <div className="tablet-screen">
            <div ref={dashboardUiRef} className="hero-dashboard-ui">
              <div className="db-container">`;
              
targetTop = targetTop.replace(/\n/g, '\r\n');
replacementTop = replacementTop.replace(/\n/g, '\r\n');

if (content.includes(targetTop)) {
    content = content.replace(targetTop, replacementTop);
    console.log('Successfully replaced top markup.');
} else {
    targetTop = targetTop.replace(/\r\n/g, '\n');
    replacementTop = replacementTop.replace(/\r\n/g, '\n');
    if (content.includes(targetTop)) {
        content = content.replace(targetTop, replacementTop);
        console.log('Successfully replaced top markup (LF).');
    } else {
        console.log('Failed to find top markup.');
    }
}

let targetBottom = `            </div>
          </div>{/* /.tablet-screen */}`;

let replacementBottom = `            </div>
            </div>{/* /.hero-dashboard-ui */}
            <div ref={futureTabletContentRef} className="future-tablet-content">
              <h2>
                <span>THE FUTURE</span>
                <span>OF</span>
                <span>OUTREACH</span>
              </h2>
            </div>
          </div>{/* /.tablet-screen */}`;

targetBottom = targetBottom.replace(/\n/g, '\r\n');
replacementBottom = replacementBottom.replace(/\n/g, '\r\n');

if (content.includes(targetBottom)) {
    content = content.replace(targetBottom, replacementBottom);
    console.log('Successfully replaced bottom markup.');
} else {
    targetBottom = targetBottom.replace(/\r\n/g, '\n');
    replacementBottom = replacementBottom.replace(/\r\n/g, '\n');
    if (content.includes(targetBottom)) {
        content = content.replace(targetBottom, replacementBottom);
        console.log('Successfully replaced bottom markup (LF).');
    } else {
        console.log('Failed to find bottom markup.');
    }
}

content = content.replace('const heroDashboardRef = useRef(null);', 'const heroTabletRef = useRef(null);\n  const dashboardUiRef = useRef(null);\n  const futureTabletContentRef = useRef(null);');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx markup updated.');
