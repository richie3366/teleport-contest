# Review 690 — 578b7088 — cmd.c getdir CQ_REPEAT (D-1729)

## Metadata
- Full / short hash: `578b7088d43591bd0123604893ff7b05f0ff19ba` / `578b7088`
- Parent: `aad60753` (D-1728). This file audits **this SHA only** (fourth of nine `js/` commits since review **686**). Archive **Addressed:** D-1729 `578b7088`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 10:33:45 +0200
- D-id: **D-1729**
- Stats: `js/lock.js` +85/−44; dig/zap clones retired; dothrow helper. Total `js/` insertions **99** <250. Band **150–350**.
- Claims to close: Open getdir CQ_REPEAT after D-1721 / review **682** (yn_function; REPEAT named omit). Not mouse getpos. Constitution: do **not** add trailing `confdir` to shared `getdir`. `reviews/loop-2026-08-15/` has no unpaid getdir-REPEAT Must-fix.
- JS / map: `lock.js` `getdir_read_dirsym` / `getdir`. `c-js-map/turns.md`.
- Prior: **682** named CQ_REPEAT.

## Intent vs deliverable

Git subject promises: interactive directions record CQ_REPEAT and `in_doagain` pops that KEY, instead of canned-only peek.

`node scripts/csym.mjs getdir` → `cmd.c:3956–4119` (interactive+queue `:3962–4019`). `cmdq_pop` `:409–420`. `cmdq_add_key` `:273–290`. `xytodir` `:3846–3855`. `sdir[]` `:3346` `"hykulnjb><"`. `--callers getdir` include zap/dig/throw. Trailing `confdir(FALSE)` `:4116–4117`.

```3962:4018:nethack-c/upstream/src/cmd.c
    struct _cmd_queue *cmdq = cmdq_pop();

    if (cmdq) {
        if (cmdq->typ == CMDQ_DIR) {
            ...
        } else if (cmdq->typ == CMDQ_KEY) {
            dirsym = cmdq->key;
        } else {
            cmdq_clear(CQ_CANNED);
            dirsym = '\0';
        }
        free(cmdq);
        goto got_dirsym;
    }
    ...
    if (!gi.in_doagain)
        cmdq_add_key(CQ_REPEAT, dirsym);
```

```409:413:nethack-c/upstream/src/cmd.c
    int q = (gi.in_doagain) ? CQ_REPEAT : CQ_CANNED;
    struct _cmd_queue *tmp = gc.command_queue[q];
```

Parent: canned peek only; no REPEAT append; zap/dig local yn clones. The diff **does** `getdir_read_dirsym` via `cmdq_pop`, DIR→`sdir`/`<>`, KEY→dirsym, interactive yn_function then `cmdq_add_key(CQ_REPEAT)` when `!in_doagain`, `in_doagain` `nhgetch`, shared `getdir` applies dirsym; `getdir_cmdassist` uses the helper; `getdir_zap` calls `getdir` then local `confdir`; `dig.js` `use_pick_axe` calls `getdir` (`dig_getdir` gone). It **does not** add trailing `confdir` to shared `getdir`. It **does not** port mouse `_` / `help_dir` into shared getdir / `dxdy_moveok` / `readchar_queue`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getdir_read_dirsym` | LIVE new | C `:3962–4019` extract |
| `getdir` | LIVE repaired | apply_dirsym after helper |
| `cmdq_pop` | LIVE import | `cmd.js:108`; REPEAT iff `in_doagain` |
| `cmdq_add_key` | LIVE import | `invent.js:6367`. apply/dig/iactions clones — do **not** add #4 |
| `cmdq_clear` | LIVE import | neither DIR nor KEY |
| `xytodir` | LIVE import | `const.js:176` |
| `GETDIR_DIRCHARS` | CLONE of `sdir[]` | `"hykulnjb><"`; not `ndir` |
| `getdir_cmdassist` | CLONE (throw help_dir) | now shares helper |
| `getdir_zap` | CLONE (confdir stays local) | constitution |
| `dig_getdir` | deleted | was clone |
| `confdir` | LIVE `hack.js` | zap only |
| `nhgetch` | LIVE | C `readchar` analogue |
| mouse / help_dir shared / dxdy_moveok | OMIT named | |

`node scripts/sym.mjs`:

```
getdir           js/lock.js:412   ASYNC — await required
getdir_read_dirsym js/lock.js:367   ASYNC — await required
getdir_dirsym_from_dir NOT EXPORTED — 1 LOCAL  js/lock.js:337
cmdq_pop         js/cmd.js:108   sync
cmdq_add_key     js/invent.js:6367   sync  (+ 3 clones — do NOT add #4)
cmdq_clear       js/cmd.js:101   sync
xytodir          js/const.js:176   sync
getdir_cmdassist js/dothrow.js:2468   ASYNC
getdir_zap       NOT EXPORTED — 1 LOCAL  js/zap.js:2316
dig_getdir       NOT FOUND
apply_dirsym     NOT EXPORTED — 1 LOCAL  js/lock.js:61
confdir          js/hack.js:1725   sync
nhgetch          js/input.js:21   ASYNC — await required
```

`--can lock.js cmd.js cmdq_pop`: ALREADY on HEAD. `cmd.js` already imported `doopen` from lock. `cmdq_pop` is a function (hoisted). Cycle is not a blocker; not a top-level TDZ read. dig/zap/dothrow already imported lock. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`cmdq_pop` (`:409–413`, `:3962`).** C REPEAT when `in_doagain` else CANNED. JS `cmdq_pop` already did that. Parent getdir peeked `_cmdq_canned` only — **that** was the C-wrong; this SHA uses the live pop. **Match the queue.**

**DIR (`:3965–3971`).** C `dirchars[xytodir(dirx,diry)]` when `!dirz`; else `dirchars[dirz>0 ? DIR_DOWN : DIR_UP]`. C `sdir[]="hykulnjb><"` so DIR_DOWN(8)=`'>'`, DIR_UP(9)=`'<'`. JS `GETDIR_DIRCHARS.charAt(xytodir)` then `dirz>0 ? '>' : '<'`. **Match sdir and the z sign.** JS `DIR_UP=8` / `DIR_DOWN=9` are swapped vs C enum names; this helper does **not** index those constants. Comment noise, not a C-wrong here. Number_pad `ndir` named.

**KEY / else (`:3972–3978`).** KEY → `cmdq.key`. Else `cmdq_clear(CQ_CANNED)`, NUL (JS skips `impossible`). **Match the two arms.** `goto got_dirsym` skips REPEAT record. JS returns before the add. **Match.**

**Interactive (`:3983–4018`).** C `in_doagain \|\| *readchar_queue` → `readchar`; else `yn_function(..., NULL, '\0', FALSE)`; `clear_nhwindow`; `redraw_cmd` → retry (no REPEAT); then `!in_doagain` → `cmdq_add_key(CQ_REPEAT, dirsym)`. JS `in_doagain` → `nhgetch` (queue named omit); else yn_function; clear; `^R` (key 18) continue without add; then REPEAT. **Match except** full `redraw_cmd` bind and `readchar_queue`. yn 4th arg FALSE so yn_function does **not** also record. **Match.** No extra `rn2` (fuzzer named).

**got_dirsym / confdir.** Shared `getdir` applies `apply_dirsym` (`.`/`s`/`<>`/hjkl). C then `help_dir` / `dxdy_moveok` / **`if (!u.dz) confdir(FALSE)`**. JS shared getdir does **not** confdir (constitution; use_whip). zap `getdir_zap`: `ok && !dz` then `confdir(false)`. Cancel does not confdir (C returns 0 before `:4116`). **Match zap.** Pick-axe/throw confused dirs still skip confdir. Named.

**Callee closure (`:3962–4019`).** LIVE: `cmdq_pop`, `cmdq_add_key`, `cmdq_clear`, `xytodir`, `yn_function`, `clear_nhwindow_message`, `nhgetch`. CLONE: `sdir` string. OMIT named: mouse, help_dir in shared, dxdy_moveok, readchar_queue, redraw_cmd bind, fuzzer, trailing confdir on shared. STUB: **none** in the REPEAT envelope. Not “dispatch ported, callee stubbed.” `dig_getdir` deleted (was STUB).

## Hallucinations / overclaim

Subject “interactive directions record CQ_REPEAT and in_doagain pops that KEY”: **true** for shared `getdir` / helper / zap / dig. D-log “canned-only peek” was the parent. Do **not** stamp “Match C trailing `confdir` on shared `getdir`.” Do **not** stamp “Match C mouse `_` getpos.” Do **not** stamp “Match C `help_dir` inside `getdir`.” Do **not** stamp “Match C `ndir` number_pad.” Journal “fortress held” is not a Ctrl-A getdir proof. Public `#repeat` after getdir is **thin**; canary was node KEY/DIR/`in_doagain`. Admit public-unhit for REPEAT replay.

## Density

§2b: one C `getdir` queue+REPEAT envelope after **682**. Same `:3962–4019`. +99. Retired dig clone. Did not glue mouse/help_dir/confdir-on-shared. Did **not** reopen D-1728 yn_function_menu.

## Verification

D-log: save-oracle skip (untagged `cmd.c:getdir`); node KEY/DIR/`in_doagain`/interactive REPEAT; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Ctrl-A getdir **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (REPEAT envelope matches C; remaining getdir tail is named). Named: mouse `_` getpos (`:4024`); `help_dir` in shared getdir (`:4095–4109`); `dxdy_moveok` (`:4112`); `readchar_queue`; full `redraw_cmd`; number_pad `ndir`; trailing confdir on shared (constitution — keep zap-local). Do **not** add `cmdq_add_key` #4. Do **not** add `getdir` #2. Do **not** restore `dig_getdir`. Do **not** add trailing `confdir` inside shared `getdir`. Do **not** re-port D-1721 yn_function.

Verdict: **ACCEPT-WITH-DEBT**
