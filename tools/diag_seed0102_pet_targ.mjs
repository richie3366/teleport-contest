#!/usr/bin/env node
/** Trace pet pos + find_targ at first `s` for seed0102. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

let sawFirstS = false;
let rngBeforeS = 0;

globalThis.__diagDogMoveLikeC = (g, mtmp) => {
    if (sawFirstS) {
        const kob = g.level?.monsters?.find((m) => (m.mnum | 0) === 63);
        console.log('dogMove pet', mtmp.mx, mtmp.my, 'hero', g.u?.ux, g.u?.uy);
        console.log('kobold', kob ? [kob.mx, kob.my] : null);
        for (const [dx, dy, name] of [[-1, 0, 'W'], [-1, -1, 'NW'], [0, -1, 'N']]) {
            let x = mtmp.mx | 0;
            let y = mtmp.my | 0;
            for (let d = 0; d < 7; d++) {
                x += dx;
                y += dy;
                const m = g.level?.monsters?.find((mo) => (mo.mx | 0) === x && (mo.my | 0) === y);
                if (m) {
                    console.log(`  ray ${name} step ${d + 1} (${x},${y}) mnum=${m.mnum} tame=${m.mtame}`);
                    break;
                }
                if (x === (g.u?.ux | 0) && y === (g.u?.uy | 0)) {
                    console.log(`  ray ${name} step ${d + 1} HERO`);
                    break;
                }
            }
        }
    }
};

const origRun = (await import(join(ROOT, 'js/jsmain.js'))).runSegment;
// Hook via wrapping runSegment inputs — detect first s by rng length delta

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0102-ranger-name-cancel.session.json'), 'utf8'),
);
const norm = normalizeSession(session);
const seg = norm.segments[0];
const moves = seg.moves || '';
const sIdx = moves.indexOf('s');
console.log('first s at move index', sIdx, 'total moves', moves.length);

const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

const partialMoves = moves.slice(0, sIdx);
await runSegment({
    ...seg,
    moves: partialMoves,
    steps: (seg.steps || []).slice(0, partialMoves.length),
    storage: h,
});
rngBeforeS = getRngLog().length;
console.log('rng before first s', rngBeforeS);

const hooks = [];
const rngMod = await import(join(ROOT, 'js/rng.js'));
for (const [name, fn] of [['rnd', rngMod.rnd], ['rn2', rngMod.rn2]]) {
    const orig = fn;
    rngMod[name] = (x) => {
        const v = orig(x);
        const idx = getRngLog().length - 1;
        if (idx >= rngBeforeS + 10 && idx <= rngBeforeS + 25) {
            hooks.push({ idx, call: `${name}(${x})=${v}` });
        }
        return v;
    };
}

sawFirstS = true;
await runSegment({
    ...seg,
    moves: moves.slice(0, sIdx + 1),
    steps: (seg.steps || []).slice(0, sIdx + 1),
    storage: h,
});

console.log('rng after first s', getRngLog().length);
console.log('first s rng slice:');
for (let i = rngBeforeS; i < Math.min(getRngLog().length, rngBeforeS + 20); i++) {
    console.log(`  ${i}: ${getRngLog()[i]}`);
}
console.log('hooks near mismatch window:', hooks);
