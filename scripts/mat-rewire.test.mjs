// `rm.h` m_at shknam.js clone removal: the js/shknam.js:268 local clone
// (fmon scan with no dead/steed/offmap/worm-seg arms) is deleted for the
// live export (js/mon.js:1745). C `rm.h:510-511` is a MON_AT-gated lookup:
// monsters[x][y] when occupied, NULL otherwise. The two shknam call sites
// are C shknam.c:470 (!MON_AT mimic gate in mkshobj_at; JS has no MON_AT
// export, live m_at null iff unoccupied at stock time) and C shknam.c:660
// (shkinit squatter insurance, direct m_at call).
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { m_at } from '../js/mon.js';
import { MON_OFFMAP } from '../js/const.js';
import { initRng } from '../js/rng.js';

function monAt(x, y, extra = {}) {
    return { mx: x, my: y, mhp: 4, mstate: 0, ...extra };
}

describe('live m_at MON_AT-gated lookup (rm.h:510-511)', () => {
    beforeEach(() => {
        resetGame();
        initRng(3328);
        game.fmon = [];
    });

    it('returns the monster at (x, y), null on an empty square', { timeout: 5000 }, () => {
        const m = monAt(6, 5);
        game.fmon.push(m);
        assert.equal(m_at(6, 5), m);
        assert.equal(m_at(7, 5), null);
    });

    it('skips a dead monster (DEADMONSTER is off the map grid)', { timeout: 5000 }, () => {
        game.fmon.push(monAt(6, 5, { mhp: 0 }));
        assert.equal(m_at(6, 5), null);
    });

    it('skips the steed (remove_monstered while mounted)', { timeout: 5000 }, () => {
        const steed = monAt(6, 5);
        game.fmon.push(steed);
        game.u = { ...(game.u || {}), usteed: steed };
        assert.equal(m_at(6, 5), null);
    });

    it('skips MON_OFFMAP monsters (gulpmm-style empty grid cell)', { timeout: 5000 }, () => {
        game.fmon.push(monAt(6, 5, { mstate: MON_OFFMAP }));
        assert.equal(m_at(6, 5), null);
    });
});

describe('m_at clone census (shknam rewire)', () => {
    it('no local m_at remains in shknam.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/shknam.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function m_at\(/m),
            'local clone still defined in js/shknam.js');
        assert.ok(src.match(/import \{[^}]*m_at[^}]*\} from '\.\/mon\.js'/),
            'js/shknam.js must import m_at from mon.js');
    });

    it('census: remaining m_at defs are the canonical export + out-of-scope locals', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function m_at\(/m)) defs.push(`js/${f}`);
        }
        // dig/teleport/uhitm clones stay: dig.js documents a mon cycle;
        // the other two are separate Open rows, not this rewire.
        assert.deepEqual(defs.sort(),
            ['js/dig.js', 'js/mon.js', 'js/teleport.js', 'js/uhitm.js']);
    });
});
