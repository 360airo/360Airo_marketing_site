const fs = require('fs');

const css = `
/* GSAP Transition Styles */
html,
body {
  overflow-x: hidden;
}

.hero-stitch-stage {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: inherit; /* preserve existing Hero background */
}

.hero-scene {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.future-transition-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  overflow: hidden;
}

.future-transition-tablet {
  position: absolute;
  top: 50%;
  right: 7%;
  width: min(680px, 46vw);
  aspect-ratio: 1.48 / 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border: 7px solid #080808;
  border-radius: 24px;

  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;

  transform-origin: center center;
  will-change: transform, opacity, border-radius, border-width;
}

.future-transition-title {
  width: 76%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  color: #0a0a0a;
  font-weight: 900;
  font-size: clamp(2.5rem, 4vw, 5.7rem);
  line-height: 0.84;
  letter-spacing: -0.07em;
}

.future-section {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
}

@media (max-width: 768px) {
  .future-transition-tablet {
     top: 60%;
     left: 50%;
     right: auto;
     margin-left: -44vw; /* center it */
     width: 88vw;
  }
}
`;

fs.appendFileSync('c:/Users/hp/Documents/GitHub/360Airo_marketing_site/src/styles/globals.css', css);
console.log("CSS appended successfully.");
