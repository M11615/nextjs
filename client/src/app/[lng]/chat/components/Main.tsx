"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { StateSetter, CHAT_MESSAGE_ROLE, CHAT_MESSAGE_STATUS, FALLBACK_MOBILE_L_SCREEN_WIDTH } from "@/app/lib/constants";
import { generateUUID } from "@/app/lib/uuid";
import { userGenerate } from "@/app/services/v1/generate";
import { ResponsiveContextValue } from "@/app/[lng]/components/ResponsiveContext";
import { Chat, Message } from "./Page";

interface MainProps {
  responsiveContext: ResponsiveContextValue;
  selectedChat: Chat | null;
  createChat: () => Chat;
  onSelectChatId: (chatId: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, partial: Partial<Message>) => void
}

export default function Main({
  responsiveContext, selectedChat, createChat, onSelectChatId, addMessage, updateMessage
}: MainProps): React.ReactNode {
  const [inputText, setInputText]: StateSetter<string> = useState<string>("");
  const [isMultiline, setIsMultiline]: StateSetter<boolean> = useState<boolean>(false);
  const [rows, setRows]: StateSetter<number> = useState<number>(1);
  const controllerRef: React.RefObject<AbortController | null> = useRef<AbortController | null>(null);
  const readerRef: React.RefObject<ReadableStreamDefaultReader<Uint8Array> | null> = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const textareaRef: React.RefObject<HTMLTextAreaElement | null> = useRef<HTMLTextAreaElement | null>(null);

  const handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value: string = e.target.value;
    if (value === "\n") {
      return;
    }
    const textarea: HTMLTextAreaElement | null = textareaRef.current;
    if (textarea) {
      const scrollHeight: number = textarea.scrollHeight;
      const clientHeight: number = textarea.clientHeight;
      const lineHeight: number = parseFloat(window.getComputedStyle(textarea).lineHeight);
      const newRows: number = Math.min(Math.floor(scrollHeight / lineHeight), 8.5);
      if (value.trim().length === 0) {
        setIsMultiline(false);
        setRows(1);
      } else {
        setRows(newRows);
      }
      if (scrollHeight > clientHeight && !isMultiline) {
        setIsMultiline(true);
      }
      setInputText(value);
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

  const handleSubmit: () => Promise<void> = async (): Promise<void> => {
    const userInputText: string = inputText.trim();
    if (userInputText.length === 0) return;
    let chat: Chat | null = selectedChat;
    if (!chat) {
      chat = createChat();
      onSelectChatId(chat.id);
    }
    const userMessage: Message = {
      id: generateUUID(),
      role: CHAT_MESSAGE_ROLE.USER,
      content: userInputText,
      status: CHAT_MESSAGE_STATUS.SENT
    };
    addMessage(chat.id, userMessage);
    setInputText("");
    setRows(1);
    setIsMultiline(false);
    const messageId: string = generateUUID();
    const message: Message = {
      id: messageId,
      role: CHAT_MESSAGE_ROLE.ASSISTANT,
      content: "",
      status: CHAT_MESSAGE_STATUS.PINDING
    };
    addMessage(chat.id, message);
    try {
      const controller: AbortController = new AbortController();
      controllerRef.current = controller;
      const response: Response = await userGenerate({
        inputText: userInputText
      }, controller.signal);
      if (!response.body) return;
      const reader: ReadableStreamDefaultReader<Uint8Array<ArrayBuffer>> = response.body.getReader();
      readerRef.current = reader;
      const decoder: TextDecoder = new TextDecoder();
      let accumulatedText: string = "";
      while (true) {
        const { done, value }: { done: boolean, value: Uint8Array<ArrayBuffer> | undefined } = await reader.read();
        if (done) break;
        const chunk: string = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        updateMessage(chat.id, messageId, {
          content: accumulatedText,
          status: CHAT_MESSAGE_STATUS.PINDING
        });
      }
      updateMessage(chat.id, messageId, {
        content: accumulatedText,
        status: response.ok ? CHAT_MESSAGE_STATUS.SENT : CHAT_MESSAGE_STATUS.ERROR
      });
    } catch {
      updateMessage(chat.id, messageId, {
        content: "",
        status: CHAT_MESSAGE_STATUS.ERROR
      });
    }
  };

  const handleStop: () => void = (): void => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    if (readerRef.current) {
      readerRef.current.cancel();
      readerRef.current = null;
    }
    if (selectedChat) {
      const last: Message = selectedChat.messages[selectedChat.messages.length - 1];
      if (last && last.status === CHAT_MESSAGE_STATUS.PINDING) {
        updateMessage(selectedChat.id, last.id, {
          status: CHAT_MESSAGE_STATUS.SENT
        });
      }
    }
  };

  const ChatTextarea: React.ReactNode = (
    <div className={`flex ${isMultiline ? "flex-col rounded-[24px]" : "flex-row rounded-full"} items-end w-full max-w-[770px] bg-[var(--theme-bg-chat-textarea)] border-[2px] border-[var(--theme-border-base)] p-2`}>
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleChange}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
          if (!responsiveContext.isTabletScreen) handleKeyDown(e);
        }}
        autoFocus
        rows={rows}
        placeholder="Ask anything"
        className="flex-1 w-full resize-none select-none outline-none text-[16px] text-[var(--theme-fg-base)] placeholder-[var(--theme-text-caption)] leading-[1.5] p-2 pl-4"
      />
      {selectedChat?.messages[selectedChat?.messages.length - 1].status === CHAT_MESSAGE_STATUS.PINDING ? (
        <button
          onClick={handleStop}
          className="select-none cursor-pointer border border-[var(--theme-bg-muted)] bg-[var(--theme-bg-muted)] text-[var(--theme-fg-base)] p-[8px] rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.5 5.75C4.5 5.05964 5.05964 4.5 5.75 4.5H14.25C14.9404 4.5 15.5 5.05964 15.5 5.75V14.25C15.5 14.9404 14.9404 15.5 14.25 15.5H5.75C5.05964 15.5 4.5 14.9404 4.5 14.25V5.75Z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={inputText.trim().length === 0}
          className={`select-none text-[var(--theme-border-base)] border ${inputText.trim().length === 0 ? "cursor-not-allowed border-[var(--theme-text-caption)] bg-[var(--theme-text-caption)]" : "cursor-pointer border-[var(--theme-fg-base)] bg-[var(--theme-fg-base)] hover:bg-[var(--theme-bg-base-hover)] hover:border-[var(--theme-bg-base-hover)]"} p-[8px] rounded-full transition duration-200 ease-in-out`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <main className="flex flex-col items-center flex-1 bg-[var(--theme-bg-chat-base)] overflow-auto">
      {selectedChat === null ? (
        <div className={`flex flex-col items-center justify-center w-full h-full ${responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "px-4 pt-[56%]" : "px-9 pb-[185px]"}`}>
          <p className={`${responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "text-[26px]" : "text-[30px]"} mb-7 text-center text-[var(--theme-fg-base)]`}>
            Ready when you are.
          </p>
          <div className={`flex flex-col items-center w-full ${responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "mt-auto pb-4" : ""}`}>
            {ChatTextarea}
          </div>
        </div>
      ) : (
        <>
          <div className={`flex flex-col w-full h-full ${responsiveContext.isTabletScreen ? `${responsiveContext.isMobileScreen ? "px-4" : "px-[8%]"}` : "px-[18.5%]"} pt-4 pb-[14%] gap-6 overflow-y-auto`}>
            {selectedChat.messages.map((message: Message): React.ReactNode => (
              <div key={message.id} className={`flex w-full ${message.role === CHAT_MESSAGE_ROLE.USER ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl whitespace-pre-wrap break-words ${message.role === CHAT_MESSAGE_ROLE.USER ? "max-w-[68.5%] bg-[var(--theme-bg-chat-message)] text-[var(--theme-fg-base)]" : "max-w-[100%] bg-[var(--theme-bg-chat-base)] text-[var(--theme-fg-base)]"} ${message.status === CHAT_MESSAGE_STATUS.ERROR ? "border border-red-500 bg-red-50 text-red-600" : ""}`}
                >
                  {message.status === CHAT_MESSAGE_STATUS.PINDING && message.content.length === 0 ? (
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-[var(--theme-fg-base)] rounded-full" />
                    </div>
                  ) : message.role === CHAT_MESSAGE_ROLE.ASSISTANT ? (
                    <div className="prose max-w-none pb-10">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`flex flex-col items-center w-full bg-[var(--theme-bg-chat-base)] ${responsiveContext.isTabletScreen ? `${responsiveContext.isMobileScreen ? `${responsiveContext.width < FALLBACK_MOBILE_L_SCREEN_WIDTH ? "px-4" : "px-6"}` : "px-14"}` : "px-8"} pb-[30px]`}>
            {ChatTextarea}
          </div>
        </>
      )}
    </main>
  );
}
