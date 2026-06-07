#!/usr/bin/env node
/** Trace distfleeck call sites when core RNG index hits a window. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath = process.argv[2] || 'sessions/seed0006-wizard-water-demon.session.json';
const movePrefix = parseInt(process.argv[3] || '48', 10);
const lo = parseInt(process.argv[4] || '2774', 10);
const hi = parseInt(process.argv[5] || '2776', 10);

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));

const distPath = join(ROOT, 'js/distfleeck_mon.js');
let distSrc = readFileSync(distPath, 'utf8');
const hook = `
export async function distfleeckMonsterApplyLikeC(g, mtmp) {
    const { getRngLog } = await import('./rng.js');
    const before = (getRngLog?.() || []).filter((e) => typeof e === 'string' && e.startsWith('rn2(')).length;
    const out = await __distfleeckMonsterApplyLikeC_orig(g, mtmp);
    const after = (getRngLog?.() || []).filter((e) => typeof e === 'string' && e.startsWith('rn2(')).length;
    if (after > before) {
        for (let i = before; i < after; i++) {
            if (i >= ${lo} && i <= ${hi}) {
                const err = new Error('distfleeck@' + i);
                console.error('distfleeck rng index', i, err.stack.split('\\n').slice(1, 8).join('\\n'));
            }
        }
    }
    return out;
}
async function __distfleeckMonsterApplyLikeC_orig`;
distSrc = distSrc.replace(
    'export async function distfleeckMonsterApplyLikeC',
    hook,
);
await import(`data:text/javascript,${encodeURIComponent(distSrc)}`);

const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const seg = normalizeSession(session).segments[0];
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

await runSegment({
    ...seg,
    moves: seg.moves.slice(0, movePrefix),
    steps: (seg.steps || []).slice(0, movePrefix),
    storage: storageHandle,
});
