import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { initRng } from '../js/rng.js';
import { display_binventory } from '../js/invent.js';
import { POOL, ROOM } from '../js/const.js';
import { objectNames, FOOD_CLASS } from '../js/objects.js';
import { clear_nhwindow_message, getmsghistory, reset_display_messages } from '../js/display.js';

// C ref: invent.c display_binventory `:5500–5502` —
//   `if (is_pool_or_lava(x, y) && !Underwater && (obj = ...) != 0)`
// with Underwater ≡ u.uinwater (youprop.h:279).
// The JS gate read the sticky `game.u?.Underwater` flat (zero writers
// anywhere in js/ — dead false), so a submerged hero probing water/lava
// got the under-liquid item list where C skips the overlay entirely
// (look_here instead; the caller already bhitpile'd). Fix (D-3400
// idiom): read the live `(game.u?.uinwater | 0)` bit.
// Staging: single floor item on POOL at (5,5), no buried objects; the
// single-item arm plines (no menu, no --More--), so the return value
// (n+n2: 0 submerged vs 1 surface) plus the message ring pin the gate.
// seen_liquid rides hliquid (display RNG), so match /under the .* here/.

const RATION = objectNames.indexOf('FOOD_RATION');
assert.ok(RATION >= 0);

const X = 5;
const Y = 5;

function setup({ hero = {}, seed = 3725 } = {}) {
    resetGame();
    reset_display_messages();
    clear_nhwindow_message();
    initRng(seed);
    // window_inited routes vpline through putmesg into the message ring
    // getmsghistory walks (chwepon-no-weapon-feeling.test.mjs precedent).
    game.iflags = { ...(game.iflags ?? {}), window_inited: 1 };
    game.u = { uinwater: 0, ...hero };
    game.level = {
        buriedobjlist: null,
        at: (x, y) => ({ typ: x === X && y === Y ? POOL : ROOM }),
    };
    game._objects_at = new Map([
        [`${X},${Y}`, {
            otyp: RATION, oclass: FOOD_CLASS, quan: 1, nexthere: null,
            known: 0, dknown: 0, cknown: 0, bknown: 0, lknown: 0,
            spe: 0, owornmask: 0, oextra: null, unpaid: 0, cobj: null,
        }],
    ]);
}

function messages() {
    const out = [];
    for (let m = getmsghistory(true); m; m = getmsghistory(false)) out.push(String(m));
    return out;
}

describe('display_binventory pool/lava overlay gate reads live uinwater (invent.c:5501, youprop.h:279)', () => {
    it('submerged (uinwater=1): overlay skipped, return 0, silent', async () => {
        setup({ hero: { uinwater: 1 } });
        assert.equal(await display_binventory(X, Y, true), 0);
        const msgs = messages();
        assert.ok(!msgs.some((m) => m.includes('under the')), `submerged must stay silent, got: ${JSON.stringify(msgs)}`);
    });

    it('surface control (uinwater=0): under-liquid list, return 1', async () => {
        setup({ hero: { uinwater: 0 } });
        assert.equal(await display_binventory(X, Y, true), 1);
        const msgs = messages();
        assert.match(msgs.join('\n'), /under the .* here/);
    });

    it('dead u.Underwater flat alone still lists (live bit rules)', async () => {
        setup({ hero: { uinwater: 0, Underwater: 1 } });
        assert.equal(await display_binventory(X, Y, true), 1);
        const msgs = messages();
        assert.match(msgs.join('\n'), /under the .* here/);
    });
});
