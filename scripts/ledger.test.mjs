import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cCodeText, jsCodeText } from './lib/coverage.mjs';
import { canonical, serialize, parseLedgerText, resolveKey, mergeD, clipOmit } from './lib/ledger-io.mjs';
import { namesNoOmission, firstSentence } from './lib/ledger-seed.mjs';
import { parseLedgerBullet, load, runCheck, eligibleRows, BLOCK_BEGIN, BLOCK_END } from './ledger.mjs';
import { ledgerStaleKeys } from './port-did-park.mjs';

describe('code-line counting', () => {
  it('drops comments, #if 0 arms, directives and brace-only lines in C', () => {
    const body = `{
    /* long
       comment */
    int x = 0; // trailing
#if 0
    dead();
#else
    live();
#endif
#ifdef FOO
    maybe();
#endif
    if (x) {
        x++;
    }
}`;
    assert.deepEqual(cCodeText(body), ['int x = 0;', 'live();', 'maybe();', 'if (x) {', 'x++;']);
  });
  it('drops comments and punctuation-only lines in JS', () => {
    assert.deepEqual(jsCodeText('{\n  // c\n  const a = 1; // t\n  /* b */\n  });\n}'), ['const a = 1;']);
  });
});

describe('ledger rows', () => {
  it('serializes canonically: fixed key order, empty keys dropped, sorted by C start', () => {
    const rows = [
      { note: '', fn: 'b', status: 'unknown', c: '20-30' },
      { d: ['D-0002'], js: ['js/a.js:a'], status: 'ported', c: '5-9', fn: 'a', omit: '' },
    ];
    const text = serialize(rows);
    assert.equal(text, '{"fn":"a","c":"5-9","status":"ported","js":["js/a.js:a"],"d":["D-0002"]}\n{"fn":"b","c":"20-30","status":"unknown"}\n');
    assert.equal(serialize(parseLedgerText(text)), text);
    assert.equal(canonical({ fn: 'x', status: 'absent', js: [] }), '{"fn":"x","status":"absent"}');
  });
  it('resolves bare names, file-qualified names, and reports ambiguity', () => {
    const keys = new Set(['termcap.c:term_curs_set', 'wintty.c:term_curs_set', 'eat.c:newuhs']);
    assert.equal(resolveKey('newuhs', keys).key, 'eat.c:newuhs');
    assert.equal(resolveKey('wintty.c:term_curs_set', keys).key, 'wintty.c:term_curs_set');
    assert.match(resolveKey('term_curs_set', keys).error, /ambiguous/);
    assert.match(resolveKey('nope', keys).error, /not a pinned-C function/);
  });
  it('keeps the newest D-ids first and caps omissions', () => {
    assert.deepEqual(mergeD(['D-0001', 'D-0100'], ['D-2000', 'D-0100']), ['D-2000', 'D-0100', 'D-0001']);
    assert.equal(clipOmit('x'.repeat(400)).length, 300);
  });
});

describe('D-entry Ledger bullet', () => {
  it('parses one or several items with optional split locations', () => {
    assert.deepEqual(parseLedgerBullet('`set_corn` ported'), [{ spec: 'set_corn', status: 'ported', js: null }]);
    assert.deepEqual(parseLedgerBullet('a ported; mklev.c:b split js=mklev.js:b+js/mklev.js:b_core'), [
      { spec: 'a', status: 'ported', js: null },
      { spec: 'mklev.c:b', status: 'split', js: ['js/mklev.js:b', 'js/mklev.js:b_core'] },
    ]);
    assert.ok(parseLedgerBullet('').error);
    assert.ok(parseLedgerBullet('a ported extra').error);
  });
  it('classifies Named omissions that name no missing C behaviour', () => {
    assert.equal(namesNoOmission('No arm of `x` is omitted. `y` stays named.'), true);
    assert.equal(namesNoOmission('A null `uarmc` returns early (C would dereference).'), true);
    assert.equal(namesNoOmission('`m_consume_obj` tail stays stub (meatbox).'), false);
    assert.equal(namesNoOmission('`HUPSKIP`; `WIN_ERR` tty_raw_print.'), false);
    assert.equal(firstSentence('One. Two.'), 'One.');
  });
});

describe('stale retirement via ledger (port-did-park)', () => {
  const row = '- [ ] `display.c` set_corn — coverage THIN (C 12 code L) @abc';
  const q = (rows) => `# Q\n\n## Open — coverage\n\n${BLOCK_BEGIN}\n${rows.join('\n')}\n${BLOCK_END}\n\n## Parked (do not pop) — index\n`;
  it('detects a removed row whose ledger row gained a stale note', () => {
    const before = new Map([['display.c:set_corn', { fn: 'set_corn', status: 'unknown' }]]);
    const after = new Map([['display.c:set_corn', { fn: 'set_corn', status: 'ported', note: 'stale: js/mklev.js:40' }]]);
    assert.deepEqual(ledgerStaleKeys(q([row]), q([]), before, after), ['display.c:set_corn']);
    assert.deepEqual(ledgerStaleKeys(q([row]), q([row]), before, after), []);
    assert.deepEqual(ledgerStaleKeys(q([row]), q([]), after, after), []);
  });
});

describe('live tree invariants', async () => {
  const L = await load();
  it('has one ledger row per pinned-C definition, incl. cross-file duplicates', () => {
    assert.equal(L.ledger.size, L.byKey.size);
    for (const k of ['termcap.c:term_curs_set', 'wintty.c:term_curs_set', 'termcap.c:tty_change_color', 'wintty.c:tty_change_color']) {
      assert.ok(L.byKey.has(k), k);
    }
  });
  it('passes ledger check', async () => {
    const { fails } = await runCheck();
    assert.deepEqual(fails, []);
  });
  it('queue rows skip live names, keep stable lines verbatim, never emit declared rows', async () => {
    const first = (await eligibleRows({ n: 3, queueText: '' }))[0];
    assert.ok(first);
    const kept = `${first.line.replace(/@\w+$/, '@keepme')}`;
    const text = `## Open — coverage\n${BLOCK_BEGIN}\n${kept}\n${BLOCK_END}\n`;
    const again = await eligibleRows({ n: 3, queueText: text, stable: true });
    assert.equal(again[0].line, kept);
    const live = `## Must-fix\n- [ ] \`${first.r.file}\` ${first.r.fn} — js-throw\n`;
    assert.ok(!(await eligibleRows({ n: 20, queueText: live })).some((x) => x.r.key === first.r.key));
    for (const x of await eligibleRows({ n: 40, queueText: '' })) {
      const s = (L.ledger.get(x.r.key) || {}).status;
      assert.ok(['unknown', 'absent', 'scaffold', 'partial'].includes(s), `${x.r.key} ${s}`);
    }
  });
});
