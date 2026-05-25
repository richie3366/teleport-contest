#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

function snap(tag, g) {
    const mons = g.level?.monsters ?? [];
    console.log(
        tag,
        'rng',
        getRngLog().length,
        'pass',
        g.context?._searchStep11Passes | 0,
        'n',
        mons.length,
        mons.map((m) => [m.mx, m.my, m.mgenmklev | 0, m.mnum]),
    );
}

let fillRooms = 0;
let fillSleep = 0;
let fillSpace = 0;
globalThis.__diagFillRoomLikeC = (sleepGate, hasSpace) => {
    fillRooms++;
    if (sleepGate) fillSleep++;
    if (hasSpace) fillSpace++;
};
globalThis.__diagFillMonLikeC = (ok, mnum) => {
    if (ok) console.log('fillMon', getRngLog().length, 'mnum', mnum);
};
globalThis.__diagMonsMklevLikeC = (g) => {
    console.log('fillStats', { fillRooms, fillSleep, fillSpace });
    snap('mklev', g);
};
globalThis.__diagMonsAtSearchLikeC = (g) => snap('search', g);
globalThis.__diagPeel2LikeC = (peelOrder) => {
    console.log('peel2', getRngLog().length, 'peelN', peelOrder.length);
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
