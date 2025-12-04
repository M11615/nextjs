"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/app/i18n/client";
import { I18nInstance, StateSetter, THEME_KEYS, FALLBACK_MOBILE_L_SCREEN_WIDTH, FALLBACK_MOBILE_M_SCREEN_WIDTH, FALLBACK_MOBILE_S_SCREEN_WIDTH, MAIN_CONTENT_ID } from "@/app/lib/constants";
import { ResponsiveContextValue, useResponsiveContext } from "./ResponsiveContext";

export default function Main(): React.ReactNode {
  const { t }: I18nInstance = useT("app", {});
  const { width, isTabletScreen, isMobileScreen, actualTheme }: ResponsiveContextValue = useResponsiveContext();
  const [visibleMedia, setVisibleMedia]: StateSetter<boolean> = useState<boolean>(false);
  const [showVideo, setShowVideo]: StateSetter<boolean> = useState<boolean>(false);
  const [hovered, setHovered]: StateSetter<boolean> = useState<boolean>(false);
  const [copied, setCopied]: StateSetter<boolean> = useState<boolean>(false);
  const [elementsInfo, setElementsInfo]: StateSetter<Record<string, HTMLElement | null>> = useState<Record<string, HTMLElement | null>>({});
  const titleRef: React.RefObject<HTMLHeadingElement | null> = useRef<HTMLHeadingElement>(null);
  const descriptionRef: React.RefObject<HTMLParagraphElement | null> = useRef<HTMLParagraphElement>(null);
  const linkRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const commandRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const horizontalOffset: number = isMobileScreen ? 64 : 128;
  const verticalOffset: number = 128;
  const command: string = "npx create-next-app@latest";

  useEffect((): void => {
    setVisibleMedia(true);
    setElementsInfo({
      title: titleRef.current,
      description: descriptionRef.current,
      link: linkRef.current,
      command: commandRef.current,
    });
  }, []);

  const handleMouseEnter: () => void = (): void => {
    setHovered(true);
  };

  const handleMouseLeave: () => void = (): void => {
    setHovered(false);
  };

  const handleCopy: () => void = (): void => {
    try {
      navigator.clipboard.writeText(command)
        .then((): void => {
          setCopied(true);
          setTimeout((): void => {
            setCopied(false);
          }, 1500);
        })
        .catch((): void => { });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <>
      <main
        id={MAIN_CONTENT_ID}
        className={`relative flex flex-col w-full items-center ${isMobileScreen ? "pt-[115px]" : "pt-[130px]"} bg-[var(--theme-bg-base)]`}
      >
        <div
          className={`${width > FALLBACK_MOBILE_L_SCREEN_WIDTH ? "w-[60%]" : "w-full"}`}
          style={{
            paddingBottom: `${isTabletScreen ? `${width * (576 / 1024) + 130}px` : "730px"}`
          }}
        >
          <div className={`flex flex-wrap tracking-[-0.02em] items-center text-center justify-center gap-2 mx-auto min-w-[255px] ${width > FALLBACK_MOBILE_L_SCREEN_WIDTH ? "w-full" : "w-0"}`}>
            <span className="text-[var(--theme-primary-light)] bg-[var(--theme-accent-blue-bg)] px-[12px] py-[2px] rounded-full font-medium text-[14px]">
              {t("main.new")}
            </span>
            <span className="text-[var(--theme-fg-base)] text-[20px] leading-[1.3] font-semibold">
              {t("main.confAnnouncement")}
            </span>
          </div>
          <div className="inline-flex justify-center gap-[10px] mt-[15px] w-full">
            <Link
              href="/"
              className={`whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[14px] text-[var(--theme-border-base)] font-medium pl-[12px] pr-[18px] py-[5px] rounded-full hover:bg-[var(--theme-bg-base-hover)] hover:border-[var(--theme-bg-base-hover)] transition duration-200 ease-in-out`}
            >
              {t("main.findOutMore")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                strokeLinejoin="round"
                className="inline relative left-[10px]"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M6.74999 3.93933L7.28032 4.46966L10.1035 7.29288C10.4941 7.68341 10.4941 8.31657 10.1035 8.7071L7.28032 11.5303L6.74999 12.0607L5.68933 11L6.21966 10.4697L8.68933 7.99999L6.21966 5.53032L5.68933 4.99999L6.74999 3.93933Z" />
              </svg>
            </Link>
            <Link
              href="/"
              className={`whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[14px] text-[var(--theme-fg-base)] font-medium pl-[12px] pr-[18px] py-[5px] rounded-full hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out`}
            >
              {t("main.watchRecap")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                strokeLinejoin="round"
                className="inline relative left-[10px]"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M6.74999 3.93933L7.28032 4.46966L10.1035 7.29288C10.4941 7.68341 10.4941 8.31657 10.1035 8.7071L7.28032 11.5303L6.74999 12.0607L5.68933 11L6.21966 10.4697L8.68933 7.99999L6.21966 5.53032L5.68933 4.99999L6.74999 3.93933Z" />
              </svg>
            </Link>
          </div>
          {visibleMedia && (
            <div
              onClick={(): void => setShowVideo(true)}
              className={`group absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full max-w-[1024px] mt-[40px] ${width > FALLBACK_MOBILE_L_SCREEN_WIDTH ? "px-0" : "px-[30px]"} select-none`}
            >
              {!showVideo ? (
                actualTheme === THEME_KEYS.LIGHT || actualTheme === THEME_KEYS.DARK ? (
                  <>
                    <Image
                      src={`/assets/livestream-poster-conf-2025-${actualTheme}.png`}
                      alt="Next.js Conf 25 Livestream"
                      width={1024}
                      height={576}
                      priority
                      className="cursor-pointer"
                    />
                    <div className={`${isMobileScreen ? "scale-100" : "scale-135"} absolute flex items-center justify-center w-[72px] h-[72px] cursor-pointer border border-[var(--theme-border-base)] bg-transparent text-[var(--theme-fg-base)] rounded-full pl-[3px] group-hover:bg-[var(--theme-bg-muted)] group-hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" strokeLinejoin="round" className="scale-145">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.5528 7.77638C14.737 7.86851 14.737 8.13147 14.5528 8.2236L1.3618 14.8191C1.19558 14.9022 1 14.7813 1 14.5955L1 1.4045C1 1.21865 1.19558 1.09778 1.3618 1.18089L14.5528 7.77638Z" />
                      </svg>
                    </div>
                  </>
                ) : null
              ) : (
                <div className="aspect-video w-full bg-[var(--theme-bg-muted)]">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`w-full relative z-10 text-center ${isMobileScreen ? `${width < FALLBACK_MOBILE_S_SCREEN_WIDTH ? "px-[15px]" : "px-[30px]"}` : `${isTabletScreen ? "px-[80px]" : ""}`}`}>
          <div
            className="absolute main-width-top h-2 border-t border-dashed border-[#666666] opacity-0"
            style={{
              top: `${elementsInfo.title?.offsetTop}px`,
              left: `${(elementsInfo.title?.offsetLeft ?? 0) - horizontalOffset / 2}px`,
              width: `${(elementsInfo.title?.offsetWidth ?? 0) + horizontalOffset}px`,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className="absolute main-width-top h-2 border-t border-dashed border-[#666666] opacity-0"
            style={{
              top: `${(elementsInfo.title?.offsetTop ?? 0) + (elementsInfo.title?.offsetHeight ?? 0)}px`,
              left: `${(elementsInfo.title?.offsetLeft ?? 0) - horizontalOffset / 2}px`,
              width: `${(elementsInfo.title?.offsetWidth ?? 0) + horizontalOffset}px`,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className="absolute main-width-bottom h-2 border-t border-dashed border-[#666666] opacity-0"
            style={{
              top: `${(elementsInfo.description?.offsetTop ?? 0) + (elementsInfo.description?.offsetHeight ?? 0)}px`,
              left: `${(elementsInfo.title?.offsetLeft ?? 0) - horizontalOffset / 2}px`,
              width: `${(elementsInfo.title?.offsetWidth ?? 0) + horizontalOffset}px`,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className="absolute main-width-bottom h-2 border-t border-dashed border-[#666666] opacity-0"
            style={{
              top: `${(elementsInfo.command?.offsetTop ?? 0) + (elementsInfo.command?.offsetHeight ?? 0)}px`,
              left: `${(elementsInfo.title?.offsetLeft ?? 0) - horizontalOffset / 2}px`,
              width: `${(elementsInfo.title?.offsetWidth ?? 0) + horizontalOffset}px`,
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)",
              maskImage: "linear-gradient(to right, transparent 0%, #666666 5%, #666666 95%, transparent 100%)"
            }}
          />
          <div
            className="absolute w-2 border-l border-dashed border-[#666666] main-height-long opacity-0"
            style={{
              top: `${(elementsInfo.title?.offsetTop ?? 0) - verticalOffset / 2}px`,
              left: `${elementsInfo.title?.offsetLeft}px`,
              height: `${(elementsInfo.title?.offsetHeight ?? 0) + (elementsInfo.description?.offsetHeight ?? 0) + (elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset}px`
            }}
          />
          {!isMobileScreen && (
            <>
              <div
                className="absolute w-2 border-l border-dashed border-[#666666] main-height-short opacity-0"
                style={{
                  top: `${(elementsInfo.title?.offsetTop ?? 0) - verticalOffset / 2}px`,
                  left: `${elementsInfo.link?.offsetLeft}px`,
                  height: `${verticalOffset / 2}px`,
                  WebkitMaskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className="absolute w-2 border-l border-dashed border-[#666666] main-height-medium opacity-0"
                style={{
                  top: `${(elementsInfo.description?.offsetTop ?? 0) + (elementsInfo.description?.offsetHeight ?? 0)}px`,
                  left: `${elementsInfo.link?.offsetLeft}px`,
                  height: `${(elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset / 2}px`,
                  WebkitMaskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className="absolute w-2 border-l border-dashed border-[#666666] main-height-short opacity-0"
                style={{
                  top: `${(elementsInfo.title?.offsetTop ?? 0) - verticalOffset / 2}px`,
                  left: `${(elementsInfo.link?.offsetLeft ?? 0) + (elementsInfo.link?.offsetWidth ?? 0)}px`,
                  height: `${verticalOffset / 2}px`,
                  WebkitMaskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to top, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
              <div
                className="absolute w-2 border-l border-dashed border-[#666666] main-height-medium opacity-0"
                style={{
                  top: `${(elementsInfo.description?.offsetTop ?? 0) + (elementsInfo.description?.offsetHeight ?? 0)}px`,
                  left: `${(elementsInfo.link?.offsetLeft ?? 0) + (elementsInfo.link?.offsetWidth ?? 0)}px`,
                  height: `${(elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset / 2}px`,
                  WebkitMaskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, #666666 0%, #666666 5%, #666666 95%, transparent 100%)"
                }}
              />
            </>
          )}
          <div
            className="absolute w-2 border-l border-dashed border-[#666666] main-height-long opacity-0"
            style={{
              top: `${(elementsInfo.title?.offsetTop ?? 0) - verticalOffset / 2}px`,
              left: `${(elementsInfo.title?.offsetLeft ?? 0) + (elementsInfo.title?.offsetWidth ?? 0)}px`,
              height: `${(elementsInfo.title?.offsetHeight ?? 0) + (elementsInfo.description?.offsetHeight ?? 0) + (elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset}px`
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="none"
            stroke="#666666"
            strokeDasharray="2 2"
            className="absolute main-opacity-in opacity-0"
            style={{
              top: `calc(${elementsInfo.title?.offsetTop}px - 37.5px)`,
              left: `calc(${elementsInfo.title?.offsetLeft}px - 37.5px)`
            }}
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
              className="absolute rotate-180 main-opacity-in opacity-0"
              style={{
                top: `calc(${(elementsInfo.command?.offsetTop ?? 0) + (elementsInfo.command?.offsetHeight ?? 0)}px - 37.5px)`,
                left: `calc(${(elementsInfo.link?.offsetLeft ?? 0) + (elementsInfo.link?.offsetWidth ?? 0)}px - 37.5px)`
              }}
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
          <h1 ref={titleRef} className={`font-semibold text-[var(--theme-fg-base)] max-w-[1165px] mx-auto py-[5px] ${isTabletScreen ? `${isMobileScreen ? `text-[48px] tracking-[-0.04em] leading-[1.1] ${width > FALLBACK_MOBILE_L_SCREEN_WIDTH ? "px-[90px]" : `${width < FALLBACK_MOBILE_S_SCREEN_WIDTH ? "px-[15px]" : "px-[30px]"}`} py-[20px]` : "text-[50px] tracking-[-0.06em]"}` : "text-[76px] tracking-[-0.05em]"}`}>
            {t("main.title")}
          </h1>
          <p ref={descriptionRef} className={`text-[var(--theme-text-muted)] max-w-3xl mx-auto py-[30px] ${isTabletScreen ? `${isMobileScreen ? `text-[16px] tracking-[-0.02em] leading-[1.6] ${width < FALLBACK_MOBILE_S_SCREEN_WIDTH ? "px-[5px]" : "px-[30px]"}` : "text-[20px] tracking-[-0.02em] leading-[1.8]"}` : "text-xl tracking-[-0.01em] leading-[1.8]"}`}>
            {t("main.descriptionStart")}{" "}
            <span className="text-[var(--theme-fg-base)] font-medium">{t("main.descriptionHighlight")}</span>{" "}
            {t("main.descriptionEnd")}
          </p>
          <div ref={linkRef} className={`inline-flex justify-center gap-4 ${isMobileScreen ? "w-full" : "px-[35px]"} ${width > FALLBACK_MOBILE_M_SCREEN_WIDTH ? "pt-[45px]" : "pt-[25px]"}`}>
            <Link
              href="/chat"
              className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-base text-[var(--theme-border-base)] font-medium px-5 py-3 rounded-lg hover:bg-[var(--theme-bg-base-hover)] hover:border-[var(--theme-bg-base-hover)] transition duration-200 ease-in-out"
            >
              {t("main.started")}
            </Link>
            <Link
              href="/"
              className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-base text-[var(--theme-fg-base)] font-medium px-5 py-3 rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out"
            >
              {t("main.learn")}
            </Link>
          </div>
          <div ref={commandRef} className={`flex justify-center gap-2 pt-[20px] ${width > FALLBACK_MOBILE_M_SCREEN_WIDTH ? "pb-[45px]" : "pb-[25px]"}`}>
            <div
              className="relative pl-[15px] pr-[15px] cursor-copy text-[var(--theme-text-muted)]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCopy}
            >
              <p className="font-[family-name:var(--font-geist-mono)] whitespace-nowrap overflow-hidden text-ellipsis text-sm tracking-tighter">
                <span>▲{" "}</span>
                <span>~{" "}{command}</span>
                <span className={`absolute top-[2px] pl-[12px] transition duration-200 ease-in-out ${hovered ? "opacity-100" : "opacity-0"}`}>
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
          .main-width {
            animation-name: main-width;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: 0.15s;
          }

          .main-width-top {
            animation-name:  main-width;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: 0.15s;
          }

          .main-width-bottom {
            animation-name:  main-width;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.3s);
          }

          .main-height-long {
            animation-name: main-height-long;
            animation-duration: 1.08s;
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.1s);
          }

          .main-height-short {
            animation-name: main-height-short;
            animation-duration: calc(1.08s / 2);
            animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(0.15s + 0.1s);
          }

          .main-height-medium {
            animation-name: main-height-medium;
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

          @keyframes main-width {
            from {
              width: 0;
              opacity: 1;
            }
            to {
              width: ${(elementsInfo.title?.offsetWidth ?? 0) + horizontalOffset}px;
              opacity: 0.3;
            }
          }

          @keyframes main-height-long {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: ${(elementsInfo.title?.offsetHeight ?? 0) + (elementsInfo.description?.offsetHeight ?? 0) + (elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset};
              opacity: 0.3;
            }
          }

          @keyframes main-height-short {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: ${verticalOffset / 2};
              opacity: 0.3;
            }
          }

          @keyframes main-height-medium {
            from {
              height: 0;
              opacity: 1;
            }
            to {
              height: ${(elementsInfo.link?.offsetHeight ?? 0) + (elementsInfo.command?.offsetHeight ?? 0) + verticalOffset / 2}px;
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
