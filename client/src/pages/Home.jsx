import React, { useState, useEffect, useRef } from "react";
import ChatBox from "../components/ChatBox";
import InputBox from "../components/InputBox";

const SUGGESTED_PROMPTS = [
  "Explain closures in JavaScript",
  "What is the event loop?",
  "Difference between var, let, and const",
  "What is hoisting?",
  "Ask me a JavaScript interview question",
];

export default function Home({
  setShowChat,
  setMessages,
  messages = [],
  showChat,
}) {
  const [localMessages, setLocalMessages] = useState(messages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setLocalMessages(messages);
    }
  }, [messages]);

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    const updatedMessages = [
      ...localMessages,
      { id: Date.now(), text: userMessage, sender: "user" },
    ];
    setLocalMessages(updatedMessages);
    setMessages(updatedMessages);
    setShowChat(true);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      const finalMessages = [
        ...updatedMessages,
        { id: Date.now() + 1, text: data.reply, sender: "bot" },
      ];
      setLocalMessages(finalMessages);
      setMessages(finalMessages);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to connect to server");
      const errorMessages = [
        ...updatedMessages,
        {
          id: Date.now() + 1,
          text: `Error: ${err.message || "Unable to get response. Please try again."}`,
          sender: "error",
        },
      ];
      setLocalMessages(errorMessages);
      setMessages(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-white font-sans">
      {localMessages?.length === 0 && !showChat ? (
        /* ── Landing Screen ── */
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl">

            {/* Logo mark */}
            {/* <div className="flex justify-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 3v10m0 0l-3-3m3 3l3-3"
                  />
                </svg>
              </div>
            </div> */}

            {/* Headline */}
            <div className="text-center mb-12">
              <h1
                className="text-4xl font-semibold tracking-tight text-black mb-3"
                style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                JavaScript Interview Coach
              </h1>
              <p className="text-base text-zinc-500 font-normal">
                Practice concepts, get explanations, and ace your next interview.
              </p>
            </div>

            {/* Prompt chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="
                    group flex items-center justify-between gap-3
                    bg-white border border-zinc-200 hover:border-zinc-400
                    rounded-xl px-5 py-4
                    text-left text-sm font-medium text-zinc-700 hover:text-black
                    transition-all duration-150 ease-in-out
                    hover:shadow-sm
                  "
                >
                  <span className="leading-snug">{prompt}</span>
                  <svg
                    className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 flex-shrink-0 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <p className="text-center text-xs text-zinc-400 mt-10">
              Type a question below or pick a prompt to get started
            </p>
          </div>
        </div>
      ) : (
        /* ── Chat Screen ── */
        <>
          <ChatBox
            messages={localMessages}
            isLoading={isLoading}
            error={error}
          />
          <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}