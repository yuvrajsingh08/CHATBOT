import React, { useState, useRef, useEffect } from "react";

export default function InputBox({ onSendMessage, isLoading }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea height up to a max
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      // Reset height after send
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="flex-shrink-0 bg-white border-t border-zinc-100 px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div
          className={`flex items-end gap-3 border rounded-2xl px-4 py-3 transition-colors duration-150 bg-white ${
            isLoading ? "border-zinc-100" : "border-zinc-200 focus-within:border-zinc-400"
          }`}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about JavaScript… "
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-black placeholder-zinc-400 focus:outline-none disabled:opacity-50 leading-relaxed"
            style={{ minHeight: "24px", maxHeight: "160px", overflowY: "auto" }}
          />

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
              canSend
                ? "bg-black hover:bg-zinc-800 text-white"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              /* Spinner */
              <svg
                className="animate-spin"
                width="14" height="14"
                fill="none" viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              /* Send arrow */
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

       
      </div>
    </div>
  );
}