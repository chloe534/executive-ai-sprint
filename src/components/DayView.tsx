"use client";

import { useState } from "react";
import { DayContent, ROIEntry, AITool, AI_TOOLS } from "@/lib/types";
import ROIModal from "./ROIModal";
import AILogo from "./AILogos";

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

    const merged = content.template.replace("{{USER_INPUT}}", userInput.trim());
    setMergedRequest(merged);
    await navigator.clipboard.writeText(merged);
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

      {/* Clear Task Overview */}
      <div className="bg-gradient-to-r from-executive-accent/20 to-transparent border-l-4 border-executive-accent rounded-r-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-executive-accent mb-3">📋 YOUR TASK</h2>
        <p className="text-xl text-white leading-relaxed">{content.theTask}</p>
      </div>

      {/* Clear Instructions Overview */}
      <div className="bg-gradient-to-r from-green-500/20 to-transparent border-l-4 border-green-500 rounded-r-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-400 mb-3">🎯 WHAT TO ASK THE AI</h2>
        <p className="text-xl text-white leading-relaxed">{content.instructions}</p>
      </div>

      {/* Main Workflow Card */}
      <div className="bg-executive-card border border-executive-border rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-white mb-6 text-center">Follow These 3 Steps</h2>

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
            Don't worry about formatting, just paste it all in. We'll combine it with the instructions above.
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
            We'll combine your {content.inputLabel.toLowerCase()} with the instructions and copy it to your clipboard.
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
                  Request Created & Copied to Clipboard!
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
            Click the button, then paste with <strong>⌘V</strong> (Mac) or <strong>Ctrl+V</strong> (Windows)
          </p>
          <div className="ml-11">
            <a
              href={aiTool?.url || "https://chat.openai.com"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-4 w-full py-6 rounded-xl font-bold text-2xl text-center transition-all ${
                currentStep === 3
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/30"
                  : "bg-executive-border text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              {preferredAI && <AILogo tool={preferredAI} className="w-8 h-8" />}
              Open {aiTool?.name || "AI Assistant"} & Paste
            </a>
          </div>
        </div>
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
