#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { initReplayMoves, pushKey, hasQueuedInput } = await import(join(ROOT, 'js/input.js'));
const { moveloop_core } = await import(join(ROOT, 'js/allmain.js'));
const { moveloopPreamble } = await import(join(ROOT, 'js/moveloop_preamble.js'));
const { maybeDoTutorialLikeC } = await import(join(ROOT, 'js/moveloop_preamble.js'));
const { NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
const { GameDisplay } = await import(join(ROOT, 'js/game_display.js'));
import * as gstate from '../js/gstate.js';

const seg = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments[0];
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};
const nh = new NethackGame({ seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc, storage: sh });
nh._pendingDisplay = new GameDisplay(null);
initReplayMoves(seg.moves || '');
for (const ch of seg.moves || '') pushKey(ch.charCodeAt(0));
await nh.start();
await moveloopPreamble(false);
await maybeDoTutorialLikeC();

while (hasQueuedInput()) {
    await moveloop_core();
    const n = nh._screens.length;
    if (n === 18) {
        const g = gstate.game;
        const ga = decodeScreen(nh._screens[17]);
        console.log({
            screens: n,
            moves: g.moves,
            hero: [g.u?.ux, g.u?.uy],
            disp358: g.level?.at(35, 8)?.disp_ch,
            disp359: g.level?.at(35, 9)?.disp_ch,
            dec9_35: ga[9][35].ch,
            dec10_35: ga[10][35].ch,
            apportFlag: [g._doorOpenApportNewsymX, g._doorOpenApportNewsymY],
        });
        break;
    }
}
