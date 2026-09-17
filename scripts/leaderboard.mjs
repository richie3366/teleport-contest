#!/usr/bin/env node
/**
 * leaderboard.mjs — the number the judge sees. Fetches the public
 * leaderboard and prints this fork's held-out line next to the top
 * entries, so an audit iteration can record the real objective in
 * `docs/CURRENT.md` (the local corpus is only a stand-in — on 2026-09-17
 * it read 91.7 % PASS while held-out read 11/44, RNG 26.6 %).
 *
 *   node scripts/leaderboard.mjs            # our line + top 6
 *   node scripts/leaderboard.mjs --all      # every team
 *   node scripts/leaderboard.mjs --json     # our heldOut/public objects
 *
 * Tooling only (not scored js/): network is fine here. Fails soft when
 * offline — prints the error and exits 0 so an audit never halts on it.
 */
const URL = 'https://mazesofmenace.ai/leaderboard/data.json';
const FORK = /richie3366\//;
const argv = process.argv.slice(2);
const ALL = argv.includes('--all');
const JSON_OUT = argv.includes('--json');

const pct = (x) => (x == null ? '   -' : `${x.toFixed(1).padStart(5)}%`);
const fmt = (t) => {
    const h = t.heldOut || {}, p = t.public || {};
    return `${t.name.padEnd(20)} ${(t.category || '').padEnd(10)} public ${String(p.passing ?? '-').padStart(2)}/${p.total ?? '-'}  `
        + `held-out ${String(h.passing ?? '-').padStart(2)}/${h.total ?? '-'} pts ${String(h.points ?? '-').padStart(5)}/${h.maxPoints ?? '-'}  `
        + `RNG ${pct(h.rngPct)} rngSteps ${pct(h.rngStepsPct)} screens ${pct(h.screenPct)}  ${t.speed?.label || ''}`;
};

try {
    const res = await fetch(URL, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const teams = (data.teams || []).slice().sort((a, b) => (b.heldOut?.points || 0) - (a.heldOut?.points || 0));
    const me = teams.find((t) => FORK.test(t.fork || ''));
    if (JSON_OUT) {
        console.log(JSON.stringify({ timestamp: data.timestamp, lastScored: me?.lastScored, public: me?.public, heldOut: me?.heldOut }, null, 1));
    } else {
        console.log(`leaderboard ${data.timestamp}  (phase: ${data.contestPhase})`);
        const shown = ALL ? teams : teams.slice(0, 6);
        shown.forEach((t, i) => console.log(`${String(i + 1).padStart(2)}. ${t === me ? '>> ' : '   '}${fmt(t)}`));
        if (me && !shown.includes(me)) console.log(`${String(teams.indexOf(me) + 1).padStart(2)}. >> ${fmt(me)}`);
        if (me) console.log(`\nours: ${me.fork} last scored ${me.lastScored}. Held-out is the objective; public 44/44 is the fortress.`);
    }
} catch (e) {
    console.log(`leaderboard: unavailable (${e.message}) — record "n/a" in CURRENT.md and continue.`);
}
