"use client";

import { useEffect, useRef, useState } from "react";
import { StateSetter } from "@/app/lib/constants";
import { userGenerate } from "@/app/services/v1/generate";
import { Chat, Message } from "./Page";

interface MainProps {
  selectedChat: Chat | null;
  createChat: () => Chat;
  onSelectChat: (chat: Chat | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, partial: Partial<Message>) => void
}

export default function Main({
  selectedChat, createChat, onSelectChat, addMessage, updateMessage
}: MainProps): React.ReactNode {
  const [input, setInput]: StateSetter<string> = useState<string>("");
  const [isMultiline, setIsMultiline]: StateSetter<boolean> = useState<boolean>(false);
  const [rows, setRows]: StateSetter<number> = useState<number>(1);
  const textareaRef: React.RefObject<HTMLTextAreaElement | null> = useRef<HTMLTextAreaElement | null>(null);

  useEffect((): void => {
    textareaRef.current?.focus();
  }, []);

  const handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const textarea: HTMLTextAreaElement | null = textareaRef.current;
    if (textarea) {
      const scrollHeight: number = textarea.scrollHeight;
      const clientHeight: number = textarea.clientHeight;
      const lineHeight: number = parseFloat(window.getComputedStyle(textarea).lineHeight);
      const newRows: number = Math.min(Math.floor(scrollHeight / lineHeight), 8.5);
      const value: string = e.target.value;
      if (value.trim().length === 0) {
        setIsMultiline(false);
        setRows(1);
      } else {
        setRows(newRows);
      }
      if (scrollHeight > clientHeight && !isMultiline) {
        setIsMultiline(true);
      }
      setInput(value);
    }
  };

  const handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const userInput: string = input.trim();
    if (userInput.length === 0) return;
    let chat: Chat | null = selectedChat;
    if (!chat) {
      chat = createChat();
      onSelectChat(chat);
    }
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: userInput,
      status: "sent"
    };
    addMessage(chat.id, userMessage);
    setInput("");
    setRows(1);
    setIsMultiline(false);
    const messageId: string = crypto.randomUUID();
    const message: Message = {
      id: messageId,
      role: "assistant",
      content: "",
      status: "pending"
    };
    addMessage(chat.id, message);
    const response: Response = await userGenerate({
      input: userInput
    });
    if (!response.body) return;
    const reader: ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>> = response.body.getReader();
    const decoder: TextDecoder = new TextDecoder();
    let accumulatedText: string = "";
    while (true) {
      const { done, value }: { done: boolean, value: Uint8Array<ArrayBuffer> | undefined } = await reader.read();
      if (done) break;
      const chunk: string = decoder.decode(value, { stream: true });
      accumulatedText += chunk;
      updateMessage(chat.id, messageId, {
        content: accumulatedText,
        status: "pending"
      });
    }
    updateMessage(chat.id, messageId, {
      content: accumulatedText,
      status: "sent"
    });
  };

  const ChatTextarea: React.ReactNode = (
    <div className={`flex ${isMultiline ? "flex-col rounded-[24px]" : "flex-row rounded-full"} items-end w-full max-w-[770px] bg-[var(--theme-bg-chat-textarea)] border-[2px] border-[var(--theme-border-base)] p-2`}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={rows}
        placeholder="Ask anything"
        className="flex-1 w-full resize-none select-none outline-none text-[16px] text-[var(--theme-fg-base)] placeholder-[var(--theme-text-caption)] leading-[1.5] p-2 pl-4"
      />
      <button
        onClick={handleSubmit}
        className="select-none cursor-pointer border border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] text-[var(--theme-border-base)] p-[8px] rounded-full hover:bg-[var(--theme-bg-base-hover)] hover:border-[var(--theme-bg-base-hover)] transition duration-200 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
        </svg>
      </button>
    </div>
  );

  return (
    <main className="flex flex-col items-center flex-1 bg-[var(--theme-bg-chat-base)] overflow-auto">
      {selectedChat === null ? (
        <div className="relative top-[27%] w-full flex flex-col items-center px-9">
          <p className="text-[30px] mb-7 text-center text-[var(--theme-fg-base)]">
            Ready when you are.
          </p>
          {ChatTextarea}
        </div>
      ) : (
        <div className="flex flex-col w-full px-6 py-4 gap-4 overflow-y-auto">
          {selectedChat.messages[1]?.content}
        </div>
      )}
    </main>
  );
}
