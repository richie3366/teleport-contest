#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const { findWestKinkMonsterLikeC, findEastKickMonLikeC, westFungusDoorNicheAtLikeC } =
    await import(join(ROOT, 'js/mfndpos_mon.js'));

let post2Count = 0;
globalThis.__diagMonsPost2LikeC = (g) => {
    post2Count++;
    console.log('--- POST2 pass', post2Count, 'rng', getRngLog().length, '---');
    const mons = g.level?.monsters ?? [];
    console.log('POST2 n=', mons.length);
    for (const m of mons) {
        const mx = m.mx | 0;
        const my = m.my | 0;
        console.log([mx, my, m.mnum, m.mgenmklev | 0, westFungusDoorNicheAtLikeC(g, mx, my, m)]);
    }
    console.log('west', findWestKinkMonsterLikeC(g), 'east', findEastKickMonLikeC(g), 'doors', g.level?.doors?.length);
};

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const storage = new Map();
const storageHandle = {
    getItem(k) {
        return storage.has(k) ? storage.get(k) : null;
    },
    setItem(k, v) {
        storage.set(k, String(v));
    },
    removeItem(k) {
        storage.delete(k);
    },
    get length() {
        return storage.size;
    },
    key(i) {
        const keys = [...storage.keys()];
        return i >= 0 && i < keys.length ? keys[i] : null;
    },
};

for (const seg of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...seg, storage: storageHandle });
}

console.log('final', getRngLog().length);
