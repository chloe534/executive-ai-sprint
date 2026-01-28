"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import DayView from "@/components/DayView";
import { getProgress, markDayComplete, setPreferredAI } from "@/lib/storage";
import { DayContent, UserProgress, ROIEntry, AITool } from "@/lib/types";
import contentData from "@/data/content.json";

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
  };

  const handleComplete = (day: number, roiEntry?: ROIEntry) => {
    const updated = markDayComplete(day, roiEntry);
    setProgress(updated);
  };

  const handleBack = () => {
    setSelectedDay(null);
  };

  const handleProgressUpdate = (updated: UserProgress) => {
    setProgress(updated);
  };

  const handleSelectAI = (tool: AITool) => {
    const updated = setPreferredAI(tool);
    setProgress(updated);
  };

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-400 text-xl">Loading...</div>
      </div>
    );
  }

  const content = contentData as DayContent[];

  if (selectedDay !== null) {
    const dayContent = content.find((d) => d.day === selectedDay);
    if (dayContent) {
      return (
        <DayView
          content={dayContent}
          isCompleted={progress.completedDays.includes(selectedDay)}
          preferredAI={progress.preferredAI}
          onComplete={(roiEntry) => handleComplete(selectedDay, roiEntry)}
          onBack={handleBack}
        />
      );
    }
  }

  return (
    <Dashboard
      content={content}
      progress={progress}
      onSelectDay={handleSelectDay}
      onProgressUpdate={handleProgressUpdate}
      onSelectAI={handleSelectAI}
    />
  );
}
