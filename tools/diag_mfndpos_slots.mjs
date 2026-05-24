#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { mfndposMonsterLikeC, monAllowflagsMonsterLikeC } = await import(
    join(ROOT, 'js/mfndpos_mon.js'),
);
const { trapAtLevelDogmoveLikeC } = await import(join(ROOT, 'js/dogmove_mon.js'));

globalThis.__diagApprZeroPickStart = (g, mtmp, ggx, ggy, appr) => {
    if ((getRngLog().length | 0) !== 3208) return;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    for (let i = 0; i < (mfp.cnt | 0); i++) {
        const nx = mfp.poss[i].x;
        const ny = mfp.poss[i].y;
        const trap = trapAtLevelDogmoveLikeC(g, nx, ny);
        console.log('slot', i, nx, ny, 'info', mfp.info[i], 'trap', trap?.ttyp);
    }
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
