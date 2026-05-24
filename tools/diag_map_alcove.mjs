#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { IS_DOOR } = await import(join(ROOT, 'js/const.js'));

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

globalThis.__diagRhackChLikeC = (g, ch) => {
    if (ch !== 'i' || (g.moves | 0) !== 1) return;
    const u = g.u;
    for (let y = 4; y <= 14; y++) {
        let row = '';
        for (let x = 32; x <= 42; x++) {
            const loc = g.level?.at(x, y);
            const t = loc?.typ | 0;
            let c = '?';
            if (t === 24) c = '.';
            else if (IS_DOOR(t)) c = (loc.doormask & 4) ? 'D' : 'd';
            else if (t === 1) c = '#';
            else if (t === 0) c = ' ';
            else c = String(t % 10);
            if (u && u.ux === x && u.uy === y) c = '@';
            const pet = g.level?.monsters?.find((m) => m.mtame);
            if (pet && pet.mx === x && pet.my === y) c = 'k';
            for (let o = g.level?.fobj; o; o = o.nobj) {
                if (o.ox === x && o.oy === y) c = 't';
            }
            row += c;
        }
        console.log(y, row);
    }
};

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}
