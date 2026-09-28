import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    tabexpand, upwords, chrcasecpy, strcasecpy, c_eos, sitoa,
} from '../js/hacklib.js';

// C ref: nethack-c/upstream/src/hacklib.c — tabexpand `:428–464`,
// upwords `:122–138`, chrcasecpy `:300–317`, strcasecpy `:321–341`,
// c_eos `:202–208`, sitoa `:637–644`.

test('tabexpand expands tabs to 8-column stops, capped at BUFSZ-1', () => {
    assert.equal(tabexpand('a\tb'), 'a' + ' '.repeat(7) + 'b');
    assert.equal(tabexpand(''), '');
    assert.equal(tabexpand('no tabs'), 'no tabs');
    assert.equal(tabexpand('\t'), ' '.repeat(8));
    assert.equal(tabexpand('x'.repeat(256)).length, 255);
    assert.equal(tabexpand('x'.repeat(254) + '\t').length, 255);
});

test('upwords uppercases each blank-separated word', () => {
    assert.equal(upwords('hello world  foo'), 'Hello World  Foo');
    assert.equal(upwords('a[bc'), 'A[bc');
    assert.equal(upwords(''), '');
});

test('chrcasecpy folds nc into oc case', () => {
    assert.equal(chrcasecpy('a', 'B'), 'b');
    assert.equal(chrcasecpy('A', 'b'), 'B');
    assert.equal(chrcasecpy('[', 'B'), 'B');
    assert.equal(chrcasecpy(' ', 'B'), 'B');
});

test('strcasecpy copies src over dst case template', () => {
    assert.equal(strcasecpy('XXX', 'ab'), 'AB');
    assert.equal(strcasecpy('ab', 'XYZW'), 'xyzw');
    assert.equal(strcasecpy('', 'AB'), 'AB');
});

test('c_eos is the end index (string length)', () => {
    assert.equal(c_eos('abc'), 3);
    assert.equal(c_eos(''), 0);
});

test('sitoa signs non-negative ints explicitly', () => {
    assert.equal(sitoa(5), '+5');
    assert.equal(sitoa(-3), '-3');
    assert.equal(sitoa(0), '+0');
});
