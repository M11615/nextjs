"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/i18n/client";
import { RequiredI18n, StateSetter, COOKIE_KEYS, FALLBACK_THEME, FALLBACK_MOBILE_M_SCREEN_WIDTH } from "@/app/lib/constants";
import { getCookie } from "@/app/lib/cookies";
import { createSubscription } from "@/app/services/v1/subscription";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";
import ConsentModal from "./ConsentModal";
import CookieBanner from "./CookieBanner";
import ThemeSwitcher from "./ThemeSwitcher";

interface NavLink {
  id: number;
  href: string;
  label: string;
}

export default function Footer(): React.ReactNode {
  const { t, i18n }: RequiredI18n = useT("app", {});
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const { width, isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();
  const [isConsentOpen, setIsConsentOpen]: StateSetter<boolean> = useState<boolean>(false);
  const [theme, setTheme]: StateSetter<string> = useState<string>(FALLBACK_THEME);
  const [isSubmitting, setIsSubmitting]: StateSetter<boolean> = useState<boolean>(false);
  const [submitted, setSubmitted]: StateSetter<boolean> = useState<boolean>(false);
  const [subscriptionEmail, setSubscriptionEmail]: StateSetter<string> = useState<string>("");
  const [renderKey, setRenderKey]: StateSetter<number> = useState<number>(0);
  const resourcesLinks: NavLink[] = [
    { id: 1, href: `/${i18n.language}`, label: t("footer.docs") },
    { id: 2, href: `/${i18n.language}`, label: t("footer.supportPolicy") },
    { id: 3, href: `/${i18n.language}`, label: t("footer.learn") },
    { id: 4, href: `/${i18n.language}`, label: t("footer.showcase") },
    { id: 5, href: `/${i18n.language}`, label: t("footer.blog") },
    { id: 6, href: `/${i18n.language}`, label: t("footer.team") },
    { id: 7, href: `/${i18n.language}`, label: t("footer.analytics") },
    { id: 8, href: `/${i18n.language}`, label: t("footer.nextjsConf") },
    { id: 9, href: `/${i18n.language}`, label: t("footer.previews") }
  ];
  const moreLinks: NavLink[] = [
    { id: 1, href: `/${i18n.language}`, label: t("footer.nextjsCommerce") },
    { id: 2, href: `/${i18n.language}`, label: t("footer.contactSales") },
    { id: 3, href: `/${i18n.language}`, label: t("footer.community") },
    { id: 4, href: `/${i18n.language}`, label: t("footer.github") },
    { id: 5, href: `/${i18n.language}`, label: t("footer.releases") },
    { id: 6, href: `/${i18n.language}`, label: t("footer.telemetry") },
    { id: 7, href: `/${i18n.language}`, label: t("footer.governance") },
    { id: 8, href: `/${i18n.language}/locale`, label: t("footer.locale") }
  ];
  const aboutLinks: NavLink[] = [
    { id: 1, href: `/${i18n.language}`, label: t("footer.nextjsVercel") },
    { id: 2, href: `/${i18n.language}`, label: t("footer.openSourceSoftware") },
    { id: 3, href: `/${i18n.language}`, label: t("footer.github") },
    { id: 4, href: `/${i18n.language}`, label: t("footer.bluesky") },
    { id: 5, href: `/${i18n.language}`, label: t("footer.x") }
  ];
  const legalLinks: NavLink[] = [
    { id: 1, href: `/${i18n.language}`, label: t("footer.privacyPolicy") }
  ];
  const SocialLinks: React.ReactNode = (
    <div className="flex flex-row items-center gap-x-3">
      <Link
        href={`/${i18n.language}`}
        className="text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)] transition duration-200 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" strokeLinejoin="round">
          <g clipPath="url(#clip0_872_3147)">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z" />
          </g>
          <defs>
            <clipPath id="clip0_872_3147">
              <rect width="16" height="16" />
            </clipPath>
          </defs>
        </svg>
      </Link>
      <div className="border-l border-[var(--theme-text-subtle)] w-[1px] h-[20px]" />
      <Link
        href={`/${i18n.language}`}
        className="text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)] transition duration-200 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" strokeLinejoin="round">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z" />
        </svg>
      </Link>
      <div className="border-l border-[var(--theme-text-subtle)] w-[1px] h-[20px]" />
      <Link
        href={`/${i18n.language}`}
        className="text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)] transition duration-200 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" strokeLinejoin="round">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.47 1.95A19 19 0 0 1 8 7.62c.73-1.5 2.7-4.3 4.53-5.67C13.86.95 16 .19 16 2.63c0 .5-.28 4.1-.44 4.7-.58 2.03-2.66 2.55-4.5 2.24 3.23.55 4.05 2.38 2.27 4.2-3.37 3.46-4.85-.87-5.23-1.98q-.1-.32-.1-.22 0-.1-.1.22c-.38 1.11-1.86 5.44-5.23 1.98-1.78-1.82-.96-3.65 2.28-4.2C3.1 9.89 1 9.37.45 7.32A48 48 0 0 1 0 2.63C0 .2 2.15.96 3.47 1.95" />
        </svg>
      </Link>
    </div>
  );

  useEffect((): void => {
    setTheme(getCookie(COOKIE_KEYS.THEME) || FALLBACK_THEME);
    setHydrated(true);
  }, []);

  const handleConsentOpen = (): void => {
    setIsConsentOpen(true);
  };

  const handleConsentClose = (): void => {
    setIsConsentOpen(false);
  };

  const handleSubscriptionEmailChange = (e: React.ChangeEvent) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setSubscriptionEmail(target.value);
  };

  const handleSubscriptionEmailSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setIsSubmitting(true);
    setRenderKey(renderKey < 10 ? renderKey + 1 : 0);
    const response: Response = await createSubscription({
      email: subscriptionEmail.trim().toLowerCase()
    });
    if (response.ok) {
      setSubmitted(true);
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <ConsentModal
        isConsentOpen={isConsentOpen}
        handleConsentClose={handleConsentClose}
      />

      {!isConsentOpen && (
        <CookieBanner />
      )}

      <footer className={`flex flex-wrap ${isMobileScreen ? "w-[100vw]" : "w-full"} py-[33px] items-center justify-center bg-[var(--theme-bg-base)] border-t border-[var(--theme-border-base)]`}>
        <div className={`w-full max-w-screen-xl flex flex-col gap-[55px] ${isTabletScreen ? "px-[25px]" : "px-[40px]"}`}>
          <div className={`grid ${isTabletScreen ? `${isMobileScreen ? "grid-cols-[1fr]" : "grid-cols-[1fr_6.5fr]"}` : "grid-cols-[1fr_6fr]"}`}>
            <div className={`text-[var(--theme-fg-base)] ${isMobileScreen ? "pb-8" : ""}`}>
              <div className={`flex items-center ${isMobileScreen ? "flex-row items-center justify-between pr-[8px]" : "flex-row items-center"} ${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "w-[85vw]" : "w-full"}`}>
                <Link
                  href={`/${i18n.language}`}
                  className="inline-flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 262 52" fill="currentColor">
                    <path d="M59.8019 52L29.9019 0L0.00190544 52H59.8019ZM89.9593 49.6328L114.947 2.36365H104.139L86.9018 36.6921L69.6647 2.36365H58.8564L83.8442 49.6328H89.9593ZM260.25 2.36365V49.6329H251.302V2.36365H260.25ZM210.442 31.99C210.442 28.3062 211.211 25.0661 212.749 22.2699C214.287 19.4737 216.431 17.321 219.181 15.812C221.93 14.3029 225.146 13.5484 228.828 13.5484C232.09 13.5484 235.026 14.2585 237.636 15.6788C240.245 17.0991 242.319 19.2074 243.857 22.0036C245.395 24.7998 246.187 28.2174 246.234 32.2564V34.3202H219.88C220.066 37.2496 220.928 39.5576 222.466 41.2442C224.051 42.8864 226.171 43.7075 228.828 43.7075C230.505 43.7075 232.043 43.2637 233.441 42.376C234.839 41.4883 235.888 40.2899 236.587 38.7808L245.745 39.4466C244.626 42.7754 242.529 45.4385 239.453 47.4358C236.377 49.4331 232.835 50.4317 228.828 50.4317C225.146 50.4317 221.93 49.6772 219.181 48.1681C216.431 46.6591 214.287 44.5064 212.749 41.7102C211.211 38.914 210.442 35.6739 210.442 31.99ZM237.006 28.6612C236.68 25.7762 235.771 23.668 234.28 22.3365C232.789 20.9606 230.971 20.2726 228.828 20.2726C226.358 20.2726 224.354 21.0049 222.816 22.4696C221.278 23.9343 220.322 25.9982 219.95 28.6612H237.006ZM195.347 22.3365C196.838 23.5348 197.77 25.1993 198.143 27.3297L207.371 26.8637C207.044 24.1562 206.089 21.8039 204.505 19.8066C202.92 17.8093 200.869 16.278 198.353 15.2128C195.883 14.1032 193.157 13.5484 190.174 13.5484C186.492 13.5484 183.277 14.3029 180.527 15.812C177.777 17.321 175.634 19.4737 174.096 22.2699C172.558 25.0661 171.789 28.3062 171.789 31.99C171.789 35.6739 172.558 38.914 174.096 41.7102C175.634 44.5064 177.777 46.6591 180.527 48.1681C183.277 49.6772 186.492 50.4317 190.174 50.4317C193.25 50.4317 196.046 49.8769 198.563 48.7673C201.079 47.6133 203.13 45.9933 204.714 43.9072C206.299 41.8212 207.254 39.38 207.58 36.5838L198.283 36.1844C197.957 38.5367 197.048 40.3565 195.557 41.6436C194.065 42.8864 192.271 43.5078 190.174 43.5078C187.285 43.5078 185.048 42.5091 183.463 40.5118C181.879 38.5145 181.086 35.6739 181.086 31.99C181.086 28.3062 181.879 25.4656 183.463 23.4683C185.048 21.471 187.285 20.4723 190.174 20.4723C192.178 20.4723 193.902 21.0937 195.347 22.3365ZM149.955 14.3457H158.281L158.522 21.1369C159.113 19.2146 159.935 17.7218 160.988 16.6585C162.514 15.1166 164.642 14.3457 167.371 14.3457H170.771V21.6146H167.302C165.359 21.6146 163.763 21.8789 162.514 22.4075C161.311 22.9362 160.386 23.7732 159.739 24.9186C159.137 26.064 158.837 27.5178 158.837 29.2799V49.6328H149.955V14.3457ZM111.548 22.2699C110.01 25.0661 109.241 28.3062 109.241 31.99C109.241 35.6739 110.01 38.914 111.548 41.7102C113.086 44.5064 115.229 46.6591 117.979 48.1681C120.729 49.6772 123.944 50.4317 127.626 50.4317C131.634 50.4317 135.176 49.4331 138.252 47.4358C141.327 45.4385 143.425 42.7754 144.543 39.4466L135.385 38.7808C134.686 40.2899 133.638 41.4883 132.24 42.376C130.842 43.2637 129.304 43.7075 127.626 43.7075C124.97 43.7075 122.849 42.8864 121.265 41.2442C119.727 39.5576 118.865 37.2496 118.678 34.3202H145.032V32.2564C144.986 28.2174 144.194 24.7998 142.656 22.0036C141.118 19.2074 139.044 17.0991 136.434 15.6788C133.824 14.2585 130.888 13.5484 127.626 13.5484C123.944 13.5484 120.729 14.3029 117.979 15.812C115.229 17.321 113.086 19.4737 111.548 22.2699ZM133.079 22.3365C134.57 23.668 135.479 25.7762 135.805 28.6612H118.748C119.121 25.9982 120.076 23.9343 121.614 22.4696C123.152 21.0049 125.156 20.2726 127.626 20.2726C129.77 20.2726 131.587 20.9606 133.079 22.3365Z" />
                  </svg>
                </Link>
                {isMobileScreen && SocialLinks}
              </div>
            </div>
            <div className={`grid ${isTabletScreen ? `${isMobileScreen ? `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "grid-cols-[1fr]" : "grid-cols-[1.2fr_1fr]"}` : "grid-cols-[5.5fr_7fr_8.5fr_7.5fr_12fr]"}` : "grid-cols-[6.5fr_7fr_8.5fr_7.5fr_9fr]"} text-[14px]`}>
              <div className={`${isMobileScreen ? "pb-10 max-w-[85vw]" : ""}`}>
                <p className="text-[var(--theme-fg-base)] font-medium mb-4">
                  {t("footer.resources")}
                </p>
                <nav className="flex flex-col items-start space-y-3">
                  {resourcesLinks.map(({ id, href, label }): React.ReactNode => (
                    <Link
                      key={id}
                      href={href}
                      className="transition duration-200 ease-in-out inline-flex text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className={`${isMobileScreen ? "pb-10 max-w-[85vw]" : ""}`}>
                <p className="text-[var(--theme-fg-base)] font-medium mb-4">
                  {t("footer.more")}
                </p>
                <nav className="flex flex-col items-start space-y-3">
                  {moreLinks.map(({ id, href, label }): React.ReactNode => (
                    <Link
                      key={id}
                      href={href}
                      className="transition duration-200 ease-in-out inline-flex text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className={`${isMobileScreen ? "pb-10 max-w-[85vw]" : ""}`}>
                <p className="text-[var(--theme-fg-base)] font-medium mb-4">
                  {t("footer.aboutVercel")}
                </p>
                <nav className="flex flex-col items-start space-y-3">
                  {aboutLinks.map(({ id, href, label }): React.ReactNode => (
                    <Link
                      key={id}
                      href={href}
                      className="transition duration-200 ease-in-out inline-flex text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className={`${isMobileScreen ? "pb-10 max-w-[85vw]" : ""}`}>
                <p className="text-[var(--theme-fg-base)] font-medium mb-4">
                  {t("footer.legal")}
                </p>
                <nav className="flex flex-col items-start space-y-3">
                  {legalLinks.map(({ id, href, label }): React.ReactNode => (
                    <Link
                      key={id}
                      href={href}
                      className="transition duration-200 ease-in-out inline-flex text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
                    >
                      {label}
                    </Link>
                  ))}
                  <button
                    className="cursor-pointer transition duration-200 ease-in-out inline-flex text-left text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
                    onClick={handleConsentOpen}
                  >
                    {t("footer.cookiePreferences")}
                  </button>
                </nav>
              </div>
              <div className={`${isMobileScreen ? "col-span-full w-[330px]" : ""}`}>
                <p className="text-[var(--theme-fg-base)] font-medium mb-4">{t("footer.subscribeTitle")}</p>
                <p className="mb-3 mr-2 text-[14px] text-[var(--theme-text-muted)]">
                  {t("footer.subscribeDescription")}
                </p>
                <div className={`relative ${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? "w-[85vw]" : "w-full"}`}>
                  {submitted ? (
                    <div className="pt-1 flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="var(--theme-success)" strokeLinejoin="round">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z" />
                      </svg>
                      <p className="text-[14px] text-[var(--theme-text-muted)]">
                        {t("footer.subscribeSuccess")}
                      </p>
                    </div>
                  ) : (
                    <form noValidate onSubmit={handleSubscriptionEmailSubmit} className="relative">
                      <input
                        key={renderKey}
                        className="w-full border border-[var(--theme-bg-muted)] bg-[var(--theme-bg-muted)] text-[14px] text-[var(--theme-fg-base)] placeholder-[var(--theme-text-muted)] px-[10px] pr-[90px] py-[5px] rounded-lg focus:outline-none focus:ring-2 ring-offset-2 focus:ring-[var(--theme-primary-light)] ring-offset-[var(--theme-bg-base)] disabled:opacity-50"
                        type="email"
                        name="subscriptionEmail"
                        value={subscriptionEmail}
                        onChange={handleSubscriptionEmailChange}
                        placeholder="you@domain.com"
                        required
                        disabled={isSubmitting}
                      />
                      <button
                        className="absolute top-1/2 right-[6px] -translate-y-1/2 transition duration-200 ease-in-out cursor-pointer border border-[var(--theme-text-subtle)] bg-[var(--theme-bg-dark)] text-[12px] text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)] font-medium px-[6px] py-[3px] rounded-[3px] ml-10"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {t("footer.subscribeButton")}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col items-start text-[14px] text-[var(--theme-text-muted)]">
              <span className={`${isMobileScreen ? "pb-0" : "pb-[15px]"} w-[150px]`}>© 2025 Vercel, Inc.</span>
              {!isMobileScreen && SocialLinks}
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher theme={theme} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
