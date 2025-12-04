"use client";

import { useEffect, useState } from "react";
import { StateSetter, FALLBACK_MOBILE_L_SCREEN_WIDTH } from "@/app/lib/constants";
import { generateUUID } from "@/app/lib/uuid";
import { ResponsiveContextValue, useResponsiveContext } from "@/app/[lng]/components/ResponsiveContext";
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
  role: string;
  content: string;
  status: string;
}

export default function Page(): React.ReactNode {
  const [hydrated, setHydrated]: StateSetter<boolean> = useState<boolean>(false);
  const responsiveContext: ResponsiveContextValue = useResponsiveContext();
  const [collapsed, setCollapsed]: StateSetter<boolean> = useState<boolean>(responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH);
  const [showContent, setShowContent]: StateSetter<boolean> = useState<boolean>(true);
  const [chats, setChats]: StateSetter<Chat[]> = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId]: StateSetter<string | null> = useState<string | null>(null);
  const selectedChat: Chat | null = chats.find((chat: Chat): boolean => chat.id === selectedChatId) ?? null;

  useEffect((): void => {
    setHydrated(true);
  }, []);

  useEffect((): void => {
    setCollapsed(responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH);
    setShowContent(!(responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH));
  }, [responsiveContext.width]);

  const toggleAside: () => void = (): void => {
    if (!collapsed) {
      setCollapsed(true);
      setShowContent(false);
    } else {
      setCollapsed(false);
      setTimeout((): void => {
        setShowContent(true);
      }, 100);
    }
  };

  const createChat: () => Chat = (): Chat => {
    const newChat: Chat = {
      id: generateUUID(),
      title: "New Chat",
      messages: []
    };
    setChats((chat): Chat[] => [...chat, newChat]);

    return newChat;
  }

  const onSelectChatId: (chatId: string | null) => void = (chatId: string | null): void => {
    setSelectedChatId(chatId);
  };

  const addMessage: (chatId: string, message: Message) => void = (chatId: string, message: Message): void => {
    setChats((chats): Chat[] =>
      chats.map((chat): Chat => {
        const newChat: Chat = chat.id === chatId ? {
          ...chat,
          messages: [...chat.messages, message]
        } : chat;

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

        return newChat
      })
    );
  };

  if (!hydrated) return null;

  return (
    <div className="flex h-screen w-screen bg-[var(--theme-bg-base)] font-[family-name:var(--font-geist-sans)]">
      <Aside
        responsiveContext={responsiveContext}
        collapsed={collapsed}
        showContent={showContent}
        chats={chats}
        selectedChat={selectedChat}
        toggleAside={toggleAside}
        onSelectChatId={onSelectChatId}
      />
      <div className="flex flex-col flex-1 h-full">
        <Header responsiveContext={responsiveContext} toggleAside={toggleAside} onSelectChatId={onSelectChatId} />
        <Main
          responsiveContext={responsiveContext}
          selectedChat={selectedChat}
          createChat={createChat}
          onSelectChatId={onSelectChatId}
          addMessage={addMessage}
          updateMessage={updateMessage}
        />
      </div>
    </div>
  );
}
