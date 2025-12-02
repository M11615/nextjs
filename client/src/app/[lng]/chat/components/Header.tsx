"use client";

export default function Header(): React.ReactNode {
  return (
    <header className="w-full h-[53px] bg-[var(--theme-bg-chat-base)] border-b border-[var(--theme-border-base)]">
      <div className="select-none flex items-center h-full text-[var(--theme-fg-base)] pl-4">
        TinyLlama-1.1B-Chat-v1.0
      </div>
    </header>
  )
}