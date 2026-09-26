# Review 1812 — d15d25c20 — nemesis speech texts (D-2853)

- SHA: `d15d25c20` (Must-fix follow-up to review 1805; data for `qt_pager`)
- Files: `js/questpgr.js` (+32/−7), `js/generated/quest_nemesis_speech.js` (+364)
- Queue row: the 1805 Must-fix (0 corpus blocks). Closed in `LOOP-QUEUE-DONE.md`.
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the five msgids `nemesis_speaks` already chooses now hit on the first `com_pager_core(filecode)`: `discourage` as a string array so `rn2(nelems)` runs, and `nemesis_wantsit` / `nemesis_first` / `nemesis_next` / `nemesis_other` as `{text, synopsis?, output?}`. A miss still takes the `"common"` retry. The diff is that table (13 filecodes) plus the role-lookup arms that return an array or an object entry. `nemesis_speaks` itself is unchanged.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `QUEST_NEMESIS_SPEECH` | sync export `quest_nemesis_speech.js:7` | `dat/quest.lua` role tables |
| `QUEST_ROLE_TEXT` five keys | data `questpgr.js:588–592` | `questtext[filecode][msgid]` |
| `lookup_quest_entry` | local `questpgr.js:947` | `com_pager_core` field/`lua_len` read |
| `com_pager_core` | local `questpgr.js:1052` (body unchanged) | `questpgr.c:467–621` |
| `qt_pager` | LIVE async `questpgr.js:1163` | `questpgr.c:629–634` |
| `rn2` | LIVE, existing array arm `:1093` | `questpgr.c` `rn2(nelems)` |

`sym.mjs` (nothing deleted; the new import is the generated table):

```
lookup_quest_entry NOT EXPORTED — 1 LOCAL CLONE: js/questpgr.js:947
com_pager_core   NOT EXPORTED — 1 LOCAL CLONE: js/questpgr.js:1052
qt_pager         js/questpgr.js:1163   ASYNC — await required
QUEST_NEMESIS_SPEECH js/generated/quest_nemesis_speech.js:7   sync   export const
nemesis_speaks   js/quest.js:534   ASYNC — await required
```

`com_pager_core` / `lookup_quest_entry` are the one JS stand-in for the static C function, not a second clone.

## C ↔ JS fidelity

`csym` `com_pager_core` is `questpgr.c:467–621`. Callers: `questpgr.c:163` and `:172` (`killed_nemesis` rawtext), `:626` (`com_pager` common), `:632–633` (`qt_pager`). `qt_pager` is `:629–634`: `com_pager_core(filecode, msgid, FALSE)` then, only on miss, `com_pager_core("common", msgid, TRUE)`. JS `qt_pager` (`questpgr.js:1163–1167`) is that order. The only `nemesis_speaks` call is `quest.c:503`.

C reads `text`, then synopsis and `output` (default `"default"` → `howtoput2i` 0), then if `text` is null treats the table as a string array: `nelems < 2` fails, else `text = array[rn2(nelems) + 1]` (Lua 1-based). `HOWTOPUT` / `HOWTOPUT2I` at `questpgr.js:928–929` match `howtoput` / `howtoput2i` (`pline` 1, `window`/`text` 2, `menu` 3, `default` 0).

`lookup_quest_entry` now branches on the role value. An array returns `text: null` and `array`, so the existing `!text` arm (`:1086–1093`) draws one `rn2(nelems)` and indexes 0-based. An object returns `text` / `synopsis` / `output` (missing output → `'default'`). A string still uses `QUEST_MSG_META`. `raw == null || raw === ''` is the old `!text` miss for strings; `killed_nemesis` stays a string, so `stinky_nemesis` (`:1137`) is unchanged. Empty-string and missing-key misses still return null, `qt_pager` still retries `"common"`, and that second call still shuffles. A hit returns before the retry, so the five msgids take one `nhl_nhlib_align_shuffle` (`rn2(3)` then `rn2(2)`), which is what review 1805 required.

Arc `discourage` in `quest.lua:232–242` is the ten strings now at `quest_nemesis_speech.js:10–19`. Arc `nemesis_first` (`quest.lua:354–361`) is the generated object with `output: "text"` and the same synopsis. Rog `nemesis_first` / `nemesis_next` (`:2137–2141`) are text-only; Rog `nemesis_other` / `nemesis_wantsit` (`:2143–2155`) keep synopsis and `output: "text"`. Regenerating with `scripts/extract-quest-nemesis.py` produced no diff against the committed file (13 roles, 364 lines). The extractor refuses a `discourage` shorter than 2 and refuses extra fields, which matches the `nelems < 2` fail and the three fields C reads.

`output: "text"` is 2, so delivery is `deliver_by_window`. A default output with a newline or `length >= BUFSZ - 1` still promotes (`:1099–1101`). Synopsis still goes through `convert_line` and `putmsghistory(..., false)` (`:1115–1116`). No extra RNG on the object path.

## Hallucinations / overclaim

The subject says the first lookup hits and `discourage` draws `rn2(nelems)`. The tables and the array arm do that. It does not claim `chat_with_nemesis` or the other role msgids were ported; those stay named misses. "Match C" here is the data plus the lookup shape, not a new `com_pager_core` body. The D-log verify bullet matches the re-run below (0 blocks, REACH-OK).

## Density

This is the data the 1805 live arm needed, not a new C function. `com_pager_core` was already the whole body. The five keys are the whole set `nemesis_speaks` passes. Other quest msgids remain the named omit.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify nemesis_speaks --base d15d25c20~1 --reach-all`.

```
verify nemesis_speaks: baseline d15d25c20~1 (scoreboard at 81fd2232b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke nemesis_speaks: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit. The committed table matches a fresh extract of `quest.lua`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
