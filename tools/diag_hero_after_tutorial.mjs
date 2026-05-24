#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { replayMovesPosLikeC } = await import(join(ROOT, 'js/input.js'));

const origAsk = (await import(join(ROOT, 'js/tutorial_prompt.js'))).askDoTutorialMenuTTYLikeC;
const tut = await import(join(ROOT, 'js/tutorial_prompt.js'));
tut.askDoTutorialMenuTTYLikeC = async (disp) => {
    const { game: g } = await import(join(ROOT, 'js/gstate.js'));
    const k = await (await import(join(ROOT, 'js/input.js'))).nhgetch();
    console.log('tutorial nhgetch', String.fromCharCode(k), 'replayPos', replayMovesPosLikeC(), 'hero', g.u?.ux, g.u?.uy);
    return false;
};

globalThis.__diagRhackPreLikeC = (g, key) => {
    const ch = key >= 32 && key < 127 ? String.fromCharCode(key) : `#${key}`;
    if ((g.moves | 0) > 2) return;
    console.log('rhack', ch, 'replayPos', replayMovesPosLikeC(), 'hero', g.u?.ux, g.u?.uy);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
await runSegment({
    ...normalizeSession(session).segments[0],
    storage: {
        getItem(k) { return storage.has(k) ? storage.get(k) : null; },
        setItem(k, v) { storage.set(k, String(v)); },
        removeItem(k) { storage.delete(k); },
        get length() { return storage.size; },
        key(i) { return [...storage.keys()][i]; },
    },
});
