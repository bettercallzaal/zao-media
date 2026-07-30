# CLAUDE.md - ZM (ZAO Media)

The media home for The ZAO: podcasts, shows, Spaces, streams, and earned-media appearances - logged once, shared everywhere. Graduated from the ZAOOS lab (research doc 2153).

## The one rule

Log once in `media-log.md` (source of truth), generate everything else FROM it (page, socials, clips, the ZABAL Gamez hub). Never hand-maintain parallel copies. Same model as the ZAO ICM boxes.

## Structure

- `media-log.md` - source of truth, newest first
- `appearances/<date>-<slug>/` - one folder per earned appearance (README + transcript)
- `docs/system-design.md` - how ZM works + roadmap
- `docs/brand-kit.md` - voice, spellings, generate-outward playbook

## When adding media

1. Add the entry to `media-log.md` (schema at the top of that file).
2. Earned appearance? Also make `appearances/<date>-<slug>/` with a README + transcript.
3. Draft socials (ZAOOS `/socials` skill) + mark clip candidates for zaalclip.
4. Ground on the relevant ICM box first for any brand copy (`docs/brand-kit.md`).

## Canonical spellings (never autocorrect)

The ZAO, ZAOstock, WaveWarZ, ZOL bot, ZABAL Games, COC Concertz, Better Call Zaal. Email info@thezao.com. No emojis, no em dashes, prose over lists. Palette navy #141e27 / gold #e0ddaa.

## Commit as

Zaal Panthaki <zaalp99@gmail.com>. Never commit secrets. Never dump raw PII (third-party emails/phones) - published podcast transcripts are fine (already public).
