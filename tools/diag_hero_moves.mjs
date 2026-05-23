#!/usr/bin/env node
/** Print hero (ux,uy) after each session step (cumulative run). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const segments = normalizeSession(session).segments;
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

let stepN = 0;
for (const seg of segments) {
    const steps = seg.steps || [];
    for (let j = 0; j < steps.length; j++) {
        stepN++;
        const st = steps[j];
        const inp = st.input ?? st.key ?? '?';
        await runSegment({ ...seg, steps: steps.slice(0, j + 1), storage: h });
        if (stepN >= 28 && stepN <= 35) {
            console.log(stepN, JSON.stringify(inp), 'hero', game.u?.ux, game.u?.uy);
        }
    }
}
