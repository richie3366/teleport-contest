#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
process.env.DIAG_FILL_ORD = '1';
const segments = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments;
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
const { game } = await import(join(ROOT, 'js/gstate.js'));
const log = game._traceFillOrd;
console.log('trace type', typeof log, Array.isArray(log), log?.length);
if (!Array.isArray(log)) process.exit(1);
for (const e of log) console.log(JSON.stringify(e));
