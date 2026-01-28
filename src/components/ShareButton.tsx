"use client";

import { useState } from "react";

interface ShareButtonProps {
  completedDays: number;
}

export default function ShareButton({ completedDays }: ShareButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  const shareMessage = `I've completed ${completedDays}/14 days of the Executive AI Sprint! Learning to leverage AI for strategic decision-making and productivity. Join me: `;

  const handleEmailShare = () => {
    const subject = encodeURIComponent("My Executive AI Sprint Progress");
    const body = encodeURIComponent(shareMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShowOptions(false);
  };

  const handleSlackShare = () => {
    navigator.clipboard.writeText(shareMessage);
    alert("Message copied! Paste it in Slack.");
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-4 py-2 rounded-lg font-medium border border-executive-border text-gray-300 hover:bg-executive-card transition-colors"
      >
        Share Progress
      </button>

      {showOptions && (
        <div className="absolute top-full mt-2 right-0 bg-executive-card border border-executive-border rounded-lg shadow-xl z-10 overflow-hidden">
          <button
            onClick={handleEmailShare}
            className="block w-full px-4 py-3 text-left text-gray-300 hover:bg-executive-border transition-colors"
          >
            Share via Email
          </button>
          <button
            onClick={handleSlackShare}
            className="block w-full px-4 py-3 text-left text-gray-300 hover:bg-executive-border transition-colors"
          >
            Copy for Slack
          </button>
        </div>
      )}
    </div>
  );
}
