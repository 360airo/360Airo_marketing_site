import React from "react";

// ═══════════════════════════════════════════════════════════════════════════════
//  LAYOUT CONSTANTS  (SVG viewport: 1540 × 520)
// ═══════════════════════════════════════════════════════════════════════════════

const LBL_X     = 108;
const MEETING_Y = 178;
const CODE_Y    = 252;
const SUPPORT_Y = 326;

// Relay / Segment box
const RL_CX = 738,  RL_CY = 252,  RL_SZ = 80;

// Slack box (now Leads)
const SLK_CX = 1252, SLK_CY = 252, SLK_SZ = 80;

// OpenAI / ChatGPT box (now Pipedrive)
const GPT_CX = 1404, GPT_CY = 252, GPT_SZ = 64;

// Notion box (now LinkedIn)
const NTN_CX = 1078, NTN_CY = 118, NTN_SZ = 72;

// Linear / sphere box (now SMS)
const LIN_CX = 1078, LIN_CY = 384, LIN_SZ = 72;

// Wire base colour (light grey for light theme)
const WIRE_COLOR = "#cbd5e1";

// Pulse colours per input row
const RED   = "#e53935";
const BLUE  = "#1e88e5";
const AMBER = "#ffa000";

// ═══════════════════════════════════════════════════════════════════════════════
//  WIRE PATH BUILDERS
//  Each wire connects to a DIFFERENT point on the left face of the Segment box.
// ═══════════════════════════════════════════════════════════════════════════════

const MEET_RIGHT = LBL_X + 110;
const CODE_RIGHT = LBL_X + 140;
const SUPP_RIGHT = LBL_X + 130;

const RL_LEFT = RL_CX - RL_SZ / 2;
const RL_RIGHT = RL_CX + RL_SZ / 2;

// Connection points on the left face of the relay box (3 separate heights)
const MEET_CONN_Y = RL_CY - 18;  // upper third
const SUPP_CONN_Y = RL_CY + 18;  // lower third

// Relay right-face centre → Slack left-face centre
const RL_OUT_Y = RL_CY;
const SLK_LEFT = SLK_CX - SLK_SZ / 2;
const SLK_RIGHT = SLK_CX + SLK_SZ / 2;

// Slack top-face → Notion right-face
const NTN_RIGHT = NTN_CX + NTN_SZ / 2;

// Slack bottom-face → Linear right-face
const LIN_RIGHT = LIN_CX + LIN_SZ / 2;

// Slack → GPT
const GPT_LEFT = GPT_CX - GPT_SZ / 2;

interface Wire {
  id: string;
  d: string;
  pulseColor: string;
  delay: number;
  dur: number;
}

const wires: Wire[] = [
  // ── Meeting (Prospect) → Relay top-face ──
  {
    id: "meet",
    d: `M ${MEET_RIGHT} ${MEETING_Y} L ${RL_CX} ${MEETING_Y} L ${RL_CX} ${RL_CY - RL_SZ / 2}`,
    pulseColor: RED,
    delay: 0,
    dur: 2.2,
  },
  // ── Code (Personalization) → Relay left-face centre point ──
  {
    id: "code",
    d: `M ${CODE_RIGHT} ${CODE_Y} L ${RL_LEFT - 1} ${CODE_Y}`,
    pulseColor: BLUE,
    delay: 0,
    dur: 1.8,
  },
  // ── Support (Follow ups) → Relay bottom-face ──
  {
    id: "supp",
    d: `M ${SUPP_RIGHT} ${SUPPORT_Y} L ${RL_CX} ${SUPPORT_Y} L ${RL_CX} ${RL_CY + RL_SZ / 2}`,
    pulseColor: AMBER,
    delay: 0,
    dur: 2.3,
  },
  // ── Relay right-face centre → Slack left-face centre ──
  {
    id: "rl-slk",
    d: `M ${RL_RIGHT} ${RL_OUT_Y} L ${SLK_LEFT} ${SLK_CY}`,
    pulseColor: BLUE,
    delay: 1.4,
    dur: 1.6,
  },
  // ── Slack right-face → GPT left-face ──
  {
    id: "slk-gpt",
    d: `M ${SLK_RIGHT} ${SLK_CY} L ${GPT_LEFT} ${GPT_CY}`,
    pulseColor: BLUE,
    delay: 2.2,
    dur: 1.3,
  },
  // ── Slack top-face → Notion right-face ──
  {
    id: "slk-ntn",
    d: `M ${SLK_CX} ${SLK_CY - SLK_SZ/2} L ${SLK_CX} ${NTN_CY} L ${NTN_RIGHT} ${NTN_CY}`,
    pulseColor: "#94a3b8",
    delay: 1.6,
    dur: 2.2,
  },
  // ─ Slack bottom-face → Linear right-face ──
  {
    id: "slk-lin",
    d: `M ${SLK_CX} ${SLK_CY + SLK_SZ/2} L ${SLK_CX} ${LIN_CY} L ${LIN_RIGHT} ${LIN_CY}`,
    pulseColor: "#94a3b8",
    delay: 1.8,
    dur: 2.2,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function WorkflowDiagram() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 1540 520"
        width="100%"
        height="100%"
        style={{ display: "block", maxWidth: "100%", maxHeight: "100%" }}
      >
        <defs>
          {/* Light Dot grid */}
          <pattern id="dg" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.72" fill="#e2e8f0" />
          </pattern>

          {/* Glow for pulse head */}
          <filter id="gA" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Wide glow for halo */}
          <filter id="gB" x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Hidden motion paths */}
          {wires.map((w) => (
            <path key={w.id + "-p"} id={w.id + "-p"} d={w.d} fill="none" stroke="none" />
          ))}

          {/* Apple-style conic rainbow gradient for Segment box border */}
          <linearGradient id="rainbow-top" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007aff" />
            <stop offset="100%" stopColor="#ff3b30" />
          </linearGradient>
          <linearGradient id="rainbow-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3b30" />
            <stop offset="100%" stopColor="#ff9500" />
          </linearGradient>
          <linearGradient id="rainbow-bottom" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff9500" />
            <stop offset="100%" stopColor="#34c759" />
          </linearGradient>
          <linearGradient id="rainbow-left" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#34c759" />
            <stop offset="100%" stopColor="#007aff" />
          </linearGradient>

          {/* Magical radial glow behind Airo Center */}
          <radialGradient id="airo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background - Transparent to let parent radial splash show through */}
        <rect width="1540" height="520" fill="transparent" />
        <rect width="1540" height="520" fill="url(#dg)" />

        {/* Soft background blue glow behind Airo box */}
        <circle cx={RL_CX} cy={RL_CY} r="180" fill="url(#airo-glow)" />

        {/* Vertical separator dashed lines */}
        <line x1="450" y1="5" x2="450" y2="440" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="950" y1="5" x2="950" y2="440" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

        {/* Column 1: Client Criteria */}
        <text x={LBL_X} y="16" fill="#0f172a" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.08em">CLIENT CONCERNS</text>
        <text x={LBL_X} y="34" fill="#64748b" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="400">Outbound Needs</text>

        {/* Column 2: Airo Solver */}
        <text x={RL_CX} y="16" textAnchor="middle" fill="#0f172a" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.08em">AIRO ENGINE</text>
        <text x={RL_CX} y="34" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="400">Autonomous Problem Solver</text>

        {/* Column 3: Automated Actions */}
        <text x={NTN_CX} y="16" fill="#0f172a" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="0.08em">AUTOMATED ACTIONS</text>
        <text x={NTN_CX} y="34" fill="#64748b" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="400">Multichannel Deliverables</text>

        {/* ── GREY BASE WIRES ── */}
        {wires.map((w) => (
          <path
            key={w.id + "-base"}
            d={w.d}
            fill="none"
            stroke={WIRE_COLOR}
            strokeWidth="1.8"
            strokeOpacity="0.7"
          />
        ))}

        {/* ─ Animated light pulses ── */}
        {wires.map((w) => (
          <Pulse key={w.id} wire={w} />
        ))}

        {/* ── Left inputs ── */}
        <InputBox x={LBL_X} y={MEETING_Y} label="Prospect" width={110} icon="prospect" />
        <InputBox x={LBL_X} y={CODE_Y}    label="Personalization"      width={140} icon="personalization" />
        <InputBox x={LBL_X} y={SUPPORT_Y} label="Follow ups"   width={130} icon="followups" />

        {/* ── Relay / Segment box with Apple rainbow border (Airo Center) ── */}
        <SegmentBoxRainbow cx={RL_CX} cy={RL_CY} sz={RL_SZ} />

        {/* ── Leads (Database icon) ── */}
        <DarkBox cx={SLK_CX} cy={SLK_CY} sz={SLK_SZ}>
          <LeadsIcon cx={SLK_CX} cy={SLK_CY} />
        </DarkBox>

        {/* ── Pipedrive CRM (Filter funnel icon) ── */}
        <DarkBox cx={GPT_CX} cy={GPT_CY} sz={GPT_SZ}>
          <PipedriveIcon cx={GPT_CX} cy={GPT_CY} />
        </DarkBox>

        {/* ── LinkedIn (Official icon) ── */}
        <DarkBox cx={NTN_CX} cy={NTN_CY} sz={NTN_SZ}>
          <LinkedInIcon cx={NTN_CX} cy={NTN_CY} />
        </DarkBox>

        {/* ── SMS (Message bubble icon) ── */}
        <DarkBox cx={LIN_CX} cy={LIN_CY} sz={LIN_SZ}>
          <SMSIcon cx={LIN_CX} cy={LIN_CY} />
        </DarkBox>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SEQUENTIAL PULSE
// ═══════════════════════════════════════════════════════════════════════════════
function Pulse({ wire }: { wire: Wire }) {
  const dur = `${wire.dur}s`;
  const begin = `${wire.delay}s`;
  const pulseDur = `${wire.dur * 0.35}s`;
  const cycle = `${wire.dur * 2}s`;
  const travelEnd = "0.5";

  return (
    <g>
      {/* core dot */}
      <circle fill={wire.pulseColor} filter="url(#gA)">
        <animateMotion dur={dur} repeatCount="indefinite" begin={begin} calcMode="linear">
          <mpath href={`#${wire.id}-p`} />
        </animateMotion>
        <animate attributeName="r"
          values="2;5;2"
          dur={pulseDur}
          repeatCount="indefinite"
          begin={begin}
          calcMode="spline"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          keyTimes="0;0.5;1"
        />
        <animate attributeName="opacity"
          values="0;1;1;0;0"
          dur={cycle}
          repeatCount="indefinite"
          begin={begin}
          keyTimes={`0;0.03;${travelEnd};${travelEnd};1`}
        />
      </circle>

      {/* wide halo */}
      <circle fill={wire.pulseColor} filter="url(#gB)">
        <animateMotion dur={dur} repeatCount="indefinite" begin={begin} calcMode="linear">
          <mpath href={`#${wire.id}-p`} />
        </animateMotion>
        <animate attributeName="r"
          values="5;12;5"
          dur={pulseDur}
          repeatCount="indefinite"
          begin={begin}
          calcMode="spline"
          keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          keyTimes="0;0.5;1"
        />
        <animate attributeName="opacity"
          values="0;0.18;0.18;0;0"
          dur={cycle}
          repeatCount="indefinite"
          begin={begin}
          keyTimes={`0;0.03;${travelEnd};${travelEnd};1`}
        />
      </circle>
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  UI BUILDING BLOCKS
// ═══════════════════════════════════════════════════════════════════════════════

function InputBox({
  x, y, label, width, icon,
}: { x: number; y: number; label: string; width: number; icon: string }) {
  const h = 30;
  return (
    <g>
      <rect x={x} y={y - h/2} width={width} height={h} rx="6"
        fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <g transform={`translate(${x + 10},${y - 8})`}>
        {icon === "prospect"       && <ProspectIcon />}
        {icon === "personalization" && <PersonalizationIcon />}
        {icon === "followups"       && <FollowUpsIcon />}
      </g>
      <text x={x + 30} y={y + 5}
        fill="#334155" fontSize="13" fontFamily="Inter,sans-serif"
        fontWeight="500" letterSpacing="0.01em">
        {label}
      </text>
    </g>
  );
}

function DarkBox({
  cx, cy, sz, children,
}: { cx: number; cy: number; sz: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x={cx - sz/2} y={cy - sz/2} width={sz} height={sz} rx="13"
        fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {children}
    </g>
  );
}

// ── Center Box with Apple-style rainbow border containing the 360Airo Logo ─────
function SegmentBoxRainbow({ cx, cy, sz }: { cx: number; cy: number; sz: number }) {
  const half = sz / 2;
  const r = 14;          // corner radius
  const sw = 2;          // stroke width of the rainbow border
  const inner = half - sw; // inset for inner dark rect

  return (
    <g>
      {/* Inner face - White */}
      <rect
        x={cx - inner}
        y={cy - inner}
        width={inner * 2}
        height={inner * 2}
        rx={r}
        fill="#ffffff"
      />

      {/* Rainbow border built from 4 arcs */}
      {/* Top edge */}
      <path
        d={`M ${cx - half + r} ${cy - half}
            L ${cx + half - r} ${cy - half}
            A ${r} ${r} 0 0 1 ${cx + half} ${cy - half + r}`}
        fill="none"
        stroke="url(#rainbow-top)"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Right edge */}
      <path
        d={`M ${cx + half} ${cy - half + r}
            L ${cx + half} ${cy + half - r}
            A ${r} ${r} 0 0 1 ${cx + half - r} ${cy + half}`}
        fill="none"
        stroke="url(#rainbow-right)"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Bottom edge */}
      <path
        d={`M ${cx + half - r} ${cy + half}
            L ${cx - half + r} ${cy + half}
            A ${r} ${r} 0 0 1 ${cx - half} ${cy + half - r}`}
        fill="none"
        stroke="url(#rainbow-bottom)"
        strokeWidth={sw}
        strokeLinecap="round"
      />
      {/* Left edge */}
      <path
        d={`M ${cx - half} ${cy + half - r}
            L ${cx - half} ${cy - half + r}
            A ${r} ${r} 0 0 1 ${cx - half + r} ${cy - half}`}
        fill="none"
        stroke="url(#rainbow-left)"
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* 360Airo Logo in the Center */}
      <image href="/logo-icon.png" x={cx - 20} y={cy - 20} width={40} height={40} />
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HIGH-QUALITY VECTOR MONOCHROME ICONS (Alternative to lucide-react)
// ═══════════════════════════════════════════════════════════════════════════════

function LinkedInIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 12}, ${cy - 12})`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </g>
  );
}

function SMSIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 12}, ${cy - 12})`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </g>
  );
}

function LeadsIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 12}, ${cy - 12})`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    </g>
  );
}

function PipedriveIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 12}, ${cy - 12})`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SALES & OUTREACH THEMED INPUT ICONS (High-quality SVG paths)
// ═══════════════════════════════════════════════════════════════════════════════

function ProspectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PersonalizationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function FollowUpsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
