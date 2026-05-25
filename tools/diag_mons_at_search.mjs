#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagPeel2LikeC = (peelOrder) => {
    console.log('peel2', getRngLog().length, peelOrder.length);
};

const origCmd = (await import(join(ROOT, 'js/cmd.js'))).handleKey;
// can't patch easily

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));

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

let lastPass = 0;
const origHandle = null;

for (const seg of normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments) {
    await runSegment({ ...seg, storage: storageHandle });
}

function dump(tag) {
    const mons = game.level?.monsters ?? [];
    console.log(
        tag,
        'rng',
        getRngLog().length,
        'pass',
        game.context?._searchStep11Passes,
        'n',
        mons.length,
        mons.map((m) => [m.mx, m.my, m.mgenmklev | 0, m.mnum]),
    );
}

// Patch monmove entry via reading context after run - use search step from game
dump('end');
