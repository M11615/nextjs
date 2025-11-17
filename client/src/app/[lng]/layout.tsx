import localFont from "next/font/local";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getT } from "@/app/i18n/index";
import { I18nInstance, FALLBACK_THEME, COOKIE_KEYS } from "@/app/lib/constants";
import ResponsiveProvider from "./components/ResponsiveContext";
import "./globals.css";

const geistSans: NextFontWithVariable = localFont({
  src: "../fonts/Geist/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans"
});

const geistMono: NextFontWithVariable = localFont({
  src: "../fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono"
});

export async function generateMetadata(): Promise<Metadata> {
  const { t }: I18nInstance = await getT("app", [null, "app"]);

  return {
    title: t("layout.title")
  };
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const { i18n }: I18nInstance = await getT("", [null, ""]);
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const theme: string = cookieStore.get(COOKIE_KEYS.THEME)?.value || FALLBACK_THEME;

  return (
    <html lang={i18n.language} className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResponsiveProvider>
          {children}
        </ResponsiveProvider>
      </body>
    </html>
  );
}
