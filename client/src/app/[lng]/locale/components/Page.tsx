"use client";

import { useEffect, useState } from "react";
import { StateSetter } from "@/app/lib/constants";
import Header from "@/app/[lng]/components/Header";
import Main from "./Main";
import Footer from "@/app/[lng]/components/Footer";

export default function Page(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="bg-[var(--theme-bg-base)] items-center font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
