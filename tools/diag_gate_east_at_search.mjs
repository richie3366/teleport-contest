#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const {
    findEastKickMonLikeC,
    findFirstSearchRogMidMklevHostileLikeC,
    eastMklevFirstLAfterBLikeC,
} = await import(join(ROOT, 'js/mfndpos_mon.js'));

const origMmove = (await import(join(ROOT, 'js/m_move_mon.js'))).mMoveOneMonsterSubsetLikeC;
let logged = false;

// Patch via dynamic import wrapper is awkward; use global hook in m_move_mon if needed.
globalThis.__diagFmonAtSearch = (g) => {
    if (logged) return;
    logged = true;
    const gate = findFirstSearchRogMidMklevHostileLikeC(g);
    const east = findEastKickMonLikeC(g);
    console.log('rng', getRngLog().length);
    console.log(
        'gate',
        gate && {
            mnum: gate.mnum,
            mx: gate.mx,
            my: gate.my,
            mgen: gate.mgenmklev | 0,
            mtrack: gate.mtrack?.[0],
        },
    );
    console.log(
        'eastKick',
        east && {
            mnum: east.mnum,
            mx: east.mx,
            my: east.my,
            sameAsGate: east === gate,
        },
    );
    if (gate) console.log('eastFirstL(gate)', eastMklevFirstLAfterBLikeC(g, gate));
};

const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
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
