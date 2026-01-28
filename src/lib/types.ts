export interface DayContent {
  day: number;
  title: string;
  theWhy: string;
  theTask: string;
  requiresInput: boolean;
  inputLabel: string;
  inputPlaceholder: string;
  instructions: string;
  template: string;
}

export interface ROIEntry {
  day: number;
  usualMinutes: number;
  aiMinutes: number;
  savedMinutes: number;
}

export type AITool = "copilot" | "chatgpt" | "claude" | "gemini" | null;

export interface UserProgress {
  completedDays: number[];
  unlockedDays: number[];
  lastUnlockTime: string | null;
  roiData: ROIEntry[];
  teamSize: number;
  preferredAI: AITool;
}

export const AI_TOOLS: Record<Exclude<AITool, null>, { name: string; url: string; emoji: string }> = {
  copilot: {
    name: "Microsoft Copilot",
    url: "https://copilot.microsoft.com",
    emoji: "🟦",
  },
  chatgpt: {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    emoji: "🟢",
  },
  claude: {
    name: "Claude",
    url: "https://claude.ai",
    emoji: "🟠",
  },
  gemini: {
    name: "Gemini",
    url: "https://gemini.google.com",
    emoji: "🔵",
  },
};
