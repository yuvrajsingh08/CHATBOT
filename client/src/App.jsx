import React, { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col bg-white"
      style={{ fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}
    >
      {!showChat && messages.length === 0 ? (
        <Home
          setShowChat={setShowChat}
          setMessages={setMessages}
          messages={messages}
          showChat={showChat}
        />
      ) : (
        <div className="flex h-full min-h-0">

          {/* ── Sidebar ── */}
          <aside className="w-56 flex-shrink-0 border-r border-zinc-100 bg-white flex flex-col py-5 px-3">
            <div className="flex items-center gap-2.5 px-2 mb-8">
              <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-black" style={{ letterSpacing: "-0.02em" }}>
                JS Coach
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => { setMessages([]); setShowChat(false); }}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium bg-black hover:bg-zinc-800 text-white transition-colors duration-150"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New chat
              </button>

              <button
                onClick={() => setMessages([])}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors duration-150"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 .49-4" />
                </svg>
                Clear chat
              </button>
            </div>

            <div className="flex-1" />

            
          </aside>

          {/* ── Main area: pinned topbar + scrollable chat ── */}
          <main className="flex-1 flex flex-col bg-white min-h-0 min-w-0 overflow-hidden">

            {/* Topbar — flex-shrink-0 keeps it pinned */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black" style={{ letterSpacing: "-0.01em" }}>
                  Interview Session
                </span>
                {messages.length > 0 && (
                  <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                    {Math.floor(messages.length / 2)} Q&amp;A
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-black" />
                <span className="text-xs text-zinc-500 font-medium">Live</span>
              </div>
            </div>

            {/* Home fills remaining height — scroll happens inside ChatBox */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <Home
                setShowChat={setShowChat}
                setMessages={setMessages}
                messages={messages}
                showChat={showChat}
              />
            </div>
          </main>

        </div>
      )}
    </div>
  );
}

export default App;