"use client";
import { useUser } from "@/hooks";
import React, { useEffect, useState, useRef } from "react";
import { UserMessage, AssistantMessage } from "./message_types";
import ExampleQuestions from "./example_questions";
import { AssistantStream } from "openai/lib/AssistantStream.mjs";
import { TextDelta } from "openai/resources/beta/threads/messages.mjs";

type MessageProps = {
  role: "user" | "assistant";
  text: string;
};

const ChatContent = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const appendMessage = (role: MessageProps["role"], text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const handleTextDelta = (text: TextDelta) => {
    if (text.value == null) return;
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text.value,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  const handleTextEnd = () => {
    setInputDisabled(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const Message = ({ role, text }: MessageProps) => {
    switch (role) {
      case "user":
        return <UserMessage text={text} />;
      case "assistant":
        return <AssistantMessage text={text} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread().catch((e) => console.error(e));
  }, []);

  const sendMessage = async (text: string) => {
    const response = await fetch(`/api/threads/${threadId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        content: text,
      }),
    });
    if (response.body === null) return;
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", (e) => handleTextDelta(e));
    stream.on("event", (event) => {
      if (event.event === "thread.run.completed") handleTextEnd();
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setUserInput("");
    setInputDisabled(true);
    scrollToBottom();
  };

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col h-full">
      <div>
        <h1 className="text-lg font-outfit font-semibold">
          Ask our bot about Corruption
        </h1>
        <p className="text-sm text-gray-700">
          Closing this window will clear your corruption chat and you will start
          afresh.
        </p>
      </div>
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))
        ) : (
          <ExampleQuestions />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full py-2">
        <form onSubmit={(e) => handleSubmit(e)} className="flex w-full gap-4 ">
          <input
            type="text"
            className="px-6 py-4 border-2 border-transparent rounded-full bg-[#efefef] flex-1 focus:border-black outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me a question about corruption in Kenya..."
          />
          <button
            type="submit"
            className="bg-black text-white rounded-full px-6 py-4 disabled:bg-gray-700"
            disabled={inputDisabled}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
