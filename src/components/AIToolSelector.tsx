"use client";

import { AITool, AI_TOOLS } from "@/lib/types";
import AILogo from "./AILogos";

interface AIToolSelectorProps {
  selectedTool: AITool;
  onSelect: (tool: AITool) => void;
}

export default function AIToolSelector({ selectedTool, onSelect }: AIToolSelectorProps) {
  const tools: Array<Exclude<AITool, null>> = ["copilot", "chatgpt", "claude", "gemini"];

  return (
    <div className="bg-executive-card border border-executive-border rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-white mb-2 text-center">
        Which AI assistant do you use at work?
      </h2>
      <p className="text-gray-400 text-center mb-6 text-lg">
        Select one and we'll personalize your experience
      </p>

      <div className="grid grid-cols-2 gap-4">
        {tools.map((key) => {
          const tool = AI_TOOLS[key];
          const isSelected = selectedTool === key;

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center ${
                isSelected
                  ? "border-executive-accent bg-executive-accent/10"
                  : "border-executive-border hover:border-gray-500 bg-executive-bg"
              }`}
            >
              <div className={`mb-3 ${isSelected ? "text-white" : "text-gray-400"}`}>
                <AILogo tool={key} className="w-12 h-12" />
              </div>
              <div className={`text-lg font-medium text-center ${isSelected ? "text-white" : "text-gray-300"}`}>
                {tool.name}
              </div>
              {isSelected && (
                <div className="text-executive-accent text-sm mt-2">✓ Selected</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
