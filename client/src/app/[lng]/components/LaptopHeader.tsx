"use client";

// import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TFunction } from "i18next";
import { ResponsiveContextValue } from "./ResponsiveContext";

interface LaptopHeaderProps {
  t: TFunction;
  responsiveContext: ResponsiveContextValue;
  handleSearchOpen: () => void;
}

interface NavLink {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
}

export default function LaptopHeader({
  t, responsiveContext, handleSearchOpen
}: LaptopHeaderProps): React.ReactNode {
  // const pathname: string = usePathname();
  const navLinks: NavLink[] = [
    { id: 1, href: "/", label: t("header.showcase"), isExternal: false },
    { id: 2, href: "/", label: t("header.docs"), isExternal: false },
    { id: 3, href: "/", label: t("header.blog"), isExternal: false },
    { id: 4, href: "/", label: t("header.templates"), isExternal: true },
    { id: 5, href: "/", label: t("header.enterprise"), isExternal: true }
  ];

  return (
    <div className="flex items-center justify-between flex-1 gap-10">
      <nav className="flex space-x-6 text-[14px] flex-shrink-0">
        {navLinks.map(({ id, href, label, isExternal }): React.ReactNode => (
          <Link
            key={id}
            href={href}
            // className={`transition duration-200 ease-in-out ${pathname === href ? "text-[var(--theme-primary)] font-medium" : "text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"}`}
            className="relative transition duration-200 ease-in-out text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
          >
            {label}
            {isExternal && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 22 22"
                fill="none"
                stroke="var(--theme-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline absolute top-[-2px] opacity-65"
              >
                <path d="M10 18 L18 10" />
                <path d="M10 10 H18 V18" />
              </svg>
            )}
          </Link>
        ))}
      </nav>
      <div className="flex space-x-3 ml-auto flex-shrink-1">
        <button
          className={`relative whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer border border-[var(--theme-bg-muted)] bg-[var(--theme-bg-muted)] text-[14px] text-[var(--theme-text-muted)] font-extralight pl-[8px] ${responsiveContext.isTabletScreen ? "max-w-[110px] pr-[40px]" : "pr-[90px]"} rounded-lg hover:bg-[var(--theme-bg-muted-hover)] hover:border-[var(--theme-bg-muted-hover)] focus:outline-none transition duration-200 ease-in-out`}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            handleSearchOpen();
            e.currentTarget.blur();
          }}
        >
          {t("header.search.button")}
          <span className="absolute right-[2px] border border-[var(--theme-text-subtle)] bg-[var(--theme-bg-base)] text-[12px] text-[var(--theme-fg-base)] font-medium px-[5px] py-[1.5px] rounded-lg">
            {responsiveContext.isTabletScreen ? "⌘K" : "CtrlK"}
          </span>
        </button>
        <Link
          href="/"
          className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[14px] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out"
        >
          <Image
            className="inline relative bottom-[2px]"
            style={{ filter: "var(--theme-image-filter-light)" }}
            src="/assets/vercel.svg"
            alt="Vercel logo"
            width={16}
            height={14}
            priority
          />
          <span className="ml-[10px]">
            {t("header.deploy")}
          </span>
        </Link>
        <Link
          href="/"
          className="whitespace-nowrap overflow-hidden text-ellipsis select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[14px] text-[var(--theme-border-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-bg-base-hover)] hover:border-[var(--theme-bg-base-hover)] transition duration-200 ease-in-out"
        >
          {t("header.learn")}
        </Link>
      </div>
    </div>
  );
}
