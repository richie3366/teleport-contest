#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { DOOR, CORR, D_CLOSED, D_ISOPEN, IS_DOOR } = await import(join(ROOT, 'js/const.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}

const u = game.u;
if (!u) {
    console.log('no hero');
    process.exit(0);
}
for (let y = 5; y <= 12; y++) {
    let row = '';
    for (let x = 33; x <= 40; x++) {
        const loc = game.level?.at(x, y);
        const t = loc?.typ | 0;
        const dm = loc?.doormask | 0;
        let c = '?';
        if (t === CORR) c = '.';
        else if (IS_DOOR(t)) c = (dm & D_CLOSED) ? 'D' : (dm & D_ISOPEN) ? 'd' : '?';
        else if (t === 1) c = '#';
        else c = String(t % 10);
        if ((u.ux | 0) === x && (u.uy | 0) === y) c = '@';
        row += c;
    }
    console.log(y, row);
}
console.log('hero', u.ux, u.uy, 'moves', game.moves);
