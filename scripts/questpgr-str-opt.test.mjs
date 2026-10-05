// C ref: questpgr.c com_pager_core reads its msg_fallbacks entry (:524),
// "text" (:543) and "synopsis" (:549) fields via nhlua.c
// get_table_str_opt (NULL default; this D-entry).
// lookup_quest_entry read them through `?? null` / `|| null` adapters and
// a bare `QUEST_MSG_FALLBACKS[msgid]` lookup: function values flowed
// through as objects into text/synopsis/msgid slots (C pcalls them with
// luaL_optstring conversion) and direct non-string non-nil values passed
// through as garbage (C nhl_errors). The sites now read through the
// shared js/dungeon.js helper on the existing questpgr→dungeon edge:
// text converts in the lookup (C reads :543 before the rawtext arm);
// synopsis converts in com_pager_core after the rawOut arm (C :549 after
// the :544-548 arm returns), threaded via the entry's synsrc table.
// All in-tree quest tables carry strings or nothing (quest.lua +
// embedded-table census in the D-entry).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { get_table_str_opt } from '../js/dungeon.js';

describe('com_pager_core inherits get_table_str_opt conversion', () => {
    it('function-produced string converts (C luaL_optstring pcall arm)', () => {
        assert.equal(get_table_str_opt({ text: () => 'You again sense help.' }, 'text', null),
            'You again sense help.');
    });

    it('absent field yields NULL (C :524/:543/:549 NULL default)', () => {
        assert.equal(get_table_str_opt({}, 'text', null), null);
        assert.equal(get_table_str_opt({}, 'synopsis', null), null);
        assert.equal(get_table_str_opt({ goal_alt: 'goal_next' }, 'bogus_msgid', null), null);
    });

    it('string kept verbatim, NUL-cut like C dupstr', () => {
        assert.equal(get_table_str_opt({ synopsis: '[You are banished.]' }, 'synopsis', null),
            '[You are banished.]');
        assert.equal(get_table_str_opt({ text: 'ab\0cd' }, 'text', null), 'ab');
    });

    it('direct non-string non-function still throws (C nhl_error)', () => {
        assert.throws(() => get_table_str_opt({ text: 42 }, 'text', null),
            /get_table_str_opt: no string/);
        assert.throws(() => get_table_str_opt({ synopsis: true }, 'synopsis', null),
            /get_table_str_opt: no string/);
        assert.throws(() => get_table_str_opt({ goal_alt: 7 }, 'goal_alt', null),
            /get_table_str_opt: no string/);
    });

    it('fallback id converts through the helper (C :524)', () => {
        assert.equal(get_table_str_opt({ goal_alt: 'goal_next' }, 'goal_alt', null), 'goal_next');
        assert.equal(get_table_str_opt({ goal_alt: () => 'goal_next' }, 'goal_alt', null), 'goal_next');
    });

    it('quest lookup reads fallback/text/synopsis via the shared helper in C order', () => {
        const src = readFileSync(new URL('../js/questpgr.js', import.meta.url), 'utf8');
        const lk = src.indexOf('function lookup_quest_entry(');
        assert.ok(lk >= 0, 'lookup_quest_entry missing in js/questpgr.js');
        const core = src.indexOf('async function com_pager_core(');
        assert.ok(core > lk, 'com_pager_core missing after lookup_quest_entry');
        const lookup = src.slice(lk, core);
        const coreBody = src.slice(core, core + 2600);
        const fb = "get_table_str_opt(QUEST_MSG_FALLBACKS, msgid, null)";
        const arrText = "get_table_str_opt(arr, 'text', null)";
        const rawText = "get_table_str_opt(raw, 'text', null)";
        const syn = "get_table_str_opt(entry.synsrc, 'synopsis', null)";
        assert.ok(lookup.includes(fb), 'fallback must read via the shared helper (C :524)');
        assert.ok(lookup.includes(arrText), 'array text must read via the shared helper (C :543)');
        assert.ok(lookup.includes(rawText), 'object text must read via the shared helper (C :543)');
        assert.ok(coreBody.includes(syn), 'synopsis must convert in com_pager_core (C :549)');
        for (const adapter of ['raw.text ?? null', 'raw.synopsis ?? null', 'meta.synopsis || null',
            'const fb = QUEST_MSG_FALLBACKS[msgid]', 'entry.synopsis ?? null',
            'text: null, synopsis: null']) {
            assert.ok(!lookup.includes(adapter) && !coreBody.includes(adapter),
                `raw adapter must be gone: ${adapter}`);
        }
        assert.ok(!lookup.includes('synopsis:'), 'lookup must thread synsrc, not converted synopsis');
        // C :549 reads synopsis after the :544-548 rawtext arm returns.
        const rawOut = coreBody.indexOf('if (rawOut)');
        assert.ok(rawOut >= 0, 'rawtext arm missing in com_pager_core');
        assert.ok(rawOut < coreBody.indexOf(syn),
            'synopsis conversion after the rawtext arm (C :544-548 before :549)');
        // C :526 retries on any non-NULL fallback id (pointer test).
        assert.ok(lookup.includes('if (fb != null)'), 'fallback retry keeps the C :526 NULL test');
    });
});
