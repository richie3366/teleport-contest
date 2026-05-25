#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const snapTarget = Number(process.argv[2] ?? 21);
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment, NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
import * as gstate from '../js/gstate.js';

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

let snap = 0;
const orig = NethackGame.prototype.captureJudgeSnapshot;
NethackGame.prototype.captureJudgeSnapshot = async function patched(o) {
    await orig.call(this, o);
    if (snap === snapTarget) {
        const g = gstate.game;
        console.log('after flush snap', snapTarget,
            'tutorial', g._tutorialMenuActive,
            'overlay', !!g._overlayScreen,
            'inv', g._inventoryMode);
        for (const [x, y] of [[35, 12], [36, 12], [36, 14], [36, 15]]) {
            const loc = g.level?.at(x, y);
            const grid = g.nhDisplay?.grid?.[y + 1]?.[x - 1];
            console.log(
                x, y,
                'disp', JSON.stringify(loc?.disp_ch),
                'grid', JSON.stringify(grid?.ch),
                'viz', g.viz_array?.[y]?.[x]?.toString(16),
            );
        }
    }
    snap++;
};

await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: storageHandle,
});
