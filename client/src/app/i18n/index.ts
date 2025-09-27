import { headers } from "next/headers";
import { KeyPrefix } from "i18next";
import type { DefaultNamespace, Namespace } from "i18next";
import { headerName } from "./settings";
import i18next from "./i18next";
import { RequiredI18n } from "@/app/lib/constants";

type Options<
  Ns extends Namespace | null = DefaultNamespace,
  TKPrefix extends KeyPrefix<ActualNs> = undefined,
  ActualNs extends Namespace = Ns extends null ? DefaultNamespace : Ns
> = [lng: string | readonly string[], ns?: string | undefined, keyPrefix?: TKPrefix] | [lng: null, ns: string, keyPrefix?: TKPrefix];

export async function getT(ns: string | string[], options: Options): Promise<RequiredI18n> {
  const headerList: Headers = await headers();
  const lng: string = headerList.get(headerName) as string;
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
  return {
    t: i18next.getFixedT(lng ?? i18next.resolvedLanguage, Array.isArray(ns) ? ns[0] : ns, options?.[2]),
    i18n: i18next
  }
}
