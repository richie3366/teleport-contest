#!/usr/bin/env node
/** Snapshot monsters after `mklev()` and on first `#search` movemon pass. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function dumpMons(label, g, getRngLog) {
    const mons = g.level?.monsters ?? [];
    console.log(`\n=== ${label} rng=${getRngLog().length} moves=${g.moves} nroom=${g.level?.nroom} ===`);
    console.log('monster count', mons.length);
    for (let i = 0; i < mons.length; i++) {
        const m = mons[i];
        console.log(
            i,
            JSON.stringify({
                mnum: m.mnum,
                mx: m.mx,
                my: m.my,
                mgenmklev: m.mgenmklev | 0,
                msleeping: m.msleeping | 0,
                mtame: m.mtame | 0,
            }),
        );
    }
}

globalThis.__diagFillRn3Log = [];
globalThis.__diagFillRn3 = (r) => globalThis.__diagFillRn3Log.push(r);
globalThis.__diagFillOrdStats = { rooms: 0, fillable: 0, entries: 0, sleepGate: 0, made: 0 };
globalThis.__diagFillOrdRoom = () => {
    globalThis.__diagFillOrdStats.entries++;
};
globalThis.__diagFillOrdStart = (g) => {
    const rooms = g.level?.rooms ?? [];
    let fillable = 0;
    const needfills = [];
    for (let i = 0; i < rooms.length; i++) {
        const c = rooms[i];
        if (!c || (c.hx | 0) <= 0) break;
        globalThis.__diagFillOrdStats.rooms++;
        needfills.push(c.needfill | 0);
        if (c.needfill === 1 && (c.rtype === 0 || c.rtype === 1)) fillable++;
    }
    globalThis.__diagFillOrdStats.fillable = fillable;
    globalThis.__diagFillOrdStats.needfills = needfills;
};
globalThis.__diagFillOrdSleep = () => {
    globalThis.__diagFillOrdStats.sleepGate++;
};
globalThis.__diagFillOrdMade = () => {
    globalThis.__diagFillOrdStats.made++;
};
globalThis.__diagFmonSearchOrder = (e) => {
    console.log('FIRST SEARCH fmon:', JSON.stringify(e, null, 2));
};
globalThis.__diagMklevSnaps = [];
globalThis.__diagAfterMklev = (g) => {
    globalThis.__diagMklevSnaps.push({
        uz: { ...(g.u?.uz ?? {}) },
        nroom: g.level?.nroom | 0,
        rogue: !!g.rogue_level,
        monsters: (g.level?.monsters ?? []).map((m) => ({
            mnum: m.mnum,
            mx: m.mx,
            my: m.my,
            mgenmklev: m.mgenmklev | 0,
            msleeping: m.msleeping | 0,
        })),
    });
};

globalThis.__diagFirstSearchMovemon = null;

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

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

for (const s of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...s, storage: storageHandle });
}

console.log('fill stats:', JSON.stringify(globalThis.__diagFillOrdStats));
console.log('fill rn2(3) rolls:', JSON.stringify(globalThis.__diagFillRn3Log));
for (const [i, snap] of (globalThis.__diagMklevSnaps ?? []).entries()) {
    console.log(`mklev #${i}:`, JSON.stringify(snap, null, 2));
}
dumpMons('END OF SESSION', game, getRngLog);
