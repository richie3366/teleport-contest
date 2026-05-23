#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));

const monmoveMod = await import(join(ROOT, 'js/monmove.js'));
const origMovemon = monmoveMod.movemon;
let movemonCalls = 0;
monmoveMod.movemon = async function patchedMovemon(stepNum) {
    movemonCalls++;
    const { game } = await import(join(ROOT, 'js/gstate.js'));
    const ctx = game.context || {};
    if ((ctx._searchStep11Passes | 0) > 0 || ctx._searchPass1NearMonLikeC) {
        console.log('movemon call', movemonCalls, 'stepNum', stepNum, {
            passes: ctx._searchStep11Passes,
            nearMon: ctx._searchPass1NearMonLikeC,
            gateDone: ctx._searchRogGateMonDoneLikeC,
            moves: game.moves,
        });
    }
    return origMovemon(stepNum);
};

const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
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

for (const seg of segments) {
    await runSegment({ ...seg, storage: storageHandle });
}
