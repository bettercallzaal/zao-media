# ZM - ZAO Media

The media home for The ZAO. One place for everything the ZAO produces or appears in - podcasts, shows, Spaces, streams, and earned-media appearances - logged once and shared everywhere.

> **ZM = ZAO Media = ZAO Morning.** The daily "ZM" greeting across the ZAO IS a ZAO Media moment - the double meaning is intentional. Every morning is a ZAO Media touchpoint.

## What this is

Not a directory of links (that's the [Nexus](https://bettercallzaal.com/nexus.html)). ZM is the media itself, indexed and shareable:

- **Earned** - podcast guest spots, features, press (appearances ON other shows)
- **Live** - Farcaster Spaces, Twitch/Restream streams, X Spaces
- **Produced** - ZAOstock recaps, WaveWarZ battles, ZABAL Gamez sessions, newsletters
- **Community** - member casts, COC Concertz sets, artist spotlights

## The one rule: log once, generate outward

The source of truth is `content/*.json` - one file per media item. Run `node build.mjs` (or `npm run build`) and it GENERATES the whole site: the hub (`index.html`), each item page (`appearances/<slug>/index.html`), and `media-log.md`. A GitHub Action rebuilds automatically on any `content/*.json` change and pushes the result, so **adding one JSON file publishes a new media item.** Downstream surfaces (the ZABAL Games hub, socials, clips) derive from the same source. Same model as the ZAO's ICM boxes: one source upstream, everything else generated.

### Add a media item

1. Drop a `content/<date>-<slug>.json` (copy an existing one for the schema).
2. Earned appearance with a transcript? Put `transcript.md` in `appearances/<slug>/`.
3. `npm run build` (or just push - the Action does it). Done - hub + page + log update.

## Structure

```
content/<date>-<slug>.json       the source of truth (one per media item)
build.mjs                        the generator (no deps) - content -> site
index.html                       GENERATED hub
media-log.md                     GENERATED human-readable log
appearances/<slug>/index.html    GENERATED item page
appearances/<slug>/transcript.md hand-added transcript / notes
docs/system-design.md            how ZM works + the roadmap
docs/brand-kit.md                the brand-building playbook (voice, spellings)
```

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal. Email: info@thezao.com. No emojis, no em dashes, prose over lists.

## Latest

- **2026-07-30** - [Just DAO It with Adam Miller](./appearances/2026-07-30-just-dao-it/) - DAO governance attacks, ZAO's soulbound Respect defense, WaveWarZ, AI-agent legal entities. [YouTube](https://youtu.be/rTQ7nYdh0YI)

## Origin

Graduated from the ZAOOS lab (research doc 2153). ZAOOS is where ZAO experiments get prototyped; when one is ready for its own home, it gets its own repo. This is ZM's.
