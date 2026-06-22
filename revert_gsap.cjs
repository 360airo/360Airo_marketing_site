const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Find the start and end of the GSAP setup
const startStr = 'gsap.set(dashboardUiRef.current, {';
const endStr = '});\n\n      });\n    });\n    return () => ctx.revert();';

const startIndex = content.indexOf(startStr);
// Let's find the `ctx.revert()` line to anchor the end.
const ctxRevertIndex = content.indexOf('return () => ctx.revert();');

if (startIndex === -1 || ctxRevertIndex === -1) {
  console.log('Could not find anchor points.');
  process.exit(1);
}

// Find the block closing for `mm.add` and `ctx` just before ctx.revert
const beforeRevert = content.lastIndexOf('});', ctxRevertIndex);
const beforeRevert2 = content.lastIndexOf('});', beforeRevert - 1);

// Let's use a simpler string replacement.
const replacement = `gsap.set(dashboardUiRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)"
        });

        gsap.set(futureTabletContentRef.current, {
          autoAlpha: 0,
          opacity: 0,
          scale: 0.96,
          y: 20,
          filter: "blur(5px)"
        });

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
          .to(dashboardUiRef.current, {
            opacity: 0,
            scale: 0.96,
            filter: "blur(4px)",
            duration: 1,
            ease: "none"
          }, "heroExit")
          .addLabel("futureTitleEnter", "heroExit+=0.62")
          .to(futureTabletContentRef.current, {
            autoAlpha: 1,
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "none"
          }, "futureTitleEnter")
          .addLabel("tabletZoom", "futureTitleEnter+=0.9")
          .to(heroTabletRef.current, {
            scale: () => {
              if(!heroTabletRef.current) return 1;
              const rect = heroTabletRef.current.getBoundingClientRect();

              return Math.max(
                window.innerWidth / rect.width,
                window.innerHeight / rect.height
              ) * 1.16;
            },
            borderRadius: 0,
            borderWidth: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 1.8,
            ease: "none"
          }, "tabletZoom");
`;

const head = content.substring(0, startIndex);
// Find the exact place where `});\n    });\n    return () => ctx.revert();` starts
const tailRegex = /\}\);\s*\}\);\s*return \(\) => ctx\.revert\(\);/;
const match = tailRegex.exec(content.substring(startIndex));

if (match) {
  const tail = content.substring(startIndex + match.index);
  fs.writeFileSync('src/App.jsx', head + replacement + '      ' + tail);
  console.log('GSAP reverted successfully.');
} else {
  console.log('Regex match failed.');
}
