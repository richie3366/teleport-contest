#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { decodeScreen } from '../frozen/screen-decode.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment, NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
import * as gstate from '../js/gstate.js';
import { mapTerrainGlyph } from '../js/display.js';
import { cansee } from '../js/vision.js';
import { ROOM, SDOOR, CORR, HWALL, VWALL, STONE } from '../js/const.js';

const tn = (t) => ({ 0: 'ST', 1: 'VW', 2: 'HW', 14: 'SD', 24: 'CR', 25: 'RM', 7: 'DR' }[t] ?? t);

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

const orig = NethackGame.prototype.captureJudgeSnapshot;
NethackGame.prototype.captureJudgeSnapshot = async function patched(o) {
    await orig.call(this, o);
    if (this._screens.length - 1 !== 31) return;
    const g = gstate.game;
    console.log('passes', g.context?._searchStep11Passes, 'moves', g.moves);
    for (const [x, y] of [[34, 2], [34, 4], [33, 3], [34, 3], [35, 3]]) {
        const loc = g.level.at(x, y);
        const tg = mapTerrainGlyph(loc, x, y);
        console.log(
            `(${x},${y})`,
            'N', tn(g.level.at(x, y - 1)?.typ),
            'N2', tn(g.level.at(x, y - 2)?.typ),
            'E', tn(g.level.at(x + 1, y)?.typ),
            'W', tn(g.level.at(x - 1, y)?.typ),
            'disp', loc.disp_ch,
            'mapTG', tg.ch,
            'rem', loc.remembered_glyph?.ch,
            'see', cansee(x, y),
        );
    }
};

await runSegment({ ...seg, storage: h });
