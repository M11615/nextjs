"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FlatNamespace, KeyPrefix } from "i18next";
import { FallbackNs } from "react-i18next";
import { UseTranslationOptions } from "react-i18next";
import i18next from "./i18next";
import { I18nInstance, StateSetter } from "@/app/lib/constants";

const runsOnServerSide: boolean = typeof window === "undefined";

type $Tuple<T> = readonly [T?, ...T[]];

type Options<
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
> = UseTranslationOptions<KPrefix>;

export function useT(ns: string | string[], options: Options): I18nInstance {
  const lng: string = useParams()?.lng as string;
  if (typeof lng !== "string") throw new Error("useT is only available inside /app/[lng]");
  useEffect(() => {
    if (runsOnServerSide && i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }
  }, [lng]);
  const [activeLng, setActiveLng]: StateSetter<string | undefined> = useState<string | undefined>(i18next.resolvedLanguage);
  useEffect(() => {
    if (activeLng === i18next.resolvedLanguage) return;
    setActiveLng(i18next.resolvedLanguage);
  }, [activeLng]);
  useEffect(() => {
    if (!lng || i18next.resolvedLanguage === lng) return;
    i18next.changeLanguage(lng);
  }, [lng]);
  return useTranslation(ns, options);
}
