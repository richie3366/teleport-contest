// Must-fix pins for review 2160 (D-3210): the five suffixed s_suffix clones
// kept pre-D-3200 C-wrongs — `|| endsWith('S')` in eat/mm/throw_gold/pot,
// and zap additionally lacked the you arm while keeping z/x/ch/sh + a falsy
// passthrough. C `hacklib.c:344–359` is lowercase-'s'-only with
// case-insensitive it/you arms. The clones are module-private, so each body
// is extracted verbatim and evaluated as the pure function it is, then
// asserted behaviorally equal to the canonical export on every C arm.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { s_suffix } from '../js/do_name.js';

const CLONES = [
    ['js/eat.js', 's_suffix_eat'],
    ['js/mhitm.js', 's_suffix_mm'],
    ['js/dothrow.js', 's_suffix_throw_gold'],
    ['js/potion.js', 's_suffix_pot'],
    ['js/zap.js', 's_suffix_zap'],
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
});
