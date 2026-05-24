#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

let keyN = 0;
globalThis.__diagRhackChLikeC = (g, ch) => {
    if ((g.moves | 0) <= 4) {
        console.log(
            `rhack ${JSON.stringify(ch)} moves=${g.moves} applyPending=${!!g.context?._applyGetdirPendingLikeC} applyPrompt=${!!g.context?._applyPromptLikeC}`,
        );
    }
};
globalThis.__diagMovementKeyLikeC = (g, ch, dx, dy) => {
    if ((g.moves | 0) <= 4) {
        console.log(
            `key ${JSON.stringify(ch)} d=(${dx},${dy}) moves=${g.moves} applyPending=${!!g.context?._applyGetdirPendingLikeC}`,
        );
    }
};
globalThis.__diagDomovePreLikeC = (g, dx, dy, nx, ny) => {
    const u = g.u;
    console.log(
        `domove #${++keyN} from (${u?.ux},${u?.uy}) d=(${dx},${dy}) -> (${nx},${ny}) moves=${g.moves} rng=${getRngLog().length}`,
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
