---
title: "The terminal is the medium: the retro aesthetics of CLIs"
date: June 5, 2026
tags: AI · Design · Technology · Opinion
description: "Why command-line interfaces aren't just a throwback – they're the future."
reading: 7 min read
---

There’s a thought experiment I run sometimes when onboarding new designers to AI-assisted workflows: I ask them to open their terminal and just sit with it for a minute. No commands. No man pages. Just the blinking cursor, the monospace font, the black field. Most of them are visibly uncomfortable. One told me it felt like being handed a scalpel when she came in for a haircut.

That discomfort is the whole point.

![](https://substack-post-media.s3.amazonaws.com/public/images/20900baa-868f-4ff7-95a2-003bf5527028_1536x1024.png)

The terminal doesn’t apologize for what it is. It renders no loading skeletons, plays no onboarding music, offers no confetti animation when you successfully type `ls`. It just waits. In a profession that has spent the last decade arguing about whether buttons should be 8px or 12px rounded, this blankness is almost confrontational. Which is probably why we spent so long trying to paper over it with friendlier interfaces, and why those interfaces are now giving way to something older.

## McLuhan would have had opinions

Marshall McLuhan’s famous provocation, “the medium is the message,” means roughly that the container changes the content. Television doesn’t just deliver news; it turns news into spectacle. The medium shapes cognition before a single word is spoken.

Apply this to interface design and things get uncomfortable fast. The smooth, frictionless UIs we’ve been building for the past decade aren’t neutral delivery systems. They’re arguments. They argue that computation should be invisible, that the machine should feel like nothing, that any sign of process or effort is a failure state to be designed away. The skeleton loader isn’t just a loading state; it’s an ideology. “Nothing to see here. Trust us. Look at this pleasant shimmer.”

The terminal argues the opposite. Every line of output is the computer showing its work. When you run a build and watch a hundred lines cascade down the screen, you’re witnessing the actual process, not a abstraction of it. The medium doesn’t pretend to be something else. A command prompt is honest in a way that a modal dialog rarely manages to be.

This is, I think, why terminal aesthetic has such staying power with the people who actually build things. It’s not that engineers are nostalgic for VT100 terminals. It’s that the terminal is the only major UI paradigm that has never lied to them about what’s happening.

## The texture problem

Here’s a diagnostic question for any interface: can you tell something is happening when something is happening? Not “can you see a spinner” but can you feel the weight of the operation, the back-and-forth, the actual passage of time between cause and effect?

Modern design answered this question by eliminating it. If you can’t feel the lag, it’s not lag, it’s ambience. The entire aesthetic vocabulary of the 2010s, cards, white space, ghost buttons, micro-copy so soft it reads like a lullaby, was engineered to smooth over the seams of computation. The goal was to make you forget there was a machine involved at all.

It worked. It also made everything feel the same.

Walk through the design of any major consumer app built between 2015 and 2022 and you’ll find the same Figma library reskinned in different brand colors. The same hover states. The same type scale. The same gesture toward personality achieved by putting an emoji in the empty state. The medium had successfully consumed the message; there was no message left. Just surfaces.

The terminal, meanwhile, aged like a weird wine. Every major developer tool launched in the last five years either has a terminal mode, looks like a terminal, or ships with a CLI that people use by choice when the GUI exists. Vercel, Railway, Linear, Warp, Fig before it died: the command line isn’t fading because power users find it efficient. It’s resurging because it has grain. You can feel where it was made.

## Craft as signal

As a UX designer who also writes code, I’ve watched two professional communities pass each other like ships in a fog. Designers fled complexity toward abstraction; engineers fled abstraction back toward the terminal. The irony is that both moves were motivated by the same thing: a desire for things to feel real.

What the terminal-aesthetic revival actually signals is a hunger for interface craft. Not decoration, craft. The difference is that decoration is applied to a surface, while craft is inherent to a process. When someone hand-codes a personal site with visible table structures and bitmap fonts and an actual hit counter, they’re not making a design decision about aesthetics. They’re making a claim about authorship. This was made, not generated. Someone’s hands were on this.

That distinction matters more now than it did five years ago, because now we have AI generating entire design systems from a single prompt, and the outputs are technically competent and aesthetically hollow in the exact same way every Figma template has always been aesthetically hollow. The smoothness is total. There are no fingerprints.

The terminal aesthetic is, among other things, a fingerprint.

## What this actually means for design

The practical question isn’t “should we bring back green text on black backgrounds” (though honestly, for the right product, yes). It’s whether the interfaces we build communicate that a real process is occurring and that a real person made the thing.

A few observations from the trenches. First, honesty scales. Developers who have used Warp or Ghostty will tell you that a well-designed terminal can feel more modern than a sloppy SaaS dashboard, because the terminal never tries to hide the model underneath. The design choices are additive, not corrective. Second, friction isn’t always failure. A well-placed command that requires you to understand what you’re doing isn’t bad UX; it’s appropriate UX for a context where the stakes are real. The obsession with reducing friction at all costs produces interfaces that feel like they were designed by someone who was afraid of you making a decision. Third, the indie web people figured this out before we did. Neocities pages with handmade HTML, RSS-first blogs, sites that proudly expose their source code as part of the aesthetic: these are not throwbacks. They’re prototypes for a more honest design language.

## The cursor blinks for a reason

I keep coming back to the cursor. In a world of push notifications and algorithmic feeds and interfaces that are always doing something to hold your attention, the terminal just blinks. Patient, empty, waiting for you to decide what comes next.

That’s not an accident of old technology that nobody fixed. That’s the interface communicating its model: you have the agency here. The machine is ready. What do you want to do?

We built a decade of design practice around the idea that users don’t want agency, they want flow. We eliminated choices, smoothed transitions, made the interface do the deciding wherever possible. And we were right, for a lot of contexts. But we overcorrected so hard that we started mistaking passivity for delight.

The terminal aesthetic is coming back because people remember what it felt like to be on the other side of an interface that respected them. Not one that coddled them, not one that gamified their attention, but one that simply said: you’re capable of understanding what I’m doing, so here it is, in text, one line at a time.

That’s not retro. That’s just honest. And honesty, it turns out, has very good replayability.
