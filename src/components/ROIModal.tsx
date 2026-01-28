"use client";

import { useState } from "react";
import { ROIEntry } from "@/lib/types";

interface ROIModalProps {
  day: number;
  onSubmit: (entry: ROIEntry) => void;
  onSkip: () => void;
}

export default function ROIModal({ day, onSubmit, onSkip }: ROIModalProps) {
  const [usualMinutes, setUsualMinutes] = useState("");
  const [aiMinutes, setAiMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usual = parseInt(usualMinutes) || 0;
    const ai = parseInt(aiMinutes) || 0;
    onSubmit({
      day,
      usualMinutes: usual,
      aiMinutes: ai,
      savedMinutes: Math.max(0, usual - ai),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-executive-card border border-executive-border rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-white mb-2">Track Your Time Saved</h2>
        <p className="text-gray-400 text-sm mb-6">
          Help us calculate your ROI from using AI for this task.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              How long would this task usually take you? (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={usualMinutes}
              onChange={(e) => setUsualMinutes(e.target.value)}
              placeholder="e.g., 30"
              className="w-full px-4 py-3 bg-executive-bg border border-executive-border rounded-lg text-white placeholder-gray-500 focus:border-executive-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              How long did it take with AI? (minutes)
            </label>
            <input
              type="number"
              min="0"
              value={aiMinutes}
              onChange={(e) => setAiMinutes(e.target.value)}
              placeholder="e.g., 5"
              className="w-full px-4 py-3 bg-executive-bg border border-executive-border rounded-lg text-white placeholder-gray-500 focus:border-executive-accent focus:outline-none"
            />
          </div>

          {usualMinutes && aiMinutes && (
            <div className="bg-executive-bg border border-executive-border rounded-lg p-4">
              <div className="text-gray-400 text-sm">Time saved this task</div>
              <div className="text-2xl font-semibold text-executive-success">
                {Math.max(0, parseInt(usualMinutes) - parseInt(aiMinutes))} minutes
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onSkip}
              className="flex-1 py-3 border border-executive-border text-gray-400 rounded-lg hover:bg-executive-border transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-executive-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
