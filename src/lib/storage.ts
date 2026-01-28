"use client";

import { UserProgress, ROIEntry, AITool } from "./types";

const STORAGE_KEY = "executive-ai-sprint-progress";

const defaultProgress: UserProgress = {
  completedDays: [],
  unlockedDays: [1],
  lastUnlockTime: null,
  roiData: [],
  teamSize: 1,
  preferredAI: null,
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultProgress;

  try {
    const parsed = JSON.parse(stored) as Partial<UserProgress>;
    return {
      ...defaultProgress,
      ...parsed,
      roiData: parsed.roiData || [],
      teamSize: parsed.teamSize || 1,
      preferredAI: parsed.preferredAI || null,
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function setPreferredAI(tool: AITool): UserProgress {
  const progress = getProgress();
  progress.preferredAI = tool;
  saveProgress(progress);
  return progress;
}

export function markDayComplete(day: number, roiEntry?: ROIEntry): UserProgress {
  const progress = getProgress();

  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day);
  }

  if (roiEntry) {
    const existingIndex = progress.roiData.findIndex(r => r.day === day);
    if (existingIndex >= 0) {
      progress.roiData[existingIndex] = roiEntry;
    } else {
      progress.roiData.push(roiEntry);
    }
  }

  const nextDay = day + 1;
  if (nextDay <= 14 && !progress.unlockedDays.includes(nextDay)) {
    progress.unlockedDays.push(nextDay);
    progress.lastUnlockTime = new Date().toISOString();
  }

  saveProgress(progress);
  return progress;
}

export function updateTeamSize(size: number): UserProgress {
  const progress = getProgress();
  progress.teamSize = Math.max(1, size);
  saveProgress(progress);
  return progress;
}

export function getTotalSavedMinutes(progress: UserProgress): number {
  return progress.roiData.reduce((sum, entry) => sum + entry.savedMinutes, 0);
}

export function getAnnualHoursSaved(progress: UserProgress, useTeamMultiplier: boolean = false): number {
  const totalMinutesSaved = getTotalSavedMinutes(progress);
  const annualMinutes = totalMinutesSaved * 52;
  const annualHours = annualMinutes / 60;

  if (useTeamMultiplier) {
    return annualHours * progress.teamSize;
  }
  return annualHours;
}

export function unlockNextDay(): UserProgress {
  const progress = getProgress();
  const maxUnlocked = Math.max(...progress.unlockedDays);
  const nextDay = maxUnlocked + 1;

  if (nextDay <= 14 && !progress.unlockedDays.includes(nextDay)) {
    progress.unlockedDays.push(nextDay);
    progress.lastUnlockTime = new Date().toISOString();
    saveProgress(progress);
  }

  return progress;
}

export function canAutoUnlock(): boolean {
  const progress = getProgress();
  if (!progress.lastUnlockTime) return false;

  const lastUnlock = new Date(progress.lastUnlockTime);
  const now = new Date();
  const hoursSinceUnlock = (now.getTime() - lastUnlock.getTime()) / (1000 * 60 * 60);

  return hoursSinceUnlock >= 24;
}

export function resetProgress(): UserProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}
