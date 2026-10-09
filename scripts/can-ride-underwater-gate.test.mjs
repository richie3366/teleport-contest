import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { game, resetGame } from '../js/gstate.js';
import { can_ride } from '../js/steed.js';
import { M1_SWIM } from '../js/monsters.js';

// C ref: steed.c can_ride `:169–174` —
//   `(!Underwater || is_swimmer(mtmp->data))`,
// with Underwater ≡ u.uinwater (youprop.h:279).
// The JS disjunct read the sticky `game.u?.Underwater` flat (zero writers
// anywhere in js/ — dead false), so a submerged hero could ride a
// non-swimmer steed where C says false. Fix (D-3400 idiom): read the live
// `(u.uinwater | 0)` bit. Fresh game: hero defaults to humanoid medium
// (you_data fallback), so only the steed + submersion vary.

function setup(hero) {
    resetGame();
    game.u = { uinwater: 0, ...hero };
}

const tameSteed = (swimmer) => ({
    mtame: 1,
    data: { mflags1: swimmer ? M1_SWIM : 0 },
});

describe('can_ride Underwater disjunct reads live uinwater (steed.c:169–174, youprop.h:279)', () => {
    beforeEach(() => resetGame());

    it('submerged (uinwater=1) + tame non-swimmer steed: false', () => {
        setup({ uinwater: 1 });
        assert.equal(can_ride(tameSteed(false)), false);
    });

    it('surface control (uinwater=0) + tame non-swimmer steed: true', () => {
        setup({ uinwater: 0 });
        assert.equal(can_ride(tameSteed(false)), true);
    });

    it('submerged swimmer-steed control (uinwater=1): true', () => {
        setup({ uinwater: 1 });
        assert.equal(can_ride(tameSteed(true)), true);
    });

    it('dead u.Underwater flat alone does not forbid (live bit rules)', () => {
        setup({ uinwater: 0, Underwater: 1 });
        assert.equal(can_ride(tameSteed(false)), true);
    });

    it('untame control: false either way', () => {
        setup({ uinwater: 0 });
        assert.equal(can_ride({ mtame: 0, data: { mflags1: 0 } }), false);
    });
});
