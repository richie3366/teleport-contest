#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

function snap(label) {
    const mons = globalThis.__diagGame?.level?.monsters ?? [];
    console.log(
        label,
        'rng',
        getRngLog().length,
        'n',
        mons.length,
        mons.map((m) => [m.mx, m.my, m.mgenmklev | 0, m.mnum, m.mhp | 0]),
    );
}

globalThis.__diagMovemonHook = () => {
    const n = getRngLog().length;
    if (n >= 3180 && n <= 3250 && n % 3 === 0) snap(`movemon@${n}`);
};

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const storage = new Map();
const storageHandle = {
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

const { game } = await import(join(ROOT, 'js/gstate.js'));
globalThis.__diagGame = game;

for (const seg of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...seg, storage: storageHandle });
}

snap('end');
