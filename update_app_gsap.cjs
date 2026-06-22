const fs = require('fs');

let file = fs.readFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', 'utf8');

// 1. Imports
if(!file.includes("useLayoutEffect")) {
  file = file.replace(
    "import React, { useEffect } from 'react';",
    "import React, { useEffect, useRef, useLayoutEffect } from 'react';\nimport { gsap } from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(ScrollTrigger);"
  );
}

// 2. Add Refs and Hook
const hooks = `  const heroStageRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroDashboardRef = useRef(null);
  const transitionTabletRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroStageRef.current,
            start: "top top",
            end: "+=2800",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        timeline
          .addLabel("heroExit")
          .to(heroContentRef.current, {
            opacity: 0,
            x: -70,
            y: -18,
            filter: "blur(4px)",
            duration: 1,
            ease: "none"
          }, "heroExit")
          .to(heroDashboardRef.current, {
            opacity: 0,
            x: 55,
            y: 20,
            scale: 0.92,
            filter: "blur(4px)",
            duration: 1,
            ease: "none"
          }, "heroExit")
          .addLabel("futureTabletEnter", "heroExit+=0.55")
          .to(transitionTabletRef.current, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "none"
          }, "futureTabletEnter")
          .addLabel("futureTabletZoom", "futureTabletEnter+=0.95")
          .to(transitionTabletRef.current, {
            scale: () => {
              if(!transitionTabletRef.current) return 1;
              const rect = transitionTabletRef.current.getBoundingClientRect();
              return Math.max(
                window.innerWidth / rect.width,
                window.innerHeight / rect.height
              ) * 1.18;
            },
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 1.8,
            ease: "none"
          }, "futureTabletZoom");
      });
    });
    return () => ctx.revert();
  }, []);
`;

if(!file.includes("const heroStageRef")) {
  file = file.replace(
    "  useEffect(() => {\n    initAnimations();\n  }, []);",
    "  useEffect(() => {\n    initAnimations();\n  }, []);\n\n" + hooks
  );
}

// 3. Structure wrap
if(!file.includes('className="hero-stitch-stage"')) {
  file = file.replace(
    '    <div className="app-container">\n      <div>   ',
    '    <div className="app-container">\n      <div>\n      <section className="hero-stitch-stage" ref={heroStageRef}>\n        <div className="hero-scene">'
  );
  
  file = file.replace(
    '      </div>{/* /.hero-visual */}\n    </section>\n\n  <div id="section-phone"><section className="p2-hero">',
    '      </div>{/* /.hero-visual */}\n    </section>\n        </div>{/* /.hero-scene */}\n\n        <div className="future-transition-layer" aria-hidden="true">\n          <div className="future-transition-tablet" ref={transitionTabletRef}>\n            <div className="future-transition-title">\n              <span>THE FUTURE</span>\n              <span>OF</span>\n              <span>OUTREACH</span>\n            </div>\n          </div>\n        </div>\n      </section>\n\n  <div id="section-phone"><section className="p2-hero">'
  );
}

// 4. Attach Refs to existing divs
if(!file.includes('ref={heroContentRef}')) {
  file = file.replace('<div className="hero-copy">', '<div className="hero-copy" ref={heroContentRef}>');
}
if(!file.includes('ref={heroDashboardRef}')) {
  file = file.replace('<div className="hero-visual">', '<div className="hero-visual" ref={heroDashboardRef}>');
}

fs.writeFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/App.jsx', file);
console.log("App.jsx updated with GSAP successfully!");
