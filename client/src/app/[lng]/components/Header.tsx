"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/app/i18n/client";
import { RequiredI18n, StateSetter } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";
import LaptopHeader from "./LaptopHeader";
import TabletHeader from "./TabletHeader";
import SearchModal from "./SearchModal";

export default function Header(): React.ReactNode {
  const { t, i18n }: RequiredI18n = useT("app", {});
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const { isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();
  const [isSearchOpen, setIsSearchOpen]: StateSetter<boolean> = useState<boolean>(false);
  const [isSearchClosing, setIsSearchClosing]: StateSetter<boolean> = useState<boolean>(false);

  useEffect((): () => void => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        handleSearchOpen();
      }
      if (e.key === "Escape") {
        handleSearchClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return (): void => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  const handleSearchOpen = (): void => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = (): void => {
    setIsSearchClosing(true);
    setTimeout((): void => {
      setIsSearchOpen(false);
      setIsSearchClosing(false);
    }, 200);
  };

  if (!hydrated) return null;

  return (
    <>
      <header className={`fixed top-0 left-0 ${isMobileScreen ? "w-[100vw]" : "w-full"} h-[65px] z-60 flex items-center bg-[var(--theme-bg-base)]/80 backdrop-blur-[5px] border-b border-[var(--theme-border-base)] py-[15px] bg-[var(--theme-bg-base)]`}>
        <div className={`w-full max-w-screen-2xl mx-auto flex items-center justify-between ${isTabletScreen ? "px-[25px]" : "px-[60px]"}`}>
          <div className="flex items-center space-x-3 mr-10">
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
          {isTabletScreen ? (
            <TabletHeader
              t={t}
              i18n={i18n}
              handleSearchOpen={handleSearchOpen}
            />
          ) : (
            <LaptopHeader
              t={t}
              i18n={i18n}
              handleSearchOpen={handleSearchOpen}
            />
          )}
        </div>
      </header>

      {isSearchOpen && (
        <SearchModal
          isSearchOpen={isSearchOpen}
          isSearchClosing={isSearchClosing}
          handleSearchClose={handleSearchClose}
        />
      )}
    </>
  );
}
