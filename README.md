# ZM - ZAO Media

The media home for The ZAO. One place for everything the ZAO produces or appears in - podcasts, shows, Spaces, streams, and earned-media appearances - logged once and shared everywhere.

> ZM = ZAO Media. (Note: "ZM" is also the ZAO's daily social greeting, "ZAO Morning" - the media-brand name is still being finalized; this repo is the home regardless of the final name.)

## What this is

Not a directory of links (that's the [Nexus](https://bettercallzaal.com/nexus.html)). ZM is the media itself, indexed and shareable:

- **Earned** - podcast guest spots, features, press (appearances ON other shows)
- **Live** - Farcaster Spaces, Twitch/Restream streams, X Spaces
- **Produced** - ZAOstock recaps, WaveWarZ battles, ZABAL Gamez sessions, newsletters
- **Community** - member casts, COC Concertz sets, artist spotlights

## The one rule: log once, generate outward

Everything starts in [`media-log.md`](./media-log.md) - the source of truth. Downstream surfaces (a public media page, the ZABAL Gamez hub, social posts, clips) are generated FROM the log, never hand-maintained in parallel. Same model as the ZAO's ICM boxes: the source is upstream, everything else is derived.

## Structure

```
media-log.md                    the source of truth (newest first)
docs/system-design.md           how ZM works + the roadmap
docs/brand-kit.md               the brand-building playbook (voice, spellings, generate-outward)
appearances/<date>-<slug>/      one folder per earned-media appearance
    README.md                   the entry (summary, links, clip candidates)
    transcript.md               the transcript / notes
```

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal. Email: info@thezao.com. No emojis, no em dashes, prose over lists.

## Latest

- **2026-07-30** - [Just DAO It with Adam Miller](./appearances/2026-07-30-just-dao-it/) - DAO governance attacks, ZAO's soulbound Respect defense, WaveWarZ, AI-agent legal entities. [YouTube](https://youtu.be/rTQ7nYdh0YI)

## Origin

Graduated from the ZAOOS lab (research doc 2153). ZAOOS is where ZAO experiments get prototyped; when one is ready for its own home, it gets its own repo. This is ZM's.
