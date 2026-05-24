#!/usr/bin/env node
/** Log hero/pet coords at door j, apply, and second-search dog_move. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));
const { dist2 } = await import(join(ROOT, 'js/hacklib.js'));

const events = [];
function log(tag, g) {
    const u = g.u;
    const pet = g.level?.monsters?.find((m) => m.mtame);
    const n = getRngLog().length;
    const d = pet && u ? dist2(pet.mx | 0, pet.my | 0, u.ux | 0, u.uy | 0) : -1;
    events.push({
        tag,
        n,
        moves: g.moves,
        hero: u ? [u.ux, u.uy] : null,
        pet: pet ? [pet.mx, pet.my] : null,
        dist2: d,
    });
}

globalThis.__diagDomovePreLikeC = (g, dx, dy, nx, ny, dest) => {
    if (nx === 36 && ny === 8) {
        console.log(
            `  pre domove from (${g.u?.ux},${g.u?.uy}) -> (${nx},${ny}) moves=${g.moves} typ=${dest?.typ} dm=${dest?.doormask}`,
        );
    }
    if ((g.u?.ux | 0) === 36 && (g.u?.uy | 0) === 7 && nx === 36 && ny === 8) {
        for (let y = 6; y <= 10; y++) {
            let row = '';
            for (let x = 34; x <= 39; x++) {
                const loc = g.level?.at(x, y);
                const t = loc?.typ | 0;
                const d = loc?.doormask | 0;
                row += t === 23 ? (d & 4 ? 'D' : 'd') : t === 24 ? '.' : '#';
            }
            console.log('  pre j y=' + y, row);
        }
    }
};
globalThis.__diagDomoveLikeC = (g, dx, dy) => {
    const u = g.u;
    const nx = (u.ux | 0) + dx;
    const ny = (u.uy | 0) + dy;
    const dest = g.level?.at(nx, ny);
    const dm = dest?.doormask | 0;
    log(`domove ${dx},${dy} dest=(${nx},${ny}) typ=${dest?.typ} dm=${dm}`, g);
    if (nx === 36 && ny === 8) {
        for (let y = 6; y <= 10; y++) {
            let row = '';
            for (let x = 34; x <= 39; x++) {
                const loc = g.level?.at(x, y);
                const t = loc?.typ | 0;
                const d = loc?.doormask | 0;
                row += t === 23 ? (d & 4 ? 'D' : 'd') : t === 24 ? '.' : '#';
            }
            console.log('  map y=' + y, row);
        }
    }
};
globalThis.__diagRhackLikeC = (g, ch) => {
    const chs = ch >= 32 && ch < 127 ? String.fromCharCode(ch) : `#${ch}`;
    log(`rhack ${JSON.stringify(chs)}`, g);
};
globalThis.__diagDogMoveLikeC = (g) => {
    if ((g.context?._searchStep11Passes | 0) !== 2) return;
    log('dogMove pass2', g);
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0077-rogue-chargen.session.json'), 'utf8'),
);
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};

for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}

for (const e of events) {
    console.log(
        `${e.tag} rng=${e.n} moves=${e.moves} hero=(${e.hero}) pet=(${e.pet}) dist2=${e.dist2}`,
    );
}
