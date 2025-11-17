"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/i18n/client";
import { I18nInstance, StateSetter, COOKIE_KEYS, COOKIE_CATEGORIES, FALLBACK_COOKIE_CONSENT } from "@/app/lib/constants";
import { parseConsent, setCookie } from "@/app/lib/cookies";

interface ConsentModalProps {
  isConsentOpen: boolean;
  handleConsentClose: () => void;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const buildCookieConsent = (value: boolean): Record<string, boolean> => {
  return Object.keys(FALLBACK_COOKIE_CONSENT).reduce((acc, key): Record<string, boolean> => {
    acc[key] = key === COOKIE_CATEGORIES.ESSENTIAL ? true : value;
    return acc;
  }, {} as Record<string, boolean>);
};

const saveCookieConsent = (newCookieConsent: Record<string, boolean>): void => {
  setCookie(COOKIE_KEYS.CONSENT, JSON.stringify(newCookieConsent));
};

export const handleDeny = (): void => {
  const deniedCookieConsent: Record<string, boolean> = buildCookieConsent(false);
  saveCookieConsent(deniedCookieConsent);
};

export const handleAcceptAll = (): void => {
  const acceptedCookieConsent: Record<string, boolean> = buildCookieConsent(true);
  saveCookieConsent(acceptedCookieConsent);
};

export default function ConsentModal({
  isConsentOpen, handleConsentClose
}: ConsentModalProps): React.ReactNode {
  const { t }: I18nInstance = useT("app", {});
  const [cookieConsent, setCookieConsent]: StateSetter<Record<string, boolean>> = useState<Record<string, boolean>>(FALLBACK_COOKIE_CONSENT);
  const [expandedIds, setExpandedIds]: StateSetter<string[]> = useState<string[]>([]);
  const [renderKey, setRenderKey]: StateSetter<number> = useState<number>(0);
  const categories: Category[] = [
    {
      id: COOKIE_CATEGORIES.ESSENTIAL,
      name: t("consentModal.essential.name"),
      description: t("consentModal.essential.description")
    },
    {
      id: COOKIE_CATEGORIES.MARKETING,
      name: t("consentModal.marketing.name"),
      description: t("consentModal.marketing.description")
    },
    {
      id: COOKIE_CATEGORIES.ANALYTICS,
      name: t("consentModal.analytics.name"),
      description: t("consentModal.analytics.description")
    },
    {
      id: COOKIE_CATEGORIES.FUNCTIONAL,
      name: t("consentModal.functional.name"),
      description: t("consentModal.functional.description")
    }
  ];

  useEffect((): void => {
    if (isConsentOpen) {
      const savedCookieConsent: Record<string, boolean> | undefined = parseConsent();
      setCookieConsent(savedCookieConsent || FALLBACK_COOKIE_CONSENT);
    }
  }, [isConsentOpen]);

  const onCategoryClick = (category: Category): void => {
    if (expandedIds.includes(category.id)) {
      setExpandedIds(expandedIds.filter((id): boolean => id !== category.id));
    } else {
      setExpandedIds([...expandedIds, category.id]);
    }
    setRenderKey(renderKey < 10 ? renderKey + 1 : 0);
  };

  const toggle = (category: Category): void => {
    setCookieConsent((consent: Record<string, boolean>): Record<string, boolean> => ({
      ...consent,
      [category.id]: !consent[category.id]
    }));
  };

  const handleSave = (newCookieConsent: Record<string, boolean>): void => {
    saveCookieConsent(newCookieConsent);
  };

  return (
    <>
      {isConsentOpen && (
        <div className="fixed inset-0 bg-[#000000]/40 flex items-center justify-center z-80 font-[family-name:var(--font-geist-sans)]">
          <div className="border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] w-full max-w-[600px] min-h-[500px] rounded-[12px] consent-modal-translate-in">
            <div className="flex justify-between mb-5 pt-6 px-6">
              <h1 className="text-[22px] text-[var(--theme-fg-base)] font-bold">
                {t("consentModal.title")}
              </h1>
            </div>
            <p className="text-[16px] text-[var(--theme-fg-base)] mb-5 px-6">
              {t("consentModal.description")}
            </p>
            <div key={renderKey} className="rounded-lg border border-[var(--theme-border-base)] mb-[50px] m-6">
              {categories.map((category, index): React.ReactNode => (
                <div key={category.id}>
                  <div
                    className={`flex items-center justify-between px-4 py-[10px] cursor-pointer bg-[var(--theme-bg-dark)] hover:bg-[var(--theme-bg-base)] ${index === 0 ? "rounded-t-lg" : ""} ${index === categories.length - 1 ? "rounded-b-lg" : ""} ${index !== categories.length - 1 ? "border-b border-[var(--theme-border-base)]" : ""}`}
                    onClick={(): void => onCategoryClick(category)}
                  >
                    <span className="text-[14px] text-[var(--theme-fg-base)] font-medium">{category.name}</span>
                    <label onClick={(e: React.MouseEvent): void => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={cookieConsent[category.id]}
                        onChange={(): void => toggle(category)}
                        disabled={category.id === COOKIE_CATEGORIES.ESSENTIAL}
                      />
                      <div className={`border w-[42px] h-[26.4px] rounded-full transition-all ${category.id === COOKIE_CATEGORIES.ESSENTIAL ? "bg-[var(--theme-bg-base)] border-[var(--theme-text-subtle)] cursor-not-allowed" : "bg-[var(--theme-bg-muted)] border-[var(--theme-text-subtle)] peer-checked:bg-[var(--theme-accent-blue)] peer-checked:border-[var(--theme-accent-blue)] cursor-pointer"}`}>
                        <div className={`w-[24.6px] h-[24.6px] rounded-full shadow transition-transform ${category.id === COOKIE_CATEGORIES.ESSENTIAL ? "bg-[var(--theme-bg-muted-hover)]" : "bg-[#ffffff]"} ${cookieConsent[category.id] ? "translate-x-4" : "translate-x-0"}`} />
                      </div>
                    </label>
                  </div>
                  {expandedIds.includes(category.id) && (
                    <div className={`px-4 py-3 text-[14px] text-[var(--theme-text-muted)] border-[var(--theme-border-base)] ${index !== categories.length - 1 ? "border-b" : "border-t"}`}>
                      {category.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-between items-center border-t border-[var(--theme-border-base)] bg-[var(--theme-bg-dark)] p-6 pb-0">
              <div className="flex flex-wrap gap-3">
                <button
                  className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[14px] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out"
                  onClick={(): void => {
                    handleDeny();
                    handleConsentClose();
                  }}
                >
                  {t("consentModal.deny")}
                </button>
                <button
                  className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[14px] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out"
                  onClick={(): void => {
                    handleAcceptAll();
                    handleConsentClose();
                  }}
                >
                  {t("consentModal.acceptAll")}
                </button>
              </div>
              <button
                className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[14px] text-[var(--theme-border-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-text-muted)] hover:border-[var(--theme-text-muted)] transition duration-200 ease-in-out"
                onClick={(): void => {
                  handleSave(cookieConsent);
                  handleConsentClose();
                }}
              >
                {t("consentModal.save")}
              </button>
            </div>
            <div className="text-[12px] pt-4 text-[var(--theme-text-muted)] bg-[var(--theme-bg-dark)] p-6 pt-0 rounded-[12px]">
              {t("consentModal.privacyPolicy")}{" "}
              <Link href="/" className="text-[var(--theme-fg-base)] hover:text-[var(--theme-text-muted)]">
                {t("consentModal.privacyPolicyLink")}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .consent-modal-translate-in {
            animation: consent-modal-translate-in 0.2s ease-out forwards;
          }

          @keyframes consent-modal-translate-in {
            from {
              transform: translateY(20px);
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
