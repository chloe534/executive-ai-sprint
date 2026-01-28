"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  onCopied?: () => void;
}

export default function CopyButton({ text, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    onCopied?.();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full py-5 rounded-xl font-bold text-xl transition-all duration-300 ${
        copied
          ? "bg-green-500 text-white scale-105 shadow-lg shadow-green-500/30"
          : "bg-executive-accent text-white hover:bg-blue-600"
      }`}
    >
      {copied ? (
        <span className="flex items-center justify-center gap-3">
          <span className="text-2xl">✓</span>
          COPIED! NOW GO TO STEP 2
        </span>
      ) : (
        <span className="flex items-center justify-center gap-3">
          <span className="text-2xl">📋</span>
          Copy the Prompt
        </span>
      )}
    </button>
  );
}
