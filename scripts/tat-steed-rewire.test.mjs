// `trap.c` t_at steed.js clone removal: the local clone (game.ftrap
// ntrap-chain scan) is deleted for the live export (js/trap.js:1119,
// game.level.traps scan). C `trap.c:6502–6512` scans gf.ftrap, whose JS
// live list is game.level.traps (trap.js:1380); game.ftrap is null in a
// fresh game (nothing but load paths set it), so the clone always
// returned null at the dismount_steed kn_trap site (steed.c:545).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { t_at } from '../js/trap.js';

describe('live t_at scans game.level.traps (trap.c:6502-6512)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('finds a trap the deleted clone missed (fresh game: ftrap null)', () => {
        game.level = { traps: [{ tx: 3, ty: 4, ttyp: 1, tseen: 1 }] };
        game.ftrap = null;
        const t = t_at(3, 4);
        assert.ok(t, 'live t_at must find the trap on level.traps');
        assert.equal(t.tx, 3);
        assert.equal(t.ty, 4);
    });

    it('miss returns null', () => {
        game.level = { traps: [{ tx: 3, ty: 4, ttyp: 1, tseen: 1 }] };
        assert.equal(t_at(9, 9), null);
    });

    it('missing level returns null (no throw)', () => {
        assert.equal(t_at(3, 4), null);
    });
});

describe('t_at clone census (steed rewire)', () => {
    it('no local t_at remains in steed.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/steed.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function t_at\(/m),
            'local clone still defined in js/steed.js');
        assert.ok(src.match(/t_at as trap_t_at[^}]*\} from '\.\/trap\.js'/),
            'js/steed.js must import t_at as trap_t_at from trap.js');
    });

    it('census: only the canonical export defines t_at', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function t_at\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/trap.js']);
    });
});
