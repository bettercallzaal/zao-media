# Archive audit

Run `npm run audit:archive` to check every `content/*.json` record for a title, a real ISO date, at least one credit field, and a valid HTTP(S) source link. Credit can be a host, guest, publisher, quoted person, or brand. The audit reads the content source files and never rewrites them.

The pull request check audits only changed content records, so an older incomplete record does not block unrelated additions. Run the full audit locally to find historical gaps.

Use `npm run audit:archive -- --check-links` for a live source-link pass. Hosts may rate-limit or block automated requests. Only HTTP 200 counts as verified; other responses are reported without being treated as proof that a URL should be removed or replaced. The generated ZM appearance page is a separate link and does not prove the source link works.

The full archive currently has one known metadata gap: the X Space with ID `1zqJVqOawOWGB` has no date in either its content record or its row in `docs/spaces-catalog.md`. Supply a sourced date before changing that record; do not infer one from the title or filename.
