---
title: "What is LOINC and How It Enables Health Data Exchange"
date: February 28, 2025
tags: Healthcare · Design · Technology
description: "A common language for identifying health measurements, observations, and documents"
reading: 5 min read
---

In the world of healthcare, data interoperability — the ability of different systems to communicate and understand each other — is both a necessity and a challenge. When healthcare organizations exchange lab results, vital signs, or clinical documents, each system typically has its own way of naming and identifying tests and observations. One laboratory might call a test “CMP,” while another refers to the same panel as “Comprehensive Metabolic Panel” or even just “Metabolic Panel.” This fragmentation leads to isolated data silos, where the same data exists in different forms across systems, making seamless communication and data integration extremely difficult.

## The Role of LOINC

This is exactly where **LOINC** — Logical Observation Identifiers Names and Codes — steps in to bridge the gap. Developed by the Regenstrief Institute in 1994, LOINC is a universal coding system specifically designed to identify health measurements, observations, and documents. Its goal is simple but powerful: to serve as a globally agreed-upon **common language** that systems can use to describe tests, observations, and clinical documents.

When data is exchanged between two systems, using **LOINC codes** allows both sides to understand exactly what the data represents, regardless of the local naming conventions used within each system. Instead of only sending "local" test identifiers like internal lab codes, organizations can also include corresponding **LOINC codes**, which ensures that the receiving system knows what the data actually is, even if the names or formats differ locally.

![](https://substack-post-media.s3.amazonaws.com/public/images/dc0e5403-48af-4688-a482-a46a88c3fde5_600x355.png)

---

## LOINC: Representing the “Question”

At the heart of the LOINC system is the concept of a **universal identifier** for a specific measurement or observation — in other words, the **“question” being asked.** For example, if a laboratory test asks, "What is the patient's glucose level in blood?" there is a **LOINC code** that precisely represents that question.

In contrast, the **“answer”** (or result) can come from another standardized coding system, such as **SNOMED CT**, if needed. However, many results, especially quantitative ones like lab values, are simply numbers (e.g., glucose = 98 mg/dL) and do not require a separate coded answer.

---

## Sending Local and Standard Codes Together

Even though LOINC provides a universal way to identify tests and observations, organizations are not required to abandon their local codes. Instead, **best practice** is to send both the local code (used internally) **and** the corresponding LOINC code (understood globally). This dual-coding approach offers two major benefits:

1. **Preserves Local Context:** Internal users still see the familiar codes and names they work with every day.
2. **Enables Troubleshooting:** If data mismatches occur, having both the local and LOINC codes helps isolate the issue faster.

This is particularly easy to do in HL7 messaging standards. In **HL7 v2**, for example, the **OBX-3** segment allows the transmission of **two sets of triplets** — one for the **local concept** (code, name, and coding system) and one for the **standard vocabulary concept** (code, name, and coding system, such as LOINC).

---

## LOINC Term Basics: What’s in a LOINC Code?

Every LOINC code consists of **six major parts**, designed to describe exactly what is being observed or tested:

1. **Component** (what is being measured, e.g., Glucose)
2. **Property** (what kind of information is being recorded, e.g., Mass concentration)
3. **Timing** (when the measurement occurs, e.g., Point in time or over a period)
4. **System** (where the measurement is taken, e.g., Blood)
5. **Scale** (how the result is reported, e.g., Quantitative)
6. **Method** (how the measurement is performed, e.g., Enzymatic method)

For example, the LOINC code for **Glucose in Blood by Laboratory** is:
`2345-7` — and behind this number is the fully structured definition:

- **Component:** Glucose
- **Property:** Mass Concentration
- **Timing:** Point in Time
- **System:** Blood
- **Scale:** Quantitative
- **Method:** Laboratory method

This **granular specificity** ensures that every observation is described consistently, regardless of language, system, or local practices.

---

## The Scope of LOINC

LOINC’s coverage goes far beyond just laboratory tests. Its scope includes:

- **Laboratory Observations:** Blood tests, microbiology, toxicology, etc.
- **Clinical Observations:** Vitals like blood pressure, height, and weight.
- **Clinical Documents:** Summaries such as discharge summaries, radiology reports, and progress notes.
- **Survey Instruments:** Patient-reported outcomes and research surveys.

This broad scope makes LOINC a critical part of not only **laboratory interoperability** but also the exchange of comprehensive **clinical and patient-reported data** across healthcare settings.

---

## How to Get and Use LOINC

**LOINC is freely available** to anyone — laboratories, health systems, app developers, and researchers alike. You can download the latest release from

https://loinc.org

, which includes:

- The **LOINC database**, with all active and deprecated codes.
- The **RELMA** tool (Regenstrief LOINC Mapping Assistant), a software application that helps organizations map their **local test codes** to **LOINC codes**.
- Documentation, implementation guides, and educational materials.

## Implementing LOINC in Your System

To implement LOINC successfully, organizations typically follow these steps:

1. **Inventory Your Tests/Observations:** Start with a list of all lab tests, vital signs, and documents in your system.
2. **Map to LOINC:** Use RELMA or similar tools to match each local test to a corresponding LOINC code.
3. **Configure Your Interface:** Ensure that data exchange messages (such as HL7 or FHIR messages) include both the **local code** and the mapped **LOINC code**.
4. **Test and Validate:** Exchange test messages with trading partners to verify that the mappings work correctly.

---

## Why LOINC Matters for the Future

In an era where **data liquidity** — the seamless flow of patient data across settings — is essential to patient care, **LOINC is foundational**. Whether supporting **public health reporting**, **patient-facing apps**, or **clinical decision support**, a common language for observations ensures that the right data gets to the right place, understood correctly every time.

Without LOINC (or a similar global standard), data sharing becomes chaotic, requiring costly custom mappings between every pair of systems. With LOINC, data moves freely and consistently, **enabling better patient care, easier research, and improved public health responses**.

---

In summary, LOINC serves as the **universal translator** for tests, observations, and documents, unlocking **true interoperability** across healthcare. As health data exchange accelerates — driven by regulatory mandates like the **US ONC’s Interoperability Rule** and global initiatives — adopting and mastering LOINC is not just recommended; it’s **essential**.

---
