---
title: "Building a No-Dashboard CMS"
description: "The philosophy behind Panhinda: edit content where it lives, backed by Supabase row-level security."
pubDate: 2026-07-02
author: "Tharindu"
tags: ["cms", "supabase", "design"]
---

Most CMS tools bolt a separate dashboard onto your site. Panhinda takes a different route:
you edit content **in place**, on the real page.

## The visitor never knows

The public visits the site and sees ordinary, fast-loading content. There's no `/admin`
route to find, no obvious sign a CMS is involved at all.

## The admin just clicks

When you log in (via Supabase auth), editable regions light up with dashed outlines. You
click a heading or paragraph, type, and click away. Saved — instantly.

```jsx
<Editable id="home-title">
  <h1>My Static Title</h1>
</Editable>
```

## Security lives in the database

The important half is **Row Level Security** in Supabase:

- Everyone (`anon`) can *read* content.
- Only authenticated admins can *update* it.

That means the browser can talk to the database directly, safely, without a custom
backend to maintain.

## Why not build-time SQLite?

A remote database gives instant updates (no waiting on CI), handles traffic without file
locks, and ties naturally into auth. For a live, editable site, it's the pragmatic choice.

This blog is where all of that gets tested — one editable region at a time.
