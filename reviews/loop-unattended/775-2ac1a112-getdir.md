# Review 775 — 2ac1a112 — cmd.c getdir help_dir / cmdassist / dxdy_moveok (D-1806)

## Metadata
- Full / short hash: `2ac1a1125184275377584d1f3fc6c14c57a100f6` / `2ac1a112`
- Parent: `881a2804` (audit 766–774). Map-driven Open. No prior QUALITY-RISK on this locus.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 04:48:02 +0200
- D-id: **D-1806**
- Stats: `js/lock.js` +185/−36; `js/dothrow.js` +9/−135 (clone delete); pager +3; getline comment. `js/` insertions **198** ≤250. Band **80–350**.
- Claims to close: Open `cmd.c` `getdir` help_dir / cmdassist / strange-dir NEED_MORE / `dxdy_moveok`. Not `confdir`.
- JS / map: `lock.js` `getdir` / `help_dir` / `dxdy_moveok`; `dothrow.js` `getdir_cmdassist` wrapper; `pager.js` `dowhatdoes_core` export. `c-js-map/turns.md`. Archive **Addressed:** D-1806 `2ac1a112`.

## Intent vs deliverable

Git subject promises: Match C `cmd.c` `getdir` so `help_dir` cmdassist / strange-direction NEED_MORE and `dxdy_moveok` actually run in shared `getdir`, instead of silent-failing invalid keys outside the throw clone.

`node scripts/csym.mjs getdir` → `cmd.c:3956–4119`. `help_dir` `:4168–4296`. `dxdy_moveok` `:3901–3907`. `show_direction_keys` `:4121–4165`. `NODIAG` `hack.h:1414`. `--callers getdir`: apply/artifact/dig/dokick/dothrow/lock/music/pager/polyself/sounds/spell/steed/trap/wizcmds/zap. `--callers help_dir`: only `cmd.c:4101` (this peel). `--callers dxdy_moveok`: `cmd.c:3780` (rhack, named), `:4112` (here), `dig.c:1132`.

Parent: shared `getdir` returned false on quitchars / failed `apply_dirsym` with no help window; `help_dir` lived only in `dothrow.js`. The diff **does** move that window into `lock.js`, wrap throw, and add grid-bug `dxdy_moveok`. Subject’s *control flow* is delivered. **The cmdassist predicate reads `game.flags`, which Options never writes.**

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getdir` | LIVE repaired | retry + help_dir + dxdy_moveok |
| `help_dir` | LIVE local | C `staticfn`; getdir-only caller |
| `dxdy_moveok` | LIVE new | NODIAG ≡ `PM_GRID_BUG` |
| `getdir_cmdassist` | LIVE wrapper | clone deleted; struct for throw/loot |
| `getdir_read_dirsym` | LIVE repaired | `input_state = getdirInp` |
| `show_text_pages` / `dowhatdoes_core` | LIVE | pager.js; Guidebook `^letter` |
| `visctrl` / `highc` | LIVE | dokeylist / hacklib |
| `doclose` / `get_adjacent_loc` | LIVE re-point | now call `getdir` |
| `cmd_from_func` dir keys | OMIT named | hardcoded hjklyubn |
| mouse `_` getpos | OMIT named | |
| getdir fuzzer `rn2(20)` | OMIT named | |
| trailing `confdir(FALSE)` | OMIT named | CURRENT forbids adding it here |
| rhack `dxdy_moveok` | OMIT named | |

`node scripts/sym.mjs` (clone → import / new):

```
getdir           js/lock.js:526   ASYNC
getdir_cmdassist js/dothrow.js:2421   ASYNC
getdir_read_dirsym js/lock.js:477   ASYNC
dxdy_moveok      js/lock.js:123   sync
help_dir         NOT EXPORTED — 1 LOCAL in lock.js:162 (C staticfn; do NOT add #2)
show_text_pages  js/pager.js:159   ASYNC
dowhatdoes_core  js/pager.js:1698   sync
visctrl          js/dokeylist.js:42   sync
highc            js/hacklib.js:121   sync  + dokeylist.js:25 clone — do NOT add #3
doclose          js/lock.js:798   ASYNC
```

`--can lock.js pager.js show_text_pages` / `dowhatdoes_core`: **ALREADY**. `--can dothrow.js lock.js getdir`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Retry / self / quitchars (`:3981–4111`).** `getdirInp` on retry. `.` / `s` / numpad `5` → dx=dy=dz=0 success. `apply_dirsym` ≡ `movecmd(MV_ANY)` for walk/run/rush/`<>`; failed apply zeros `dz` (D-1387 leftover dx/dy). Quitchars return 0 with **no** `help_dir`. **Match those arms.**

**`help_dir` (`:4168–4296`).** getdir always passes `NHKF_ESC` so `prefixhandling` is false (`#if 0` prefix-self/up messages compiled out; `nhUse` still leaves the flag live for the valid-keys line). Invalid / `?`: `cmdassist: …` header; `letter(sym)\|\|'['` Guidebook via `highc` + `dowhatdoes_core(ctrl)` (C `pager.c:2576–2593` key2extcmddesc path; `#if 0` CMDHELPFILE compiled out); “Valid direction keys” + hjkl grid + `<>` + `visctrl` self; suppress footnote when `msg`. `show_text_pages` → `text_page_wait` space/CR/LF/ESC only (NEED_MORE). `?` retries. **Match live getdir path.** `cmd_from_func` letters named. `text_page_wait` skips `tty_nhbell` (D-1631).

**`dxdy_moveok` (`:3901–3907`).** `u.dx && u.dy && NODIAG(u.umonnum)` zeros both; return `u.dx \|\| u.dy`. JS `PM_GRID_BUG` is the macro. `You_cant("orient yourself that direction.")` ≡ the pline. **Match.** rhack caller named.

**The C-wrong in the live cmdassist gate.** C `:4098` `if (help_requested \|\| iflags.cmdassist)`. JS `:556` `game.flags?.cmdassist !== false`. optlist maps `cmdassist` → `iflags.cmdassist` (`js/options.js:2022`). `do.js:1147` already records that Options `O` toggles **iflags**, and that reading `flags.cmdassist` was a prior C-wrong. Default On (`!== false` when `flags.cmdassist` is undefined) so public sessions still paint help. `O` / `!cmdassist` never reaches the strange-direction pline from this function. That is not a named omit.

**Callee closure.** `help_dir` / `dxdy_moveok` / `show_text_pages` / `dowhatdoes_core` / `visctrl` / `highc` LIVE. Mouse / fuzzer / `cmd_from_func` / trailing `confdir` / rhack **OMIT named**. No STUB in a shipped live arm except the wrong cmdassist object.

## Hallucinations / overclaim

Do **not** stamp “Match C `iflags.cmdassist`.” Do **not** stamp “Match C `getdir` fuzzer” or “Match C trailing `confdir`.” Do **not** add a second `help_dir`. `getdir_cmdassist` is a struct wrapper, not a second body.

## Density

§2b: remaining shared `getdir` arms + the one C `help_dir` caller + `dxdy_moveok`. +198. Deleted the throw clone. Did **not** glue confdir/fuzzer. Right size. The miss is the **predicate object**, not thinness.

## Verification

D-log: save-oracle skip; dxdy_moveok probe; focused 5002/0002/0108/0102; green + cohort 10/10. Public-unhit for `!cmdassist` and grid-bug `You_cant`. This audit: `csym` `:3956–4119` / `:4168–4296` / `:3901–3907` vs HEAD `js/lock.js:123–129` and `:526–577`. Rule #2 clean.

## Actionable C-wrongs

1. **Match C `cmd.c` `getdir` `:4098` `iflags.cmdassist`** (optlist default On; Options/`O` writes `game.iflags.cmdassist`), instead of `game.flags?.cmdassist !== false` so `!cmdassist` never skips `help_dir` for the strange-direction pline. One port: the predicate (same class as D-0928 `cmd_safety_prevention`). Do **not** add trailing `confdir`. Do **not** port the fuzzer here.

Named (not Must-fix): mouse `_`; fuzzer; `cmd_from_func` keys; rhack `dxdy_moveok`; trailing `confdir`; `tty_nhbell` in `text_page_wait`; interned `yn_function_menu`.

Verdict: **QUALITY-RISK**

**Addressed:** D-1815
