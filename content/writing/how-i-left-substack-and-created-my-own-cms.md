---
title: "How I left Substack and created my own CMS"
date: "2026-07-29"
description: "Introducing: Editorial OS"
reading: "5 min read"
author: "Julian Hasse"
cover: "https://www.julianhasse.com/assets/articles/how-i-left/cover.png"
cover_alt: "How I left Substack and created my own CMS"
draft: false
featured: false
---

When I decided to leave Substack, I thought my next step would be simple.

Find another platform.

Import my subscribers.

Keep writing.

That lasted about ten minutes.

The more I looked at alternatives, the more I realized they all suffered from the same problem: my content would always live inside someone else's product.

Some platforms were beautifully designed.

Others had excellent newsletter tools.

A few had great SEO.

But every one of them required trusting a company to remain aligned with my interests years into the future.

Vendor lock-in has always bothered me.

This time, I decided to do something about it.


## My website became the product

I already owned the domain.

I already paid for hosting.

So I started asking a different question.

What if my website wasn't just my portfolio?

What if it became my publishing platform?

That immediately changed the architecture.

Instead of building a website that happened to contain articles, I wanted a system whose only job was publishing.

The requirements became surprisingly simple.

* Markdown should be the source of truth.
* GitHub should store every article.
* My website should render everything dynamically.
* There should be no database.
* No WordPress.
* No PHP.
* No build process.

Just HTML, CSS, JavaScript, GitHub, and Markdown.


## Markdown became my CMS

People often assume a CMS has to be a complicated application.

Mine isn't.

Every article is just a Markdown file stored in GitHub.

Publishing became as simple as committing another document.

The website reads the repository, renders the article, builds navigation, and displays everything using the same design language.

The content became portable.

If I ever decide to move platforms again, every article comes with me.

No exports.

No migrations.

No proprietary database.



## Then came the rabbit hole

Building the site was the easy part.

Then I started noticing little things.

Caching.

RSS.

Metadata.

Reading time.

Previewing articles before publishing.

Managing images.

Creating excerpts.

Generating social posts.

None of these problems are particularly difficult.

Together, however, they form an entire publishing workflow.

Before long I wasn't building a website anymore.

I was building a publishing system.


## Writing in VS Code felt... wrong

At first, I was writing every article in Visual Studio Code.

Markdown on the left.

Browser preview on the right.

Commit.

Push.

Refresh.

Repeat.

It worked.

But it never felt like the right tool.

As someone who spends every day designing software, I realized I was using tools optimized for developers instead of writers.

There had to be a better experience.



## My first attempt: a Git-based CMS

Naturally, I started looking for Git-based content management systems.

After some research, I landed on Pages CMS.

It was exactly what I needed... at least on paper.

It edited Markdown directly inside my GitHub repository.

No database.

No vendor lock-in.

No build process.

I installed it, configured my repository, connected everything, and within a few minutes I had a working browser-based editor.

Technically, it solved the problem.

Emotionally, it didn't.

It looked like a generic administration panel.

Functional.

Reliable.

But completely disconnected from the experience I wanted to create.

---

## Then everything changed... again

While discussing the CMS with ChatGPT, something unexpected happened.

> The conversation slowly shifted from "Which CMS should I use?"

to

> text"What if you built your own?"

At first I laughed.

Then the idea refused to go away.

Instead of adapting my workflow to someone else's editor, why not build an editor around the way I actually write?

That question became a project.



## Editorial OS

The working name is **Editorial OS**.

The goal isn't to replace Markdown.

Quite the opposite.

Markdown remains the source of truth.

Editorial OS simply becomes the workspace around it.

Imagine opening your browser and seeing your writing environment.

Articles.

Projects.

Drafts.

Assets.

Live preview.

GitHub publishing.

Everything in one place.

No database.

No server.

No complex infrastructure.

Just a beautifully designed workspace that happens to generate Markdown.



## AI belongs in the workflow

One lesson I've learned over the past year is that AI creates the most value before something is published.

Not after.

Editorial OS treats AI like an editor sitting beside you.

Rewrite a paragraph.

Suggest a stronger title.

Generate an excerpt.

Create a LinkedIn post.

Generate a newsletter version.

Suggest tags.

Improve SEO.

None of those features replace writing.

They simply reduce friction between an idea and publication.



## Building software for an audience of one

One of the nicest things about this project is that I'm its first user.

Every annoyance I encounter becomes an opportunity to improve it.

Every extra click becomes a design decision.

Every repetitive task becomes a candidate for automation.

Instead of trying to satisfy thousands of users, I'm optimizing for one workflow.

Mine.

Ironically, that may end up making the software useful to many more people.



## The irony isn't lost on me

I left Substack because I wanted more control over my writing.

In the process, I accidentally built:

* a GitHub-powered publishing platform
* a Markdown-based CMS
* a dynamic website
* and now, an AI-assisted editorial environment.

Sometimes the best projects aren't planned.

They emerge because you become dissatisfied with the tools you're using.



## What's next?

Editorial OS is still in its earliest days.

The roadmap is already growing.

I'd like to add live preview using my website's renderer, integrated GitHub publishing without personal access tokens, image management, scheduled publishing, RSS generation, analytics, AI-assisted editing, newsletter integration, and eventually a complete writing environment that feels less like a CMS and more like a creative studio.

The goal isn't to compete with existing publishing platforms.

The goal is much simpler.

Build the writing environment I've always wanted to use.

If other creators who value ownership, portability, and thoughtful design find it useful too, that will be the best possible outcome.
