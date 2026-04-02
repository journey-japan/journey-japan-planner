export const COOKIE_CONSENT_KEY = "jj-cookie-consent";

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookiePreferences {
  necessary: true; // always true — cannot be disabled
  analytics: boolean;
  marketing: boolean;
  updatedAt: string; // ISO 8601
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
};

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    // Migration: handle legacy "accepted" / "declined" values
    if (raw === "accepted") {
      const migrated: CookiePreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(migrated));
      return migrated;
    }
    if (raw === "declined") {
      const migrated: CookiePreferences = { ...DEFAULT_PREFERENCES, updatedAt: new Date().toISOString() };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(migrated));
      return migrated;
    }

    const parsed = JSON.parse(raw) as CookiePreferences;
    // Ensure necessary is always true
    parsed.necessary = true;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(prefs: Omit<CookiePreferences, "necessary" | "updatedAt">): CookiePreferences {
  const full: CookiePreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(full));

  // Remove analytics cookies if consent withdrawn
  if (!full.analytics) {
    deleteAnalyticsCookies();
  }
  // Remove marketing cookies if consent withdrawn
  if (!full.marketing) {
    deleteMarketingCookies();
  }

  return full;
}

export function hasConsentFor(category: CookieCategory): boolean {
  const prefs = getCookiePreferences();
  if (!prefs) return category === "necessary";
  return prefs[category];
}

function deleteAnalyticsCookies() {
  // Delete Google Analytics cookies
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gid")) {
      const domains = [window.location.hostname, "." + window.location.hostname];
      for (const domain of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

function deleteMarketingCookies() {
  // Placeholder for future marketing cookie cleanup
  // Currently no marketing cookies are used
}
