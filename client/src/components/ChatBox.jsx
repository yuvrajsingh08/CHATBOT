import React, { useEffect, useRef } from "react";
import Message from "./Message";

export default function ChatBox({ messages, isLoading, error }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    /* KEY: h-full + overflow-y-auto — scroll happens HERE, not in a parent */
    <div className="h-full overflow-y-auto px-6 py-6 flex flex-col gap-4">

      <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
        {messages && messages.length > 0
          ? messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          : null}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-4 py-3 rounded-2xl rounded-tl-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-5 py-3.5 rounded-xl max-w-lg w-full">
              <p className="text-xs font-semibold text-zinc-900 mb-1">Something went wrong</p>
              <p className="text-xs text-zinc-500">{error}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}