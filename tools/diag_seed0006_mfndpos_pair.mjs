#!/usr/bin/env node
/** First RNG zip mismatch for seed0006 (pair index). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

function isRngCall(e) {
    return typeof e === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(e);
}
function normalizeRng(e) {
    return e.replace(/\s*@\s.*$/, '').replace(/^\d+\s+/, '').trim();
}
function* eachCanon(segs) {
    for (const seg of segs) {
        for (const step of seg.steps || []) {
            for (const line of step.rng || []) {
                if (isRngCall(line)) yield line;
            }
        }
    }
}

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const segs = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

const game = await runSegment({
    seed: segs[0].seed,
    datetime: segs[0].datetime,
    nethackrc: segs[0].nethackrc,
    moves: segs[0].moves,
    storage: h,
});

const it = eachCanon(segs);
let matched = 0;
let pair = 0;
let firstFail = -1;
for (const raw of game.getRngLog()) {
    if (!isRngCall(raw)) continue;
    const cn = it.next();
    if (cn.done) break;
    const je = raw.replace(/^\d+\s+/, '');
    const ok = normalizeRng(cn.value) === normalizeRng(je);
    if (!ok && firstFail < 0) firstFail = pair;
    if (ok) matched++;
    pair++;
}
console.log('matched', matched, 'firstFail pair', firstFail);
if (firstFail >= 0) {
    const it2 = eachCanon(segs);
    let j = 0;
    for (const raw of game.getRngLog()) {
        if (!isRngCall(raw)) continue;
        const cn = it2.next();
        const je = raw.replace(/^\d+\s+/, '');
        if (j >= firstFail && j <= firstFail + 8) {
            const ok = normalizeRng(cn.value) === normalizeRng(je);
            console.log(
                j,
                ok ? 'OK' : 'XX',
                normalizeRng(je),
                '|',
                normalizeRng(cn.value),
            );
        }
        j++;
    }
}
