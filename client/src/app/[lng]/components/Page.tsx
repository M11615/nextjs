"use client";

import { useEffect, useState } from "react";
import { StateSetter } from "@/app/lib/constants";
import SkipToContent from "./SkipToContent";
import Header from "./Header";
import Main from "./Main";
import Section from "./Section";
import Footer from "./Footer";

export default function Page(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="bg-[var(--theme-bg-base)] items-center font-[family-name:var(--font-geist-sans)]">
      <SkipToContent />
      <Header />
      <Main />
      <Section />
      <Footer />
    </div>
  );
}
