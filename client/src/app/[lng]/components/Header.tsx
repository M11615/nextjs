"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/app/i18n/client";
import { RequiredI18n, StateSetter, FALLBACK_MOBILE_L_SCREEN_WIDTH } from "@/app/lib/constants";
import { modalManager } from "@/app/lib/modalManager";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";
import LaptopHeader from "./LaptopHeader";
import MobileHeader from "./MobileHeader";
import SearchModal from "./SearchModal";

export default function Header(): React.ReactNode {
  const { t, i18n }: RequiredI18n = useT("app", {});
  const responsiveContext: ResponsiveContextValue = useResponsiveContext();
  const [isSearchOpen, setIsSearchOpen]: StateSetter<boolean> = useState<boolean>(false);
  const [isSearchClosing, setIsSearchClosing]: StateSetter<boolean> = useState<boolean>(false);
  const searchModalId: string = Header.name.concat(SearchModal.name);

  useEffect((): () => void => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        modalManager.open(searchModalId);
      }
      if (e.key === "Escape") {
        modalManager.close(searchModalId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return (): void => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect((): void => {
    modalManager.register(searchModalId, {
      open: handleSearchOpen,
      close: handleSearchClose
    });
  }, []);

  const handleSearchOpen = (): void => {
    document.body.style.overflow = "hidden";
    setIsSearchOpen(true);
  };

  const handleSearchClose = (): void => {
    setIsSearchClosing(true);
    setTimeout((): void => {
      document.body.style.overflow = "";
      setIsSearchOpen(false);
      setIsSearchClosing(false);
    }, responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? 300 : 200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[65px] z-60 flex items-center bg-[var(--theme-bg-base)]/80 backdrop-blur-[5px] border-b border-[var(--theme-border-base)] py-[15px] bg-[var(--theme-bg-base)]">
        <div className={`w-full max-w-screen-2xl mx-auto flex items-center justify-between ${responsiveContext.isTabletScreen ? "px-[25px]" : "px-[60px]"}`}>
          <div className="flex items-center space-x-3 mr-[45px]">
            <Link href={`/${i18n.language}`}>
              <Image
                style={{ filter: "var(--theme-image-filter-light)" }}
                src="/assets/vercel.svg"
                alt="Vercel logo"
                width={25}
                height={22}
                priority
              />
            </Link>
            <span className="text-[var(--theme-text-subtle)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="26" viewBox="0 0 12 26" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="0" y1="28" x2="14" y2="0" />
              </svg>
            </span>
            <Link href={`/${i18n.language}`}>
              <Image
                style={{ filter: "var(--theme-image-filter-dark)" }}
                src="/assets/next.svg"
                alt="Next.js logo"
                width={90}
                height={18}
                priority
              />
            </Link>
          </div>
          {responsiveContext.isMobileScreen ? (
            <MobileHeader
              t={t}
              i18n={i18n}
              handleSearchOpen={(): void => modalManager.open(searchModalId)}
            />
          ) : (
            <LaptopHeader
              t={t}
              i18n={i18n}
              responsiveContext={responsiveContext}
              handleSearchOpen={(): void => modalManager.open(searchModalId)}
            />
          )}
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal
          isSearchOpen={isSearchOpen}
          isSearchClosing={isSearchClosing}
          handleSearchClose={(): void => modalManager.close(searchModalId)}
        />
      )}
    </>
  );
}
