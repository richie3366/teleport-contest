# Review 1486 — ac4246db — do.c dosinkring + teleport_sink (D-2527)

## Metadata

- SHA: `ac4246db`
- D-id: D-2527. Next index: 1486.
- Files: `js/do.js` (+292: two functions + const table), `js/fountain.js`
  (+6), `js/potion.js` (+3), `js/sndprocs.js` (+2).
- C locus: `do.c:458–494` (`teleport_sink`, staticfn, 37 L) +
  `do.c:497–661` (`dosinkring`, staticfn, 165 L).

## Intent vs deliverable

Subject promises: both whole bodies in C order (MISSING → live) + the
`drop` `:753–757` caller wire. Diff actually adds: file-local
`teleport_sink` (`js/do.js:2449`), exported `dosinkring` (`:2489`), RIN_*
const table, the drop wire, and three `function`→`export function`
re-points. Promise matches deliverable.

## Inventory

- New: `teleport_sink` (file-local — correct home, C `staticfn`),
  `dosinkring` (exported async; sole C caller `do.c:755` is same-file
  `drop`), 29 RIN_*/MEAT_RING consts (repo `objectNames.indexOf` idiom),
  NH_BLACK/SILVER/WHITE words (`hcolor` args, not colors).
- Changed: `drop` ring-over-sink arm (was a named omit, now wired).
- Re-pointed (required `sym.mjs` pastes): `dipsink_set_levltyp` →
  `js/fountain.js:1030 sync`; `polymorph_sink` → `js/fountain.js:1061
  ASYNC` (awaited); `fruitname` → `js/potion.js:365 sync`. Doc-comment
  only otherwise; no logic change in those files. `se_drain_noises` /
  `se_ring_in_drain` → LIVE consts (`js/generated/seffects_data.js:73/
  :139`).

## C ↔ JS fidelity

`teleport_sink` vs `:458–494`: `#else` ranges (`1+rnd(COLNO-3)` =
2..COLNO-2, `1+rn2(ROWNO-2)` = 1..ROWNO-2; the `#if 0` edge arm named as
compiled out), ROOM/`!t_at`/`!engr_at`/sight-distance gate
(`!cansee || distu > 9`; `distu` is the file-local `:533` squared-hero
clone), looted save/restore, `dipsink_set_levltyp` for `set_levltyp`
(the shared sink-count analog), `newsym` pair, `do/while (++trycnt<200)`
exact, RNG (rnd+rn2 per try) call-for-call. Confirm.

`dosinkring` arm walk (C body printed in full above):

- `:501–502` drop message + `in_use`. SEARCHING/SLOW_DIGESTION
  `goto giveback` tail duplicated in both arms (in_use=FALSE + dropx +
  trycall + return) — goto semantics exact. Confirm.
- No-eyes switch, all twelve arms + MEAT_RING: LEVITATION, POISON
  (`makeplural(fruitname(false))` — LIVE export), AGGRAVATE (Hallu
  `makeplural(rndmonnam())`; `rndmonnam(codeOut=null)` default ≡ C NULL),
  SHOCK, CONFLICT (soundeffect + You_hear, LIVE async), SUSTAIN /
  GAIN_STR (`weak/strong`) / GAIN_CON (`less/great`) / INCREASE_ACC
  (`misses/hits`) / INCREASE_DMG — spe-sign adjectives and `%ser`
  shapes exact. HUNGER: `ideed=FALSE` first, `objects_at` head +
  `nexthere` walk with `otmp2` saved pre-`delobj`, uball/uchain skip,
  `obj_resists(otmp,1,99)` LIVE (`js/dogmove.js:153`), `!Blind()` message
  + `ideed=TRUE`, `otense` LIVE (`js/objnam.js:2399`). MEAT_RING distinct
  message. TELEPORTATION (`nosink=teleport_sink()`, blind-proof message,
  `ideed=FALSE`). POLYMORPH (`polymorph_sink` — its S_room arm prints
  `The sink vanishes.`, `fountain.js:1100`; `nosink=TRUE`;
  `ideed=(typ!==ROOM)`). default. Confirm.
- Eyes switch (`!Blind() && !ideed`, `ideed=TRUE` before it): all 13 arms
  + default, messages verbatim; PROTECTION/WARNING via file-local
  `hcolor` (`js/do.js:462`) — identity, i.e. exact when !Hallu; under
  Hallucination C (`do_name.c:1460–1466`) returns a display-RNG random
  color instead. Pre-existing clone, named in the D-log (map row
  `turns.md:306` doesn't index this deferral — minor doc gap, not a
  C-wrong on a scored path). Confirm with that note.
- Tail: `ideed→trycall` / `!nosink→drainpipe sound` / `!rn2(20)&&!nosink`
  backup+dropx / `!rn2(5)` buried (`freeinv_drop` is extract-only,
  `:2340–2352`, ≡ C `freeinv` here; ox/oy + `add_to_buried` follow) /
  else `useup`. RNG short-circuit (`rn2(20)` always, `rn2(5)` iff first
  arm missed) exact. Confirm.
- Caller: C `do.c:753–757` (`RING_CLASS||MEAT_RING` + `IS_SINK` →
  `dosinkring(obj); return ECMD_TIME;`, before `can_reach_floor`) → JS
  identical guard/order/return, sharing `here` with the altar check.
  The only C caller is the only JS site. Confirm.

Callee closure: `hliquid`/`rndmonnam`/`trycall` (do_name), `useup`
(invent), `engr_at` (engrave), `objects_at`/`add_to_buried` (mkobj),
`You_see`/`yname`… — all LIVE; `--can do.js fountain.js` and
`--can do.js potion.js`: ALREADY (function-body-only reads, no eval-time
TDZ). No STUB in any live arm; omits: none in these bodies.

## Hallucinations / overclaim

None. "No clone #2" verified (the three cross-module names are re-pointed
exports, not copies). `Blind()` call form is the pre-existing `js/invent.js:
341` import, used two lines below the old code already.

## Density

Two C functions (37 + 165 L) + one caller wire + three export-lines,
four files. Largest of this audit window but one C family; under caps.

## Verification

- D-log: syntax (4 changed) · rule2 · hidden note (0 blocked) · smoke
  24/24 · green 2/2 · strict ×2 · cohort 7/7 · full 44/44 → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify dosinkring --base ac4246db~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous note,
  honestly reported — the row cited no blocks) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
