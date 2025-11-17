import { Metadata } from "next";
import { getT } from "@/app/i18n/index";
import { I18nInstance } from "@/app/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const { t }: I18nInstance = await getT("locale", [null, "locale"]);

  return {
    title: t("layout.title")
  };
};

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  return children;
}
