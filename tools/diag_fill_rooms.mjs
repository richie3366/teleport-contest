#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const stats = { ok: 0, fail: 0, nosleep: 0, nospace: 0 };
globalThis.__diagFillOrdCountLikeC = (n) => {
    console.log('fillableCount', n);
};
globalThis.__diagFillSleepLikeC = (tag, mnum) => {
    stats[tag] = (stats[tag] | 0) + 1;
    if (tag === 'ok') console.log('  ok mnum', mnum);
};
globalThis.__diagMonsMklevLikeC = (g) => {
    const mons = g.level?.monsters ?? [];
    console.log('fillSleep', stats);
    console.log('mklev mons', mons.length, mons.map((m) => [m.mx, m.my, m.mgenmklev | 0, m.mnum]));
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
