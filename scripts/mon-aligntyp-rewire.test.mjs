// `priest.c` mon_aligntyp teleport.js clone removal: the local clone
// (js/teleport.js:342-then, EPRI/EMIN-missing fallback to maligntyp
// vs the live `?? 0` guards) is deleted for the live export
// (js/priest.js:150, C `:280–289`). C `monst.h:282`
// `is_minion(data) && mon_aligntyp == A_LAWFUL` in is_lminion is the
// sole rewired site.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

describe('mon_aligntyp clone census (teleport rewire)', () => {
    it('no local mon_aligntyp remains in teleport.js; it imports the live export', () => {
        const src = readFileSync(new URL('../js/teleport.js', import.meta.url), 'utf8');
        assert.ok(!src.match(/^function mon_aligntyp\(/m),
            'local clone still defined in js/teleport.js');
        assert.ok(src.match(/import \{ mon_aligntyp \} from '\.\/priest\.js';/),
            'js/teleport.js must import mon_aligntyp from priest.js');
    });

    it('is_lminion still calls mon_aligntyp(mon) (C monst.h:282)', () => {
        const src = readFileSync(new URL('../js/teleport.js', import.meta.url), 'utf8');
        assert.ok(src.match(/C monst\.h is_lminion/),
            'C-cite comment missing at the is_lminion site');
        assert.ok(src.match(/^\s*return is_minion\(mon\?\.data\) && mon_aligntyp\(mon\) === A_LAWFUL;/m),
            'mon_aligntyp(mon) call missing in js/teleport.js is_lminion');
    });

    it('census: only the canonical export defines mon_aligntyp', () => {
        const dir = new URL('../js/', import.meta.url);
        const defs = [];
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            if (src.match(/^(export )?function mon_aligntyp\(/m)) defs.push(`js/${f}`);
        }
        assert.deepEqual(defs.sort(), ['js/priest.js']);
    });
});
