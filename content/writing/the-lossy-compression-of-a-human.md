---
title: "The lossy compression of a human life"
date: February 10, 2026
tags: AI · Design · Technology · Opinion
description: "Tokenization: How Language Models Chew Words Into Digestible Pieces"
reading: 7 min read
---

Before a language model can read your message, something slightly violent has to happen: your words get chopped up. Not into letters, not into words, but into something in between called tokens. Think of it as the linguistic equivalent of meal prep. You don’t eat a whole chicken; you break it into breasts, thighs, and that weird bit near the tail nobody talks about. Tokenization is the same idea, applied to text.

![](https://substack-post-media.s3.amazonaws.com/public/images/0d63a6e7-f187-4885-bb29-859e4155bbd7_1024x559.jpeg)

A token can be a full word (”hello”), part of a word (”un” + “believ” + “able”), a single character, or even a space. The goal is to find a representation that balances vocabulary size with sequence length. Too many unique tokens and the model needs an impossibly large dictionary. Too few, and every sentence becomes a novella of individual characters. The sweet spot lives in the land of subword tokenization.

The dominant algorithm behind modern tokenization is **Byte Pair Encoding (BPE)**, originally developed by Philip Gage in 1994 as a data compression technique. It was later adapted for NLP by Sennrich et al. in 2016, and it has since become the backbone of tokenization in models like GPT, Claude, and LLaMA. Let me walk you through how it works, step by step.

BPE starts at the character level. Imagine your entire training corpus is reduced to its UTF-8 byte sequences. Every unique byte is a token. Your initial vocabulary is tiny (256 entries for raw byte-level BPE). Your sequences, however, are absurdly long. A single word like “tokenization” becomes 12 individual tokens: t-o-k-e-n-i-z-a-t-i-o-n. Not exactly efficient.

Here’s where the magic, or rather the statistics, kicks in. BPE iteratively scans the corpus and counts every adjacent pair of tokens. The most frequently occurring pair gets merged into a single new token. This merge rule is recorded, the vocabulary grows by one, and the process repeats.

A Concrete Example

![](https://substack-post-media.s3.amazonaws.com/public/images/0da5a4af-ca8a-4617-b6a1-a7a9f404cd67_1822x836.png)

The final tokenization might be [”unhappi”, “ness”], which neatly captures the morphological boundary between root and suffix. BPE doesn’t know linguistics, but it rediscovers it through statistics. That’s either beautiful or slightly unnerving, depending on your philosophical disposition.

**Why Not Just Use Words?**

Fair question. Word-level tokenization seems intuitive, but it collapses under real-world conditions. The English language alone has millions of distinct word forms once you account for inflection, compounding, slang, typos, code, URLs, and whatever “yeetified” means. A word-level vocabulary that can handle all of this would be enormous, wasteful, and still encounter unknown words constantly. BPE solves the out-of-vocabulary problem elegantly: even novel words get broken into known subwords. The neologism “ChatGPTified” might become [”Chat”, “G”, “PT”, “ified”], and the model can infer meaning from familiar pieces.

**Tokenizing the Living: Healthcare’s Parallel Problem**

Now let’s take a conceptual leap. In NLP, tokenization means breaking continuous text into discrete, computable units. In healthcare, we face an eerily similar challenge: breaking continuous, messy, gloriously interconnected biological reality into discrete, computable units. And both domains share the same fundamental tension: the representation is never the thing itself.

A patient walks into a hospital. They are a continuous, analog, deeply entangled biological system. Their heart rate affects their kidney function, which affects their electrolyte balance, which affects their cognition, which affects whether they accurately describe their symptoms. They are, in the most literal sense, a corpus of interconnected signals.

But to treat them, we must tokenize them. We break them into lab values (creatinine: 1.2 mg/dL), diagnostic codes (ICD-10: E11.65), imaging slices (CT scan, slice 47 of 312), vital signs (BP: 130/85), and narrative fragments (”patient reports intermittent chest pain, worse with exertion”). Each of these is a token: a discrete symbol meant to stand in for something continuous, complex, and alive.

Just as BPE’s merge decisions determine how a model perceives language, our choices about how to “tokenize” patients determine how medicine perceives disease. And these choices are far from neutral.

ICD-10 codes are the BPE vocabulary of medicine. There are over 70,000 of them, and they attempt to discretize the full spectrum of human suffering into alphanumeric tokens. “E11.65” means “Type 2 diabetes mellitus with hyperglycemia.” Clean, searchable, billable. But it says nothing about the patient who can’t afford insulin, who skips meals to make rent, whose hyperglycemia is really a symptom of poverty. The token captures the biology; it drops the humanity.

This is the healthcare equivalent of BPE’s multilingual bias. Conditions that are common, well-funded, and well-studied get crisp, granular tokens. A heart attack has dozens of specific ICD codes. But chronic fatigue? Fibromyalgia? Long COVID? These messy, poorly understood conditions get vague, catch-all codes. They’re the Thai script of medicine: underrepresented in the vocabulary, so they shatter into imprecise fragments that lose information at every boundary.

**The Merge Problem in Reverse**

Consider a patient with diabetes, depression, and chronic back pain. In the electronic health record (EHR), these become three separate problem list entries, managed by three different specialists, documented in three different note sections. *The tokenization is clean. But the reality is that these conditions form a vicious cycle: pain causes immobility, immobility worsens blood sugar, poor glycemic control deepens depression, depression reduces treatment adherence, and the wheel keeps turning. The boundaries we drew for computational convenience obscure the most clinically important feature: the interaction.*

This is precisely analogous to a tokenizer splitting “New York” into [”New”, “York”]. Each piece is technically correct, but the meaning lived in the combination. If your model treats them as independent tokens, it might confuse the city with a directive to acquire a person named York.

Healthcare data has the same property, but we routinely destroy it. Lab values are stored as time-stamped snapshots, but the trend between them often matters more than any individual reading. A creatinine of 1.4 is unremarkable. A creatinine that rose from 0.8 to 1.4 in 48 hours is a kidney screaming for help. When we tokenize lab values as independent data points rather than as elements in a temporal sequence, we lose the narrative arc. And in medicine, the narrative is often the diagnosis.

**Toward Better Tokenization, Everywhere**

The lesson of tokenization, in both NLP and healthcare, is that *how you decompose a system determines what you can learn from it*. A bad tokenizer doesn’t just lose information; it creates systematic blind spots that compound silently through every downstream task.

In NLP, the community is responding with innovations like byte-level models that skip tokenization entirely, dynamic tokenizers that adapt to domain, and multimodal architectures that can process text, images, and structured data in a unified representation. The frontier of the field is moving toward representations that lose less.

**Healthcare needs a parallel revolution. We need EHR systems that preserve temporal narratives, not just snapshots. We need diagnostic vocabularies that can represent the spaces between categories, not just the categories themselves. We need clinical NLP models trained on vocabularies that treat medical language in Mandarin with the same granularity as English. And above all, we need to remember that every time we tokenize a patient into data points, we are making a lossy compression of a human life. The art of good medicine, like the art of good tokenization, lies in losing as little as possible.**

────────────────────────────────────

*In the end, tokenization is an act of translation. We take something rich and continuous and render it into something discrete and computable. Whether that something is a sentence or a human body, the challenge is the same: honor the original by choosing your boundaries wisely. Because every token you create is also a token of trust that the thing you’re representing will survive the journey from whole to parts and back again.*
