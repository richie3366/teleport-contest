#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { findFirstSearchRogMidMklevHostileLikeC, firstSearchNearMklevHostileLikeC } =
    await import(join(ROOT, 'js/mfndpos_mon.js'));

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

const ctx = game.context ?? {};
console.log('search passes at end', ctx._searchStep11Passes);
console.log('nearMon', ctx._searchPass1NearMonLikeC);
console.log('rogGateDone', ctx._searchRogGateDoneLikeC);
console.log('dogGoalDone', ctx._searchPass1DogGoalDoneLikeC);
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
console.log('rng count', getRngLog().length);
console.log('moves at end', game.moves, 'u', !!game.u, 'level', !!game.level);
const lead = findFirstSearchRogMidMklevHostileLikeC(game);
console.log('lead', lead ? { mx: lead.mx, my: lead.my, mnum: lead.mnum, mklev: lead.mgenmklev } : null);
if (lead) {
    console.log('firstSearchNearMklevHostile(lead)', firstSearchNearMklevHostileLikeC(game, lead));
}
