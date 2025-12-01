"use client";

interface MainProps {
  selectedChat: string | null;
}

export default function Main({
  selectedChat
}: MainProps): React.ReactNode {
  return (
    <main className="flex-1 overflow-auto">
      {selectedChat === null ? (
        <div className="p-4">No Chat Selected</div>
      ) : (
        <div className="p-4">{selectedChat}</div>
      )}
    </main>
  );
}
