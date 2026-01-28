"use client";

export default function WelcomeHeader() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Your 14-Day AI Assistant Training
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
        We're going to turn AI into your personal Chief of Staff.
        <span className="block mt-2 text-executive-accent font-medium">
          Just 5 minutes a day for 2 weeks. No tech skills needed.
        </span>
      </p>
    </div>
  );
}
