#!/usr/bin/env node
/** List fobj near rogue start after first post-chargen space. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

let logged = false;
const orig = (await import(join(ROOT, 'js/dogmove_mon.js'))).dogGoalScanSearchPostGateLikeC;

globalThis.__diagDogGoalFloor = (g, mtmp, floor, track) => {
    if (!track || logged) return;
    logged = true;
    const all = [];
    for (let o = g.level?.fobj; o; o = o.nobj) {
        all.push({ ox: o.ox, oy: o.oy, otyp: o.otyp });
    }
    console.log('rng', getRngLog().length, 'pet', mtmp.mx, mtmp.my, 'bbox', floor);
    console.log('full fobj', all.length, all);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
for (const seg of segments) await runSegment({ ...seg, storage: h });
