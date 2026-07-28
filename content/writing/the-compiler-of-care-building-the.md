---
title: "The Compiler of Care: Building the LLM Wiki for Design and Healthcare"
date: April 13, 2026
tags: Healthcare · AI · Design · Technology
description: "Claude + Obsidian = Second Brain"
reading: 4 min read
---

In his recent exploration of LLM Knowledge Bases, Andrej Karpathy reframed a mundane task—note-taking—into a high-leverage engineering workflow. He posits that our personal documents, research papers, and messy transcripts are essentially **Source Code**. They are human-readable but unoptimized for rapid execution. The LLM, in this mental model, acts as a **Compiler**. It takes your raw, fragmented input and transforms it into a synthesized, queryable **Executable**: a structured markdown wiki.

![](https://substack-post-media.s3.amazonaws.com/public/images/aa0471dc-6bcc-4dec-9953-601b4dcb5726_960x494.gif)

For those operating at the intersection of design, clinical research, and healthcare delivery, this isn’t just a productivity hack. It is a necessary architectural shift. We are drowning in “Source Code” like patient journey maps, EHR usability audits, and clinical application prototypes. We lack the “Executable” to make real-time decisions.

**The Problem Karpathy Solves**

Traditional LLM workflows hit a fundamental wall: **context limits**. Every time you query an LLM, you’re starting fresh. You need to re-provide context, re-explain your project, and essentially treat the LLM as stateless. This creates friction and limits what you can ask.

Karpathy’s insight was simple but powerful: **build a persistent knowledge base that the LLM maintains**.

#### The Raw Input: Data Ingest

The workflow begins by indexing source documents into a `/raw` directory. In a healthcare design context, this includes FDA regulatory guidelines, PubMed articles, Figma handoff notes, and interview transcripts from clinicians. Karpathy suggests using tools like the Obsidian Web Clipper to convert web articles into markdown. For researchers, this means your browser becomes a funnel. Every time you find a study on Small Language Model (SLM) utility in offline clinical settings, it gets clipped and dumped into the raw folder.

#### The Compilation: From Mess to Markdown

The LLM then incrementally “compiles” your wiki. It reads the raw data and generates a directory of `.md` files. It creates summaries, establishes backlinks, and categorizes data into concepts.

Imagine a “Patient Safety” category that the LLM maintains. Instead of you manually tagging every document, the LLM reads a new usability report about a lab-ordering interface and automatically updates the “Safety” article with fresh insights on error rates. It maintains the index so you don’t have to. The LLM is the architect of the knowledge base while you remain the director.

#### The Frontend: Obsidian as your Healthcare IDE

Karpathy uses **Obsidian** (free tool that stores files on local machine as opposed to the cloud) as the “IDE” to view the raw data and the compiled wiki. This fits perfectly with a Live-Design methodology. Since the knowledge base is just a collection of local markdown files, it remains private and portable. You can use plugins like Marp to turn your research wiki into a slide deck for a stakeholder meeting in seconds. Your technical “vibe coding” projects and design system documentation live in the same ecosystem, cross-linked by an agent that understands the context of both.

#### Q&A and Clinical Intelligence

Once the wiki reaches a critical mass (think 100+ articles or 400K words), it transcends being a simple folder of notes. It becomes a queryable agent. You can ask complex questions such as “What are the recurring friction points for nurses using the current EHR diagnostic assistant?” The LLM agent doesn’t just search for keywords. It researches the answers across your entire wiki and renders the output as a new markdown file or a visualization.

You can even run “health checks” or linting over your data. The LLM can identify inconsistencies in clinical trial data or suggest missing links between a specific UI pattern and its performance in accessibility audits. It imputes missing data via web search and suggests new research directions.

#### Beyond the Context Window

The endgame of this workflow is moving from “context” to “weights.” As your repository grows, the next step is synthetic data generation and fine-tuning. This allows your local model to “know” your specific design language and clinical research natively.

The transition from manual documentation to an LLM-managed wiki represents a shift from being a writer to being a curator. In the high-stakes world of healthcare design, where information density is a literal matter of life and death, we need our knowledge to be compiled and executable. Stop writing notes. Start compiling your research.

Download links: [obsidian.md](http://obsidian.md), [claude.ai](http://claude.ai)

Obsidian + Claude integration:

![](https://substack-post-media.s3.amazonaws.com/public/images/96710841-86f3-4ce8-b0f3-f5f14a19dafd_962x3472.png)
