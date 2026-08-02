# ZM - ZAO Media

The media home for The ZAO. One place for everything the ZAO produces or appears in - podcasts, shows, Spaces, streams, and earned-media appearances - logged once and shared everywhere.

**Live site:** https://bettercallzaal.github.io/zao-media/

> **ZM = ZAO Media = ZAO Morning.** The daily "ZM" greeting across the ZAO IS a ZAO Media moment - the double meaning is intentional. Every morning is a ZAO Media touchpoint.

## State of the archive (2026-08-02)

**598 media items across 20+ shows, spanning April 2024 to today.** 13 earned appearances. 4 owned YouTube channels catalogued (738 videos), 1,500 X Spaces archived, 100+ transcripts stored. Built out in one marathon session on 2026-07-30/31 from a single seed entry; the full hunt is documented in `docs/media-universe.md`.

| Section | Count | What |
|---------|-------|------|
| Earned | 13 | Guest spots and features on other people's shows (Just DAO It, Crypto Magic Hour, Token for Your Thoughts, Eden Creators ETH series, Undivided Attention, Rich Bartuc, Farcaster Batches) |
| BCZ YapZ | 20 | Zaal's interview show, all with transcripts |
| Let's Talk About Web3 | 28 | Co-hosted weekly (3 seasons), video + pods.media |
| Let's Talk About Ethereum | 7 | The successor show, ongoing |
| ZABAL Gamez Workshops + Firesides | 39 | June 2026 buildathon sessions, transcripts |
| WaveWarZ interviews + battles | 22 | Artist interviews and live-traded battles |
| COC Concertz | 8 | Community concerts #2-#7 + metaverse shows |
| ZAO Festivals | 3 | ZAO-PALOOZA 2024 x2, ZAO-CHELLA countdowns |
| X Spaces | 443 | ZAO-ecosystem spaces from the full 1,500-space archive |
| Plus | - | Audius releases, ZAO Fractal, B&Z Builds, Metaverse Meetups, MetaMu collabs |

## The one rule: log once, generate outward

The source of truth is `content/*.json` - one file per media item. `node build.mjs` (no dependencies) generates everything:

| Generated | What it is |
|-----------|-----------|
| `index.html` | The hub - grouped by show, earned first, live search |
| `appearances/<slug>/index.html` | One page per item: embed, links, summary, chapters, transcript |
| `media-log.md` | Human-readable log, newest first |
| `tracker.html` | Distribution CRM - yes/no per item: video, transcript, socials, clips, needs-publish |
| `media-crm.csv` | The CRM as a spreadsheet |
| `people.html` | Everyone who appears across ZAO media, cross-referenced |
| `feed.xml` | RSS, latest 50 |

A GitHub Action rebuilds on any `content/` change and Pages serves the result - **adding one JSON file publishes a new media item.** Never hand-edit generated files.

## Three ways to add media

1. **Web form** (anyone with a GitHub account): the "+ Add media" link on the hub opens an issue form; a workflow turns it into a content PR; merging publishes.
2. **API** (scripts, bots, teammates): POST JSON to the repo's `repository_dispatch` endpoint - opens a PR, or publishes instantly with `"publish": true`. Full guide with curl examples and token setup: [`docs/api.md`](docs/api.md).
3. **Local**: add `content/<date>-<slug>.json` (copy an existing one), drop `transcript.md` in `appearances/<slug>/` if there is one, run `npm run build`, push.

## The item schema (what a content JSON holds)

Required: `slug`, `class` (earned / live / produced / community), `title`, `date`. The rest as available: `show`, `host`/`hostHandle`/`hostUrl` (whose show, for earned), `guest`/`guestOrg` (who was on, for own shows), `brands[]`, `youtubeId` (drives the embed + og image), `links[]`, `summary`, `points[]`, `quote`, `chapters[]` (`{t, s, label}` - timestamp deep-links), `related[]`, `hasTranscript`, and `dist` (`{socials, clips, notes}` - the CRM flags).

## The CRM

`tracker.html` + `media-crm.csv` + a live Google Sheet (IMPORTDATA - always current). Auto-derived per item: video live, audio live, transcript, needs-publish. Manual flags live in each item's `dist` block - edit JSON, rebuild, done. The sheet never syncs back; JSON is always the truth.

## Documentation map

| Doc | What it holds |
|-----|---------------|
| [`docs/media-universe.md`](docs/media-universe.md) | THE master map: every platform ZAO is on, the full research trail, import backlog, corrections to older inventories, Zaal's standing commitments and open leads |
| [`docs/youtube-catalog.md`](docs/youtube-catalog.md) | Raw listings of all 4 owned channels (@bettercallzaal, @wavewarz, @thezaodao, @zaofestivals) + 60 Twitch VODs with download-ready IDs |
| [`docs/spaces-catalog.md`](docs/spaces-catalog.md) | All 1,500 X Spaces (hosted / co-hosted / spoken-in) with listen links |
| [`docs/meetings-log.md`](docs/meetings-log.md) | Private-meeting notes (names only, no public entries - per Zaal's rule) |
| [`docs/api.md`](docs/api.md) | The team submission API |
| [`docs/future-roadmap.md`](docs/future-roadmap.md) | The top 3 gaps + designs: auto-ingest, metrics layer, clip/chapter debt |
| [`docs/system-design.md`](docs/system-design.md) | Original design + roadmap (from ZAOOS research doc 2153) |
| [`docs/brand-kit.md`](docs/brand-kit.md) | Voice, spellings, generate-outward playbook |

## Standing rhythm

Zaal works ZM daily, 5-6pm EST Monday-Friday. New episodes of ongoing shows (LTAE, workshops, battles) get logged as they land - via any of the three paths above.

## Known gaps (deliberate, documented)

- **Analytics**: no view/play counts captured per item - metrics are a future layer.
- **Auto-ingest**: new uploads on the 4 channels are logged manually; an RSS-polling auto-logger is the obvious next automation.
- **Preservation**: ZM links media, it does not store video. Backup of X Spaces audio, Twitch VODs, and the local vaults is a separate track (see media-universe).
- **Farcaster Spaces**: the one archive never swept - links come from Zaal as they surface.
- The top 3 gaps have full designs in [`docs/future-roadmap.md`](docs/future-roadmap.md); open leads live in `docs/media-universe.md`.

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal. Email: info@thezao.com. No emojis, no em dashes, prose over lists. Palette navy #141e27 / gold #e0ddaa.

## Origin

Graduated from the ZAOOS lab (research doc 2153). ZAOOS is where ZAO experiments get prototyped; when one is ready for its own home, it gets its own repo. This is ZM's.
