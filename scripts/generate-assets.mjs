import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 6 Preview Pages matching the real attached PDF
const previews = [
  {
    num: '01',
    pageNum: '04',
    title: 'THE CLIENT HUNTING OPERATING SYSTEM',
    category: 'START HERE • SYSTEM OVER LUCK',
    bullets: [
      '1. POSITION: Who you help, what problem you solve, credible approach',
      '2. PROSPECT: Build a list of buyers with a real reason to need you',
      '3. CONVERT: Start relevant conversations, diagnose needs, propose clearly',
      'Core Equation: Targeting × Relevance × Follow-Up × Skill = Pipeline'
    ],
    boxTitle: 'OPERATING PILLARS',
    promptTitle: 'TRIGGER-BASED LEAD DETECTION',
    promptSample: 'Find evidence of a need: broken website, active hiring, poor tracking, outdated design, slow performance, or new product launch...'
  },
  {
    num: '02',
    pageNum: '08',
    title: 'BUILD YOUR IDEAL CLIENT PROFILE',
    category: 'SECTION 1 • TARGETING & POSITIONING',
    bullets: [
      'Company Fit: Industry, team size, timezone, platform stack',
      'Need Fit: Visible problem, urgency trigger, budget plausibility',
      'Decision-Maker: Finding reachable stakeholders who approve spend',
      'Lead Scoring: 0-2 points for Fit, Need, Timing, Reachability & Budget'
    ],
    boxTitle: 'IDEAL CLIENT PROFILE (ICP) MATRIX',
    promptTitle: 'ICP QUALIFICATION WORKSHEET',
    promptSample: 'Question: Who gets the most value? What event makes them search for help? What are they already spending money on? Who approves? [BLURRED]'
  },
  {
    num: '03',
    pageNum: '14',
    title: 'PROSPECT RESEARCH PROMPT PACK',
    category: 'SECTION 2 • RESEARCH FASTER WITH AI',
    bullets: [
      'Prompt 1: Business Snapshot (analyze offer, customers, acquisition channels)',
      'Prompt 2: Trigger Finder (extract concrete problem signals from public info)',
      'Prompt 3: Evidence-Locked Personalization (first-line openers under 25 words)',
      'Prompt 4: Qualification Questions (reveal urgency, setup, decision process)'
    ],
    boxTitle: 'AI PROMPT VAULT',
    promptTitle: 'MASTER PROMPT #2: TRIGGER EXTRACTION',
    promptSample: 'Analyze following public data. Identify concrete triggers for [MY SERVICE]. Rank triggers by strength. For each trigger, suggest one non-pushy question... [BLURRED]'
  },
  {
    num: '04',
    pageNum: '17',
    title: 'THE 5-PART UPWORK PROPOSAL',
    category: 'SECTION 3 • RELEVANCE WINS',
    bullets: [
      '1. Lead with the problem: Show you understand the brief & risk',
      '2. Give one useful insight: Offer diagnostic thought without guessing',
      '3. Explain your plan: 2 to 4 specific steps for their exact project',
      '4. Use relevant proof: One similar verified result over generic tools',
      '5. Ask a focused question: Make it effortless for client to reply'
    ],
    boxTitle: 'HIGH-WIN PROPOSAL BLUEPRINT',
    promptTitle: 'AI PROPOSAL CRITIC PROMPT',
    promptSample: 'Act as a skeptical Upwork buyer. Review proposal against brief. Highlight generic lines, unsupported claims, missing risk, rewrite under 170 words... [BLURRED]'
  },
  {
    num: '05',
    pageNum: '23',
    title: 'LINKEDIN MESSAGE SEQUENCE',
    category: 'SECTION 4 • FOUR TOUCHES, ONE CONVERSATION',
    bullets: [
      'Message 1 - Observation: Reference verified trigger + quick relevant question',
      'Message 2 - Useful Idea: Diagnostic check to reveal if risk is genuine',
      'Message 3 - Proof: Truthful example of handling similar setup',
      'Message 4 - Close Loop: Respectful pause or permission for next week'
    ],
    boxTitle: 'SOCIAL SELLING PLAYBOOK',
    promptTitle: 'LINKEDIN OUTREACH SCRIPT VAULT',
    promptSample: '“Hi [Name] - saw that [specific verified trigger]. I work on [relevant outcome]. Quick question: are you already handling [problem] internally?”... [BLURRED]'
  },
  {
    num: '06',
    pageNum: '39',
    title: 'YOUR 30-DAY CLIENT HUNTING PLAN',
    category: 'SECTION 6 • FROM ZERO TO SYSTEM',
    bullets: [
      'Week 1: Position + Proof (1 niche, 1 core offer, 2 proof assets, tracker)',
      'Week 2: Build Pipeline (50 qualified leads, 10 proposals, 15 outreaches)',
      'Week 3: Follow Up + Refine (second touches, 1 new proof piece, improve opener)',
      'Week 4: Sales + Review (calls, proposals, wins/loss review, next targets)'
    ],
    boxTitle: 'DAY-BY-DAY EXECUTION CALENDAR',
    promptTitle: 'WEEKLY ACCOUNTABILITY SCORECARD',
    promptSample: 'Which lead source produced best conversations? Which message generated replies? What objection appeared? What one change will I test next week? [BLURRED]'
  }
];

previews.forEach((p, idx) => {
  const previewSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 840" width="600" height="840" fill="#0B1220">
    <defs>
      <linearGradient id="pGrad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22D3EE" />
        <stop offset="50%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>
      <filter id="blurFilter" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>
    
    <!-- Page Container -->
    <rect x="0" y="0" width="600" height="840" rx="16" fill="#0A0F1D" stroke="#1E293B" stroke-width="2" />
    
    <!-- Top Header Bar -->
    <rect x="0" y="0" width="600" height="64" fill="#070B17" />
    <text x="32" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="16" fill="#22D3EE" letter-spacing="3">NOVYRA</text>
    <text x="125" y="38" font-family="'Inter', sans-serif" font-weight="600" font-size="11" fill="#64748B" letter-spacing="1">PRACTICAL PLAYBOOK</text>
    <text x="500" y="38" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#94A3B8">PAGE ${p.pageNum}/40</text>
    <line x1="0" y1="64" x2="600" y2="64" stroke="#1E293B" stroke-width="1" />
    
    <!-- Category & Chapter Title -->
    <text x="40" y="108" font-family="'Inter', sans-serif" font-weight="800" font-size="11" fill="#A855F7" letter-spacing="2">${p.category}</text>
    <text x="40" y="142" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="23" fill="#FFFFFF">${p.title}</text>
    
    <!-- Key Framework Box -->
    <rect x="40" y="180" width="520" height="260" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.5" />
    <rect x="40" y="180" width="520" height="38" rx="12" fill="#1E293B" />
    <text x="60" y="205" font-family="'Inter', sans-serif" font-weight="800" font-size="12" fill="#22D3EE" letter-spacing="1">${p.boxTitle}</text>
    
    ${p.bullets.map((pt, i) => `
      <g transform="translate(60, ${240 + i * 46})">
        <circle cx="6" cy="6" r="5" fill="#3B82F6" />
        <text x="22" y="10" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="#E2E8F0">${pt}</text>
      </g>
    `).join('')}
    
    <!-- Blurred Proprietary Template / Secret Framework Section -->
    <g transform="translate(40, 470)">
      <rect x="0" y="0" width="520" height="280" rx="12" fill="#0B1220" stroke="#3B82F6" stroke-dasharray="4 4" stroke-width="1.5" />
      <text x="25" y="32" font-family="'Inter', sans-serif" font-weight="700" font-size="12" fill="#38BDF8">${p.promptTitle}</text>
      
      <!-- Blurred content inside -->
      <g filter="url(#blurFilter)" opacity="0.65" transform="translate(25, 45)">
        <text x="0" y="20" font-family="'Inter', sans-serif" font-size="14" fill="#FFFFFF">${p.promptSample}</text>
        <rect x="0" y="35" width="470" height="14" rx="3" fill="#475569" />
        <rect x="0" y="58" width="430" height="14" rx="3" fill="#475569" />
        <rect x="0" y="81" width="450" height="14" rx="3" fill="#475569" />
        <rect x="0" y="104" width="390" height="14" rx="3" fill="#475569" />
        <rect x="0" y="132" width="460" height="18" rx="4" fill="#2563EB" opacity="0.4" />
        <rect x="0" y="160" width="320" height="14" rx="3" fill="#475569" />
        <rect x="0" y="183" width="420" height="14" rx="3" fill="#475569" />
      </g>
      
      <!-- Overlay Lock Badge -->
      <rect x="110" y="115" width="300" height="56" rx="28" fill="#070B17" stroke="url(#pGrad${idx})" stroke-width="2" />
      <text x="260" y="149" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="13" fill="#22D3EE" text-anchor="middle" letter-spacing="1">🔒 UNLOCK 40-PAGE GUIDE — ৳299</text>
    </g>
    
    <!-- Footer line -->
    <text x="300" y="805" font-family="'Inter', sans-serif" font-weight="600" font-size="11" fill="#475569" text-anchor="middle">COPYRIGHT © 2026 NOVYRA. LEARN. BUILD. GROW. ALL RIGHTS RESERVED.</text>
  </svg>`;

  fs.writeFileSync(path.join(assetsDir, `preview-${p.num}.svg`), previewSvg);
});

console.log('Updated 6 preview SVG files based on official PDF pages!');
