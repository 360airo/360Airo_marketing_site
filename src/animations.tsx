// @ts-nocheck
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimations() {
/* ============================================
   BACKGROUND SYSTEM
   ============================================ */
(function(){
const darkCanvas=document.getElementById('aurora-canvas');
const lightCanvas=document.getElementById('aurora-light-canvas');
const dctx=darkCanvas.getContext('2d');
const lctx=lightCanvas.getContext('2d');
let W=0,H=0,DPR=1,scrollY=0,t=0;
window._lightProg=0;

function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function lerp(a,b,t){return a+(b-a)*t}

function setSize(){
  DPR=Math.min(window.devicePixelRatio||1,2);
  [darkCanvas,lightCanvas].forEach(c=>{
    c.width=Math.round(innerWidth*DPR);
    c.height=Math.round(innerHeight*DPR);
    c.style.width=innerWidth+'px';
    c.style.height=innerHeight+'px';
  });
  dctx.setTransform(DPR,0,0,DPR,0,0);
  lctx.setTransform(DPR,0,0,DPR,0,0);
  W=innerWidth;H=innerHeight;
  resolveDarkStars();
}
addEventListener('resize',setSize,{passive:true});
addEventListener('scroll',()=>{scrollY=window.pageYOffset||window.scrollY||0},{passive:true});

/* DARK AURORA */
const darkBeams=[
{bx:.25,by:.22,bw:.65,ang:-32,col:[59,130,246],op:.18,sp:.00035,pf:.20,ph:0.0,dpx:+0.20},
{bx:.70,by:.12,bw:.75,ang:-28,col:[99,102,241],op:.12,sp:.00025,pf:.12,ph:1.8,dpx:-0.156},
{bx:.10,by:.50,bw:.80,ang:-38,col:[139,92,246],op:.13,sp:.00040,pf:.30,ph:0.9,dpx:+0.39},
{bx:.80,by:.40,bw:.50,ang:-26,col:[6,182,212],op:.08,sp:.00028,pf:.18,ph:2.4,dpx:-0.135},
{bx:.45,by:.68,bw:.70,ang:-36,col:[79,70,229],op:.11,sp:.00045,pf:.38,ph:3.2,dpx:+0.285},
{bx:.30,by:.82,bw:.60,ang:-34,col:[147,197,253],op:.07,sp:.00032,pf:.26,ph:1.1,dpx:-0.26},
{bx:.60,by:.95,bw:.55,ang:-30,col:[167,139,250],op:.09,sp:.00038,pf:.34,ph:4.1,dpx:+0.442}
];

let darkStars=[];
function seedStars(){
  darkStars=[];
  for(let i=0;i<260;i++) darkStars.push({frac:Math.random(),rx:Math.random(),ry:0,radius:.3+Math.random()*1.4,opacity:.12+Math.random()*.62,speed:.003+Math.random()*.013,phase:Math.random()*Math.PI*2});
  resolveDarkStars();
}
function resolveDarkStars(){
  const docH=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,innerHeight*2);
  darkStars.forEach(s=>{s.ry=docH*.5+s.frac*docH*.65});
}
window._resolveStars=resolveDarkStars;

/* LIGHT SPECIAL BG */
const lightBeams=[
{bx:.22,by:.22,bw:.75,ang:-30,col:[147,197,253],op:.085,sp:.00028,ph:0,drift:.12},
{bx:.72,by:.16,bw:.82,ang:-26,col:[165,180,252],op:.065,sp:.00022,ph:1.8,drift:-.08},
{bx:.16,by:.52,bw:.88,ang:-36,col:[196,181,253],op:.075,sp:.00030,ph:.9,drift:.15},
{bx:.78,by:.42,bw:.58,ang:-24,col:[153,212,238],op:.055,sp:.00020,ph:2.2,drift:-.06},
{bx:.48,by:.72,bw:.74,ang:-34,col:[165,180,252],op:.06,sp:.00033,ph:3.1,drift:.12},
{bx:.32,by:.86,bw:.66,ang:-29,col:[147,197,253],op:.05,sp:.00024,ph:4,drift:-.1}
];
const lightParticles=[];
for(let i=0;i<60;i++) lightParticles.push({x:Math.random(),y:Math.random(),r:.7+Math.random()*1.8,op:.05+Math.random()*.18,tw:.002+Math.random()*.01,ph:Math.random()*Math.PI*2,dx:(Math.random()-.5)*.00003,dy:(Math.random()-.5)*.00002});

function getRect(id){const el=document.getElementById(id);return el?el.getBoundingClientRect():null}
function secProg(rect,fade){
  if(!rect)return 0;
  if(rect.bottom<=0||rect.top>=innerHeight)return 0;
  if(rect.top<=0&&rect.bottom>=innerHeight)return 1;
  if(rect.top>0)return clamp(1-rect.top/fade,0,1);
  return clamp(rect.bottom/fade,0,1);
}

/* ZONE CONTROL */
function updateZones(){
  /* Light sections (white bg): phone, wyg, dashboard, compare, trusted */
  const phone=getRect('section-phone');
  const wyg=getRect('section-wyg');
  const dash=getRect('section-dashboard');
  const compare=getRect('section-compare');
  const trusted=getRect('section-trusted');

  let lightMax=0;
  [phone,wyg,dash,compare,trusted].forEach(r=>{lightMax=Math.max(lightMax,secProg(r,520))});

  /* "Turn Prospects Into Clients" — light starts only when 30% from top */
  const lightStartEl=document.getElementById('aurora-light-start');
  if(lightStartEl){
    const r=lightStartEl.getBoundingClientRect();
    /* Only start when the top of this section is at 70% of viewport (30% from top) */
    const threshold=innerHeight*0.3;
    if(r.top<threshold&&r.bottom>0){
      const prog=clamp((threshold-r.top)/400,0,1);
      lightMax=Math.max(lightMax,prog);
    }
  }

  window._lightProg=clamp(lightMax,0,1);
}

/* DARK BEAM DRAW */
function drawDarkBeam(b,alpha){
  const cx=b.bx*W+scrollY*b.dpx;
  const wob=Math.sin(t*b.sp*1000+b.ph)*38;
  const cy=(b.by*H)-scrollY*b.pf+wob;
  const bw=b.bw*W*.8;
  const len=Math.sqrt(W*W+H*H)*1.7;
  const op=b.op*alpha;
  const ang=b.ang*Math.PI/180;
  const px=Math.sin(ang),py=-Math.cos(ang);
  const grd=dctx.createLinearGradient(px*(-bw/2),py*(-bw/2),px*(bw/2),py*(bw/2));
  grd.addColorStop(0,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  grd.addColorStop(.32,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${op*.52})`);
  grd.addColorStop(.5,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${op})`);
  grd.addColorStop(.68,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${op*.52})`);
  grd.addColorStop(1,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  dctx.save();dctx.translate(cx,cy);dctx.rotate(ang);dctx.fillStyle=grd;dctx.fillRect(-len/2,-bw/2,len,bw);dctx.restore();
}

function renderDark(){
  dctx.clearRect(0,0,W,H);
  const lp=window._lightProg||0;
  const alpha=1-lp;
  if(alpha<=.002)return;
  const bg=dctx.createRadialGradient(W*.5,H*.4,0,W*.5,H*.5,Math.max(W,H)*.9);
  bg.addColorStop(0,"#080D20");bg.addColorStop(.6,"#040810");bg.addColorStop(1,"#020408");
  dctx.globalAlpha=alpha;dctx.globalCompositeOperation="source-over";dctx.fillStyle=bg;dctx.fillRect(0,0,W,H);
  dctx.globalCompositeOperation="lighter";
  darkBeams.forEach(b=>drawDarkBeam(b,alpha));
  dctx.globalCompositeOperation="source-over";
  for(const s of darkStars){
    const sy=s.ry-scrollY;
    if(sy<-8||sy>H+8)continue;
    const tw=.5+.5*Math.sin(t*60*s.speed+s.phase);
    dctx.beginPath();dctx.arc(s.rx*W,sy,s.radius,0,Math.PI*2);
    dctx.fillStyle=`rgba(255,255,255,${(s.opacity*tw*alpha).toFixed(3)})`;dctx.fill();
  }
  dctx.globalAlpha=1;
}

/* LIGHT DRAW */
function drawLightMul(b,alpha){
  const cx=b.bx*W+Math.sin(t*b.sp*1100+b.ph)*42+scrollY*b.drift*.03;
  const cy=b.by*H+Math.cos(t*b.sp*900+b.ph)*26;
  const bw=b.bw*W*.78;
  const len=Math.sqrt(W*W+H*H)*1.6;
  const ang=b.ang*Math.PI/180;
  const grd=lctx.createLinearGradient(0,-bw/2,0,bw/2);
  grd.addColorStop(0,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  grd.addColorStop(.28,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*.35*alpha})`);
  grd.addColorStop(.5,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*alpha})`);
  grd.addColorStop(.72,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*.35*alpha})`);
  grd.addColorStop(1,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  lctx.save();lctx.translate(cx,cy);lctx.rotate(ang);lctx.fillStyle=grd;lctx.fillRect(-len/2,-bw/2,len,bw);lctx.restore();
}
function drawLightScr(b,alpha){
  const cx=b.bx*W+Math.sin(t*b.sp*700+b.ph+1.5)*30;
  const cy=b.by*H+Math.cos(t*b.sp*650+b.ph+.7)*18;
  const bw=b.bw*W*.52;
  const len=Math.sqrt(W*W+H*H)*1.3;
  const ang=(b.ang-2)*Math.PI/180;
  const grd=lctx.createLinearGradient(0,-bw/2,0,bw/2);
  grd.addColorStop(0,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  grd.addColorStop(.35,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*.18*alpha})`);
  grd.addColorStop(.5,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*.32*alpha})`);
  grd.addColorStop(.65,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},${b.op*.18*alpha})`);
  grd.addColorStop(1,`rgba(${b.col[0]},${b.col[1]},${b.col[2]},0)`);
  lctx.save();lctx.translate(cx,cy);lctx.rotate(ang);lctx.fillStyle=grd;lctx.fillRect(-len/2,-bw/2,len,bw);lctx.restore();
}

function renderLight(){
  lctx.clearRect(0,0,W,H);
  const lp=window._lightProg||0;
  if(lp<=.002){lightCanvas.style.opacity='0';return}
  lightCanvas.style.opacity=lp.toFixed(3);
  /* Pure white base */
  lctx.globalCompositeOperation='source-over';
  lctx.fillStyle='#ffffff';
  lctx.fillRect(0,0,W,H);
  /* Soft radial tint */
  const bg=lctx.createRadialGradient(W*.5,H*.42,0,W*.5,H*.5,Math.max(W,H)*.95);
  bg.addColorStop(0,'rgba(248,250,255,0.6)');bg.addColorStop(.38,'rgba(240,244,255,0.4)');bg.addColorStop(.72,'rgba(238,242,255,0.3)');bg.addColorStop(1,'rgba(238,242,255,0.2)');
  lctx.fillStyle=bg;lctx.fillRect(0,0,W,H);
  /* Multiply beams */
  lctx.globalCompositeOperation='multiply';
  lightBeams.forEach(b=>drawLightMul(b,lp));
  /* Screen pass */
  lctx.globalCompositeOperation='screen';
  lightBeams.forEach(b=>drawLightScr(b,lp*.7));
  /* Particles */
  lctx.globalCompositeOperation='source-over';
  lightParticles.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<-.05)p.x=1.05;if(p.x>1.05)p.x=-.05;
    if(p.y<-.05)p.y=1.05;if(p.y>1.05)p.y=-.05;
    const tw=.5+.5*Math.sin(t*1000*p.tw+p.ph);
    lctx.beginPath();lctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);
    lctx.fillStyle=`rgba(147,197,253,${(p.op*tw*lp*.6).toFixed(3)})`;lctx.fill();
  });
}

function loop(){t+=.016;updateZones();renderDark();renderLight();requestAnimationFrame(loop)}
setSize();seedStars();loop();
})();

/* NAV LERP */
(function(){
const nav=document.getElementById('main-nav');
let _p=0;
function lerp(a,b,t){return a+(b-a)*t}
function upNav(){
  const isFeatures = window.location.pathname === "/features" || window.location.pathname === "/features/";
  const tgt = isFeatures ? 0 : (window._lightProg||0);
  _p+=(tgt-_p)*.06;
  const p=_p;
  nav.style.background=`rgba(${Math.round(lerp(3,228,p))},${Math.round(lerp(7,234,p))},${Math.round(lerp(18,252,p))},${lerp(.42,.72,p).toFixed(2)})`;
  nav.style.borderBottomColor=`rgba(${Math.round(lerp(255,99,p))},${Math.round(lerp(255,102,p))},${Math.round(lerp(255,241,p))},${lerp(.09,.18,p).toFixed(2)})`;
  const tR=Math.round(lerp(255,15,p)),tG=Math.round(lerp(255,23,p)),tB=Math.round(lerp(255,42,p)),tA=lerp(.72,.65,p).toFixed(2);
  nav.querySelectorAll('.nav-text-item:not(.active)').forEach(l=>{l.style.color=`rgba(${tR},${tG},${tB},${tA})`});
  nav.querySelectorAll('.nav-text-item.active').forEach(l=>{l.style.color=p>.55?'#0F172A':'#fff'});
  const logo=nav.querySelector('.nav-logo-fallback');
  if(logo){logo.style.color=p>.55?'#0F172A':'#fff';const sp=logo.querySelector('span');if(sp)sp.style.color='#3B82F6'}
  requestAnimationFrame(upNav);
}
upNav();
})();

/* SCROLL ENTRY */
(function(){
const io=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1});
document.querySelectorAll('[data-anim]').forEach(el=>io.observe(el));
})();

/* PHONE ANIMS */
(function(){
const E=t=>t===1?1:1-Math.pow(2,-10*t);
document.querySelectorAll('#section-phone .headline-inner').forEach(i=>{const d=parseInt(i.getAttribute('data-headline-delay'))||500;setTimeout(()=>i.classList.add('revealed'),d)});
document.querySelectorAll('#section-phone [data-reveal]').forEach(e=>{const d=parseInt(e.getAttribute('data-delay'))||0;setTimeout(()=>e.classList.add('revealed'),d)});
const pd=1400;
function ac(el,dl){const tg=parseInt(el.getAttribute('data-target')),sf=el.getAttribute('data-suffix')||'',du=2200;setTimeout(()=>{const st=performance.now();function tk(n){const p=Math.min((n-st)/du,1);el.textContent=Math.round(E(p)*tg).toLocaleString()+sf;if(p<1)requestAnimationFrame(tk)}requestAnimationFrame(tk)},dl)}
document.querySelectorAll('#section-phone [data-target]').forEach((e,i)=>ac(e,pd+i*120));
document.querySelectorAll('#section-phone .chart-line').forEach(l=>{const d=parseInt(l.getAttribute('data-line-delay'))||1200;setTimeout(()=>l.classList.add('animate'),pd+d)});
document.querySelectorAll('#section-phone .chart-area').forEach(a=>{const d=parseInt(a.getAttribute('data-area-delay'))||2000;setTimeout(()=>a.classList.add('animate'),pd+d)});
document.querySelectorAll('#section-phone .chart-dot,#section-phone .chart-dot-pulse').forEach(d=>{const dl=parseInt(d.getAttribute('data-dot-delay'))||3000;setTimeout(()=>d.classList.add('animate'),pd+dl)});
setTimeout(()=>{const e=document.getElementById('p2pe'),l=document.getElementById('p2pl'),s=document.getElementById('p2ps');if(e){e.style.width='56%';l.style.width='25%';s.style.width='19%'}},pd+2000);
})();

/* 3STACK RIBBON */
(function(){
const pts=document.getElementById('s3pts');if(!pts)return;
for(let i=0;i<45;i++){const d=document.createElement('div');d.className='s3pk';d.style.left=Math.random()*100+'%';d.style.top=Math.random()*100+'%';const sz=1.5+Math.random()*3;d.style.width=sz+'px';d.style.height=sz+'px';d.style.setProperty('--d',(2+Math.random()*5)+'s');d.style.setProperty('--dl',(Math.random()*6)+'s');d.style.setProperty('--o',(0.15+Math.random()*.35).toFixed(2));pts.appendChild(d)}
const sc=document.getElementById('s3sc'),cv=document.getElementById('s3cv');if(!sc||!cv)return;
const c=cv.getContext('2d');let W2,H2,dp;
function r(){W2=sc.offsetWidth;H2=sc.offsetHeight;dp=Math.min(devicePixelRatio||1,2);cv.width=W2*dp;cv.height=H2*dp;cv.style.width=W2+'px';cv.style.height=H2+'px';c.setTransform(dp,0,0,dp,0,0)}
r();addEventListener('resize',r);
function hx(h){const m=h.match(/\w\w/g);return m?m.map(x=>parseInt(x,16)):[0,0,0]}
function lc(a,b,t){const c1=hx(a),c2=hx(b);return[Math.round(c1[0]+(c2[0]-c1[0])*t),Math.round(c1[1]+(c2[1]-c1[1])*t),Math.round(c1[2]+(c2[2]-c1[2])*t)]}
function bz(p,t){const u=1-t;return{x:u*u*u*p[0].x+3*u*u*t*p[1].x+3*u*t*t*p[2].x+t*t*t*p[3].x,y:u*u*u*p[0].y+3*u*u*t*p[1].y+3*u*t*t*p[2].y+t*t*t*p[3].y}}
function dr(ctx,p,w,cols,al,ph){for(let i=0;i<200;i++){const t=i/200,t2=(i+1)/200,p1=bz(p,t),p2=bz(p,t2),ci=Math.floor(t*(cols.length-1)),ni=Math.min(ci+1,cols.length-1),rgb=lc(cols[ci],cols[ni],t*(cols.length-1)-ci),hl=Math.pow(Math.max(0,Math.sin(t*Math.PI*3+ph*1.5)),4)*.5,fr=[Math.min(255,rgb[0]+Math.round(hl*80)),Math.min(255,rgb[1]+Math.round(hl*80)),Math.min(255,rgb[2]+Math.round(hl*80))],ww=w*(.6+Math.sin(t*Math.PI)*.4);ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.strokeStyle='rgba('+fr[0]+','+fr[1]+','+fr[2]+','+(al+hl*.3)+')';ctx.lineWidth=ww;ctx.lineCap='round';ctx.stroke()}}
let t0=null;
function f(ts){if(!t0)t0=ts;const el=ts-t0,ph=el*.0008;c.clearRect(0,0,W2,H2);dr(c,[{x:W2*.82,y:H2*.2},{x:W2*.6,y:H2*.12},{x:W2*.3,y:H2*.35},{x:W2*.25,y:H2*.5}],5,['#1e3a5f','#312e81','#4c1d95','#3b0764'],.28,ph);dr(c,[{x:W2*.25,y:H2*.5},{x:W2*.4,y:H2*.62},{x:W2*.58,y:H2*.55},{x:W2*.5,y:H2*.78}],7,['#1e40af','#4338ca','#6d28d9','#7c3aed'],.32,ph*.85+1.2);dr(c,[{x:W2*.08,y:H2*.12},{x:W2*.28,y:H2*.04},{x:W2*.68,y:H2*.42},{x:W2*.88,y:H2*.82}],3,['#1e3a8a','#312e81','#3730a3','#1e3a8a'],.18,ph*.6+2);requestAnimationFrame(f)}
requestAnimationFrame(f);
})();

/* DASHBOARD COUNTERS */
(function(){
function cu(el,tg,sf,du){const isF=String(tg).indexOf('.')!==-1,s=performance.now();function tk(n){const p=Math.min(1,(n-s)/du),e=1-Math.pow(1-p,3),v=e*tg;el.textContent=(isF?v.toFixed(1):Math.floor(v).toLocaleString())+sf;if(p<1)requestAnimationFrame(tk)}requestAnimationFrame(tk)}
const ke=document.getElementById('dkpis');
if(ke){const ko=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.querySelectorAll('.dkpi').forEach((k,i)=>{setTimeout(()=>{k.classList.add('anim');const v=k.querySelector('.dkv');if(v)cu(v,parseFloat(v.dataset.to),v.dataset.suffix||'',1200)},i*180)});ko.unobserve(en.target)}})},{threshold:.25});ko.observe(ke)}
const lc=document.getElementById('dlc');
if(lc){const lo=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('anim');en.target.querySelectorAll('.dmd').forEach((d,i)=>{d.style.transitionDelay=(.6+i*.25)+'s'});lo.unobserve(en.target)}})},{threshold:.25});lo.observe(lc)}
const dc=document.getElementById('ddc');
if(dc){const dn=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('anim');const dv=document.getElementById('ddv');if(dv)cu(dv,5044,'',1400);const rb=document.getElementById('drb');if(rb)rb.classList.add('anim');dn.unobserve(en.target)}})},{threshold:.3});dn.observe(dc)}
const ap=document.getElementById('dap');
if(ap){const ao=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.querySelectorAll('.dar').forEach((r,i)=>setTimeout(()=>r.classList.add('show'),i*120));ao.unobserve(en.target)}})},{threshold:.2});ao.observe(ap)}
const bp=document.getElementById('dbap');
if(bp){const bo=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.querySelectorAll('.dcrf').forEach((f,i)=>setTimeout(()=>f.style.width=f.dataset.w,i*150));const pv=document.getElementById('dpv');if(pv){const ps=performance.now();function pt(n){const p=Math.min(1,(n-ps)/1400);pv.textContent='$'+(p*2.4*(1-Math.pow(1-p,3))/p||0).toFixed(1)+'M';if(p<1)requestAnimationFrame(pt)}requestAnimationFrame(pt)}bo.unobserve(en.target)}})},{threshold:.2});bo.observe(bp)}
})();

/* TRUSTED SCROLL PARALLAX — frames 110-220, ends at 60% viewport height */
(function(){
if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
gsap.registerPlugin(ScrollTrigger);
const fi=document.getElementById('sfr');if(!fi)return;
const sf=110,ef=213,rng=ef-sf;
const frames=[];
for(let i=1;i<=ef;i++){const img=new Image();img.src='Scroll_images/ezgif-frame-'+String(i).padStart(3,'0')+'.jpg';frames.push(img)}
fi.src='Scroll_images/ezgif-frame-'+String(sf).padStart(3,'0')+'.jpg';
ScrollTrigger.create({
trigger:'#svid',
start:'top bottom+=200',
end:'20% top',
  scrub:.35,
  onUpdate:function(self){
    const idx=Math.min(ef,Math.max(sf,sf+Math.floor(self.progress*rng)));
    const ai=idx-1;
    if(frames[ai]&&frames[ai].complete)fi.src=frames[ai].src;
  }
});
})();





const lightSections = document.querySelectorAll(".scene-light")

function updateNavProgress(){

 let prog = 0

 lightSections.forEach(section => {

  const rect = section.getBoundingClientRect()
  const vh = window.innerHeight

  const visible = Math.min(vh, rect.bottom) - Math.max(0, rect.top)

  if(visible > 0){
   const p = visible / vh
   prog = Math.max(prog, p)
  }

 })

 document.documentElement.style.setProperty("--bg-prog", prog)

}

window.addEventListener("scroll", updateNavProgress)
updateNavProgress()





const nav = document.getElementById("main-nav")

window.addEventListener("scroll", () => {
  if (window.location.pathname === "/features" || window.location.pathname === "/features/") {
    nav.classList.add("nav-dark");
    nav.classList.remove("nav-light");
    return;
  }

  if(window.scrollY > 450){
    nav.classList.add("nav-light")
    nav.classList.remove("nav-dark")
  }else{
    nav.classList.add("nav-dark")
    nav.classList.remove("nav-light")
  }
})




/* HERO METRIC COUNTER ANIMATION */
;(function () {
  const counters = document.querySelectorAll(".counter");
  const metricsSection = document.querySelector(".hero-metrics");

  if (!counters.length) return;

  let hasAnimated = false;

  function formatCounterValue(value, decimals, suffix) {
    let formatted;

    if (decimals > 0) {
      formatted = value.toFixed(decimals);
    } else {
      formatted = Math.round(value).toLocaleString("en-US");
    }

    return formatted + suffix;
  }

  function animateCounters() {
    if (hasAnimated) return;
    hasAnimated = true;

    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target || "0");
      const decimals = parseInt(counter.dataset.decimals || "0", 10);
      const suffix = counter.dataset.suffix || "";
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = target * easedProgress;

        counter.textContent = formatCounterValue(currentValue, decimals, suffix);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = formatCounterValue(target, decimals, suffix);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  if ("IntersectionObserver" in window && metricsSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(metricsSection);
  } else {
    animateCounters();
  }
})();



}
