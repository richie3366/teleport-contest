# Review 784 — 462e1338 — cmd.c getdir iflags.cmdassist (D-1815)

## Metadata
- Full / short hash: `462e13389b5ef2593ae3d19efe9ca9f224e251f8` / `462e1338`
- Parent: `82865f2c` (42/44 fortress note). Must-fix from review **775** QUALITY-RISK.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 08:40:21 +0200
- D-id: **D-1815**
- Stats: `js/lock.js` +10/−3. `js/` insertions **10** ≤250. Band **80–350**. Must-fix stays one item (§2b).
- Claims to close: review **775** Must-fix — C `cmd.c` `getdir` `:4098` `iflags.cmdassist`, not `flags`. Not `confdir`. Not fuzzer.
- JS / map: `js/lock.js` `getdir` predicate only. `c-js-map/turns.md`. Archive **Addressed:** D-1815 `462e1338`. Review 775 already stamped.

## Intent vs deliverable

Git subject promises: Match C `cmd.c` `getdir` so `iflags.cmdassist` actually gates `help_dir`, instead of reading `flags.cmdassist` which Options never writes.

`node scripts/csym.mjs getdir` → `cmd.c:3956–4119`. Gate at `:4098` `if (help_requested || iflags.cmdassist)`. `--callers getdir`: apply/artifact/cmd/dig/dokick/dothrow/lock/music/pager/polyself/sounds/spell/steed/trap/wizcmds/zap (36 refs). This peel does **not** re-port those callers.

Parent after D-1806: shared `getdir` showed `help_dir` on `game.flags?.cmdassist !== false`. `optlist.h:233–234` maps `cmdassist` → `&iflags.cmdassist` default On; Options/`O` writes `game.iflags`. `flags.cmdassist` is never written, so `undefined !== false` was always On and `!cmdassist` never skipped the NHW_TEXT window. The diff **does** retarget the predicate to `game.iflags`. Comment-only change around the same `if`. No new helpers.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getdir` | LIVE repaired | predicate object only |
| `help_dir` | LIVE unchanged | C `staticfn`; getdir-only caller |
| `dxdy_moveok` | LIVE unchanged | D-1806 |
| `getdir_cmdassist` | LIVE wrapper | dothrow; not this diff |
| mouse `_` getpos | OMIT named | D-1806 / this map row |
| getdir fuzzer `rn2(20)` | OMIT named | |
| trailing `confdir(FALSE)` | OMIT named | CURRENT forbids adding it here |
| rhack `dxdy_moveok` | OMIT named | |

`node scripts/sym.mjs` (no clone→import; predicate only):

```
getdir           js/lock.js:527   ASYNC — await required
help_dir         NOT EXPORTED — 1 LOCAL in lock.js:162 (C staticfn; do NOT add #2)
cmdassist        NOT FOUND in js/** (field, not a function)
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. No `--can` (no import re-point).

## C ↔ JS fidelity

**The live gate (`cmd.c:4095–4111`).** C: failed `movecmd` and `!u.dz`; quitchars return 0 with **no** `help_dir`; else `help_requested = (dirsym == NHKF_GETDIR_HELP)`; `if (help_requested || iflags.cmdassist)` then `help_dir` (`^` prompt passes `dirsym`, else `'\0'`; ESC spkey; msg null iff help requested); `?` `goto retry`; if `!did_help` strange-direction pline; return 0.

JS `js/lock.js:550–573`: same quitchar / `?` / `hsym` / `help_dir(…, 27, msg)` / retry / pline / return false. **The object is now `game.iflags`.** `!== false` keeps optlist default On when the field is unset (same class as D-0928). `false` skips `help_dir` for the invalid-key path so the strange-direction pline runs. `?` still forces help. `do.js:1148–1150` already used `iflags.cmdassist` for the safety prefix (D-0928). **Match the Must-fix predicate.**

**RNG.** C fuzzer `rn2(20)` / `rn2(20)` / `rn2(2)` / `rn2(N_DIRS)` at `:3998–4010` is still the named omit. This peel adds **no** RNG.

**Callee closure.** `help_dir` LIVE. No STUB in the shipped arm. Named omits unchanged. `makewish` still reads `game.flags?.cmdassist` (`zap.js:6359`) and stubs `wishcmdassist` — **not this peel**; C `zap.c:6330` `iflags.cmdassist` remains map debt on `makewish`, not a getdir C-wrong.

## Hallucinations / overclaim

Subject “Match C `iflags.cmdassist`” is the predicate, not a re-port of `getdir`. Do **not** stamp “Match C trailing `confdir`” or “Match C getdir fuzzer”. Do **not** add a second `help_dir`.

## Density

§2b Must-fix: one predicate. +10. Did **not** glue confdir/fuzzer/lava. Right size for Must-fix.

## Verification

Hidden-proxy tools did **not** exist yet at this SHA (`0ac444d3` is later). No corpus session is blocked on this option bit: public sessions keep default On. Journal: save-oracle skip; probe (`!cmdassist` skips help with `flags=true` red herring; default On / `?` still help; valid `h`); green + focused 5002/0002/0108/0102 + cohort 13/13 + strict. D-log has no `hidden-proxy verify` bullet — say so: **not required**; the function was already live and this is the Options object.

This audit: `csym` `:3956–4119` gate `:4098` vs HEAD `js/lock.js:560`. Rule #2 scan deferred to end-of-iter (scored tree, not this 10-line hunk).

## Actionable C-wrongs

None in this peel. Named (map, not Must-fix): mouse `_`; fuzzer; `cmd_from_func` keys; rhack `dxdy_moveok`; trailing `confdir`; `wishcmdassist` / `makewish` `flags.cmdassist`.

Verdict: **ACCEPT**
