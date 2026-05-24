#!/usr/bin/env node
/** Which mfndpos slots survive appr==0 filters at RNG ~3208 (seed0077). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));
const { rn2 } = await import(join(ROOT, 'js/rng.js'));

const {
    mfndposMonsterLikeC,
    monAllowflagsMonsterLikeC,
} = await import(join(ROOT, 'js/mfndpos_mon.js'));
const {
    monAtLevelDogmoveLikeC,
    mAvoidKickedLocDogmoveLikeC,
    mAvoidSokoPushLocDogmoveLikeC,
    trapAtLevelDogmoveLikeC,
    couldReachItemDogmoveLikeC,
    cursedObjectAtDogmoveLikeC,
    floorObjKey,
} = await import(join(ROOT, 'js/dogmove_mon.js'));

globalThis.__diagApprZeroPickStart = (g, mtmp, ggx, ggy) => {
    if ((getRngLog().length | 0) !== 3208) return;
    const mfp = mfndposMonsterLikeC(g, mtmp, monAllowflagsMonsterLikeC(g, mtmp));
    const cnt = mfp.cnt | 0;
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const u = g.u;
    let uncursedcnt = 0;
    for (let i = 0; i < cnt; i++) {
        const nx = mfp.poss[i].x | 0;
        const ny = mfp.poss[i].y | 0;
        const m2 = monAtLevelDogmoveLikeC(g, nx, ny);
        if (
            m2
            && m2 !== mtmp
            && !((mfp.info[i] & 0x200000) || (mfp.info[i] & 0x400000))
        ) continue;
        if (!cursedObjectAtDogmoveLikeC(g, nx, ny)) uncursedcnt++;
    }
    const survivors = [];
    for (let i = 0; i < cnt; i++) {
        const nx = mfp.poss[i].x | 0;
        const ny = mfp.poss[i].y | 0;
        const info = mfp.info[i] | 0;
        const reason = [];
        const m2 = monAtLevelDogmoveLikeC(g, nx, ny);
        if (m2 && m2 !== mtmp && !((info & 0x200000) || (info & 0x400000))) {
            reason.push('mon_block');
        }
        if (mAvoidKickedLocDogmoveLikeC(g, mtmp, nx, ny)) reason.push('kicked');
        if (mAvoidSokoPushLocDogmoveLikeC(g, mtmp, nx, ny)) reason.push('soko');
        if ((info & 0x40000) !== 0) {
            const trap = trapAtLevelDogmoveLikeC(g, nx, ny);
            if (trap && !(mtmp.mleashed | 0) && (trap.tseen | 0) && rn2(40)) {
                reason.push('trap');
            }
        }
        let cursemsg = false;
        const head = g.level?.floorObjHeads?.get(floorObjKey(nx, ny));
        for (let obj = head; obj; obj = obj.nexthere) {
            if (obj.cursed) cursemsg = true;
        }
        if (cursemsg && !(mtmp.mleashed | 0) && uncursedcnt > 0 && rn2(13 * uncursedcnt)) {
            reason.push('curse_skip');
        }
        if (!reason.length) {
            survivors.push({ i, nx, ny, nd: dist2(nx, ny, ggx, ggy) });
        } else {
            console.log('reject', i, nx, ny, reason.join(','));
        }
    }
    console.log('survivors', survivors);
    let chcnt = 0;
    let pick = { x: omx, y: omy };
    for (const s of survivors) {
        chcnt++;
        const roll = rn2(chcnt);
        console.log('chcnt', chcnt, 'rn2', roll, 'slot', s.i, s.nx, s.ny);
        if (!roll) pick = { x: s.nx, y: s.ny };
    }
    console.log('pick', pick, 'rngNow', getRngLog().length);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
await runSegment({
    ...normalizeSession(session).segments[0],
    storage: {
        getItem(k) { return storage.get(k) ?? null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) { return [...storage.keys()][i] ?? null; },
    },
});
