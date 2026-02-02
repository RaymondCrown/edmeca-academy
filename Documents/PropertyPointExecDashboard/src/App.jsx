import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  Legend,
} from "recharts";

// Built-in CSV parser (no external dependencies)
function parseCSVText(text) {
  const lines = text.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) {
    return { data: [], errors: [{ message: "Need at least a header row and one data row." }] };
  }
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));
  const data = [];
  const errors = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
    if (vals.length !== headers.length) {
      errors.push({
        message: `Row ${i}: expected ${headers.length} columns, got ${vals.length}`,
        severity: "warning",
      });
    }
    const row = {};
    headers.forEach((h, j) => {
      const v = vals[j] || "";
      const num = parseFloat(v);
      row[h] = !isNaN(num) && v !== "" ? num : v;
    });
    data.push(row);
  }
  return { data, errors };
}

// ============================================
// DESIGN SYSTEM
// ============================================
const COLORS = {
  navy: "#0A1628",
  darkBlue: "#0F2440",
  midBlue: "#1A3A5C",
  accent: "#0EA5E9",
  accentLight: "#38BDF8",
  gold: "#F59E0B",
  goldLight: "#FBBF24",
  green: "#10B981",
  greenLight: "#34D399",
  coral: "#F43F5E",
  coralLight: "#FB7185",
  purple: "#8B5CF6",
  purpleLight: "#A78BFA",
  slate: "#94A3B8",
  slateLight: "#CBD5E1",
  white: "#F8FAFC",
  cardBg: "rgba(15, 36, 64, 0.7)",
  cardBorder: "rgba(56, 189, 248, 0.12)",
  amber: "#F59E0B",
  red: "#EF4444",
};

const STAKEHOLDERS = {
  executive: { label: "Executive / Board", icon: "🏛️", color: COLORS.gold },
  corporate: { label: "Corporate Clients", icon: "🏢", color: COLORS.accent },
  programme: { label: "Programme Teams", icon: "👥", color: COLORS.green },
  funder: { label: "Funders / DFIs", icon: "💰", color: COLORS.purple },
  sme: { label: "SME Beneficiaries", icon: "🚀", color: COLORS.coral },
};

const PROVINCE_COLORS = {
  Gauteng: COLORS.accent,
  "Western Cape": COLORS.green,
  "KwaZulu-Natal": COLORS.gold,
  "Eastern Cape": COLORS.coral,
  Limpopo: COLORS.purple,
};

// Programme Managers from organogram
const PROGRAMME_MANAGERS = [
  { id: "cf", name: "Carmine Fritz", role: "Senior Programme Manager", division: "ESD" },
  { id: "bk", name: "Bradley Kodi", role: "Senior Programme Manager", division: "ESD" },
  { id: "mm", name: "Mmapula Mangena", role: "Programme Manager", division: "ESD" },
  { id: "hs", name: "Hannes Steyn", role: "Senior Programme Manager", division: "ESD" },
  { id: "lv", name: "Leonard Visagie", role: "Programme Manager", division: "ESD" },
  { id: "nn", name: "Nelson Ndimande", role: "Programme and LED Manager", division: "LED" },
  { id: "ng", name: "Ntsako Ngomana", role: "Head of LED & Stakeholder Management", division: "LED" },
];

const MER_REVIEWERS = [
  { id: "tm", name: "Thulisile Mahlangu", role: "Monitoring and Evaluation Analyst" },
  { id: "ln", name: "Letlhogonolo Ntsodololwana", role: "Monitoring and Evaluation Senior Analyst" },
  { id: "ms", name: "Maphefo Sipula", role: "Head of Research and Impact" },
];

const REPORT_TYPES = [
  {
    id: "esd_quarterly",
    label: "ESD Quarterly Report",
    fields: [
      "smesSupported",
      "revenueGenerated",
      "contractsSecured",
      "jobsCreated",
      "jobsSustained",
      "womenOwned",
      "youthOwned",
      "disabilityOwned",
      "intake",
      "graduated",
      "active",
    ],
  },
  {
    id: "led_quarterly",
    label: "LED Quarterly Report",
    fields: ["ledJobs", "ledSMMEs", "ledInvestment", "communityProjects", "localLabour"],
  },
  {
    id: "provincial",
    label: "Provincial Update",
    fields: ["province", "esdSMEs", "ledJobs", "ledSMMEs", "ledInvestment", "womenOwned", "youthOwned", "sectors"],
  },
  { id: "funding", label: "Funding Pipeline Update", fields: ["source", "secured", "pipeline", "newPartners"] },
  {
    id: "strategy",
    label: "Strategy Initiative Update",
    fields: ["initiative", "complete", "inProgress", "notStarted", "notes"],
  },
  { id: "media", label: "Media & Communications", fields: ["placements", "reach", "events", "applications"] },
];

const QUARTERS = ["Q1 (Jul-Sep)", "Q2 (Oct-Dec)", "Q3 (Jan-Mar)", "Q4 (Apr-Jun)"];
const FISCAL_YEARS = ["FY2023/24", "FY2024/25", "FY2025/26", "FY2026/27"];

// ============================================
// BASELINE DATA (FY2024/25 Impact Report)
// ============================================
const BASELINE_DATA = {
  impactKPIs: {
    smesSupported: { value: 106, target: 200, label: "SMEs Supported", unit: "" },
    revenueGenerated: { value: 204, target: 350, label: "SME Revenue Generated", unit: "R M" },
    contractsSecured: { value: 130, target: 250, label: "Contracts Secured", unit: "R M" },
    jobsCreated: { value: 1121, target: 1500, label: "Jobs Created / Sustained", unit: "" },
    communityInvestment: { value: 182.9, target: 250, label: "LED Community Investment", unit: "R M" },
    smmeOpportunities: { value: 145, target: 200, label: "SMME Opportunities", unit: "" },
    mediaReach: { value: 47.5, target: 50, label: "Media Reach", unit: "M people" },
    mediaPlacements: { value: 315, target: 350, label: "Media Placements", unit: "" },
  },
  revenueTimeline: [
    { quarter: "Q1 FY24", esd: 38, led: 32, total: 70 },
    { quarter: "Q2 FY24", esd: 52, led: 45, total: 97 },
    { quarter: "Q3 FY24", esd: 48, led: 50, total: 98 },
    { quarter: "Q4 FY24", esd: 66, led: 55.9, total: 121.9 },
  ],
  demographicData: [
    { name: "Women-owned", value: 57, color: COLORS.coral },
    { name: "Youth-owned", value: 24, color: COLORS.accent },
    { name: "Disability-owned", value: 1, color: COLORS.gold },
    { name: "Other", value: 18, color: COLORS.slate },
  ],
  strategicPillars: [
    { pillar: "Enterprise Dev", score: 78, target: 85 },
    { pillar: "Local Economic Dev", score: 82, target: 90 },
    { pillar: "Women & Youth", score: 71, target: 80 },
    { pillar: "Green Economy", score: 55, target: 75 },
    { pillar: "Decent Work", score: 68, target: 80 },
    { pillar: "Township Economy", score: 63, target: 75 },
    { pillar: "Policy & Advocacy", score: 85, target: 90 },
  ],
  strategyInitiatives: [
    { name: "Expand into new industries", total: 12, complete: 7, inProgress: 3 },
    { name: "Engage & manage stakeholders", total: 10, complete: 6, inProgress: 2 },
    { name: "Enable through technology", total: 8, complete: 3, inProgress: 4 },
    { name: "Extend our impact", total: 11, complete: 5, inProgress: 4 },
    { name: "Establish market position", total: 7, complete: 4, inProgress: 2 },
    { name: "Empower internal maturity", total: 14, complete: 8, inProgress: 3 },
  ],
  fundingPipeline: [
    { source: "Corporate Partners", secured: 28, pipeline: 15, target: 50 },
    { source: "DFI Partners", secured: 12, pipeline: 8, target: 25 },
    { source: "Government", secured: 5, pipeline: 10, target: 20 },
    { source: "International", secured: 3, pipeline: 7, target: 15 },
  ],
  programmeData: [
    { month: "Jul", intake: 12, graduated: 0, active: 92 },
    { month: "Aug", intake: 8, graduated: 3, active: 97 },
    { month: "Sep", intake: 5, graduated: 5, active: 97 },
    { month: "Oct", intake: 10, graduated: 4, active: 103 },
    { month: "Nov", intake: 6, graduated: 2, active: 107 },
    { month: "Dec", intake: 3, graduated: 8, active: 102 },
    { month: "Jan", intake: 15, graduated: 6, active: 111 },
    { month: "Feb", intake: 4, graduated: 3, active: 112 },
    { month: "Mar", intake: 7, graduated: 10, active: 109 },
    { month: "Apr", intake: 3, graduated: 5, active: 107 },
    { month: "May", intake: 2, graduated: 4, active: 105 },
    { month: "Jun", intake: 1, graduated: 0, active: 106 },
  ],
  provincialDetail: {
    Gauteng: {
      abbr: "GP",
      esdSMEs: 88,
      ledJobs: 420,
      ledSMMEs: 52,
      ledInvestment: 68,
      womenOwned: 54,
      youthOwned: 22,
      sectors: [
        { name: "Services", value: 40, color: COLORS.accent },
        { name: "Construction", value: 22, color: COLORS.gold },
        { name: "Gen. Const. & Maint.", value: 14, color: COLORS.green },
        { name: "Manufacturing", value: 6, color: COLORS.coral },
        { name: "Professional Svcs", value: 6, color: COLORS.purple },
      ],
      keyProjects: [
        {
          name: "Kagiso Township Hub",
          type: "Township Economy",
          status: "Active",
          description: "Enterprise support and procurement in the township economy.",
        },
        {
          name: "All-Women Cohort",
          type: "Women Empowerment",
          status: "Active",
          description: "Accelerating women-owned and youth-led enterprises.",
        },
        {
          name: "ILO Decent Work Programme",
          type: "Decent Work",
          status: "Active",
          description: "Embedding international labour standards across 25 SMEs.",
        },
        {
          name: "Greenpreneur Programme",
          type: "Green Economy",
          status: "Active",
          description: "Green economy training and the Green Seeds Competition.",
        },
      ],
      quarterlyTrend: [
        { q: "Q1", jobs: 95, investment: 14 },
        { q: "Q2", jobs: 110, investment: 18 },
        { q: "Q3", jobs: 105, investment: 17 },
        { q: "Q4", jobs: 110, investment: 19 },
      ],
    },
    "Western Cape": {
      abbr: "WC",
      esdSMEs: 12,
      ledJobs: 280,
      ledSMMEs: 38,
      ledInvestment: 45,
      womenOwned: 67,
      youthOwned: 33,
      sectors: [
        { name: "Food & Beverages", value: 35, color: COLORS.gold },
        { name: "Services", value: 30, color: COLORS.accent },
        { name: "Manufacturing", value: 20, color: COLORS.coral },
        { name: "Professional Svcs", value: 15, color: COLORS.purple },
      ],
      keyProjects: [
        {
          name: "Makers Landing Incubator",
          type: "Food Enterprise",
          status: "Graduated 8",
          description: "Eight food entrepreneurs graduated at V&A Waterfront.",
        },
        {
          name: "ESD — W. Cape Cohort",
          type: "Enterprise Dev",
          status: "Active",
          description: "Two-year ESD programme for 12 Western Cape SMEs.",
        },
      ],
      quarterlyTrend: [
        { q: "Q1", jobs: 58, investment: 9 },
        { q: "Q2", jobs: 72, investment: 12 },
        { q: "Q3", jobs: 78, investment: 12.5 },
        { q: "Q4", jobs: 72, investment: 11.5 },
      ],
    },
    "KwaZulu-Natal": {
      abbr: "KZN",
      esdSMEs: 9,
      ledJobs: 195,
      ledSMMEs: 28,
      ledInvestment: 35,
      womenOwned: 55,
      youthOwned: 28,
      sectors: [
        { name: "Construction", value: 38, color: COLORS.gold },
        { name: "Gen. Const. & Maint.", value: 25, color: COLORS.green },
        { name: "Services", value: 22, color: COLORS.accent },
        { name: "Manufacturing", value: 15, color: COLORS.coral },
      ],
      keyProjects: [
        {
          name: "Howard College Construction Project",
          type: "Pre-Incubation",
          status: "Launched",
          description: "Pre-incubation for construction SMEs in Howard College corridor.",
        },
        {
          name: "LED — KZN Community Programme",
          type: "LED",
          status: "Active",
          description: "Local SMME and labour opportunities in KZN communities.",
        },
      ],
      quarterlyTrend: [
        { q: "Q1", jobs: 38, investment: 6.5 },
        { q: "Q2", jobs: 52, investment: 9 },
        { q: "Q3", jobs: 55, investment: 10 },
        { q: "Q4", jobs: 50, investment: 9.5 },
      ],
    },
    "Eastern Cape": {
      abbr: "EC",
      esdSMEs: 4,
      ledJobs: 112,
      ledSMMEs: 16,
      ledInvestment: 20,
      womenOwned: 50,
      youthOwned: 31,
      sectors: [
        { name: "Construction", value: 44, color: COLORS.gold },
        { name: "Services", value: 31, color: COLORS.accent },
        { name: "Manufacturing", value: 25, color: COLORS.coral },
      ],
      keyProjects: [
        {
          name: "LED — Eastern Cape Programme",
          type: "LED",
          status: "Active",
          description: "Infrastructure-linked LED interventions.",
        },
      ],
      quarterlyTrend: [
        { q: "Q1", jobs: 22, investment: 4 },
        { q: "Q2", jobs: 28, investment: 5 },
        { q: "Q3", jobs: 32, investment: 5.5 },
        { q: "Q4", jobs: 30, investment: 5.5 },
      ],
    },
    Limpopo: {
      abbr: "LP",
      esdSMEs: 2,
      ledJobs: 75,
      ledSMMEs: 11,
      ledInvestment: 14.9,
      womenOwned: 45,
      youthOwned: 36,
      sectors: [
        { name: "Construction", value: 50, color: COLORS.gold },
        { name: "Services", value: 30, color: COLORS.accent },
        { name: "Gen. Const. & Maint.", value: 20, color: COLORS.green },
      ],
      keyProjects: [
        {
          name: "LED — Limpopo Programme",
          type: "LED",
          status: "Active",
          description: "SMME integration into rural/peri-urban infrastructure.",
        },
      ],
      quarterlyTrend: [
        { q: "Q1", jobs: 15, investment: 3 },
        { q: "Q2", jobs: 18, investment: 3.5 },
        { q: "Q3", jobs: 22, investment: 4.2 },
        { q: "Q4", jobs: 20, investment: 4.2 },
      ],
    },
  },
  bbbeeLevels: [
    { year: "FY21", level: 1 },
    { year: "FY22", level: 1 },
    { year: "FY23", level: 1 },
    { year: "FY24", level: 1 },
    { year: "FY25", level: 1 },
  ],
  nationalSectorData: [
    { name: "Services", value: 44, color: COLORS.accent },
    { name: "Construction", value: 21, color: COLORS.gold },
    { name: "Gen. Const. & Maint.", value: 15, color: COLORS.green },
    { name: "Manufacturing", value: 8, color: COLORS.coral },
    { name: "Food & Beverages", value: 6, color: COLORS.purpleLight },
    { name: "Professional Svcs", value: 5, color: COLORS.purple },
  ],
};

// ============================================
// SHARED UI COMPONENTS
// ============================================
function AnimatedNumber({ value, suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.round(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value, duration]);
  return (
    <span>
      {typeof value === "number" && value % 1 !== 0 ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </span>
  );
}

function ProgressRing({ value, max, size = 80, strokeWidth = 6, color = COLORS.accent }) {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(148,163,184,0.15)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={COLORS.white}
        fontSize={size * 0.2}
        fontWeight="700"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

function KPICard({ label, value, target, unit, delta }) {
  const pct = Math.round((value / target) * 100);
  const barColor = pct >= 80 ? COLORS.green : pct >= 50 ? COLORS.gold : COLORS.coral;
  return (
    <div
      style={{
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: COLORS.slate,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.white, fontFamily: "'DM Sans', sans-serif" }}>
          {unit?.startsWith("R") && <span style={{ fontSize: 16, color: COLORS.slate, marginRight: 2 }}>R</span>}
          <AnimatedNumber value={value} />
          {unit === "R M" ? (
            <span style={{ fontSize: 14, color: COLORS.slate, marginLeft: 2 }}>M</span>
          ) : unit && !unit.startsWith("R") ? (
            <span style={{ fontSize: 14, color: COLORS.slate, marginLeft: 4 }}>{unit}</span>
          ) : null}
        </div>
        {delta != null && delta !== 0 && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: delta > 0 ? COLORS.green : COLORS.coral,
              background: delta > 0 ? `${COLORS.green}15` : `${COLORS.coral}15`,
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, height: 4, background: "rgba(148,163,184,0.15)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              width: `${Math.min(pct, 100)}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${barColor}, ${barColor}88)`,
              borderRadius: 2,
              transition: "width 1.2s ease",
            }}
          />
        </div>
        <span style={{ fontSize: 11, color: barColor, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ fontSize: 10, color: COLORS.slate }}>
        Target: {target}
        {unit === "R M" ? " R M" : unit ? ` ${unit}` : ""}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: COLORS.white,
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 12, color: COLORS.slate, margin: "4px 0 0", lineHeight: 1.4 }}>{subtitle}</p>}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MiniStat({ label, value, suffix = "", color = COLORS.white }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'DM Sans', sans-serif" }}>
        <AnimatedNumber value={value} />
        {suffix}
      </div>
      <div style={{ fontSize: 10, color: COLORS.slate, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function StakeholderSelector({ active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        onClick={() => onChange(null)}
        style={{
          padding: "8px 16px",
          borderRadius: 20,
          border: `1px solid ${!active ? COLORS.accent : COLORS.cardBorder}`,
          background: !active ? "rgba(14,165,233,0.15)" : "transparent",
          color: !active ? COLORS.accentLight : COLORS.slate,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        All Views
      </button>
      {Object.entries(STAKEHOLDERS).map(([key, s]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding: "8px 16px",
            borderRadius: 20,
            border: `1px solid ${active === key ? s.color : COLORS.cardBorder}`,
            background: active === key ? `${s.color}22` : "transparent",
            color: active === key ? s.color : COLORS.slate,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {s.icon} {s.label}
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg =
    {
      pending: { bg: `${COLORS.amber}18`, color: COLORS.amber, label: "Pending Review" },
      approved: { bg: `${COLORS.green}18`, color: COLORS.green, label: "Approved" },
      rejected: { bg: `${COLORS.red}18`, color: COLORS.red, label: "Rejected" },
      ingested: { bg: `${COLORS.accent}18`, color: COLORS.accent, label: "Ingested" },
      draft: { bg: `${COLORS.slate}18`, color: COLORS.slate, label: "Draft" },
    }[status] || { bg: `${COLORS.slate}18`, color: COLORS.slate, label: status };
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 20,
        background: cfg.bg,
        color: cfg.color,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {cfg.label}
    </span>
  );
}

// ============================================
// DASHBOARD SECTION COMPONENTS
// ============================================
function ImpactOverview({ data }) {
  return (
    <div>
      <SectionHeader
        title="Impact at a Glance — FY2024/25"
        subtitle="Key performance indicators across ESD and LED programmes. Data refreshed from latest approved quarterly reports."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {Object.entries(data.impactKPIs).map(([k, kpi]) => (
          <KPICard key={k} {...kpi} delta={data.deltas?.[k]} />
        ))}
      </div>
    </div>
  );
}

function RevenueChart({ data }) {
  return (
    <Card>
      <SectionHeader title="Revenue & Contract Trajectory" subtitle="Quarterly ESD and LED performance (R millions)" />
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data.revenueTimeline}>
          <defs>
            <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.4} />
              <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.green} stopOpacity={0.4} />
              <stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="quarter" tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
          <YAxis tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: COLORS.darkBlue,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: COLORS.white,
            }}
          />
          <Area type="monotone" dataKey="esd" stackId="1" stroke={COLORS.accent} fill="url(#gE)" name="ESD (R M)" />
          <Area type="monotone" dataKey="led" stackId="1" stroke={COLORS.green} fill="url(#gL)" name="LED (R M)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

function DemographicPie({ data }) {
  return (
    <Card>
      <SectionHeader
        title="SME Demographics"
        subtitle={`Ownership profile of ${data.impactKPIs.smesSupported.value} supported enterprises`}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie data={data.demographicData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
              {data.demographicData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: COLORS.darkBlue,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 10,
                fontSize: 12,
                color: COLORS.white,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.demographicData.map((d) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
              <span style={{ fontSize: 12, color: COLORS.slateLight }}>{d.name}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white, marginLeft: "auto" }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ProvincialBreakdown({ data }) {
  const compare = Object.entries(data.provincialDetail).map(([n, d]) => ({
    province: d.abbr,
    fullName: n,
    esdSMEs: d.esdSMEs,
    ledJobs: d.ledJobs,
    ledSMMEs: d.ledSMMEs,
    ledInvestment: d.ledInvestment,
  }));
  return (
    <Card>
      <SectionHeader title="Provincial Footprint" subtitle="LED impact across five provinces" />
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={compare} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="province" tick={{ fill: COLORS.slate, fontSize: 10 }} axisLine={false} />
          <YAxis tick={{ fill: COLORS.slate, fontSize: 10 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: COLORS.darkBlue,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: COLORS.white,
            }}
          />
          <Bar dataKey="ledJobs" fill={COLORS.accent} name="Jobs" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ledSMMEs" fill={COLORS.green} name="SMMEs" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ledInvestment" fill={COLORS.gold} name="Investment (R M)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function StrategicRadar({ data }) {
  return (
    <Card>
      <SectionHeader title="Strategic Pillar Performance" subtitle="Current achievement vs target across seven impact pillars" />
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data.strategicPillars} outerRadius={100}>
          <PolarGrid stroke="rgba(148,163,184,0.15)" />
          <PolarAngleAxis dataKey="pillar" tick={{ fill: COLORS.slate, fontSize: 9 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: COLORS.slate, fontSize: 9 }} />
          <Radar name="Current" dataKey="score" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.25} strokeWidth={2} />
          <Radar name="Target" dataKey="target" stroke={COLORS.gold} fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
          <Tooltip
            contentStyle={{
              background: COLORS.darkBlue,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: COLORS.white,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function StrategyProgress({ data }) {
  return (
    <Card>
      <SectionHeader title="Strategic Initiative Tracker" subtitle="Progress across 6 strategic priorities (64 total initiatives)" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.strategyInitiatives.map((s) => {
          const cP = Math.round((s.complete / s.total) * 100);
          const iP = Math.round((s.inProgress / s.total) * 100);
          return (
            <div key={s.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: COLORS.slateLight, fontWeight: 500 }}>{s.name}</span>
                <span style={{ fontSize: 11, color: COLORS.slate }}>{s.complete + s.inProgress}/{s.total}</span>
              </div>
              <div style={{ height: 8, background: "rgba(148,163,184,0.1)", borderRadius: 4, display: "flex", overflow: "hidden" }}>
                <div style={{ width: `${cP}%`, background: COLORS.green, transition: "width 0.8s ease" }} />
                <div style={{ width: `${iP}%`, background: COLORS.gold, transition: "width 0.8s ease" }} />
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
          {[
            ["Complete", COLORS.green],
            ["In Progress", COLORS.gold],
            ["Not Started", "rgba(148,163,184,0.15)"],
          ].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              <span style={{ fontSize: 10, color: COLORS.slate }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function FundingPipelineChart({ data }) {
  const totSec = data.fundingPipeline.reduce((a, b) => a + b.secured, 0);
  const totPip = data.fundingPipeline.reduce((a, b) => a + b.pipeline, 0);
  return (
    <Card>
      <SectionHeader title="Funding Pipeline & Sustainability" subtitle="Secured vs pipeline funding by source (R millions)" />
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data.fundingPipeline} layout="vertical" barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis type="number" tick={{ fill: COLORS.slate, fontSize: 10 }} axisLine={false} />
          <YAxis dataKey="source" type="category" tick={{ fill: COLORS.slate, fontSize: 10 }} width={110} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: COLORS.darkBlue,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: COLORS.white,
            }}
          />
          <Bar dataKey="secured" stackId="a" fill={COLORS.green} name="Secured (R M)" />
          <Bar dataKey="pipeline" stackId="a" fill={COLORS.accentLight} name="Pipeline (R M)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <div style={{ fontSize: 11, color: COLORS.slate }}>
          Secured: <span style={{ color: COLORS.green, fontWeight: 700 }}>R{totSec}M</span>
        </div>
        <div style={{ fontSize: 11, color: COLORS.slate }}>
          Pipeline: <span style={{ color: COLORS.accentLight, fontWeight: 700 }}>R{totPip}M</span>
        </div>
        <div style={{ fontSize: 11, color: COLORS.slate }}>
          Target: <span style={{ color: COLORS.gold, fontWeight: 700 }}>R50M+</span>
        </div>
      </div>
    </Card>
  );
}

function ProgrammeFlow({ data }) {
  return (
    <Card>
      <SectionHeader title="Programme Pipeline" subtitle="Monthly intake, graduation, and active beneficiary count" />
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data.programmeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="month" tick={{ fill: COLORS.slate, fontSize: 10 }} axisLine={false} />
          <YAxis tick={{ fill: COLORS.slate, fontSize: 10 }} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: COLORS.darkBlue,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 10,
              fontSize: 12,
              color: COLORS.white,
            }}
          />
          <Line type="monotone" dataKey="active" stroke={COLORS.accent} strokeWidth={2.5} dot={false} name="Active SMEs" />
          <Line type="monotone" dataKey="intake" stroke={COLORS.green} strokeWidth={1.5} dot={{ r: 2, fill: COLORS.green }} name="Intake" />
          <Line type="monotone" dataKey="graduated" stroke={COLORS.gold} strokeWidth={1.5} dot={{ r: 2, fill: COLORS.gold }} name="Graduated" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

function GovernancePanel() {
  const items = [
    { label: "B-BBEE Level", value: "Level 1", status: "green" },
    { label: "ISO 9001:2015", value: "Certified", status: "green" },
    { label: "OHS Certification", value: "Achieved", status: "green" },
    { label: "Board Members", value: "Active", status: "green" },
    { label: "CFO Appointment", value: "Completed", status: "green" },
    { label: "Whistle-blower System", value: "Operational", status: "green" },
    { label: "ESG & AI Policy", value: "In Development", status: "amber" },
    { label: "Wellness Strategy", value: "Launched", status: "green" },
  ];
  return (
    <Card>
      <SectionHeader title="Governance & Compliance" subtitle="Organisational health and compliance status" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(148,163,184,0.05)", borderRadius: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: item.status === "green" ? COLORS.green : COLORS.gold,
                boxShadow: `0 0 6px ${item.status === "green" ? COLORS.green : COLORS.gold}44`,
              }}
            />
            <div>
              <div style={{ fontSize: 11, color: COLORS.slate }}>{item.label}</div>
              <div style={{ fontSize: 13, color: COLORS.white, fontWeight: 600 }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TeamSnapshot() {
  return (
    <Card>
      <SectionHeader title="Our Team" subtitle="35 staff across Johannesburg, Cape Town, and Durban" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {[
          { v: 51, l: "Female", c: COLORS.coral },
          { v: 69, l: "African", c: COLORS.accent },
          { v: 100, l: "Age 26–55", c: COLORS.green },
        ].map((d) => (
          <div key={d.l} style={{ textAlign: "center" }}>
            <ProgressRing value={d.v} max={100} color={d.c} />
            <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 6 }}>{d.l}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ============================================
// PROVINCIAL VIEW (unchanged logic, data-driven)
// ============================================
function ProvincialView({ data }) {
  const [selected, setSelected] = useState(null);
  const provinces = Object.keys(data.provincialDetail);
  const compare = provinces.map((n) => ({ province: data.provincialDetail[n].abbr, fullName: n, ...data.provincialDetail[n] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            padding: "10px 20px",
            borderRadius: 12,
            border: `1px solid ${!selected ? COLORS.accent : COLORS.cardBorder}`,
            background: !selected ? "rgba(14,165,233,0.15)" : COLORS.cardBg,
            color: !selected ? COLORS.accentLight : COLORS.slate,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            backdropFilter: "blur(12px)",
          }}
        >
          🗺️ National Overview
        </button>
        {provinces.map((p) => (
          <button
            key={p}
            onClick={() => setSelected(p)}
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              border: `1px solid ${selected === p ? PROVINCE_COLORS[p] : COLORS.cardBorder}`,
              background: selected === p ? `${PROVINCE_COLORS[p]}18` : COLORS.cardBg,
              color: selected === p ? PROVINCE_COLORS[p] : COLORS.slate,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(12px)",
            }}
          >
            {data.provincialDetail[p].abbr} · {p}
          </button>
        ))}
      </div>
      {!selected ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {compare.map((d) => (
              <Card key={d.fullName} style={{ padding: 16, borderLeft: `3px solid ${PROVINCE_COLORS[d.fullName]}` }}>
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: PROVINCE_COLORS[d.fullName],
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {d.abbr} · {d.fullName}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    ["ESD SMEs", d.esdSMEs],
                    ["LED Jobs", d.ledJobs],
                    ["Investment", `R${d.ledInvestment}M`],
                    ["Women %", `${d.womenOwned}%`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: COLORS.slate }}>{l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.white }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card>
              <SectionHeader title="ESD Regional Distribution" subtitle="SME count by province" />
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={compare}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="province" tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: COLORS.darkBlue,
                      border: `1px solid ${COLORS.cardBorder}`,
                      borderRadius: 10,
                      fontSize: 12,
                      color: COLORS.white,
                    }}
                  />
                  <Bar dataKey="esdSMEs" name="ESD SMEs" radius={[6, 6, 0, 0]}>
                    {compare.map((d, i) => (
                      <Cell key={i} fill={PROVINCE_COLORS[d.fullName]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <SectionHeader title="National Sector Breakdown" subtitle="SME sector composition (%)" />
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <ResponsiveContainer width="55%" height={240}>
                  <PieChart>
                    <Pie data={data.nationalSectorData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                      {data.nationalSectorData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: COLORS.darkBlue,
                        border: `1px solid ${COLORS.cardBorder}`,
                        borderRadius: 10,
                        fontSize: 12,
                        color: COLORS.white,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data.nationalSectorData.map((d) => (
                    <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: COLORS.slateLight, whiteSpace: "nowrap" }}>{d.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, marginLeft: "auto" }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <Card>
            <SectionHeader title="LED Impact Comparison" subtitle="Jobs, SMME opportunities, and investment by province" />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={compare} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="province" tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: COLORS.darkBlue,
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: COLORS.white,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="ledJobs" fill={COLORS.accent} name="Jobs" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ledSMMEs" fill={COLORS.green} name="SMMEs" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ledInvestment" fill={COLORS.gold} name="Investment (R M)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ) : (
        <ProvinceDetail province={selected} data={data} />
      )}
    </div>
  );
}

function ProvinceDetail({ province, data }) {
  const d = data.provincialDetail[province];
  const color = PROVINCE_COLORS[province];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: `linear-gradient(135deg, ${color}18, ${color}08)`, border: `1px solid ${color}33`, borderRadius: 16, padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `${color}22`,
              border: `2px solid ${color}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.abbr}
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: COLORS.white, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{province}</h2>
            <p style={{ fontSize: 12, color: COLORS.slate, margin: "2px 0 0" }}>Provincial impact deep-dive — FY2024/25</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          <MiniStat label="ESD SMEs" value={d.esdSMEs} color={color} />
          <MiniStat label="LED Jobs" value={d.ledJobs} color={COLORS.accent} />
          <MiniStat label="LED SMMEs" value={d.ledSMMEs} color={COLORS.green} />
          <MiniStat label="Investment" value={d.ledInvestment} suffix="M" color={COLORS.gold} />
          <MiniStat label="Women %" value={d.womenOwned} suffix="%" color={COLORS.coral} />
          <MiniStat label="Youth %" value={d.youthOwned} suffix="%" color={COLORS.accentLight} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionHeader title={`${province} Sector Mix`} subtitle="SME distribution by sector" />
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={d.sectors} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {d.sectors.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: COLORS.darkBlue,
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 10,
                    fontSize: 12,
                    color: COLORS.white,
                  }}
                  formatter={(v) => `${v}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.sectors.map((s) => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: COLORS.slateLight }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.white, marginLeft: "auto" }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Quarterly Delivery Trend" subtitle="Jobs and investment (R M) per quarter" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={d.quarterlyTrend} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="q" tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: COLORS.slate, fontSize: 11 }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: COLORS.darkBlue,
                  border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: 10,
                  fontSize: 12,
                  color: COLORS.white,
                }}
              />
              <Bar dataKey="jobs" fill={color} name="Jobs" radius={[4, 4, 0, 0]} />
              <Bar dataKey="investment" fill={`${color}88`} name="Investment (R M)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <SectionHeader title="Key Projects & Programmes" subtitle={`Active interventions in ${province}`} />
        <div style={{ display: "grid", gridTemplateColumns: d.keyProjects.length > 2 ? "1fr 1fr" : "1fr", gap: 12 }}>
          {d.keyProjects.map((proj) => (
            <div
              key={proj.name}
              style={{
                background: "rgba(148,163,184,0.05)",
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 12,
                padding: 16,
                borderLeft: `3px solid ${color}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.white }}>{proj.name}</span>
                <span
                  style={{
                    fontSize: 10,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: proj.status === "Active" ? `${COLORS.green}22` : `${COLORS.accent}22`,
                    color: proj.status === "Active" ? COLORS.green : COLORS.accent,
                    fontWeight: 600,
                  }}
                >
                  {proj.status}
                </span>
              </div>
              <div style={{ fontSize: 10, color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{proj.type}</div>
              <p style={{ fontSize: 12, color: COLORS.slateLight, margin: 0, lineHeight: 1.5 }}>{proj.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================
// DATA MANAGEMENT — UPLOAD & INGESTION
// ============================================
function DataManagement({ dashboardData, setDashboardData, uploadLog, setUploadLog }) {
  const [subTab, setSubTab] = useState("upload");
  const subTabs = [
    { id: "upload", label: "📤 Upload Report", icon: "" },
    { id: "review", label: "📋 Review Queue", icon: "" },
    { id: "log", label: "📊 Ingestion Log", icon: "" },
    { id: "templates", label: "📄 Templates", icon: "" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              border: `1px solid ${subTab === t.id ? COLORS.accent : COLORS.cardBorder}`,
              background: subTab === t.id ? `${COLORS.accent}15` : "transparent",
              color: subTab === t.id ? COLORS.accentLight : COLORS.slate,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {subTab === "upload" && (
        <UploadPanel dashboardData={dashboardData} setDashboardData={setDashboardData} uploadLog={uploadLog} setUploadLog={setUploadLog} />
      )}
      {subTab === "review" && (
        <ReviewQueue uploadLog={uploadLog} setUploadLog={setUploadLog} dashboardData={dashboardData} setDashboardData={setDashboardData} />
      )}
      {subTab === "log" && <IngestionLog uploadLog={uploadLog} />}
      {subTab === "templates" && <TemplateDownloads />}
    </div>
  );
}

function UploadPanel({ setUploadLog }) {
  const [reportType, setReportType] = useState("");
  const [quarter, setQuarter] = useState("");
  const [fy, setFy] = useState("FY2025/26");
  const [submitter, setSubmitter] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [parseErrors, setParseErrors] = useState([]);
  const [uploadStep, setUploadStep] = useState("config");
  const [notes, setNotes] = useState("");
  const [inputMode, setInputMode] = useState(null); // "csv" or "manual"
  const [csvText, setCsvText] = useState("");
  const [manualFields, setManualFields] = useState({});

  const resetForm = () => {
    setReportType("");
    setQuarter("");
    setSubmitter("");
    setParsedData(null);
    setParseErrors([]);
    setUploadStep("config");
    setNotes("");
    setInputMode(null);
    setCsvText("");
    setManualFields({});
  };

  const handleCSVParse = () => {
    if (!csvText.trim()) {
      setParseErrors([{ message: "Please paste CSV data before parsing." }]);
      return;
    }
    const result = parseCSVText(csvText);
    const errors = [...result.errors];
    const rt = REPORT_TYPES.find((r) => r.id === reportType);
    if (result.data.length === 0) {
      errors.push({ message: "No data rows found." });
    }
    if (rt && result.data.length > 0) {
      const cols = Object.keys(result.data[0])
        .map((c) => c.trim().toLowerCase().replace(/\s+/g, ""));
      const missing = rt.fields.filter((f) => !cols.some((c) => c.includes(f.toLowerCase().replace(/\s+/g, ""))));
      if (missing.length > 0 && missing.length < rt.fields.length) {
        errors.push({ message: `Some expected columns may be missing: ${missing.join(", ")}`, severity: "warning" });
      }
    }
    setParseErrors(errors);
    setParsedData(result.data);
    if (result.data.length > 0) setUploadStep("preview");
  };

  const handleManualSubmit = () => {
    const rt = REPORT_TYPES.find((r) => r.id === reportType);
    if (!rt) return;
    const row = {};
    rt.fields.forEach((f) => {
      const v = manualFields[f] || "";
      const num = parseFloat(v);
      row[f] = !isNaN(num) && v !== "" ? num : v;
    });
    setParsedData([row]);
    setParseErrors([]);
    setUploadStep("preview");
  };

  const submitReport = () => {
    const entry = {
      id: `RPT-${Date.now()}`,
      type: reportType,
      typeLabel: REPORT_TYPES.find((r) => r.id === reportType)?.label || reportType,
      quarter,
      fiscalYear: fy,
      submittedBy: PROGRAMME_MANAGERS.find((p) => p.id === submitter)?.name || submitter,
      submittedAt: new Date().toISOString(),
      fileName: inputMode === "csv" ? "CSV Paste" : "Manual Entry",
      status: "pending",
      data: parsedData,
      notes,
      rowCount: parsedData?.length || 0,
      errorCount: parseErrors.filter((e) => e.severity !== "warning").length,
      warningCount: parseErrors.filter((e) => e.severity === "warning").length,
    };
    setUploadLog((prev) => [entry, ...prev]);
    setUploadStep("done");
  };

  const isConfigValid = reportType && quarter && submitter;
  const rt = REPORT_TYPES.find((r) => r.id === reportType);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Workflow Stepper */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {["Configure", "Enter Data", "Review & Submit", "Complete"].map((label, i) => {
          const stepIds = ["config", "input", "preview", "done"];
          const currentIdx = stepIds.indexOf(uploadStep);
          const isActive = i <= currentIdx;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isActive ? COLORS.accent : "rgba(148,163,184,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: isActive ? COLORS.white : COLORS.slate,
                    transition: "all 0.3s",
                  }}
                >
                  {i < currentIdx ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: isActive ? COLORS.white : COLORS.slate,
                    fontWeight: isActive ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < 3 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: isActive && i < currentIdx ? COLORS.accent : "rgba(148,163,184,0.15)",
                    margin: "0 12px",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Configuration */}
      {uploadStep === "config" && (
        <Card>
          <SectionHeader title="Configure Quarterly Report" subtitle="Select the report type, period, and submitter before entering data" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: COLORS.slate,
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.cardBorder}`,
                  background: COLORS.darkBlue,
                  color: COLORS.white,
                  fontSize: 13,
                }}
              >
                <option value="">Select report type...</option>
                {REPORT_TYPES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: COLORS.slate,
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Quarter & Fiscal Year
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <select
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${COLORS.cardBorder}`,
                    background: COLORS.darkBlue,
                    color: COLORS.white,
                    fontSize: 13,
                  }}
                >
                  <option value="">Quarter...</option>
                  {QUARTERS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <select
                  value={fy}
                  onChange={(e) => setFy(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${COLORS.cardBorder}`,
                    background: COLORS.darkBlue,
                    color: COLORS.white,
                    fontSize: 13,
                  }}
                >
                  {FISCAL_YEARS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  color: COLORS.slate,
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Submitted By
              </label>
              <select
                value={submitter}
                onChange={(e) => setSubmitter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.cardBorder}`,
                  background: COLORS.darkBlue,
                  color: COLORS.white,
                  fontSize: 13,
                }}
              >
                <option value="">Select programme manager...</option>
                {PROGRAMME_MANAGERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {reportType && (
            <div style={{ background: `${COLORS.accent}08`, border: `1px solid ${COLORS.accent}22`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: COLORS.accentLight, fontWeight: 600, marginBottom: 6 }}>
                Expected fields for {rt?.label}:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {rt?.fields.map((f) => (
                  <span
                    key={f}
                    style={{ fontSize: 10, padding: "3px 10px", borderRadius: 6, background: `${COLORS.accent}15`, color: COLORS.accent, fontFamily: "monospace" }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                if (isConfigValid) {
                  setInputMode("csv");
                  setUploadStep("input");
                }
              }}
              disabled={!isConfigValid}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: isConfigValid ? COLORS.accent : "rgba(148,163,184,0.15)",
                color: isConfigValid ? COLORS.white : COLORS.slate,
                fontSize: 13,
                fontWeight: 700,
                cursor: isConfigValid ? "pointer" : "not-allowed",
              }}
            >
              📋 Paste CSV Data →
            </button>
            <button
              onClick={() => {
                if (isConfigValid) {
                  setInputMode("manual");
                  setUploadStep("input");
                }
              }}
              disabled={!isConfigValid}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: `1px solid ${isConfigValid ? COLORS.cardBorder : "rgba(148,163,184,0.1)"}`,
                background: "transparent",
                color: isConfigValid ? COLORS.slateLight : COLORS.slate,
                fontSize: 13,
                fontWeight: 600,
                cursor: isConfigValid ? "pointer" : "not-allowed",
              }}
            >
              ✏️ Manual Entry →
            </button>
          </div>
        </Card>
      )}

      {/* Step 2: Data Input — CSV Paste */}
      {uploadStep === "input" && inputMode === "csv" && (
        <Card>
          <SectionHeader title="Paste CSV Data" subtitle={`${rt?.label} — ${quarter} ${fy}. Paste comma-separated data with a header row.`} />
          <div
            style={{
              background: `${COLORS.accent}06`,
              border: `1px solid ${COLORS.accent}18`,
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 12,
              fontSize: 11,
              color: COLORS.accentLight,
            }}
          >
            Example format:{" "}
            <code style={{ background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: 4 }}>{rt?.fields.join(",")}</code>
          </div>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            placeholder={`${rt?.fields.join(",")}\n${rt?.fields.map(() => "...").join(",")}`}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: `1px solid ${COLORS.cardBorder}`,
              background: COLORS.darkBlue,
              color: COLORS.white,
              fontSize: 12,
              fontFamily: "monospace",
              resize: "vertical",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
          />
          {parseErrors.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {parseErrors.map((e, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    color: e.severity === "warning" ? COLORS.amber : COLORS.coral,
                    padding: "4px 10px",
                    background: e.severity === "warning" ? `${COLORS.amber}12` : `${COLORS.coral}12`,
                    borderRadius: 6,
                    marginBottom: 3,
                  }}
                >
                  {e.severity === "warning" ? "⚠" : "✕"} {e.message}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
            <button
              onClick={handleCSVParse}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Parse & Preview →
            </button>
            <button
              onClick={() => {
                setUploadStep("config");
                setCsvText("");
                setParseErrors([]);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${COLORS.cardBorder}`,
                background: "transparent",
                color: COLORS.slate,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </Card>
      )}

      {/* Step 2: Data Input — Manual Entry */}
      {uploadStep === "input" && inputMode === "manual" && (
        <Card>
          <SectionHeader title="Manual Data Entry" subtitle={`${rt?.label} — ${quarter} ${fy}`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {rt?.fields.map((f) => (
              <div key={f}>
                <label
                  style={{
                    fontSize: 10,
                    color: COLORS.slate,
                    display: "block",
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {f.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  value={manualFields[f] || ""}
                  onChange={(e) => setManualFields((prev) => ({ ...prev, [f]: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: `1px solid ${COLORS.cardBorder}`,
                    background: COLORS.darkBlue,
                    color: COLORS.white,
                    fontSize: 12,
                    boxSizing: "border-box",
                  }}
                  placeholder={`Enter ${f}...`}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={handleManualSubmit}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: COLORS.accent,
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Preview Data →
            </button>
            <button
              onClick={() => {
                setUploadStep("config");
                setManualFields({});
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${COLORS.cardBorder}`,
                background: "transparent",
                color: COLORS.slate,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          </div>
        </Card>
      )}

      {/* Step 3: Data Preview & Submit */}
      {uploadStep === "preview" && parsedData && (
        <Card>
          <SectionHeader title="Data Preview & Validation" subtitle={`${parsedData.length} row(s) parsed — review before submitting for M&E approval`} />
          {parseErrors.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              {parseErrors.map((e, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 11,
                    color: e.severity === "warning" ? COLORS.amber : COLORS.coral,
                    padding: "6px 12px",
                    background: e.severity === "warning" ? `${COLORS.amber}12` : `${COLORS.coral}12`,
                    borderRadius: 8,
                    marginBottom: 4,
                  }}
                >
                  {e.severity === "warning" ? "⚠" : "✕"} {e.message}
                </div>
              ))}
            </div>
          )}
          <div style={{ overflowX: "auto", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {parsedData[0] &&
                    Object.keys(parsedData[0]).map((k) => (
                      <th
                        key={k}
                        style={{
                          textAlign: "left",
                          padding: "8px 10px",
                          borderBottom: `1px solid ${COLORS.cardBorder}`,
                          color: COLORS.accent,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          fontSize: 10,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {k}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 10).map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "rgba(148,163,184,0.03)" }}>
                    {Object.values(row).map((v, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "7px 10px",
                          borderBottom: `1px solid ${COLORS.cardBorder}`,
                          color: COLORS.slateLight,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {String(v != null ? v : "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {parsedData.length > 10 && <div style={{ fontSize: 11, color: COLORS.slate, padding: "8px 0", textAlign: "center" }}>Showing 10 of {parsedData.length} rows</div>}
          </div>
          <div>
            <label style={{ fontSize: 11, color: COLORS.slate, display: "block", marginBottom: 4 }}>Notes for M&E Reviewer</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${COLORS.cardBorder}`,
                background: COLORS.darkBlue,
                color: COLORS.white,
                fontSize: 12,
                resize: "vertical",
                boxSizing: "border-box",
              }}
              placeholder="Add context, data caveats, or special instructions for the M&E team..."
            />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button
              onClick={submitReport}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: COLORS.green,
                color: COLORS.white,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ✓ Submit for M&E Review
            </button>
            <button
              onClick={() => {
                setParsedData(null);
                setParseErrors([]);
                setUploadStep("input");
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${COLORS.cardBorder}`,
                background: "transparent",
                color: COLORS.slate,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ← Edit Data
            </button>
          </div>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {uploadStep === "done" && (
        <Card style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: COLORS.white, margin: "0 0 8px" }}>Report Submitted Successfully</h2>
          <p style={{ fontSize: 13, color: COLORS.slate, marginBottom: 4 }}>
            {rt?.label || reportType} — {quarter} {fy}
          </p>
          <p style={{ fontSize: 12, color: COLORS.slate, marginBottom: 24 }}>
            Submitted by {PROGRAMME_MANAGERS.find((p) => p.id === submitter)?.name}. The M&E team will review and approve before dashboard updates.
          </p>
          <button
            onClick={resetForm}
            style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: COLORS.accent, color: COLORS.white, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Upload Another Report
          </button>
        </Card>
      )}
    </div>
  );
}

function ReviewQueue({ uploadLog, setUploadLog, dashboardData, setDashboardData }) {
  const pending = uploadLog.filter((r) => r.status === "pending");
  const [selectedReviewer, setSelectedReviewer] = useState("");

  const handleAction = (id, action) => {
    setUploadLog((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = {
          ...r,
          status: action,
          reviewedAt: new Date().toISOString(),
          reviewedBy: MER_REVIEWERS.find((m) => m.id === selectedReviewer)?.name || "M&E Team",
        };
        if (action === "approved") {
          updated.status = "ingested";
          ingestData(r, dashboardData, setDashboardData);
        }
        return updated;
      })
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <SectionHeader title="M&E Review Queue" subtitle={`${pending.length} report(s) awaiting review and approval before dashboard ingestion`} />
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: COLORS.slate, marginRight: 8 }}>Reviewing as:</label>
          <select
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.cardBorder}`, background: COLORS.darkBlue, color: COLORS.white, fontSize: 12 }}
          >
            <option value="">Select reviewer...</option>
            {MER_REVIEWERS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.role}
              </option>
            ))}
          </select>
        </div>
      </Card>
      {pending.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
          <p style={{ fontSize: 14, color: COLORS.slate }}>No reports pending review. All submitted data has been processed.</p>
        </Card>
      ) : (
        pending.map((r) => (
          <Card key={r.id} style={{ borderLeft: `3px solid ${COLORS.amber}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white, marginBottom: 4 }}>{r.typeLabel}</div>
                <div style={{ fontSize: 12, color: COLORS.slate }}>
                  {r.quarter} · {r.fiscalYear} · {r.rowCount} data row(s) · {r.fileName}
                </div>
                <div style={{ fontSize: 11, color: COLORS.slate, marginTop: 4 }}>
                  Submitted by <span style={{ color: COLORS.accentLight, fontWeight: 600 }}>{r.submittedBy}</span> on {new Date(r.submittedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
                {r.notes && <div style={{ fontSize: 11, color: COLORS.slateLight, marginTop: 6, padding: "6px 10px", background: "rgba(148,163,184,0.05)", borderRadius: 6, fontStyle: "italic" }}>
                  "{r.notes}"
                </div>}
              </div>
              <StatusBadge status={r.status} />
            </div>
            {r.data && r.data.length > 0 && !r.data[0]._pdfFile && (
              <div style={{ overflowX: "auto", marginBottom: 12, maxHeight: 140, overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                  <thead>
                    <tr>
                      {Object.keys(r.data[0]).map((k) => (
                        <th
                          key={k}
                          style={{ textAlign: "left", padding: "5px 8px", borderBottom: `1px solid ${COLORS.cardBorder}`, color: COLORS.accent, fontWeight: 600, position: "sticky", top: 0, background: COLORS.darkBlue }}
                        >
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {r.data.slice(0, 5).map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((v, j) => (
                          <td key={j} style={{ padding: "4px 8px", borderBottom: `1px solid ${COLORS.cardBorder}`, color: COLORS.slateLight }}>
                            {String(v ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {r.warningCount > 0 && <div style={{ fontSize: 11, color: COLORS.amber, marginBottom: 8 }}>⚠ {r.warningCount} validation warning(s)</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => handleAction(r.id, "approved")}
                disabled={!selectedReviewer}
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: selectedReviewer ? COLORS.green : "rgba(148,163,184,0.15)",
                  color: selectedReviewer ? COLORS.white : COLORS.slate,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: selectedReviewer ? "pointer" : "not-allowed",
                }}
              >
                ✓ Approve & Ingest
              </button>
              <button
                onClick={() => handleAction(r.id, "rejected")}
                disabled={!selectedReviewer}
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.coral}44`,
                  background: "transparent",
                  color: selectedReviewer ? COLORS.coral : COLORS.slate,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: selectedReviewer ? "pointer" : "not-allowed",
                }}
              >
                ✕ Reject
              </button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

function IngestionLog({ uploadLog }) {
  return (
    <Card>
      <SectionHeader title="Ingestion History" subtitle="Complete audit trail of all quarterly report submissions, reviews, and data ingestions" />
      {uploadLog.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
          <p style={{ fontSize: 13, color: COLORS.slate }}>No reports have been submitted yet. Upload your first quarterly report to get started.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {uploadLog.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                background: "rgba(148,163,184,0.03)",
                borderRadius: 10,
                border: `1px solid ${COLORS.cardBorder}`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: r.status === "ingested" ? `${COLORS.green}18` : r.status === "rejected" ? `${COLORS.coral}18` : `${COLORS.amber}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {r.status === "ingested" ? "✅" : r.status === "rejected" ? "❌" : "⏳"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>
                  {r.typeLabel} — {r.quarter} {r.fiscalYear}
                </div>
                <div style={{ fontSize: 11, color: COLORS.slate }}>
                  {r.submittedBy} · {r.fileName} · {r.rowCount} rows · {new Date(r.submittedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <StatusBadge status={r.status} />
              <span style={{ fontSize: 10, color: COLORS.slate, fontFamily: "monospace" }}>{r.id}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function TemplateDownloads() {
  const [copied, setCopied] = useState(null);
  const handleCopy = (rt) => {
    const headerRow = rt.fields.join(",");
    const exampleRow = rt.fields
      .map((f) => {
        if (f === "province") return "Gauteng";
        if (f === "source") return "Corporate Partners";
        if (f === "initiative") return "Expand into new industries";
        if (f.toLowerCase().includes("notes")) return "Q1 update";
        return "0";
      })
      .join(",");
    const csv = headerRow + "\n" + exampleRow;
    try {
      navigator.clipboard.writeText(csv);
    } catch {
      // fallback: select text
    }
    setCopied(rt.id);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <Card>
      <SectionHeader title="Report Templates" subtitle="Copy the CSV template for each report type, then paste into a spreadsheet or directly into the CSV paste input." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {REPORT_TYPES.map((rt) => (
          <div key={rt.id} style={{ background: "rgba(148,163,184,0.05)", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 6 }}>{rt.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
              {rt.fields.map((f) => (
                <span key={f} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: `${COLORS.accent}12`, color: COLORS.accent, fontFamily: "monospace" }}>
                  {f}
                </span>
              ))}
            </div>
            <div
              style={{
                fontSize: 10,
                color: COLORS.slate,
                fontFamily: "monospace",
                background: "rgba(0,0,0,0.25)",
                padding: "6px 10px",
                borderRadius: 6,
                marginBottom: 10,
                wordBreak: "break-all",
              }}
            >
              {rt.fields.join(",")}
            </div>
            <button
              onClick={() => handleCopy(rt)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${copied === rt.id ? COLORS.green : COLORS.accent}44`,
                background: "transparent",
                color: copied === rt.id ? COLORS.green : COLORS.accent,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {copied === rt.id ? "✓ Copied!" : "📋 Copy CSV Template"}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ============================================
// DATA INGESTION ENGINE
// ============================================
function ingestData(report, dashboardData, setDashboardData) {
  const d = report.data;
  if (!d || d.length === 0) return;

  setDashboardData((prev) => {
    const next = JSON.parse(JSON.stringify(prev));

    if (report.type === "esd_quarterly") {
      const row = d[0];
      const num = (k) => parseFloat(row[k]) || 0;
      if (row.smesSupported) next.impactKPIs.smesSupported.value = num("smesSupported");
      if (row.revenueGenerated) next.impactKPIs.revenueGenerated.value = num("revenueGenerated");
      if (row.contractsSecured) next.impactKPIs.contractsSecured.value = num("contractsSecured");
      const jobs = num("jobsCreated") + num("jobsSustained");
      if (jobs > 0) next.impactKPIs.jobsCreated.value = jobs;
      if (row.womenOwned || row.youthOwned) {
        next.demographicData = [
          { name: "Women-owned", value: num("womenOwned") || 57, color: COLORS.coral },
          { name: "Youth-owned", value: num("youthOwned") || 24, color: COLORS.accent },
          { name: "Disability-owned", value: num("disabilityOwned") || 1, color: COLORS.gold },
          {
            name: "Other",
            value: Math.max(0, 100 - (num("womenOwned") || 57) - (num("youthOwned") || 24) - (num("disabilityOwned") || 1)),
            color: COLORS.slate,
          },
        ];
      }
      // Append to revenue timeline
      const qLabel = `${report.quarter.split(" ")[0]} ${report.fiscalYear.substring(0, 4).slice(-2)}`;
      const existingIdx = next.revenueTimeline.findIndex((r) => r.quarter === qLabel);
      const entry = { quarter: qLabel, esd: num("revenueGenerated") / 2, led: 0, total: num("revenueGenerated") / 2 };
      if (existingIdx >= 0) {
        next.revenueTimeline[existingIdx] = { ...next.revenueTimeline[existingIdx], ...entry };
      } else {
        next.revenueTimeline.push(entry);
      }
      // Compute deltas
      if (!next.deltas) next.deltas = {};
      const base = BASELINE_DATA.impactKPIs;
      Object.keys(next.impactKPIs).forEach((k) => {
        if (base[k]) {
          const delta = Math.round(((next.impactKPIs[k].value - base[k].value) / base[k].value) * 100);
          next.deltas[k] = delta;
        }
      });
    }

    if (report.type === "led_quarterly") {
      const row = d[0];
      const num = (k) => parseFloat(row[k]) || 0;
      if (row.ledJobs) next.impactKPIs.jobsCreated.value = (next.impactKPIs.jobsCreated.value || 0) + num("ledJobs");
      if (row.ledInvestment) next.impactKPIs.communityInvestment.value = num("ledInvestment");
      if (row.ledSMMEs) next.impactKPIs.smmeOpportunities.value = num("ledSMMEs");
    }

    if (report.type === "provincial") {
      d.forEach((row) => {
        const prov = row.province;
        if (prov && next.provincialDetail[prov]) {
          const num = (k) => parseFloat(row[k]) || 0;
          const p = next.provincialDetail[prov];
          if (row.esdSMEs) p.esdSMEs = num("esdSMEs");
          if (row.ledJobs) p.ledJobs = num("ledJobs");
          if (row.ledSMMEs) p.ledSMMEs = num("ledSMMEs");
          if (row.ledInvestment) p.ledInvestment = num("ledInvestment");
          if (row.womenOwned) p.womenOwned = num("womenOwned");
          if (row.youthOwned) p.youthOwned = num("youthOwned");
        }
      });
    }

    if (report.type === "funding") {
      d.forEach((row) => {
        const idx = next.fundingPipeline.findIndex((f) => f.source.toLowerCase().includes((row.source || "").toLowerCase()));
        if (idx >= 0) {
          if (row.secured) next.fundingPipeline[idx].secured = parseFloat(row.secured) || next.fundingPipeline[idx].secured;
          if (row.pipeline) next.fundingPipeline[idx].pipeline = parseFloat(row.pipeline) || next.fundingPipeline[idx].pipeline;
        }
      });
    }

    if (report.type === "strategy") {
      d.forEach((row) => {
        const idx = next.strategyInitiatives.findIndex((s) => s.name.toLowerCase().includes((row.initiative || "").toLowerCase()));
        if (idx >= 0) {
          if (row.complete) next.strategyInitiatives[idx].complete = parseInt(row.complete) || next.strategyInitiatives[idx].complete;
          if (row.inProgress) next.strategyInitiatives[idx].inProgress = parseInt(row.inProgress) || next.strategyInitiatives[idx].inProgress;
        }
      });
    }

    if (report.type === "media") {
      const row = d[0];
      const num = (k) => parseFloat(row[k]) || 0;
      if (row.placements) next.impactKPIs.mediaPlacements.value = num("placements");
      if (row.reach) next.impactKPIs.mediaReach.value = num("reach");
    }

    next.lastUpdated = new Date().toISOString();
    return next;
  });
}

export { parseCSVText, ingestData, BASELINE_DATA };

// ============================================
// MAIN DASHBOARD
// ============================================
export default function PropertyPointDashboard() {
  const [stakeholder, setStakeholder] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState({ ...BASELINE_DATA, deltas: {}, lastUpdated: null });
  const [uploadLog, setUploadLog] = useState([]);

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "provincial", label: "Provincial View" },
    { id: "strategy", label: "Strategy Tracker" },
    { id: "governance", label: "Governance" },
    { id: "data", label: "📤 Data Management" },
  ];

  const viewConfigs = {
    executive: { sections: ["impact", "strategic", "funding", "governance"], description: "Board-level: strategic performance, financial sustainability, governance, and impact metrics." },
    corporate: { sections: ["impact", "demographic", "provincial", "programme"], description: "Client view: programme outcomes, demographics, geographic reach, and SME pipeline." },
    programme: { sections: ["programme", "strategic_progress", "provincial", "team"], description: "Operational: programme flow, initiative tracking, provincial delivery, and team capacity." },
    funder: { sections: ["impact", "funding", "revenue", "strategic"], description: "Funder: ROI metrics, funding pipeline, revenue trajectory, and strategic alignment." },
    sme: { sections: ["demographic", "programme", "revenue", "provincial"], description: "Entrepreneur: peer demographics, programme pipeline, contracts, and geographic spread." },
  };

  const sectionMap = {
    impact: <ImpactOverview data={dashboardData} />,
    revenue: <RevenueChart data={dashboardData} />,
    demographic: <DemographicPie data={dashboardData} />,
    provincial: <ProvincialBreakdown data={dashboardData} />,
    strategic: <StrategicRadar data={dashboardData} />,
    strategic_progress: <StrategyProgress data={dashboardData} />,
    funding: <FundingPipelineChart data={dashboardData} />,
    programme: <ProgrammeFlow data={dashboardData} />,
    governance: <GovernancePanel />,
    team: <TeamSnapshot />,
  };

  const pendingCount = uploadLog.filter((r) => r.status === "pending").length;

  const renderDashboard = () => {
    if (stakeholder && viewConfigs[stakeholder]) {
      const config = viewConfigs[stakeholder];
      return (
        <div>
          <div
            style={{
              background: `${STAKEHOLDERS[stakeholder].color}11`,
              border: `1px solid ${STAKEHOLDERS[stakeholder].color}33`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: 12,
              color: STAKEHOLDERS[stakeholder].color,
            }}
          >
            {STAKEHOLDERS[stakeholder].icon} <strong>{STAKEHOLDERS[stakeholder].label} View</strong> — {config.description}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>{config.sections.map((s) => <div key={s}>{sectionMap[s]}</div>)}</div>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <ImpactOverview data={dashboardData} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <RevenueChart data={dashboardData} />
          <DemographicPie data={dashboardData} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <ProvincialBreakdown data={dashboardData} />
          <StrategicRadar data={dashboardData} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FundingPipelineChart data={dashboardData} />
          <ProgrammeFlow data={dashboardData} />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.darkBlue} 40%, #0D1B2A 100%)`,
        color: COLORS.white,
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div
        style={{
          position: "fixed",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${COLORS.accent}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -300,
          left: -200,
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${COLORS.green}06 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          padding: "20px 32px",
          borderBottom: `1px solid ${COLORS.cardBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(20px)",
          background: "rgba(10, 22, 40, 0.8)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
              PROPERTY<span style={{ color: COLORS.accent }}>POINT</span>
            </span>
            <span style={{ fontSize: 8, letterSpacing: 3, color: COLORS.slate, textTransform: "uppercase", marginTop: 2 }}>Transforming the Industry</span>
          </div>
          <div style={{ width: 1, height: 32, background: COLORS.cardBorder, margin: "0 8px" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.slateLight }}>Executive Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {dashboardData.lastUpdated && (
            <span style={{ fontSize: 10, color: COLORS.slate }}>Last ingestion: {new Date(dashboardData.lastUpdated).toLocaleDateString("en-ZA", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
          )}
          <span style={{ fontSize: 11, color: COLORS.slate }}>FY2024/25</span>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}66` }} />
          <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>Live</span>
        </div>
      </header>

      <nav style={{ padding: "16px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                background: activeTab === t.id ? "rgba(14,165,233,0.15)" : "transparent",
                color: activeTab === t.id ? COLORS.accentLight : COLORS.slate,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                borderBottom: activeTab === t.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                position: "relative",
              }}
            >
              {t.label}
              {t.id === "data" && pendingCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 4,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: COLORS.coral,
                    fontSize: 9,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.white,
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
        {activeTab === "dashboard" && <StakeholderSelector active={stakeholder} onChange={setStakeholder} />}
      </nav>

      <main style={{ padding: "0 32px 40px" }}>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "provincial" && <ProvincialView data={dashboardData} />}
        {activeTab === "strategy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <StrategyProgress data={dashboardData} />
            <StrategicRadar data={dashboardData} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <RevenueChart data={dashboardData} />
              <FundingPipelineChart data={dashboardData} />
            </div>
          </div>
        )}
        {activeTab === "governance" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <GovernancePanel />
              <TeamSnapshot />
            </div>
            <Card>
              <SectionHeader title="B-BBEE Status History" subtitle="Level 1 contributor status — five consecutive years" />
              <div style={{ display: "flex", alignItems: "end", gap: 16, justifyContent: "center", paddingTop: 12 }}>
                {dashboardData.bbbeeLevels.map((b) => (
                  <div key={b.year} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.accent})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: 800,
                        color: COLORS.white,
                        marginBottom: 6,
                        boxShadow: `0 4px 16px ${COLORS.green}33`,
                      }}
                    >
                      {b.level}
                    </div>
                    <span style={{ fontSize: 10, color: COLORS.slate }}>{b.year}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
        {activeTab === "data" && <DataManagement dashboardData={dashboardData} setDashboardData={setDashboardData} uploadLog={uploadLog} setUploadLog={setUploadLog} />}
      </main>

      <footer style={{ padding: "16px 32px", borderTop: `1px solid ${COLORS.cardBorder}`, textAlign: "center", fontSize: 10, color: COLORS.slate }}>
        Property Point NPC · ISO 9001:2015 Certified · Level 1 B-BBEE · Dashboard Concept v2.0 — Data-Driven
      </footer>
    </div>
  );
}
