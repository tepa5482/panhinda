---
title: "Why We Chose Astro for SSR"
description: "How Astro's server output, content collections, and islands make it a great fit for a CMS-backed blog."
pubDate: 2026-06-25
author: "Tharindu"
tags: ["astro", "ssr", "architecture"]
---

We migrated this app from a plain Vite + React starter to **Astro**. Here's the reasoning.

## Content sites are Astro's home turf

Astro was built for content-heavy sites. Markdown files become type-safe entries through
**content collections**, and pages ship almost zero JavaScript by default — which keeps
things fast for readers.

## Real server-side rendering

By setting `output: 'server'` and using the `@astrojs/node` adapter, every request is
rendered on the server:

```js
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

That matters for a CMS: content can be fetched fresh on each request, so edits show up
immediately instead of waiting on a rebuild.

## Islands keep React available

Astro doesn't force you to abandon React. Interactive pieces can be dropped in as
**islands** with a `client:` directive. That's exactly how Panhinda's editable regions
will hydrate later — only where interactivity is actually needed.

The result: a fast static-feeling blog, real SSR under the hood, and a clear path to
inline editing.
