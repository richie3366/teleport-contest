#!/usr/bin/env node
/** Diff JS vs C screen at index N for a session. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const screenIdx = Number(process.argv[3] ?? 19);
const sessionName = process.argv[2] ?? 'seed0077-rogue-chargen.session.json';

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { game } = await import(join(ROOT, 'js/gstate.js'));
const { cansee } = await import(join(ROOT, 'js/vision.js'));
const { westApportSleeperNicheAtLikeC } = await import(join(ROOT, 'js/mfndpos_mon.js'));

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions', sessionName), 'utf8'),
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

const nhGame = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves,
    storage: storageHandle,
});

const cScreens = [];
for (const step of seg.steps || []) {
    if (step.screen) cScreens.push(step.screen);
}

function parseScreen(s) {
    const grid = [];
    for (const row of s.split('\n')) {
        if (row.length < 80) continue;
        const cells = [];
        for (let i = 0; i < 80; i++) cells.push(row[i] ?? ' ');
        grid.push(cells);
    }
    return grid;
}

const js = nhGame.getScreens?.()[screenIdx] || '';
const loc = game.level?.at(35, 9);
const mon = game.level?.monsters?.find(
    (m) => (m.mx | 0) === 35 && (m.my | 0) === 9,
);
console.log('screen', screenIdx, 'moves', game.moves);
console.log('(35,9)', {
    typ: loc?.typ,
    seenv: loc?.seenv,
    disp: loc?.disp_ch,
    rem: loc?.remembered_glyph?.ch,
});
console.log('mon', mon ? { mnum: mon.mnum, mgenmklev: mon.mgenmklev } : null);
console.log('cansee', cansee(35, 9), 'niche', westApportSleeperNicheAtLikeC(game, 35, 9));
const C = parseScreen(cScreens[screenIdx] || '');
const J = parseScreen(js);
const diffs = [];
for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 80; x++) {
        const e = C[y]?.[x] ?? ' ';
        const got = J[y]?.[x] ?? ' ';
        if (e !== got) diffs.push({ x, y, e, got });
    }
}
console.log('diffs', diffs.length);
for (const d of diffs) console.log(d);
