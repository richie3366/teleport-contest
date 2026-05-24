#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { replayMovesPosLikeC } = await import(join(ROOT, 'js/input.js'));

globalThis.__diagRhackPreLikeC = (g, key) => {
    const ch = key >= 32 && key < 127 ? String.fromCharCode(key) : `#${key}`;
    if ((g.moves | 0) > 4) return;
    const u = g.u;
    const pet = g.level?.monsters?.find((m) => (m.mtame | 0) !== 0);
    console.log(
        `rhack ${JSON.stringify(ch)} replayPos=${replayMovesPosLikeC()} moves=${g.moves}`,
        `hero=(${u?.ux},${u?.uy})`,
        pet ? `pet=(${pet.mx},${pet.my})` : '',
    );
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
await runSegment({
    ...normalizeSession(session).segments[0],
    storage: {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) { return [...storage.keys()][i]; },
    },
});
