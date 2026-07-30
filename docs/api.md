# ZM media API - how the team adds media programmatically

Three ways in, no server anywhere. Everything lands as `content/*.json`; the build Action regenerates and publishes the site.

## 1. Web form (no code, needs any GitHub account)

Hub page -> "+ Add media to ZM" -> fill the issue form. A workflow turns it into a PR. Zaal merges, page is live.

## 2. API endpoint (for scripts, bots, apps)

The endpoint is GitHub `repository_dispatch`:

```
POST https://api.github.com/repos/bettercallzaal/zao-media/dispatches
Authorization: Bearer <TOKEN>
Accept: application/vnd.github+json
```

Body:

```json
{
  "event_type": "add-media",
  "client_payload": {
    "publish": false,
    "media": {
      "title": "WaveWarZ Artist Interview: Example",
      "date": "2026-07-30",
      "class": "produced",
      "show": "WaveWarZ Artist Interviews",
      "guest": "Example Artist",
      "youtubeUrl": "https://youtu.be/VIDEOID",
      "summary": "One paragraph on what it covers.",
      "brands": ["WaveWarZ"],
      "links": [{ "label": "WaveWarZ", "url": "https://wavewarz.com" }]
    }
  }
}
```

- Required: `title`, `date` (YYYY-MM-DD). Everything else optional.
- `class`: earned | live | produced | community (defaults to community).
- `publish: false` (default) opens a PR for review. `publish: true` commits straight to main - live in ~1 minute. Give trusted teammates publish rights by telling them to set it true.
- `youtubeUrl` or `youtubeId` either works; the page gets the embed automatically.

curl example:

```bash
curl -X POST https://api.github.com/repos/bettercallzaal/zao-media/dispatches \
  -H "Authorization: Bearer $ZM_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d @media.json
```

### Getting a token to hand out

1. github.com -> Settings -> Developer settings -> Fine-grained personal access tokens -> Generate new token.
2. Resource owner: bettercallzaal. Repository access: only `zao-media`.
3. Permissions: Repository -> Contents: Read and write. (That is all `repository_dispatch` needs.)
4. Set an expiry (90 days is sane), generate, share the token with the teammate over a private channel.

One token per teammate beats one shared token - revoke individually if needed.

## 3. Local (Zaal / Claude)

Add `content/<date>-<slug>.json`, run `node build.mjs`, push. See CLAUDE.md.

## Notes

- The API never accepts HTML or scripts - items are JSON only and every value is escaped at build time.
- PRs from the API are labeled by branch prefix `media/`.
- Rate limits are GitHub's own (5,000 requests/hour per token) - never a real constraint here.
