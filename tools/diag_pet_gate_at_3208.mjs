#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { findFirstSearchRogMidMklevHostileLikeC } = await import(join(ROOT, 'js/mfndpos_mon.js'));
const { mfndposMonsterLikeC, monAllowflagsMonsterLikeC } = await import(join(ROOT, 'js/mfndpos_mon.js'));

globalThis.__diagApprZeroPickStart = (g, mtmp, ggx, ggy, appr) => {
    const rng = getRngLog().length;
    if (rng < 3195 || rng > 3220) return;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    console.log(
        'pickStart rng', rng, 'appr', appr, 'pet', mtmp.mx, mtmp.my,
        'goal', ggx, ggy, 'mfndpos cnt', mfp.cnt,
    );
};
globalThis.__diagApprZeroPick = (g, mtmp, ggx, ggy, omx, omy, nix, niy, _p, cnt) => {
    const rng = getRngLog().length;
    if (rng < 3205 || rng > 3215) return;
    const gate = findFirstSearchRogMidMklevHostileLikeC(g);
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    const slots = [];
    for (let i = 0; i < (mfp.cnt | 0); i++) {
        slots.push([mfp.poss[i].x, mfp.poss[i].y, mfp.info[i]]);
    }
    console.log(
        'rng', rng, 'pet', omx, omy, '->', nix, niy, 'goal', ggx, ggy,
        'hero', g.u?.ux, g.u?.uy, 'gate', gate?.mx, gate?.my,
        'mfndpos cnt', cnt, 'slots', slots,
    );
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
