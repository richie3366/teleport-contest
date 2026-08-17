# Review 148 — 4dd396cc — cmd.c `do_rush` / `do_run` PREFIXCMD (D-1186)

## Metadata
- Full / short hash: `4dd396cc774ea9019fcc9e68f08aa0da567ad717` / `4dd396cc`
- Parent: `4750946a` (D-1185). This file audits **this SHA only**. Archive row **Addressed:** D-1186 `4dd396cc` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 23:57:34 +0200
- D-id: **D-1186**
- Stats: 10 files, +162 / −43 — `js/cmd.js` +63 / −6 (g/G PREFIXCMD + pending-prefix pline + walk keeps RUSH).
- Claims to close: Must-fix human canary seed8243 `g` rush vs JS `Unknown command 'g'.` (after D-1185 four `A`s). Review **146** / **147** next-port after empty-worn. `reviews/loop-2026-08-15/` has no unpaid `do_rush` Must-fix.
- JS / map: `cmd.js` `rhack`. `c-js-map/turns.md` `cmd.c`. Nested F+g/G and a full `CMD_gGF_PREFIX` table still named. Next canary miss after this SHA was ParanoidTrap portal yn (D-1187).
- Prior reviews this SHA claims to close: **146** canary (retargeted); D-1185 next-port `g`.

## Intent vs deliverable

Git subject promises: “Match C cmd.c do_rush/do_run so g/G are PREFIXCMD (run=2/3) instead of Unknown command; the following walk keeps the rush.”

Old JS: `'g'`/`'G'` fell through unknown-command. Capital `HJKLYUBN` already `run=1`; Ctrl-dir already `do_rush_*` (`run=3`). C `'g'` is `do_rush` PREFIXCMD (`run=2`, `DOMOVE_RUSH`); `'G'` is `do_run` (`run=3`).

The diff **does** set `run=2|3` and `domove_attempting |= DOMOVE_RUSH` with `move=0` (same PREFIXCMD return shape as `F`/`m` — next key is a new `rhack`, not an inner `parse`). Following `hjklyubn` with RUSH and no WALK bit keeps `run` and sets first-step `multi`/`mv`. Double g/G cancels. A non-walk after a pending g/G prefix prints C’s “The 'g' prefix should be followed by a movement command”. It does **not** add a `goto got_prefix_input` loop. It does **not** pull ParanoidTrap.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `do_rush` / `do_run` | C callees, **inlined in rhack** | `cmd.c:1590–1617`; not separate JS functions |
| extcmdlist `'g'`/`'G'` | C table | `:1837–1840` PREFIXCMD |
| `set_move_cmd` keep-run | C, **inlined** | `:1396–1399` — already-set `attempting` does not overwrite `run` |
| rhack `DOMOVE_RUSH` firsttime | C `:3792–3801` | JS `!mv` proxy after typed `g` (see fidelity) |
| pendingRushPrefix pline | C `prefix_seen` clone | `:3693–3721`; not a full `CMD_gGF` table |
| Double rush/run cancel | C | `Norep` vs JS `pline`; then `ECMD_CANCEL` → `reset_cmd_vars` |
| capital / Ctrl-dir after `g` | C reject | those cmds lack `CMD_gGF_PREFIX` (`:2024–2057`) |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean.

**New RNG on this path:** none. Path **public-unhit** unless a session types `g`/`G`.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### `do_rush` / `do_run` vs `:1590–1617`

C `do_rush`: if `domove_attempting & DOMOVE_RUSH` → `Norep("Double rush prefix, canceled.")`, `run=0`, `attempting=0`, `return ECMD_CANCEL`; else `run=2`, `attempting |= DOMOVE_RUSH`, `return ECMD_OK`. `do_run` is the same with `"Double run prefix, canceled."` and `run=3`.

JS (`cmd.js:1297–1315`): same bit test; cancel clears `run`, `attempting`, plus `mv`/`multi`/`move` (C’s `ECMD_CANCEL` then `reset_cmd_vars(TRUE)` at `:3764–3767` clears those too — `reset_cmd_vars` `:3607–3615` is `run/nopick/forcefight/move/mv/attempting/multi/menu_requested/travel`). Success sets `run` and `|= DOMOVE_RUSH`, `move=0`. Match the flags.

C cancel uses `Norep` (suppress identical repeats). JS `pline`. First display is the same string. Not a Must-fix; do not call it `Norep` in the D-log as if the helper were imported. `Norep` also skips message history on a repeat; a player double-tapping `g` twice in a row would see one C line and two JS lines. Unhit on the canary (one `g` then a walk).

C PREFIXCMD + `ECMD_OK` does **not** `reset_cmd_vars`; it sets `prefix_seen` and `goto got_prefix_input` (`:3762–3773`). JS returns from `rhack` with state left in `run`/`attempting` — the established `F`/`m` pattern. The next `rhack` sees RUSH. Architecture difference, same observable for `g` then `h`.

### Walk after prefix vs `set_move_cmd` `:1387–1399` + rhack `:3785–3801`

C `set_move_cmd(dir, 0)` for ordinary `hjklyubn`: `if (!gd.domove_attempting && !u.dz) { run = 0; attempting |= DOMOVE_WALK; }`. After `do_rush`, `attempting` is already RUSH, so **`run=2` is kept** and WALK is **not** added.

Then rhack: WALK bit → `domove` + clear forcefight; else RUSH bit → `if (firsttime) { if (!multi) multi = max(COLNO,ROWNO); last_str_turn=0; } mv=TRUE; domove();`.

`firsttime` is `(key == 0)` at rhack entry (`:3629`). Fresh input is `allmain.c:536` `rhack(0)` — so typed `g` then `h` **inside the PREFIXCMD loop still has firsttime TRUE**. JS `!context.mv` on the following walk therefore matches that `rhack(0)` path when it sets `multi = max(COLNO,ROWNO)` and `last_str_turn=0`. Do not “fix” this by deleting the multi cap — that would diverge from `:3793–3796`.

JS walk (`:1221–1238`): `if (!attempting) WALK; else if (RUSH && !WALK && !mv) { multi cap; last_str_turn=0; mv=1; }`. Then `domove`. Match `set_move_cmd` keep-run + RUSH firsttime.

Continuation after the first step is C `allmain.c:515–526`: `multi>0 && context.mv` → `lookaround` + `domove()`, not another `rhack`. `lookaround` may clear `multi` and abort (`:518–521`). JS already uses `run`/`multi` that way. Not this SHA’s invention.

`rhack(gc.cmd_key)` (`allmain.c:530`) is the counted-occupation path (`multi>0 && !mv`). Typed `g` is `rhack(0)` (`:536`). Do not treat JS’s following-walk `rhack('h')` as C `rhack('h')` with `firsttime` false — C never re-enters rhack for that `h`; it is still inside the PREFIXCMD loop of `rhack(0)`. JS’s `!mv` proxy is the adaptation that keeps `run` and applies the firsttime multi cap on that second `rhack`.

### Prefix error vs `:3693–3721`

C: `prefix_seen && !(PREFIXCMD) && !(was_m_prefix ? CMD_M_PREFIX : CMD_gGF_PREFIX)` → pline `The '%s' prefix should be followed by a movement command%s.` with `which = visctrl(cmd_from_func(prefix_seen))` and the up/down suffix when the **following** cmd is `<`/`>` / `doup`/`dodown`.

Walk cmds have `MOVEMENTCMD | CMD_MOVE_PREFIXES` (`CMD_M_PREFIX | CMD_gGF_PREFIX`) (`:2007–2023`). Capital run and Ctrl-rush are `MOVEMENTCMD | CMD_M_PREFIX` only (`:2024–2057`) — **they reject `g`**. `doup`/`dodown` lack `CMD_gGF_PREFIX` (`:2079–2080`).

JS `pendingRushPrefix`: RUSH && !mv && (run===2||3), then error unless `g`/`G`/`F`/`m` or `isMovementKey` (`hjklyubn` only). Does **not** treat `HJKLYUBN` or Ctrl-dir as accepting — those are not `isMovementKey`. C also errors (no `CMD_gGF_PREFIX`). Match the reject set for g+H and g+Ctrl.

`F` and `m` are PREFIXCMD so C would not take this error arm (it would stack prefixes). JS excludes them. Named omit: nested F+g/G table, not a C-wrong on `g` then `h`.

`pendingRushPrefix` does **not** exclude `rushDir` (Ctrl-dir). `ch` for Ctrl-J is `'\n'`, not `isMovementKey`. JS errors. C Ctrl-rush cmds are `MOVEMENTCMD | CMD_M_PREFIX` only (`:2024–2040`) — they lack `CMD_gGF_PREFIX`, so C also errors. Match. The later `rushDirFromCtrl` handler never runs because the prefix-error arm `return`s.

`which` is `'G'` if `run===3` else `'g'`. C `visctrl('g')` is `g`. Match for these two prefixes. Do not pull `visctrl` into this peel — that is the **next** canary (`Unknown command '^C'`).

| Case | C | JS after |
|------|---|---------|
| `'g'` then `'h'` | rush `run=2`, firsttime multi, `mv`, `domove` | **same** |
| `'G'` then `'l'` | run `run=3` | **same** |
| `'g'` `'g'` | Norep cancel, `ECMD_CANCEL` | pline cancel, flags cleared |
| `'g'` then `'A'` | prefix error (no `CMD_gGF`) | **same** pline |
| `'g'` then `'H'` | prefix error | **same** |
| `'g'` then `'<'` | prefix error + “other than up or down” | **same** |
| `'g'` then `'F'` then dir | PREFIXCMD stack | **named skip** (F excluded from error; no full stack) |
| lone `'g'` (was unbound) | PREFIXCMD wait | `move=0`, wait next `rhack` |

### `menu_requested` vs `:1183–1188` (this SHA)

JS now also skips clearing `menu_requested` for `g`/`G`/`F`. C PREFIXCMD keeps the m-prefix bit until a non-accepting command. Match the “do not drop m because g followed” case.

## Hallucinations / overclaim

D-log / CURRENT / subject say `g`/`G` are PREFIXCMD `run=2/3` and the following walk keeps the rush instead of `Unknown command 'g'.`. **That is the hunk.** Stamping **Addressed:** D-1186 is fair. This is **not** “Match C dispatch, callee is a stub”: there is no separate `do_rush` JS function, but the inlined body is the C function (flags + cancel string + keep-run). Do **not** stamp “Match C `Norep`” or “Match C nested F+g” or “Match C `visctrl` unknown-command.”

The D-log line “Double g/G Norep cancel” overclaims the helper (`pline` not `Norep`). Display on first cancel still matches.

### Clone classification (this SHA)

- `do_rush` / `do_run` — C callees inlined, not stubs.
- pendingRushPrefix — C `prefix_seen` + `CMD_gGF` reject clone (movement-only accept list).
- firsttime multi — C `:3793–3796` via `rhack(0)` firsttime, not an invented cap.
- `set_move_cmd` keep-run — C `:1396–1399` inlined.
- No no-op helper added.

## Density

One PREFIXCMD pair plus the rhack walk/error arms that pair requires. ~60 JS lines in one module. Right-size §2b (caller/callee cluster in `cmd.c`). Did not pull `avoid_trap_andor_region`. Not QUALITY-RISK.

`do_rush_west` … `do_run_southwest` (`cmd.c:1461–1567`) are the capital/Ctrl movement cmds. They call `set_move_cmd(dir, 3)` or `set_move_cmd(dir, 1)` and are **not** what `'g'`/`'G'` invoke. JS already had Ctrl-dir `run=3` and capital `run=1`. This SHA must not overwrite those with `run=2` unless `'g'` was typed. The `pendingRushPrefix` conjunct `run===2||3` plus `!mv` keeps a lone Ctrl-rush from looking like a pending `g` (Ctrl-rush sets `mv` on the same key). A typed `'g'` leaves `mv` false until the following walk.

`run=2` vs `run=3`: C `lookaround` / `runmode` treat both as “until interesting”; `run=1` is the capital-letter single-direction run. JS `end_running` / lookaround already keyed off `context.run`. This SHA only introduces 2/3 via `'g'`/`'G'`. Do not collapse them to `run=1` to “match” capital H.

Forcefight prefix (`'F'`) now ignores `'g'`/`'G'` in the F-error arm (`:1162–1164`). C `do_rush` is PREFIXCMD so it does not trip “The 'F' prefix should be followed by a movement command.” Named omit remains nested F+g then a walk (full `CMD_gGF` stack). Lone `'g'` after `'F'` no longer prints the F-error and then `Unknown command 'g'.` — it sets rush. Canary did not type F+g.

`isRunKey` (`HJKLYUBN`) is excluded from the F-error arm (pre-existing) but **not** from `pendingRushPrefix`. That is the C table: capital run accepts `m` (`CMD_M_PREFIX`) and rejects `g` (`CMD_gGF` missing). A canary that typed `g` then `h` (lowercase) never hits this. Do not “fix” `pendingRushPrefix` by adding `!isRunKey` — that would accept `g`+`H` and contradict `:2024–2057`.

Digits after `g`: C `get_count` is inside `parse` before rhack for a fresh command; a digit as the PREFIXCMD follow is not a `CMD_gGF` movement cmd → prefix error. JS `pendingRushPrefix` fires before the digit arm (`:1316`). Match the reject. Counted `g` (user typed `20g`) is a different C path (`multi` already set) and is not this SHA.

## Verification

Journal: private canary Scr **106→107**/129 (`Unknown 'g'` gone; @22 empty matches C); leftover first miss @107 portal yn; green+strict seed8000/0900; cohort **8**/8 (1500/1800/0700/0361/0014/2200/0009/0012) + strict 1500/0700/0009/0361. Path **public-unhit** unless `g`/`G`. Cadence **#1510** **44**/44 is the fortress check, not a g-rush canary.

Grep of `git show 4dd396cc -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `cmd.c:1387–1617`, `:1837–1840`, `:2007–2083`, `:3607–3842`, `allmain.c:515–539`. JS SHA rhack prefix/walk/`g`/`G` arms. `DOMOVE_RUSH` / `DOMOVE_WALK` bit values are the existing `const.js` flags (not invented this SHA). `COLNO`/`ROWNO` for the firsttime multi cap are 80/21 — `max` is 80, same as C `max(COLNO, ROWNO)`.

`cmd_from_func(do_rush)` is `'g'`; `visctrl('g')` is `g`. JS hardcodes `'g'`/`'G'` from `run===3`. Equivalent for these two prefixes only. A future PREFIXCMD that sets `run=2` without being `'g'` would mis-name the error — none exists in C.

Journal “fortress held” does not skip this audit — `'g'`/`'G'` are public-unhit. The canary @22 empty match is the proof, not the public 44. Review **147** next-port was this SHA.

## Actionable C-wrongs

None that Must-fix this next iter. Typed `g`+walk matches `do_rush` + `set_move_cmd` keep-run + `rhack(0)` firsttime RUSH. Not a stub.

Named omits / do-nots (map, not Must-fix):

1. Nested F+g/G PREFIXCMD stack / full `CMD_gGF` table (named).
2. `Norep` vs `pline` on double-prefix (first line matches).
3. Do not treat `HJKLYUBN` after `g` as a valid follow (C rejects). Do not pull `visctrl` into this SHA — **next** Must-fix is rhack `Unknown command '%s'` via `visctrl(key)` (`cmd.c:3834`). Not `maybe_smudge_engr`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `'g'`/`'G'` now set C’s PREFIXCMD rush/run (`run=2/3`, `DOMOVE_RUSH`) and a following walk keeps that run instead of printing `Unknown command 'g'.`.
- Must-fix stays the later canary peels in this window (then `visctrl`); archive hash `4dd396cc`. Not offx, not portal yn.
