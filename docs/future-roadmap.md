# ZM future roadmap - the top 3 things this archive still cannot do

Written 2026-08-02 at close-out of the build-out session. These are the three highest-value gaps identified after sweeping every known surface - the things nobody looked for, found, or built yet, ranked by what future ZM work should tackle first. Everything else (backup track, Farcaster spaces sweep, open leads) lives in media-universe.md.

## 1. Auto-ingest - new media should log itself

**The gap:** all 598 items were logged by hand or by one-off scripts. Nothing watches the sources. Every new BCZ YapZ episode, workshop VOD, WaveWarZ battle, or LTAE session will need a human (or a session like this one) to notice it and write JSON. That guarantees drift - the exact drift this repo was built to end.

**The design (ready to build):**
- A scheduled GitHub Action (daily) pulls each channel's public RSS (`https://www.youtube.com/feeds/videos.xml?channel_id=...` for all 4 channels - IDs in youtube-catalog.md) plus the pods.media/LTAE feed.
- Diff video IDs against `youtubeId` values already in `content/*.json`.
- For each new ID: classify by title pattern (the show-name regexes from this session's importers are proven), draft a content JSON, open a PR titled `auto: new media <title>`.
- Zaal merges (or edits then merges) - same trust model as the issue form. No API keys needed; RSS is public.
- Spaces: spacesdashboard has no feed; re-run the scrape monthly (method in the zm-media-map memory: drive Livewire pagination, clipboard exfil, pace it).

**Effort:** one workflow + one script, both patterned on `.github/workflows/media-submission.yml` and the session's importers. A day of work.

## 2. Metrics layer - the archive is blind to what performs

**The gap:** ZM knows what exists but not what works. Zero view counts, play counts, or listener numbers are captured anywhere - not in the JSON, not in the CRM. Distribution decisions ("what should we clip? what deserves socials first?") are being made blind, and press pitches ("X thousand views across...") cannot cite numbers.

**The design:**
- Schema addition per item: `"stats": { "views": N, "capturedAt": "YYYY-MM-DD" }` - additive, breaks nothing.
- A capture script (yt-dlp `--print view_count` per youtubeId, Audius API play_count, spacesdashboard listener counts already captured in spaces-catalog) run monthly by hand or by the same scheduled Action.
- Tracker page gets a Views column; the CRM sorts by it; "top performers" section on the hub becomes possible.
- History matters more than snapshots: append to a `stats-history.csv` rather than overwrite, so growth is visible.

**Effort:** capture script is trivial; the value compounds monthly. Start now, thank yourself in Q4 when ZAOstock press needs numbers.

## 3. The clip and chapter debt - distribution never happened

**The gap:** the original ZM design (system-design.md) centered on clip candidates - log once, CLIP outward. Reality: ~95% of the 598 items have empty `chapters`, zero `clips` flags are true, and the tracker shows 598/598 items without socials. The archive is a library, not yet a distribution engine. Meanwhile 100+ items HAVE transcripts sitting unused - the raw material for chapters is already in the repo.

**The design:**
- Chapters pass: for every item with `hasTranscript: true`, generate 8-15 chapters from the transcript timestamps (the BCZ YapZ description skill already contains the exact chaptering algorithm - port it, run it across the archive). Chapters make every item page deep-linkable and hand clip candidates to the pipeline for free.
- Clip pass: per Zaal, space-audio clips like the DevCon India one are the repeatable format. The workflow: pick chapter -> cut with ffmpeg from the space audio or YouTube source -> post via the zaalclip/Postiz lane -> flip `dist.clips`.
- Socials debt: 598 items, none shared. The daily ZM hour (5-6pm EST M-F) is the natural venue: one item per day through /socials, flip the flag, the tracker burns down visibly.

**Effort:** chapters are scriptable this week; clips and socials are a cadence, not a build.

## The infrastructure blueprint (added 2026-08-08)

The self-hosted media stack that would carry all three - ingest hub (MediaMTX), owned live surface (Owncast), 24/7 playout (ffplayout), overlays (SPX-GC), remote contribution (SRT/WHIP), VOD sovereignty (PeerTube), and the AI routing/privacy rules for the pipeline - is designed end-to-end with build order in ZAOOS research doc 2252 (self-hosted-media-stack-blueprint). Doc 2238 holds the preceding research digest.

## Why these three

Each one converts the archive from record into engine: auto-ingest keeps it true without labor, metrics tell it what matters, chapters/clips/socials make it reach people. Everything else found in the hunt (backup, Farcaster sweep, missing footage) is inventory work - these three are leverage.
