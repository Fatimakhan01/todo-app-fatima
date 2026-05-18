"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

interface AIChatClientProps {
  initialMessages: any[];
}

export default function AIChatClient({
  initialMessages,
}: AIChatClientProps) {
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    status,
  } = useChat({
    messages: initialMessages,
  });

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!input.trim()) return;

    await sendMessage({
      text: input,
    });

    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          AI Assistant
        </h1>

        <p className="text-sm text-muted-foreground">
          Ask questions about your tasks
        </p>
      </div>

      <ChatWindow
        messages={messages}
        isLoading={status === "streaming"}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={status === "streaming"}
      />
    </div>
  );
}