"use client";

import { useEffect, useState } from "react";
import { StateSetter, THEME_KEYS, FALLBACK_THEME, COOKIE_KEYS } from "@/app/lib/constants";
import { setCookie, getCookie } from "@/app/lib/cookies";

interface Option {
  value: string;
  icon: React.ReactNode;
}

export default function ThemeSwitcher(): React.ReactNode {
  const [theme, setTheme]: StateSetter<string> = useState<string>(FALLBACK_THEME);
  const options: Option[] = [
    {
      value: THEME_KEYS.LIGHT,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.2v2.4M12 19.4v2.4" />
          <path d="M2.2 12h2.4M19.4 12h2.4" />
          <path d="M5.7 5.7l0.8 0.8M17.5 17.5l0.8 0.8" />
          <path d="M17.5 6.5l0.8-0.8M5.7 18.3l0.8-0.8" />
        </svg>
      )
    },
    {
      value: THEME_KEYS.SYSTEM,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="19.5" height="12" rx="2" ry="2" />
          <line x1="12" y1="17" x2="12" y2="22" />
          <line x1="9" y1="23" x2="15" y2="23" />
        </svg>
      )
    },
    {
      value: THEME_KEYS.DARK,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 13A9 9 0 1 1 11 3 7 7 0 0 0 21 13z" />
          <line x1="18" y1="2" x2="18" y2="6" />
          <line x1="16" y1="4" x2="20" y2="4" />
        </svg>
      )
    }
  ];

  useEffect((): void => {
    const mode: string = getCookie(COOKIE_KEYS.THEME) || FALLBACK_THEME;
    handleThemeChange(mode);
  }, []);

  const handleThemeChange = (mode: string): void => {
    setTheme(mode);
    setCookie(COOKIE_KEYS.THEME, mode);
    document.documentElement.className = mode;
    const mediaQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    window.dispatchEvent(new CustomEvent("theme-change", {
      detail: {
        actualTheme: mode === THEME_KEYS.SYSTEM ? (mediaQuery.matches ? THEME_KEYS.DARK : THEME_KEYS.LIGHT) : mode,
        userPreferenceTheme: mode
      }
    }));
  };

  return (
    <div className="flex items-center border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] rounded-full px-1 py-1">
      {options.map(({ value, icon }): React.ReactNode => {
        return (
          <button
            key={value}
            onClick={(): void => handleThemeChange(value)}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition duration-200 ease-in-out ${theme === value ? "bg-[var(--theme-border-base)] text-[var(--theme-fg-base)]" : "text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"}`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};
