"use client";

import { useEffect, useState } from "react";
import { languages } from "@/app/i18n/settings";
import { useT } from "@/app/i18n/client";
import { OptionalI18n, StateSetter, LANGUAGE_MAP, FALLBACK_MOBILE_M_SCREEN_WIDTH } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "@/app/[lng]/components/ResponsiveContext";

export default function Main() {
  const { t }: OptionalI18n = useT("locale", {});
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const { width, isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <main className={`${isMobileScreen ? "w-[100vw]" : "w-full"} pb-[130px] bg-[var(--theme-bg-base)]`}>
      <div className={`w-full max-w-screen-xl mx-auto ${isTabletScreen ? "px-[25px]" : "px-[60px]"}`}>
        <h1 className="text-[var(--theme-fg-base)] text-2xl font-semibold mb-8">
          {t("main.title")}
        </h1>
        <nav className={`grid ${isTabletScreen ? `${isMobileScreen ? `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "grid-cols-[1fr]" : "grid-cols-[1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"}` : "grid-cols-[1fr_1fr_1fr_1fr]"} flex flex-wrap justify-start gap-x-[5vw] gap-y-[20px]`}>
          {languages.map((lang) => {
            const item = LANGUAGE_MAP[lang];
            if (!item) return null;

            return (
              <a
                key={lang}
                href={`/${lang}`}
                className="text-[var(--theme-primary-light)] underline"
              >
                {item.region} - {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
