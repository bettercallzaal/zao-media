# ZM brand kit - the media-brand playbook

The reusable playbook for building ZAO media on-brand. Pulls the best of what the ZAO has already built into one place, so any appearance / show / announcement gets produced consistently.

## Ground first

Before producing anything for a ZAO brand, ground on its canonical source (the ICM box on useicm.com - `icm <brand>` in a ZAO terminal, or the `research/identity/icm-boxes/` copies in ZAOOS). The box is upstream; ZM media is generated FROM it, never in parallel. If a downstream surface and the box disagree, the box wins.

## Voice

- Grounded, rhythmic, culturally aware. Lead with what was built/shipped/said, not how it felt.
- No emojis. No hashtags. No em dashes (hyphens only). Prose over bullet lists in public copy.
- Contribution over celebration. "shipped X" beats "excited about X".
- Timeless language - never "this morning" / work-day times.
- Social posts open with **ZM** (ZAO Morning greeting).

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal, SongJam, Magnetiq. Email: info@thezao.com. Palette: navy #141e27, gold #e0ddaa.

## Generate outward (one item -> many surfaces)

Given one media item (an appearance, a show, an announcement), produce in one pass:

1. **The log entry** (`media-log.md` + an `appearances/<date>-<slug>/` folder if earned).
2. **Socials** - all platforms, native per platform (the ZAOOS `/socials` skill: Firefly for FC+X, then GCs, TG, Discord, LinkedIn, Facebook). Correct spellings enforced.
3. **The page copy** - a short blurb for the ZM public media page.
4. **Clip brief** - the timestamped clip candidates for the clip pipeline (zaalclip).

## What ZM reuses (don't rebuild)

- `/socials` (platform posts), `/onepager`, `/clipboard`, `/meeting` (transcripts -> recaps), the `/icm` skill (grounding), the ZAOOS `publish/` lib.
- The content-everywhere map (ZAOOS research doc 2135) - the owned-media preserve/repurpose plan.
- Firefly (FC+X cross-post), Postiz (clip fan-out).

ZM is an ORCHESTRATOR of these, not new capability. Reuse before build.

## The `/zao-brand` skill (planned)

A skill that runs this playbook automatically: ground on the box -> pull voice + spellings -> given a media item, generate the log entry + socials + page copy + clip brief in one pass. Spec lives here; build tracked in ZAOOS.
