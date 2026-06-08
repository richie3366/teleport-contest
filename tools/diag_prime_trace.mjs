#!/usr/bin/env node
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = join(ROOT, 'js/mfndpos_mon.js');
const bak = join(ROOT, 'js/.diag_prime_trace.bak');
copyFileSync(p, bak);
let s = readFileSync(p, 'utf8');
s = s.replace(
    'export function wizD1CommaSurplusScanPrimeLikeC(g, opts = null) {',
    `export function wizD1CommaSurplusScanPrimeLikeC(g, opts = null) {
    if (!globalThis.__primeTrace) globalThis.__primeTrace = [];
    globalThis.__primeTrace.push({
        force: !!(opts && opts.force),
        pinned: !!g.context?._wizD1CommaSurplusNearMklevPinnedLikeC,
        slots: g.context?._wizD1CommaSurplusPrePeelSlotPassesLikeC,
    });`,
);
writeFileSync(p, s);

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0006-wizard-water-demon.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const sh = {
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
await runSegment({ ...seg, storage: sh });

const rn = (getRngLog?.() || []).filter(
    (e) => typeof e === 'string' && e.startsWith('rn2('),
).length;
console.log('final rn2 count', rn);
console.log('prime trace count', globalThis.__primeTrace?.length ?? 0);
for (const [i, t] of (globalThis.__primeTrace ?? []).entries()) {
    console.log(i, t);
}

copyFileSync(bak, p);
delete globalThis.__primeTrace;
