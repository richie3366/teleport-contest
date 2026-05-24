#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));

const orig = (await import(join(ROOT, 'js/cmd.js'))).rhack;
const cmd = await import(join(ROOT, 'js/cmd.js'));
cmd.rhack = async function patchedRhack(key) {
    await orig(key);
    const u = game.u;
    if (!u) return;
    const ch = typeof key === 'number' ? String.fromCharCode(key) : key;
    console.log(
        `after key ${JSON.stringify(ch)} moves=${game.moves} hero=(${u.ux},${u.uy})`,
    );
    const pet = game.level?.monsters?.find((m) => m.mtame);
    if (pet) console.log(`  pet=(${pet.mx},${pet.my})`);
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
