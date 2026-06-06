#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const events = [];
globalThis.__diagMovemonStartLikeC = (g, stepNum) => {
    const pet = g.level?.monsters?.find((m) => m.mtame);
    events.push({
        idx: getRngLog().length,
        stepNum,
        moves: g.moves,
        petMov: pet?.movement,
        umov: g.u?.umovement,
    });
};
globalThis.__diagMovemonRetLikeC = (g, stepNum, ret) => {
    const pet = g.level?.monsters?.find((m) => m.mtame);
    events.push({
        idx: getRngLog().length,
        stepNum,
        moves: g.moves,
        petMov: pet?.movement,
        ret,
        end: true,
    });
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0102-ranger-name-cancel.session.json'), 'utf8'),
);
const norm = normalizeSession(session);
const seg = norm.segments[0];
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

for (let n = 20; n <= 23; n++) {
    events.length = 0;
    await runSegment({
        ...seg,
        moves: seg.moves.slice(0, n),
        steps: (seg.steps || []).slice(0, n),
        storage: h,
    });
    console.log('--- after move index', n - 1, 'rng', getRngLog().length, '---');
    for (const e of events) console.log(JSON.stringify(e));
}
