---
title: "The Design Is The Plan: Stabilizing AI Coding Agents with Rules"
date: January 29, 2026
tags: AI · Design · Technology · Vibe Coding
description: "How to Use .mdc Files to Enforce Design Consistency"
reading: 4 min read
---

![](https://substack-post-media.s3.amazonaws.com/public/images/7c7a8a88-189e-45af-b58a-1ef77514199f_1024x559.jpeg)

We’ve all been there. You spin up a new instance in Cursor (or your preferred vibe coding tool). You paste in your initial prompt, full of hope and clear direction. The first few iterations are magic. Components look right, the layout is crisp, and the logic holds.

Then, the drift sets in.

Buttons start using hex codes instead of variables. Margins become inconsistent. The agent “hallucinates” a new navigation pattern that contradicts the one you established ten minutes ago.

This isn’t a failure of intelligence; it’s a failure of memory. An AI agent acts like a developer with amnesia: it can only reason against its **context window**. As you work, that window fills up with code snippets, debugging logs, and chatter. Eventually, the original intent falls out of the buffer. The agent literally loses its grounding.

The solution isn’t “better prompting” every time you need a button. The solution is structural. We need to treat our Design System not just as a visual guide, but as a rigid configuration file for the AI.

**The Design Is The Plan.**

## The Problem: Context Window Entropy

When an agent starts a session, its context is pristine. It sees your instructions clearly. But as the session grows, “entropy” increases. The agent prioritizes the most recent tokens (usually your specific bug fix request) over the foundational instructions located thousands of tokens back.

To fix this, we need a mechanism that forces the agent to reference the “Source of Truth” before every significant action. In tools like Cursor, this is achieved through `.mdc` (Markdown Context) files or similar “Rules for AI” configurations.

## The Solution: The .mdc File

Think of an `.mdc` file as a constitution for your project. It is a lightweight, high-density file that lives in your repository. It doesn’t contain code implementation details; it contains the **rules of engagement**.

When you translate your Design System into an `.mdc` file, you are creating specific guardrails that the AI cannot ignore, regardless of how deep into the context window you get.

### How to Translate Design to Context

Designers are uniquely positioned to improve rapid prototyping here. We are used to defining constraints (grids, type scales, color palettes). Now, we just need to format those constraints so an LLM respects them.

Here is the blueprint for translating your visual system into an agent-readable format.

#### 1. Define the “Immutable” Core

Your `.mdc` file should start with the non-negotiables. This prevents the agent from inventing new shades of blue or random font sizes.

Markdown

```
# Design System Core (.mdc)

## Design Tokens
- **Typography**: STRICTLY use Tailwind classes.
  - Headings: `font-sans`, `tracking-tight`
  - Body: `font-sans`, `text-slate-600`
- **Colors**:
  - Primary: `bg-blue-600` (hover: `bg-blue-700`)
  - Surface: `bg-white`
  - Border: `border-slate-200`
- **Spacing**:
  - Use 4px grid system (Tailwind defaults).
  - Default card padding: `p-6`
  - Default gap: `gap-4`

## Component Rules
- **Buttons**: MUST be rounded-md, font-medium, focus-ring-2.
- **Cards**: MUST have `shadow-sm`, `border`, `rounded-lg`.
- **Inputs**: NEVER use default browser styles. Use `form-input` plugin styles.
```

#### 2. Establish Behavioral Guardrails

Beyond visuals, you must define *how* the agent writes code. This is where “The Design Is The Plan” comes alive. You aren’t just planning the UI; you are planning the code structure.

- **“No Hardcoding” Rule:** Explicitly forbid hardcoded values.
- **“Mobile-First” Rule:** Mandate that all CSS must be mobile-first (e.g., `w-full md:w-auto`).
- **“Component Isolation” Rule:** Instruct the agent that if a UI element is used twice, it must be extracted into a reusable component immediately.

#### 3. The “Anti-Drift” Prompt

Include a section in your `.mdc` file that instructs the agent on how to handle ambiguity.

> **Protocol for Ambiguity:**
>
> If a user request contradicts the Design System established in this file, STOP and ask for clarification. Do not assume a deviation is intentional.

## Why This Changes the Game

By moving your Design System from a Figma file (which the code agent can’t see) into an `.mdc` file (which the agent reads with every prompt), you achieve three things:

1. **Consistency at Scale:** You no longer need to remind the AI to “use the primary blue.” It’s in the constitution.
2. **Reduced Token Load:** You don’t have to paste your CSS variables into the chat repeatedly. They are indexed.
3. **Architectural Integrity:** You are forcing the agent to build *your* way.

The future of AI-assisted design isn’t about generating wild, unchecked ideas. It’s about curation and constraint. By translating your Design System into code-ready context, you turn the AI from a drift-prone junior developer into a disciplined architect that follows the plan because **the design** ***is*** **the plan**.

---
