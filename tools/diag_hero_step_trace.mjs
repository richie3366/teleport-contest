#!/usr/bin/env node
/** Hero/pet after each replay key (seed0077 tail). */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { initReplayMoves, pushKey, hasQueuedInput } = await import(join(ROOT, 'js/input.js'));
const { moveloop_core } = await import(join(ROOT, 'js/allmain.js'));
const { moveloopPreamble } = await import(join(ROOT, 'js/moveloop_preamble.js'));
const { maybeDoTutorialLikeC } = await import(join(ROOT, 'js/tutorial_branch.js'));
const { NethackGame } = await import(join(ROOT, 'js/jsmain.js'));

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
    key(i) { return [...storage.keys()][i]; },
};

const nh = new NethackGame({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    storage: storageHandle,
});
initReplayMoves(seg.moves || '');
for (const ch of seg.moves || '') pushKey(ch.charCodeAt(0));
await nh.start();
await moveloopPreamble(false);
await maybeDoTutorialLikeC();

const { game } = await import(join(ROOT, 'js/gstate.js'));
const keys = (seg.moves || '').split('');
let ki = 0;

function snap(tag) {
    const u = game.u;
    const pet = game.level?.monsters?.find((m) => (m.mtame | 0) !== 0);
    const ch = keys[ki - 1];
    const label = ch >= 32 && ch < 127 ? ch : `#${ch?.charCodeAt(0)}`;
    console.log(
        tag,
        JSON.stringify(label),
        `moves=${game.moves}`,
        `hero=(${u?.ux},${u?.uy})`,
        pet ? `pet=(${pet.mx},${pet.my})` : 'no pet',
    );
}

snap('start');
while (hasQueuedInput()) {
    const before = game.moves;
    await moveloop_core();
    if ((game.moves | 0) !== before || !hasQueuedInput()) {
        ki++;
        snap('after');
    }
    if (ki > keys.length) break;
}
