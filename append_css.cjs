const fs = require('fs');
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// I should probably remove the old `.future-transition-tablet` styles if they conflict.
css = css.replace(/\.future-transition-tablet \{[\s\S]*?\}/g, '');
css = css.replace(/\.future-transition-title \{[\s\S]*?\}/g, '');
css = css.replace(/\.future-transition-layer \{[\s\S]*?\}/g, '');

const newCss = `

/* ----- HERO DASHBOARD TRANSITION ----- */
.hero-dashboard-tablet {
  position: relative;
  overflow: hidden;
  transform-origin: center center;
  will-change: transform, opacity;
}

.hero-dashboard-ui,
.future-tablet-content {
  position: absolute;
  inset: 0;
}

.hero-dashboard-ui {
  z-index: 2;
  opacity: 1;
  will-change: opacity, transform, filter;
}

.future-tablet-content {
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 4vw, 56px);

  opacity: 0;
  visibility: hidden;
  background: #ffffff;

  will-change: opacity, transform, filter;
}

.future-tablet-content h2 {
  width: 100%;
  margin: 0;
  color: #0a0a0a;
  font-family: inherit;
  font-size: clamp(2rem, 4vw, 5.7rem);
  font-weight: 900;
  line-height: 0.84;
  letter-spacing: -0.07em;
}

.future-tablet-content h2 span {
  display: block;
}
`;

css += newCss;
fs.writeFileSync('src/styles/globals.css', css);
console.log('globals.css updated.');
