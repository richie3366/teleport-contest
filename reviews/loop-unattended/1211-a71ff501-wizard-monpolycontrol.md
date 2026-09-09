# Review 1211 — a71ff501 — wizard mon_polycontrol family (mkclass_poly/validvamp/wiz_force_cham_form)

Metadata: SHA `a71ff501` (D-2245). Queue row `mon.c`
wiz_force_cham_form, no corpus block. js/ makemon.js +258/−23,
muse.js +1/−1 (`export` keyword).

## Intent vs deliverable

Subject promises the three C functions behind the wizard
monpolycontrol prompt plus the `select_newcham_form` gate and the
`newcham` async-boundary wiring. Diff adds exactly `mkclass_poly`,
`validvamp`, `wiz_force_cham_form`, the gate, the verbatim-extracted
`select_newcham_random`, and the pure-motion `newcham_apply_form`.
Promise kept.

## Inventory

New: `mkclass_poly` (makemon.js:756 sync), `validvamp` (:1226 sync),
`wiz_force_cham_form` (:1282 ASYNC) — all per `sym.mjs`. Changed:
`select_newcham_form` (local → export; C-global per extern.h:1835, as
stated), `newcham` (Promise intercept + tail call). One-word export:
`mon_has_special` (muse.js:1359 sync, no clones reported). New import
names (`name_to_mon/class`, `noit_mon_nam`, `coord_desc`,
`getlin`/`mungspaces`, consts) all join pre-existing edges; D-log
cites `--can` hoisted-SAFE for getline.js. No STUB in a live arm.

## C ↔ JS fidelity

- `mkclass_poly` vs `makemon.c:1980–2012` (33 lines, pasted): first-in-
  class scan → NON_PM; `G_NOGEN|G_UNIQ`; `rn2(9) || S_LICH` hell
  split via the D-0747 dungeon-flag idiom; geno-freq accumulation;
  `rnd(num)` walk-down; off-by-one `first--` — exact, RNG
  call-for-call.
- `validvamp` vs `mon.c:5026–5075` (50 lines, pasted): non-shifter
  delegate → Vlad override → shapeshifter collapse → wolf/fog/bat
  gates → class switch with the S_DOG→default FALLTHROUGH — exact.
- `wiz_force_cham_form` vs `mon.c:5077–5154` (78 lines, pasted):
  QBUFSZ chop (`slice` ≡ `*eos-(len-(QBUFSZ-1))`), first-retry
  `slice(0,-1)+" kind of monster?"` ≡ `Strcpy(eos-1,…)` with the
  identical length guard, ESC `\x1b`, `*`/case-insensitive random,
  `name_to_mon` → `name_to_monclass` box → `mkclass_poly`,
  validvamp-break else NON_PM + "can't become that", `thats_enough_
  tries`, vampshifter tail — exact. (Nit, not a C-wrong: JS `pline`
  vs C `pline1` on the tries string — identical output for a
  non-"You" literal on a wizard-only unreachable path.)
- Gate position vs `mon.c:5209–5211` (read directly): after the cham
  switch, before the random arm — exact; `random` fallback preserved
  on NON_PM. `select_newcham_random` extraction is verbatim (same
  do/while). `newcham_apply_form` is pure motion (only `+` lines are
  the wrapper + tail call; sync path textually unchanged), and scored
  runs never see a Promise (gate needs wizard + setter, absent).
  EDIT_GETLIN-off assumption cited to `config.h:655`.

## Hallucinations / overclaim

None. Vacuous-0 labeled as vacuous; probe detour (objnam↔do_name
probe-order TDZ) disclosed as probe-only.

## Density

258 insertions for three C functions (33+50+78 lines) + wiring — a
tight family cluster, in-band (§2b; ceiling raised only).

## Verification

Audit re-ran the corpus claim itself:

```text
verify wiz_force_cham_form: baseline a71ff501~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green/cohort/full 44/44 per
D-log. Diff grep: no FORCE/DIAG/seed/coordinates. Rule #2 clean
(re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
