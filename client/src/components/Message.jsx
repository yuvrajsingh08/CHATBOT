import React, { useState } from "react";

export default function Message({ message }) {
  const [copied, setCopied] = useState(false);

  const isUser = message.sender === "user";
  const isError = message.sender === "error";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isError) {
    return (
      <div className="flex justify-center">
        <div className="bg-zinc-50 border border-zinc-200 text-zinc-600 px-5 py-3.5 rounded-xl max-w-lg w-full">
          <p className="text-xs font-semibold text-zinc-900 mb-1">
            Something went wrong
          </p>
          <p className="text-xs">{message.text}</p>
        </div>
      </div>
    );
  }

  const renderMarkdown = (text) => {
    const parts = text.split("**");
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  const renderLine = (line, lineIdx) => {
    if (line.startsWith("### ")) {
      return (
        <h3
          key={lineIdx}
          className="text-sm font-semibold mt-4 mb-1.5 text-zinc-900">
          {renderMarkdown(line.replace(/^###\s?/, ""))}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2
          key={lineIdx}
          className="text-base font-semibold mt-4 mb-1.5 text-zinc-900">
          {renderMarkdown(line.replace(/^##\s?/, ""))}
        </h2>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h1
          key={lineIdx}
          className="text-lg font-semibold mt-4 mb-2 text-zinc-900">
          {renderMarkdown(line.replace(/^#\s?/, ""))}
        </h1>
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <div key={lineIdx} className="flex gap-2 mb-1.5 ml-1">
          <span className="text-zinc-400 flex-shrink-0 text-sm">
            {line.match(/^\d+/)[0]}.
          </span>
          <span className="text-sm leading-relaxed">
            {renderMarkdown(line.replace(/^\d+\.\s/, ""))}
          </span>
        </div>
      );
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div key={lineIdx} className="flex gap-2 mb-1.5 ml-1">
          <span className="text-zinc-400 flex-shrink-0 mt-1.5 text-[6px]">
            ●
          </span>
          <span className="text-sm leading-relaxed">
            {renderMarkdown(line.replace(/^[-*]\s/, ""))}
          </span>
        </div>
      );
    }
    return (
      <p key={lineIdx} className="text-sm leading-relaxed mb-1.5">
        {renderMarkdown(line)}
      </p>
    );
  };

  const renderContent = (text) => {
    const parts = text.split("```");
    return parts.map((part, idx) => {
      if (idx % 2 === 0) {
        // Plain text
        const lines = part.split("\n").filter((l) => l.trim());
        return (
          <div key={idx}>{lines.map((line, i) => renderLine(line, i))}</div>
        );
      } else {
        // Code block — strip optional language tag on first line
        const lines = part.trim().split("\n");
        const firstLine = lines[0];
        const isLangTag = /^[a-zA-Z]+$/.test(firstLine);
        const lang = isLangTag ? firstLine : null;
        const code = isLangTag ? lines.slice(1).join("\n") : lines.join("\n");

        // Syntax highlighting for JavaScript
        const renderHighlightedCode = (codeText, language) => {
          if (language === "javascript" || language === "js") {
            const tokens = [];
            let lastIdx = 0;
            const combinedRegex =
              /\b(function|const|let|var|if|else|for|while|return|class|import|export|async|await|try|catch|new|this|super|extends|default|switch|case|break|continue|do|throw|finally)\b|\b(true|false|null|undefined)\b|('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)|\/\/.*|\/\*[\s\S]*?\*\/|\b\d+\b/gm;

            let match;
            while ((match = combinedRegex.exec(codeText)) !== null) {
              if (match.index > lastIdx) {
                tokens.push({
                  type: "plain",
                  value: codeText.slice(lastIdx, match.index),
                });
              }

              if (match[1]) {
                tokens.push({ type: "keyword", value: match[0] });
              } else if (match[2]) {
                tokens.push({ type: "boolean", value: match[0] });
              } else if (match[3]) {
                tokens.push({ type: "string", value: match[0] });
              } else if (
                match[0].startsWith("//") ||
                match[0].startsWith("/*")
              ) {
                tokens.push({ type: "comment", value: match[0] });
              } else if (/^\d+$/.test(match[0])) {
                tokens.push({ type: "number", value: match[0] });
              }
              lastIdx = combinedRegex.lastIndex;
            }

            if (lastIdx < codeText.length) {
              tokens.push({ type: "plain", value: codeText.slice(lastIdx) });
            }

            const colors = {
              keyword: "text-orange-400",
              boolean: "text-blue-400",
              string: "text-green-400",
              comment: "text-gray-500",
              number: "text-cyan-400",
              plain: "text-zinc-100",
            };

            return tokens.map((token, i) => (
              <span key={i} className={colors[token.type]}>
                {token.value}
              </span>
            ));
          }
          return codeText;
        };

        return (
          <div
            key={idx}
            className="my-3 rounded-xl overflow-hidden border bg-zinc-950 border-zinc-200">
            {/* Code header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-700">
              <span className="text-xs text-zinc-400 font-mono">
                {lang || "code"}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-xs text-zinc-400 hover:text-white transition-colors duration-150 flex items-center gap-1.5">
                {copied ? (
                  <>
                    <svg
                      width="11"
                      height="11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      width="11"
                      height="11"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-zinc-950 text-zinc-100 px-4 py-3 overflow-x-auto text-xs leading-snug font-mono whitespace-pre">
              <code>{renderHighlightedCode(code, lang)}</code>
            </pre>
          </div>
        );
      }
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Bot avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            viewBox="0 0 24 24">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-xl rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-black text-white rounded-br-sm"
            : "bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-bl-sm"
        }`}>
        <div className="whitespace-pre-wrap break-words">
          {renderContent(message.text)}
        </div>

        {/* Copy button for bot messages (text only, code blocks have their own) */}
        {!isUser && (
          <button
            onClick={copyToClipboard}
            className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-150">
            {copied ? (
              <>
                <svg
                  width="11"
                  height="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2v1" />
                </svg>
                Copy response
              </>
            )}
          </button>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="#52525b"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}
