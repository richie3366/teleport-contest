#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment, NethackGame } = await import(join(ROOT, 'js/jsmain.js'));
import * as gs from '../js/gstate.js';

const seg = normalizeSession(
    JSON.parse(readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments[0];
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
    const i = this._screens.length - 1;
    if (i >= 10 && i <= 32) {
        console.log(
            'cap', i,
            'moves', gs.game.moves,
            'getch', this._nhgetchCount,
            'hero', [gs.game.u?.ux, gs.game.u?.uy],
            'pass', gs.game.context?._searchStep11Passes,
        );
    }
};

const nh = await runSegment({ ...seg, storage: h });
console.log('total', nh.getScreens().length, 'final moves', gs.game.moves);
