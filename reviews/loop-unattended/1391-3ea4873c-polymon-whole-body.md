# Review 1391 — 3ea4873c — polymon whole body :735–1071 (D-2432)

- Commit: `3ea4873c` — "`polyself.c` polymon whole body `:735–1071` in C order (coverage PARTIAL → live) (D-2432)."
- Files: `js/polyself.js` only (+279/−17); docs + map + queue pop.
- D-log: D-2432. Queue row popped: `polyself.c` polymon PARTIAL (C 336 L / JS 201 L, dead callee `check_strangling`).

## Intent vs deliverable

Subject promises the whole `polymon` C body in C order, retiring 10 named
deferrals. Diff actually adds: import block (`display`/`do_name`/`rng`/
`mon`/`invent`/`hack`/`mhitu`/`trap`/`steed`/`monsters`/`const`/`pline`/
`potion`/`dig`/`pickup`), module-local `async check_strangling(on)`
(`:1181–1225`), and ~250 lines of new arms inside `polymon` (`:1246–1620`).
No other JS function changed. Promise matches deliverable.

## Inventory

New/changed JS: `check_strangling` (new), `polymon` (restart). No symbol
deleted or re-pointed (pure addition + body restart), so the required
`sym.mjs` delete/re-point check is vacuous; still ran for the two judgment
calls (see below).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/polyself.c:734–1071` (csym range), plus
`check_strangling :167–194`, hero arm of `mondata.c can_be_strangled
:590–619`, `youprop.h Breathless` macro. Walked branch-by-branch:

- Entry locals (`sticking`/`was_blind`/`was_hiding_under`) ✓; geno abort
  with `You_feel` + `exercise(A_WIS,TRUE)` + `return 0` ✓; first-poly
  livelog under `if (!polyselfs++)` → JS `if (!(…|0)) log` + unconditional
  increment, equivalent ✓; CON/WIS exercise, human-stat save/restore,
  mimic `unmul('')` + clear ✓; sex/`rn2(10)` arms (pre-existing) ✓.
- Stoned → stone-golem redirect + `make_stoned(0,…)` ✓; `rn1(500,500)`,
  `set_uasmon`, STR clamp ✓; Stone/Sick cures gated on the post-swap form
  resistances, Slime burn vs `PM_GREEN_SLIME`-silent arms ✓;
  `check_strangling(FALSE)`, `nohands → make_glib(0)` ✓.
- `mhmax` dragon/golem/`d(mlvl,8)`/`rnd(4)`/home-elemental-×3, `ulevel`
  clamp, uskin/break/drop/find_ac#1 (pre-existing) ✓; `hideunder` under
  `was_hiding_under` with `(void)` discard ✓; pit `set_utrap(rn1(6,2))` ✓.
- Swallow expel triple: `unsolid || msize >= MZ_HUGE || holder-smaller &&
  !is_whirly`, unsolid→`canspotmon`-gated `Monnam` refresh + `expels_mesg=
  FALSE`, `was_expelled` set; C's own FIXME kept as comment (C text, not a
  port omission) ✓. Ustuck-release (`sticks||unsolid`) and
  `sticking && !sticks → uunstick()` arms ✓.
- Steed: `touch_petrifies && !Stone_resistance && rnl(3)` → `instapetrify`
  ("riding …"), then `!can_ride → dismount_steed(DISMOUNT_POLY)` ✓.
- `find_ac#2` moved to the true `:967` pre-pool site (D-2402 supersede,
  verify-guarded) ✓; pool gate `(!Lev && !ustuck && !Flying &&
  is_pool||is_lava) || (under && !swim)` with `!was_expelled` ✓;
  Passes_walls INFLOOR/BURIEDBALL, lava-soothing, amorphous chain-slip,
  web/beartrap, webmaker-orient arms all in C order with C strings ✓;
  `check_strangling(TRUE)` ✓; botl/vision/see/encumber ✓;
  `retouch_equipment(2)` named (own row), `!uarmg → selftouch(str)` ✓.
- RNG call-for-call: `rn2(10)` sex, `rn1(500,500)`, `rn1(6,2)` pit,
  `rnl(3)` steed, `d(mlvl,4)`/`d(mlvl,8)`/`rnd(4)` — order preserved.

Helper classification:

- `check_strangling` module-local: CORRECT, not a clone. C declares it
  `staticfn` at `polyself.c:167–194` with same-file callers only
  (csym body verified above). `sym.mjs` flags it as "1 LOCAL CLONE …
  do NOT write clone #2" — false positive; C has exactly one function
  and it lives in this file:
  `check_strangling NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
  js/polyself.js:1237`.
- `is_pool_or_lava` inlined, not imported: CORRECT call. No JS export
  exists and three local clones already live in dig/eat/trap —
  `is_pool_or_lava NOT EXPORTED — but 3 LOCAL CLONE(S) in 3 file(s):
  js/dig.js:247 js/eat.js:1098 js/trap.js:691 => Do NOT write clone #4`.
  The inline `(is_pool(ux,uy) || is_lava(ux,uy))` is exactly
  `dbridge.c:76`. Inlining avoids clone #4.
- `can_be_strangled` hero-arm re-derivation inside `check_strangling`:
  checked against C `:590–619` + `youprop.h:276` (`Breathless =
  HMagical_breathing || EMagical_breathing || breathless(data)`).
  Effective JS test is `HMagical_breathing||E||breathless(youdata)` —
  exactly the macro (`u.Breathless/HBreathless/EBreathless` are
  never-written fields, always falsy; same dead-read shape as the
  pre-existing `uhitm.js:2437` sibling). Semantically equal, but it is a
  second local spelling next to `uhitm.js:2430` (no canonical export
  exists). Clone-drift risk only — not a C-wrong. Debt note, no queue row.
- Callee closure (LIVE, `sym.mjs` batch): `expels` mhitu.js:1699 ASYNC
  awaited ✓, `selftouch` trap.js:3396 ASYNC awaited ✓, `spoteffects`
  pickup.js:2071 ASYNC awaited ✓, `dismount_steed` steed.js:783 ASYNC
  awaited ✓, `unmul` hack.js:1426 ASYNC awaited ✓, `uunstick`
  polyself.js:802 ASYNC awaited ✓; `buried_ball_to_freedom`/`livelog_printf`/
  `Some_Monnam`/`makeknown`/`make_glib`/`hideunder`/`set_utrap`/
  `reset_utrap`/`unpunish` all sync, called plainly ✓. `hideunder`
  canonical import (monmove.js:1212 clone pre-existing, untouched).
  `imports.mjs --can` spot check: `ALREADY: polyself.js already statically
  imports potion.js. No new edge needed.`
- Banned-pattern grep on the `js/` hunk: one hit, commit-message prose
  only ("no DIAG/FORCE/seed logic"). No DIAG/FORCE/seed/coords in code.
  `imports.mjs --rulecheck`: `Rule #2 clean: no bare/node specifiers or
  fs calls in js/.`

## Hallucinations / overclaim

None. D-log says "0 blocked at baseline" and "hidden note" — honest
vacuous-verify framing, no "PASS hidden" inflation. Callee claims
("same-file staticfn", "no clone #4") verified true above. Caller table
names pre-existing gaps as not-this-row (uhitm `#if 0`, AD_STON guard,
EGG-petrify redirect) — disclosed, not hidden.

## Density

Breadth phase: one whole C function, `js/polyself.js` only, +279/−17.
Every arm of `:735–1071` now live or map-named (retouch, light-source,
break_armor residuals, C FIXMEs). Map `turns.md` updated in-commit.

## Verification

D-log: `verify.mjs --fn polymon` → syntax · rule2 · hidden note (0
blocked) · REACH 38/38 · green 2/2 · strict ×2 · cohort 7/7 · PASS.
Independent re-measure on this SHA:

- `hidden-proxy.mjs verify polymon --base 3ea4873c~1 --reach-all` →
  `0 session(s) blocked` (vacuous, as logged) +
  `reach polymon: 38 baseline-PASS session(s) reach it (38 run, 13.0s):
  38 PASS, 0 regressed → REACH-OK`. Confirms the D-log, no REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
