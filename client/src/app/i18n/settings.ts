import { LANGUAGE_MAP } from "@/app/lib/constants";

export const fallbackLng: string = "en-US";
export const languages: string[] = Object.keys(LANGUAGE_MAP);
export const defaultNS: string = "translation";
export const cookieName: string = "i18next";
export const headerName: string = "x-i18next-current-language";
