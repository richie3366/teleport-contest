# Review 667 — 1567e9bf — cmd.c yn_function addcmdq (D-1706)

## Metadata
- Full / short hash: `1567e9bfed059acf34fba19f8d96c5bf79471e61` / `1567e9bf`
- Parent: `7d0a0ddc` (D-1705). Fourteenth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1706 `1567e9bf`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:39:59 +0200
- D-id: **D-1706**
- Stats: `js/getline.js` +71/−5; `js/invent.js` +2/−2; `js/pickup.js` +4/−3; `js/do.js` +1/−1; `js/do_wear.js` +1/−1. Total `js/` insertions **79** <250. Band **150–350** (id >454 floor **200**).
- Claims to close: Open `yn_function` addcmdq (D-1687). Not `yn_function_menu`. Not getdir. `reviews/loop-2026-08-15/` has no unpaid yn-addcmdq Must-fix.
- JS / map: `getline.js` `yn_function`; FALSE at getobj / paranoid_ynq / askchain. `c-js-map/turns.md`.
- Prior: D-1687 named this omit; **666** named it from shop yn.

## Intent vs deliverable

Git subject promises: `y_n`/`ynq` answers pop a canned KEY and record `CQ_REPEAT`, instead of always prompting after D-1705.

`node scripts/csym.mjs yn_function` → `cmd.c:5470–5583`. Callees: `cmdq_pop` `:409–420`, `cmdq_add_key` `:273–290`, `cmdq_clear` `:430–442`; windowport `tty_yn_function`. `hack.h:1329–1336` `y_n` TRUE / `YN` FALSE. `getdir` `:3988–3989` FALSE. `paranoid_ynq` `:5642–5645` FALSE. `getobj` `invent.c:1935` FALSE. `askchain` `:2467` FALSE.

```5496:5543:nethack-c/upstream/src/cmd.c
    if (addcmdq && (cmdq = cmdq_pop()) != 0) {
        cq = *cmdq; free(cmdq);
    } else {
        cq.typ = CMDQ_USER_INPUT; cq.key = '\0';
    }
    if (cq.typ != CMDQ_USER_INPUT) {
        if (cq.typ == CMDQ_KEY) res = cq.key;
        else cmdq_clear(CQ_CANNED);
        addcmdq = FALSE;
    } else {
        ...
        res = (*windowprocs.win_yn_function)(query, resp, def);
    }
    if (addcmdq) cmdq_add_key(CQ_REPEAT, res);
```

Parent: 3-arg `tty_yn_function` always prompted, never recorded. The diff **does** core wrapper default TRUE; pop KEY (and JS `typ:'key'` clones); REPEAT after user input; `last_msg` clobber; QBUFSZ `...` truncate; resp-mismatch remap after record; FALSE at getobj / paranoid_ynq / askchain. It **does not** port `yn_function_menu`, fuzzer `rn2(20)`, `SND_SPEECH`, DUMPLOG, `paniclog`/`impossible`, `input_state`. Named. It **does not** port getdir’s FALSE. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `yn_function` | LIVE | `cmd.c:5470–5583` wrapper |
| `tty_yn_function` | LIVE | was the export; now the windowport |
| `cmdq_pop` / `cmdq_clear` | LIVE import | `cmd.js` |
| `cmdq_add_key` | LIVE import | `invent.js` export — do **not** add clone #4 |
| `yn_cmdq_key` | CLONE | JS string/code + `'key'` typ |
| `yn_function_menu` / fuzzer / SND / DUMPLOG / paniclog / `input_state` | OMIT named | |
| getdir FALSE | OMIT named | |

`node scripts/sym.mjs`:

```
yn_function      js/getline.js:1439   ASYNC — await required
tty_yn_function  NOT EXPORTED — 1 LOCAL js/getline.js:1490
cmdq_pop         js/cmd.js:108   sync
cmdq_add_key     js/invent.js:6279   sync  (+ apply/dig/iactions clones — IMPORT)
cmdq_clear       js/cmd.js:101   sync
y_n              NOT FOUND in js/** — C is a macro; JS default TRUE
```

`node scripts/imports.mjs --can getline.js cmd.js cmdq_pop` → **ALREADY**. `--can getline.js invent.js cmdq_add_key` → **ALREADY**. New static imports in this SHA; suite at HEAD did not TDZ. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Default / FALSE sites.** C `y_n`/`ynq`/`ynaq` pass TRUE (`hack.h:1329–1334`); `YN` FALSE. JS 4th arg defaults TRUE. This SHA passes FALSE at `getobj` (invent + do/do_wear/pickup clones), `paranoid_ynq`, `askchain`. C `dotypeinv` / split-count / most eat/apply `y_n` are TRUE — JS 3-arg **Match**. **Match the sites they claimed.** `getdir` C `:3989` FALSE — JS getdir still not this wrapper (named).

**Pop / types.** C pops only if `addcmdq`; `in_doagain` → CQ_REPEAT else CQ_CANNED (`cmdq_pop` `:412`). JS `cmdq_pop` the same (`cmd.js:108–111`). `CMDQ_KEY` → `res = key`; else `cmdq_clear(CQ_CANNED)` and `res` stays ESC; then `addcmdq = FALSE` so no re-record. JS also accepts `typ === 'key'` (apply/dig/iactions clone nodes). That is a verified clone of the queue encoding, not a second `cmdq_pop`. **Match `:5496–5509`.**

**Record.** C `if (addcmdq) cmdq_add_key(CQ_REPEAT, res)` after the windowport, **before** mismatch remap. JS the same. **Match `:5542–5543`.** `cmdq_add_key` appends `{typ: CMDQ_KEY, key}` (`invent.js:6279–6283`) **Match C `:273–290`.**

**Clobber / truncate.** C `iflags.last_msg = PLNMSG_UNKNOWN`; `strlen >= QBUFSZ` → paniclog + `"..."`. JS sets `last_msg`; slices to `QBUFSZ-1-3` + `"..."` (`QBUFSZ` 128). **Match the truncate shape.** paniclog named.

**Mismatch.** C `:5559–5578` if `res` not in `resp`, remap to `def` or ESC; `impossible` unless doagain/wizard. JS remaps without `impossible`. Named. Order after REPEAT **Match**.

**Windowport.** C `yn_function_menu` then `win_yn_function`. JS always `tty_yn_function`. Named menu. Combined-arm: LIVE pop/add/clear/tty. STUB: **none** for the TRUE path.

**`y_n` vs `YN`.** C `hack.h:1329` TRUE; `:1336` `YN` FALSE. JS has no `y_n` macro; default TRUE is `y_n`. Callers that should be `YN`/getdir still default TRUE until named. **Match the macros they claimed.** `cmdq_add_key` appends; C `alloc` node at tail. JS `push`. **Match.** `in_doagain` pop from REPEAT **Match `:412`.**

**RNG.** Wrapper itself has no `rn2` (fuzzer arm named). `tty_yn_function` may still consume input only. **Match the non-fuzzer path.**

**`dotypeinv` TRUE.** C `invent.c:3928` TRUE. JS 3-arg default. **Match.** `askchain` FALSE **Match `:2467`.** Pickup `use_container` traditional C `:3114` TRUE — JS 3-arg. **Match.** Do **not** pass FALSE there.

## Hallucinations / overclaim

Subject “pop a canned KEY and record CQ_REPEAT”: **true** for default TRUE. “instead of always prompting”: **true** when a KEY is queued. Do **not** stamp “Match C `yn_function_menu`.” Do **not** stamp “Match C fuzzer `rn2(20)`.” Do **not** stamp “Match C `getdir` FALSE.” Do **not** add `cmdq_add_key` #4. Do **not** add `y_n` as a JS function (C macro). Do **not** pass TRUE from `getobj`. Do **not** restore a 3-arg-only export that skips the queue.

## Density

§2b: one wrapper + the C FALSE callers that would poison REPEAT if left at default. Related. +79.

## Verification

D-log: save-oracle skip; green+strict seed8000/0900; focused seed0116; cohort 10/10. Public yn **is** hit; canned KEY replay / do-again yn is **public-unhit** unless a session uses `^A` after a TRUE yn. Admit that.
`y_n` default TRUE.

## Actionable C-wrongs

None for Must-fix. Named: `yn_function_menu`; fuzzer; SND_SPEECH; DUMPLOG; paniclog/`impossible`; `input_state`; getdir FALSE. Do **not** add `cmdq_add_key` #4. Do **not** add `tty_yn_function` #2 as an export. Do **not** default addcmdq FALSE (that would break `y_n`). Do **not** pop when the 4th arg is FALSE. No `rn2` on the non-fuzzer path.

Verdict: **ACCEPT-WITH-DEBT**
