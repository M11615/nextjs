"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/i18n/client";
import { RequiredI18n, StateSetter } from "@/app/lib/constants";

export default function SkipToContent(): React.ReactNode {
  const { t, i18n }: RequiredI18n = useT("app", {});
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <Link
      href={`/${i18n.language}`}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => e.currentTarget.blur()}
      className="fixed left-[7px] top-[11px] select-none cursor-pointer flex items-center z-70 border-[var(--theme-bg-base)] bg-[var(--theme-bg-base)] text-[16px] text-[var(--theme-primary-light)] hover:text-[var(--theme-primary-light-hover)] transition duration-200 ease-in-out px-[13px] py-[6px] rounded-[6px] opacity-0 focus-visible:opacity-100"
    >
      {t("skipToContent")}
    </Link>
  );
}
