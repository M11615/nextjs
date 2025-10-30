"use client";

import { useEffect, useState } from "react";
import { useT } from "@/app/i18n/client";
import { OptionalI18n, StateSetter, COOKIE_KEYS, FALLBACK_MOBILE_L_SCREEN_WIDTH } from "@/app/lib/constants";
import { modalManager } from "@/app/lib/modalManager";
import { getCookie } from "@/app/lib/cookies";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";
import ConsentModal, { handleDeny, handleAcceptAll } from "./ConsentModal";

export default function CookieBanner(): React.ReactNode {
  const { t }: OptionalI18n = useT("app", {});
  const { width }: ResponsiveContextValue = useResponsiveContext();
  const [visible, setVisible]: StateSetter<boolean> = useState<boolean>(false);
  const [isConsentOpen, setIsConsentOpen]: StateSetter<boolean> = useState<boolean>(false);
  const consentModalId: string = CookieBanner.name.concat(ConsentModal.name);

  useEffect((): void => {
    setVisible(!getCookie(COOKIE_KEYS.CONSENT));
    modalManager.register(consentModalId, {
      open: handleConsentOpen,
      close: handleConsentClose
    });
  }, []);

  const handleConsentOpen = (): void => {
    document.body.style.overflow = "hidden";
    setVisible(false);
    setIsConsentOpen(true);
  };

  const handleConsentClose = (): void => {
    document.body.style.overflow = "";
    setVisible(false);
    setIsConsentOpen(false);
  };

  if (!visible && !isConsentOpen) return null;

  return (
    <>
      <ConsentModal
        isConsentOpen={isConsentOpen}
        handleConsentClose={(): void => modalManager.close(consentModalId)}
      />

      {visible && (
        <>
          <div className="fixed bottom-4 left-4 right-4 w-fit p-4 bg-[var(--theme-bg-dark)] shadow border border-[var(--theme-border-base)] rounded-2xl z-80 cookie-banner-translate-in font-[family-name:var(--font-geist-sans)]">
            <p className={`${width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "w-full" : "w-[380px]"} text-[var(--theme-fg-base)] text-[14px] mb-3 mr-2`}>
              {t("cookieBanner.message")}
            </p>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className={`flex flex-wrap gap-[12px]`}>
                <button
                  className={`whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-full text-[14px] hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out`}
                  onClick={(): void => {
                    handleDeny();
                    modalManager.close(consentModalId);
                  }}>
                  {t("cookieBanner.deny")}
                </button>
                <button
                  className={`whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-full text-[14px] hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out`}
                  onClick={(): void => {
                    handleAcceptAll();
                    modalManager.close(consentModalId);
                  }}>
                  {t("cookieBanner.acceptAll")}
                </button>
              </div>
              <button
                className={`whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[var(--theme-border-base)] font-medium px-3 py-[5px] rounded-full text-[14px] hover:bg-[var(--theme-text-muted)] hover:border-[var(--theme-text-muted)] transition duration-200 ease-in-out`}
                onClick={(): void => modalManager.open(consentModalId)}
              >
                {t("cookieBanner.settings")}
              </button>
            </div>
          </div>

          <style>
            {`
              .cookie-banner-translate-in {
                animation: cookie-banner-translate-in 0.6s ease-out forwards;
              }

              @keyframes cookie-banner-translate-in {
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
      )}
    </>
  );
}
