"use client";

import { cookieName } from "@/app/i18n/settings";
import { languages } from "@/app/i18n/settings";
import { useT } from "@/app/i18n/client";
import { I18nInstance, LANGUAGE_MAP, FALLBACK_MOBILE_M_SCREEN_WIDTH } from "@/app/lib/constants";
import { setCookie } from "@/app/lib/cookies";
import { ResponsiveContextValue, useResponsiveContext } from "@/app/[lng]/components/ResponsiveContext";

export default function Main() {
  const { t }: I18nInstance = useT("locale", {});
  const { width, isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();

  const handleLanguageChange: (lang: string) => void = (lang: string): void => {
    setCookie(cookieName, lang);
    window.location.href = `/${lang}`;
  };

  return (
    <main className="w-full pt-[110px] bg-[var(--theme-bg-base)]">
      <div className="w-full max-w-screen-xl mx-auto px-[25px]">
        <h1 className="text-[var(--theme-fg-base)] text-2xl font-semibold mb-[25px]">
          {t("main.title")}
        </h1>
        <nav className={`grid gap-x-[5vw] gap-y-[20px] ${isTabletScreen ? `${isMobileScreen ? `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "grid-cols-[1fr]" : "grid-cols-[1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"} justify-start`}>
          {languages.map((lang: string): React.ReactNode => {
            const item = LANGUAGE_MAP[lang];
            if (!item) return null;

            return (
              <button
                key={lang}
                onClick={(): void => {
                  handleLanguageChange(lang)
                }}
                className="cursor-pointer inline w-fit text-[var(--theme-primary)] text-left underline"
              >
                {item.region} - {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
