// UTM & Meta Attribution Capture Utility

export interface AttributionParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
}

const STORAGE_KEY = 'novyra_attribution';

export function captureAndStoreUtm(): AttributionParams {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const currentParams: AttributionParams = {};

  const keys: (keyof AttributionParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
  ];

  let hasAny = false;
  keys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) {
      currentParams[key] = val;
      hasAny = true;
    }
  });

  if (hasAny) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentParams));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentParams));
    } catch (e) {}
    return currentParams;
  }

  // Fallback to existing stored attribution so checkout doesn't lose parameters
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}

  return {};
}

export function getStoredAttribution(): AttributionParams {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return captureAndStoreUtm();
}
