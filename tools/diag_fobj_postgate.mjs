#!/usr/bin/env node
/** Log fobj chain when post-gate dog_goal runs (seed0077 ~3214). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagPostGateFobj = (g, mtmp) => {
    const rng0 = getRngLog().length;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const all = [];
    for (let o = g.level?.fobj; o; o = o.nobj) {
        all.push({ ox: o.ox | 0, oy: o.oy | 0, otyp: o.otyp, quan: o.quan });
    }
    console.log('postGate rng', rng0, 'pet', omx, omy, 'fobjTotal', all.length, all);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
for (const seg of segments) await runSegment({ ...seg, storage: h });
