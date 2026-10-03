// `monmove.c` monflee music.js clone removal: the local async clone
// (mflee/mfleetim bookkeeping + a bare "turns to flee" pline, NO
// release_hero / immobile-flinch / flees_light / Vrock-gas arms) is
// deleted for the live export (js/monmove.js:1109 — C monmove.c:462–530).
// Sole site awaken_scare rewired via a new static music→monmove edge.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { monflee } from '../js/monmove.js';
import { monsterNames } from '../js/generated/monsters_data.js';
import { initRng } from '../js/rng.js';

const PM_VROCK = monsterNames.indexOf('PM_VROCK');

describe('live monflee Vrock arm (monmove.c:519-522)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3339);
        game.u = { ux: 0, uy: 0 };
    });

    it('sets mspec_used=75+rn2(25) on first flight (the clone left it 0)', { timeout: 5000 }, async () => {
        const mon = {
            mhp: 10, mflee: 0, mspec_used: 0, mx: 5, my: 5,
            data: { mndx: PM_VROCK, mmove: 12 },
            mtrack: null,
        };
        await monflee(mon, 0, false, false);
        assert.equal(mon.mflee, 1);
        // Live export assigns mspec_used before the gas cloud; the deleted
        // music.js clone never touched it.
        assert.ok(mon.mspec_used >= 75 && mon.mspec_used <= 99,
            `mspec_used=${mon.mspec_used}, want 75..99`);
    });

    it('null guard (JS-only; C marks mtmp NONNULLARG1)', { timeout: 5000 }, async () => {
        await monflee(null, 0, false, false);
    });
});

describe('monflee clone census (music rewire)', () => {
    it('no local monflee remains in music.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/music.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^async function monflee\(/m),
            'local clone still defined in js/music.js');
        assert.ok(src.match(/import \{[^}]*monflee[^}]*\} from '\.\/monmove\.js'/),
            'js/music.js must import monflee from monmove.js');
    });

    it('census: only the canonical export defines monflee', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?(async )?function monflee\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/monmove.js']);
    });
});
