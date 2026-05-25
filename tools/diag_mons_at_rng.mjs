#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const stopAt = parseInt(process.argv[2] || '3218', 10);

const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const {
    findWestKinkMonsterLikeC,
    findEastKickMonLikeC,
    westFungusDoorNicheAtLikeC,
} = await import(join(ROOT, 'js/mfndpos_mon.js'));

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

const origRn2 = (await import(join(ROOT, 'js/rng.js'))).rn2;
let idx = 0;
const rngMod = await import(join(ROOT, 'js/rng.js'));
rngMod.rn2 = function patched(n) {
    const v = origRn2(n);
    if (idx >= stopAt) {
        throw new Error('STOP');
    }
    idx++;
    return v;
};

const segments = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
);

try {
    for (const seg of segments) {
        await runSegment({ ...seg, storage: storageHandle });
    }
} catch (e) {
    if (e.message !== 'STOP') throw e;
}

const mons = game.level?.monsters ?? [];
console.log('rng', getRngLog().length, 'stopAt', stopAt, 'n mons', mons.length);
for (const m of mons) {
    const mx = m.mx | 0;
    const my = m.my | 0;
    console.log(
        [mx, my, m.mnum, m.mgenmklev | 0, m.msleeping | 0, westFungusDoorNicheAtLikeC(game, mx, my, m)],
    );
}
console.log('west', findWestKinkMonsterLikeC(game));
console.log('east', findEastKickMonLikeC(game));
console.log('doors', (game.level?.doors ?? []).length);
