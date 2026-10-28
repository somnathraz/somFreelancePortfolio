# Sites for dev posts — sign-in status and process

Checked 2026-10-28 in the **in-app browser** (the browser pane in the Claude app). Use this browser from now on: it holds your sign-ins and you can watch every step.

Legend: OK = signed in and ready. NO = not signed in. ? = could not verify. BLOCKED = the in-app browser refuses the site.

## A. Article platforms (full dev posts)

| Site | Status | How we post | Notes |
|---|---|---|---|
| somanathkhadanga.com | OK | commit + deploy (you approve) | canonical copy, always first |
| Dev.to | OK | dev.to/new, fill title/tags/canonical, publish | canonical in Advanced Options |
| Hashnode (BuildSaas) | OK | Write, markdown editor, then Article settings > Discovery > canonical | canonical box is far down the Discovery tab |
| Medium | OK | medium.com/p/import with the site URL, add 3 topics, publish | import sets canonical automatically |
| Substack | OK | new post, paste rich text, uncheck email, publish | no canonical field; add "Originally published at" line |
| Hackernoon | OK | Start Draft (Editor 3.0), insert HTML, settings, you press Submit | editors review; you tick consent and submit |
| DZone | ? | Cloudflare check blocked the pane | verify manually |
| Tumblr | NO | skip (low value for dev posts) | |

## B. Dev communities (short posts and links)

| Site | Status | How we post | Notes |
|---|---|---|---|
| Peerlist | OK | Scroll post with a link | tag #show |
| Indie Hackers | OK | new post with the link | good for Labs/traps and build stories |
| daily.dev | OK | submit the article link | picks up well-formed titles and images |
| Product Hunt | OK | launches only (not articles) | use for products, not blog posts |
| Reddit | BLOCKED | in-app browser refuses reddit.com | you post, or use Chrome extension later |
| Hacker News | NO | needs an account; I will not create one | Show HN for traps later |

## C. Social

| Site | Status | Rule |
|---|---|---|
| Facebook Page (Buildwithsom) | OK | every dev post, with the cover link card |
| Facebook personal profile | OK | Labs and traps posts only |
| EpicAstra | OK | never used for dev posts |
| LinkedIn | OK | Labs and traps build posts only, you post |
| X | OK (probably) | short post with link and cover; confirm before first use |
| Bluesky | ? | page loaded but sign-in not confirmed |
| Instagram | OK | you post; Claude only observes |
| YouTube | ? | youtube.com shows signed in; Studio asked to sign in again; you post, Claude observes |
| GitHub | OK | READMEs, releases, Discussions for traps and labs |

## Standard run (see doc/PUBLISHING.md for the full routing table)

Monday buyer post: Studio site, then Dev.to, Hashnode, Medium (a day later, Import), Facebook Page, short Peerlist post.
Thursday traps post: Studio site, then Dev.to, Hashnode, Medium, daily.dev, Indie Hackers, Peerlist, Facebook Page and personal profile, X if confirmed; LinkedIn is yours.
Thursday (after the traps post): Substack digest of the week's two posts, web only.
Hackernoon: only original first-person pieces, about monthly; you press Submit.
Log every result: `node scripts/publish-log.mjs set <slug> <platform> <status> --url ...`.

## What we learned (so it goes faster next time)

- The in-app browser blocks clipboard paste. For rich editors (Hackernoon) insert formatted HTML with a synthetic paste event; for markdown editors (Hashnode) set the textarea value, then type a space so the editor registers it.
- Never tick consent, ownership or terms boxes for you; you do those.
- Substack: uncheck "Send via email" unless you want the newsletter sent.
- Facebook: check which profile is active before posting (menu top right); EpicAstra is the default.
- File uploads (cover images) need you; the in-app browser cannot pick files.
- Set the viewport to 1280x800 for editors that need a desktop layout, then reset to desktop.
