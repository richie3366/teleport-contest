#!/usr/bin/env node
/** Replay session through move prefix n; print JS RNG length and tail (moveloop timing). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath = process.argv[2];
const n = parseInt(process.argv[3] || '0', 10);
const tail = parseInt(process.argv[4] || '5', 10);

if (!sessionPath || !n) {
    console.error(
        'Usage: node tools/diag_prefix_rng.mjs <session.json> <movePrefixLen> [tailLines]',
    );
    process.exit(1);
}

function isRngCall(entry) {
    return typeof entry === 'string' && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry);
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));

const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const seg = normalizeSession(session).segments[0];
const moves = seg.moves || '';
const keyAtEnd =
    n > 0 && n <= moves.length
        ? JSON.stringify(moves.slice(Math.max(0, n - 3), n))
        : '';

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

const nh = await runSegment({
    ...seg,
    moves: moves.slice(0, n),
    steps: (seg.steps || []).slice(0, n),
    storage: storageHandle,
});

const log = (nh.getRngLog?.() || []).filter(isRngCall);
console.log('session:', sessionPath);
console.log('movePrefixLen:', n, 'of', moves.length, 'lastKeys:', keyAtEnd);
console.log('jsRngLen:', log.length);
if (log.length > 0) {
    const start = Math.max(0, log.length - tail);
    for (let i = start; i < log.length; i++) {
        console.log(`  ${i}: ${log[i]}`);
    }
}
