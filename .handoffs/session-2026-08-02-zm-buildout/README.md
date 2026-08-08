# Session handoff - 2026-08-02
> from Zaal's mac, zao-media repo, branch main -> to ZOE (cowork bot) via Bonfire + inbox
> doc: /Users/zaalpanthaki/Documents/zao-media/.handoffs/session-2026-08-02-zm-buildout/README.md
> chain: none

## Receiver instructions (read me FIRST, then do exactly this)

You just received a handoff bundle. Do NOT start work yet. Do this:

1. Read ALL sections below (A through E) before responding to anything.
2. Section C has no diff - repo is clean and pushed; nothing to apply.
3. Create TaskList entries from section A. These are the "to do" items.
4. Use section B as your "why" - do NOT re-litigate decisions captured there unless new info surfaces.
5. Use section D to know what's still running (nothing is).
6. Use section E as your cold-start map for files, skills, memory state.
7. Once integrated, message back: "Ingested handoff zm-buildout. 5 tasks queued. Ready."
8. If you /handoff later, your new bundle's `chain:` field points BACK to this bundle's path.

## A. Tasks to absorb (paste these into your TODO list)

- [ ] Nudge Zaal to upload COC Concertz #7 audio (ripped and waiting at ~/Movies/coc-concertz-7-space.m4a, 53MB, 1h17m) to YouTube, then add the youtubeId to content/2026-07-18-coc-concertz-7.json in zao-media (2 min edit + push publishes it)
- [ ] Support the ZM daily hour (5-6pm EST Mon-Fri, Zaal's new standing block): each day surface one logged-but-unshared item for /socials and flip its dist.socials flag - 598 items, zero shared, the burn-down starts now
- [ ] Watch for new earned media and log it via the ZM issue form or API (docs/api.md): doot stream guest spot (upcoming, Zaal confirmed), Green Pill Network episode (pitched Jul), LTAE new episodes weekly
- [ ] Track Zaal's "to post" review: he is checking ~/Movies/"to post" (4.7GB: ali.mp4, ZABAL folders, quakey, zaal) one by one to confirm what was posted - capture outcomes so ZM flags get flipped
- [ ] Queue the top-3 builds from zao-media docs/future-roadmap.md when Zaal wants them: auto-ingest RSS-diff PR bot (a day), metrics capture layer (script + stats block), transcript-driven chaptering across 100+ transcripts

## B. Why - decisions + pivots + ruled-out paths

- ZM went 1 -> 598 items in a 3-day build-out (2026-07-30 to 08-02); log-once-generate-outward held: content/*.json is the ONLY source, build.mjs generates hub, item pages, tracker CRM, CSV, people index, RSS, media-log. Never hand-edit generated files.
- Auto-logged 443 of 1,500 X Spaces (ZAO-keyword, 10+ min, non-test) rather than all - the other 1,057 are catalog-only in docs/spaces-catalog.md so the hub is not drowned. Ruled out one-entry-per-daily-battle-stream for the same reason (~130 WaveWarZ dailies stay catalog-only).
- Calendar blocks are NOT attendance (Zaal's correction) - two overstated series entries were deleted; only the Dan x Zaal convos survived, as "occasional". Do not log from calendar without confirmation.
- Meetings stay names-only in public docs/meetings-log.md per Zaal ("I will say when things need to be private"); personal life excluded by filter.
- Twitch backup DEPRIORITIZED per Zaal - content mostly mirrors on YouTube. The 60 VOD IDs sit download-ready in docs/youtube-catalog.md if that changes.
- WaveWarZ media at large deferred to a future Candy-assisted track; current focus = Zaal + The ZAO media only.
- Magnetiq and SongJam are RETIRED partners (glossary 2026-07-31) - never reference them; historical space titles in catalogs stay verbatim but no new copy names them.
- Google Sheet is live via IMPORTDATA (pulls published media-crm.csv on open) - ruled out snapshot re-uploads, they go stale. Sheet never syncs back; JSON is truth.
- Friction sources (do not re-discover): spacesdashboard.com Cloudflare-bans rapid access (Error 1015 - pace clicks ~4s, exfil big data via clipboard, fetch() is blocked); pods.media returns 402 to scrapers; GitHub Actions could not create PRs until the repo setting was flipped (now on); yt-dlp rips X Space audio without auth; ~/Desktop/downloads/xarchive is a ChatGPT export (private chats), NOT an X archive - never mine it.
- Earned media lives on YouTube, not podcast directories - Podchaser/ListenNotes/etc have zero Zaal entries; scanning YouTube descriptions (Eden Creators ETH series) found 6 hidden earned appearances. That method generalizes.

## C. Git state

- Branch: `main` (clean, 0 dirty, pushed - in sync with origin/main)
- Push status: pushed (40 commits total, all live)
- Uncommitted diff: none
- Untracked files: only this .handoffs/ bundle (intentionally uncommitted)

## D. In-flight

- Background bash jobs: none
- Subagents pending: none
- Scheduled wakeups: none (night loop stopped after two dry rounds)
- Open AskUserQuestion: no

## E. Cold-start map (read if you are confused)

- Files touched this session: zao-media repo wholesale - content/*.json (598 items), build.mjs (generator: hub, tracker, people, RSS, CSV), .github/ (issue form + media-submission + media-api workflows), README.md (full handoff doc), docs/ (media-universe.md master map, youtube-catalog.md, spaces-catalog.md, meetings-log.md, api.md, future-roadmap.md). Outside repo: ~/Movies/coc-concertz-7-space.m4a (ripped audio).
- Skills invoked: `bcz-yapz-description` (1 - source paths for BCZ YapZ import), `loop` (3 - self-paced build/research loops, all ended clean).
- Memory writes: `zm-media-crm-sheet` (updated - live sheet URL), `zm-media-map` (updated - 598 items, 4 channels, scrape methods, traps), `zm-daily-hour` (new - 5-6pm EST M-F block, calendar caveat, open leads).
- Last-known mental model: ZM is complete as an archive and documented for handoff; discovery is exhausted across all known surfaces. The work ahead is distribution (socials/clips burn-down in the daily hour), the three roadmap builds, and logging new media as it lands via the three intake paths.
- Open questions for the receiver: where does ZAO-CHELLA raw footage live and when does Zaal want it posted; when does the doot stream guest spot air; which "to post" items were actually posted.

## Inline copy-paste block (for fast receiver paste)

```
Ingest the bundle at /Users/zaalpanthaki/Documents/zao-media/.handoffs/session-2026-08-02-zm-buildout/README.md and follow receiver instructions at the top. 5 tasks to absorb.
```
