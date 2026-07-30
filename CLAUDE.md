# CLAUDE.md - ZM (ZAO Media)

The media home for The ZAO: podcasts, shows, Spaces, streams, and earned-media appearances - logged once, shared everywhere. Graduated from the ZAOOS lab (research doc 2153).

## The one rule

Source of truth = `content/*.json` (one per media item). Run `node build.mjs` -> it generates the hub (index.html), each `appearances/<slug>/index.html`, and media-log.md. NEVER hand-edit the generated files - edit the JSON and rebuild. A GitHub Action rebuilds on any content/*.json push. ZM = ZAO Media = ZAO Morning (the daily greeting is the media touchpoint - intentional).

## Structure

- `media-log.md` - source of truth, newest first
- `appearances/<date>-<slug>/` - one folder per earned appearance (README + transcript)
- `docs/system-design.md` - how ZM works + roadmap
- `docs/brand-kit.md` - voice, spellings, generate-outward playbook

## When adding media

1. Add `content/<date>-<slug>.json` (copy an existing one for the schema).
2. Earned appearance with a transcript? Put `transcript.md` in `appearances/<slug>/`.
3. `npm run build` (or push - the Action rebuilds). Verify the generated page.
4. Draft socials (ZAOOS `/socials` skill) linking the ZM PAGE (not raw platform) + mark clip candidates.
5. Ground on the relevant ICM box first for any brand copy (`docs/brand-kit.md`).

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal. Email info@thezao.com. No emojis, no em dashes, prose over lists. Palette navy #141e27 / gold #e0ddaa.

## Commit as

Zaal Panthaki <zaalp99@gmail.com>. Never commit secrets. Never dump raw PII (third-party emails/phones) - published podcast transcripts are fine (already public).
