"use client";

import { useEffect, useState } from "react";
import { StateSetter } from "@/app/lib/constants";
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status: "pending" | "sent" | "error";
}

export default function Page(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const [chats, setChats]: StateSetter<Chat[]>= useState<Chat[]>([]);
  const [selectedChat, setSelectedChat]: StateSetter<Chat | null> = useState<Chat | null>(null);

  useEffect((): void => {
    setHydrated(true);
  }, []);

  const createChat: () => Chat = (): Chat => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setChats((chat): Chat[] => [...chat, newChat]);

    return newChat;
  }

  const handleSelectChat: (chat: Chat | null) => void = (chat: Chat | null): void => {
    setSelectedChat(chat);
  };

  const addMessage: (chatId: string, message: Message) => void = (chatId: string, message: Message): void => {
    setChats((chats): Chat[] =>
      chats.map((chat): Chat => {
        const newChat: Chat = chat.id === chatId ? {
          ...chat,
          messages: [...chat.messages, message]
        } : chat;
        if (selectedChat?.id !== chatId) {
          handleSelectChat(newChat)
        };

        return newChat
      })
    );
  }

  const updateMessage: (chatId: string, messageId: string, partial: Partial<Message>) => void = (chatId: string, messageId: string, partial: Partial<Message>): void => {
    setChats((chats): Chat[] =>
      chats.map((chat): Chat => {
        const newChat: Chat = chat.id === chatId ? {
          ...chat,
          messages: chat.messages.map((message): Message =>
            message.id === messageId ? { ...message, ...partial } : message
          )
        } : chat
        if (selectedChat?.id !== chatId) {
          handleSelectChat(newChat)
        };

        return newChat
      })
    );
  };

  if (!hydrated) return null;

  return (
    <div className="flex h-screen w-screen bg-[var(--theme-bg-base)] font-[family-name:var(--font-geist-sans)]">
      <Aside chats={chats} onSelectChat={handleSelectChat} />
      <div className="flex flex-col flex-1 h-full">
        <Header />
        <Main
          selectedChat={selectedChat}
          createChat={createChat}
          onSelectChat={handleSelectChat}
          addMessage={addMessage}
          updateMessage={updateMessage}
        />
      </div>
    </div>
  );
}
