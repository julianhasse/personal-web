---
title: "AI or Breach Assistant? Healthcare’s New Privacy Problem"
date: May 13, 2026
tags: Healthcare · AI · Design · Technology
description: "AI chatbots are giving out people’s real phone numbers"
reading: 7 min read
---

AI chatbots are getting very good at answering questions. Unfortunately, they are also getting very good at answering questions they probably should not answer.

![](https://substack-post-media.s3.amazonaws.com/public/images/b44f4d3b-6925-4002-acdc-632385344284_1536x1024.png)

A recent article described several cases where generative AI systems surfaced real people’s phone numbers in chatbot responses. One person reportedly received repeated calls from strangers looking for a lawyer, a product designer, and a locksmith. In another case, Google’s Gemini allegedly gave out a software developer’s personal WhatsApp number as if it were customer support for a payment app. In a third example, a researcher prompted Gemini for a colleague’s contact information and received that person’s personal cell number. The article also noted that DeleteMe, a company that helps people remove personal information from the internet, has seen a 400% increase in customer questions about generative AI and privacy.

That is already a serious consumer privacy problem. In healthcare, the same failure pattern becomes much more dangerous. It puts on a badge, walks into the EHR, and starts touching PHI.

The issue is not simply that AI “knows” things. The issue is that AI says things. Large language models are trained on massive amounts of data from the web and other sources. That data can include personally identifiable information, such as names, phone numbers, addresses, employer details, family connections, and public records. The article explains that experts believe some of these privacy failures may come from PII appearing in training data, although the exact mechanism is hard to determine. A chatbot might memorize data, retrieve it, infer it, hallucinate it, or stitch it together from old public records and internet residue. In technical terms, the model may be “generalizing.” In human terms, it may be handing out someone’s phone number like a confused receptionist with root access.

In healthcare, that ambiguity is not acceptable. If an AI assistant exposes the wrong phone number in a consumer setting, that is annoying and potentially harmful. If an AI assistant exposes the wrong patient’s phone number, appointment details, diagnosis, lab order, medication, insurance status, genetic test result, or oncology note, the problem is no longer “the bot got weird.” It may be an impermissible disclosure of protected health information.

PII is personal data. PHI is personal data with clinical context, legal obligations, and consequences. A phone number by itself may be personal information. A phone number connected to a patient record, lab order, diagnosis, appointment, insurance claim, portal account, or provider message can become PHI. The identifier is not the only issue. The context is what turns ordinary data into regulated data.

That is why healthcare AI cannot be treated like a generic chatbot with a stethoscope sticker. A system that says, “Call this number for customer support,” can create confusion. A system that says, “This patient’s genetic test requires prior authorization, contact them at this number,” can create a privacy incident. One is embarrassing. The other invites Compliance, Legal, Security, Privacy, Clinical Safety, and several people who use the phrase “circle back” without irony.

One of the most important points in the article is that some exposed information may have been technically public. A phone number might have appeared years ago on a workshop page, a forum post, a public record, or a stale website. But generative AI changes the access model. Before AI, finding that information might require searching, filtering, clicking through pages, and giving up somewhere between a cookie banner and an SEO content farm. With AI, the interaction becomes much simpler. A user asks for contact information, and the chatbot delivers a confident answer that may be private, wrong, outdated, or all three.

That is the real privacy shift. AI does not just search information. It packages it, summarizes it, normalizes it, and delivers it with the confidence of a junior analyst who just discovered pivot tables.

In healthcare, this means AI can lower the barrier to accessing PHI if it is connected to sensitive systems without proper controls. A clinician should not be able to casually retrieve information outside their role. A billing user should not receive clinical details they do not need. A support agent should not see diagnostic context when verifying a portal issue. A chatbot should not reveal patient information because a user phrased the prompt creatively. The model should not be rewarded for being “helpful” when the correct answer is, “You are not authorized to access that.”

Most AI systems now include guardrails. That is good. It is also not enough. The article describes situations where safeguards appeared inconsistent, including a case where a chatbot reportedly refused to provide certain personal information at first, but then suggested a more “investigative-style” approach if the user supplied additional clues.

That is the AI equivalent of saying, “I cannot open the locked door, but if you tell me where the spare key is, I can help you not open it.”

Healthcare AI needs more than a polite refusal layer. It needs architecture. It needs authentication before access, authorization before retrieval, role-based permissions, patient-context locking, audit logs, data loss prevention, secure prompt handling, response filtering, vendor controls, business associate agreements when required, and incident response plans. If the governance strategy is “we told the model not to leak PHI,” that is not governance. That is a wish wearing a policy badge.

The EHR is not a playground sandbox. Healthcare AI use cases often sound harmless in the abstract. Summarize the chart. Draft a message. Recommend a lab test. Find missing documentation. Pre-fill an order. Generate a prior authorization summary. These are useful capabilities, and they can reduce real administrative burden. But every one of them can involve PHI. That means the AI assistant is not just a productivity feature. It is part of the healthcare information system.

A healthcare AI assistant should understand the difference between general medical knowledge and patient-specific information. “What is this test used for?” is not the same as “Should this specific patient receive this test?” The second question requires patient context, user permissions, clinical safeguards, and traceability. Mixing those modes casually is how a chatbot becomes a compliance piñata.

The system around the model should enforce access, not the model itself. The AI should inherit permissions from the EHR or enterprise identity system. It should only retrieve data the user is allowed to see. It should stay locked to the active patient and workflow. If the user is ordering a test for Patient A, the assistant should not retrieve, summarize, or mention Patient B. Ever. Patient-context locking should be boring, strict, and deeply unglamorous. Boring is good in compliance. Boring means nobody is writing a breach notification letter at midnight.

Healthcare AI should also make its outputs verifiable. If an assistant says a patient needs a specific form, payer rule, AOE response, or supporting document, the user should be able to see where that answer came from. Was it pulled from the EHR, a lab compendium, a payer policy, a prior order, or a hallucination dressed in business casual? No source, no trust.

AI belongs in healthcare. But healthcare AI cannot be designed like a general-purpose chatbot with rounded corners and a compliance disclaimer. It needs privacy-aware architecture, strict access controls, minimum-necessary data handling, vendor governance, auditability, and UX patterns that make the safe path the easy path.

Because in healthcare, the worst AI failure is not always a wrong answer. Sometimes it is the right-looking answer, shown to the wrong person, about the wrong patient, with no one able to explain how it happened.

*And if your chatbot can do that, it is not an assistant. It is a breach notification generator with a friendly typing animation.*
