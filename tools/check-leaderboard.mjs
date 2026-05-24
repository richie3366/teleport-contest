#!/usr/bin/env node
/**
 * Fetch published leaderboard data and report whether a fork appears.
 * Usage:
 *   node tools/check-leaderboard.mjs [githubOwner]
 * Default owner: richie3366 (override for other forks).
 *
 * Data source: https://github.com/davidbau/mazesofmenace (mirrored from the judge).
 */
const DEFAULT_OWNER = 'richie3366';
const DATA_URL =
    'https://raw.githubusercontent.com/davidbau/mazesofmenace/main/leaderboard/data.json';

const owner = (process.argv[2] || DEFAULT_OWNER).replace(/^@/, '');

const res = await fetch(DATA_URL, { cache: 'no-store' });
if (!res.ok) {
    console.error(`Failed to fetch leaderboard: HTTP ${res.status}`);
    process.exit(1);
}
const data = await res.json();
const teams = data.teams || [];
const names = teams.map((t) => t.name);
const hit = teams.find(
    (t) => t.name === owner || (t.fork && String(t.fork).startsWith(`${owner}/`)),
);

console.log(`Leaderboard timestamp: ${data.timestamp || '?'}`);
console.log(`Teams listed: ${names.length}`);
if (hit) {
    console.log(`FOUND ${hit.name} (${hit.fork || 'no fork field'})`);
    console.log(JSON.stringify({ name: hit.name, fork: hit.fork, lastScored: hit.lastScored, public: hit.public }, null, 2));
    process.exit(0);
}
console.log(`NOT LISTED: no row for owner “${owner}”.`);
console.log('Known names:', names.join(', ') || '(none)');
process.exit(2);
