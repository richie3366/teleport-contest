import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import {
    COLNO, ROWNO, STONE, ROOM, FOUNTAIN, SINK,
} from '../js/const.js';
import { count_level_features } from '../js/mklev.js';
import { set_levltyp } from '../js/trap.js';
import { initRng } from '../js/rng.js';

// C refs: mklev.c mklev `:1577–1593` (no feature recount) + count_level_features
// `:828–841` (true rescan) + mkfount `:2285–2300` (set_levltyp, then `++`) +
// mkmaze.c set_levltyp `:106–108` (recount on fountain/sink-ness change) +
// sp_lev.c load_special `:6484` (des-epilogue recount).
//
// Pins the ^F-footer fountain count (scen-kit-Archeologist-92022 step 68:
// C «D:0,L:1 {:2 vault dungeon» vs JS «{:1»): on normal levels C keeps
// mkfount's recount+`++` double count (1 actual fountain reads 2); only des
// levels recount (load_special epilogue). The old blanket recount in JS
// mklev collapsed the quirk to the true count; the corpus probes are the
// integration coverage (kit-92022, ranged-94128, trap-94201/94381 →PASS).
function makeLevel() {
    const cells = new Map();
    return {
        flags: {},
        at(x, y) {
            if (x < 0 || y < 0 || x >= COLNO || y >= ROWNO) return null;
            const k = `${x},${y}`;
            let c = cells.get(k);
            if (!c) {
                c = { typ: ROOM };
                cells.set(k, c);
            }
            return c;
        },
    };
}

describe('mklev fountain/sink counts (mklev.c:1577-1593, no blanket recount)', () => {
    let savedLevel;
    beforeEach(() => {
        resetGame();
        savedLevel = game.level;
        game.level = makeLevel();
        initRng(1234);
    });
    afterEach(() => {
        game.level = savedLevel;
    });

    it('count_level_features rescans the true count (C :828-841)', () => {
        game.level.at(5, 5).typ = FOUNTAIN;
        game.level.at(6, 6).typ = SINK;
        game.level.flags.nfountains = 7; // stale
        game.level.flags.nsinks = 9; // stale
        count_level_features();
        assert.equal(game.level.flags.nfountains, 1);
        assert.equal(game.level.flags.nsinks, 1);
    });

    it('set_levltyp recounts on fountain-ness change (C mkmaze.c:106-108)', () => {
        game.level.at(5, 5).typ = FOUNTAIN;
        game.level.flags.nfountains = 7; // stale: recount must wash it out
        assert.equal(set_levltyp(6, 5, FOUNTAIN), true);
        // Recount sees 2 actual fountains; a ±1 adjust would give 8.
        assert.equal(game.level.flags.nfountains, 2);
    });

    it('mkfount order keeps the C double count (C :2295-2299; ^F shows 2 for 1)', () => {
        game.level.flags.nfountains = 0;
        // mkfount body in C order: set_levltyp (recounts to 1 incl. the new
        // cell), rn2(7) blessed arm (no count effect), then nfountains++.
        assert.equal(set_levltyp(5, 5, FOUNTAIN), true);
        assert.equal(game.level.flags.nfountains, 1);
        game.level.flags.nfountains++;
        assert.equal(game.level.flags.nfountains, 2);
        // ...while the terrain holds exactly one fountain cell.
        count_level_features();
        assert.equal(game.level.flags.nfountains, 1);
    });

    it('mklev wires no blanket recount; load_special keeps the :6484 one', () => {
        const src = readFileSync(new URL('../js/mklev.js', import.meta.url), 'utf8');
        const mklevBody = src.match(/export async function mklev\(\) \{([\s\S]*?)\n\}/)[1];
        assert.ok(!mklevBody.includes('recount_level_features'),
            'invented blanket recount must stay out of mklev (C :1577-1593 has none)');
        assert.ok(!mklevBody.includes('count_level_features'),
            'no rescan of any name inside mklev');
        assert.ok(!src.match(/^function recount_level_features\(\)/m),
            'dead blanket helper must stay deleted');
        const protoBody = src.match(/async function load_special_proto\(protofile\) \{([\s\S]*?)\n\}/)[1];
        assert.ok(protoBody.includes('count_level_features()'),
            'des epilogue (C sp_lev.c:6484) must recount after the .lua body');
    });
});
