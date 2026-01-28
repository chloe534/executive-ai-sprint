"use client";

import { useState } from "react";
import { UserProgress } from "@/lib/types";
import { getAnnualHoursSaved, updateTeamSize } from "@/lib/storage";

interface ROISummaryProps {
  progress: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
}

export default function ROISummary({ progress, onProgressUpdate }: ROISummaryProps) {
  const [showTeamImpact, setShowTeamImpact] = useState(false);
  const [editingTeamSize, setEditingTeamSize] = useState(false);
  const [teamSizeInput, setTeamSizeInput] = useState(progress.teamSize.toString());

  const annualHours = getAnnualHoursSaved(progress, showTeamImpact);
  const hasROIData = progress.roiData.length > 0;

  const handleTeamSizeSubmit = () => {
    const size = parseInt(teamSizeInput) || 1;
    const updated = updateTeamSize(size);
    onProgressUpdate(updated);
    setEditingTeamSize(false);
  };

  if (!hasROIData) {
    return null;
  }

  return (
    <div className="bg-executive-card border border-executive-border rounded-xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">Annual Hours Saved</h3>
        <button
          onClick={() => setShowTeamImpact(!showTeamImpact)}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${
            showTeamImpact
              ? "bg-executive-accent text-white"
              : "bg-executive-border text-gray-400 hover:bg-gray-700"
          }`}
        >
          {showTeamImpact ? "Company Impact ON" : "Company Impact"}
        </button>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold text-white">
          {annualHours.toFixed(0)}
        </span>
        <span className="text-gray-400">hours/year</span>
      </div>

      {showTeamImpact && (
        <div className="mt-4 pt-4 border-t border-executive-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Team size multiplier</span>
            {editingTeamSize ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={teamSizeInput}
                  onChange={(e) => setTeamSizeInput(e.target.value)}
                  className="w-20 px-2 py-1 bg-executive-bg border border-executive-border rounded text-white text-sm"
                />
                <button
                  onClick={handleTeamSizeSubmit}
                  className="text-executive-accent text-sm hover:underline"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingTeamSize(true)}
                className="text-white font-medium hover:text-executive-accent transition-colors"
              >
                {progress.teamSize} people
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            If your entire team adopted these AI workflows, you'd save {annualHours.toFixed(0)} hours annually.
          </p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Based on {progress.roiData.length} completed task{progress.roiData.length !== 1 ? "s" : ""}, projected weekly
      </div>
    </div>
  );
}
