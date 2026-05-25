#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen, diffCell } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const targetIdx = 17;

const STARTUP_VARIANT_LINES = [/Version\s+\d+\.\d+\.\d+[^\n]*/];
function preDecode(s) {
    let cur = String(s);
    for (const re of STARTUP_VARIANT_LINES) cur = cur.replace(re, '<<VERSION_BANNER>>');
    return cur.replace(/^\d{2}:\d{2}:\d{2}\.$/gm, '<time>.');
}

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { initReplayMoves, pushKey, hasQueuedInput } = await import(join(ROOT, 'js/input.js'));
const { moveloop_core } = await import(join(ROOT, 'js/allmain.js'));
const { moveloopPreamble } = await import(join(ROOT, 'js/moveloop_preamble.js'));
const { maybeDoTutorialLikeC } = await import(join(ROOT, 'js/moveloop_preamble.js'));
const { NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
const { GameDisplay } = await import(join(ROOT, 'js/game_display.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { cansee } = await import(join(ROOT, 'js/vision.js'));
const { IN_SIGHT, COULD_SEE } = await import(join(ROOT, 'js/const.js'));
const { westApportSleeperNicheAtLikeC } = await import(join(ROOT, 'js/mfndpos_mon.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const cScreens = [];
for (const step of seg.steps || []) {
    if (step.screen) cScreens.push(step.screen);
}

const storage = new Map();
const storageHandle = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};

const nh = new NethackGame({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    storage: storageHandle,
});
nh._pendingDisplay = new GameDisplay(null);

const origCap = nh.captureJudgeSnapshot.bind(nh);
nh.captureJudgeSnapshot = async function capWrap(opts) {
    await origCap(opts);
    const idx = nh._screens.length - 1;
    if (idx !== targetIdx) return;
    if (!game.level?.at) {
        console.log('screen 17 no level', {
            in_moveloop: game.program_state?.in_moveloop,
            uz: game.u?.uz,
            plname: game.plname,
        });
        return;
    }
    const loc = game.level.at(35, 9);
    const mon = game.level.monsters?.find(
        (m) => (m.mx | 0) === 35 && (m.my | 0) === 9,
    );
    const va = game.viz_array?.[9]?.[35] | 0;
    const ga = decodeScreen(preDecode(nh._screens[idx]));
    const gb = decodeScreen(preDecode(cScreens[idx]));
    console.log({
        idx,
        nhgetch: nh._nhgetchCount,
        moves: game.moves,
        hero: [game.u?.ux, game.u?.uy],
        cell: { js: ga[9][35].ch, c: gb[9][35].ch },
        typ: loc?.typ,
        doormask: loc?.doormask,
        disp: loc?.disp_ch,
        viz: { IN_SIGHT: !!(va & IN_SIGHT), COULD_SEE: !!(va & COULD_SEE) },
        cansee: cansee(35, 9),
        niche: westApportSleeperNicheAtLikeC(game, 35, 9),
        mon: mon ? { mnum: mon.mnum, mgen: mon.mgenmklev } : null,
        defer: [game._deferCorrInSightOnce, game._deferDoorOpenX, game._deferDoorOpenY],
    });
};

initReplayMoves(seg.moves || '');
for (const ch of seg.moves || '') pushKey(ch.charCodeAt(0));
await nh.start();
await moveloopPreamble(false);
await maybeDoTutorialLikeC();

const maxIter = Math.max((seg.moves || '').length * 8, 1024);
for (let iter = 0; iter < maxIter; iter++) {
    if (!hasQueuedInput()) break;
    await moveloop_core();
}
