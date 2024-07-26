"use client";
import { useUser } from "@/hooks";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { UserMessage, AssistantMessage } from "./message_types";
import ExampleQuestions from "./example_questions";
const API_URL = "http://localhost:4000/corruption";

type MessageProps = {
  role: "user" | "assistant";
  text: string;
};

const socket = io(API_URL, { autoConnect: false, transports: ["websocket"] });
const ChatContent = () => {
  const user = useUser();
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

  const handleTextDelta = (text: string) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  const handleTextCreated = (text: string) => {
    appendMessage("assistant", "");
  };

  const handleTextEnd = (text: string) => {
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
      const res = await fetch(`http://localhost:4000/apenai/thread`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const sendMessage = async (text: string) => {
    const response = await fetch(`http://localhost:4000/apenai`, {
      method: "POST",
      body: JSON.stringify({
        threadId: threadId,
        message: text,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
    socket.on("connect", () => {
      if (!user.user) return;
      socket.emit("join_room", { room: user.user?.uid });
    });
    socket.on("message.delta.created", handleTextDelta);
    socket.on("text.created", handleTextCreated);
    socket.on("message.end", handleTextEnd);
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      <div className="flex flex-col-reverse flex-1 p-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))
        ) : (
          <ExampleQuestions />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full ">
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
