# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"The 14-Day Executive AI Sprint" - A lightweight, mobile-responsive web application providing a guided 14-day AI learning experience for executives.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Architecture

Next.js single-page application with Tailwind CSS.

### File Structure
```
src/
├── app/
│   ├── layout.tsx      # Root layout with dark theme
│   ├── page.tsx        # Dashboard view
│   └── globals.css     # Tailwind imports + custom styles
├── components/
│   ├── Dashboard.tsx   # Progress bar, day cards
│   ├── DayView.tsx     # Day content display
│   ├── CopyButton.tsx  # Copy prompt with "Copied!" feedback
│   └── ShareButton.tsx # Generate share message
├── lib/
│   ├── storage.ts      # LocalStorage helpers for progress
│   └── types.ts        # TypeScript interfaces
└── data/
    └── content.json    # 14-day curriculum content
```

### Core Features
- **Progression System**: Day 1 visible initially; subsequent days unlock via 24-hour timer or manual unlock
- **Content Structure**: Each day has "The Why", "The Task", and "The Copy-Paste Prompt"
- **Progress Persistence**: LocalStorage saves completed days
- **Share Progress**: Generates pre-filled email/Slack message

### Design Requirements
- Executive Dark Mode aesthetic
- Minimalist, clean typography (Inter or system-serif)
- Zero clutter
- Mobile-responsive
