// allmain.c early_init `:32–45` — whole-body port + jsmain.js start() wiring
// (sole C caller unixmain.c:66, the port entry). C order: program_state
// `:35`, crashreport `:38` (CRASHREPORT active on Linux — config.h:249,
// no NOCRASHREPORT in unixconf.h), decl `:40`, objects `:41`, monst `:42`,
// sys `:43`, runtime `:44`. jsmain previously inlined 4 of the 7 (with
// an off-by-one decl comment (:41 for :40)); the other 3 were entry-missing (crashreport
// unwired per report.js, objects only via init_objects/restore preambles,
// runtime lazy via do_runtime_info). bid is module-local in report.js, so
// the `:38` call is covered by the order census, not behaviorally.
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { game, resetGame } from '../js/gstate.js';
import { early_init } from '../js/allmain.js';
import { do_runtime_info } from '../js/version.js';

const ALLMAIN_SRC = readFileSync(new URL('../js/allmain.js', import.meta.url), 'utf8');
const JSMAIN_SRC = readFileSync(new URL('../js/jsmain.js', import.meta.url), 'utf8');

describe('early_init whole body in C order (allmain.c:32-45)', () => {
    beforeEach(() => {
        resetGame();
    });

    it('installs objects/bases/totals (:41)', { timeout: 15000 }, () => {
        early_init(0, []);
        assert.ok(Array.isArray(game.objects) && game.objects.length > 100);
        assert.ok(game.objects[1] && 'oc_class' in game.objects[1]);
        assert.ok(game.bases.every((b) => b === 0));
        assert.ok(game.oclass_prob_totals.every((t) => t === 0));
    });

    it('resets program_state (:35) and decl/monst/sys state (:40/:42/:43)', { timeout: 15000 }, () => {
        early_init(0, []);
        assert.deepEqual(game.program_state, {});
        assert.deepEqual(game.flags, {});
        assert.deepEqual(game.iflags, {});
    });

    it('runs runtime_info_init eagerly (:44)', { timeout: 15000 }, () => {
        early_init(0, []);
        assert.ok(do_runtime_info({ i: 0 }) !== null);
    });

    it('body order matches C (:35<:38<:40<:41<:42<:43<:44)', () => {
        const body = ALLMAIN_SRC.slice(ALLMAIN_SRC.indexOf('export function early_init'));
        const order = [
            'program_state_init()',
            'crashreport_init(argc, argv)',
            'decl_globals_init()',
            'objects_globals_init()',
            'monst_globals_init()',
            'sys_early_init()',
            'runtime_info_init()',
        ];
        let prev = -1;
        for (const call of order) {
            const at = body.indexOf(call);
            assert.ok(at > prev, `${call} missing or out of C order`);
            prev = at;
        }
    });
});

describe('early_init wired at the port entry (unixmain.c:66)', () => {
    it('jsmain start() calls early_init(0, []) after resetGame()', () => {
        const start = JSMAIN_SRC.slice(JSMAIN_SRC.indexOf('async start()'));
        const rg = start.indexOf('resetGame()');
        const ei = start.indexOf('early_init(0, [])');
        assert.ok(rg !== -1 && ei !== -1 && rg < ei);
    });

    it('jsmain no longer inlines the four sub-inits', () => {
        for (const fn of ['program_state_init', 'decl_globals_init', 'monst_globals_init', 'sys_early_init']) {
            const re = new RegExp(`^\\s*${fn}\\(\\);`, 'm');
            assert.ok(!re.test(JSMAIN_SRC), `jsmain still inlines ${fn}()`);
        }
    });
});
