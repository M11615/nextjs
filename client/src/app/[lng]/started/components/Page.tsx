"use client";

import { useEffect, useState } from "react";
import { StateSetter } from "@/app/lib/constants";
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

export default function Page(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const [selectedChat, setSelectedChat]: StateSetter<string | null> = useState<string | null>(null);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  const handleSelectChat: (chat: string | null) => void = (chat: string | null): void => {
    setSelectedChat(chat);
  };

  if (!hydrated) return null;

  return (
    <div className="flex h-screen w-screen bg-[var(--theme-bg-base)] font-[family-name:var(--font-geist-sans)]">
      <Aside onSelectChat={handleSelectChat} />
      <div className="flex flex-col flex-1 h-full">
        <Header />
        <Main selectedChat={selectedChat} />
      </div>
    </div>
  );
}
