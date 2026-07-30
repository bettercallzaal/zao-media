#!/usr/bin/env node
/**
 * ZM build - log once, generate outward.
 *
 * Reads every media item from content/*.json (the single source of truth) and
 * generates: the hub (index.html), each item page (<slug>/index.html), and the
 * human-readable media-log.md. No dependencies - just Node. Run: `node build.mjs`.
 * A GitHub Action runs this on every push and deploys the result to Pages, so
 * adding one content/*.json file is all it takes to publish a new media item.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(ROOT, 'content');

const CLASS_LABEL = { earned: 'Earned - appearance', live: 'Live', produced: 'Produced', community: 'Community' };

/** Minimal HTML escape for text interpolated into markup. */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const HEAD = (title, desc, ogImage) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
${ogImage ? `<meta property="og:image" content="${ogImage}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta property="og:type" content="website">'}
<style>
  :root { --navy:#141e27; --navy2:#1c2a36; --gold:#e0ddaa; --ink:#eef2f6; --dim:#93a3b5; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:var(--navy); color:var(--ink); font:16px/1.65 system-ui,-apple-system,sans-serif; -webkit-font-smoothing:antialiased; }
  a { color:var(--gold); text-decoration:none; } a:hover { text-decoration:underline; }
  main,header,footer { max-width:820px; margin:0 auto; }
  header { padding:52px 20px 20px; } main { padding:16px 20px 60px; } footer { padding:22px 20px 60px; color:var(--dim); font-size:.85rem; border-top:1px solid rgba(224,221,170,.1); }
  .kicker { text-transform:uppercase; letter-spacing:.16em; font-size:.72rem; color:var(--dim); }
  h1 { font-size:2.3rem; line-height:1.12; margin:6px 0 8px; } .lead { font-size:1.12rem; color:var(--ink); max-width:640px; }
  .host { color:var(--dim); margin-bottom:16px; }
  h2 { font-size:1rem; text-transform:uppercase; letter-spacing:.1em; color:var(--gold); margin:32px 0 12px; }
  p { margin:12px 0; } ul { padding-left:20px; } li { margin:7px 0; }
  .card { display:block; background:var(--navy2); border:1px solid rgba(224,221,170,.14); border-radius:14px; padding:18px 22px; margin:12px 0; transition:border-color .15s, transform .15s; }
  .card:hover { border-color:rgba(224,221,170,.4); transform:translateY(-1px); text-decoration:none; }
  .card .cls { font-size:.7rem; text-transform:uppercase; letter-spacing:.12em; color:var(--dim); } .card h3 { font-size:1.18rem; margin:6px 0; color:var(--ink); } .card .meta { font-size:.9rem; color:var(--dim); }
  .embed { position:relative; padding-bottom:56.25%; height:0; border-radius:14px; overflow:hidden; margin:18px 0; border:1px solid rgba(224,221,170,.16); }
  .embed iframe { position:absolute; inset:0; width:100%; height:100%; border:0; }
  .links { display:flex; flex-wrap:wrap; gap:10px; margin:12px 0; } .links a { background:var(--navy2); border:1px solid rgba(224,221,170,.2); border-radius:8px; padding:8px 14px; font-size:.9rem; } .links a:hover { border-color:var(--gold); text-decoration:none; }
  .quote { border-left:3px solid var(--gold); padding:6px 0 6px 18px; margin:18px 0; font-size:1.1rem; }
  table { width:100%; border-collapse:collapse; margin:12px 0; font-size:.95rem; } th,td { text-align:left; padding:9px 10px; border-bottom:1px solid rgba(224,221,170,.14); } th { color:var(--gold); }
  .taxo { display:grid; gap:10px; grid-template-columns:1fr; } @media (min-width:620px){ .taxo{ grid-template-columns:1fr 1fr; } } .taxo div { background:var(--navy2); border:1px solid rgba(224,221,170,.1); border-radius:10px; padding:12px 14px; } .taxo strong { color:var(--gold); }
</style>
</head>
<body>`;

function itemPage(m) {
  const embed = m.youtubeId
    ? `<div class="embed"><iframe src="https://www.youtube.com/embed/${m.youtubeId}" title="${esc(m.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
    : '';
  const links = (m.links || []).map((l) => `<a href="${l.url}">${esc(l.label)}</a>`).join('\n    ');
  const points = (m.points || []).map((p) => `<li>${esc(p)}</li>`).join('\n    ');
  const chapters = (m.chapters || []).length
    ? `<h2>Chapters worth jumping to</h2>\n<table><tr><th>Time</th><th>Segment</th></tr>\n${m.chapters
        .map((c) => `<tr><td><a href="https://youtu.be/${m.youtubeId}?t=${c.s}">${esc(c.t)}</a></td><td>${esc(c.label)}</td></tr>`)
        .join('\n')}\n</table>`
    : '';
  const related = (m.related || []).length
    ? `<h2>Related</h2>\n<ul>\n${m.related.map((r) => `<li><a href="${r.url}">${esc(r.label)}</a></li>`).join('\n')}\n</ul>`
    : '';
  const transcript = m.hasTranscript ? `<a href="./transcript.md">Transcript</a>` : '';
  const ogImg = m.youtubeId ? `https://i.ytimg.com/vi/${m.youtubeId}/maxresdefault.jpg` : '';
  const hostLink = m.hostUrl ? ` (<a href="${m.hostUrl}">${esc(m.hostHandle || m.host)}</a>)` : '';
  const hostLine = m.guest
    ? `${esc(m.show)} - hosted by ${esc(m.host || 'Zaal')}, Better Call Zaal - with ${esc(m.guest)}${m.guestOrg ? ` (${esc(m.guestOrg)})` : ''}.`
    : `${esc(m.show)}, hosted by ${esc(m.host)}${hostLink} - with Zaal, Better Call Zaal.`;
  return `${HEAD(`${m.title} | ZM`, m.summary, ogImg)}
<main>
  <a class="kicker" href="../../">ZM - ZAO Media</a>
  <p class="kicker">${CLASS_LABEL[m.class] || m.class} - ${esc(m.date)}</p>
  <h1>${esc(m.title)}</h1>
  <p class="host">${hostLine}</p>
  ${embed}
  <div class="links">
    ${links}
    ${transcript}
  </div>
  <h2>What it covers</h2>
  <p>${esc(m.summary)}</p>
  ${points ? `<ul>\n    ${points}\n  </ul>` : ''}
  ${m.quote ? `<div class="quote">"${esc(m.quote)}" - ${esc(m.quoteBy || 'Zaal')}</div>` : ''}
  ${chapters}
  ${related}
</main>
<footer>ZM - the media home for The ZAO. Every morning is a ZAO Media moment. Contact: info@thezao.com.</footer>
</body></html>`;
}

function hubPage(items) {
  const card = (m) => `  <a class="card" href="./appearances/${m.slug}/">
    <span class="cls">${CLASS_LABEL[m.class] || m.class}${m.show ? ' - ' + esc(m.show) : ''}</span>
    <h3>${esc(m.title)}</h3>
    <p class="meta">${esc(m.date)}. ${esc(m.summary).slice(0, 220)}</p>
  </a>`;
  // earned first (credibility), then everything else grouped by show, newest first within groups
  const earned = items.filter((m) => m.class === 'earned');
  const rest = items.filter((m) => m.class !== 'earned');
  const shows = [...new Set(rest.map((m) => m.show || 'Other'))];
  const sections = [
    earned.length ? `  <h2>Earned - appearances (${earned.length})</h2>\n${earned.map(card).join('\n')}` : '',
    ...shows.map((s) => {
      const eps = rest.filter((m) => (m.show || 'Other') === s);
      return `  <h2>${esc(s)} (${eps.length})</h2>\n${eps.map(card).join('\n')}`;
    }),
  ].filter(Boolean).join('\n');
  return `${HEAD('ZM - ZAO Media', 'The media home for The ZAO - podcasts, shows, Spaces, streams, and earned-media appearances. Logged once, shared everywhere.', '')}
<header>
  <p class="kicker">ZM - ZAO Media - ZAO Morning</p>
  <h1>The media home for The ZAO.</h1>
  <p class="lead">Everything the ZAO produces or appears in - podcasts, shows, Spaces, streams, and earned-media appearances. One place, logged once, shared everywhere. Every morning is a ZAO Media moment.</p>
  <p class="lead" style="margin-top:10px"><a href="https://github.com/bettercallzaal/zao-media/issues/new?template=add-media.yml">+ Add media to ZM</a> - anyone can submit an appearance, stream, or show.</p>
</header>
<main>
${sections}
  <h2>What ZM covers</h2>
  <div class="taxo">
    <div><strong>Earned</strong> - podcast guest spots, features, press</div>
    <div><strong>Live</strong> - Farcaster Spaces, Twitch and Restream streams</div>
    <div><strong>Produced</strong> - ZAOstock recaps, WaveWarZ battles, ZABAL Games sessions</div>
    <div><strong>Community</strong> - member casts, COC Concertz sets, artist spotlights</div>
  </div>
</main>
<footer>ZM - the media home for <a href="https://thezao.com">The ZAO</a>. Built in the open - <a href="https://github.com/bettercallzaal/zao-media">github.com/bettercallzaal/zao-media</a>.</footer>
</body></html>`;
}

function mediaLog(items) {
  const entries = items
    .map((m) => {
      const links = (m.links || []).map((l) => `  - ${l.label}: ${l.url}`).join('\n');
      const chapters = (m.chapters || []).map((c) => `  - ${c.t} - ${c.label}`).join('\n');
      return `### ${m.title}

- **Class:** ${m.class}
- **Date:** ${m.date} (${m.status})
- **Host/Source:** ${m.guest ? `${m.show} - Zaal with ${m.guest}${m.guestOrg ? ` (${m.guestOrg})` : ''}` : `${m.host}${m.hostHandle ? ` (${m.hostHandle})` : ''} - ${m.show}${m.showHandle ? ` (${m.showHandle})` : ''}`}
- **Brands:** ${(m.brands || []).join(', ')}
- **ZM page:** https://bettercallzaal.github.io/zao-media/appearances/${m.slug}/
- **URLs:**
${links}
- **Topics/summary:** ${m.summary}
- **Clip candidates:**
${chapters}
`;
    })
    .join('\n---\n\n');
  return `# ZM - ZAO Media log (GENERATED - edit content/*.json, then \`node build.mjs\`)

> Source of truth is \`content/*.json\`. This file + the site are generated from it. Newest first.

---

${entries}`;
}

// --- run ---
const files = readdirSync(CONTENT).filter((f) => f.endsWith('.json'));
const items = files
  .map((f) => JSON.parse(readFileSync(join(CONTENT, f), 'utf8')))
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

for (const m of items) {
  const dir = join(ROOT, 'appearances', m.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), itemPage(m));
}
writeFileSync(join(ROOT, 'index.html'), hubPage(items));
writeFileSync(join(ROOT, 'media-log.md'), mediaLog(items));

console.log(`ZM build: ${items.length} item(s) -> hub + ${items.length} page(s) + media-log.md`);
