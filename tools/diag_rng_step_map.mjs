#!/usr/bin/env node
/** Map each session input step to contiguous C RNG index ranges (seed0077 tail). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessionPath =
    process.argv[2] || join(ROOT, 'sessions/seed0077-rogue-chargen.session.json');
const tailFrom = parseInt(process.argv[3] || '3180', 10);

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const session = JSON.parse(readFileSync(sessionPath, 'utf8'));
const segments = normalizeSession(session).segments;

let i = 0;
for (const seg of segments) {
    for (const st of seg.steps || []) {
        const rng = (st.rng || []).filter(
            (x) => typeof x === 'string' && /^(rn2|rnd)/.test(x),
        );
        const start = i;
        i += rng.length;
        if (i <= tailFrom && start < tailFrom) continue;
        const key = st.key ?? st.input ?? '?';
        console.log(
            JSON.stringify({
                key: typeof key === 'string' ? key : String(key),
                rngStart: start,
                rngEnd: i - 1,
                n: rng.length,
            }),
        );
    }
}
console.log('total C rng calls:', i);
