"use client";

export default function Loading(): React.ReactNode {
  return (
    <div className="fixed inset-0 flex w-full items-center justify-center bg-[var(--theme-bg-base)] z-90">
      <div className="w-16 h-16 border-4 border-[var(--theme-primary-light)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
