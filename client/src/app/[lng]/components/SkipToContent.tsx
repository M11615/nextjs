"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/app/i18n/client";
import { OptionalI18n } from "@/app/lib/constants";

export default function SkipToContent(): React.ReactNode {
  const { t, i18n }: OptionalI18n = useT("app", {});
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <Link
      href={`/${i18n.language}`}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => e.currentTarget.blur()}
      className="fixed left-[7px] top-[11px] cursor-pointer flex items-center z-70 border-[3px] border-[var(--theme-primary-light)] bg-[var(--theme-bg-base)] text-[16px] text-[var(--theme-primary-light)] hover:text-[var(--theme-primary-light-hover)] transition duration-200 ease-in-out px-[13px] py-[6px] rounded-[10px] outline-none opacity-0 focus-visible:opacity-100"
    >
      {t("skipToContent")}
    </Link>
  );
}
