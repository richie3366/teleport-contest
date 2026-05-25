#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNAP = Number(process.argv[2] ?? 31);
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment, NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
import * as gstate from '../js/gstate.js';

const T = { 0: 'ST', 1: 'VW', 2: 'HW', 4: 'CR', 5: 'SC', 6: 'SD', 7: 'DR', 8: 'FN', 25: 'RM' };

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const seg = normalizeSession(session).segments[0];
const storage = new Map();
const h = {
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
    const idx = this._screens.length - 1;
    if (idx === SNAP) {
        const game = gstate.game;
        console.log('search passes', game.context?._searchStep11Passes, 'moves', game.moves);
        for (let y = 0; y <= 9; y++) {
            let row = `${y} `;
            for (let x = 31; x <= 38; x++) {
                const t = game.level?.at(x, y)?.typ | 0;
                row += (T[t] ?? '?');
            }
            console.log(row);
        }
        for (const [x, y] of [[33, 2], [33, 4], [34, 2], [34, 4], [35, 2], [35, 4]]) {
            const loc = game.level?.at(x, y);
            const n = game.level?.at(x, y - 1);
            const n2 = game.level?.at(x, y - 2);
            console.log(
                `(${x},${y})`,
                T[loc?.typ | 0],
                `N=${T[n?.typ | 0]}`,
                `N2=${T[n2?.typ | 0]}`,
            );
        }
        console.log('doors west', (game.level?.doors ?? []).filter((d) => (d.x | 0) >= 30 && (d.x | 0) <= 40));
    }
};

const nh = await runSegment({ ...seg, storage: h });
const game = gstate.game;
console.log('END screens', nh.getScreens().length, 'search', game.context?._searchStep11Passes, 'moves', game.moves, 'hero', game.u?.ux, game.u?.uy);
for (let y = 1; y <= 9; y++) {
    let row = `${y} `;
    for (let x = 31; x <= 38; x++) {
        const t = game.level?.at(x, y)?.typ | 0;
        row += (T[t] ?? '?');
    }
    console.log(row);
}
for (const [x, y] of [[33, 2], [33, 4], [34, 2], [34, 4], [35, 2], [35, 4], [35, 7], [35, 8]]) {
    const loc = game.level?.at(x, y);
    const n = game.level?.at(x, y - 1);
    const n2 = game.level?.at(x, y - 2);
    console.log(`(${x},${y})`, loc ? T[loc.typ | 0] : 'null', `N=${n ? T[n.typ | 0] : 'null'}`, `N2=${n2 ? T[n2.typ | 0] : 'null'}`);
}
console.log('loc35 exists', !!game.level?.locations?.[35], 'search', game.context?._searchStep11Passes);
console.log('_searchStep11Passes', game.context?._searchStep11Passes, 'pass2?', (game.context?._searchStep11Passes | 0) >= 2);
