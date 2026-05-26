#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const gs = await import(join(ROOT, 'js/gstate.js'));

const stats = { gate: 0, ok: 0, noSpace: 0, fail: 0 };
globalThis.__diagFillSleep = ({ gate, ok, space }) => {
    if (!gate) return;
    stats.gate++;
    if (ok) stats.ok++;
    else if (!space) stats.noSpace++;
    else stats.fail++;
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, 40),
    storage: storageHandle,
});

const mons = gs.game.level?.monsters ?? [];
const mk = mons.filter((m) => (m.mgenmklev | 0) && !(m.mtame | 0));
console.log('fill sleep', stats, 'nroom', gs.game.level?.nroom, 'fmon', mons.length, 'mklev', mk.length);
for (const m of mons) {
    console.log(`  m${m.mnum}@(${m.mx},${m.my}) mk${m.mgenmklev | 0} tame${m.mtame | 0}`);
}
