#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const s = JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'));
const seg = normalizeSession(s).segments[0];
let idx = 0;
for (let si = 0; si < (seg.steps || []).length; si++) {
    const step = seg.steps[si];
    const rng = (step.rng || []).filter((x) => typeof x === 'string' && /^(?:rn2|rnd)/.test(x));
    const start = idx;
    idx += rng.length;
    if (start <= 3225 && idx > 3210) {
        const key = (seg.moves || '')[si];
        console.log(`step ${si + 1} key=${JSON.stringify(key)} rng ${start}-${idx - 1} (${rng.length} draws)`);
        for (let j = Math.max(0, 3210 - start); j < rng.length && start + j <= 3235; j++) {
            console.log(`  ${start + j}: ${rng[j].replace(/ @.*/, '')}`);
        }
    }
}
