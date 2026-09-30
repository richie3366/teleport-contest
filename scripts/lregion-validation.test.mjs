import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { game } from '../js/gstate.js';
await import('../js/jsmain.js');
const { l_teleport_region, l_levregion } = await import('../js/mklev.js');
const { LR_TELE, LR_UPTELE, LR_DOWNTELE, LR_DOWNSTAIR, LR_UPSTAIR,
    LR_PORTAL, LR_BRANCH } = await import('../js/const.js');

// C sp_lev.c:5410–5494 and nhlua.c:1054–1133. Expectations also checked
// against those unchanged bodies linked with the recorder's Lua 5.4.8.
describe('special-level region validation', () => {
    let saved;
    beforeEach(() => {
        saved = Object.fromEntries(['gc', 'lregions', 'splev_xstart', 'splev_ystart',
            'splev_xsize', 'splev_ysize'].map(key => [key, game[key]]));
        game.gc = { coder: { croom: null } };
        game.lregions = [];
        game.splev_xstart = 0;
        game.splev_ystart = 0;
        game.splev_xsize = 79;
        game.splev_ysize = 21;
    });
    afterEach(() => Object.assign(game, saved));
    const table = extra => ({ region: [1, 2, 3, 4], region_islev: true, ...extra });
    const last = () => game.lregions.at(-1);

    it('preserves all teleport directions and nil-only defaults', () => {
        for (const [dir, type] of [[undefined, LR_TELE], [null, LR_TELE],
            ['both', LR_TELE], ['down', LR_DOWNTELE], ['up', LR_UPTELE]]) {
            l_teleport_region(table({ dir, padding: 'ignored', name: false }));
            assert.equal(last().rtype, type);
            assert.equal(last().padding, 0);
            assert.equal(last().rname.str, null);
        }
    });
    it('preserves all level region types', () => {
        const types = [LR_DOWNSTAIR, LR_UPSTAIR, LR_PORTAL, LR_BRANCH,
            LR_TELE, LR_UPTELE, LR_DOWNTELE];
        ['stair-down', 'stair-up', 'portal', 'branch', 'teleport',
            'teleport-up', 'teleport-down'].forEach((type, i) => {
            l_levregion(table({ type }));
            assert.equal(last().rtype, types[i]);
        });
    });
    it('rejects invalid options before appending a region', () => {
        for (const value of ['', 'UP', 'unknown', false, 0, {}]) {
            assert.throws(() => l_teleport_region(table({ dir: value })));
            assert.throws(() => l_levregion(table({ type: value })));
        }
        assert.equal(game.lregions.length, 0);
    });
    it('validates both numeric boolean fields even when exclude is absent', () => {
        for (const binding of [l_teleport_region, l_levregion]) {
            for (const key of ['region_islev', 'exclude_islev']) {
                for (const value of [2, -1, 0.5, {}, '1', 'TRUE']) {
                    assert.throws(() => binding(table({ [key]: value })));
                }
            }
        }
        assert.equal(game.lregions.length, 0);
    });
    it('keeps the pinned string-option indices rather than boolean meanings', () => {
        for (const [value, index] of [['true', 0], ['false', 1], ['yes', 2], ['no', 3]]) {
            l_teleport_region(table({ region_islev: value, exclude: [1, 2, 3, 4], exclude_islev: value }));
            assert.equal(last().in_islev, index);
            assert.equal(last().del_islev, index);
        }
    });
    it('casts a numeric boolean to int before checking its range', () => {
        l_levregion(table({ region_islev: 4294967296 }));
        assert.equal(last().in_islev, 0);
    });
    it('checks regions then booleans then type then padding then name', () => {
        assert.throws(() => l_levregion({ region: [], region_islev: 2, type: 'bad' }), /Not a region/);
        assert.throws(() => l_levregion(table({ region_islev: 2, type: 'bad' })), /Expected a boolean/);
        assert.throws(() => l_levregion(table({ type: 'bad', padding: 0.5 })), /invalid option/);
        assert.throws(() => l_levregion(table({ padding: 0.5, name: false })), /integer representation/);
    });
    it('narrows region fields but keeps the original exclude x1 for its guard', () => {
        l_levregion(table({ region: [65536, 32768, '9223372036854775807', 4],
            exclude: [65535, 2, 3, 4], exclude_islev: true }));
        assert.deepEqual(last().inarea, { x1: 0, y1: -32768, x2: -1, y2: 4 });
        assert.equal(last().delarea.x1, -1);
        // Original lua_Integer -65536 is negative even though coordxy becomes 0.
        l_levregion(table({ exclude: [-65536, 2, 3, 4], exclude_islev: false }));
        assert.equal(last().delarea.x1, 0);
        assert.equal(last().del_islev, 1);
    });
    it('uses lua_tointeger zero on fractional region entries', () => {
        l_levregion(table({ region: [1.5, '2.5', 3, 4] }));
        assert.deepEqual(last().inarea, { x1: 0, y1: 0, x2: 3, y2: 4 });
    });
    it('validates and narrows padding as int then coordxy', () => {
        for (const [padding, expected] of [[65535, -1], [65536, 0],
            ['9223372036854775807', -1], [null, 0]]) {
            l_levregion(table({ padding }));
            assert.equal(last().padding, expected);
        }
        for (const padding of [1.5, true, '0b10'])
            assert.throws(() => l_levregion(table({ padding })));
    });
    it('keeps empty names, trims NUL, and calls name producers once', () => {
        l_levregion(table({ name: '' }));
        assert.equal(last().rname.str, '');
        let calls = 0;
        l_levregion(table({ name: () => { calls++; return 'portal\0suffix'; } }));
        assert.equal(calls, 1);
        assert.equal(last().rname.str, 'portal');
        l_levregion(table({ name: () => 0.00001 }));
        assert.equal(last().rname.str, '1e-05');
        l_levregion(table({ name: () => null }));
        assert.equal(last().rname.str, null);
        assert.throws(() => l_levregion(table({ name: 123 })));
        assert.throws(() => l_levregion(table({ name: () => false })));
    });
    it('discards extra parameters and checks the first parameter type', () => {
        l_levregion(table({}), false);
        assert.equal(game.lregions.length, 1);
        assert.throws(() => l_levregion(null), /table expected/);
        assert.throws(() => l_teleport_region(false), /table expected/);
        assert.throws(() => l_levregion(), /region/);
    });
});
