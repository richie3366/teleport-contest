// Must-fix pins for reviews 2160 (D-3210) + 2170 second wave: every
// s_suffix clone in js/ must equal the canonical export arm-for-arm.
// C `hacklib.c:344–359` is lowercase-'s'-only with case-insensitive
// it/you arms; two sweeps in a row missed homes because they enumerated
// queued names instead of the definition census, so the census itself is
// pinned here: any new `function s_suffix*` def must join CLONES.
// The clones are module-private, so each body is extracted verbatim and
// evaluated as the pure function it is, then asserted behaviorally equal
// to the canonical export on every C arm.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { s_suffix } from '../js/do_name.js';

const CLONES = [
    ['js/eat.js', 's_suffix_eat'],
    ['js/mhitm.js', 's_suffix_mm'],
    ['js/dothrow.js', 's_suffix_throw_gold'],
    ['js/potion.js', 's_suffix_pot'],
    ['js/zap.js', 's_suffix_zap'],
    ['js/objnam.js', 's_suffix_objnam'],
    ['js/apply.js', 's_suffix_apply'],
    ['js/apply.js', 's_suffix_fig'],
    ['js/timeout.js', 's_suffix_hatch'],
    ['js/weapon.js', 's_suffix_towel'],
    ['js/apply.js', 's_suffix_leash'],
    ['js/mhitu.js', 's_suffix_poison'],
    ['js/invent.js', 's_suffix_inv'],
    ['js/mhitu.js', 's_suffix_hitmsg'],
    ['js/explode.js', 's_suffix'],
    ['js/minion.js', 's_suffix'],
    ['js/mthrowu.js', 's_suffix'],
    ['js/questpgr.js', 's_suffix'],
    ['js/shk.js', 's_suffix'],
];

function loadClone(file, name) {
    const src = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    const m = src.match(new RegExp(`function ${name}\\(s\\) \\{([\\s\\S]*?)\\n\\}`));
    assert.ok(m, `${name} body found in ${file}`);
    return new Function('s', m[1]);
}

const CASES = [
    ['it', 'its'], ['It', 'Its'], ['IT', 'ITs'],
    ['you', 'your'], ['You', 'Your'], ['YOU', 'YOUr'],
    ['Xerxes', "Xerxes'"], // lowercase s → bare '
    ['XERXES', "XERXES's"], // uppercase S → 's (the Must-fix predicate)
    ['Chris', "Chris'"], ['CHRIS', "CHRIS's"],
    ['box', "box's"], // no z/x/ch/sh arm (zap Must-fix)
    ['wax', "wax's"], ['church', "church's"], ['wish', "wish's"],
    ['dog', "dog's"], ['', "'s"],
    [null, "'s"], [undefined, "'s"], // no falsy passthrough (zap Must-fix)
];

describe('s_suffix contract (hacklib.c:344-359)', () => {
    it('canonical export matches C on every arm', () => {
        for (const [input, want] of CASES) {
            assert.equal(s_suffix(input), want, JSON.stringify(input));
        }
    });
    for (const [file, name] of CLONES) {
        it(`${name} (${file}) equals canonical on every arm`, () => {
            const clone = loadClone(file, name);
            for (const [input, want] of CASES) {
                assert.equal(clone(input), want, `${name}(${JSON.stringify(input)})`);
            }
        });
    }
    it('CLONES covers every s_suffix definition in js/ (census)', () => {
        const dir = new URL('../js/', import.meta.url);
        const pinned = new Set(CLONES.map(([f, n]) => `${f}:${n}`));
        for (const f of readdirSync(dir)) {
            if (!f.endsWith('.js')) continue;
            const src = readFileSync(new URL(f, dir), 'utf8');
            for (const line of src.split('\n')) {
                const m = line.match(/function (s_suffix\w*)\(/);
                if (!m) continue;
                if (`js/${f}` === 'js/do_name.js' && m[1] === 's_suffix') continue;
                assert.ok(pinned.has(`js/${f}:${m[1]}`),
                    `unpinned clone ${m[1]} in js/${f} — add to CLONES`);
            }
        }
    });
});
