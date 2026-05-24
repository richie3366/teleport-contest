#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagRhackLikeC = (g, ch) => {
    const chs = ch >= 32 && ch < 127 ? String.fromCharCode(ch) : `#${ch}`;
    if (chs === 's' || chs === ':') {
        console.log(
            `rhack ${chs} start rng=${getRngLog().length} moves=${g.moves} searchPass=${g.context?._searchStep11Passes}`,
        );
    }
};
globalThis.__diagDogMoveLikeC = (g) => {
    console.log(`  dogMove pass=${g.context?._searchStep11Passes} rng=${getRngLog().length}`);
};

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
console.log('final rng', getRngLog().length);
