const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetLogic = `        const timeline = gsap.timeline({
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
          }, "futureTabletZoom");`;

const replacementLogic = `        gsap.set(dashboardUiRef.current, {
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
          }, "tabletZoom");`;

let normalizedTarget = targetLogic.replace(/\n/g, '\r\n');
let normalizedReplacement = replacementLogic.replace(/\n/g, '\r\n');

if (content.includes(normalizedTarget)) {
    content = content.replace(normalizedTarget, normalizedReplacement);
    console.log('Successfully replaced GSAP logic (CRLF).');
} else {
    normalizedTarget = targetLogic.replace(/\r\n/g, '\n');
    normalizedReplacement = replacementLogic.replace(/\r\n/g, '\n');
    if (content.includes(normalizedTarget)) {
        content = content.replace(normalizedTarget, normalizedReplacement);
        console.log('Successfully replaced GSAP logic (LF).');
    } else {
        console.log('Failed to find GSAP logic.');
    }
}

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx GSAP updated.');
