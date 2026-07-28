---
title: "The Double-Talk Trick: Repeating Prompts for Better AI"
date: January 15, 2026
tags: Healthcare · AI · Design · Research
description: "Boosting AI Logic by Repeating the Question"
reading: 3 min read
---

![](https://substack-post-media.s3.amazonaws.com/public/images/7e4424b5-d3a6-46c7-8609-d91a08847f1e_1024x559.jpeg)

I recently stumbled across this new research on a technique called RE2, or “Re-Reading,” and it is honestly the kind of dead simple UX fix that makes me want to laugh and cry at the same time.

The concept is embarrassingly straightforward. You literally just repeat the prompt within the input. That is it. You tell the model the instruction, and then you immediately tell it to read the instruction again.

The prompt structure looks something like this: **Q: [Your Question] Read the question again: [Your Question]**

I know what you are thinking. This sounds too stupid to work. But the benchmarks are wild. We are talking about **accuracy boosts of up to 76% on certain reasoning tasks**. In the world of healthcare UX, where we usually fight tooth and nail for a 2% improvement in clinician efficiency, a double digit jump is massive.

Think about why this works for humans. When I am designing an interface for an Electronic Health Record, I know that clinicians are cognitive misers. They scan. They skim. They miss details because their brains are trying to save energy. LLMs do the same thing. They process tokens linearly and sometimes glaze over the nuance in the middle of a complex query.

By forcing the model to process the input twice, you are essentially creating a bidirectional attention mechanism. You are giving the model a second pass to build a better mental image of the problem before it starts generating a solution. It is the digital equivalent of “measure twice, cut once” but for neural networks.

From a design perspective, this is gold. We do not need to burden the user with this. I would never ask a nurse to type their query twice. That would be a usability nightmare. But we can handle this in the orchestration layer. The user types their question about drug interactions once, and our backend whispers it into the AI’s ear a second time before fetching the answer. The user gets a smarter, more accurate response, and they have no idea we are using the toddler tactic of repetition to get it.

It is particularly exciting for the high stakes stuff we deal with daily. We are not just generating marketing copy here. We are summarizing patient discharge notes and flagging potential adverse events. If saying the same thing twice helps the AI catch a subtle contraindication it would have otherwise missed, then I am all for it.

Of course, it is not a magic bullet for everything. It increases the input token count, which costs a tiny bit more money and adds a fraction of a second to the latency. But in a field where accuracy is literally a matter of life and death, that is a trade off I am willing to make every single time.

So the next time you are arguing with a stubborn stakeholder or a confused AI, just remember the RE2 technique. Don’t rephrase. Don’t get angry. Just say it again. It works for ChatGPT, and honestly, it usually works for the Chief of Medicine too.
