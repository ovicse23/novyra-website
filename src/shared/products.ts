import type { ReviewItem } from './types.ts';

export interface ProductChapter {
  number: string;
  title: string;
  desc: string;
}

export interface ProductPreviewImage {
  url: string;
  title: string;
  subtitle: string;
  pageLabel: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  badge: string;
  price: number;
  regularPrice: number;
  currency: string;
  pages: number;
  format: string;
  r2Key: string;
  downloadFilename: string;
  accentColor: 'cyan' | 'purple' | 'emerald';
  features: string[];
  chapters: ProductChapter[];
  previewImages: ProductPreviewImage[];
  targetAudience: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'ai-client-hunting-toolkit',
    slug: 'ai-client-hunting-toolkit',
    title: 'AI Client Hunting + Freelancing Toolkit',
    shortTitle: 'AI Client Hunting Toolkit',
    subtitle: 'The systematic operating system for landing high-paying international & local clients without relying on marketplace bidding wars.',
    tagline: 'Learn. Build. Grow.',
    description: 'A 40-page step-by-step practical manual packed with trigger-based prospecting, AI-assisted personalized cold outreach, client diagnostic frameworks, and battle-tested proposal templates.',
    badge: 'FREELANCE & AGENCY FAVORITE',
    price: 299,
    regularPrice: 699,
    currency: 'BDT',
    pages: 40,
    format: 'Digital PDF Manual',
    r2Key: 'products/novyra-ai-client-hunting-toolkit.pdf',
    downloadFilename: 'Novyra-AI-Client-Hunting-Toolkit.pdf',
    accentColor: 'cyan',
    features: [
      '40-Page Practical Playbook with zero fluff',
      'Trigger-Based Lead Sourcing Matrix (spot buying intent before competitors)',
      '12 Ready-to-Send Cold Outreach & Follow-up Scripts',
      'Diagnostic Sales Call Framework & High-Ticket Closing Script',
      'Contract & Milestone Payment Security Template',
      'Lifetime Free Access to Future Edition Updates',
    ],
    chapters: [
      {
        number: '01',
        title: 'The Client Hunting Operating System',
        desc: 'Escape the Upwork/Fiverr trap. Build a proactive outbound pipeline based on market triggers, not blind bidding.',
      },
      {
        number: '02',
        title: 'Prospecting & Market Intelligence',
        desc: 'Find companies actively bleeding money who have budgets to pay $500–$2,500+ for solutions.',
      },
      {
        number: '03',
        title: 'High-Relevance AI Cold Outreach',
        desc: 'Frameworks for personalized emails and LinkedIn messages that receive 25%+ positive response rates.',
      },
      {
        number: '04',
        title: 'Diagnostic Sales Calls & Closing',
        desc: 'How to lead discussions as a trusted advisor, diagnose deep pain points, and quote value-based pricing.',
      },
      {
        number: '05',
        title: 'Proposals, Retainers & Contracts',
        desc: 'One-page project scopes, payment milestone agreements, and strategies to turn 1-off gigs into monthly retainers.',
      },
    ],
    previewImages: [
      {
        url: '/assets/preview-01.svg',
        title: 'Client Hunting Operating System',
        subtitle: 'Core 4-pillar outbound client acquisition pipeline',
        pageLabel: 'PAGE 04/40',
      },
      {
        url: '/assets/preview-02.svg',
        title: 'The 3-Step Trigger-Based Prospecting Framework',
        subtitle: 'How to detect high-intent buying signals on LinkedIn & Google',
        pageLabel: 'PAGE 12/40',
      },
      {
        url: '/assets/preview-03.svg',
        title: 'Cold Outreach Anatomy That Converts',
        subtitle: 'Hook, relevance bridge, micro-case study & low-friction CTA',
        pageLabel: 'PAGE 19/40',
      },
      {
        url: '/assets/preview-04.svg',
        title: 'Diagnostic Discovery Call Checklist',
        subtitle: 'Exact questions to unearth budget and position value',
        pageLabel: 'PAGE 27/40',
      },
      {
        url: '/assets/preview-05.svg',
        title: 'Proposal & Scope-Lock Formula',
        subtitle: 'One-page proposal architecture that prevents scope creep',
        pageLabel: 'PAGE 33/40',
      },
      {
        url: '/assets/preview-06.svg',
        title: '30-Day Client Pipeline Implementation Plan',
        subtitle: 'Daily operational checklist to sign your next paying client',
        pageLabel: 'PAGE 38/40',
      },
    ],
    targetAudience: [
      'Freelancers tired of competing against low-cost marketplace bids',
      'Agency owners wanting predictable B2B client acquisition systems',
      'Designers, developers, and media buyers who want direct overseas clients',
      'Beginners who want proven outreach templates that actually work in 2026',
    ],
  },
  {
    id: 'meta-ads-blueprint',
    slug: 'meta-ads-blueprint',
    title: 'Meta Ads Blueprint: Bangladesh Edition 2026',
    shortTitle: 'Meta Ads Blueprint 2026',
    subtitle: 'The battle-tested media buying framework for scaling e-commerce & lead gen in Bangladesh with profitable ROAS and COD resilience.',
    tagline: 'Learn. Build. Grow.',
    description: 'A 53-page exhaustive execution manual built specifically for the Bangladeshi market. Covers Meta auction mechanics, Pixel & CAPI tracking, 20 high-converting Bangla hooks, primary-text formulas, COD unit economics, and 30-day scaling protocols.',
    badge: '2026 BANGLADESH EDITION',
    price: 299,
    regularPrice: 699,
    currency: 'BDT',
    pages: 53,
    format: 'Digital PDF Manual',
    r2Key: 'products/novyra-meta-ads-blueprint-2026.pdf',
    downloadFilename: 'Novyra-Meta-Ads-Blueprint-2026.pdf',
    accentColor: 'purple',
    features: [
      '53-Page Actionable Blueprint tailored for BD market dynamics',
      'Meta Auction Economics & CPM Control under local constraints',
      '20 High-Converting Bangla Ad Hooks for Facebook & Instagram',
      '10 Primary Text + 10 Headline Formulas engineered for BD shoppers',
      'Cash-on-Delivery (COD) Margin & Return-Rate Math Calculator',
      'Creative Testing Sheet & 30-Day Budget Scaling Roadmap',
    ],
    chapters: [
      {
        number: '01',
        title: 'Foundations & Meta Auction Mechanics',
        desc: 'Understand how the algorithm scores your ads, minimizes CPM, and wins auctions in Bangladesh.',
      },
      {
        number: '02',
        title: 'Measurement, CAPI & Tracking Architecture',
        desc: 'Pixel setup, Conversions API, deduplication, and handling iOS 14.5+ attribution loss accurately.',
      },
      {
        number: '03',
        title: 'Audience Architecture & Advantage+ Campaigns',
        desc: 'Broad vs. Interest stacks vs. Lookalikes. When to use Advantage+ Shopping Campaigns (ASC).',
      },
      {
        number: '04',
        title: 'Creative Strategy & 20 Bangla Hooks',
        desc: 'Visual frameworks, 20 localized Bangla hooks, 10 primary-text formulas, and headline blueprints.',
      },
      {
        number: '05',
        title: 'Economics, COD Math & Optimization',
        desc: 'Master return rates, courier delivery fees, breakeven ROAS, and real net profit calculation.',
      },
      {
        number: '06',
        title: 'Operating Toolkit & 30-Day Plan',
        desc: 'Daily checklist, creative testing log, campaign launch protocol, and step-by-step 30-day scaling roadmap.',
      },
    ],
    previewImages: [
      {
        url: '/assets/meta-preview-01.svg',
        title: 'Blueprint Architecture & Foundations',
        subtitle: 'Comprehensive 6-pillar framework for Bangladeshi media buyers',
        pageLabel: 'PAGE 03/53',
      },
      {
        url: '/assets/meta-preview-02.svg',
        title: 'Meta Auction & CPM Mechanics',
        subtitle: 'Winning auctions with high estimated action rates and ad relevance',
        pageLabel: 'PAGE 09/53',
      },
      {
        url: '/assets/meta-preview-03.svg',
        title: '20 Proven Bangla Hooks for Bangladesh',
        subtitle: 'Angle variations: Curiosity, pain point, social proof, and FOMO',
        pageLabel: 'PAGE 24/53',
      },
      {
        url: '/assets/meta-preview-04.svg',
        title: 'Cash-on-Delivery (COD) Profit Economics',
        subtitle: 'Accounting for return rates, delivery costs, and real net profit',
        pageLabel: 'PAGE 36/53',
      },
      {
        url: '/assets/meta-preview-05.svg',
        title: 'Creative Testing & Scaling Matrix',
        subtitle: 'Dynamic creative testing (DCT) protocol before horizontal budget scale',
        pageLabel: 'PAGE 42/53',
      },
      {
        url: '/assets/meta-preview-06.svg',
        title: '30-Day Meta Ads Scaling Execution Plan',
        subtitle: 'Phase 1 Testing to Phase 3 Scaling with budget benchmarks',
        pageLabel: 'PAGE 48/53',
      },
    ],
    targetAudience: [
      'Bangladeshi F-Commerce and E-Commerce entrepreneurs seeking profitable sales',
      'Media buyers & digital marketers running Meta ad campaigns for local brands',
      'Freelancers offering Facebook advertising services to local or overseas clients',
      'Business owners tired of burning ad spend with zero returns or high return rates',
    ],
  },
];

export interface BundleProduct {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  description: string;
  badge: string;
  price: number;
  regularPrice: number;
  currency: string;
  pages: number;
  format: string;
  accentColor: 'emerald';
  features: string[];
  productSlugs: string[];
}

export const BUNDLE_PRODUCT: BundleProduct = {
  id: 'complete-growth-bundle',
  slug: 'complete-growth-bundle',
  title: 'Complete Growth Bundle (Both Guides — 93 Pages)',
  shortTitle: 'Complete Growth Bundle',
  subtitle: 'Master high-ticket client acquisition AND hyper-profitable Meta ads in Bangladesh. Get both comprehensive playbooks at a special bundled price.',
  tagline: 'Learn. Build. Grow.',
  description: 'Get both complete playbooks (93 pages total) covering client hunting and Meta ads at an exclusive 64% discounted bundle rate.',
  badge: 'BEST VALUE • SAVE 64%',
  price: 499,
  regularPrice: 1398,
  currency: 'BDT',
  pages: 93,
  format: '2 Digital PDF Playbooks',
  accentColor: 'emerald',
  features: [
    'AI Client Hunting + Freelancing Toolkit (40 Pages)',
    'Meta Ads Blueprint: Bangladesh Edition 2026 (53 Pages)',
    'Full 93 Pages of actionable frameworks, scripts, and blueprints',
    '32+ Copywriting formulas, cold outreach templates & Bangla hooks',
    'COD profit calculator & discovery sales call scripts',
    'Lifetime updates for both editions included',
  ],
  productSlugs: ['ai-client-hunting-toolkit', 'meta-ads-blueprint'],
};

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Tanvir Hossain',
    role: 'Freelance UI/UX Designer',
    companyOrLocation: 'Dhaka',
    rating: 5,
    date: '2026-03-28',
    productSlug: 'ai-client-hunting-toolkit',
    headline: 'Landed my first $600 overseas retainer in 11 days',
    comment: 'I was trapped bidding on Upwork where everyone quotes $20. Chapter 2 on trigger-based prospecting completely changed how I find clients. I reached out to 15 SaaS companies using the relevance script in Chapter 3, got 4 replies, and closed a $600/month ongoing UI retainer. Unbelievable value for ৳299.',
    verified: true,
    metricBadge: '$600/mo Client Closed',
  },
  {
    id: 'rev-2',
    author: 'Nafis Rahman',
    role: 'E-commerce Brand Founder',
    companyOrLocation: 'Chittagong',
    rating: 5,
    date: '2026-04-02',
    productSlug: 'meta-ads-blueprint',
    headline: 'Cut our COD return rate from 28% to 11%',
    comment: 'Most courses teach US-style dropshipping that fails miserably in Bangladesh. This blueprint addressed the exact problem every Bangladeshi seller faces: courier delivery failures and ad fatigue. The COD math sheet and Bangla hook templates boosted our ROAS to 4.2x while saving thousands in delivery fees.',
    verified: true,
    metricBadge: '4.2x Profitable ROAS',
  },
  {
    id: 'rev-3',
    author: 'Sumaiya Akter',
    role: 'Digital Marketing Specialist',
    companyOrLocation: 'Sylhet',
    rating: 5,
    date: '2026-03-15',
    productSlug: 'meta-ads-blueprint',
    headline: 'The 20 Bangla hooks alone paid for the guide 50x over',
    comment: 'The Bangla hook frameworks in Section 4 are pure gold. We tested 5 variations for a local fashion boutique client, and our cost-per-purchase dropped from ৳180 to ৳64 within 48 hours. Clear, concise, and 100% actionable without theoretical fluff.',
    verified: true,
    metricBadge: '64% Lower Cost Per Sale',
  },
  {
    id: 'rev-4',
    author: 'Rakibul Islam',
    role: 'Web Developer & Agency Lead',
    companyOrLocation: 'Dhaka',
    rating: 5,
    date: '2026-04-05',
    productSlug: 'complete-growth-bundle',
    headline: 'Got both guides — the most practical ৳499 I ever spent',
    comment: 'Buying the bundle was a no-brainer. We use the Client Hunting guide to sign international development contracts and the Meta Ads blueprint to run ads for our clients. The one-page proposal template alone eliminated our scope creep issues completely.',
    verified: true,
    metricBadge: 'Agency Process Transformed',
  },
  {
    id: 'rev-5',
    author: 'Arif Mahmud',
    role: 'B2B Copywriter & Consultant',
    companyOrLocation: 'Rajshahi',
    rating: 5,
    date: '2026-03-22',
    productSlug: 'ai-client-hunting-toolkit',
    headline: 'No fake motivation, just systematic execution',
    comment: 'I really appreciate that Novyra cuts straight to real systems without empty motivational hype. The discovery call checklist on page 27 gave me the exact questions to ask during Zoom pitches. It made me feel confident talking to US founders.',
    verified: true,
    metricBadge: 'Closed 2 US Clients',
  },
  {
    id: 'rev-6',
    author: 'Farhana Yeasmin',
    role: 'Home Decor F-Commerce Owner',
    companyOrLocation: 'Dhaka',
    rating: 5,
    date: '2026-04-01',
    productSlug: 'meta-ads-blueprint',
    headline: 'Finally understood Conversions API & Advantage+ setups',
    comment: 'I was struggling with Meta ads tracking after iOS updates and burning money on boosted posts. The setup steps in Chapter 2 and the 30-day scaling plan made everything easy to implement step-by-step. Now our ads bring steady daily orders on WhatsApp and website.',
    verified: true,
    metricBadge: 'Consistent Daily Orders',
  },
];

export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getAllProducts(): ProductItem[] {
  return PRODUCTS;
}

export function isValidProductSlug(slug: string): boolean {
  return PRODUCTS.some((p) => p.slug === slug || p.id === slug) || slug === BUNDLE_PRODUCT.id;
}

export function getProductPrice(slug: string): number {
  if (slug === BUNDLE_PRODUCT.id || slug === BUNDLE_PRODUCT.slug) {
    return BUNDLE_PRODUCT.price;
  }
  const prod = getProductBySlug(slug);
  return prod ? prod.price : PRODUCTS[0].price;
}

export function getProductTitle(slug: string): string {
  if (slug === BUNDLE_PRODUCT.id || slug === BUNDLE_PRODUCT.slug) {
    return BUNDLE_PRODUCT.title;
  }
  const prod = getProductBySlug(slug);
  return prod ? prod.title : PRODUCTS[0].title;
}
