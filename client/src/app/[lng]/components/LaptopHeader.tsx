"use client";

// import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { i18n, TFunction } from "i18next";

interface LaptopHeaderProps {
  t: TFunction;
  i18n: i18n;
  handleSearchOpen: () => void;
}

interface NavLink {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
}

export default function LaptopHeader({
  t, i18n, handleSearchOpen
}: LaptopHeaderProps): React.ReactNode {
  // const pathname: string = usePathname();
  const navLinks: NavLink[] = [
    { id: 1, href: `/${i18n.language}`, label: t("header.showcase"), isExternal: false },
    { id: 2, href: `/${i18n.language}`, label: t("header.docs"), isExternal: false },
    { id: 3, href: `/${i18n.language}`, label: t("header.blog"), isExternal: false },
    { id: 4, href: `/${i18n.language}`, label: t("header.templates"), isExternal: true },
    { id: 5, href: `/${i18n.language}`, label: t("header.enterprise"), isExternal: true }
  ];

  return (
    <>
      <nav className="flex space-x-6 text-[14px]">
        {navLinks.map(({ id, href, label, isExternal }): React.ReactNode => (
          <Link
            key={id}
            href={href}
            // className={`transition duration-200 ease-in-out ${pathname === href ? "text-[var(--theme-primary)] font-medium" : "text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"}`}
            className="transition duration-200 ease-in-out text-[var(--theme-text-muted)] hover:text-[var(--theme-fg-base)]"
          >
            {label}
            {isExternal && (
              <svg
                xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 28 28" fill="none" stroke="var(--theme-text-muted)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                className="inline relative -top-[6px]"
              >
                <path d="M10 22 L22 10" />
                <path d="M10 10 H22 V22" />
              </svg>
            )}
          </Link>
        ))}
      </nav>

      <div className="flex space-x-3 ml-auto">
        <button
          className="cursor-pointer border border-[var(--theme-bg-muted)] bg-[var(--theme-bg-muted)] text-[14px] text-[var(--theme-text-muted)] px-[10px] pl-[8px] pr-[5px] rounded-lg hover:bg-[var(--theme-bg-muted-hover)] hover:border-[var(--theme-bg-muted-hover)] focus:outline-none transition duration-200 ease-in-out"
          onClick={handleSearchOpen}
        >
          {t("header.search.button")}
          <span className="border border-[var(--theme-text-subtle)] bg-[var(--theme-bg-base)] text-[12px] text-[var(--theme-fg-base)] font-medium px-[5px] py-[3px] rounded-lg ml-10">
            CtrlK
          </span>
        </button>
        <Link
          href={`/${i18n.language}`}
          className="cursor-pointer flex items-center border border-[var(--theme-border-base)] bg-[var(--theme-bg-base)] text-[14px] text-[var(--theme-fg-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-bg-muted)] hover:border-[var(--theme-text-subtle)] transition duration-200 ease-in-out"
        >
          <Image
            style={{ filter: "var(--theme-image-filter-light)" }}
            src="/assets/vercel.svg"
            alt="Vercel logo"
            width={15}
            height={13}
            priority
          />
          <span className="ml-[10px]">
            {t("header.deploy")}
          </span>
        </Link>
        <Link
          href={`/${i18n.language}`}
          className="cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[14px] text-[var(--theme-border-base)] font-medium px-3 py-[5px] rounded-lg hover:bg-[var(--theme-text-muted)] hover:border-[var(--theme-text-muted)] transition duration-200 ease-in-out"
        >
          {t("header.learn")}
        </Link>
      </div>
    </>
  );
}
