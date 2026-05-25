#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as gstate from '../js/gstate.js';
import { runSegment } from '../js/jsmain.js';
import { normalizeSession } from '../frozen/session_loader.mjs';
import {
    westApportSleeperNicheAtLikeC,
    westFillApportDoorLikeC,
} from '../js/mfndpos_mon.js';

const seg = normalizeSession(
    JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'sessions/seed0077-rogue-chargen.session.json'), 'utf8')),
).segments[0];
const storage = new Map();
const sh = {
    getItem(k) { return storage.has(k) ? storage.get(k) : null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key() { return null; },
};
await runSegment({ seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc, moves: seg.moves, storage: sh });
const g = gstate.game;
for (const d of g.level?.doors ?? []) {
    console.log('door', d.x, d.y, 'westFill', westFillApportDoorLikeC(g, d));
}
console.log('niche(35,8)', westApportSleeperNicheAtLikeC(g, 35, 8));
console.log('niche(35,9)', westApportSleeperNicheAtLikeC(g, 35, 9));
