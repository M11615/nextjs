import { i18n, TFunction } from "i18next";

export type I18nInstance = {
  t: TFunction;
  i18n: i18n;
};

export type StateSetter<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const LANGUAGE_MAP: Record<string, { label: string; region: string }> = {
  "fr-DZ": { label: "Français", region: "Algeria" },
  "es-AR": { label: "Español", region: "Argentina" },
  "en-AU": { label: "English", region: "Australia" },
  "nl-BE": { label: "Nederlands", region: "België" },
  "fr-BE": { label: "Français", region: "Belgique" },
  "es-BO": { label: "Español", region: "Bolivia" },
  "bs-BA": { label: "Bosanski", region: "Bosna i Hercegovina" },
  "pt-BR": { label: "Português", region: "Brasil" },
  "en-CA": { label: "English", region: "Canada" },
  "fr-CA": { label: "Français", region: "Canada" },
  "cs-CZ": { label: "Čeština", region: "Česká Republika" },
  "es-CL": { label: "Español", region: "Chile" },
  "es-CO": { label: "Español", region: "Colombia" },
  "es-CR": { label: "Español", region: "Costa Rica" },
  "sr-ME": { label: "Srpski", region: "Crna Gora" },
  "en-CY": { label: "English", region: "Cyprus" },
  "da-DK": { label: "Dansk", region: "Danmark" },
  "de-DE": { label: "Deutsch", region: "Deutschland" },
  "es-EC": { label: "Español", region: "Ecuador" },
  "et-EE": { label: "Eesti", region: "Eesti" },
  "en-EG": { label: "English", region: "Egypt" },
  "es-SV": { label: "Español", region: "El Salvador" },
  "es-ES": { label: "Español", region: "España" },
  "fr-FR": { label: "Français", region: "France" },
  "es-GT": { label: "Español", region: "Guatemala" },
  "en-AE": { label: "English", region: "Gulf" },
  "es-HN": { label: "Español", region: "Honduras" },
  "en-HK": { label: "English", region: "Hong Kong SAR" },
  "hr-HR": { label: "Hrvatski", region: "Hrvatska" },
  "en-IN": { label: "English", region: "India" },
  "id-ID": { label: "Bahasa Indonesia", region: "Indonesia" },
  "en-IE": { label: "English", region: "Ireland" },
  "is-IS": { label: "Íslenska", region: "Ísland" },
  "en-IL": { label: "English", region: "Israel" },
  "it-IT": { label: "Italiano", region: "Italia" },
  "en-JO": { label: "English", region: "Jordan" },
  "lv-LV": { label: "Latviešu", region: "Latvija" },
  "en-LB": { label: "English", region: "Lebanon" },
  "lt-LT": { label: "Lietuvių", region: "Lietuva" },
  "de-LU": { label: "Deutsch", region: "Luxemburg" },
  "fr-LU": { label: "Français", region: "Luxembourg" },
  "hu-HU": { label: "Magyar", region: "Magyarország" },
  "en-MY": { label: "English", region: "Malaysia" },
  "en-MT": { label: "English", region: "Malta" },
  "es-MX": { label: "Español", region: "México" },
  "fr-MA": { label: "Français", region: "Morocco" },
  "nl-NL": { label: "Nederlands", region: "Nederland" },
  "en-NZ": { label: "English", region: "New Zealand" },
  "es-NI": { label: "Español", region: "Nicaragua" },
  "en-NG": { label: "English", region: "Nigeria" },
  "nb-NO": { label: "Bokmål", region: "Norge" },
  "de-AT": { label: "Deutsch", region: "Österreich" },
  "en-PK": { label: "English", region: "Pakistan" },
  "es-PA": { label: "Español", region: "Panamá" },
  "es-PY": { label: "Español", region: "Paraguay" },
  "es-PE": { label: "Español", region: "Perú" },
  "en-PH": { label: "English", region: "Philippines" },
  "pl-PL": { label: "Polski", region: "Polska" },
  "pt-PT": { label: "Português", region: "Portugal" },
  "es-PR": { label: "Español", region: "Puerto Rico" },
  "es-DO": { label: "Español", region: "República Dominicana" },
  "ro-MD": { label: "Română", region: "Republica Moldova" },
  "ro-RO": { label: "Română", region: "România" },
  "en-SA": { label: "English", region: "Saudi Arabia" },
  "de-CH": { label: "Deutsch", region: "Schweiz" },
  "en-SG": { label: "English", region: "Singapore" },
  "sl-SI": { label: "Slovenščina", region: "Slovenija" },
  "sk-SK": { label: "Slovenčina", region: "Slovensko" },
  "en-ZA": { label: "English", region: "South Africa" },
  "sr-RS": { label: "Srpski", region: "Srbija" },
  "en-LK": { label: "English", region: "Sri Lanka" },
  "fr-CH": { label: "Français", region: "Suisse" },
  "fi-FI": { label: "Suomi", region: "Suomi" },
  "sv-SE": { label: "Svenska", region: "Sverige" },
  "fr-TN": { label: "Français", region: "Tunisia" },
  "tr-TR": { label: "Türkçe", region: "Türkiye" },
  "en-GB": { label: "English", region: "United Kingdom" },
  "en-US": { label: "English", region: "United States" },
  "es-UY": { label: "Español", region: "Uruguay" },
  "es-VE": { label: "Español", region: "Venezuela" },
  "vi-VN": { label: "Tiếng việt", region: "Việt Nam" },
  "el-GR": { label: "Ελληνικά", region: "Ελλάδα" },
  "be-BY": { label: "Беларуская", region: "Беларусь" },
  "bg-BG": { label: "Български", region: "България" },
  "ru-KZ": { label: "Русский", region: "Казахстан" },
  "ru-RU": { label: "Русский", region: "Россия" },
  "uk-UA": { label: "Українська", region: "Україна" },
  "he-IL": { label: "עברית", region: "ישראל" },
  "ar-IQ": { label: "العربية", region: "العراق" },
  "ar-SA": { label: "العربية", region: "المملكة العربية السعودية" },
  "ar-LY": { label: "العربية", region: "ليبيا" },
  "ar-EG": { label: "العربية", region: "مصر" },
  "ar-AE": { label: "العربية", region: "دول الخليج" },
  "th-TH": { label: "ไทย", region: "ไทย" },
  "ko-KR": { label: "한국어", region: "대한민국" },
  "zh-CN": { label: "简体中文", region: "中国大陆" },
  "zh-TW": { label: "繁體中文", region: "台灣" },
  "ja-JP": { label: "日本語", region: "日本" },
  "zh-HK": { label: "繁體中文", region: "香港特別行政区" }
} as const;

export const FALLBACK_LANGUAGE: string = "en-UK" as const;

export const THEME_KEYS: Record<string, string> = {
  LIGHT: "light",
  SYSTEM: "system",
  DARK: "dark"
} as const;

export const FALLBACK_THEME: string = "system" as const;

export const COOKIE_KEYS: Record<string, string> = {
  CONSENT: "fides_consent",
  LANGUAGE: "i18next",
  THEME: "theme"
} as const;

export const COOKIE_CATEGORIES: Record<string, string> = {
  ESSENTIAL: "essential",
  MARKETING: "marketing",
  ANALYTICS: "analytics",
  FUNCTIONAL: "functional"
} as const;

export const COOKIE_CATEGORY_MAP: Record<string, string[]> = {
  [COOKIE_CATEGORIES.ESSENTIAL]: [COOKIE_KEYS.CONSENT, COOKIE_KEYS.LANGUAGE, COOKIE_KEYS.THEME],
  [COOKIE_CATEGORIES.MARKETING]: [],
  [COOKIE_CATEGORIES.ANALYTICS]: [],
  [COOKIE_CATEGORIES.FUNCTIONAL]: []
} as const;

export const COOKIE_EXPIRATION_DAYS: number = 365 as const;

export const FALLBACK_COOKIE_CONSENT: Record<string, boolean> = {
  [COOKIE_CATEGORIES.ESSENTIAL]: true,
  [COOKIE_CATEGORIES.MARKETING]: false,
  [COOKIE_CATEGORIES.ANALYTICS]: false,
  [COOKIE_CATEGORIES.FUNCTIONAL]: false
} as const;

export const CHAT_MESSAGE_ROLE: Record<string, string> = {
  USER: "user",
  ASSISTANT: "assistant"
} as const;

export const CHAT_MESSAGE_STATUS: Record<string, string> = {
  PINDING: "pending",
  SENT: "sent",
  ERROR: "error"
} as const;

export const SCRSCREEN_WIDTH_OFFSET: number = 8 as const;

export const FALLBACK_4K_SCREEN_WIDTH: number = 2560 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_LAPTOP_L_SCREEN_WIDTH: number = 1440 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_LAPTOP_SCREEN_WIDTH: number = 1024 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_TABLET_SCREEN_WIDTH: number = 768 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_MOBILE_L_SCREEN_WIDTH: number = 425 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_MOBILE_M_SCREEN_WIDTH: number = 375 + SCRSCREEN_WIDTH_OFFSET;

export const FALLBACK_MOBILE_S_SCREEN_WIDTH: number = 320 + SCRSCREEN_WIDTH_OFFSET;

export const MAIN_CONTENT_ID = "main-content" as const;
