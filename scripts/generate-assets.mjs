import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Generate Novyra Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100" fill="none">
  <defs>
    <linearGradient id="novyraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22D3EE" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#8B5CF6" />
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22D3EE" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.2" />
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <!-- Icon Mark -->
  <g transform="translate(15, 12)">
    <rect x="0" y="0" width="76" height="76" rx="20" fill="#0B1220" stroke="url(#novyraGrad)" stroke-width="2" />
    <path d="M22 56 V20 L54 56 V20" stroke="url(#novyraGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#neonGlow)" />
    <circle cx="54" cy="20" r="4" fill="#22D3EE" />
    <circle cx="22" cy="56" r="4" fill="#8B5CF6" />
  </g>
  <!-- Wordmark -->
  <text x="110" y="52" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-weight="900" font-size="38" letter-spacing="4" fill="#FFFFFF">NOVYRA</text>
  <!-- Tagline -->
  <text x="112" y="74" font-family="'Inter', -apple-system, sans-serif" font-weight="600" font-size="12" letter-spacing="3" fill="#94A3B8">LEARN. BUILD. GROW.</text>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'logo.svg'), logoSvg);

// Generate a valid PNG fallback for logo.png by embedding a base64 1x1 or rendering via SVG wrapper
// Create logo.png
fs.writeFileSync(path.join(assetsDir, 'logo.png'), Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfDwAEfQHzR3/y+AAAAABJRU5ErkJggg==',
  'base64'
));

// 2. Generate 6 Preview Pages as SVGs and save placeholders
const previews = [
  {
    num: '01',
    title: 'THE 40-PAGE SYSTEM OVERVIEW',
    subtitle: 'Chapter 1: The Modern Client Hunting Architecture',
    points: ['The 3 Foundations of Client Hunting', 'Why Traditional Upwork Bidding Fails', 'The 6-Channel Flywheel Model', 'Setting Up Your AI Outreach Stack'],
    blurText: 'PROPRIETARY CLIENT FILTERING MATRIX [BLURRED]'
  },
  {
    num: '02',
    title: 'AI CLIENT RESEARCH SYSTEM',
    subtitle: 'Chapter 2: Identifying High-Ticket Decision Makers',
    points: ['LinkedIn Sales Navigator Free Workflows', 'Claude & ChatGPT Company Extraction Prompts', 'Finding Verified Business Email Formats', 'Personalization Trigger Identification'],
    blurText: 'AI PROMPT #04: TARGET PAIN DISCOVERY [BLURRED]'
  },
  {
    num: '03',
    title: 'UPWORK & FIVERR DOMINANCE',
    subtitle: 'Chapter 3: High-Win Proposal Structures',
    points: ['The 4-Sentence Upwork Opening Hook', 'Avoiding Low-Budget Red Flag Clients', 'Portfolio Storytelling That Wins Trust', 'Fiverr Gigs to Direct Contract Funnel'],
    blurText: 'WINNING PROPOSAL SCRIPTS [BLURRED FOR ACCESS]'
  },
  {
    num: '04',
    title: 'COLD EMAIL ENGINE',
    subtitle: 'Chapter 4: Cold Emails That Actually Get Replies',
    points: ['Deliverability Setup (SPF, DKIM, DMARC)', 'High-Open Subject Lines Tested in 2026', 'The Value-First 75-Word Pitch', '4-Step Follow-Up Sequence Schedule'],
    blurText: 'HIGH-CONVERTING COLD EMAIL SEQUENCES [BLURRED]'
  },
  {
    num: '05',
    title: 'LINKEDIN & FACEBOOK OUTREACH',
    subtitle: 'Chapter 5: Social Selling Without Sounding Spammy',
    points: ['Optimizing Your Profile for Conversions', 'The Warm Connection Request Strategy', 'Facebook Group Opportunity Mining', 'Transitioning from Chat to Paid Contract'],
    blurText: 'PROVEN LINKEDIN DM SCRIPTS [BLURRED FOR BUYERS]'
  },
  {
    num: '06',
    title: '30-DAY CLIENT HUNTING CALENDAR',
    subtitle: 'Chapter 6: Day-by-Day Execution Roadmap',
    points: ['Week 1: Positioning & Asset Setup', 'Week 2: 50 Tailored Cold Pitches', 'Week 3: LinkedIn Follow-Ups & Discovery Calls', 'Week 4: Closing & Retainer Contract Flow'],
    blurText: 'FULL 30-DAY CHECKLIST & METRIC TRACKER [BLURRED]'
  }
];

previews.forEach((p, idx) => {
  const previewSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="600" height="840" fill="#0B1220">
    <defs>
      <linearGradient id="pGrad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22D3EE" />
        <stop offset="100%" stop-color="#8B5CF6" />
      </linearGradient>
      <filter id="blurFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
    </defs>
    
    <!-- Page Container -->
    <rect x="0" y="0" width="600" height="840" rx="16" fill="#0A0F1D" stroke="#1E293B" stroke-width="2" />
    
    <!-- Top Header Bar -->
    <rect x="0" y="0" width="600" height="60" fill="#070B17" />
    <text x="30" y="38" font-family="'Inter', sans-serif" font-weight="700" font-size="14" fill="#22D3EE" letter-spacing="2">NOVYRA TOOLKIT</text>
    <text x="520" y="38" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="#64748B">PAGE 0${p.num}/40</text>
    <line x1="0" y1="60" x2="600" y2="60" stroke="#1E293B" stroke-width="1" />
    
    <!-- Chapter Title -->
    <text x="40" y="110" font-family="'Inter', sans-serif" font-weight="800" font-size="12" fill="#8B5CF6" letter-spacing="2">PRACTICAL GUIDE SECTION</text>
    <text x="40" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="24" fill="#FFFFFF">${p.title}</text>
    <text x="40" y="175" font-family="'Inter', sans-serif" font-weight="500" font-size="15" fill="#94A3B8">${p.subtitle}</text>
    
    <!-- Key Framework Box -->
    <rect x="40" y="210" width="520" height="230" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.5" />
    <text x="65" y="245" font-family="'Inter', sans-serif" font-weight="700" font-size="15" fill="#22D3EE">CORE METHODOLOGY</text>
    
    ${p.points.map((pt, i) => `
      <circle cx="70" cy="${280 + i * 36}" r="5" fill="#3B82F6" />
      <text x="90" y="${285 + i * 36}" font-family="'Inter', sans-serif" font-weight="500" font-size="14" fill="#E2E8F0">${pt}</text>
    `).join('')}
    
    <!-- Blurred Proprietary Template / Secret Framework Section -->
    <g transform="translate(40, 470)">
      <rect x="0" y="0" width="520" height="280" rx="12" fill="#111827" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />
      
      <!-- Blurred content inside -->
      <g filter="url(#blurFilter)" opacity="0.6">
        <text x="30" y="45" font-family="'Inter', sans-serif" font-size="15" fill="#FFFFFF">PROMPT TEMPLATE: Act as a senior client acquisition specialist...</text>
        <rect x="30" y="65" width="460" height="15" rx="4" fill="#475569" />
        <rect x="30" y="90" width="420" height="15" rx="4" fill="#475569" />
        <rect x="30" y="115" width="440" height="15" rx="4" fill="#475569" />
        <rect x="30" y="140" width="380" height="15" rx="4" fill="#475569" />
        <rect x="30" y="170" width="460" height="20" rx="4" fill="#2563EB" opacity="0.4" />
        <rect x="30" y="200" width="300" height="15" rx="4" fill="#475569" />
        <rect x="30" y="225" width="410" height="15" rx="4" fill="#475569" />
      </g>
      
      <!-- Overlay Lock Badge -->
      <rect x="110" y="110" width="300" height="60" rx="30" fill="#070B17" stroke="#8B5CF6" stroke-width="2" />
      <text x="260" y="146" font-family="'Inter', sans-serif" font-weight="700" font-size="13" fill="#22D3EE" text-anchor="middle" letter-spacing="1">🔒 UNLOCK FULL PDF — ৳299</text>
    </g>
    
    <!-- Footer line -->
    <text x="300" y="800" font-family="'Inter', sans-serif" font-weight="600" font-size="12" fill="#475569" text-anchor="middle">© NOVYRA — PERSONAL USE LICENSE ONLY</text>
  </svg>`;

  fs.writeFileSync(path.join(assetsDir, `preview-${p.num}.svg`), previewSvg);
  // Also create placeholder webp files
  fs.writeFileSync(path.join(assetsDir, `preview-${p.num}.webp`), Buffer.from(
    'UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAQAcJaACdLoAAP7/2QAA', 'base64'
  ));
});

console.log('Novyra brand assets and preview files generated successfully!');
