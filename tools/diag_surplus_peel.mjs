#!/usr/bin/env node
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(ROOT, 'js/monmove.js');
const bak = join(ROOT, 'js/.diag_surplus_peel.bak');
copyFileSync(path, bak);
let src = readFileSync(path, 'utf8');
const needle = `            spendSurplusMoveLikeC(m);
            await movemonSinglemonLikeC(g, m, effStepNum);`;
const patch = `            const _rb = (await import('./rng.js')).getRngLog().filter((e) => typeof e === 'string' && /^(?:rn2|rnd)\\(/.test(e)).length;
            spendSurplusMoveLikeC(m);
            await movemonSinglemonLikeC(g, m, effStepNum);
            const _ra = (await import('./rng.js')).getRngLog().filter((e) => typeof e === 'string' && /^(?:rn2|rnd)\\(/.test(e)).length;
            if (_rb >= 3048 && _rb <= 3070) {
                console.log('surplus pass', {
                    rb: _rb, ra: _ra,
                    mx: m.mx | 0, my: m.my | 0,
                    mklev: !!(m.mgenmklev | 0),
                    postPeelStart: postPeelAtPassStartLikeC,
                    postPeelNow: !!g.context?._wizD1CommaSurplusPostPeelActiveLikeC,
                    prePeel: g.context?._wizD1CommaSurplusPrePeelSlotPassesLikeC | 0,
                    draws: (await import('./rng.js')).getRngLog().filter((e) => typeof e === 'string' && /^(?:rn2|rnd)\\(/.test(e)).slice(_rb, _ra),
                });
            }`;
if (!src.includes(needle)) {
    console.error('needle missing');
    process.exit(1);
}
src = src.replace(needle, patch);
writeFileSync(path, src);

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) {
        const keys = [...storage.keys()];
        return i >= 0 && i < keys.length ? keys[i] : null;
    },
};
await runSegment({ ...seg, storage: sh });
copyFileSync(bak, path);
