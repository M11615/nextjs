import { COOKIE_KEYS, COOKIE_CATEGORIES, COOKIE_CATEGORY_MAP, COOKIE_EXPIRATION_DAYS } from "./constants";

type CookieKey = typeof COOKIE_KEYS[keyof typeof COOKIE_KEYS];

const getCookieCategory = (name: CookieKey): string | undefined => {
  return Object.entries(COOKIE_CATEGORY_MAP).find(([, keys]) =>
    keys.includes(name)
  )?.[0];
};

export const parseConsent = (): Record<string, boolean> | undefined => {
  const consentRaw: string | undefined = getCookie(COOKIE_KEYS.CONSENT);
  try {
    return consentRaw ? JSON.parse(consentRaw) : undefined;
  } catch (error: unknown) {
    console.error(error);
    return undefined;
  }
};

export const setCookie = (name: CookieKey, value: string, days: number = COOKIE_EXPIRATION_DAYS): void => {
  const type: string | undefined = getCookieCategory(name);
  const consent: Record<string, boolean> | undefined = parseConsent() || {};
  if (type === COOKIE_CATEGORIES.ESSENTIAL || (type && consent[type])) {
    const date: Date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/;`;
  }
};

export const getCookie = (name: CookieKey): string | undefined => {
  const cookieString: string = document.cookie;
  const cookies: string[] = cookieString.split("; ");
  for (const cookie of cookies) {
    const [key, value]: string[] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return undefined;
};

export const deleteCookie = (name: CookieKey): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
