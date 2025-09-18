"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/i18n/client";
import { OptionalI18n, FALLBACK_MOBILE_M_SCREEN_WIDTH } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";

export default function Main(): React.ReactNode {
  const { t, i18n }: OptionalI18n = useT("app", {});
  const [hydrated, setHydrated] = useState<boolean>(false);
  const { width, isTabletScreen, isMobileScreen }: ResponsiveContextValue = useResponsiveContext();
  const [hovered, setHovered] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const command: string = "npx create-next-app@latest";

  useEffect((): void => {
    setHydrated(true);
  }, []);

  const handleMouseEnter = (): void => {
    setHovered(true);
  };

  const handleMouseLeave = (): void => {
    setHovered(false);
  };

  const handleCopy = (): void => {
    try {
      navigator.clipboard.writeText(command)
        .then((): void => {
          setCopied(true);
          setTimeout((): void => {
            setCopied(false);
          }, 1500);
        })
        .catch((): void => { });
    } catch { }
  };

  if (!hydrated) return null;

  return (
    <>
      <main className={`relative flex flex-col ${isMobileScreen ? "w-[100vw]" : "w-full"} items-center pt-[60px] pb-[130px] bg-[var(--theme-bg-base)]`}>
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl z-0">
          <div
            className={`absolute ${isTabletScreen ? `${isMobileScreen ? "top-[-1%] left-[-2%] w-[104%] main-width-104-top" : "top-[15%] left-[2%] w-[96%] main-width-96"}` : "top-[14%] left-[-2%] w-[104%] main-width-104-top"} h-px border-t border-dashed border-[#666666] opacity-0`}
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className={`absolute ${isTabletScreen ? `${isMobileScreen ? "top-[30%] left-[-2%] w-[104%] main-width-104-top" : "top-[31.5%] left-[2%] w-[96%] main-width-96"}` : "top-[34%] left-[-2%] w-[104%] main-width-104-top"} h-px border-t border-dashed border-[#666666] opacity-0`}
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className={`absolute ${isTabletScreen ? `${isMobileScreen ? "bottom-[45.5%] left-[-2%] w-[104%] main-width-104-bottom" : "bottom-[43%] left-[2%] w-[96%] main-width-96"}` : "bottom-[41%] left-[-2%] w-[104%] main-width-104-bottom"} h-px border-t border-dashed border-[#666666] opacity-0`}
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className={`absolute ${isTabletScreen ? `${isMobileScreen ? "bottom-[25%] left-[-2%] w-[104%] main-width-104-bottom" : "bottom-[14.4%] left-[2%] w-[96%] main-width-96"}` : "bottom-[13.4%] left-[-2%] w-[104%] main-width-104-bottom"} h-px border-t border-dashed border-[#666666] opacity-0`}
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div className={`absolute ${isMobileScreen ? "top-[-8%]" : "top-[3%]"} ${isTabletScreen ? "left-[7.5%]" : "left-[2.5%] border-[1.5px]"} h-[96%] w-px border-l border-dashed border-[#666666] main-height-96 opacity-0`} />
          {!isMobileScreen && (
            <>
              <div
                className={`absolute ${isTabletScreen ? "top-[6%] left-[32.2%]" : "top-[5%] left-[36.8%]"} h-[9%] w-px border-l border-dashed border-[#666666] main-height-9 opacity-0`}
                style={{
                  WebkitMaskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className={`absolute ${isTabletScreen ? "top-[57%] left-[31%]" : "top-[59%] left-[36%]"} h-[40%] w-px border-l border-[1.5px] border-dashed border-[#666666] main-height-40 opacity-0`}
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className={`absolute ${isTabletScreen ? "top-[6%] right-[32.2%]" : "top-[5%] right-[36.8%]"} h-[9%] w-px border-l border-dashed border-[#666666] main-height-9 opacity-0`}
                style={{
                  WebkitMaskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className={`absolute ${isTabletScreen ? "top-[57%] right-[31%]" : "top-[59%] right-[36%]"} h-[40%] w-px border-l border-[1.5px] border-dashed border-[#666666] main-height-40 opacity-0`}
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
            </>
          )}
          <div className={`absolute ${isMobileScreen ? "top-[-8%]" : "top-[3%]"} ${isTabletScreen ? "right-[7.5%]" : "right-[2.5%] border-[1.5px]"} h-[96%] w-px border-l border-dashed border-[#666666] main-height-96 opacity-0`} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="none"
            stroke="#666666"
            strokeDasharray="2 2"
            className={`absolute ${isTabletScreen ? `${isMobileScreen ? "top-[calc(-1%-37.5px)] left-[calc(7.5%-37.5px)]" : "top-[calc(15%-37.5px)] left-[calc(7.5%-37.5px)]"}` : "top-[calc(14%-37.5px)] left-[calc(2.5%-37.5px)]"} main-opacity-in opacity-0`}
            transform={`${isMobileScreen ? "scale(0.33)" : "scale(1)"}`}
          >
            <path d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74" />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="translate(37.5 37.5) rotate(90) scale(36.5)" gradientUnits="userSpaceOnUse" id="paint0_angular_25_2122" r="1">
                <stop />
                <stop offset="0.5" stopOpacity="0.34" />
                <stop offset="1" />
              </radialGradient>
            </defs>
          </svg>
          {!isMobileScreen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              stroke="#666666"
              strokeDasharray="2 2"
              className={`absolute ${isTabletScreen ? "bottom-[calc(14.4%-37.5px)] right-[calc(31%-37.5px)]" : "bottom-[calc(13.4%-37.5px)] right-[calc(36%-37.5px)]"} rotate-180 main-opacity-in opacity-0`}
              transform={`${isMobileScreen ? "scale(0.33)" : "scale(1)"}`}
            >
              <path d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74" />
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(37.5 37.5) rotate(90) scale(36.5)" gradientUnits="userSpaceOnUse" id="paint0_angular_25_2122" r="1">
                  <stop />
                  <stop offset="0.5" stopOpacity="0.34" />
                  <stop offset="1" />
                </radialGradient>
              </defs>
            </svg>
          )}
        </div>
        <div className={`w-full max-w-screen-xl relative ${isMobileScreen ? "bottom-[65px]" : ""} z-10 text-center ${isTabletScreen ? `space-y-7 ${isMobileScreen ? "pt-5" : "pt-4"}` : "space-y-3"}`}>
          <div
            style={isMobileScreen ? {
              paddingLeft: `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? width * 0.06 : width * 0.14}px`,
              paddingRight: `${width < FALLBACK_MOBILE_M_SCREEN_WIDTH ? width * 0.06 : width * 0.14}px`
            } : undefined}
          >
            <h1 className={`font-extrabold bg-gradient-to-b from-[var(--theme-fg-light)]/95 to-[var(--theme-fg-dark)] bg-clip-text text-transparent ${isTabletScreen ? `${isMobileScreen ? "text-[48px] tracking-[-0.04em] leading-[1.1] pb-6" : "text-[50px] tracking-[-0.06em] leading-[2.4] pb-2"}` : "text-[76px] tracking-[-0.05em] leading-[2.4]"}`}>
              {t("main.title")}
            </h1>
            <p className={`text-[var(--theme-text-muted)] max-w-3xl mx-auto ${isTabletScreen ? `${isMobileScreen ? "text-[16px] tracking-[-0.02em] leading-[1.6] pt-6" : "text-[20px] tracking-[-0.02em] leading-[1.8] pt-5"}` : "text-xl tracking-[-0.01em] leading-[1.8] pt-2"}`}>
              {t("main.descriptionStart")}{" "}
              <span className="text-[var(--theme-fg-base)] font-medium">{t("main.descriptionHighlight")}</span>{" "}
              {t("main.descriptionEnd")}
            </p>
          </div>
          <div className={`flex justify-center gap-4 ${isMobileScreen ? "mt-14" : "mt-20"} mb-4`}>
            <Link
              href={`/${i18n.language}`}
              className={`cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-base text-[var(--theme-border-base)] font-medium px-5 py-3 rounded-lg hover:bg-[var(--theme-text-muted)] hover:border-[var(--theme-text-muted)] transition duration-200 ease-in-out`}
            >
              {t("main.started")}
            </Link>
            <Link
              href={`/${i18n.language}`}
              className={`cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-base text-[var(--theme-fg-base)] font-medium px-5 py-3 rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out`}
            >
              {t("main.learn")}
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            <div
              className="relative pl-[15px] pr-[15px] cursor-copy text-[var(--theme-text-muted)]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCopy}
            >
              <p className="font-[family-name:var(--font-geist-mono)] text-sm tracking-tighter">
                <span>▲{" "}</span>
                <span>~{" "}{command}</span>
                <span className={`absolute top-[2px] pl-[15px] transition duration-200 ease-in-out ${hovered ? "opacity-100" : "opacity-0"}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    strokeLinejoin="round"
                    className={`absolute transition-opacity duration-200 ease-in-out ${hovered && copied ? "opacity-100" : "opacity-0"}`}
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    strokeLinejoin="round"
                    className={`absolute transition-opacity duration-200 ease-in-out ${hovered && !copied ? "opacity-100" : "opacity-0"}`}
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" />
                  </svg>
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>
        {`
          .main-width-96 {
            animation-name: main-width-96;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: 0.15s;
          }

          .main-width-104-top {
            animation-name:  main-width-104;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: 0.15s;
          }

          .main-width-104-bottom {
            animation-name:  main-width-104;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.3s);
          }

          .main-height-96 {
            animation-name: main-height-96;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.1s);
          }

          .main-height-9 {
            animation-name: main-height-9;
            animation-duration: calc(1.08s / 2);
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.1s);
          }

          .main-height-40 {
            animation-name: main-height-40;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.1s);
          }

          .main-opacity-in {
            animation-name: main-opacity-in;
            animation-duration: calc(1.08s / 2);
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.4s);
          }

          @keyframes main-width-96 {
            from {
              width: 0;
              opacity: 1;
            }
            to {
              width: 96%;
              opacity: 0.3;
            }
          }

          @keyframes main-width-104 {
            from {
              width: 0;
              opacity: 1;
            }
            to {
              width: 104%;
              opacity: 0.3;
            }
          }

          @keyframes main-height-96 {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: 96%;
              opacity: 0.3;
            }
          }

          @keyframes main-height-9 {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: 9%;
              opacity: 0.3;
            }
          }

          @keyframes main-height-40 {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: 40%;
              opacity: 0.3;
            }
          }

          @keyframes main-opacity-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 0.3;
            }
          }
        `}
      </style>
    </>
  );
}
