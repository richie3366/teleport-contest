#!/usr/bin/env node
/** List floor objects in dog_goal 11×11 bbox at first/second #search pass. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

const SQ = 5;

globalThis.__diagDogGoalAtSearch = (g, mtmp, second) => {
    const omx = mtmp.mx | 0;
    const omy = mtmp.my | 0;
    const minX = Math.max(1, omx - SQ);
    const maxX = Math.min(79, omx + SQ);
    const minY = Math.max(0, omy - SQ);
    const maxY = Math.min(23, omy + SQ);
    const inBox = [];
    for (const o of g.level?.objects ?? []) {
        if (!o) continue;
        const nx = o.ox | 0;
        const ny = o.oy | 0;
        if (nx < minX || nx > maxX || ny < minY || ny > maxY) continue;
        inBox.push({ ox: nx, oy: ny, otyp: o.otyp | 0 });
    }
    console.log(
        'rng',
        getRngLog().length,
        second ? 'second' : 'first',
        'pet',
        omx,
        omy,
        'hero',
        g.u?.ux,
        g.u?.uy,
        'bbox',
        `${minX}-${maxX},${minY}-${maxY}`,
        'fobj',
        inBox.length,
        inBox,
    );
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
