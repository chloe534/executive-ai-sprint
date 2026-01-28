"use client";

import { DayContent, UserProgress, AITool } from "@/lib/types";
import ShareButton from "./ShareButton";
import ROISummary from "./ROISummary";
import WelcomeHeader from "./WelcomeHeader";
import AIToolSelector from "./AIToolSelector";

interface DashboardProps {
  content: DayContent[];
  progress: UserProgress;
  onSelectDay: (day: number) => void;
  onProgressUpdate: (progress: UserProgress) => void;
  onSelectAI: (tool: AITool) => void;
}

export default function Dashboard({ content, progress, onSelectDay, onProgressUpdate, onSelectAI }: DashboardProps) {
  const completedCount = progress.completedDays.length;
  const progressPercent = (completedCount / 14) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <WelcomeHeader />

      <AIToolSelector selectedTool={progress.preferredAI} onSelect={onSelectAI} />

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-lg">Your Progress</span>
          <span className="text-white font-semibold text-lg">{completedCount} of 14 days</span>
        </div>
        <div className="h-4 bg-executive-card rounded-full overflow-hidden">
          <div
            className="h-full bg-executive-accent transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <ROISummary progress={progress} onProgressUpdate={onProgressUpdate} />

      <div className="flex justify-end mb-6">
        <ShareButton completedDays={completedCount} />
      </div>

      <div className="space-y-4">
        {content.map((day) => {
          const isUnlocked = progress.unlockedDays.includes(day.day);
          const isCompleted = progress.completedDays.includes(day.day);

          return (
            <button
              key={day.day}
              onClick={() => isUnlocked && onSelectDay(day.day)}
              disabled={!isUnlocked}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                isUnlocked
                  ? "bg-executive-card border-executive-border hover:border-executive-accent cursor-pointer"
                  : "bg-executive-bg border-executive-border opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isUnlocked
                        ? "bg-executive-accent text-white"
                        : "bg-executive-border text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : day.day}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-xl">{day.title}</div>
                    <div className="text-gray-400 text-lg">Day {day.day}</div>
                  </div>
                </div>
                {isUnlocked && !isCompleted && (
                  <span className="text-executive-accent text-lg font-medium">Start →</span>
                )}
                {isCompleted && (
                  <span className="text-green-500 text-lg font-medium">Complete ✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
