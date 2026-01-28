"use client";

import { useState } from "react";
import { DayContent, ROIEntry, AITool, AI_TOOLS } from "@/lib/types";
import ROIModal from "./ROIModal";

interface DayViewProps {
  content: DayContent;
  isCompleted: boolean;
  preferredAI: AITool;
  onComplete: (roiEntry?: ROIEntry) => void;
  onBack: () => void;
}

type WorkflowStep = 1 | 2 | 3;

export default function DayView({ content, isCompleted, preferredAI, onComplete, onBack }: DayViewProps) {
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(1);
  const [mergedRequest, setMergedRequest] = useState("");
  const [showROIModal, setShowROIModal] = useState(false);

  const aiTool = preferredAI ? AI_TOOLS[preferredAI] : null;

  const handleCreateRequest = async () => {
    if (!userInput.trim()) return;

    // Merge user input with template
    const merged = content.template.replace("{{USER_INPUT}}", userInput.trim());
    setMergedRequest(merged);

    // Copy to clipboard
    await navigator.clipboard.writeText(merged);

    // Move to step 3
    setCurrentStep(3);
  };

  const handleDoneClick = () => {
    setShowROIModal(true);
  };

  const handleROISubmit = (entry: ROIEntry) => {
    setShowROIModal(false);
    onComplete(entry);
  };

  const handleROISkip = () => {
    setShowROIModal(false);
    onComplete();
  };

  const getStepStatus = (step: number): "completed" | "active" | "pending" => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "pending";
  };

  const getStepStyles = (status: "completed" | "active" | "pending") => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white border-green-500";
      case "active":
        return "bg-executive-accent text-white border-executive-accent";
      case "pending":
        return "bg-executive-border text-gray-500 border-executive-border";
    }
  };

  const getLineStyles = (step: number) => {
    return step < currentStep ? "bg-green-500" : "bg-executive-border";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-lg"
      >
        <span className="text-2xl">←</span> Back to Dashboard
      </button>

      <div className="mb-2 text-executive-accent font-medium text-lg">Day {content.day}</div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h1>
      <p className="text-xl text-gray-300 mb-8">{content.theWhy}</p>

      {/* Main Workflow Card */}
      <div className="bg-executive-card border border-executive-border rounded-2xl p-6 md:p-8">
        {/* Step Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${getStepStyles(
                  getStepStatus(step)
                )}`}
              >
                {getStepStatus(step) === "completed" ? "✓" : step}
              </div>
              {index < 2 && (
                <div className={`w-16 md:w-24 h-1 mx-2 rounded transition-all ${getLineStyles(step)}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Input */}
        <div className={`mb-8 transition-opacity ${currentStep >= 1 ? "opacity-100" : "opacity-40"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStepStyles(
                getStepStatus(1)
              )}`}
            >
              {getStepStatus(1) === "completed" ? "✓" : "1"}
            </div>
            <h2 className="text-xl font-semibold text-white">
              Paste your {content.inputLabel} here
            </h2>
          </div>
          <p className="text-gray-400 mb-4 ml-11">
            Don't worry about formatting, just paste it all in. We'll clean it up for you.
          </p>
          <div className="ml-11">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={content.inputPlaceholder}
              disabled={currentStep > 1}
              className={`w-full h-40 p-4 bg-executive-bg border border-executive-border rounded-xl text-white placeholder-gray-500 focus:border-executive-accent focus:outline-none resize-none text-lg ${
                currentStep > 1 ? "opacity-60" : ""
              }`}
            />
          </div>
        </div>

        {/* Step 2: Create Request */}
        <div className={`mb-8 transition-opacity ${currentStep >= 2 || userInput.trim() ? "opacity-100" : "opacity-40"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStepStyles(
                getStepStatus(2)
              )}`}
            >
              {getStepStatus(2) === "completed" ? "✓" : "2"}
            </div>
            <h2 className="text-xl font-semibold text-white">Create My AI Request</h2>
          </div>
          <p className="text-gray-400 mb-4 ml-11">
            We'll combine your {content.inputLabel.toLowerCase()} with our instructions to create the perfect request.
          </p>
          <div className="ml-11">
            {currentStep < 3 ? (
              <button
                onClick={handleCreateRequest}
                disabled={!userInput.trim() || currentStep > 2}
                className={`w-full py-5 rounded-xl font-bold text-xl transition-all ${
                  userInput.trim() && currentStep <= 2
                    ? "bg-executive-accent text-white hover:bg-blue-600"
                    : "bg-executive-border text-gray-500 cursor-not-allowed"
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl">✨</span>
                  Create My AI Request
                </span>
              </button>
            ) : (
              <div className="bg-green-500/10 border border-green-500 rounded-xl p-4 text-center">
                <span className="text-green-500 font-semibold text-lg flex items-center justify-center gap-2">
                  <span className="text-2xl">✓</span>
                  Request Created & Copied!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Go to AI */}
        <div className={`transition-opacity ${currentStep === 3 ? "opacity-100" : "opacity-40"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getStepStyles(
                getStepStatus(3)
              )}`}
            >
              3
            </div>
            <h2 className="text-xl font-semibold text-white">
              Go to {aiTool?.name || "Your AI Assistant"} and Paste
            </h2>
          </div>
          <p className="text-gray-400 mb-4 ml-11">
            Your request is ready! Click the button below, then paste (⌘V on Mac, Ctrl+V on Windows).
          </p>
          <div className="ml-11">
            <a
              href={aiTool?.url || "https://chat.openai.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-6 rounded-xl font-bold text-2xl text-center transition-all ${
                currentStep === 3
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30"
                  : "bg-executive-border text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-3xl">{aiTool?.emoji || "🤖"}</span>
                Open {aiTool?.name || "AI Assistant"} & Paste
              </span>
            </a>
          </div>
        </div>

        {/* What the AI will do */}
        {currentStep === 3 && (
          <div className="mt-8 p-4 bg-executive-bg rounded-xl border border-executive-border">
            <p className="text-gray-400 text-sm mb-2">What your AI assistant will do:</p>
            <p className="text-white">{content.instructions}</p>
          </div>
        )}
      </div>

      {/* Mark Complete */}
      <div className="mt-8 border-t border-executive-border pt-8">
        {isCompleted ? (
          <div className="flex items-center justify-center gap-3 text-green-500 text-xl">
            <span className="text-2xl">✓</span>
            <span className="font-semibold">Day {content.day} Completed!</span>
          </div>
        ) : (
          <button
            onClick={handleDoneClick}
            disabled={currentStep < 3}
            className={`w-full py-5 font-bold text-xl rounded-xl transition-all ${
              currentStep === 3
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-executive-border text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="flex items-center justify-center gap-3">
              <span className="text-2xl">✅</span>
              I Did It! Mark Day as Complete
            </span>
          </button>
        )}
      </div>

      {showROIModal && (
        <ROIModal day={content.day} onSubmit={handleROISubmit} onSkip={handleROISkip} />
      )}
    </div>
  );
}
