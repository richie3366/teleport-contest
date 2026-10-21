import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { load } from './ledger.mjs';
import { stripJs, pickReread, formatBatch } from './lib/reread.mjs';

describe('stripJs', () => {
  it('blanks comments and string text, keeps code, newlines and ${} expressions', () => {
    const src = "a(); // You()\nconst s = 'pline(x)'; /* foo(\n bar() */ b(`t ${c(1)} u`);";
    const out = stripJs(src);
    assert.equal(out.length, src.length);
    assert.equal(out.split('\n').length, src.split('\n').length);
    assert.match(out, /a\(\);/);
    assert.match(out, /c\(1\)/);
    assert.match(out, /b\(`/);
    for (const gone of ['You', 'pline', 'foo', 'bar']) assert.doesNotMatch(out, new RegExp(gone));
  });
});

describe('re-read slice on the live tree', () => {
  it('is one file, in C order, never an audited function, within 1.5 × the budget', async () => {
    const L = await load();
    const b = pickReread(L, { lines: 400 });
    assert.equal(b.mode, 'reread');
    assert.ok(b.fns.length > 0);
    assert.equal(b.files.length, 1);
    const starts = b.fns.map((f) => parseInt(f.c, 10));
    assert.deepEqual(starts, [...starts].sort((x, y) => x - y));
    for (const f of b.fns) assert.doesNotMatch(String((L.ledger.get(f.key) || {}).note || ''), /^audited/);
    assert.ok(b.fns.length === 1 || b.gapLines <= 600);
    assert.match(formatBatch(b), /^re-read batch @/);
  });
});
