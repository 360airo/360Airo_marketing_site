/* ────────────────────────────────────────
   AURORA CANVAS — parallax wave beams
───────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, scrollY = 0, t = 0;
  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('scroll', ()=>{ scrollY=window.scrollY; }, {passive:true});

  const STARS = Array.from({length:260}, ()=>({
    x: Math.random(),
    ry: null,
    frac: Math.random(),
    r: .3+Math.random()*1.4,
    o: .12+Math.random()*.62,
    ts: .003+Math.random()*.013,
    tp: Math.random()*Math.PI*2,
  }));

  function resolveStars() {
    requestAnimationFrame(() => {
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        2000
      );
      const half = docH * 0.50;
      const span = docH * 0.65;
      STARS.forEach(s => {
        s.ry = half + s.frac * span;
      });
    });
  }

  window._resolveStars = resolveStars;

  resolveStars();
  window.addEventListener('load',   resolveStars, { once: true });
  window.addEventListener('resize', resolveStars, { passive: true });
  const BEAMS = [
    { bx:.25, by:.22, bw:.65, ang:-32, col:[59,130,246],  lc:[148,194,255], op:.18, sp:.00035, pf:.20, ph:0.0,  dpx:+0.20  },
    { bx:.70, by:.12, bw:.75, ang:-28, col:[99,102,241],  lc:[172,175,255], op:.12, sp:.00025, pf:.12, ph:1.8,  dpx:-0.156 },
    { bx:.10, by:.50, bw:.80, ang:-38, col:[139,92,246],  lc:[188,160,255], op:.13, sp:.00040, pf:.30, ph:0.9,  dpx:+0.39  },
    { bx:.80, by:.40, bw:.50, ang:-26, col:[6,182,212],   lc:[140,214,238], op:.08, sp:.00028, pf:.18, ph:2.4,  dpx:-0.135 },
    { bx:.45, by:.68, bw:.70, ang:-36, col:[79,70,229],   lc:[162,160,255], op:.11, sp:.00045, pf:.38, ph:3.2,  dpx:+0.285 },
    { bx:.30, by:.82, bw:.60, ang:-34, col:[147,197,253], lc:[166,208,255], op:.07, sp:.00032, pf:.26, ph:1.1,  dpx:-0.26  },
    { bx:.60, by:.95, bw:.55, ang:-30, col:[167,139,250], lc:[190,168,255], op:.09, sp:.00038, pf:.34, ph:4.1,  dpx:+0.442 },
  ];

  function drawBeam(b, lp) {
    const cx  = b.bx * W + scrollY * b.dpx;
    const wob = Math.sin(t * b.sp * 1000 + b.ph) * 38;
    const cy  = (b.by * H) - scrollY * b.pf + wob;

    const bw  = b.bw * W * 0.8;
    const len = Math.sqrt(W * W + H * H) * 1.7;
    const rad = b.ang * Math.PI / 180;

    const [dr, dg, db] = b.col;
    const [lr, lg, lb] = b.lc;
    const r  = Math.round(dr + (lr - dr) * lp);
    const gv = Math.round(dg + (lg - dg) * lp);
    const bl = Math.round(db + (lb - db) * lp);

    const op = b.op * (1 + lp * 2.4);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rad);
    const g = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    g.addColorStop(0,    `rgba(${r},${gv},${bl},0)`);
    g.addColorStop(0.32, `rgba(${r},${gv},${bl},${(op * 0.52).toFixed(3)})`);
    g.addColorStop(0.5,  `rgba(${r},${gv},${bl},${op.toFixed(3)})`);
    g.addColorStop(0.68, `rgba(${r},${gv},${bl},${(op * 0.52).toFixed(3)})`);
    g.addColorStop(1,    `rgba(${r},${gv},${bl},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(-len / 2, -bw / 2, len, bw);
    ctx.restore();
  }

  function frame() {
    const bg = ctx.createRadialGradient(W * .5, H * .4, 0, W * .5, H * .5, Math.max(W, H) * .9);
    bg.addColorStop(0,   '#080D20');
    bg.addColorStop(0.6, '#040810');
    bg.addColorStop(1,   '#020408');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const lp = window._lightProg || 0;

    ctx.globalCompositeOperation = 'lighter';
    BEAMS.forEach(b => drawBeam(b, lp));
    ctx.globalCompositeOperation = 'source-over';

    STARS.forEach(s => {
      if (s.ry === null) return;
      const sy = s.ry - scrollY;
      if (sy < -8 || sy > H + 8) return;
      const tw = .52 + .48 * Math.sin(t * s.ts * 1000 + s.tp);
      ctx.beginPath();
      ctx.arc(s.x * W, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${(s.o * tw).toFixed(3)})`;
      ctx.fill();
    });

    t += .016;
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ────────────────────────────────────────
   SCROLL-DRIVEN LIGHT SECTION PARALLAX
───────────────────────────────────────── */
window._lightProg = 0;

const FADE_ZONE = 520;

function lerp(a, b, t) { return a + (b - a) * t; }

let _navProg = 0;

function updateLightSections() {
  let maxProg = 0;

  document.querySelectorAll('.scene-light').forEach(el => {
    const rect = el.getBoundingClientRect();
    let prog = 0;

    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      prog = 0;
    } else if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      prog = 1;
    } else if (rect.top > 0) {
      prog = Math.min(1, Math.max(0, 1 - rect.top / FADE_ZONE));
    } else {
      prog = Math.min(1, Math.max(0, rect.bottom / FADE_ZONE));
    }

    el.style.setProperty('--bg-prog', prog);
    if (prog > maxProg) maxProg = prog;
  });

  window._lightProg = maxProg;

  _navProg += (maxProg - _navProg) * 0.06;
  const p = _navProg;

  const nav = document.querySelector('nav') || document.querySelector('#main-nav');
  if (nav) {
    const bgR = Math.round(lerp(3,   228, p));
    const bgG = Math.round(lerp(7,   234, p));
    const bgB = Math.round(lerp(18,  252, p));
    const bgA = (lerp(0.42, 0.72, p)).toFixed(2);
    nav.style.background = `rgba(${bgR},${bgG},${bgB},${bgA})`;

    const bR  = Math.round(lerp(255, 99,  p));
    const bG  = Math.round(lerp(255, 102, p));
    const bBl = Math.round(lerp(255, 241, p));
    const bA  = (lerp(0.09, 0.18, p)).toFixed(2);
    nav.style.borderBottomColor = `rgba(${bR},${bG},${bBl},${bA})`;
  }
}

let rafId;
function lightLoop() {
  updateLightSections();
  rafId = requestAnimationFrame(lightLoop);
}
lightLoop();
