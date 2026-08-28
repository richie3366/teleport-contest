# Review 524 — 1504ead1 — cmd.c do_repeat / getobj CQ_REPEAT (D-1563)

## Metadata
- Full / short hash: `1504ead1044e62b61afa6ec59c088667ae00ab53` / `1504ead1`
- Parent: `a54cb31b` (D-1562). This file audits **this SHA only** (sixth of nine `js/` commits since review **518**). Archive **Addressed:** D-1563 `1504ead1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 05:32:35 +0200
- D-id: **D-1563**
- Stats: `js/cmd.js` +165 / −11, `js/invent.js` +56 / −7, `js/apply.js` +16 / −2, `js/getline.js` +11 / −1. Band 150–350 (js/ insertions **248**).
- Claims to close: Open getobj CQ_REPEAT / `in_doagain` after D-1551 / review **512**. Not canned CMDQ_INT. `reviews/loop-2026-08-15/` has no unpaid do_repeat Must-fix.
- JS / map: `cmd.js` `do_repeat`; `invent.js` `getobj_record_repeat`; apply NOFLAGS clones; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **512** named REPEAT record (C’s only `cmdq_add_int` producer is getobj CQ_REPEAT).

## Intent vs deliverable

Git subject promises: Ctrl-A replays the last command plus its object letter instead of treating repeat as unknown and never recording INT+KEY.

Pinned C `cmd.c` `do_repeat` `:1637–1660`. `csym --callers do_repeat`: **0 identifier refs** (extcmdlist `#repeat` / `C('a')` function pointer, `cmd.c:1823`). `cmdq_pop` `:409–420`. rhack `:3732–3740`. `invent.c` getobj `:2049–2054`.

```1638:1658:nethack-c/upstream/src/cmd.c
int
do_repeat(void)
{
    int res = ECMD_OK;
    if (!gi.in_doagain) {
        ...
        if (!cmdq_peek(CQ_REPEAT)) {
            Norep("There is no command available to repeat.");
            return ECMD_FAIL;
        }
        repeat_copy = cmdq_copy(CQ_REPEAT);
        gi.in_doagain = TRUE;
        rhack(0);
        gi.in_doagain = FALSE;
        cmdq_clear(CQ_REPEAT);
        gc.command_queue[CQ_REPEAT] = repeat_copy;
        iflags.menu_requested = FALSE;
        if (svc.context.move)
            res = ECMD_TIME;
```

```2049:2054:nethack-c/upstream/src/invent.c
        if (otmp && !gi.in_doagain) {
            if (cntgiven && cnt > 0L)
                cmdq_add_int(CQ_REPEAT, cnt);
            cmdq_add_key(CQ_REPEAT, ilet);
        }
```

Old JS: `getobj_apply_count` skipped the record; rhack `cmdq_pop` canned-only; key 1 unknown.

The diff **does** add `do_repeat`, `#repeat`, Ctrl-A, REPEAT pop when `in_doagain`, `getobj_record_repeat` + `cmdq_add_key(q,…)`, apply NOFLAGS record, `getobj_apply_count` INT+KEY, missing-object / too-many `in_doagain` return. It **does not** wire eat/read/zap/tin NOFLAGS, PREFIXCMD / movement `do_move_*`, doextcmd `cmdq_shift` (`cmd.c:3759`), getdir / yn REPEAT. Named.

**No gameplay RNG** in `do_repeat` / the record helper.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `do_repeat` | C `:1637–1660`, **LIVE this SHA** | cmd.js; Ctrl-A key 1 + getline `#repeat` |
| `cmdq_pop` | C `:409–420`, **CLONE** | cmd.js `:104` (rhack); invent `cmdq_pop_getobj` peeks REPEAT when `in_doagain` |
| `cmdq_copy` | C `:386–404`, **CLONE** | `slice()` ≡ C prepend+`cmdq_reverse` for JS arrays |
| `cmdq_add_int` | C `:334–351`, **LIVE** | invent export; REPEAT via `getobj_record_repeat` |
| `cmdq_add_key` | C `:273–290`, **LIVE this SHA** (q-aware) | invent export. apply/dig/iactions canned-only clones **kept** (do not add #4) |
| `cmdq_add_ec` | C `:253–270`, **CLONE** (canned-only) | cmd.js one-arg. REPEAT uses bare `[fn]` not `CMDQ_EXTCMD` node |
| `rhack_repeat_command` | C rhack `:3732–3740`, **CLONE** | hand map of live rhack keys; `#` → `[]` ≡ C `doextcmd` clear |
| `getobj_record_repeat` | C `:2049–2054`, **LIVE this SHA** | skip `!otmp` or `in_doagain` |
| `getobj_apply_count` | C after letter, **LIVE this SHA** | record then `in_doagain` null vs retry |
| apply NOFLAGS `getobj_*` | C getobj, **LIVE this SHA** | apply/grease/jelly/rub/stone; eat/read/zap/tin **OMIT named** |
| `Norep` | C, **LIVE** | empty REPEAT |
| PREFIXCMD / `do_move_*` / `cmdq_shift` | **OMIT named** | |
| getdir / yn REPEAT | **OMIT named** | |

`node scripts/csym.mjs do_repeat` → `cmd.c:1637-1660`. `--callers do_repeat`: 0. `cmdq_pop` → `:409-420` (callers include getobj `:1779`, rhack `:3642`). `cmdq_add_key` → `:273-290`. `cmdq_add_ec` → `:253-270`. `cmdq_copy` → `:386-404`. No `rn2`/`rnd` in these bodies.

`node scripts/sym.mjs` on new / re-pointed names:

```
do_repeat        js/cmd.js:1578   ASYNC — await required
cmdq_pop         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:104
cmdq_copy        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/cmd.js:120
cmdq_add_key     js/invent.js:3890   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/apply.js:5439  js/dig.js:2098  js/iactions.js:48
cmdq_add_int     js/invent.js:3878   sync
getobj_record_repeat js/invent.js:3905   sync
cmdq_pop_getobj  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:3914
```

Do **not** add `cmdq_add_key` #4. Do **not** add `cmdq_pop` #2 in a third file. `node scripts/imports.mjs --can` getline→cmd `do_repeat`: IN-SCC; `do_repeat` hoisted; getline uses dynamic `import()` inside `run` — **SAFE** (no top-level TDZ read). apply→invent `getobj_record_repeat`: ALREADY.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty REPEAT. `!cmdq_peek` → Norep + `ECMD_FAIL`. **Match `:1645–1648`.**

Copy / replay / restore. `cmdq_copy`; `in_doagain`; `rhack(0)`; clear; restore the copy; `menu_requested=false`; `context.move` → `ECMD_TIME`. Nested `in_doagain` is a no-op. **Match `:1649–1658`.** JS `slice()` does not mutate nodes; rhack shifts the live array. **Match C’s separate copy.**

`cmdq_pop`. `in_doagain` → REPEAT else canned. rhack(0) pops the command node first. **Match `:409–413`.** getobj then peeks REPEAT for INT/KEY. Interactive getobj still peeks canned (`!in_doagain`). **Match.** Bare `fn` vs C `CMDQ_EXTCMD`: rhack `await canned()` vs `run_cmdq_extcmd`. Same replay for keys in `rhack_repeat_command`. Not a typed `ec_entry`.

rhack record. `!in_doagain && key !== 1` → `_cmdq_repeat = [fn]` or `[]`. C `cmdq_clear` then `cmdq_add_ec(CQ_REPEAT, func)` unless `do_repeat`/`doextcmd`; `doextcmd` clears. JS `#` maps to `[]`. PREFIXCMD `m`/`g`/`G`/`F` still replace REPEAT (C keeps it when `prefix_seen`). **Named.** Movement keys empty REPEAT. **Named.**

getobj record. `otmp && !in_doagain`; INT if `cntgiven && cnt>0`; KEY `ilet`. **Match `:2049–2054`.** Hands `-` not recorded here (C records after the letter; `-` returns earlier). `getobj_apply_count` records then `!otmp` / too-many: `in_doagain` → null else retry. **Match `:2058–2067`.**

Apply NOFLAGS. KEY only (no INT). **Match NOFLAGS getobj.** eat/read/zap/tin still omit the call — Ctrl-A re-prompts. **Named.** Not a stub inside the apply arm.

Callee closure (Ctrl-A after apply/drop/throw/wield ALLOWCNT). LIVE: `do_repeat`, `cmdq_pop`/`copy`/`clear`/`peek`, `Norep`, `getobj_record_repeat`, `cmdq_add_int`/`cmdq_add_key`, `getobj_from_cmdq`, `rhack(0)`. CLONE: `cmdq_add_ec` canned-only; `rhack_repeat_command`; invent `cmdq_pop_getobj`. OMIT named: eat/read/zap/tin, PREFIXCMD, movement, `cmdq_shift`, getdir/yn. STUB: **none** on the wired apply/ALLOWCNT arm. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject Ctrl-A + object letter + INT+KEY: **true for getobj_apply_count and the apply NOFLAGS clones this SHA wired.** D-log “canned CMDQ_INT is D-1551”: **true** (this SHA does not replace that consumer). Do **not** stamp “Match C eat/read/zap/tin REPEAT.” Do **not** stamp “Match C `cmdq_add_ec(CQ_REPEAT)` typed EXTCMD.” Do **not** stamp “Match C PREFIXCMD `prefix_seen` / `cmdq_shift`.” This is **not** “dispatch ported, callee stubbed” on the apply arm.

## Density

One C envelope: record + `do_repeat` + pop-when-in_doagain. +248 JS. Did not glue eat/read/zap/tin. §2b OK.

## Branch-by-branch confirm

1. No prior command, Ctrl-A: Norep, `ECMD_FAIL`. **Match.**
2. `a` + letter, Ctrl-A: replay apply + KEY from REPEAT. **Match.**
3. ALLOWCNT `3a` then Ctrl-A: INT+KEY. **Match.**
4. During replay, getobj does not re-record. **Match `!in_doagain`.**
5. Nested Ctrl-A while `in_doagain`: no-op. **Match.**
6. Second Ctrl-A: restored copy still works. **Match restore.**
7. `#repeat` getline row: same `do_repeat`. **Match extcmdlist.**
8. `#` doextcmd: REPEAT cleared. **Match else-arm clear.**
9. Eat then Ctrl-A: JS re-prompts (no KEY). **Named.**
10. `m` prefix: JS wipes REPEAT. **Named.**

## Callers / RNG ledger

C: keybind `C('a')` / `#repeat`; getobj is the only `cmdq_add_int` producer. Public-unhit for Ctrl-A. No seed gate. **No core RNG.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. getline dynamic import is cycle-safe, not a cycle dodge. Canned `cmdq_add_key` clones in apply/dig/iactions stay; invent export is the REPEAT writer.

## Verification

D-log canary **39**/39 (C/JS grep; record INT+KEY; in_doagain no-record; from_cmdq REPEAT vs canned; empty ECMD_FAIL; copy-restore; nested no-op; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: eat/read/zap/tin NOFLAGS `getobj_record_repeat`; PREFIXCMD `prefix_seen`; movement `do_move_*` REPEAT; doextcmd `cmdq_shift`; getdir / yn REPEAT keys; `'r'` reversed. Do not add `cmdq_add_key` clone #4. Do not treat canned CMDQ_INT (D-1551) as this arm.

Verdict: **ACCEPT-WITH-DEBT**
