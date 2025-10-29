"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/app/i18n/client";
import { RequiredI18n, StateSetter, FALLBACK_MOBILE_L_SCREEN_WIDTH } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";

interface SearchModalProps {
  isSearchOpen: boolean;
  isSearchClosing: boolean;
  handleSearchClose: () => void;
}

interface SearchResult {
  id: number;
  href: string;
  label: string;
}

export default function SearchModal({
  isSearchOpen, isSearchClosing, handleSearchClose
}: SearchModalProps): React.ReactNode {
  const { t, i18n }: RequiredI18n = useT("app", {});
  const { width }: ResponsiveContextValue = useResponsiveContext();
  const [searchActiveTab, setSearchActiveTab]: StateSetter<string> = useState<string>("app");
  const [selectedResultIndex, setSelectedResultIndex]: StateSetter<number> = useState<number>(0);
  const SearchResults: SearchResult[] = [
    { id: 1, href: `/${i18n.language}`, label: t("header.search.introduction") },
    { id: 2, href: `/${i18n.language}`, label: t("header.search.gettingStarted") },
    { id: 3, href: `/${i18n.language}`, label: t("header.search.appRouter") },
    { id: 4, href: `/${i18n.language}`, label: t("header.search.architecture") },
    { id: 5, href: `/${i18n.language}`, label: t("header.search.pagesRouter") },
    { id: 6, href: `/${i18n.language}`, label: t("header.search.apiReference") },
    { id: 7, href: `/${i18n.language}`, label: t("header.search.accessibility") }
  ];

  return (
    <>
      {isSearchOpen && (
        <div
          className={`fixed inset-0 ${isSearchClosing ? "" : `${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "bg-[#000000]/40" : "bg-[var(--theme-bg-dark)]/80"}`} flex items-start pt-[110px] justify-center ${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "z-60" : "z-50"} font-[family-name:var(--font-geist-sans)]`}
          onClick={(): void => handleSearchClose()}
        >
          <div
            className={`${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "absolute bottom-0 h-[550px] rounded-tl-[12px] rounded-tr-[12px]" : "rounded-[12px]"} bg-[var(--theme-bg-dark)] w-full max-w-[640px] border border-[var(--theme-border-base)] shadow ${isSearchClosing ? `${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "search-modal-translate-out" : "search-modal-scale-out"}` : `${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "search-modal-translate-in" : "search-modal-scale-in"}`}`}
            onClick={(e: React.MouseEvent): void => e.stopPropagation()}
          >
            <div className="p-3 border-b border-[var(--theme-border-base)]">
              <div className="flex items-center gap-2 mb-3">
                <button
                  className={`cursor-pointer transition duration-200 ease-in-out text-xs font-medium border px-1 py-[1.2px] rounded ${searchActiveTab === "app" ? "border-[var(--theme-accent-blue-border)] text-[var(--theme-accent-blue)] bg-[var(--theme-accent-blue-bg)]" : "border-[var(--theme-border-base)] text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg-muted-dark-hover)] bg-[var(--theme-bg-muted-dark)]"}`}
                  onClick={(): void => setSearchActiveTab("app")}
                >
                  {t("header.search.activeTabs.app")}
                </button>
                <button
                  className={`cursor-pointer transition duration-200 ease-in-out text-xs font-medium border px-1 py-[1.2px] rounded ${searchActiveTab === "pages" ? "border-[var(--theme-accent-purple-border)] text-[var(--theme-accent-purple)] bg-[var(--theme-accent-purple-bg)]" : "border-[var(--theme-border-base)] text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg-muted-dark-hover)] bg-[var(--theme-bg-muted-dark)]"}`}
                  onClick={(): void => setSearchActiveTab("pages")}
                >
                  {t("header.search.activeTabs.pages")}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder={t("header.search.input")}
                  className={`w-full ${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "text-[16px]" : "text-[18px]"} outline-none placeholder-[var(--theme-text-caption)] pl-1`}
                />
                {!(width < FALLBACK_MOBILE_L_SCREEN_WIDTH) && (
                  <span
                    className="cursor-pointer transition duration-200 ease-in-out border border-[var(--theme-text-subtle)] bg-[var(--theme-bg-base)] text-[12px] text-[var(--theme-fg-base)] px-[4px] py-[1px] rounded hover:bg-[var(--theme-bg-muted)]"
                    onClick={handleSearchClose}
                  >
                    Esc
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 text-[var(--theme-fg-base)]">
              {SearchResults.map(({ id, href, label }, index): React.ReactNode => (
                <Link
                  key={id}
                  href={href}
                  className={`transition duration-200 ease-in-out flex items-center p-[9px] ${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "py-[13px]" : "py-[11px]"} text-sm rounded ${!(width < FALLBACK_MOBILE_L_SCREEN_WIDTH) ? index === selectedResultIndex ? "bg-[var(--theme-bg-muted)]" : "hover:bg-[var(--theme-bg-muted)]" : ""}`}
                  onMouseEnter={(): void => setSelectedResultIndex(index)}
                >
                  <Image
                    className="dark:invert"
                    src="/assets/file.svg"
                    alt="File logo"
                    width={16}
                    height={16}
                    priority
                  />
                  <span className="pl-[13px]">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .search-modal-scale-out {
            animation: search-modal-scale-out 0.2s ease forwards;
          }

          .search-modal-scale-in {
            animation: search-modal-scale-in 0.2s ease forwards;
          }

          .search-modal-translate-out {
            animation: search-modal-translate-out 0.2s ease-out forwards;
          }

          .search-modal-translate-in {
            animation: search-modal-translate-in 0.2s ease-out forwards;
          }

          @keyframes search-modal-scale-out {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.8);
              opacity: 0;
            }
          }

          @keyframes search-modal-scale-in {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes search-modal-translate-out {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100%);
              opacity: 0;
            }
          }

          @keyframes search-modal-translate-in {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
