"use client";

import SkipToContent from "./SkipToContent";
import Header from "./Header";
import Main from "./Main";
import Section from "./Section";
import Footer from "./Footer";

export default function Page(): React.ReactNode {
  return (
    <div className="pt-[120px] bg-[var(--theme-bg-base)] items-center font-[family-name:var(--font-geist-sans)]">
      <SkipToContent />
      <Header />
      <Main />
      <Section />
      <Footer />
    </div>
  );
}
